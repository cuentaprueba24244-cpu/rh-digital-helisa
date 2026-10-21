# Recorderito · Reunión con Lucrecia

**Miércoles 21 de octubre de 2026 · Equipo RH digital Comserva · Basado en el levantamiento v5 y el SPEC v1.1**

Documento de preparación para el equipo. Se lleva impreso o abierto; la columna de respuestas se llena durante la reunión. No lleva precios: esta reunión es para entender el proceso, no para negociar.

---

## 1. El proyecto en un minuto

Comserva recolecta residuos peligrosos de unos sesenta clientes en Florencia. Hoy todo es papel: la planilla de cada visita, el recibo de caja en efectivo, el acta mensual. Lucrecia suma los kilos a mano y digita cada factura en Helisa.

El sistema hace esto:

1. **El operario registra la visita en el celular**: kilos por categoría, firmas, foto y GPS. Funciona sin señal. El cliente recibe su constancia al momento.
2. **Al cierre del mes** (desde el día 20 por cliente o todos el 26), el sistema suma las visitas y aplica la tarifa del cliente. Así nace el **RH**: la planilla del mes con los valores al pie.
3. **Del RH sale un archivo plano** que Lucrecia importa en Helisa para que Helisa genere la factura electrónica. Ella registra el número FVE que le da Helisa.
4. **Si el cliente paga en efectivo**, el operario emite un recibo de caja aplicado a esa factura. Del recibo sale otro archivo plano para que Helisa cruce el pago.

La regla que lo sostiene todo: **la visita es la única captura**. Nadie vuelve a sumar ni a digitar kilos.

Ejemplo real para validar con ella, Cofema de septiembre de 2026:

| Visita | Biológicos | Anatomopat. | RAEES | Total kg |
| --- | ---: | ---: | ---: | ---: |
| Día 5 | 39,35 | 35,60 | 0 | 74,95 |
| Día 12 | 41,70 | 61,80 | 0 | 103,50 |
| Día 19 | 0 | 77,40 | 67,50 | 144,90 |
| Día 22 | 40,30 | 50,20 | 0 | 90,50 |
| **Total** | **121,35** | **225,00** | **67,50** | **413,85** |

Factura FVE 25756: básico $74.790 + 393,85 kg adicionales × $4.600 = $1.811.710 → subtotal $1.886.500 + IVA $358.435 = **$2.244.935**. De ahí deducimos que el básico incluye 20 kg (hay que confirmarlo).

---

## 2. Qué cambió de la v4 a la v5

La v4 asumía que Helisa no dejaba importar facturas, porque la ayuda oficial solo documenta la importación de movimiento contable. Por eso llevaba la factura como un **reporte para que Lucrecia la digitara** (el «camino A»).

El 19 de octubre Comserva precisó el alcance y la v5 lo cambia así:

| Tema | v4 | v5 |
| --- | --- | --- |
| Factura hacia Helisa | Reporte para digitar | **Archivo plano** desde el RH que Helisa importa y convierte en factura electrónica. El reporte queda solo como contingencia |
| RH | Planilla de kilos | **Planilla con valores**: kilos por visita y liquidación al pie. Lucrecia puede corregir una línea con motivo antes de generar el archivo |
| Recibo de caja | Con o sin factura; podía ser anticipo antes de facturar | **Solo si el cliente tiene una factura registrada con saldo.** Tipos: anticipo, abono, pago de factura, pago total. Genera su propio archivo plano |
| Archivos | Un .xls de recibos en la fase 2 | **Dos archivos en la fase 1** (factura y recibo) con un **configurador** en el panel: columnas, formato, cuentas y líneas sin programar, aprobado por la gerencia |
| Cartera | Módulo de pagos, Excel de cartera de Helisa, Conekta opcional | **Fuera del sistema.** Queda en Helisa. El sistema solo lleva un saldo de referencia por factura |
| Estados del cierre | Abierto → cerrado → facturado | Abierto → cerrado → **exportado** → facturado |
| Estados del recibo | Emitido → entregado → cruzado | Emitido → entregado → **exportado** → cruzado |

**No cambió:** la normativa, el trabajo sin señal, las series de numeración, los requerimientos no funcionales, la arquitectura técnica, la base de datos principal ni la estimación.

**En el SPEC (v1.1):** la tarea del recibo de caja ahora exige factura registrada; el recaudo suma la bandeja de recibos exportados; el registro del FVE pasa a ser el paso que factura el cierre; y aparece una épica nueva de archivos planos (catálogo de campos, configurador, motor de generación, archivo de factura, archivo de recibo, resultado de la importación, pantallas y sincronización). Se construye en las semanas 7 a 9 y suma unas 60 horas a la fase 1.

**El riesgo grande de la v5:** todo depende de que Helisa realmente genere la factura electrónica a partir de un archivo importado. Nadie lo ha visto funcionar todavía. Por eso esta reunión es clave.

---

## 3. Lo que tenemos que salir sabiendo (sí o sí)

1. **Si Helisa genera la factura electrónica desde un archivo importado**, y con qué asistente. Ideal: verlo en pantalla compartida.
2. **El formato exacto** de ese archivo: columnas, orden, tipo de documento, fecha, extensión.
3. **Cómo se cruza un recibo de caja** contra la factura en Helisa.
4. **Qué pasa cuando alguien paga antes de que exista la factura**, porque la v5 no deja emitir el recibo sin factura.
5. **Cómo factura hoy**: cliente por cliente desde el 20, o todos juntos el 26.
6. **Quién define las cuentas contables**: Lucrecia o el contador, y cuándo podemos hablar con él.

Si el tiempo se acaba, que no falten estos seis puntos.

---

## 4. Preguntas para Lucrecia

Prioridad: **A** = imprescindible, **B** = importante, **C** = si queda tiempo. Las marcadas **(nueva)** no estaban en la guía del 16 de octubre: nacen de la v5.

### A. Archivo de factura · lo más importante

| # | Pregunta | Prio. | Respuesta |
| --- | --- | :---: | --- |
| 1 | **(nueva)** ¿Ha importado alguna vez un archivo en Helisa que cree una factura electrónica? ¿Con qué opción del menú? (Transferencia de Datos, Gestión Ventas, otra) | A | |
| 2 | **(nueva)** ¿Nos puede mostrar en pantalla compartida ese asistente? Si se puede, hacer una importación de prueba con los datos de Cofema | A | |
| 3 | **(nueva)** ¿Qué columnas pide, en qué orden y con qué títulos? ¿Fecha en qué formato? ¿Archivo .xls o .csv? ¿Separador? | A | |
| 4 | **(nueva)** ¿Helisa asigna solo el número de la factura al importar, o hay que mandarlo en el archivo? | A | |
| 5 | **(nueva)** ¿Al importar, la factura queda lista para enviar a la DIAN, o queda como borrador que ella revisa y emite? | A | |
| 6 | **(nueva)** ¿El archivo lleva filas de norma local y NIIF (clase F y N), o solo una? | B | |
| 7 | **(nueva)** Si un cliente nuevo no existe en Helisa, ¿la importación falla? ¿Cómo lo crea hoy? | B | |
| 8 | ¿Camilo ya envió la estructura del archivo a Hernando? Si no, ¿a quién le pedimos la plantilla por escrito? | A | |

### B. Recibo de caja y pagos

| # | Pregunta | Prio. | Respuesta |
| --- | --- | :---: | --- |
| 9 | Cuando un cliente paga en efectivo al operario, ¿qué está pagando? ¿El mes anterior, un abono, un anticipo del mes en curso? | A | |
| 10 | **(nueva)** ¿Hay clientes que pagan **antes** de que exista la factura? ¿Qué tan seguido? ¿Cómo quiere tratarlos si el sistema no deja emitir recibo sin factura? | A | |
| 11 | ¿Un solo pago puede cubrir varias facturas? | B | |
| 12 | **(nueva)** ¿Cómo cruza hoy un pago contra la factura en Helisa? ¿Sirve poner el número de la factura (FVE) en el campo «documento fuente»? | A | |
| 13 | ¿Qué número de recibo definitivo genera Helisa? ¿Con qué cuentas (caja, banco)? | B | |
| 14 | ¿Cuántos recibos en efectivo hace al mes? ¿El operario entrega el dinero el mismo día? ¿A quién? | B | |
| 15 | **(nueva)** Los pagos por transferencia: ¿quiere marcarlos en el sistema para que el operario sepa qué está pagado, o le basta con llevarlos en Helisa? | C | |

### C. Facturación, corte y calendario

| # | Pregunta | Prio. | Respuesta |
| --- | --- | :---: | --- |
| 16 | ¿Factura cada cliente cuando termina sus visitas del mes (desde el 20) o todos juntos el 26? La factura de Cofema es del 23 con última visita el 22 | A | |
| 17 | Si llega una visita después de facturar al cliente, ¿qué hace hoy? ¿Nota crédito, factura adicional, la pasa al mes siguiente? | B | |
| 18 | ¿Crédito a 30 días o pago en los primeros 10 días del mes siguiente? ¿Varía por cliente? | B | |
| 19 | ¿Cuántas facturas hace al mes y cuánto tarda en cada una? (Nos sirve para mostrar el ahorro) | C | |

### D. Tarifas

| # | Pregunta | Prio. | Respuesta |
| --- | --- | :---: | --- |
| 20 | ¿Dónde tiene las tarifas de cada cliente? ¿Nos puede pasar esa lista? | A | |
| 21 | ¿Todos tienen básico + kilos incluidos + kilo adicional? ¿Hay quien pague solo por kilo o por visita? | A | |
| 22 | ¿Son 20 los kilos incluidos de Cofema? | B | |
| 23 | Si un cliente no tuvo visitas en el mes, ¿se le cobra el básico igual? | B | |
| 24 | ¿El IVA es 19 % para todos? ¿Hay clientes que retienen (retefuente, ICA)? | B | |

### E. El RH con valores

| # | Pregunta | Prio. | Respuesta |
| --- | --- | :---: | --- |
| 25 | **(nueva)** Mostrarle el RH de Cofema con la liquidación al pie (mockup del cierre). ¿Así lo entiende? ¿Le falta algo? | A | |
| 26 | **(nueva)** ¿Con qué frecuencia tiene que corregir un valor antes de facturar? ¿Qué corrige normalmente? | B | |
| 27 | **(nueva)** ¿Qué texto llevan las líneas de la factura? En Cofema dice «RECOLEC. TRANSP Y DISPOS. FINAL RESIDUOS BIOLOGICOS» y «KILOGRAMOS ADICIONALES». ¿Es igual para todos? | B | |

### F. Cuentas y el contador

| # | Pregunta | Prio. | Respuesta |
| --- | --- | :---: | --- |
| 28 | **(nueva)** ¿Quién define las cuentas contables de la factura (ingreso, IVA, cartera) y del recibo (caja, banco, cartera)? ¿Ella o el contador? | A | |
| 29 | **(nueva)** ¿Cuándo podemos hablar con el contador? ¿Usan centro de costo? | B | |

### G. Otras

| # | Pregunta | Prio. | Respuesta |
| --- | --- | :---: | --- |
| 30 | ¿Qué versión de Helisa usan? (instalada en el computador o en la nube) | B | |
| 31 | ¿Cómo corrige una factura con error? (nota crédito) | C | |
| 32 | ¿Qué es lo que más le quita tiempo hoy? ¿Qué le gustaría que el sistema hiciera por ella? | B | |

---

## 5. Qué mostrarle

Llevar los mockups de la v5 abiertos (`mockups_v5/index.html`, o servirlos con `python3 -m http.server 8765 --directory mockups_v5`). En este orden:

1. **Panel → Cierre del periodo → septiembre 2026.** El RH de Cofema da 413,85 kg y $2.244.935, igual a su factura. Es el momento de validar la fórmula.
2. **Panel → Archivos planos para Helisa.** La bandeja de archivos y el configurador. Preguntarle si las columnas se parecen a lo que pide Helisa.
3. **Panel → Recaudo.** El ciclo del recibo: emitido, entregado, exportado, cruzado.
4. **App → Recibo de caja.** Que vea que sin factura registrada no deja emitir. Ahí sale la pregunta 10.

No hace falta mostrar la app completa ni el portal; eso es para el gerente y los operarios.

---

## 6. Qué pedirle que nos entregue

| Material | Para qué | ¿Lo dio? |
| --- | --- | --- |
| Pantallazo o foto del asistente de importación de Helisa, con sus columnas | Configurar el archivo de factura | |
| Un archivo que ya haya importado alguna vez (de lo que sea) | Copiar el formato exacto | |
| La lista de clientes con su tarifa (Excel) | Cargar los datos reales | |
| Un ejemplo de recibo de caja definitivo de Helisa | Diseñar el archivo de recibo | |
| Reporte de cartera exportado de Helisa | Entender cómo maneja los saldos | |
| Contacto del contador | Definir las cuentas | |
| Contacto directo de Camilo | Pedir la plantilla por escrito | |

---

## 7. Cómo llevar la reunión

- **Que ella comparta pantalla y lo haga**, no que lo explique. «Muéstreme cómo hace la factura de Cofema y yo voy tomando nota.»
- **Escuchar más de lo que hablamos.** Repetir para confirmar: «O sea que usted primero hace X y después Y, ¿cierto?».
- **Grabar** solo si ella acepta, y avisarlo al inicio.
- **Anotar quién responde** cada cosa y qué material queda de enviar.
- **No dar precios ni fechas.** Si preguntan: «Con lo que salga de hoy armamos la propuesta y se la enviamos en unos días».
- **No prometer que Helisa va a aceptar el archivo** hasta verlo importado. Si no se puede, el plan B ya existe: el reporte para digitar.

---

## 8. Al terminar

- Leer en voz alta los acuerdos y el material que queda pendiente, con responsable y fecha.
- Fijar la siguiente reunión (con el contador, o con Camilo para la importación de prueba).
- Pedir que los acuerdos queden por correo o por WhatsApp.
- Esa misma tarde: pasar las respuestas al levantamiento y decidir si la v5 se mantiene o si hay que volver al reporte para digitar.
