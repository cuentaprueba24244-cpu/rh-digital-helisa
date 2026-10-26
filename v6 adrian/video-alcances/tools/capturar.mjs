// Captura las pantallas reales de los mockups v6 que usa el video.
// Uso: node tools/capturar.mjs   (desde video-alcances/)
// Antes de cada captura borra del DOM teléfonos, correos, direcciones, cuentas y el NIT de Cofema.
import puppeteer from 'puppeteer-core';
import path from 'node:path';
import fs from 'node:fs';

const V6 = path.resolve('..');
const OUT = path.resolve('assets/img');
fs.mkdirSync(OUT, { recursive: true });

// Los valores a tapar (NIT del cliente, teléfonos, correos) viven en tools/sensibles.local.json,
// que no se sube al repo porque es público. Formato: ["valor 1", "valor 2"] (ver sensibles.ejemplo.json).
// Además se tapan por patrón los correos y los celulares de 10 dígitos.
const LOCAL = path.resolve('tools/sensibles.local.json');
const SENSIBLES = (fs.existsSync(LOCAL) ? JSON.parse(fs.readFileSync(LOCAL, 'utf8')) : []).map((v) => [v, '•••']);

const browser = await puppeteer.launch({
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: true,
});
const page = await browser.newPage();
await page.emulateMediaFeatures([{ name: 'prefers-color-scheme', value: 'light' }]);
const espera = (ms) => new Promise((r) => setTimeout(r, ms));

async function abrir(rel, width = 1440, dpr = 2) {
  await page.setViewport({ width, height: 1000, deviceScaleFactor: dpr });
  await page.goto('file://' + path.join(V6, rel), { waitUntil: 'networkidle0' });
  await espera(300);
}

async function limpiar() {
  await page.evaluate((pares) => {
    const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let n;
    while ((n = w.nextNode())) {
      let t = n.nodeValue;
      for (const [a, b] of pares) t = t.split(a).join(b);
      t = t.replace(/Km 8 Vereda[^·\n]*/g, '').replace(/Km 5 v[ií]a Morelia[^·\n]*/g, '');
      t = t.replace(/••••\d{4}/g, '••••');
      t = t.replace(/[\w.+-]+@[\w-]+\.[\w.]+/g, '•••').replace(/\b3\d{2} ?\d{3} ?\d{4}\b/g, '•••');
      if (t !== n.nodeValue) n.nodeValue = t;
    }
    document.querySelectorAll('input').forEach((i) => {
      for (const [a, b] of pares) if (i.value.includes(a)) i.value = i.value.split(a).join(b);
    });
  }, SENSIBLES);
}

async function recorte(nombre, clip) {
  await limpiar();
  await page.screenshot({ path: path.join(OUT, nombre + '.png'), clip });
  console.log('✓', nombre);
}

// Recorta el elemento más pequeño cuyo texto empieza por `texto`, subiendo `subir` niveles.
async function rectPorTexto(texto, subir = 0, sel = '*') {
  return page.evaluate((texto, subir, sel) => {
    const cands = [...document.querySelectorAll(sel)].filter((e) => e.textContent.trim().startsWith(texto));
    cands.sort((a, b) => a.textContent.length - b.textContent.length);
    let e = cands[0];
    if (!e) return null;
    for (let i = 0; i < subir; i++) e = e.parentElement;
    const r = e.getBoundingClientRect();
    return { x: r.x + window.scrollX, y: r.y + window.scrollY, width: r.width, height: r.height };
  }, texto, subir, sel);
}

async function pantallaApp(nombre, scrollA = 0) {
  await page.evaluate((y) => { const b = document.querySelector('#screen .app-body'); if (b) b.scrollTop = y; }, scrollA);
  await espera(150);
  const r = await page.evaluate(() => {
    const e = document.querySelector('.phone .screen');
    const b = e.getBoundingClientRect();
    return { x: b.x + window.scrollX, y: b.y + window.scrollY, width: b.width, height: b.height };
  });
  await recorte(nombre, r);
}

const guia = (k) => page.evaluate((k) => document.querySelector(`#screen-list [data-go="${k}"]`).click(), k);
const clic = (sel) => page.evaluate((sel) => document.querySelector(sel).click(), sel);
async function escribir(sel, valor) {
  await page.evaluate((sel, valor) => {
    const i = document.querySelector(sel);
    i.value = valor;
    i.dispatchEvent(new Event('input', { bubbles: true }));
    i.dispatchEvent(new Event('change', { bubbles: true }));
  }, sel, valor);
  await espera(80);
}

// ---------- App del operario (propuesta 1) ----------
await abrir('propuesta 1/mockups_v6/app/index.html', 1440, 3);
await clic('#sim-offline');
await espera(150);
await pantallaApp('app-hoy-sin-senal');
await clic('#sim-offline');
await guia('cliente');
await clic('[data-visita-cliente="c-cofema"]');
await espera(150);
await escribir('[data-kg="BIO"]', '40,30');
await escribir('[data-kg="ANATO"]', '59,20');
await pantallaApp('app-kilos', 0);
await pantallaApp('app-kilos-total', 9999);
await clic('#kg-next');
await espera(150);
await clic('[data-foto]');
await espera(150);
await pantallaApp('app-evidencia');
await guia('firmas');
await espera(150);
await page.evaluate(() => { const a = document.querySelector('#aviso'); a.checked = true; a.dispatchEvent(new Event('change', { bubbles: true })); });
await escribir('[data-f="entrega_nombre"]', 'Recepción Cofema');
await escribir('[data-f="entrega_documento"]', 'De prueba');
await clic('[data-firma="firmaCliente"]');
await espera(150);
await clic('[data-firma="firmaOperario"]');
await espera(150);
await pantallaApp('app-firmas', 230);
await guia('constancia');
await espera(150);
await pantallaApp('app-constancia');

// Recibo de caja de Cofema: abono de $500.000 a la FVE 25756
await guia('recibo');
await espera(150);
await page.evaluate(() => {
  const s = document.querySelector('#rc-cliente');
  s.value = 'c-cofema';
  s.dispatchEvent(new Event('change', { bubbles: true }));
});
await espera(200);
const hayAbono = await page.$('[data-rc-tipo="abono"]');
if (hayAbono) {
  await clic('[data-rc-tipo="abono"]');
  await espera(150);
  if (await page.$('[data-rc-f]')) { await clic('[data-rc-f]'); await espera(200); }
  if (await page.$('[data-rc-ap]')) await escribir('[data-rc-ap]', '500.000');
  if (await page.$('#rc-valor')) await escribir('#rc-valor', '500.000');
  const marcado = await page.evaluate(() => document.querySelector('[data-rc-f]')?.checked);
  if (marcado === false) { await clic('[data-rc-f]'); await espera(200); }
  if (await page.$('[data-rc-ap]')) await escribir('[data-rc-ap]', '500.000');
  if (await page.$('#rc-valor')) await escribir('#rc-valor', '500.000');
  console.log('FVE marcada:', await page.evaluate(() => document.querySelector('[data-rc-f]')?.checked));
}
await pantallaApp('app-recibo', 120);

// ---------- Documentos ----------
await abrir('propuesta 1/mockups_v6/documentos/planilla.html');
{
  const r = await rectPorTexto('COMERCIALIZADORA DE SERVICIOS VARIOS S.A.S. - SERVICIO', 0);
  const hoja = await page.evaluate(() => {
    const e = document.querySelector('.doc, .sheet, .page, article') || document.body;
    const b = e.getBoundingClientRect();
    return { x: b.x + window.scrollX, y: b.y + window.scrollY, width: b.width, height: b.height };
  });
  await recorte('doc-planilla', { x: hoja.x, y: hoja.y, width: hoja.width, height: Math.min(560, hoja.height) });
  void r;
}

await abrir('propuesta 1/mockups_v6/documentos/pedido.html');
{
  const hoja = await page.evaluate(() => {
    const e = document.querySelector('.doc, .sheet, .page, article') || document.body;
    const b = e.getBoundingClientRect();
    return { x: b.x + window.scrollX, y: b.y + window.scrollY, width: b.width, height: b.height };
  });
  await recorte('doc-pedido', { x: hoja.x, y: hoja.y, width: hoja.width, height: 306 });
  const g = await rectPorTexto('3. CUADRÍCULA LEGIBLE', 0);
  if (g) await recorte('doc-pedido-lineas', { x: hoja.x + 40, y: g.y - 6, width: hoja.width - 80, height: 180 });
}

await abrir('propuesta 2/mockups_v6/documentos/factura-electronica.html');
{
  const hoja = await page.evaluate(() => {
    const e = document.querySelector('.doc, .sheet, .page, article') || document.body;
    const b = e.getBoundingClientRect();
    return { x: b.x + window.scrollX, y: b.y + window.scrollY, width: b.width, height: b.height };
  });
  await recorte('doc-fe-hoja', { x: hoja.x, y: hoja.y, width: hoja.width, height: Math.min(1125, hoja.height) });
}

await abrir('propuesta 1/mockups_v6/documentos/recibo.html');
{
  const hoja = await page.evaluate(() => {
    const e = document.querySelector('.doc, .sheet, .page, article') || document.body;
    const b = e.getBoundingClientRect();
    return { x: b.x + window.scrollX, y: b.y + window.scrollY, width: b.width, height: b.height };
  });
  await recorte('doc-recibo', { x: hoja.x, y: hoja.y, width: hoja.width, height: Math.min(700, hoja.height) });
}

// ---------- Panel ----------
await abrir('propuesta 2/mockups_v6/panel/facturacion.html');
{
  const a = await rectPorTexto('Borrador', 2);
  const b = await rectPorTexto('Contingencia', 2);
  if (a && b) await recorte('panel-fe-estados', { x: a.x - 8, y: Math.min(a.y, b.y) - 30, width: b.x + b.width - a.x + 16, height: Math.max(a.height, b.height) + 46 });
  const p = await rectPorTexto('Prefacturas de octubre 2026', 3);
  if (p) await recorte('panel-fe-prefacturas', p);
}

await abrir('propuesta 1/mockups_v6/panel/planos.html');
{
  const t = await page.evaluate(() => {
    const b = [...document.querySelectorAll('button, a, .tab, [role=tab]')].find((e) => e.textContent.trim().startsWith('Septiembre 2026'));
    if (b) { b.click(); return true; } return false;
  });
  await espera(300);
  const c = await rectPorTexto('Del cierre al cruce', 2);
  if (c) await recorte('panel-p1-cadena', c);
  console.log('septiembre:', t);
}

for (const [p, n] of [['propuesta 1', 'panel-p1-traza'], ['propuesta 2', 'panel-p2-traza']]) {
  await abrir(p + '/mockups_v6/panel/trazabilidad.html');
  const c = await rectPorTexto('Cofema S.A.', 4);
  if (c) await recorte(n, c);
}

await browser.close();
