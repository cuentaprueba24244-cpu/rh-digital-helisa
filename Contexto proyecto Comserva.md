# Contexto del proyecto Comserva · RH digital + Helisa

**Actualizado: 25 de octubre de 2026.** Este documento resume el proyecto completo para cualquier persona del equipo, o para una sesión nueva de Claude, que necesite ponerse al día sin leerlo todo. El detalle está en los documentos que se citan.

---

## 1. Resumen en un párrafo

Comserva S.A.S. recolecta residuos hospitalarios en Florencia (Caquetá). Hoy lleva en papel la constancia de cada visita, la planilla mensual RH y el recibo de caja, y Lucrecia factura y lleva la cartera en **Helisa**. El proyecto es **RH digital**: una app para el operario, en la que la visita es la única captura (kilos, firmas, fotos y GPS), y un panel web que cierra el periodo de cada cliente, liquida la tarifa, genera la planilla RH con valores y conecta con Helisa. El 21 de octubre de 2026 se supo que **Helisa no importa facturas sino pedidos**, y que la factura electrónica se sigue haciendo una a una. Por eso hay **dos caminos**:

- **Propuesta 1:** el sistema llega hasta Helisa con archivos de pedidos y de recibos, o con la API Conekta.
- **Propuesta 2:** el sistema emite la factura electrónica con un proveedor tecnológico, y Helisa queda solo para la contabilidad.

La recomendación del equipo es hacerlo **por fases**: primero la Propuesta 1 con un piloto y, si Comserva lo ve viable, la facturación electrónica.

## 2. Cliente y personas

| Quién | Rol |
| --- | --- |
| **Comserva S.A.S.** (Comercializadora de Servicios Varios), NIT 828.002.730-1, Florencia | Cliente. Licencia de CORPOAMAZONIA, Resolución 0038 de 2006 |
| Diego | Gerente |
| Lucrecia | Facturación y cartera en Helisa |
| Julio | Contabilidad y Helisa de Comserva. Mostró Helisa el 21 de octubre y el 23 envió las estructuras del pedido y del recibo |
| Camilo | Soporte de Helisa (si sigue: por confirmar) |
| «La gerente» o «el ingeniero Ballesteros» | Quien decide al final (identidad por confirmar) |
| Dispositores | Incihuila S.A.S. E.S.P. y Sur Ambiental S.A.S. |

**Equipo:** Adrián (administrador del repositorio), Ronaldo Ballesteros (`Siuu70`), Cristian Avilés (presentó el flujo el 21 de octubre; probablemente es la cuenta `xXavilesXx`, por confirmar) y Hernando. Trabajan con dos cuentas Claude Pro y una Max.

## 3. Cómo funciona el sistema (común a las dos propuestas)

1. **Visita:** el operario registra en el celular los kilos por categoría, las bolsas, las firmas, la foto y el GPS, aunque no haya señal. Nunca registra pesos. La visita tiene tres resultados posibles: recolección, sin residuos o fallida. El cliente recibe la **constancia** en PDF.
2. **Cierre del cliente**, desde el día 20 o el 26: suma el periodo una sola vez y produce la **planilla RH** con la liquidación.
3. **Tarifas:** hay tres formas de cobro. Básico más kilos incluidos y kilos adicionales (Cofema: 413,85 kg → **$2.244.935**, FVE 25756). Solo por kilo (108,50 kg × $3.991,60 + IVA 19 % = **$515.375,43**, FVE 25997). Fijo mensual ($25.000 o $30.000 más IVA).
4. **Facturación:** cambia según la propuesta (sección 5).
5. **Recibo de caja:** solo se emite si hay factura; sale como **movimiento contable** para Helisa, con cartera 1305 contra caja o bancos, en dos libros y con la factura que se cruza.
6. **Trazabilidad:** cada eslabón deja su documento enlazado, con estado, fecha, usuario y huella. La cadena va de la visita a la constancia, el cierre, la planilla RH, el pedido o la factura, la FVE, el recibo y el cruce.

Reglas que no se rompen:
- Lo firmado no se edita: se anula con motivo.
- El NIT es la llave del cliente, y la visita apunta a una sede.
- Sin señal: base local cifrada y consecutivos por dispositivo.

## 4. Lo que se sabe de Helisa (confirmado)

- **Versión 4.12.2.0** por TSplus, en la nube de Helisa, dentro de una instalación de Julio con unas 20 empresas.
- **Pedido OP**, según el Excel de Julio del 23 de octubre (`pruebas/archivosplano/`):
  - 24 columnas con fila de títulos.
  - TIPO `OP`, NIT sin DV, vendedor 828002730, centro de costo `0101`.
  - Tipo de concepto 2 (servicio) o 3 (comentario).
  - Códigos de concepto: **2** básico, **3** kilos adicionales, **54** exento; 4 a 21 son categorías por kilo.
  - Siete listas de precio: 1 BASICA 25000 (kilo $3.850); 2 BASICA 30000 (kilo $4.000); 3 a 7 especiales, con el valor en el pedido.
  - El pedido no lleva cuentas ni IVA.
- **Después de importar:** Lucrecia hace **cada factura a mano** llamando el pedido con **F3** (en algunos documentos dice F5 por un error de transcripción).
- **El documento Pedido no está habilitado** todavía en el Helisa de Comserva.
- **Recibo RC:** 17 columnas y 4 filas por recibo.
  - Caja: 11050501 (F) y 111050501 (N).
  - Cartera: 13050501 (F) y 112050501 (N).
  - El cruce y el cobrador van en la fila de cartera F.
- **Helisa Conekta (API):** $211.680 al mes según helisa.com, más el hosting de Helisa. Inserta pedidos y recibos y lee facturas y cartera. **No emite facturas.**
- **Volumen:** unas 240 facturas en 4 semanas según el consecutivo (incluye todo lo que factura Comserva; por confirmar).

## 5. Las dos propuestas y la recomendación

| | Propuesta 1 · hasta Helisa | Propuesta 2 · facturación electrónica |
| --- | --- | --- |
| Qué hace el sistema | Archivo de pedidos y de recibos, o envío por Conekta. Registra la FVE y la valida contra el RH | Emite la factura por medio de un proveedor tecnológico (CUFE, PDF, correo, RADIAN, notas crédito). Lleva a Helisa los asientos de facturas y recibos |
| Lo que queda manual | Lucrecia hace cada factura en Helisa | Revisar y aprobar la prefactura |
| Proveedor | — | **Factus**, ya probado en sandbox el 23 de octubre (factura de Cofema con CUFE y nota crédito). Alternativas por cotizar: Plemsi, Dataico y MATIAS. La habilitación de Factus ante la DIAN no está verificada |
| Tiempo (3 personas a tiempo parcial) | ≈ 18 semanas con piloto | ≈ 28 por fases · ≈ 24 contratada completa |
| Horas (interno) | 630 h (700 con Conekta) | 870 h (Fase 2 = 240 h) |

**Fases v6:**
- Fase 0: definición.
- Fase 1 = Propuesta 1, con piloto de un ciclo.
- Compuerta: Comserva decide con datos reales.
- Fase 2: facturación electrónica.
- Complementos: C1 (acta y portal) y C2 (caja formal y mensajería).
- Hacerla con software propio ante la DIAN no se recomienda: serían 400–600 h.

**Precio** (interno, tarifa recomendada de $60.000 la hora, sin IVA): Fase 0 + 1 ≈ $37,8 M; Conekta ≈ $4,2 M; Fase 2 ≈ $14,4 M. La propuesta económica para el cliente es la de Avilés (`propuesta/`) y cuadra con estas cifras. El usuario cree que Comserva pagaría unos 10 M: la estimación v2 explica qué alcance cabe con 10–15 M.

## 6. Qué hay en el repositorio

Repositorio **público**: https://github.com/cuentaprueba24244-cpu/rh-digital-helisa (rama `main`).

| Carpeta o archivo | De quién | Qué es |
| --- | --- | --- |
| `v6 adrian/` | Adrián | La v6 en Propuesta 1 y Propuesta 2: levantamientos, flujos, mockups con trazabilidad, cambios para el desarrollo, comparativo para el cliente, estimación v2 interna y la reunión del 21 de octubre (resumen con imágenes y preguntas). Complementada el 25 de octubre con lo de Ronaldo y Avilés |
| `levantamiento requerimientos/…(v6)`, `mockups_v6/`, `reunion/Flujo…(v6)`, `arquitectura/schema_v6_pedido_recibo.sql` | Ronaldo | Su v6 con Propuesta A (= 1) y B (= 2, con Factus) |
| `pruebas/` y `DocumentacionAPIFACTUS/` | Ronaldo | Excel real de Julio, ejemplos de salida y pruebas en los sandbox de Factus y MATIAS (este último no se pudo probar por un error de token), más precios y términos de Factus |
| `propuesta/` | Avilés | Flujo comparativo P1 y P2, costos detallados (interno) y propuesta económica comparativa para Comserva |
| `levantamiento requerimientos/` v2–v5, `mockups/`, `mockups_v5/`, `arquitectura/`, `SPEC.md`, `estimacion/` | — | Versiones anteriores y base técnica. **`SPEC.md` sigue en la v1.1 (base v5)**: falta pasarle los cambios de la v6 |
| `fuentes/` | — | Formatos del cliente (factura, RH, recibo, acta), CSV de Helisa, contrato modelo y la primera transcripción |

**Stack:** Expo + TypeScript (app); NestJS + Drizzle + PostgreSQL 18 (API); React + Vite (panel); Gotenberg (PDF); Cloudflare R2; un VPS con Coolify.

## 7. Pendientes

- **Resultado de la reunión del viernes 23 de octubre:** no está registrado en ningún archivo. Hay que anotar qué propuesta prefirió Comserva y qué se acordó.
- **Unificar las dos v6** (la de Adrián y la de Ronaldo) en una sola versión para el cliente, con un mismo mensaje: por fases, con Factus como primer proveedor a cotizar.
- **Fase 0:**
  - Habilitar el documento Pedido en Helisa.
  - Confirmar el prefijo de la factura que se cruza (FEV o FVE), el código del cliente por sede, el formato final del archivo (`.xlsx`, `.xls` o `.txt`) y RC1 o RC2.
  - Confirmar el volumen real de facturas y el IVA del servicio (art. 476 num. 12, con el contador).
  - Decidir sobre Conekta.
- **Factus:** verificar su habilitación ante la DIAN, cotizar el plan (1.600 documentos a $220.000 o 5.000 a $290.000 al año, según su tabla) y revisar la observación CBF02 de la nota crédito.
- **SPEC v1.2:** incorporar los cambios para el desarrollo de la v6.
- **Privacidad (el repositorio es público):**
  - `mockups_v5/` y `mockups/` contienen datos de un cliente real y las cuentas bancarias completas de Comserva.
  - `pruebas/` trae el contacto de Cofema y una cédula en el Excel de Julio.
  - Los costos internos de `propuesta/` muestran la tarifa por hora.
  - Hay que limpiarlos o pasar el repositorio a privado. Borrarlos de los archivos no los quita del historial de Git.
- **Para arrancar:** clientes y sedes con tarifa, operarios, placas, celulares, últimos consecutivos en papel, logo, dominio y cuentas a nombre de Comserva.

## 8. Historial corto

- **15–16 oct 2026:** especificación inicial y reunión de descubrimiento.
- **18 oct:** v2, v3 y v4, arquitectura, `schema.sql`, SPEC, mockups y estimación v1.
- **19 oct:** v5 (archivos planos configurables hacia Helisa).
- **20 oct:** repositorio en GitHub; la v5 entra por el PR #1.
- **21 oct:** reunión con Comserva y Julio; se descubre que Helisa importa pedidos.
- **22 oct:**
  - v6 de Adrián (propuestas 1 y 2).
  - v6 de Ronaldo (A y B).
  - Costos de Avilés.
- **23 oct:**
  - Julio envía las estructuras.
  - Prueba de Factus en sandbox.
  - Reunión de cierre con Comserva (resultado sin registrar).
- **24 oct:**
  - Se fusiona el PR #2 de Ronaldo.
  - La v6 de Adrián pasa a `v6 adrian/`.
- **25 oct:** la v6 de Adrián se complementa con lo de Ronaldo y Avilés; se escribe este contexto.

## 9. Cómo retomar

1. `git pull` en `main`.
2. Leer este archivo, `README.md` y `v6 adrian/README.md`.
3. Mantener los IDs de requerimientos: APP-, OFI-, CAJ-, CIE-, HEL-, DOC-, POR-, REP-, RNF-, TRZ-, API- y FEV-.
4. Mantener las pruebas de regresión: Cofema ($2.244.935) y solo por kilo ($515.375,43).
5. Marcar como «por confirmar» todo lo que no haya confirmado el cliente.
6. Cada cambio va a GitHub con un commit claro.
