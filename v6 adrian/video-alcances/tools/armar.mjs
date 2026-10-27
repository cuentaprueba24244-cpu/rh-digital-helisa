// Arma las escenas: copia escenas/*.html a compositions/ y reemplaza dos marcas.
//   <!-- @svg nombre prefijo -->  → el SVG de personajes/nombre.svg con sus ids «X-» cambiados a «prefijo-»
//   /* @rig */                     → el código de personajes/rig.js
// También arma las páginas de prueba personajes/*.fuente.html → personajes/*.html.
// Uso: node tools/armar.mjs   (después de editar escenas/ o personajes/; no edites compositions/ a mano)
import fs from 'node:fs';
import path from 'node:path';

const rig = fs.readFileSync('personajes/rig.js', 'utf8');
function armar(texto) {
  return texto
    .replace(/<!-- @svg ([\w-]+) ([\w-]+) -->/g, (_, nombre, px) =>
      fs.readFileSync(path.join('personajes', nombre + '.svg'), 'utf8').trim().replaceAll('X-', px + '-'))
    .replace('/* @rig */', rig.trim());
}
const pares = [];
for (const f of fs.readdirSync('escenas')) if (f.endsWith('.html')) pares.push([path.join('escenas', f), path.join('compositions', f)]);
for (const f of fs.readdirSync('personajes')) if (f.endsWith('.fuente.html')) pares.push([path.join('personajes', f), path.join('personajes', f.replace('.fuente', ''))]);
fs.mkdirSync('compositions', { recursive: true });
for (const [de, a] of pares) {
  fs.writeFileSync(a, armar(fs.readFileSync(de, 'utf8')));
  console.log('✓', a);
}
