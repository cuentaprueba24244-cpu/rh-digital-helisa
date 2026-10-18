# Proyecto RH digital + Helisa — Comserva: lo que sabemos

Actualizado: 18 oct 2026. Fuentes: reunión de descubrimiento del 16 oct 2026 (grabada), formatos entregados por el cliente (RH, acta, factura, recibo de caja, modelo de contrato) y la página oficial de Helisa Conekta.

## 1. Cliente y objetivo

- **Comserva (Comercializadora de Servicios Varios S.A.S.)**, Florencia, Caquetá. Gestión de residuos peligrosos (hospitalarios y otros). Licencia ambiental CORPOAMAZONIA, Res. 0038 de 2006.
- **Objetivo:** digitalizar cuatro documentos con una app móvil para operarios, un panel web, un portal para clientes y una interfaz con **Helisa** (software contable).
- Hoy el proceso es en papel. El operario llena la planilla en la visita y después se digita en oficina.

## 2. Los cuatro documentos (hoy con consecutivo propio)

| Documento | Qué es | Ejemplo de consecutivo |
|---|---|---|
| Planilla de recolección (RH) | Una por cliente y por mes, con una fila por visita | 22641-26 |
| Acta de gestión integral / tratamiento y disposición final | Resume el mes por categoría, con tratamiento y dispositor. La firma el gerente | 25676 |
| Factura electrónica (FVE) | Una por cliente y por mes | 25756 |
| Recibo de caja | Registro del pago | 35651 |

- Dispositores finales vistos en el acta: **Incihuila S.A.S E.S.P** y **Sur Ambiental S.A.S**.

## 3. Cómo cuadran los datos (ejemplo Cofema, septiembre 2026)

**Unidad de dato = la visita.** Columnas de la planilla por visita: día, hora, kg total, BIO / CORTO / ANATO / ANIMAL, CORROS / EXPLOS / REACT / TOX, RAEES, nº de bolsas, nº de guardianes, responsable de la entrega, funcionario de Comserva, placa.

| Visita | Biológicos (kg) | Anatomopatológicos (kg) | RAEES (kg) | Total (kg) |
|---|---|---|---|---|
| Día 5 | 39,35 | 35,6 | 0 | 74,95 |
| Día 12 | 41,7 | 61,8 | 0 | 103,5 |
| Día 19 | 0 | 77,4 | 67,5 | 144,9 |
| Día 22 | 40,3 | 50,2 | 0 | 90,5 |
| **Total** | **121,35** | **225** | **67,5** | **413,85** |

Factura FVE 25756 (23 sep 2026):

| Concepto | Cantidad | Unitario | Valor |
|---|---|---|---|
| Valor básico mensual | 1 | $74.790 | $74.790 |
| Kilos adicionales | 393,85 | $4.600 | $1.811.710 |
| Subtotal | | | $1.886.500 |
| IVA 19% | | | $358.435 |
| **Total** | | | **$2.244.935** |

- Los kg del acta, de la planilla y de la factura coinciden (413,85).
- **Deducción por confirmar:** el básico cubre 20 kg (413,85 − 393,85).

## 4. Reglas de tarifa y facturación

- Tarifa por cliente: **base mensual + kilos incluidos (tolerancia) + valor del kilo adicional + IVA 19%**.
- Modelo de contrato: tolerancia de 6 kg, $4.000 por kg adicional, visita cada 15 días, duración 12 meses, permanencia 12 meses. Pago en los primeros 10 días del mes siguiente. La factura de muestra tiene crédito a 30 días, así que hay que aclarar cuál aplica.
- Calendario: se empieza a facturar hacia el día 20, la plataforma cierra el día 26 y el acta se entrega el día 30 si el cliente está al día.
- **Necesidad real hacia Helisa:** una **factura mensual consolidada por cliente**. No son asientos contables por cada RH. Para subir una factura no hacen falta cuentas contables. El cruce del recibo de caja es otro procedimiento dentro de Helisa.

## 5. Flujo propuesto

1. El operario abre la visita en el celular y elige el cliente.
2. Registra kg por categoría, bolsas, guardianes, placa y funcionario.
3. El responsable del cliente y el operario firman en la pantalla del celular.
4. La visita queda guardada y se transmite al servidor.
5. Al cierre del mes el sistema suma las visitas por cliente y aplica la tarifa.
6. Se genera la planilla (RH) y el acta del mes.
7. Se genera el archivo plano o la integración para crear la factura en Helisa.
8. El cliente ve sus documentos en el portal. Se puede compartir por WhatsApp desde el celular.

### Modo sin señal (offline-first)

El cliente dice que casi todo es urbano, pero algunos municipios tienen señal intermitente. El offline es una red de seguridad.

- Base de datos local en el celular y **UUID por visita**.
- Cola de envío con reintentos. Se transmite sola cuando detecta conexión.
- Lo firmado es inmutable, así que casi no hay conflictos.
- **Consecutivos sin conexión:** rangos reservados por operario o números provisionales (decisión pendiente).
- Las fotos se suben aparte. Se guarda hora del dispositivo y del servidor.
- Datos pendientes cifrados en el celular.
- Estados visibles: borrador, guardado en celular, transmitido, rechazado.

## 6. Helisa: lo que sabemos y lo que falta

- **Helisa** (Proasistemas S.A., desde 1988). Productos: Norma Internacional (escritorio), Cloud Básico/Estándar/Plus, Nómina, PH/Colegios, POS. Factura electrónica con validación DIAN.
- **Camino que espera el cliente:** archivo plano (Excel .xls) por Transferencia de Datos. El formato lo debe enviar Camilo, vía "Hernando". Aún no llega.
- **Helisa Conekta:** servicio web de pago ($211.680/mes según la página oficial, modificada el 4 feb 2026). Solo funciona con Norma Internacional. Permite insertar documentos, clientes y terceros, y leer cartera, saldos, balance y detalle de facturas electrónicas.
- **Por confirmar:** versión de Helisa, si la importación crea facturas o solo asientos, y si los terceros nuevos deben existir antes.

## 7. Viabilidad

**Viable, por fases. Ningún componente es técnicamente imposible.**

| Componente | Esfuerzo | Nota |
|---|---|---|
| App móvil con firma en pantalla | Medio | La aceptación legal se debe confirmar |
| Offline y sincronización | Medio | Patrón estándar |
| Panel web y reportes (RH, acta) | Medio | Los formatos ya existen |
| Portal de clientes | Bajo a medio | |
| Facturación mensual consolidada | Medio | Depende de las reglas de tarifa |
| Interfaz con Helisa | Medio a alto | Depende de formato y versión |
| WhatsApp automático | Medio | API oficial de Meta, con posible costo por mensaje (sin verificar) |

**Riesgos principales:** (1) formato y versión de Helisa; (2) aceptación de la firma en pantalla por la autoridad ambiental y los clientes.
**Firma electrónica:** la Ley 527 de 1999 art. 7 y el Decreto 2364 de 2012 la reconocen si el método es confiable y apropiado.

**Fases sugeridas:** 0) definición con Lucrecia y Helisa; 1) app, planilla y acta; 2) facturación consolidada e interfaz con Helisa; 3) portal, WhatsApp y mejoras. El cliente mencionó un "mínimo de tres meses". No hay fechas ni precio acordados.

**Tecnología (sin decisión):** PWA con Vue, .NET MAUI o Flutter.

## 8. Preguntas abiertas

**Con Lucrecia (facturación en Helisa):**
- ¿Cómo arma hoy la factura mensual y de dónde saca los kilos?
- ¿Dónde están las tarifas de cada cliente? ¿Todos tienen base, tolerancia y kilo adicional?
- ¿Cuál es el corte exacto y qué pasa con las visitas posteriores?
- ¿Crédito a 30 días o pago en los primeros 10 días?
- ¿Cómo cruza el recibo de caja y contra qué documento?
- ¿Qué versión de Helisa usan? ¿Cómo crean un cliente nuevo?

**Con gerencia y autoridad ambiental:**
- ¿Aceptan CORPOAMAZONIA y los clientes la firma en pantalla?
- ¿Cómo se manejan los consecutivos de la planilla y el acta?
- ¿WhatsApp automático o compartir desde el celular?

**Con Helisa / Camilo:**
- Estructura del archivo plano de importación.
- Si se justifica Conekta o basta el archivo plano.

## 9. Próximos pasos

- Sesión con Lucrecia, con pantalla compartida y una factura real. Existe la guía en PDF.
- Recibir el formato de importación de Camilo.
- Pasar los datos de cada visita, tarifas por cliente y reglas de corte a la propuesta.
- Enviar la propuesta cuando haya esa información. Sin fechas ni precio antes.

## Fuentes

- Página oficial de Helisa Conekta (Proasistemas).
- Decreto 2364 de 2012 y Ley 527 de 1999.
- Documentos del cliente: modelo de contrato, formatos de RH, acta, factura y recibo de caja.
- Grabación y transcripción de la reunión del 16 oct 2026. La transcripción gratuita se cortó en el minuto 29:57, así que falta el último minuto.
