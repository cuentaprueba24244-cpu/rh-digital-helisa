-- =====================================================================
--  RH digital Comserva · esquema de base de datos (PostgreSQL 18)
--  Versión 1.0 · 18 de octubre de 2026
--
--  Convenciones
--  · Nombres en español, snake_case, singular para tablas.
--  · Las entidades que nacen en el celular (visita, recibo, jornada,
--    archivo, mutación) usan UUID v7 generado en el dispositivo; el
--    servidor usa uuidv7() (nativa en PostgreSQL 18) como valor por defecto.
--  · Los catálogos usan enteros.
--  · Los documentos emitidos no se editan: se anulan. Un trigger impide
--    modificar las columnas de contenido de una visita cerrada.
--  · Toda tabla de negocio lleva creado_en / actualizado_en y se audita en
--    la tabla auditoria (solo inserción; sin UPDATE ni DELETE).
--  · Dinero en numeric(14,2); kilos en numeric(10,2); horas en timestamptz.
--  · Fase: (F1) fase 1, (F2) fase 2, (F3) fase 3. Todo se crea desde el
--    inicio para no migrar después; lo de F2/F3 queda sin uso hasta entonces.
-- =====================================================================

create extension if not exists citext;
create extension if not exists pgcrypto;
create extension if not exists btree_gist;

-- ---------------------------------------------------------------------
-- 0. Tipos enumerados
-- ---------------------------------------------------------------------
create type rol_usuario as enum ('admin', 'gerencia', 'facturacion', 'operario');
create type estado_dispositivo as enum ('activo', 'baja');
create type tipo_documento as enum ('constancia', 'planilla', 'recibo', 'acta', 'reporte_cierre', 'exportacion');
create type asignador_consecutivo as enum ('servidor', 'rango_dispositivo');
create type estado_cliente as enum ('activo', 'inactivo', 'pendiente_validar');
create type origen_registro as enum ('oficina', 'campo', 'importacion');
create type frecuencia_visita as enum ('semanal', 'quincenal', 'mensual', 'demanda');
create type esquema_tarifa as enum ('basico_incluidos', 'por_kilo', 'por_visita');
create type resultado_visita as enum ('recoleccion', 'sin_residuos', 'fallida');
create type estado_visita as enum ('borrador', 'cerrada', 'transmitida', 'rechazada', 'en_cierre', 'anulada');
create type resultado_firma as enum ('firmada', 'con_salvedad', 'negada', 'sin_persona');
create type tipo_foto as enum ('evidencia', 'fallida', 'bascula', 'novedad', 'comprobante');
create type tipo_archivo as enum ('firma', 'foto', 'pdf', 'logo', 'comprobante', 'certificado', 'importacion', 'exportacion', 'otro');
create type generado_en as enum ('dispositivo', 'servidor');
create type estado_documento as enum ('vigente', 'anulado');
create type tipo_recibo as enum ('pago_factura', 'abono', 'anticipo');
create type estado_recibo as enum ('emitido', 'anulado');
create type estado_entrega_efectivo as enum ('declarada', 'confirmada', 'con_diferencia');
create type medio_pago as enum ('efectivo', 'transferencia', 'consignacion', 'otro');
create type estado_cartera as enum ('al_dia', 'en_mora', 'sin_info');
create type fuente_cartera as enum ('helisa_excel', 'manual', 'calculado');
create type estado_periodo as enum ('abierto', 'cerrado');
create type estado_cierre_cliente as enum ('abierto', 'cerrado', 'facturado', 'reabierto');
create type decision_fuera_cierre as enum ('pendiente', 'incluir_siguiente', 'nota_credito', 'factura_complementaria', 'descartada');
create type estado_acta as enum ('preparada', 'firmada', 'publicada', 'retenida', 'anulada');
create type camino_helisa as enum ('A_reporte', 'C_recibos', 'C_asientos', 'terceros');
create type estado_exportacion as enum ('generado', 'importado', 'rechazado');
create type estado_programacion as enum ('programada', 'realizada', 'reprogramada', 'cancelada');
create type canal_notificacion as enum ('correo', 'whatsapp', 'enlace', 'sms');
create type estado_notificacion as enum ('pendiente', 'enviada', 'entregada', 'fallida');
create type resultado_mutacion as enum ('aplicada', 'duplicada', 'rechazada', 'cuarentena');
create type estado_cuarentena as enum ('pendiente', 'resuelta', 'descartada');

-- ---------------------------------------------------------------------
-- 1. Configuración, empresa y plantillas
-- ---------------------------------------------------------------------
create table parametro (
  clave            text primary key,                -- 'dia_corte', 'iva_pct', 'rango_por_dispositivo', ...
  valor            jsonb not null,
  descripcion      text not null,
  actualizado_por  uuid,
  actualizado_en   timestamptz not null default now()
);

create table empresa (                               -- datos maestros de Comserva (una sola fila)
  id                      smallint primary key default 1 check (id = 1),
  razon_social            text not null,
  nombre_corto            text not null,
  nit                     text not null,
  dv                      char(1) not null,
  direccion               text not null,             -- dirección oficial que va en todos los PDF
  descripcion_ubicacion   text,                      -- "continuo al Parque Ambiental Tayaru" (opcional)
  municipio               text not null,
  departamento            text not null,
  telefonos               text[] not null default '{}',
  email                   citext,
  licencia_numero         text not null,             -- 0038
  licencia_fecha          date not null,             -- 2006-01-23
  licencia_autoridad      text not null,             -- CORPOAMAZONIA
  gerente_nombre          text not null,
  gerente_cargo           text not null default 'Gerente',
  gerente_firma_archivo   uuid,                      -- imagen de la firma del gerente (fase 2)
  logo_archivo            uuid,
  cuentas_bancarias       jsonb not null default '[]', -- [{banco, tipo, numero}]
  actualizado_en          timestamptz not null default now()
);

create table plantilla_documento (                   -- textos legales, código y versión por tipo de documento
  id              serial primary key,
  tipo            tipo_documento not null,
  codigo          text,                              -- 'GD.FM.01'
  version         text not null,                     -- '01'
  nombre          text not null,
  textos          jsonb not null default '{}',       -- {titulo, certificacion, responsabilidad, pie, ...}
  vigente_desde   date not null,
  vigente_hasta   date,
  creado_por      uuid,
  creado_en       timestamptz not null default now(),
  unique (tipo, version)
);

-- ---------------------------------------------------------------------
-- 2. Usuarios, sesiones, dispositivos y series de numeración
-- ---------------------------------------------------------------------
create table usuario (
  id              uuid primary key default uuidv7(),
  nombre          text not null,
  documento       text,
  email           citext unique not null,
  telefono        text,
  rol             rol_usuario not null,
  cargo           text,                              -- 'Conductor', 'Auxiliar' (operarios)
  hash_clave      text not null,                     -- argon2id
  activo          boolean not null default true,
  es_suplente_firma boolean not null default false,  -- puede firmar actas en ausencia del gerente (F2)
  ultimo_acceso   timestamptz,
  creado_en       timestamptz not null default now(),
  actualizado_en  timestamptz not null default now()
);

create table sesion_refresh (                        -- refresh tokens rotativos de un solo uso
  id               uuid primary key default uuidv7(),
  usuario_id       uuid not null references usuario(id),
  dispositivo_id   uuid,
  token_hash       text not null unique,
  familia          uuid not null,                    -- detecta reutilización: se revoca toda la familia
  expira_en        timestamptz not null,
  usado_en         timestamptz,
  revocado_en      timestamptz,
  ip               inet,
  creado_en        timestamptz not null default now()
);

create table dispositivo (                           -- celular autorizado de un operario
  id               uuid primary key,                 -- lo genera la app al primer inicio de sesión
  usuario_id       uuid not null references usuario(id),
  nombre           text not null,
  modelo           text,
  plataforma       text,                             -- 'android 15', 'ios 18'
  app_version      text,
  token_push       text,
  estado           estado_dispositivo not null default 'activo',
  registrado_en    timestamptz not null default now(),
  ultimo_sync_en   timestamptz,
  dado_de_baja_por uuid references usuario(id),
  dado_de_baja_en  timestamptz,
  baja_motivo      text
);
alter table sesion_refresh add constraint fk_sesion_dispositivo foreign key (dispositivo_id) references dispositivo(id);

create table serie_documento (                       -- una fila por tipo de documento numerado
  tipo             tipo_documento primary key,
  prefijo          text not null default '',
  formato          text not null default '{n}',      -- planilla: '{n}-{yy}'
  asignador        asignador_consecutivo not null,
  siguiente        bigint not null,                  -- próximo número libre (servidor) o próximo inicio de rango
  ultimo_en_papel  bigint,                           -- 22641 planilla, 35651 recibo, 25676 acta
  actualizado_en   timestamptz not null default now()
);

create table rango_consecutivo (                     -- rangos reservados por dispositivo (constancia y recibo)
  id               serial primary key,
  tipo             tipo_documento not null references serie_documento(tipo),
  dispositivo_id   uuid not null references dispositivo(id),
  desde            bigint not null,
  hasta            bigint not null,
  siguiente        bigint not null,                  -- lo reporta el dispositivo al sincronizar
  asignado_en      timestamptz not null default now(),
  agotado_en       timestamptz,
  anulado_en       timestamptz,                      -- baja del dispositivo: números no usados quedan anulados
  anulado_motivo   text,
  check (desde <= hasta and siguiente between desde and hasta + 1)
);
-- dos rangos del mismo tipo nunca se solapan, sin importar el dispositivo
alter table rango_consecutivo add constraint ex_rango_sin_solape
  exclude using gist (tipo with =, int8range(desde, hasta, '[]') with &&);

-- ---------------------------------------------------------------------
-- 3. Catálogos
-- ---------------------------------------------------------------------
create table dispositor (
  id                serial primary key,
  nombre            text not null,
  nit               text,
  tipo_tratamiento  text not null,                   -- 'Tratamiento térmico (incineración)'
  municipio         text,
  activo            boolean not null default true
);

create table categoria_residuo (                     -- catálogo único de las 9 categorías
  id              serial primary key,
  codigo          text not null unique,              -- BIO, CORTO, ANATO, ANIMAL, CORROS, EXPLOS, REACT, TOX, RAEES
  nombre          text not null,                     -- nombre en la planilla y la app
  nombre_acta     text not null,                     -- 'Reactivos (líquidos de laboratorio)'
  grupo           text not null,                     -- encabezado de grupo en la planilla
  orden           smallint not null,
  en_acta         boolean not null default true,     -- Animales y Explosivos: false hasta que la gerencia decida
  tratamiento     text,                              -- null = sin tratamiento definido
  dispositor_id   int references dispositor(id),
  ayuda           text,
  activo          boolean not null default true
);

create table novedad_tipo (                          -- novedades de campo (bolsa rota, > 6 kg, residuo rechazado, ...)
  id       serial primary key,
  codigo   text not null unique,
  nombre   text not null,
  bloquea  boolean not null default false,
  activo   boolean not null default true
);

create table vehiculo (
  id           serial primary key,
  placa        text not null unique,
  descripcion  text,
  activo       boolean not null default true
);

create table cliente (                               -- el NIT es la llave de negocio
  id                   uuid primary key default uuidv7(),
  tipo_documento       char(1) not null default 'A',  -- A = NIT, C = cédula (códigos de Helisa)
  nit                  text not null,                  -- sin puntos ni DV
  dv                   char(1),
  razon_social         text not null,
  nombre_comercial     text,
  razon_social_helisa  text,                           -- tal como está en Helisa (para el reporte de cierre)
  codigo_helisa        text,
  email_facturacion    citext,
  estado               estado_cliente not null default 'activo',
  origen               origen_registro not null default 'oficina',
  documentos_por_sede  boolean not null default false, -- planilla y acta por sede en lugar de por NIT
  notas                text,
  creado_por           uuid references usuario(id),
  creado_en            timestamptz not null default now(),
  validado_por         uuid references usuario(id),
  validado_en          timestamptz,
  actualizado_en       timestamptz not null default now(),
  version              int not null default 1,
  unique (nit)
);

create table sede (                                  -- punto de recolección; todo cliente tiene al menos la 'Principal'
  id                    uuid primary key default uuidv7(),
  cliente_id            uuid not null references cliente(id),
  nombre                text not null default 'Principal',
  direccion             text not null,
  municipio             text not null,
  departamento          text not null default 'Caquetá',
  lat                   numeric(9,6),
  lng                   numeric(9,6),
  contacto_nombre       text,
  telefono              text,
  whatsapp              text,
  email                 citext,
  frecuencia            frecuencia_visita not null default 'mensual',
  dias_preferidos       smallint[] not null default '{}',  -- 1 = lunes ... 7 = domingo
  operario_habitual_id  uuid references usuario(id),
  principal             boolean not null default false,
  activa                boolean not null default true,
  notas                 text,
  creado_en             timestamptz not null default now(),
  actualizado_en        timestamptz not null default now(),
  version               int not null default 1
);
create unique index ux_sede_principal on sede (cliente_id) where principal;

create table responsable_autorizado (                -- personas que pueden firmar por la sede
  id          serial primary key,
  sede_id     uuid not null references sede(id),
  nombre      text not null,
  documento   text,
  cargo       text,
  activo      boolean not null default true
);

create table tarifa (                                -- vigencias por cliente; aplica la vigente en la fecha de corte
  id               serial primary key,
  cliente_id       uuid not null references cliente(id),
  esquema          esquema_tarifa not null default 'basico_incluidos',
  basico           numeric(14,2) not null default 0,
  kg_incluidos     numeric(10,2) not null default 0,
  precio_kg        numeric(14,2) not null default 0,
  valor_visita     numeric(14,2) not null default 0, -- esquema por_visita
  iva_pct          numeric(5,2) not null default 19,
  plazo_dias       int not null default 30,
  condicion_pago   text,                             -- 'Crédito 30 días', '10 primeros días del mes siguiente', 'Efectivo en la visita'
  vigente_desde    date not null,
  vigente_hasta    date,
  nota             text,
  creado_por       uuid references usuario(id),
  creado_en        timestamptz not null default now(),
  check (vigente_hasta is null or vigente_hasta >= vigente_desde)
);
create index ix_tarifa_cliente_vigencia on tarifa (cliente_id, vigente_desde desc);

-- ---------------------------------------------------------------------
-- 4. Archivos y documentos emitidos
-- ---------------------------------------------------------------------
create table archivo (                               -- cualquier binario en el almacenamiento S3 compatible
  id           uuid primary key,                     -- lo genera quien lo crea (celular o servidor)
  tipo         tipo_archivo not null,
  storage_key  text not null unique,                 -- 'visitas/2026/10/<uuid>.pdf'
  mime         text not null,
  bytes        bigint not null,
  sha256       text not null,
  ancho        int,
  alto         int,
  subido_por   uuid references usuario(id),
  subido_en    timestamptz not null default now()
);
alter table empresa add constraint fk_empresa_logo foreign key (logo_archivo) references archivo(id);
alter table empresa add constraint fk_empresa_firma foreign key (gerente_firma_archivo) references archivo(id);

create table documento (                             -- registro de todo PDF emitido (verificación por QR)
  id              uuid primary key default uuidv7(),
  tipo            tipo_documento not null,
  numero          bigint,                            -- consecutivo numérico de la serie
  consecutivo     text not null,                     -- texto impreso: '1186', '22642-26', '25677'
  cliente_id      uuid references cliente(id),
  sede_id         uuid references sede(id),
  periodo_id      int,
  referencia_id   uuid,                              -- visita, recibo, cierre_cliente o acta
  archivo_id      uuid not null references archivo(id),
  sha256          text not null,                     -- hash del PDF; sus primeros 16 caracteres van en el QR
  plantilla_id    int references plantilla_documento(id),
  generado_en     generado_en not null,
  emitido_por     uuid references usuario(id),
  emitido_en      timestamptz not null default now(),
  estado          estado_documento not null default 'vigente',
  anulado_por     uuid references usuario(id),
  anulado_en      timestamptz,
  anulacion_motivo text,
  token_consulta  uuid not null unique default gen_random_uuid(), -- enlace de consulta sin contraseña
  unique (tipo, consecutivo)
);
create index ix_documento_cliente on documento (cliente_id, tipo, emitido_en desc);
create index ix_documento_hash on documento (left(sha256, 16));

-- ---------------------------------------------------------------------
-- 5. Operación en campo: jornada, programación, visita
-- ---------------------------------------------------------------------
create table jornada (                               -- inicio y fin del día del operario
  id                 uuid primary key,               -- generado en el celular
  fecha              date not null,
  operario_id        uuid not null references usuario(id),   -- conductor o quien lleva el celular
  auxiliar_id        uuid references usuario(id),
  vehiculo_id        int references vehiculo(id),
  dispositivo_id     uuid not null references dispositivo(id),
  inicio_en          timestamptz not null,
  fin_en             timestamptz,
  km_inicial         int,
  km_final           int,
  observaciones      text,
  creado_en          timestamptz not null default now()
);
create index ix_jornada_fecha on jornada (fecha, operario_id);

create table programacion_visita (                   -- lista semanal por sede (F1 básica, F2 completa)
  id                serial primary key,
  sede_id           uuid not null references sede(id),
  fecha_programada  date not null,
  operario_id       uuid references usuario(id),
  estado            estado_programacion not null default 'programada',
  es_adicional      boolean not null default false,
  motivo            text,                            -- festivo, el cliente lo pidió, vehículo, operario ausente
  reprogramada_de   int references programacion_visita(id),
  visita_id         uuid,
  creado_por        uuid references usuario(id),
  creado_en         timestamptz not null default now()
);
create index ix_programacion_fecha on programacion_visita (fecha_programada, operario_id);

create table visita (                                -- LA entidad central. Solo kilos; nunca pesos.
  id                        uuid primary key,        -- UUID v7 generado en el celular
  numero                    bigint,                  -- consecutivo de la constancia (del rango del dispositivo)
  numero_provisional        boolean not null default false,
  jornada_id                uuid references jornada(id),
  cliente_id                uuid not null references cliente(id),
  sede_id                   uuid not null references sede(id),
  resultado                 resultado_visita not null default 'recoleccion',
  estado                    estado_visita not null default 'borrador',
  fecha_visita              date not null,           -- define el periodo al que pertenece
  hora_dispositivo          timestamptz not null,
  hora_servidor             timestamptz,
  desfase_reloj_seg         int,
  zona_horaria              text not null default 'America/Bogota',
  lat                       numeric(9,6),
  lng                       numeric(9,6),
  precision_m               numeric(7,1),
  sin_gps_motivo            text,
  operario_id               uuid not null references usuario(id),
  auxiliar_id               uuid references usuario(id),
  vehiculo_id               int references vehiculo(id),
  dispositivo_id            uuid not null references dispositivo(id),
  total_kg                  numeric(10,2) not null default 0,
  num_bolsas                int not null default 0,
  num_guardianes            int not null default 0,
  motivo                    text,                    -- de la fallida o de la visita sin residuos
  entrega_nombre            text,
  entrega_documento         text,
  entrega_cargo             text,
  entrega_sin_doc_motivo    text,
  resultado_firma           resultado_firma,
  salvedad_texto            text,
  observaciones             text,
  aviso_datos_aceptado_en   timestamptz,
  firma_cliente_archivo     uuid references archivo(id),
  firma_operario_archivo    uuid references archivo(id),
  pdf_documento_id          uuid references documento(id),
  cerrada_en                timestamptz,             -- hora del celular al cerrar
  transmitida_en            timestamptz,
  rechazada_en              timestamptz,
  rechazo_motivo            text,
  anulada_por               uuid references usuario(id),
  anulada_en                timestamptz,
  anulacion_motivo          text,
  reemplaza_visita_id       uuid references visita(id),
  app_version               text,
  hash_contenido            text,                    -- hash del JSON firmado en el celular
  creado_en                 timestamptz not null default now(),
  actualizado_en            timestamptz not null default now(),
  version                   int not null default 1,
  check (resultado <> 'recoleccion' or total_kg > 0 or estado = 'borrador'),
  check (resultado = 'recoleccion' or total_kg = 0)
);
create unique index ux_visita_numero on visita (numero) where numero is not null and numero_provisional = false;
create index ix_visita_cliente_fecha on visita (cliente_id, fecha_visita desc);
create index ix_visita_estado on visita (estado) where estado in ('cerrada', 'rechazada', 'transmitida');
create index ix_visita_fecha on visita (fecha_visita);
alter table programacion_visita add constraint fk_programacion_visita foreign key (visita_id) references visita(id);

create table visita_kilos (                          -- una fila por categoría con kilos > 0; guarda el catálogo del día
  visita_id         uuid not null references visita(id) on delete cascade,
  categoria_id      int not null references categoria_residuo(id),
  kg                numeric(10,2) not null check (kg > 0),
  codigo_snap       text not null,
  nombre_snap       text not null,
  nombre_acta_snap  text not null,
  en_acta_snap      boolean not null,
  tratamiento_snap  text,
  dispositor_snap   text,
  primary key (visita_id, categoria_id)
);

create table visita_pesada (                         -- pesadas individuales que la app suma por categoría
  id            bigserial primary key,
  visita_id     uuid not null references visita(id) on delete cascade,
  categoria_id  int not null references categoria_residuo(id),
  orden         smallint not null,
  kg_bruto      numeric(10,2) not null,
  tara          numeric(10,2) not null default 0,
  kg            numeric(10,2) generated always as (kg_bruto - tara) stored
);

create table visita_novedad (
  id             bigserial primary key,
  visita_id      uuid not null references visita(id) on delete cascade,
  novedad_id     int not null references novedad_tipo(id),
  descripcion    text,
  categoria_id   int references categoria_residuo(id),
  kg_rechazados  numeric(10,2),
  foto_archivo   uuid references archivo(id)
);

create table visita_foto (
  id          uuid primary key,                      -- generado en el celular
  visita_id   uuid not null references visita(id) on delete cascade,
  archivo_id  uuid references archivo(id),           -- null mientras la foto espera buena señal
  tipo        tipo_foto not null,
  lat         numeric(9,6),
  lng         numeric(9,6),
  tomada_en   timestamptz not null,
  subida_en   timestamptz
);

-- ---------------------------------------------------------------------
-- 6. Caja: recibos, entrega de efectivo, pagos y cartera
-- ---------------------------------------------------------------------
create table recibo_caja (                           -- solo efectivo; provisional hasta que Lucrecia registre el de Helisa
  id                        uuid primary key,        -- generado en el celular
  numero                    bigint,
  numero_provisional        boolean not null default false,
  cliente_id                uuid not null references cliente(id),
  sede_id                   uuid references sede(id),
  visita_id                 uuid references visita(id),      -- opcional: el pago puede no venir de una visita
  jornada_id                uuid references jornada(id),
  operario_id               uuid not null references usuario(id),
  dispositivo_id            uuid references dispositivo(id),
  fecha_hora_dispositivo    timestamptz not null,
  fecha_hora_servidor       timestamptz,
  valor                     numeric(14,2) not null check (valor > 0),
  valor_letras              text not null,
  tipo                      tipo_recibo not null default 'pago_factura',
  concepto                  text not null,
  pagador_nombre            text not null,
  pagador_documento         text,
  firma_pagador_archivo     uuid references archivo(id),
  firma_operario_archivo    uuid references archivo(id),
  pdf_documento_id          uuid references documento(id),
  estado                    estado_recibo not null default 'emitido',
  entrega_efectivo_id       uuid,
  recibo_helisa_numero      text,                    -- recibo de caja definitivo emitido en Helisa
  recibo_helisa_fecha       date,
  cruzado_por               uuid references usuario(id),
  cruzado_en                timestamptz,
  anulado_por               uuid references usuario(id),
  anulado_en                timestamptz,
  anulacion_motivo          text,
  reemplaza_recibo_id       uuid references recibo_caja(id),
  transmitido_en            timestamptz,
  creado_en                 timestamptz not null default now(),
  version                   int not null default 1
);
create unique index ux_recibo_numero on recibo_caja (numero) where numero is not null and numero_provisional = false;
create index ix_recibo_cliente on recibo_caja (cliente_id, fecha_hora_dispositivo desc);

create table recibo_caja_aplicacion (                -- a qué factura(s) o periodo(s) se aplica el dinero
  id                  bigserial primary key,
  recibo_id           uuid not null references recibo_caja(id) on delete cascade,
  factura_numero      text,                          -- 'FVE 25756'
  cierre_cliente_id   uuid,
  valor               numeric(14,2) not null check (valor > 0)
);

create table entrega_efectivo (                      -- el operario entrega el efectivo del día a la oficina
  id                   uuid primary key,
  jornada_id           uuid references jornada(id),
  operario_id          uuid not null references usuario(id),
  fecha                date not null,
  total_declarado      numeric(14,2) not null,
  total_confirmado     numeric(14,2),
  diferencia           numeric(14,2) generated always as (coalesce(total_confirmado, 0) - total_declarado) stored,
  confirmado_por       uuid references usuario(id),
  confirmado_en        timestamptz,
  consignacion_banco   text,
  consignacion_fecha   date,
  consignacion_ref     text,
  comprobante_archivo  uuid references archivo(id),
  observaciones        text,
  estado               estado_entrega_efectivo not null default 'declarada',
  creado_en            timestamptz not null default now()
);
alter table recibo_caja add constraint fk_recibo_entrega foreign key (entrega_efectivo_id) references entrega_efectivo(id);

create table pago (                                  -- (F2) transferencias y consignaciones registradas en el panel
  id                   uuid primary key default uuidv7(),
  cliente_id           uuid not null references cliente(id),
  fecha                date not null,
  valor                numeric(14,2) not null check (valor > 0),
  retenciones          numeric(14,2) not null default 0,
  medio                medio_pago not null,
  banco                text,
  referencia           text,
  comprobante_archivo  uuid references archivo(id),
  registrado_por       uuid not null references usuario(id),
  registrado_en        timestamptz not null default now(),
  notas                text
);

create table pago_aplicacion (
  id                 bigserial primary key,
  pago_id            uuid not null references pago(id) on delete cascade,
  factura_numero     text,
  cierre_cliente_id  uuid,
  valor              numeric(14,2) not null
);

create table cartera_carga (                         -- Excel de cartera exportado de Helisa y cargado por Lucrecia
  id            serial primary key,
  archivo_id    uuid not null references archivo(id),
  fecha_corte   date not null,
  filas         int not null,
  cargado_por   uuid not null references usuario(id),
  cargado_en    timestamptz not null default now(),
  resumen       jsonb
);

create table cartera_cliente (                       -- estado vigente de cartera por cliente
  cliente_id            uuid primary key references cliente(id),
  estado                estado_cartera not null default 'sin_info',
  saldo_total           numeric(14,2),
  saldo_vencido         numeric(14,2),
  fuente                fuente_cartera not null default 'calculado',
  carga_id              int references cartera_carga(id),
  actualizado_en        timestamptz not null default now(),
  override_estado       estado_cartera,              -- marca manual de Facturación
  override_motivo       text,
  override_por          uuid references usuario(id),
  override_hasta        date
);

-- ---------------------------------------------------------------------
-- 7. Periodo, cierre por cliente, actas, exportaciones
-- ---------------------------------------------------------------------
create table periodo (
  id                           serial primary key,
  anio                         smallint not null,
  mes                          smallint not null check (mes between 1 and 12),
  fecha_inicio                 date not null,        -- día siguiente al corte anterior
  fecha_fin                    date not null,        -- día de corte (parámetro dia_corte)
  ventana_facturacion_desde    date,                 -- desde cuándo Facturación puede cerrar clientes uno a uno (día 20)
  estado                       estado_periodo not null default 'abierto',
  cerrado_por                  uuid references usuario(id),
  cerrado_en                   timestamptz,
  version                      int not null default 1,
  reabierto_por                uuid references usuario(id),
  reabierto_en                 timestamptz,
  reapertura_motivo            text,
  unique (anio, mes),
  check (fecha_fin > fecha_inicio)
);
alter table documento add constraint fk_documento_periodo foreign key (periodo_id) references periodo(id);

create table cierre_cliente (                        -- resumen congelado cliente-periodo: de aquí salen planilla, acta y factura
  id                   uuid primary key default uuidv7(),
  periodo_id           int not null references periodo(id),
  cliente_id           uuid not null references cliente(id),
  sede_id              uuid references sede(id),     -- solo si el cliente pide documentos por sede
  estado               estado_cierre_cliente not null default 'abierto',
  tarifa_id            int references tarifa(id),
  esquema_snap         esquema_tarifa,
  basico_snap          numeric(14,2),
  kg_incluidos_snap    numeric(10,2),
  precio_kg_snap       numeric(14,2),
  valor_visita_snap    numeric(14,2),
  iva_pct_snap         numeric(5,2),
  plazo_dias_snap      int,
  num_visitas          int not null default 0,
  num_sin_residuos     int not null default 0,
  num_fallidas         int not null default 0,
  kg_total             numeric(10,2) not null default 0,
  kg_adicionales       numeric(10,2) not null default 0,
  valor_basico         numeric(14,2) not null default 0,
  valor_adicionales    numeric(14,2) not null default 0,
  subtotal             numeric(14,2) not null default 0,
  iva                  numeric(14,2) not null default 0,
  total                numeric(14,2) not null default 0,
  planilla_documento   uuid references documento(id),
  acta_id              uuid,
  cerrado_por          uuid references usuario(id),
  cerrado_en           timestamptz,
  factura_numero       text,                         -- 'FVE 25756', lo digita Lucrecia (camino A)
  factura_fecha        date,
  factura_vence        date,
  facturado_por        uuid references usuario(id),
  facturado_en         timestamptz,
  observaciones        text,
  version              int not null default 1,
  creado_en            timestamptz not null default now(),
  unique (periodo_id, cliente_id, sede_id)
);
alter table recibo_caja_aplicacion add constraint fk_rca_cierre foreign key (cierre_cliente_id) references cierre_cliente(id);
alter table pago_aplicacion add constraint fk_pa_cierre foreign key (cierre_cliente_id) references cierre_cliente(id);

create table cierre_cliente_categoria (              -- kilos por categoría del cierre (incluye ceros para el acta)
  cierre_cliente_id  uuid not null references cierre_cliente(id) on delete cascade,
  categoria_id       int not null references categoria_residuo(id),
  kg                 numeric(10,2) not null default 0,
  nombre_acta_snap   text not null,
  en_acta_snap       boolean not null,
  tratamiento_snap   text,
  dispositor_snap    text,
  primary key (cierre_cliente_id, categoria_id)
);

create table cierre_cliente_visita (                 -- una visita pertenece a lo sumo a un cierre
  cierre_cliente_id  uuid not null references cierre_cliente(id) on delete cascade,
  visita_id          uuid not null references visita(id),
  primary key (cierre_cliente_id, visita_id),
  unique (visita_id)
);

create table visita_fuera_cierre (                   -- visitas del periodo que llegaron después del cierre del cliente
  id                   serial primary key,
  visita_id            uuid not null unique references visita(id),
  periodo_original_id  int not null references periodo(id),
  decision             decision_fuera_cierre not null default 'pendiente',
  decidido_por         uuid references usuario(id),
  decidido_en          timestamptz,
  nota                 text,
  creado_en            timestamptz not null default now()
);

create table ajuste_periodo (                        -- (F2) corrección a un cierre ya facturado: no toca el cierre, se refleja en el siguiente
  id                       serial primary key,
  visita_id                uuid not null references visita(id),
  cierre_origen_id         uuid not null references cierre_cliente(id),
  kg_por_categoria         jsonb not null,           -- {"BIO": -100.0}
  kg_delta                 numeric(10,2) not null,
  valor_delta              numeric(14,2) not null,
  motivo                   text not null,
  evidencia_archivo        uuid references archivo(id),
  aprobado_por             uuid references usuario(id),
  aprobado_en              timestamptz,
  aplicado_en_cierre_id    uuid references cierre_cliente(id),
  helisa_documento_tipo    text,                     -- 'NC' nota crédito, 'FV' factura complementaria
  helisa_numero            text,
  creado_por               uuid not null references usuario(id),
  creado_en                timestamptz not null default now()
);

create table acta (                                  -- (F2) acta de gestión integral GD.FM.01
  id                  uuid primary key default uuidv7(),
  numero              bigint not null unique,
  cierre_cliente_id   uuid not null unique references cierre_cliente(id),
  fecha_acta          date,
  estado              estado_acta not null default 'preparada',
  firmada_por         uuid references usuario(id),
  firmada_en          timestamptz,
  firma_ip            inet,
  publicada_en        timestamptz,
  retenida_motivo     text,
  pdf_documento_id    uuid references documento(id),
  plantilla_id        int references plantilla_documento(id),
  anulada_por         uuid references usuario(id),
  anulada_en          timestamptz,
  anulacion_motivo    text,
  creado_en           timestamptz not null default now()
);
alter table cierre_cliente add constraint fk_cierre_acta foreign key (acta_id) references acta(id);

create table exportacion_helisa (                    -- camino A (reporte) en F1; camino C (.xls) y terceros en F2
  id             serial primary key,
  periodo_id     int references periodo(id),
  camino         camino_helisa not null,
  archivo_id     uuid references archivo(id),
  generado_por   uuid not null references usuario(id),
  generado_en    timestamptz not null default now(),
  filas          int not null default 0,
  total          numeric(14,2),
  estado         estado_exportacion not null default 'generado',
  importado_en   timestamptz,
  observaciones  text
);

create table exportacion_detalle (
  id                 bigserial primary key,
  exportacion_id     int not null references exportacion_helisa(id) on delete cascade,
  cierre_cliente_id  uuid references cierre_cliente(id),
  recibo_id          uuid references recibo_caja(id),
  cliente_id         uuid references cliente(id),
  check (num_nonnulls(cierre_cliente_id, recibo_id, cliente_id) = 1)
);
create unique index ux_exportacion_detalle on exportacion_detalle (exportacion_id, coalesce(cierre_cliente_id, recibo_id, cliente_id));

create table entrega_dispositor (                    -- (F2/F3) lo que Comserva entrega a Incihuila y Sur Ambiental
  id                   serial primary key,
  periodo_id           int references periodo(id),
  dispositor_id        int not null references dispositor(id),
  fecha                date not null,
  certificado_numero   text,
  certificado_archivo  uuid references archivo(id),
  registrado_por       uuid not null references usuario(id),
  registrado_en        timestamptz not null default now()
);
create table entrega_dispositor_categoria (
  entrega_id    int not null references entrega_dispositor(id) on delete cascade,
  categoria_id  int not null references categoria_residuo(id),
  kg            numeric(10,2) not null,
  primary key (entrega_id, categoria_id)
);

-- ---------------------------------------------------------------------
-- 8. Portal de clientes (F2)
-- ---------------------------------------------------------------------
create table portal_usuario (
  id             uuid primary key default uuidv7(),
  cliente_id     uuid not null references cliente(id),
  nombre         text not null,
  email          citext not null unique,
  hash_clave     text,
  activo         boolean not null default true,
  ultimo_acceso  timestamptz,
  creado_en      timestamptz not null default now()
);

-- ---------------------------------------------------------------------
-- 9. Mensajería, sincronización, alertas y auditoría
-- ---------------------------------------------------------------------
create table notificacion (
  id             bigserial primary key,
  documento_id   uuid references documento(id),
  canal          canal_notificacion not null,
  destinatario   text not null,
  estado         estado_notificacion not null default 'pendiente',
  proveedor      text,
  proveedor_id   text,
  categoria_cobro text,                              -- categoría que devuelve Meta (utility, marketing) en F3
  error          text,
  intentos       int not null default 0,
  creado_en      timestamptz not null default now(),
  enviado_en     timestamptz,
  entregado_en   timestamptz
);

create table sync_mutacion (                         -- idempotencia: una fila por mutación recibida del celular
  id              uuid primary key,                  -- Idempotency-Key = id de la mutación en el outbox local
  dispositivo_id  uuid not null references dispositivo(id),
  usuario_id      uuid not null references usuario(id),
  tipo            text not null,                     -- 'visita.cerrar', 'recibo.emitir', 'jornada.iniciar', 'foto.subir', ...
  entidad_id      uuid,
  resultado       resultado_mutacion not null,
  respuesta       jsonb,                             -- se devuelve igual si el celular reintenta
  error           text,
  recibido_en     timestamptz not null default now()
);

create table sync_cuarentena (                       -- mutaciones que no se pudieron aplicar; nunca bloquean la cola
  id            serial primary key,
  mutacion_id   uuid not null references sync_mutacion(id),
  payload       jsonb not null,
  motivo        text not null,
  estado        estado_cuarentena not null default 'pendiente',
  resuelto_por  uuid references usuario(id),
  resuelto_en   timestamptz,
  nota          text
);

create table alerta (
  id           bigserial primary key,
  tipo         text not null,                        -- 'visita_sin_sync', 'rango_por_agotarse', 'cliente_sin_visita', ...
  severidad    text not null check (severidad in ('info', 'media', 'alta')),
  entidad      text,
  entidad_id   text,
  mensaje      text not null,
  destinatario_rol rol_usuario,
  creada_en    timestamptz not null default now(),
  resuelta_en  timestamptz,
  resuelta_por uuid references usuario(id)
);

create table auditoria (                             -- solo inserción
  id              bigserial primary key,
  en              timestamptz not null default now(),
  usuario_id      uuid,
  dispositivo_id  uuid,
  ip              inet,
  entidad         text not null,
  entidad_id      text not null,
  accion          text not null,                     -- crear, cerrar, transmitir, rechazar, anular, cerrar_periodo, reabrir, exportar, login, ...
  antes           jsonb,
  despues         jsonb,
  detalle         text
);
create index ix_auditoria_entidad on auditoria (entidad, entidad_id, en desc);
create index ix_auditoria_usuario on auditoria (usuario_id, en desc);

-- ---------------------------------------------------------------------
-- 10. Reglas de integridad en base de datos
-- ---------------------------------------------------------------------

-- 10.1 La auditoría no se edita ni se borra
create or replace function fn_bloquear() returns trigger language plpgsql as $$
begin
  raise exception 'La tabla % no admite % ', tg_table_name, tg_op;
end $$;
create trigger trg_auditoria_inmutable before update or delete on auditoria for each row execute function fn_bloquear();

-- 10.2 Una visita cerrada no cambia de contenido: solo transiciones de estado y datos del servidor
create or replace function fn_visita_inmutable() returns trigger language plpgsql as $$
begin
  if old.estado <> 'borrador' then
    if new.cliente_id <> old.cliente_id or new.sede_id <> old.sede_id or new.resultado <> old.resultado
       or new.fecha_visita <> old.fecha_visita or new.hora_dispositivo <> old.hora_dispositivo
       or new.total_kg <> old.total_kg or new.num_bolsas <> old.num_bolsas or new.num_guardianes <> old.num_guardianes
       or coalesce(new.entrega_nombre, '') <> coalesce(old.entrega_nombre, '')
       or coalesce(new.entrega_documento, '') <> coalesce(old.entrega_documento, '')
       or new.firma_cliente_archivo is distinct from old.firma_cliente_archivo
       or new.firma_operario_archivo is distinct from old.firma_operario_archivo
       or new.numero is distinct from old.numero and old.numero_provisional = false then
      raise exception 'La visita % está % y no se puede editar; anúlela y emita otra', old.id, old.estado;
    end if;
  end if;
  new.actualizado_en := now();
  new.version := old.version + 1;
  return new;
end $$;
create trigger trg_visita_inmutable before update on visita for each row execute function fn_visita_inmutable();

-- 10.3 Los kilos de una visita no cambian después de cerrada
create or replace function fn_kilos_inmutables() returns trigger language plpgsql as $$
declare v_estado estado_visita;
begin
  select estado into v_estado from visita where id = coalesce(new.visita_id, old.visita_id);
  if v_estado is not null and v_estado <> 'borrador' then
    raise exception 'Los kilos de la visita % no se pueden modificar (estado %)', coalesce(new.visita_id, old.visita_id), v_estado;
  end if;
  if tg_op = 'DELETE' then return old; end if;
  return new;
end $$;
create trigger trg_kilos_inmutables before update or delete on visita_kilos for each row execute function fn_kilos_inmutables();

-- 10.4 Total de la visita = suma de sus categorías (se verifica al transmitir)
create or replace function fn_verificar_total_visita(p_visita uuid) returns boolean language sql stable as $$
  select coalesce((select sum(kg) from visita_kilos where visita_id = p_visita), 0) = (select total_kg from visita where id = p_visita);
$$;

-- 10.5 Tarifa vigente para un cliente en una fecha (la del corte del periodo)
create or replace function fn_tarifa_vigente(p_cliente uuid, p_fecha date) returns tarifa language sql stable as $$
  select t.* from tarifa t
  where t.cliente_id = p_cliente and t.vigente_desde <= p_fecha and (t.vigente_hasta is null or t.vigente_hasta >= p_fecha)
  order by t.vigente_desde desc limit 1;
$$;

-- 10.6 Liquidación de un cliente en un periodo (misma fórmula que la app y el panel)
--      básico_incluidos: total = (básico + max(0, kg − incluidos) × precio) × (1 + iva)
--      por_kilo:         total = (kg × precio) × (1 + iva)
--      por_visita:       total = (visitas realizadas × valor_visita) × (1 + iva)
create or replace function fn_liquidar(p_esquema esquema_tarifa, p_basico numeric, p_incluidos numeric, p_precio numeric,
                                       p_valor_visita numeric, p_iva_pct numeric, p_kg numeric, p_visitas int)
returns table (kg_adicionales numeric, valor_basico numeric, valor_adicionales numeric, subtotal numeric, iva numeric, total numeric)
language plpgsql immutable as $$
declare v_adic numeric := 0; v_basico numeric := 0; v_vadic numeric := 0; v_sub numeric; v_iva numeric;
begin
  if p_esquema = 'basico_incluidos' then
    v_adic := greatest(0, round(p_kg - p_incluidos, 2));
    v_basico := p_basico;
    v_vadic := round(v_adic * p_precio, 2);
  elsif p_esquema = 'por_kilo' then
    v_adic := round(p_kg, 2);
    v_vadic := round(v_adic * p_precio, 2);
  else
    v_basico := round(p_visitas * p_valor_visita, 2);
  end if;
  v_sub := v_basico + v_vadic;
  v_iva := round(v_sub * p_iva_pct / 100, 2);
  return query select v_adic, v_basico, v_vadic, v_sub, v_iva, v_sub + v_iva;
end $$;

-- 10.7 Periodo al que pertenece una fecha de visita
create or replace function fn_periodo_de(p_fecha date) returns int language sql stable as $$
  select id from periodo where p_fecha between fecha_inicio and fecha_fin limit 1;
$$;

-- 10.8 Un cierre facturado no se reabre
create or replace function fn_cierre_facturado_bloqueado() returns trigger language plpgsql as $$
begin
  if old.estado = 'facturado' and new.estado = 'reabierto' then
    raise exception 'El cierre % ya tiene factura % y no se puede reabrir; registre un ajuste del periodo', old.id, old.factura_numero;
  end if;
  return new;
end $$;
create trigger trg_cierre_facturado before update on cierre_cliente for each row execute function fn_cierre_facturado_bloqueado();

-- ---------------------------------------------------------------------
-- 11. Vistas de apoyo
-- ---------------------------------------------------------------------
create view v_visita_resumen as
select v.id, v.numero, v.estado, v.resultado, v.fecha_visita, v.hora_dispositivo, v.hora_servidor,
       c.nit, c.razon_social, c.nombre_comercial, s.nombre as sede, s.municipio,
       u.nombre as operario, a.nombre as auxiliar, ve.placa, v.total_kg, v.num_bolsas, v.num_guardianes,
       v.entrega_nombre, v.resultado_firma, v.lat, v.lng,
       (select count(*) from visita_foto f where f.visita_id = v.id) as fotos,
       v.anulada_en, v.anulacion_motivo, v.reemplaza_visita_id
from visita v
join cliente c on c.id = v.cliente_id
join sede s on s.id = v.sede_id
join usuario u on u.id = v.operario_id
left join usuario a on a.id = v.auxiliar_id
left join vehiculo ve on ve.id = v.vehiculo_id;

create view v_pre_cierre as                          -- lista de verificación antes de cerrar un periodo
select p.id as periodo_id,
  (select count(*) from visita v where v.fecha_visita between p.fecha_inicio and p.fecha_fin and v.estado = 'cerrada')   as en_celular,
  (select count(*) from visita v where v.fecha_visita between p.fecha_inicio and p.fecha_fin and v.estado = 'rechazada') as rechazadas,
  (select count(*) from visita v where v.fecha_visita between p.fecha_inicio and p.fecha_fin and v.estado = 'borrador')  as borradores,
  (select count(*) from cliente c where c.estado = 'pendiente_validar') as clientes_por_validar,
  (select count(*) from recibo_caja r where r.estado = 'emitido' and r.entrega_efectivo_id is null
     and r.fecha_hora_dispositivo::date between p.fecha_inicio and p.fecha_fin) as recibos_sin_entregar,
  (select count(*) from cliente c where c.estado = 'activo' and not exists (
      select 1 from visita v where v.cliente_id = c.id and v.fecha_visita between p.fecha_inicio and p.fecha_fin
        and v.estado in ('transmitida', 'en_cierre') and v.resultado in ('recoleccion', 'sin_residuos'))) as clientes_sin_visita
from periodo p;

create view v_recaudo_operario_dia as
select r.operario_id, u.nombre as operario, r.fecha_hora_dispositivo::date as fecha,
       count(*) filter (where r.estado = 'emitido') as recibos,
       coalesce(sum(r.valor) filter (where r.estado = 'emitido'), 0) as recaudado,
       coalesce(sum(r.valor) filter (where r.estado = 'emitido' and r.entrega_efectivo_id is null), 0) as pendiente_entregar
from recibo_caja r join usuario u on u.id = r.operario_id
group by r.operario_id, u.nombre, r.fecha_hora_dispositivo::date;

-- ---------------------------------------------------------------------
-- 12. Datos semilla mínimos
-- ---------------------------------------------------------------------
insert into parametro (clave, valor, descripcion) values
  ('dia_corte', '26', 'Día de corte del periodo. El periodo va del día siguiente al corte anterior hasta este día.'),
  ('dia_inicio_facturacion', '20', 'Desde este día Facturación puede cerrar clientes uno a uno dentro del periodo.'),
  ('iva_pct_defecto', '19', 'IVA por defecto para tarifas nuevas.'),
  ('rango_por_dispositivo', '50', 'Tamaño del rango de consecutivos que se reserva a cada celular (constancias y recibos).'),
  ('rango_renovar_en', '0.5', 'Fracción del rango consumida a partir de la cual la app pide otro rango.'),
  ('max_fotos_visita', '3', 'Fotos por visita.'),
  ('tolerancia_reloj_min', '10', 'Diferencia entre hora del celular y del servidor que marca la visita para revisión.'),
  ('alerta_sin_sync_horas', '2', 'Horas con visitas sin transmitir antes de alertar.'),
  ('kg_max_por_bolsa', '6', 'Alerta en la app cuando (BIO + ANATO) / bolsas supera este valor.'),
  ('dias_gracia_cartera', '0', 'Días de gracia después del vencimiento antes de marcar en mora.'),
  ('anulacion_operario_min', '30', 'Minutos en los que el operario puede anular su propia visita o recibo.'),
  ('exigir_foto_fallida', 'true', 'La visita fallida exige al menos una foto.'),
  ('permitir_cliente_en_campo', 'true', 'El operario puede crear clientes pendientes de validar.'),
  ('formato_planilla', '"{n}-{yy}"', 'Formato del consecutivo de la planilla mensual.');

insert into serie_documento (tipo, prefijo, formato, asignador, siguiente, ultimo_en_papel) values
  ('constancia', '', '{n}', 'rango_dispositivo', 1, null),
  ('planilla', '', '{n}-{yy}', 'servidor', 22642, 22641),
  ('recibo', '', '{n}', 'rango_dispositivo', 35652, 35651),
  ('acta', '', '{n}', 'servidor', 25677, 25676),
  ('reporte_cierre', 'RC', '{n}', 'servidor', 1, null),
  ('exportacion', 'EX', '{n}', 'servidor', 1, null);

insert into dispositor (nombre, tipo_tratamiento) values
  ('Incihuila S.A.S E.S.P', 'Tratamiento térmico (incineración)'),
  ('Sur Ambiental S.A.S', 'Celdas de seguridad');

insert into categoria_residuo (codigo, nombre, nombre_acta, grupo, orden, en_acta, tratamiento, dispositor_id) values
  ('BIO',    'Biológicos',         'Biológicos',                          'Residuos biológicos, infecciosos y peligrosos', 1, true,  'Tratamiento térmico (incineración)', 1),
  ('CORTO',  'Cortopunzantes',     'Cortopunzantes',                      'Residuos biológicos, infecciosos y peligrosos', 2, true,  'Tratamiento térmico (incineración)', 1),
  ('ANATO',  'Anatomopatológicos', 'Anatomopatológicos',                  'Residuos biológicos, infecciosos y peligrosos', 3, true,  'Tratamiento térmico (incineración)', 1),
  ('ANIMAL', 'Animales',           'Animales',                            'Residuos biológicos, infecciosos y peligrosos', 4, false, null, null),
  ('CORROS', 'Corrosivos',         'Corrosivos',                          'Otros residuos o desechos peligrosos',          5, true,  'Celdas de seguridad', 2),
  ('EXPLOS', 'Explosivos',         'Explosivos',                          'Otros residuos o desechos peligrosos',          6, false, null, null),
  ('REACT',  'Reactivos',          'Reactivos (líquidos de laboratorio)', 'Otros residuos o desechos peligrosos',          7, true,  'Celdas de seguridad', 2),
  ('TOX',    'Tóxicos',            'Tóxicos',                             'Otros residuos o desechos peligrosos',          8, true,  'Tratamiento térmico (incineración)', 1),
  ('RAEES',  'RAEES',              'RAEES',                               'Aparatos eléctricos y electrónicos',            9, true,  'Celdas de seguridad', 2);

insert into novedad_tipo (codigo, nombre) values
  ('BOLSA_ROTA', 'Bolsa rota o mal cerrada'), ('SIN_ROTULO', 'Bolsa sin rótulo'), ('BOLSA_PESADA', 'Bolsa de más de 6 kg'),
  ('GUARDIAN_MAL', 'Guardián mal cerrado o lleno'), ('NO_AUTORIZADO', 'Residuo que Comserva no recibe'),
  ('RECHAZADO', 'Residuo rechazado y dejado en el sitio'), ('INCONFORME_PESO', 'Cliente inconforme con el peso'), ('OTRA', 'Otra');

insert into plantilla_documento (tipo, codigo, version, nombre, textos, vigente_desde) values
  ('acta', 'GD.FM.01', '01', 'Acta de gestión integral de residuos', '{}', '2026-01-01'),
  ('planilla', 'RHPS', '01', 'Formulario RHPS de recolección y transporte', '{}', '2026-01-01'),
  ('constancia', 'CV', '01', 'Constancia de visita', '{}', '2026-01-01'),
  ('recibo', 'RCP', '01', 'Recibo de caja provisional', '{}', '2026-01-01');
