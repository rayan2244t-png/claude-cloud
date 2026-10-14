// Записанная озвучка: все фразы игры заранее озвучены живыми голосами Kokoro (tools/voice/render.mjs).
// Фразы лежат пачками в public/voice/*.ogg, индекс — public/voice/index.json.
// Пачка скачивается и декодируется при первой нужде; несколько последних держим в памяти.
import { state } from './state.js';
import { voiceFor, clipKey, NEURAL_VOICES, NARRATOR, NARRATOR_M } from './voices.js';

let index = null;
let loading = null;
const packs = new Map(); // номер пачки → Promise<AudioBuffer>
const PACK_LIMIT = 8;

export function loadVoiceIndex() {
  if (!loading) {
    loading = fetch(new URL('voice/index.json', document.baseURI).href)
      .then((r) => (r.ok ? r.json() : null))
      .then((j) => { index = j; return j; })
      .catch(() => null);
  }
  return loading;
}
loadVoiceIndex();

export const clipsReady = () => !!index;

// Имя игрока в репликах не записано — ищем фразу без него
function variants(text) {
  const t = clipKey(text);
  const out = [t];
  const name = state.name;
  if (name && t.includes(name)) {
    out.push(clipKey(t.split(name).join('{name}')));
  }
  return out;
}

// Найти запись: сначала голосом этого персонажа, потом тем же полом, потом любым
export function findClip(text, { gender, who } = {}) {
  if (!index) return null;
  const want = voiceFor(gender, who, state.settings.narrator || NARRATOR);
  const order = [want, ...(gender === 'm' ? [NARRATOR_M, ...NEURAL_VOICES.m] : gender === 'f' ? [NARRATOR, ...NEURAL_VOICES.f] : [NARRATOR, NARRATOR_M])];
  for (const t of variants(text)) {
    for (const v of order) {
      const c = index.clips[`${v}|${t}`];
      if (c) return c;
    }
    // Любой голос, если нужного пола нет
    for (const v of [...NEURAL_VOICES.f, ...NEURAL_VOICES.m]) {
      const c = index.clips[`${v}|${t}`];
      if (c) return c;
    }
  }
  return null;
}

function pack(ctx, pi) {
  if (packs.has(pi)) {
    const p = packs.get(pi);
    packs.delete(pi);
    packs.set(pi, p);
    return p;
  }
  const p = fetch(new URL(`voice/${index.packs[pi]}`, document.baseURI).href)
    .then((r) => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.arrayBuffer(); })
    .then((buf) => ctx.decodeAudioData(buf));
  p.catch(() => packs.delete(pi));
  packs.set(pi, p);
  while (packs.size > PACK_LIMIT) packs.delete(packs.keys().next().value);
  return p;
}

// Заранее скачать пачки, где лежат эти фразы (начало диалога)
export function warmClips(ctx, lines, opts) {
  if (!index || !ctx) return;
  const need = new Set();
  for (const l of lines) { const c = findClip(l, opts); if (c) need.add(c[0]); }
  for (const pi of need) pack(ctx, pi).catch(() => {});
}

// Готовый кусок записи: { samples, rate } (тот же вид, что у живого синтеза)
export async function clipAudio(ctx, clip) {
  const [pi, start, dur] = clip;
  const buf = await pack(ctx, pi);
  const from = Math.floor(start * buf.sampleRate);
  const len = Math.min(buf.length - from, Math.ceil(dur * buf.sampleRate));
  return { samples: buf.getChannelData(0).slice(from, from + len), rate: buf.sampleRate };
}
