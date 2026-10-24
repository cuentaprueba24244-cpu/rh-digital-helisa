#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Prueba de la propuesta B contra el sandbox de Factus (API V2).

Emite la factura de Cofema de septiembre de 2026 (RH 22690-26: 413,85 kg,
$2.244.935) tal como la armaría RH digital, la consulta, descarga el PDF,
prueba la idempotencia (mismo reference_code) y anula con nota crédito.
Toda la evidencia queda en ./evidencia/.

Uso:
    export FACTUS_CLIENT_ID="..." FACTUS_CLIENT_SECRET="..."
    export FACTUS_USER="..." FACTUS_PASS="..."
    python3 prueba_cofema_factus.py

Las credenciales se leen del entorno y nunca se guardan en el repositorio.
El sandbox es compartido por todos los aliados de Factus: los consecutivos
(SETP…) los asigna el sandbox y la DIAN de pruebas es de habilitación.
"""
import json, os, sys, time, datetime, base64, urllib.request, urllib.error, urllib.parse

BASE = os.environ.get('FACTUS_BASE', 'https://api-sandbox.factus.com.co')
CRED = {k: os.environ.get(k, '').strip() for k in ('FACTUS_CLIENT_ID', 'FACTUS_CLIENT_SECRET', 'FACTUS_USER', 'FACTUS_PASS')}
if not all(CRED.values()):
    sys.exit('Faltan variables de entorno: ' + ', '.join(k for k, v in CRED.items() if not v))
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'evidencia'); os.makedirs(OUT, exist_ok=True)

def guardar(nombre, obj):
    with open(os.path.join(OUT, nombre), 'w', encoding='utf-8') as f: json.dump(obj, f, ensure_ascii=False, indent=2)

def http(metodo, url, body=None, headers=None, form=None):
    # Cloudflare bloquea el user-agent por defecto de urllib (error 1010); se envía uno explícito.
    data = None; h = {'Accept': 'application/json', 'User-Agent': 'RH-digital-Comserva/1.0 (prueba sandbox)'}
    if form is not None: data = urllib.parse.urlencode(form).encode(); h['Content-Type'] = 'application/x-www-form-urlencoded'
    elif body is not None: data = json.dumps(body).encode('utf-8'); h['Content-Type'] = 'application/json'
    h.update(headers or {})
    req = urllib.request.Request(url, data=data, method=metodo, headers=h); t0 = time.time()
    try:
        with urllib.request.urlopen(req, timeout=120) as r: cuerpo, status = r.read(), r.status
    except urllib.error.HTTPError as e: cuerpo, status = e.read(), e.code
    ms = int((time.time() - t0) * 1000)
    try: parsed = json.loads(cuerpo.decode('utf-8'))
    except Exception: parsed = {'_texto': cuerpo[:2000].decode('utf-8', 'replace')}
    return status, parsed, ms

resumen = {'inicio': datetime.datetime.now().isoformat(timespec='seconds'), 'base': BASE, 'pasos': []}
def paso(n, desc, status, ms, **extra):
    print(f'[{n}] {desc} → HTTP {status} ({ms} ms)'); resumen['pasos'].append({'paso': n, 'descripcion': desc, 'http': status, 'ms': ms, **extra})

# 0. token (OAuth2 password grant, vence en 1 h)
st, tok, ms = http('POST', BASE + '/oauth/token', form={'grant_type': 'password', 'client_id': CRED['FACTUS_CLIENT_ID'], 'client_secret': CRED['FACTUS_CLIENT_SECRET'], 'username': CRED['FACTUS_USER'], 'password': CRED['FACTUS_PASS']})
paso(0, 'POST /oauth/token', st, ms, expires_in=tok.get('expires_in'))
if st != 200: guardar('00_token_error.json', tok); sys.exit('No se obtuvo token')
AUTH = {'Authorization': 'Bearer ' + tok['access_token']}
guardar('00_token.json', {'token_type': tok.get('token_type'), 'expires_in': tok.get('expires_in'), 'access_token': tok['access_token'][:12] + '…(oculto)'})

# 1. rangos de numeración activos
st, rangos, ms = http('GET', BASE + '/v2/numbering-ranges?filter[is_active]=1', headers=AUTH); guardar('01_rangos.json', rangos)
paso(1, 'GET /v2/numbering-ranges', st, ms)
def rango(doc):
    lista = rangos.get('data', [])
    if isinstance(lista, dict): lista = lista.get('data', [])   # la API envuelve la lista en data.data
    r = [x for x in lista if x['document'] == doc and x['is_active'] and not x['is_expired']]
    return r[0] if r else None
R_FV, R_NC = rango('Factura de Venta'), rango('Nota Crédito')
print('    Rango factura:', R_FV and f"id {R_FV['id']} {R_FV['prefix']} actual {R_FV['current']}", '· Rango NC:', R_NC and f"id {R_NC['id']} {R_NC['prefix']}")

# ---------------------------------------------------------------- la factura de Cofema (RH 22690-26)
basico, kg, incluidos, precio_kg, iva_pct = 74790, 413.85, 20, 4600, 19
adic = round(max(0, kg - incluidos), 2)             # 393,85 kg
valor_adic = round(adic * precio_kg, 2)             # 1.811.710
subtotal = round(basico + valor_adic, 2)            # 1.886.500
iva = round(subtotal * iva_pct / 100, 2)            # 358.435
total = round(subtotal + iva, 2)                    # 2.244.935
assert total == 2244935.0, total
ref = 'RH-22690-26-' + datetime.datetime.now().strftime('%Y%m%d%H%M%S')   # reference_code único por corrida

CLIENTE = {
    'identification_document_code': '31', 'identification': '891190218', 'dv': '5',
    'company': 'COMPAÑIA DE FOMENTO EMPRESARIAL Y MERCADOS AGROINDUSTRIALES S.A.', 'trade_name': 'COFEMA S.A.',
    'address': 'KM 5 VIA MORELIA, BARRIO COFEMA, FLORENCIA', 'email': 'liquidacion@cofemacaqueta.com.co', 'phone': '3183724275',
    'legal_organization_code': '1', 'tribute_code': 'ZZ', 'country_code': 'CO', 'responsibilities': ['R-99-PN'],
    'municipality_code': '18001',   # Florencia, Caquetá (DANE)
}
ITEMS = [
    {'code_reference': 'SRV-BASICO', 'name': 'RECOLEC. TRANSP Y DISPOS. FINAL RESIDUOS SEPTIEMBRE 2026', 'quantity': '1.00', 'discount_rate': '0.00', 'price': f'{basico:.2f}', 'unit_measure_code': '94', 'standard_code': '999', 'taxes': [{'code': '01', 'rate': f'{iva_pct:.2f}'}]},
    {'code_reference': 'SRV-KG', 'name': 'KILOGRAMOS ADICIONALES (413,85 kg - 20 kg incluidos)', 'quantity': f'{adic:.2f}', 'discount_rate': '0.00', 'price': f'{precio_kg:.2f}', 'unit_measure_code': 'KGM', 'standard_code': '999', 'taxes': [{'code': '01', 'rate': f'{iva_pct:.2f}'}]},
]
factura = {
    'reference_code': ref, 'document': '01', 'numbering_range_id': R_FV['id'] if R_FV else None, 'operation_type': '10', 'send_email': False,
    'observation': 'Servicio especial de aseo prestado mes de septiembre de 2026. RH 22690-26. Prueba RH digital Comserva (sandbox).',
    'payment_details': [{'payment_form': '2', 'payment_method_code': '42', 'reference_code': 'RH-22690-26', 'amount': f'{total:.2f}', 'due_date': '2026-10-26'}],
    'billing_period': {'start_date': '2026-09-01', 'end_date': '2026-09-30'},
    'customer': CLIENTE, 'items': ITEMS,
}
guardar('02_factura_enviada.json', factura)
print(f'Factura armada: básico {basico:,.0f} + {adic} kg × {precio_kg:,.0f} = {valor_adic:,.0f} · subtotal {subtotal:,.0f} · IVA {iva:,.0f} · total {total:,.0f}')

# 2. emitir y validar ante la DIAN (sandbox)
st, resp, ms = http('POST', BASE + '/v2/bills/validate', body=factura, headers=AUTH); guardar('03_respuesta_factura.json', resp)
paso(2, 'POST /v2/bills/validate · factura de Cofema', st, ms)
d = resp.get('data', {}); bill = d.get('bill', d) if isinstance(d, dict) else {}
numero = bill.get('number'); cufe = bill.get('cufe'); links = d.get('links') or bill.get('links') or {}
print('    número:', numero, '· validada:', bill.get('is_validated'), '· CUFE:', (cufe or '')[:24] + ('…' if cufe else ''))
print('    QR:', links.get('qr') or bill.get('qr'), '\n    público:', links.get('public_url') or bill.get('public_url'))
resumen.update({'reference_code': ref, 'numero': numero, 'cufe': cufe, 'qr': links.get('qr') or bill.get('qr'), 'public_url': links.get('public_url') or bill.get('public_url'),
                'totales_factus': {k: bill.get(k) for k in ('gross_value', 'taxable_amount', 'tax_amount', 'total') if k in bill}})

if numero:
    # 3. consultar la factura
    st, ver, ms = http('GET', BASE + f'/v2/bills/show/{numero}', headers=AUTH)
    if st == 404: st, ver, ms = http('GET', BASE + f'/v2/bills/{numero}', headers=AUTH)
    guardar('04_consulta_factura.json', ver); paso(3, f'GET /v2/bills/{numero}', st, ms)
    # 4. PDF
    st, pdf, ms = http('GET', BASE + f'/v2/bills/download-pdf/{numero}', headers=AUTH)
    if st == 404: st, pdf, ms = http('GET', BASE + f'/v2/bills/{numero}/download-pdf', headers=AUTH)
    paso(4, f'GET /v2/bills/download-pdf/{numero}', st, ms)
    b64 = (pdf.get('data') or {}).get('pdf_base_64_encoded') if isinstance(pdf, dict) else None
    if b64:
        with open(os.path.join(OUT, '05_factura_cofema.pdf'), 'wb') as f: f.write(base64.b64decode(b64))
        print('    PDF guardado: evidencia/05_factura_cofema.pdf')
    else: guardar('05_pdf_respuesta.json', pdf)
    # 5. reenviar el mismo reference_code → debe devolver la misma factura (idempotencia)
    st, dup, ms = http('POST', BASE + '/v2/bills/validate', body=factura, headers=AUTH); guardar('06_reenvio_misma_referencia.json', dup)
    dd = dup.get('data', {}); dn = (dd.get('bill', dd) if isinstance(dd, dict) else {}).get('number')
    paso(5, 'POST /v2/bills/validate · mismo reference_code (idempotencia)', st, ms, numero_devuelto=dn, misma_factura=(dn == numero))
    # 6. nota crédito por el total (anulación)
    nc = {'reference_code': 'NC-' + ref, 'correction_concept_code': '2', 'customization_id': '20', 'bill_number': numero,
          'numbering_range_id': R_NC['id'] if R_NC else None, 'observation': 'Anulación de prueba: visita tardía, se reemite.',
          'payment_details': [{'payment_form': '1', 'payment_method_code': '10', 'amount': f'{total:.2f}'}], 'customer': CLIENTE, 'items': ITEMS}
    st, r, ms = http('POST', BASE + '/v2/credit-notes/validate', body=nc, headers=AUTH); guardar('07_nota_credito.json', r)
    rd = r.get('data', {}); rn = rd.get('credit_note', rd) if isinstance(rd, dict) else {}
    paso(6, 'POST /v2/credit-notes/validate · anulación por el total', st, ms, numero_nc=rn.get('number'))
    print('    NC:', rn.get('number'), '· validada:', rn.get('is_validated'))
    if rn.get('number'):
        st, pdfnc, ms = http('GET', BASE + f"/v2/credit-notes/{rn['number']}/download-pdf", headers=AUTH); paso(6, f"GET /v2/credit-notes/{rn['number']}/download-pdf", st, ms)
        b64 = (pdfnc.get('data') or {}).get('pdf_base_64_encoded') if isinstance(pdfnc, dict) else None
        if b64:
            with open(os.path.join(OUT, f"07_nota_credito_{rn['number']}.pdf"), 'wb') as f: f.write(base64.b64decode(b64))
            print(f"    PDF guardado: evidencia/07_nota_credito_{rn['number']}.pdf")

# 7. error controlado: cliente sin identificación
mala = json.loads(json.dumps(factura)); mala['reference_code'] = ref + '-ERR'; mala['customer'].pop('identification')
st, err, ms = http('POST', BASE + '/v2/bills/validate', body=mala, headers=AUTH); guardar('08_error_validacion.json', err)
paso(7, 'POST /v2/bills/validate · sin identificación del cliente (error esperado 422)', st, ms)

resumen['fin'] = datetime.datetime.now().isoformat(timespec='seconds'); guardar('99_resumen.json', resumen)
print('\nEvidencia en', OUT)
