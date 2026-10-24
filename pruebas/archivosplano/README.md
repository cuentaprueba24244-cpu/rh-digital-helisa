# Estructuras de Helisa enviadas por Julio (23 de octubre de 2026)

`Plano pedido.xlsx` es el archivo que Julio (contabilidad y Helisa de Comserva) envió el 23 de octubre con las tres hojas que faltaban para cerrar la propuesta A. Reemplaza lo que se había supuesto a partir de la pantalla del 21 de octubre.

## Hoja «Plano Pedidos» · el pedido OP (24 columnas)

| # | Columna | Qué va | Ejemplo de Julio |
|---|---|---|---|
| 1 | TIPO | `OP` (pedido) | OP |
| 2 | NUMERO | Consecutivo del pedido dentro del archivo; todas las líneas de un pedido repiten el número | 1, 2 |
| 3 | FECHA | Fecha del pedido (celda de fecha) | 01/01/2026 |
| 4 | IDENTIDAD CLIENTE | NIT o cédula del cliente, sin DV | 900215950 |
| 5 | CÓDIGO DEL CLIENTE | Código del cliente o de la sede en Helisa (vacío si es el mismo NIT) | vacío |
| 6 | IDENTIDAD VENDEDOR | NIT de Comserva | 828002730 |
| 7 | TIPO CONCEPTO | `2` servicio · `3` comentario | 2 / 3 |
| 8 | CODIGO CONCEPTO | Código del servicio en la cartilla (`2` básico, `3` kilos adicionales) | 2 |
| 9–11 | CODIGO UNIDAD, REFERENCIA, CODIGO BARRAS | Vacíos | |
| 12 | ARTÍCULO/SERVICIO | Nombre del servicio o texto del comentario | RECOLEC. TRANSP Y DISPOS. FINAL RESIDUOS BIOLOGICOS · SERVICIO ESPECIAL DE ASEO PRESTADO MES DE AGOSTO 2026 |
| 13 | CODIGO BODEGA | Vacío | |
| 14 | LISTA DE PRECIO | Lista del cliente (1 a 7) | 3, 1 |
| 15 | CANTIDAD | 1 para el básico; kilos adicionales | 1 |
| 16 | VALOR UNITARIO | Valor del básico o precio del kilo | 80000, 25000 |
| 17 | VALOR TOTAL | Vacío: Helisa multiplica | |
| 18–21 | Descuentos | Vacíos | |
| 22 | Centro de costo | `0101` (texto) | 0101 |
| 23–24 | CÓDIGO NEGOCIO, Obsequio | Vacíos | |

Cada pedido lleva una línea tipo 2 por servicio y una línea tipo 3 con el comentario del mes. La línea de comentario deja vacías lista, cantidad y valor.

## Hoja «Servicios» · cartilla y listas de precios

Siete listas de precios, todas con los mismos códigos de servicio (57): **1** BASICA 25000 (básico 25.000, kilo 3.850), **2** BASICA 30000 (30.000 / 4.000), **3** ESPECIAL 80000, **4** ESPECIAL 42000, **5** ESPECIAL 110000, **6** TARIFA ESPECIAL 2 y **7** TARIFA ESPECIAL 3 (en las especiales el precio es 0 y va en el pedido). Códigos que usa el servicio de residuos: **2** RECOLEC. TRANSP Y DISPOS. FINAL RESIDUOS BIOLOGICOS (IVA 19 %), **3** KILOGRAMOS ADICIONALES (IVA 19 %), 4 a 21 categorías por kilo (anatomopatológicos, biosanitarios, cortopunzantes, tóxicos, medicamentos, animales, biológicos…), **54** RECOLEC. … EXENTO (sin IVA). El código 1 dice «NO USAR».

Consecuencia: Cofema (básico 74.790 y kilo 4.600) no coincide con ninguna lista básica, así que va con una lista especial y el valor unitario en el pedido.

## Hoja «Plano Recibos» · el recibo RC (17 columnas, 4 filas por recibo)

| # | Columna | Fila caja F | Fila caja N | Fila cartera F | Fila cartera N |
|---|---|---|---|---|---|
| 1 | TIPO | RC | RC | RC | RC |
| 2 | FECHA | fecha del recibo | | | |
| 3 | NUMERO DE DOC. | número del recibo (formato 8 dígitos) | | | |
| 4 | CUENTA | 11050501 | 111050501 | 13050501 | 112050501 |
| 5 | CONCEPTO | PAGO FACTURA FEV 1125 | | | |
| 6 | CENTRO | vacío | | | |
| 7 | VALOR | valor del recibo | | | |
| 8 | NATURALEZA | D | D | C | C |
| 9 | INDENTIDAD TERCERO | NIT del cliente | | | |
| 10 | CUENTA BANCARIA | vacío (efectivo) | | | |
| 11 | ID VENDEDDOR / COBRADOR | | | 828002730 | |
| 12 | FECHA CHEQUE | vacío | | | |
| 13 | CLASE MOV. | F | N | F | N |
| 14 | IND. A AFECTAR | 1 | 1 | 2 | 2 |
| 15 | TIPO DE DOCUMENTO QUE AFECTA | | | FEV | |
| 16 | NUMERO DE DOCUMENTO QUE AFECTA | | | 1125 | |
| 17 | CUOTA QUE AFECTA | | | 1 | |

Los títulos se copian tal cual, con sus erratas («INDENTIDAD», «VENDEDDOR»), porque son los que Helisa espera.

## Qué se actualizó con esto

- Mockups v6: plantillas **PED v2** (24 columnas, tipo OP) y **RC v2** (17 columnas, 4 filas), cartilla y listas de precios, lista de precio por cliente, generador con numeración consecutiva del pedido y cruce solo en la fila de cartera F.
- Flujos v6 (general y propuesta A), levantamiento v6 (12.1, 12.2, HEL-01, HEL-02, preguntas) y anexo SQL v6.
- `salida/`: dos Excel de ejemplo generados con esas plantillas (pedido de Cofema de septiembre y recibo 35686) para que Julio los importe en una empresa de pruebas.

## Por confirmar con Julio

1. Prefijo de la factura en el cruce: su ejemplo dice **FEV**; las facturas de Comserva que tenemos dicen **FVE 25756**. Hay que usar el prefijo exacto de Helisa.
2. Si el código del cliente va vacío cuando es el mismo NIT (como en su ejemplo) o siempre con el código de la cartilla.
3. Qué lista de precio tiene cada cliente y cuáles son «especiales» (precio en el pedido).
4. Cuentas 111050501 y 112050501 del libro N (parecen caja y cartera NIIF): confirmar con el contador.
5. Pago por transferencia: cuenta de bancos en lugar de 11050501 y la CUENTA BANCARIA.
