# Video · Los dos alcances de RH digital

Motion graphics para la reunión con Comserva del 28 de octubre de 2026. La **v5** dura 2 min 37 s: el Alcance 1 llega hasta los recibos y su archivo plano, y en Helisa se ve el menú real «Documento previo Pedidos · F3». La v4 dura 2 min 28 s, la v3 dura 2 min 18 s, la v2 1 min 56 s y la v1, 90 s. Muestra el sistema como **dos alcances**:

1. **Alcance 1:** de la visita en la app hasta Helisa (pedido y recibo).
2. **El piloto:** Comserva decide con un ciclo real.
3. **Alcance 2:** la factura electrónica validada por la DIAN, con Helisa para la contabilidad.

Los MP4 están en `renders/`:

- [`alcances-rh-digital-v6.mp4`](renders/alcances-rh-digital-v6.mp4) · **v6**, la vigente: la v5 con Lucrecia corregida (la cabeza ya no se ve separada del cuerpo).
- [`alcances-rh-digital-v5.mp4`](renders/alcances-rh-digital-v5.mp4) · **v5**: la v4 más el tramo del recibo, la descarga de los archivos y el menú real de F3.
- [`alcances-rh-digital-v4.mp4`](renders/alcances-rh-digital-v4.mp4) · **v4**: la v3 más el archivo plano y el resumen de cada alcance.
- [`alcances-rh-digital-v3.mp4`](renders/alcances-rh-digital-v3.mp4) · **v3**, con el operario, Lucrecia y el cliente animados.
- [`alcances-rh-digital.mp4`](renders/alcances-rh-digital.mp4) · v2.
- [`alcances-rh-digital-v1.mp4`](renders/alcances-rh-digital-v1.mp4) · v1.

## Personajes (v3)

Los personajes están dibujados en vector con código, por partes, en `personajes/`:

- **Personajes:** `operario.svg`, `lucrecia.svg` y `cliente.svg`.
- **Escenografía:** `camioneta.svg`, `edificio.svg` y `bascula.svg`.
- **Rig:** `rig.js` mueve las articulaciones (hombros, codos, manos, cadera, cabeza y ojos) y trae los gestos `pose`, `gesto`, `camina` y `parpadea`.

Las escenas se escriben en `escenas/`. **No se editan en `compositions/`**: `node tools/armar.mjs` arma `compositions/` insertando los personajes donde dice `<!-- @svg nombre prefijo -->` y el rig donde dice `/* @rig */`. Para probar poses, abre `personajes/prueba.html`.

## Las 4 capas

| Capa | Archivo |
| --- | --- |
| 1 · Guion | [BRIEF.md](BRIEF.md) (guion A elegido: «La línea que se alarga») |
| 2 · Storyboard y estilo | [STORYBOARD.md](STORYBOARD.md), [frame.md](frame.md), [SPEC.md](SPEC.md) |
| 3 · Animación | [index.html](index.html) y una página por escena en [escenas/](escenas/) (se arman en `compositions/`); el riel va en `riel.html`; los personajes, en [personajes/](personajes/) |
| 4 · Sonido | [tools/musica.mjs](tools/musica.mjs) escribe la música con código; [tools/musica-mezcla.sh](tools/musica-mezcla.sh) la normaliza |

La revisión y las decisiones están en [REVIEW.md](REVIEW.md).

## De dónde salen las imágenes

- **Pantallas de la app, el panel y los documentos:** se capturan de los mockups v6 con `node tools/capturar.mjs`. El script tapa en el DOM los teléfonos, los correos, las direcciones, las cuentas y el NIT de Cofema antes de capturar.
- **Papel real** (la planilla RH escrita a mano de Cofema y el recibo en blanco) **y los recortes de la FVE 25756:** salen de `fuentes/` con `bash tools/preparar-papel.sh`, que recorta y tapa los datos sensibles.

## Cómo volver a generarlo

Se necesitan Node 22 o superior y Google Chrome. ffmpeg y HyperFrames se instalan dentro de esta carpeta, sin Homebrew.

```bash
cd "v6 adrian/video-alcances"
```

```bash
npm install
```

```bash
source env.sh
```

```bash
npm run capturas
```

```bash
node tools/musica.mjs && bash tools/musica-mezcla.sh
```

```bash
node tools/armar.mjs
```

```bash
npx hyperframes check
```

```bash
npm run render
```

Para editar en vivo, `npx hyperframes preview` abre el estudio en el navegador.
