-- =====================================================================
--  RH digital Comserva · anexo v5: archivos planos configurables
--  Versión 1.0 · 19 de octubre de 2026 · se ejecuta DESPUÉS de schema.sql
--
--  Qué agrega (Levantamiento v5, secciones 7.6, 8, 10 y 12):
--  · Factura registrada (factura_helisa): la FVE que Lucrecia devuelve tras
--    importar el archivo plano; es la que habilita el recibo de caja y lleva
--    el saldo de referencia (no es cartera contable: esa vive en Helisa).
--  · Plantillas configurables de archivo plano (plantilla_plano, sus
--    columnas y sus líneas por documento).
--  · Archivos planos generados (archivo_plano) y sus filas literales
--    (archivo_plano_linea), con hash, estado y lista de errores de Helisa.
--  · Estados nuevos: cierre 'exportado'; recibo 'exportado' y 'cruzado';
--    tipo de recibo 'pago_total'.
--  · Regla «recibo solo con factura»: trigger que impide emitir un recibo a
--    un cliente sin factura registrada con saldo de referencia.
--  La tabla exportacion_helisa de schema.sql se conserva para el reporte de
--  cierre de contingencia (camino A de la v4).
--  Validado el 19 de octubre de 2026 en PostgreSQL 18.6 (Homebrew) después
--  de schema.sql: crea 60 objetos sin errores; probados los triggers
--  FACTURA_REQUERIDA, SALDO_EXCEDIDO y ARCHIVO_IMPORTADO_INMUTABLE y la
--  vista v_saldo_referencia (abono de 500.000 a la FVE 25756 → saldo 1.744.935).
-- =====================================================================

-- ---------------------------------------------------------------------
-- 0. Tipos: valores nuevos y tipos del anexo
-- ---------------------------------------------------------------------
alter type tipo_recibo add value if not exists 'pago_total';
alter type estado_recibo add value if not exists 'exportado';
alter type estado_recibo add value if not exists 'cruzado';
alter type estado_cierre_cliente add value if not exists 'exportado';

create type tipo_plano as enum ('FV', 'RC', 'TER');                 -- factura, recibo de caja, terceros
create type formato_plano as enum ('xls', 'csv', 'txt');
create type codificacion_plano as enum ('windows-1252', 'utf-8', 'utf-8-bom');
create type origen_columna_plano as enum ('campo', 'constante', 'expresion', 'vacio');
create type naturaleza_plano as enum ('D', 'C');
create type clase_plano as enum ('F', 'N');                          -- local, NIIF
create type tipo_linea_plano as enum ('ingreso_basico', 'ingreso_adicionales', 'ingreso_unico', 'iva', 'cartera', 'caja', 'banco', 'retencion', 'otra');
create type estado_plantilla_plano as enum ('borrador', 'aprobada', 'retirada');
create type estado_archivo_plano as enum ('generado', 'descargado', 'importado', 'rechazado', 'anulado');

-- ---------------------------------------------------------------------
-- 1. Factura registrada en Helisa (resultado de importar el archivo FV)
-- ---------------------------------------------------------------------
create table factura_helisa (
  id                  uuid primary key default uuidv7(),
  cierre_cliente_id   uuid not null unique references cierre_cliente(id),
  cliente_id          uuid not null references cliente(id),
  numero              text not null,                 -- 'FVE 25756' tal como lo muestra Helisa
  fecha               date not null,
  vence               date,
  total_helisa        numeric(14,2) not null,        -- total según Helisa; se compara con cierre_cliente.total
  diferencia          numeric(14,2),                 -- total_helisa - total del RH; > 1 marca revisión
  requiere_revision   boolean not null default false,
  pagada_otro_medio   numeric(14,2) not null default 0,  -- (F2) marcas CAJ-04: transferencias/consignaciones, solo saldo de referencia
  registrada_por      uuid not null references usuario(id),
  registrada_en       timestamptz not null default now(),
  anulada_en          timestamptz,                   -- si Helisa anuló la factura (nota crédito), se registra aquí
  anulacion_motivo    text,
  unique (numero)
);
create index ix_factura_helisa_cliente on factura_helisa (cliente_id, fecha desc);

-- La aplicación del recibo ahora apunta a la factura registrada.
alter table recibo_caja_aplicacion
  add column factura_id uuid references factura_helisa(id);
comment on column recibo_caja_aplicacion.factura_numero is 'Texto libre heredado de la v4; en la v5 se usa factura_id.';

-- Saldo de referencia por factura: total - recibos vigentes - pagos por otro medio.
create view v_saldo_referencia as
select f.id as factura_id,
       f.cliente_id,
       f.numero,
       f.fecha,
       f.vence,
       f.total_helisa,
       coalesce(sum(a.valor) filter (where r.estado in ('emitido', 'exportado', 'cruzado')), 0) as recibos,
       f.pagada_otro_medio,
       f.total_helisa
         - coalesce(sum(a.valor) filter (where r.estado in ('emitido', 'exportado', 'cruzado')), 0)
         - f.pagada_otro_medio as saldo
from factura_helisa f
left join recibo_caja_aplicacion a on a.factura_id = f.id
left join recibo_caja r on r.id = a.recibo_id
where f.anulada_en is null
group by f.id;

-- ---------------------------------------------------------------------
-- 2. Plantillas configurables (HEL-03)
-- ---------------------------------------------------------------------
create table plantilla_plano (
  id                    serial primary key,
  tipo                  tipo_plano not null,
  version               int not null,
  nombre                text not null,               -- 'Espejo del CSV de Helisa'
  estado                estado_plantilla_plano not null default 'borrador',
  formato               formato_plano not null default 'xls',
  separador             text not null default ';',   -- para csv/txt; ignorado en xls
  codificacion          codificacion_plano not null default 'windows-1252',
  con_titulos           boolean not null default true,
  fin_de_linea          text not null default 'CRLF',
  formato_fecha         text not null default 'dd/MM/yyyy',
  decimales             smallint not null default 0 check (decimales between 0 and 2),
  separador_decimal     text not null default ',',
  separador_miles       text not null default '',
  mayusculas            boolean not null default true,
  quitar_tildes         boolean not null default true,
  tipo_documento        text,                        -- 'FE', 'RC'… (columna TIPO)
  centro_costo          text,
  prefijo_doc_fuente    text,                        -- 'FV' / 'FVE'
  nit_con_dv            boolean not null default false,
  agrupacion            text not null default 'periodo' check (agrupacion in ('periodo', 'cliente', 'lote')),
  recibos_incluidos     text not null default 'entregados' check (recibos_incluidos in ('emitidos', 'entregados')),
  prefijo_archivo       text not null default 'COMSERVA',
  valida_cuadre         boolean not null default true,
  valida_tercero_helisa boolean not null default true,
  valida_fve_recibo     boolean not null default true,
  nota_cambio           text,
  vigente_desde         date,
  creada_por            uuid not null references usuario(id),
  creada_en             timestamptz not null default now(),
  aprobada_por          uuid references usuario(id),  -- Gerencia; obligatorio para estado 'aprobada'
  aprobada_en           timestamptz,
  unique (tipo, version),
  check (estado <> 'aprobada' or (aprobada_por is not null and vigente_desde is not null))
);
-- La plantilla vigente de un tipo es la aprobada con mayor vigente_desde <= hoy.
create index ix_plantilla_plano_vigente on plantilla_plano (tipo, vigente_desde desc) where estado = 'aprobada';

create table plantilla_plano_columna (
  id             serial primary key,
  plantilla_id   int not null references plantilla_plano(id) on delete cascade,
  orden          smallint not null,
  titulo         text not null,                      -- 'TIPO', 'FECHA', 'NUMERO DE DOCUMENTO', ...
  origen         origen_columna_plano not null default 'vacio',
  campo          text,                               -- clave del catálogo de campos exportables (HEL-07): 'cliente.nit', 'rh.total', 'linea.cuenta', ...
  constante      text,
  expresion      text,                               -- expresión simple: concatenación y condición sobre campos
  ancho          smallint,                           -- ancho fijo (txt) o máximo de caracteres
  alineacion     text check (alineacion in ('izquierda', 'derecha')),
  relleno        text,
  unique (plantilla_id, orden),
  check (origen <> 'campo' or campo is not null),
  check (origen <> 'constante' or constante is not null),
  check (origen <> 'expresion' or expresion is not null)
);

create table plantilla_plano_linea (                 -- qué líneas genera cada RH o recibo y en qué orden
  id             serial primary key,
  plantilla_id   int not null references plantilla_plano(id) on delete cascade,
  orden          smallint not null,
  tipo_linea     tipo_linea_plano not null,
  clase          clase_plano not null default 'F',
  cuenta         text not null,                      -- cuenta contable definida por el contador
  naturaleza     naturaleza_plano not null,
  concepto       text,                               -- plantilla de texto con campos entre llaves: 'KILOGRAMOS ADICIONALES {rh.kg_adicionales} kg'
  lleva_base     boolean not null default false,
  lleva_tercero  boolean not null default true,
  omitir_en_cero boolean not null default true,
  unique (plantilla_id, orden)
);

-- ---------------------------------------------------------------------
-- 3. Archivos generados (HEL-01, HEL-02, HEL-04, HEL-06)
-- ---------------------------------------------------------------------
create table archivo_plano (
  id              uuid primary key default uuidv7(),
  tipo            tipo_plano not null,
  periodo_id      int references periodo(id),
  plantilla_id    int not null references plantilla_plano(id),
  consecutivo     int not null,                      -- por tipo y periodo: COMSERVA_FV_2026-09_001
  nombre          text not null unique,
  archivo_id      uuid references archivo(id),      -- binario en el almacenamiento
  sha256          text,
  filas           int not null default 0,
  documentos      int not null default 0,
  total_debitos   numeric(14,2) not null default 0,
  total_creditos  numeric(14,2) not null default 0,
  estado          estado_archivo_plano not null default 'generado',
  generado_por    uuid not null references usuario(id),
  generado_en     timestamptz not null default now(),
  descargado_en   timestamptz,
  importado_en    timestamptz,
  importado_por   uuid references usuario(id),
  rechazado_en    timestamptz,
  errores_helisa  text,                              -- lista de errores pegada desde Helisa
  anulado_en      timestamptz,
  anulado_motivo  text,
  es_prueba       boolean not null default false,    -- archivo de prueba del configurador: no cambia estados
  unique (tipo, periodo_id, consecutivo),
  check (total_debitos = total_creditos or tipo = 'TER')
);

create table archivo_plano_linea (                   -- copia literal de cada fila generada
  id                 bigserial primary key,
  archivo_plano_id   uuid not null references archivo_plano(id) on delete cascade,
  orden              int not null,
  cierre_cliente_id  uuid references cierre_cliente(id),
  recibo_id          uuid references recibo_caja(id),
  cliente_id         uuid references cliente(id),
  tipo_linea         tipo_linea_plano,
  clase              clase_plano,
  cuenta             text,
  naturaleza         naturaleza_plano,
  valor              numeric(14,2),
  doc_fuente         text,                           -- 'FVE 25756' en el archivo RC
  fila               jsonb not null,                 -- {titulo: valor} tal como se escribió
  unique (archivo_plano_id, orden)
);
create index ix_apl_cierre on archivo_plano_linea (cierre_cliente_id);
create index ix_apl_recibo on archivo_plano_linea (recibo_id);

-- Cada cierre y cada recibo apuntan al archivo vigente que los exportó (uno solo).
alter table cierre_cliente add column archivo_plano_id uuid references archivo_plano(id);
alter table recibo_caja   add column archivo_plano_id uuid references archivo_plano(id);
alter table cliente       add column existe_en_helisa boolean not null default false;  -- marca para la validación de terceros

-- ---------------------------------------------------------------------
-- 4. Regla: el recibo de caja exige factura registrada con saldo
-- ---------------------------------------------------------------------
create or replace function fn_recibo_requiere_factura() returns trigger language plpgsql as $$
declare v_saldo numeric(14,2);
begin
  select coalesce(sum(saldo), 0) into v_saldo
  from v_saldo_referencia where cliente_id = new.cliente_id;
  if v_saldo <= 0 then
    raise exception 'FACTURA_REQUERIDA: el cliente % no tiene factura registrada con saldo de referencia', new.cliente_id
      using errcode = 'check_violation';
  end if;
  return new;
end $$;
create trigger trg_recibo_requiere_factura
  before insert on recibo_caja
  for each row execute function fn_recibo_requiere_factura();

-- La aplicación no puede superar el saldo de referencia de la factura.
create or replace function fn_aplicacion_no_supera_saldo() returns trigger language plpgsql as $$
declare v_saldo numeric(14,2);
begin
  if new.factura_id is null then return new; end if;
  select saldo into v_saldo from v_saldo_referencia where factura_id = new.factura_id;
  if v_saldo is null or new.valor > v_saldo then
    raise exception 'SALDO_EXCEDIDO: la aplicación de % supera el saldo de referencia % de la factura', new.valor, v_saldo
      using errcode = 'check_violation';
  end if;
  return new;
end $$;
create trigger trg_aplicacion_no_supera_saldo
  before insert on recibo_caja_aplicacion
  for each row execute function fn_aplicacion_no_supera_saldo();

-- Un archivo importado no se modifica.
create or replace function fn_archivo_plano_inmutable() returns trigger language plpgsql as $$
begin
  if old.estado = 'importado' and (new.estado <> 'importado' or new.sha256 is distinct from old.sha256) then
    raise exception 'ARCHIVO_IMPORTADO_INMUTABLE' using errcode = 'check_violation';
  end if;
  return new;
end $$;
create trigger trg_archivo_plano_inmutable
  before update on archivo_plano
  for each row execute function fn_archivo_plano_inmutable();

-- ---------------------------------------------------------------------
-- 5. Catálogo de campos exportables (HEL-07): claves válidas para plantilla_plano_columna.campo
-- ---------------------------------------------------------------------
create table campo_exportable (
  clave        text primary key,                     -- 'cliente.nit'
  descripcion  text not null,
  ejemplo      text,
  aplica_a     tipo_plano[] not null
);
insert into campo_exportable (clave, descripcion, ejemplo, aplica_a) values
  ('plantilla.tipo_documento', 'Tipo de documento de la plantilla', 'FE', '{FV,RC}'),
  ('plantilla.centro_costo',   'Centro de costo de la plantilla', '', '{FV,RC}'),
  ('documento.fecha',          'Fecha del documento (RH: fecha sugerida; recibo: fecha del recibo)', '25/09/2026', '{FV,RC}'),
  ('documento.numero',         'Número del documento en el archivo (vacío si Helisa lo asigna)', '', '{FV,RC}'),
  ('documento.doc_fuente',     'Prefijo + número propio (FV) o número FVE aplicado (RC)', 'FVE25756', '{FV,RC}'),
  ('documento.forma_pago',     'Código de forma de pago según la tarifa', '6', '{FV,RC}'),
  ('cliente.nit',              'NIT del cliente sin puntos (con DV si la plantilla lo pide)', '891190218', '{FV,RC,TER}'),
  ('cliente.dv',               'Dígito de verificación', '5', '{FV,RC,TER}'),
  ('cliente.razon_social_helisa', 'Razón social según Helisa', 'COFEMA S.A.', '{FV,RC,TER}'),
  ('periodo.nombre',           'Nombre del periodo', 'SEPTIEMBRE 2026', '{FV}'),
  ('rh.numero',                'Número de la planilla/RH', '22642-26', '{FV}'),
  ('rh.kg_total',              'Kilos del periodo', '413,85', '{FV}'),
  ('rh.kg_adicionales',        'Kilos adicionales', '393,85', '{FV}'),
  ('rh.precio_kg',             'Precio del kilo adicional', '4600', '{FV}'),
  ('rh.basico',                'Valor básico', '74790', '{FV}'),
  ('rh.valor_adicionales',     'Valor de los kilos adicionales', '1811710', '{FV}'),
  ('rh.subtotal',              'Subtotal', '1886500', '{FV}'),
  ('rh.iva_pct',               'IVA %', '19', '{FV}'),
  ('rh.iva',                   'IVA', '358435', '{FV}'),
  ('rh.total',                 'Total', '2244935', '{FV}'),
  ('recibo.numero',            'Número del recibo provisional', '35672', '{RC}'),
  ('recibo.tipo',              'Tipo de recibo', 'ABONO', '{RC}'),
  ('recibo.valor',             'Valor total del recibo', '500000', '{RC}'),
  ('recibo.medio',             'Medio de pago', 'EFECTIVO', '{RC}'),
  ('aplicacion.factura_numero','Número FVE de la factura aplicada', 'FVE25756', '{RC}'),
  ('aplicacion.valor',         'Valor aplicado a esa factura', '500000', '{RC}'),
  ('linea.cuenta',             'Cuenta contable de la línea', '130505', '{FV,RC}'),
  ('linea.concepto',           'Concepto de la línea (plantilla con campos)', 'KILOGRAMOS ADICIONALES', '{FV,RC}'),
  ('linea.valor',              'Valor de la línea', '2244935', '{FV,RC}'),
  ('linea.naturaleza',         'D o C', 'D', '{FV,RC}'),
  ('linea.base',               'Base (subtotal en la línea de IVA)', '1886500', '{FV,RC}'),
  ('linea.clase',              'F o N', 'F', '{FV,RC}'),
  ('linea.orden',              'Número de línea dentro del documento', '4', '{FV,RC}');

-- ---------------------------------------------------------------------
-- 6. Semilla: plantilla 1 «espejo del CSV de Helisa» (22 columnas), sin aprobar
--    Las cuentas son de ejemplo y deben reemplazarse con las del contador.
-- ---------------------------------------------------------------------
-- Usuario técnico de semilla (schema.sql no crea usuarios); la clave real se asigna en el despliegue.
insert into usuario (nombre, email, rol, hash_clave, activo)
select 'Administrador técnico (semilla)', 'admin@comserva.local', 'admin', 'SEMILLA-SIN-CLAVE', false
where not exists (select 1 from usuario where rol = 'admin');

insert into plantilla_plano (id, tipo, version, nombre, formato, tipo_documento, prefijo_doc_fuente, creada_por, nota_cambio)
select 1, 'FV', 1, 'Espejo del CSV de Helisa (22 columnas)', 'xls', 'FE', 'FV', u.id,
       'Plantilla inicial construida sobre HELISA_900855539_20261002_132210_plano.csv. Cuentas de ejemplo: reemplazar con las del contador antes de aprobar.'
from usuario u where u.rol = 'admin' limit 1;
insert into plantilla_plano (id, tipo, version, nombre, formato, tipo_documento, prefijo_doc_fuente, creada_por, nota_cambio)
select 2, 'RC', 1, 'Espejo del CSV de Helisa (22 columnas)', 'xls', 'RC', 'FVE', u.id,
       'Plantilla inicial del recibo de caja. DOC FUENTE = número FVE para el cruce.'
from usuario u where u.rol = 'admin' limit 1;
select setval('plantilla_plano_id_seq', 2);

insert into plantilla_plano_columna (plantilla_id, orden, titulo, origen, campo)
select p.id, c.orden, c.titulo, c.origen::origen_columna_plano, c.campo
from plantilla_plano p
cross join (values
  (1,  'TIPO',                   'campo',     'plantilla.tipo_documento'),
  (2,  'FECHA',                  'campo',     'documento.fecha'),
  (3,  'NUMERO DE DOCUEMNTO',    'campo',     'documento.numero'),       -- título tal como lo exporta Helisa (con su errata)
  (4,  'CUENTA',                 'campo',     'linea.cuenta'),
  (5,  'CONCEPTO',               'campo',     'linea.concepto'),
  (6,  'CENTRO',                 'campo',     'plantilla.centro_costo'),
  (7,  'VALOR',                  'campo',     'linea.valor'),
  (8,  'NATURALEZA',             'campo',     'linea.naturaleza'),
  (9,  'IDENTIDADTERCERO',       'campo',     'cliente.nit'),
  (10, 'DOC FUENTE',             'campo',     'documento.doc_fuente'),
  (11, 'CODIGO NEGOCIO',         'vacio',     null),
  (12, 'NOMBRE NEGOCIO',         'vacio',     null),
  (13, 'NRO CHEQE',              'vacio',     null),
  (14, 'CODIGO TERCERO',         'vacio',     null),
  (15, 'CUENTA BANCARIO',        'vacio',     null),
  (16, 'ID PROVEEDOR/COBRADOR',  'vacio',     null),
  (17, 'FORMA DE PAGO',          'campo',     'documento.forma_pago'),
  (18, 'BASE',                   'campo',     'linea.base'),
  (19, 'NUM OPERACION',          'vacio',     null),
  (20, 'FECHA DE CHEUQE',        'vacio',     null),
  (21, 'CLASE DE MOVIMIENTO',    'campo',     'linea.clase'),
  (22, 'IND A AFECTAR',          'campo',     'linea.orden')
) as c(orden, titulo, origen, campo)
where p.id in (1, 2);

insert into plantilla_plano_linea (plantilla_id, orden, tipo_linea, clase, cuenta, naturaleza, concepto, lleva_base, lleva_tercero, omitir_en_cero) values
  (1, 1, 'ingreso_basico',      'F', '413500-EJEMPLO', 'C', 'RECOLEC. TRANSP Y DISPOS. FINAL RESIDUOS {periodo.nombre}', false, true, false),
  (1, 2, 'ingreso_adicionales', 'F', '413500-EJEMPLO', 'C', 'KILOGRAMOS ADICIONALES {rh.kg_adicionales} KG X {rh.precio_kg}', false, true, true),
  (1, 3, 'iva',                 'F', '240801-EJEMPLO', 'C', 'IVA {rh.iva_pct}%', true, true, true),
  (1, 4, 'cartera',             'F', '130505-EJEMPLO', 'D', 'FACTURA {documento.doc_fuente} {cliente.razon_social_helisa}', false, true, false),
  (2, 1, 'caja',                'F', '110505-EJEMPLO', 'D', 'RECIBO PROVISIONAL {recibo.numero} {recibo.tipo}', false, true, false),
  (2, 2, 'cartera',             'F', '130505-EJEMPLO', 'C', 'ABONO A {aplicacion.factura_numero}', false, true, false);
