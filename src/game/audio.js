// Звук: всё синтезируется на лету (Web Audio), без файлов.
// — звуки интерфейса и игры (верно / ошибка / монетки / уровень / шаги / двери…)
// — живой город: гул, птицы днём, сверчки ночью, дождь, машины, гудки, ветер
// — уютная музыка (лоу-фай), днём и ночью разная
// — «бормотание» персонажей, как в Animal Crossing
import { state } from './state.js';

let ctx = null;
let master, sfxBus, musicBus, ambBus;
const amb = {};

const vol = () => state.settings;

export function initAudio() {
  if (ctx) { ctx.resume?.(); return; }
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) return;
  ctx = new AC();
  master = ctx.createGain();
  master.gain.value = 0.9;
  const comp = ctx.createDynamicsCompressor();
  comp.threshold.value = -16;
  master.connect(comp).connect(ctx.destination);
  sfxBus = gain(vol().sfx ?? 0.8, master);
  musicBus = gain(vol().music ?? 0.35, master);
  ambBus = gain(vol().ambience ?? 0.6, master);
  startAmbience();
  startMusic();
}

export function setVolumes() {
  if (!ctx) return;
  sfxBus.gain.value = vol().sfx ?? 0.8;
  musicBus.gain.value = vol().music ?? 0.35;
  ambBus.gain.value = vol().ambience ?? 0.6;
}

function gain(v, to) {
  const g = ctx.createGain();
  g.gain.value = v;
  if (to) g.connect(to);
  return g;
}

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
  correct: () => { [659, 784, 1047].forEach((f, i) => tone({ freq: f, type: 'triangle', dur: 0.22, vol: 0.18, at: i * 0.07 })); },
  wrong: () => { tone({ freq: 220, type: 'square', dur: 0.18, vol: 0.08, filter: 900 }); tone({ freq: 185, type: 'square', dur: 0.25, vol: 0.08, at: 0.12, filter: 900 }); },
  soft: () => tone({ freq: 440, type: 'sine', dur: 0.25, vol: 0.12, slide: -80 }),
  coin: () => { tone({ freq: 988, type: 'square', dur: 0.08, vol: 0.08, filter: 4000 }); tone({ freq: 1319, type: 'square', dur: 0.3, vol: 0.08, at: 0.07, filter: 4000 }); },
  levelup: () => { [523, 659, 784, 1047, 1319].forEach((f, i) => tone({ freq: f, type: 'triangle', dur: 0.35, vol: 0.16, at: i * 0.09 })); },
  sparkle: () => { for (let i = 0; i < 6; i++) tone({ freq: 1200 + Math.random() * 1600, type: 'sine', dur: 0.2, vol: 0.08, at: i * 0.05 }); },
  rec: () => tone({ freq: 660, type: 'sine', dur: 0.15, vol: 0.15 }),
  step: () => noiseBurst({ dur: 0.07, vol: 0.05 + Math.random() * 0.03, freq: 300 + Math.random() * 200, q: 0.8 }),
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
  const city = world.indoor ? 0.08 : world.map === 'manhattan' ? 0.55 : 0.32;
  amb.hum.gain.setTargetAtTime(city * (1 - world.night * 0.4), t, 0.5);
  amb.rain.gain.setTargetAtTime(world.indoor ? world.rain * 0.06 : world.rain * 0.28, t, 0.8);
  amb.wind.gain.setTargetAtTime(world.indoor ? 0 : 0.05 + world.rain * 0.08, t, 1);

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
    if (world.nearTraffic) noiseBurst({ dur: 1.2, vol: 0.05, freq: 500, q: 0.5, to: ambBus });
  }
}

// ---------- Музыка: тёплый лоу-фай ----------
const DAY_CHORDS = [[261.6, 329.6, 392, 493.9], [220, 261.6, 329.6, 392], [293.7, 349.2, 440, 523.3], [196, 246.9, 293.7, 349.2]];
const NIGHT_CHORDS = [[220, 261.6, 329.6, 392], [174.6, 220, 261.6, 329.6], [196, 246.9, 293.7, 349.2], [164.8, 196, 246.9, 293.7]];
let musicNight = 0;
let chordIdx = 0;

function startMusic() {
  const beat = 60 / 76;
  const bar = beat * 4;
  let next = ctx.currentTime + 0.5;
  const schedule = () => {
    if (!ctx) return;
    while (next < ctx.currentTime + 2) {
      const chords = musicNight > 0.5 ? NIGHT_CHORDS : DAY_CHORDS;
      const ch = chords[chordIdx % chords.length];
      // мягкий пэд
      ch.forEach((f) => tone({ freq: f / 2, type: 'triangle', dur: bar * 0.95, vol: 0.045, at: next - ctx.currentTime, attack: 0.4, to: musicBus, filter: 900 }));
      // бас
      tone({ freq: ch[0] / 4, type: 'sine', dur: beat * 1.8, vol: 0.12, at: next - ctx.currentTime, to: musicBus });
      tone({ freq: ch[0] / 4, type: 'sine', dur: beat * 1.5, vol: 0.09, at: next - ctx.currentTime + beat * 2, to: musicBus });
      // арпеджио-«щипок»
      for (let i = 0; i < 8; i++) {
        if (Math.random() < 0.35) continue;
        const n = ch[Math.floor(Math.random() * ch.length)] * (Math.random() < 0.3 ? 2 : 1);
        tone({ freq: n, type: 'sine', dur: 0.5, vol: 0.035, at: next - ctx.currentTime + i * beat / 2, to: musicBus, filter: 2500 });
      }
      // мягкая перкуссия (тихий «бум» и шорох)
      for (let i = 0; i < 4; i++) {
        if (i % 2 === 0) tone({ freq: 90, type: 'sine', dur: 0.18, vol: 0.06, slide: -40, at: next - ctx.currentTime + i * beat, to: musicBus });
        noiseBurst({ dur: 0.04, vol: 0.012, freq: 7000, q: 1, at: next - ctx.currentTime + i * beat + beat / 2, to: musicBus });
      }
      chordIdx++;
      next += bar;
    }
    setTimeout(schedule, 500);
  };
  schedule();
}

export function setMusicMood(night) { musicNight = night; }
