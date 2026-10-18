# RH digital + Helisa (Comserva)

Contexto completo del proyecto al **18 de octubre de 2026** (tarde). El documento vigente es el **Levantamiento de requerimientos v4**, acompañado de la arquitectura técnica, el esquema de base de datos, la especificación de desarrollo, los mockups navegables de la fase 1 y la estimación interna de tiempo y costo.

**Estado:** levantamiento terminado (v4). La fase 1 se puede empezar ya con `SPEC.md`. La fase 2 espera la sesión con Lucrecia, la confirmación escrita de Helisa sobre importaciones y la consulta a CORPOAMAZONIA. No hay fechas ni precio comprometidos con el cliente; la propuesta sale después de la sesión con Lucrecia.

## Documentos del proyecto

| Documento | Fecha | Ruta y enlace | Uso |
| --- | --- | --- | --- |
| **Levantamiento de requerimientos v4** | 18 oct 2026 | `levantamiento requerimientos/Levantamiento de requerimientos Comserva (v4).pdf` (50 páginas) · HTML en la misma carpeta · artefacto: https://claude.ai/artifact/GoW6Grc9iyEjPPTtnWMXdW | **Documento vigente.** Marco normativo, procesos, estados, sin señal, modelo de datos, reglas, Helisa, requerimientos renumerados (APP/OFI/CAJ/CIE/HEL/DOC/POR/REP/RNF), aceptación, fases, decisiones, parte comercial, preguntas |
| **Arquitectura técnica v1** | 18 oct 2026 | `arquitectura/Arquitectura tecnica Comserva (v1).md` y `.pdf` | Stack (Expo + TypeScript, NestJS, PostgreSQL 18, React, Gotenberg, R2, Coolify), componentes, sincronización, API, procesos, seguridad, conservación, despliegue, costos, decisiones |
| **Esquema de base de datos** | 18 oct 2026 | `arquitectura/schema.sql` | 49 tablas, tipos, triggers de inmutabilidad, `fn_liquidar`, vistas de pre-cierre y semilla mínima. Ejecutable en PostgreSQL 18; validado sintácticamente |
| **SPEC.md** | 18 oct 2026 | `SPEC.md` | Especificación de desarrollo de la fase 1: `CLAUDE.md` propuesto, entregables, semilla, épicas A–H con criterios, contratos de la API, plantillas, definición de terminado, plan por semanas y reparto por cuentas de Claude |
| **Mockups de la fase 1** | 18 oct 2026 | `mockups/index.html` (abrir en el navegador) · artefacto: https://claude.ai/artifact/8u5N5J7ZtXVQp1MDuGt4X9 | App del operario (16 pantallas), panel de oficina (6 páginas), documentos PDF (5) y portal (anticipo fase 2), con datos de prueba y los números reales de Cofema |
| **Estimación de tiempo y costo v1** (interna) | 18 oct 2026 | `estimacion/Estimación de tiempo y costo (v1).md` y `.pdf` | Horas por épica, calendario según dedicación y cuentas de Claude, tres escenarios de precio en COP, neto, forma de pago, argumentos. **No se entrega al cliente** |
| Levantamiento v3 | 18 oct 2026 (mañana) | `levantamiento requerimientos/Levantamiento de requerimientos Comserva (v3).pdf` · https://claude.ai/code/artifact/9c420555-8b5b-4b9c-9d1e-15b12c6445d5 | Reemplazado por la v4 |
| Levantamiento v2 | 18 oct 2026 | `levantamiento requerimientos/Levantamiento de requerimientos Comserva (v2).pdf` · https://claude.ai/code/artifact/226dc5a9-ea3a-449d-a464-c657335f2d69 | Histórico |
| Borrador v1 | 16 oct 2026 | `fuentes/Levantamiento de requerimientos – Digitalización documental COMSERVA.pdf` | Histórico; tenía errores (visita del día 11, catálogo incompleto) |
| Resumen vivo del proyecto | 18 oct 2026 | `fuentes/proyecto_rh_digital_helisa.md` · https://claude.ai/artifact/PAVYByXAh3AnkKPzHFV8Ph | Resumen anterior a la v4; la v4 lo supera |
| Guía de sesión con Lucrecia | 16 oct 2026 | `fuentes/guia_sesion_lucrecia_helisa.pdf` | Preguntas y material para la sesión en pantalla compartida; complementar con la sección 21 de la v4 |
| Especificación del 15 oct, guía y guion de la primera reunión, propuesta de Integrasoft | 15–16 oct 2026 | Estaban en Descargas; ya no se encontraron allí el 18 oct por la tarde (el texto extraído de los cuatro sirvió de insumo para la v4 y la estimación) | Históricos |

## Qué cambió el 18 de octubre por la tarde (v4 frente a v3)

- **Normativa:** la Resolución 591 de 2024 derogó la Resolución 1164 de 2002 (origen del formulario RHPS). Su Manual define el *comprobante de recolección* (campos a–k) y el *certificado del gestor* (i–viii). La constancia y el acta se rediseñan con esos campos. Conservación: 5 años (ambiental), 10 (contable). Máximo 15 kg por bolsa (no 6). Conductores con certificado de mercancías peligrosas.
- **Helisa:** el camino B (importar facturas) no tiene soporte documental; se descarta salvo confirmación escrita. Camino A reforzado en fase 1 (reporte en el orden de la pantalla de ventas + captura del FVE); camino C en fase 2 solo para recibos de caja y terceros; Conekta opcional (≈ $4,7 M/año con hosting).
- **Cierre por cliente** desde el día 20 y general el 26; pre-cierre con bloqueos; estados abierto → cerrado → facturado; visitas fuera de cierre; ajustes a periodos facturados.
- **Visita con tres resultados** (recolección, sin residuos, fallida); jornada con vehículo, conductor y auxiliar; pesadas múltiples; novedades; responsables autorizados; resultados de firma.
- **Sedes** por cliente; **recibo de caja** independiente con tipo y aplicación a facturas; **entrega de efectivo** en fase 1; alerta a 100 UVT.
- **Documentos:** un solo archivo oficial (constancia y recibo en el celular; planilla, acta y reportes en el servidor); verificación por QR y correo automático desde la fase 1.
- **Series:** planilla continúa 22642-26; constancia serie nueva por rangos de dispositivo; recibo 35652; acta 25677; sin números provisionales.
- **Comercial:** alcance y exclusiones, entregables, aceptación con piloto en paralelo, garantía, soporte, propiedad intelectual, costos recurrentes a nombre de Comserva.
- **Tecnología:** Expo (React Native) + TypeScript de punta a punta; NestJS + Drizzle + PostgreSQL 18; React + Vite; Gotenberg; Cloudflare R2; un VPS con Coolify. Flutter sigue siendo válida si el equipo la domina.

## Mockups (fase 1)

Abrir `mockups/index.html` en el navegador (o servirlos con `python3 -m http.server 8765 --directory mockups`). Todo se renderiza desde `mockups/assets/data.js`, que contiene la fórmula de liquidación y reproduce los números reales de Cofema (413,85 kg y $2.244.935).

| Carpeta | Contenido |
| --- | --- |
| `app/` | App del operario: inicio de sesión, inicio de jornada, hoy, elegir sede, visita en cuatro pasos (kilos, evidencia, firmas, confirmar), constancia, visita sin residuos, visita fallida, recibo de caja, historial, detalle, sincronización, cliente nuevo, más. Interruptor «Simular sin señal» |
| `panel/` | Inicio, visitas (bandeja, detalle, anulación), recaudo, cierre del periodo (septiembre cerrado con validación contra la FVE 25756; octubre abierto con pre-cierre), clientes y tarifas, catálogos y parámetros (categorías, dispositores, operarios, vehículos, empresa, parámetros, consecutivos, usuarios y permisos, auditoría) |
| `documentos/` | Constancia de visita, planilla mensual RHPS, recibo de caja, reporte de cierre (camino A) y acta (anticipo fase 2), con QR y hash |
| `portal/` | Anticipo del portal del cliente (Cofema al día, IPS Salud Vital en mora) y página de verificación por código |

Pendiente de alinear con la v4 en los mockups del panel: la entrega de efectivo (CAJ-02) y las visitas fuera de cierre (CIE-06) aparecen descritas en la v4 y el SPEC, pero el panel de recaudo y el de cierre todavía las muestran de forma simplificada.

## Cliente y personas

- **Comserva** (Comercializadora de Servicios Varios S.A.S.), NIT 828.002.730-1, Florencia (Caquetá). Licencia CORPOAMAZONIA, Resolución 0038 del 23 de enero de 2006. Gerente: Diego Alfonso Cartagena Mayorquín. Lucrecia: facturación y cartera en Helisa. Camilo: soporte de Helisa. Dispositores: Incihuila S.A.S E.S.P. y Sur Ambiental S.A.S. Tres usuarios internos.
- **Equipo:** Adrián, Hernando y una tercera persona; dos cuentas Claude Pro y una Claude Max.

## Cómo funciona (en corto)

La **visita** es la única captura: kilos por categoría, bolsas, guardianes, firmas, GPS y hora; nunca valor en pesos. Tres resultados: recolección, sin residuos, fallida. El **cierre del cliente** (desde el día 20 o el 26) suma una sola vez y de ahí salen la planilla mensual, la liquidación (`total = (básico + máx(0, kg − incluidos) × precio) × (1 + IVA)`), el reporte para Helisa y, en fase 2, el acta. Lo firmado no se edita: se anula con motivo. El NIT es la llave del cliente; la visita apunta a una sede. Sin señal: base local cifrada, UUID por visita, bloques de consecutivos por dispositivo, cola idempotente.

## Fases

| Fase | Contenido | ¿Se puede empezar? |
| --- | --- | --- |
| 0. Definición (en paralelo) | Sesión con Lucrecia, acta de definición, consultas a Helisa y CORPOAMAZONIA, prototipo validado, cuentas a nombre de Comserva | Sí |
| 1. Campo y oficina | App, panel, recibo y entrega de efectivo, cierre, planilla, reporte A, correo automático, verificación QR, piloto en paralelo | **Sí, ya (SPEC.md)** |
| 2. Acta, portal y Helisa | Acta con firma del gerente, pagos y cartera, portal, archivo C o Conekta, ajustes, reporte ambiental | Espera fase 0 |
| 3. Caja y mensajería | Cierre de caja formal, WhatsApp API, reportes, entregas a dispositores | Después del piloto |

## Estimación (interna, ver `estimacion/`)

Fase 0 + 1 ≈ 500 h; fase 2 ≈ 200 h; fase 3 ≈ 110 h. A tiempo parcial (15 h por semana cada uno) la fase 1 está en piloto en 12 semanas y aceptada en 16; a tiempo completo, en 7 más el piloto. Precio recomendado: $30 M (fase 0 + 1), $12 M (fase 2), $7 M (fase 3) = $49 M sin IVA; mínimo defendible $32,5 M; precio de lista $69,5 M. 15–20 M es el piso para la fase 1 sola y es bajo para el proyecto completo.

## Pendientes

**Con Lucrecia:** cómo factura (por cliente desde el 20 o todo el 26), orden de la pantalla de ventas de Helisa, versión de Helisa y asistente de importación, tarifas y esquemas, IVA y retenciones, recibo definitivo y cuentas, notas crédito, cómo exporta la cartera.

**Con la gerencia:** sufijo «-26», series y hojas anuladas, exigencias de CORPOAMAZONIA y asesor ambiental, Animales y Explosivos, dirección oficial, sedes, celulares, firma por lote y suplente, piloto en paralelo, política de datos, dominio, certificados de conductores, costo-beneficio, soporte.

**Con Camilo o Helisa (por escrito):** importación de documentos de venta, plantilla del asistente e importación de prueba, Conekta.

**Insumos para arrancar:** clientes y sedes con tarifa (plantilla Excel), operarios y certificados, placas, celulares, últimos consecutivos en papel, logo y textos legales, dirección y cuentas bancarias, día de corte, dominio y tarjeta para cuentas.

## Historial

- **15 oct 2026:** especificación inicial (suponía valor en pesos por RH y un asiento por RH; corregido).
- **16 oct 2026:** reunión de descubrimiento; borrador v1, resumen y guía de sesión.
- **18 oct 2026 (mañana):** formatos, contrato modelo, CSV de Helisa y transcripción; v2 y v3.
- **18 oct 2026 (tarde):** investigación con fuentes oficiales (Helisa, normativa, mensajería, tecnología, mercado, planes de Claude), tres revisiones independientes de la v3, **v4**, arquitectura v1, schema.sql, SPEC.md, mockups de la fase 1, estimación v1.
