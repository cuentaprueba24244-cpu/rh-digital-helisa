-- =====================================================================
--  RH digital Comserva · anexo v6: pedido OP y recibo RC de Helisa
--  Versión 1.0 · 23 de octubre de 2026 · se ejecuta DESPUÉS de
--  schema.sql y de schema_v5_archivos_planos.sql
--
--  Qué agrega (Levantamiento v6, secciones 12.1, 12.2 y 12.5; Excel de
--  Julio «Plano pedido.xlsx» del 23 de octubre, en pruebas/archivosplano/):
--  · Tipos de plantilla nuevos: PED (pedido OP de Helisa) y ASI (asiento de
--    factura, propuesta B); formato xlsx; línea de tipo «comentario».
--  · Cartilla de servicios y listas de precios de Helisa (hoja «Servicios»)
--    y la lista de precio de cada cliente.
--  · Campos exportables nuevos (empresa, concepto, cruce, indicador).
--  · Columnas de línea para el recibo: indicador a afectar, cruce y cobrador.
--  · Semilla: plantilla PED v1 «Pedido OP (24 columnas)» y RC v2 «Recibo
--    RC (17 columnas, 4 filas)», exactas al Excel de Julio, sin aprobar
--    (las aprueba Gerencia desde el configurador; las cuentas del libro N y
--    el prefijo de la factura en el cruce los confirman el contador y Julio).
--  Validado el 23 de octubre de 2026 en PostgreSQL 18.6 (Homebrew) sobre una
--  base nueva con schema.sql + schema_v5_archivos_planos.sql: 195 objetos;
--  plantillas PED v1 (24 columnas, 3 líneas) y RC v2 (17 columnas, 4 líneas),
--  54 campos exportables, 7 listas y 119 precios.
-- =====================================================================

-- ---------------------------------------------------------------------
-- 0. Tipos (cada ALTER TYPE se confirma solo; no envolver en una transacción)
-- ---------------------------------------------------------------------
alter type tipo_plano add value if not exists 'PED';
alter type tipo_plano add value if not exists 'ASI';
alter type formato_plano add value if not exists 'xlsx';
alter type tipo_linea_plano add value if not exists 'comentario';

-- ---------------------------------------------------------------------
-- 1. Cartilla de servicios y listas de precios de Helisa (hoja «Servicios»)
-- ---------------------------------------------------------------------
create table lista_precio_helisa (
  id      smallint primary key,                       -- 1 a 7 en el Helisa de Comserva
  nombre  text not null,                              -- 'BASICA 25000', 'ESPECIAL 80000'…
  activa  boolean not null default true
);
create table servicio_helisa (
  codigo   text primary key,                          -- '2', '3', '54'… (CODIGO CONCEPTO del pedido)
  nombre   text not null,                             -- 'RECOLEC. TRANSP Y DISPOS. FINAL RESIDUOS BIOLOGICOS'
  iva_pct  numeric(5,2),                              -- null = sin IVA en la cartilla
  uso      text check (uso in ('basico', 'kg_adicional', 'kg_categoria', 'exento', 'otro')),
  activo   boolean not null default true
);
create table precio_servicio_helisa (                 -- precio de cada servicio en cada lista (0 = el precio va en el pedido)
  lista_id  smallint not null references lista_precio_helisa(id),
  codigo    text not null references servicio_helisa(codigo),
  precio    numeric(14,2) not null default 0,
  primary key (lista_id, codigo)
);
alter table cliente add column lista_precio_helisa smallint references lista_precio_helisa(id);
comment on column cliente.lista_precio_helisa is 'LISTA DE PRECIO del pedido OP. 1 o 2 si la tarifa coincide con una lista básica; 3 a 7 (especiales) cuando el precio va en el pedido. La confirma Julio por cliente.';

insert into lista_precio_helisa (id, nombre) values
  (1, 'BASICA 25000'), (2, 'BASICA 30000'), (3, 'ESPECIAL 80000'), (4, 'ESPECIAL 42000'), (5, 'ESPECIAL 110000'), (6, 'TARIFA ESPECIAL 2'), (7, 'TARIFA ESPECIAL 3');
insert into servicio_helisa (codigo, nombre, iva_pct, uso) values
  ('2',  'RECOLEC. TRANSP Y DISPOS. FINAL RESIDUOS BIOLOGICOS', 19, 'basico'),
  ('3',  'KILOGRAMOS ADICIONALES', 19, 'kg_adicional'),
  ('4',  'ANATOMOPATOLÓGICOS (KILOGRAMOS)', 19, 'kg_categoria'),
  ('5',  'BIOSANITARIOS (KILOGRAMOS)', 19, 'kg_categoria'),
  ('6',  'CORTOPUNZANTES (KILOGRAMOS)', 19, 'kg_categoria'),
  ('7',  'QUIMICOS (GALON)', null, 'kg_categoria'),
  ('8',  'TÓXICOS (KILOGRAMOS)', 19, 'kg_categoria'),
  ('9',  'MEDICAMENTOS VENCIDOS (KILOGRAMOS)', 19, 'kg_categoria'),
  ('10', 'INDUSTRIALES (KILOGRAMOS)', null, 'kg_categoria'),
  ('11', 'ANIMALES (KILOGRAMOS)', 19, 'kg_categoria'),
  ('12', 'BIOLÓGICOS (KILOGRAMOS)', 19, 'kg_categoria'),
  ('13', 'VIDRIO RESULTANTE DE LABORATORIO (KILOGRAMOS)', 19, 'kg_categoria'),
  ('16', 'RESIDUOS APARATOS ELCTRÓNICOS Y ELECTRÓNICOS RAEES (KILOS)', 19, 'kg_categoria'),
  ('17', 'RESIDUOS DE PILAS Y BATERIAS (KILOGRAMOS)', 19, 'kg_categoria'),
  ('20', 'LLANTAS (KILOGRAMOS)', 19, 'kg_categoria'),
  ('41', 'RESPEL - CORROSIVOS (KILOGRAMOS)', 19, 'kg_categoria'),
  ('54', 'RECOLEC. TRANSP Y DISPOS. FINAL RESIDUOS BIOLOGICOS EXENTO', null, 'exento');
-- Precios de las listas básicas (los demás códigos y las listas especiales van en 0: el precio lo pone el pedido).
insert into precio_servicio_helisa (lista_id, codigo, precio) values
  (1, '2', 25000), (1, '3', 3850), (2, '2', 30000), (2, '3', 4000);
insert into precio_servicio_helisa (lista_id, codigo, precio)
select l.id, s.codigo, 0 from lista_precio_helisa l cross join servicio_helisa s
on conflict do nothing;

-- ---------------------------------------------------------------------
-- 2. Plantillas: columnas nuevas de la línea (recibo RC de Julio)
-- ---------------------------------------------------------------------
alter table plantilla_plano_linea
  add column ind_afectar     text,                      -- IND. A AFECTAR: '1' caja o banco, '2' cartera
  add column lleva_cruce     boolean not null default false,  -- TIPO/NUMERO DE DOCUMENTO QUE AFECTA y CUOTA solo en esta fila
  add column lleva_cobrador  boolean not null default false;  -- ID VENDEDDOR / COBRADOR = NIT de Comserva solo en esta fila
alter table plantilla_plano_linea alter column cuenta drop not null;   -- la línea de comentario del pedido no lleva cuenta ni código
alter table plantilla_plano_linea add constraint ck_linea_cuenta check (tipo_linea = 'comentario' or cuenta is not null);
comment on column plantilla_plano_linea.cuenta is 'Cuenta contable (RC, ASI) o código del concepto de la cartilla de Helisa (PED: 2 básico, 3 kilos adicionales).';

-- Campos exportables nuevos (HEL-07)
insert into campo_exportable (clave, descripcion, ejemplo, aplica_a) values
  ('pedido.numero',              'Número del pedido: consecutivo dentro del archivo (1, 2, 3…)', '1', '{PED}'),
  ('pedido.tipo_concepto',       'TIPO CONCEPTO del pedido: 2 servicio, 3 comentario', '2', '{PED}'),
  ('servicio.codigo',            'CODIGO CONCEPTO: código del servicio en la cartilla de Helisa', '3', '{PED}'),
  ('servicio.nombre',            'Nombre del servicio en la cartilla', 'KILOGRAMOS ADICIONALES', '{PED}'),
  ('servicio.lista_precios',     'LISTA DE PRECIO del cliente (1 a 7)', '3', '{PED}'),
  ('cliente.codigo_helisa',      'CÓDIGO DEL CLIENTE o de la sede en Helisa', '891190218', '{PED,RC,TER}'),
  ('empresa.nit',                'NIT de Comserva (IDENTIDAD VENDEDOR)', '828002730', '{PED,RC,ASI}'),
  ('empresa.centro_costo',       'Centro de costo de Comserva', '0101', '{PED,RC,ASI}'),
  ('linea.cantidad',             'CANTIDAD de la línea del pedido', '393,85', '{PED}'),
  ('linea.valor_unitario',       'VALOR UNITARIO de la línea del pedido', '4600', '{PED}'),
  ('linea.total',                'Cantidad × valor unitario (Helisa lo calcula; normalmente vacío)', '1811710', '{PED}'),
  ('linea.ind_afectar',          'IND. A AFECTAR: 1 caja o banco, 2 cartera', '2', '{RC,ASI}'),
  ('linea.cobrador',             'ID VENDEDDOR / COBRADOR: NIT de Comserva solo en la fila de cartera F', '828002730', '{RC}'),
  ('recibo.cuenta_bancaria',     'CUENTA BANCARIA (vacía en efectivo)', '', '{RC}'),
  ('aplicacion.factura_prefijo', 'Prefijo de la factura aplicada', 'FVE', '{RC}'),
  ('aplicacion.factura_consecutivo', 'Consecutivo de la factura aplicada sin prefijo', '25756', '{RC}'),
  ('cruce.tipo_documento',       'TIPO DE DOCUMENTO QUE AFECTA: prefijo de la factura, solo en la fila de cartera F', 'FVE', '{RC}'),
  ('cruce.numero',               'NUMERO DE DOCUMENTO QUE AFECTA: consecutivo de la factura, solo en la fila de cartera F', '25756', '{RC}'),
  ('cruce.cuota',                'CUOTA QUE AFECTA', '1', '{RC}'),
  ('factura.numero',             'Número de la factura emitida por el sistema (B)', 'SETP990030555', '{ASI}'),
  ('factura.cufe',               'CUFE de la factura emitida (B)', '3bcb0081…', '{ASI}')
on conflict (clave) do update set descripcion = excluded.descripcion, ejemplo = excluded.ejemplo, aplica_a = excluded.aplica_a;
-- Los campos de la v5 que aplicaban a 'FV' aplican ahora también al pedido y al asiento.
update campo_exportable set aplica_a = aplica_a || '{PED,ASI}'::tipo_plano[] where 'FV' = any(aplica_a) and not ('PED' = any(aplica_a));

-- ---------------------------------------------------------------------
-- 3. Semilla: plantilla PED v1 «Pedido OP de Helisa (24 columnas)», sin aprobar
-- ---------------------------------------------------------------------
insert into plantilla_plano (id, tipo, version, nombre, formato, con_titulos, decimales, tipo_documento, centro_costo, valida_cuadre, valida_fve_recibo, creada_por, nota_cambio)
select 3, 'PED', 1, 'Pedido OP de Helisa · Excel de Julio (24 columnas)', 'xlsx', true, 2, 'OP', '0101', false, false, u.id,
       'Estructura exacta de la hoja «Plano Pedidos» del Excel que envió Julio el 23 de octubre de 2026. Falta confirmar la lista de precio de cada cliente y si el código del cliente va vacío cuando es el mismo NIT.'
from usuario u where u.rol = 'admin' limit 1;
insert into plantilla_plano_columna (plantilla_id, orden, titulo, origen, campo)
select 3, c.orden, c.titulo, c.origen::origen_columna_plano, c.campo from (values
  (1,  'TIPO',                        'campo', 'plantilla.tipo_documento'),
  (2,  'NUMERO',                      'campo', 'pedido.numero'),
  (3,  'FECHA',                       'campo', 'documento.fecha'),
  (4,  'IDENTIDAD CLIENTE',           'campo', 'cliente.nit'),
  (5,  'CÓDIGO DEL CLIENTE',          'campo', 'cliente.codigo_helisa'),
  (6,  'IDENTIDAD VENDEDOR',          'campo', 'empresa.nit'),
  (7,  'TIPO CONCEPTO',               'campo', 'pedido.tipo_concepto'),
  (8,  'CODIGO CONCEPTO',             'campo', 'servicio.codigo'),
  (9,  'CODIGO UNIDAD',               'vacio', null),
  (10, 'REFERENCIA',                  'vacio', null),
  (11, 'CODIGO BARRAS',               'vacio', null),
  (12, 'ARTÍCULO/SERVICIO',           'campo', 'linea.concepto'),
  (13, 'CODIGO BODEGA',               'vacio', null),
  (14, 'LISTA DE PRECIO',             'campo', 'servicio.lista_precios'),
  (15, 'CANTIDAD',                    'campo', 'linea.cantidad'),
  (16, 'VALOR UNITARIO',              'campo', 'linea.valor_unitario'),
  (17, 'VALOR TOTAL',                 'vacio', null),
  (18, 'TARIFA DESCUENTO',            'vacio', null),
  (19, 'VALOR DESCUENTO',             'vacio', null),
  (20, 'TARIFA DESCUENTO ADICIONAL',  'vacio', null),
  (21, 'VALOR DESCUENTO ADICIONAL',   'vacio', null),
  (22, 'Centro de costo',             'campo', 'plantilla.centro_costo'),
  (23, 'CÓDIGO NEGOCIO',              'vacio', null),
  (24, 'Obsequio',                    'vacio', null)
) as c(orden, titulo, origen, campo);
insert into plantilla_plano_linea (plantilla_id, orden, tipo_linea, clase, cuenta, naturaleza, concepto, lleva_base, lleva_tercero, omitir_en_cero) values
  (3, 1, 'ingreso_basico',      'F', '2',  'C', 'RECOLEC. TRANSP Y DISPOS. FINAL RESIDUOS BIOLOGICOS', false, true, false),
  (3, 2, 'ingreso_adicionales', 'F', '3',  'C', 'KILOGRAMOS ADICIONALES', false, true, true),
  (3, 3, 'comentario',          'F', null, 'C', 'SERVICIO ESPECIAL DE ASEO PRESTADO MES DE {periodo.nombre}', false, false, false);

-- ---------------------------------------------------------------------
-- 4. Semilla: plantilla RC v2 «Recibo RC de Helisa (17 columnas, 4 filas)», sin aprobar
-- ---------------------------------------------------------------------
insert into plantilla_plano (id, tipo, version, nombre, formato, con_titulos, decimales, tipo_documento, prefijo_doc_fuente, creada_por, nota_cambio)
select 4, 'RC', 2, 'Recibo RC de Helisa · Excel de Julio (17 columnas, 4 filas por recibo)', 'xlsx', true, 0, 'RC', 'FVE', u.id,
       'Estructura exacta de la hoja «Plano Recibos» del Excel de Julio (23 oct 2026). Cuentas tomadas de su ejemplo: caja 11050501 (F) y 111050501 (N), cartera 13050501 (F) y 112050501 (N); el contador las confirma. El prefijo de la factura en el cruce (FEV en el ejemplo de Julio, FVE en las facturas de Comserva) se confirma antes de aprobar.'
from usuario u where u.rol = 'admin' limit 1;
select setval('plantilla_plano_id_seq', 4);
insert into plantilla_plano_columna (plantilla_id, orden, titulo, origen, campo)
select 4, c.orden, c.titulo, c.origen::origen_columna_plano, c.campo from (values
  (1,  'TIPO',                            'campo', 'plantilla.tipo_documento'),
  (2,  'FECHA',                           'campo', 'documento.fecha'),
  (3,  'NUMERO DE DOC.',                  'campo', 'recibo.numero'),
  (4,  'CUENTA',                          'campo', 'linea.cuenta'),
  (5,  'CONCEPTO',                        'campo', 'linea.concepto'),
  (6,  'CENTRO',                          'campo', 'plantilla.centro_costo'),
  (7,  'VALOR',                           'campo', 'linea.valor'),
  (8,  'NATURALEZA',                      'campo', 'linea.naturaleza'),
  (9,  'INDENTIDAD TERCERO',              'campo', 'cliente.nit'),           -- título con la errata de Helisa
  (10, 'CUENTA BANCARIA',                 'campo', 'recibo.cuenta_bancaria'),
  (11, 'ID VENDEDDOR / COBRADOR',         'campo', 'linea.cobrador'),        -- idem
  (12, 'FECHA CHEQUE',                    'vacio', null),
  (13, 'CLASE MOV.',                      'campo', 'linea.clase'),
  (14, 'IND. A AFECTAR',                  'campo', 'linea.ind_afectar'),
  (15, 'TIPO DE DOCUMENTO QUE AFECTA',    'campo', 'cruce.tipo_documento'),
  (16, 'NUMERO DE DOCUMENTO QUE AFECTA',  'campo', 'cruce.numero'),
  (17, 'CUOTA QUE AFECTA',                'campo', 'cruce.cuota')
) as c(orden, titulo, origen, campo);
insert into plantilla_plano_linea (plantilla_id, orden, tipo_linea, clase, cuenta, naturaleza, concepto, lleva_base, lleva_tercero, omitir_en_cero, ind_afectar, lleva_cruce, lleva_cobrador) values
  (4, 1, 'caja',    'F', '11050501',  'D', 'PAGO FACTURA {aplicacion.factura_prefijo} {aplicacion.factura_consecutivo}', false, true, false, '1', false, false),
  (4, 2, 'caja',    'N', '111050501', 'D', 'PAGO FACTURA {aplicacion.factura_prefijo} {aplicacion.factura_consecutivo}', false, true, false, '1', false, false),
  (4, 3, 'cartera', 'F', '13050501',  'C', 'PAGO FACTURA {aplicacion.factura_prefijo} {aplicacion.factura_consecutivo}', false, true, false, '2', true,  true),
  (4, 4, 'cartera', 'N', '112050501', 'C', 'PAGO FACTURA {aplicacion.factura_prefijo} {aplicacion.factura_consecutivo}', false, true, false, '2', false, false);

-- La plantilla RC v1 de la v5 (espejo del CSV de 22 columnas) queda retirada: la reemplaza la estructura de Julio.
update plantilla_plano set estado = 'retirada' where id = 2 and estado = 'borrador';
