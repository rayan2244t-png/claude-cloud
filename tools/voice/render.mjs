// Записывает все фразы игры живыми голосами Kokoro и упаковывает в аудиофайлы Opus.
// Запуск: node tools/voice/render.mjs   (модель — см. kokoro-node.mjs; нужен ffmpeg с libopus)
// Результат: public/voice/*.ogg + public/voice/index.json { packs: [...], clips: { "голос|фраза": [пак, начало, длительность] } }
// Готовые фразы кэшируются в VOICE_CACHE (по умолчанию /tmp/voice-cache) — повторный запуск пишет только новое.
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { execFileSync } from 'child_process';
import { CLIPS } from './collect.mjs';
import { loadKokoro } from './kokoro-node.mjs';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '../..');
const OUT = path.join(ROOT, 'public/voice');
const CACHE = process.env.VOICE_CACHE || '/tmp/voice-cache';
const SR = 24000;
const SPEED = 0.95; // чуть медленнее обычного — для учащихся
const PACK_SEC = 150; // примерно столько секунд речи в одном файле
fs.mkdirSync(CACHE, { recursive: true });
fs.mkdirSync(OUT, { recursive: true });

const id = (c) => crypto.createHash('sha1').update(`${c.voice}|${c.text}|${SPEED}`).digest('hex').slice(0, 16);

// Убираем тишину по краям, оставляя короткие паузы
function trim(a) {
  const thr = 0.006;
  let s = 0, e = a.length - 1;
  while (s < a.length && Math.abs(a[s]) < thr) s++;
  while (e > s && Math.abs(a[e]) < thr) e--;
  return a.subarray(Math.max(0, s - SR * 0.04), Math.min(a.length, e + SR * 0.08));
}

const todo = CLIPS.filter((c) => !fs.existsSync(path.join(CACHE, `${id(c)}.f32`)));
console.log(`фраз: ${CLIPS.length}, записать: ${todo.length}`);
if (todo.length) {
  const tts = await loadKokoro();
  const t0 = Date.now();
  let done = 0;
  for (const c of todo) {
    try {
      const a = await tts.generate(c.text, { voice: c.voice, speed: SPEED });
      const clip = trim(a.audio);
      fs.writeFileSync(path.join(CACHE, `${id(c)}.f32`), Buffer.from(clip.buffer, clip.byteOffset, clip.byteLength));
    } catch (err) {
      console.warn('не получилось:', c.text, err.message);
    }
    if (++done % 50 === 0) {
      const el = (Date.now() - t0) / 1000;
      console.log(`${done}/${todo.length} · ${Math.round(el)} с · осталось ~${Math.round((el / done) * (todo.length - done) / 60)} мин`);
    }
  }
}

// ---------- Упаковка ----------
function wav(samples) {
  const pcm = Buffer.alloc(samples.length * 2);
  for (let i = 0; i < samples.length; i++) pcm.writeInt16LE(Math.round(Math.max(-1, Math.min(1, samples[i])) * 32767), i * 2);
  const h = Buffer.alloc(44);
  h.write('RIFF', 0); h.writeUInt32LE(36 + pcm.length, 4); h.write('WAVE', 8); h.write('fmt ', 12);
  h.writeUInt32LE(16, 16); h.writeUInt16LE(1, 20); h.writeUInt16LE(1, 22); h.writeUInt32LE(SR, 24);
  h.writeUInt32LE(SR * 2, 28); h.writeUInt16LE(2, 32); h.writeUInt16LE(16, 34); h.write('data', 36); h.writeUInt32LE(pcm.length, 40);
  return Buffer.concat([h, pcm]);
}

for (const f of fs.readdirSync(OUT)) if (f.endsWith('.ogg')) fs.unlinkSync(path.join(OUT, f));
const groups = new Map();
for (const c of CLIPS) {
  const file = path.join(CACHE, `${id(c)}.f32`);
  if (!fs.existsSync(file)) continue;
  if (!groups.has(c.group)) groups.set(c.group, []);
  groups.get(c.group).push({ c, file });
}
const GAP = Math.round(SR * 0.25); // пауза между фразами внутри файла
const index = { sr: SR, packs: [], clips: {} };
for (const [group, items] of groups) {
  let part = 0, chunks = [], len = 0, entries = [];
  const flush = () => {
    if (!chunks.length) return;
    const name = `${group}${part ? `_${part}` : ''}`.replace(/[^a-z0-9_]/gi, '_');
    const all = new Float32Array(len);
    let off = 0;
    for (const ch of chunks) { all.set(ch, off); off += ch.length; }
    const tmp = path.join(CACHE, `${name}.wav`);
    fs.writeFileSync(tmp, wav(all));
    execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', tmp, '-c:a', 'libopus', '-b:a', '28k', '-application', 'audio', path.join(OUT, `${name}.ogg`)]);
    fs.unlinkSync(tmp);
    const pi = index.packs.push(`${name}.ogg`) - 1;
    for (const [key, start, dur] of entries) index.clips[key] = [pi, +start.toFixed(3), +dur.toFixed(3)];
    part++; chunks = []; len = 0; entries = [];
  };
  for (const { c, file } of items) {
    const b = fs.readFileSync(file);
    const s = new Float32Array(b.buffer, b.byteOffset, b.byteLength / 4);
    entries.push([`${c.voice}|${c.text}`, (len + GAP) / SR, s.length / SR]);
    chunks.push(new Float32Array(GAP), s);
    len += GAP + s.length;
    if (len / SR > PACK_SEC) flush();
  }
  flush();
}
fs.writeFileSync(path.join(OUT, 'index.json'), JSON.stringify(index));
const size = fs.readdirSync(OUT).reduce((a, f) => a + fs.statSync(path.join(OUT, f)).size, 0);
console.log(`готово: ${Object.keys(index.clips).length} фраз, ${index.packs.length} файлов, ${(size / 1048576).toFixed(1)} МБ`);
