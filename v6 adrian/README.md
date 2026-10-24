# v6 de Adrián · RH digital + Helisa (Comserva)

**22 de octubre de 2026.** Es la v6 que preparó Adrián, en dos propuestas, la 1 y la 2. Hasta el 24 de octubre estuvo en `propuesta/`. La v6 de Ronaldo, con las propuestas A y B, está aparte, en `levantamiento requerimientos/`, `mockups_v6/` y `reunion/`. Esta carpeta reemplaza el planteamiento de la v5 después de la reunión del 21 de octubre con Comserva. Lo que cambió: Helisa no importa facturas, importa **pedidos**. La factura electrónica se sigue haciendo **una a una** en Helisa (llamando el pedido con F3). El recibo sí entra como **movimiento contable**, con cuentas y en dos libros. Comserva y Julio pidieron ver **dos caminos**. Se presentan en la reunión del **viernes 23 de octubre de 2026 a la 1:00 p. m.**

## Las dos propuestas en una frase

| | Propuesta 1 · RH digital hasta Helisa | Propuesta 2 · RH digital con facturación electrónica |
| --- | --- | --- |
| Qué hace el sistema | Visita, constancia, cierre, planilla RH, **archivo de pedidos** y **archivo de recibos** para Helisa, registro de la FVE y trazabilidad | Todo lo anterior, y además **emite la factura electrónica** por medio de un proveedor tecnológico autorizado por la DIAN. Helisa queda para la contabilidad |
| Qué sigue manual | Lucrecia elabora cada factura en Helisa llamando el pedido (≈ 240 en 4 semanas, por confirmar) | Lucrecia revisa y aprueba la prefactura; el sistema emite por lote |
| Modalidades | **1A** archivos planos (base) · **1B** API Helisa Conekta (opcional, la paga Comserva) | Contabilidad hacia Helisa por archivo o por Conekta |
| Tiempo (equipo de 3 a tiempo parcial) | ≈ 18 semanas con piloto (≈ 10 a tiempo completo) | Por fases ≈ 28 semanas · contratada completa ≈ 24 |
| Complejidad | Baja-media | Mayor: trámite DIAN, numeración nueva, notas crédito, datos fiscales y responsabilidad tributaria. Con proveedor tecnológico es manejable; con software propio no se recomienda |

**Recomendación:** por fases. Fase 0 (definición) → **Fase 1 = Propuesta 1** con piloto de un ciclo → compuerta (Comserva decide con el tiempo y los errores medidos) → **Fase 2 = facturación electrónica**. Los antiguos fase 2 y fase 3 de la v5 pasan a ser complementos: **C1** (acta y portal) y **C2** (caja formal y mensajería).

## Qué hay en la carpeta

| Archivo o carpeta | Para quién | Qué es |
| --- | --- | --- |
| `Comparativo de propuestas (v6).html` y `.pdf` | **Comserva** (viernes) | 12 páginas: lo que aprendimos, las dos propuestas lado a lado, «¿la factura electrónica lo complica mucho?», camino por fases, cronograma en semanas, costos de terceros, trazabilidad y lo que necesitamos. Sin precios del equipo |
| `Estimación de tiempo y costo (v2).md` y `.pdf` | **Interno** | Horas por épica, calendario, precios en tres escenarios, neto, costo-beneficio para Comserva y qué hacer si el presupuesto es de 10–15 M. **No se entrega al cliente** |
| `reunion 21 oct 2026/` | Equipo | Resumen de la reunión (.md, .html y .pdf) con 11 imágenes de Helisa con los datos de terceros tapados, preguntas para el viernes (.md y .pdf) y mensaje listo para pedirle los formatos a Julio. Las transcripciones (TurboScribe de 02:20 a 32:20 y Whisper de 29:00 a 36:44) se quedan **solo en local**: `.gitignore` las excluye porque el repositorio es público. Se comparten por otro medio |
| `propuesta 1/` | Comserva y equipo | Levantamiento v6, flujo de una hoja, mockups navegables y cambios para el desarrollo de la Propuesta 1 |
| `propuesta 2/` | Comserva y equipo | Lo mismo para la Propuesta 2 |

**Documentos de XxavilesxX basados en esta v6** (siguen en `propuesta/`, ver su `README.md`):
- flujo comparativo P1 y P2;
- costos detallados P1 y P2 (interno);
- propuesta económica comparativa para Comserva.

Cada carpeta de propuesta trae:

- `Levantamiento de requerimientos Comserva (v6, propuesta N).html` y `.pdf`: el documento vigente de esa propuesta. Trae una sección 0 nueva («Qué cambió en la v6», con lo que cubre y lo que no). La sección 12 está reescrita (integración con Helisa) y hay requerimientos nuevos: **TRZ** (trazabilidad), **API** (Conekta) y, solo en la P2, **FEV** (factura electrónica).
- `Flujo RH digital Comserva (v6, propuesta N).html` y `.pdf`: infografía A4 horizontal con carriles, el ejemplo real de Cofema de septiembre y los puntos por confirmar.
- `mockups_v6/index.html`: prototipo navegable (se abre en el navegador o se sirve con `python3 -m http.server 8765 --directory "v6 adrian/propuesta 1/mockups_v6"`). Trae la página nueva **Trazabilidad**: cadena documental por cliente y periodo, búsqueda por cualquier número, matriz del periodo y expediente. En la P1, «Helisa: pedidos y recibos», con la conexión 1A/1B. En la P2, «Facturación electrónica» y «Contabilidad en Helisa», con la factura y la nota crédito de prueba.
- `Cambios para el desarrollo (v6, propuesta N).md` y `.pdf`: cómo cambian el SPEC v1.1 y el esquema SQL (reglas, épicas, tablas, contratos, pruebas de regresión y plan por semanas). El DDL es orientativo y no se ha ejecutado.

## Artefactos publicados (privados; se comparten desde el menú Compartir de cada uno)

| Qué | Enlace |
| --- | --- |
| Comparativo de propuestas (v6) | https://claude.ai/artifact/Fou9oNYa4j4KvrikLP4SqL |
| Flujo de la propuesta 1 | https://claude.ai/artifact/6MwdNXTi3LmRwLGuXiDSGN |
| Flujo de la propuesta 2 | https://claude.ai/artifact/TM2fGAQAZNdCYcHiWUkPwP |
| Levantamiento v6, propuesta 1 | https://claude.ai/artifact/WtmK9hyryJH25iudVS7rSp |
| Levantamiento v6, propuesta 2 | https://claude.ai/artifact/76zdJqjUavghE7fwaqFWjr |
| Mockups v6, propuesta 1 | https://claude.ai/artifact/B5kgnK9u9HXf6o73NQ7HQV |
| Mockups v6, propuesta 2 | https://claude.ai/artifact/PySNy52FiDq7zQMMGzxTyZ |

## Datos que siguen por confirmar (se cierran en la Fase 0)

- Si el documento **Pedido** se puede habilitar en el Helisa de Comserva, y su costo.
- **Formatos oficiales** del pedido y del recibo, campo por campo (Julio quedó de enviarlos), RC1 o RC2, y las cuentas en los dos libros.
- Códigos de concepto, lista de precios y código de cada cliente o sede en Helisa.
- Volumen real de facturas al mes y cuántas son del servicio de residuos.
- Conekta: el IVA, el hosting de Helisa y a nombre de quién va la suscripción.
- En la P2: el proveedor tecnológico, el prefijo y la numeración, que la cartera de Helisa acepte facturas con otro prefijo, y el IVA del servicio (art. 476 num. 12, lo confirma el contador).

## Cifras de referencia que usan todos los documentos

Cofema, septiembre de 2026: 4 visitas, 413,85 kg, **$2.244.935**, FVE 25756 (datos reales de la v5). Cobro solo por kilo (FVE 25997): 108,50 kg × $3.991,60 + IVA 19 % = **$515.375,43**. Conekta: $211.680 al mes según helisa.com (IVA por confirmar). Lo marcado «de prueba» en los mockups (prefijo RHD, CUFE, recibos, códigos de Helisa) no es dato del cliente.
