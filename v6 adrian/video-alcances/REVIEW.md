# Revisión · Los dos alcances de RH digital

**Render v3:** 26 oct 2026, `renders/alcances-rh-digital-v3.mp4`. Es un MP4 de 1920 × 1080 a 30 fps; dura 138,0 s y pesa 19,3 MB. Audio medido en el MP4: −15 LUFS, pico real de −1 dBTP y ningún recorte. `check` pasa sin errores.

## Cambios de la v3 (personajes)

- **Intro nueva (0–28,8 s), contada como escena:**
  1. Llega la camioneta de Comserva a Cofema en Florencia.
  2. El operario baja con la bolsa roja, la pesa (la báscula marca 74,95 kg) y anota a mano. Aparece la planilla real con la fila del día 5.
  3. El cliente sale a firmar en papel.
  4. En la oficina, Lucrecia suma con calculadora mientras el reloj corre, y digita en Helisa.
  5. Los papeles vuelan y forman la marca «Por eso creamos RH digital». Después aparecen el operario con la app y Lucrecia con el panel.
- **Visita:** el operario digita con el celular en la mano y el celular grande nace del suyo. Aparecen el aviso de sin señal, la ficha «99,50 kg» que salta al total, el pin del GPS, el flash de la foto y su saludo al final.
- **RH:** Lucrecia cierra septiembre con un clic en el panel y la cámara entra al monitor.
- **Alcance 1:** Lucrecia importa el pedido. En Helisa presiona F3 y salen las FVE 25756, 25757 y 25758 una por una. El cliente le paga al operario y él emite el recibo en la app.
- **Alcance 2:** Lucrecia emite las 12 facturas de septiembre (RHD 1–12) con un clic. El cliente recibe la factura en su portátil y el operario hace el recibo sin esperar a Helisa.
- **Final:** el operario, Lucrecia y el cliente saludan bajo la marca.
- **Aviso que queda:** `composition_file_too_large` aparece porque `armar.mjs` inserta los SVG de los personajes dentro de cada escena. Las fuentes en `escenas/` son cortas.

**Render v2:** 25 oct 2026, `renders/alcances-rh-digital.mp4`. Es un MP4 H.264 de 1920 × 1080 a 30 fps, con audio AAC; dura 116,4 s y pesa 19,3 MB. La v1, de 90 s, quedó como `renders/alcances-rh-digital-v1.mp4`.

## Cambios de la v2 (revisión de Adrián)

- **La solución tiene su presentación.** Después del papel entra «Por eso creamos RH digital» y luego «una app para el operario y un panel para la oficina». El celular de esa escena crece hasta su lugar en la visita.
- **Cada paso tiene una ficha «Hoy → Ahora»:** constancia, RH, pedido, recibo y lote.
- **El RH es un paso propio:** «Al cierre del mes, el sistema genera el RH».
- **El Alcance 1 sigue el flujo v6 completo:** Lucrecia importa el pedido, llama el pedido con F3 en Helisa y **registra la FVE de vuelta en el sistema**. Esa es la «ida y vuelta» que Julio criticó el 21 de octubre, y aparece con la nota «Con la API de Helisa (opcional), esto se hace solo». Después vienen el recibo y el archivo, y Helisa cruza solo.
- **El Alcance 2 muestra por qué resuelve lo que pidió Julio:** la factura sale sin pedido ni F3, se aprueba por lote y el recibo sale sin esperar a Helisa. A Helisa solo van los asientos de la factura y del recibo.

## Decisiones creativas

- **Guion A, «La línea que se alarga».** El riel es la cadena de trazabilidad del panel llevada a pantalla completa. La frontera ámbar marca dónde termina el Alcance 1, se abre en el piloto y el riel sigue en azul hasta la DIAN.
- **El dato que viaja es Cofema, septiembre:** 4 visitas, 413,85 kg, $2.244.935, el pedido OP 101, la FVE 25756, el recibo de $500.000 y el saldo de $1.744.935. Todas las cifras salen de los mockups v6.
- **Se muestra lo que sigue manual.** En el Alcance 1 aparece la etiqueta ámbar «A mano · una por una» sobre la FVE real de Helisa.
- **Material real.** Se usan la planilla RH de Cofema escrita a mano (de `fuentes/`) y las pantallas reales de la app y del panel. La RHD 1 lleva el aviso «Ejemplo con datos de prueba».
- **Fuera del video:** precios, semanas y el nombre de Factus. En pantalla dice «proveedor tecnológico». Desde la v2, Conekta aparece solo como nota, sin precio: «Con la API de Helisa (opcional), esto se hace solo».
- **Los guiones B y C no se construyeron.** B era «un mes en Comserva, tres veces», un antes y un después. C era «el papel que se vuelve dato», en tipografía cinética.

## Qué se midió y qué solo se miró

- **`npx hyperframes check`:** sin errores de lint, de ejecución, de movimiento ni de contraste. En diseño quedan solo avisos informativos: las pantallas del celular que esperan fuera de cuadro.
- **Avisos de lectura (`line_unread`):** se corrigieron todos; cada línea queda en pantalla el tiempo mínimo para leerla.
- **Revisión visual:** hoja de beats, seis tiras de cortes y hoja a ancho de celular (`snapshot --review`), más frames sacados del MP4 final. Se corrigieron tres cosas:
  - El celular mostraba siempre la pantalla de firmas, por un `immediateRender`.
  - El desplazamiento de kilos duplicaba el encabezado de la app.
  - Había dos cortes con un frame vacío.
- **Audio, solo medido en el MP4 v2:** −16,5 LUFS integrados, pico real de −2,5 dBTP y ningún recorte. **Nadie la ha escuchado:** conviene oírla antes de la reunión.

## Lo más débil

- **El panel de prefacturas** (Alcance 2, 82–87 s) es una captura densa y su letra se lee pequeña. Con más tiempo, se recortaría solo la tabla y el botón «Emitir lote».
- **La música es sintética** (colchón, arpegio, bombo y caja hechos con código) y no se pudo juzgar de oído. Si suena pobre en la sala, se cambia el archivo `assets/audio/musica.m4a` sin tocar la animación.

## Avisos que se dejan a propósito

- **`container_overflow` (informativo):** las pantallas del celular esperan fuera del recorte hasta que entran empujando.
