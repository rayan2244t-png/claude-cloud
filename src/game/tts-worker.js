// Нейроголоса Kokoro-82M (Apache-2.0): живая американская речь, синтез прямо в браузере —
// без серверов, ключей и подписок. Работает в отдельном потоке, чтобы игра не подтормаживала.
//
// Модель (92 МБ) скачивается один раз и остаётся в кэше браузера:
//  1) с jsDelivr (npm-пакет kokoro-q8-shards — тот же файл, разрезанный на 6 частей),
//  2) если не вышло — напрямую с Hugging Face.
// Файл проверяется по SHA-256, так что подменённая модель не загрузится.
// Голоса (по 0,5 МБ) лежат рядом с игрой в папке voices/.
import { KokoroTTS } from 'kokoro-js';
import { StyleTextToSpeech2Model, Tensor, env } from '@huggingface/transformers';

const REPO = 'onnx-community/Kokoro-82M-v1.0-ONNX';
const MODEL_SIZE = 92361116;
const MODEL_SHA256 = 'fbae9257e1e05ffc727e951ef9b9c98418e6d79f1c9b6b13bd59f5c9028a1478';
const SHARDS = Array.from({ length: 6 }, (_, i) => `https://cdn.jsdelivr.net/npm/kokoro-q8-shards@1.0.0/kokoro-q8.part${i}.bin`);
const HF_MODEL = `https://huggingface.co/${REPO}/resolve/main/onnx/model_quantized.onnx`;
const CONFIG = '{\n  "model_type": "style_text_to_speech_2"\n}';

// Фонемы → номера (словарь Kokoro-82M)
const VOCAB = {
  ';': 1, ':': 2, ',': 3, '.': 4, '!': 5, '?': 6, '—': 9, '…': 10, '"': 11, '(': 12, ')': 13, '“': 14, '”': 15, ' ': 16,
  '̃': 17, 'ʣ': 18, 'ʥ': 19, 'ʦ': 20, 'ʨ': 21, 'ᵝ': 22, 'ꭧ': 23, A: 24, I: 25, O: 31, Q: 33, S: 35, T: 36, W: 39, Y: 41,
  'ᵊ': 42, a: 43, b: 44, c: 45, d: 46, e: 47, f: 48, h: 50, i: 51, j: 52, k: 53, l: 54, m: 55, n: 56, o: 57, p: 58, q: 59,
  r: 60, s: 61, t: 62, u: 63, v: 64, w: 65, x: 66, y: 67, z: 68, 'ɑ': 69, 'ɐ': 70, 'ɒ': 71, 'æ': 72, 'β': 75, 'ɔ': 76, 'ɕ': 77,
  'ç': 78, 'ɖ': 80, 'ð': 81, 'ʤ': 82, 'ə': 83, 'ɚ': 85, 'ɛ': 86, 'ɜ': 87, 'ɟ': 90, 'ɡ': 92, 'ɥ': 99, 'ɨ': 101, 'ɪ': 102,
  'ʝ': 103, 'ɯ': 110, 'ɰ': 111, 'ŋ': 112, 'ɳ': 113, 'ɲ': 114, 'ɴ': 115, 'ø': 116, 'ɸ': 118, 'θ': 119, 'œ': 120, 'ɹ': 123,
  'ɾ': 125, 'ɻ': 126, 'ʁ': 128, 'ɽ': 129, 'ʂ': 130, 'ʃ': 131, 'ʈ': 132, 'ʧ': 133, 'ʊ': 135, 'ʋ': 136, 'ʌ': 138, 'ɣ': 139,
  'ɤ': 140, 'χ': 142, 'ʎ': 143, 'ʒ': 147, 'ʔ': 148, 'ˈ': 156, 'ˌ': 157, 'ː': 158, 'ʰ': 162, 'ʲ': 164, '↓': 169, '→': 171,
  '↗': 172, '↘': 173, 'ᵻ': 177,
};

// Токенизатор: $ + фонемы + $ (неизвестные символы пропускаются)
function tokenizer(phonemes) {
  const ids = [0];
  for (const ch of phonemes) if (VOCAB[ch] !== undefined && ids.length < 511) ids.push(VOCAB[ch]);
  ids.push(0);
  return { input_ids: new Tensor('int64', BigInt64Array.from(ids, BigInt), [1, ids.length]) };
}

let voiceBase = '';
const post = (msg, transfer) => self.postMessage(msg, transfer || []);

async function sha256(buf) {
  const h = await crypto.subtle.digest('SHA-256', buf);
  return [...new Uint8Array(h)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

async function readAll(res, onChunk) {
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const reader = res.body.getReader();
  const parts = [];
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    parts.push(value);
    onChunk(value.length);
  }
  return parts;
}

async function downloadModel(realFetch) {
  const sources = [
    { name: 'jsDelivr', urls: SHARDS },
    { name: 'Hugging Face', urls: [HF_MODEL] },
  ];
  let lastErr;
  for (const src of sources) {
    try {
      let loaded = 0;
      const parts = [];
      for (const url of src.urls) {
        parts.push(...await readAll(await realFetch(url), (n) => {
          loaded += n;
          post({ type: 'progress', loaded, total: MODEL_SIZE });
        }));
      }
      const buf = new Uint8Array(loaded);
      let off = 0;
      for (const p of parts) { buf.set(p, off); off += p.length; }
      if (buf.length !== MODEL_SIZE || await sha256(buf) !== MODEL_SHA256) throw new Error('файл модели повреждён');
      return buf;
    } catch (err) {
      lastErr = new Error(`${src.name}: ${err.message}`);
    }
  }
  throw lastErr;
}

// Подменяем адреса Hugging Face: конфиг — встроенный, голоса — свои, модель — проверенная
function patchFetch() {
  const realFetch = self.fetch.bind(self);
  self.fetch = async (input, init) => {
    const url = typeof input === 'string' ? input : input.url;
    if (!url.includes(REPO)) return realFetch(input, init);
    if (url.endsWith('/config.json')) return new Response(CONFIG, { headers: { 'content-type': 'application/json' } });
    const v = url.match(/\/voices\/(\w+)\.bin$/);
    if (v) return realFetch(`${voiceBase}${v[1]}.bin`);
    if (url.endsWith('/onnx/model_quantized.onnx')) {
      const buf = await downloadModel(realFetch);
      return new Response(buf, { headers: { 'content-type': 'application/octet-stream', 'content-length': String(buf.length) } });
    }
    return new Response('', { status: 404 });
  };
}

let tts = null;
let queue = Promise.resolve();

async function init(data) {
  voiceBase = data.voiceBase;
  patchFetch();
  env.allowLocalModels = false;
  env.backends.onnx.wasm.wasmPaths = `https://cdn.jsdelivr.net/npm/@huggingface/transformers@${env.version}/dist/`;
  env.backends.onnx.wasm.numThreads = self.crossOriginIsolated ? Math.min(4, navigator.hardwareConcurrency || 1) : 1;
  const model = await StyleTextToSpeech2Model.from_pretrained(REPO, { dtype: 'q8', device: 'wasm' });
  tts = new KokoroTTS(model, tokenizer);
  // Прогрев: первый синтез всегда медленнее
  await tts.generate('Hi.', { voice: 'af_heart' });
}

self.onmessage = ({ data }) => {
  if (data.type === 'init') {
    init(data).then(() => post({ type: 'ready' }), (err) => post({ type: 'error', message: err.message || String(err) }));
    return;
  }
  if (data.type === 'gen') {
    // По одному синтезу за раз
    queue = queue.then(async () => {
      try {
        const t0 = performance.now();
        const audio = await tts.generate(data.text, { voice: data.voice, speed: data.speed });
        post({ type: 'audio', id: data.id, samples: audio.audio, rate: audio.sampling_rate, ms: performance.now() - t0 }, [audio.audio.buffer]);
      } catch (err) {
        post({ type: 'audio', id: data.id, error: err.message || String(err) });
      }
    });
  }
};
