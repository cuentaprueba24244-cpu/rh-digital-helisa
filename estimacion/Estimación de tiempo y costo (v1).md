# Estimación de tiempo y costo · RH digital Comserva

**Versión 1.0 · 18 de octubre de 2026 · Documento interno del equipo (no se entrega al cliente).**

Responde tres preguntas: cuánto trabajo es, cuánto tiempo toma con tres personas que usan Claude Code (dos cuentas Pro y una Max), y cuánto cobrar en pesos colombianos. Las cifras de mercado, impuestos y planes de Claude vienen de la investigación del 18 de octubre de 2026 con fuentes oficiales; donde algo es inferencia, se dice.

Datos de referencia usados: SMMLV 2026 $1.750.905; UVT 2026 $52.374; TRM $3.174,67 por dólar (17–19 de octubre de 2026). Alcance: el del *Levantamiento v4* y la *Arquitectura v1*.

---

## 1. Respuesta corta

| Pregunta | Respuesta |
| --- | --- |
| ¿Cuántas horas de trabajo? | **Fase 0 + fase 1: ≈ 500 h** (rango 430–600). Fase 2: ≈ 200 h. Fase 3: ≈ 110 h. **Total ≈ 810 h** (690–980). Son horas humanas ya asistidas por Claude Code. |
| ¿Cuánto tiempo? | **A tiempo parcial** (15 h por semana cada uno): fase 1 lista para piloto en **12 semanas**, aceptada en **16** (piloto de un ciclo de corte); proyecto completo en **≈ 24 semanas**. **A tiempo completo** (35 h por semana cada uno): fase 1 en 7 semanas más el piloto (11), proyecto completo en **≈ 16 semanas**. Los «mínimo tres meses» del cliente se cumplen solo a tiempo completo o si el piloto cuenta dentro de los tres meses. |
| ¿Las cuentas de Claude alcanzan? | Sí para tiempo parcial. A tiempo completo las dos cuentas Pro son el cuello de botella; conviene subir la Max a 20x o una Pro a Max 5x. Costo de las suscripciones: US$140 al mes (≈ $444.000), ≈ $1,8 M en cuatro meses. |
| ¿15–20 millones es razonable? | **Para el proyecto completo, no:** sale a $16.000–21.000 la hora, menos que un desarrollador junior asalariado con prestaciones. **Para la fase 0 + 1 sola es el piso del mercado** ($30.000–40.000 la hora). |
| ¿Cuánto cobrar? | **Recomendado: fase 0 + 1 en $30 M, fase 2 en $12 M, fase 3 en $7 M (total $49 M)**, sin IVA, por hitos, con soporte mensual aparte. Mínimo defendible: $20 M / $8 M / $4,5 M (total $32,5 M). Precio de lista con margen: $43 M / $17 M / $9,5 M (total $69,5 M). |

---

## 2. Horas por épica (fase 0 + fase 1)

Las épicas son las de `SPEC.md`. Las horas son de trabajo humano con Claude Code haciendo la mayor parte de la escritura de código; incluyen pruebas y revisión, no incluyen esperas del cliente.

| Épica | Qué incluye | Horas | Rango |
| --- | --- | ---: | ---: |
| F0 · Definición | Sesión con Lucrecia, acta de definición, consultas a Helisa y CORPOAMAZONIA, prototipo validado, propuesta | 30 | 24–40 |
| A · Cimientos | Monorepo, CI, base de datos desde schema.sql, semilla, Zod compartido, entornos | 24 | 20–32 |
| B · Identidad, dispositivos y series | Login y refresh, dispositivos, rangos, usuarios y roles | 28 | 24–36 |
| C · Maestros | Clientes y sedes, tarifas, catálogos, datos maestros y plantillas, parámetros, carga desde Excel (API y panel) | 56 | 48–70 |
| D · Sincronización | Pull, push idempotente, archivos, reloj, base local cifrada y cola en la app | 48 | 40–64 |
| E · App del operario | Login y PIN, jornada, lista del día, visita (kilos, novedades, evidencia, aviso, firmas), sin residuos y fallida, constancia con hash, recibo, entrega de efectivo, historial y anulación, versión mínima, cliente nuevo | 110 | 90–140 |
| F · Panel de operación | Inicio y alertas, bandeja y detalle, validar o fusionar, recaudo y entregas, programación semanal, auditoría | 56 | 48–70 |
| G · Cierre, documentos y Helisa | Pre-cierre, cierre por cliente, liquidación, planilla, reporte A y FVE, fuera de cierre, verificación QR, correo automático, impresión de contingencia | 70 | 60–90 |
| H · Calidad, despliegue y piloto | Pruebas (unitarias, SQL, API, app, web), seguridad, producción y respaldos, APK y celulares, manuales y capacitación, acta de series, soporte del piloto | 84 | 70–110 |
| **Total fase 0 + 1** | | **506** | **430–600** |

**Fase 2 (≈ 200 h, rango 170–240):** acta con firma electrónica por lote 40, pagos y cartera 24, portal (acceso, documentos, acta según cartera, consolidado RESPEL) 56, archivo .xls de recibos y terceros con importación de prueba 32, ajustes a periodos facturados 16, reporte ambiental 16, pruebas y despliegue 16.

**Fase 3 (≈ 110 h, rango 90–140):** cierre de caja formal 28, WhatsApp API de Meta (verificación, plantillas, envío, webhooks) 40, reportes operativos 20, entregas a dispositores 12, pruebas 10.

**Cómo se calcularon.** Se descompuso cada historia del SPEC en tareas de 2 a 8 horas y se sumó. Sin asistente de código el total de la fase 1 estaría entre 650 y 750 horas; la evidencia experimental reciente sobre asistentes de código sostiene una ganancia neta de 1,2 a 1,5 veces en proyectos nuevos de complejidad baja o media (no las 3 a 5 veces que a veces se afirman), y reserva alrededor de un tercio del esfuerzo para revisión y pruebas porque el código asistido aumenta el retrabajo. Es el primer proyecto independiente del equipo y el primero con sincronización sin señal: el rango alto es el prudente para comprometer fechas.

---

## 3. Calendario

### 3.1 Capacidad del equipo

| Escenario | Horas humanas por semana | Fase 0 + 1 (dev) | Piloto | Fase 2 | Fase 3 | Total |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| **A. Tiempo parcial** (15 h cada uno) | 45 | 12 semanas | 4 semanas | 5 semanas | 3 semanas | **≈ 24 semanas** |
| **B. Tiempo completo** (35 h cada uno) | 105 | 7 semanas | 4 semanas | 3 semanas | 2 semanas | **≈ 16 semanas** |
| **C. Mixto** (una persona completa, dos parciales) | 65 | 9 semanas | 4 semanas | 4 semanas | 2 semanas | **≈ 19 semanas** |

El piloto en paralelo dura un ciclo de corte completo (del 27 de un mes al 26 del siguiente) y no se puede comprimir. La fase 2 puede solaparse con el piloto si Helisa y CORPOAMAZONIA ya respondieron.

### 3.2 Qué dicen las cuentas de Claude

Anthropic no publica los límites en horas; las cifras siguientes son una inferencia a partir de los datos oficiales de julio de 2025 (Pro 40–80 h por semana de Sonnet; Max 5x 140–280 h), de la duplicación del límite de 5 horas de Claude Code (mayo de 2026) y del aumento permanente del 25 % en los límites semanales (septiembre de 2026). Deben medirse con `/usage` la primera semana.

| Cuenta | Precio | Capacidad semanal estimada de trabajo agéntico en Claude Code | Para qué usarla |
| --- | ---: | --- | --- |
| Pro | US$20 | 10–20 h con Sonnet (5–8 h si se usa Opus); el cuello de botella es la ventana de 5 horas | Panel web, PDF, pruebas, documentación; una tarea por sesión; `/model sonnet`; `/clear` entre tareas |
| Max 5x | US$100 | 30–45 h mixtas (Opus planifica, Sonnet ejecuta) | App móvil y sincronización, decisiones de arquitectura, revisión de PR, sesiones largas con espera automática tras el reinicio |
| Max 20x | US$200 | 45 h o más, con 2–3 sesiones en paralelo | Si el equipo trabaja a tiempo completo |

Equipo con 2 Pro + Max 5x: **50–85 h de Claude Code por semana**. A tiempo parcial (45 h humanas, de las cuales unas 30 son agénticas) sobra capacidad. A tiempo completo (105 h humanas, unas 60–70 agénticas) las cuentas Pro se agotarán varias veces por semana: subir la Max a 20x (US$240 al mes en total) o activar créditos de uso con tope de US$20–30 por cuenta Pro.

Reglas que rinden: Sonnet por defecto en las Pro (el modelo por defecto es Opus 5.5 y gasta la cuota varias veces más rápido); sesiones cortas (cada turno reenvía todo el contexto; una pausa de más de una hora pierde la caché); `CLAUDE.md` de menos de 200 líneas; sin *agent teams* en las Pro (consumen unas siete veces más); escalonar las ventanas de 5 horas entre las dos Pro; registrar el día y hora de reinicio semanal de cada cuenta; no usar el chat de Claude.ai de la misma cuenta para planear (comparte cuota).

Costo de herramientas: 2 Pro + Max 5x = US$140 al mes ≈ $444.000; cuatro meses ≈ $1,8 M. Con Max 20x, US$240 ≈ $762.000 al mes. Se absorbe en el precio; no se traslada al cliente.

---

## 4. Cuánto cobrar

### 4.1 Lo que cuesta el mercado colombiano (2026)

| Referencia | Valor | Fuente |
| --- | --- | --- |
| Desarrollador freelance para cliente local | Junior $30.000–50.000 la hora; intermedio $50.000–80.000; senior $80.000–150.000 | Blog sectorial (orientativo) |
| Desarrollador colombiano para cliente internacional | Mid US$26 la hora (≈ $82.500); senior US$34 (≈ $108.000) | Lemon.io, 606 contratos, tercer trimestre de 2026 |
| Mediana freelance Colombia, desarrollo de software | 18 euros la hora (≈ $65.000) | freelancermap, septiembre de 2026 |
| Agencias pequeñas de Medellín | US$25–49 la hora; proyecto mínimo US$10.000–25.000 ($32–79 M) | Clutch |
| Salario asalariado | Junior $2,8 M al mes; promedio $3,0 M; senior $5,9 M (más ≈ 47 % de carga prestacional) | Indeed Colombia, octubre de 2026 |
| App móvil MVP (iOS + Android) | $20–50 M | Pixelia, 2026 |
| Panel administrativo / portal de clientes | $4,5–9 M / $9–18 M | Kytcode, 2026 |
| Integración con software contable | +$2–8 M | MyTechSolutions, 2026 |
| Proyecto de baja complejidad en agencia formal | $40–70 M | Kubo, 2026 |
| **Ancla regional:** Integrasoft (Neiva) a una empresa de Florencia, diciembre de 2025 | **$15,6 M** por 12 meses de arriendo de un BPM genérico + 48 h de implementación + BI; **$52,7 M** por licenciamiento | Propuesta en la carpeta del proyecto |

### 4.2 Tres escenarios

Horas: fase 0 + 1 = 506; fase 2 = 200; fase 3 = 110.

| Escenario | Tarifa | Fase 0 + 1 | Fase 2 | Fase 3 | Total | Lectura |
| --- | ---: | ---: | ---: | ---: | ---: | --- |
| **Mínimo defendible** | $40.000 | **$20 M** | $8 M | $4,5 M | **$32,5 M** | Tarifa de junior local. Cubre seguridad social, Claude y deja ≈ $4,5 M netos por persona en la fase 1. Solo como precio de primer proyecto, con alcance cerrado y cambios cobrados aparte. |
| **Recomendado** | $60.000 | **$30 M** | $12 M | $7 M | **$49 M** | Tarifa intermedia local, mediana freelance colombiana, por debajo de Lemon.io. Coincide con app MVP ($20–50 M) + panel ($4,5–9 M). Entre el arriendo anual y la licencia de Integrasoft, pero con software a la medida y código propio. |
| **Con margen (precio de lista)** | $85.000 | **$43 M** | $17 M | $9,5 M | **$69,5 M** | Senior local; banda baja de agencias. Úsenlo como precio de lista en la propuesta y negocien hacia el recomendado a cambio de testimonio, caso de éxito y referido. |

Los valores son sin IVA. La fase 1 incluye el piloto y 90 días de garantía.

### 4.3 Qué queda neto (ejemplo con la fase 1 a $30 M)

Supuesto: tres personas naturales no responsables de IVA (ingresos anuales menores a 3.500 UVT ≈ $183 M cada una), facturando por cuenta de cobro con documento soporte emitido por Comserva.

| Concepto | Valor | Nota |
| --- | ---: | --- |
| Precio de la fase 0 + 1 | $30.000.000 | Sin IVA |
| Retención en la fuente por honorarios (10 %) | −$3.000.000 | Anticipo de renta recuperable en la declaración; afecta el flujo de caja, no el ingreso |
| Seguridad social de independientes (≈ 11,6 % del bruto) | −$3.480.000 | IBC = 40 % del contrato; salud 12,5 %, pensión 16 %, ARL 0,522 % |
| Suscripciones Claude (4 meses) | −$1.800.000 | 2 Pro + Max 5x |
| Infraestructura de desarrollo y pruebas, tiendas | −$500.000 | VPS de pruebas, dominio de prueba, Play Console |
| Imprevistos (5 %) | −$1.500.000 | |
| **Neto en caja para el equipo** | **≈ $19,7 M** | ≈ $6,6 M por persona, por ≈ 170 h cada una (≈ $39.000 la hora neta) |

Si constituyen una S.A.S.: se suma IVA del 19 % (Comserva lo descuenta), la retención sube al 11 % y hay costos contables; conviene solo con varios clientes. Confirmar con un contador si el servicio se clasifica como honorarios (10–11 %) o servicios (4–6 %) y la tarifa de ReteICA en Florencia.

### 4.4 Cómo presentarlo

- **Por fases con precio cerrado cada una**, entregables y criterios de aceptación de la v4. La fase 2 incluye un solo camino de integración con Helisa (el que Helisa permita); Conekta se cotiza aparte si Comserva lo quiere.
- **Forma de pago de la fase 1:** 30 % a la firma, 30 % al entregar APK y panel con catálogos cargados, 30 % al acta de aceptación tras el piloto, 10 % al cierre de la garantía. Fases 2 y 3 con sus hitos.
- **Garantía** de 90 días por fase. **Soporte y mantenimiento** aparte: 15–20 % anual del valor de desarrollo (sobre $30 M: $375.000–500.000 al mes) o bolsa de 8 horas al mes a $60.000 ($480.000), con respuesta en 1 día hábil.
- **Costos recurrentes a cargo de Comserva**, en tabla separada (ver v4, sección 19): entre $55.000 y $90.000 al mes en la fase 1 más IVA cuando aplique; Play Console $79.000 una vez; Apple $314.000 al año solo si hay iPhone; WhatsApp API menos de $16.000 al mes en la fase 3; Conekta ≈ $4,7 M al año solo si se contrata.
- **Cambios de alcance** a tarifa por hora publicada ($60.000–85.000). **Vigencia** de la propuesta: 30 días. **Propiedad del código** según la opción pactada (ver v4, sección 19).

### 4.5 Argumentos para defender el precio ante la gerencia

1. Integrasoft cobra $15,6 M por un año de arriendo de un software genérico sin propiedad, y $52,7 M por la licencia; el equipo entrega software a la medida con código propio por $49 M en tres fases, sin mensualidad obligatoria.
2. Un desarrollador senior dedicado en Colombia cuesta $8–15 M al mes; tres meses de equipo serían $24–45 M solo en salarios.
3. Las agencias colombianas no toman proyectos de menos de $32–79 M.
4. Reemplaza cuatro documentos en papel, elimina la suma y digitación de Lucrecia, controla el efectivo y deja evidencia de cada visita, con los campos que exige el Manual de 2024: valor operativo y de cumplimiento ante CORPOAMAZONIA.
5. Los costos de terceros son transparentes y bajos; no hay dependencia de un proveedor de software con cuota mensual.

### 4.6 Si el cliente insiste en 15–20 millones

No bajar la tarifa: **reducir el alcance** y llamarlo «fase 1 esencial» ($20 M, ≈ 340 h): app con visita, firmas, constancia y sin señal; recibo de caja sin entrega de efectivo; panel con clientes, tarifas, catálogos, bandeja básica, cierre y reporte A; verificación por QR; sin programación semanal, novedades, correo automático, carga desde Excel (se cargan los datos una vez a mano) ni impresión de contingencia. O mantener el alcance completo como **precio de lanzamiento explícito** ($20 M) con contraprestación escrita (testimonio, caso de estudio, 50 % anticipado) y el precio de lista visible en la propuesta, para que el descuento no se vuelva referencia de las fases 2 y 3.

---

## 5. Riesgos de la estimación

| Riesgo | Efecto en horas o fecha | Cómo se controla |
| --- | --- | --- |
| Primer proyecto con sincronización sin señal y firma en pantalla | +15–25 % en la épica E y D | Prototipo técnico de la cola y la firma en la semana 2; prueba de modo avión temprana |
| Insumos del cliente tarde (clientes, tarifas, series) | Desplaza el piloto una semana por semana de retraso | Fechas en el acta de definición; desarrollo con semilla |
| Helisa o CORPOAMAZONIA responden tarde | No afecta la fase 1; mueve la fase 2 | Consultas por escrito en la fase 0 |
| Límites de las cuentas Claude | Días perdidos a final de semana | Medición en la semana 1; Sonnet por defecto; créditos de uso con tope |
| Cambios de alcance durante el piloto | +10 % | Orden de cambio a tarifa por hora |
| TRM | Suscripciones y VPS en dólares | Colchón del 10 % en costos en dólares; precio al cliente en pesos |

---

## 6. Fuentes de esta estimación

Investigación del 18 de octubre de 2026: claude.com/pricing y artículos de soporte de Anthropic sobre límites (ventana de 5 horas y límite semanal; duplicación de mayo de 2026; +25 % desde septiembre de 2026); TechCrunch (cifras de julio de 2025); documentación de costos de Claude Code; METR (2025 y febrero de 2026), Google (2024), Faros AI (2025), Stanford (2025) y Anthropic (diciembre de 2025) sobre productividad; Lemon.io, Clutch, freelancermap, Indeed Colombia, Pixelia, Kytcode, Togrow, Kubo, MyTechSolutions; Decretos 1469 y 1470 de 2025 (SMMLV), Resolución DIAN 238 de 2025 (UVT), tabla de retención 2026, UGPP (independientes), Superfinanciera (TRM); propuesta de Integrasoft S.A.S. (diciembre de 2025).
