# Preguntas y solicitudes para la reunión del viernes 23 de octubre de 2026

**RH digital + Helisa · Comserva S.A.S.** · Preparado por el equipo RH digital el jueves 22 de octubre de 2026 · Uso del equipo durante la reunión (no lleva precios)

| Dato | Detalle |
| --- | --- |
| Fecha y hora | Viernes 23 de octubre de 2026, 1:00 p. m. |
| Duración | ≈ 30 minutos |
| Medio | Google Meet (enlace por confirmar) |
| Asistentes esperados | Comserva (logística y oficina; gerencia si puede), Julio (contabilidad y Helisa) y el equipo RH digital |
| Objetivo | Aterrizar las dos propuestas, cerrar las preguntas que definen alcance y costo, y acordar la entrega de formatos y la fecha de la propuesta económica |

Antecedentes: `Resumen de la reunión (21 oct 2026).md` y la transcripción, en esta misma carpeta.

---

## 1. Orden del día (30 minutos)

| Minuto | Tema | Quién | Resultado esperado |
| --- | --- | --- | --- |
| 0 – 2 | Saludo y objetivo de la reunión | Equipo | — |
| 2 – 8 | Las dos propuestas en una mirada, sin precios (ver el recuadro de abajo) y la recomendación por fases | Equipo | Comserva sabe qué hace y qué no hace cada propuesta |
| 8 – 20 | Preguntas de **prioridad A** (sección 2) | Todos | Respuesta, o responsable y fecha |
| 20 – 25 | Preguntas de **prioridad B**; las que no alcancen se envían por escrito | Todos | Respuestas o compromiso de respuesta |
| 25 – 28 | Solicitud formal de formatos a Julio (sección 4): qué envía, por qué medio y cuándo | Julio | Fecha comprometida |
| 28 – 30 | Acuerdos: fecha de la propuesta económica y de la socialización con quien decide | Comserva | Fechas |

> **Las dos propuestas en un minuto (para el punto 2)**
>
> - **Propuesta 1 · RH digital hasta Helisa.** El sistema hace todo lo de campo y oficina y genera para Helisa el **archivo de pedidos** (uno por cliente o sede facturable y periodo) y el **archivo del recibo de caja** (movimiento contable). Lucrecia elabora cada factura en Helisa llamando el pedido (F3) y la envía a la DIAN como hoy; luego se registra la FVE en el sistema. Dos modalidades: **1A con archivos planos** (base) y **1B con la API Helisa Conekta** (opcional; la paga Comserva: $211.680 al mes según helisa.com). Con API o sin ella, **la factura en Helisa sigue siendo una a una**.
> - **Propuesta 2 · RH digital con facturación electrónica.** Lo mismo, pero **el sistema emite la factura electrónica** por medio de un proveedor tecnológico autorizado por la DIAN (prefactura, revisión de Lucrecia, emisión por lote, envío al cliente, notas crédito y débito). Helisa queda para la contabilidad: recibe el asiento de las facturas y de los recibos. Es bastante más compleja que la Propuesta 1, aunque no muchísimo si se hace con un proveedor tecnológico; con software propio sí lo sería, y no lo recomendamos.
> - **Recomendación por fases.** Fase 0 · definición (formatos, Pedido habilitado, equivalencias, prueba con Cofema). Fase 1 · núcleo hasta Helisa (= Propuesta 1) con un piloto de un ciclo. Después del piloto, Comserva decide si contrata la Fase 2 · facturación electrónica (solo en la Propuesta 2), que se conecta donde hoy sale el archivo de pedidos sin rehacer lo demás. También se puede contratar la Propuesta 2 completa desde el inicio.
> - **Complementos.** Lo que en la v5 eran la fase 2 (acta y portal) y la fase 3 (caja formal y mensajería) pasa a llamarse **C1 · Acta y portal** y **C2 · Caja formal y mensajería**; se pueden contratar después en cualquiera de las dos propuestas.
> - **Trazabilidad.** En las dos propuestas el sistema muestra la cadena completa de cada cliente y periodo: visitas → cierre → RH → pedido o factura → FVE → recibos → cruce, con búsqueda por cualquier número.

## 2. Preguntas

### Prioridad A · definen las propuestas

| # | Pregunta | Para qué sirve | Respuesta |
| --- | --- | --- | --- |
| A1 | ¿Se puede **habilitar el documento Pedido** en el Helisa de Comserva? ¿Tiene costo o requiere licencia? ¿Quién lo habilita y en cuánto tiempo? ¿Qué código tendría (¿«OP»?)? | Es el prerrequisito de la Propuesta 1 | |
| A2 | **Formato del pedido:** ¿cuándo y por qué medio llega la estructura oficial? ¿Separador «;» o barra vertical? ¿Codificación ANSI? ¿Cantidad y valor unitario con punto o con coma decimal? ¿El número del pedido lo pone el archivo o Helisa? | Generar el archivo sin errores | |
| A3 | **Formato del recibo:** ¿RC1 o RC2, y en qué caso cada uno? ¿En qué columna van el prefijo y el número de la factura que se cruza? ¿Los dos libros van en dos filas (F y N) o Helisa hace la equivalencia? ¿Cuentas de caja, de cada banco y de cartera 1305? | Archivo del recibo (RC) | |
| A4 | **Conceptos de la factura de residuos:** ¿un concepto por categoría en kilos (BIOLÓGICOS, BIOSANITARIOS…) o «recolección» más «KILOGRAMOS ADICIONALES»? ¿Con qué códigos? ¿Qué texto lleva el comentario del mes? | Tabla de equivalencias tarifa → concepto | |
| A5 | **Volumen:** ¿cuántas facturas de residuos emiten al mes y en qué fechas? (El consecutivo pasó de FVE 25756 el 23 de septiembre a FVE 25997 el 21 de octubre: ≈ 240 facturas en 4 semanas, contando todo lo que factura Comserva.) ¿Cuánto tarda hoy cada factura? | Medir el trabajo manual que deja la Propuesta 1 y el plan de documentos de la Propuesta 2 | |
| A6 | **Esquemas de tarifa:** ¿cuántos clientes pagan solo por kilo (como la FVE 25997, a $3.991,60 el kilo), cuántos un valor fijo ($25.000, $30.000 o $33.600 + IVA) y cuántos básico + kilos incluidos + kilos adicionales (como Cofema)? | Los tres esquemas de tarifa de la Fase 1 | |
| A7 | **Helisa Conekta (modalidad 1B):** ¿Comserva confirma por escrito que pagaría la suscripción ($211.680 al mes según helisa.com, contrato anual, IVA no indicado)? ¿Su Helisa ya está en el hosting de Helisa, que Conekta exige? ¿A nombre de quién se contrata? | Decidir entre 1A y 1B | |
| A8 | **Propuesta 2:** ¿tienen un proveedor tecnológico preferido? ¿Qué plan de factura electrónica pagan hoy a Helisa (documentos al año, costo, vencimiento)? ¿Seguirían facturando en Helisa los productos (bolsas, bidones) y el arrendamiento? ¿Quién haría ante la DIAN el trámite de la numeración nueva? | Cotizar la Propuesta 2 | |
| A9 | **«Factura en sitio»:** ¿qué quiso decir Julio? ¿Algún cliente exige una factura por cada servicio en lugar de una mensual? | Hoy no está en el alcance base; definir si es una opción | |
| A10 | **Fases:** ¿aceptan empezar por la Fase 1 (= Propuesta 1) con un piloto de un ciclo y decidir la Fase 2 con lo que se mida? ¿Con qué criterio pasarían a la Fase 2? | Forma de contratación | |

### Prioridad B · afinan el diseño

| # | Pregunta | Para qué sirve | Respuesta |
| --- | --- | --- | --- |
| B1 | ¿Qué clientes tienen varias sedes con **código adicional** en Helisa? ¿Nos pueden exportar la cartilla de clientes (NIT, código, razón social, correo de facturación)? | Código del cliente en cada pedido | |
| B2 | ¿Vendedor (828002730), centro de costo (0101 Florencia), negocio (1 Comserva) y bodega son iguales en todos los pedidos? ¿Todos los clientes usan la lista de precios 2 «BASICA 30000»? | Valores fijos del pedido | |
| B3 | Si el pedido trae el valor unitario, ¿Helisa lo respeta o aplica el precio de la lista? | Que la factura coincida con el RH | |
| B4 | Si llega el pedido de un cliente que no existe en Helisa, ¿qué pasa? ¿Se crea a mano, con la cartilla de terceros o por API? | Clientes nuevos | |
| B5 | ¿Quién elabora hoy las facturas en Helisa y quién lo haría con pedidos? ¿Camilo sigue como soporte de Helisa? | Roles y capacitación | |
| B6 | ¿Cuál es el rol formal de Julio (contador de Comserva, implementador de Helisa)? ¿Quién aprueba la plantilla de cuentas? | Aprobaciones | |
| B7 | ¿Quiénes son «la gerente» y «el ingeniero Ballesteros» que mencionaron? ¿Cuándo sería la socialización? | Decisión | |
| B8 | ¿Algún contrato de recolección se factura desde la **Unión Temporal Comserva**? | Saber si hay un segundo emisor | |
| B9 | ¿El recibo se importa a cartera y a bancos al mismo tiempo? ¿Los pagos por transferencia se registran también en el sistema o solo en Helisa? | Archivo RC y saldo de referencia | |
| B10 | ¿Todos los clientes de residuos pagan IVA del 19 %? (El artículo 476, numeral 12, del Estatuto Tributario excluye la recolección de residuos hospitalarios solo si la presta una empresa de servicio público de aseo: confirmarlo con el contador.) | IVA por concepto, sobre todo en la Propuesta 2 | |
| B11 | ¿La cartilla de clientes tiene el correo de recepción de facturas, las responsabilidades fiscales del RUT y el municipio de cada cliente? | Datos fiscales que exige la Propuesta 2 | |
| B12 | ¿Helisa puede exportar la lista de FVE del periodo (número, fecha, cliente, total y documento origen)? | Registrar las FVE en el sistema sin digitarlas (Propuesta 1, modalidad 1A) | |

### Prioridad C · preguntas del recorderito que siguen abiertas

Se hacen si sobra tiempo; si no, se envían por escrito. Entre paréntesis, el número de la pregunta en el recorderito del 21 de octubre.

| # | Pregunta | Respuesta |
| --- | --- | --- |
| C1 | ¿Factura cada cliente cuando termina sus visitas (desde el día 20) o todos juntos el 26? (10) | |
| C2 | Si llega una visita después de facturar al cliente, ¿qué se hace: nota crédito, otra factura o se pasa al mes siguiente? (11) | |
| C3 | ¿Son 20 los kilos incluidos en el básico de Cofema? (17) | |
| C4 | Si un cliente no tuvo visitas en el mes, ¿se le cobra el básico? (18) | |
| C5 | ¿Qué clientes practican retenciones (retención en la fuente, ICA)? (19) | |
| C6 | ¿Quién controla hoy los consecutivos de planilla, recibo y acta? ¿Qué se hace con las hojas anuladas? (24) | |
| C7 | ¿Hay clientes que pagan antes de que exista la factura? ¿Qué tan seguido y cómo quieren tratarlos? (27) | |
| C8 | ¿Qué tratamiento y dispositor tienen Animales y Explosivos? (43) | |

## 3. Acuerdos de la reunión (para anotar)

| Acuerdo | Responsable | Fecha |
| --- | --- | --- |
| Entrega de la estructura del pedido y del recibo | Julio | |
| Habilitación del documento Pedido en Comserva | | |
| Decisión sobre Helisa Conekta (1A o 1B) | Comserva | |
| Entrega de la propuesta económica | Equipo RH digital | |
| Reunión de socialización con quien decide | Comserva | |

## 4. Solicitud formal de formatos a Julio

Mensaje listo para enviar por WhatsApp o por correo. Para correo, usar la línea de asunto; para WhatsApp, omitirla. Se sugiere enviarlo hoy, jueves 22 de octubre, a Julio, con copia a la gerencia y a la oficina de Comserva.

```text
Asunto: RH digital Comserva · Estructuras de pedido y recibo para Helisa e información de soporte

Buenas tardes, don Julio. Le saluda el equipo de RH digital (Adrián Muñoz, Cristian Avilés y Ronaldo Ballesteros).

Gracias por la reunión de ayer y por mostrarnos la importación de pedidos y de movimiento contable en Helisa. Para que los archivos que genere el sistema entren a Helisa sin errores y para cerrar las dos propuestas, le pedimos por favor la siguiente información. Lo marcado [antes del viernes] nos ayuda mucho para la reunión del viernes 23 de octubre a la 1:00 p. m.; lo demás puede llegar después, antes de empezar el desarrollo.

1. [antes del viernes] Estructura oficial del PEDIDO, campo por campo: nombre y orden de los campos (los 24 que vimos, de TIPO a Obsequio), tipo de dato, longitud máxima, si es obligatorio u opcional, valores permitidos (por ejemplo, TIPO CONCEPTO: 2 servicio, 3 comentario), formato de fecha, separador decimal, separador de campos, codificación (¿ANSI?) y si el archivo lleva fila de títulos. Nos sirve su plantilla de Excel, sin datos de pacientes ni de clientes.

2. [antes del viernes] Qué hace falta para habilitar el documento Pedido en la empresa Comserva, qué código tendría (¿OP?), si tiene algún costo y si el número del pedido lo pone el archivo o lo asigna Helisa.

3. [antes del viernes] Estructura oficial del RECIBO DE CAJA (importación de movimiento contable), campo por campo y, si es posible, con un ejemplo de un recibo ya importado sin datos personales. En especial: si se usa RC1 o RC2 y en qué caso; en qué columna van el prefijo y el número de la factura que se cruza; qué códigos de forma de pago o de banco se usan; si hay que marcar los módulos de cartera y de bancos, y cómo van los dos libros (contable y tributario).

4. Conceptos y códigos: la lista de conceptos de Comserva con su código, su IVA y su tipo, en especial "RECOLEC. TRANSP Y DISPOS. FINAL RESIDUOS BIOLOGICOS", "KILOGRAMOS ADICIONALES" y los conceptos por categoría en kilos. Puede ser la exportación "Cartilla de artículos" del menú Exportar.

5. Listas de precios (exportación "Listas de precios") y cómo se usan: ¿todos los clientes tienen la lista 2 "BASICA 30000"? Si el pedido trae el valor unitario, ¿Helisa lo respeta o aplica el precio de la lista?

6. Cartilla de clientes con sus códigos: NIT, dígito de verificación, código del cliente en Helisa y código adicional de los clientes creados varias veces (por ejemplo, por sede), lista de precios, forma de pago y plazo, y correo de facturación.

7. Cuentas contables en los dos libros (contable y tributario) con su equivalencia: caja, cada cuenta bancaria, cartera 1305, anticipos de clientes y retenciones que practican los clientes al pagar. Para la propuesta de facturación electrónica, también la plantilla "este servicio va con esta cuenta" que nos ofreció (ingreso por concepto, IVA y cartera).

8. Valores fijos de cada pedido: identidad del vendedor (¿828002730?), centro de costo (¿0101 Florencia?), código de negocio (¿1 Comserva?) y bodega.

9. Importación de prueba con Cofema de septiembre: con lo anterior armamos un archivo de pedido y uno de recibo de prueba con el caso real de Cofema de septiembre de 2026 (413,85 kg; básico de $74.790; 393,85 kg adicionales a $4.600; total $2.244.935, igual a la FVE 25756; y un abono de prueba). Le pediríamos importarlos en una empresa de prueba o en Comserva sin guardar, y compartirnos la previsualización y la lista de errores.

Usaremos esta información solo para construir y probar los archivos; no la publicaremos.

Quedamos atentos y muy agradecidos.
Equipo RH digital
```
