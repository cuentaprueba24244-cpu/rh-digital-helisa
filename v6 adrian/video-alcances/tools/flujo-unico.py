# Genera la hoja «Flujo RH digital Comserva (v6, una hoja)»: un solo diagrama de carriles con los dos alcances.
import html, sys

W, H = 2240, 1300
X0 = 190                     # primera columna
CW, GAP = 172, 24            # ancho de tarjeta y separación
def cx(c):                   # x izquierda de la columna c
    base = X0 + c * (CW + GAP)
    if c >= 6: base += 64    # espacio para la frontera del piloto
    return base

LANES = [  # id, título, sub, y, alto, color
    ("cli", "Cliente", "lo que recibe", 214, 112, "#6f7c75"),
    ("op", "Operario", "app en el celular", 334, 138, "#a86a00"),
    ("sis", "Sistema", "RH digital · panel", 480, 138, "#1f5e43"),
    ("lu", "Lucrecia", "facturación", 626, 138, "#2f7d59"),
    ("he", "Helisa", "contabilidad y cartera", 772, 138, "#3d6575"),
    ("dian", "Proveedor y DIAN", "solo en el Alcance 2", 918, 112, "#5b4b8a"),
]
LY = {l[0]: (l[3], l[4]) for l in LANES}

def card_xy(lane, col, h=None):
    y, lh = LY[lane]
    hh = h or (lh - 18)
    return cx(col), y + (lh - hh) / 2, CW, hh

out = []
RAYA = ' stroke-dasharray="6 3"'
PUNTOS = ' stroke-dasharray="5 4"'
def add(s): out.append(s)
def esc(t): return html.escape(t, quote=False)

# ---------- tarjetas ----------
def paso(lane, col, num, titulo, lineas, tono="v", manual=False, tag=None, tag_tono=None):
    x, y, w, h = card_xy(lane, col)
    borde = {"v": "#2f7d59", "a": "#2c5d8a", "c": "#46534c"}[tono]
    insignia = {"v": "#1f5e43", "a": "#2c5d8a", "c": "#46534c"}[tono]
    fondo = "#fff"
    if manual:
        fondo, borde = "url(#rayado)", "#b77f0d"
    add(f'<g filter="url(#sombra)"><rect x="{x}" y="{y}" width="{w}" height="{h}" rx="9" fill="{fondo}" stroke="{borde}" stroke-width="1.4"{RAYA if manual else ""}/></g>')
    add(f'<rect x="{x+10}" y="{y-1.5}" width="{w-20}" height="4" rx="2" fill="{borde}"/>')
    add(f'<circle cx="{x+16}" cy="{y+18}" r="10.5" fill="{insignia}"/>')
    add(f'<text x="{x+16}" y="{y+22}" font-size="{10 if len(num)>1 else 11}" font-weight="800" fill="#fff" text-anchor="middle">{esc(num)}</text>')
    add(f'<text x="{x+32}" y="{y+23}" font-size="12.6" font-weight="800" fill="#16231d">{esc(titulo)}</text>')
    for i, l in enumerate(lineas):
        bold = l.startswith("*")
        t = l[1:] if bold else l
        add(f'<text x="{x+11}" y="{y+42+i*14.2}" font-size="11" fill="{"#16231d" if bold else "#46534c"}" font-weight="{700 if bold else 400}">{esc(t)}</text>')
    if tag:
        c = {"m": ("#fbf0d2", "#8a5d00", "#b77f0d"), "api": ("#eef2f6", "#3d6575", "#3d6575"), "v": ("#e7f2ec", "#1f5e43", "#2f7d59")}[tag_tono or "m"]
        tw = 7.2 * len(tag) + 16
        add(f'<rect x="{x+w-tw-6}" y="{y-10}" width="{tw}" height="18" rx="9" fill="{c[0]}" stroke="{c[2]}"/>')
        add(f'<text x="{x+w-tw/2-6}" y="{y+3}" font-size="9.6" font-weight="800" fill="{c[1]}" text-anchor="middle">{esc(tag)}</text>')
    return (x, y, w, h)

def doc(col, titulo, l1, l2, tono="v"):
    x, y, w, h = card_xy("cli", col, 74)
    c = "#2f7d59" if tono == "v" else "#2c5d8a"
    add(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="8" fill="#fff" stroke="{c}" stroke-width="1.2"/>')
    add(f'<path d="M{x+12} {y+14} h15 l7 7 v25 h-22 z" fill="#fff" stroke="{c}" stroke-width="1.4"/><text x="{x+23}" y="{y+40}" font-size="7" font-weight="800" fill="{c}" text-anchor="middle">PDF</text>')
    add(f'<text x="{x+44}" y="{y+24}" font-size="12" font-weight="800" fill="#16231d">{esc(titulo)}</text>')
    add(f'<text x="{x+44}" y="{y+40}" font-size="10.6" fill="#46534c">{esc(l1)}</text>')
    add(f'<text x="{x+44}" y="{y+54}" font-size="10.6" fill="#46534c">{esc(l2)}</text>')
    return (x, y, w, h)

def flecha(d, color="#46534c", punteada=False, marca="n"):
    add(f'<path d="{d}" fill="none" stroke="{color}" stroke-width="1.6"{PUNTOS if punteada else ""} marker-end="url(#p-{marca})" stroke-linejoin="round"/>')

def rotulo(x, y, t, color="#46534c", anchor="start", peso=600):
    add(f'<text x="{x}" y="{y}" font-size="10.4" font-weight="{peso}" fill="{color}" text-anchor="{anchor}">{esc(t)}</text>')

# ---------- fondo, encabezado y leyenda ----------
add(f'<rect width="{W}" height="{H}" fill="#f6f8f7"/>')
add('<text x="40" y="46" font-size="13" font-weight="800" fill="#2f7d59" letter-spacing="1.2">RH DIGITAL COMSERVA · V6 · LAS DOS PROPUESTAS EN UN SOLO FLUJO</text>')
add('<text x="40" y="84" font-size="31" font-weight="800" fill="#16231d">De la visita a Helisa (Alcance 1) y, después del piloto, a la factura electrónica (Alcance 2)</text>')
add('<text x="40" y="112" font-size="16" fill="#46534c">Ejemplo real: <tspan font-weight="800" fill="#16231d">Cofema, septiembre de 2026</tspan> · 4 visitas · 413,85 kg · $2.244.935 · en Helisa fue la FVE 25756</text>')
ley = [("#1f5e43", "Tramo común y Alcance 1 (Propuesta 1)"), ("#2c5d8a", "Alcance 2 (Propuesta 2)"), ("#b77f0d", "Sigue a mano o es una «vuelta» al sistema"), ("#3d6575", "Lo automatiza la API Conekta (opcional, 1B)")]
for i, (c, t) in enumerate(ley):
    lx = 1500 + (i % 2) * 360; ly = 40 + (i // 2) * 30
    add(f'<rect x="{lx}" y="{ly}" width="22" height="16" rx="4" fill="{c}"/>')
    add(f'<text x="{lx+32}" y="{ly+13}" font-size="13" fill="#46534c">{esc(t)}</text>')

# bandas de etapa
def banda(x1, x2, color, titulo, sub):
    add(f'<rect x="{x1}" y="150" width="{x2-x1}" height="38" rx="8" fill="{color}"/>')
    add(f'<text x="{x1+14}" y="175" font-size="14" font-weight="800" fill="#fff">{esc(titulo)}</text>')
    add(f'<text x="{x2-14}" y="175" font-size="11.5" fill="#e6efe9" text-anchor="end">{esc(sub)}</text>')
banda(cx(0) - 8, cx(1) + CW + 8, "#46534c", "TRAMO COMÚN", "igual en los dos alcances")
banda(cx(2) - 8, cx(5) + CW + 8, "#1f5e43", "ALCANCE 1 · hasta Helisa", "RH digital entrega los archivos planos · Helisa sigue facturando")
banda(cx(6) - 8, cx(9) + CW + 8, "#2c5d8a", "ALCANCE 2 · factura electrónica", "RH digital factura sin depender de Helisa · reemplaza A1 a A5")

# carriles
for lid, t, sub, y, h, c in LANES:
    fondo = "#eef3f8" if lid == "he" else ("#f4f2fa" if lid == "dian" else "#ffffff")
    add(f'<rect x="30" y="{y}" width="{W-60}" height="{h}" rx="10" fill="{fondo}" stroke="#d5ddd8"/>')
    add(f'<rect x="30" y="{y}" width="6" height="{h}" rx="3" fill="{c}"/>')
    add(f'<text x="50" y="{y+h/2-4}" font-size="16" font-weight="800" fill="#16231d">{esc(t)}</text>')
    add(f'<text x="50" y="{y+h/2+14}" font-size="11.5" fill="#6e7b74">{esc(sub)}</text>')

# frontera del piloto
fx = cx(5) + CW + 16
add(f'<rect x="{fx}" y="150" width="40" height="{LY["dian"][0]+LY["dian"][1]-150}" rx="8" fill="#fbf0d2" stroke="#b77f0d" stroke-width="1.4"/>')
add(f'<text transform="translate({fx+25} {(150+LY["dian"][0]+LY["dian"][1])/2}) rotate(-90)" font-size="13" font-weight="800" fill="#8a5d00" text-anchor="middle" letter-spacing="0.4">HASTA AQUÍ LLEGA EL ALCANCE 1 · HELISA SIGUE FACTURANDO · UN MES DE PRUEBA · SI FUNCIONA, ALCANCE 2</text>')

# ---------- tramo común ----------
c1 = paso("op", 0, "1", "Visita y pesaje", ["Días 5, 12, 19 y 22", "Kilos por categoría,", "firmas, foto y GPS", "*Funciona sin señal"], "c")
c2 = paso("sis", 0, "2", "Cierre del cliente", ["Desde el día 20, o todos", "el 26 (Lucrecia da el clic)", "Suma las 4 visitas:", "*413,85 kg"], "c")
c3 = paso("sis", 1, "3", "Planilla RH", ["Aplica la tarifa: básico", "+ kg, solo por kilo o", "fijo mensual", "*Total $2.244.935"], "c")
d1 = doc(0, "Constancia", "PDF de cada visita,", "por WhatsApp")
d2 = doc(1, "Planilla del mes", "El RH en PDF, al", "cerrar el cliente")
flecha(f"M{c1[0]+CW/2} {c1[1]} L{c1[0]+CW/2} {d1[1]+d1[3]+2}", "#2f7d59", True, "v")
flecha(f"M{c1[0]+CW/2} {c1[1]+c1[3]} L{c1[0]+CW/2} {c2[1]-3}")
rotulo(c1[0]+CW/2+6, c1[1]+c1[3]+16, "cada visita sube")
flecha(f"M{c2[0]+CW} {c2[1]+c2[3]/2} L{c3[0]-3} {c3[1]+c3[3]/2}")
flecha(f"M{c3[0]+CW/2} {c3[1]} L{c3[0]+CW/2} {d2[1]+d2[3]+2}", "#2f7d59", True, "v")

# ---------- alcance 1 ----------
a1 = paso("sis", 2, "A1", "Archivo plano: pedidos", ["Uno por cliente o sede", "Excel de Julio: tipo OP,", "24 columnas", "*Sin cuentas ni IVA"], "v", tag="1B: por Conekta", tag_tono="api")
a2 = paso("lu", 2, "A2", "Importa pedidos", ["Menú Importar pedidos", "Un archivo trae a", "todos los clientes", "*Pedido: importado"], "v", tag="1B: no hace falta", tag_tono="api")
a3 = paso("lu", 3, "A3", "Factura como hoy (F3)", ["Abre la factura de", "cada cliente y llama", "su pedido", "*A mano · una por una"], "v", manual=True, tag="Manual", tag_tono="m")
a4 = paso("he", 3, "A4", "Emite la FVE", ["Calcula el IVA,", "contabiliza (1305) y", "la envía a la DIAN", "*FVE 25756 · $2.244.935"], "v")
a5 = paso("lu", 4, "A5", "La FVE vuelve", ["La registra por listado", "o digitándola; se valida", "contra el RH (± $1)", "*Habilita el cobro"], "v", manual=True, tag="1.ª vuelta", tag_tono="m")
a6 = paso("op", 5, "A6", "Cobro", ["*Efectivo: recibo en la app", "(solo con FVE registrada)", "Transferencia: soporte por", "WhatsApp; la oficina lo marca"], "v")
a7 = paso("sis", 5, "A7", "Archivo plano: recibos", ["Movimiento contable:", "caja o bancos vs. 1305,", "con la FVE que cruza", "*17 columnas · F y N"], "v", tag="1B: por Conekta", tag_tono="api")
a8 = paso("he", 5, "A8", "Cruza en cartera", ["Lucrecia importa el RC", "y anota el N.º del", "recibo definitivo", "*Saldo $1.744.935"], "v", tag="2.ª vuelta", tag_tono="m")
d3 = doc(4, "Factura FVE", "Electrónica; la", "envía Helisa")
d4 = doc(5, "Recibo de caja", "PDF por WhatsApp,", "al pagar")
G, A, N = "#2f7d59", "#2c5d8a", "#46534c"
flecha(f"M{c3[0]+CW} {c3[1]+c3[3]/2} L{a1[0]-3} {a1[1]+a1[3]/2}", G, marca="v")
flecha(f"M{a1[0]+CW/2} {a1[1]+a1[3]} L{a2[0]+CW/2} {a2[1]-12}", G, marca="v")
rotulo(a1[0]+CW/2+6, a1[1]+a1[3]+16, "descarga", G)
flecha(f"M{a2[0]+CW} {a2[1]+a2[3]/2} L{a3[0]-3} {a3[1]+a3[3]/2}", G, marca="v")
rotulo(a2[0]+CW+3, a2[1]+a2[3]/2-6, "llama", G)
flecha(f"M{a3[0]+CW/2} {a3[1]+a3[3]} L{a4[0]+CW/2} {a4[1]-3}", G, marca="v")
rotulo(a3[0]+CW/2+6, a3[1]+a3[3]+16, "la guarda", G)
xg = a5[0] - 12
flecha(f"M{a4[0]+CW} {a4[1]+a4[3]/2} L{xg} {a4[1]+a4[3]/2} L{xg} {d3[1]+d3[3]+2}", G, True, "v")
rotulo(xg-6, LY["op"][0]+40, "envía al cliente", G, "end")
flecha(f"M{a4[0]+CW} {a4[1]+a4[3]-14} L{a5[0]+CW/2} {a4[1]+a4[3]-14} L{a5[0]+CW/2} {a5[1]+a5[3]+3}", "#b77f0d", marca="m")
rotulo(a5[0]+CW/2+6, a4[1]+a4[3]-20, "N.º, fecha y total", "#8a5d00")
flecha(f"M{a5[0]+CW} {a5[1]+22} L{a5[0]+CW+12} {a5[1]+22} L{a5[0]+CW+12} {a6[1]+a6[3]/2} L{a6[0]-3} {a6[1]+a6[3]/2}", G, marca="v")
rotulo(a5[0]+CW+6, LY["op"][0]+96, "habilita", G, "end")
rotulo(a5[0]+CW+6, LY["op"][0]+109, "el cobro", G, "end")
flecha(f"M{a6[0]+CW/2} {a6[1]} L{a6[0]+CW/2} {d4[1]+d4[3]+2}", G, True, "v")
flecha(f"M{a6[0]+CW/2} {a6[1]+a6[3]} L{a7[0]+CW/2} {a7[1]-12}", G, marca="v")
rotulo(a6[0]+CW/2+6, a6[1]+a6[3]+16, "entrega", G)
flecha(f"M{a7[0]+CW/2} {a7[1]+a7[3]} L{a8[0]+CW/2} {a8[1]-12}", G, marca="v")
rotulo(a7[0]+CW/2+6, a7[1]+a7[3]+70, "importa", G)
for i, t in enumerate(["Hasta aquí llega el", "sistema: la factura,", "la contabilidad y la", "cartera siguen en", "Helisa, como hoy."]):
    add(f'<text x="{cx(2)+4}" y="{LY["he"][0]+34+i*16}" font-size="11.6" font-weight="{700 if i == 0 else 400}" fill="#2c5d8a" font-style="italic">{esc(t)}</text>')

# ---------- alcance 2 ----------
b1 = paso("sis", 6, "B1", "Prefactura", ["Del mismo RH: líneas,", "IVA 19 % y datos", "fiscales del cliente", "*Total $2.244.935"], "a")
b2 = paso("lu", 6, "B2", "Revisa y aprueba", ["Corrige o aprueba las", "prefacturas del corte", "y emite todas de", "*una vez (por lote)"], "a")
b3 = paso("dian", 7, "B3", "Firma y valida", ["El proveedor (Factus) firma;", "la DIAN valida: CUFE,", "*XML, PDF y QR"], "a")
b4 = paso("cli", 8, "B4", "Factura electrónica", ["PDF y XML al correo", "de recepción", "*Llega sola"], "a")
b5 = paso("op", 8, "B5", "Cobro sin esperar", ["*Efectivo: recibo en la app", "apenas la DIAN valida", "Transferencia: la oficina", "marca el pago recibido"], "a")
b6 = paso("sis", 9, "B6", "Asientos a Helisa", ["Factura: 1305, ingreso", "e IVA · Recibo: caja o", "bancos vs. 1305 · F y N", "*Por archivo o Conekta"], "a")
b7 = paso("he", 9, "B7", "Contabilidad y cartera", ["Helisa importa los", "asientos y cruza el pago", "Ya no hace las facturas", "*Saldo $1.744.935"], "a")
ytop = 200
flecha(f"M{c3[0]+CW-30} {c3[1]} L{c3[0]+CW-30} {ytop} L{b1[0]+40} {ytop} L{b1[0]+40} {b1[1]-3}", A, True, "a")
add(f'<rect x="{cx(3)-30}" y="{ytop-10}" width="470" height="20" rx="10" fill="#e6eef6" stroke="#2c5d8a"/>')
add(f'<text x="{cx(3)+205}" y="{ytop+4}" font-size="10.8" font-weight="800" fill="#2c5d8a" text-anchor="middle">Alcance 2: del mismo RH sale la prefactura (sin pedido, sin F3, sin vuelta)</text>')
flecha(f"M{b1[0]+CW/2} {b1[1]+b1[3]} L{b2[0]+CW/2} {b2[1]-3}", A, marca="a")
rotulo(b1[0]+CW/2+6, b1[1]+b1[3]+16, "revisión", A)
flecha(f"M{b2[0]+CW} {b2[1]+b2[3]/2} L{b3[0]+CW/2} {b2[1]+b2[3]/2} L{b3[0]+CW/2} {b3[1]-3}", A, marca="a")
rotulo(b2[0]+CW+6, b2[1]+b2[3]/2-6, "lote por API", A)
xb = b4[0] - 12
flecha(f"M{b3[0]+CW} {b3[1]+b3[3]/2} L{xb} {b3[1]+b3[3]/2} L{xb} {b4[1]+b4[3]/2} L{b4[0]-3} {b4[1]+b4[3]/2}", A, marca="a")
flecha(f"M{xb} {b5[1]+b5[3]/2} L{b5[0]-3} {b5[1]+b5[3]/2}", A, marca="a")
rotulo(xb-6, b5[1]+b5[3]+20, "validada:", A, "end")
rotulo(xb-6, b5[1]+b5[3]+33, "habilita el cobro", A, "end")
xb2 = b6[0] - 12
flecha(f"M{b5[0]+CW} {b5[1]+b5[3]/2} L{xb2} {b5[1]+b5[3]/2} L{xb2} {b6[1]+b6[3]/2} L{b6[0]-3} {b6[1]+b6[3]/2}", A, marca="a")
flecha(f"M{b6[0]+CW/2} {b6[1]+b6[3]} L{b7[0]+CW/2} {b7[1]-3}", A, marca="a")
rotulo(b6[0]+CW/2+6, b6[1]+b6[3]+16, "importa", A)
add(f'<text x="{cx(6)}" y="{LY["he"][0]+36}" font-size="11.6" font-weight="700" fill="#2c5d8a" font-style="italic">El sistema factura; Helisa queda para</text>')
add(f'<text x="{cx(6)}" y="{LY["he"][0]+52}" font-size="11.6" fill="#2c5d8a" font-style="italic">la contabilidad y la cartera.</text>')
add(f'<text x="{cx(6)}" y="{LY["he"][0]+80}" font-size="11.2" fill="#46534c">Si hay un error: nota crédito</text>')
add(f'<text x="{cx(6)}" y="{LY["he"][0]+95}" font-size="11.2" fill="#46534c">con el CUFE, aprobada por Gerencia.</text>')
add(f'<text x="{cx(0)}" y="{LY["dian"][0]+40}" font-size="11.6" fill="#6e7b74" font-style="italic">En el Alcance 1 este carril no se usa: la DIAN recibe la FVE desde Helisa (A4).</text>')
add(f'<text x="{cx(0)}" y="{LY["dian"][0]+62}" font-size="11.6" font-weight="700" fill="#3d6575">Con Conekta (1B, opcional): A1, A2, A5 y A7 se hacen solos (campos por confirmar). La FVE sigue haciéndose una por una (A3).</text>')
add(f'<text x="{cx(0)}" y="{LY["dian"][0]+84}" font-size="11.6" fill="#6e7b74" font-style="italic">Alcance 2: proveedor tecnológico Factus, probado en su sandbox el 23 oct; habilitación ante la DIAN por verificar.</text>')

# ---------- cajas inferiores ----------
by = 1052
def caja(x, w, titulo, filas, color="#16231d", fondo="#fff", borde="#d5ddd8"):
    add(f'<rect x="{x}" y="{by}" width="{w}" height="212" rx="12" fill="{fondo}" stroke="{borde}"/>')
    add(f'<text x="{x+18}" y="{by+30}" font-size="15" font-weight="800" fill="{color}">{esc(titulo)}</text>')
    for i, f in enumerate(filas):
        add(f'<text x="{x+18}" y="{by+56+i*20.5}" font-size="12" fill="#46534c">{f}</text>')
B = lambda t: f'<tspan font-weight="700" fill="#16231d">{esc(t)}</tspan>'
caja(30, 760, "Qué cambia para Lucrecia", [
    f'{B("Hoy:")} suma kilos, calcula cada cobro y digita cada factura y cada recibo.',
    f'{B("Alcance 1:")} importa pedidos, llama cada pedido con F3, registra la FVE e importa',
    'recibos. Con Conekta, las importaciones y el registro se automatizan.',
    f'{B("Alcance 2:")} revisa y aprueba las facturas por lote; importa los asientos.',
    f'{B("Operario")} (los dos alcances): visita, constancia y recibo en la app, aun sin señal.',
    f'{B("Cliente:")} constancia y recibo por WhatsApp; en el Alcance 2, además, la factura',
    'electrónica le llega sola al correo.'])
caja(810, 640, "Reglas que no se rompen", [
    f'{B("La visita es la única captura.")} Nadie vuelve a sumar ni a digitar kilos.',
    f'{B("Sin factura no hay recibo.")} El recibo de la app es para pagos en efectivo.',
    f'{B("Cada RH entra en una sola factura.")} Ningún cierre se cobra dos veces.',
    f'{B("Lo firmado no se edita.")} Se anula con motivo y se hace otro.',
    f'{B("Trazabilidad:")} cada paso deja su documento enlazado, con fecha,',
    'usuario y huella; se busca por cualquier número.'])
caja(1470, W-1500, "Por confirmar en la Fase 0", [
    f'{B("Pedido en Helisa:")} hoy no está habilitado; quién lo habilita y su costo.',
    f'{B("Archivo:")} formato aceptado (.xlsx, .xls o .txt) en una importación de prueba.',
    f'{B("Cruce:")} prefijo FEV o FVE · recibo RC1 o RC2 · cuentas del libro N.',
    f'{B("Volumen:")} facturas del servicio de residuos e IVA, con el contador.',
    f'{B("Conekta (1B):")} si Comserva la toma y qué campos devuelve.',
    f'{B("Alcance 2:")} habilitación de Factus ante la DIAN, prefijo real y que la',
    'cartera de Helisa acepte ese prefijo.'], "#8a5d00", "#fdf6e3", "#e9c46a")
add(f'<text x="40" y="{H-14}" font-size="11.5" fill="#6e7b74">RH digital Comserva · flujo único de la v6: Propuesta 1 (Alcance 1) y Propuesta 2 (Alcance 2) · según los flujos de cada propuesta y el Excel de Julio (23 oct) · 26 de octubre de 2026</text>')

defs = '''<defs>
<filter id="sombra" x="-10%" y="-10%" width="120%" height="135%"><feDropShadow dx="0" dy="1.2" stdDeviation="1.6" flood-color="#16231d" flood-opacity="0.10"/></filter>
<pattern id="rayado" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="7" height="7" fill="#fdf6e3"/><line x1="0" y1="0" x2="0" y2="7" stroke="#e9c46a" stroke-width="2" opacity="0.55"/></pattern>
<marker id="p-n" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto"><path d="M0 0L10 5L0 10z" fill="#46534c"/></marker>
<marker id="p-v" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto"><path d="M0 0L10 5L0 10z" fill="#2f7d59"/></marker>
<marker id="p-a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto"><path d="M0 0L10 5L0 10z" fill="#2c5d8a"/></marker>
<marker id="p-m" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto"><path d="M0 0L10 5L0 10z" fill="#b77f0d"/></marker>
</defs>'''

svg = f'<svg viewBox="0 0 {W} {H}" xmlns="http://www.w3.org/2000/svg" font-family="Figtree, Segoe UI, system-ui, sans-serif" role="img" aria-label="Flujo único de RH digital Comserva con los dos alcances">{defs}' + "\n".join(out) + '</svg>'
pagina = f'''<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Flujo RH digital Comserva · una hoja</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Figtree:wght@400;600;700;800&display=swap">
<style>
  @page {{ size: 420mm 244mm; margin: 0; }}
  html, body {{ margin: 0; background: #f6f8f7; }}
  .lienzo {{ width: 100%; max-width: {W}px; margin: 0 auto; }}
  svg {{ display: block; width: 100%; height: auto; }}
</style>
</head>
<body>
<div class="lienzo">
{svg}
</div>
</body>
</html>
'''
open(sys.argv[1], "w").write(pagina)
print("ok")
