**DOCUMENTO INTERNO DEL EQUIPO · NO SE ENTREGA AL CLIENTE** (contiene horas, tarifas, precios y márgenes del equipo; a Comserva solo le llegan semanas, alcances y costos de terceros).

# Estimación de tiempo y costo (v2) · RH digital Comserva

**Versión 2.0 · jueves 22 de octubre de 2026.** Reemplaza la *Estimación v1* (18 de octubre, calculada sobre el levantamiento v4) y el ajuste preliminar del README (v5). Se basa en el brief de decisiones v6 del equipo (cuyas cifras manda sobre cualquier otra fuente), en lo visto y dicho en la reunión del 21 de octubre de 2026 con Comserva (hasta el minuto 36:44 de la grabación), en `SPEC.md` v1.1 (épicas A–H y G′) y en la investigación del 22 de octubre sobre Helisa, la DIAN y los proveedores de facturación electrónica.

Responde cinco preguntas: cuánto trabajo es cada propuesta, cuánto tiempo toma con tres personas que trabajan con Claude Code, cuánto cobrar, cuánto le cuesta y cuánto le ahorra a Comserva, y qué hacer si el presupuesto del cliente es menor. Donde algo es inferencia o supuesto, se dice; lo que depende del cliente va marcado **«por confirmar»**.

Datos de referencia (los mismos de la v1): SMMLV 2026 $1.750.905; UVT 2026 $52.374; TRM $3.174,67 por dólar. Todos los precios son **sin IVA**.

**Nomenclatura v6 (igual en todos los documentos).**

| Nombre | Qué es |
| --- | --- |
| **Propuesta 1** · «RH digital hasta Helisa» | Campo, oficina, cierre, RH, **archivo de pedidos (OP)** y **archivo del recibo (RC)** hacia Helisa, registro de la FVE y trazabilidad. La factura electrónica la sigue haciendo Lucrecia en Helisa, una a una, llamando el pedido (F3) |
| Modalidad **1A** · Archivos planos | Base de la Propuesta 1, sin costo recurrente adicional |
| Modalidad **1B** · API Helisa Conekta | Opcional: el sistema crea clientes, inserta pedidos y recibos y lee FVE y cartera por API (Comserva paga la suscripción). La factura en Helisa sigue siendo una a una |
| **Propuesta 2** · «RH digital con facturación electrónica» | Todo lo de la Propuesta 1, pero el sistema **emite la factura electrónica** por medio de un **proveedor tecnológico autorizado por la DIAN** (por API); Helisa queda para la contabilidad |
| **Fase 0** · Definición | ≈ 2 semanas en paralelo con el arranque |
| **Fase 1** · Núcleo hasta Helisa | = Propuesta 1 (con piloto de un ciclo de corte) |
| **Fase 2** · Facturación electrónica | Solo en la Propuesta 2 (con habilitación ante la DIAN y piloto) |
| **C1** · Acta y portal · **C2** · Caja formal y mensajería | Complementos que se pueden contratar después en cualquiera de las dos propuestas. **Son las antiguas fase 2 y fase 3 de la v5** |
| **TRZ** · Trazabilidad | Módulo nuevo en ambas propuestas (TRZ-01 a TRZ-06) |

---

## 1. Respuesta corta

| Escenario | Horas (rango) | Semanas a tiempo parcial (45 h/sem) | Semanas a tiempo completo (105 h/sem) | Mínimo $40.000/h | **Recomendado $60.000/h** | Lista $85.000/h |
| --- | ---: | --- | --- | ---: | ---: | ---: |
| **Propuesta 1 · 1A** (Fase 0 + Fase 1) | **630** (560–720) | 14 + 4 de piloto = **18** | 6 + 4 de piloto = **10** | $25,2 M | **$37,8 M** | $53,55 M |
| **Propuesta 1 · 1B** (con Conekta) | **700** (620–810) | 15,5 + 4 = **19,5** | 6,7 + 4 = **10,7** | $28,0 M | **$42,0 M** | $59,5 M |
| Conector Conekta solo (bloque 1B) | 70 (60–90) | +1,5 | +0,7 | $2,8 M | $4,2 M | $5,95 M |
| Fase 2 sola (facturación electrónica con proveedor) | 240 (200–300) | 6 + 4 de piloto (+ habilitación DIAN 1–3 en paralelo) | 2,5 + 4 de piloto (+ habilitación) | $9,6 M | $14,4 M | $20,4 M |
| **Propuesta 2 por fases** (Fase 0 + 1, piloto, compuerta, Fase 2, piloto) | **870** (760–1.020) | **28** (+ el tiempo que Comserva tarde en decidir en la compuerta) | **16,5** | $34,8 M | **$52,2 M** | $73,95 M |
| **Propuesta 2 completa desde el inicio** | **870** (760–1.020) | **24** | **14** | $34,8 M | **$52,2 M** | $73,95 M |
| Propuesta 2 con Conekta para la contabilidad | 940 (820–1.110) | +1,5 | +0,7 | $37,6 M | $56,4 M | $79,9 M |
| **C1** · Acta y portal | 190 | 4 | 2 | $7,6 M | $11,4 M | $16,15 M |
| **C2** · Caja formal y mensajería | 110 | 2,5 | 1 | $4,4 M | $6,6 M | $9,35 M |
| *Referencia no recomendada:* software propio ante la DIAN en lugar de la Fase 2 | 400–600 | ≈ 9 a 13 + piloto + habilitación | ≈ 4 a 6 + piloto + habilitación | $16–24 M | $24–36 M | $34–51 M |

Lo que hay que saber en cinco líneas:

1. **La Fase 0 + Fase 1 sube de 506 h (v1) y ≈ 565 h (v5) a 630 h** porque la reunión del 21 de octubre cambió la salida hacia Helisa (pedidos en vez de factura), obligó a traer a la fase 1 los esquemas de tarifa y los códigos de Helisa, y se agregó la trazabilidad (sección 3.2).
2. **La facturación electrónica con proveedor suma 240 h (≈ +38 %)**: más compleja, pero manejable. Con software propio serían 400–600 h y responsabilidad técnica directa ante la DIAN: no se ofrece. **La Propuesta 2 tiene dos formas de contratarse:** por fases, con compuerta tras el piloto de la Fase 1 (≈ 28 semanas a tiempo parcial; ≈ 16,5 a tiempo completo), o completa desde el inicio, con la Fase 2 construida durante el piloto de la Fase 1 (≈ 24 semanas a tiempo parcial; ≈ 14 a tiempo completo). Las horas son las mismas (870).
3. **Conekta (1B) cuesta 70 h y $211.680 al mes a Comserva, y casi no ahorra horas** (la factura sigue siendo una a una): se ofrece como opción, no como base.
4. **Precio recomendado: Propuesta 1 en $37,8 M y Propuesta 2 en $52,2 M** (más C1 y C2 si los quieren), por hitos. Con la tarifa mínima el neto del equipo baja a ≈ $25.000 la hora: no bajar de ahí.
5. **Solo con las horas de facturación ahorradas, la inversión se recupera en ≈ 3 a 5,5 años** según los supuestos (sección 7); el argumento ante la gerencia tiene que sumar control, evidencia y oportunidad, y depende de confirmar el volumen real (≈ 240 facturas al mes o ≈ 60).

---

## 2. Cómo se calcula (para aprender a cobrar)

La cuenta tiene cuatro pasos y conviene hacerla siempre en este orden:

1. **Horas.** Cada historia del `SPEC.md` se parte en tareas de 2 a 8 horas, se suman por épica y a cada épica se le pone un rango (bajo si todo sale bien, alto si se materializan los riesgos de la sección 9). Son **horas humanas ya asistidas por Claude Code**, con pruebas y revisión incluidas; no incluyen esperas del cliente.
2. **Semanas.** Horas ÷ capacidad semanal del equipo (45 h a tiempo parcial, 65 h mixto, 105 h a tiempo completo), redondeando hacia arriba. Después se suma lo que **no se comprime con más gente**: el piloto de un ciclo de corte (del 27 al 26), la habilitación ante la DIAN y las esperas de terceros (Julio, Helisa, el proveedor).
3. **Precio.** Horas centrales × tarifa. Ejemplo: el conector Conekta son 70 h × $60.000 = **$4.200.000**. No se cobra el extremo alto del rango: ese riesgo lo absorbe el equipo, y para eso sirve el margen de la tarifa recomendada.
4. **Comprobación del neto.** Al precio se le restan retención, seguridad social, herramientas e imprevistos y se divide por las horas de cada persona. Si la «tarifa neta» queda por debajo de lo que costaría un empleado junior (≈ $22.600 la hora: salario de $2,8 M más ≈ 47 % de carga prestacional sobre ≈ 182 h al mes, con los datos de la v1 §4.1), el precio está mal (sección 5.5).

**Regla de oro:** el precio se mueve **cambiando el alcance, no la tarifa** (sección 8). Una tarifa rebajada se vuelve la referencia de las fases siguientes.

**Supuestos de esta estimación** (si alguno cae, se re-estima):

- Comserva **habilita el documento Pedido** en su Helisa y Julio entrega los **formatos oficiales** de pedido y recibo y la plantilla «servicio → cuenta» (por confirmar, sin fecha). Mientras tanto se construye contra el pedido de 24 campos visto el 21 de octubre.
- Tres esquemas de tarifa en la Fase 1: básico + kilos incluidos + kilos adicionales; solo por kilo (como la FVE 25997); cobro fijo mensual. Cualquier otro es orden de cambio.
- Volumen ≈ **240 facturas en 4 semanas** (inferencia del consecutivo FVE 25756 del 23 de septiembre a FVE 25997 del 21 de octubre; incluye todo lo que factura Comserva; por confirmar). La v5 suponía ≈ 12 al mes y ≈ 60 clientes.
- La depuración de datos de clientes la hace Comserva; el equipo carga lo que llegue en la plantilla.
- La **factura en sitio** (por visita) y una posible facturación desde la **Unión Temporal Comserva** no están en ninguna cifra.

---

## 3. Horas por bloque

### 3.1 Fase 0 + Fase 1, modalidad 1A: 630 h (560–720)

| Épica | Qué incluye en la v6 (lo nuevo frente a la v5, en el texto) | v1 | v5 (ajuste del README) | **v6** | Rango v6 |
| --- | --- | ---: | ---: | ---: | ---: |
| F0 · Definición | Sesión de definición y acta; **habilitar Pedido en Helisa** (lo hace Comserva con Julio, el equipo acompaña); **formatos oficiales** de pedido y recibo; **tabla de equivalencias** y cuentas; cartilla de clientes con códigos; **importación de prueba con Cofema de septiembre de 2026**; decisión sobre Conekta; inventario de esquemas de tarifa | 30 | 30 | **36** | 30–42 |
| A · Cimientos | Monorepo, CI, base de datos (`schema.sql` + anexo de archivos planos ajustado: tipo OP, líneas sin cuenta), semilla con Cofema y un cliente solo por kilo, Zod compartido, entornos | 24 | 24 | **24** | 22–28 |
| B · Identidad, dispositivos y series | Sin cambios | 28 | 28 | **28** | 25–32 |
| C · Maestros | Clientes y sedes con **código del cliente en Helisa** por sede facturable; tarifas con **tres esquemas**; **equivalencias** (componente de tarifa o categoría → concepto y lista de precio de Helisa); vendedor, centro de costo, negocio y bodega; carga desde Excel y desde la cartilla exportada de Helisa; **datos fiscales opcionales** del cliente (preparan la Fase 2) | 56 | 56 | **70** | 64–80 |
| D · Sincronización | Sin cambios | 48 | 48 | **48** | 42–58 |
| E · App del operario | Sin cambios (el recibo solo con FVE registrada ya venía de la v5) | 110 | 110 | **110** | 98–128 |
| F · Panel de operación | Sin cambios (recaudo con RC1 o RC2, por confirmar) | 56 | 56 | **56** | 50–62 |
| G · Cierre, documentos y registro de FVE | Pre-cierre con bloqueos nuevos (cliente sin código Helisa, tarifa sin concepto); **liquidación de los tres esquemas** con redondeo idéntico a Helisa (pruebas con FVE 25756 y FVE 25997); RH con las líneas del pedido; **registro de FVE por digitación o importando el listado de Helisa**, validado contra el RH (± $1); hoja de trabajo para facturar una a una (antes reporte de contingencia); QR, correo, impresión de contingencia; estados del cierre listos para la Fase 2 | 70 | 70 | **78** | 70–88 |
| G′ · Archivos hacia Helisa | **Archivo de pedidos OP** (24 campos observados, TXT sin encabezado separado por barra vertical, Windows-1252) y **archivo del recibo RC** (1305 contra caja o bancos, documento cruce = FVE, libros F y N); configurador con dos familias de plantilla (sin cuentas y con cuentas); bandeja y resultado de la importación | — | 60 | **60** | 54–68 |
| TRZ · Trazabilidad | Cadena documental por cliente y periodo; búsqueda por cualquier número; matriz del periodo con filtros; expediente descargable con hashes; bitácora (TRZ-01 a TRZ-06) | — | — | **30** | 26–36 |
| H · Calidad, despliegue y piloto | Pruebas (unitarias, SQL, API, app, web), seguridad, producción y respaldos, APK, manuales y capacitación, acta de series, **importaciones reales de prueba en Helisa** (pedido de Cofema y de un cliente solo por kilo; un recibo), **carga de datos con el volumen real**, soporte del piloto | 84 | 84 | **90** | 79–98 |
| **Total** | | **506** | **566** (README: ≈ 565) | **630** | **560–720** |

Los extremos del rango suman 560 y 720 por construcción; en la práctica no todas las épicas se van al extremo a la vez. Las horas de soporte del piloto ya están dentro de H: el piloto suma **calendario** (sección 4), no horas.

**Composición de G′ (60 h):** catálogo de campos con las claves nuevas (código de cliente, concepto, lista de precio, vendedor, centro de costo, negocio, bodega, comentario) 6 · plantillas en dos familias, versiones y aprobación 10 · motor (líneas de pedido con concepto × cantidad × valor unitario y comentarios tipo 3; asiento del recibo con libros F y N; escritores TXT, CSV y XLS) 14 · archivo OP 6 · archivo RC 6 · resultado de la importación 4 · pantallas 10 · sincronización de facturas y validaciones 4.

**Composición de TRZ (30 h):** cadena documental (estado, fecha y hora, usuario, documento, hash o CUFE y enlace al siguiente eslabón; faltantes como pendientes) 8 · búsqueda por número 4 · matriz del periodo con fichas y filtros («sin FVE», «con saldo», «rechazados») 8 · expediente del cliente-periodo con índice y hashes 6 · bitácora enlazada y pruebas 4. Ejemplo de prueba: Cofema, septiembre de 2026 (4 visitas, 413,85 kg, $2.244.935, FVE 25756).

### 3.2 Qué cambió frente a la v1 (506 h) y la v5 (≈ 565 h)

| Paso | Cambio | Épica | Horas |
| --- | --- | --- | ---: |
| **v1** | Estimación sobre el levantamiento v4 | | **506** |
| v1 → v5 | Archivos planos de la v5: archivo de factura FV, archivo de recibo RC y configurador (lo que el SPEC v1.1 estimó en ≈ 60 h; el README lo redondeó a ≈ 565) | G′ | +60 |
| **v5** | | | **≈ 566** |
| v5 → v6 | **Archivo de pedidos en vez de FV** y **recibo con dos libros**: el pedido es más simple que el asiento FV (sin cuentas, IVA ni cuadre), y lo que se ahorra se va en las dos familias de plantilla, el escritor ANSI con separador de barra vertical, las líneas de comentario, RC1/RC2 y la columna de cruce | G′ | ±0 |
| v5 → v6 | **Esquemas de tarifa a la Fase 1** (solo por kilo y cobro fijo, además del básico): maestro de tarifas, liquidación en código y en SQL, pruebas con la FVE 25997 y con una de $35.700 | C (+4), G (+4) | +8 |
| v5 → v6 | **Códigos y equivalencias con Helisa** (concepto y lista de precio por componente, código del cliente por sede facturable, vendedor, centro de costo, negocio) y carga desde la cartilla de Helisa | C | +8 |
| v5 → v6 | **Registro de FVE por tres vías**: digitación (ya estaba), importación del listado de facturas de Helisa (nueva; formato por confirmar) y lectura por Conekta (va en el bloque 1B) | G | +4 |
| v5 → v6 | **Trazabilidad** (TRZ-01 a TRZ-06), pedida explícitamente | TRZ | +30 |
| v5 → v6 | **Fase 0 ampliada**: habilitar Pedido, formatos de Julio, tabla de equivalencias, prueba con Cofema, decisión sobre Conekta | F0 | +6 |
| v5 → v6 | **Preparación para la Fase 2**: datos fiscales opcionales del cliente y estados del cierre | C | +2 |
| v5 → v6 | **Pruebas de importación real en Helisa y volumen** ≈ 240 facturas al mes (por confirmar) | H | +6 |
| **v6** | | | **630** |

En resumen: **+124 h sobre la v1**, de las cuales ≈ 60 vienen de la v5 (archivos planos) y **+64 h de la reunión del 21 de octubre** (30 de ellas, la trazabilidad).

### 3.3 Conector Helisa Conekta (modalidad 1B): 70 h (60–90)

| Partida | Horas | Rango |
| --- | ---: | ---: |
| Conexión y cliente de la API: credenciales de pruebas (URL, Id y Key), firma HMAC-SHA256, manejo de respuestas y códigos de error, textos sin tildes ni eñes | 12 | 10–16 |
| Clientes: inserción y actualización desde el maestro del sistema | 6 | 5–8 |
| Pedidos: envío del pedido de cada cierre con la tabla de equivalencias | 10 | 8–13 |
| Recibos: inserción del recibo como documento contable que afecta la FVE, con los dos libros | 10 | 8–13 |
| Lectura de facturas electrónicas: registro automático de la FVE y validación contra el RH | 10 | 9–13 |
| Cartera por cliente: saldo real en el panel y en la app (valida o reemplaza el saldo de referencia) | 6 | 5–8 |
| Cola con reintentos e idempotencia, monitoreo, paso a archivos planos como contingencia y pantallas de estado | 10 | 9–12 |
| Pruebas con la conexión de pruebas de Helisa (30 días hábiles) y acompañamiento del primer ciclo | 6 | 6–7 |
| **Total** | **70** | **60–90** |

Notas: la ayuda oficial muestra como imágenes la estructura de pedidos y clientes, por eso el extremo alto es 90 h (riesgo N7). Conekta exige que Helisa esté en el hosting de Helisa (Comserva hoy usa un servidor TSplus administrado por Julio: por confirmar). **No emite facturas.** En la Propuesta 2 las mismas 70 h se usan para insertar la contabilización de las facturas y los recibos en lugar de pedidos (por eso «940 h con Conekta para la contabilidad»).

### 3.4 Fase 2 · facturación electrónica con proveedor tecnológico: 240 h (200–300)

| Partida | Qué incluye | Horas | Rango |
| --- | --- | ---: | ---: |
| Datos fiscales del cliente | Tipo de persona, tipo de documento y DV, responsabilidades del RUT (ej. R-99-PN), régimen de IVA, dirección con municipio (código DANE), correo de recepción; tablas, validación, carga y bloqueo «datos fiscales incompletos» | 24 | 20–30 |
| Catálogo e IVA | Catálogo de productos de la factura (el de conceptos de la Fase 1), unidad, IVA configurable por concepto (19 % o excluido, según el contador), retenciones informativas si aplican (por confirmar) | 10 | 8–12 |
| Prefactura y emisión | Cierre → prefactura (borrador) → revisión de Lucrecia → emisión por lote; regla: un cierre facturado por el sistema no se exporta como pedido | 20 | 18–26 |
| Integración con el proveedor | Autenticación, envío, consulta de estado, descarga de CUFE, XML, PDF y QR, reintentos idempotentes, traducción de rechazos | 40 | 36–48 |
| Numeración | Prefijo y rango nuevos autorizados por la DIAN (de prueba «RHD»; el real por confirmar), consecutivo, huecos, vigencia y alertas | 8 | 6–10 |
| Notas crédito y débito | Pantallas, motivos, referencia al CUFE, aprobación de Gerencia, efecto en el saldo | 24 | 20–30 |
| Envío y RADIAN | Envío al cliente, rebotes y reenvío; lectura de eventos 030, 032, 033 y 034 (aceptación tácita opcional) | 14 | 10–18 |
| Contingencia | Proveedor o DIAN caídos (tipos 03 y 04 según lo que cubra el proveedor) y procedimiento escrito | 8 | 6–12 |
| Contabilización en Helisa | Movimiento contable de facturas y notas (débito 1305; crédito ingreso por concepto; crédito IVA; libros F y N) con la plantilla de Julio y el motor de la v5; importación de prueba y cruce de recibos contra el prefijo nuevo | 24 | 21–30 |
| Panel de facturación | Bandeja, estados DIAN (validada, rechazada, contingencia) y aceptación del cliente (033 expresa, 034 tácita), filtros, conciliación sistema ↔ Helisa, eslabones de factura en la trazabilidad | 20 | 17–26 |
| Habilitación | Acompañar a Comserva en el portal DIAN y MUISCA: modo de operación con el proveedor, set de pruebas, numeración, asociar prefijo, certificado | 14 | 10–18 |
| Pruebas y piloto | Sandbox del proveedor, regresión con FVE 25756 y 25997, casos de rechazo, piloto en paralelo de un ciclo | 24 | 20–28 |
| Capacitación | Manual de facturación y sesiones con Lucrecia y Gerencia | 10 | 8–12 |
| **Total** | | **240** | **200–300** |

El archivo de pedidos de la Fase 1 **no se descuenta** aunque se contrate la Propuesta 2 completa desde el inicio: queda como **contingencia** (si el proveedor falla, Comserva puede facturar en Helisa llamando pedidos) y para lo que siga facturando Helisa. «Factura en sitio» no está incluida.

### 3.5 Software propio ante la DIAN (referencia, no recomendado): 400–600 h

Sería **en lugar de la Fase 2**: ≈ 160 h de partidas funcionales iguales a las de la tabla anterior (datos fiscales, catálogo, prefactura, notas, panel, contabilización, capacitación) más ≈ 240–440 h técnicas y de habilitación que con proveedor hace el proveedor: XML UBL 2.1, firma XAdES-EPES, conexión SOAP con la DIAN, CUFE y QR, cientos de reglas de validación, contingencia completa, envío al adquirente, conservación, set de pruebas directo (semanas de iteración) y 20–40 h al año de mantenimiento normativo. Además el equipo figuraría como fabricante del software en cada factura. La cifra única es 400–600 h (≈ 9 a 13 semanas a tiempo parcial); cualquier otra cifra de borradores anteriores queda descartada. **No se ofrece**; sirve para explicar por qué el proveedor tecnológico es el camino razonable.

### 3.6 Complementos C1 (190 h) y C2 (110 h)

Composición indicativa (el brief no fija rango; se re-estiman al contratarlos):

- **C1 · Acta y portal (190 h):** acta de gestión con firma electrónica del gerente por lote 44 · regla «al día» y estado de cuenta (con saldo de referencia o con la cartera de Conekta si existe) 16 · portal del cliente (acceso, documentos, acta según cartera, consolidado RESPEL, su propia cadena de trazabilidad) 70 · ajustes a periodos facturados 16 · reporte ambiental 16 · pruebas, despliegue y capacitación 28. La cartilla de terceros de la antigua fase 2 sube a la Fase 1 (código del cliente en Helisa). Si ya se hizo la Fase 2, los ajustes se apoyan en las notas crédito.
- **C2 · Caja formal y mensajería (110 h):** cierre de caja formal 28 · WhatsApp Business (Meta) con plantillas, envío y webhooks 40 · reportes operativos 20 · entregas a dispositores 12 · pruebas 10 (igual que la fase 3 de la v1).

---

## 4. Calendario

### 4.1 Capacidad del equipo y cuentas de Claude

| Escenario | Dedicación | Horas humanas por semana |
| --- | --- | ---: |
| **Tiempo parcial** | 15 h por semana cada uno | **45** |
| **Mixto** | una persona completa y dos parciales | **65** |
| **Tiempo completo** | 35 h por semana cada uno | **105** |

Las cuentas (dos Pro y una Max 5x, US$140 al mes ≈ $444.000) alcanzan a tiempo parcial. A tiempo completo las Pro son el cuello de botella: subir la Max a 20x (US$240 al mes en total ≈ $762.000) o activar créditos de uso con tope. Las reglas de uso de la v1 (§3.2) siguen vigentes: Sonnet por defecto en las Pro, sesiones cortas, medir `/usage` la primera semana.

### 4.2 Semanas por bloque

| Bloque | Horas | Parcial (45) | Mixto (65) | Completo (105) |
| --- | ---: | --- | --- | --- |
| Fase 0 + Fase 1 (1A) | 630 | 14 | 10 (9,7) | 6 |
| Conector Conekta (1B) | 70 | 1,5 | 1 | 0,7 |
| Fase 2 · facturación electrónica | 240 | 6 (5,3 + esperas del proveedor) | 4 (3,7) | 2,5 (2,3) |
| C1 · Acta y portal | 190 | 4 (4,2) | 3 | 2 |
| C2 · Caja formal y mensajería | 110 | 2,5 | 2 | 1 |
| Software propio (en lugar de la Fase 2) | 400–600 | ≈ 9 a 13 | 6–9 | 4–6 |
| Piloto (un ciclo de corte, por fase) | — | 4 | 4 | 4 |
| Habilitación DIAN y set de pruebas | — | 1–3 en paralelo (por confirmar) | igual | igual |

La Fase 0 (36 h) va **dentro** de las 14 semanas: ocupa las semanas 1–2 en paralelo con las épicas A y B.

### 4.3 Semanas por propuesta, hasta el acta de aceptación

| Propuesta | Parcial (45) | Mixto (65) | Completo (105) |
| --- | --- | --- | --- |
| **P1 · 1A** | 14 + 4 de piloto = **18** | 10 + 4 = **14** | 6 + 4 = **10** |
| **P1 · 1B** | 15,5 + 4 = **19,5** | 11 + 4 = **15** | 6,7 + 4 = **10,7** |
| **P2 por fases** (P1 aceptada → compuerta → Fase 2 → piloto) | 18 + 6 + 4 = **28** | 14 + 4 + 4 = **22** | 10 + 2,5 + 4 = **16,5** |
| **P2 completa desde el inicio** (la Fase 2 se construye durante el piloto de la Fase 1) | 14 + 6 + 4 = **24** | 10 + 4 + 4 = **18** | 6 + 4 + 4 = **14** |
| Con Conekta en cualquiera | +1,5 | +1 | +0,7 |
| C1 / C2 después | +4 / +2,5 | +3 / +2 | +2 / +1 |

En la «P2 por fases» no se cuenta el tiempo que Comserva tarde en decidir y contratar el proveedor en la compuerta. En la «P2 completa» la habilitación ante la DIAN debe arrancar cuando empieza la Fase 2 (a tiempo completo, incluso antes, porque la Fase 2 dura menos que la habilitación más lenta), y durante el piloto de la Fase 1 la capacidad real baja un poco por el soporte.

### 4.4 Línea de tiempo de referencia (Propuesta 2 por fases, tiempo parcial)

| Semanas | Qué pasa |
| --- | --- |
| 1–2 | **Fase 0** en paralelo con cimientos (A, B): Pedido habilitado, formatos de Julio, equivalencias, cartilla de clientes, decisión sobre Conekta |
| 1–14 | **Fase 1** en el orden del SPEC (A–B, C–D, E–F, G–G′–TRZ, H); importación de prueba de pedidos y recibo en Helisa antes del segundo hito de pago |
| 15–18 | **Piloto** de un ciclo de corte en paralelo con el papel; se mide el tiempo real de facturar una a una → acta de la Fase 1 → **compuerta** |
| 19–24 | **Fase 2** (si se contrata); habilitación DIAN y set de pruebas en paralelo (1–3 semanas, por confirmar) desde la semana 19 |
| 25–28 | **Piloto de facturación electrónica** de un ciclo → acta de la Fase 2 |

### 4.5 Qué mueve las fechas

- **El piloto tiene que coincidir con un ciclo de corte completo** (del 27 al 26): si el desarrollo termina justo después de un día 27, la espera puede ser de 3–4 semanas. Planear el final del desarrollo para un día 20–26.
- **Diciembre y enero** (festivos y cierre de año de Comserva y de Julio) pueden sumar 1–2 semanas si el proyecto arranca en noviembre.
- **Insumos de terceros:** formatos y cuentas de Julio (sin fecha), habilitación de Pedido, conexión de pruebas de Conekta, sandbox y contrato del proveedor de facturación, certificado digital y usuario del representante legal ante la DIAN. Cada semana de retraso en lo que bloquea el piloto lo mueve una semana.
- **Fecha de inicio:** por confirmar (después de la reunión del viernes 23, la propuesta económica y la socialización con quien decide).
- **Expectativa del cliente:** la v5 (§3) registró «un mínimo de tres meses» después de aceptar la propuesta. La Propuesta 1 la cumple a tiempo completo (10 semanas) o casi en el escenario mixto (14 semanas); a tiempo parcial son 18 semanas (≈ 4 meses). Decirlo así en la propuesta (en semanas, sin horas).

---

## 5. Precio

### 5.1 Las tres tarifas

| Tarifa | Valor | Lectura (referencias de mercado de la v1 §4.1) |
| --- | ---: | --- |
| **Mínima** | $40.000/h | Tarifa de junior local. Deja ≈ $25.000 netos la hora (sección 5.5). Solo para alcance cerrado y como precio de primer proyecto; nunca por debajo |
| **Recomendada** | **$60.000/h** | Intermedio local y mediana freelance colombiana (≈ $65.000); por debajo de lo que pagan clientes internacionales a desarrolladores colombianos (≈ $82.500). Deja ≈ $40.000 netos la hora |
| **Lista** | $85.000/h | Senior local y banda baja de agencias. Sirve como valor de referencia si se va a conceder un descuento explícito a cambio de algo (testimonio, caso de éxito, anticipo) |

### 5.2 Precio por bloque (horas centrales × tarifa)

| Bloque | Horas | $40.000 | **$60.000** | $85.000 |
| --- | ---: | ---: | ---: | ---: |
| Fase 0 + Fase 1 (1A) | 630 | $25.200.000 | **$37.800.000** | $53.550.000 |
| Conector Conekta (1B) | 70 | $2.800.000 | **$4.200.000** | $5.950.000 |
| Fase 2 · facturación electrónica | 240 | $9.600.000 | **$14.400.000** | $20.400.000 |
| C1 · Acta y portal | 190 | $7.600.000 | **$11.400.000** | $16.150.000 |
| C2 · Caja formal y mensajería | 110 | $4.400.000 | **$6.600.000** | $9.350.000 |
| *Software propio en lugar de la Fase 2 (no recomendado)* | 400–600 | $16–24 M | $24–36 M | $34–51 M |

### 5.3 Totales por propuesta

| Propuesta | Horas | $40.000 | **$60.000** | $85.000 |
| --- | ---: | ---: | ---: | ---: |
| **P1 · 1A** | 630 | $25,2 M | **$37,8 M** | $53,55 M |
| **P1 · 1B** | 700 | $28,0 M | **$42,0 M** | $59,5 M |
| **P2** (por fases o completa) | 870 | $34,8 M | **$52,2 M** | $73,95 M |
| P2 con Conekta para la contabilidad | 940 | $37,6 M | $56,4 M | $79,9 M |
| P1 · 1A + C1 + C2 | 930 | $37,2 M | $55,8 M | $79,05 M |
| P2 + C1 + C2 | 1.170 | $46,8 M | $70,2 M | $99,45 M |
| P2 con Conekta + C1 + C2 | 1.240 | $49,6 M | $74,4 M | $105,4 M |
| *P2 con software propio (no recomendado)* | 1.030–1.230 | $41,2–49,2 M | $61,8–73,8 M | $87,55–104,55 M |

Frente a la v1 (recomendado: fase 0 + 1 en $30 M, total $49 M sobre 810 h), la Fase 0 + Fase 1 sube a $37,8 M por las 124 h adicionales; la estructura de cobro no cambia.

### 5.4 Forma de pago por hitos (valores a la tarifa recomendada)

| Bloque | Hito | % | Valor |
| --- | --- | ---: | ---: |
| **Fase 0 + Fase 1** ($37,8 M) | Firma del contrato (cubre la Fase 0) | 30 % | $11.340.000 |
| | APK y panel con catálogos cargados **y primera importación de pedidos y recibo en Helisa sin errores** | 30 % | $11.340.000 |
| | Acta de aceptación tras el piloto de un ciclo | 30 % | $11.340.000 |
| | Cierre de la garantía (90 días) | 10 % | $3.780.000 |
| **Conekta** ($4,2 M) | Al iniciar el conector (con la conexión de pruebas de Helisa entregada) | 50 % | $2.100.000 |
| | Primer ciclo con pedidos y recibos enviados por API y FVE leídas sin errores | 50 % | $2.100.000 |
| **Fase 2** ($14,4 M) | Firma (después de la compuerta, o al inicio si se contrata la P2 completa) | 30 % | $4.320.000 |
| | Habilitación aprobada por la DIAN (set de pruebas superado y prefijo asociado) | 30 % | $4.320.000 |
| | Acta tras el piloto de un ciclo de facturación electrónica | 30 % | $4.320.000 |
| | Cierre de la garantía | 10 % | $1.440.000 |
| **C1** ($11,4 M) / **C2** ($6,6 M) | Firma / entrega en producción / cierre de la garantía | 40 / 50 / 10 % | C1: $4.560.000 / $5.700.000 / $1.140.000 · C2: $2.640.000 / $3.300.000 / $660.000 |

El segundo hito de la Fase 1 amarra el riesgo N1: si Pedido no se habilita, ese hito no se puede cumplir y se replantea antes de seguir.

### 5.5 Qué queda neto (Fase 0 + Fase 1)

Supuesto (igual que la v1 §4.3): tres personas naturales no responsables de IVA, que facturan por cuenta de cobro con documento soporte emitido por Comserva; 630 h ÷ 3 = 210 h por persona; proyecto de 18 semanas a tiempo parcial (≈ 4 meses; las suscripciones se presupuestan por 4,5 meses, con holgura).

| Concepto | Mínima $40.000 | **Recomendada $60.000** | Lista $85.000 | Nota |
| --- | ---: | ---: | ---: | --- |
| Precio de la Fase 0 + Fase 1 | $25.200.000 | **$37.800.000** | $53.550.000 | Sin IVA |
| Retención en la fuente por honorarios (10 %) | −$2.520.000 | −$3.780.000 | −$5.355.000 | Anticipo de renta recuperable; afecta la caja, no el ingreso |
| Seguridad social de independientes (≈ 11,6 % del bruto) | −$2.923.200 | −$4.384.800 | −$6.211.800 | IBC = 40 %; salud 12,5 %, pensión 16 %, ARL 0,522 % |
| Suscripciones de Claude (≈ 4,5 meses) | −$2.000.000 | −$2.000.000 | −$2.000.000 | Dos Pro + Max 5x (a tiempo completo, Max 20x por menos meses: similar) |
| Infraestructura de desarrollo y pruebas, tiendas | −$500.000 | −$500.000 | −$500.000 | VPS de pruebas, dominio de prueba, Play Console |
| Imprevistos (5 %) | −$1.260.000 | −$1.890.000 | −$2.677.500 | |
| **Neto en caja para el equipo** | **$15.996.800** | **$25.245.200** | **$36.805.700** | |
| Por persona | ≈ $5,33 M | **≈ $8,42 M** | ≈ $12,27 M | |
| **Neto por hora** (210 h cada uno) | **≈ $25.400** | **≈ $40.100** | ≈ $58.400 | Con la retención recuperada: ≈ $29.400 / $46.100 / $66.900 |
| Neto por hora si el trabajo se va al extremo alto (720 h) | ≈ $22.200 | ≈ $35.100 | ≈ $51.100 | Con precio cerrado, el equipo absorbe las 90 h extra |

Lectura: a la tarifa mínima, si el proyecto se complica, el neto queda en ≈ $22.200 la hora, **igual que el costo por hora de un junior asalariado con prestaciones (≈ $22.600) y sin su estabilidad**. Por eso $40.000 es piso y $60.000 es la tarifa a defender. Si constituyen una S.A.S., se suma IVA del 19 % (Comserva lo descuenta), la retención sube y hay costos contables; confirmar con un contador si el servicio va como honorarios (10–11 %) o servicios (4–6 %) y la ReteICA de Florencia.

### 5.6 Cómo presentarlo

- **Dos propuestas, cada una por fases con precio cerrado**, entregables y criterios de aceptación. En la Propuesta 1, la modalidad 1A es la base y la 1B una opción con su propio precio; la Fase 2 se ofrece después de la compuerta o desde el inicio.
- **En los documentos del cliente no van horas ni tarifas**, solo semanas, alcances y costos de terceros; el precio va en la propuesta económica.
- **Garantía** de 90 días por fase. **Soporte** aparte: bolsa de 8 h al mes a $60.000 ($480.000 al mes) con respuesta en 1 día hábil, o 15–20 % anual del valor de desarrollo.
- **Cambios de alcance** a $60.000–85.000 la hora. **Vigencia** de 30 días. **Propiedad del código** según la opción pactada (v5 §19).
- **Costos de terceros a cargo de Comserva**, a su nombre, en tabla separada (sección 6).

---

## 6. Costos recurrentes de terceros para Comserva

| Concepto | Propuesta | Costo | Nota |
| --- | --- | --- | --- |
| Servidor (VPS 2 vCPU, 8 GB) con respaldos | Ambas | US$15–24 al mes | v5 §19 |
| Almacenamiento de PDF, firmas y fotos (Cloudflare R2) | Ambas | US$0–2 al mes | |
| Dominio .com.co y certificado TLS | Ambas | US$18–27 al año | |
| Correo transaccional y buzón (Brevo o Resend; Zoho) | Ambas | US$0 | Planes gratuitos |
| Monitoreo (UptimeRobot, Sentry) | Ambas | US$0 | |
| Google Play Console (organización) | Ambas | US$25 una vez | ≈ $79.000 |
| Apple Developer | Opcional | US$99 al año | Solo si hay iPhone |
| Soporte de Helisa para la plantilla y la primera importación | Fase 0 y 1 | $99.960 la hora · taller $40.000 | Por consumo |
| Habilitar el documento Pedido en Helisa | Propuesta 1 | **Por confirmar** | Licencia o parametrización |
| **Total recurrente típico de la Fase 1** | Ambas | **$55.000–90.000 al mes** | Más IVA si el proveedor lo factura; varía con la TRM |
| **Helisa Conekta** | 1B (y opcional en la P2) | **$211.680 al mes** = $2.540.160 al año | IVA no indicado (con IVA ≈ $251.899 al mes, $3.022.790 al año); contrato anual; exige Helisa en el hosting de Helisa (≈ $60.000 por usuario al mes; para 3 usuarios $2.160.000 al año, solo si no lo tiene: por confirmar) |
| **Proveedor tecnológico de facturación electrónica** | P2 | **≈ $205.000–560.000 al año** según proveedor y volumen; cotizar | Plemsi: 1.200 docs $205.200, 2.400 $367.200, 6.000 $529.200. MATIAS API: 1.200 $265.000, 3.000 $365.000, 8.000 $560.000 (certificado incluido; opera como software propio). Dataico: por cotización. Con ≈ 240 facturas al mes (≈ 2.900 al año + notas) aplican los planes de 3.000–6.000 docs: ≈ $365.000–529.200 al año |
| Certificado de firma digital | P2 | ≈ $150.000 al año | Solo si el plan no lo incluye |
| Plan de facturación electrónica de Helisa | P2 | Podría bajar (por confirmar) | Referencia helisa.com: 3.000 docs $835.380 al año; 6.000 $963.900. Si Helisa sigue facturando productos y arrendamiento, Comserva mantiene un plan menor (360 docs $424.116; 1.200 $629.748) |
| WhatsApp Business (Meta) | C2 | Menos de US$5 al mes | |

---

## 7. Cuánto le ahorra a Comserva cada propuesta

### 7.1 Supuestos (todos por confirmar)

| # | Supuesto | Valor base | Rango | Cómo se confirma |
| --- | --- | --- | --- | --- |
| S1 | Facturas al mes | **240** | 60–240 | Inferencia del consecutivo FVE (25756 → 25997 en 4 semanas); la v5 hablaba de ≈ 60 clientes. Preguntar el viernes cuántas son del servicio de residuos |
| S2 | Minutos por factura hoy: buscar las planillas, sumar kilos, liquidar, capturar en Helisa, enviar | **10** | 6–15 | Pregunta 50 del recorderito (abierta) |
| S3 | Minutos por factura con la P1: abrir la FVE, llamar el pedido (F3), revisar contra el RH, enviar | **3** | 2–5 | **Se mide en el piloto: es la compuerta** |
| S4 | Minutos por factura con la P2: revisar la prefactura y emitir por lote | **0,5** | — | Inferencia |
| S5 | Trabajo por lote al mes | 1A: 1 h · 1B: 0,25 h · P2: 0,5 h | — | Importar pedidos y el listado de FVE / revisar envíos / importar la contabilización |
| S6 | Recibos de caja al mes | **150** | 60–150 | Pregunta 31 del recorderito (abierta) |
| S7 | Minutos por recibo hoy (digitarlo en Helisa) / con archivo o API | **3 / 0,5** | — | Más 0,25 h por lote con archivo |
| S8 | Costo por hora de quien factura, con prestaciones | **$20.000** | $15.000–25.000 | Supuesto: ≈ $2,5 M de salario + ≈ 47 % de carga ÷ ≈ 180 h al mes. Reemplazar por el real |

### 7.2 Horas al mes (supuestos base)

| Trabajo | Hoy | P1 · 1A | P1 · 1B | P2 |
| --- | ---: | ---: | ---: | ---: |
| Facturas (240) | 40 h | 12 h + 1 h de lote = 13 h | 12 h + 0,25 h = 12,25 h | 2 h + 0,5 h = 2,5 h |
| Recibos (150) | 7,5 h | 1,25 h + 0,25 h = 1,5 h | 1,25 h | 1,5 h |
| **Total** | **47,5 h** | **14,5 h** | **13,5 h** | **4 h** |
| **Ahorro** | | **33 h** (≈ 4 días de trabajo) | **34 h** | **43,5 h** |
| Ahorro en pesos al mes | | **$660.000** | $680.000 | **$870.000** |

### 7.3 Sensibilidad y beneficio neto

| Escenario | Ahorro P1 · 1A | Ahorro P2 |
| --- | --- | --- |
| Bajo (240 facturas; 6 → 2 min; $15.000/h) | 21 h · $315.000 al mes | 27,5 h · $412.500 al mes |
| **Base** (240; 10 → 3 min; $20.000/h) | **33 h · $660.000 al mes** | **43,5 h · $870.000 al mes** |
| Alto (240; 15 → 5 min; $25.000/h) | 45 h · $1.125.000 al mes | 63,5 h · $1.587.500 al mes |
| **Si solo ≈ 60 facturas y 60 recibos al mes son del servicio** (base) | **8,25 h · $165.000 al mes** | 11,25 h · $225.000 al mes |

Beneficio neto con los supuestos base (ahorro de horas menos costos recurrentes de terceros) y meses para recuperar la inversión **solo con ese ahorro**, a la tarifa recomendada:

| | P1 · 1A | P1 · 1B | P2 |
| --- | ---: | ---: | ---: |
| Ahorro de horas al mes | $660.000 | $680.000 | $870.000 |
| Costos recurrentes de terceros al mes | $55.000–90.000 | $55.000–90.000 + Conekta $211.680 (≈ $251.899 con IVA) | $55.000–90.000 + proveedor ≈ $30.400–46.700 + certificado $0–12.500 |
| **Beneficio neto al mes** | **$570.000–605.000** | $338.000–413.000 | **$721.000–785.000** |
| Precio (tarifa recomendada) | $37,8 M | $42,0 M | $52,2 M |
| Meses para recuperar (base) | **62–66** | 102–124 | **67–72** |
| Meses para recuperar (escenario alto) | 35–37 | 48–52 | 35–36 |

En la P2, si Comserva puede bajar su plan de facturación electrónica de Helisa, el beneficio sube ≈ $17.000–45.000 al mes según el plan que tenga hoy (3.000 o 6.000 documentos) y el que conserve (360 o 1.200) (por confirmar).

### 7.4 Lectura y cómo usarlo con la gerencia

- **El grueso del ahorro de horas está en la Fase 1** (≈ 33 de las 43,5 h). La Fase 2 agrega ≈ 10 h al mes con los supuestos base; se justifica si el piloto muestra que facturar una a una sigue tomando mucho (por ejemplo, 5 minutos o más por factura). **Esa es exactamente la compuerta** del brief: medir antes de vender la Fase 2.
- **Conekta no se paga con horas**: ahorra ≈ 1 h al mes y cuesta $211.680. Se justifica por la cartera en línea, por no subir archivos al servidor TSplus y por menos errores de carga, no por tiempo.
- **Solo con horas de facturación, la Fase 1 se recupera en ≈ 3 a 5,5 años.** Para recuperarla en 24 meses habría que ahorrar ≈ 82 h al mes. Con los supuestos base, el ahorro acumulado en 24 meses vale ≈ $13,7–14,5 M (≈ $25 M en el escenario alto). **No prometer un retorno basado solo en horas.**
- El argumento completo para la gerencia (con Julio mostrando el ahorro) suma lo que no está en la tabla: (1) las horas liberadas caen en el **pico de facturación de fin de mes**; (2) **facturar antes** acorta el ciclo de cobro; (3) **no se pierden kilos** por sumas a mano (cada 1 % de kilos no cobrados es 1 % de la facturación del servicio: dato por confirmar); (4) **control del efectivo** (recibo solo con factura, entregas, cruce); (5) **evidencia** de cada visita con los campos del Manual de 2024 ante CORPOAMAZONIA; (6) **papelería** que se deja de imprimir (Comserva la estaba calculando, v5 §3); (7) **trazabilidad** de cada peso, de la visita al cruce en Helisa.
- **Lo más importante del viernes para este cálculo:** cuántas de las ≈ 240 facturas son del servicio, cuánto tarda hoy cada una y cuántos recibos se hacen al mes. Con 60 facturas al mes el ahorro de horas es ≈ $165.000 al mes y el caso se apoya casi todo en control y evidencia.

---

## 8. Si el cliente solo puede pagar ~10–15 M

Nadie de Comserva ha dicho una cifra (la v5 registró que «no hay presupuesto definido»); este es el plan si el tope resulta ser de 10 a 15 millones. Con 24 meses de ahorro base (≈ $14 M, sección 7.4) es un tope coherente desde el lado del cliente.

**Cuántas horas caben:** $10 M = 250 h a $40.000 (167 h a $60.000); $15 M = 375 h a $40.000 (250 h a $60.000). **No se baja de $40.000 la hora**: se recorta el alcance.

| Épica | Fase 0 + 1 completa | **A · Fase 1 esencial** (≈ $15 M a $40.000) | **B · Solo oficina** (≈ $10 M a $40.000) |
| --- | ---: | ---: | ---: |
| F0 · Definición | 36 | 24 | 16 |
| A · Cimientos | 24 | 20 | 18 |
| B · Identidad, dispositivos y series | 28 | 17 | 10 |
| C · Maestros | 70 | 42 | 34 |
| D · Sincronización | 48 | 40 | 0 |
| E · App del operario | 110 | 72 | 0 |
| F · Panel de operación | 56 | 26 | 30 |
| G · Cierre, documentos y FVE | 78 | 50 | 56 |
| G′ · Archivos hacia Helisa | 60 | 28 | 40 |
| TRZ · Trazabilidad | 30 | 10 | 10 |
| H · Calidad, despliegue y piloto | 90 | 46 | 36 |
| **Total** | **630** | **375** | **250** |
| Precio a $40.000 / $60.000 | $25,2 M / $37,8 M | **$15,0 M** / $22,5 M | **$10,0 M** / $15,0 M |

**A · Fase 1 esencial (375 h).** Queda: app sin señal con visita (kilos, GPS y una foto, firmas), sin residuos y fallida, constancia con hash; clientes, sedes, tarifas con los tres esquemas y equivalencias con Helisa; bandeja de visitas; pre-cierre, cierre, RH, **archivo de pedidos** con plantilla fija (separador y codificación como parámetros), FVE digitada, verificación por QR; cadena de trazabilidad básica en la ficha del cierre; piloto de un ciclo. **Se pierde:** recibo de caja en la app y archivo de recibos (los recibos siguen en papel y digitados en Helisa), entrega de efectivo y recaudo, configurador de plantillas, carga desde Excel (el equipo carga los datos una vez), importación del listado de FVE, programación semanal, fusión de clientes, correo automático, impresión de contingencia, búsqueda global, matriz y expediente de trazabilidad, pruebas de punta a punta completas.

**B · Solo oficina (250 h).** Sin app: los operarios siguen con la planilla de papel y alguien en la oficina **digita los kilos de cada visita en el panel**; de ahí salen el cierre, el RH con valores, el **archivo de pedidos** y el **archivo de recibos** (plantillas fijas), el registro de FVE y la trazabilidad básica. Conserva casi todo el ahorro de horas de facturación (menos el tiempo de digitar las visitas, ≈ 1–2 minutos cada una) y **pierde todo lo de campo**: firmas, GPS, fotos, constancia digital, trabajo sin señal y la evidencia ante CORPOAMAZONIA. La app se cotizaría después (≈ 190 h: épicas D y E, dispositivos y series, APK y piloto de campo).

**C · Alcance completo financiado.** Las 630 h a $40.000 ($25,2 M) con ≈ $15 M durante el desarrollo y el resto en cuotas mensuales después del acta. Solo si el problema es de caja y no de valor; el equipo asume el riesgo de cartera (pedir garantía escrita).

**Recomendación:** si el tope es real, ofrecer **A** (o **B** si a Comserva le importa más la facturación que el campo), con el precio completo visible en la misma propuesta para que el recorte se vea como recorte y no como descuento, y con los recortes como complementos para después. No mezclar recorte con tarifa rebajada.

---

## 9. Riesgos de la estimación

| # | Riesgo | Efecto en horas o fecha | Cómo se controla |
| --- | --- | --- | --- |
| N1 | Comserva no puede habilitar **Pedido** en su Helisa, o tiene costo | La Fase 1 queda sin entrada a Helisa (solo la hoja de trabajo para digitar); el piloto no puede medir la factura con F3; presión para adelantar la Fase 2 | Condición de la Fase 0 y del segundo hito de pago: Pedido habilitado y una importación de prueba |
| N2 | La factura una a una no reduce bastante el trabajo (≈ 240 al mes, por confirmar) | Presión para meter la Fase 2 en el precio de la Fase 1 (+240 h sin pago) | Precio cerrado por fase; compuerta con medición real en el piloto; Fase 2 cotizada aparte |
| N3 | Esquemas de tarifa distintos a los tres previstos | +8–16 h por esquema | Inventario en la Fase 0; los demás, orden de cambio |
| N4 | Códigos de cliente de Helisa y clientes duplicados por sede | +6–12 h de depuración y carga; pedidos rechazados | Cartilla de clientes de Helisa en la Fase 0; la depuración la hace Comserva (si la hace el equipo, se cobra por hora) |
| N5 | Conceptos y listas de precio mal mapeados | +4–8 h de retrabajo en el piloto; IVA o contabilización errada en Helisa | Tabla de equivalencias validada y firmada por Julio; archivo de prueba |
| N6 | Helisa en un servidor TSplus de un tercero (≈ 20 empresas) | Días de espera por cada prueba de importación; Conekta podría no instalarse | Procedimiento de carga acordado en la Fase 0; pruebas agrupadas; Conekta solo con confirmación escrita de Helisa |
| N7 | Conekta: estructuras de la ayuda en imágenes, HTTP sin TLS, sin caracteres especiales, costo recurrente, no emite facturas | Bloque 1B al extremo alto (90 h) o más; expectativa de que «lo resuelve todo» | 1B con precio y rango propios; conexión de pruebas antes de comprometer fecha; explicar por escrito qué hace y qué no |
| N8 | Dos libros (F y N) en el recibo y en la contabilización de la Fase 2 | +4–8 h | Formato oficial de Julio; importación de prueba de un recibo y de una factura contable |
| N9 | Fase 2: habilitación, numeración nueva y convivencia con la FE de Helisa | +1–3 semanas de calendario; riesgo de doble facturación | Proveedor tecnológico, no software propio; trámites de Comserva con apoyo; regla «lo de RH no se factura en Helisa»; hito de pago en la habilitación |
| N10 | «Factura en sitio» (por visita) | Cambia el modelo mensual; no está en ninguna cifra | Preguntar el viernes; si se confirma, orden de cambio con estimación propia |
| N11 | Decisores difusos (logística, Julio, gerencia) | Semanas entre propuesta y firma; renegociación | Dos propuestas con precio y beneficio claros; vigencia de 30 días; socialización con quien decide |
| N12 | La Unión Temporal Comserva factura algo | Segundo emisor o segunda empresa: horas no estimadas | Preguntar; fuera de alcance salvo orden de cambio |
| N13 | Discrepancias de transcripción (F3/F5, nombres) | +2–4 h corrigiendo manuales | Usar lo visto en pantalla; validar con Julio |
| N14 | Datos personales de terceros en las capturas de la reunión y en el repositorio público | Riesgo legal | No usar esos fotogramas; semilla con datos de prueba; repositorio sin datos reales |
| — | Volumen ≈ 240 facturas al mes frente a ≈ 60 clientes de la v5 | Carga inicial y piloto más pesados; plan del proveedor más alto; cambia el caso de negocio (sección 7) | Confirmarlo el viernes; carga por Excel; piloto con ≥ 5 clientes y luego el 100 % |
| — | Formatos oficiales de Julio sin fecha | G′ se construye en las semanas 7–9: +6–10 h de retrabajo si llegan distintos | Construir contra el pedido observado de 24 campos con el configurador; fecha de entrega en el acta de la Fase 0 |
| — | Primer proyecto con sincronización sin señal y firma en pantalla (v1) | +15–25 % en D y E (≈ +24–40 h) | Prototipo de la cola y la firma en la semana 2; prueba de modo avión temprana |
| — | Insumos del cliente tarde (clientes, tarifas, series) | Desplaza el piloto una semana por semana de retraso | Fechas en el acta de la Fase 0; desarrollo con semilla |
| — | Límites de las cuentas de Claude | Días perdidos al final de la semana | `/usage` la primera semana; Sonnet por defecto; créditos con tope |
| — | Cambios de alcance durante el piloto | ≈ +10 % | Orden de cambio a tarifa por hora |
| — | Piloto que no coincide con el ciclo de corte | Hasta 3–4 semanas de espera | Terminar el desarrollo entre el 20 y el 26 |
| — | TRM | Suscripciones y VPS en dólares | Colchón del 10 % en costos en dólares; precio en pesos |

Si se materializan juntos N3, N4, N8 y el riesgo de sincronización, la Fase 0 + Fase 1 se va al extremo alto (720 h): es la razón para cotizar a la tarifa recomendada y no a la mínima.

---

## 10. Fuentes

- **Brief de decisiones v6** del equipo (22 de octubre de 2026): cifras únicas de horas, calendario y tarifas; definición de las dos propuestas, fases, complementos y trazabilidad.
- **Estimación de tiempo y costo v1** (`estimacion/`, 18 de octubre de 2026): método, horas por épica, capacidad, cuentas de Claude, referencias de mercado (Lemon.io, Clutch, freelancermap, Indeed Colombia, Pixelia, Kytcode, Kubo, MyTechSolutions), cálculo del neto, forma de pago y riesgos.
- **README** del proyecto (ajuste preliminar de la v5: fase 0 + 1 ≈ 565 h) y **`SPEC.md` v1.1** (épicas A–H y G′; ≈ 60 h de archivos planos).
- **Levantamiento v5** (§3 contexto, volumen, presupuesto y plazo esperado; §19 garantía, soporte y costos recurrentes) y **Arquitectura técnica v1** (costos de infraestructura y de Conekta).
- **Reunión del 21 de octubre de 2026** (grabación y transcripción hasta el minuto 36:44): pedidos en lugar de facturas, factura una a una (F3), recibo por movimiento contable con dos libros, Pedido no habilitado en Comserva, Conekta y su costo, interés en la facturación electrónica, consecutivo FVE 25756 → 25997, FVE 25997 solo por kilo.
- **Investigación interna del 22 de octubre de 2026**: delta de la reunión frente a la v5 (riesgos N1–N14), formatos, Helisa (Conekta, importación de pedidos y de movimiento contable, planes de FE), normativa DIAN de factura electrónica y proveedores tecnológicos con API.
- **Oficiales y de proveedores** (consultados el 22 de octubre de 2026): Helisa Conekta, condiciones y especificaciones técnicas de la API (helisa.com/producto/helisa-conekta, helisa.com/condicione-generales-del-servicio-helisa-conekta, helisa.com/ayudas/api); Helisa Hosting y planes de facturación electrónica (helisa.com/producto/servicio-helisa-hosting, helisa.com/producto/facturacion-electronica); DIAN, Resolución 000165 de 2023 (habilitación, numeración, notas, contingencia) y Oficio 013246 de 2025 (normograma.dian.gov.co); listado de proveedores tecnológicos habilitados al 31 de agosto de 2026 (dian.gov.co); precios de Plemsi (plemsi.com/precios-facturacion-electronica), MATIAS API (matias-api.com/comparar-planes) y Dataico (dataico.com/planes-y-precios).
- **Datos tributarios y laborales** (de la v1): Decretos 1469 y 1470 de 2025 (SMMLV), Resolución DIAN 238 de 2025 (UVT), tabla de retención 2026, UGPP (independientes), Superfinanciera (TRM).
