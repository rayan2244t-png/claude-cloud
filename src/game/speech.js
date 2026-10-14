// Американская озвучка и распознавание речи с микрофона.
// Два движка:
//  — нейроголоса Kokoro (как живые люди; скачиваются один раз, 92 МБ) — см. neural-voice.js;
//  — голоса браузера (Web Speech API) — запасной вариант, выбираем самые качественные из доступных.
import { state } from './state.js';
import { neuralEnabled, neuralReady, synth, clearPrefetch, NEURAL_VOICES, NARRATOR } from './neural-voice.js';
import { playVoice, voiceVolume } from './audio.js';

let voice = null;
const pools = { f: [], m: [] };
// Известные американские голоса по полу (разные ОС и браузеры)
const FEMALE = /Samantha|Aria|Jenny|Zira|Ava|Allison|Susan|Victoria|Karen|Michelle|Emma|Joanna|Salli|Kendra|Kimberly|Ivy|Ana|Nancy|Sara|Jane|Amber|Ashley|Cora|Elizabeth|Monica|Google US English|female/i;
const MALE = /Alex|Guy|David|Mark|Fred|Tom|Aaron|Daniel|Eric|Christopher|Roger|Steffan|Brian|Matthew|Joey|Justin|Andrew|Davis|Jason|Tony|Brandon|Jacob|Evan|Nathan|\bmale/i;

// Насколько живо звучит голос: нейросетевые голоса Edge/Windows/Apple — лучше всех
function quality(v) {
  const n = v.name;
  let q = 0;
  if (/Natural|Neural|Online/i.test(n)) q += 10;
  if (/Premium|Enhanced|Siri/i.test(n)) q += 8;
  if (/Google/i.test(n)) q += 5;
  if (/Samantha|Aria|Jenny|Ava|Allison/i.test(n)) q += 2;
  if (/Zira|David|Mark|Fred|eSpeak|compact/i.test(n)) q -= 4;
  return q;
}

function pickVoice() {
  const voices = window.speechSynthesis?.getVoices() || [];
  const us = voices.filter((v) => /^en[-_]US$/i.test(v.lang)).sort((a, b) => quality(b) - quality(a));
  const chosen = state.settings.browserVoice && voices.find((v) => v.name === state.settings.browserVoice);
  voice = chosen || us[0] || voices.find((v) => v.lang?.startsWith('en')) || null;
  // Для персонажей берём только хорошие голоса, если такие есть
  const best = (list) => {
    const top = list.filter((v) => quality(v) >= 5);
    return top.length >= 2 ? top : list;
  };
  pools.f = best(us.filter((v) => FEMALE.test(v.name) && !/\bmale\b/i.test(v.name)));
  pools.m = best(us.filter((v) => MALE.test(v.name) && !FEMALE.test(v.name)));
}

export const browserVoices = () => (window.speechSynthesis?.getVoices() || [])
  .filter((v) => /^en[-_]US$/i.test(v.lang)).sort((a, b) => quality(b) - quality(a));
export const refreshVoices = pickVoice;

const hash = (s) => { let h = 0; for (const c of s || '') h = (h * 31 + c.charCodeAt(0)) >>> 0; return h; };

// Свой голос для каждого персонажа: по полу и имени (стабильно)
function voiceFor(gender, who) {
  const pool = pools[gender] || [];
  if (!pool.length) return voice;
  return pool[hash(who) % pool.length];
}

export function neuralVoiceFor(gender, who) {
  const pool = NEURAL_VOICES[gender];
  return pool ? pool[hash(who) % pool.length] : (state.settings.narrator || NARRATOR);
}

if ('speechSynthesis' in window) {
  pickVoice();
  window.speechSynthesis.onvoiceschanged = pickVoice;
}

export const canSpeak = () => 'speechSynthesis' in window || neuralReady();

// Текущая реплика — чтобы новая обрывала старую
let current = null;
let token = 0;

export function stopSpeech() {
  token++;
  current?.stop();
  current = null;
  window.speechSynthesis?.cancel();
}

// Длинный текст режем на предложения: первое начинает звучать быстрее
function chunks(text) {
  const parts = text.match(/[^.!?]+[.!?]+["”)]*\s*|[^.!?]+$/g) || [text];
  const out = [];
  for (const p of parts.map((x) => x.trim()).filter(Boolean)) {
    if (out.length && (out[out.length - 1].length < 25 || p.length < 12)) out[out.length - 1] += ` ${p}`;
    else out.push(p);
  }
  return out;
}

const FIRST_WAIT = 2500;

async function speakNeural(text, { rate, volume, gender, who, onProgress }, my) {
  const v = neuralVoiceFor(gender, who);
  const speed = rate ?? state.settings.rate ?? 0.9;
  const parts = chunks(text);
  const total = parts.reduce((a, p) => a + p.length, 0);
  let before = 0;
  let next = synth(parts[0], v, speed);
  // Если голос не успел подготовиться — читаем голосом браузера, чтобы не ждать
  const first = await Promise.race([next, new Promise((r) => setTimeout(() => r(null), FIRST_WAIT))]);
  if (my !== token) return;
  if (!first) return speakBrowser(text, { pitch: 1, rate, volume, gender, who, onProgress });
  for (let i = 0; i < parts.length; i++) {
    const { samples, rate: sr } = await next;
    if (my !== token) return;
    if (i + 1 < parts.length) next = synth(parts[i + 1], v, speed); // готовим следующее, пока звучит это
    const play = playVoice(samples, sr, { volume });
    current = play;
    let raf = 0;
    if (onProgress) {
      const tick = () => { onProgress((before + play.progress() * parts[i].length) / total); raf = requestAnimationFrame(tick); };
      tick();
    }
    await play.done;
    cancelAnimationFrame(raf);
    before += parts[i].length;
    if (my !== token) return;
  }
  onProgress?.(1);
}

function speakBrowser(text, { pitch, rate, volume, gender, who, onProgress }) {
  if (!('speechSynthesis' in window)) return Promise.resolve();
  return new Promise((resolve) => {
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'en-US';
    const v = gender ? voiceFor(gender, who) : voice;
    if (v) u.voice = v;
    // Если отдельного голоса нет — меняем высоту, чтобы персонажи звучали по-разному
    if (gender && v === voice) pitch *= gender === 'f' ? 1.12 : 0.85;
    u.rate = rate ?? state.settings.rate;
    u.pitch = pitch;
    u.volume = Math.min(1, volume * voiceVolume());
    if (onProgress) u.onboundary = (e) => onProgress(e.charIndex / text.length);
    u.onend = u.onerror = () => { onProgress?.(1); resolve(); };
    window.speechSynthesis.speak(u);
    setTimeout(resolve, 4000 + text.length * 120);
  });
}

// Заготовить реплики заранее (пока игрок читает предыдущие), чтобы они прозвучали без задержки
export function prefetchSpeech(lines, { gender, who, rate } = {}, { fresh = false } = {}) {
  if (!neuralEnabled() || !neuralReady()) return;
  if (fresh) clearPrefetch();
  const v = neuralVoiceFor(gender, who);
  const speed = rate ?? state.settings.rate ?? 0.9;
  for (const line of lines) {
    const clean = String(line || '').replace(/[*_]/g, '').trim();
    if (clean) for (const part of chunks(clean)) synth(part, v, speed, { urgent: false }).catch(() => {});
  }
}

// pitch — для голосов браузера (немного разные голоса персонажам)
// onProgress(0…1) — сколько текста уже прозвучало (подсветка слов)
export function speak(text, { pitch = 1, rate, force = false, volume = 1, gender, who, onProgress } = {}) {
  if (!state.settings.voice && !force) return Promise.resolve();
  stopSpeech();
  const my = token;
  const clean = String(text).replace(/[*_]/g, '').trim();
  if (!clean) return Promise.resolve();
  const opts = { pitch, rate, volume, gender, who, onProgress };
  if (neuralEnabled() && neuralReady()) {
    return speakNeural(clean, opts, my).catch((err) => {
      console.warn('Нейроголос не сработал, читаю голосом браузера:', err);
      return my === token ? speakBrowser(clean, opts) : undefined;
    });
  }
  return speakBrowser(clean, opts);
}

const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
export const canListen = () => !!Recognition;

export function listen() {
  return new Promise((resolve, reject) => {
    if (!Recognition) return reject(new Error('Распознавание речи не поддерживается этим браузером'));
    const r = new Recognition();
    r.lang = 'en-US';
    r.interimResults = false;
    r.maxAlternatives = 3;
    r.onresult = (e) => resolve(Array.from(e.results[0]).map((a) => a.transcript));
    r.onerror = (e) => reject(new Error(e.error === 'not-allowed' ? 'Нет доступа к микрофону' : 'Не расслышал, попробуй ещё раз'));
    r.onnomatch = () => reject(new Error('Не расслышал, попробуй ещё раз'));
    r.start();
  });
}
