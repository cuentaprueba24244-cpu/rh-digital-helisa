# RH digital + Helisa (Comserva)

Contexto completo del proyecto al **22 de octubre de 2026**. Lo vigente es la **v6, en dos propuestas** (carpeta `propuesta/`), preparada después de la reunión del 21 de octubre con Comserva. Cada propuesta trae su levantamiento, su flujo de una hoja, sus mockups y sus cambios para el desarrollo. Hay además un comparativo para el cliente y la estimación interna v2. La v5, la arquitectura, el esquema, el SPEC v1.1 y los mockups v5 siguen como base: los documentos de cambios de cada propuesta dicen qué se modifica en cada uno.

**Estado:** dos propuestas listas para la reunión del **viernes 23 de octubre de 2026, 1:00 p. m.** En la reunión del 21 se vio que Helisa no importa facturas sino **pedidos**: la factura electrónica se sigue haciendo una a una en Helisa y el recibo entra como movimiento contable con cuentas y dos libros. Esto invalida la premisa central de la v5. **Propuesta 1:** el sistema llega hasta Helisa con pedidos y recibos, por archivo o por la API Conekta. **Propuesta 2:** además emite la factura electrónica con un proveedor tecnológico. Se recomienda hacerlo por fases (Fase 1 = Propuesta 1 con piloto, luego compuerta y Fase 2 = facturación electrónica). Pendiente clave: los formatos oficiales del pedido y del recibo que Julio quedó de enviar, la habilitación del documento Pedido en el Helisa de Comserva y las cuentas. La propuesta económica sale después del viernes.

## Documentos del proyecto

| Documento | Fecha | Ruta y enlace | Uso |
| --- | --- | --- | --- |
| **Propuesta v6 (índice)** | 22 oct 2026 | `propuesta/README.md` | Punto de entrada de la v6: las dos propuestas en una tabla, qué hay en cada carpeta y qué sigue por confirmar |
| **Comparativo de propuestas (v6)** | 22 oct 2026 | `propuesta/Comparativo de propuestas (v6).pdf` (12 páginas) · HTML en la misma carpeta | **Para presentar a Comserva el viernes.** Lo que aprendimos, las dos propuestas lado a lado, si la factura electrónica lo complica mucho, el camino por fases, el cronograma en semanas, los costos de terceros y lo que necesitamos. Sin precios del equipo |
| **Levantamiento v6 · propuesta 1** | 22 oct 2026 | `propuesta/propuesta 1/Levantamiento de requerimientos Comserva (v6, propuesta 1).pdf` · HTML, flujo, mockups y cambios para el desarrollo en la misma carpeta | RH digital hasta Helisa: archivo de **pedidos (OP, 24 campos, sin cuentas)**, registro de la FVE (Conekta, listado o digitación), recibo como movimiento contable (1305 contra caja o bancos, cruce con la FVE, libros F y N), configurador de plantillas y modalidades **1A** archivos y **1B** API Conekta. Trae la trazabilidad (TRZ) y los tres esquemas de tarifa |
| **Levantamiento v6 · propuesta 2** | 22 oct 2026 | `propuesta/propuesta 2/Levantamiento de requerimientos Comserva (v6, propuesta 2).pdf` · HTML, flujo, mockups y cambios para el desarrollo en la misma carpeta | RH digital con facturación electrónica: emisión por un **proveedor tecnológico** autorizado por la DIAN (prefactura, CUFE, envío al cliente, RADIAN, notas crédito y débito, numeración nueva, datos fiscales). Helisa recibe la contabilidad de facturas y recibos. Normativa DIAN en la sección 4 y requerimientos FEV-01 a FEV-15 |
| **Reunión del 21 oct 2026** | 22 oct 2026 | `propuesta/reunion 21 oct 2026/` | Resumen con imágenes de Helisa (datos de terceros tapados), preguntas para el viernes, mensaje para pedirle los formatos a Julio y transcripción (en local; ver `propuesta/README.md`) |
| **Estimación de tiempo y costo v2** (interna) | 22 oct 2026 | `propuesta/Estimación de tiempo y costo (v2).md` y `.pdf` | Reemplaza la v1 y el ajuste del README. Fase 0 + 1 ≈ 630 h; Conekta ≈ 70 h; Fase 2 (facturación electrónica) ≈ 240 h; C1 ≈ 190 h; C2 ≈ 110 h. Precios en tres escenarios, neto, costo-beneficio y qué hacer si el presupuesto es de 10–15 M. **No se entrega al cliente** |
| Levantamiento de requerimientos v5 | 19 oct 2026 | `levantamiento requerimientos/Levantamiento de requerimientos Comserva (v5).pdf` (58 páginas) · HTML en la misma carpeta | Base de la v6, reemplazada por ella. Su premisa de que Helisa genera la factura al importar el archivo FV no se cumple (ver la reunión del 21 de octubre). Igual a la v4 salvo la integración con Helisa, reescrita según las indicaciones del 19 de octubre: RH con valores → archivo plano de factura → Helisa genera la factura electrónica; recibo de caja solo con factura registrada → archivo plano de recibo → cruce en Helisa; archivos planos configurables desde el panel (sección 12 y HEL-01 a HEL-07); el alcance termina en los archivos |
| **Anexo SQL v5** | 19 oct 2026 | `arquitectura/schema_v5_archivos_planos.sql` | 7 tablas nuevas (`factura_helisa`, `plantilla_plano`, `plantilla_plano_columna`, `plantilla_plano_linea`, `archivo_plano`, `archivo_plano_linea`, `campo_exportable`; la sección 10 de la v5 dice «cuatro», pero el archivo trae siete). Factura registrada con saldo de referencia, plantillas configurables (columnas y líneas), archivos planos generados y sus filas, catálogo de campos exportables, triggers «recibo solo con factura» y «archivo importado inmutable», semilla de la plantilla espejo del CSV de Helisa. Se ejecuta después de `schema.sql`; validado en PostgreSQL 18.6 el 19 oct (triggers probados) |
| **Recorderito para la reunión con Lucrecia** (interno) | 20 oct 2026 | `reunion/Recorderito reunion con Lucrecia (21 oct 2026).md` y `.pdf` | Resumen de todo el proyecto (los cuatro formatos, el flujo, reglas, normativa, Helisa, fases, cambios de la v5) y 52 preguntas por tema con columna para anotar. Sin precios; no se le muestra al cliente |
| **Flujo de la v5 en una hoja** | 21 oct 2026 | `reunion/Flujo RH digital Comserva (v5).pdf` (A4 horizontal) · HTML en la misma carpeta · artefacto: https://claude.ai/artifact/TarjhaFrp6VXdQTyry9Eca | Infografía para mostrar: once pasos en carriles (cliente, operario, sistema, Lucrecia, Helisa) de la visita a la factura y del pago al cruce, con la cuenta de Cofema de septiembre, reglas, estados del panel y la premisa por confirmar del paso 5 |
| Flujo de factura y recibo (artefacto compartido) | 21 oct 2026 | `reunion/Flujo factura y recibo (artefacto).pdf` (A4 horizontal) · HTML en la misma carpeta · artefacto: https://claude.ai/artifact/TWGuMkdXFuxpAsAqgAV4Eb | Rediseño en una hoja del artefacto de flujo que circuló en el equipo, **sin agregados de la v5**: once pasos en dos fases, ejemplo del Hospital San Rafael (octubre 2026), los cuatro documentos y notas clave. Es más simple que la v5: no tiene el registro de la FVE ni la regla de recibo solo con factura registrada |
| Levantamiento v4 | 18 oct 2026 | `levantamiento requerimientos/Levantamiento de requerimientos Comserva (v4).pdf` (50 páginas) · HTML en la misma carpeta · artefacto: https://claude.ai/artifact/GoW6Grc9iyEjPPTtnWMXdW | Reemplazado por la v5 (sigue siendo la referencia para todo lo que la v5 no cambió) |
| **Arquitectura técnica v1** | 18 oct 2026 | `arquitectura/Arquitectura tecnica Comserva (v1).md` y `.pdf` | Stack (Expo + TypeScript, NestJS, PostgreSQL 18, React, Gotenberg, R2, Coolify), componentes, sincronización, API, procesos, seguridad, conservación, despliegue, costos, decisiones |
| **Esquema de base de datos** | 18 oct 2026 | `arquitectura/schema.sql` | 49 tablas, tipos, triggers de inmutabilidad, `fn_liquidar`, vistas de pre-cierre y semilla mínima. Ejecutable en PostgreSQL 18; validado sintácticamente |
| **SPEC.md v1.1** | 19 oct 2026 | `SPEC.md` | Especificación de desarrollo de la fase 1: `CLAUDE.md` propuesto, entregables, semilla, épicas A–H con criterios, contratos de la API, plantillas, definición de terminado, plan por semanas y reparto por cuentas de Claude. La v1.1 agrega la épica G de archivos planos (sección 10) y ajusta E9, F4 y G4 |
| **Mockups v5** | 19 oct 2026 | `mockups_v5/index.html` (abrir en el navegador o servir con `python3 -m http.server 8765 --directory mockups_v5`) | Copia de los mockups de la fase 1 alineada con la v5: página nueva del panel **Archivos planos para Helisa** (bandeja de archivos FV y RC con descarga, importado y rechazado, registro de FVE y de recibos definitivos, configurador de plantillas con columnas, líneas, formato, vista previa con Cofema, archivo de prueba y aprobación por Gerencia, catálogo de campos); cierre con columna «Estado · FVE» y archivo FV como salida principal (reporte A como contingencia); recaudo con el ciclo emitido → entregado → exportado → cruzado y registro del recibo definitivo; recibo de caja en la app solo con factura registrada (tipo, aplicación a facturas con saldo de referencia, bloqueo sin factura). `assets/data.js` suma facturas registradas, plantillas, archivos planos, saldo de referencia y el generador de archivos |
| Mockups de la fase 1 (v4) | 18 oct 2026 | `mockups/index.html` (abrir en el navegador) · artefacto: https://claude.ai/artifact/8u5N5J7ZtXVQp1MDuGt4X9 | App del operario (16 pantallas), panel de oficina (6 páginas), documentos PDF (5) y portal (anticipo fase 2), con datos de prueba y los números reales de Cofema. Reemplazados por `mockups_v5/` |
| **Estimación de tiempo y costo v1** (interna) | 18 oct 2026 | `estimacion/Estimación de tiempo y costo (v1).md` y `.pdf` | Horas por épica, calendario según dedicación y cuentas de Claude, tres escenarios de precio en COP, neto, forma de pago, argumentos. **No se entrega al cliente.** Calculada sobre la v4: **la v5 no la actualizó** (ver sección Estimación) |
| Levantamiento v3 | 18 oct 2026 (mañana) | `levantamiento requerimientos/Levantamiento de requerimientos Comserva (v3).pdf` · https://claude.ai/code/artifact/9c420555-8b5b-4b9c-9d1e-15b12c6445d5 | Reemplazado por la v4 |
| Levantamiento v2 | 18 oct 2026 | `levantamiento requerimientos/Levantamiento de requerimientos Comserva (v2).pdf` · https://claude.ai/code/artifact/226dc5a9-ea3a-449d-a464-c657335f2d69 | Histórico |
| Borrador v1 | 16 oct 2026 | `fuentes/Levantamiento de requerimientos – Digitalización documental COMSERVA.pdf` | Histórico; tenía errores (visita del día 11, catálogo incompleto) |
| Resumen vivo del proyecto | 18 oct 2026 | `fuentes/proyecto_rh_digital_helisa.md` · https://claude.ai/artifact/PAVYByXAh3AnkKPzHFV8Ph | Resumen anterior a la v4; la v4 lo supera |
| Guía de sesión con Lucrecia | 16 oct 2026 | `fuentes/guia_sesion_lucrecia_helisa.pdf` | Preguntas y material para la sesión en pantalla compartida; complementar con la sección 21 de la v4 |
| Especificación del 15 oct, guía y guion de la primera reunión, propuesta de Integrasoft | 15–16 oct 2026 | Estaban en Descargas; ya no se encontraron allí el 18 oct por la tarde (el texto extraído de los cuatro sirvió de insumo para la v4 y la estimación) | Históricos |

## Repositorio y forma de trabajo

- **GitHub:** https://github.com/cuentaprueba24244-cpu/rh-digital-helisa (público, rama principal `main`).
- **Colaboradores:** `cuentaprueba24244-cpu` (Adrián, administrador) y `Siuu70` (Ronaldo Ballesteros, escritura). Falta invitar a Hernando y al tercer integrante: se necesita su usuario de GitHub (la invitación no funciona solo con el correo).
- **Flujo acordado:** cada cambio va en una rama propia y entra a `main` por *pull request* (equivale al *merge request* de GitLab); Adrián revisa y aprueba. La v5 entró así: rama `v5` → PR #1 de Siuu70, fusionado el 20 de octubre. Todavía no hay protección de rama activa, así que técnicamente cualquiera con escritura puede empujar directo a `main`; conviene activarla (PR obligatorio, una aprobación, sin push directo).
- **Para traer cambios:** `git pull` en `main` (o `git fetch origin` y revisar las ramas nuevas antes de fusionar).

## Qué cambió el 21 y 22 de octubre (v6 frente a v5)

- **Reunión del 21 de octubre** (Google Meet, 13:10–13:47). Por Comserva: gerencia, la cuenta de logística y Julio, que lleva la contabilidad y Helisa. Por el equipo: Adrián, Cristian y Ronaldo. Cristian presentó el flujo v5 y Julio mostró Helisa 4.12.2.0, que corre por TSplus.
- **Helisa no importa facturas, importa pedidos.** La factura electrónica se elabora una a una: se abre la factura del cliente y se llama el pedido con F3. El pedido no lleva cuentas ni IVA; lo mínimo es la cantidad y el valor unitario. En otra empresa se vio con 24 campos, en TXT separado por «|» y sin encabezado. **En el Helisa de Comserva el documento Pedido no está habilitado.**
- **El recibo sí entra como movimiento contable:** 1305 contra caja o bancos, columna de factura a cruzar y dos libros, contable y tributario. Hay dos tipos de recibo, RC1 y RC2. La plantilla de 22 columnas de la v5 sirve para el recibo y, en la Propuesta 2, para contabilizar las facturas.
- **Datos nuevos:**
  - Tres formas de cobro: básico + kilos, solo por kilo y fijo mensual. La FVE 25997 cobra 108,50 kg × $3.991,60 + IVA = $515.375,43.
  - ≈ 240 facturas en 4 semanas según el consecutivo, por confirmar. La v5 suponía ≈ 12 al mes.
  - Helisa Conekta (API): $211.680 al mes según helisa.com. Inserta pedidos y recibos y lee facturas y cartera, pero **no emite facturas**.
- **Comserva y Julio** preferirían que el sistema haga la factura electrónica. La cuenta de logística ve la opción del archivo para Helisa «más viable en alcance y costos». Pidieron las dos propuestas.
- **Respuesta del equipo:** carpeta `propuesta/` con la Propuesta 1 (hasta Helisa, modalidades 1A y 1B) y la Propuesta 2 (con factura electrónica por proveedor tecnológico). Recomendamos hacerlo por fases. Cada una trae levantamiento v6, flujo de una hoja, mockups v6 con la página nueva de **trazabilidad** y cambios para el desarrollo. Además hay un comparativo para el cliente, la estimación v2 y la carpeta de la reunión.
- **Nomenclatura de fases v6:** Fase 0 (definición), Fase 1 (= Propuesta 1) y Fase 2 (facturación electrónica, solo en la Propuesta 2). Las antiguas fase 2 y fase 3 pasan a ser los complementos **C1** (acta y portal) y **C2** (caja formal y mensajería).

## Qué cambió el 19 de octubre (v5 frente a v4)

- **Alcance:** el sistema termina en los **archivos planos** para Helisa y en el registro de lo que Helisa devuelve (FVE, recibo definitivo, resultado de la importación). Cartera, cruce contable, retenciones y notas crédito quedan en Helisa. Se retiran Conekta y el registro de pagos como módulo de cartera; queda un saldo de referencia por factura para orientar al operario.
- **RH digital:** la planilla del periodo con valores (kilos por categoría y liquidación). Del RH sale el **archivo plano de factura (FV)** que Lucrecia importa en Helisa para generar la factura electrónica; ella registra el número FVE y el cierre pasa a facturado.
- **Recibo de caja solo con factura:** tipos anticipo, abono, pago de factura y pago total de cartera; siempre aplicado a facturas registradas con saldo. Del recibo sale el **archivo plano de recibo (RC)** con DOC FUENTE = número FVE para que Helisa cruce.
- **Configurador de archivos planos** en el panel (formato, separador, codificación, fechas, decimales, columnas y orden, líneas por documento, cuentas, tipo de documento, F/N, validaciones), versionado y aprobado por Gerencia; plantilla inicial espejo de las 22 columnas del CSV de Helisa. Reporte de cierre (camino A) solo como contingencia.
- **Estados:** cierre abierto → cerrado → exportado → facturado; recibo emitido → entregado → exportado → cruzado; archivo plano generado → descargado → importado | rechazado.
- **Premisa por confirmar:** la ayuda oficial de Helisa solo documenta la importación de movimiento contable; la plantilla con la que un archivo importado genera la factura electrónica la debe entregar Camilo o Helisa por escrito. El configurador existe para adaptarse a ella sin reprogramar.
- **Mockups v5** (`mockups_v5/`, copia de los de la v4): configurador de plantillas y bandeja de archivos planos en el panel, cierre con estado y FVE por cliente, recaudo con el ciclo del recibo y bloqueo «sin factura» en el recibo de la app.
- **Lo que la v5 no tocó:** secciones 3 (cliente y objetivos), 4 (marco normativo), 9 (trabajo sin señal y series) y 14 (requerimientos no funcionales) son idénticas a la v4. Tampoco cambiaron la arquitectura técnica, `schema.sql`, la estimación ni la carpeta `mockups/` original. En `mockups_v5/` solo cambian la app, `data.js`, la portada, cierre, recaudo y la página nueva `planos.html`; documentos PDF, portal y estilos son copia exacta de los de la v4.
- **Archivos que trajo el commit de la v5:** 24 (8.640 líneas nuevas): levantamiento v5 en HTML y PDF (58 páginas, 8 más que la v4), anexo SQL, 21 archivos de `mockups_v5/`, y ediciones a `README.md` y `SPEC.md`.

## Qué cambió el 18 de octubre por la tarde (v4 frente a v3)

- **Normativa:** la Resolución 591 de 2024 derogó la Resolución 1164 de 2002 (origen del formulario RHPS). Su Manual define el *comprobante de recolección* (campos a–k) y el *certificado del gestor* (i–viii). La constancia y el acta se rediseñan con esos campos. Conservación: 5 años (ambiental), 10 (contable). Máximo 15 kg por bolsa (no 6). Conductores con certificado de mercancías peligrosas.
- **Helisa:** el camino B (importar facturas) no tenía soporte documental; se descartó salvo confirmación escrita. Camino A reforzado en fase 1 (reporte en el orden de la pantalla de ventas + captura del FVE); camino C en fase 2 solo para recibos de caja y terceros; Conekta opcional (≈ $4,7 M/año con hosting). *(La v5 reemplaza esta decisión: ver arriba.)*
- **Cierre por cliente** desde el día 20 y general el 26; pre-cierre con bloqueos; estados abierto → cerrado → facturado; visitas fuera de cierre; ajustes a periodos facturados.
- **Visita con tres resultados** (recolección, sin residuos, fallida); jornada con vehículo, conductor y auxiliar; pesadas múltiples; novedades; responsables autorizados; resultados de firma.
- **Sedes** por cliente; **recibo de caja** independiente con tipo y aplicación a facturas; **entrega de efectivo** en fase 1; alerta a 100 UVT.
- **Documentos:** un solo archivo oficial (constancia y recibo en el celular; planilla, acta y reportes en el servidor); verificación por QR y correo automático desde la fase 1.
- **Series:** planilla continúa 22642-26; constancia serie nueva por rangos de dispositivo; recibo 35652; acta 25677; sin números provisionales.
- **Comercial:** alcance y exclusiones, entregables, aceptación con piloto en paralelo, garantía, soporte, propiedad intelectual, costos recurrentes a nombre de Comserva.
- **Tecnología:** Expo (React Native) + TypeScript de punta a punta; NestJS + Drizzle + PostgreSQL 18; React + Vite; Gotenberg; Cloudflare R2; un VPS con Coolify. Flutter sigue siendo válida si el equipo la domina.

## Mockups (fase 1)

**Vigentes desde el 22 de octubre: `propuesta/propuesta 1/mockups_v6/` y `propuesta/propuesta 2/mockups_v6/`.** Son copias de los v5 con la página nueva **Trazabilidad**: cadena documental, búsqueda por número, matriz del periodo y expediente. También traen los tres esquemas de tarifa y las equivalencias con Helisa. La P1 suma «Helisa: pedidos y recibos» con la conexión 1A/1B. La P2 suma «Facturación electrónica», «Contabilidad en Helisa», datos fiscales del cliente, y la factura y la nota crédito de prueba. Lo de abajo describe los `mockups_v5/` (abrir `mockups_v5/index.html` o servir con `python3 -m http.server 8765 --directory mockups_v5`). Los de `mockups/` son los de la v4 y se conservan sin cambios. Todo se renderiza desde `assets/data.js`, que contiene la fórmula de liquidación, reproduce los números reales de Cofema (413,85 kg y $2.244.935) y, en la v5, las facturas registradas (FVE 25756 a 25767 de septiembre), el saldo de referencia, las plantillas de archivo plano y el generador que arma las filas de los archivos FV y RC.

| Carpeta | Contenido |
| --- | --- |
| `app/` | App del operario: inicio de sesión, inicio de jornada, hoy, elegir sede, visita en cuatro pasos (kilos, evidencia, firmas, confirmar), constancia, visita sin residuos, visita fallida, recibo de caja (v5: solo con factura registrada; tipo anticipo, abono, pago de factura o pago total; aplicación a facturas con saldo de referencia; bloqueo sin factura), historial, detalle, sincronización, cliente nuevo, más. Interruptor «Simular sin señal» |
| `panel/` | Inicio, visitas (bandeja, detalle, anulación), recaudo (v5: ciclo del recibo, confirmar entrega, registrar recibo definitivo), cierre del periodo (septiembre cerrado con validación contra la FVE 25756 y columna «Estado · FVE»; octubre abierto con pre-cierre), **archivos planos para Helisa** (v5: `planos.html`), clientes y tarifas, catálogos y parámetros (categorías, dispositores, operarios, vehículos, empresa, parámetros, consecutivos, usuarios y permisos, auditoría) |
| `documentos/` | Constancia de visita, planilla mensual RHPS, recibo de caja, reporte de cierre (camino A) y acta (anticipo fase 2), con QR y hash |
| `portal/` | Anticipo del portal del cliente (Cofema al día, IPS Salud Vital en mora) y página de verificación por código |

Pendiente en `mockups_v5/`: el documento PDF del archivo plano no existe como «documento» (se descarga desde la bandeja como texto; el sistema real escribe .xls Excel 97-2003); la cartilla de terceros (TER, fase 2) solo tiene la plantilla; el panel de inicio no tiene tarjeta de archivos pendientes. Pendiente desde la v4: la entrega de efectivo (CAJ-02) sigue simplificada (solo «confirmar entrega» por recibo, sin consignación) y las visitas fuera de cierre (CIE-06) no se muestran.

## Cliente y personas

- **Comserva** (Comercializadora de Servicios Varios S.A.S.), NIT 828.002.730-1, Florencia (Caquetá). Licencia CORPOAMAZONIA, Resolución 0038 del 23 de enero de 2006. Gerente: Diego Alfonso Cartagena Mayorquín. Lucrecia: facturación y cartera en Helisa. Julio: contabilidad y Helisa de Comserva (mostró Helisa el 21 de octubre y quedó de enviar los formatos del pedido y del recibo). Camilo: soporte de Helisa (por confirmar si sigue). Dispositores: Incihuila S.A.S E.S.P. y Sur Ambiental S.A.S. Tres usuarios internos.
- **Equipo:** Adrián, Hernando y una tercera persona; dos cuentas Claude Pro y una Claude Max.

## Cómo funciona (en corto)

La **visita** es la única captura: kilos por categoría, bolsas, guardianes, firmas, GPS y hora; nunca valor en pesos. Tres resultados: recolección, sin residuos, fallida. El **cierre del cliente** (desde el día 20 o el 26) suma una sola vez y de ahí salen la planilla mensual con valores (el **RH**), la liquidación (`total = (básico + máx(0, kg − incluidos) × precio) × (1 + IVA)`), el **archivo plano de factura** que Lucrecia importa en Helisa y, en fase 2, el acta. Con la FVE registrada se puede emitir el **recibo de caja**, del que sale el **archivo plano de recibo** para el cruce en Helisa. Ahí termina el alcance; la contabilidad es de Helisa. Lo firmado no se edita: se anula con motivo. El NIT es la llave del cliente; la visita apunta a una sede. Sin señal: base local cifrada, UUID por visita, bloques de consecutivos por dispositivo, cola idempotente.

## Fases

**En la v6 las fases se renombran** (ver `propuesta/README.md`): Fase 0 (definición), Fase 1 (núcleo hasta Helisa, igual a la Propuesta 1, con piloto) y Fase 2 (facturación electrónica, solo en la Propuesta 2, después de una compuerta). Los complementos son C1 (acta y portal) y C2 (caja formal y mensajería). La tabla de abajo es la de la v5.

| Fase | Contenido | ¿Se puede empezar? |
| --- | --- | --- |
| 0. Definición (en paralelo) | Sesión con Lucrecia, acta de definición, consultas a Helisa y CORPOAMAZONIA, prototipo validado, cuentas a nombre de Comserva | Sí |
| 1. Campo y oficina | App, panel, recibo y entrega de efectivo, cierre, planilla y RH, archivo plano de factura, registro de FVE, archivo plano de recibos, configurador de plantillas, reporte de contingencia, correo automático, verificación QR, piloto en paralelo | **Sí, ya (SPEC.md)** |
| 2. Acta y portal | Acta con firma del gerente, saldo de referencia y regla «al día», portal, cartilla de terceros, ajustes, reporte ambiental | Espera fase 0 |
| 3. Caja y mensajería | Cierre de caja formal, WhatsApp API, reportes, entregas a dispositores | Después del piloto |

## Estimación (interna, ver `propuesta/Estimación de tiempo y costo (v2).md`)

**Vigente: estimación v2 (22 oct 2026).**
- Horas: Fase 0 + 1 (Propuesta 1, archivos) ≈ 630 h (560–720); Conekta ≈ 70 h; Fase 2 (facturación electrónica con proveedor tecnológico) ≈ 240 h (200–300); C1 ≈ 190 h; C2 ≈ 110 h. Propuesta 1 = 630 h (700 con Conekta); Propuesta 2 = 870 h.
- Calendario a tiempo parcial: Propuesta 1 ≈ 18 semanas con piloto; Propuesta 2 ≈ 28 por fases o ≈ 24 contratada completa.
- Precio a la tarifa recomendada de $60.000 la hora: Fase 0 + 1 ≈ $37,8 M, Conekta ≈ $4,2 M y Fase 2 ≈ $14,4 M, sin IVA.
- Con software propio ante la DIAN (no recomendado), la facturación electrónica serían 400–600 h.
- El documento trae también qué alcance cabe si el presupuesto es de 10–15 M.

Lo que sigue es histórico.

**Estimación v1 (calculada sobre la v4).** El SPEC v1.1 dice que la épica de archivos planos suma ≈ 60 h a la fase 1, y la v5 simplifica la fase 2 (sin módulo de cartera ni pagos, sin Conekta), que se estima en ≈ 10–15 h menos. Ajuste preliminar mientras no se rehaga el documento: fase 0 + 1 ≈ 565 h (antes 506), fase 2 ≈ 190 h; total ≈ 865 h. A la tarifa recomendada ($60.000 la hora) eso lleva la fase 0 + 1 a ≈ $34 M y el total a ≈ $52 M sin IVA; a tiempo parcial, la fase 1 pasa de 12 a ≈ 13–14 semanas antes del piloto. Las cifras de abajo son las originales de la v4.


Fase 0 + 1 ≈ 500 h; fase 2 ≈ 200 h; fase 3 ≈ 110 h. A tiempo parcial (15 h por semana cada uno) la fase 1 está en piloto en 12 semanas y aceptada en 16; a tiempo completo, en 7 más el piloto. Precio recomendado: $30 M (fase 0 + 1), $12 M (fase 2), $7 M (fase 3) = $49 M sin IVA; mínimo defendible $32,5 M; precio de lista $69,5 M. 15–20 M es el piso para la fase 1 sola y es bajo para el proyecto completo.

## Pendientes

**Para el viernes 23 de octubre (1:00 p. m.)** (detalle en `propuesta/reunion 21 oct 2026/Preguntas y solicitudes para el viernes (23 oct 2026).md`):
- Si se puede habilitar el documento Pedido en Helisa.
- Formatos oficiales del pedido y del recibo, campo por campo (Julio), RC1 o RC2, y cuentas en los dos libros.
- Códigos de concepto, lista de precios y código de cada cliente o sede.
- Volumen real de facturas y esquemas de cobro.
- Si Comserva confirma por escrito que paga Conekta.
- Si aceptan hacerlo por fases y con qué criterio pasan a la Fase 2.
- En la Propuesta 2: proveedor tecnológico, prefijo y numeración.
- Después: la propuesta económica y la reunión con quien decide.

*Pendientes de la v5 (siguen vigentes salvo lo que la reunión ya respondió):*

**Con Lucrecia:** cómo factura (por cliente desde el 20 o todo el 26), orden de la pantalla de ventas de Helisa, versión de Helisa y asistente de importación, tarifas y esquemas, IVA y retenciones, recibo definitivo y cuentas, notas crédito, cómo exporta la cartera.

**Con la gerencia:** sufijo «-26», series y hojas anuladas, exigencias de CORPOAMAZONIA y asesor ambiental, Animales y Explosivos, dirección oficial, sedes, celulares, firma por lote y suplente, piloto en paralelo, política de datos, dominio, certificados de conductores, costo-beneficio, soporte.

**Con Camilo o Helisa (por escrito):** plantilla con la que un archivo importado genera la factura electrónica (asistente, columnas, tipo de documento, formato), plantilla de importación de recibos y cómo se indica la factura a cruzar, importación de prueba con el archivo de Cofema.

**Con el contador:** cuentas de cada línea de los dos archivos (ingreso, IVA, cartera, caja, banco), tipo de documento, clase F/N, centro de costo, códigos de forma de pago, clientes que ya existen en Helisa.

**Insumos para arrancar:** clientes y sedes con tarifa (plantilla Excel), operarios y certificados, placas, celulares, últimos consecutivos en papel, logo y textos legales, dirección y cuentas bancarias, día de corte, dominio y tarjeta para cuentas.

## Historial

- **15 oct 2026:** especificación inicial (suponía valor en pesos por RH y un asiento por RH; corregido).
- **16 oct 2026:** reunión de descubrimiento; borrador v1, resumen y guía de sesión.
- **18 oct 2026 (mañana):** formatos, contrato modelo, CSV de Helisa y transcripción; v2 y v3.
- **18 oct 2026 (tarde):** investigación con fuentes oficiales (Helisa, normativa, mensajería, tecnología, mercado, planes de Claude), tres revisiones independientes de la v3, **v4**, arquitectura v1, schema.sql, SPEC.md, mockups de la fase 1, estimación v1.
- **19 oct 2026:** indicaciones de Comserva sobre el alcance (RH con valor, archivo plano para la factura, recibo solo con factura, archivo plano del recibo, archivos configurables, alcance limitado a los archivos). **v5**, anexo SQL de archivos planos (validado en PostgreSQL 18.6), SPEC v1.1, **mockups v5**.
- **20 oct 2026:** repositorio en GitHub público; Siuu70 invitado con permiso de escritura; la v5 entra a `main` por el PR #1. README actualizado con el repositorio, el flujo de trabajo, lo que la v5 no tocó y el impacto preliminar en la estimación. Recorderito para la reunión con Lucrecia (carpeta `reunion/`).
- **21 oct 2026:** reunión con Comserva y Julio (Helisa en vivo). Dos gráficas de flujo de una hoja en `reunion/`: la de la v5 (para mostrar) y el rediseño fiel del artefacto de flujo compartido en el equipo. Hallazgo central: Helisa importa pedidos, no facturas.
- **22 oct 2026:** **v6 en dos propuestas** (carpeta `propuesta/`):
  - Levantamientos v6, flujos de una hoja y mockups v6 con trazabilidad.
  - Cambios para el desarrollo, comparativo para el cliente y estimación v2.
  - Resumen de la reunión con imágenes (datos de terceros tapados), preguntas para el viernes y mensaje para Julio.
  - Investigación con fuentes oficiales sobre Helisa Conekta, la DIAN (factura electrónica) y los proveedores tecnológicos.
