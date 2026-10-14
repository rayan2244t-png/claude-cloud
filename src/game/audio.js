// Звук: всё синтезируется на лету (Web Audio), без файлов.
// — звуки интерфейса и игры (верно / ошибка / монетки / уровень / шаги / двери…)
// — живой город: гул, птицы днём, сверчки ночью, дождь, машины, гудки, ветер
// — уютная музыка (лоу-фай), днём и ночью разная
// — «бормотание» персонажей, как в Animal Crossing
import { state } from './state.js';

let ctx = null;
let master, sfxBus, musicBus, ambBus, voiceBus, pianoBus, reverb, sfxVerb;
const amb = {};

const vol = () => state.settings;

export function initAudio() {
  if (ctx) { ctx.resume?.(); return; }
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) return;
  ctx = new AC();
  master = ctx.createGain();
  master.gain.value = vol().muted ? 0 : vol().master ?? 0.7;
  const comp = ctx.createDynamicsCompressor();
  comp.threshold.value = -16;
  master.connect(comp).connect(ctx.destination);
  voiceBus = gain(vol().voiceVol ?? 1, master);
  sfxBus = gain(vol().sfx ?? 0.8, master);
  musicBus = gain(vol().music ?? 0.25, master);
  ambBus = gain(vol().ambience ?? 0.3, master);
  // Фортепиано: сухой сигнал + тёплая реверберация «зала»
  reverb = ctx.createConvolver();
  reverb.buffer = impulse(2.6, 2.2);
  reverb.connect(musicBus);
  pianoBus = gain(0.5, musicBus);
  const send = gain(0.32, reverb);
  pianoBus.connect(send);
  sfxVerb = gain(0.12, reverb); // немного зала и звукам игры
  sfxBus.connect(sfxVerb);
  startAmbience();
  startMusic();
}

export function setVolumes() {
  if (!ctx) return;
  sfxBus.gain.value = vol().sfx ?? 0.8;
  musicBus.gain.cancelScheduledValues(ctx.currentTime);
  musicBus.gain.value = vol().music ?? 0.25;
  ambBus.gain.value = vol().ambience ?? 0.3;
  master.gain.value = vol().muted ? 0 : vol().master ?? 0.7;
  voiceBus.gain.value = vol().voiceVol ?? 1;
}

// Громкость для голосов браузера (они играют мимо Web Audio)
export const voiceVolume = () => (vol().muted ? 0 : vol().master ?? 0.7) * (vol().voiceVol ?? 1);

// Проиграть синтезированную речь через канал голосов; музыка на это время приглушается
export function playVoice(samples, rate, { volume = 1 } = {}) {
  initAudio();
  if (!ctx) return { done: Promise.resolve(), stop() {}, progress: () => 1 };
  const buf = ctx.createBuffer(1, samples.length, rate);
  buf.copyToChannel(samples, 0);
  const src = ctx.createBufferSource();
  src.buffer = buf;
  const g = gain(volume, voiceBus);
  src.connect(g);
  const t0 = ctx.currentTime;
  const duck = musicBus.gain;
  duck.cancelScheduledValues(t0);
  duck.setTargetAtTime((vol().music ?? 0.25) * 0.45, t0, 0.15);
  src.start();
  let stopped = false;
  const done = new Promise((resolve) => {
    src.onended = () => {
      g.disconnect();
      duck.setTargetAtTime(vol().music ?? 0.25, ctx.currentTime, 0.4);
      resolve();
    };
  });
  return {
    done,
    stop() { if (!stopped) { stopped = true; try { src.stop(); } catch { /* уже остановлен */ } } },
    progress: () => Math.min(1, (ctx.currentTime - t0) / buf.duration),
  };
}

function gain(v, to) {
  const g = ctx.createGain();
  g.gain.value = v;
  if (to) g.connect(to);
  return g;
}

// Импульс реверберации: стерео-шум с экспоненциальным затуханием
function impulse(seconds, decay) {
  const len = Math.floor(ctx.sampleRate * seconds);
  const buf = ctx.createBuffer(2, len, ctx.sampleRate);
  for (let ch = 0; ch < 2; ch++) {
    const d = buf.getChannelData(ch);
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, decay);
  }
  return buf;
}

// ---------- Фортепиано (синтез) ----------
// Сумма обертонов с лёгкой негармоничностью струны, мягкий удар молоточка,
// высокие обертоны гаснут быстрее — звук «темнеет», как у настоящего рояля.
const PARTIALS = [1, 0.42, 0.24, 0.12, 0.07, 0.035];
export const midi = (n) => 440 * Math.pow(2, (n - 69) / 12);
export function piano(note, { at = 0, vel = 0.5, dur, to } = {}) {
  if (!ctx) return;
  const f0 = typeof note === 'number' && note < 128 ? midi(note) : note;
  const t = ctx.currentTime + at;
  const len = dur ?? THREE_CLAMP(5.5 - Math.log2(f0 / 65) * 0.9, 0.8, 5);
  const out = ctx.createGain();
  out.gain.value = vel * 0.22;
  const lp = ctx.createBiquadFilter();
  lp.type = 'lowpass';
  lp.frequency.setValueAtTime(Math.min(9000, f0 * (6 + vel * 10)), t);
  lp.frequency.exponentialRampToValueAtTime(Math.max(300, f0 * 2), t + len * 0.6);
  lp.connect(out).connect(to || pianoBus);
  PARTIALS.forEach((amp, i) => {
    const n = i + 1;
    const f = f0 * n * Math.sqrt(1 + 0.0004 * n * n);
    if (f > 12000) return;
    const o = ctx.createOscillator();
    o.type = 'sine';
    o.frequency.value = f * (1 + (Math.random() - 0.5) * 0.0015);
    const g = ctx.createGain();
    const d = len / Math.pow(n, 0.7);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(amp, t + 0.004);
    g.gain.exponentialRampToValueAtTime(amp * 0.35, t + Math.min(0.25, d * 0.15));
    g.gain.exponentialRampToValueAtTime(0.0001, t + d);
    o.connect(g).connect(lp);
    o.start(t);
    o.stop(t + d + 0.05);
  });
  // Удар молоточка
  noiseBurst({ dur: 0.025, vol: 0.02 * vel, freq: Math.min(6000, f0 * 4), q: 1.2, at, to: to || pianoBus });
}
const THREE_CLAMP = (v, a, b) => Math.min(b, Math.max(a, v));

function noiseBuffer(seconds = 2, color = 'white') {
  const len = ctx.sampleRate * seconds;
  const buf = ctx.createBuffer(1, len, ctx.sampleRate);
  const d = buf.getChannelData(0);
  let last = 0;
  for (let i = 0; i < len; i++) {
    const w = Math.random() * 2 - 1;
    if (color === 'brown') { last = (last + 0.02 * w) / 1.02; d[i] = last * 3.5; } else d[i] = w;
  }
  return buf;
}

function tone({ freq = 440, type = 'sine', dur = 0.15, vol = 0.3, at = 0, to = sfxBus, slide = 0, attack = 0.005, filter }) {
  if (!ctx) return;
  const t = ctx.currentTime + at;
  const o = ctx.createOscillator();
  o.type = type;
  o.frequency.setValueAtTime(freq, t);
  if (slide) o.frequency.exponentialRampToValueAtTime(Math.max(20, freq + slide), t + dur);
  const g = ctx.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(vol, t + attack);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  let node = o;
  if (filter) {
    const f = ctx.createBiquadFilter();
    f.type = 'lowpass';
    f.frequency.value = filter;
    o.connect(f);
    node = f;
  }
  node.connect(g).connect(to);
  o.start(t);
  o.stop(t + dur + 0.05);
}

function noiseBurst({ dur = 0.2, vol = 0.2, at = 0, freq = 1000, q = 1, type = 'bandpass', to = sfxBus }) {
  if (!ctx) return;
  const t = ctx.currentTime + at;
  const src = ctx.createBufferSource();
  src.buffer = noiseBuffer(Math.max(0.1, dur + 0.05));
  const f = ctx.createBiquadFilter();
  f.type = type;
  f.frequency.value = freq;
  f.Q.value = q;
  const g = ctx.createGain();
  g.gain.setValueAtTime(vol, t);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  src.connect(f).connect(g).connect(to);
  src.start(t);
  src.stop(t + dur + 0.05);
}

// ---------- Звуки игры ----------
const SFX = {
  click: () => tone({ freq: 880, type: 'triangle', dur: 0.06, vol: 0.12 }),
  pop: () => tone({ freq: 520, type: 'sine', dur: 0.12, vol: 0.2, slide: 400 }),
  correct: () => { [76, 79, 84].forEach((n, i) => piano(n, { vel: 0.55, at: i * 0.06, dur: 1.6, to: sfxBus })); },
  wrong: () => { piano(50, { vel: 0.45, dur: 1.2, to: sfxBus }); piano(51, { vel: 0.35, dur: 1.2, at: 0.02, to: sfxBus }); tone({ freq: 200, type: 'sine', dur: 0.25, vol: 0.06, slide: -60, at: 0.05 }); },
  soft: () => tone({ freq: 440, type: 'sine', dur: 0.25, vol: 0.12, slide: -80 }),
  coin: () => { tone({ freq: 988, type: 'square', dur: 0.08, vol: 0.08, filter: 4000 }); tone({ freq: 1319, type: 'square', dur: 0.3, vol: 0.08, at: 0.07, filter: 4000 }); },
  levelup: () => { [60, 64, 67, 72, 76, 79, 84].forEach((n, i) => piano(n, { vel: 0.6, at: i * 0.07, to: sfxBus })); [48, 55].forEach((n) => piano(n, { vel: 0.5, at: 0.5, to: sfxBus })); },
  sparkle: () => { for (let i = 0; i < 6; i++) tone({ freq: 1200 + Math.random() * 1600, type: 'sine', dur: 0.2, vol: 0.08, at: i * 0.05 }); },
  rec: () => tone({ freq: 660, type: 'sine', dur: 0.15, vol: 0.15 }),
  // Шаги: по асфальту — чёткий стук каблука, по траве — мягкий шорох
  step: () => {
    noiseBurst({ dur: 0.05, vol: 0.06 + Math.random() * 0.03, freq: 1800 + Math.random() * 600, q: 1.5 });
    tone({ freq: 110 + Math.random() * 30, type: 'sine', dur: 0.06, vol: 0.06, slide: -40 });
  },
  stepGrass: () => {
    noiseBurst({ dur: 0.16, vol: 0.05 + Math.random() * 0.02, freq: 3200 + Math.random() * 900, q: 0.7 });
    noiseBurst({ dur: 0.1, vol: 0.03, freq: 700, q: 0.6, at: 0.03 });
  },
  // Подобрал вещь / положил
  pickup: () => { noiseBurst({ dur: 0.08, vol: 0.08, freq: 900, q: 1 }); piano(76, { vel: 0.35, dur: 0.6, to: sfxBus }); piano(83, { vel: 0.3, dur: 0.8, at: 0.07, to: sfxBus }); },
  drop: () => { tone({ freq: 140, type: 'sine', dur: 0.14, vol: 0.18, slide: -60 }); noiseBurst({ dur: 0.07, vol: 0.07, freq: 500, q: 0.8 }); },
  // «Hey!» — короткий «рупор»
  shout: () => { tone({ freq: 380, type: 'square', dur: 0.12, vol: 0.05, slide: 90, filter: 1600 }); tone({ freq: 470, type: 'square', dur: 0.14, vol: 0.045, slide: 60, filter: 1600, at: 0.11 }); },
  // Собака лает: два «гав» с формантой
  bark: () => {
    for (let k = 0; k < 2; k++) {
      const at = k * 0.22;
      tone({ freq: 620, type: 'sawtooth', dur: 0.11, vol: 0.06, slide: -300, filter: 1400, at });
      noiseBurst({ dur: 0.09, vol: 0.06, freq: 950, q: 2.5, at });
    }
  },
  // Карандаш зачёркивает пункт в списке дел + фортепианный «росчерк»
  scribble: () => {
    for (let i = 0; i < 7; i++) noiseBurst({ dur: 0.06, vol: 0.05, freq: 3500 + (i % 2) * 1200, q: 2, at: i * 0.06 });
    [72, 76, 79, 84].forEach((n, i) => piano(n, { vel: 0.45, at: 0.45 + i * 0.07, to: sfxBus }));
  },
  door: () => { noiseBurst({ dur: 0.3, vol: 0.15, freq: 400, q: 2 }); tone({ freq: 120, type: 'sine', dur: 0.2, vol: 0.2, at: 0.2 }); },
  whoosh: () => noiseBurst({ dur: 0.35, vol: 0.12, freq: 1800, q: 0.7 }),
  ding: () => { tone({ freq: 1568, type: 'sine', dur: 0.5, vol: 0.12 }); tone({ freq: 2093, type: 'sine', dur: 0.6, vol: 0.08, at: 0.08 }); },
  message: () => { tone({ freq: 1175, type: 'sine', dur: 0.12, vol: 0.12 }); tone({ freq: 1568, type: 'sine', dur: 0.18, vol: 0.12, at: 0.1 }); },
  camera: () => { noiseBurst({ dur: 0.08, vol: 0.2, freq: 3000, q: 1 }); noiseBurst({ dur: 0.12, vol: 0.15, freq: 2000, q: 1, at: 0.09 }); },
  subway: () => {
    if (!ctx) return;
    const src = ctx.createBufferSource();
    src.buffer = noiseBuffer(5, 'brown');
    const f = ctx.createBiquadFilter();
    f.type = 'lowpass';
    f.frequency.value = 300;
    const g = ctx.createGain();
    const t = ctx.currentTime;
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.5, t + 0.8);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 4.8);
    src.connect(f).connect(g).connect(sfxBus);
    src.start(t);
    // стук колёс
    for (let i = 0; i < 8; i++) noiseBurst({ dur: 0.06, vol: 0.12, freq: 180, q: 3, at: 0.6 + i * 0.45 });
    // фирменный сигнал закрытия дверей NYC (динь-дон)
    tone({ freq: 698, type: 'sine', dur: 0.4, vol: 0.15, at: 0.1 });
    tone({ freq: 554, type: 'sine', dur: 0.5, vol: 0.15, at: 0.45 });
  },
  firework: () => {
    noiseBurst({ dur: 0.9, vol: 0.25, freq: 300, q: 0.6, at: 0.05 });
    for (let i = 0; i < 10; i++) noiseBurst({ dur: 0.05, vol: 0.08, freq: 3000 + Math.random() * 3000, q: 2, at: 0.3 + Math.random() * 0.8 });
  },
  horn: () => { tone({ freq: 392, type: 'sawtooth', dur: 0.35, vol: 0.05, filter: 1200, to: ambBus }); tone({ freq: 466, type: 'sawtooth', dur: 0.35, vol: 0.05, filter: 1200, to: ambBus }); },
};

export function sfx(name) {
  if (!ctx || state.settings.sfxOn === false) return;
  try { SFX[name]?.(); } catch { /* ignore */ }
}

// «Бормотание» персонажа: короткие слоги с высотой голоса персонажа
export function babble(text, { pitch = 1, gender = 'm' } = {}) {
  if (!ctx || state.settings.sfxOn === false) return;
  const base = (gender === 'f' ? 330 : 180) * pitch;
  const syllables = Math.min(10, Math.max(2, Math.round(text.length / 6)));
  for (let i = 0; i < syllables; i++) {
    const f = base * (0.85 + Math.random() * 0.4);
    tone({ freq: f, type: 'triangle', dur: 0.07, vol: 0.09, at: i * 0.085, slide: (Math.random() - 0.5) * 60, filter: 2200 });
  }
}

// ---------- Атмосфера города ----------
function loopNoise(color, filterType, freq, v) {
  const src = ctx.createBufferSource();
  src.buffer = noiseBuffer(4, color);
  src.loop = true;
  const f = ctx.createBiquadFilter();
  f.type = filterType;
  f.frequency.value = freq;
  const g = gain(0, ambBus);
  src.connect(f).connect(g);
  src.start();
  g.target = v;
  return g;
}

function startAmbience() {
  amb.hum = loopNoise('brown', 'lowpass', 220, 0.35);
  amb.rain = loopNoise('white', 'highpass', 1500, 0.25);
  amb.wind = loopNoise('brown', 'bandpass', 500, 0.12);
}

function chirp(at = 0) {
  const base = 2500 + Math.random() * 2000;
  const n = 2 + Math.floor(Math.random() * 4);
  for (let i = 0; i < n; i++) tone({ freq: base, type: 'sine', dur: 0.08, vol: 0.04, at: at + i * 0.11, slide: (Math.random() < 0.5 ? 1 : -1) * 900, to: ambBus });
}

function cricket(at = 0) {
  for (let i = 0; i < 3; i++) tone({ freq: 4400 + Math.random() * 200, type: 'sine', dur: 0.03, vol: 0.025, at: at + i * 0.05, to: ambBus });
}

let timers = { bird: 2, cricket: 1, horn: 8, car: 3 };

// Вызывается каждый кадр: world — { map, night (0..1), rain (0..1), indoor, nearTraffic }
export function updateAudio(dt, world) {
  if (!ctx) return;
  const t = ctx.currentTime;
  // Гул города — фоном, тихо: не должен заглушать голоса
  const city = world.indoor ? 0.03 : world.map === 'manhattan' ? 0.16 : 0.09;
  amb.hum.gain.setTargetAtTime(city * (1 - world.night * 0.4), t, 0.5);
  amb.rain.gain.setTargetAtTime(world.indoor ? world.rain * 0.03 : world.rain * 0.12, t, 0.8);
  amb.wind.gain.setTargetAtTime(world.indoor ? 0 : 0.015 + world.rain * 0.03, t, 1);

  for (const k of Object.keys(timers)) timers[k] -= dt;
  if (world.indoor) return;
  if (timers.bird <= 0) {
    timers.bird = 1.5 + Math.random() * 4;
    if (world.night < 0.4 && world.rain < 0.3 && world.map !== 'manhattan') chirp();
  }
  if (timers.cricket <= 0) {
    timers.cricket = 0.35 + Math.random() * 0.6;
    if (world.night > 0.6 && world.rain < 0.3 && world.map === 'brooklyn') cricket();
  }
  if (timers.horn <= 0) {
    timers.horn = (world.map === 'manhattan' ? 6 : 18) + Math.random() * 14;
    sfx('horn');
  }
  if (timers.car <= 0) {
    timers.car = 2 + Math.random() * 4;
    if (world.nearTraffic) noiseBurst({ dur: 1.2, vol: 0.02, freq: 500, q: 0.5, to: ambBus });
  }
}

// ---------- Музыка: живое пианино, как в Goose Game ----------
// Импрессионистские аккорды (в духе Дебюсси). Музыка следит за игрой:
// стоишь — редкие тихие ноты; идёшь — лёгкие отрывистые «крадущиеся» ноты;
// бежишь или крикнул «Hey!» — громче и плотнее. Ночью — медленнее и мягче.
// Аккорды: бас + голоса (MIDI-ноты), мелодия берётся из лада
const DAY = [
  { bass: 38, v: [62, 66, 69, 73] }, // Dmaj9
  { bass: 43, v: [59, 62, 66, 69] }, // Gmaj7
  { bass: 47, v: [61, 62, 66, 69] }, // Bm(add9)
  { bass: 45, v: [61, 64, 66, 71] }, // A6sus
  { bass: 40, v: [62, 66, 67, 71] }, // Em9
  { bass: 43, v: [59, 64, 66, 71] }, // G6/9
  { bass: 38, v: [64, 66, 69, 73] }, // D6/9
  { bass: 45, v: [61, 64, 67, 69] }, // A7sus
];
const NIGHT = [
  { bass: 41, v: [60, 64, 67, 69] }, // Fmaj7
  { bass: 40, v: [59, 62, 67, 71] }, // Em7
  { bass: 38, v: [60, 64, 65, 69] }, // Dm9
  { bass: 36, v: [59, 64, 67, 71] }, // Cmaj7
];
const SCALE_DAY = [74, 76, 78, 81, 83, 85, 86, 88];
const SCALE_NIGHT = [72, 74, 76, 79, 81, 84];
let musicNight = 0;
let intensity = 0.3, intensityGoal = 0.3;
let chordIdx = 0;
let lastMel = 0;

export function setMusicIntensity(x) { intensityGoal = Math.max(0, Math.min(1, x)); }

function startMusic() {
  let next = ctx.currentTime + 0.6;
  const schedule = () => {
    if (!ctx) return;
    while (next < ctx.currentTime + 1.5) {
      intensity += (intensityGoal - intensity) * 0.35;
      const night = musicNight > 0.5;
      const beat = 60 / (night ? 60 : 74 + intensity * 26);
      const bar = beat * 4;
      const prog = night ? NIGHT : DAY;
      const ch = prog[chordIdx % prog.length];
      const scale = night ? SCALE_NIGHT : SCALE_DAY;
      const at = next - ctx.currentTime;
      const I = intensity;
      // Громкость музыки дышит вместе с игрой
      pianoBus.gain.setTargetAtTime(0.28 + I * 0.42, ctx.currentTime, 0.8);
      // Бас
      piano(ch.bass, { at, vel: 0.35 + I * 0.15 });
      if (I > 0.55) piano(ch.bass + 12, { at: at + beat * 2, vel: 0.25 });
      if (I < 0.35) {
        // Покой: мягкий аккорд «перекатом» и одна-две ноты мелодии
        ch.v.forEach((n, i) => piano(n, { at: at + 0.03 + i * 0.06, vel: 0.22 }));
        if (Math.random() < 0.7) melody(at + beat * 2 + Math.random() * beat, 0.3);
      } else {
        // Движение: отрывистые восьмые «на цыпочках» (staccato), плотнее при высокой интенсивности
        const steps = 8;
        for (let i = 0; i < steps; i++) {
          const play = i % 2 === 0 || Math.random() < I;
          if (!play) continue;
          const n = ch.v[(i * 3 + chordIdx) % ch.v.length] + (i % 4 === 3 ? 12 : 0);
          piano(n, { at: at + i * beat / 2, vel: 0.2 + I * 0.25, dur: 0.35 + (1 - I) * 0.5 });
        }
        const melNotes = I > 0.75 ? 4 : 2;
        for (let k = 0; k < melNotes; k++) melody(at + beat * (k * 4 / melNotes) + beat * 0.5, 0.3 + I * 0.25);
      }
      function melody(when, vel) {
        // Мелодия ходит плавно: соседние ступени лада
        lastMel = Math.max(0, Math.min(scale.length - 1, lastMel + Math.floor(Math.random() * 5) - 2));
        piano(scale[lastMel], { at: when, vel });
      }
      chordIdx++;
      next += bar;
    }
    setTimeout(schedule, 400);
  };
  schedule();
}

export function setMusicMood(night) { musicNight = night; }
