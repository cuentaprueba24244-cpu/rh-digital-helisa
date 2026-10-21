# Recorderito · Reunión con Lucrecia

**Miércoles 21 de octubre de 2026 · Equipo RH digital Comserva · Basado en el levantamiento v5 y el SPEC v1.1**

Resumen de todo el proyecto para contextualizarnos rápido, y las preguntas que hay que hacer sobre todos los temas. Es de uso interno: no se le muestra al cliente y no lleva precios. Las tablas de preguntas tienen una columna en blanco para anotar.

**Cómo usarlo:** las secciones 1 a 9 se leen antes de la reunión (unos 20 minutos). Las secciones 10 a 15 se usan durante la reunión.

---

## 1. El proyecto en un minuto

**El cliente.** Comserva S.A.S. (NIT 828.002.730-1), Florencia, Caquetá. Recolecta, transporta y entrega a tratamiento residuos peligrosos de unos sesenta clientes (clínicas, laboratorios, droguerías, veterinarias). Licencia ambiental de CORPOAMAZONIA, Resolución 0038 de 2006.

**Las personas.** Diego Alfonso Cartagena, gerente (firma el acta). Lucrecia, facturación y cartera en Helisa. Camilo, soporte de Helisa (quedó de enviar el formato del archivo a Hernando). Tres usuarios internos en total. Dispositores: Incihuila (incineración) y Sur Ambiental (celdas de seguridad).

**El problema.** Todo es papel: la planilla de cada visita en papel químico que se borra, el recibo de caja en talonario, el acta mensual en Word. Lucrecia suma los kilos a mano y digita cada factura en Helisa. El efectivo depende de la buena fe del operario. Cuando un cliente dice «no vinieron», no hay cómo probarlo.

**La solución.** Una app en el celular del operario, un panel web para la oficina, un portal para los clientes (fase 2) y archivos para importar en Helisa.

**La regla que lo sostiene todo.** La visita es la única captura de datos. Todo lo demás (planilla del mes, valor de la factura, acta) sale de sumar visitas. Nadie vuelve a sumar ni a digitar kilos.

---

## 2. Los cuatro formatos que pidió Comserva

En la reunión del 16 de octubre Comserva pidió digitalizar cuatro documentos. Así queda cada uno:

| Formato | Hoy | En el sistema | Quién lo genera | Cómo le llega al cliente | Fase |
| --- | --- | --- | --- | --- | :---: |
| **Registro de recolección** (formulario RHPS) | Una hoja de papel por cliente y mes, con una fila por visita. Se llena a mano | Se divide en dos. La **constancia de visita**: un PDF por cada visita, con firmas, numerado. La **planilla mensual**: todas las visitas del mes; con los valores al pie se llama **RH** | La constancia, el celular al cerrar la visita. La planilla y el RH, el servidor al cerrar el mes | La constancia, por WhatsApp desde el celular del operario y por correo automático, en el momento. La planilla, por correo al cerrar el mes | 1 |
| **Recibo de caja provisional** | Talonario de papel, solo para pagos en efectivo | PDF numerado, con firma de quien paga y del operario. **En la v5 solo se emite si el cliente ya tiene una factura registrada** | El celular del operario | WhatsApp desde el celular y correo | 1 |
| **Acta de gestión integral** (GD.FM.01) | Word, mensual, firmada por el gerente; solo se entrega si el cliente está al día | PDF generado al cierre del mes con los kilos por categoría, tratamiento y dispositor; firma electrónica del gerente por lote | El servidor; la aprueba el gerente | Portal del cliente, solo si está al día | **2** |
| **Factura electrónica** | Lucrecia la digita en Helisa sumando kilos a mano | **No la emite el sistema: la sigue emitiendo Helisa.** El sistema genera un **archivo plano** con los datos del RH para que Lucrecia lo importe en Helisa | Helisa (a partir del archivo) | Como hoy: la envía Helisa | 1 |

Mockups de los documentos: `mockups_v5/documentos/index.html` (constancia, planilla, recibo, acta y reporte de cierre).

---

## 3. Cómo funciona de punta a punta

1. **Inicio de jornada.** El operario confirma vehículo, conductor y auxiliar. Con señal, la app descarga clientes, tarifas y un bloque de números de consecutivo.
2. **La visita.** Elige la sede del cliente y registra uno de tres resultados:
    - **Recolección:** kilos por categoría (puede pesar varias veces y la app suma), bolsas, guardianes, novedades (bolsa rota, residuo rechazado), fotos y GPS.
    - **Sin residuos:** el cliente atendió pero no entregó nada. Queda con 0 kg y firma.
    - **Fallida:** no se pudo recoger (cerrado, no lo dejaron entrar). Foto obligatoria y motivo.
3. **Firmas.** Aviso de tratamiento de datos, firma de quien entrega (o motivo si no firma) y firma del operario.
4. **Constancia.** Al cerrar, la visita toma su número, genera el PDF en el celular y el operario la comparte por WhatsApp. Lo cerrado ya no se edita: si hay un error, se anula con motivo y se hace otra.
5. **Sin señal.** Todo lo anterior funciona sin internet. La visita se guarda cifrada en el celular y se envía sola cuando vuelve la señal.
6. **Cobro en efectivo.** Si el cliente tiene factura registrada, el operario emite el recibo de caja (anticipo, abono, pago de factura o pago total) aplicado a esa factura.
7. **Entrega del efectivo.** Al terminar el día, el operario declara lo que entrega y la oficina lo confirma. Así se sabe si el dinero llegó.
8. **Cierre del mes.** Desde el día 20 Lucrecia puede cerrar cada cliente que ya terminó sus visitas; el día 26 se cierran los demás. El sistema suma, aplica la tarifa y produce la planilla y el **RH**.
9. **Archivo de factura.** Del RH sale el archivo plano que Lucrecia importa en Helisa. Helisa genera la factura electrónica y Lucrecia registra el número (FVE) en el sistema.
10. **Archivo de recibos.** De los recibos de caja sale otro archivo para que Helisa registre el recibo definitivo y cruce el pago contra la factura.
11. **Fase 2.** Acta con firma del gerente, portal para que el cliente descargue sus documentos, reporte ambiental.

Si Helisa no acepta el archivo de factura, el plan B ya está construido: un reporte con cada factura lista para que Lucrecia la digite.

---

## 4. Reglas clave para tener en la cabeza

- **Fórmula de la factura:** kilos adicionales = kilos del mes − kilos incluidos (si da negativo, cero). Total = (básico + kilos adicionales × precio del kilo) × 1,19.
- **Ejemplo real, Cofema, septiembre de 2026:**

| Visita | Biológicos | Anatomopat. | RAEES | Total kg |
| --- | ---: | ---: | ---: | ---: |
| Día 5 | 39,35 | 35,60 | 0 | 74,95 |
| Día 12 | 41,70 | 61,80 | 0 | 103,50 |
| Día 19 | 0 | 77,40 | 67,50 | 144,90 |
| Día 22 | 40,30 | 50,20 | 0 | 90,50 |
| **Total** | **121,35** | **225,00** | **67,50** | **413,85** |

  Factura FVE 25756: básico $74.790 + 393,85 kg × $4.600 = $1.811.710 → subtotal $1.886.500 + IVA $358.435 = **$2.244.935**. Deducimos que el básico incluye 20 kg (por confirmar).
- **Periodo:** del 27 de un mes al 26 del siguiente. Una visita cuenta en el periodo de su fecha, no del día en que se sincronizó.
- **Tarifa:** cada cliente tiene la suya, con vigencia. Se aplica la vigente el día del corte.
- **El NIT es la llave del cliente.** Cofema aparece con dos razones sociales distintas en la factura y en el acta; el NIT las une. Un cliente puede tener varias sedes.
- **Categorías:** 9 en la planilla (biológicos, cortopunzantes, anatomopatológicos, animales, corrosivos, explosivos, reactivos, tóxicos, RAEES). El acta solo trae 7: **Animales y Explosivos no tienen tratamiento definido** y lo debe decidir la gerencia.
- **Numeración:** la planilla continúa el talonario (22642-26); el recibo continúa en 35652; el acta en 25677; la constancia es una serie nueva.

---

## 5. Normativa en seis líneas

- La **Resolución 591 de 2024** derogó la Resolución 1164 de 2002, de donde salía el formulario RHPS. Su manual exige un **comprobante de recolección** con campos fijos (conductor con documento, gestor de destino, firmas de quien entrega y de quien transporta). Nuestra constancia de visita los trae.
- El mismo manual exige que el gestor entregue un **certificado** al cliente: eso es el acta.
- Constancias y actas se guardan **5 años**; recibos y soportes contables, **10 años**.
- El máximo por bolsa roja es **15 kg** (el contrato modelo dice 6).
- La **firma en pantalla es válida** como firma electrónica si deja evidencia (Ley 527 de 1999). Conviene una cláusula de aceptación en los contratos con los clientes y consultar a CORPOAMAZONIA.
- El recibo de caja **no es factura** ni documento equivalente ante la DIAN; es un soporte interno.

---

## 6. Helisa: lo que sabemos y lo que no

**Lo que sabemos:**

- La factura electrónica se emite desde el módulo de ventas de Helisa, con ATEB Colombia como proveedor ante la DIAN.
- La ayuda oficial de Helisa solo documenta importar **movimiento contable**, terceros y cuentas, en Excel 97-2003 (.xls).
- Tenemos un archivo de ejemplo (CSV de 22 columnas) exportado por Helisa, pero es de otra empresa.
- Helisa tiene una conexión de pago llamada Conekta (unos $211.680 al mes); la v5 la descartó.

**Lo que no sabemos y decide la v5:**

- **Si un archivo importado puede generar la factura electrónica en la instalación de Comserva.** Comserva dice que sí; la documentación pública no lo muestra. Mañana hay que verlo.
- El formato exacto (columnas, orden, fecha, extensión) y qué cuentas contables lleva.
- Cómo se cruza un recibo de caja contra la factura al importarlo.

---

## 7. Fases

| Fase | Qué incluye | ¿Cuándo? |
| --- | --- | --- |
| **0. Definición** | Esta reunión, el formato de Helisa por escrito con una importación de prueba, las cuentas del contador, la consulta a CORPOAMAZONIA, los datos de clientes y tarifas | En paralelo, ya |
| **1. Campo y oficina** | App del operario, panel, recibo de caja y entrega de efectivo, cierre, planilla y RH, los dos archivos para Helisa con su configurador, correo automático, verificación por QR, piloto en paralelo con el papel durante un mes | Se puede empezar ya |
| **2. Acta y portal** | Acta con firma del gerente, portal de clientes, saldo de referencia, terceros nuevos para Helisa, reporte ambiental | Después de la fase 0 |
| **3. Caja y mensajes** | Cierre de caja formal, WhatsApp automático, reportes | Después del piloto |

**Fuera del alcance:** la contabilidad, la cartera, las retenciones y las notas crédito (se quedan en Helisa); migrar el histórico en papel; la app para iPhone salvo que la pidan.

---

## 8. Tecnología y equipo (por si preguntan)

- App Android hecha con React Native (Expo); panel y portal web; servidor con base de datos PostgreSQL; archivos en la nube; un servidor a nombre de Comserva.
- Costo de infraestructura estimado: entre $55.000 y $90.000 al mes, a cargo de Comserva.
- Repositorio del equipo: https://github.com/cuentaprueba24244-cpu/rh-digital-helisa

---

## 9. Qué cambió de la v4 a la v5

| Tema | v4 | v5 |
| --- | --- | --- |
| Factura hacia Helisa | Reporte para que Lucrecia digitara | **Archivo plano** desde el RH que Helisa importa y convierte en factura. El reporte queda como plan B |
| RH | Planilla de kilos | **Planilla con valores** al pie. Lucrecia puede corregir una línea con motivo antes de generar el archivo |
| Recibo de caja | Con o sin factura | **Solo con factura registrada**, aplicado a esa factura. Genera su propio archivo |
| Archivos | Un archivo de recibos en la fase 2 | **Dos archivos en la fase 1** con un configurador para ajustar columnas, formato y cuentas sin programar |
| Cartera | Módulo de pagos y Conekta opcional | **Se queda en Helisa.** El sistema solo lleva un saldo de referencia por factura |
| Estados | Cierre: abierto → cerrado → facturado | Cierre y recibo ganan el paso **exportado** |

No cambiaron la normativa, el trabajo sin señal, la numeración, la arquitectura ni la estimación. El SPEC pasó a v1.1 con una tarea nueva de archivos planos, que suma unas 60 horas a la fase 1.

---

## 10. Decisiones pendientes (llevamos una recomendación)

| Decisión | Recomendamos | Decide |
| --- | --- | --- |
| Cierre | Por cliente desde el día 20 y general el 26 | Lucrecia |
| Pagos antes de que exista la factura | No emitir recibo; recibir el pago cuando exista la factura (o permitir un anticipo sin factura, que complica el archivo) | Gerencia y Lucrecia |
| Valor del RH | Calculado por el sistema; Lucrecia corrige con motivo | Lucrecia |
| Animales y Explosivos | Quedan en la app, sin tratamiento, hasta que la gerencia defina | Gerencia |
| Firma del gerente en el acta | Aprobación en el sistema con su usuario más la imagen de su firma | Gerencia |
| Entrega del acta | Se genera siempre; se publica en el portal solo si el cliente está al día | Gerencia, con su asesor |
| Qué recibe el cliente | Constancia en cada visita; planilla al cerrar el mes; acta en el portal | Gerencia |
| WhatsApp | Desde el celular en la fase 1; automático en la fase 3 | Gerencia |
| Celulares | Android; iPhone solo si lo piden | Gerencia |

---

## 11. Lo que tenemos que salir sabiendo (sí o sí)

1. **Si Helisa genera la factura electrónica desde un archivo importado**, y con qué opción del menú. Ideal: verlo en pantalla.
2. **El formato exacto** de ese archivo.
3. **Cómo se cruza un recibo de caja** contra la factura en Helisa.
4. **Qué pasa con los pagos que llegan antes de la factura.**
5. **Cómo factura hoy**: cliente por cliente desde el 20, o todos el 26.
6. **Quién define las cuentas contables** y cuándo hablamos con el contador.

---

## 12. Preguntas

Prioridad: **A** = imprescindible, **B** = importante, **C** = si queda tiempo. **Quién:** L = Lucrecia, G = gerencia (si está presente; si no, se le deja pedido a Lucrecia).

### A. Helisa y el archivo de factura

| # | Pregunta | Quién | Prio. | Respuesta |
| --- | --- | :---: | :---: | --- |
| 1 | ¿Ha importado alguna vez un archivo en Helisa que cree una factura electrónica? ¿Con qué opción del menú? | L | A | |
| 2 | ¿Nos lo puede mostrar en pantalla? Si se puede, hacer una importación de prueba con los datos de Cofema | L | A | |
| 3 | ¿Qué columnas pide, en qué orden y con qué títulos? ¿Fecha en qué formato? ¿.xls o .csv? ¿Separador? | L | A | |
| 4 | ¿Helisa asigna solo el número de la factura al importar? | L | A | |
| 5 | Al importar, ¿la factura queda lista para la DIAN o queda en borrador para revisarla? | L | A | |
| 6 | ¿Llevan contabilidad local y NIIF (el archivo tendría filas F y N)? | L | B | |
| 7 | Si un cliente nuevo no existe en Helisa, ¿la importación falla? ¿Cómo lo crea hoy? | L | B | |
| 8 | ¿Qué versión de Helisa usan: instalada en el computador o en la nube? | L | B | |
| 9 | ¿Camilo ya envió la estructura del archivo? Si no, ¿a quién le pedimos la plantilla por escrito? | L | A | |

### B. La factura, el corte y el calendario

| # | Pregunta | Quién | Prio. | Respuesta |
| --- | --- | :---: | :---: | --- |
| 10 | ¿Factura cada cliente cuando termina sus visitas (desde el 20) o todos juntos el 26? La de Cofema es del 23 con última visita el 22 | L | A | |
| 11 | Si llega una visita después de facturar al cliente, ¿qué hace hoy? ¿Nota crédito, otra factura, la pasa al mes siguiente? | L | B | |
| 12 | ¿Qué texto llevan las líneas de la factura? ¿Es igual para todos los clientes? | L | B | |
| 13 | ¿Crédito a 30 días o pago en los primeros 10 días? ¿Varía por cliente? | L | B | |
| 14 | ¿Cómo corrige una factura con error? | L | C | |

### C. Tarifas

| # | Pregunta | Quién | Prio. | Respuesta |
| --- | --- | :---: | :---: | --- |
| 15 | ¿Dónde tiene las tarifas de cada cliente? ¿Nos pasa la lista? | L | A | |
| 16 | ¿Todos tienen básico + kilos incluidos + kilo adicional? ¿Hay quien pague solo por kilo o por visita? | L | A | |
| 17 | ¿Son 20 los kilos incluidos de Cofema? | L | B | |
| 18 | Si un cliente no tuvo visitas en el mes, ¿se le cobra el básico? | L | B | |
| 19 | ¿El IVA es 19 % para todos? ¿Hay clientes que retienen (retefuente, ICA)? | L | B | |
| 20 | Cuando cambia una tarifa a mitad de mes, ¿desde cuándo rige? | L | C | |

### D. El RH y la planilla mensual

| # | Pregunta | Quién | Prio. | Respuesta |
| --- | --- | :---: | :---: | --- |
| 21 | Mostrarle el RH de Cofema con los valores al pie. ¿Así lo entiende? ¿Le falta algo? | L | A | |
| 22 | ¿Con qué frecuencia corrige un valor antes de facturar? ¿Qué corrige normalmente? | L | B | |
| 23 | ¿Qué significa el «-26» del número 22641-26 de la planilla? ¿Es el año? | L / G | B | |
| 24 | ¿Quién controla hoy los consecutivos de planilla, recibo y acta? ¿Qué hacen con las hojas anuladas? | L / G | B | |
| 25 | ¿El cliente recibe hoy su copia de la planilla en cada visita o al final del mes? | L / G | B | |

### E. Recibo de caja y efectivo

| # | Pregunta | Quién | Prio. | Respuesta |
| --- | --- | :---: | :---: | --- |
| 26 | Cuando un cliente paga en efectivo, ¿qué paga? ¿El mes anterior, un abono, un anticipo del mes en curso? | L | A | |
| 27 | ¿Hay clientes que pagan **antes** de que exista la factura? ¿Qué tan seguido? ¿Cómo quiere tratarlos? | L | A | |
| 28 | ¿Un pago puede cubrir varias facturas? | L | B | |
| 29 | ¿Cómo cruza hoy un pago contra la factura en Helisa? ¿Sirve poner el número de la factura en el campo «documento fuente»? | L | A | |
| 30 | ¿Qué recibo definitivo genera Helisa? ¿Con qué cuentas (caja, banco)? | L | B | |
| 31 | ¿Cuántos recibos en efectivo hacen al mes? ¿El operario entrega el dinero el mismo día? ¿A quién? ¿Cómo se consigna? | L | B | |
| 32 | ¿El recibo seguirá llamándose «provisional»? | L / G | C | |
| 33 | Los pagos por transferencia, ¿quiere marcarlos en el sistema o le basta con Helisa? | L | C | |

### F. Cuentas contables y el contador

| # | Pregunta | Quién | Prio. | Respuesta |
| --- | --- | :---: | :---: | --- |
| 34 | ¿Quién define las cuentas de la factura (ingreso, IVA, cartera) y del recibo (caja, banco, cartera)? ¿Usted o el contador? | L | A | |
| 35 | ¿Cuándo podemos hablar con el contador? ¿Usan centro de costo? | L | B | |

### G. Operación en campo y la constancia

| # | Pregunta | Quién | Prio. | Respuesta |
| --- | --- | :---: | :---: | --- |
| 36 | ¿Cuántos clientes activos hay, cuántas visitas al mes y cuántos operarios usarán la app? | L / G | A | |
| 37 | ¿Hay clientes con varias sedes bajo el mismo NIT? ¿Se factura por NIT o por sede? ¿Qué es «Campo/Base» en el acta de Cofema? | L / G | B | |
| 38 | ¿Quién firma por el cliente? ¿Suele ser la misma persona? ¿Da su cédula? | L / G | B | |
| 39 | Si el cliente no tiene residuos ese día, ¿se anota la visita? ¿Se cobra igual el básico? | L / G | B | |
| 40 | ¿Los celulares serán de la empresa o personales? ¿Android o iPhone? ¿Qué modelos? ¿Tienen plan de datos? | G | B | |
| 41 | ¿Cómo pesan: báscula digital, bolsa por bolsa o por categoría? ¿Con cuántos decimales? | G | C | |
| 42 | ¿Quién arma la programación semanal de visitas? ¿Cómo manejan festivos y visitas extra? | G | C | |

### H. Acta, cartera y legal

| # | Pregunta | Quién | Prio. | Respuesta |
| --- | --- | :---: | :---: | --- |
| 43 | ¿Qué tratamiento y dispositor tienen Animales y Explosivos? | G | B | |
| 44 | ¿Cuál es la dirección oficial de Comserva: Km 6 o Km 8? | G | B | |
| 45 | ¿El gerente firmaría las actas una por una o todas juntas? ¿Quién lo reemplaza? | G | C | |
| 46 | ¿Qué significa exactamente «estar al día» para entregar el acta? | L / G | B | |
| 47 | ¿CORPOAMAZONIA o algún cliente les ha exigido la planilla o el acta firmadas en papel? ¿Quién es su asesor ambiental? | G | B | |
| 48 | ¿Tienen política de tratamiento de datos personales? ¿Dominio y correo propios? | G | C | |
| 49 | ¿Aceptan un mes de prueba con la app y el papel en paralelo antes de dejar el talonario? | G | B | |

### I. Costo-beneficio

| # | Pregunta | Quién | Prio. | Respuesta |
| --- | --- | :---: | :---: | --- |
| 50 | ¿Cuántas facturas hace al mes y cuánto tarda en cada una? | L | B | |
| 51 | ¿Qué es lo que más tiempo le quita hoy? ¿Qué le gustaría que el sistema hiciera por usted? | L | B | |
| 52 | ¿Cuánto gastan al año en talonarios, papel químico e impresión? | G | C | |

---

## 13. Qué mostrar de los mockups

Abrir `mockups_v5/index.html` (o servirlos con `python3 -m http.server 8765 --directory mockups_v5`). En este orden:

1. **Documentos** (`documentos/index.html`): la constancia de visita, la planilla, el recibo y el acta. Que reconozca sus formatos.
2. **Panel → Cierre del periodo → septiembre 2026:** el RH de Cofema da 413,85 kg y $2.244.935, igual a su factura.
3. **Panel → Archivos planos para Helisa:** la bandeja y el configurador. ¿Se parece a lo que pide Helisa?
4. **Panel → Recaudo:** el ciclo del recibo de caja.
5. **App → visita y recibo de caja:** cómo el operario cierra la visita y comparte la constancia por WhatsApp; que sin factura no deja emitir recibo.

---

## 14. Qué pedir

| Material | Para qué | ¿Lo dio? |
| --- | --- | --- |
| Pantallazo del asistente de importación de Helisa con sus columnas | Configurar el archivo de factura | |
| Un archivo que ya haya importado alguna vez | Copiar el formato exacto | |
| Lista de clientes con NIT, sedes, contacto, WhatsApp, correo, frecuencia y tarifa (Excel) | Cargar los datos reales | |
| Un recibo de caja definitivo de Helisa | Diseñar el archivo de recibos | |
| Reporte de cartera exportado de Helisa | Entender los saldos | |
| Últimos números usados en papel (planilla, recibo, acta) | Continuar la numeración | |
| Logo en buena calidad y textos legales de cada formato | Los PDF | |
| Contacto del contador y de Camilo | Cuentas y plantilla | |
| Lista de operarios, placas y celulares | Configurar la app | |

---

## 15. Cómo llevar la reunión

- **Grabarla en video con audio**, avisando al inicio y con su permiso. Lo valioso es lo que muestre en pantalla. Activar la transcripción de la plataforma (Meet, Teams o Zoom) y tomar pantallazos cuando muestre el asistente de importación.
- **Que ella comparta pantalla y lo haga.** «Muéstreme cómo hace la factura de Cofema y yo voy anotando.»
- **Escuchar más de lo que hablamos.** Repetir para confirmar: «O sea que primero hace X y después Y, ¿cierto?».
- **Anotar quién responde** cada cosa y qué material queda de enviar.
- **No dar precios ni fechas.** «Con lo que salga de hoy armamos la propuesta y se la enviamos en unos días.»
- **No prometer que Helisa va a aceptar el archivo** hasta verlo importado. El plan B (reporte para digitar) ya existe.

**Al terminar:** leer en voz alta los acuerdos y lo pendiente con responsable y fecha; fijar la siguiente reunión (con el contador o con Camilo); pedir que quede por escrito. Esa misma tarde, pasar las respuestas al levantamiento y decidir si la v5 se mantiene o se vuelve al reporte para digitar.
