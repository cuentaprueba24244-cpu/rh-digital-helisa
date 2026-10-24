#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Prueba de la propuesta B contra el sandbox de MATIAS API (Lopezsoft S.A.S.).

Emite la factura de Cofema de septiembre de 2026 (RH 22690-26: 413,85 kg,
$2.244.935) tal como la armaría RH digital, consulta el estado, descarga el PDF,
fuerza un rechazo simulado de la DIAN y guarda toda la evidencia en ./evidencia/.

Uso:
    export MATIAS_PAT="<token personal del sandbox>"
    python3 prueba_cofema.py

No usa contraseñas: solo el token de acceso personal (PAT) del sandbox.
La DIAN del sandbox es simulada; nada de esto llega a la DIAN real.
"""
import json, os, sys, time, datetime, urllib.request, urllib.error, base64

BASE = 'https://sandbox-api.matias-api.com/api/ubl2.1'
PAT = os.environ.get('MATIAS_PAT', '').strip()
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'evidencia')
os.makedirs(OUT, exist_ok=True)
if not PAT:
    sys.exit('Falta la variable de entorno MATIAS_PAT (token personal del sandbox).')

def llamar(metodo, ruta, body=None, extra=None, raw=False):
    url = BASE + ruta
    data = json.dumps(body).encode('utf-8') if body is not None else None
    h = {'Accept': 'application/json', 'Authorization': 'Bearer ' + PAT}
    if body is not None: h['Content-Type'] = 'application/json'
    if extra: h.update(extra)
    req = urllib.request.Request(url, data=data, method=metodo, headers=h)
    t0 = time.time()
    try:
        with urllib.request.urlopen(req, timeout=90) as r:
            cuerpo = r.read(); status = r.status; hdrs = dict(r.headers)
    except urllib.error.HTTPError as e:
        cuerpo = e.read(); status = e.code; hdrs = dict(e.headers)
    ms = int((time.time() - t0) * 1000)
    if raw: return status, cuerpo, hdrs, ms
    try: parsed = json.loads(cuerpo.decode('utf-8'))
    except Exception: parsed = {'_texto': cuerpo[:2000].decode('utf-8', 'replace')}
    return status, parsed, hdrs, ms

def guardar(nombre, obj):
    with open(os.path.join(OUT, nombre), 'w', encoding='utf-8') as f: json.dump(obj, f, ensure_ascii=False, indent=2)

def r2(x): return round(x + 1e-9, 2)

# ---------------------------------------------------------------- la factura de Cofema (RH 22690-26)
basico, kg, incluidos, precio_kg, iva_pct = 74790, 413.85, 20, 4600, 19
adic = r2(max(0, kg - incluidos))                  # 393,85 kg
valor_adic = r2(adic * precio_kg)                  # 1.811.710
subtotal = r2(basico + valor_adic)                 # 1.886.500
iva_basico = r2(basico * iva_pct / 100)            # 14.210,10
iva_adic = r2(valor_adic * iva_pct / 100)          # 344.224,90
iva = r2(iva_basico + iva_adic)                    # 358.435
total = r2(subtotal + iva)                         # 2.244.935
numero = int(datetime.datetime.now().strftime('%m%d%H%M%S'))  # consecutivo de prueba, distinto en cada corrida

def linea(codigo, desc, cant, precio, imp):
    return {
        'code': codigo, 'description': desc,
        'invoiced_quantity': f'{cant:.2f}', 'base_quantity': f'{cant:.2f}', 'quantity_units_id': '1093',
        'price_amount': f'{precio:.2f}', 'line_extension_amount': f'{r2(cant * precio):.2f}',
        'free_of_charge_indicator': False, 'type_item_identifications_id': '4', 'reference_price_id': '1',
        'tax_totals': [{'tax_id': '1', 'tax_amount': imp, 'taxable_amount': r2(cant * precio), 'percent': iva_pct}],
    }

factura = {
    # Resolución y prefijo de prueba que trae la colección oficial del sandbox (no son de Comserva).
    'resolution_number': '18764074347312', 'prefix': 'LZT', 'document_number': str(numero),
    'date': '2026-09-26', 'notes': 'Servicio especial de aseo prestado mes de septiembre de 2026. RH 22690-26. Prueba RH digital Comserva (sandbox).',
    'graphic_representation': 0, 'send_email': 0, 'operation_type_id': 1, 'type_document_id': 7,
    'payments': [{'payment_method_id': 2, 'means_payment_id': 42, 'value_paid': f'{total:.2f}', 'payment_due_date': '2026-10-26'}],
    'customer': {
        # Cofema S.A. NIT 891.190.218-5. city_id: el catálogo de ciudades del sandbox no está publicado;
        # se usa el id de ejemplo de la colección (836) y se anota como pendiente.
        'country_id': '45', 'city_id': '836', 'identity_document_id': '3',
        'type_organization_id': 1, 'tax_regime_id': 1, 'tax_level_id': 5,
        'company_name': 'COMPAÑIA DE FOMENTO EMPRESARIAL Y MERCADOS AGROINDUSTRIALES S.A.',
        'dni': '891190218', 'mobile': '3183724275', 'email': 'liquidacion@cofemacaqueta.com.co',
        'address': 'KM 5 VIA MORELIA, BARRIO COFEMA, FLORENCIA', 'postal_code': '180001',
    },
    'lines': [
        linea('SRV-BASICO', 'RECOLEC. TRANSP Y DISPOS. FINAL RESIDUOS SEPTIEMBRE 2026', 1, basico, iva_basico),
        linea('SRV-KG', 'KILOGRAMOS ADICIONALES', adic, precio_kg, iva_adic),
    ],
    'legal_monetary_totals': {'line_extension_amount': f'{subtotal:.2f}', 'tax_exclusive_amount': f'{subtotal:.2f}', 'tax_inclusive_amount': f'{total:.2f}', 'payable_amount': total},
    'tax_totals': [{'tax_id': '1', 'tax_amount': iva, 'taxable_amount': subtotal, 'percent': iva_pct}],
}
guardar('01_factura_enviada.json', factura)
print(f'Factura armada: básico {basico:,.0f} + {adic} kg × {precio_kg:,.0f} = {valor_adic:,.0f} · subtotal {subtotal:,.0f} · IVA {iva:,.2f} · total {total:,.0f}')
assert total == 2244935.0, total

resumen = {'inicio': datetime.datetime.now().isoformat(timespec='seconds'), 'base': BASE, 'pasos': []}
def paso(n, desc, status, ms, extra=None):
    print(f'[{n}] {desc} → HTTP {status} ({ms} ms)'); resumen['pasos'].append({'paso': n, 'descripcion': desc, 'http': status, 'ms': ms, **(extra or {})})

# 0. quién soy y certificado de prueba
st, me, _, ms = llamar('GET', '/auth/user'); guardar('00_usuario.json', me); paso(0, 'GET /auth/user (cuenta del sandbox)', st, ms)
st, cert, _, ms = llamar('GET', '/certificate/'); guardar('00_certificado.json', cert); paso(0, 'GET /certificate/ (certificado de prueba)', st, ms)

# 1. emitir la factura (camino feliz)
st, resp, hdrs, ms = llamar('POST', '/invoice', factura); guardar('02_respuesta_factura.json', resp)
paso(1, 'POST /invoice · factura de Cofema', st, ms, {'X-MATIAS-Environment': hdrs.get('X-MATIAS-Environment') or hdrs.get('x-matias-environment')})
def buscar(obj, claves):
    """Busca la primera clave (recursivamente) en la respuesta."""
    if isinstance(obj, dict):
        for k, v in obj.items():
            if k in claves and v: return v
        for v in obj.values():
            r = buscar(v, claves)
            if r: return r
    if isinstance(obj, list):
        for v in obj:
            r = buscar(v, claves)
            if r: return r
    return None
track = buscar(resp, {'trackId', 'track_id', 'zipKey', 'zip_key', 'uuid'}); cufe = buscar(resp, {'cufe', 'uuid', 'UUID'})
print('    trackId:', track, '· CUFE/uuid:', (str(cufe)[:32] + '…') if cufe else None)
resumen['trackId'] = track; resumen['cufe'] = cufe

# 2. estado del documento
if track:
    st, estado, _, ms = llamar('POST', f'/status/document/{track}'); guardar('03_estado.json', estado); paso(2, f'POST /status/document/{track}', st, ms)
    # 3. PDF
    st, pdf, hdrs, ms = llamar('POST', f'/documents/pdf/{track}', raw=True); paso(3, f'POST /documents/pdf/{track}', st, ms)
    try:
        j = json.loads(pdf.decode('utf-8')); guardar('04_pdf_respuesta.json', j)
        b64 = buscar(j, {'pdf', 'pdf_base64', 'file', 'base64'})
        if b64 and isinstance(b64, str) and len(b64) > 100:
            open(os.path.join(OUT, '04_factura_cofema.pdf'), 'wb').write(base64.b64decode(b64)); print('    PDF guardado: evidencia/04_factura_cofema.pdf')
    except Exception:
        if pdf[:4] == b'%PDF': open(os.path.join(OUT, '04_factura_cofema.pdf'), 'wb').write(pdf); print('    PDF guardado: evidencia/04_factura_cofema.pdf')
        else: open(os.path.join(OUT, '04_pdf_respuesta.bin'), 'wb').write(pdf)

# 4. reenviar el mismo número: ¿duplicado?
st, dup, _, ms = llamar('POST', '/invoice', factura); guardar('05_reenvio_mismo_numero.json', dup); paso(4, 'POST /invoice · mismo número otra vez (idempotencia)', st, ms)

# 5. rechazo simulado de la DIAN y timeout simulado (Magic Values)
for mv in ('ERROR_REJECTED', 'ERROR_TIMEOUT', 'ERROR_NIT_INVALID'):
    f2 = dict(factura); f2['document_number'] = str(numero + {'ERROR_REJECTED': 1, 'ERROR_TIMEOUT': 2, 'ERROR_NIT_INVALID': 3}[mv])
    st, r, _, ms = llamar('POST', '/invoice', f2, extra={'X-Sandbox-Force-Status': mv}); guardar(f'06_{mv}.json', r); paso(5, f'POST /invoice con X-Sandbox-Force-Status: {mv}', st, ms)

# 6. nota crédito por el total (anulación), referenciando la factura emitida
if cufe:
    nc = {k: factura[k] for k in ('customer', 'lines', 'legal_monetary_totals', 'tax_totals')}
    nc.update({'resolution_number': '18763005880468', 'prefix': 'NC', 'document_number': str(numero), 'operation_type_id': 12, 'type_document_id': 5,
               'notes': 'Anulación de prueba: visita tardía, se reemite', 'graphic_representation': 0, 'send_email': 0,
               'discrepancy_response': {'reference_id': f'LZT{numero}', 'response_id': '2'},
               'billing_reference': {'number': f'LZT{numero}', 'date': '2026-09-26', 'uuid': cufe},
               'payments': [{'payment_method_id': 1, 'means_payment_id': 10, 'value_paid': f'{total:.2f}'}]})
    st, r, _, ms = llamar('POST', '/notes/credit', nc); guardar('07_nota_credito.json', r); paso(6, 'POST /notes/credit · anulación por el total', st, ms)

resumen['fin'] = datetime.datetime.now().isoformat(timespec='seconds'); guardar('99_resumen.json', resumen)
print('\nEvidencia en', OUT)
