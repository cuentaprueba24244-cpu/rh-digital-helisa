# Cambios para el desarrollo · v6 · Propuesta 2

**RH digital Comserva · Propuesta 2 «RH digital con facturación electrónica» · versión 1.1 · 22 de octubre de 2026, complementada el 25 de octubre de 2026**

Documento técnico **interno del equipo** (no lleva precios). Traduce la Propuesta 2 de la v6 a cambios concretos sobre:

- `SPEC.md` v1.1 (19 oct 2026): épicas A–H y G′, contratos, semilla, plan por semanas.
- `arquitectura/schema.sql` v1.0 y `arquitectura/schema_v5_archivos_planos.sql` (anexo v5).
- `arquitectura/Arquitectura tecnica Comserva (v1).md` (secciones 2 y 3.7: la DIAN y la salida hacia Helisa).

La Propuesta 2 contiene **todo lo de la Propuesta 1** (Fase 0 y Fase 1) y le suma la **Fase 2 · facturación electrónica por proveedor tecnológico**. Por eso las secciones de la Fase 0 y la Fase 1 de este documento son las mismas de `v6 adrian/propuesta 1/Cambios para el desarrollo (v6, propuesta 1).md`; lo propio de la Fase 2 está en las secciones 3.2, 4.0 (tareas 0.8 a 0.11), 4.14, 4.15, 5.4, 6.6 a 6.8, 7.2, 8.2, 9 y 10.

No reemplaza los documentos base: dice qué cambia en cada uno. Cuando Comserva apruebe la propuesta y lleguen los formatos oficiales, este contenido se funde en un SPEC v2.0 y en los anexos SQL v6 validados. Los requerimientos de negocio están en `v6 adrian/propuesta 2/Levantamiento de requerimientos Comserva (v6, propuesta 2).html`; si un ID o una regla de este documento no coincide con el levantamiento, manda el levantamiento.

**Complemento del 25 de octubre de 2026.** Los formatos oficiales llegaron el 23 de octubre (Excel de Julio, `pruebas/archivosplano/Plano pedido.xlsx`) y Ronaldo los dejó en un anexo SQL ya validado (`arquitectura/schema_v6_pedido_recibo.sql`). La **sección 11** los incorpora y manda sobre lo anterior cuando no coincida. La **sección 12** agrega la prueba real en el sandbox de Factus (23 oct) y el contrato de su adaptador como primera implementación de `ProveedorFE`. Marcas nuevas: **[Excel Julio 23-oct]** y **[Sandbox Factus 23-oct]**.

**Marcas que se usan:** **[Visto 21-oct]** = se vio en pantalla o se dijo en la reunión del 21 de octubre de 2026 · **[Oficial]** = página oficial de Helisa o norma DIAN · **[Inferencia]** = conclusión del equipo · **por confirmar** = nadie lo ha confirmado todavía. Todo el DDL de la sección 5 es **orientativo, no ejecutado: validar** en el contenedor de PostgreSQL 18 antes de migrar.

---

## 0. Lo esencial

**Fase 2 (lo que agrega la Propuesta 2):**

- **El sistema emite la factura electrónica de venta** a través de un **proveedor tecnológico autorizado por la DIAN, por API** (no software propio): cierre → **prefactura** (borrador) → revisión de Lucrecia → **emisión por lote** → el proveedor firma, envía a la DIAN y devuelve **CUFE, XML, PDF y QR** → entrega al cliente en su correo de recepción → seguimiento del estado ante la DIAN (validada, rechazada, contingencia) y de los eventos **RADIAN** del cliente (acuse 030, recibo del servicio 032, aceptación expresa 033 o tácita 034 a los 3 días hábiles). La DIAN **valida** la factura (CUFE); el cliente la **acepta**.
- **Notas crédito y débito electrónicas** en el sistema, con referencia al CUFE y aprobación de Gerencia. Una factura no se anula de ninguna otra forma.
- **Numeración propia:** prefijo y rango nuevos autorizados por la DIAN y asociados al software del proveedor (de prueba «RHD»; el real **por confirmar**). Helisa conserva su numeración FVE para lo que siga facturando allí (productos, arrendamiento).
- **Helisa queda para la contabilidad:** el sistema genera el movimiento contable de las facturas y notas (débito 1305; crédito ingreso por concepto; crédito IVA; libros F y N) con la plantilla «servicio → cuenta» de Julio —aquí sí sirve casi tal cual la plantilla FV de 22 columnas de la v5— y el de los recibos, por archivo plano o por Conekta (opcional).
- **Datos fiscales del cliente obligatorios** e **IVA configurable por concepto** (hoy 19 %; la exclusión del art. 476 num. 12 del Estatuto se confirma con el contador). Retenciones: informativas, **por confirmar**. La «factura en sitio» (por visita) es una opción **por confirmar**, fuera del alcance base.
- **Regla contra la doble facturación:** un cierre facturado por el sistema no puede exportarse como pedido, y lo de RH no se factura en Helisa (`modo_facturacion` por cierre).
- **Adaptador genérico del proveedor** (`ProveedorFE`): se cotizan Plemsi y Dataico (proveedores tecnológicos) y, como alternativa, MATIAS API (modalidad software propio); cambiar de proveedor es escribir un mapeador nuevo, no rehacer la facturación. *→ Actualizado el 25 oct (sección 12): **Factus** ya se probó en su sandbox (factura de Cofema validada, consultada, idempotente y anulada con nota crédito) y es la primera implementación del adaptador; su habilitación ante la DIAN está por verificar. Plemsi y Dataico quedan de respaldo.*
- **Esfuerzo (brief v6):** Propuesta 2 = **870 h** (940 h con Conekta para la contabilidad) = 630 h de Fase 0 + Fase 1 + **240 h de Fase 2** (rango 200–300). Calendario de la Fase 2: ≈ **6 semanas a tiempo parcial** (≈ 2,5 a tiempo completo) + habilitación ante la DIAN y set de pruebas (≈ 1–3 semanas, en paralelo, **por confirmar**) + **un ciclo de piloto** (4 semanas). Total de la Propuesta 2: **por fases**, con compuerta tras el piloto de la Fase 1, ≈ **28 semanas a tiempo parcial** (≈ 16,5 a tiempo completo); **completa desde el inicio**, con la Fase 2 construida durante el piloto de la Fase 1, ≈ **24 semanas a tiempo parcial** (≈ 14 a tiempo completo). Hacerlo como software propio ante la DIAN costaría 400–600 h en lugar de la Fase 2: no se recomienda.
- **Recomendación del equipo:** por fases. La Fase 1 termina con un piloto y un informe de compuerta; si Comserva lo ve viable, se contrata la Fase 2, que se conecta donde hoy sale el archivo de pedidos sin rehacer el resto. También se puede contratar la Propuesta 2 completa desde el inicio (Fase 0 + Fase 1 + Fase 2 seguidas).

**Fase 0 y Fase 1 (igual que la Propuesta 1):**

1. **El archivo de factura de la v5 desaparece.** Helisa no importa facturas: importa **pedidos** [Visto 21-oct]. Del cierre (RH con valores) sale un **archivo de pedidos (OP)**: 24 campos, **sin cuentas, sin naturaleza y sin IVA**, TXT separado por «|», sin fila de títulos, en **Windows-1252 (ANSI)**. Un pedido por cierre de cliente (o de sede facturable) y periodo; un archivo lleva muchos pedidos. *→ Actualizado el 25 oct (sección 11.1): el formato oficial es tipo `OP`, en Excel con fila de títulos, 24 columnas con los títulos exactos de Julio.*
2. Lucrecia importa los pedidos y **elabora cada FVE en Helisa llamando el pedido** («Documento previo Pedidos», **F3**). La factura electrónica la sigue emitiendo Helisa, una a una.
3. La **FVE se registra en el sistema** (número, fecha, total y CUFE si se tiene) y se valida contra el RH (± $1) por una de tres vías: lectura automática por Conekta, carga del listado de facturas exportado de Helisa (formato por confirmar) o digitación en el panel.
4. El **recibo** sigue siendo un **movimiento contable (RC)**: caja o bancos contra cartera 1305, documento cruce = prefijo y número de la FVE, y **cada línea en los dos libros (F y N)**. La plantilla de 22 columnas de la v5 se conserva solo para el recibo. *→ Actualizado el 25 oct (sección 11.3): el recibo oficial tiene 17 columnas y 4 filas (caja y cartera en F y en N) y la cruza solo la fila de cartera F.*
5. **Tres esquemas de tarifa en la Fase 1:** básico + kilos incluidos + kilos adicionales (Cofema), **solo por kilo** (FVE 25997) y **cobro fijo mensual**.
6. **Tabla de equivalencias** (dato, no código): componente de tarifa o categoría → concepto de Helisa y lista de precio; cliente o sede → código del cliente en Helisa. Más una **tabla de cuentas** en los dos libros para el recibo.
7. **Módulo de trazabilidad** visible (épica nueva **TRZ**, TRZ-01 a TRZ-06).
8. **Modalidades:** **1A · archivos planos** (base) y **1B · API Helisa Conekta** (opcional; épica nueva **API**). Aun con API, la factura en Helisa sigue siendo una a una.
9. La Fase 1 **deja lista la Fase 2**: catálogo de conceptos (será el de productos de la factura electrónica), datos fiscales opcionales del cliente (se completan durante la Fase 1), motor contable con libros F y N, `modo_facturacion` en el cierre y liquidación con el mismo redondeo de Helisa (probada con la FVE 25756 y la FVE 25997).
10. **Esfuerzo de la Fase 0 + Fase 1 (brief v6):** **630 h** (rango 560–720) en modalidad 1A; conector Conekta = **70 h** (60–90). Calendario: Fase 0 en paralelo (≈ 2 semanas); Fase 1 ≈ **14 semanas a tiempo parcial** (≈ 6 a tiempo completo) + **4 semanas de piloto** = **≈ 18 semanas a tiempo parcial** (≈ 10 a tiempo completo); Conekta suma **1,5 semanas** a tiempo parcial (≈ 0,7 a tiempo completo).

---

## 1. Nomenclatura de la v6 y lo que no cambia

**Fases.** Fase 0 · Definición. Fase 1 · Núcleo hasta Helisa (= Propuesta 1). Fase 2 · Facturación electrónica (solo existe en la Propuesta 2). Dentro de la Fase 1 se conservan los nombres de las modalidades de la Propuesta 1: **1A** (archivos planos) y **1B** (con Conekta).

**Complementos (equivalencia con la v5, se explica una sola vez).** La antigua *fase 2* de la v5 (acta digital con firma del gerente, portal del cliente, marca de pagos por otro medio y regla «al día», ajustes a periodos facturados, reporte ambiental) pasa a ser el complemento **C1 · Acta y portal**; de esa antigua fase, la cartilla de terceros (HEL-06) sube a la Fase 1, porque Helisa exige que el cliente exista con su código antes de importar cualquier documento. La antigua *fase 3* (cierre de caja formal, WhatsApp por API, reportes operativos, entregas a dispositores) pasa a ser **C2 · Caja formal y mensajería**. Los dos se pueden contratar después, en cualquiera de las dos propuestas. En los comentarios de `schema.sql`, la marca «(F2)» se lee ahora «(C1)» y «(F3)» se lee «(C2)»; esas tablas se siguen creando desde el inicio para no migrar después.

**IDs de requerimientos.** Se conservan los de la v5 (APP-, OFI-, CAJ-, CIE-, HEL-, DOC-, POR-, REP-, RNF-) y se agregan **TRZ-** (trazabilidad), **API-** (Conekta) y **FEV-** (factura electrónica, solo en esta propuesta). Los IDs son los de la sección 13 del levantamiento de la Propuesta 2, que manda: lo de la Propuesta 1 (HEL-01 a HEL-07, con HEL-06 en la Fase 1; **OFI-16**; **TRZ-01 a TRZ-06**; **API-01 a API-08**; **RNF-17** y **RNF-18**) más, en la Fase 2, **API-09** (asientos de facturas y notas por Conekta, historia API9), **FEV-01 a FEV-15** (épica FEV, sección 4.15), **DOC-09** (representación gráfica, FEV7), **REP-04** (facturación y conciliación con Helisa, FEV11) y **RNF-19** (disponibilidad de la emisión y cero duplicados, FEV6 y FEV12). Ojo: el número de una historia (FEV1 a FEV15, orden de construcción) no es el del requerimiento (FEV-01 a FEV-15); la columna «Req.» de la sección 4.15 da la correspondencia.

**Lo que no cambia.** El trabajo en campo y la app (épicas D y E, salvo que en la Fase 2 el recibo también se aplica a las facturas emitidas por el sistema), las series y rangos (B2, B3), la constancia y el recibo en PDF, la verificación por QR, el correo automático de constancias y planillas, la seguridad, la infraestructura y la regla «recibo solo con factura registrada» (en la Fase 2, «registrada» incluye la factura electrónica validada).

---

## 2. Resumen de cambios por documento base

| Documento | Qué cambia en la Propuesta 2 | Tipo |
| --- | --- | --- |
| `SPEC.md` §1 (CLAUDE.md) | Reglas de pedido sin cuentas, Windows-1252, separador, tres esquemas, equivalencias, código de cliente Helisa, recibo F/N, Conekta, trazabilidad y `modo_facturacion`; en la Fase 2, reglas de emisión por proveedor, nota crédito en vez de anular, numeración y prefijo, datos fiscales, IVA por concepto y contabilización obligatoria; 16 códigos de error de la Fase 1 y 11 de la Fase 2 (sección 3) | Δ |
| `SPEC.md` §2 Entregables | E2, E9 cambian; nuevos E11 (importación de prueba en Fase 0), E12 (Conekta), E13 (trazabilidad) y, en la Fase 2, E14 a E17 (habilitación, producción, contabilización, piloto) | Δ |
| `SPEC.md` §3 Semilla | Parámetros de Helisa, conceptos y equivalencias de prueba, clientes por kilo y de cobro fijo, códigos de cliente, cuentas F/N de ejemplo, fixtures de Conekta | Δ |
| `SPEC.md` §4 Épicas | Épica 0 nueva (Fase 0); A2, A3, A4, B4, C1, C2, C4–C6, D1, E9, F1, F4, G1–G5, H1, H3, H6 cambian; C7 nueva; épicas nuevas TRZ y API | Δ / + |
| `SPEC.md` §5 Contratos | Endpoints de catálogos Helisa, equivalencias, pedidos, carga de FVE, trazabilidad e integración (sección 6) | + |
| `SPEC.md` §6 Plantillas | Pie de liquidación de la planilla por esquema; hoja de trabajo para facturar una a una; índice del expediente | Δ / + |
| `SPEC.md` §7 Definición de terminado | Tres puntos nuevos (sección 4.9) | Δ |
| `SPEC.md` §8 Plan | Fase 1: 14 semanas + 4 de piloto; Fase 0 en paralelo; bloque Conekta de 1,5 semanas. Fase 2: ≈ 6 semanas + habilitación en paralelo + un ciclo de piloto (sección 8) | Δ |
| `SPEC.md` §9 Riesgos | Riesgos nuevos de formato, codificación, Conekta y facturación una a una; en la Fase 2, doble facturación, factura no contabilizada, habilitación, datos fiscales y dependencia del proveedor (sección 9) | Δ |
| `SPEC.md` §10 Épica G′ | El archivo FV pasa a ser **archivo de pedidos OP**; dos familias de plantilla; RC con libros F y N; resultado por pedido; la cartilla de terceros (HEL-06) sube a la Fase 1 | Δ mayor |
| `schema.sql` | `fn_liquidar` con `fijo_mensual` y error en esquemas no soportados; columnas nuevas en `cliente`, `sede`, `tarifa`, `cierre_cliente`; tipos nuevos | Δ |
| `schema_v5_archivos_planos.sql` | `tipo_plano` + 'OP'; líneas de plantilla sin cuenta para pedidos; check de cuadre; `factura_helisa` con prefijo, consecutivo, CUFE y origen; semillas OP v1 y RC v2 | Δ |
| Anexo nuevo v6 (sección 5.3) | `concepto_helisa`, `lista_precio_helisa`, `equivalencia_concepto`, `cuenta_contable`, `cliente_fiscal`, `pedido_helisa`, `pedido_helisa_linea`, `factura_carga`, `integracion_envio`, vistas de trazabilidad | + |
| Arquitectura v1 §3.7 | La interfaz `SalidaHelisa` se reemplaza por exportadores puros + `CanalHelisa` (archivo o Conekta); el camino A queda como contingencia; el camino C se usa para el recibo desde la Fase 1 y, en la Fase 2, también para contabilizar facturas y notas | Δ |
| `SPEC.md` §4 Épicas (Fase 2) | Épica nueva **FEV** (FEV1 a FEV15, por pasos) y ajustes de B4, C1, C4, D1, E9, F1, G1–G5, G7, G′, H6 y TRZ cuando un cierre pasa a `modo_facturacion = 'sistema_fe'` (secciones 4.14 y 4.15) | + / Δ |
| Anexo nuevo v6 · Fase 2 (sección 5.4) | `resolucion_numeracion`, `lote_emision`, `factura_electronica`, `factura_electronica_linea`, `nota_electronica`, `nota_electronica_linea`, `fe_evento`; cambios en `cliente`, `empresa`, `concepto_helisa`, `recibo_caja_aplicacion`, `v_saldo_referencia`, `v_matriz_periodo` e `integracion_envio`; plantilla MC-FV v2 | + |
| Arquitectura v1 §2 (contexto) | La DIAN aparece conectada al sistema **a través del proveedor tecnológico**; Helisa recibe el movimiento contable de las facturas que ya no nacen allí; interfaz nueva `ProveedorFE` (sección 6.7) | Δ |

---

## 3. CLAUDE.md propuesto (v6, Propuesta 2)

Reemplaza el bloque de la sección 1 del SPEC. Sigue por debajo de 200 líneas. Las reglas marcadas «Fase 2» entran en vigor cuando se construye la Fase 2; hasta entonces el sistema se comporta como en la Propuesta 1.

```markdown
# RH digital Comserva

Sistema para Comserva S.A.S. (Florencia, Caquetá): app Android del operario (Expo), API (NestJS + PostgreSQL 18), panel web (React + Vite) y, desde la Fase 2, emisión de la factura electrónica por un proveedor tecnológico (API). Español en código de dominio y en la interfaz. Documentos de referencia en docs/ (levantamiento v6 propuesta 2, arquitectura, schema.sql + anexos v5 y v6, SPEC.md, mockups_v6/).

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
- MODO DE FACTURACIÓN por cierre (lo copia del cliente al cerrar): 'helisa_pedido' (pedido → FVE en Helisa; única opción en la fase 1) o 'sistema_fe' (Fase 2). Un cierre en sistema_fe nunca genera pedido y un cierre con pedido vigente nunca se factura por el sistema (DOBLE_FACTURACION). Lo de RH no se factura en Helisa. Cambiar el modo de un cierre con factura enviada y no descartada está prohibido (MODO_FACTURACION_BLOQUEADO).
- Fase 2 · FACTURA ELECTRÓNICA: la emite el sistema a través de un proveedor tecnológico autorizado por la DIAN, por API. Nunca XML, firma ni conexión propia con la DIAN. Flujo: cierre → prefactura (borrador) → aprobación de Facturación → emisión por lote → el proveedor devuelve CUFE, XML, PDF y QR → entrega al correo de recepción del cliente → seguimiento del estado y de los eventos RADIAN.
- Fase 2 · ADAPTADOR: solo apps/api/src/fe/proveedores/* habla con el proveedor, a través de la interfaz ProveedorFE. El documento canónico (DocumentoFE) es nuestro; el mapeo al JSON del proveedor vive en su adaptador y tiene pruebas de contrato con respuestas grabadas.
- Fase 2 · INMUTABILIDAD: una factura enviada no se edita (FE_NO_EDITABLE). Una factura validada no se anula: se corrige con nota crédito o débito electrónica que referencia prefijo, número, CUFE y fecha, con aprobación de Gerencia. No hay notas después de la aceptación expresa (033) o tácita (034) (NOTA_NO_PERMITIDA); las notas crédito no superan el total de la factura menos las notas previas (NOTA_EXCEDE_SALDO).
- Fase 2 · NUMERACIÓN: prefijo (hasta 4 caracteres) y rango autorizados por la DIAN y asociados al software del proveedor (prueba «RHD»; real por confirmar). El consecutivo se toma en transacción (select … for update). Una factura rechazada conserva su número y se reenvía corregida; un número abandonado se inhabilita con motivo; nunca hay huecos sin explicación. NUMERACION_AGOTADA y NUMERACION_VENCIDA; alerta al 80 % del rango y 30 días antes del vencimiento.
- Fase 2 · DATOS FISCALES obligatorios para emitir: tipo de persona, tipo de documento y DV, responsabilidades del RUT, régimen de IVA, dirección con municipio DANE y correo de recepción (DATOS_FISCALES_INCOMPLETOS).
- Fase 2 · IVA por concepto (concepto_helisa.iva_pct; hoy 19 %), nunca fijo en el código (IVA_CONCEPTO_NO_DEFINIDO). La prefactura calcula base e IVA por línea a 2 decimales; su total no puede diferir del cierre en más de $1 (PREFACTURA_NO_CUADRA). Retenciones: solo informativas, por confirmar.
- Fase 2 · CONTABILIZACIÓN: toda factura y nota validada se contabiliza en Helisa en los libros F y N (movimiento MC-FV por archivo o Conekta). Una factura validada sin contabilización importada después de los días del parámetro es alerta alta (riesgo de factura no registrada en la contabilidad).
- Fase 2 · EMISIÓN IDEMPOTENTE: clave = factura y versión. Un tiempo agotado se resuelve consultando el estado al proveedor antes de reenviar; si el proveedor responde «ya existe», se adopta su CUFE. Proveedor caído = la factura espera en cola (PROVEEDOR_NO_DISPONIBLE); nunca se factura por otro canal sin aprobación de Gerencia.
- Fase 2 · CONSERVACIÓN: XML firmado, respuesta de la DIAN, AttachedDocument y PDF de cada factura y nota se guardan inmutables con SHA-256 (plazo por confirmar con el contador; mínimo 5 años, prudente 10). Credenciales del proveedor y certificado (si aplica) solo en los secretos del entorno.
- Constancia y recibo: PDF generado UNA vez en el celular; el servidor verifica el SHA-256 y nunca lo regenera. Planilla, acta, reportes y expediente: solo servidor.
- Snapshot: visita_kilos y cierre_cliente_categoria copian nombre, tratamiento y dispositor del día; pedido_helisa_linea copia el código de concepto vigente al generar.
- Todo POST/PUT desde la app lleva Idempotency-Key (UUID de la mutación). La respuesta se guarda y se repite.
- Auditoría de solo inserción para toda mutación de negocio, incluidas descargas de archivos para Helisa.
- Fechas en UTC con zona America/Bogota; dinero numeric(14,2); kilos numeric(10,2); cantidades de pedido numeric(12,2).

## Convenciones
- TypeScript estricto. Zod en packages/shared es la fuente de verdad de DTOs; nada se valida dos veces a mano.
- Nombres de tablas y columnas en español snake_case (ver docs/schema.sql y anexos). Código de dominio en español camelCase (visita, cierreCliente, pedidoHelisa); infraestructura en inglés (repository, guard, queue).
- Exportadores (pedido, movimiento contable) = funciones puras en packages/shared/helisa; el canal (archivo o Conekta) vive en apps/api/src/helisa.
- Errores de dominio con código: VISITA_INMUTABLE, CLIENTE_PENDIENTE, RANGO_AGOTADO, CIERRE_FACTURADO, TARIFA_NO_VIGENTE, IDEMPOTENCIA_DUPLICADA, FACTURA_REQUERIDA, SALDO_EXCEDIDO, PLANTILLA_NO_APROBADA, ARCHIVO_IMPORTADO_INMUTABLE, ARCHIVO_NO_CUADRA, ESQUEMA_TARIFA_NO_SOPORTADO, CLIENTE_SIN_CODIGO_HELISA, CONCEPTO_HELISA_FALTANTE, PEDIDO_NO_CUADRA, CIERRE_NO_EXPORTABLE, PEDIDO_IMPORTADO, CODIFICACION_INVALIDA, SEPARADOR_EN_TEXTO, DOCUMENTO_YA_ENVIADO, CUENTA_CONTABLE_FALTANTE, LIBROS_DESCUADRADOS, FVE_DUPLICADA, DOBLE_FACTURACION, INTEGRACION_RECHAZADA, INTEGRACION_NO_DISPONIBLE, INTEGRACION_FIRMA_INVALIDA; Fase 2: DATOS_FISCALES_INCOMPLETOS, IVA_CONCEPTO_NO_DEFINIDO, PREFACTURA_NO_CUADRA, NUMERACION_AGOTADA, NUMERACION_VENCIDA, FE_NO_EDITABLE, FE_RECHAZADA, NOTA_NO_PERMITIDA, NOTA_EXCEDE_SALDO, MODO_FACTURACION_BLOQUEADO, PROVEEDOR_NO_DISPONIBLE.
- Pruebas: Vitest; cada regla de dominio tiene prueba unitaria; cada endpoint tiene prueba de contrato con la semilla; cada archivo para Helisa tiene prueba de bytes; cada adaptador de proveedor tiene prueba de contrato con respuestas grabadas del sandbox y existe un ProveedorSimulado para CI.
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
| `DOBLE_FACTURACION` | Generar pedido de un cierre con `modo_facturacion = 'sistema_fe'`, o (Fase 2) crear una factura electrónica para un cierre en modo pedido o con pedido vigente | Triggers `trg_pedido_valida_cierre` y `trg_fe_valida_cierre` | 409 |
| `INTEGRACION_RECHAZADA` | Conekta responde 202 o 400 (datos incorrectos, ya existe, faltan campos, códigos de cruce inválidos) | Cola de integración (queda en el envío, no en la petición del usuario) | — |
| `INTEGRACION_NO_DISPONIBLE` | Conekta no responde, o responde 423 o 500 después de agotar los reintentos | Cola de integración | — |
| `INTEGRACION_FIRMA_INVALIDA` | Conekta responde 401 (firma o llave incorrecta): se pausa la cola y se alerta al administrador | Cola de integración | — |

### 3.2 Códigos de error de la Fase 2 (factura electrónica)

| Código | Cuándo se lanza | Dónde | HTTP |
| --- | --- | --- | --- |
| `DATOS_FISCALES_INCOMPLETOS` | Crear la prefactura de un cliente sin tipo de persona, tipo de documento, DV, responsabilidades, régimen, municipio DANE o correo de recepción | Servicio de prefacturas; bloqueo en pre-cierre | 422 |
| `IVA_CONCEPTO_NO_DEFINIDO` | Un concepto de la prefactura no tiene IVA configurado | Servicio de prefacturas; pre-cierre | 422 |
| `PREFACTURA_NO_CUADRA` | El total de la prefactura (IVA calculado por línea) difiere del total del cierre en más de $1 | Servicio de prefacturas (bloquea la aprobación) | 422 |
| `NUMERACION_AGOTADA` | No quedan números en la resolución activa del ambiente | Asignación de consecutivo | 409 |
| `NUMERACION_VENCIDA` | La resolución activa venció | Asignación de consecutivo | 409 |
| `FE_NO_EDITABLE` | Modificar una factura o sus líneas cuando ya fue enviada | Trigger `trg_fe_linea_editable` y servicio | 409 |
| `FE_RECHAZADA` | El proveedor o la DIAN rechazan la factura; queda con su número y la lista de errores para corregir y reenviar | Cola de emisión | — |
| `NOTA_NO_PERMITIDA` | Nota sobre una factura no validada, o después de la aceptación expresa (033) o tácita (034) | Trigger `trg_nota_permitida` | 409 |
| `NOTA_EXCEDE_SALDO` | Las notas crédito suman más que el total de la factura | Trigger `trg_nota_permitida` | 422 |
| `MODO_FACTURACION_BLOQUEADO` | Cambiar el modo de facturación de un cierre que tiene una factura electrónica enviada y no descartada | Trigger `trg_modo_facturacion` | 409 |
| `PROVEEDOR_NO_DISPONIBLE` | El proveedor no responde o responde con error de servidor después de los reintentos; la factura sigue en cola | Cola de emisión | — |

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
| 0.7 | Decisión escrita sobre Conekta (archivos planos o API; en esta propuesta sirve en la Fase 1 y, en la Fase 2, para la contabilidad), con el titular de la licencia y del hosting de Helisa | Acta firmada por Comserva | Épica API |
| 0.8 | **Elegir y contratar el proveedor tecnológico**: cotizar Plemsi y Dataico (proveedores tecnológicos en el listado DIAN; Plemsi como «ECA SAS», por confirmar) y, como alternativa, MATIAS API (modalidad software propio: Comserva quedaría como titular directa ante la DIAN); The Factory HKA como control | Contrato y credenciales de sandbox; respuesta escrita sobre modalidad, qué cuenta como documento, si envía el correo al adquirente, si el PDF se puede personalizar, certificado incluido o no, conservación y exportación de XML y PDF | FEV2 |
| 0.9 | Confirmar con el contador el IVA del servicio (19 % o excluido por el art. 476 num. 12 del Estatuto, que exige prestarlo como empresa de servicio público de aseo), las retenciones que se informan y el plazo de conservación | Respuesta escrita | FEV3, FEV5 |
| 0.10 | Confirmar con Julio que la cartera de Helisa acepta facturas con otro prefijo importadas como movimiento contable (tipo de documento FV contable, **por confirmar**) y que el recibo las cruza; recibir la tabla «servicio → cuenta» (ingreso, IVA y cartera) en los dos libros | Importación de prueba de un asiento de factura y de un recibo que la cruza | FEV10 |
| 0.11 | Preparar con Comserva el trámite ante la DIAN: usuario del representante legal y firma electrónica para MUISCA, agregar el nuevo modo de operación, certificado de firma si el proveedor no lo incluye, correo de recepción | Lista de verificación firmada; fecha del set de pruebas acordada con el proveedor | FEV15 |

Si la Propuesta 2 se contrata **por fases** (recomendado), las tareas 0.8 a 0.11 se hacen en la compuerta, después del piloto de la Fase 1 y antes de empezar la Fase 2. Si se contrata **completa desde el inicio**, van en la Fase 0 y la tarea 0.11 arranca de una vez, porque la habilitación depende de trámites de Comserva.

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

| Historia | v5 (SPEC §10) | Fase 1 | Criterios de aceptación v6 |
| --- | --- | --- | --- |
| **G′1 · Catálogo de campos (HEL-07)** | Claves de FV, RC y TER | **Δ** Claves nuevas: `pedido.tipo`, `pedido.numero`, `pedido.fecha`, `pedido.codigo_cliente_helisa`, `pedido.lista_precio`, `parametro.helisa_vendedor`, `parametro.helisa_negocio`, `parametro.helisa_bodega`, `linea.tipo_concepto`, `linea.codigo_concepto`, `linea.descripcion`, `linea.cantidad`, `linea.valor_unitario`, `linea.valor_total`, `linea.ind_fiscal`, `periodo.desde`, `periodo.hasta`, `rh.visitas`, `rh.kg_categoria.<código>`, `aplicacion.cruce`, `recibo.tipo_helisa` | Toda clave nueva resuelve con Cofema y con el cliente por kilo; una clave desconocida falla al validar la plantilla, nunca al generar |
| **G′2 · Plantillas (HEL-03)** | Plantillas con cuentas obligatorias; semillas FV v1 y RC v1 | **Δ** Dos familias: **pedido** (líneas de concepto y comentario, sin cuentas) y **movimiento contable** (con cuentas, F y N). Semillas: «OP v1 · Pedido 24 campos (observado 21 oct 2026)» y «RC v2 · Movimiento con libros F y N». La FV v1 de la v5 queda en borrador durante la Fase 1; en la Fase 2 se convierte en «MC-FV v2» (sección 5.4) | Aprobar OP v1 sin el tipo de pedido configurado, con un concepto `PEND-…` o con una cuenta «EJEMPLO» falla con PLANTILLA_NO_APROBADA |
| **G′3 · Motor de generación** | Líneas contables por RH o recibo, cuadre D = C | **Δ** Para pedidos: líneas de servicio y comentario según el esquema y las equivalencias; 24 campos siempre; columnas que solo aplican a líneas de servicio quedan vacías en los comentarios; validaciones (código de cliente, concepto, cuadre contra el subtotal, separador, codificación, longitud máxima); escritor TXT en Windows-1252 y **XLSX de apoyo** con la vista desagregada que pidió Julio. Para movimiento: líneas F y N con Ind. Fiscal y cuadre por libro | Cofema → un pedido con 2 líneas de servicio y al menos 1 comentario, suma 1.886.500,00; prueba de bytes de la sección 7; recibo 35672 de $500.000 → 4 líneas (caja D y 1305 C en F y en N), D = C = 500.000 por libro, cruce «FVE25756» (formato **por confirmar**) |
| **G′4 · Archivo FV (HEL-01)** | Archivo de movimiento contable de factura | **− Retirada.** La reemplaza **G′4 · Archivo de pedidos OP**: `POST /pedidos/generar` crea los pedidos de los cierres y `POST /planos/op` los empaca en un archivo; cierres y pedidos → `exportado`; regenerar anula el archivo anterior si no se importó; un pedido aceptado por Conekta no entra (DOCUMENTO_YA_ENVIADO) | Generar dos veces el mismo periodo deja un solo archivo vigente; un cierre facturado no se vuelve a exportar; un archivo con tres pedidos lleva tres números consecutivos |
| **G′5 · Archivo RC (HEL-02)** | Caja D / cartera C, DOC FUENTE = FVE, solo libro F | **Δ** Líneas F y N; tipo RC1 o RC2 (**por confirmar**); cruce con `formato_cruce` de la plantilla; cuentas desde `cuenta_contable` por medio de pago y libro; el anticipo sin FVE queda fuera hasta que Julio defina su cuenta (**por confirmar**) | Lo del SPEC más: una cuenta faltante en el libro N da CUENTA_CONTABLE_FALTANTE; un descuadre en un libro da LIBROS_DESCUADRADOS |
| **G′6 · Resultado de la importación (HEL-04)** | Importado o rechazado por archivo | **Δ** Resultado **por pedido**: `POST /planos/:id/resultado {importados[], rechazados[{pedido_id, error}]}`; los pedidos rechazados se anulan y su cierre vuelve a `cerrado` para el siguiente archivo, con número nuevo | Un archivo con un pedido rechazado deja los demás importados; al regenerar, el pedido rechazado sale con número nuevo |
| **G′7 · Pantallas del panel** | Configurador y bandeja | **Δ** Configurador con familias, vista previa del TXT con los separadores resaltados y los caracteres fuera de Windows-1252 marcados; bandeja de pedidos por estado (descarga TXT + XLSX); bandeja de FVE por registrar (con la carga del listado); mockups en `v6 adrian/propuesta 2/mockups_v6/` | Cambiar separador, codificación o una equivalencia y regenerar produce un archivo distinto sin tocar código |
| **G′8 · Sync** | `facturas[]` y `tipos_recibo` | **=** (con el número formateado de D1) | El del SPEC |
| **G′9 · Cartilla de terceros (HEL-06)** | Fase 2 de la v5 (familia TER) | **+ Sube a la Fase 1.** Archivo TER con los clientes nuevos que no existen en Helisa, con la plantilla configurable de la familia terceros (ya prevista en `tipo_plano`); se importa antes del archivo de pedidos; al confirmarla se registra el código que asignó Helisa y se marca `existe_en_helisa`; con Conekta la reemplaza API2. La estructura de la cartilla está **por confirmar** con Julio | Un cliente nuevo sin código bloquea su pedido y aparece en la cartilla siguiente; al marcar la cartilla importada y registrar el código, el pedido se puede generar |

### 4.9 Épica H · Calidad, despliegue y piloto

- **H1 · Pruebas** **Δ**. Se suman los casos de la sección 7, la prueba de bytes en Windows-1252, las pruebas de contrato de Conekta con respuestas grabadas (1B) y un E2E de trazabilidad (buscar «25756» y abrir la cadena de Cofema).
- **H2 · Seguridad** **Δ menor**. La llave de Conekta no aparece en logs, en Sentry ni en respuestas; revisión del riesgo de HTTP sin TLS (sección 6.5).
- **H3 · Producción** **Δ menor**. Secretos de Conekta en Coolify (1B); alerta si la cola de integración se pausa.
- **H4, H5** **=**.
- **H6 · Acta de inicio de series y piloto** **Δ**. El piloto (un ciclo de corte, ≥ 5 clientes, 2 operarios) incluye pedidos importados en el Helisa de Comserva, FVE registradas y al menos un RC cruzado. Se mide **el tiempo real de facturar una a una** (minutos por factura), los errores de importación y las diferencias > $1. → **Informe de compuerta** entregado a Comserva con esas cifras (es el insumo para decidir si se hace la Fase 2). En esta propuesta, el piloto de la Fase 1 también mide cuántos clientes tienen sus datos fiscales completos.

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

### 4.11 Épica API · Conector Helisa Conekta (nueva, opcional)

Solo se construye si Comserva confirma por escrito que contrata Conekta (tarea 0.7). Los archivos planos quedan siempre como contingencia. En la Fase 1 funciona igual que en la Propuesta 1 (modalidad 1B). **En la Fase 2 cambia de uso** (sirve para la contabilidad): para los cierres en modo `sistema_fe`, API3 deja de enviar pedidos, API4 sigue enviando los recibos y la historia **API9** (requerimiento API-09) envía por el mismo canal de documentos contables (`set/document`) el asiento de cada factura y nota electrónica validadas (el ejemplo oficial de Helisa trae una «Factura de Venta Contable» FV); API5 (lectura de FVE) se usa solo como control de doble facturación (detectar FVE de Helisa a clientes en modo `sistema_fe`); API1, API2 y API6 a API8 siguen igual. Esfuerzo: 70 h (940 h en total con la Fase 2). Los IDs API-01 a API-09 son los del levantamiento v6 de la Propuesta 2, que manda.

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
| **API9 · Asientos de facturas y notas (Fase 2)** | API-09 | El asiento MC-FV de cada factura y nota electrónica validadas (mismo contenido y mismas validaciones de FEV10, libros F y N) se envía como documento contable (`set/document`, tipo «factura de venta contable» o el que defina Julio, **por confirmar**); un asiento enviado por API no entra en un archivo y viceversa (DOCUMENTO_YA_ENVIADO); el asiento de Cofema (D = C = 2.244.935 por libro) queda aceptado en la conexión de pruebas de Helisa |

### 4.12 Historias retiradas o reubicadas

- **G′4 de la v5 (archivo FV como movimiento contable)**: retirada en la Fase 1; su diseño se recupera en la Fase 2 como contabilización de las facturas emitidas por el sistema (FEV10, plantilla MC-FV v2).
- **La premisa «el archivo FV genera la factura electrónica»** (v5, sección 12 y HEL-01): retirada.
- **Cartilla de terceros (HEL-06)**: deja de ser complemento y sube a la Fase 1 (historia G′9); con Conekta el alta se hace por API (API2). En la Fase 2 el tercero debe existir en Helisa antes de importar la contabilización de su factura: el validador de FEV10 lo revisa.
- **Registro manual de la FVE (G4)** para cierres en modo `sistema_fe`: no aplica, la factura la emite el sistema. Sigue para los cierres en modo pedido y como contingencia.
- **Exclusión de la v5 «emitir, firmar o transmitir documentos a la DIAN»**: retirada en la Fase 2 (la emisión la hace el proveedor por cuenta de Comserva).

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

**Entregables de la Fase 2:**

- **E14** **+**: factura de prueba de Cofema (septiembre 2026) **validada por la DIAN en el ambiente de habilitación** con el prefijo de prueba, y una **nota crédito** sobre ella también validada; XML, respuesta de la DIAN, AttachedDocument y PDF guardados con su SHA-256.
- **E15** **+**: software del proveedor habilitado para Comserva en producción, con la resolución, el prefijo y el rango asociados (trámite de Comserva con nuestro acompañamiento).
- **E16** **+**: contabilización de facturas y recibos importada en Helisa sin errores, con la factura en cartera y el recibo cruzado contra el prefijo nuevo.
- **E17** **+**: piloto de un ciclo de corte con 5 a 10 clientes en modo `sistema_fe` (los demás siguen con pedido) y conciliación del periodo sin diferencias; acta de aceptación de la Fase 2.

**Semilla de la Fase 2:** resolución de habilitación con prefijo «RHD» y un rango corto de prueba; datos fiscales de prueba completos para Cofema y para los clientes por kilo y de cobro fijo de la semilla, y uno incompleto (caso negativo); conceptos con unidad DIAN e IVA; cuentas F y N de ejemplo para ingreso, IVA y cartera; respuestas grabadas del sandbox del proveedor elegido (validada, rechazada, duplicada, contingencia) y un `ProveedorSimulado` para CI.

### 4.14 Qué cambia en las épicas de la Fase 1 cuando entra la Fase 2

| Épica o historia | Cambio en la Fase 2 |
| --- | --- |
| **B4 · Roles** | Permisos nuevos: aprobar prefacturas y emitir lotes (Facturación); solicitar notas (Facturación) y aprobarlas (Gerencia); configurar el proveedor y las resoluciones (Administrador con aprobación de Gerencia); cambiar el modo de facturación de un cliente (Gerencia) |
| **C1 · Clientes (OFI-01)** | Datos fiscales **obligatorios** para clientes en modo `sistema_fe`; validación de DV, municipio DANE y correo; carga masiva con simulacro; indicador de avance «clientes listos para facturar»; campo `cliente.modo_facturacion` (por defecto `helisa_pedido`) |
| **C4 · Datos maestros (OFI-06)** | Datos fiscales del emisor (responsabilidades, actividad económica 3822, municipio DANE, correo de recepción) y la resolución de numeración activa |
| **C7 · Equivalencias y cuentas** | El concepto lleva unidad DIAN e IVA obligatorios; cuentas de ingreso por concepto e IVA generado en los dos libros (`cuenta_contable` con uso `ingreso` e `iva`) |
| **D1 · Pull / E9 · Recibo** | `facturas[]` incluye las facturas electrónicas validadas (prefijo nuevo) con su saldo; el recibo se aplica a ellas igual que a una FVE; FACTURA_REQUERIDA y SALDO_EXCEDIDO no cambian |
| **F1 · Inicio** | Tarjetas nuevas: prefacturas por aprobar, facturas rechazadas, sin entregar y sin contabilizar; resolución por agotarse o por vencer |
| **G1 · Pre-cierre** | Bloqueos para clientes en modo `sistema_fe`: DATOS_FISCALES_INCOMPLETOS e IVA_CONCEPTO_NO_DEFINIDO |
| **G2 · Cierre** | El cierre copia `modo_facturacion` del cliente. En modo `sistema_fe` no pasa por «exportado»: cerrado → facturado cuando la factura queda validada |
| **G3 · Planilla** | El pie muestra el prefijo y número de la factura electrónica cuando existe |
| **G4 · Registro de FVE** | No aplica a cierres en modo `sistema_fe`; sigue para los demás y para contingencia |
| **G5 · Reapertura** | Un cierre facturado por el sistema solo se reabre si su factura quedó anulada por una nota crédito total validada |
| **G7 · Correo** | La factura la entrega el proveedor (o el sistema, si el proveedor no envía correo); el correo automático del sistema no la duplica |
| **G′ · Planos** | Plantilla «MC-FV v2» para contabilizar facturas y notas (sección 5.4); el RC cruza contra el prefijo nuevo con el mismo `formato_cruce` |
| **H1 · Pruebas / H6 · Piloto** | Casos R11 a R19 (sección 7.2); piloto de la Fase 2 (E17) |
| **TRZ · Trazabilidad** | Eslabones nuevos: prefactura, factura electrónica (prefijo, número, CUFE, estado DIAN, entrega, eventos RADIAN, notas) y asiento contable enviado a Helisa. La matriz muestra «Pedido / FE» y una ficha de contabilización. La búsqueda encuentra por prefijo y número, CUFE y CUDE |

### 4.15 Épica FEV · Facturación electrónica por proveedor tecnológico (Fase 2, por pasos)

**Requerimientos** (numeración de la sección 13 del levantamiento de la Propuesta 2, que manda): FEV-01 integración con el proveedor tecnológico (adaptador) · FEV-02 numeración y prefijo · FEV-03 datos fiscales obligatorios · FEV-04 catálogo de productos e IVA por concepto · FEV-05 prefactura · FEV-06 revisión y emisión por lote · FEV-07 resultado de la emisión y estados DIAN · FEV-08 entrega al cliente · FEV-09 eventos RADIAN · FEV-10 notas crédito y débito · FEV-11 contingencia · FEV-12 regla contra la doble facturación · FEV-13 contabilización en Helisa (MC-FV y MC-NC) · FEV-14 conservación y salida del proveedor · FEV-15 habilitación, set de pruebas y paso a producción. Además: DOC-09 representación gráfica · REP-04 facturación y conciliación con Helisa · API-09 asientos por Conekta · RNF-19 disponibilidad de la emisión. El número de la historia (FEV1…FEV15) sigue el orden de construcción y **no** coincide con el del requerimiento.

Los pasos van en el orden de construcción. Cada uno termina con pruebas contra el sandbox del proveedor elegido (tarea 0.8) y contra el `ProveedorSimulado`.

| Paso | Historia | Req. | Criterios de aceptación | Cuenta |
| --- | --- | --- | --- | --- |
| 1 | **FEV1 · Modelo de datos** (sección 5.4) | todos | Migración aplicada sobre la Fase 1; triggers `trg_fe_valida_cierre`, `trg_modo_facturacion`, `trg_nota_permitida`, `trg_fe_linea_editable` y la nueva regla de reapertura probados; `v_saldo_referencia` da el mismo saldo que antes para las FVE de Helisa | Pro 1 |
| 2 | **FEV2 · Adaptador del proveedor y sandbox** | FEV-01 | Interfaz `ProveedorFE` + adaptador del proveedor elegido + `ProveedorSimulado`; autenticación con credenciales en secretos; pruebas de contrato con respuestas grabadas. Una factura de prueba de Cofema construida como `DocumentoFE` se emite en el sandbox y vuelve con un CUFE de 96 caracteres hexadecimales; cambiar al simulado no toca nada fuera de `fe/proveedores/` | Max |
| 3 | **FEV3 · Datos fiscales y catálogo** | FEV-03, FEV-04 | Pantalla y carga masiva de datos fiscales con simulacro; validación de DV, municipio DANE (5 dígitos) y correo; unidad DIAN e IVA por concepto. Un cliente sin municipio no entra a la prefactura (DATOS_FISCALES_INCOMPLETOS); un concepto sin IVA da IVA_CONCEPTO_NO_DEFINIDO | Pro 1 + Pro 2 |
| 4 | **FEV4 · Numeración** | FEV-02 | Resoluciones por ambiente con prefijo, rango, vigencia y proveedor; consecutivo transaccional; alertas al 80 % y 30 días antes del vencimiento; inhabilitar un número con motivo. 100 emisiones concurrentes no repiten ni saltan números; el número 11 de un rango de 10 da NUMERACION_AGOTADA | Pro 1 |
| 5 | **FEV5 · Prefactura y revisión** | FEV-05, FEV-06 (revisión) | Desde los cierres en modo `sistema_fe`: líneas por concepto con las mismas reglas del pedido (básico, kilos adicionales, por kilo, fijo) y notas del mes («SERVICIO ESPECIAL DE ASEO PRESTADO MES DE…», RH, kilos); forma y medio de pago; vencimiento = fecha + plazo de la tarifa; IVA por línea; comparación con el cierre; revisión por lote con aprobar o devolver. Prefactura de Cofema: 2 líneas, IVA 14.210,10 + 344.224,90 = 358.435,00, total 2.244.935,00, diferencia 0; editar una prefactura aprobada la devuelve a borrador | Pro 1 + Pro 2 |
| 6 | **FEV6 · Emisión por lote** | FEV-06, FEV-07, RNF-19 | Lote de prefacturas aprobadas → cola → proveedor; estados enviada, validada, rechazada, contingencia; se guardan CUFE, QR, XML, AttachedDocument, respuesta DIAN y PDF con SHA-256; webhook verificado o consulta periódica. Un lote de tres (Cofema, por kilo, fijo) queda validado en el sandbox; repetir el lote no duplica; un tiempo agotado se resuelve consultando el estado | Max |
| 7 | **FEV7 · Entrega y representación gráfica** | FEV-08, DOC-09 | Envío al correo de recepción (por el proveedor; si no lo hace, por el sistema con el ZIP y el asunto que exige el anexo técnico, máximo 2 MB); reenvío; registro de rebotes; PDF del proveedor (plantilla propia solo si el proveedor lo permite). El buzón de pruebas recibe el ZIP con el AttachedDocument y el PDF | Max + Pro 2 |
| 8 | **FEV8 · Notas crédito y débito** | FEV-10 | NC total (anulación), NC parcial y ND, con concepto de corrección de la tabla DIAN, motivo y aprobación de Gerencia; numeración interna; efecto en el saldo de referencia; la NC total validada deja la factura anulada y permite reabrir el cierre. Una NC después del evento 033 da NOTA_NO_PERMITIDA; una NC por más del total da NOTA_EXCEDE_SALDO | Pro 1 + Pro 2 |
| 9 | **FEV9 · Eventos RADIAN** | FEV-09 | Lectura de 030, 031, 032, 033 y 034 por el proveedor; ficha en la factura y en la trazabilidad; emitir la aceptación tácita (034) queda como opción **por confirmar** (solo si Comserva negocia facturas). Un evento 032 simulado aparece en la cadena | Max |
| 10 | **FEV10 · Contabilización en Helisa** | FEV-13 (y API-09 si va por Conekta) | Plantilla MC-FV v2: por factura, D 1305 por el total, C ingreso por concepto y C IVA con base, en F y en N; por nota, al revés; DOC FUENTE = prefijo y número; por archivo o por Conekta. MC-FV de Cofema: D = C = 2.244.935 en cada libro; importación de prueba aceptada (tarea 0.10) | Pro 1 |
| 11 | **FEV11 · Doble facturación y conciliación** | FEV-12, REP-04 | Triggers en los dos sentidos; reporte mensual factura emitida ↔ validada ↔ contabilizada (↔ FVE de Helisa a clientes en `sistema_fe`, si hay listado o Conekta); alerta alta por factura sin contabilizar. Generar pedido de un cierre en `sistema_fe` da DOBLE_FACTURACION; una factura validada sin contabilizar después del plazo genera la alerta | Pro 1 + Pro 2 |
| 12 | **FEV12 · Rechazos y contingencia** | FEV-07 (rechazos), FEV-11, RNF-19 | Traducción de los errores del proveedor y de la DIAN a mensajes claros; corrección y reenvío con el mismo número; proveedor caído → la factura espera en cola; la contingencia tipo 04 (falla de la DIAN) la maneja el proveedor; plan B con aprobación de Gerencia: pasar a modo pedido solo cierres sin factura enviada o con número inhabilitado. Simular el proveedor caído en medio de un lote no pierde ni duplica facturas | Max |
| 13 | **FEV13 · Conservación y auditoría** | FEV-14 | Archivos inmutables con hash; auditoría de cada emisión, nota y descarga; exportación del paquete de un periodo (XML, PDF y manifiesto SHA-256) | Pro 1 |
| 14 | **FEV14 · Trazabilidad de la factura electrónica** | TRZ-01 a TRZ-04 | Eslabones y búsqueda de la sección 4.14; buscar el CUFE de la factura de prueba abre la cadena de Cofema | Pro 2 |
| 15 | **FEV15 · Habilitación y piloto** | FEV-15 | Set de pruebas con el proveedor (cantidad de documentos **por confirmar** en el portal de la DIAN); E14, E15, E16 y E17 | Todos |

---

## 5. Modelo de datos

### 5.1 Qué cambia, en prosa

1. **Tarifa.** El tipo `esquema_tarifa` suma `fijo_mensual`. Para no cambiar la firma de `fn_liquidar`, en `fijo_mensual` la columna `basico` guarda el valor fijo del mes; un check por esquema impide combinaciones inválidas. `por_visita` sigue en el tipo, pero `fn_liquidar` lo rechaza. Se agrega `lineas_por_categoria` (reservada; **por confirmar** con Julio).
2. **Cliente y sede.** `cliente.codigo_helisa` ya existía; se agregan `lista_precio_helisa` y la fecha del último cruce con la cartilla. La sede gana `codigo_helisa` (código adicional). El **punto facturable** reutiliza `cliente.documentos_por_sede` (si un cliente factura por sede, también lleva planilla por sede); si Comserva necesitara planilla por sede y factura por NIT, o al revés, se agrega una marca aparte (**por confirmar**).
3. **Datos fiscales opcionales** en `cliente_fiscal` (1:1): tipo de persona, tipo de documento DIAN, responsabilidades del RUT, régimen de IVA, dirección, municipio DANE y correo de recepción de facturas. En la Fase 1 no se exigen (se van completando); en la Fase 2 son obligatorios para los clientes en modo `sistema_fe`.
4. **Catálogos de Helisa:** `concepto_helisa` (código, nombre, tipo, unidad, IVA de referencia; en la Fase 2 es el catálogo de productos de la factura electrónica) y `lista_precio_helisa`.
5. **Equivalencias:** `equivalencia_concepto` (componente o categoría, con excepción opcional por tarifa → concepto + lista + texto), con aprobación y vigencia. Se resuelve con la fecha de corte del periodo y prioridad tarifa > categoría > general.
6. **Cuentas:** `cuenta_contable` (uso, medio de pago, alias del banco sin número de cuenta, concepto para la Fase 2, libro F o N, cuenta), con aprobación. Es la «plantilla servicio → cuenta» de Julio y las cuentas del recibo.
7. **Pedido:** `pedido_helisa` y `pedido_helisa_linea`. El pedido es una entidad propia (con o sin archivo, porque en 1B no hay archivo). Un cierre tiene a lo sumo un pedido vigente (índice único parcial). La serie `pedido` la asigna el servidor.
8. **FVE registrada (v5):** `factura_helisa` gana `prefijo`, `consecutivo`, `cufe`, `origen` (manual, listado, conekta), `doc_origen`, `carga_id` y `sin_pedido_motivo`. El vínculo canónico FVE ↔ cierre pasa por el pedido (`pedido_helisa.factura_helisa_id`), porque una FVE puede llamar varios pedidos del mismo cliente; `factura_helisa.cierre_cliente_id` queda nulo salvo en las FVE registradas sin pedido (contingencia). `factura_carga` guarda cada listado de FVE cargado.
9. **Plantillas (v5):** `tipo_plano` suma `OP`; `tipo_linea_plano` suma `concepto` y `comentario`; en `plantilla_plano_linea`, `cuenta` y `naturaleza` pasan a ser opcionales (obligatorias solo en movimiento contable), y se agregan `componente`, `uso_cuenta` e `ind_fiscal`. `plantilla_plano` suma `decimales_cantidad`, `entero_si_sin_decimales`, `formato_cruce`, `requiere_libro_n` y `reemplazo_separador`; la columna existente `tipo_documento` guarda el tipo de pedido (OP) o el de recibo (RC1/RC2). `plantilla_plano_columna` suma `obligatoria` y `solo_tipo_concepto`. El check de cuadre de `archivo_plano` admite `OP`.
10. **Cierre:** `modo_facturacion` (`helisa_pedido` en la Fase 1). Estados: abierto → cerrado → **exportado** (pedido en archivo vigente o aceptado por Conekta) → **facturado** (FVE registrada); reabierto desde cerrado, o desde exportado con la regla de G5.
11. **Integración:** `integracion_envio` (cola persistente con clave de idempotencia, estado, intentos, respuesta y número externo), para Conekta en la modalidad 1B y, en la Fase 2, también para el proveedor de factura electrónica; `fuente_cartera` suma `conekta`.
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

> **25 oct:** el catálogo, las listas y las plantillas PED v1 y RC v2 ya están en `arquitectura/schema_v6_pedido_recibo.sql` (Ronaldo, validado en PostgreSQL 18.6). Ese anexo corre primero; de este DDL se omiten las tablas y semillas que chocan con él. Diferencias y ajustes en la sección 11.7.

```sql
-- =====================================================================
--  RH digital Comserva · anexo v6 · Fase 1 (igual en las dos propuestas)
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

-- 8. Cola de integración: Conekta (modalidad 1B) y, en la Fase 2, el proveedor de factura electrónica
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
-- La plantilla 1 (FV de la v5) queda en borrador y sin uso en la Fase 1; la Fase 2 la reemplaza por MC-FV v2.
```

### 5.4 Fase 2: modelo de la factura electrónica

**En prosa:**

1. **Modo de facturación.** `cliente.modo_facturacion` (por defecto `helisa_pedido`); el cierre lo copia al cerrar. Los clientes pasan a `sistema_fe` de forma gradual (5 a 10 en el piloto). Triggers en los dos sentidos impiden la doble facturación, y el modo de un cierre no cambia si ya tiene una factura enviada.
2. **Emisor y cliente.** `empresa` gana sus datos fiscales (responsabilidades, actividad económica, municipio DANE, correo de recepción). `cliente_fiscal` (de la Fase 1) pasa a ser obligatorio para emitir; la validación está en el servicio de prefacturas.
3. **Productos.** `concepto_helisa` gana `unidad_dian`; su `iva_pct` pasa a ser obligatorio para los conceptos que se facturan por el sistema.
4. **Numeración.** `resolucion_numeracion` por ambiente (habilitación o producción), con prefijo, rango, vigencia, proveedor y quién asigna el número; una restricción de exclusión impide rangos solapados del mismo prefijo. Las notas usan series internas (`serie_documento`).
5. **Factura.** `factura_electronica` (de la prefactura a la anulación): snapshot del adquirente al aprobar, totales, diferencia contra el cierre, CUFE, QR, referencias del proveedor, archivos (XML, AttachedDocument, respuesta de la DIAN, PDF), entrega y contabilización. `factura_electronica_linea` con base e IVA por línea. Un cierre tiene a lo sumo una factura vigente.
6. **Notas.** `nota_electronica` y sus líneas, con concepto de corrección, aprobación de Gerencia y CUDE. La nota crédito total anula la factura.
7. **Lotes y eventos.** `lote_emision` agrupa las emisiones; `fe_evento` guarda los eventos RADIAN.
8. **Integración.** `integracion_envio` (de la Fase 1) se reutiliza con `sistema = 'proveedor_fe'` y operaciones `emitir_factura`, `emitir_nota`, `consultar_estado`, `reenviar_correo` y `eventos`.
9. **Recibo y saldo.** `recibo_caja_aplicacion` gana `factura_electronica_id` (una sola factura por aplicación); `v_saldo_referencia` se recrea como unión de las FVE de Helisa y las facturas electrónicas validadas (más notas débito, menos notas crédito); el trigger de saldo se adapta.
10. **Contabilización.** Plantilla «MC-FV v2» (las 22 columnas de la v5, con libros F y N y cuentas desde `cuenta_contable`).
11. **Trazabilidad.** `v_indice_busqueda_fe` (factura, CUFE, notas, CUDE y recibos aplicados a facturas electrónicas) y `v_matriz_periodo` recreada con las columnas de la factura electrónica.

**Estados:**

| Entidad | Estados y transiciones |
| --- | --- |
| Factura electrónica | borrador (prefactura) → aprobada (Facturación; diferencia con el cierre ≤ $1) → enviada → validada · enviada → rechazada → corregida y aprobada de nuevo → enviada (mismo número, versión + 1) · rechazada → descartada (número inhabilitado con motivo) · enviada → contingencia → validada · validada → anulada (por nota crédito total validada) · borrador o aprobada → descartada (sin número) |
| Nota crédito o débito | borrador → aprobada (Gerencia) → enviada → validada · rechazada → corregida o descartada |
| Entrega | pendiente → enviada → entregada · rebotada (reenviar a otro correo) |
| Cierre en modo `sistema_fe` | abierto → cerrado → facturado (factura validada) · facturado → reabierto solo si la factura quedó anulada por nota crédito total |

**DDL orientativo de la Fase 2 (no ejecutado, validar):**

```sql
-- =====================================================================
--  RH digital Comserva · anexo v6 · Fase 2 (factura electrónica por proveedor tecnológico)
--  DDL ORIENTATIVO · NO EJECUTADO · VALIDAR en PostgreSQL 18 después del anexo v6 de la Fase 1.
-- =====================================================================

-- ---------------------------------------------------------------------
-- Migración F2-1: valores nuevos de tipos existentes
-- ---------------------------------------------------------------------
alter type sistema_integracion add value if not exists 'proveedor_fe';
alter type tipo_archivo        add value if not exists 'xml';
alter type tipo_documento      add value if not exists 'nota_credito';   -- series internas de notas
alter type tipo_documento      add value if not exists 'nota_debito';

-- ---------------------------------------------------------------------
-- Migración F2-2: tipos, tablas y reglas
-- ---------------------------------------------------------------------
create type estado_fe         as enum ('borrador', 'aprobada', 'enviada', 'validada', 'rechazada', 'contingencia', 'anulada', 'descartada');
create type estado_entrega_fe as enum ('pendiente', 'enviada', 'entregada', 'rebotada');
create type tipo_nota         as enum ('credito', 'debito');
create type ambiente_fe       as enum ('habilitacion', 'produccion');

-- 1. Emisor, cliente y productos
alter table empresa
  add column responsabilidades_fiscales text[] not null default '{}',   -- la FVE actual de Comserva muestra «R-99-PN»
  add column responsabilidad_tributaria text,                          -- «1 - IVA» (confirmar con el contador)
  add column actividad_economica        text,                          -- CIIU 3822
  add column municipio_dane             char(5),
  add column correo_recepcion_fe        citext;

alter table cliente
  add column modo_facturacion modo_facturacion not null default 'helisa_pedido';   -- el cierre lo copia al cerrar

alter table concepto_helisa
  add column unidad_dian text;                           -- 'KGM' para kilos; la del servicio mensual por confirmar

-- 2. Numeración
create table resolucion_numeracion (
  id                serial primary key,
  ambiente          ambiente_fe not null,
  proveedor         text not null,                     -- adaptador activo: 'plemsi', 'dataico', 'matias'…
  prefijo           text not null check (char_length(prefijo) between 1 and 4),
  desde             bigint not null,
  hasta             bigint not null,
  siguiente         bigint not null,
  numero_resolucion text,                              -- autorización de la DIAN
  fecha_resolucion  date,
  vigente_desde     date not null,
  vigente_hasta     date not null,                     -- máximo 2 años
  activa            boolean not null default true,
  asigna_numero     text not null default 'sistema' check (asigna_numero in ('sistema', 'proveedor')),
  creada_por        uuid not null references usuario(id),
  creada_en         timestamptz not null default now(),
  check (desde <= hasta and siguiente between desde and hasta + 1),
  check (vigente_hasta >= vigente_desde)
);
alter table resolucion_numeracion add constraint ex_resolucion_sin_solape
  exclude using gist (ambiente with =, prefijo with =, int8range(desde, hasta, '[]') with &&);

insert into serie_documento (tipo, prefijo, formato, asignador, siguiente) values
  ('nota_credito', 'NC', '{n}', 'servidor', 1),          -- numeración interna; prefijos por confirmar
  ('nota_debito',  'ND', '{n}', 'servidor', 1);

-- 3. Lotes, facturas y líneas
create table lote_emision (
  id           serial primary key,
  periodo_id   int references periodo(id),
  ambiente     ambiente_fe not null,
  cantidad     int not null default 0,
  validadas    int not null default 0,
  rechazadas   int not null default 0,
  estado       text not null default 'abierto' check (estado in ('abierto', 'enviando', 'terminado')),
  creado_por   uuid not null references usuario(id),
  creado_en    timestamptz not null default now(),
  terminado_en timestamptz
);

create table factura_electronica (
  id                    uuid primary key default uuidv7(),
  cierre_cliente_id     uuid not null references cierre_cliente(id),
  cliente_id            uuid not null references cliente(id),
  sede_id               uuid references sede(id),
  periodo_id            int not null references periodo(id),
  lote_id               int references lote_emision(id),
  resolucion_id         int references resolucion_numeracion(id),
  ambiente              ambiente_fe not null,
  prefijo               text,                          -- se asigna al emitir
  numero                bigint,
  estado                estado_fe not null default 'borrador',
  version               int not null default 1,        -- sube en cada corrección; entra en la clave de idempotencia
  fecha_emision         timestamptz,
  fecha_vencimiento     date,
  forma_pago            text not null,                 -- contado o crédito (código de la tabla DIAN)
  medio_pago            text,
  plazo_dias            int,
  adquirente            jsonb not null,                -- copia de cliente + cliente_fiscal al aprobar
  notas                 text[] not null default '{}',  -- «SERVICIO ESPECIAL DE ASEO PRESTADO MES DE…», RH, kilos
  subtotal              numeric(14,2) not null,
  base_gravable         numeric(14,2) not null,
  iva                   numeric(14,2) not null,
  total                 numeric(14,2) not null,
  diferencia_cierre     numeric(14,2) not null default 0,  -- total − cierre.total
  pagada_otro_medio     numeric(14,2) not null default 0,  -- marcas de pagos por otro medio (C1), solo saldo de referencia
  cufe                  char(96),
  qr                    text,
  proveedor             text,
  proveedor_ref         text,                          -- id del documento en el proveedor
  estado_dian           text,                          -- texto o código que devuelve el proveedor
  errores               jsonb,                         -- reglas de la DIAN o del proveedor del último rechazo
  xml_archivo_id        uuid references archivo(id),
  attached_archivo_id   uuid references archivo(id),   -- AttachedDocument
  respuesta_archivo_id  uuid references archivo(id),   -- ApplicationResponse de la DIAN
  pdf_archivo_id        uuid references archivo(id),
  entrega_estado        estado_entrega_fe not null default 'pendiente',
  entrega_destino       citext,
  entregada_en          timestamptz,
  archivo_contable_id   uuid references archivo_plano(id),
  contabilizada_en      timestamptz,                   -- movimiento MC-FV importado en Helisa
  aprobada_por          uuid references usuario(id),
  aprobada_en           timestamptz,
  emitida_por           uuid references usuario(id),
  validada_en           timestamptz,
  anulada_por_nota_id   uuid,                          -- nota crédito total validada (FK más abajo)
  inhabilitacion_motivo text,                          -- número abandonado después de un rechazo
  creado_en             timestamptz not null default now(),
  unique (prefijo, numero),
  check (estado in ('borrador', 'aprobada', 'descartada') or (prefijo is not null and numero is not null)),
  check (not (estado = 'descartada' and numero is not null) or inhabilitacion_motivo is not null),
  check (estado <> 'aprobada' or (aprobada_por is not null and abs(diferencia_cierre) <= 1)),
  check (estado <> 'validada' or cufe is not null),
  check (estado <> 'anulada' or anulada_por_nota_id is not null)
);
create unique index ux_fe_vigente_por_cierre on factura_electronica (cierre_cliente_id)
  where estado not in ('anulada', 'descartada');
create index ix_fe_periodo_estado on factura_electronica (periodo_id, estado);

create table factura_electronica_linea (
  factura_id     uuid not null references factura_electronica(id) on delete cascade,
  orden          smallint not null,
  componente     componente_tarifa,
  concepto_id    int not null references concepto_helisa(id),
  codigo         text not null,
  descripcion    text not null,
  unidad_dian    text not null,
  cantidad       numeric(12,2) not null check (cantidad > 0),
  valor_unitario numeric(14,2) not null check (valor_unitario >= 0),
  base           numeric(14,2) not null,               -- round(cantidad × valor_unitario, 2)
  iva_pct        numeric(5,2) not null,
  iva            numeric(14,2) not null,               -- round(base × iva_pct / 100, 2)
  primary key (factura_id, orden)
);

create or replace function fn_fe_linea_editable() returns trigger language plpgsql as $$
declare v_estado estado_fe;
begin
  select estado into v_estado from factura_electronica where id = coalesce(new.factura_id, old.factura_id);
  if v_estado not in ('borrador', 'rechazada') then
    raise exception 'FE_NO_EDITABLE: la factura % está %', coalesce(new.factura_id, old.factura_id), v_estado
      using errcode = 'check_violation';
  end if;
  if tg_op = 'DELETE' then return old; end if;
  return new;
end $$;
create trigger trg_fe_linea_editable before insert or update or delete on factura_electronica_linea
  for each row execute function fn_fe_linea_editable();
-- Un trigger análogo protege las columnas de contenido de factura_electronica (fecha, adquirente, totales, notas)
-- cuando el estado no es borrador ni rechazada.

-- 4. Notas crédito y débito
create table nota_electronica (
  id                  uuid primary key default uuidv7(),
  tipo                tipo_nota not null,
  factura_id          uuid not null references factura_electronica(id),
  prefijo             text not null,                   -- serie interna (por confirmar)
  numero              bigint not null,
  concepto_correccion text not null,                   -- tabla de la caja de herramientas de la DIAN
  motivo              text not null,
  total_anulacion     boolean not null default false,  -- nota crédito por el total = anulación de la factura
  estado              estado_fe not null default 'borrador',
  version             int not null default 1,
  subtotal            numeric(14,2) not null,
  iva                 numeric(14,2) not null,
  total               numeric(14,2) not null check (total > 0),
  cude                char(96),
  proveedor_ref       text,
  errores             jsonb,
  xml_archivo_id      uuid references archivo(id),
  attached_archivo_id uuid references archivo(id),
  pdf_archivo_id      uuid references archivo(id),
  archivo_contable_id uuid references archivo_plano(id),
  contabilizada_en    timestamptz,
  solicitada_por      uuid not null references usuario(id),
  aprobada_por        uuid references usuario(id),     -- Gerencia
  aprobada_en         timestamptz,
  validada_en         timestamptz,
  creado_en           timestamptz not null default now(),
  unique (tipo, prefijo, numero),
  check (estado not in ('enviada', 'validada', 'contingencia') or aprobada_por is not null),
  check (estado <> 'validada' or cude is not null),
  check (tipo = 'credito' or not total_anulacion)
);
alter table factura_electronica add constraint fk_fe_anulada_por_nota
  foreign key (anulada_por_nota_id) references nota_electronica(id);

create table nota_electronica_linea (
  nota_id        uuid not null references nota_electronica(id) on delete cascade,
  orden          smallint not null,
  concepto_id    int not null references concepto_helisa(id),
  codigo         text not null,
  descripcion    text not null,
  unidad_dian    text not null,
  cantidad       numeric(12,2) not null check (cantidad > 0),
  valor_unitario numeric(14,2) not null check (valor_unitario >= 0),
  base           numeric(14,2) not null,
  iva_pct        numeric(5,2) not null,
  iva            numeric(14,2) not null,
  primary key (nota_id, orden)
);

create table fe_evento (                                  -- eventos RADIAN
  id          bigserial primary key,
  factura_id  uuid not null references factura_electronica(id),
  codigo      text not null check (codigo in ('030', '031', '032', '033', '034')),
  emisor      text not null check (emisor in ('adquirente', 'emisor')),
  fecha       timestamptz not null,
  cude        text,
  detalle     jsonb,
  recibido_en timestamptz not null default now(),
  unique (factura_id, codigo)
);

create or replace function fn_nota_permitida() returns trigger language plpgsql as $$
declare v_estado estado_fe; v_total numeric(14,2); v_previas numeric(14,2);
begin
  select estado, total into v_estado, v_total from factura_electronica where id = new.factura_id;
  if v_estado is distinct from 'validada' then
    raise exception 'NOTA_NO_PERMITIDA: la factura % está %', new.factura_id, v_estado using errcode = 'check_violation';
  end if;
  if exists (select 1 from fe_evento e where e.factura_id = new.factura_id and e.codigo in ('033', '034')) then
    raise exception 'NOTA_NO_PERMITIDA: la factura % ya fue aceptada (evento 033 o 034)', new.factura_id
      using errcode = 'check_violation';
  end if;
  if new.tipo = 'credito' then
    select coalesce(sum(total), 0) into v_previas from nota_electronica
     where factura_id = new.factura_id and tipo = 'credito' and estado not in ('rechazada', 'descartada');
    if v_previas + new.total > v_total then
      raise exception 'NOTA_EXCEDE_SALDO: % + % supera el total % de la factura', v_previas, new.total, v_total
        using errcode = 'check_violation';
    end if;
  end if;
  return new;
end $$;
create trigger trg_nota_permitida before insert on nota_electronica
  for each row execute function fn_nota_permitida();

-- 5. Doble facturación, modo de facturación y reapertura
create or replace function fn_fe_valida_cierre() returns trigger language plpgsql as $$
declare v_modo modo_facturacion;
begin
  select modo_facturacion into v_modo from cierre_cliente where id = new.cierre_cliente_id;
  if v_modo is distinct from 'sistema_fe' or exists (
       select 1 from pedido_helisa p where p.cierre_cliente_id = new.cierre_cliente_id and p.estado <> 'anulado') then
    raise exception 'DOBLE_FACTURACION: el cierre % se factura en Helisa por pedido', new.cierre_cliente_id
      using errcode = 'check_violation';
  end if;
  return new;
end $$;
create trigger trg_fe_valida_cierre before insert on factura_electronica
  for each row execute function fn_fe_valida_cierre();

create or replace function fn_modo_facturacion_bloqueado() returns trigger language plpgsql as $$
begin
  if new.modo_facturacion is distinct from old.modo_facturacion and exists (
       select 1 from factura_electronica f
        where f.cierre_cliente_id = old.id and f.estado not in ('borrador', 'aprobada', 'descartada', 'anulada')) then
    raise exception 'MODO_FACTURACION_BLOQUEADO: el cierre % tiene una factura electrónica enviada', old.id
      using errcode = 'check_violation';
  end if;
  return new;
end $$;
create trigger trg_modo_facturacion before update of modo_facturacion on cierre_cliente
  for each row execute function fn_modo_facturacion_bloqueado();

-- Reemplaza la función de schema.sql (10.8): un cierre facturado solo se reabre si su factura electrónica quedó anulada.
create or replace function fn_cierre_facturado_bloqueado() returns trigger language plpgsql as $$
begin
  if old.estado = 'facturado' and new.estado = 'reabierto' and (
       old.modo_facturacion = 'helisa_pedido'
       or exists (select 1 from factura_electronica f
                   where f.cierre_cliente_id = old.id and f.estado not in ('anulada', 'descartada'))) then
    raise exception 'CIERRE_FACTURADO: el cierre % ya está facturado; corrija con nota crédito', old.id
      using errcode = 'check_violation';
  end if;
  return new;
end $$;

-- 6. Recibo aplicado a facturas electrónicas y saldo de referencia
alter table recibo_caja_aplicacion
  add column factura_electronica_id uuid references factura_electronica(id),
  add constraint ck_aplicacion_una_factura check (num_nonnulls(factura_id, factura_electronica_id) <= 1);

drop view v_matriz_periodo;
drop view v_saldo_referencia;
create view v_saldo_referencia as
select f.id as factura_id, f.cliente_id, f.numero, f.fecha, f.vence,
       f.total_helisa as total,
       coalesce(sum(a.valor) filter (where r.estado in ('emitido', 'exportado', 'cruzado')), 0) as recibos,
       f.pagada_otro_medio,
       f.total_helisa
         - coalesce(sum(a.valor) filter (where r.estado in ('emitido', 'exportado', 'cruzado')), 0)
         - f.pagada_otro_medio as saldo,
       'helisa'::text as origen
from factura_helisa f
left join recibo_caja_aplicacion a on a.factura_id = f.id
left join recibo_caja r on r.id = a.recibo_id
where f.anulada_en is null
group by f.id
union all
select fe.id, fe.cliente_id, fe.prefijo || fe.numero::text, (fe.fecha_emision at time zone 'America/Bogota')::date, fe.fecha_vencimiento,
       fe.total + coalesce(n.ajuste, 0),
       coalesce(sum(a.valor) filter (where r.estado in ('emitido', 'exportado', 'cruzado')), 0),
       fe.pagada_otro_medio,
       fe.total + coalesce(n.ajuste, 0)
         - coalesce(sum(a.valor) filter (where r.estado in ('emitido', 'exportado', 'cruzado')), 0)
         - fe.pagada_otro_medio,
       'sistema'
from factura_electronica fe
left join lateral (select sum(case when ne.tipo = 'debito' then ne.total else -ne.total end) as ajuste
                     from nota_electronica ne
                    where ne.factura_id = fe.id and ne.estado = 'validada') n on true
left join recibo_caja_aplicacion a on a.factura_electronica_id = fe.id
left join recibo_caja r on r.id = a.recibo_id
where fe.estado = 'validada'
group by fe.id, n.ajuste;
-- Nota: la columna total_helisa de la v5 pasa a llamarse total en la vista; ajustar las consultas que la usen.

create or replace function fn_aplicacion_no_supera_saldo() returns trigger language plpgsql as $$
declare v_saldo numeric(14,2); v_factura uuid := coalesce(new.factura_id, new.factura_electronica_id);
begin
  if v_factura is null then return new; end if;
  select saldo into v_saldo from v_saldo_referencia where factura_id = v_factura;
  if v_saldo is null or new.valor > v_saldo then
    raise exception 'SALDO_EXCEDIDO: la aplicación de % supera el saldo de referencia % de la factura', new.valor, v_saldo
      using errcode = 'check_violation';
  end if;
  return new;
end $$;
-- fn_recibo_requiere_factura (v5) no cambia: ya suma el saldo de v_saldo_referencia por cliente.

-- 7. Trazabilidad de la factura electrónica
create view v_matriz_periodo as
select c.periodo_id, c.id as cierre_cliente_id, c.cliente_id, c.sede_id, c.estado as estado_cierre, c.modo_facturacion,
       c.num_visitas, c.kg_total, c.total,
       d.consecutivo                                  as planilla,
       p.tipo || p.numero::text                       as pedido,
       p.estado                                       as estado_pedido,
       coalesce(fe.prefijo || fe.numero::text, f.numero) as factura,
       fe.estado                                      as estado_fe,
       fe.entrega_estado,
       (fe.contabilizada_en is not null)              as fe_contabilizada,
       f.requiere_revision                            as fve_con_diferencia,
       s.recibos                                      as valor_recibos,
       (select count(distinct a.recibo_id)
          from recibo_caja_aplicacion a join recibo_caja r on r.id = a.recibo_id
         where (a.factura_id = f.id or a.factura_electronica_id = fe.id) and r.estado = 'cruzado') as recibos_cruzados,
       s.saldo
from cierre_cliente c
left join documento d             on d.id = c.planilla_documento
left join pedido_helisa p         on p.cierre_cliente_id = c.id and p.estado <> 'anulado'
left join factura_helisa f        on f.id = coalesce(p.factura_helisa_id,
                                       (select fh.id from factura_helisa fh
                                         where fh.cierre_cliente_id = c.id and fh.anulada_en is null limit 1))
left join factura_electronica fe  on fe.cierre_cliente_id = c.id and fe.estado not in ('anulada', 'descartada')
left join v_saldo_referencia s    on s.factura_id = coalesce(fe.id, f.id);

create view v_indice_busqueda_fe as                      -- la búsqueda consulta v_indice_busqueda y esta vista
  select 'factura_electronica'::text as tipo, fe.prefijo || fe.numero::text as clave, fe.cierre_cliente_id,
         'factura_electronica'::text as entidad, fe.id::text as entidad_id
    from factura_electronica fe where fe.numero is not null
  union all
  select 'cufe', fe.cufe, fe.cierre_cliente_id, 'factura_electronica', fe.id::text
    from factura_electronica fe where fe.cufe is not null
  union all
  select 'nota_' || ne.tipo::text, ne.prefijo || ne.numero::text, fe.cierre_cliente_id, 'nota_electronica', ne.id::text
    from nota_electronica ne join factura_electronica fe on fe.id = ne.factura_id
  union all
  select 'cude', ne.cude, fe.cierre_cliente_id, 'nota_electronica', ne.id::text
    from nota_electronica ne join factura_electronica fe on fe.id = ne.factura_id where ne.cude is not null
  union all
  select 'recibo', r.numero::text, fe.cierre_cliente_id, 'recibo_caja', r.id::text
    from recibo_caja r
    join recibo_caja_aplicacion a on a.recibo_id = r.id
    join factura_electronica fe on fe.id = a.factura_electronica_id
   where r.numero is not null;

-- ---------------------------------------------------------------------
-- Migración F2-3: plantilla de contabilización de facturas y notas (MC-FV v2)
-- ---------------------------------------------------------------------
insert into campo_exportable (clave, descripcion, ejemplo, aplica_a) values
  ('factura.cruce',      'Prefijo y número de la factura electrónica, con formato_cruce', 'RHD1',       '{FV,RC}'),
  ('factura.cufe',       'CUFE de la factura',                                          '',           '{FV}'),
  ('factura.vence',      'Fecha de vencimiento',                                        '23/10/2026', '{FV}'),
  ('factura.forma_pago', 'Código de forma de pago en Helisa (por confirmar)',           '',           '{FV}');
update campo_exportable set aplica_a = aplica_a || '{FV}'::tipo_plano[] where clave = 'linea.descripcion';

insert into plantilla_plano (id, tipo, version, nombre, estado, formato, separador, codificacion, tipo_documento,
                             prefijo_doc_fuente, formato_cruce, requiere_libro_n, creada_por, nota_cambio)
select 5, 'FV', 2, 'Contabilización de facturas emitidas por el sistema (libros F y N)', 'borrador', 'csv', ';', 'windows-1252', 'FV',
       'RHD', '{prefijo}{numero}', true, u.id,
       'Tipo de documento contable, cuentas por concepto y columna de cruce por confirmar con Julio (tarea 0.10).'
from usuario u where u.rol = 'admin' limit 1;

insert into plantilla_plano_columna (plantilla_id, orden, titulo, origen, campo)
select 5, c.orden, c.titulo, c.origen,
       case c.titulo when 'DOC FUENTE'    then 'factura.cruce'
                     when 'IND A AFECTAR' then 'linea.ind_fiscal'
                     else c.campo end
from plantilla_plano_columna c where c.plantilla_id = 1;

-- La línea de ingreso se repite por cada concepto de la factura (cuenta de ingreso de ese concepto);
-- el motor numera el Ind. Fiscal 1..n dentro de cada libro. Las notas usan la misma plantilla con la naturaleza invertida.
insert into plantilla_plano_linea (plantilla_id, orden, tipo_linea, clase, uso_cuenta, naturaleza, ind_fiscal, concepto, lleva_base, lleva_tercero, omitir_en_cero) values
  (5, 1, 'ingreso_unico', 'F', 'ingreso', 'C', 1, '{linea.descripcion} {periodo.nombre}', false, true, true),
  (5, 2, 'iva',           'F', 'iva',     'C', 2, 'IVA {rh.iva_pct}%',                     true,  true, true),
  (5, 3, 'cartera',       'F', 'cartera', 'D', 3, 'FACTURA {factura.cruce}',               false, true, false),
  (5, 4, 'ingreso_unico', 'N', 'ingreso', 'C', 1, '{linea.descripcion} {periodo.nombre}', false, true, true),
  (5, 5, 'iva',           'N', 'iva',     'C', 2, 'IVA {rh.iva_pct}%',                     true,  true, true),
  (5, 6, 'cartera',       'N', 'cartera', 'D', 3, 'FACTURA {factura.cruce}',               false, true, false);
select setval('plantilla_plano_id_seq', 5);
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

# Integración Conekta (opcional: 1B en la Fase 1; contabilidad en la Fase 2)
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

> **25 oct:** el formato oficial (Excel con títulos, tipo OP, códigos 2/3/54, lista por cliente, negocio vacío, un solo comentario) está en las secciones 11.1 y 11.8. Lo que sigue es el diseño contra la estructura observada el 21 de octubre y queda como salida TXT alternativa del configurador.

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

> **25 oct:** el recibo oficial es el RC de 17 columnas y 4 filas de la sección 11.3, con el cruce en tres columnas solo en la fila de cartera F (ejemplo en 11.8).

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
| Fase 2 | El mismo motor arma el asiento de una factura (débito 1305; crédito ingreso por concepto; crédito IVA con base; libros F y N). En la Fase 1 no se usa, pero queda probado con el recibo; en la Fase 2 es FEV10 (sección 6.8) |

### 6.5 Cliente Conekta (opcional: modalidad 1B en la Fase 1 y contabilidad en la Fase 2)

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
9. **En la Fase 2** el cliente Conekta envía también el asiento de cada factura y nota electrónica (`set/document`) con las mismas reglas de cola, idempotencia y exclusión con archivos.

### 6.6 Endpoints de la Fase 2 (factura electrónica)

```
# Configuración
GET  /api/v1/fe/resoluciones · POST /fe/resoluciones · POST /fe/resoluciones/:id/activar
GET  /api/v1/fe/proveedor/estado → {proveedor, ambiente, capacidades, ultima_respuesta, cola:{pendientes, inciertos}}
PUT  /api/v1/clientes/:id/fiscal {…} · POST /clientes/fiscal/importar {archivo_id, simulacro}
PUT  /api/v1/clientes/:id/modo-facturacion {modo, motivo}            (Gerencia)

# Prefactura, revisión y emisión
POST /api/v1/fe/prefacturas {periodo_id, cierre_ids?} → {facturas:[…], errores:[{cierre_cliente_id, codigo, mensaje}]}
GET  /api/v1/fe/facturas?periodo=&estado=&cliente=&entrega=&contabilizada= · GET /fe/facturas/:id
PUT  /api/v1/fe/facturas/:id                                          (solo borrador o rechazada: notas, vencimiento, forma de pago)
POST /api/v1/fe/facturas/:id/aprobar · POST /fe/facturas/:id/devolver {motivo}
POST /api/v1/fe/lotes {factura_ids[]} → lote · GET /fe/lotes/:id     (progreso del lote)
POST /api/v1/fe/facturas/:id/reenviar                                 (rechazada y corregida: mismo número, versión + 1)
POST /api/v1/fe/facturas/:id/inhabilitar {motivo}                     (abandonar un número rechazado)
POST /api/v1/fe/facturas/:id/reenviar-correo {destinatario?}
GET  /api/v1/fe/facturas/:id/archivos/:tipo                           (xml | attached | respuesta | pdf; URL firmada)

# Notas y eventos
POST /api/v1/fe/notas {factura_id, tipo, concepto_correccion, motivo, total_anulacion?, lineas?}
POST /api/v1/fe/notas/:id/aprobar (Gerencia) · POST /fe/notas/:id/emitir
GET  /api/v1/fe/facturas/:id/eventos · POST /fe/facturas/:id/aceptacion-tacita   (opcional, por confirmar)
POST /api/v1/webhooks/fe/:proveedor                                   (firma del proveedor verificada; idempotente)

# Contabilización y control
POST /api/v1/planos/mc-fv {periodo_id?, factura_ids?, nota_ids?} → archivo_plano
POST /api/v1/planos/:id/resultado {fecha, importados[], rechazados[]}  (igual que la Fase 1)
GET  /api/v1/fe/conciliacion?periodo_id= → {emitidas, validadas, contabilizadas, sin_contabilizar[], fve_helisa_a_clientes_fe[]}
```

### 6.7 Adaptador del proveedor tecnológico (interfaz genérica)

> **25 oct:** la primera implementación es Factus (`proveedores/factus/`), con el contrato de la sección 12.2. El `id` admite `'factus'`.

Objetivo: poder cambiar de proveedor escribiendo un adaptador nuevo, sin tocar prefacturas, numeración, notas, contabilización ni trazabilidad. El documento canónico es nuestro; el JSON de cada proveedor solo existe dentro de su carpeta.

```ts
// apps/api/src/fe/proveedor.ts
export interface DocumentoFE {                       // canónico, independiente del proveedor
  tipo: 'factura' | 'nota_credito' | 'nota_debito';
  ambiente: 'habilitacion' | 'produccion';
  prefijo: string; numero: number; fechaEmision: string; fechaVencimiento?: string;
  emisor: DatosFiscalesEmisor; adquirente: DatosFiscalesAdquirente;
  formaPago: 'contado' | 'credito'; medioPago?: string; plazoDias?: number;
  lineas: Array<{ codigo: string; descripcion: string; unidad: string; cantidad: Decimal; valorUnitario: Decimal;
                  base: Decimal; ivaPct: Decimal; iva: Decimal }>;
  totales: { bruto: Decimal; baseGravable: Decimal; iva: Decimal; total: Decimal };
  notas: string[];
  referencia?: { prefijo: string; numero: number; cufe: string; fecha: string; conceptoCorreccion: string };   // solo notas
}

export interface ProveedorFE {
  readonly id: string;                               // 'factus' | 'plemsi' | 'dataico' | 'matias' | 'simulado'
  readonly capacidades: { asignaNumero: boolean; enviaCorreo: boolean; webhooks: boolean; eventosRadian: boolean; pdfPersonalizable: boolean };
  emitir(doc: DocumentoFE, claveIdempotencia: string): Promise<ResultadoEmision>;
  consultarEstado(ref: RefProveedor | { prefijo: string; numero: number }): Promise<EstadoDocumento>;
  descargar(ref: RefProveedor, tipo: 'xml' | 'attached' | 'respuesta' | 'pdf'): Promise<Uint8Array>;
  reenviarCorreo(ref: RefProveedor, destinatarios?: string[]): Promise<void>;
  eventos(ref: RefProveedor): Promise<EventoRadian[]>;
  rangosNumeracion?(): Promise<RangoNumeracion[]>;
  verificarWebhook?(cabeceras: Record<string, string>, cuerpo: string): EventoProveedor | null;
}

export type ResultadoEmision =
  | { estado: 'validada'; cufe: string; qr: string; ref: RefProveedor; avisos: string[] }
  | { estado: 'rechazada'; errores: ErrorFE[]; ref?: RefProveedor }
  | { estado: 'pendiente' | 'contingencia'; ref: RefProveedor }
  | { estado: 'duplicada'; ref: RefProveedor };      // el proveedor ya tenía ese prefijo y número: consultar y adoptar el CUFE
```

**Reglas del adaptador:**

- Cada proveedor vive en `apps/api/src/fe/proveedores/<id>/` (mapeador, cliente HTTP, verificación de webhooks) con **pruebas de contrato** sobre respuestas grabadas de su sandbox. `ProveedorSimulado` responde validada, rechazada, duplicada, contingencia o tiempo agotado según el caso de prueba; con él corre todo el CI.
- El proveedor activo se elige por configuración (`fe.proveedor`) y queda registrado en cada resolución y cada factura; un cambio de proveedor exige una resolución nueva asociada al software del nuevo proveedor.
- **Solo HTTPS**, tiempo máximo de 30 s por llamada, credenciales en secretos, petición y respuesta guardadas en `integracion_envio` sin tokens.
- **Idempotencia:** clave = `factura:<id>:v<version>`; ante un tiempo agotado se llama `consultarEstado` por prefijo y número antes de reenviar; si el proveedor dice «duplicada», se adopta su CUFE.
- Si `capacidades.asignaNumero` es verdadero, el número lo devuelve el proveedor y la resolución se marca `asigna_numero = 'proveedor'`; si no, lo asigna el sistema.
- Si `capacidades.enviaCorreo` es falso, el sistema envía el ZIP con el AttachedDocument y el PDF al correo de recepción, con el asunto y el tamaño (≤ 2 MB) que exige el anexo técnico.

**Candidatos a cotizar** (de la investigación de proveedores; precios en el comparativo, no aquí): **Plemsi** (proveedor tecnológico; API REST con documentación pública y ambiente de pruebas; cubre factura, notas, PDF, reenvío de correo y eventos), **Dataico** (proveedor tecnológico en el listado DIAN; API REST con sandbox ilimitado; certificado incluido), **MATIAS API** (alternativa; modalidad software propio: Comserva quedaría como titular directa ante la DIAN, solo con aceptación escrita). Control: The Factory HKA. Lo que hay que confirmar con cada uno está en la tarea 0.8.

### 6.8 Exportador de la contabilización de facturas y notas (MC-FV)

| Regla | Detalle |
| --- | --- |
| Líneas por factura | Débito a cartera 1305 por el total (con tercero, forma de pago y vencimiento); crédito al ingreso de cada concepto por su base; crédito al IVA generado con su base. Cada línea en el libro F y su espejo en el N, con el Ind. Fiscal numerado 1..n dentro de cada libro |
| Líneas por nota | Las mismas con la naturaleza invertida (nota crédito) o igual (nota débito); DOC FUENTE = la nota y cruce = la factura afectada |
| Cuentas | De `cuenta_contable`: `ingreso` por concepto, `iva` y `cartera`, en F y N, aprobadas (tabla «servicio → cuenta» de Julio, tarea 0.10) |
| Tipo y documento | Tipo contable en Helisa: «FV» (factura de venta no electrónica, que ya existe en Comserva [Visto 21-oct]) y «NC» para notas, **por confirmar**; DOC FUENTE = prefijo + número de la factura electrónica (por ejemplo «RHD1» en habilitación) |
| Cuadre | Débitos = créditos en cada libro y por documento (LIBROS_DESCUADRADOS) |
| Canal | Archivo plano (plantilla MC-FV v2) o Conekta (`set/document`) |
| Recibo | El RC de la Fase 1 cruza contra el prefijo nuevo con el mismo `formato_cruce`; Helisa debe aceptar el cruce contra una factura que entró por movimiento contable (**por confirmar**, tarea 0.10) |
| Control | Una factura validada sin contabilización importada después de los días del parámetro `fe.dias_contabilizacion` genera alerta alta y aparece en la conciliación |

---

## 7. Pruebas de regresión obligatorias

### 7.1 Fase 0 y Fase 1 (igual que la Propuesta 1)

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

### 7.2 Fase 2 (factura electrónica)

> **25 oct:** R11, R14 y R16 tienen su versión contra el sandbox real de Factus en la sección 12.5 (R11′, R14′, R16′ y R26–R28).

Corren contra el `ProveedorSimulado` en CI y contra el sandbox o el ambiente de habilitación del proveedor elegido antes de cada entrega.

| # | Caso | Datos de entrada | Resultado esperado |
| --- | --- | --- | --- |
| R11 | **Factura de prueba validada por la DIAN en habilitación** (Cofema, septiembre de 2026) | Cierre de R1 en modo `sistema_fe`; resolución de habilitación con prefijo «RHD» | Prefactura de 2 líneas: «RECOLEC…» 1 × 74.790 (IVA 14.210,10) y «KILOGRAMOS ADICIONALES» 393,85 KGM × 4.600 (base 1.811.710,00; IVA 344.224,90); IVA total 358.435,00; **total 2.244.935,00**; diferencia con el cierre 0. Emitida en el lote: estado validada, CUFE de 96 caracteres hexadecimales, XML, AttachedDocument, respuesta DIAN y PDF guardados con SHA-256; el ZIP llega al buzón de prueba |
| R12 | Factura solo por kilo | Cierre de R2 | 1 línea 108,50 KGM × 3.991,60; base 433.088,60; IVA 82.286,83; **total 515.375,43**; si el proveedor redondea distinto, la diferencia queda registrada y no supera $1 |
| R13 | Factura de cobro fijo | Cierre de R3 | 1 línea 1 × 25.000; IVA 4.750; **total 29.750** |
| R14 | **Nota crédito** | Facturas de R11 y R13 | Sobre R11: NC parcial de 10 kg adicionales (10 × 4.600 = 46.000 + IVA 8.740 = 54.740) aprobada por Gerencia → validada con CUDE; saldo de referencia 2.190.195. Sobre R13: NC total (anulación) por 29.750 → validada; factura anulada; saldo 0; el cierre se puede reabrir y volver a facturar. Una NC después de un evento 033 simulado da NOTA_NO_PERMITIDA; una NC que supera el total da NOTA_EXCEDE_SALDO; una NC sin aprobación de Gerencia no se puede emitir |
| R15 | Doble facturación | Cierre en `sistema_fe`; cierre con pedido vigente; cambio de modo con factura enviada | DOBLE_FACTURACION al generar el pedido; DOBLE_FACTURACION al crear la factura; MODO_FACTURACION_BLOQUEADO |
| R16 | Idempotencia y contingencia | Tiempo agotado del proveedor; respuesta «duplicada»; proveedor caído en medio de un lote | Se consulta el estado y no se reenvía; se adopta el CUFE; ninguna factura se pierde ni se duplica; las pendientes salen cuando el proveedor vuelve |
| R17 | Numeración | Resolución de 10 números; 100 emisiones concurrentes en otra de 1.000; resolución vencida | El número 11 da NUMERACION_AGOTADA y hay alerta desde el 8; sin repetidos ni saltos; NUMERACION_VENCIDA |
| R18 | Contabilización y recibo | Factura de R11 y recibo de $500.000 en efectivo | MC-FV: en F, D 1305 por 2.244.935,00; C ingreso 74.790,00 y 1.811.710,00; C IVA 358.435,00 con base 1.886.500,00; igual en N; D = C por libro; DOC FUENTE «RHD…». RC: cruce contra «RHD…»; saldo 1.744.935 |
| R19 | Datos fiscales incompletos | Cliente en `sistema_fe` sin municipio DANE | No entra a la prefactura (DATOS_FISCALES_INCOMPLETOS) y aparece como bloqueo en el pre-cierre |

---

## 8. Orden de trabajo por semanas y reparto por cuentas de Claude

**Capacidad (brief v6):** equipo de 3; tiempo parcial = 45 h/semana (≈ 15 h por persona); tiempo completo = 105 h/semana. **Fase 0 + Fase 1 (1A) = 630 h** → 14 semanas a tiempo parcial (≈ 6 a tiempo completo) + **4 semanas de piloto** (un ciclo de corte). **Conekta (1B) = 70 h** → +1,5 semanas a tiempo parcial (+0,7 a tiempo completo). Reparto como en el SPEC §8: la **cuenta Max** lleva la app y la sincronización (lo más agéntico y largo) y revisa PR; las **dos cuentas Pro** llevan API y datos (Pro 1) y panel, PDF y pruebas (Pro 2), con `/model sonnet`, sesiones cortas y `/clear` entre tareas.

**Totales de la Propuesta 2 (brief v6):** 870 h = 630 h (Fase 0 + Fase 1) + 240 h (Fase 2, rango 200–300); 940 h con Conekta para la contabilidad (+70 h). Software propio ante la DIAN en lugar de la Fase 2: 400–600 h (no recomendado).

### 8.1 Fase 0 y Fase 1 (igual que la Propuesta 1)

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

### 8.2 Fase 2 · facturación electrónica (240 h ≈ 6 semanas a tiempo parcial)

En la Fase 2 la app casi no cambia, así que la **cuenta Max** toma el adaptador del proveedor, la cola de emisión y la contingencia (lo más agéntico), además de revisar PR; **Pro 1** lleva modelo, numeración, prefactura, notas y contabilización; **Pro 2** lleva pantallas, trazabilidad, conciliación y pruebas de punta a punta.

| Semana F2 | Max | Pro 1 | Pro 2 | Comserva, DIAN y hitos |
| --- | --- | --- | --- | --- |
| F2-1 | FEV2 adaptador y sandbox del proveedor elegido; `ProveedorSimulado` | FEV1 modelo; FEV3 datos fiscales y catálogo (API) | FEV3 pantallas y carga masiva de datos fiscales | Contrato con el proveedor (0.8); agregar el nuevo modo de operación en la DIAN (0.11) |
| F2-2 | FEV6 emisión por lote (cola, idempotencia, estados) | FEV4 numeración; FEV5 prefactura | FEV5 revisión y aprobación por lote | Solicitud de numeración con prefijo y asociación al software del proveedor |
| F2-3 | FEV7 entrega y PDF; FEV9 eventos RADIAN | FEV8 notas (API y reglas) | FEV8 pantallas de notas con aprobación; bandeja de estados | Set de pruebas con el proveedor (en paralelo, ≈ 1–3 semanas, por confirmar) |
| F2-4 | FEV12 rechazos y contingencia | FEV10 contabilización MC-FV; RC contra el prefijo nuevo | FEV14 trazabilidad; reporte de conciliación | Importación de prueba del MC-FV con Julio (0.10) |
| F2-5 | Regresión R11–R19; revisión de PR | FEV11 doble facturación y conciliación; FEV13 conservación | E2E de la Fase 2 | **E14**: factura de prueba y nota crédito validadas por la DIAN en habilitación |
| F2-6 | Producción: secretos, monitoreo, alertas de numeración | Datos fiscales reales; cambio de modo de los clientes del piloto | Manual de facturación y capacitación | **E15**: habilitado en producción; plan de corte |
| Piloto | Un ciclo de corte con 5 a 10 clientes en modo `sistema_fe` (los demás siguen con pedido) | | | **E16**, **E17**, acta de aceptación |

**Dos formas de contratarla:**

- **Por fases (recomendado):** semanas 1–14 de la Fase 1, piloto de la Fase 1 en las semanas 15–18 e informe de compuerta; si Comserva aprueba, tareas 0.8 a 0.11 y la Fase 2 (F2-1 a F2-6) en las semanas 19–24, con habilitación en paralelo desde la 19 y piloto de facturación electrónica en las 25–28 (≈ 28 semanas sin contar lo que tarde la decisión en la compuerta). La Fase 2 se conecta donde hoy sale el archivo de pedidos; lo demás no se rehace.
- **Completa desde el inicio:** las tareas 0.8 a 0.11 van en la Fase 0; la Fase 2 se construye en las semanas 15–20, en paralelo con el piloto de la Fase 1 (el soporte del piloto ya está dentro de las 630 h, pero la capacidad real baja un poco); el piloto de la Fase 2 va en las semanas 21–24 si la habilitación terminó (≈ 24 semanas).
- El archivo de pedidos de la Fase 1 no se descuenta: queda como contingencia (si el proveedor falla, Comserva puede facturar en Helisa llamando pedidos, con aprobación de Gerencia) y para lo que siga facturando Helisa.

**Con Conekta para la contabilidad:** +1,5 semanas a tiempo parcial, +0,7 a tiempo completo (API1, API2, API4 con los recibos, API9 con los asientos de facturas y notas, API6 a API8). **A tiempo completo:** la Fase 2 se comprime a ≈ 2,5 semanas y el total queda en ≈ 16,5 semanas por fases o ≈ 14 completa desde el inicio; la habilitación sigue dependiendo de los trámites de Comserva y del proveedor.

---

## 9. Riesgos de ejecución nuevos (se suman al SPEC §9)

| Riesgo | Efecto | Cómo se vigila o se mitiga |
| --- | --- | --- |
| Comserva no puede habilitar Pedido, o tiene costo | La Fase 1 se queda sin entrada en Helisa | Confirmarlo en la Fase 0 (0.2); mientras tanto el reporte de contingencia (camino A) sigue siendo la salida; en esta propuesta se puede adelantar la Fase 2 |
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
| **Fase 2 ·** Doble facturación (el mismo servicio facturado en Helisa y en el sistema) | Sanción para Comserva (Estatuto Tributario, art. 657) | `modo_facturacion` por cierre con triggers en los dos sentidos; conciliación mensual que busca FVE de Helisa a clientes en `sistema_fe` |
| **Fase 2 ·** Factura del sistema sin contabilizar en Helisa | «Factura no registrada en la contabilidad» (misma sanción); cartera de Helisa incompleta | Alerta alta por días sin contabilizar; MC-FV en el mismo periodo; conciliación mensual firmada por Facturación |
| **Fase 2 ·** La habilitación tarda (set de pruebas, MUISCA, firma electrónica del representante legal, certificado) | La Fase 2 termina pero no puede salir a producción | Tarea 0.11 al inicio de la Fase 2 (o en la Fase 0 si se contrata completa); el proveedor corre el set; la primera emisión real se planea con holgura |
| **Fase 2 ·** Datos fiscales incompletos o desactualizados | Rechazos masivos en la primera emisión | Se completan durante la Fase 1 (`cliente_fiscal`); indicador de avance; bloqueo en el pre-cierre; piloto con 5 a 10 clientes |
| **Fase 2 ·** Dependencia del proveedor (precio, caída, cierre) | Facturación detenida o cambio forzado | Interfaz `ProveedorFE`; contrato con exportación de XML y PDF; cola que espera; plan B con aprobación de Gerencia |
| **Fase 2 ·** Modalidad software propio (si se elige MATIAS API) | Comserva responde directamente ante la DIAN por el software | Solo con aceptación escrita; preferir un proveedor tecnológico del listado DIAN |
| **Fase 2 ·** Notas imposibles después de la aceptación (033/034) | No se puede corregir una factura ya aceptada por el cliente | Aviso en la pantalla de notas; revisión de la prefactura antes de emitir |
| **Fase 2 ·** IVA del servicio mal definido (19 % o excluido) | Facturas con IVA errado | IVA configurable por concepto; confirmación escrita del contador antes de producción (0.9) |
| **Fase 2 ·** Lote grande en la ventana de facturación (≈ 240 facturas en 4 semanas, inferencia por confirmar) | Colas largas o límites del proveedor | Emisión por lotes en cola; prueba de carga con el sandbox; plan del proveedor según el volumen real |
| **Fase 2 ·** Convivencia con la FVE de Helisa para productos y arrendamiento | Dos prefijos en cartera y en reportes | Reporte de conciliación por prefijo; RC con `formato_cruce`; confirmar con Julio (0.10) |

---

## 10. Pendientes que bloquean historias (por confirmar)

> **25 oct:** las estructuras oficiales y la cartilla de servicios ya llegaron; la tabla actualizada de esos pendientes está en la sección 11.10 y los de Factus en 12.4.

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
| Volumen real de facturas al mes y cuántas son de residuos | Comserva | Dimensión del piloto y de la compuerta; plan del proveedor de FE |
| **Fase 2 ·** Proveedor elegido, su modalidad (proveedor tecnológico o software propio), qué cuenta como documento, si envía el correo, si el PDF se personaliza, certificado incluido, conservación y salida | Proveedores (tarea 0.8) | FEV2, FEV7 |
| **Fase 2 ·** Prefijo real y rango; quién hace el trámite en MUISCA y el portal de habilitación; cantidad de documentos del set de pruebas | Comserva y el proveedor | FEV4, FEV15 |
| **Fase 2 ·** IVA del servicio (19 % o excluido), retenciones que se informan y plazo de conservación | Contador | FEV3, FEV5, FEV13 |
| **Fase 2 ·** Tipo de documento contable en Helisa para facturas y notas emitidas fuera (FV, NC), cuentas por servicio en F y N, si la cartera acepta otro prefijo y si el recibo lo cruza | Julio (tarea 0.10) | FEV10 |
| **Fase 2 ·** Unidad DIAN del servicio mensual y forma de pago y plazo por cliente | Julio y Lucrecia | FEV3, FEV5 |
| **Fase 2 ·** Si Comserva quiere eventos RADIAN completos (aceptación tácita, negociación de facturas) | Comserva | FEV9 |
| **Fase 2 ·** «Factura en sitio» (por visita, de contado): si se quiere, cambia el modelo mensual; fuera del alcance base | Comserva y Julio | Ninguna de la base |
| **Fase 2 ·** Qué seguirá facturando Helisa (productos, arrendamiento) y si Comserva reduce su plan de FE de Helisa | Comserva | FEV11 (conciliación) |

---

## 11. Complemento del 25 de octubre de 2026: formatos oficiales de Julio

**Fuentes.** El Excel que Julio envió el 23 de octubre (`pruebas/archivosplano/Plano pedido.xlsx`, hojas «Plano Pedidos», «Servicios» y «Plano Recibos»; resumen en `pruebas/archivosplano/README.md`) y el anexo SQL de Ronaldo `arquitectura/schema_v6_pedido_recibo.sql`, validado el 23 de octubre en PostgreSQL 18.6 (195 objetos). Los Excel de ejemplo generados con esas plantillas están en `pruebas/archivosplano/salida/`. Marca nueva: **[Excel Julio 23-oct]**.

**Prioridad.** Esta sección **manda** sobre las anteriores cuando no coincidan: sección 0 (puntos 1 y 4), las reglas de PEDIDO, ARCHIVOS y RECIBO del CLAUDE.md (sección 3), C4 y la semilla de 4.13, G′2, G′3 y G′5 (4.8), las semillas y tablas de catálogo del DDL (5.3), los formatos de 6.3 y 6.4, las pruebas R4 y R6 (sección 7.1) y los pendientes (sección 10). Lo demás (épicas, trazabilidad, Conekta y plan por semanas) no cambia.

### 11.0 Qué cambia frente a lo observado el 21 de octubre

| Tema | Lo que decía este documento (visto el 21-oct en otra empresa) | Oficial [Excel Julio 23-oct] |
| --- | --- | --- |
| Tipo del pedido | Por confirmar | **`OP`** |
| Archivo del pedido | TXT con «\|», sin fila de títulos, Windows-1252 | **Excel con fila de títulos** (Julio lo envió en .xlsx). Qué formato acepta de verdad el asistente de importación (.xlsx, .xls 97-2003 o .txt) se confirma con la importación de prueba (tarea 0.6). El escritor TXT se conserva como salida alternativa del configurador |
| Títulos | Sin tildes (ARTICULO/SERVICIO, CENTRO DE COSTO…) | **Exactos**, con tildes y mayúsculas mixtas: «CÓDIGO DEL CLIENTE», «ARTÍCULO/SERVICIO», «Centro de costo», «CÓDIGO NEGOCIO», «Obsequio» |
| Códigos de concepto | Provisionales `PEND-01`, `PEND-02` | **`2`** básico, **`3`** kilos adicionales, **`54`** exento; 4 a 21 categorías por kilo |
| Lista de precio | 2 «BASICA 30000» para todos | **Por cliente**, de 1 a 7; va solo en las líneas de servicio |
| Negocio | «1», por confirmar | **Vacío** |
| Código del cliente | Obligatorio, desde la cartilla | **Vacío** en el ejemplo cuando es el mismo NIT (por confirmar si siempre) |
| Comentarios | Tres (mes, RH y kilos) | **Uno**: «SERVICIO ESPECIAL DE ASEO PRESTADO MES DE {MES AAAA}». Los otros dos quedan en la plantilla, apagados por defecto |
| Número del pedido | Serie global que nunca se repite | **Consecutivo dentro del archivo** (1, 2…), repetido en todas las líneas del pedido |
| Recibo | 22 columnas de la v5; RC1 o RC2; CENTRO 0101; cruce «FVE25756» en DOC FUENTE | **17 columnas**, tipo **`RC`**, **4 filas por recibo**, CENTRO vacío, cruce en **tres columnas** (tipo, número y cuota) **solo en la fila de cartera F** |
| Cuentas del recibo | Por confirmar, «EJEMPLO» en la semilla | Caja **11050501** (F) y **111050501** (N); cartera **13050501** (F) y **112050501** (N). Las del libro N las confirma el contador |

### 11.1 Pedido OP oficial (24 columnas)

| # | Título exacto | Línea de servicio (TIPO CONCEPTO 2) | Línea de comentario (TIPO CONCEPTO 3) | Origen en el sistema |
| --- | --- | --- | --- | --- |
| 1 | TIPO | `OP` | `OP` | `plantilla.tipo_documento` |
| 2 | NUMERO | Consecutivo del pedido dentro del archivo | Igual | `pedido_helisa.numero_archivo` (11.5) |
| 3 | FECHA | Celda de fecha (se ve dd/mm/aaaa) | Igual | `pedido.fecha` |
| 4 | IDENTIDAD CLIENTE | NIT o documento **sin DV** | Igual (Julio la repite) | `cliente.nit` |
| 5 | CÓDIGO DEL CLIENTE | Vacío si es el mismo NIT; si no, código del cliente o código adicional de la sede | Igual | `sede.codigo_helisa` o `cliente.codigo_helisa` |
| 6 | IDENTIDAD VENDEDOR | `828002730` (NIT de Comserva sin DV) | Igual | `empresa.nit` |
| 7 | TIPO CONCEPTO | `2` | `3` | Tipo de línea |
| 8 | CODIGO CONCEPTO | `2`, `3`, `54` o una categoría (4–21) | Vacío | Equivalencia → `servicio_helisa.codigo` |
| 9–11 | CODIGO UNIDAD · REFERENCIA · CODIGO BARRAS | Vacíos | Vacíos | — |
| 12 | ARTÍCULO/SERVICIO | Nombre del servicio en la cartilla | Texto del comentario | Cartilla o plantilla |
| 13 | CODIGO BODEGA | Vacío | Vacío | — |
| 14 | LISTA DE PRECIO | Lista del cliente (1 a 7) | **Vacío** | `cliente.lista_precio_helisa` |
| 15 | CANTIDAD | 1 (básico o fijo) o kilos (393.85) | Vacío | Según el esquema |
| 16 | VALOR UNITARIO | Sin IVA y sin separador de miles | Vacío | Tarifa del cierre |
| 17 | VALOR TOTAL | **Vacío** (Helisa multiplica) | Vacío | — |
| 18–21 | Descuentos (tarifa y valor, normal y adicional) | Vacíos | Vacíos | — |
| 22 | Centro de costo | `0101` **como texto** | `0101` | `plantilla.centro_costo` |
| 23 | CÓDIGO NEGOCIO | **Vacío** | Vacío | — |
| 24 | Obsequio | Vacío | Vacío | — |

En Excel: la fecha va como celda de fecha (formato 14) y el centro de costo como texto (formato «@», para que no se pierda el cero). Los números van sin separador de miles; la cantidad con punto decimal dentro de la celda (393.85).

**Líneas por esquema con la cartilla real:**

| Esquema | Líneas de servicio | Lista |
| --- | --- | --- |
| `basico_incluidos` (Cofema) | `2` × 1 × básico; `3` × kilos adicionales × precio del kilo (se omite si es 0) | La del cliente. Si su tarifa no coincide con la lista 1 (25.000 / 3.850) ni con la 2 (30.000 / 4.000), va con una especial (3 a 7) y el precio en el pedido |
| `por_kilo` (FVE 25997) | `3` (o el de la categoría) × kilos totales × precio del kilo: **por confirmar con Julio** | Especial |
| `fijo_mensual` | `2` × 1 × valor fijo | 1 o 2 si coincide (25.000 o 30.000); si no, especial |
| Cliente exento | `54` × 1 × básico (sin IVA) | La del cliente |

### 11.2 Cartilla y listas de precio (hoja «Servicios»)

57 códigos de servicio, los mismos en las siete listas. Los que usa el servicio de residuos:

| Código | Servicio | IVA en la cartilla | Uso |
| --- | --- | --- | --- |
| 1 | «NO USAR» | — | Nunca |
| **2** | RECOLEC. TRANSP Y DISPOS. FINAL RESIDUOS BIOLOGICOS | 19 % | Básico y cobro fijo |
| **3** | KILOGRAMOS ADICIONALES | 19 % | Kilos adicionales (y, por confirmar, solo por kilo) |
| 4–6, 8, 9, 11–13, 16, 17, 20 | Anatomopatológicos, biosanitarios, cortopunzantes, tóxicos, medicamentos vencidos, animales, biológicos, vidrio de laboratorio, RAEE, pilas y baterías, llantas (en kilogramos) | 19 % | Solo si se factura por categoría (por confirmar) |
| 7 · 10 | QUIMICOS (GALON) · INDUSTRIALES (KILOGRAMOS) | Sin IVA | Ídem |
| **54** | RECOLEC. … EXENTO | Sin IVA | Clientes exentos |

| Lista | Nombre | Precio del código 2 | Precio del código 3 |
| --- | --- | ---: | ---: |
| 1 | BASICA 25000 | 25.000 | 3.850 |
| 2 | BASICA 30000 | 30.000 | 4.000 |
| 3 | ESPECIAL 80000 | 0 (va en el pedido) | 0 |
| 4 | ESPECIAL 42000 | 0 | 0 |
| 5 | ESPECIAL 110000 | 0 | 0 |
| 6 | TARIFA ESPECIAL 2 | 0 | 0 |
| 7 | TARIFA ESPECIAL 3 | 0 | 0 |

El código 54 vale 0 en todas las listas. Cofema (74.790 y 4.600 el kilo) no coincide con ninguna lista básica: va con una especial (Ronaldo asume la 3) y el precio en el pedido. **La lista de cada cliente la confirma Julio.**

### 11.3 Recibo RC oficial (17 columnas, 4 filas por recibo)

Títulos exactos, **con sus erratas** («INDENTIDAD», «VENDEDDOR»), porque son los que espera Helisa: TIPO · FECHA · NUMERO DE DOC. · CUENTA · CONCEPTO · CENTRO · VALOR · NATURALEZA · INDENTIDAD TERCERO · CUENTA BANCARIA · ID VENDEDDOR / COBRADOR · FECHA CHEQUE · CLASE MOV. · IND. A AFECTAR · TIPO DE DOCUMENTO QUE AFECTA · NUMERO DE DOCUMENTO QUE AFECTA · CUOTA QUE AFECTA.

| Fila (en este orden) | CUENTA | NATURALEZA | CLASE MOV. | IND. A AFECTAR | ID VENDEDDOR / COBRADOR | Cruce (tipo · número · cuota) |
| --- | --- | --- | --- | --- | --- | --- |
| 1 · Caja F | 11050501 | D | F | 1 | — | — |
| 2 · Caja N | 111050501 | D | N | 1 | — | — |
| 3 · Cartera F | 13050501 | C | F | 2 | 828002730 | prefijo · consecutivo · 1 |
| 4 · Cartera N | 112050501 | C | N | 2 | — | — |

- TIPO `RC` en las cuatro filas; FECHA, NUMERO DE DOC., CONCEPTO («PAGO FACTURA {prefijo} {consecutivo}»), VALOR e INDENTIDAD TERCERO (NIT sin DV) se repiten.
- NUMERO DE DOC. se muestra con 8 dígitos (formato `0000000#`: 00029671); la celda guarda el número.
- CENTRO, CUENTA BANCARIA y FECHA CHEQUE van vacíos en efectivo. Con transferencia cambian la cuenta de caja por la del banco y se llena la CUENTA BANCARIA (**por confirmar** con Julio).
- Un recibo que paga varias facturas repite las filas de cartera por factura, cada una con su cruce (propuesta de Ronaldo, LevR §12.2; no está en el Excel: **por confirmar**).
- El orden es caja F, caja N, cartera F, cartera N (la semilla RC v2 de 5.3 los ponía F, F, N, N).
- El prefijo del cruce es **FEV** en el ejemplo de Julio y **FVE** en las facturas reales de Comserva: **por confirmar**. El configurador no lo fija; sale de `factura_helisa.prefijo`.

### 11.4 Reglas del CLAUDE.md que cambian

Reemplazan las reglas PEDIDO, ARCHIVOS PARA HELISA y RECIBO de la sección 3:

```markdown
- PEDIDO (OP): un pedido por cierre de punto facturable y periodo. TIPO 'OP'. NUMERO = consecutivo del pedido dentro del archivo (1, 2…), repetido en todas sus líneas; el número interno del sistema es otro y nunca se reutiliza. Líneas tipo 2 (servicio: código de la cartilla de Helisa, lista del cliente, cantidad, valor unitario sin IVA) y una línea tipo 3 (comentario «SERVICIO ESPECIAL DE ASEO PRESTADO MES DE {MES AAAA}») con código, lista, cantidad y valor vacíos. VALOR TOTAL y los cuatro descuentos SIEMPRE vacíos (Helisa multiplica). CÓDIGO NEGOCIO, Obsequio, bodega, unidad, referencia y código de barras vacíos. Vendedor 828002730 y centro de costo '0101' (texto) en todas las líneas. NIT sin DV. NUNCA cuentas, naturaleza ni IVA. Suma de round(cantidad × unitario, 2) = subtotal del cierre (PEDIDO_NO_CUADRA).
- LISTA DE PRECIO: la del cliente (cliente.lista_precio_helisa, 1 a 7). Sin lista no hay pedido (CLIENTE_SIN_LISTA). En las listas especiales (precio 0 en la cartilla) el valor unitario del pedido debe ser > 0 (LISTA_ESPECIAL_SIN_VALOR).
- ARCHIVOS PARA HELISA: los títulos se copian EXACTOS, con tildes y con las erratas de Helisa («INDENTIDAD TERCERO», «ID VENDEDDOR / COBRADOR»). Plantillas oficiales en Excel con fila de títulos: fecha como celda de fecha, centro de costo como texto, número del recibo con formato 0000000#, sin separador de miles. Si la plantilla es .txt o .csv: Windows-1252, CRLF, ningún campo con el separador (SEPARADOR_EN_TEXTO) y caracteres fuera de Windows-1252 = CODIFICACION_INVALIDA.
- RECIBO → RC de 17 columnas y 4 filas por factura aplicada: caja F (D, ind 1), caja N (D, ind 1), cartera F (C, ind 2) y cartera N (C, ind 2). Cobrador (828002730) y cruce (TIPO, NUMERO y CUOTA del documento que afecta) SOLO en la fila de cartera F. CENTRO vacío. Prefijo del cruce = factura_helisa.prefijo, nunca fijo en el código (CRUCE_SIN_PREFIJO). Débitos = créditos por libro (LIBROS_DESCUADRADOS).
```

### 11.5 Códigos de error nuevos (se suman a 3.1)

| Código | Cuándo se lanza | Dónde | HTTP |
| --- | --- | --- | --- |
| `CLIENTE_SIN_LISTA` | Generar el pedido de un cliente sin `lista_precio_helisa` | Motor de pedidos; bloqueo en pre-cierre | 422 |
| `LISTA_ESPECIAL_SIN_VALOR` | Línea de servicio con lista especial (precio 0 en la cartilla) y valor unitario 0 o vacío | Motor de pedidos | 422 |
| `CRUCE_SIN_PREFIJO` | Fila de cartera F de un RC cuya factura no tiene prefijo registrado | Motor de movimiento contable | 422 |

### 11.6 Épicas que cambian

- **0.3 · Estructuras oficiales:** **cumplida el 23 de octubre** (Excel de Julio). Queda cargar las plantillas PED v1 y RC v2 del anexo de Ronaldo en el configurador y aprobarlas cuando se cierren el prefijo y las cuentas N.
- **0.5 · Cartilla:** la de servicios y listas ya llegó (hoja «Servicios»). Falta la **cartilla de clientes con su lista** y su código.
- **0.6 · Importación de prueba:** se hace con los dos Excel de `pruebas/archivosplano/salida/` (pedido OP de Cofema de septiembre y un recibo RC de ejemplo) en una **empresa de pruebas** de Julio. Si el asistente no lee .xlsx, se exporta a .xls 97-2003 o a .txt desde el configurador y se repite. Resultado esperado: «Lista de errores» vacía y, al facturar llamando el pedido, gravado $1.886.500, IVA $358.435 y total $2.244.935.
- **C1 · Clientes:** `lista_precio_helisa` pasa a ser obligatoria para facturar (CLIENTE_SIN_LISTA). El código de cliente deja de ser obligatorio cuando es el mismo NIT (por confirmar).
- **C4 · Parámetros de Helisa:** vendedor 828002730 y centro 0101 **confirmados**; negocio **vacío**; la lista por defecto desaparece (va por cliente); tipo del pedido `OP`.
- **C6 · Carga de cartillas:** importa la hoja «Servicios» (57 códigos × 7 listas, con IVA) a `servicio_helisa`, `lista_precio_helisa` y `precio_servicio_helisa`.
- **C7 · Equivalencias:** semilla real: `basico` → 2, `kg_adicionales` → 3, `fijo` → 2, exento → 54; `kg_total` (por kilo) → 3 **por confirmar**. Ya no hay códigos `PEND-…`.
- **G′2 · Plantillas:** se usan las semillas del anexo de Ronaldo: **PED v1** «Pedido OP de Helisa · Excel de Julio (24 columnas)» y **RC v2** «Recibo RC de Helisa · Excel de Julio (17 columnas, 4 filas)». La OP v1 «observada 21 oct» y la RC v2 de 22 columnas de este documento **no se siembran** (ver 11.7).
- **G′3 · Motor y escritores:** escritor **xlsx** con estilos (fecha, texto «0101», `0000000#`), además del TXT/CSV. La vista previa muestra la hoja tal como la verá Julio.
- **G′4 · Archivo de pedidos:** numera los pedidos 1..n dentro de cada archivo; el número que asigne Helisa al importar se registra en el resultado (G′6), **por confirmar** si lo muestra.
- **G′5 · Archivo RC:** cuatro filas por factura aplicada, cruce y cobrador solo en la cartera F, tipo `RC`.

### 11.7 DDL: se parte del anexo validado de Ronaldo

El DDL de 5.3 es **orientativo y no se ejecutó**; `arquitectura/schema_v6_pedido_recibo.sql` sí (PostgreSQL 18.6, 23 oct). Orden de migración propuesto: `schema.sql` → `schema_v5_archivos_planos.sql` → **`schema_v6_pedido_recibo.sql` (Ronaldo)** → lo que el anexo de 5.3 tiene y el de Ronaldo no, con los ajustes de abajo.

| Tema | Anexo de 5.3 (Adrián, orientativo) | Anexo de Ronaldo (validado) | Qué se usa |
| --- | --- | --- | --- |
| Tipo de plantilla del pedido | `tipo_plano` + `'OP'` | `tipo_plano` + `'PED'`; `tipo_documento = 'OP'` | **`PED`**; `OP` es el tipo de documento en Helisa. Ajustar `ck_archivo_cuadre` a `tipo in ('TER','PED')` |
| Formato | Sin `xlsx` | `formato_plano` + `'xlsx'` | El de Ronaldo |
| Catálogo de servicios | `concepto_helisa` (id serial, código `PEND-…`) | `servicio_helisa` (PK `codigo`, `iva_pct`, `uso`) con 17 códigos sembrados | **`servicio_helisa`**, con las columnas que faltan para la Fase 2 (abajo) |
| Listas | `lista_precio_helisa(codigo text)` | `lista_precio_helisa(id smallint)` + `precio_servicio_helisa` (119 precios) | Las de Ronaldo. **No** crear las de 5.3 |
| Lista del cliente | `cliente.lista_precio_helisa text` | `cliente.lista_precio_helisa smallint` → FK | La de Ronaldo. **No** repetir el `alter table cliente` de 5.3 para esa columna |
| Línea de plantilla | `componente`, `uso_cuenta`, `ind_fiscal`; check `ck_linea_familia` (concepto y comentario sin cuenta) | `ind_afectar`, `lleva_cruce`, `lleva_cobrador`; el código del servicio va en `cuenta`; check `ck_linea_cuenta` | Las tres columnas de Ronaldo **más** `componente` y `uso_cuenta` de 5.3. **No** crear `ind_fiscal` (lo cubre `ind_afectar`) ni `ck_linea_familia` (rompe la semilla PED de Ronaldo, que lleva código y naturaleza en las líneas de servicio) |
| Semillas de plantillas | Ids 3 (OP v1 observada) y 4 (RC v2 de 22 columnas) | Ids 3 (PED v1) y 4 (RC v2 de 17 columnas); retira la RC v1 | **Las de Ronaldo.** Las de 5.3 chocan por id y quedan descartadas |
| Pedido, equivalencias, cuentas, datos fiscales, FVE, integración y trazabilidad | `pedido_helisa`, `equivalencia_concepto`, `cuenta_contable`, `cliente_fiscal`, `factura_carga`, `integracion_envio`, vistas TRZ | No los tiene | **Los de 5.3**, con los ajustes de abajo |

Además, dos detalles del anexo de Ronaldo que hay que revisar antes de aprobar las plantillas:

1. La línea de comentario de PED v1 tiene `lleva_tercero = false`, pero en el Excel de Julio la línea 3 **sí** repite IDENTIDAD CLIENTE, vendedor y centro de costo. Verificar que el motor no la deje vacía.
2. La semilla deja `prefijo_doc_fuente = 'FVE'` en la RC v2 mientras se confirma FEV o FVE; el cruce debe salir del prefijo de cada factura registrada.

**Ajustes al anexo de 5.3 (orientativo, validar en el contenedor de PostgreSQL 18):**

```sql
-- Corre DESPUÉS de arquitectura/schema_v6_pedido_recibo.sql.
-- Se omiten de 5.3: concepto_helisa, lista_precio_helisa, cliente.lista_precio_helisa,
-- 'OP' en tipo_plano, ind_fiscal, ck_linea_familia y las semillas de plantillas 3 y 4.

-- Cartilla de Ronaldo con lo que necesita la Fase 2 (catálogo de productos de la factura electrónica)
alter table servicio_helisa
  add column tipo           smallint not null default 2 check (tipo in (1, 2)),   -- 2 servicio
  add column unidad_dian    text,                                                -- '94' unidad · 'KGM' kilogramo (probado en el sandbox de Factus)
  add column origen         text not null default 'cartilla' check (origen in ('manual', 'cartilla', 'conekta')),
  add column actualizado_en timestamptz not null default now();
update servicio_helisa set unidad_dian = case when uso in ('basico', 'exento') then '94' else 'KGM' end;

-- Equivalencias contra la cartilla real
create table equivalencia_concepto (
  id               serial primary key,
  componente       componente_tarifa not null,
  categoria_id     int references categoria_residuo(id),
  tarifa_id        int references tarifa(id),
  servicio_codigo  text not null references servicio_helisa(codigo),   -- antes concepto_id → concepto_helisa
  texto_linea      text,
  estado           estado_equivalencia not null default 'borrador',
  vigente_desde    date,
  creada_por       uuid not null references usuario(id),
  creada_en        timestamptz not null default now(),
  aprobada_por     uuid references usuario(id),
  aprobada_en      timestamptz,
  check (componente <> 'kg_categoria' or categoria_id is not null),
  check (estado <> 'aprobada' or (aprobada_por is not null and vigente_desde is not null))
);
-- La lista ya no va en la equivalencia: sale de cliente.lista_precio_helisa.

-- cuenta_contable.concepto_id → servicio_codigo
--   servicio_codigo text references servicio_helisa(codigo)   -- uso 'ingreso' (Fase 2)

-- Pedido: número del archivo y lista del cliente
--   en pedido_helisa:  lista_precio_id smallint references lista_precio_helisa(id)   (en lugar de lista_precio text)
alter table pedido_helisa
  add column numero_archivo smallint,          -- NUMERO del pedido OP dentro del archivo (1..n)
  add column numero_helisa  text;              -- el que asigne Helisa al importar, si lo devuelve (por confirmar)
create unique index ux_pedido_numero_archivo on pedido_helisa (archivo_plano_id, numero_archivo)
  where archivo_plano_id is not null and estado <> 'anulado';

-- Archivo: el pedido se llama PED
alter table archivo_plano drop constraint if exists ck_archivo_cuadre;
alter table archivo_plano add constraint ck_archivo_cuadre check (total_debitos = total_creditos or tipo in ('TER', 'PED'));

-- Plantilla: formato de celda para el escritor xlsx
alter table plantilla_plano_columna
  add column formato_celda text check (formato_celda in ('fecha', 'texto', 'entero', 'decimal', '0000000#'));
```

### 11.8 Exportadores con el formato real (6.3 y 6.4)

**Pedido de Cofema, septiembre de 2026** (lista especial 3 supuesta por Ronaldo, por confirmar; código del cliente vacío porque es el mismo NIT). Así queda la hoja, sin títulos repetidos; las columnas vacías se omiten aquí para leerla:

| TIPO | NUMERO | FECHA | IDENTIDAD CLIENTE | IDENTIDAD VENDEDOR | TIPO CONCEPTO | CODIGO CONCEPTO | ARTÍCULO/SERVICIO | LISTA DE PRECIO | CANTIDAD | VALOR UNITARIO | Centro de costo |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| OP | 1 | 26/09/2026 | 891190218 | 828002730 | 2 | 2 | RECOLEC. TRANSP Y DISPOS. FINAL RESIDUOS BIOLOGICOS | 3 | 1 | 74790 | 0101 |
| OP | 1 | 26/09/2026 | 891190218 | 828002730 | 2 | 3 | KILOGRAMOS ADICIONALES | 3 | 393.85 | 4600 | 0101 |
| OP | 1 | 26/09/2026 | 891190218 | 828002730 | 3 | | SERVICIO ESPECIAL DE ASEO PRESTADO MES DE SEPTIEMBRE 2026 | | | | 0101 |

Si la importación de prueba exige TXT, el configurador produce las mismas 24 columnas con el separador que indique Julio; la validación de «exactamente 23 separadores» de 6.3 aplica solo a ese caso.

**Recibo 35672 de $500.000 aplicado a la FVE 25756** (prefijo por confirmar):

| TIPO | FECHA | NUMERO DE DOC. | CUENTA | CONCEPTO | VALOR | NATURALEZA | INDENTIDAD TERCERO | ID VENDEDDOR / COBRADOR | CLASE MOV. | IND. A AFECTAR | TIPO DE DOCUMENTO QUE AFECTA | NUMERO DE DOCUMENTO QUE AFECTA | CUOTA QUE AFECTA |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| RC | fecha | 00035672 | 11050501 | PAGO FACTURA FVE 25756 | 500000 | D | 891190218 | | F | 1 | | | |
| RC | fecha | 00035672 | 111050501 | PAGO FACTURA FVE 25756 | 500000 | D | 891190218 | | N | 1 | | | |
| RC | fecha | 00035672 | 13050501 | PAGO FACTURA FVE 25756 | 500000 | C | 891190218 | 828002730 | F | 2 | FVE | 25756 | 1 |
| RC | fecha | 00035672 | 112050501 | PAGO FACTURA FVE 25756 | 500000 | C | 891190218 | | N | 2 | | | |

En 6.4, la regla «Cruce» pasa de `formato_cruce` en una columna a tres columnas, y la regla «Tipo y número» queda en `RC` (sin RC1 ni RC2, salvo que Julio diga otra cosa).

### 11.9 Pruebas de regresión con el formato real

Se suman a las de la sección 7.1. R4 y R6 se reemplazan por R20 y R22.

| # | Caso | Datos de entrada | Resultado esperado |
| --- | --- | --- | --- |
| R20 | **Pedido de Cofema en el formato de Julio** (reemplaza R4) | Cierre de R1; cliente con lista 3; plantilla PED v1 | Una hoja con fila de títulos idéntica, carácter por carácter, a la del Excel de Julio (24 títulos, con tildes); 3 filas con NUMERO 1; línea 2: código 2, lista 3, cantidad 1, valor 74790; línea 2: código 3, lista 3, cantidad 393.85, valor 4600; línea 3: código, lista, cantidad y valor vacíos; VALOR TOTAL, descuentos, negocio y obsequio vacíos en las tres; FECHA es celda de fecha; «0101» es texto (no 101); suma 1.886.500,00 |
| R21 | Comparación con el ejemplo de `salida/` | El pedido de R20 y `pruebas/archivosplano/salida/COMSERVA_OP_2026-09_ejemplo.xlsx` | Mismas columnas, mismos valores por celda en las filas de Cofema (salvo la fecha y el código del cliente, que Ronaldo llena con el NIT: diferencia que se documenta mientras Julio confirma) |
| R22 | **Recibo RC de 4 filas** (reemplaza R6) | Recibo 35672 de $500.000 aplicado a la FVE 25756 | 4 filas en el orden caja F, caja N, cartera F, cartera N; cuentas 11050501, 111050501, 13050501 y 112050501; D = C = 500.000 por libro; cobrador y cruce (FVE · 25756 · 1) solo en la fila 3; CENTRO vacío; NUMERO DE DOC. se ve 00035672 |
| R23 | Recibo que paga dos facturas | $600.000 aplicado a dos FVE | 6 filas: caja F y N por el total; cartera F y N por cada factura, cada cartera F con su cruce; D = C por libro |
| R24 | Pedido de dos clientes en un archivo | Cofema (lista 3) y un cliente de cobro fijo de 25.000 (lista 1) | NUMERO 1 y 2; el de lista 1 lleva 25000 (igual al precio de la cartilla); al regenerar sin Cofema, el otro pasa a NUMERO 1 |
| R25 | Casos negativos del formato real | Cliente sin lista; lista especial con valor 0; factura sin prefijo; un texto con la errata «IDENTIDAD TERCERO» corregida en la plantilla | CLIENTE_SIN_LISTA; LISTA_ESPECIAL_SIN_VALOR; CRUCE_SIN_PREFIJO; la plantilla no se aprueba si un título no coincide con el de Julio |

La prueba de bytes en Windows-1252 (antigua R4) se conserva solo para la salida TXT o CSV, si la importación de prueba la exige.

### 11.10 Pendientes actualizados (reemplazan las filas de formato de la sección 10)

| Pendiente | Estado al 25 oct | Con quién | Bloquea |
| --- | --- | --- | --- |
| Estructura del pedido, del recibo, cartilla de servicios y listas | **Recibido** el 23 oct [Excel Julio 23-oct] | — | — |
| Formato que acepta de verdad el asistente de importación (.xlsx, .xls 97-2003 o .txt) | Por confirmar con la importación de prueba de `salida/` | Julio | 0.6, G′3 |
| Prefijo del cruce: FEV (ejemplo) o FVE (facturas) | Por confirmar | Julio | G′5 |
| Lista de precio de cada cliente | Por confirmar | Julio | C1, G′3 |
| Código del cliente vacío cuando es el mismo NIT, o siempre el de la cartilla | Por confirmar | Julio | C1, G′3 |
| Cuentas del libro N (111050501 y 112050501) | Por confirmar | Contador | G′5 |
| Cuenta de bancos y CUENTA BANCARIA para transferencias | Por confirmar | Julio | G′5 |
| Código para el cobro solo por kilo (3 o el de la categoría) | Por confirmar | Julio y Lucrecia | C7 |
| Varias facturas en un recibo: repetir las filas de cartera | Por confirmar | Julio | G′5 |
| Documento Pedido habilitado en el Helisa de Comserva | Sigue pendiente | Julio y Comserva | G′4 en real, H6 |

---

## 12. Complemento del 25 de octubre de 2026: Factus, primera implementación de `ProveedorFE`

**Fuente.** Prueba de Ronaldo en el sandbox de Factus (API V2) del 23 de octubre de 2026, de 13:11:51 a 13:12:01: `pruebas/sandbox-factus/README.md`, `prueba_cofema_factus.py` (script de referencia) y `evidencia/` (peticiones y respuestas en JSON y `99_resumen.json`). Condiciones de Factus en `DocumentacionAPIFACTUS/`. Marca: **[Sandbox Factus 23-oct]**. Esta sección **manda** sobre 0 (adaptador genérico), 4.0 (tarea 0.8), 4.15 (FEV2, FEV4, FEV6, FEV8, FEV9), 6.7 y 7.2 cuando no coincidan.

**Qué cambia.** Factus es el **único proveedor probado** de punta a punta: emitió, consultó, descargó, comprobó la idempotencia y anuló con nota crédito la factura de Cofema de septiembre. Pasa a ser el **candidato principal** y la primera implementación de `ProveedorFE` (`apps/api/src/fe/proveedores/factus/`). **Condición:** falta la constancia de su habilitación ante la DIAN como proveedor tecnológico (resolución y NIT) y saber cómo se asocia el prefijo de Comserva a Factus; sin eso no se contrata. Plemsi y Dataico siguen como respaldo y MATIAS como alternativa de software propio (su script quedó sin ejecutar: el token del sandbox devolvió 401). La interfaz no cambia: Factus es un adaptador más.

### 12.1 Lo que se probó [Sandbox Factus 23-oct]

| Paso | Llamada | HTTP | Tiempo | Resultado |
| --- | --- | --- | ---: | --- |
| 0 | `POST /oauth/token` (password grant) | 200 | 0,9 s | Token Bearer de 3.600 s |
| 1 | `GET /v2/numbering-ranges?filter[is_active]=1` | 200 | 0,4 s | Factura: rango 389, prefijo `SETP` (990000000–995000000, vigente 2019–2030). Nota crédito: rango 1776, `CRTE` |
| 2 | `POST /v2/bills/validate` (Cofema, RH 22690-26) | 201 | 2,3 s | **SETP990030555** validada; CUFE de 96 caracteres; QR de la DIAN de habilitación; URL pública. Bruto 1.886.500, IVA 358.435, **total 2.244.935** (cuadra con el RH) |
| 3 | `GET /v2/bills/SETP990030555` | 200 | 0,7 s | Consulta por número |
| 4 | `GET /v2/bills/download-pdf/SETP990030555` | 200 | 0,8 s | PDF |
| 5 | Mismo `reference_code` otra vez | 201 | 0,6 s | Devuelve **la misma** factura (idempotencia) |
| 6 | `POST /v2/credit-notes/validate` (concepto 2, anulación) | 201 | 2,2 s | **CRTE1194** con CUDE, enlazada con `bill_number`; PDF en `GET /v2/credit-notes/CRTE1194/download-pdf` |
| 7 | Factura sin `customer.identification` | **422** | 0,5 s | `errors` con el campo señalado |

Lo aprendido: Cloudflare bloquea el User-Agent por defecto de las librerías HTTP (error **1010**); las listas vienen en `data.data`; la nota referencia la factura con `bill_number`; `send_email: false` evita los correos en pruebas; el sandbox es **compartido** entre aliados (emisor «FACTUS V2», consecutivos asignados por Factus, documentos que no llegan a la DIAN real); las notificaciones FAJ43b/FAJ44b (razón social distinta al RUT) y RUT01 **no bloquean** la validación.

**Dos hallazgos para corregir antes de producción:**

1. La nota crédito volvió con la notificación **CBF02** («No se informó el número de la factura referenciada»): el payload solo llevaba `bill_number`. Hay que revisar en la documentación de Factus qué campo de referencia completa espera (número, CUFE y fecha de la factura) y probar de nuevo hasta que la nota valide sin esa notificación.
2. La nota quedó con forma de pago contado/efectivo (`payment_form 1`, `payment_method_code 10`) aunque la factura era a crédito: debe copiar la forma de pago de la factura que afecta.

### 12.2 Contrato del adaptador Factus

| Operación de `ProveedorFE` | Llamada a Factus | Notas |
| --- | --- | --- |
| Autenticación (interna) | `POST /oauth/token`, formulario `grant_type=password`, `client_id`, `client_secret`, `username`, `password` | Token de 1 h en memoria; se renueva a los 55 min o ante un 401 (una sola vez por petición). El refresh token se usa si la respuesta lo trae; si no, se pide uno nuevo. Las cuatro credenciales van en secretos (`FACTUS_CLIENT_ID`, `FACTUS_CLIENT_SECRET`, `FACTUS_USER`, `FACTUS_PASS`), nunca en la base, los logs, Sentry ni el repositorio |
| `rangosNumeracion()` | `GET /v2/numbering-ranges?filter[is_active]=1` | Lista en `data.data`. Se toma el rango activo y no vencido por tipo de documento («Factura de Venta», «Nota Crédito») y se guarda su `id` en la resolución del sistema |
| `emitir(doc, clave)` factura | `POST /v2/bills/validate` | `reference_code = clave`, `numbering_range_id` del rango, `document '01'`, `operation_type '10'`, `send_email` (falso en pruebas), `billing_period`, `payment_details`, `customer`, `items`. **201** = validada |
| `emitir(doc, clave)` nota crédito | `POST /v2/credit-notes/validate` | `bill_number` de la factura, `correction_concept_code` (tabla DIAN; 2 = anulación), `customization_id '20'`, rango de notas, ítems y la referencia completa que pida CBF02 (12.1) |
| `consultarEstado(ref)` | `GET /v2/bills/{número}` (y el equivalente de notas) | Se usa al conciliar; ante un tiempo agotado basta **reenviar con el mismo `reference_code`** (idempotencia probada) |
| `descargar(ref, 'pdf')` | `GET /v2/bills/download-pdf/{número}` · `GET /v2/credit-notes/{número}/download-pdf` | El script prueba también `/v2/bills/{número}/download-pdf` como alternativa. Se guarda con SHA-256 |
| `descargar(ref, 'xml')` | `download-xml` (equivalente al PDF) | **Por probar** en el sandbox |
| `reenviarCorreo` | — | Por confirmar en la documentación |
| `eventos(ref)` | Campos de la factura (`has_claim`, `is_negotiable_instrument`) y endpoints de eventos | **Por confirmar.** El paquete RADIAN de Factus es de **recepción** (facturas que Comserva recibe), no hace falta para emitir |
| Suscripción (operación propia del adaptador) | `GET /v2/subscriptions` | Documentos consumidos y vencimiento del plan, para las alertas del panel (como FEL-05 de Ronaldo) |

**Capacidades declaradas:** `{ asignaNumero: true, enviaCorreo: true, webhooks: false, eventosRadian: 'por confirmar', pdfPersonalizable: false }`. Con `asignaNumero` verdadero la resolución se marca `asigna_numero = 'proveedor'`: el número lo devuelve Factus y FEV4 solo vigila rango y vigencia.

**Reglas de cliente HTTP:**

- **User-Agent propio** en todas las llamadas (`RH-digital-Comserva/<versión>`); sin él, Cloudflare responde 1010.
- Las listas se leen de `data.data`; los objetos, de `data`.
- **Límite de 80 peticiones por minuto**: cola de emisión con concurrencia baja y espera ante **429**.
- **Sin webhooks**: el estado se obtiene en la respuesta de `validate` (síncrona, ≈ 2,3 s) y, para la conciliación, con consulta periódica.
- Solo HTTPS, 30 s por llamada; petición y respuesta en `integracion_envio`, sin token.

**Idempotencia.** `reference_code` = `cierre:<cierre_cliente_id>:v<versión de la prefactura>` (en notas, `nota:<id>:v<versión>`). Probado: el mismo `reference_code` devuelve la misma factura con 201. Ante un tiempo agotado o un 5xx se reenvía **con la misma clave**; si vuelve un número ya guardado, se adopta (estado `duplicada` de `ResultadoEmision`). El script de prueba usaba un `reference_code` con fecha y hora para correr varias veces; en el sistema la clave es estable.

**Mapeo `DocumentoFE` → Factus (lo probado):**

| `DocumentoFE` | Factus | Valor de la prueba (Cofema) |
| --- | --- | --- |
| `adquirente` | `customer`: `identification_document_code` (31 = NIT), `identification`, `dv`, `company`, `trade_name`, `address`, `email`, `phone`, `legal_organization_code`, `tribute_code`, `responsibilities`, `municipality_code` | NIT 891190218, municipio 18001 (Florencia). Los datos de contacto salen de `cliente_fiscal` |
| `lineas[]` | `items[]`: `code_reference`, `name`, `quantity`, `price`, `discount_rate`, `unit_measure_code`, `standard_code '999'`, `taxes [{code '01', rate}]` | Básico: 1 × 74.790, unidad **94**. Kilos: 393,85 × 4.600, unidad **KGM** |
| `formaPago`, `plazoDias` | `payment_details`: `payment_form` (1 contado, 2 crédito), `payment_method_code`, `amount`, `due_date` | Crédito (2), método 42, vencimiento |
| Periodo del cierre | `billing_period {start_date, end_date}` | 2026-09-01 a 2026-09-30 |
| `notas` | `observation` | Mes, RH |
| `referencia` (notas) | `bill_number` + referencia completa (CBF02) | `SETP990030555` |

`code_reference` del ítem = código de la cartilla de Helisa (`servicio_helisa.codigo`: 2, 3, 54) y `unit_measure_code` = `servicio_helisa.unidad_dian` (sección 11.7), para que la factura y la contabilización hablen del mismo concepto. Los mockups de Ronaldo (`mockups_v6/assets/data.js`, `armarFacturaJSON`) aún usan la unidad 94 para los kilos: la prueba usó KGM.

**Respuesta que se guarda** (`data` de `validate`): `number`, `cufe`, `is_validated`, `validated_at`, `errors` (notificaciones), `links.qr` y `links.public_url`, `totals`, `reference_code`, `numbering_range`. En la nota, además, el CUDE. Las notificaciones de `errors` se guardan como **avisos**, no como rechazo, cuando la respuesta es 201.

### 12.3 Errores de la Fase 2 según los HTTP observados (complementa 3.2)

| Respuesta de Factus | Qué hace el adaptador | Código de dominio |
| --- | --- | --- |
| 201 con `errors` vacío | Validada | — |
| 201 con notificaciones (FAJ, RUT01, CBF02) | Validada con avisos; CBF02 en una nota se trata como defecto del payload a corregir | — (aviso en la factura) |
| **422** `Validation error` con `errors.{campo}` | Rechazada; se traduce cada campo a un mensaje («Falta el documento del cliente») | `FE_RECHAZADA` (o `DATOS_FISCALES_INCOMPLETOS` si el campo es del cliente y se escapó a la validación previa) |
| 401 | Renueva el token y reintenta una vez; si persiste, pausa la cola y alerta | `PROVEEDOR_CREDENCIALES_INVALIDAS` (nuevo) |
| 409 o «ya existe» | Consultar por número o reenviar con la misma clave y adoptar | — (estado `duplicada`) |
| **429** | Espera y reintenta; no cuenta como fallo | — |
| **1010** de Cloudflare (HTML, no JSON) | Error de configuración (User-Agent); alerta al administrador | `PROVEEDOR_BLOQUEADO` (nuevo) |
| 5xx, tiempo agotado | Reintento con la misma clave | `PROVEEDOR_NO_DISPONIBLE` al agotar reintentos |

### 12.4 Historias y tareas que cambian

- **0.8 · Proveedor:** Factus ya entregó credenciales de sandbox, colección de Postman, tabla de paquetes y términos. Antes de contratar: (a) **constancia de habilitación ante la DIAN** (resolución y NIT) y cómo se asocia el prefijo de Comserva; (b) **certificado de firma** incluido o no, por escrito (los términos sugieren que el plan corre desde la activación del certificado); (c) documentos de activación (RUT, certificado de existencia de máximo 30 días, cédula del representante legal, comprobante de pago, versión v2) y el **acuerdo de alianza y confidencialidad**; (d) plan a nombre del NIT de Comserva; (e) si Comserva puede tener **dos facturadores** (Helisa/ATEB para productos y Factus para el servicio, con prefijos distintos). Riesgos contractuales: retracto de 5 días hábiles y sin reembolso después, bloqueo de la cuenta si el plan no se renueva, sin SLA, sin personalización. Tamaño del plan por volumen: el de **1.600 documentos** si son ≈ 60 facturas al mes de residuos, el de **5.000** si son ≈ 240 (con notas); el de 150 no alcanza. Precios en la estimación interna y en el comparativo, no aquí.
- **FEV2 · Adaptador y sandbox:** se cumple con Factus: `ProveedorFactus` + `ProveedorSimulado`, pruebas de contrato con las respuestas de `evidencia/` como grabaciones (sin datos de contacto del cliente: ver 12.6). El criterio «CUFE de 96 caracteres hexadecimales» ya se observó.
- **FEV4 · Numeración:** con Factus el número lo asigna el proveedor desde el rango (`numbering_range_id`); el sistema guarda el rango, vigila vigencia y consumo, y nunca inventa números.
- **FEV6 · Emisión:** sin webhooks; `validate` responde en ≈ 2,3 s, así que un lote de 60 tarda ≈ 2,5 min y uno de 240, ≈ 10 min dentro del límite de 80 por minuto.
- **FEV8 · Notas:** incluir la referencia completa (CBF02) y copiar la forma de pago de la factura.
- **FEV9 · RADIAN:** por confirmar qué eventos expone Factus para facturas emitidas; el paquete RADIAN es de recepción y queda **opcional**.
- **Alertas de suscripción** (nueva, dentro de FEV11): documentos usados frente al plan y días para el vencimiento, con `GET /v2/subscriptions` (FEL-05 de Ronaldo).
- **MC-FV** (6.8) equivale a la plantilla **ASI** del anexo de Ronaldo (`tipo_plano` + `'ASI'`, campos `factura.numero` y `factura.cufe`). Las cuentas de ASI en los mockups de Ronaldo (413550, 240805, 130505…) son de ejemplo, no del Excel de Julio: la plantilla «servicio → cuenta» sigue pendiente (tarea 0.10).

### 12.5 Pruebas con el sandbox real (complementan 7.2)

| # | Caso | Resultado esperado |
| --- | --- | --- |
| R11′ | Factura de Cofema por `ProveedorFactus` en el sandbox | 201; número `SETP…`; CUFE de 96 hexadecimales; totales 1.886.500 / 358.435 / 2.244.935 iguales a la prefactura; ítem de kilos con unidad KGM; PDF guardado con SHA-256 |
| R14′ | Nota crédito de anulación sobre R11′ | 201; número `CRTE…` con CUDE; **sin la notificación CBF02**; forma de pago igual a la de la factura |
| R16′ | Idempotencia real | Dos `emitir` con la misma clave devuelven el mismo número; un tiempo agotado simulado seguido de reenvío no crea una segunda factura |
| R26 | Error de validación | Factura sin documento del cliente → 422 traducido a mensaje claro; la factura queda rechazada sin consumir número |
| R27 | Cliente HTTP | Sin User-Agent propio la prueba falla con 1010 (se documenta); con él, todas responden; una respuesta 429 simulada espera y reintenta |
| R28 | Token | Token vencido a mitad de un lote → se renueva una vez y el lote termina sin duplicados |

Las pruebas contra el sandbox corren a mano o en un job aparte, **nunca en cada CI**, y con datos anonimizados (12.6).

### 12.6 Datos de prueba

El sandbox de Factus es **compartido entre aliados** y la URL pública de cada documento queda consultable. Las pruebas siguientes usan un **cliente ficticio** (NIT de prueba, sin correo ni teléfono reales); los totales de Cofema se conservan porque son los de la regresión. Las grabaciones para las pruebas de contrato se limpian de datos de contacto antes de entrar al repositorio.
