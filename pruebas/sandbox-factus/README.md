# Prueba de la propuesta B en el sandbox de Factus (API V2)

**Fecha:** 23 de octubre de 2026 · **Resultado:** la factura de Cofema de septiembre se emitió y validó en el sandbox; se consultó, se descargó el PDF, se comprobó la idempotencia y se anuló con nota crédito.

Factus envió el 23 de octubre dos correos (`activacion@factus.com.co`): uno con las credenciales del sandbox V2, la colección de Postman y la tabla de paquetes, y otro con los documentos para activar la alianza (RUT, cámara de comercio, cédula del representante legal, comprobante de pago, versión v1/v2) y los datos de pago. Las imágenes y el PDF de términos quedaron en `DocumentacionAPIFACTUS/`.

## Cómo correr la prueba

Las credenciales se leen del entorno y **no** se guardan en el repositorio.

```bash
export FACTUS_CLIENT_ID="..." FACTUS_CLIENT_SECRET="..." FACTUS_USER="..." FACTUS_PASS="..."
python3 prueba_cofema_factus.py
```

## Qué hace el script

| Paso | Llamada | Resultado del 23 oct |
|---|---|---|
| 0 | `POST /oauth/token` (password grant) | 200 · token de 1 hora |
| 1 | `GET /v2/numbering-ranges` | 200 · factura: rango 389 `SETP`; nota crédito: rango 1776 `CRTE` |
| 2 | `POST /v2/bills/validate` con la factura de Cofema (RH 22690-26) | **201 · `SETP990030555` validada**, CUFE, QR de la DIAN de habilitación y URL pública |
| 3 | `GET /v2/bills/SETP990030555` | 200 |
| 4 | `GET /v2/bills/download-pdf/SETP990030555` | 200 · `evidencia/05_factura_cofema.pdf` |
| 5 | Mismo `reference_code` otra vez | 201 · devuelve la **misma** factura (idempotencia) |
| 6 | `POST /v2/credit-notes/validate` (anulación, concepto 2) | **201 · `CRTE1194` validada**, enlazada a la factura |
| 6b | `GET /v2/credit-notes/CRTE1194/download-pdf` | 200 · `evidencia/07_nota_credito_CRTE1194.pdf` (CUDE y QR de la DIAN) |
| 7 | Factura sin identificación del cliente | 422 con el campo señalado |

Totales calculados por Factus: bruto $1.886.500 · IVA $358.435 · **total $2.244.935**, iguales a los del RH.

## Lo que se aprendió (va al levantamiento y al SPEC)

- **Cloudflare bloquea el user-agent por defecto de Python** (error 1010). Hay que enviar un `User-Agent` propio; con él todo responde.
- Las listas vienen envueltas en `data.data` (rangos, facturas), no en `data`.
- La nota crédito referencia la factura con `bill_number` (el número `SETP…`), no con un id interno. La DIAN de pruebas devuelve notificaciones (FAJ43b/FAJ44b: razón social distinta al RUT; CBF02; RUT01) que **no** impiden la validación; en producción con el NIT real de Cofema no aparecerán.
- El sandbox es **compartido** entre todos los aliados: los consecutivos `SETP` y `CRTE` los asigna Factus y la empresa emisora es "FACTUS V2" (NIT 1000789002). Los documentos no llegan a la DIAN real.
- El kilogramo se puede facturar con unidad `KGM` y el básico con `94` (unidad).
- `send_email: false` evita que el sandbox intente enviar correo al cliente.

## Precios recibidos (plan anual, conexión API, 1 NIT, 2026)

150 documentos $169.000 · 400 documentos $190.000 · 1.600 documentos $220.000 · 2.500 documentos $260.000 · 5.000 documentos $290.000 (incluye notas crédito/débito, documento soporte y nota de ajuste; rangos de numeración ilimitados). Comserva factura ≈ 12 clientes al mes, así que el plan de **150 o 400 documentos** alcanza.

## Evidencia

`evidencia/` guarda las peticiones y respuestas en JSON (el token va recortado), el PDF de la factura y `99_resumen.json`.
