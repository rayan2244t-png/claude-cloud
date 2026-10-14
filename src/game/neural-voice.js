// Нейроголоса: управление потоком синтеза (tts-worker.js), кэш готовых фраз, состояние загрузки.
import { state, save, emit } from './state.js';

export { NEURAL_VOICES, NARRATOR } from './voices.js';

export const neural = { status: 'off', progress: 0, error: '' }; // off | loading | ready | error

let worker = null;
let seq = 0;
const waiting = new Map();
const cache = new Map(); // ключ → Promise<{samples, rate}>
const CACHE_LIMIT = 80;

const setStatus = (status, extra = {}) => {
  Object.assign(neural, { status, ...extra });
  emit('neural', neural);
};

export const neuralEnabled = () => state.settings.voiceEngine === 'neural';

export function loadNeural() {
  if (worker) return;
  if (typeof Worker === 'undefined' || !window.WebAssembly) {
    setStatus('error', { error: 'Браузер не поддерживает нейроголоса' });
    return;
  }
  setStatus('loading', { progress: 0, error: '' });
  try {
    worker = new Worker(new URL('./tts-worker.js', import.meta.url), { type: 'module' });
  } catch (err) {
    worker = null;
    setStatus('error', { error: err.message });
    return;
  }
  worker.onmessage = ({ data }) => {
    if (data.type === 'progress') setStatus('loading', { progress: data.loaded / data.total });
    else if (data.type === 'ready') {
      state.settings.neuralReady = true;
      save();
      setStatus('ready', { progress: 1 });
    } else if (data.type === 'error') {
      worker.terminate();
      worker = null;
      setStatus('error', { error: data.message });
    } else if (data.type === 'audio') {
      const w = waiting.get(data.id);
      waiting.delete(data.id);
      if (!w) return;
      if (data.error) w.reject(new Error(data.error));
      else w.resolve({ samples: data.samples, rate: data.rate });
    }
  };
  worker.onerror = (e) => {
    worker = null;
    setStatus('error', { error: e.message || 'Не удалось запустить синтез речи' });
  };
  worker.postMessage({ type: 'init', voiceBase: new URL('voices/', document.baseURI).href });
}

export function enableNeural(on) {
  state.settings.voiceEngine = on ? 'neural' : 'browser';
  save();
  if (on) loadNeural();
}

// Очередь синтеза: поток считает по одной фразе. Срочная фраза (звучит прямо сейчас)
// встаёт в начало, заготовки впрок — в конец.
const jobs = [];
let busy = false;

function pump() {
  if (busy || !jobs.length || !worker) return;
  busy = true;
  const job = jobs.shift();
  const id = ++seq;
  waiting.set(id, {
    resolve: (r) => { busy = false; job.resolve(r); pump(); },
    reject: (e) => { busy = false; job.reject(e); pump(); },
  });
  worker.postMessage({ type: 'gen', id, text: job.text, voice: job.voice, speed: job.speed });
}

// Синтез фразы (с кэшем: повторные реплики звучат мгновенно)
export function synth(text, voice, speed = 1, { urgent = true } = {}) {
  const key = `${voice}|${speed.toFixed(2)}|${text}`;
  if (cache.has(key)) {
    const entry = cache.get(key);
    cache.delete(key);
    cache.set(key, entry);
    // Заготовка ещё в очереди, а фраза нужна сейчас — поднимаем её в начало
    if (urgent && entry.job && jobs.includes(entry.job)) {
      jobs.splice(jobs.indexOf(entry.job), 1);
      jobs.unshift(entry.job);
    }
    return entry.promise;
  }
  const job = { text, voice, speed };
  const promise = new Promise((resolve, reject) => { job.resolve = resolve; job.reject = reject; });
  promise.catch(() => cache.delete(key));
  if (urgent) jobs.unshift(job); else jobs.push(job);
  cache.set(key, { promise, job });
  while (cache.size > CACHE_LIMIT) cache.delete(cache.keys().next().value);
  pump();
  return promise;
}

// Новая сцена — старые заготовки больше не нужны
export function clearPrefetch() {
  for (const job of jobs.splice(0)) job.reject(new Error('cancelled'));
}

export const neuralReady = () => neural.status === 'ready' && !!worker;

// Если нейроголоса уже скачивались — запускаем их сразу (модель берётся из кэша браузера)
if (neuralEnabled()) loadNeural();
