# Video · Los dos alcances de RH digital

Motion graphics de 1 min 56 s para la reunión con Comserva del 28 de octubre de 2026. Muestra el sistema como **dos alcances**:

1. **Alcance 1:** de la visita en la app hasta Helisa (pedido y recibo).
2. **El piloto:** Comserva decide con un ciclo real.
3. **Alcance 2:** la factura electrónica validada por la DIAN, con Helisa para la contabilidad.

El MP4 queda en [`renders/alcances-rh-digital.mp4`](renders/alcances-rh-digital.mp4).

## Las 4 capas

| Capa | Archivo |
| --- | --- |
| 1 · Guion | [BRIEF.md](BRIEF.md) (guion A elegido: «La línea que se alarga») |
| 2 · Storyboard y estilo | [STORYBOARD.md](STORYBOARD.md), [frame.md](frame.md), [SPEC.md](SPEC.md) |
| 3 · Animación | [index.html](index.html) y una página por escena en [compositions/](compositions/); el riel va en `riel.html` |
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
npx hyperframes check
```

```bash
npm run render
```

Para editar en vivo, `npx hyperframes preview` abre el estudio en el navegador.
