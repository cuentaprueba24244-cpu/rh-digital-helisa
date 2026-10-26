---
format: 1920x1080
duration: 116.4s
message: "Primero llegamos hasta Helisa y lo probamos con un ciclo real; si funciona, seguimos hasta la factura electrónica"
arc: Papel → La visita en la app → Cierre del mes → Alcance 1 hasta Helisa → Piloto → Alcance 2 factura electrónica → Mapa completo
audience: Comserva (Diego, Lucrecia, Julio y quien decide), reunión del 28 oct 2026
mode: autonomous
bpm: 100
---

# Storyboard · «La línea que se alarga»

> **Versión 2 (25 oct, después de la revisión de Adrián).** Es la que está renderizada. Agrega la escena «Por eso creamos RH digital», fichas «Hoy → Ahora» en cada paso, el RH como paso propio, la ida y vuelta de la FVE con la nota de la API de Helisa y el recibo sin esperar en el Alcance 2. Los tiempos de abajo (v1) quedan solo como referencia; los de la v2 son estos:
>
> | Escena | Archivo | Tiempo |
> | --- | --- | --- |
> | Hoy, en papel | `s1-papel.html` | 0–7,2 s |
> | Por eso creamos RH digital | `s1b-solucion.html` | 7,2–14,4 s |
> | La visita | `s2-app.html` | 14,4–28,8 s |
> | El RH | `s3-cierre.html` | 28,8–43,2 s |
> | Alcance 1 (pedido, F3, la FVE vuelve, cobro y cruce, frontera) | `s4-alcance1.html` | 43,2–72,0 s |
> | Piloto | `s5-piloto.html` | 72,0–79,2 s |
> | Alcance 2 (prefactura y lote, DIAN, correo, recibo sin esperar, asientos) | `s6-alcance2.html` | 79,2–103,2 s |
> | Mapa y marca | `s7-mapa.html` | 103,2–116,4 s |
>
> El riel va de 14,4 s a 103,2 s. El acorde final cae en el compás 46, a los 110,4 s.

**Capa 2 de 4.** Las reglas visuales están en [frame.md](frame.md) y los números de la película en [SPEC.md](SPEC.md).

**Música:** 100 BPM, de modo que un beat dura 0,6 s y un compás 2,4 s. Todas las escenas empiezan en un compás.

**El riel:** va abajo, a `y = 895`, desde los 7,2 s hasta los 76,8 s, en su propia composición (`compositions/riel.html`). Al final la escena 7 recibe una copia idéntica y la sube al centro.

| Nodo | x | Rótulo |
| --- | --- | --- |
| N1 | 260 | Visita |
| N2 | 640 | Cierre y planilla RH |
| N3 | 1020 | Helisa (en la escena 6 pasa a «Helisa · contabilidad») |
| Frontera | 1215 | — |
| N4 | 1410 | Factura electrónica |
| N5 | 1700 | Cliente |

## Frame 1 — Hoy, en papel (0–7,2 s)

- scene: La planilla RH real de Cofema, escrita a mano, y un recibo de caja en papel
- duration: 7.2s
- poster: 2.5s
- transition_in: cut
- status: animated
- src: compositions/s1-papel.html
- reads: "Cada visita, en papel" (0,3–3,0 s); un círculo ámbar marca el total 413,85 escrito a mano (2,6–3,4 s); "Cada mes, a sumar a mano" (3,4–6,0 s)
- sound: colchón suave y un pulso de madera en cada compás; un barrido de aire en el corte a la app

Desde el frame 0 los papeles ya están en pantalla, así que la miniatura nunca sale vacía. Al final se juntan y se encogen hacia el lugar del celular: el papel se convierte en la app.

## Frame 2 — La visita en la app (7,2–21,6 s)

- scene: Un celular grande con la app real del operario y los títulos a la derecha
- duration: 14.4s
- poster: 4.5s
- transition_in: el papel se convierte en el celular
- status: animated
- src: compositions/s2-app.html
- reads: "Sin señal, la app sigue funcionando" (0,5–2,8 s); "La visita es la única captura" con el total que se suma solo, 99,50 kg (3,2–6,4 s); "Firma, foto y GPS en el sitio" (6,8–9,4 s); "La constancia sale al instante · por WhatsApp" (9,9–14,2 s)
- sound: entran el arpegio y un bombo suave; un pop cuando se enciende el nodo Visita

Las pantallas cambian empujando como en la app. Al final, una ficha «N.º 1186 · 99,50 kg» sale del celular y viaja al nodo N1, que se enciende.

## Frame 3 — Cierre del mes (21,6–33,6 s)

- scene: Cuatro constancias de septiembre se suman en una cifra y una tarifa, y sale la planilla RH
- duration: 12s
- poster: 7s
- transition_in: las fichas siguen el movimiento de la ficha anterior
- status: animated
- src: compositions/s3-cierre.html
- reads: "El cierre del mes se suma solo" (0,3–2,6 s); "413,85 kg · 4 visitas" (2,4–4,4 s); "Básico + kilos adicionales + IVA 19 %" (4,4–5,6 s); "$2.244.935" (5,8–8,0 s); "Planilla RH con valores, lista" (8,0–11,8 s)
- sound: entran el bajo y los platillos; un pop cuando se enciende Cierre

## Frame 4 — Alcance 1 · hasta Helisa (33,6–52,8 s)

- scene: Pedido OP 101 → FVE 25756 hecha a mano en Helisa → recibo de $500.000 → la frontera
- duration: 19.2s
- poster: 9s
- transition_in: barrido horizontal en la dirección del riel
- status: animated
- src: compositions/s4-alcance1.html
- reads: "Alcance 1 · Hasta Helisa" (0,2–2,3 s); "Del cierre sale el pedido para Helisa" (2,7–6,9 s); "Lucrecia hace la factura en Helisa" y la etiqueta «A mano · una por una» (7,5–11,7 s); "Con la factura, el operario cobra" y el saldo $1.744.935 (12,3–15,4 s); "Hasta aquí llega el Alcance 1" (15,9–19,0 s)
- sound: el ritmo completo; un golpe seco cuando cae la frontera

## Frame 5 — El piloto (52,8–60,0 s)

- scene: Un anillo de un mes completo (visitas → cierre → Helisa → cobro) y la frontera cerrada
- duration: 7.2s
- poster: 4s
- transition_in: el ritmo se detiene y queda solo el colchón
- status: animated
- src: compositions/s5-piloto.html
- reads: "Primero, un piloto de un ciclo real" (0,4–3,4 s); "Comserva decide con sus propios datos" (3,6–5,8 s); "Si funciona, seguimos" (6,0–7,0 s)
- sound: quiebre: colchón, un latido grave y un barrido que sube hacia el Alcance 2

## Frame 6 — Alcance 2 · factura electrónica (60,0–76,8 s)

- scene: La frontera se abre y el riel se alarga en azul: prefactura → validación DIAN → correo al cliente → Helisa para la contabilidad
- duration: 16.8s
- poster: 8s
- transition_in: barrido horizontal
- status: animated
- src: compositions/s6-alcance2.html
- reads: "Alcance 2 · La factura electrónica" (0,2–2,3 s); "La misma planilla RH se vuelve prefactura" con «Lucrecia revisa y aprueba por lote» (2,7–5,8 s); "La valida la DIAN" con la RHD 1, el CUFE y el sello «Validada DIAN» (6,2–10,6 s); "Le llega sola al correo del cliente" (11,0–14,2 s); "Helisa queda para la contabilidad" (14,6–16,6 s)
- sound: el ritmo vuelve más brillante, con el arpegio una octava arriba; un pop en cada nodo azul

## Frame 7 — El mapa completo (76,8–90,0 s)

- scene: El riel sube al centro con los dos alcances marcados, la frase final y la marca
- duration: 13.2s
- poster: 5s
- transition_in: la cámara se aleja con el riel
- status: animated
- src: compositions/s7-mapa.html
- reads: llaves «Alcance 1 · hasta Helisa», «Piloto» y «Alcance 2 · factura electrónica» (1,2–3,4 s); "Primero hasta Helisa. Después, la factura electrónica" (3,6–7,4 s); tarjeta final "RH digital · Comserva S.A.S." (8,4–13,2 s)
- sound: el ritmo se apaga en el compás 35; acorde final en el compás 37, a los 88,8 s
