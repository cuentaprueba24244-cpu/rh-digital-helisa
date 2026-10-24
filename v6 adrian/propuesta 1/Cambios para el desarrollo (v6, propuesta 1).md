# Cambios para el desarrollo · v6 · Propuesta 1

**RH digital Comserva · Propuesta 1 «RH digital hasta Helisa» (pedidos y recibos) · versión 1.0 · 22 de octubre de 2026**

Documento técnico **interno del equipo** (no lleva precios). Traduce la Propuesta 1 de la v6 a cambios concretos sobre:

- `SPEC.md` v1.1 (19 oct 2026): épicas A–H y G′, contratos, semilla, plan por semanas.
- `arquitectura/schema.sql` v1.0 y `arquitectura/schema_v5_archivos_planos.sql` (anexo v5).
- `arquitectura/Arquitectura tecnica Comserva (v1).md` (sección 3.7, salida hacia Helisa).

No reemplaza esos documentos: dice qué cambia en cada uno. Cuando Comserva apruebe la propuesta y lleguen los formatos oficiales, este contenido se funde en un SPEC v2.0 y en un anexo SQL v6 validado. Los requerimientos de negocio están en `v6 adrian/propuesta 1/Levantamiento de requerimientos Comserva (v6, propuesta 1).html`; si un ID o una regla de este documento no coincide con el levantamiento, manda el levantamiento.

**Marcas que se usan:** **[Visto 21-oct]** = se vio en pantalla o se dijo en la reunión del 21 de octubre de 2026 · **[Oficial]** = página oficial de Helisa · **[Inferencia]** = conclusión del equipo · **por confirmar** = nadie lo ha confirmado todavía. Todo el DDL de la sección 5 es **orientativo, no ejecutado: validar** en el contenedor de PostgreSQL 18 antes de migrar.

---

## 0. Lo esencial

1. **El archivo de factura de la v5 desaparece.** Helisa no importa facturas: importa **pedidos** [Visto 21-oct]. Del cierre (RH con valores) sale un **archivo de pedidos (OP)**: 24 campos, **sin cuentas, sin naturaleza y sin IVA**, TXT separado por «|», sin fila de títulos, en **Windows-1252 (ANSI)**. Un pedido por cierre de cliente (o de sede facturable) y periodo; un archivo lleva muchos pedidos.
2. Lucrecia importa los pedidos y **elabora cada FVE en Helisa llamando el pedido** («Documento previo Pedidos», **F3**). La factura electrónica la sigue emitiendo Helisa, una a una.
3. La **FVE se registra en el sistema** (número, fecha, total y CUFE si se tiene) y se valida contra el RH (± $1) por una de tres vías: lectura automática por Conekta, carga del listado de facturas exportado de Helisa (formato por confirmar) o digitación en el panel.
4. El **recibo** sigue siendo un **movimiento contable (RC)**: caja o bancos contra cartera 1305, documento cruce = prefijo y número de la FVE, y **cada línea en los dos libros (F y N)**. La plantilla de 22 columnas de la v5 se conserva solo para el recibo.
5. **Tres esquemas de tarifa en la Fase 1:** básico + kilos incluidos + kilos adicionales (Cofema), **solo por kilo** (FVE 25997) y **cobro fijo mensual**.
6. **Tabla de equivalencias** (dato, no código): componente de tarifa o categoría → concepto de Helisa y lista de precio; cliente o sede → código del cliente en Helisa. Más una **tabla de cuentas** en los dos libros para el recibo.
7. **Módulo de trazabilidad** visible (épica nueva **TRZ**, TRZ-01 a TRZ-06).
8. **Modalidades:** **1A · archivos planos** (base) y **1B · API Helisa Conekta** (opcional; épica nueva **API**). Aun con API, la factura en Helisa sigue siendo una a una.
9. La Fase 1 **deja lista la Fase 2** de la Propuesta 2 (si algún día se contrata): catálogo de conceptos, datos fiscales opcionales del cliente, motor contable con libros F y N, `modo_facturacion` en el cierre y liquidación con el mismo redondeo de Helisa.
10. **Esfuerzo (brief v6):** Fase 0 + Fase 1 en modalidad 1A = **630 h** (rango 560–720); conector Conekta (1B) = **70 h** (60–90). Calendario: Fase 0 en paralelo (≈ 2 semanas); Fase 1 ≈ **14 semanas a tiempo parcial** (≈ 6 a tiempo completo) + **4 semanas de piloto** = **≈ 18 semanas a tiempo parcial** (≈ 10 a tiempo completo); Conekta suma **1,5 semanas** a tiempo parcial (≈ 0,7 a tiempo completo).

---

## 1. Nomenclatura de la v6 y lo que no cambia

**Fases.** Fase 0 · Definición. Fase 1 · Núcleo hasta Helisa (= Propuesta 1). Fase 2 · Facturación electrónica (solo existe en la Propuesta 2).

**Complementos (equivalencia con la v5, se explica una sola vez).** La antigua *fase 2* de la v5 (acta digital con firma del gerente, portal del cliente, marca de pagos por otro medio y regla «al día», ajustes a periodos facturados, reporte ambiental) pasa a ser el complemento **C1 · Acta y portal**; de esa antigua fase, la cartilla de terceros (HEL-06) sube a la Fase 1, porque Helisa exige que el cliente exista con su código antes de importar cualquier documento. La antigua *fase 3* (cierre de caja formal, WhatsApp por API, reportes operativos, entregas a dispositores) pasa a ser **C2 · Caja formal y mensajería**. Los dos se pueden contratar después, en cualquiera de las dos propuestas. En los comentarios de `schema.sql`, la marca «(F2)» se lee ahora «(C1)» y «(F3)» se lee «(C2)»; esas tablas se siguen creando desde el inicio para no migrar después.

**IDs de requerimientos.** Se conservan los de la v5 (APP-, OFI-, CAJ-, CIE-, HEL-, DOC-, POR-, REP-, RNF-) y se agregan **TRZ-** (trazabilidad) y **API-** (Conekta). Los IDs son los de la sección 13 del levantamiento de la Propuesta 1, que manda: HEL-01 a HEL-07 (HEL-06, la cartilla de terceros, en la Fase 1), **OFI-16** (tabla de equivalencias, historia C7), **TRZ-01 a TRZ-06** (épica TRZ), **API-01 a API-08** (épica API, solo 1B), **RNF-17** (codificación Windows-1252 y normalización de textos: A3, G′3, prueba R4) y **RNF-18** (integración con Conekta: épica API y H2).

**Lo que no cambia.** El trabajo en campo y la app (épicas D y E, salvo un detalle de E9), las series y rangos (B2, B3), la constancia y el recibo en PDF, la verificación por QR, el correo automático, la seguridad, la infraestructura y la regla «recibo solo con factura registrada».

---

## 2. Resumen de cambios por documento base

| Documento | Qué cambia en la Propuesta 1 | Tipo |
| --- | --- | --- |
| `SPEC.md` §1 (CLAUDE.md) | Reglas de pedido sin cuentas, Windows-1252, separador, tres esquemas, equivalencias, código de cliente Helisa, recibo F/N, Conekta, trazabilidad, `modo_facturacion`; 16 códigos de error nuevos (sección 3) | Δ |
| `SPEC.md` §2 Entregables | E2, E9 cambian; nuevos E11 (importación de prueba en Fase 0), E12 (Conekta, solo 1B), E13 (trazabilidad) | Δ |
| `SPEC.md` §3 Semilla | Parámetros de Helisa, conceptos y equivalencias de prueba, clientes por kilo y de cobro fijo, códigos de cliente, cuentas F/N de ejemplo, fixtures de Conekta | Δ |
| `SPEC.md` §4 Épicas | Épica 0 nueva (Fase 0); A2, A3, A4, B4, C1, C2, C4–C6, D1, E9, F1, F4, G1–G5, H1, H3, H6 cambian; C7 nueva; épicas nuevas TRZ y API | Δ / + |
| `SPEC.md` §5 Contratos | Endpoints de catálogos Helisa, equivalencias, pedidos, carga de FVE, trazabilidad e integración (sección 6) | + |
| `SPEC.md` §6 Plantillas | Pie de liquidación de la planilla por esquema; hoja de trabajo para facturar una a una; índice del expediente | Δ / + |
| `SPEC.md` §7 Definición de terminado | Tres puntos nuevos (sección 4.9) | Δ |
| `SPEC.md` §8 Plan | 14 semanas + 4 de piloto; Fase 0 en paralelo; bloque Conekta de 1,5 semanas (sección 8) | Δ |
| `SPEC.md` §9 Riesgos | Riesgos nuevos de formato, codificación, Conekta y facturación una a una (sección 9) | Δ |
| `SPEC.md` §10 Épica G′ | El archivo FV pasa a ser **archivo de pedidos OP**; dos familias de plantilla; RC con libros F y N; resultado por pedido; la cartilla de terceros (HEL-06) sube a la Fase 1 | Δ mayor |
| `schema.sql` | `fn_liquidar` con `fijo_mensual` y error en esquemas no soportados; columnas nuevas en `cliente`, `sede`, `tarifa`, `cierre_cliente`; tipos nuevos | Δ |
| `schema_v5_archivos_planos.sql` | `tipo_plano` + 'OP'; líneas de plantilla sin cuenta para pedidos; check de cuadre; `factura_helisa` con prefijo, consecutivo, CUFE y origen; semillas OP v1 y RC v2 | Δ |
| Anexo nuevo v6 (sección 5.3) | `concepto_helisa`, `lista_precio_helisa`, `equivalencia_concepto`, `cuenta_contable`, `cliente_fiscal`, `pedido_helisa`, `pedido_helisa_linea`, `factura_carga`, `integracion_envio`, vistas de trazabilidad | + |
| Arquitectura v1 §3.7 | La interfaz `SalidaHelisa` se reemplaza por exportadores puros + `CanalHelisa` (archivo o Conekta); el camino A queda como contingencia; el camino C se usa para el recibo desde la Fase 1 | Δ |

---

## 3. CLAUDE.md propuesto (v6, Propuesta 1)

Reemplaza el bloque de la sección 1 del SPEC. Sigue por debajo de 200 líneas.

```markdown
# RH digital Comserva

Sistema para Comserva S.A.S. (Florencia, Caquetá): app Android del operario (Expo), API (NestJS + PostgreSQL 18), panel web (React + Vite). Español en código de dominio y en la interfaz. Documentos de referencia en docs/ (levantamiento v6 propuesta 1, arquitectura, schema.sql + anexos v5 y v6, SPEC.md, mockups_v6/).

## Comandos
- pnpm i · pnpm dev (api + web) · pnpm --filter movil start
- pnpm test · pnpm lint · pnpm typecheck
- pnpm db:migrate · pnpm db:seed (Cofema septiembre 2026, cliente por kilo, clientes de cobro fijo y datos de prueba)
- pnpm planos:prueba --periodo 2026-09 --cliente <nit> (genera el TXT de pedidos y el RC de prueba sin cambiar estados)
- docker compose -f infra/docker-compose.dev.yml up -d (Postgres, Gotenberg, MinIO, Mailpit)

## Reglas del dominio (no negociables)
- La VISITA es la única captura. Solo kilos; nunca pesos en la visita.
- Lo firmado no se edita: se anula con motivo y se emite otro documento enlazado.
- Esquemas de tarifa de la fase 1: basico_incluidos, por_kilo y fijo_mensual. por_visita existe en el modelo, pero el cierre lo rechaza (ESQUEMA_TARIFA_NO_SOPORTADO).
- Fórmula. basico_incluidos: adic = max(0, round(kg − incluidos, 2)); valorAdic = round(adic × precioKg, 2); subtotal = basico + valorAdic. por_kilo: adic = round(kg, 2); valorAdic = round(adic × precioKg, 2); subtotal = valorAdic. fijo_mensual: subtotal = basico (el valor fijo; los kilos solo van al RH). En todos: iva = round(subtotal × ivaPct/100, 2); total = subtotal + iva. Half-up a 2 decimales, decimal.js, nunca float. Una sola implementación: packages/shared/liquidacion.ts y fn_liquidar() en SQL.
- Regresión obligatoria: Cofema sept 2026 = 413,85 kg → $2.244.935 (básico 74.790, 20 kg incluidos, 4.600 $/kg, IVA 19 %). Solo por kilo = 108,50 kg × $3.991,60 → subtotal 433.088,60, IVA 82.286,83, total $515.375,43. Cobro fijo = 25.000 → $29.750 y 30.000 → $35.700.
- El IVA de la factura lo calcula Helisa por concepto: el IVA del RH es de referencia. La FVE registrada se compara con el total del RH; diferencia > $1 → requiere_revision (avisa, no bloquea).
- Periodo: del día siguiente al corte anterior hasta el corte (parámetro dia_corte=26). La visita pertenece al periodo por fecha_visita (hora del celular corregida con el desfase), nunca por fecha de sincronización.
- Tarifa aplicable = vigente en la fecha de corte del periodo. Sin prorrateo.
- NIT = llave del cliente (solo dígitos, DV módulo 11). La visita apunta a una SEDE. Punto facturable = el cliente o, si documentos_por_sede, cada sede. Cada punto facturable usa su código de cliente en Helisa (sede.codigo_helisa o cliente.codigo_helisa).
- EQUIVALENCIAS: cada componente de tarifa (basico, kg_adicionales, kg_total, fijo) se factura con el concepto de Helisa y la lista de precio de la tabla equivalencia_concepto aprobada y vigente al corte. Sin equivalencia o sin código de cliente no hay pedido (CONCEPTO_HELISA_FALTANTE, CLIENTE_SIN_CODIGO_HELISA). Las equivalencias y las cuentas son dato, nunca código.
- PEDIDO (OP): un pedido por cierre de punto facturable y periodo. Líneas tipo 2 (servicio: código de concepto, cantidad, valor unitario sin IVA) y tipo 3 (comentario: solo texto). NUNCA cuentas, naturaleza ni IVA. Suma de round(cantidad × unitario, 2) = subtotal del cierre (PEDIDO_NO_CUADRA). Un cierre tiene a lo sumo un pedido vigente. Un número de pedido nunca se reutiliza.
- ARCHIVOS PARA HELISA: Windows-1252 (ANSI) y CRLF. Un carácter fuera de Windows-1252 es error (CODIFICACION_INVALIDA) salvo que la plantilla quite tildes. Sin calificador de texto: ningún campo puede contener el separador; en textos libres se reemplaza con aviso y en códigos es error (SEPARADOR_EN_TEXTO). Pedido: TXT con «|», sin títulos, siempre 24 campos, fecha dd/mm/aaaa, sin separador de miles, cantidad con 2 decimales y punto decimal (por confirmar con la importación de prueba).
- RECIBO → movimiento contable RC: caja o banco (D) contra cartera 1305 (C) por cada FVE aplicada; documento cruce = prefijo + número de la FVE con el formato de la plantilla; cada línea en el libro F y en el libro N con el mismo Ind. Fiscal; débitos = créditos en cada libro (LIBROS_DESCUADRADOS). Las cuentas salen de cuenta_contable aprobada (CUENTA_CONTABLE_FALTANTE).
- El sistema termina en el pedido y en el RC (archivo o Conekta) y en registrar lo que Helisa devuelve (FVE, recibo definitivo, importado o rechazado). Nada de contabilidad propia. Un documento está en un solo archivo vigente o en un solo envío aceptado (DOCUMENTO_YA_ENVIADO). Un archivo importado es inmutable. Las plantillas son dato (plantilla_plano).
- RECIBO DE CAJA solo si el cliente tiene FVE registrada (factura_helisa) con saldo de referencia > 0; se aplica a facturas concretas sin superar el saldo. Tipos: anticipo, abono, pago_factura, pago_total.
- CONEKTA (modalidad 1B): todo envío pasa por la cola integracion_envio con clave de idempotencia. Un resultado incierto (tiempo agotado, sin respuesta) nunca se reintenta solo: primero se verifica. JSON UTF-8 sin caracteres especiales (normalizar). La llave HMAC vive solo en los secretos del entorno; nunca en la base, en logs ni en Sentry.
- TRAZABILIDAD: toda entidad de la cadena (visita, cierre, planilla, pedido, archivo o envío, FVE, recibo, RC, recibo definitivo) guarda quién y cuándo, y aparece en v_indice_busqueda. Un eslabón faltante se muestra como pendiente, nunca se oculta.
- Fase 2 preparada: cierre_cliente.modo_facturacion = 'helisa_pedido' en la fase 1. Un cierre con modo 'sistema_fe' nunca genera pedido (DOBLE_FACTURACION).
- Constancia y recibo: PDF generado UNA vez en el celular; el servidor verifica el SHA-256 y nunca lo regenera. Planilla, acta, reportes y expediente: solo servidor.
- Snapshot: visita_kilos y cierre_cliente_categoria copian nombre, tratamiento y dispositor del día; pedido_helisa_linea copia el código de concepto vigente al generar.
- Todo POST/PUT desde la app lleva Idempotency-Key (UUID de la mutación). La respuesta se guarda y se repite.
- Auditoría de solo inserción para toda mutación de negocio, incluidas descargas de archivos para Helisa.
- Fechas en UTC con zona America/Bogota; dinero numeric(14,2); kilos numeric(10,2); cantidades de pedido numeric(12,2).

## Convenciones
- TypeScript estricto. Zod en packages/shared es la fuente de verdad de DTOs; nada se valida dos veces a mano.
- Nombres de tablas y columnas en español snake_case (ver docs/schema.sql y anexos). Código de dominio en español camelCase (visita, cierreCliente, pedidoHelisa); infraestructura en inglés (repository, guard, queue).
- Exportadores (pedido, movimiento contable) = funciones puras en packages/shared/helisa; el canal (archivo o Conekta) vive en apps/api/src/helisa.
- Errores de dominio con código: VISITA_INMUTABLE, CLIENTE_PENDIENTE, RANGO_AGOTADO, CIERRE_FACTURADO, TARIFA_NO_VIGENTE, IDEMPOTENCIA_DUPLICADA, FACTURA_REQUERIDA, SALDO_EXCEDIDO, PLANTILLA_NO_APROBADA, ARCHIVO_IMPORTADO_INMUTABLE, ARCHIVO_NO_CUADRA, ESQUEMA_TARIFA_NO_SOPORTADO, CLIENTE_SIN_CODIGO_HELISA, CONCEPTO_HELISA_FALTANTE, PEDIDO_NO_CUADRA, CIERRE_NO_EXPORTABLE, PEDIDO_IMPORTADO, CODIFICACION_INVALIDA, SEPARADOR_EN_TEXTO, DOCUMENTO_YA_ENVIADO, CUENTA_CONTABLE_FALTANTE, LIBROS_DESCUADRADOS, FVE_DUPLICADA, DOBLE_FACTURACION, INTEGRACION_RECHAZADA, INTEGRACION_NO_DISPONIBLE, INTEGRACION_FIRMA_INVALIDA.
- Pruebas: Vitest; cada regla de dominio tiene prueba unitaria; cada endpoint tiene prueba de contrato con la semilla; cada archivo para Helisa tiene prueba de bytes.
- Commits en español, imperativo, cortos. PR pequeñas (< 400 líneas netas).
- No usar agent teams ni sesiones largas en cuentas Pro; Opus solo para planear.
```

### 3.1 Códigos de error de dominio nuevos

| Código | Cuándo se lanza | Dónde | HTTP |
| --- | --- | --- | --- |
| `ESQUEMA_TARIFA_NO_SOPORTADO` | Cierre de un cliente con tarifa `por_visita` (o cualquier esquema sin implementar) | `fn_liquidar` y servicio de cierre; aviso en pre-cierre | 422 |
| `CLIENTE_SIN_CODIGO_HELISA` | Generar el pedido de un punto facturable sin código de cliente en Helisa (cuando la plantilla marca la columna como obligatoria) o con `existe_en_helisa = false` | Motor de pedidos; bloqueo en pre-cierre | 422 |
| `CONCEPTO_HELISA_FALTANTE` | Un componente de la tarifa no tiene equivalencia aprobada y vigente, o el concepto tiene un código provisional (`PEND-…`) | Motor de pedidos; validador de equivalencias; pre-cierre | 422 |
| `PEDIDO_NO_CUADRA` | La suma de las líneas de servicio no es igual al subtotal del cierre | Motor de pedidos | 422 |
| `CIERRE_NO_EXPORTABLE` | Generar un pedido de un cierre que no está `cerrado` o que ya tiene pedido vigente | Trigger `trg_pedido_valida_cierre` y servicio | 409 |
| `PEDIDO_IMPORTADO` | Reabrir un cierre o anular un pedido que ya está en Helisa sin confirmar que se anuló allí | Trigger `trg_cierre_reapertura` y servicio | 409 |
| `CODIFICACION_INVALIDA` | Un texto tiene caracteres que no existen en Windows-1252 (o no ASCII, para Conekta) y la plantilla no los transforma | Escritor de archivos; serializador de Conekta | 422 |
| `SEPARADOR_EN_TEXTO` | Un código o identificador contiene el separador del archivo | Escritor de archivos | 422 |
| `DOCUMENTO_YA_ENVIADO` | Incluir en un archivo un documento que Conekta ya aceptó, o enviar por Conekta uno que está en un archivo vigente | Servicio de planos y cola de integración | 409 |
| `CUENTA_CONTABLE_FALTANTE` | Una línea del movimiento no encuentra cuenta aprobada para su uso, medio y libro | Motor de movimiento contable | 422 |
| `LIBROS_DESCUADRADOS` | Débitos ≠ créditos en un libro, o falta la línea espejo F/N de una línea (también el código 8 de Conekta) | Motor de movimiento contable; cola de integración | 422 |
| `FVE_DUPLICADA` | Registrar un prefijo y número de FVE ya registrado | API (índice único) | 409 |
| `DOBLE_FACTURACION` | Generar pedido de un cierre con `modo_facturacion = 'sistema_fe'` (solo posible con la Fase 2 de la Propuesta 2) | Trigger `trg_pedido_valida_cierre` | 409 |
| `INTEGRACION_RECHAZADA` | Conekta responde 202 o 400 (datos incorrectos, ya existe, faltan campos, códigos de cruce inválidos) | Cola de integración (queda en el envío, no en la petición del usuario) | — |
| `INTEGRACION_NO_DISPONIBLE` | Conekta no responde, o responde 423 o 500 después de agotar los reintentos | Cola de integración | — |
| `INTEGRACION_FIRMA_INVALIDA` | Conekta responde 401 (firma o llave incorrecta): se pausa la cola y se alerta al administrador | Cola de integración | — |

---

## 4. Épicas: qué cambia

Formato del SPEC: **ID · historia** → criterios de aceptación → notas. Leyenda: **=** sin cambio · **Δ** modificada · **+** nueva · **−** retirada.

### 4.0 Épica 0 · Fase 0, definición (semanas 1–2, en paralelo)

No es código, pero bloquea historias; sus horas están dentro de las 630 h.

| ID | Tarea | Criterio de terminado | Bloquea |
| --- | --- | --- | --- |
| 0.1 | Enviar la solicitud formal a Julio (formatos de pedido y recibo campo por campo, códigos, cuentas en los dos libros) | Solicitud enviada; fecha de respuesta acordada | G′2, G′3 |
| 0.2 | **Habilitar el documento Pedido en el Helisa de Comserva** (hoy no aparece en los tipos de documento) y conocer su código y si el número lo pone el archivo | Pantallazo del tipo creado; código anotado en el parámetro `helisa.tipo_pedido`; costo o licencia, si los hay, informados por Comserva | G′4, piloto |
| 0.3 | Recibir las estructuras oficiales de pedido y de recibo (Excel de Julio) | Semilla OP v1 y RC v2 ajustadas en el configurador, sin código nuevo | G′2 |
| 0.4 | Tabla de equivalencias (conceptos y lista de precio por componente) y tabla de cuentas del recibo en F y N, validadas por Julio | Cargadas como borrador; Gerencia las aprueba en C7 | C7, G′5 |
| 0.5 | Cartilla de clientes exportada de Helisa (NIT, código, códigos adicionales por sede, lista de precio) | Cargada con simulacro en C6; lista de clientes sin código | C6, G1 |
| 0.6 | **Importación de prueba con Cofema septiembre 2026** (pedido y recibo generados con `pnpm planos:prueba`) en una empresa de prueba o en Comserva sin guardar | Previsualización correcta y «Lista de errores» vacía; si se factura, gravado $1.886.500, IVA $358.435, total $2.244.935; recibo de $500.000 cruzado contra la FVE de prueba | E11 |
| 0.7 | Decisión escrita sobre Conekta (1A o 1B), con el titular de la licencia y del hosting de Helisa | Acta firmada por Comserva | Épica API |

### 4.1 Épica A · Cimientos

- **A1 · Monorepo y CI** **=**.
- **A2 · Base de datos** **Δ**. La migración inicial ejecuta `schema.sql`, el anexo v5 y el anexo v6 (sección 5.3) en tres pasos (los `ALTER TYPE … ADD VALUE` van en una migración propia). → `select * from fn_liquidar('basico_incluidos',74790,20,4600,0,19,413.85,4)` devuelve total 2244935.00; `fn_liquidar('por_kilo',0,0,3991.60,0,19,108.50,3)` devuelve subtotal 433088.60, IVA 82286.83 y total 515375.43; `fn_liquidar('fijo_mensual',25000,0,0,0,19,12.30,2)` devuelve 29750.00; `fn_liquidar('por_visita',…)` falla con ESQUEMA_TARIFA_NO_SOPORTADO; guardar una tarifa `por_kilo` con básico > 0 viola `ck_tarifa_esquema`; los triggers `trg_pedido_valida_cierre` y `trg_cierre_reapertura` tienen prueba.
- **A3 · Shared** **Δ**. Además de lo del SPEC: `liquidar()` con los tres esquemas; `lineasPedido(cierre, equivalencias, plantilla)`; `asientoRecibo(recibo, aplicaciones, cuentas, plantilla)` con libros F y N; `aWindows1252(texto, {quitarTildes})` que devuelve bytes o error; `normalizarAscii(texto)` (Conekta); `formatearNumeroHelisa(valor, plantilla)`; `formatearCruce(prefijo, numero, formato)`. Zod de concepto Helisa, equivalencia, cuenta contable, pedido y línea, envío de integración. → 100 % de pruebas en estas funciones, incluidos los tres casos de regresión y la prueba de bytes de la sección 7.
- **A3b · Script de prueba de planos** **+** (semana 1–2, para la Fase 0). `pnpm planos:prueba` arma el TXT del pedido y el RC de Cofema desde la semilla, sin tocar estados, con las funciones de A3. → El archivo de la tarea 0.6 sale de este script, no de Excel.
- **A4 · Entornos** **Δ**. Variables nuevas (solo 1B): `CONEKTA_URL`, `CONEKTA_ID`, `CONEKTA_KEY` como secretos de Coolify; la API se niega a arrancar la cola de Conekta si falta alguna. → Despliegue en pruebas sin las variables deja la integración «no configurada», sin error.

### 4.2 Épica B · Identidad, dispositivos y series

- **B1, B2, B3** **=**. La serie `pedido` la asigna el servidor (sin rangos de dispositivo).
- **B4 · Usuarios y roles** **Δ**. Permisos nuevos: generar y anular pedidos, registrar y cargar FVE (Facturación); aprobar equivalencias, cuentas y plantillas (Gerencia, después de la validación de Julio); ver trazabilidad y descargar expedientes (Facturación y Gerencia); configurar la integración (Administrador, sin ver la llave). → Un operario que llama `GET /trazabilidad/matriz` recibe 403.

### 4.3 Épica C · Maestros

- **C1 · Clientes y sedes (OFI-01)** **Δ**. Ficha con `codigo_helisa`, `razon_social_helisa`, `lista_precio_helisa` y `existe_en_helisa`; en la sede, `codigo_helisa` («código adicional» cuando el mismo NIT está creado varias veces en Helisa), obligatorio si el cliente factura por sede (`documentos_por_sede`). Pestaña **«Datos fiscales»** opcional (`cliente_fiscal`), que prepara la Fase 2. → Un cliente con `documentos_por_sede` y una sede sin código muestra aviso en la ficha y queda bloqueado en el pre-cierre; buscar por código Helisa encuentra al cliente.
- **C2 · Tarifas (OFI-03)** **Δ**. Tres esquemas con validación (`por_kilo`: básico = 0 y kilos incluidos = 0; `fijo_mensual`: el valor fijo va en «básico», kilos incluidos = 0 y precio del kilo = 0). Vista previa de la liquidación con un caso; pantalla de validación con tres facturas reales: FVE 25756 (Cofema, básico + kilos), FVE 25997 (por kilo, cliente de prueba) y una FVE de $29.750 (fijo). → Guardar una tarifa por kilo con básico > 0 falla con mensaje claro; la vista previa de 108,50 kg a $3.991,60 muestra $515.375,43.
- **C3 · Catálogos (OFI-04, OFI-05)** **Δ menor**. La categoría puede tener equivalencia propia si Comserva factura por categoría en kilos (concepto «BIOLÓGICOS (KILOGRAMOS)», etc.): **por confirmar con Julio**; el modelo lo admite con el componente `kg_categoria`, pero la Fase 1 no lo implementa en el motor salvo que se confirme.
- **C4 · Datos maestros y plantillas (OFI-06)** **Δ**. Parámetros de Helisa: tipo de documento del pedido (vacío hasta la tarea 0.2), identidad del vendedor, centro de costo, negocio, bodega y lista de precio por defecto. Valores vistos el 21 de octubre en el Helisa de Comserva: vendedor 828002730, centro de costo 0101, negocio 1, lista 2 «BASICA 30000» [Visto 21-oct]; si son constantes para todos los pedidos está **por confirmar**. → Cambiar el centro de costo cambia los pedidos que se generen después, no los ya generados.
- **C5 · Parámetros (OFI-07)** **Δ**. Nuevos: `helisa.*` (los de C4), `pedido.fecha` (`corte` o `generacion`; **por confirmar** si la fecha del pedido condiciona la de la FVE), `fve.tolerancia` (1), `conekta.limite_diario` (5.000) y `conekta.limite_mensual` (100.000) [Oficial].
- **C6 · Carga desde Excel (OFI-02)** **Δ**. Columnas nuevas en la plantilla XLSX (código Helisa, esquema, punto facturable). Además, **carga de las cartillas exportadas de Helisa** (clientes con código, conceptos, listas de precio) con simulacro: empareja por NIT y, para códigos adicionales, por nombre de la sede; lo ambiguo se lista para decidir. → Un archivo de prueba con un NIT que tiene dos códigos pide elegir sede por sede; no se carga nada hasta confirmar.
- **C7 · Tabla de equivalencias y de cuentas (OFI-16)** **+**. CRUD de conceptos Helisa, listas de precio, equivalencias (componente o categoría, y excepción por tarifa → concepto + lista + texto de la línea) y cuentas contables (uso, medio de pago, libro F o N); estados borrador → aprobada (Gerencia, con vigencia) → retirada; auditoría. Validador `GET /helisa/equivalencias/validar?periodo_id=` que lista lo que falta para facturar el periodo. → Con la semilla, el validador de septiembre devuelve 0 faltantes; al retirar la equivalencia de `kg_adicionales`, Cofema aparece como faltante; aprobar una cuenta que contiene «EJEMPLO» falla.

### 4.4 Épica D · Sincronización

- **D1 · Pull** **Δ menor** (ligado a G′8). `facturas[]` trae `prefijo`, `consecutivo` y `numero_mostrar` («FVE 25756»), además de fecha, vence y saldo de referencia.
- **D2–D5** **=**.

### 4.5 Épica E · App del operario

- **E9 · Recibo de caja (APP-16, DOC-03)** **Δ menor**. La lista de facturas muestra el número con prefijo. La regla y el bloqueo no cambian.
- **E1–E8, E10–E12** **=**.

### 4.6 Épica F · Panel de operación

- **F1 · Inicio y alertas (OFI-14)** **Δ**. Tarjetas nuevas: pedidos por importar, FVE por registrar, FVE con diferencia, recibos sin cruzar; acceso directo a la matriz de trazabilidad. → Las cifras coinciden con la semilla.
- **F4 · Recaudo y entregas (CAJ-01 a CAJ-03)** **Δ menor**. El recibo definitivo de Helisa se registra con su tipo (RC1 o RC2, **por confirmar** cuál se usa) y su número; en 1B se llena desde la respuesta de Conekta si la trae (**por confirmar**).
- **F2, F3, F5, F6** **=**.

### 4.7 Épica G · Cierre, documentos y Helisa

- **G1 · Periodos y pre-cierre (CIE-01)** **Δ**. Bloqueos nuevos: punto facturable sin código Helisa; componente sin equivalencia aprobada; tarifa con esquema no soportado. Aviso nuevo: cliente con tarifa fija o con básico que no tuvo visitas en el periodo (si se cobra igual está **por confirmar**). → Con la semilla de octubre aparecen los bloqueos del SPEC y además el cliente sin código Helisa de la semilla.
- **G2 · Cierre por cliente y general (CIE-02, CIE-03)** **Δ**. Cierre por punto facturable; liquidación con los tres esquemas; `modo_facturacion = 'helisa_pedido'`. → Septiembre: Cofema 413,85 kg y $2.244.935; octubre: cliente por kilo de prueba 108,50 kg y $515.375,43; cliente fijo $29.750 con cualquier cantidad de kilos.
- **G3 · Planilla mensual (CIE-04, DOC-02)** **Δ menor**. El pie de liquidación depende del esquema («108,50 kg × $3.991,60» en por kilo; «Valor fijo mensual» en fijo). → Totales iguales al cierre.
- **G4 · Registro de FVE y contingencia (CIE-05, HEL-05)** **Δ**. Tres vías: (a) digitación por cierre o por FVE que agrupa varios pedidos del mismo cliente (Helisa permite llamar varios pedidos en una factura [Visto 21-oct]); (b) **carga del listado de facturas exportado de Helisa** con emparejamiento automático (por «Doc. Origen» si viene; si no, por código de cliente, total ± $1 y fecha) y bandeja de ambiguos; (c) lectura por Conekta (historia API5). Diferencia > $1 → `requiere_revision`. El reporte de cierre del camino A se conserva como contingencia y como **hoja de trabajo para facturar una a una** (orden, cliente, código, pedido, total esperado, casilla para anotar la FVE). → Registrar la FVE 25756 por $2.244.935 deja diferencia 0, pedido y cierre facturados y el recibo habilitado en el siguiente pull; una FVE que agrupa dos pedidos se compara contra la suma de los dos cierres.
- **G5 · Fuera de cierre y reapertura (CIE-06)** **Δ**. Reabrir un cierre exportado: si su pedido no se importó, se anula el pedido y se anula el archivo vigente (que se regenera sin él); si ya se importó, exige confirmar con motivo que el pedido se anuló en Helisa (`PEDIDO_IMPORTADO` mientras no se confirme). → Caso de la visita del 24 sincronizada el 28 con el pedido ya importado.
- **G6 · Verificación pública, G7 · Correo, G8 · Impresión de contingencia** **=**.
- **G9** → épica G′ (sección 4.8).

### 4.8 Épica G′ · Archivos planos y canal hacia Helisa

| Historia | v5 (SPEC §10) | Propuesta 1 | Criterios de aceptación v6 |
| --- | --- | --- | --- |
| **G′1 · Catálogo de campos (HEL-07)** | Claves de FV, RC y TER | **Δ** Claves nuevas: `pedido.tipo`, `pedido.numero`, `pedido.fecha`, `pedido.codigo_cliente_helisa`, `pedido.lista_precio`, `parametro.helisa_vendedor`, `parametro.helisa_negocio`, `parametro.helisa_bodega`, `linea.tipo_concepto`, `linea.codigo_concepto`, `linea.descripcion`, `linea.cantidad`, `linea.valor_unitario`, `linea.valor_total`, `linea.ind_fiscal`, `periodo.desde`, `periodo.hasta`, `rh.visitas`, `rh.kg_categoria.<código>`, `aplicacion.cruce`, `recibo.tipo_helisa` | Toda clave nueva resuelve con Cofema y con el cliente por kilo; una clave desconocida falla al validar la plantilla, nunca al generar |
| **G′2 · Plantillas (HEL-03)** | Plantillas con cuentas obligatorias; semillas FV v1 y RC v1 | **Δ** Dos familias: **pedido** (líneas de concepto y comentario, sin cuentas) y **movimiento contable** (con cuentas, F y N). Semillas: «OP v1 · Pedido 24 campos (observado 21 oct 2026)» y «RC v2 · Movimiento con libros F y N». La FV v1 de la v5 queda en borrador, sin uso en la Propuesta 1 | Aprobar OP v1 sin el tipo de pedido configurado, con un concepto `PEND-…` o con una cuenta «EJEMPLO» falla con PLANTILLA_NO_APROBADA |
| **G′3 · Motor de generación** | Líneas contables por RH o recibo, cuadre D = C | **Δ** Para pedidos: líneas de servicio y comentario según el esquema y las equivalencias; 24 campos siempre; columnas que solo aplican a líneas de servicio quedan vacías en los comentarios; validaciones (código de cliente, concepto, cuadre contra el subtotal, separador, codificación, longitud máxima); escritor TXT en Windows-1252 y **XLSX de apoyo** con la vista desagregada que pidió Julio. Para movimiento: líneas F y N con Ind. Fiscal y cuadre por libro | Cofema → un pedido con 2 líneas de servicio y al menos 1 comentario, suma 1.886.500,00; prueba de bytes de la sección 7; recibo 35672 de $500.000 → 4 líneas (caja D y 1305 C en F y en N), D = C = 500.000 por libro, cruce «FVE25756» (formato **por confirmar**) |
| **G′4 · Archivo FV (HEL-01)** | Archivo de movimiento contable de factura | **− Retirada.** La reemplaza **G′4 · Archivo de pedidos OP**: `POST /pedidos/generar` crea los pedidos de los cierres y `POST /planos/op` los empaca en un archivo; cierres y pedidos → `exportado`; regenerar anula el archivo anterior si no se importó; un pedido aceptado por Conekta no entra (DOCUMENTO_YA_ENVIADO) | Generar dos veces el mismo periodo deja un solo archivo vigente; un cierre facturado no se vuelve a exportar; un archivo con tres pedidos lleva tres números consecutivos |
| **G′5 · Archivo RC (HEL-02)** | Caja D / cartera C, DOC FUENTE = FVE, solo libro F | **Δ** Líneas F y N; tipo RC1 o RC2 (**por confirmar**); cruce con `formato_cruce` de la plantilla; cuentas desde `cuenta_contable` por medio de pago y libro; el anticipo sin FVE queda fuera hasta que Julio defina su cuenta (**por confirmar**) | Lo del SPEC más: una cuenta faltante en el libro N da CUENTA_CONTABLE_FALTANTE; un descuadre en un libro da LIBROS_DESCUADRADOS |
| **G′6 · Resultado de la importación (HEL-04)** | Importado o rechazado por archivo | **Δ** Resultado **por pedido**: `POST /planos/:id/resultado {importados[], rechazados[{pedido_id, error}]}`; los pedidos rechazados se anulan y su cierre vuelve a `cerrado` para el siguiente archivo, con número nuevo | Un archivo con un pedido rechazado deja los demás importados; al regenerar, el pedido rechazado sale con número nuevo |
| **G′7 · Pantallas del panel** | Configurador y bandeja | **Δ** Configurador con familias, vista previa del TXT con los separadores resaltados y los caracteres fuera de Windows-1252 marcados; bandeja de pedidos por estado (descarga TXT + XLSX); bandeja de FVE por registrar (con la carga del listado); mockups en `v6 adrian/propuesta 1/mockups_v6/` | Cambiar separador, codificación o una equivalencia y regenerar produce un archivo distinto sin tocar código |
| **G′8 · Sync** | `facturas[]` y `tipos_recibo` | **=** (con el número formateado de D1) | El del SPEC |
| **G′9 · Cartilla de terceros (HEL-06)** | Fase 2 de la v5 (familia TER) | **+ Sube a la Fase 1.** Archivo TER con los clientes nuevos que no existen en Helisa, con la plantilla configurable de la familia terceros (ya prevista en `tipo_plano`); se importa antes del archivo de pedidos; al confirmarla se registra el código que asignó Helisa y se marca `existe_en_helisa`; con Conekta la reemplaza API2. La estructura de la cartilla está **por confirmar** con Julio | Un cliente nuevo sin código bloquea su pedido y aparece en la cartilla siguiente; al marcar la cartilla importada y registrar el código, el pedido se puede generar |

### 4.9 Épica H · Calidad, despliegue y piloto

- **H1 · Pruebas** **Δ**. Se suman los casos de la sección 7, la prueba de bytes en Windows-1252, las pruebas de contrato de Conekta con respuestas grabadas (1B) y un E2E de trazabilidad (buscar «25756» y abrir la cadena de Cofema).
- **H2 · Seguridad** **Δ menor**. La llave de Conekta no aparece en logs, en Sentry ni en respuestas; revisión del riesgo de HTTP sin TLS (sección 6.5).
- **H3 · Producción** **Δ menor**. Secretos de Conekta en Coolify (1B); alerta si la cola de integración se pausa.
- **H4, H5** **=**.
- **H6 · Acta de inicio de series y piloto** **Δ**. El piloto (un ciclo de corte, ≥ 5 clientes, 2 operarios) incluye pedidos importados en el Helisa de Comserva, FVE registradas y al menos un RC cruzado. Se mide **el tiempo real de facturar una a una** (minutos por factura), los errores de importación y las diferencias > $1. → **Informe de compuerta** entregado a Comserva con esas cifras (es el insumo para decidir si se contrata la Fase 2 de la Propuesta 2).

**Definición de terminado (SPEC §7), puntos nuevos:** (7) toda entidad nueva con número aparece en `v_indice_busqueda` y en la cadena de trazabilidad; (8) todo archivo para Helisa tiene prueba de bytes (codificación, separadores, fin de línea, número de campos); (9) toda llamada a Conekta tiene prueba de contrato con respuestas grabadas, incluidas 202, 401 y 423.

### 4.10 Épica TRZ · Trazabilidad (nueva, TRZ-01 a TRZ-06)

Ejemplo principal en todas las pruebas: **Cofema, septiembre de 2026** (4 visitas, 413,85 kg, $2.244.935, FVE 25756).

| Historia | Requerimiento | Criterios de aceptación | Notas técnicas |
| --- | --- | --- | --- |
| **TRZ1 · Cadena documental** | TRZ-01 | `GET /trazabilidad/cadena/:cierre_cliente_id` devuelve, en orden, visitas y constancias (con hash) → cierre → planilla RH → pedido OP y archivo o envío Conekta → FVE registrada (validada contra el RH) → recibos de caja → archivo RC o envío → cruce en Helisa (recibo definitivo). Para Cofema septiembre devuelve los 4 eslabones de visita, 1 cierre, 1 planilla, 1 pedido, la FVE 25756 con diferencia 0, el recibo 35672 y su RC | Servicio que compone la cadena a partir de las llaves existentes; no se duplica información |
| **TRZ2 · Eslabones y pendientes** | TRZ-01, TRZ-02 | Cada eslabón muestra estado, fecha y hora, usuario, documento descargable, hash o CUFE y enlace al siguiente. Un eslabón faltante aparece como **pendiente** con su causa, el responsable y los días de atraso («Falta registrar FVE», «Pedido sin importar», «Archivo rechazado», «Recibo sin cruzar») y un botón a la pantalla que lo resuelve | Las fechas y usuarios salen de las columnas `*_por` / `*_en` de cada entidad |
| **TRZ3 · Búsqueda por cualquier número** | TRZ-03 | `GET /trazabilidad/buscar?q=` encuentra por constancia, planilla, pedido, FVE o CUFE, recibo provisional y definitivo, nombre de archivo y primeros 16 caracteres del hash, y abre la cadena completa. «25756», «FVE 25756» y «fve25756» llevan a la misma cadena; «35672» lleva al recibo y a su cadena; si un número aparece en varios clientes o periodos, se listan para elegir. Respuesta < 300 ms con un año de datos | Vista `v_indice_busqueda` + `fn_normalizar_clave`; si pasa de 300 ms, vista materializada con índice trigram |
| **TRZ4 · Matriz del periodo** | TRZ-04 | Una fila por punto facturable con columnas visitas · cierre · RH · pedido · FVE · recibos · cruce, con fichas de estado; filtros «sin FVE», «con saldo», «rechazados», «con pendientes» y «con diferencia»; exportación XLSX. Con la semilla de septiembre y octubre las fichas coinciden con los estados sembrados | Vista `v_matriz_periodo`; los clientes activos sin cierre se agregan en el servicio |
| **TRZ5 · Expediente del cliente-periodo** | TRZ-05 | `POST /trazabilidad/expediente/:cierre_cliente_id` genera un PDF índice y un ZIP con todos los documentos y un manifiesto SHA-256; queda como `documento` tipo `expediente` con hash y token; se puede regenerar (nueva versión) cuando la cadena crece; cada descarga queda registrada y el expediente se verifica con la página pública de verificación. Los hashes del ZIP calculados con `shasum -a 256` coinciden con el índice | Gotenberg para el índice; el ZIP se arma en streaming hacia R2 |
| **TRZ6 · Bitácora de auditoría** | TRZ-06 | Muestra la auditoría de todas las entidades de la cadena en orden, filtrable por usuario y acción, incluida la descarga de cada archivo para Helisa; es exportable y va dentro del expediente. Descargar el archivo de pedidos deja una entrada en la bitácora de cada cierre incluido | Consulta sobre `auditoria` con la lista de ids de la cadena |

### 4.11 Épica API · Conector Helisa Conekta (nueva, solo modalidad 1B)

Solo se construye si Comserva confirma por escrito que contrata Conekta (tarea 0.7). Los archivos planos quedan siempre como contingencia. Los IDs API-01 a API-08 siguen el levantamiento v6; si allí cambia la numeración, manda el levantamiento.

| Historia | Requerimiento | Criterios de aceptación |
| --- | --- | --- |
| **API1 · Conexión y firma** | API-01 | `POST /integracion/conekta/probar` firma una consulta de solo lectura (cartera de Cofema) y devuelve OK o el error traducido; la firma HMAC-SHA256 se prueba contra el ejemplo oficial de Helisa (vector de prueba); la llave nunca aparece en logs ni respuestas; el panel muestra una advertencia permanente si la URL es `http://` |
| **API2 · Clientes** | API-02 | Crear o actualizar en Helisa el cliente y el código de la sede (`set/client2_0`) antes de su primer pedido; el campo JSON exacto está **por confirmar** (la ayuda oficial los muestra en imágenes) |
| **API3 · Pedidos** | API-03 | Un pedido aceptado (`set/order`) queda `importado` sin archivo; un pedido en archivo vigente no se envía y viceversa (DOCUMENTO_YA_ENVIADO); si Helisa devuelve el número del pedido, se guarda en `numero_externo` (**por confirmar**) |
| **API4 · Recibos** | API-04 | El RC se envía como documento (`set/document`, tipo RC con `affectDocument` hacia la FVE) con las líneas de los dos libros (`accountingClass` 0 y 1, equivalencia con F y N **por confirmar**); el código 8 se traduce a LIBROS_DESCUADRADOS y el 9 a «código de cruce inválido» |
| **API5 · Lectura de FVE** | API-05 | `summary/billDetails` por rango de fechas, en la ventana de facturación una vez al día y a demanda; empareja con los pedidos como la carga de listado de G4 y registra la FVE con `origen = 'conekta'`; lo ambiguo va a la bandeja manual; los campos de salida están **por confirmar** |
| **API6 · Cartera** | API-06 | `summary/portfolioByClient` por cliente con facturas abiertas, cada noche y a demanda; guarda en `cartera_cliente` con fuente `conekta` y lista las diferencias contra el saldo de referencia (si `value` es saldo o valor original está **por confirmar**) |
| **API7 · Cola de envíos** | API-07 | Cola `conekta` (pg-boss) con concurrencia 1, reintentos con espera creciente para 423 y 500, pausa y alerta ante 401, contadores diario y mensual contra los topes; encolar dos veces la misma entidad y versión produce un solo envío; un tiempo agotado deja el envío `incierto` y no se reintenta hasta que alguien lo verifique; bandeja de envíos con reintentar y descartar (con motivo) |
| **API8 · Contingencia y monitoreo** | API-08 | Estado de la integración en el panel (configurada, URL con o sin TLS, cola, consumo del día y del mes); si Conekta no está disponible o la cola se pausa, los mismos documentos salen por archivo plano sin duplicarse (DOCUMENTO_YA_ENVIADO); prueba completa con la conexión de pruebas de Helisa (30 días hábiles) y acompañamiento del primer ciclo |

### 4.12 Historias retiradas o reubicadas

- **G′4 de la v5 (archivo FV como movimiento contable)**: retirada en la Propuesta 1; su diseño se reserva para la Fase 2 de la Propuesta 2 (contabilización de facturas emitidas fuera de Helisa).
- **La premisa «el archivo FV genera la factura electrónica»** (v5, sección 12 y HEL-01): retirada.
- **Cartilla de terceros (HEL-06)**: deja de ser complemento y sube a la Fase 1 (historia G′9); en 1B el alta se hace por API (API2).

### 4.13 Entregables y semilla (cambios a SPEC §2 y §3)

**Entregables:**

- **E2** **Δ**: además, `fn_liquidar` con los tres casos de regresión.
- **E9** **Δ**: el piloto incluye pedidos importados y FVE registradas, y termina con el informe de compuerta.
- **E11** **+**: importación de prueba aceptada (tarea 0.6): pedido y recibo de Cofema importados sin errores, con la previsualización y la lista de errores guardadas.
- **E12** **+** (solo 1B): conexión Conekta probada en el ambiente de pruebas: un pedido insertado, una FVE leída y la cartera de un cliente consultada.
- **E13** **+**: trazabilidad demostrada: búsqueda, cadena y expediente de Cofema septiembre.

**Semilla (se suma a la del SPEC):**

- Parámetros de Helisa con los valores vistos (vendedor 828002730, centro de costo 0101, negocio 1, lista 2 «BASICA 30000») y el tipo de pedido vacío.
- Conceptos de prueba «RECOLEC. TRANSP Y DISPOS. FINAL RESIDUOS BIOLOGICOS» y «KILOGRAMOS ADICIONALES» con códigos provisionales `PEND-01` y `PEND-02` (no permiten aprobar plantillas hasta tener los reales).
- Equivalencias: `basico` → RECOLEC…; `kg_adicionales` → KILOGRAMOS ADICIONALES; `kg_total` (por kilo) → RECOLEC…; `fijo` → RECOLEC… (este último **por confirmar**).
- Un cliente de prueba **por kilo** (108,50 kg en octubre a $3.991,60) y dos de **cobro fijo** ($25.000 y $30.000). Los nombres son los de `mockups_v6/assets/data.js`; no se usa el nombre del cliente real de la FVE 25997.
- Códigos de cliente Helisa ficticios; un cliente con `documentos_por_sede` y dos sedes con códigos distintos; un cliente sin código (caso negativo).
- Cuentas F y N de ejemplo (con «EJEMPLO») para caja y cartera.
- Septiembre de Cofema: pedido importado, FVE 25756 registrada por $2.244.935 (datos reales), planilla RH 22690-26 y recibo 35672 de $500.000 aplicado (datos de prueba, los mismos del levantamiento y de los mockups).
- Respuestas grabadas de Conekta (200, 202, 204, 401, 423) para las pruebas de contrato (1B).

---

## 5. Modelo de datos

### 5.1 Qué cambia, en prosa

1. **Tarifa.** El tipo `esquema_tarifa` suma `fijo_mensual`. Para no cambiar la firma de `fn_liquidar`, en `fijo_mensual` la columna `basico` guarda el valor fijo del mes; un check por esquema impide combinaciones inválidas. `por_visita` sigue en el tipo, pero `fn_liquidar` lo rechaza. Se agrega `lineas_por_categoria` (reservada; **por confirmar** con Julio).
2. **Cliente y sede.** `cliente.codigo_helisa` ya existía; se agregan `lista_precio_helisa` y la fecha del último cruce con la cartilla. La sede gana `codigo_helisa` (código adicional). El **punto facturable** reutiliza `cliente.documentos_por_sede` (si un cliente factura por sede, también lleva planilla por sede); si Comserva necesitara planilla por sede y factura por NIT, o al revés, se agrega una marca aparte (**por confirmar**).
3. **Datos fiscales opcionales** en `cliente_fiscal` (1:1): tipo de persona, tipo de documento DIAN, responsabilidades del RUT, régimen de IVA, dirección, municipio DANE y correo de recepción de facturas. En la Propuesta 1 no se exigen; preparan la Fase 2.
4. **Catálogos de Helisa:** `concepto_helisa` (código, nombre, tipo, unidad, IVA de referencia; será el catálogo de productos de la factura electrónica si llega la Fase 2) y `lista_precio_helisa`.
5. **Equivalencias:** `equivalencia_concepto` (componente o categoría, con excepción opcional por tarifa → concepto + lista + texto), con aprobación y vigencia. Se resuelve con la fecha de corte del periodo y prioridad tarifa > categoría > general.
6. **Cuentas:** `cuenta_contable` (uso, medio de pago, alias del banco sin número de cuenta, concepto para la Fase 2, libro F o N, cuenta), con aprobación. Es la «plantilla servicio → cuenta» de Julio y las cuentas del recibo.
7. **Pedido:** `pedido_helisa` y `pedido_helisa_linea`. El pedido es una entidad propia (con o sin archivo, porque en 1B no hay archivo). Un cierre tiene a lo sumo un pedido vigente (índice único parcial). La serie `pedido` la asigna el servidor.
8. **FVE registrada (v5):** `factura_helisa` gana `prefijo`, `consecutivo`, `cufe`, `origen` (manual, listado, conekta), `doc_origen`, `carga_id` y `sin_pedido_motivo`. El vínculo canónico FVE ↔ cierre pasa por el pedido (`pedido_helisa.factura_helisa_id`), porque una FVE puede llamar varios pedidos del mismo cliente; `factura_helisa.cierre_cliente_id` queda nulo salvo en las FVE registradas sin pedido (contingencia). `factura_carga` guarda cada listado de FVE cargado.
9. **Plantillas (v5):** `tipo_plano` suma `OP`; `tipo_linea_plano` suma `concepto` y `comentario`; en `plantilla_plano_linea`, `cuenta` y `naturaleza` pasan a ser opcionales (obligatorias solo en movimiento contable), y se agregan `componente`, `uso_cuenta` e `ind_fiscal`. `plantilla_plano` suma `decimales_cantidad`, `entero_si_sin_decimales`, `formato_cruce`, `requiere_libro_n` y `reemplazo_separador`; la columna existente `tipo_documento` guarda el tipo de pedido (OP) o el de recibo (RC1/RC2). `plantilla_plano_columna` suma `obligatoria` y `solo_tipo_concepto`. El check de cuadre de `archivo_plano` admite `OP`.
10. **Cierre:** `modo_facturacion` (`helisa_pedido` en la Fase 1). Estados: abierto → cerrado → **exportado** (pedido en archivo vigente o aceptado por Conekta) → **facturado** (FVE registrada); reabierto desde cerrado, o desde exportado con la regla de G5.
11. **Integración (1B):** `integracion_envio` (cola persistente con clave de idempotencia, estado, intentos, respuesta y número externo); `fuente_cartera` suma `conekta`.
12. **Trazabilidad:** vistas `v_indice_busqueda` y `v_matriz_periodo`, función `fn_normalizar_clave` y `tipo_documento` + `expediente`.

### 5.2 Estados

| Entidad | Estados y transiciones |
| --- | --- |
| Cierre (`cierre_cliente`) | abierto → cerrado → exportado → facturado · cerrado → reabierto · exportado → reabierto (anula el pedido; si estaba importado exige confirmación) · facturado no se reabre (ajuste en C1 y nota crédito en Helisa) |
| Pedido (`pedido_helisa`) | generado → exportado (en archivo descargado o enviado por API) → importado → facturado · cualquiera salvo facturado → anulado (con motivo; si estaba importado, con `anulado_en_helisa = true`) |
| Archivo plano | generado → descargado → importado · rechazado (por pedido, ver G′6) · anulado |
| Envío de integración | pendiente → enviando → aceptado · rechazado · error (reintenta) · incierto (verificación manual) · descartado |
| FVE registrada | registrada (con o sin `requiere_revision`) · anulada en Helisa (nota crédito allá; se registra) |
| Recibo | emitido → exportado → cruzado · anulado (sin cambio frente a la v5) |

### 5.3 DDL orientativo del anexo v6 (no ejecutado, validar)

```sql
-- =====================================================================
--  RH digital Comserva · anexo v6 · Propuesta 1 (Fase 1)
--  DDL ORIENTATIVO · NO EJECUTADO · VALIDAR en PostgreSQL 18 (contenedor de
--  desarrollo) después de schema.sql y schema_v5_archivos_planos.sql.
--  Los ALTER TYPE ... ADD VALUE van en una migración propia: el valor nuevo
--  no se puede usar en la misma transacción que lo crea.
-- =====================================================================

-- ---------------------------------------------------------------------
-- Migración v6-1: valores nuevos de tipos existentes
-- ---------------------------------------------------------------------
alter type esquema_tarifa   add value if not exists 'fijo_mensual';
alter type tipo_plano       add value if not exists 'OP';          -- pedido para Helisa (familia sin cuentas)
alter type tipo_linea_plano add value if not exists 'concepto';    -- línea de pedido tipo 2 (servicio)
alter type tipo_linea_plano add value if not exists 'comentario';  -- línea de pedido tipo 3 (comentario)
alter type tipo_documento   add value if not exists 'pedido';      -- serie de pedidos (no genera PDF)
alter type tipo_documento   add value if not exists 'expediente';  -- TRZ-05
alter type fuente_cartera   add value if not exists 'conekta';

-- ---------------------------------------------------------------------
-- Migración v6-2: tipos nuevos, tablas y reglas
-- ---------------------------------------------------------------------
create type modo_facturacion    as enum ('helisa_pedido', 'sistema_fe');   -- 'sistema_fe' solo con la Fase 2 (Propuesta 2)
create type estado_pedido       as enum ('generado', 'exportado', 'importado', 'facturado', 'anulado');
create type componente_tarifa   as enum ('basico', 'kg_adicionales', 'kg_total', 'fijo', 'visitas', 'kg_categoria');
create type estado_equivalencia as enum ('borrador', 'aprobada', 'retirada');
create type uso_cuenta          as enum ('caja', 'banco', 'cartera', 'anticipo', 'ingreso', 'iva', 'retencion');  -- ingreso e iva: Fase 2
create type origen_fve          as enum ('manual', 'listado', 'conekta');
create type sistema_integracion as enum ('conekta');
create type estado_envio        as enum ('pendiente', 'enviando', 'aceptado', 'rechazado', 'error', 'incierto', 'descartado');

-- 1. Tarifa: tres esquemas. En fijo_mensual, «basico» es el valor fijo del mes.
alter table tarifa
  add column lineas_por_categoria boolean not null default false,   -- reservado: un concepto por categoría (por confirmar)
  add constraint ck_tarifa_esquema check (
       esquema = 'basico_incluidos'
    or (esquema = 'por_kilo'     and basico = 0 and kg_incluidos = 0 and precio_kg > 0)
    or (esquema = 'fijo_mensual' and basico > 0 and kg_incluidos = 0 and precio_kg = 0)
    or esquema = 'por_visita');                                     -- existe, pero fn_liquidar lo rechaza

create or replace function fn_liquidar(p_esquema esquema_tarifa, p_basico numeric, p_incluidos numeric, p_precio numeric,
                                       p_valor_visita numeric, p_iva_pct numeric, p_kg numeric, p_visitas int)
returns table (kg_adicionales numeric, valor_basico numeric, valor_adicionales numeric, subtotal numeric, iva numeric, total numeric)
language plpgsql immutable as $$
declare v_adic numeric := 0; v_basico numeric := 0; v_vadic numeric := 0; v_sub numeric; v_iva numeric;
begin
  if p_esquema = 'basico_incluidos' then
    v_adic   := greatest(0, round(p_kg - p_incluidos, 2));
    v_basico := p_basico;
    v_vadic  := round(v_adic * p_precio, 2);
  elsif p_esquema = 'por_kilo' then
    v_adic   := round(p_kg, 2);
    v_vadic  := round(v_adic * p_precio, 2);
  elsif p_esquema = 'fijo_mensual' then
    v_basico := round(p_basico, 2);
  else
    raise exception 'ESQUEMA_TARIFA_NO_SOPORTADO: %', p_esquema using errcode = 'check_violation';
  end if;
  v_sub := v_basico + v_vadic;
  v_iva := round(v_sub * p_iva_pct / 100, 2);
  return query select v_adic, v_basico, v_vadic, v_sub, v_iva, v_sub + v_iva;
end $$;

-- 2. Cliente, sede y datos fiscales opcionales
alter table cliente
  add column lista_precio_helisa         text,          -- código de la lista en Helisa (visto: 2 «BASICA 30000»)
  add column codigo_helisa_verificado_en timestamptz;   -- último cruce con la cartilla exportada de Helisa
create unique index ux_cliente_codigo_helisa on cliente (codigo_helisa) where codigo_helisa is not null;

alter table sede
  add column codigo_helisa text;                         -- «código adicional del cliente» en Helisa (mismo NIT creado varias veces)
create unique index ux_sede_codigo_helisa on sede (codigo_helisa) where codigo_helisa is not null;

create table cliente_fiscal (                             -- opcional en la Fase 1; obligatorio para facturar por el sistema (Fase 2, P2)
  cliente_id          uuid primary key references cliente(id),
  tipo_persona        smallint check (tipo_persona in (1, 2)),  -- 1 jurídica, 2 natural (tabla DIAN)
  tipo_documento_dian text,                              -- '31' NIT, '13' cédula (validar con la caja de herramientas DIAN)
  responsabilidades   text[] not null default '{}',      -- p. ej. {'R-99-PN'}
  regimen_iva         text,                              -- '01' responsable de IVA, 'ZZ' no aplica
  direccion           text,
  municipio_dane      char(5),                           -- código DIVIPOLA
  correo_recepcion_fe citext,
  verificado_por      uuid references usuario(id),
  verificado_en       timestamptz,
  actualizado_en      timestamptz not null default now()
);

-- 3. Catálogos de Helisa, equivalencias y cuentas
create table concepto_helisa (                            -- en la Fase 2 (P2) es el catálogo de productos de la factura electrónica
  id             serial primary key,
  codigo         text not null unique,                   -- CODIGO CONCEPTO del pedido; 'PEND-01' mientras no llegue el real
  nombre         text not null,                          -- 'KILOGRAMOS ADICIONALES'
  tipo           smallint not null default 2 check (tipo in (1, 2)),  -- 2 servicio; 1 artículo [inferencia]
  unidad         text,                                   -- por confirmar; unidad DIAN en la Fase 2
  iva_pct        numeric(5,2),                           -- referencia: Helisa aplica el IVA del concepto
  activo         boolean not null default true,
  origen         text not null default 'manual' check (origen in ('manual', 'cartilla', 'conekta')),
  actualizado_en timestamptz not null default now()
);

create table lista_precio_helisa (
  codigo   text primary key,                             -- '2'
  nombre   text not null,                                -- 'BASICA 30000'
  mecanica text                                          -- 'Fija precio'
);

create table equivalencia_concepto (                      -- qué concepto de Helisa factura cada componente de la tarifa
  id            serial primary key,
  componente    componente_tarifa not null,
  categoria_id  int references categoria_residuo(id),     -- solo para componente kg_categoria
  tarifa_id     int references tarifa(id),                -- excepción para un cliente (opcional)
  concepto_id   int not null references concepto_helisa(id),
  lista_precio  text references lista_precio_helisa(codigo),
  texto_linea   text,                                     -- ARTÍCULO/SERVICIO; vacío = nombre del concepto
  estado        estado_equivalencia not null default 'borrador',
  vigente_desde date,
  creada_por    uuid not null references usuario(id),
  creada_en     timestamptz not null default now(),
  aprobada_por  uuid references usuario(id),
  aprobada_en   timestamptz,
  check (componente <> 'kg_categoria' or categoria_id is not null),
  check (estado <> 'aprobada' or (aprobada_por is not null and vigente_desde is not null))
);
create unique index ux_equivalencia_vigente on equivalencia_concepto
  (componente, coalesce(categoria_id, 0), coalesce(tarifa_id, 0), vigente_desde) where estado = 'aprobada';

create table cuenta_contable (                            -- cuentas del recibo y (Fase 2) «servicio → cuenta», en los dos libros
  id            serial primary key,
  uso           uso_cuenta not null,
  medio         medio_pago,                               -- caja o banco según el medio del recibo
  banco_alias   text,                                     -- nombre corto de la cuenta bancaria; nunca el número
  concepto_id   int references concepto_helisa(id),       -- uso 'ingreso' (Fase 2)
  clase         clase_plano not null,                     -- F o N
  cuenta        text not null,
  estado        estado_equivalencia not null default 'borrador',
  vigente_desde date,
  aprobada_por  uuid references usuario(id),
  aprobada_en   timestamptz,
  check (estado <> 'aprobada' or (aprobada_por is not null and vigente_desde is not null and cuenta !~ 'EJEMPLO'))
);

-- 4. Cierre preparado para la Fase 2
alter table cierre_cliente
  add column modo_facturacion modo_facturacion not null default 'helisa_pedido';

-- 5. Pedido para Helisa
insert into serie_documento (tipo, prefijo, formato, asignador, siguiente, ultimo_en_papel)
values ('pedido', '', '{n}', 'servidor', 1, null);       -- número inicial por confirmar (tarea 0.2)

create table pedido_helisa (
  id                    uuid primary key default uuidv7(),
  cierre_cliente_id     uuid not null references cierre_cliente(id),
  cliente_id            uuid not null references cliente(id),
  sede_id               uuid references sede(id),
  periodo_id            int not null references periodo(id),
  tipo                  text not null,                  -- tipo de documento pedido en Helisa (por confirmar; 'OP' en otra empresa)
  numero                bigint not null,                -- serie 'pedido'; nunca se reutiliza
  fecha                 date not null,
  identidad_cliente     text not null,                  -- NIT sin DV
  codigo_cliente_helisa text,                           -- de la sede o del cliente
  lista_precio          text,
  subtotal              numeric(14,2) not null,         -- = cierre_cliente.subtotal
  estado                estado_pedido not null default 'generado',
  archivo_plano_id      uuid references archivo_plano(id),
  factura_helisa_id     uuid references factura_helisa(id),
  generado_por          uuid not null references usuario(id),
  generado_en           timestamptz not null default now(),
  importado_en          timestamptz,
  anulado_por           uuid references usuario(id),
  anulado_en            timestamptz,
  anulacion_motivo      text,
  anulado_en_helisa     boolean,                        -- confirmación al anular un pedido que ya estaba en Helisa
  unique (tipo, numero),
  check (estado <> 'anulado' or anulacion_motivo is not null)
);
create unique index ux_pedido_vigente_por_cierre on pedido_helisa (cierre_cliente_id) where estado <> 'anulado';
create index ix_pedido_periodo on pedido_helisa (periodo_id, estado);

create table pedido_helisa_linea (
  pedido_id       uuid not null references pedido_helisa(id) on delete cascade,
  orden           smallint not null,
  tipo_concepto   smallint not null check (tipo_concepto in (2, 3)),  -- 2 servicio · 3 comentario
  componente      componente_tarifa,
  concepto_id     int references concepto_helisa(id),
  codigo_concepto text,                                 -- copia del código vigente al generar
  descripcion     text not null,
  cantidad        numeric(12,2),
  valor_unitario  numeric(14,2),
  valor_total     numeric(14,2),                        -- round(cantidad × unitario, 2); el archivo puede dejarlo vacío
  primary key (pedido_id, orden),
  check (tipo_concepto = 3 or (codigo_concepto is not null and cantidad > 0 and valor_unitario >= 0)),
  check (tipo_concepto = 2 or (codigo_concepto is null and cantidad is null and valor_unitario is null))
);

create or replace function fn_pedido_valida_cierre() returns trigger language plpgsql as $$
declare v_modo modo_facturacion; v_estado estado_cierre_cliente;
begin
  select modo_facturacion, estado into v_modo, v_estado from cierre_cliente where id = new.cierre_cliente_id;
  if v_modo <> 'helisa_pedido' then
    raise exception 'DOBLE_FACTURACION: el cierre % se factura por el sistema y no puede exportarse como pedido', new.cierre_cliente_id
      using errcode = 'check_violation';
  end if;
  if v_estado <> 'cerrado' then
    raise exception 'CIERRE_NO_EXPORTABLE: el cierre % está %', new.cierre_cliente_id, v_estado
      using errcode = 'check_violation';
  end if;
  return new;
end $$;
create trigger trg_pedido_valida_cierre before insert on pedido_helisa
  for each row execute function fn_pedido_valida_cierre();

create or replace function fn_cierre_reapertura() returns trigger language plpgsql as $$
begin
  if new.estado = 'reabierto' and old.estado = 'exportado' and exists (
       select 1 from pedido_helisa p
       where p.cierre_cliente_id = old.id and p.estado in ('importado', 'facturado')) then
    raise exception 'PEDIDO_IMPORTADO: el pedido del cierre % ya está en Helisa; anúlelo allí y confirme la anulación', old.id
      using errcode = 'check_violation';
  end if;
  return new;
end $$;
create trigger trg_cierre_reapertura before update of estado on cierre_cliente
  for each row execute function fn_cierre_reapertura();

-- 6. FVE registrada (v5) y carga del listado de Helisa
create table factura_carga (                              -- listado de FVE exportado de Helisa (formato por confirmar)
  id            serial primary key,
  archivo_id    uuid not null references archivo(id),
  periodo_id    int references periodo(id),
  filas         int not null,
  emparejadas   int not null default 0,
  ambiguas      int not null default 0,
  sin_pareja    int not null default 0,
  resumen       jsonb,
  cargada_por   uuid not null references usuario(id),
  cargada_en    timestamptz not null default now(),
  confirmada_en timestamptz
);

alter table factura_helisa
  alter column cierre_cliente_id drop not null,         -- el vínculo canónico va por pedido_helisa.factura_helisa_id
  add column prefijo           text,                    -- 'FVE'
  add column consecutivo       bigint,                  -- 25756
  add column cufe              text,
  add column origen            origen_fve not null default 'manual',
  add column doc_origen        text,                    -- «Doc. Origen» de Helisa, si se puede leer
  add column carga_id          int references factura_carga(id),
  add column sin_pedido_motivo text;                    -- FVE de un cierre facturado sin pedido (contingencia, reporte A)
create unique index ux_factura_helisa_prefijo_num on factura_helisa (prefijo, consecutivo) where prefijo is not null;

-- 7. Plantillas y archivos planos (v5): familia pedido
alter table plantilla_plano
  add column decimales_cantidad      smallint not null default 2 check (decimales_cantidad between 0 and 2),
  add column entero_si_sin_decimales boolean  not null default true,   -- solo valores: 74790.00 se escribe 74790; 3991.60 queda igual (la cantidad siempre lleva decimales_cantidad)
  add column formato_cruce           text     not null default '{prefijo}{numero}',  -- 'FVE25756' o 'FVE 25756' (por confirmar)
  add column requiere_libro_n        boolean  not null default true,
  add column reemplazo_separador     text     not null default '/';   -- en textos libres

alter table plantilla_plano_columna
  add column obligatoria        boolean not null default false,
  add column solo_tipo_concepto smallint check (solo_tipo_concepto in (2, 3));  -- vacía en las demás líneas

alter table plantilla_plano_linea
  alter column cuenta     drop not null,
  alter column naturaleza drop not null,
  add column componente   componente_tarifa,              -- OP: componente que produce la línea de servicio
  add column uso_cuenta   uso_cuenta,                     -- movimiento: la cuenta sale de cuenta_contable(uso, medio, clase)
  add column ind_fiscal   smallint,                       -- empareja la línea F con su espejo N (IND A AFECTAR)
  add constraint ck_linea_familia check (
       (tipo_linea in ('concepto', 'comentario') and cuenta is null and naturaleza is null)
    or (tipo_linea not in ('concepto', 'comentario') and naturaleza is not null
        and (cuenta is not null or uso_cuenta is not null)));

-- El check de cuadre de la v5 no tiene nombre; PostgreSQL lo llama archivo_plano_check (verificar con \d archivo_plano).
alter table archivo_plano drop constraint archivo_plano_check;
alter table archivo_plano add constraint ck_archivo_cuadre check (total_debitos = total_creditos or tipo in ('TER', 'OP'));
alter table archivo_plano add column total_pedidos numeric(14,2);   -- OP: suma de subtotales
alter table archivo_plano_linea add column pedido_id uuid references pedido_helisa(id);
create index ix_apl_pedido on archivo_plano_linea (pedido_id);

-- 8. Integración con Helisa Conekta (solo modalidad 1B)
create table integracion_envio (
  id                 uuid primary key default uuidv7(),
  sistema            sistema_integracion not null,
  operacion          text not null,                     -- 'set/client2_0', 'set/order', 'set/document', 'summary/billDetails', 'summary/portfolioByClient'
  entidad            text,                              -- 'pedido_helisa', 'recibo_caja', 'cliente'
  entidad_id         uuid,
  version_entidad    int not null default 1,
  clave_idempotencia text not null unique,              -- operacion:entidad:id:version
  payload            jsonb,                             -- JSON enviado, sin llave ni firma
  estado             estado_envio not null default 'pendiente',
  intentos           int not null default 0,
  proximo_intento_en timestamptz,
  http_status        int,
  codigo_respuesta   text,                              -- códigos 3–9 de Conekta
  respuesta          jsonb,
  numero_externo     text,                              -- número que devuelva Helisa, si lo devuelve (por confirmar)
  creado_por         uuid references usuario(id),
  creado_en          timestamptz not null default now(),
  enviado_en         timestamptz,
  resuelto_por       uuid references usuario(id),      -- verificación manual de un envío incierto
  resuelto_en        timestamptz,
  nota               text
);
create unique index ux_envio_aceptado on integracion_envio (sistema, operacion, entidad, entidad_id) where estado = 'aceptado';
create index ix_envio_cola on integracion_envio (estado, proximo_intento_en) where estado in ('pendiente', 'error', 'incierto');

-- 9. Trazabilidad (TRZ-01, TRZ-03, TRZ-04)
create or replace function fn_normalizar_clave(t text) returns text language sql immutable as $$
  select regexp_replace(upper(coalesce(t, '')), '[^0-9A-Z]', '', 'g')
$$;

create view v_indice_busqueda as                          -- un número → la cadena (cierre) a la que pertenece
  select 'constancia'::text as tipo, v.numero::text as clave, cv.cierre_cliente_id, 'visita'::text as entidad, v.id::text as entidad_id
    from visita v left join cierre_cliente_visita cv on cv.visita_id = v.id
   where v.numero is not null
  union all
  select 'planilla', d.consecutivo, c.id, 'documento', d.id::text
    from documento d join cierre_cliente c on c.planilla_documento = d.id
  union all
  select 'hash', left(d.sha256, 16), c.id, 'documento', d.id::text
    from documento d join cierre_cliente c on c.planilla_documento = d.id
  union all
  select 'pedido', p.tipo || p.numero::text, p.cierre_cliente_id, 'pedido_helisa', p.id::text
    from pedido_helisa p
  union all
  select 'fve', f.numero, coalesce(p.cierre_cliente_id, f.cierre_cliente_id), 'factura_helisa', f.id::text
    from factura_helisa f left join pedido_helisa p on p.factura_helisa_id = f.id
  union all
  select 'cufe', f.cufe, coalesce(p.cierre_cliente_id, f.cierre_cliente_id), 'factura_helisa', f.id::text
    from factura_helisa f left join pedido_helisa p on p.factura_helisa_id = f.id
   where f.cufe is not null
  union all
  select 'recibo', r.numero::text, coalesce(p.cierre_cliente_id, f.cierre_cliente_id), 'recibo_caja', r.id::text
    from recibo_caja r
    left join recibo_caja_aplicacion a on a.recibo_id = r.id
    left join factura_helisa f on f.id = a.factura_id
    left join pedido_helisa p on p.factura_helisa_id = f.id
   where r.numero is not null
  union all
  select 'recibo_definitivo', r.recibo_helisa_numero, coalesce(p.cierre_cliente_id, f.cierre_cliente_id), 'recibo_caja', r.id::text
    from recibo_caja r
    left join recibo_caja_aplicacion a on a.recibo_id = r.id
    left join factura_helisa f on f.id = a.factura_id
    left join pedido_helisa p on p.factura_helisa_id = f.id
   where r.recibo_helisa_numero is not null
  union all
  select 'archivo', ap.nombre, coalesce(l.cierre_cliente_id, p.cierre_cliente_id), 'archivo_plano', ap.id::text
    from archivo_plano ap
    join archivo_plano_linea l on l.archivo_plano_id = ap.id
    left join pedido_helisa p on p.id = l.pedido_id;
-- Completar en el código: hash de constancias y recibos (documento por visita o recibo) y archivos RC (por recibo).
-- Consulta: where fn_normalizar_clave(clave) like '%' || fn_normalizar_clave($1) || '%' (exactos primero, límite 50).

create view v_matriz_periodo as                           -- una fila por cierre; los clientes sin cierre se agregan en el servicio
select c.periodo_id, c.id as cierre_cliente_id, c.cliente_id, c.sede_id, c.estado as estado_cierre,
       c.num_visitas, c.kg_total, c.total,
       d.consecutivo                 as planilla,
       p.tipo || p.numero::text      as pedido,
       p.estado                      as estado_pedido,
       f.numero                      as fve,
       f.requiere_revision           as fve_con_diferencia,
       (select count(distinct a.recibo_id)
          from recibo_caja_aplicacion a join recibo_caja r on r.id = a.recibo_id
         where a.factura_id = f.id and r.estado <> 'anulado') as recibos,
       (select count(distinct a.recibo_id)
          from recibo_caja_aplicacion a join recibo_caja r on r.id = a.recibo_id
         where a.factura_id = f.id and r.estado = 'cruzado')  as recibos_cruzados,
       s.saldo
from cierre_cliente c
left join documento d       on d.id = c.planilla_documento
left join pedido_helisa p   on p.cierre_cliente_id = c.id and p.estado <> 'anulado'
left join factura_helisa f  on f.id = coalesce(p.factura_helisa_id,
                                 (select fh.id from factura_helisa fh
                                   where fh.cierre_cliente_id = c.id and fh.anulada_en is null limit 1))
left join v_saldo_referencia s on s.factura_id = f.id;

-- ---------------------------------------------------------------------
-- Migración v6-3: catálogo de campos y semillas de plantillas
-- ---------------------------------------------------------------------
insert into campo_exportable (clave, descripcion, ejemplo, aplica_a) values
  ('pedido.tipo',                  'Tipo de documento pedido en Helisa',           'OP',          '{OP}'),
  ('pedido.numero',                'Número del pedido (serie del servidor)',        '1',           '{OP}'),
  ('pedido.fecha',                 'Fecha del pedido',                              '23/09/2026',  '{OP}'),
  ('pedido.codigo_cliente_helisa', 'Código del cliente o de la sede en Helisa',     '',            '{OP}'),
  ('pedido.lista_precio',          'Código de la lista de precio',                  '2',           '{OP}'),
  ('parametro.helisa_vendedor',    'Identidad del vendedor',                        '828002730',   '{OP}'),
  ('parametro.helisa_negocio',     'Código de negocio',                             '1',           '{OP,RC}'),
  ('parametro.helisa_bodega',      'Código de bodega',                              '',            '{OP}'),
  ('linea.tipo_concepto',          '2 servicio · 3 comentario',                     '2',           '{OP}'),
  ('linea.codigo_concepto',        'Código del concepto en Helisa',                 'PEND-02',     '{OP}'),
  ('linea.descripcion',            'Texto de la línea (servicio o comentario)',     'KILOGRAMOS ADICIONALES', '{OP}'),
  ('linea.cantidad',               'Cantidad (2 decimales)',                        '393.85',      '{OP}'),
  ('linea.valor_unitario',         'Valor unitario sin IVA',                        '4600',        '{OP}'),
  ('linea.valor_total',            'Cantidad × valor unitario',                     '1811710',     '{OP}'),
  ('linea.ind_fiscal',             'Índice que empareja la línea F con la N',       '1',           '{RC,FV}'),
  ('periodo.desde',                'Inicio del periodo',                            '27/08/2026',  '{OP,RC}'),
  ('periodo.hasta',                'Corte del periodo',                             '26/09/2026',  '{OP,RC}'),
  ('rh.visitas',                   'Visitas del periodo',                           '4',           '{OP}'),
  ('aplicacion.cruce',             'FVE que cruza el recibo, con formato_cruce',    'FVE25756',    '{RC}'),
  ('recibo.tipo_helisa',           'Tipo de recibo en Helisa (RC1 o RC2)',          'RC1',         '{RC}');
-- Las claves rh.kg_categoria.<código> se resuelven por patrón en campos.ts (una por categoría).
-- Claves de la v5 que ahora también usa el pedido:
update campo_exportable set aplica_a = aplica_a || '{OP}'::tipo_plano[]
 where clave in ('cliente.nit', 'cliente.razon_social_helisa', 'plantilla.centro_costo',
                 'periodo.nombre', 'rh.numero', 'rh.kg_total', 'rh.kg_adicionales', 'rh.precio_kg', 'rh.basico');

-- Plantilla OP v1: estructura vista el 21 oct 2026 en otra empresa; no se puede aprobar sin el tipo de pedido de Comserva.
insert into plantilla_plano (id, tipo, version, nombre, estado, formato, separador, codificacion, con_titulos, fin_de_linea,
                             formato_fecha, decimales, decimales_cantidad, separador_decimal, separador_miles,
                             mayusculas, quitar_tildes, tipo_documento, centro_costo, agrupacion, prefijo_archivo,
                             valida_cuadre, creada_por, nota_cambio)
select 3, 'OP', 1, 'Pedido 24 campos (observado 21 oct 2026)', 'borrador', 'txt', '|', 'windows-1252', false, 'CRLF',
       'dd/MM/yyyy', 2, 2, '.', '', true, false, null, '0101', 'periodo', 'COMSERVA',
       false, u.id, 'Estructura vista en la reunión del 21 oct 2026. Falta el tipo de pedido de Comserva y la estructura oficial.'
from usuario u where u.rol = 'admin' limit 1;

insert into plantilla_plano_columna (plantilla_id, orden, titulo, origen, campo, solo_tipo_concepto, obligatoria)
select 3, c.orden, c.titulo, c.origen::origen_columna_plano, c.campo, c.solo, c.oblig
from (values
  (1,  'TIPO',                       'campo', 'pedido.tipo',                  null::smallint, true),
  (2,  'NUMERO',                     'campo', 'pedido.numero',                null, true),
  (3,  'FECHA',                      'campo', 'pedido.fecha',                 null, true),
  (4,  'IDENTIDAD CLIENTE',          'campo', 'cliente.nit',                  null, true),
  (5,  'CODIGO DEL CLIENTE',         'campo', 'pedido.codigo_cliente_helisa', null, false),  -- obligatoriedad por confirmar
  (6,  'IDENTIDAD VENDEDOR',         'campo', 'parametro.helisa_vendedor',    null, false),
  (7,  'TIPO CONCEPTO',              'campo', 'linea.tipo_concepto',          null, true),
  (8,  'CODIGO CONCEPTO',            'campo', 'linea.codigo_concepto',        2,    true),
  (9,  'CODIGO UNIDAD',              'vacio', null,                           null, false),
  (10, 'REFERENCIA',                 'vacio', null,                           null, false),
  (11, 'CODIGO BARRAS',              'vacio', null,                           null, false),
  (12, 'ARTICULO/SERVICIO',          'campo', 'linea.descripcion',            null, true),
  (13, 'CODIGO BODEGA',              'vacio', null,                           null, false),
  (14, 'LISTA DE PRECIO',            'campo', 'pedido.lista_precio',          null, false),
  (15, 'CANTIDAD',                   'campo', 'linea.cantidad',               2,    true),
  (16, 'VALOR UNITARIO',             'campo', 'linea.valor_unitario',         2,    true),
  (17, 'VALOR TOTAL',                'vacio', null,                           2,    false),  -- no obligatorio: Helisa lo calcula
  (18, 'TARIFA DESCUENTO',           'vacio', null,                           null, false),
  (19, 'VALOR DESCUENTO',            'vacio', null,                           null, false),
  (20, 'TARIFA DESCUENTO ADICIONAL', 'vacio', null,                           null, false),
  (21, 'VALOR DESCUENTO ADICIONAL',  'vacio', null,                           null, false),
  (22, 'CENTRO DE COSTO',            'campo', 'plantilla.centro_costo',       2,    false),
  (23, 'CODIGO NEGOCIO',             'vacio', null,                           2,    false),  -- ¿'1'? por confirmar
  (24, 'OBSEQUIO',                   'vacio', null,                           null, false)
) as c(orden, titulo, origen, campo, solo, oblig);

insert into plantilla_plano_linea (plantilla_id, orden, tipo_linea, clase, componente, concepto, omitir_en_cero, lleva_tercero) values
  (3, 1, 'concepto',   'F', 'basico',         null, false, true),
  (3, 2, 'concepto',   'F', 'kg_adicionales', null, true,  true),
  (3, 3, 'concepto',   'F', 'kg_total',       null, false, true),
  (3, 4, 'concepto',   'F', 'fijo',           null, false, true),
  (3, 5, 'comentario', 'F', null, 'SERVICIO ESPECIAL DE ASEO PRESTADO MES DE {periodo.nombre}', false, true),
  (3, 6, 'comentario', 'F', null, 'RH {rh.numero} PERIODO {periodo.desde} A {periodo.hasta}',   false, true),
  (3, 7, 'comentario', 'F', null, '{rh.kg_total} KG EN {rh.visitas} VISITAS',                  false, true);
-- El motor solo usa las líneas de concepto cuyo componente aplica al esquema de la tarifa.

-- Plantilla RC v2: las 22 columnas de la v5 con cruce formateado y Ind. Fiscal; líneas en los dos libros.
insert into plantilla_plano (id, tipo, version, nombre, estado, formato, separador, codificacion, tipo_documento,
                             prefijo_doc_fuente, formato_cruce, requiere_libro_n, creada_por, nota_cambio)
select 4, 'RC', 2, 'Movimiento contable con libros F y N', 'borrador', 'csv', ';', 'windows-1252', null,
       'FVE', '{prefijo}{numero}', true, u.id,
       'Tipo RC1 o RC2, columna de cruce y cuentas por confirmar con la estructura oficial de Julio.'
from usuario u where u.rol = 'admin' limit 1;

insert into plantilla_plano_columna (plantilla_id, orden, titulo, origen, campo)
select 4, c.orden, c.titulo, c.origen,
       case c.titulo when 'DOC FUENTE' then 'aplicacion.cruce'
                     when 'IND A AFECTAR' then 'linea.ind_fiscal'
                     else c.campo end
from plantilla_plano_columna c where c.plantilla_id = 2;

insert into plantilla_plano_linea (plantilla_id, orden, tipo_linea, clase, uso_cuenta, naturaleza, ind_fiscal, concepto, lleva_tercero, omitir_en_cero) values
  (4, 1, 'caja',    'F', 'caja',    'D', 1, 'RECIBO PROVISIONAL {recibo.numero} {recibo.tipo}', true, false),
  (4, 2, 'cartera', 'F', 'cartera', 'C', 2, 'ABONO A {aplicacion.cruce}',                       true, false),
  (4, 3, 'caja',    'N', 'caja',    'D', 1, 'RECIBO PROVISIONAL {recibo.numero} {recibo.tipo}', true, false),
  (4, 4, 'cartera', 'N', 'cartera', 'C', 2, 'ABONO A {aplicacion.cruce}',                       true, false);

select setval('plantilla_plano_id_seq', 4);
-- La plantilla 1 (FV de la v5) queda en borrador y sin uso en la Propuesta 1.
```

---

## 6. Contratos de API y adaptadores

### 6.1 Endpoints nuevos o cambiados (resumen; detalle en OpenAPI)

```
# Catálogos de Helisa, equivalencias y cuentas (C6, C7)
GET  /api/v1/helisa/conceptos · POST /helisa/conceptos · PUT /helisa/conceptos/:id
POST /api/v1/helisa/cartillas/importar  {tipo:'clientes'|'conceptos'|'listas', archivo_id, simulacro} → {filas, emparejadas, ambiguas, errores}
GET  /api/v1/helisa/equivalencias · POST /helisa/equivalencias · PUT /helisa/equivalencias/:id · POST /helisa/equivalencias/:id/aprobar
GET  /api/v1/helisa/equivalencias/validar?periodo_id= → {faltantes:[{cierre_cliente_id, punto_facturable, componente, motivo}]}
GET  /api/v1/helisa/cuentas · POST /helisa/cuentas · PUT /helisa/cuentas/:id · POST /helisa/cuentas/:id/aprobar

# Pedidos y archivo OP (G′4, G′6)
POST /api/v1/pedidos/generar {periodo_id, cierre_ids?, fecha?} → {pedidos:[...], errores:[{cierre_cliente_id, codigo, mensaje}]}
GET  /api/v1/pedidos?periodo=&estado=&cliente= · GET /pedidos/:id (con líneas)
POST /api/v1/pedidos/:id/anular {motivo, anulado_en_helisa?}
POST /api/v1/planos/op {periodo_id?, pedido_ids?} → archivo_plano (TXT Windows-1252 + XLSX de apoyo)
POST /api/v1/planos/:id/resultado {fecha, importados:[pedido_id], rechazados:[{pedido_id, error}]}
POST /api/v1/planos/ter {cliente_ids?} → archivo_plano (cartilla de terceros, HEL-06)
POST /api/v1/clientes/:id/codigo-helisa {codigo, sede_id?}   (registra el código que asignó Helisa y marca existe_en_helisa)

# FVE (G4)
POST /api/v1/cierres/:id/facturar {prefijo, consecutivo, fecha, vence, total_helisa, cufe?}   (Δ: antes {numero, ...})
POST /api/v1/facturas-helisa {pedido_ids[], prefijo, consecutivo, fecha, vence, total_helisa, cufe?}   (FVE que agrupa pedidos)
POST /api/v1/facturas-helisa/cargar {archivo_id, simulacro} → {emparejadas, ambiguas, sin_pareja}
POST /api/v1/facturas-helisa/cargas/:id/confirmar {decisiones:[{fila, pedido_id|null}]}

# Recibo RC (G′5): sin cambio de contrato; la plantilla RC v2 agrega los libros F y N
POST /api/v1/planos/rc {periodo_id?, recibo_ids?} → archivo_plano
POST /api/v1/recibos/:id/cruzar {tipo_helisa, numero_helisa, fecha}   (Δ: agrega tipo_helisa)

# Trazabilidad (TRZ)
GET  /api/v1/trazabilidad/buscar?q= → [{tipo, clave, cierre_cliente_id, entidad, entidad_id, cliente, periodo}]
GET  /api/v1/trazabilidad/cadena/:cierre_cliente_id → {cliente, periodo, eslabones:[{tipo, numero, estado, fecha, usuario, documento_url?, hash16?, cufe?, pendiente?, accion?}]}
GET  /api/v1/trazabilidad/matriz?periodo_id=&filtro=sin_fve|con_saldo|rechazados|con_diferencia → filas
POST /api/v1/trazabilidad/expediente/:cierre_cliente_id → documento {pdf_url, zip_url, sha256}
GET  /api/v1/trazabilidad/bitacora/:cierre_cliente_id?usuario=&accion= → auditoría

# Integración Conekta (solo 1B)
GET  /api/v1/integracion/conekta/estado → {configurada, url_es_https, cola:{pendientes, inciertos, pausada}, consumo:{dia, mes}}
POST /api/v1/integracion/conekta/probar
GET  /api/v1/integracion/envios?estado=&entidad= · POST /integracion/envios/:id/reintentar · POST /integracion/envios/:id/verificar {resultado, nota} · POST /integracion/envios/:id/descartar {motivo}
POST /api/v1/integracion/conekta/leer-facturas {desde, hasta} → emparejamiento (como la carga de listado)
POST /api/v1/integracion/conekta/cartera {cliente_id?}
```

### 6.2 Adaptadores: reemplazo de `SalidaHelisa` (Arquitectura v1, §3.7)

Los **exportadores** son funciones puras en `packages/shared/helisa/` (sin red ni base de datos; se prueban con la semilla). El **canal** decide cómo llega a Helisa: archivo plano (1A) o Conekta (1B). La API elige el canal por el parámetro `helisa.canal`, y el archivo plano queda siempre disponible como contingencia.

```ts
// packages/shared/helisa/tipos.ts — modelo canónico propio, independiente del canal
export type LineaPedido =
  | { tipoConcepto: 2; componente: Componente; codigoConcepto: string; descripcion: string; cantidad: Decimal; valorUnitario: Decimal }
  | { tipoConcepto: 3; descripcion: string };

export interface PedidoHelisa {
  id: string; cierreClienteId: string; tipo: string; numero: number; fecha: string;      // fecha ISO
  identidadCliente: string; codigoClienteHelisa?: string; listaPrecio?: string;
  lineas: LineaPedido[]; subtotal: Decimal;
}

export interface LineaAsiento {
  clase: 'F' | 'N'; indFiscal: number; cuenta: string; naturaleza: 'D' | 'C';
  valor: Decimal; base?: Decimal; concepto: string; tercero: string;
  cruce?: { prefijo: string; numero: string };                                           // FVE que se cruza
}
export interface AsientoContable { tipoDocumento: string; numero?: string; fecha: string; lineas: LineaAsiento[] }

// Exportadores (puros)
export function construirPedidos(cierres: CierreLiquidado[], ctx: ContextoHelisa): Resultado<PedidoHelisa[]>;
export function construirAsientoRecibo(r: ReciboConAplicaciones, cuentas: TablaCuentas, p: PlantillaMovimiento): Resultado<AsientoContable>;
export function filasPedido(pedidos: PedidoHelisa[], p: PlantillaPlano): Fila[];               // 24 campos por línea
export function filasMovimiento(asientos: AsientoContable[], p: PlantillaPlano): Fila[];
export function escribirPlano(filas: Fila[], p: PlantillaPlano): { bytes: Uint8Array; sha256: string; avisos: Aviso[] };

// apps/api/src/helisa/canal.ts — implementado por CanalArchivo (1A) y CanalConekta (1B)
export interface CanalHelisa {
  readonly nombre: 'archivo' | 'conekta';
  enviarPedidos(pedidos: PedidoHelisa[]): Promise<ResultadoCanal>;        // archivo: archivo_plano OP · conekta: encola set/order
  enviarAsientos(asientos: AsientoContable[]): Promise<ResultadoCanal>;   // archivo: archivo_plano RC · conekta: encola set/document
  sincronizarClientes(clientes: ClienteHelisa[]): Promise<ResultadoCanal>; // archivo: cartilla de terceros (HEL-06) · conekta: set/client2_0
  leerFacturas(desde: string, hasta: string): Promise<FacturaLeida[]>;    // archivo: carga del listado · conekta: summary/billDetails
  leerCartera(nit: string | null, fecha: string): Promise<CarteraLeida[]>; // archivo: Excel de cartera · conekta: summary/portfolioByClient
}
```

### 6.3 Exportador de pedidos (archivo OP)

**Formato inicial** (configurable en la plantilla OP v1; confirmar con la estructura oficial y la importación de prueba): TXT; separador «|»; sin calificador de texto; **sin fila de títulos**; Windows-1252; CRLF; fecha dd/mm/aaaa; sin separador de miles; punto decimal; cantidad con 2 decimales; valores enteros cuando no tienen centavos (74790) y con 2 decimales cuando los tienen (3991.60); **24 campos siempre presentes** (los vacíos entre separadores). Un archivo lleva varios pedidos; cada pedido es un bloque de líneas con el mismo TIPO y NUMERO. Junto al TXT se genera un **XLSX de apoyo** con las mismas líneas, con títulos y totales por pedido, para revisar sin abrir el TXT.

**Mapeo campo a campo** (de `research/formatos.md` §4.1, ajustado a los nombres de la v6):

| # | Campo de Helisa | Línea de servicio (tipo 2) | Línea de comentario (tipo 3) | Origen en el sistema | Estado |
| --- | --- | --- | --- | --- | --- |
| 1 | TIPO | Tipo de pedido de Comserva | igual | `parametro helisa.tipo_pedido` → `pedido_helisa.tipo` | Falta (tarea 0.2) |
| 2 | NUMERO | Número del pedido | igual | Serie `pedido` | Por confirmar si Helisa lo valida o lo asigna |
| 3 | FECHA | dd/mm/aaaa | igual | Parámetro `pedido.fecha` (corte o generación) | Por confirmar si condiciona la FVE |
| 4 | IDENTIDAD CLIENTE | NIT sin DV | igual | `cliente.nit` | Disponible |
| 5 | CÓDIGO DEL CLIENTE | Código del punto facturable | igual | `sede.codigo_helisa` o `cliente.codigo_helisa` | Falta (cartilla de clientes); obligatoriedad por confirmar |
| 6 | IDENTIDAD VENDEDOR | 828002730 | igual | Parámetro `helisa.vendedor` | Visto; por confirmar si es obligatorio |
| 7 | TIPO CONCEPTO | 2 | 3 | Tipo de línea | Visto |
| 8 | CODIGO CONCEPTO | Código del concepto | vacío | `equivalencia_concepto` → `concepto_helisa.codigo` | Falta (lista de conceptos con código) |
| 9–11 | CODIGO UNIDAD · REFERENCIA · CODIGO BARRAS | vacíos | vacíos | — | Por confirmar unidad |
| 12 | ARTÍCULO/SERVICIO | Nombre del concepto o `texto_linea` | Texto del comentario | Equivalencia; plantilla de comentarios | Longitud máxima por confirmar |
| 13 | CODIGO BODEGA | vacío | vacío | Parámetro `helisa.bodega` | Por confirmar si los servicios la piden |
| 14 | LISTA DE PRECIO | Código de la lista | igual (Julio la llena en todas las líneas) | Equivalencia o `cliente.lista_precio_helisa` | Por confirmar si el valor unitario del archivo la reemplaza |
| 15 | CANTIDAD | 1 · kilos adicionales · kilos totales | vacío | Según el esquema (ver abajo) | Disponible; decimal por confirmar |
| 16 | VALOR UNITARIO | Básico · precio del kilo · valor fijo (sin IVA) | vacío | Snapshot de la tarifa en el cierre | Disponible |
| 17 | VALOR TOTAL | vacío (Helisa lo calcula) | vacío | Opcional: `linea.valor_total` | «No es obligatorio» [Visto 21-oct] |
| 18–21 | Descuentos | vacíos | vacíos | — | Sin descuentos en los ejemplos |
| 22 | Centro de costo | 0101 | vacío | `plantilla_plano.centro_costo` | Visto |
| 23 | CÓDIGO NEGOCIO | vacío o 1 | vacío | Parámetro `helisa.negocio` | Por confirmar |
| 24 | Obsequio | vacío | vacío | — | Visto vacío |

**Líneas por esquema** (propuesta de diseño, **por confirmar con Julio**):

| Esquema | Líneas de servicio | Comentarios (tipo 3) |
| --- | --- | --- |
| `basico_incluidos` (Cofema) | Concepto del básico × 1 × básico; «KILOGRAMOS ADICIONALES» × kilos adicionales × precio del kilo (se omite si es 0) | «SERVICIO ESPECIAL DE ASEO PRESTADO MES DE {periodo}» (como en las FVE reales); «RH {número} PERIODO {desde} A {hasta}»; «{kg} KG EN {n} VISITAS» |
| `por_kilo` (FVE 25997) | Concepto × kilos totales × precio del kilo | Iguales |
| `fijo_mensual` | Concepto × 1 × valor fijo | Iguales |
| Alternativa por categoría (no implementada) | Un concepto por categoría en kilos («BIOLÓGICOS (KILOGRAMOS)»…) | Iguales |

**Ejemplo ilustrativo (Cofema, septiembre de 2026).** Entre `< >` lo que falta:

```
<TIPO>|<N>|23/09/2026|891190218|<COD_CLIENTE>|828002730|2|<COD_BASICO>||||RECOLEC. TRANSP Y DISPOS. FINAL RESIDUOS BIOLOGICOS||2|1.00|74790||||||0101||
<TIPO>|<N>|23/09/2026|891190218|<COD_CLIENTE>|828002730|2|<COD_KG_ADIC>||||KILOGRAMOS ADICIONALES||2|393.85|4600||||||0101||
<TIPO>|<N>|23/09/2026|891190218|<COD_CLIENTE>|828002730|3|||||SERVICIO ESPECIAL DE ASEO PRESTADO MES DE SEPTIEMBRE 2026||2||||||||||
```

**Validaciones** (todas antes de escribir; un pedido con error no entra al archivo y se lista con su causa): código de cliente (CLIENTE_SIN_CODIGO_HELISA); concepto con código real (CONCEPTO_HELISA_FALTANTE); suma de líneas = subtotal del cierre (PEDIDO_NO_CUADRA; debe ser exacta porque usa los mismos números); cantidades > 0; separador en códigos (SEPARADOR_EN_TEXTO) o en textos (se reemplaza por «/» con aviso); caracteres fuera de Windows-1252 (CODIFICACION_INVALIDA); longitud máxima por columna (`ancho`); exactamente 23 separadores por línea.

**Lo que vuelve de Helisa:** «Lista de errores» de la importación (se pega en el resultado por pedido, G′6) y, al facturar, la FVE (G4).

### 6.4 Exportador de movimiento contable (libros F y N)

Entrada en la Fase 1: un recibo con sus aplicaciones. Salida: un asiento con, por cada libro, un débito a caja o banco por el total y un crédito a la cartera 1305 por cada FVE aplicada, con el documento cruce de esa FVE.

| Regla | Detalle |
| --- | --- |
| Libros | Cada línea F tiene su espejo N con la cuenta equivalente (de `cuenta_contable`) y el mismo Ind. Fiscal (columna IND A AFECTAR, que se reinicia en cada libro, como en el CSV de ejemplo). Si Helisa genera sola la línea N por cuenta espejo, se apaga `requiere_libro_n` (**por confirmar**) |
| Cuentas | Caja (efectivo) o banco (según medio y `banco_alias`) en débito; 1305 en crédito. Las subcuentas exactas en los dos libros las entrega Julio (tarea 0.4) |
| Cruce | `formato_cruce` de la plantilla sobre `factura_helisa.prefijo` y `consecutivo` («FVE25756» por defecto; si van en dos columnas, dos campos) |
| Cuadre | Débitos = créditos por libro y por documento (LIBROS_DESCUADRADOS) |
| Tipo y número | Tipo RC1 o RC2 en `plantilla_plano.tipo_documento`; si el número lo pone el archivo o Helisa está **por confirmar** |
| Anticipo | Sin FVE no hay cruce; va a la cuenta de anticipos cuando Julio la defina; mientras tanto no entra al archivo y se lista |
| Formato | El de la estructura oficial; semilla RC v2 en CSV con «;», Windows-1252 y títulos (el diálogo de importación filtraba .csv [Visto 21-oct]) |
| Fase 2 | El mismo motor arma el asiento de una factura (débito 1305; crédito ingreso por concepto; crédito IVA con base; libros F y N). En la Propuesta 1 no se usa, pero queda probado con el recibo |

### 6.5 Cliente Conekta (solo modalidad 1B)

**Lo oficial** [Oficial, helisa.com]: web services JSON en UTF-8 sin caracteres especiales; autenticación con **firma HMAC-SHA256** del JSON con la llave del cliente; se envían `json`, `id` (empresa) y `sign` (hexadecimal) como formulario; respuestas 200 insertado, 202 datos incorrectos o ya existentes, 204 sin datos, 401 firma incorrecta, 409 conflicto, 423 error entre el servicio y la base de datos, 500; errores 400 con códigos 3 a 9 (8 = débitos ≠ créditos, 9 = códigos de cruce inválidos); topes de 100.000 registros al mes y 5.000 al día; unos 4 segundos por registro; disponibilidad 97,5 %; conexión de pruebas válida **30 días hábiles** desde la entrega de URL, Id y Key; exige que Helisa esté en el hosting de Helisa y contrato anual. La unicidad de los datos es responsabilidad de la aplicación externa.

**Diseño:**

1. **Firma.** Se serializa el JSON una sola vez y se firma exactamente esa cadena: `sign = hex(HMAC_SHA256(llave, json_utf8))`. Antes de producción se compara contra el ejemplo oficial de Helisa (mayúsculas o minúsculas del hexadecimal, orden de campos, espacios).
2. **Normalización.** Textos a ASCII (sin tildes ni eñes; qué hacer con la «Ñ» está **por confirmar**) antes de serializar; un carácter que no se puede normalizar da CODIFICACION_INVALIDA.
3. **Cola** `integracion_envio` + pg-boss, concurrencia 1 (≈ 4 s por registro: 240 pedidos ≈ 16 minutos), contadores diario y mensual contra los topes, reintentos con espera creciente solo para 423, 500 y fallas de red **con respuesta**.
4. **Idempotencia.** Clave `operacion:entidad:id:version`; índice único de envíos aceptados por entidad. Un tiempo agotado deja el envío **incierto**: no se reintenta solo, porque no hay forma documentada de consultar un pedido insertado; alguien verifica en Helisa y marca el resultado. Un 202 de «ya existe» también va a verificación.
5. **Exclusión con archivos.** Un documento aceptado por Conekta no entra en un archivo y uno en archivo vigente no se envía (DOCUMENTO_YA_ENVIADO).
6. **Respuestas.** 401 pausa la cola y alerta al administrador (INTEGRACION_FIRMA_INVALIDA); 202 y 400 → rechazado con el código traducido (INTEGRACION_RECHAZADA); 423 y 500 → reintento y, al agotarse, INTEGRACION_NO_DISPONIBLE. Si la respuesta trae el número del documento creado, se guarda en `numero_externo` (**por confirmar**).
7. **Riesgo: la URL documentada es `http://webconekta.helisa.com:9590/KansasWS/…`, sin TLS.** La firma protege la integridad del mensaje, pero no su confidencialidad (NIT, valores y nombres viajan en claro) ni evita que alguien repita un mensaje capturado (no hay marca de tiempo documentada). Mitigaciones: (a) preguntar a Helisa por un endpoint HTTPS y usarlo si existe; (b) si no existe, que Comserva acepte el riesgo por escrito; (c) llamar solo desde el servidor, nunca desde la app; (d) enviar el mínimo de datos (sin correos ni teléfonos); (e) llave en secretos, rotación si se sospecha exposición; (f) advertencia permanente en el panel mientras la URL sea `http://`.
8. **Ventana de pruebas.** Pedir URL, Id y Key al empezar el bloque Conekta (sección 8), no antes: la conexión de pruebas vence a los 30 días hábiles.

---

## 7. Pruebas de regresión obligatorias

Cada caso corre en la función pura (`packages/shared`), en SQL (`fn_liquidar` y triggers) y en un E2E del panel donde aplique. Las cifras son las de las facturas reales.

| # | Caso | Datos de entrada | Resultado esperado |
| --- | --- | --- | --- |
| R1 | **Cofema, septiembre de 2026** (básico + kilos) | 4 visitas, 413,85 kg; tarifa 74.790 / 20 kg / 4.600 $/kg / IVA 19 % | Adicionales 393,85 kg; valor adicionales 1.811.710,00; subtotal 1.886.500,00; IVA 358.435,00; **total 2.244.935,00**. Pedido: «RECOLEC…» 1 × 74.790 y «KILOGRAMOS ADICIONALES» 393.85 × 4.600 + comentarios; suma 1.886.500,00. FVE 25756 registrada por 2.244.935 → diferencia 0 |
| R2 | **Solo por kilo** (como la FVE 25997) | 108,50 kg; precio 3.991,60; IVA 19 % | Subtotal 433.088,60; IVA 82.286,83 (82.286,834 redondeado half-up); **total 515.375,43**. Pedido: una línea 108.50 × 3991.60 + comentario «SERVICIO ESPECIAL DE ASEO PRESTADO MES DE OCTUBRE 2026». Nota: la representación de Helisa mostró «total gravado 433.089,00»; cómo redondea Helisa al facturar desde el pedido se verifica en la importación de prueba |
| R3 | **Cobro fijo** | Tarifa fija de 25.000 y de 30.000; cualquier cantidad de kilos (por ejemplo 12,30) | 25.000 → IVA 4.750 → **29.750,00**; 30.000 → IVA 5.700 → **35.700,00**. Pedido: una línea 1 × 25000. Los kilos solo aparecen en el RH y en el comentario |
| R4 | **Pedido con comentario** (bytes) | Pedido de Cofema con los tres comentarios y un concepto con tilde en el nombre (por ejemplo «ANATOMOPATOLÓGICOS (KILOGRAMOS)») | Cada línea tiene exactamente 23 «\|» y termina en CRLF; las líneas tipo 3 no traen código, cantidad ni valores; la «Ó» se escribe como el byte 0xD3 (Windows-1252) y el archivo no contiene la secuencia UTF-8 0xC3 0x93; sin BOM; con `quitar_tildes` la «Ó» sale «O» |
| R5 | Varios pedidos en un archivo | Dos clientes y un cliente con dos sedes facturables | Cuatro pedidos con números consecutivos; cada sede con su código; el archivo cuadra con la suma de subtotales |
| R6 | Recibo con libros F y N | Recibo 35672 de $500.000 aplicado a la FVE 25756 | 4 líneas; D = C = 500.000 en F y en N; cruce «FVE25756»; saldo de referencia 1.744.935 |
| R7 | Casos negativos | Cliente sin código; componente sin equivalencia; código con «\|»; kilos < incluidos; tarifa por visita | CLIENTE_SIN_CODIGO_HELISA; CONCEPTO_HELISA_FALTANTE; SEPARADOR_EN_TEXTO; solo la línea del básico (sin línea de adicionales); ESQUEMA_TARIFA_NO_SOPORTADO |
| R8 | Doble exportación y reapertura | Regenerar el archivo de un periodo; reabrir un cierre con pedido importado | Un solo archivo vigente; PEDIDO_IMPORTADO hasta confirmar la anulación en Helisa |
| R9 | Trazabilidad | Buscar «25756», «FVE 25756», «22690-26» (RH de la semilla, igual que en los mockups), «35672» | Todas abren la cadena de Cofema septiembre; un cierre sin FVE muestra «Falta registrar FVE» |
| R10 | Conekta (1B) | Mismo pedido encolado dos veces; respuesta 401; tiempo agotado | Un solo envío; cola pausada con alerta; envío incierto sin reintento automático |

Se mantienen los casos de la Arquitectura v1 (§6.2): kilos con dos decimales por precio impar, IVA 0 %, cambio de tarifa el día 15 (rige la del corte), visita del 27 que cae en el periodo siguiente.

---

## 8. Orden de trabajo por semanas y reparto por cuentas de Claude

**Capacidad (brief v6):** equipo de 3; tiempo parcial = 45 h/semana (≈ 15 h por persona); tiempo completo = 105 h/semana. **Fase 0 + Fase 1 (1A) = 630 h** → 14 semanas a tiempo parcial (≈ 6 a tiempo completo) + **4 semanas de piloto** (un ciclo de corte) = **≈ 18 semanas a tiempo parcial** (≈ 10 a tiempo completo). **Conekta (1B) = 70 h** → +1,5 semanas a tiempo parcial (+0,7 a tiempo completo). Reparto como en el SPEC §8: la **cuenta Max** lleva la app y la sincronización (lo más agéntico y largo) y revisa PR; las **dos cuentas Pro** llevan API y datos (Pro 1) y panel, PDF y pruebas (Pro 2), con `/model sonnet`, sesiones cortas y `/clear` entre tareas.

| Semana | Max (app y sync; revisa PR) | Pro 1 (API y datos) | Pro 2 (panel, PDF, pruebas) | Fase 0 y hitos (coordinación) |
| --- | --- | --- | --- | --- |
| 1 | A1, A3 (liquidación de tres esquemas, `lineasPedido`, `aWindows1252`) | A2 (schema + anexo v5 + anexo v6), A4, B1; A3b script de planos | Componentes base del panel | 0.1 solicitud a Julio; 0.2 pedir habilitar Pedido; 0.5 cartillas |
| 2 | B2, B3, D1 | B4, C1, C2 | C3, C4, C5 (pantallas) | 0.6 importación de prueba de Cofema con el script; 0.4 equivalencias y cuentas; 0.7 decisión Conekta |
| 3 | D2, D3, D4, D5 | C6 (Excel y cartillas de Helisa), C7 (API) | F1, F6, C7 (pantalla) | 0.3 estructuras oficiales en la semilla (configurador) |
| 4 | E1, E2, E3 | Módulo de visitas (consultas) | F2 | |
| 5 | E4, E5 | Módulo de recibos y caja | F3, F4 | |
| 6 | E6, E7 | G1 (pre-cierre con bloqueos v6) | F5, plantillas de PDF | |
| 7 | E8 (constancia, hash) | G2 (tres esquemas, punto facturable), G5 | G3 (planilla), G6 | |
| 8 | E9, E10 | G′1, G′2, G′3 (motor de pedidos y de movimiento F/N) | G7 (correo), G8 | |
| 9 | E11, E12 | G′4 (archivo OP), G′5 (RC F/N), G′6, G′9 (cartilla de terceros) | G′7 (configurador y bandejas) | |
| 10 | Revisión de PR; TRZ1 (vistas e índice) | G4 (FVE: digitación, agrupación, carga de listado) | TRZ2, TRZ4 (cadena y matriz) | |
| 11 | H4 (APK y celulares) | TRZ3, TRZ5, TRZ6 | H1 (E2E: Cofema, por kilo, fijo, trazabilidad) | |
| 12 | Correcciones tras la prueba con un operario | H2 seguridad, H3 producción | H5 manuales | |
| 13 | Revisión y soporte | Datos reales: carga Excel, cartillas de Helisa, equivalencias y cuentas aprobadas | Capacitación | |
| 14 | Holgura y estabilización | Importación real de pedidos y RC en el Helisa de Comserva; ajustes del configurador | Acta de formatos; preparación del piloto | E11 cumplido |
| 15–18 | Piloto en paralelo: soporte y correcciones menores | Piloto: pedidos, FVE y RC | Piloto: medición del tiempo por factura e **informe de compuerta** | Acta de aceptación |

**Con Conekta (1B):** se insertan 1,5 semanas después de la semana 11 (API1–API8 en Pro 1 con revisión de Max; Pro 2 hace la bandeja de envíos y el estado de la integración); el resto del plan se corre 1,5 semanas. La credencial de pruebas se pide al empezar ese bloque.

**A tiempo completo:** las 14 semanas se comprimen a ≈ 6; el límite pasa a ser la capacidad de las cuentas Pro (medir `/usage` desde la semana 1, como dice el SPEC §9).

**Dependencias que pueden mover el plan:** sin el tipo de pedido habilitado (0.2) no hay importación real (semana 14) ni piloto; sin las estructuras oficiales (0.3) se trabaja contra la plantilla observada y se ajusta en el configurador sin código (es justo para lo que existe); sin equivalencias reales (0.4) las plantillas no se pueden aprobar.

---

## 9. Riesgos de ejecución nuevos (se suman al SPEC §9)

| Riesgo | Efecto | Cómo se vigila o se mitiga |
| --- | --- | --- |
| Comserva no puede habilitar Pedido, o tiene costo | La Propuesta 1 se queda sin entrada en Helisa | Confirmarlo en la Fase 0 (0.2); mientras tanto el reporte de contingencia (camino A) sigue siendo la salida |
| Estructuras oficiales tarde o distintas a lo visto | Archivos rechazados | Motor y configurador contra la plantilla observada; la oficial se ajusta en el configurador; importación de prueba en la Fase 0 |
| Codificación y decimales | Tildes dañadas (ya pasó en la demostración con un archivo UTF-8) o 393.85 leído como 39.385 | Prueba de bytes en CI; importación de prueba; separador decimal configurable |
| Separador dentro de los textos (no hay calificador) | Columnas corridas | Validación y reemplazo en el escritor; prueba R7 |
| Código de cliente y sedes facturables | Pedidos al beneficiario equivocado | Carga de la cartilla de Helisa con simulacro; bloqueo en pre-cierre |
| Equivalencias mal mapeadas | IVA o contabilización errada en Helisa | Aprobación de Gerencia tras la validación de Julio; pantalla de validación con FVE reales |
| Facturación una a una (≈ 240 FVE en 4 semanas, inferencia por confirmar) | Comserva percibe poco ahorro | Medirlo en el piloto e informarlo en la compuerta; hoja de trabajo ordenada para facturar más rápido |
| Helisa en un servidor remoto (TSplus) administrado por un tercero | El archivo hay que subirlo a ese servidor; la API depende de su hosting | Procedimiento de carga en el runbook; decisión 0.7 con el titular de la licencia |
| Conekta por HTTP sin TLS | Datos en claro; posible repetición de mensajes | Sección 6.5 punto 7 |
| Conekta: resultado incierto | Pedido o recibo duplicado en Helisa | Estado incierto sin reintento automático; verificación manual |
| Conekta: ventana de pruebas de 30 días hábiles | Credencial vencida antes de probar | Pedirla al empezar el bloque |

---

## 10. Pendientes que bloquean historias (por confirmar)

| Pendiente | Con quién | Historias que bloquea |
| --- | --- | --- |
| Tipo de documento Pedido habilitado en Comserva, su código y quién pone el número | Julio y Comserva | G′2 (aprobar), G′4 en real, H6 |
| Estructura oficial del pedido (obligatorios, longitudes, decimal, fila de títulos, codificación) | Julio | G′2, G′3 (ajuste por configurador) |
| Estructura oficial del recibo: columna de cruce y su formato, RC1 o RC2, quién numera, líneas N enviadas o generadas por cuenta espejo | Julio | G′5, API4 |
| Códigos de concepto, listas de precio y si el valor unitario del archivo reemplaza el precio de la lista | Julio (cartillas exportadas) | C7, G′3 |
| Cartilla de clientes con códigos y códigos adicionales por sede | Julio | C1, C6, G1 |
| Estructura de la cartilla de terceros (clientes nuevos) y cómo asigna Helisa el código del cliente | Julio | G′9 |
| Concepto para el cobro fijo y si se factura por categoría en kilos | Julio y Lucrecia | C7, motor de pedidos |
| Si los clientes de tarifa fija o básica se cobran sin visitas en el periodo | Comserva | G1, G2 |
| Cuentas de caja, bancos, cartera y anticipos en los dos libros | Julio | C7, G′5 |
| Formato del listado de FVE que se puede exportar de Helisa (para registrar sin digitar) | Julio | G4 (vía b) |
| Contratación de Conekta, titular de licencia y hosting, endpoint HTTPS, estructura JSON de pedidos y clientes, campos de salida de lectura de facturas y cartera | Comserva y Helisa | Épica API |
| Volumen real de facturas al mes y cuántas son de residuos | Comserva | Dimensión del piloto y de la compuerta |
