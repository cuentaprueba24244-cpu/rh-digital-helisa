# SPEC · RH digital Comserva · Fase 1 (piloto)

**Versión 1.1 · 19 de octubre de 2026.** Especificación de desarrollo para arrancar la fase 1 con Claude Code. Es la traducción operativa del *Levantamiento de requerimientos v5* y de la *Arquitectura técnica v1*: qué se construye, en qué orden, con qué contratos y cómo se sabe que está terminado. Los IDs (APP-, OFI-, CAJ-, CIE-, HEL-, DOC-, RNF-) son los de la v4, que la v5 conserva. **La v1.1 incorpora la v5:** los archivos planos de factura y de recibo, su configurador y la regla «recibo solo con factura» (sección 10); el resto no cambia.

---

## 0. Cómo usar este documento con Claude Code

1. Crear el repositorio `rh-digital-comserva` (monorepo pnpm) y copiar dentro de `docs/` la v4 (HTML y PDF), la arquitectura, `schema.sql`, este SPEC y la carpeta `mockups/`.
2. Crear `CLAUDE.md` en la raíz con el contenido de la sección 1 (menos de 200 líneas).
3. Trabajar por épicas (sección 4) en el orden indicado. Cada épica es una rama corta; cada historia termina con pruebas y una revisión de otra persona (Claude Code puede hacer la primera pasada).
4. Reparto por cuentas: la **cuenta Max** lleva la app móvil y la sincronización (lo más agéntico y largo) y revisa PRs; las **dos cuentas Pro** llevan API, panel, PDF y pruebas con `/model sonnet`, sesiones cortas y `/clear` entre tareas (ver *Estimación v1*, sección 4).
5. No empezar una pantalla sin su mockup abierto al lado: `mockups/app/index.html`, `mockups/panel/*.html`, `mockups/documentos/*.html`.

---

## 1. CLAUDE.md propuesto (copiar al repositorio)

```markdown
# RH digital Comserva

Sistema para Comserva S.A.S. (Florencia, Caquetá): app Android del operario (Expo), API (NestJS + PostgreSQL 18), panel y portal web (React + Vite). Español en código de dominio y en la interfaz. Documentos de referencia en docs/ (v4, arquitectura, schema.sql, SPEC.md, mockups/).

## Comandos
- pnpm i · pnpm dev (api + web) · pnpm --filter movil start
- pnpm test · pnpm lint · pnpm typecheck
- pnpm db:migrate · pnpm db:seed (carga Cofema septiembre 2026 y datos de prueba)
- docker compose -f infra/docker-compose.dev.yml up -d (Postgres, Gotenberg, MinIO, Mailpit)

## Reglas del dominio (no negociables)
- La VISITA es la única captura. Solo kilos; nunca pesos en la visita.
- Lo firmado no se edita: se anula con motivo y se emite otro documento enlazado.
- Fórmula: adic = max(0, round(kg − incluidos, 2)); valorAdic = round(adic × precioKg, 2); subtotal = basico + valorAdic; iva = round(subtotal × ivaPct/100, 2); total = subtotal + iva. Redondeo half-up, decimal.js, nunca float. Una sola implementación en packages/shared/liquidacion.ts y fn_liquidar() en SQL.
- Prueba de regresión obligatoria: Cofema sept 2026 = 413,85 kg → $2.244.935 (básico 74.790, 20 kg incluidos, 4.600 $/kg, IVA 19 %).
- Periodo: del día siguiente al corte anterior hasta el corte (parámetro dia_corte=26). La visita pertenece al periodo por fecha_visita (hora del celular corregida con el desfase), nunca por fecha de sincronización.
- Tarifa aplicable = vigente en la fecha de corte del periodo. Sin prorrateo.
- NIT = llave del cliente (solo dígitos, DV módulo 11). La visita apunta a una SEDE.
- Consecutivos: constancia y recibo los asigna el celular desde rangos por DISPOSITIVO; planilla y acta el servidor. Sin números provisionales.
- RECIBO DE CAJA solo si el cliente tiene factura registrada (factura_helisa) con saldo de referencia > 0; se aplica a facturas concretas sin superar el saldo. Tipos: anticipo, abono, pago_factura, pago_total.
- ARCHIVOS PLANOS: el sistema termina en el archivo (FV desde el RH, RC desde el recibo) y en registrar lo que Helisa devuelve (FVE, recibo definitivo, importado/rechazado). Nada de contabilidad propia. Un documento entra en un solo archivo vigente; un archivo importado es inmutable; la plantilla es dato (plantilla_plano), no código.
- Constancia y recibo: PDF generado UNA vez en el celular; el servidor verifica el SHA-256 y nunca lo regenera. Planilla, acta y reportes: solo servidor.
- Snapshot: visita_kilos y cierre_cliente_categoria copian nombre, tratamiento y dispositor del día.
- Todo POST/PUT desde la app lleva Idempotency-Key (UUID de la mutación). La respuesta se guarda y se repite.
- Auditoría de solo inserción para toda mutación de negocio.
- Fechas en UTC con zona America/Bogota; dinero numeric(14,2); kilos numeric(10,2).

## Convenciones
- TypeScript estricto. Zod en packages/shared es la fuente de verdad de DTOs; nada se valida dos veces a mano.
- Nombres de tablas y columnas en español snake_case (ver docs/schema.sql). Nombres de código en español camelCase para el dominio (visita, cierreCliente), inglés para infraestructura (repository, guard).
- Errores de dominio con código: VISITA_INMUTABLE, CLIENTE_PENDIENTE, RANGO_AGOTADO, CIERRE_FACTURADO, TARIFA_NO_VIGENTE, IDEMPOTENCIA_DUPLICADA, FACTURA_REQUERIDA, SALDO_EXCEDIDO, PLANTILLA_NO_APROBADA, ARCHIVO_IMPORTADO_INMUTABLE, ARCHIVO_NO_CUADRA.
- Pruebas: Vitest; cada regla de dominio tiene prueba unitaria; cada endpoint tiene prueba de contrato con la semilla.
- Commits en español, imperativo, cortos. PR pequeñas (< 400 líneas netas).
- No usar agent teams ni sesiones largas en cuentas Pro; Opus solo para planear.
```

---

## 2. Entregables de la fase 1

| # | Entregable | Cómo se verifica |
| --- | --- | --- |
| E1 | Repositorio con CI (lint, typecheck, test, build) verde | Badge en el README; PR de ejemplo |
| E2 | Base de datos migrada desde `schema.sql` + semilla Cofema | `pnpm db:seed` y consulta de `fn_liquidar` da 2.244.935 |
| E3 | API `/api/v1` con OpenAPI en pruebas | Colección de pruebas de contrato pasa |
| E4 | Panel web desplegado en pruebas y producción | URL con HTTPS; usuarios de Lucrecia y gerencia creados |
| E5 | APK firmado en la pista interna de Play (o APK directo) | Instalado en los celulares reales |
| E6 | PDF de constancia, planilla y recibo aprobados por la gerencia | Acta de aprobación de formatos |
| E7 | Correo automático y página de verificación funcionando | Correo recibido; QR verificado |
| E8 | Manuales (operario 1 página, oficina) y dos capacitaciones | Lista de asistencia |
| E9 | Acta de inicio de series y piloto en paralelo de un ciclo | Comparación cero diferencias; acta de aceptación |
| E10 | Documento de operación (runbook) y respaldo probado | Restauración en pruebas documentada |

---

## 3. Semilla de datos (obligatoria antes de la primera pantalla)

Fuente: `mockups/assets/data.js` (mismos IDs y cifras). Debe contener:

- Empresa Comserva con los datos maestros reales de los formatos; parámetros por defecto; series (planilla siguiente 22642, recibo 35652, acta 25677).
- 9 categorías con tratamiento y dispositor (Animales y Explosivos sin tratamiento, `en_acta=false`); 2 dispositores; tipos de novedad.
- Usuarios: Lucrecia (facturación), gerente (gerencia), 2 operarios (Dubeny conductor, Jesús auxiliar), 1 administrador; 2 dispositivos con rangos (constancias 1151–1200 y 1201–1250; recibos 35671–35700 y 35701–35730).
- 12 clientes activos con sede principal y tarifa vigente + 1 pendiente de validar (Droguería Nueva Esperanza). Cofema con tarifa 74.790 / 20 kg / 4.600 / 19 % / crédito 30 días y una tarifa anterior vencida.
- Periodos: agosto y septiembre 2026 cerrados; octubre abierto (27/09–26/10, ventana desde el 20).
- Visitas de septiembre (26, incluidas las 4 reales de Cofema: 5, 12, 19 y 22) en `en_cierre`; visitas de octubre con todos los estados: transmitida, cerrada en celular (1208, Funeraria Los Olivos), rechazada (1158, cliente pendiente), anulada con reemplazo (1154 → 1155), borrador, fallida (Dr. Ramírez), y una con 3,2 kg de Animales (Veterinaria Huellas).
- 6 recibos de caja (uno anulado con reemplazo), 2 actas de septiembre (una retenida), auditoría de ejemplo.
- Casos negativos para pruebas: cliente con kg < incluidos; tarifa que cambia el 15/10; visita con fecha 27/09 (debe caer en octubre); visita sin residuos; cliente sin visitas en octubre.

---

## 4. Épicas, historias y criterios (fase 1)

Formato: **ID · historia** → criterios de aceptación (Dado/Cuando/Entonces resumido) → notas técnicas. El orden de las épicas es el orden de construcción.

### Épica A · Cimientos (semana 1)
- **A1 · Monorepo y CI.** `apps/api`, `apps/web`, `apps/movil`, `packages/shared`, `packages/plantillas`, `infra/`. → CI verde en PR vacía; `pnpm test` corre en los tres paquetes.
- **A2 · Base de datos.** Migración inicial generada desde `schema.sql` (Drizzle `introspect` o migración SQL literal) + semilla. → `select * from fn_liquidar('basico_incluidos',74790,20,4600,0,19,413.85,4)` devuelve total 2244935.00; triggers de inmutabilidad probados (actualizar una visita cerrada falla).
- **A3 · Shared.** Esquemas Zod de: usuario, dispositivo, cliente, sede, tarifa, categoría, jornada, visita (+kilos, pesadas, novedades, fotos), recibo, entrega de efectivo, periodo, cierre, documento, mutación de sync. Funciones puras: `liquidar`, `calcularDV`, `numeroALetras`, `periodoDe(fecha)`, `tarifaVigente(cliente, fecha)`. → 100 % de pruebas unitarias en estas funciones, incluida la tabla de casos de la v4 §11.1.
- **A4 · Entornos.** Docker Compose de desarrollo (Postgres 18, Gotenberg, MinIO, Mailpit); Coolify con proyectos `pruebas` y `produccion`; variables documentadas en `infra/coolify/README.md`. → Despliegue de una API "hola" en pruebas desde GitHub Actions.

### Épica B · Identidad, dispositivos y series (semana 1–2)
- **B1 · Login y refresh (APP-01, OFI-09, RNF-06).** `POST /auth/login` devuelve access (15 min) + refresh rotativo por dispositivo; bloqueo tras 5 intentos; Argon2id. → Reutilizar un refresh usado revoca la familia.
- **B2 · Dispositivos (OFI-08, RNF-14).** `POST /dispositivos` en el primer login desde la app; baja desde el panel; al bajar, `rango_consecutivo.anulado_en` y la app borra su base en el siguiente `pull`. → Dos dispositivos del mismo operario reciben rangos distintos.
- **B3 · Series y rangos.** `POST /rangos/reservar {tipo}` transaccional (`select … for update`); tamaño por parámetro; exclusión de solapes probada. Panel: pantalla de series (acta de inicio de series: capturar último número en papel). → Reservar 100 bloques concurrentes nunca solapa.
- **B4 · Usuarios y roles (OFI-09).** CRUD de usuarios internos, restablecer clave, roles y guard por ruta. → Un operario que llama `GET /visitas` sin filtro propio recibe 403.

### Épica C · Maestros (semana 2–3)
- **C1 · Clientes y sedes (OFI-01).** CRUD con NIT normalizado y DV verificado; sede principal automática; responsables autorizados; estado pendiente de validar. → Crear cliente con DV incorrecto falla con mensaje claro; buscar por NIT con puntos encuentra el cliente.
- **C2 · Tarifas (OFI-03).** CRUD con vigencias sin solape (restricción en SQL + validación Zod); aviso si `vigente_desde` cae dentro de un periodo abierto; cambio de tarifa vigente notifica a gerencia (correo) y queda en auditoría; pantalla de validación con la FVE 25756. → Insertar una vigencia solapada falla.
- **C3 · Catálogos (OFI-04, OFI-05).** Categorías (con `en_acta`, tratamiento, dispositor), dispositores, vehículos, novedades, operarios (vencimiento del certificado). → Cambiar el nombre de una categoría no cambia `visita_kilos.nombre_snap` de visitas existentes.
- **C4 · Datos maestros y plantillas (OFI-06).** Empresa; plantillas por documento con textos y versión; logo y firma del gerente como archivos. → Un PDF generado registra `plantilla_id`.
- **C5 · Parámetros (OFI-07).** Tabla `parametro` editable con auditoría; caché en API con invalidación. → Cambiar `dia_corte` crea periodos nuevos con el corte nuevo sin tocar los cerrados.
- **C6 · Carga desde Excel (OFI-02).** Plantilla XLSX (hojas Clientes, Sedes, Tarifas); endpoint de simulacro que devuelve errores por fila; carga definitiva; auditoría con hash del archivo. → El archivo de prueba con un NIT repetido no carga nada y lista la fila.

### Épica D · Sincronización (semana 3–4) — cuenta Max
- **D1 · Pull.** `GET /sync/pull?desde=` devuelve catálogos cambiados (cursor por `actualizado_en`), bloques (activo y reserva), parámetros, plantillas, `version_minima`. → Un pull sin cambios devuelve 304 o lista vacía en < 200 ms.
- **D2 · Push idempotente.** `POST /sync/push` recibe lote ordenado `[{id, tipo, payload}]`; por cada mutación: si `sync_mutacion.id` existe → misma respuesta; si no, aplicar en transacción, auditar, guardar respuesta; errores de contrato → `rechazada` con motivo; errores inesperados → `cuarentena` (nunca 500 que bloquee la cola). → Reenviar el mismo lote tres veces produce una sola visita.
- **D3 · Archivos.** `POST /archivos/prefirmar`, `POST /archivos/confirmar` (verifica SHA-256 y tamaño). → Un PDF con hash distinto al declarado se rechaza y la visita queda `transmitida` con `evidencia_pendiente`.
- **D4 · Reloj.** El push incluye `hora_dispositivo` y `desfase_seg`; el servidor calcula `fecha_visita` corregida, marca `revision_reloj` si |desfase| > tolerancia y rechaza fechas futuras > 10 min. → Prueba con desfase de 2 h y de 48 h.
- **D5 · App: base local y outbox.** expo-sqlite + SQLCipher; tablas réplica; `outbox` FIFO; worker que corre al cerrar visita, cada 60 s y al abrir; estados visibles. → Prueba de modo avión de 72 h (Maestro): 10 visitas, 3 recibos, 6 fotos; al reconectar sube todo en orden.

### Épica E · App del operario (semana 3–7) — cuenta Max
- **E1 · Login, PIN y dispositivo (APP-01).** → Tras 15 min en segundo plano pide PIN; sin dispositivo registrado no sincroniza.
- **E2 · Jornada (APP-02).** Pantalla de inicio de jornada (vehículo, conductor, auxiliar) y fin de jornada con resumen y declaración de efectivo. → Sin jornada no se puede abrir visita.
- **E3 · Lista del día (APP-03, APP-04).** Sedes programadas, pendientes arriba, búsqueda. → Funciona en modo avión con catálogos de ayer.
- **E4 · Visita, paso kilos (APP-05, APP-06, APP-07).** 9 categorías agrupadas; pesadas múltiples; bolsas y guardianes; novedades; observaciones; alerta kg/bolsa > parámetro. → El total es siempre la suma; no se puede editar el total.
- **E5 · Evidencia (APP-08).** GPS con precisión; fotos comprimidas (máx. 3); sin GPS → motivo. → Fotos en cola aparte, solo wifi por defecto.
- **E6 · Aviso y firmas (APP-09, APP-10).** Aviso versionado por sede; responsables autorizados; resultados de firma; captura PNG; firma del operario. → No cierra sin firma del operario; sin firma del cliente exige motivo (y foto si se niega).
- **E7 · Resultados sin residuos y fallida (APP-11, APP-12).** → Fallida exige foto; ambas generan constancia y cuentan como intento.
- **E8 · Cierre y constancia (APP-13, DOC-01, DOC-05).** Resumen; número del bloque; PDF con `expo-print` desde `packages/plantillas/constancia`; SHA-256; QR con `/v/<token>` + 16 hex del hash; hoja de compartir; botón WhatsApp (`wa.me`); encola. → El hash del PDF compartido coincide con el que confirma el servidor.
- **E9 · Recibo de caja (APP-16, DOC-03) · v5.** Desde visita o desde cliente; **solo si el cliente tiene facturas registradas con saldo de referencia** (vienen en el pull como `facturas[]` con número, fecha, vencimiento y saldo); tipo (anticipo, abono, pago de factura, pago total de cartera); aplicación a una o varias facturas sin superar el saldo (pago total = todas con saldo); letras; firmas; PDF; alerta 100 UVT. Sin factura: pantalla que explica el bloqueo y no consume consecutivo. → Recibo sin visita se transmite y aparece en recaudo; el push de un recibo a un cliente sin factura vuelve `rechazada` con FACTURA_REQUERIDA.
- **E10 · Entrega de efectivo (APP-17).** Selección de recibos y total; estado pendiente de confirmación. → Recibo entregado ya no aparece como pendiente en la app.
- **E11 · Historial y anulación (APP-18).** Filtros; detalle; anular ≤ 30 min; solicitar anulación; reenviar constancia. → Anulación tras 31 min pide solicitud.
- **E12 · Versión mínima y cliente nuevo (APP-19, APP-15).** → App vieja sube lo pendiente y bloquea firmar; cliente nuevo queda pendiente y su visita se marca rechazada hasta validar.

### Épica F · Panel de operación (semana 4–7) — cuentas Pro
- **F1 · Shell, inicio y alertas (OFI-14).** Barra lateral idéntica al mockup; tarjetas del periodo abierto; lista «requiere atención»; bitácora de sincronización. → Cifras coinciden con la semilla (ver `mockups/panel/index.html`).
- **F2 · Bandeja de visitas (OFI-10, OFI-11).** Filtros; detalle con kilos, novedades, fotos, mapa, horas, firmas, auditoría; anular con motivo; aprobar o rechazar solicitudes; reprocesar rechazadas. → Anular una visita `en_cierre` de un cierre facturado está bloqueado y explica el ajuste.
- **F3 · Validar o fusionar clientes (OFI-12).** → Fusionar reasigna visitas y recibos y queda en auditoría; la visita 1158 pasa a transmitida al validar.
- **F4 · Recaudo y entregas (CAJ-01, CAJ-02, CAJ-03) · v5.** Recaudo por día/periodo/operario; confirmar entregas; consignación; bandeja de recibos exportados sin recibo definitivo; registrar número y fecha del recibo definitivo de Helisa (recibo → cruzado; baja el saldo de referencia); alertas. → Diferencia calculada y visible; recibo sin definitivo listado.
- **F5 · Programación semanal (OFI-13).** Lista de la semana; reprogramar con motivo; visitas adicionales; alerta de frecuencia. → Festivo movido no genera alerta de «sin visita».
- **F6 · Auditoría (OFI-15).** Consulta por entidad y usuario. → La tabla no admite UPDATE/DELETE (prueba).

### Épica G · Cierre, documentos y Helisa (semana 6–9) — cuentas Pro
- **G1 · Periodos y pre-cierre (CIE-01).** Creación automática de periodos; vista `v_pre_cierre`; pantalla con bloqueos y avisos; cerrar con bloqueos exige confirmación de gerencia (registro). → Con la semilla de octubre lista 1 en celular, 1 rechazada, 1 borrador, 1 pendiente, 2 sin visita.
- **G2 · Cierre por cliente y general (CIE-02, CIE-03).** Transacción: suma, tarifa vigente al corte copiada, categorías con ceros, liquidación, `cierre_cliente_visita`, visitas → `en_cierre`, número de planilla. → Septiembre: Cofema 413,85 kg y $2.244.935; una visita no puede estar en dos cierres.
- **G3 · Planilla mensual (CIE-04, DOC-02).** Plantilla HTML (ver `mockups/documentos/planilla.html`) → Gotenberg → R2 → `documento` con hash y token. → Totales por categoría coinciden con el cierre; incluye filas de sin residuos y fallidas.
- **G4 · Registro de FVE y reporte de contingencia (CIE-05, HEL-05) · v5.** `POST /cierres/:id/facturar {numero, fecha, vence, total_helisa}` crea `factura_helisa`, marca diferencia > $1 para revisión, pasa el cierre a facturado y bloquea reapertura; si el cierre está en un archivo FV, lo marca importado cuando todos sus cierres tienen FVE. Reporte de cierre A (XLSX con SheetJS y PDF) como contingencia, sin cambios. → Registrar FVE habilita el recibo de caja del cliente en el siguiente pull.
- **G9 · Archivos planos:** ver la sección 10 (épica G′), que se construye en las semanas 7–9 en paralelo con G4–G8.
- **G5 · Fuera de cierre y reapertura (CIE-06).** Visita que llega con fecha dentro de un cierre cerrado → `visita_fuera_cierre`; reabrir (no facturado) anula planilla y reemite. → Caso: visita del 24 sincronizada el 28.
- **G6 · Verificación pública (DOC-05).** `GET /v/:token` en la web, sin login, datos mínimos, estado y reemplazo. → QR de constancia anulada muestra «anulada» y el nuevo número.
- **G7 · Correo automático (DOC-06).** Al transmitir constancia, fallida, recibo y al generar planilla: correo con PDF y enlace; webhooks de entrega y rebote en `notificacion`. → Mailpit recibe el correo en pruebas en < 60 s.
- **G8 · Impresión de contingencia (DOC-08).** Botón de PDF con espacio de firma manuscrita en planilla y constancia. → Verificado por gerencia.

### Épica H · Calidad, despliegue y piloto (semana 8–12 + 4 de piloto)
- **H1 · Pruebas.** Unitarias (shared), SQL (triggers, fn_liquidar, exclusión), API (contratos con semilla, idempotencia), app (Maestro: flujo completo offline), web (Playwright: cierre de septiembre). → Cobertura de reglas de dominio 100 %; CI < 10 min.
- **H2 · Seguridad.** Revisión OWASP ASVS L1; `pnpm audit` limpio; URLs firmadas; enmascarado de documentos en PDF al cliente. → Lista de verificación firmada.
- **H3 · Producción.** Coolify producción; dominio de Comserva; R2; Brevo con SPF/DKIM/DMARC; respaldos diarios a R2 y prueba de restauración; Sentry y UptimeRobot. → Restauración en pruebas documentada en `docs/runbook.md`.
- **H4 · APK y celulares.** Build de release firmada; pista interna de Play (cuenta de organización) y APK de respaldo; instalación en los celulares reales; prueba en campo con un operario. → Operario completa una visita real de prueba sin ayuda.
- **H5 · Capacitación y manuales.** Manual de operario (1 página ilustrada), manual de oficina, 2 sesiones. → Lista de asistencia.
- **H6 · Acta de inicio de series y piloto.** Capturar últimos números en papel; congelar; abrir series digitales; un ciclo de corte en paralelo con ≥ 5 clientes y 2 operarios; comparación al cierre. → Cero diferencias en kilos; ≤ $1 por redondeo en valor; acta de aceptación.

---

## 5. Contratos clave de la API (resumen; detalle en OpenAPI)

```
POST /api/v1/auth/login            {email, clave, dispositivo?} → {access, refresh, usuario}
POST /api/v1/auth/refresh          {refresh} → {access, refresh}
GET  /api/v1/sync/pull?desde=ISO   → {catalogos:{clientes,sedes,responsables,tarifas,categorias,vehiculos,parametros,plantillas}, rangos:[{tipo,desde,hasta,siguiente,rol:'activo'|'reserva'}], version_minima, hora_servidor}
POST /api/v1/sync/push             [{id, tipo, payload, hora_dispositivo, desfase_seg}] → [{id, resultado:'aplicada'|'duplicada'|'rechazada'|'cuarentena', entidad_id?, estado?, motivo?}]
POST /api/v1/rangos/reservar       {tipo:'constancia'|'recibo'} → {desde, hasta}
POST /api/v1/archivos/prefirmar    {id, tipo, mime, bytes, sha256, entidad:{tipo,id}} → {url, expira_en}
POST /api/v1/archivos/confirmar    {id} → {ok, sha256_verificado}
GET  /api/v1/visitas?periodo=&estado=&operario=&cliente=&resultado=&q=  → página
POST /api/v1/visitas/:id/anular    {motivo} · POST /visitas/:id/solicitar-anulacion {motivo} · POST /visitas/:id/reprocesar
GET  /api/v1/periodos/:id/pre-cierre → {bloqueos:[...], avisos:[...]}
POST /api/v1/periodos/:id/cerrar   {confirmacion_gerencia?: {usuario_id, nota}} → resumen
POST /api/v1/cierres/:id/cerrar · POST /cierres/:id/reabrir {motivo} · POST /cierres/:id/facturar {fve, fecha, vence}
POST /api/v1/periodos/:id/reporte-cierre → {xlsx_url, pdf_url}
POST /api/v1/cierres/:id/planilla  → documento
GET  /api/v1/v/:token (público, en la web) → {tipo, consecutivo, fecha, cliente, kg_total, estado, reemplazo, sha256}
```

Tipos de mutación del push: `jornada.iniciar`, `jornada.cerrar`, `visita.cerrar` (payload completo con kilos, pesadas, novedades, firmas como ids de archivo, pdf_id, hash), `visita.anular`, `visita.solicitar_anulacion`, `recibo.emitir`, `recibo.anular`, `entrega.declarar`, `cliente.crear_pendiente`, `sede.crear_pendiente`, `foto.registrar`, `rango.reportar_siguiente`.

---

## 6. Plantillas de documentos

Las plantillas HTML de `mockups/documentos/` son el punto de partida de `packages/plantillas`. Reglas:

- Función pura `render(nombre, datos, opciones) → string` sin acceso a red; imágenes en base64; CSS de impresión A4 (planilla apaisada).
- Campos obligatorios de la constancia (Manual Res. 591/2024, 4.2.2.1): kilos por categoría; razón social, NIT y dirección del generador; fecha y hora; NIT y razón social de Comserva; placa; conductor (nombre y documento); gestor de destino por categoría; observaciones; nombres, identificación (enmascarada) y firmas de quien entrega y quien transporta; número; QR; versión de plantilla.
- Recibo: leyenda «Recibo de caja provisional. No es factura de venta ni documento equivalente; la factura electrónica se emite al cierre del periodo».
- Planilla: encabezado y columnas del formulario RHPS real; filas de sin residuos (0 kg) y fallidas (motivo); total por categoría; espacio para firma física en la versión de contingencia.
- Hash: SHA-256 del archivo PDF final; en el QR, `https://<dominio>/v/<token>` y los 16 primeros caracteres del hash impresos como texto.

---

## 7. Definición de terminado (por historia)

1. Código con tipos estrictos y esquema Zod compartido.
2. Pruebas unitarias de reglas y prueba de contrato o de pantalla según aplique; CI verde.
3. Mockup y comportamiento coinciden (o el mockup se actualiza y se anota por qué).
4. Auditoría registrada para toda mutación de negocio.
5. Revisión por otra persona del equipo; sin TODO sin ticket.
6. Documentación mínima: OpenAPI actualizado o nota en `docs/decisiones.md` si hubo decisión.

---

## 8. Plan por semanas (indicativo, tres personas a tiempo parcial)

| Semana | Max (app y sync) | Pro 1 (API y datos) | Pro 2 (panel, PDF, pruebas) |
| --- | --- | --- | --- |
| 1 | A1, A3 (shared) | A2, A4, B1 | Mockups → componentes base del panel |
| 2 | B2, B3, D1 | B4, C1, C2 | C3, C4, C5 (pantallas) |
| 3 | D2, D3, D4, D5 (base local) | C6, pruebas de contrato | F1, F6 |
| 4 | E1, E2, E3 | Módulo visitas (consultas) | F2 |
| 5 | E4, E5 | Módulo recibos y caja | F3, F4 |
| 6 | E6, E7 | G1 (pre-cierre) | F5, plantillas de PDF |
| 7 | E8 (constancia, hash) | G2 (cierre), G5 | G3 (planilla), G6 |
| 8 | E9, E10 | G4 (reporte A) | G7 (correo), G8 |
| 9 | E11, E12, pulido | H2 seguridad | H1 pruebas E2E |
| 10 | H4 APK y celulares | H3 producción | H5 manuales |
| 11–12 | Corrección tras pruebas con operario; revisión de PRs | Datos reales (carga Excel) | Capacitación |
| 13–16 | Piloto en paralelo (soporte, correcciones menores) | Piloto | Piloto y acta de aceptación |

Si el equipo trabaja a tiempo completo, las semanas 1 a 12 se comprimen a 7 u 8 (el límite pasa a ser la capacidad de las cuentas Pro; ver *Estimación v1*).

---

## 10. Épica G′ · Archivos planos hacia Helisa (v5, semana 7–9) — cuenta Pro 1 con revisión de la Max

Traduce la sección 12 y los requerimientos HEL-01 a HEL-07 de la v5. Modelo de datos en `arquitectura/schema_v5_archivos_planos.sql` (se ejecuta después de `schema.sql`; validar en el contenedor antes de migrar).

- **G′1 · Catálogo de campos exportables (HEL-07).** Tabla `campo_exportable` + resolvedor `resolverCampo(clave, contexto)` en `packages/shared/planos/campos.ts` con contexto `{plantilla, periodo, cliente, rh, recibo, aplicacion, linea, documento}`; prueba por clave con los datos de Cofema. → Toda clave del catálogo resuelve; una clave desconocida falla en la validación de la plantilla, nunca al generar.
- **G′2 · Plantillas (HEL-03).** CRUD de `plantilla_plano`, `plantilla_plano_columna` y `plantilla_plano_linea` con Zod compartido; estados borrador → aprobada (Gerencia, con `vigente_desde`) → retirada; una sola aprobada vigente por tipo; copiar versión; comparar dos versiones; auditoría de cada cambio. Semilla: versiones 1 de FV y RC «espejo del CSV» con cuentas `-EJEMPLO` que impiden aprobar. → Aprobar una plantilla con una cuenta `-EJEMPLO` o una clave desconocida falla con PLANTILLA_NO_APROBADA.
- **G′3 · Motor de generación.** Función pura `generarPlano(plantilla, documentos) → {filas, lineas, totales, errores}` en `packages/shared/planos/generar.ts`: por cada RH o recibo produce las líneas de la plantilla (omitir en cero, F y N), aplica formato de fecha, decimales, mayúsculas, tildes, anchos; escritores `.xls` (BIFF8 con SheetJS `bookType: 'biff8'`), `.csv` y `.txt`; validaciones: cuadre por documento, DV, `existe_en_helisa`, FVE registrada en cada aplicación (RC), codificación. → Con el cierre de Cofema produce 4 líneas, débitos = créditos = 2.244.935,00; con el recibo 35672 de $500.000 produce 2 líneas con DOC FUENTE `FVE25756`; un cliente sin DV correcto devuelve error con el documento y la causa.
- **G′4 · Archivo FV (HEL-01).** `POST /planos/fv {periodo_id, cierre_ids?}` → `archivo_plano` + líneas + binario en R2 con SHA-256; cierres → `exportado` y `archivo_plano_id`; regenerar anula el anterior si no está importado; `GET /planos/:id/descargar` (URL firmada, marca descargado). → Generar dos veces el mismo periodo deja un solo archivo vigente; un cierre facturado no se vuelve a exportar.
- **G′5 · Archivo RC (HEL-02).** `POST /planos/rc {periodo_id?, recibo_ids?}` con los recibos emitidos (o entregados, según parámetro) sin exportar; recibos → `exportado`. → Un recibo con una aplicación sin `factura_id` no entra y se lista.
- **G′6 · Resultado de la importación (HEL-04).** `POST /planos/:id/importado {fecha}` · `POST /planos/:id/rechazado {errores}` (documentos vuelven a cerrado / entregado) · automático al registrar FVE o recibo definitivo de todos los documentos; bandeja por estado; detalle por línea; trigger de inmutabilidad probado. → Marcar rechazado y regenerar produce consecutivo siguiente.
- **G′7 · Pantallas del panel.** Configurador (lista de plantillas, editor de columnas ordenable, editor de líneas, vista previa con Cofema, archivo de prueba, aprobar, comparar), bandeja de archivos (generar FV / RC, descargar, marcar importado o rechazado, ver líneas), registro de FVE por cierre y de recibo definitivo por recibo. Mockups pendientes: hacerlos antes de la pantalla (`mockups/panel/planos.html`). → Cambiar separador y cuenta en el configurador y regenerar produce un archivo distinto sin tocar código.
- **G′8 · Sync (D1/E9).** El pull entrega `facturas[]` por cliente (número, fecha, vence, saldo de referencia) y el catálogo `tipos_recibo`; el push valida FACTURA_REQUERIDA y SALDO_EXCEDIDO. → Un recibo capturado sin señal a un cliente cuya factura se anuló entre tanto vuelve rechazado con motivo.

Contratos nuevos (resumen):

```
GET  /api/v1/planos/plantillas?tipo=            → [{id, tipo, version, estado, vigente_desde, ...}]
POST /api/v1/planos/plantillas · PUT /planos/plantillas/:id · POST /planos/plantillas/:id/aprobar · POST /planos/plantillas/:id/copiar
POST /api/v1/planos/plantillas/:id/previsualizar {periodo_id} → {filas, errores}   (archivo marcado PRUEBA)
POST /api/v1/planos/fv {periodo_id, cierre_ids?} · POST /planos/rc {periodo_id?, recibo_ids?} → archivo_plano
GET  /api/v1/planos?tipo=&estado=&periodo= · GET /planos/:id · GET /planos/:id/lineas · GET /planos/:id/descargar
POST /api/v1/planos/:id/importado {fecha} · POST /planos/:id/rechazado {errores}
POST /api/v1/cierres/:id/facturar {numero, fecha, vence, total_helisa} → factura_helisa
POST /api/v1/recibos/:id/cruzar {numero_helisa, fecha}
```

Semilla adicional: `factura_helisa` para los cierres de septiembre (Cofema FVE 25756 por 2.244.935), un recibo de octubre aplicado a esa factura, un cliente sin factura (para probar el bloqueo) y un cliente marcado `existe_en_helisa = false`.

El plan por semanas (sección 8) no cambia de forma: G′ ocupa a Pro 1 en las semanas 7–9 (donde antes estaba G4 y el módulo de recibos se simplifica) y suma ≈ 60 h a la estimación de la fase 1; actualizar la *Estimación v1* cuando se confirme la plantilla de Helisa.

---

## 9. Riesgos de ejecución y cómo se vigilan

- **Cola de la app bloqueada por un error no manejado:** toda excepción en el push va a cuarentena; prueba automática con un payload corrupto.
- **Dos generadores de PDF divergentes:** una sola función `render`; prueba visual comparativa en CI (captura de constancia móvil y servidor).
- **Drift entre mockup y producto:** revisión semanal de 30 minutos con los mockups abiertos.
- **Consumo de las cuentas Claude:** anotar `/usage` diario la semana 1; si una cuenta Pro se bloquea más de dos veces por semana, subirla a Max 5x o activar créditos con tope.
- **Datos reales tarde:** la fase 1 se desarrolla y prueba con la semilla; la carga real es el último paso antes del piloto.
- **Plantilla de Helisa que no llega o llega distinta:** el motor y el configurador se construyen contra la plantilla espejo del CSV; cuando llegue la oficial se ajusta en el configurador (sin código) y se repite la importación de prueba. Si Helisa no acepta importar facturas, G4 (reporte de contingencia) ya está hecho y G′4 queda sin uso.
