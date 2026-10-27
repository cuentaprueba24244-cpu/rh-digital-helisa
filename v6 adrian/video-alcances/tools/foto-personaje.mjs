// Toma una foto de una página de prueba de personajes. Uso: node tools/foto-personaje.mjs personajes/operario.html salida.png
import puppeteer from 'puppeteer-core';
import path from 'node:path';
const [, , pagina, salida] = process.argv;
const b = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });
const p = await b.newPage();
await p.setViewport({ width: 1500, height: 1100, deviceScaleFactor: 1 });
await p.goto('file://' + path.resolve(pagina), { waitUntil: 'networkidle0' });
await p.screenshot({ path: salida, fullPage: true });
await b.close();
