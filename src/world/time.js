// Время суток и погода: небо, солнце, ночные огни, дождь.
// 1 секунда реального времени = 1 игровая минута (сутки ≈ 24 минуты).
import * as THREE from 'three';
import { NIGHT_GLOW, LIGHT_POOL_MAT, WET, SHADER, WORLD } from './kit.js';

// Ключевые точки суток: час → цвета и яркость
const KEYS = [
  { h: 0, sky: '#141c36', sun: '#8fa6ff', sunI: 0.55, hemiSky: '#3d4a78', hemiGround: '#1a2230', hemiI: 0.42, night: 1 },
  { h: 4.5, sky: '#18213e', sun: '#8fa6ff', sunI: 0.55, hemiSky: '#3d4a78', hemiGround: '#1a2230', hemiI: 0.42, night: 1 },
  { h: 6, sky: '#e9b49a', sun: '#ffa66a', sunI: 1.9, hemiSky: '#ffd9bd', hemiGround: '#6f6a6a', hemiI: 0.7, night: 0.35 },
  { h: 7.5, sky: '#f2d2b0', sun: '#ffc98f', sunI: 2.5, hemiSky: '#ffe9d2', hemiGround: '#8a8f7a', hemiI: 0.85, night: 0 },
  { h: 9, sky: '#cfe3ea', sun: '#fff1da', sunI: 2.9, hemiSky: '#e8f2ff', hemiGround: '#8fa87f', hemiI: 0.95, night: 0 },
  { h: 16.5, sky: '#cfe3ea', sun: '#fff1da', sunI: 2.9, hemiSky: '#e8f2ff', hemiGround: '#8fa87f', hemiI: 0.95, night: 0 },
  { h: 18.5, sky: '#f2a272', sun: '#ff8a45', sunI: 2.4, hemiSky: '#ffc8a0', hemiGround: '#7a6050', hemiI: 0.75, night: 0.15 },
  { h: 20, sky: '#5d4f8a', sun: '#e0708a', sunI: 0.9, hemiSky: '#7a6aa8', hemiGround: '#2e2a40', hemiI: 0.55, night: 0.8 },
  { h: 21.5, sky: '#141c36', sun: '#8fa6ff', sunI: 0.55, hemiSky: '#3d4a78', hemiGround: '#1a2230', hemiI: 0.42, night: 1 },
  { h: 24, sky: '#141c36', sun: '#8fa6ff', sunI: 0.55, hemiSky: '#3d4a78', hemiGround: '#1a2230', hemiI: 0.42, night: 1 },
];

const RAIN_TINT = new THREE.Color('#9aa6b2');
const skyTop = new THREE.Color(), tmpC = new THREE.Color();
// Цвет верха неба для каждого часа
const TOPS = [[0, '#0b1026'], [5, '#1a2140'], [6.2, '#6f8fc0'], [8, '#7fb0dc'], [16.5, '#7fb0dc'], [18.6, '#7a6fae'], [20.2, '#2a2a5a'], [21.5, '#0b1026'], [24, '#0b1026']];
function topAt(h) {
  let i = 0;
  while (i < TOPS.length - 2 && h >= TOPS[i + 1][0]) i++;
  const t = (h - TOPS[i][0]) / (TOPS[i + 1][0] - TOPS[i][0]);
  return skyTop.set(TOPS[i][1]).lerp(tmpC.set(TOPS[i + 1][1]), t);
}
const c1 = new THREE.Color(), c2 = new THREE.Color();

function lerpKey(h) {
  let i = 0;
  while (i < KEYS.length - 2 && h >= KEYS[i + 1].h) i++;
  const a = KEYS[i], b = KEYS[i + 1];
  const t = (h - a.h) / (b.h - a.h || 1);
  const col = (k) => c1.set(a[k]).lerp(c2.set(b[k]), t).clone();
  return {
    sky: col('sky'), sun: col('sun'), hemiSky: col('hemiSky'), hemiGround: col('hemiGround'),
    sunI: a.sunI + (b.sunI - a.sunI) * t, hemiI: a.hemiI + (b.hemiI - a.hemiI) * t, night: a.night + (b.night - a.night) * t,
  };
}

export function phaseOf(hour) {
  if (hour >= 5 && hour < 8) return { id: 'morning', icon: '🌅', ru: 'Утро' };
  if (hour >= 8 && hour < 17) return { id: 'day', icon: '☀️', ru: 'День' };
  if (hour >= 17 && hour < 21) return { id: 'evening', icon: '🌇', ru: 'Вечер' };
  return { id: 'night', icon: '🌙', ru: 'Ночь' };
}

export function formatClock(minutes) {
  const h = Math.floor(minutes / 60) % 24;
  const m = Math.floor(minutes % 60);
  return `${h}:${String(m).padStart(2, '0')}`;
}

export function createTimeSystem({ engine, state }) {
  state.clock ??= 9 * 60;
  state.day ??= 1;
  state.weather ??= 'clear';

  // Дождь: падающие капли вокруг героя
  const DROPS = 700;
  const rain = new THREE.InstancedMesh(
    new THREE.BoxGeometry(0.03, 0.55, 0.03),
    new THREE.MeshBasicMaterial({ color: '#c9d6e6', transparent: true, opacity: 0.55 }),
    DROPS,
  );
  rain.frustumCulled = false;
  rain.visible = false;
  engine.scene.add(rain);
  const drops = Array.from({ length: DROPS }, () => ({ x: (Math.random() - 0.5) * 40, y: Math.random() * 16, z: (Math.random() - 0.5) * 34, v: 14 + Math.random() * 6 }));
  const m4 = new THREE.Matrix4();
  let rainAmount = state.weather === 'rain' ? 1 : 0;
  let lastHour = Math.floor(state.clock / 60);

  function rollWeather() {
    const prev = state.weather;
    state.weather = Math.random() < 0.25 ? 'rain' : 'clear';
    if (prev !== state.weather) engine.emit?.('weather', state.weather);
  }

  function apply(dt) {
    const h = (state.clock / 60) % 24;
    const k = lerpKey(h);
    rainAmount += ((state.weather === 'rain' ? 1 : 0) - rainAmount) * Math.min(1, dt * 0.5);
    const indoor = engine.mapId === 'apartment';

    // Дождь делает свет серее и тусклее
    k.sky.lerp(RAIN_TINT.clone().multiplyScalar(0.35 + (1 - k.night) * 0.4), rainAmount * 0.6);
    const dim = 1 - rainAmount * 0.55;
    engine.scene.background.copy(k.sky);
    engine.scene.fog.color.copy(k.sky);
    engine.lights.sun.color.copy(k.sun);
    engine.lights.sun.intensity = k.sunI * dim * (indoor ? 0.8 : 1);
    engine.lights.hemi.color.copy(k.hemiSky);
    engine.lights.hemi.groundColor.copy(k.hemiGround);
    engine.lights.hemi.intensity = k.hemiI * (0.85 + dim * 0.15) + (indoor ? 0.25 * k.night : 0);
    // Солнце движется по небу: утром с востока, вечером с запада
    const sunAngle = ((h - 6) / 12) * Math.PI;
    engine.setSunOffset(-Math.cos(sunAngle) * 22, 10 + Math.max(0.15, Math.sin(sunAngle)) * 20, 10);

    // ---------- Шейдерпак ----------
    const pipe = engine.pipe;
    pipe.sky.bottom.value.copy(k.sky);
    pipe.sky.top.value.copy(topAt(h)).lerp(RAIN_TINT, rainAmount * 0.6);
    pipe.sky.stars.value = k.night * (1 - rainAmount);
    // Лучи солнца ярче всего на рассвете и закате; ночью — слабое сияние луны
    const golden = Math.max(0, 1 - Math.abs(h - 6.8) / 1.6) + Math.max(0, 1 - Math.abs(h - 18.6) / 1.8);
    const dayGlow = h > 6 && h < 19.5 ? 0.35 : 0;
    const rays = Math.min(1, golden + dayGlow) * (1 - rainAmount * 0.85) * (indoor ? 0 : 1);
    pipe.sunDisc.material.color.copy(k.sun).multiplyScalar(2.2);
    pipe.placeSun(h < 12 ? 0.8 : -0.8, rays);
    if (pipe.fx.bloom) pipe.fx.bloom.intensity = 0.35 + k.night * 1.25 + golden * 0.4;
    if (pipe.fx.vignette) pipe.fx.vignette.darkness = 0.45 + k.night * 0.25;
    engine.scene.environmentIntensity = (0.32 - k.night * 0.2) * (indoor ? 0.8 : 1) + rainAmount * 0.18;
    // Облака: тени по городу (в дождь — сплошная облачность)
    SHADER.uCloud.value = 0.55 + rainAmount * 0.45;
    SHADER.uWind.value = 1 + rainAmount * 1.4;
    // Мокрый асфальт блестит
    for (const m of WET) m.roughness = THREE.MathUtils.lerp(m.userData.dryRoughness, 0.18, rainAmount);
    WORLD.night = k.night;
    WORLD.rain = rainAmount;

    const glow = Math.max(k.night, rainAmount * 0.5);
    for (const { m, strength } of NIGHT_GLOW) m.emissiveIntensity = glow * strength;
    LIGHT_POOL_MAT.opacity = k.night * 0.5;

    rain.visible = rainAmount > 0.02 && !indoor;
    if (rain.visible) {
      rain.material.opacity = 0.55 * rainAmount;
      const p = engine.playerPos;
      drops.forEach((d, i) => {
        d.y -= d.v * dt;
        if (d.y < 0) { d.y = 14 + Math.random() * 3; d.x = (Math.random() - 0.5) * 40; d.z = (Math.random() - 0.5) * 34; }
        m4.makeRotationZ(0.12);
        m4.setPosition(p.x + d.x, d.y, p.z + d.z + 4);
        rain.setMatrixAt(i, m4);
      });
      rain.instanceMatrix.needsUpdate = true;
    }
    return k;
  }

  let paused = false;
  apply(0);

  return {
    get hour() { return (state.clock / 60) % 24; },
    get phase() { return phaseOf(this.hour); },
    get isNight() { const h = this.hour; return h >= 21 || h < 5.5; },
    get clockText() { return formatClock(state.clock); },
    get raining() { return state.weather === 'rain'; },
    setPaused(p) { paused = p; },
    update(dt) {
      if (!paused) {
        state.clock += dt; // 1 c = 1 игровая минута
        if (state.clock >= 24 * 60) { state.clock -= 24 * 60; state.day++; }
        const hr = Math.floor(state.clock / 60);
        if (hr !== lastHour) {
          lastHour = hr;
          if (hr % 6 === 0) rollWeather();
        }
      }
      apply(dt);
    },
    // Сон: перематываем до 8 утра следующего дня
    sleep() {
      if (state.clock > 8 * 60) state.day++;
      state.clock = 8 * 60;
      lastHour = 8;
      rollWeather();
      rainAmount = state.weather === 'rain' ? 1 : 0;
    },
    setTime(hours) { state.clock = hours * 60; lastHour = Math.floor(hours); },
  };
}
