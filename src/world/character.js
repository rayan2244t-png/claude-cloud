// Персонажи в стиле Untitled Goose Game. Модель — public/models/human.glb,
// её собирает скрипт tools/blender/make_human.py (Blender): тело со скелетом, причёски,
// головные уборы, комбинезон, фартук и т. д. Каждый персонаж — копия модели:
// включаем нужные части и перекрашиваем «слоты» (кожа, рубашка, брюки…) под его look.
//
// Анимации в два слоя: «низ» (ноги) и «верх» (руки, корпус, голова) —
// поэтому можно идти и одновременно нести вещь, махать или разговаривать.
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { clone as cloneSkinned } from 'three/examples/jsm/utils/SkeletonUtils.js';
import { shaderize } from './kit.js';
import { makeToyCharacter } from './character-toy.js';

let base = null;

export async function loadCharacterModel(url = new URL('models/human.glb', document.baseURI).href) {
  try {
    try {
      base = await new GLTFLoader().loadAsync(url);
    } catch {
      // Хостинг без бинарных файлов: модель встроена в JS-модуль (base64)
      const mod = await import(/* @vite-ignore */ new URL('models/human-glb.js', document.baseURI).href);
      const bin = Uint8Array.from(atob(mod.default), (c) => c.charCodeAt(0));
      base = await new GLTFLoader().parseAsync(bin.buffer, '');
    }
    base.clips = splitClips(base.animations);
  } catch (err) {
    console.warn('Модель персонажей не загрузилась, использую простые фигурки', err);
    base = null;
  }
}

const UPPER = /^(spine|chest|neck|head|upperarm|forearm|hand)/;
// Каждый клип делим на верх и низ по костям
function splitClips(animations) {
  const out = {};
  for (const clip of animations) {
    const up = clip.tracks.filter((t) => UPPER.test(t.name));
    const low = clip.tracks.filter((t) => !UPPER.test(t.name));
    out[`${clip.name}_U`] = new THREE.AnimationClip(`${clip.name}_U`, clip.duration, up);
    out[`${clip.name}_L`] = new THREE.AnimationClip(`${clip.name}_L`, clip.duration, low);
  }
  return out;
}

// Плоские матовые материалы, общие для всех персонажей одного цвета
const MATS = new Map();
function flat(color) {
  if (!MATS.has(color)) MATS.set(color, shaderize(new THREE.MeshStandardMaterial({ color, roughness: 1, metalness: 0 })));
  return MATS.get(color);
}
const lighter = (hex, l) => '#' + new THREE.Color(hex).offsetHSL(0, -0.05, l).getHexString();

const OPTIONAL = new Set(['body_m', 'body_f', 'hair_short', 'hair_long', 'hair_bun', 'hair_ponytail', 'hair_curly', 'hair_spiky',
  'hat_cap', 'hat_beanie', 'hat_paper', 'glasses', 'mustache', 'headphones', 'overall', 'apron', 'skirt', 'backpack']);

function partsFor(look) {
  const f = look.gender === 'f';
  const hairStyle = look.hairStyle || (look.hat === 'bun' ? 'bun' : f ? 'long' : 'short');
  const parts = new Set([f ? 'body_f' : 'body_m']);
  if (hairStyle !== 'bald') parts.add(`hair_${hairStyle}`);
  if (['cap', 'beanie', 'paper'].includes(look.hat)) {
    parts.add(`hat_${look.hat}`);
    // Под шапкой длинные причёски видны, объёмные — нет
    if (['curly', 'spiky', 'bun'].includes(hairStyle)) { parts.delete(`hair_${hairStyle}`); parts.add('hair_short'); }
  }
  for (const k of ['glasses', 'mustache', 'headphones', 'apron', 'overall', 'skirt']) if (look[k]) parts.add(k);
  if (look.backpack) parts.add('backpack');
  return parts;
}

function colorsFor(look) {
  const skin = look.skin || '#c98f63';
  const shirt = look.shirt || '#a8c3e0';
  return {
    skin,
    top: look.jacket || shirt,
    collar: look.jacket ? shirt : lighter(shirt, 0.08),
    pants: look.pants || '#5d6b7d',
    shoes: look.shoes || '#3f3a34',
    hands: look.gloves || skin,
    hair: look.hair || '#4a3428',
    hat: look.hatColor || '#7a4a33',
    overall: typeof look.overall === 'string' ? look.overall : '#7f9a7c',
    apron: typeof look.apron === 'string' ? look.apron : '#f2ece0',
    skirt: typeof look.skirt === 'string' ? look.skirt : look.pants || '#5b4b6b',
    bag: typeof look.backpack === 'string' ? look.backpack : '#d9a441',
    dark: '#2e3238',
    phones: '#e07a5f',
  };
}

export function makeCharacter(look = {}) {
  if (!base) return makeToyCharacter(look);
  const root = new THREE.Group();
  const model = cloneSkinned(base.scene);
  root.add(model);

  // Оставляем нужные части и красим их
  const parts = partsFor(look);
  const colors = colorsFor(look);
  const drop = [];
  model.traverse((o) => {
    if (OPTIONAL.has(o.name) && !parts.has(o.name)) drop.push(o);
  });
  drop.forEach((o) => o.parent.remove(o));
  let headBone = null;
  model.traverse((o) => {
    if (o.isBone && o.name === 'head') headBone = o;
    if (!o.isMesh) return;
    const slot = (o.material?.name || '').replace(/\.\d+$/, '');
    o.material = flat(colors[slot] || '#cccccc');
    o.castShadow = true;
    o.receiveShadow = true;
    o.frustumCulled = false; // скин двигается — рамка из позы покоя не подходит
  });
  root.scale.setScalar(look.scale || 1);

  // ---------- Анимации ----------
  const mixer = new THREE.AnimationMixer(model);
  const act = {};
  for (const [name, clip] of Object.entries(base.clips)) {
    const a = mixer.clipAction(clip);
    a.setEffectiveWeight(0);
    a.play();
    act[name] = a;
  }
  // Сдвиг фазы, чтобы толпа не шагала в ногу
  const offset = Math.random() * 2;
  mixer.update(offset);
  const w = {}; // текущие веса
  const blend = (layer, target, dt) => {
    for (const name of Object.keys(act)) {
      if (!name.endsWith(`_${layer}`)) continue;
      const goal = target[name.slice(0, -2)] || 0;
      const cur = w[name] ?? 0;
      w[name] = cur + (goal - cur) * Math.min(1, dt * 8);
      act[name].setEffectiveWeight(w[name]);
    }
  };

  let talkTimer = 0;
  let waveTimer = 0;
  let dancing = false;
  let carrying = false;
  let crouching = false;

  return {
    root,
    head: headBone || root,
    update(dt, speed = 0) {
      const walk = THREE.MathUtils.clamp(speed / 2.5, 0, 1);
      act.Walk_U.timeScale = act.Walk_L.timeScale = THREE.MathUtils.clamp(speed / 2.3, 0.7, 2.4);
      talkTimer = Math.max(0, talkTimer - dt);
      waveTimer = Math.max(0, waveTimer - dt);
      let upper, lower;
      if (dancing) {
        upper = { Dance: 1 };
        lower = { Dance: 1 };
      } else {
        lower = crouching && walk < 0.2 ? { Crouch: 1 } : { Idle: 1 - walk, Walk: walk };
        if (waveTimer > 0) upper = { Wave: 1 };
        else if (talkTimer > 0) upper = { Talk: 1 };
        else if (carrying) upper = { Carry: 1 };
        else if (crouching && walk < 0.2) upper = { Crouch: 1 };
        else upper = { Idle: 1 - walk, Walk: walk };
      }
      blend('U', upper, dt);
      blend('L', lower, dt);
      mixer.update(dt);
    },
    talk(seconds = 1.5) { talkTimer = seconds; },
    wave(seconds = 1.2) { waveTimer = seconds; },
    setDance(on) { dancing = on; },
    setCarry(on) { carrying = on; },
    setCrouch(on) { crouching = on; },
  };
}
