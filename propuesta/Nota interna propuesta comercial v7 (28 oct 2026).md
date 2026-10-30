**DOCUMENTO INTERNO DEL EQUIPO · NO SE ENTREGA AL CLIENTE** (trae horas, tarifa y lo que se recortó).

# Nota interna · Propuesta comercial v7 (28 de octubre de 2026)

Acompaña a `Propuesta comercial Comserva (v7, 28 oct 2026).html/.pdf`. Explica cómo se llegó a los precios con el tope que fijó Ronaldo (**máximo $12 M el Alcance 1 y $18 M el Alcance 2, acumulativo**), qué se recortó frente a la estimación v2 y qué quedó de la reunión del 28 de octubre.

## 1. Resumen de la reunión del 28 de octubre (transcripción en local, 34 min)

Asistieron por Comserva Diego (gerente), Julio (contabilidad y Helisa) y Lucrecia (facturación); por el equipo Adrián y Cristian presentaron, con el video y el flujo de una hoja.

| Tema | Qué se dijo |
| --- | --- |
| Dinámica | Video introductorio y luego el flujo de los dos alcances. Nombres y datos del video son de prueba. |
| Alcance 1 | Visita → cierre → tarifa → **archivo de pedidos** → Helisa factura y envía a la DIAN → se registra la FV en el sistema → cobro → **archivo de recibos** → se confirma el cruce. «Dos vueltas» entre sistemas. Conekta (API de Helisa) las quitaría, pero la factura sigue siendo una a una. |
| Alcance 2 | Prefactura → revisión → proveedor tecnológico → DIAN → tres cosas: factura al cliente, asientos a Helisa, cobro. Helisa sigue con contabilidad y nómina. Requiere contratar un proveedor aparte (Factus, el que escogimos). Julio preguntó si el software podía enviar directo a la DIAN: se explicó por qué no. |
| Pedidos nuevos | **Logística:** acta de tratamiento y disposición final (consolidado del mes por tipo de residuo peligroso, hoy en hoja de cálculo a mano). **Diego:** contratos con cada cliente (6 meses o 1 año), modelo estándar, aviso de renovación, consecutivo, trazabilidad año tras año, con la tarifa. Diego mismo reconoció que mezclar logística con contabilidad «ya es un poco complejo». |
| Costos | Diego: «¿cuánto costaría el alcance 1 y cuánto el alcance 2?». El equipo dijo que el 2 es acumulativo, no desde cero. Pidió la propuesta **por correo** para socializarla con los accionistas; no es decisión solo de él. Pidió también el video. |
| Cierre | Sin preguntas de fondo. Diego y Lucrecia: «quedó claro». Posible última sesión después de la propuesta, o se espera respuesta. |
| Charla posterior del equipo | Adrián y Cristian creen que irán por el Alcance 1 y que el presupuesto es bajo. |

**Dato pendiente de registrar:** la reunión del viernes 23 sigue sin acta en el repositorio.

## 2. Precio: cómo cuadra con el tope

Tarifa usada: **$40.000 la hora**, el piso de la estimación v2 (§5.1 y §8: «no se baja de $40.000; se recorta el alcance»). Con eso:

| Bloque | Horas | Precio | Tope de Ronaldo |
| --- | ---: | ---: | ---: |
| Alcance 1 | 300 | $12.000.000 | $12 M ✓ |
| Alcance 2 (diferencia) | 150 | $6.000.000 | total $18 M ✓ |
| Complemento contratos | 40 | $1.600.000 | fuera del tope, opcional |

Frente a la estimación v2 (Fase 0 + 1 = 630 h, Fase 2 = 240 h), el Alcance 1 queda en el **48 %** de las horas y el Alcance 2 en el **63 %**. Es menos que la «Fase 1 esencial» de la v2 §8 (375 h ≈ $15 M). El neto por persona sigue en ≈ $25.000 la hora (v2 §5.5): no hay margen para absorber trabajo extra, por eso la propuesta dice en cada alcance qué **no** incluye y remite los cambios a cotización por escrito.

## 3. Alcance 1 · 300 h · qué entra y qué se recortó

| Épica | v2 completa | **v7** | Qué se recorta |
| --- | ---: | ---: | --- |
| F0 · Definición | 36 | 20 | Una sesión con Julio; habilitar Pedido e importar OP y RC de prueba con Cofema |
| A · Cimientos | 24 | 18 | Un solo entorno de pruebas además de producción |
| B · Identidad, dispositivos y series | 28 | 12 | Roles fijos (operario, oficina, gerencia); sin gestión fina de dispositivos |
| C · Maestros | 70 | 34 | Carga inicial la hace el equipo (sin importador Excel de autoservicio); sin fusión de clientes; equivalencias con Helisa fijas (código de cliente y lista de precio) |
| D · Sincronización sin señal | 48 | 30 | Modelo simple: cola por visita, bloque de consecutivos por dispositivo |
| E · App del operario | 110 | 56 | Visita con 3 resultados, kilos, firmas, 1 foto, GPS, constancia PDF compartida desde el celular, recibo de caja. Sin inicio de jornada formal, sin novedades detalladas, sin impresión de contingencia |
| F · Panel de operación | 56 | 22 | Bandeja de visitas, clientes, cierres y documentos. Sin recaudo/entrega de efectivo, sin programación semanal |
| G · Cierre, RH y FVE | 78 | 36 | Pre-cierre y cierre, 3 esquemas de tarifa, RH con valores, FVE digitada con validación ± $1. Sin importar listado de FVE |
| G′ · Archivos OP y RC | 60 | 24 | Plantillas **fijas** según el Excel de Julio (24 y 17 columnas, 4 filas por recibo). Sin configurador |
| **Acta y consolidado (nuevo, 28 oct)** | — | 12 | Acta con el formato actual (7 tipologías, tratamiento, dispositor, consecutivo desde 25677) y Excel del mes por tipo y cliente. Los datos ya existen en el cierre |
| TRZ · Trazabilidad | 30 | 6 | Cadena en la ficha del cliente/periodo. Sin búsqueda global, matriz ni expediente |
| H · Calidad, despliegue, piloto | 90 | 30 | Pruebas de los flujos críticos (Cofema y solo por kilo), despliegue, APK, manual corto, capacitación, piloto 1 ciclo |
| **Total** | **630** | **300** | |

**Decisiones que se tomaron para caber:** se conserva el recibo de caja en la app y el archivo RC (la v2 §8 lo sacaba) porque el flujo que vio Comserva el 28 incluye las dos vueltas; a cambio salen recaudo/entrega de efectivo, configurador, importador Excel, correo automático desde el servidor, trazabilidad avanzada y portal. Nada de esto se le oculta al cliente: está en «Lo que no incluye».

## 4. Alcance 2 · 150 h · qué entra y qué se recortó

| Partida | v2 | **v7** | Nota |
| --- | ---: | ---: | --- |
| Datos fiscales del cliente | 24 | 16 | Campos obligatorios de la DIAN; sin consulta automática al RUT |
| Catálogo e IVA | 10 | 6 | IVA por concepto; sin retenciones |
| Prefactura y emisión por lote | 20 | 16 | |
| Integración con el proveedor | 40 | 24 | El adaptador ya se probó el 23 oct (token, validate, show, PDF, idempotencia, NC). Faltan producción, cola, renovación de token y errores |
| Numeración | 8 | 4 | |
| Notas crédito (y débito) | 24 | 14 | Solo crédito, con aprobación de Gerencia |
| Envío al cliente y RADIAN | 14 | 8 | Solo correo con PDF y XML; **sin eventos RADIAN** |
| Contingencia | 8 | 0 | Procedimiento escrito, no software |
| Contabilización en Helisa | 24 | 20 | Plantilla ASI por archivo de movimiento contable |
| Panel de facturación | 20 | 12 | Bandeja y estados DIAN; sin conciliación automática |
| Habilitación ante la DIAN | 14 | 8 | Acompañamiento; el trámite lo hace Comserva |
| Pruebas y piloto | 24 | 16 | |
| Capacitación | 10 | 6 | |
| **Total** | **240** | **150** | |

La v2 §11.2 defendía mantener 240 h frente a las 80–120 h del levantamiento de Ronaldo. 150 h es el punto medio y **depende de que la prueba del sandbox se reutilice tal cual**; si el proveedor final no es Factus, el adaptador se rehace y hay que recotizar (está dicho en la propuesta: «mismo alcance y precio» aplica solo al desarrollo que no depende del proveedor; conviene cuidarlo en el contrato).

## 5. Hallazgo de la investigación del 28 de octubre: Factus y la DIAN

- El listado oficial de proveedores tecnológicos habilitados de la DIAN (`Proveedores-habilitados-15102026.xlsx`, 96 empresas, en https://micrositios.dian.gov.co/sistema-de-facturacion-electronica/proveedores-tecnologicos/) **no incluye a FACTUS S.A.S. (NIT 901724254) ni a Halltec** (la marca con la que aparecen sus redes).
- Su FAQ (https://developers.factus.com.co/buenas-practicas/preguntas-frecuentes/) dice: «Cada empresa debe tener su propio certificado digital; nosotros nos encargamos de todo el proceso de habilitación», «el certificado tiene un costo de $130.000 anual» (incluido en paquetes individuales, aparte en bolsas divisibles), activación en 3 días hábiles, y el rango de numeración lo asocia el cliente en la DIAN «con tu proveedor tecnológico (Factus)».
- Lectura: es probable que Factus opere como **software del facturador** (modelo «software propio» a nombre de Comserva, como MATIAS) o a través de un tercero habilitado. Ante la DIAN el responsable sería Comserva. Antes de cerrar el Alcance 2 hay que pedirle a Factus **por escrito**: número de resolución de habilitación o nombre del proveedor tecnológico que usa, y bajo qué figura queda Comserva.
- Respaldo si no responde: Plemsi (paquete 6.000 docs $529.200/año) o Dataico (Empresarial $777.600/año, API sin precio público). Ambos encarecen los terceros del Alcance 2 (de ≈ $75–92 mil a ≈ $100–125 mil al mes).

## 6. Complemento de contratos (pedido de Diego) · 40 h

Plantilla del `fuentes/MODELO CONTRATO.docx` con los campos del cliente (razón social, NIT, dirección, teléfono, correo, representante y cédula), frecuencia, valor básico, kilos de tolerancia y kilo adicional; consecutivo; PDF para firma; vigencia 6 o 12 meses; **alerta 30 días antes del vencimiento** (cláusula quinta: prórroga automática si nadie dice lo contrario 30 días antes); registro de prórrogas y tarifa por vigencia; la tarifa vigente del contrato alimenta la liquidación. Sin firma electrónica certificada. Ojo: el contrato modelo dice 6 kg por bolsa y la norma 15 kg; la plantilla debe permitir corregirlo.

## 7. Qué cambia frente a los documentos anteriores

- Reemplaza, para el cliente, la `Propuesta económica comparativa (v6)` de Avilés ($37,8 M / $52,2 M). Esa queda como referencia interna del precio completo.
- Garantía baja de 90 a **60 días** y la bolsa de soporte de $480.000 a **$320.000** (8 h a $40.000).
- Hitos: Alcance 1 30/30/30/10; Alcance 2 40/40/20 (el segundo hito es la primera factura real validada por la DIAN con su asiento en Helisa).
- Tiempos: Alcance 1 ≈ 12 semanas con piloto (300 h ÷ 45 h/sem ≈ 7 + 4 de piloto + holgura de diciembre); Alcance 2 ≈ 8 semanas más.
- La transcripción `Transcripción reunión 2026-10-28.txt` quedó en la raíz del repositorio público: se agregó al `.gitignore` y **no debe subirse** (trae nombres y la charla informal del equipo).

## 8. Versión para la Junta Directiva (28 oct, tarde)

A pedido de Ronaldo, la propuesta se reescribió en lenguaje de gerencia y junta: sin siglas ni jerga técnica (F3, OP/RC, CUFE, Conekta, artículos tributarios), con una tabla de entregables numerados por alcance, un precio, una forma de pago por resultados y fechas concretas (piloto en febrero de 2027; Alcance 2 hacia mayo de 2027). Las cifras no cambiaron. Siete páginas.

## 9. Antes de enviar

1. Que Adrián y Cristian revisen los recortes de las secciones 3 y 4 y estén de acuerdo con las 300 + 150 h.
2. Confirmar el correo de Comserva (lo escribió Diego en el chat de la reunión) y adjuntar: propuesta v7 en PDF, video, flujo de una hoja y explicación paso a paso.
3. Pedirle a Factus la constancia de habilitación (sección 5) para poder sostener la condición del Alcance 2.
4. Registrar el acta de la reunión del 23 de octubre.

## 10. Oferta del contrato anual de hosting y mantenimiento (28 oct, noche)

Documento aparte: `Oferta contrato anual hosting y mantenimiento (28 oct 2026).html/.pdf`. Reemplaza el párrafo de soporte opcional ($320.000 por 8 h) de la v7 y lo convierte en contrato de 12 meses con el hosting incluido.

| | Esencial | Completo |
|---|---|---|
| Cuota mensual | $280.000 | $380.000 |
| Año | $3.360.000 | $4.560.000 |
| Año anticipado (11 meses) | $3.080.000 | $4.180.000 |
| Terceros dentro de la cuota | ≈ $60.000 | ≈ $60.000 |
| Trabajo del equipo | $220.000 (≈ 5,5 h) | $320.000 (8 h) |
| Horas de ajustes para Comserva | 3 h (+ 2 h cambios Helisa/DIAN) | 8 h |
| Respuesta | 1 día hábil | 4 h hábiles |

**Cómo se calculó el costo de terceros (≈ $60.000/mes):**
- Hostinger KVM 2 (hostinger.com/co, 28 oct 2026): $27.900/mes los primeros 24 meses, pagados por adelantado ($669.600), renovación $50.900/mes. Hostinger no incluye el IVA en el precio mostrado (19 % → $33.200 y $60.600). Promedio a tres años ≈ $42.000 con IVA. KVM 1 (1 vCPU, 4 GB) cuesta $19.900/$38.900 y podría bastar para el volumen de Comserva; se deja KVM 2 por el generador de PDF y la cola.
- Cloudflare R2 ≈ $3.000. Dominio ≈ $6.000/mes (≈ $72.000/año; Hostinger muestra .com a $61.900/año regular).
- Suma ≈ $51.000 los dos primeros años y ≈ $70.000 al renovar. Se cobra $60.000 fijo: el equipo gana un poco al inicio y pierde un poco después. Por eso el pago anual anticipado importa: permite comprar los 24 meses de Hostinger.
- Si Comserva paga los servicios directamente, la cuota baja $60.000 (así está dicho en el documento).

**Margen del equipo:** Esencial ≈ 5,5 h/mes a $40.000; Completo = las mismas 8 h a $320.000 de la v7. Las horas no usadas pasan solo al mes siguiente. Excedente a $40.000/h por escrito.

**Inicio:** al terminar la garantía de 60 días del Alcance 1 (≈ abril de 2027). Renovación automática anual con aviso de 30 días, igual que el contrato modelo que Comserva usa con sus clientes, y ajuste por IPC.

## 11. Corrección del 29 de octubre: el Alcance 1 es «todo lo demás» y vale $15 M

Ronaldo corrigió el reparto: el **Alcance 2 es solo la facturación electrónica**; **todo lo demás va en el Alcance 1**, incluido el portal del cliente, que la v7 del 28 de octubre dejaba por fuera. Y el Alcance 1 sube a **$15.000.000** porque a la empresa le harán retenciones y el ingreso neto baja.

| | 28 oct | 29 oct |
|---|---|---|
| Alcance 1 | $12.000.000 (300 h) | **$15.000.000** (375 h a $40.000) |
| Alcance 2 | + $6.000.000 (150 h) | + $6.000.000 (150 h), sin cambio |
| Total | $18.000.000 | **$21.000.000** |
| Complemento contratos | $1.600.000 aparte (40 h) | dentro del Alcance 1 |
| Tiempo Alcance 1 | 12 semanas (piloto feb 2027) | **3 meses desde la firma** (12 semanas, piloto feb 2027; A2 hacia mayo). Ronaldo lo fijó el 29 oct: las 75 h nuevas se absorben con más horas por semana, no con más semanas |
| Hitos A1 (30/30/30/10) | 3,6 / 3,6 / 3,6 / 1,2 M | 4,5 / 4,5 / 4,5 / 1,5 M |

**Las 75 h nuevas:** portal del cliente 40 h (ingreso por cliente, lista de visitas con evidencia, descarga de constancia, planilla, acta, factura y recibos, saldo, correo automático por documento nuevo) y contratos 35 h (las 40 h del complemento, menos 5 h porque los datos del cliente ya están en el panel). Queda por fuera, y así lo dice la propuesta: la API de Helisa (Conekta cuesta $211.680 al mes), la app para iPhone, la migración del histórico en papel y la firma digital certificada.

**Lo que no cambió:** tarifa $40.000/h, garantía 60 días, Alcance 2 150 h, terceros, soporte. La oferta del contrato anual no cambia (inicio ≈ abril de 2027). Sobre las retenciones: a $15 M, con retención en la fuente del 11 % por honorarios (si aplica) quedan ≈ $13,35 M; con el 4 % por servicios, ≈ $14,4 M. Hay que confirmar con Julio bajo qué concepto facturará el equipo.

## 12. Oferta anual rebajada (29 oct)

Ronaldo pidió revisar si se podía bajar. Se bajó cambiando el servidor a **Hostinger KVM 1** ($19.900/mes promo 24 meses = $477.600; $38.900 al renovar; 1 vCPU, 4 GB, 50 GB: sobra para 240 facturas y pocos usuarios) y recortando horas.

| | Esencial | Completo |
|---|---|---|
| Cuota | **$220.000** (antes $280.000) | **$320.000** (antes $380.000) |
| Año / anticipado (11 meses) / semestre | $2.640.000 / $2.420.000 / $1.320.000 | $3.840.000 / $3.520.000 / $1.920.000 |
| Terceros dentro de la cuota | ≈ $48.000 | ≈ $48.000 |
| Trabajo del equipo | $172.000 (≈ 4 h: 2 admin + 2 ajustes) | $272.000 (≈ 6 h) |

Si Comserva paga los servicios, la cuota baja $48.000. El párrafo de soporte de la propuesta v7 ahora remite a esta oferta («desde $220.000 al mes»). Primer año de mantenimiento = 18 % (Esencial) o 26 % (Completo) de los $15 M del Alcance 1. Piso: no bajar más, porque el neto por hora ya queda en ≈ $43.000–45.000.

## 13. Opción Conekta dentro del Alcance 1 (29 oct)

Observación del equipo: la v7 no mostraba el camino 1B (API Conekta de Helisa). Se agregó como **opción dentro del Alcance 1** en la propuesta comercial: desarrollo adicional **$2.800.000** (70 h de la estimación v2 a $40.000) y **≈ $212.000 al mes** que Comserva paga a Helisa (precio de helisa.com; más el hosting que Helisa exija). Aparece en la sección 2 (recuadro naranja), en la tabla de inversión (fila opcional) y en los servicios de terceros. No cambia el precio base de $15 M ni los hitos; si Comserva la toma, se paga 50/50 con el segundo y el tercer hito del Alcance 1 ($1.400.000 + $1.400.000). El 29 oct se aclaró en el documento que es un costo único pero no de contado (la frase «se paga una vez» se prestaba a confusión).

**Corrección del 29 oct (noche):** Ronaldo aclaró que la variante Conekta **no lleva cobro adicional de desarrollo**: va dentro de los $15 M y lo único que asume Comserva es la mensualidad de Helisa (≈ $212.000). Se quitó la fila de $2.800.000 de la inversión y de los hitos. Para el equipo: las 70 h de la conexión salen de las 375 h del Alcance 1 si Comserva elige Conekta en vez de archivos (en ese caso las ≈ 36 h de generación e importación de archivos se reemplazan por la API; el resto se absorbe).

## 14. Hitos del Alcance 1 a 20/30/40/10 (29 oct)

El equipo dudaba de que Comserva pague 30 % al firmar. Quedó: **20 % al firmar ($3.000.000)**, 30 % cuando app, panel y portal funcionen y se importe un pedido y un recibo en Helisa ($4.500.000), **40 % al aceptar el piloto ($6.000.000)** y 10 % al cerrar la garantía ($1.500.000). El Alcance 2 sigue 40/40/20.
