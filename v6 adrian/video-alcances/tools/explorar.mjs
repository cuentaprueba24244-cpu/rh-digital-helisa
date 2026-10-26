// Captura de exploración: página completa de cada mockup, para elegir qué recortar.
import puppeteer from 'puppeteer-core';
import path from 'node:path';
import fs from 'node:fs';
const V6 = path.resolve(process.argv[2]);
const OUT = path.resolve(process.argv[3]);
fs.mkdirSync(OUT, { recursive: true });
const browser = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
await page.emulateMediaFeatures([{ name: 'prefers-color-scheme', value: 'light' }]);
const pages = [
  ['p1-cierre', 'propuesta 1/mockups_v6/panel/cierre.html'],
  ['p1-planos', 'propuesta 1/mockups_v6/panel/planos.html'],
  ['p1-traza', 'propuesta 1/mockups_v6/panel/trazabilidad.html'],
  ['p2-factura', 'propuesta 2/mockups_v6/panel/facturacion.html'],
  ['p2-traza', 'propuesta 2/mockups_v6/panel/trazabilidad.html'],
  ['doc-constancia', 'propuesta 1/mockups_v6/documentos/constancia.html'],
  ['doc-planilla', 'propuesta 1/mockups_v6/documentos/planilla.html'],
  ['doc-pedido', 'propuesta 1/mockups_v6/documentos/pedido.html'],
  ['doc-recibo', 'propuesta 1/mockups_v6/documentos/recibo.html'],
  ['doc-fe', 'propuesta 2/mockups_v6/documentos/factura-electronica.html'],
  ['app', 'propuesta 1/mockups_v6/app/index.html'],
];
for (const [name, rel] of pages) {
  await page.goto('file://' + path.join(V6, rel), { waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 400));
  await page.screenshot({ path: path.join(OUT, name + '.png'), fullPage: true });
  console.log(name);
}
await browser.close();
