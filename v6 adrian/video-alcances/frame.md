---
name: RH digital Comserva · video de alcances
colors:
  ground: "#f3f6f4"      # fondo de los mockups (--bg)
  surface: "#ffffff"     # tarjetas y documentos (--surface)
  ink: "#1c2420"         # texto principal (--gris-900)
  ink-2: "#46524c"       # texto secundario (--gris-700)
  line-off: "#c8d0cb"    # riel pendiente (--gris-300)
  verde: "#2b6a4b"       # Alcance 1, acento principal (--verde-600)
  verde-900: "#123d2b"   # cifras grandes y tarjeta final (--verde-900)
  verde-100: "#dcefe4"   # fondos suaves de estado (--verde-100)
  ambar: "#d9a21b"       # frontera y lo manual: rellenos (--ambar-500)
  ambar-ink: "#8a5d00"   # texto ámbar sobre fondo claro (pasa contraste)
  ambar-100: "#fbf0d2"   # fondo de la etiqueta «a mano» (--ambar-100)
  azul: "#1f5fa8"        # Alcance 2 (--azul-600)
  azul-100: "#dfeafa"    # fondo suave del Alcance 2 (--azul-100)
typography:
  display: { family: Figtree, weight: 800, size: 88px, tracking: -0.02em }
  chapter: { family: Figtree, weight: 800, size: 200px, tracking: -0.03em }
  sub: { family: Figtree, weight: 500, size: 38px }
  label: { family: Figtree, weight: 600, size: 28px }
  number: { family: Figtree, weight: 800, size: 150px, tracking: -0.03em, features: tnum }
  mono: { family: JetBrains Mono, weight: 500, size: 30px }
spacing:
  margin: 120px
  content-top: 64px
  content-bottom: 840px   # debajo vive el riel
  rail-y: 895px
components:
  card: { radius: 20px, shadow: "0 2px 4px rgba(18,61,43,.10), 0 18px 48px rgba(18,61,43,.12)" }
  phone: { bezel: "#0f1512", radius: 62px, screen-radius: 50px, padding: 12px }
  node: { size: 52px, stroke: 3px, icon-stroke: 2px }
---

# Reglas visuales del video

**De dónde sale el estilo:** de los mockups v6 que Comserva ya vio. Se usan el verde bosque de la marca, el ámbar del logo, los neutros con sesgo verde y la tipografía Figtree. Los colores se copian tal cual de `assets/style.css` del mockup. No se inventa una estética nueva.

## El medio

Las piezas que aparecen en el video son tres, siempre las mismas:

1. **Pantallas reales** de la app, el panel y los documentos, capturadas de los mockups. Nunca se redibujan.
2. **Papel real** de Comserva: la planilla RH escrita a mano y el recibo de caja en blanco.
3. **El riel**, la cadena de trazabilidad del panel llevada a pantalla completa. Son círculos con ícono de trazo, unidos por una línea. Es el hilo del video.

## Lo que carga cada color

| Color | Solo para |
| --- | --- |
| Verde `#2b6a4b` | Alcance 1: la línea que avanza, los nodos completos y la palabra «Alcance 1» |
| Ámbar `#d9a21b` / `#8a5d00` | La frontera, el piloto y lo que sigue a mano (la FVE una a una) |
| Azul `#1f5fa8` | Alcance 2: la extensión del riel y la palabra «Alcance 2» |
| Verde 900 `#123d2b` | Cifras grandes (413,85 kg, $2.244.935) y la tarjeta final |

Una sola palabra destacada por título.

## Movimiento

- **Las llegadas** usan `expo.out` en 0,7 s. **Los recorridos y la cámara**, `power2.inOut` en 0,8 s. **Las salidas**, `power3.in` en 0,35 s.
- **Los títulos** entran palabra por palabra, con desenfoque de 6 px a 0 y opacidad de 0 a 1 en 0,13 s, separadas 0,067 s, sin desplazamiento. Una vez que llegan quedan quietos.
- **Las pantallas del celular** cambian como en la app: la nueva empuja desde la derecha (0,45 s, `power3.inOut`). El desplazamiento dentro de una pantalla va de abajo hacia arriba.
- **La línea del riel** se dibuja de izquierda a derecha. Al encenderse, el nodo se llena en 0,25 s y su visto aparece después.
- **Los cortes** caen en compás (100 BPM, compás de 2,4 s).

## Prohibido en este video

- Fondo oscuro, brillos, partículas, degradados morados o azules, tarjetas de vidrio.
- Tres tarjetas en fila, cuadrículas de indicadores, logo fijo en una esquina.
- Que todo entre con el mismo «fundido y sube».
- Títulos que se muevan mientras se leen. Bucles de «respiración».
- Precios del equipo, tiempos o semanas, y Conekta.
- Datos sensibles: teléfonos, correos, direcciones, cuentas bancarias, el NIT de Cofema.
