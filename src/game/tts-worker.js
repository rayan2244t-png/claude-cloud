// Нейроголоса Kokoro-82M (Apache-2.0): живая американская речь, синтез прямо в браузере —
// без серверов, ключей и подписок. Работает в отдельном потоке, чтобы игра не подтормаживала.
//
// Модель (92 МБ) скачивается один раз и остаётся в кэше браузера:
//  1) с jsDelivr (npm-пакет kokoro-q8-shards — тот же файл, разрезанный на 6 частей),
//  2) если не вышло — напрямую с Hugging Face.
// Файл проверяется по SHA-256, так что подменённая модель не загрузится.
// Голоса (по 0,5 МБ) лежат рядом с игрой в папке voices/ (или берутся из npm-пакета kokoro-js на jsDelivr).
import { KokoroTTS } from 'kokoro-js';
import { StyleTextToSpeech2Model, Tensor, env } from '@huggingface/transformers';
import { makeTokenizer } from './kokoro-vocab.js';

const tokenizer = makeTokenizer(Tensor);

const REPO = 'onnx-community/Kokoro-82M-v1.0-ONNX';
const MODEL_SIZE = 92361116;
const MODEL_SHA256 = 'fbae9257e1e05ffc727e951ef9b9c98418e6d79f1c9b6b13bd59f5c9028a1478';
const SHARDS = Array.from({ length: 6 }, (_, i) => `https://cdn.jsdelivr.net/npm/kokoro-q8-shards@1.0.0/kokoro-q8.part${i}.bin`);
const HF_MODEL = `https://huggingface.co/${REPO}/resolve/main/onnx/model_quantized.onnx`;
const VOICES_CDN = 'https://cdn.jsdelivr.net/npm/kokoro-js@1.2.1/voices/';
const CONFIG = '{\n  "model_type": "style_text_to_speech_2"\n}';

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
    if (v) {
      // Голоса: сначала рядом с игрой, иначе — из npm-пакета kokoro-js через jsDelivr
      try {
        const r = await realFetch(`${voiceBase}${v[1]}.bin`);
        if (r.ok) return r;
      } catch { /* нет рядом — берём с CDN */ }
      return realFetch(`${VOICES_CDN}${v[1]}.bin`);
    }
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
