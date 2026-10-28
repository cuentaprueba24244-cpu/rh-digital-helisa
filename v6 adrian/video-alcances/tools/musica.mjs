// Música del video, escrita con código: 100 BPM, 157,2 s, re mayor (D – Bm – G – A).
// Sintetiza cada voz muestra por muestra y escribe assets/audio/musica.wav (48 kHz, estéreo, 16 bits).
// Uso: node tools/musica.mjs   (después, tools/musica-mezcla.sh normaliza y crea musica.m4a)
import fs from 'node:fs';

const SR = 48000;
const DUR = 157.2;
const N = Math.round(SR * DUR);
const BPM = 100;
const BEAT = 60 / BPM;          // 0,6 s
const BAR = BEAT * 4;           // 2,4 s
const L = new Float32Array(N);
const R = new Float32Array(N);
const SEND = new Float32Array(N); // envío a la reverberación

// Azar con semilla: el resultado es idéntico en cada corrida
function mulberry32(a) { return () => { a |= 0; a = (a + 0x6d2b79f5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
const rnd = mulberry32(20261028);
const hz = (m) => 440 * Math.pow(2, (m - 69) / 12);
const s = (t) => Math.round(t * SR);

// Tabla de onda de diente de sierra suave (12 armónicos)
const TAB = 4096;
const SAW = new Float32Array(TAB);
for (let i = 0; i < TAB; i++) { let v = 0; for (let h = 1; h <= 12; h++) v += Math.sin((2 * Math.PI * h * i) / TAB) / h; SAW[i] = v * 0.55; }

// Secciones (en compases): qué suena en cada parte del video
const SEC = [
  { de: 0, a: 8, nombre: 'papel' },
  { de: 8, a: 12, nombre: 'solucion' },
  { de: 12, a: 18, nombre: 'app' },
  { de: 18, a: 25, nombre: 'cierre' },
  { de: 25, a: 44, nombre: 'alcance1' },
  { de: 44, a: 47, nombre: 'piloto' },
  { de: 47, a: 60, nombre: 'alcance2' },
  { de: 60, a: 63, nombre: 'mapa' },
  { de: 63, a: 66, nombre: 'final' },
];
const seccion = (bar) => SEC.find((x) => bar >= x.de && bar < x.a)?.nombre ?? 'final';

// Acordes cada 2 compases: D, Bm, G, A (notas MIDI)
const ACORDES = [
  { raiz: 50, notas: [62, 66, 69] }, // D
  { raiz: 47, notas: [59, 62, 66] }, // Bm
  { raiz: 43, notas: [55, 59, 62] }, // G
  { raiz: 45, notas: [57, 61, 64] }, // A
];
const acorde = (bar) => ACORDES[Math.floor(bar / 2) % 4];

function suma(i, v, pan = 0, send = 0) {
  if (i < 0 || i >= N) return;
  L[i] += v * (1 - Math.max(0, pan));
  R[i] += v * (1 + Math.min(0, pan));
  SEND[i] += v * send;
}

// ---------- voces ----------
function pad(t0, dur, midi, amp, corte) {
  const a = s(t0), n = s(dur + 1.2);
  const att = 0.5, rel = 1.2;
  let lp = 0;
  const k = 1 - Math.exp((-2 * Math.PI * corte) / SR);
  for (const det of [-0.0035, 0.0035]) {
    const f = hz(midi) * (1 + det);
    let ph = rnd() * TAB;
    lp = 0;
    for (let j = 0; j < n; j++) {
      const t = j / SR;
      const env = t < att ? t / att : t < dur ? 1 : Math.max(0, 1 - (t - dur) / rel);
      ph += (f * TAB) / SR; if (ph >= TAB) ph -= TAB;
      lp += k * (SAW[ph | 0] - lp);
      suma(a + j, lp * env * amp, det < 0 ? -0.35 : 0.35, 0.35);
    }
  }
}
function pluck(t0, midi, amp, pan = 0, brillo = 1) {
  const a = s(t0), n = s(1.1), f = hz(midi);
  for (let j = 0; j < n; j++) {
    const t = j / SR;
    const v = Math.sin(2 * Math.PI * f * t) + 0.35 * brillo * Math.sin(2 * Math.PI * 4 * f * t) * Math.exp(-t * 28) + 0.12 * Math.sin(2 * Math.PI * 2 * f * t);
    const env = Math.min(1, t / 0.004) * Math.exp(-t * 7.5);
    suma(a + j, v * env * amp, pan, 0.4);
  }
}
function bajo(t0, midi, dur, amp) {
  const a = s(t0), n = s(dur + 0.08), f = hz(midi);
  for (let j = 0; j < n; j++) {
    const t = j / SR;
    const env = Math.min(1, t / 0.006) * (t < dur ? Math.exp(-t * 2.2) : Math.exp(-dur * 2.2) * Math.max(0, 1 - (t - dur) / 0.08));
    const v = Math.sin(2 * Math.PI * f * t) + 0.25 * Math.sin(2 * Math.PI * 2 * f * t) + 0.08 * Math.sin(2 * Math.PI * 3 * f * t);
    suma(a + j, v * env * amp, 0, 0.05);
  }
}
function bombo(t0, amp) {
  const a = s(t0), n = s(0.45);
  let ph = 0;
  for (let j = 0; j < n; j++) {
    const t = j / SR;
    const f = 45 + 95 * Math.exp(-t * 32);
    ph += (2 * Math.PI * f) / SR;
    const env = Math.exp(-t * 9) * Math.min(1, t / 0.002);
    const click = j < 90 ? (rnd() * 2 - 1) * 0.25 * (1 - j / 90) : 0;
    suma(a + j, (Math.sin(ph) * env + click) * amp, 0, 0.02);
  }
}
function platillo(t0, amp, largo = 0.035, pan = 0.25) {
  const a = s(t0), n = s(largo * 6);
  let prev = 0;
  for (let j = 0; j < n; j++) {
    const t = j / SR;
    const w = rnd() * 2 - 1;
    const hp = w - prev; prev = w;
    suma(a + j, hp * Math.exp(-t / largo) * amp, pan, 0.08);
  }
}
function caja(t0, amp) {
  const a = s(t0), n = s(0.35);
  let lp = 0, prev = 0;
  for (let j = 0; j < n; j++) {
    const t = j / SR;
    const w = rnd() * 2 - 1;
    lp += 0.35 * (w - lp);
    const bp = lp - prev; prev = lp;
    const tono = Math.sin(2 * Math.PI * 185 * t) * Math.exp(-t * 30);
    suma(a + j, (bp * 2.2 * Math.exp(-t * 16) + tono * 0.5) * amp, -0.1, 0.25);
  }
}
function tic(t0, amp) { // pulso de madera para el papel
  const a = s(t0), n = s(0.05);
  for (let j = 0; j < n; j++) { const t = j / SR; suma(a + j, Math.sin(2 * Math.PI * 1650 * t) * Math.exp(-t * 140) * amp, 0.15, 0.3); }
}
function pop(t0, amp) { // nodo del riel que se enciende
  const a = s(t0), n = s(0.09);
  for (let j = 0; j < n; j++) { const t = j / SR; const f = 520 + 380 * Math.exp(-t * 60); suma(a + j, Math.sin(2 * Math.PI * f * t) * Math.exp(-t * 45) * amp, 0, 0.3); }
}
function aire(tPico, amp, dur = 0.42) { // barrido de aire en los cortes; el pico cae 1 frame después del corte
  const pico = tPico + 1 / 30;
  const a = s(pico - dur * 0.7), n = s(dur);
  let lp = 0, lp2 = 0;
  for (let j = 0; j < n; j++) {
    const x = j / n;
    const env = Math.sin(Math.PI * Math.pow(x, 0.85));
    const corte = 300 + 4200 * env;
    const k = 1 - Math.exp((-2 * Math.PI * corte) / SR);
    const w = rnd() * 2 - 1;
    lp += k * (w - lp); lp2 += k * (lp - lp2);
    suma(a + j, (lp - lp2 * 0.6) * env * amp, x * 0.6 - 0.3, 0.15);
  }
}
function subida(t0, t1, amp) { // barrido que sube hacia el Alcance 2
  const a = s(t0), n = s(t1 - t0);
  let lp = 0;
  for (let j = 0; j < n; j++) {
    const x = j / n;
    const corte = 200 + 6000 * x * x;
    const k = 1 - Math.exp((-2 * Math.PI * corte) / SR);
    lp += k * (rnd() * 2 - 1 - lp);
    suma(a + j, lp * x * x * amp, 0, 0.3);
  }
}
function golpe(t0, amp) { // golpe grave: la frontera cae
  const a = s(t0), n = s(0.9);
  for (let j = 0; j < n; j++) { const t = j / SR; const f = 38 + 30 * Math.exp(-t * 12); suma(a + j, Math.sin(2 * Math.PI * f * t) * Math.exp(-t * 4.5) * Math.min(1, t / 0.003) * amp, 0, 0.1); }
}
function crash(t0, amp) {
  const a = s(t0), n = s(2.2);
  let prev = 0;
  for (let j = 0; j < n; j++) { const t = j / SR; const w = rnd() * 2 - 1; const hp = w - prev; prev = w; suma(a + j, hp * Math.exp(-t * 2.4) * amp, 0, 0.3); }
}

// ---------- arreglo ----------
const ARP = [0, 2, 1, 2, 3, 2, 1, 2]; // índices sobre [raíz+12, 3.ª, 5.ª, raíz+24]
for (let bar = 0; bar < 66; bar++) {
  const t = bar * BAR;
  if (t >= DUR) break;
  const sec = seccion(bar);
  const ac = acorde(bar);
  const tonos = [ac.raiz + 12, ac.notas[1], ac.notas[2], ac.raiz + 24];

  // colchón: cada 2 compases
  if (bar % 2 === 0 && sec !== 'final') {
    const corte = { papel: 900, solucion: 1200, app: 1400, cierre: 1700, alcance1: 2000, piloto: 700, alcance2: 2400, mapa: 2000 }[sec];
    const amp = sec === 'piloto' ? 0.05 : 0.04;
    for (const m of ac.notas) pad(t, BAR * 2 - 0.1, m, amp, corte);
    pad(t, BAR * 2 - 0.1, ac.raiz, amp * 0.8, corte * 0.6);
  }

  for (let b = 0; b < 4; b++) {
    const tb = t + b * BEAT;
    if (sec === 'papel') { tic(tb, 0.10); if (b === 0) pluck(tb, tonos[0], 0.10, 0, 0.6); }
    if (sec === 'solucion') {
      for (let c = 0; c < 2; c++) pluck(tb + c * (BEAT / 2), tonos[ARP[(b * 2 + c) % 8]], 0.06, c ? 0.3 : -0.3, 0.8);
    }
    if (['app', 'cierre', 'alcance1', 'alcance2', 'mapa'].includes(sec)) {
      // arpegio en corcheas
      for (let c = 0; c < 2; c++) {
        const k = ARP[(b * 2 + c) % 8];
        const oct = sec === 'alcance2' ? 12 : 0;
        const amp = sec === 'app' ? 0.075 : sec === 'alcance2' ? 0.105 : sec === 'alcance1' ? 0.095 : 0.085;
        pluck(tb + c * (BEAT / 2), tonos[k] + oct, amp, c ? 0.3 : -0.3, sec === 'alcance2' ? 1.3 : 1);
      }
      // bombo
      if (sec === 'app') { if (b === 0 || b === 2) bombo(tb, 0.45); }
      else bombo(tb, sec === 'alcance2' ? 0.66 : sec === 'alcance1' ? 0.6 : 0.55);
      // platillo en los contratiempos
      if (sec !== 'app') platillo(tb + BEAT / 2, 0.10);
      if (sec === 'alcance2') { platillo(tb + BEAT / 4, 0.05, 0.02, 0.35); platillo(tb + (3 * BEAT) / 4, 0.05, 0.02, 0.35); }
      // caja en 2 y 4
      if (['alcance1', 'alcance2', 'mapa'].includes(sec) && (b === 1 || b === 3)) caja(tb, sec === 'alcance2' ? 0.28 : 0.24);
      // bajo
      if (sec !== 'app') {
        if (b === 0) bajo(tb, ac.raiz - 12, BEAT * 1.4, 0.32);
        if (b === 2) bajo(tb, ac.raiz - 12, BEAT * 0.8, 0.28);
        if (b === 3) bajo(tb + BEAT / 2, ac.raiz - 12 + 7, BEAT * 0.45, 0.22);
      }
    }
    if (sec === 'piloto') {
      if (b === 0) { bombo(tb, 0.5); bombo(tb + BEAT * 0.45, 0.25); }
      if (b === 0 || b === 2) pluck(tb, tonos[b === 0 ? 0 : 2], 0.07, 0, 0.5);
    }
  }
}

// Final: acorde de re mayor en el compás 63 (151,2 s), cuando llega la marca
{
  const t = 63 * BAR;
  for (const m of [38, 50, 57, 62, 66, 69, 74]) pad(t, 4.6, m, 0.045, 1800);
  for (const [i, m] of [62, 66, 69, 74, 78].entries()) pluck(t + i * 0.09, m, 0.09, (i % 2 ? 0.3 : -0.3), 1);
  bombo(t, 0.5);
  crash(t, 0.08);
}

// Efectos sincronizados con la imagen
// Aparece RH digital (20,05 s, cuando nace la marca): un acorde suave
crash(20.05, 0.06);
for (const [i, m] of [62, 66, 69, 74].entries()) pluck(20.05 + 1 / 30 + i * 0.07, m, 0.07, (i % 2 ? 0.3 : -0.3), 0.8);
// la báscula marca el peso, las teclas F3 y el clic del lote
pop(6.3 + 1 / 30, 0.12);
for (const t of [64.65, 69.28, 70.68, 72.08, 90.05, 118.35]) tic(t + 1 / 30, 0.14);
for (const c of [11.95, 43.2, 60.0, 144.0]) aire(c, 0.16);
aire(105.6, 0.10, 0.6);
subida(110.4, 112.8, 0.22);
crash(112.8, 0.12);
bombo(112.8, 0.6);
golpe(96.9, 0.55);
for (const t of [42.0, 52.4, 67.6, 91.3, 124.05, 127.6]) pop(t + 1 / 30, 0.16);

// ---------- reverberación (Schroeder) ----------
function reverb(inp) {
  const combs = [1557, 1617, 1491, 1422, 1277, 1356].map((d) => ({ buf: new Float32Array(Math.round(d * SR / 44100)), i: 0, lp: 0 }));
  const aps = [225, 556, 441].map((d) => ({ buf: new Float32Array(Math.round(d * SR / 44100)), i: 0 }));
  const out = new Float32Array(N);
  for (let j = 0; j < N; j++) {
    const x = inp[j];
    let y = 0;
    for (const c of combs) {
      const o = c.buf[c.i];
      c.lp = o * 0.7 + c.lp * 0.3;
      c.buf[c.i] = x + c.lp * 0.82;
      c.i = (c.i + 1) % c.buf.length;
      y += o;
    }
    y /= combs.length;
    for (const a of aps) {
      const o = a.buf[a.i];
      const v = y + o * 0.5;
      a.buf[a.i] = v;
      a.i = (a.i + 1) % a.buf.length;
      y = o - v * 0.5;
    }
    out[j] = y;
  }
  return out;
}
const REV = reverb(SEND);
const off = Math.round(0.011 * SR);
for (let j = 0; j < N; j++) {
  L[j] += REV[j] * 0.9;
  R[j] += (j >= off ? REV[j - off] : 0) * 0.9;
}

// Salida suave al final y pico a −3 dBFS (la mezcla final la ajusta ffmpeg)
for (let j = 0; j < N; j++) {
  const t = j / SR;
  const fade = t > 136.2 ? Math.max(0, 1 - (t - 136.2) / 1.8) : 1;
  const fin = t < 0.02 ? t / 0.02 : 1;
  L[j] *= fade * fin; R[j] *= fade * fin;
}
let peak = 0;
for (let j = 0; j < N; j++) peak = Math.max(peak, Math.abs(L[j]), Math.abs(R[j]));
const g = 0.708 / peak;

const buf = Buffer.alloc(44 + N * 4);
buf.write('RIFF', 0); buf.writeUInt32LE(36 + N * 4, 4); buf.write('WAVE', 8);
buf.write('fmt ', 12); buf.writeUInt32LE(16, 16); buf.writeUInt16LE(1, 20); buf.writeUInt16LE(2, 22);
buf.writeUInt32LE(SR, 24); buf.writeUInt32LE(SR * 4, 28); buf.writeUInt16LE(4, 32); buf.writeUInt16LE(16, 34);
buf.write('data', 36); buf.writeUInt32LE(N * 4, 40);
for (let j = 0; j < N; j++) {
  buf.writeInt16LE(Math.max(-32768, Math.min(32767, Math.round(L[j] * g * 32767))), 44 + j * 4);
  buf.writeInt16LE(Math.max(-32768, Math.min(32767, Math.round(R[j] * g * 32767))), 46 + j * 4);
}
fs.mkdirSync('assets/audio', { recursive: true });
fs.writeFileSync('assets/audio/musica.wav', buf);
console.log('musica.wav listo · pico original', peak.toFixed(3));
