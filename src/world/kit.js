// Общие «кирпичики» для low-poly мира в пастельном стиле:
// материалы, простые фигуры и надписи на вывесках.
import * as THREE from 'three';
import { mergeVertices } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';

const matCache = new Map();

// ---------- «Шейдерпак»: общие юниформы для всех материалов ----------
// Тени облаков, ползущие по городу, и ветер, качающий листву и траву.
// Общее состояние мира для эффектов (ночь, дождь) — пишет world/time.js
export const WORLD = { night: 0, rain: 0 };

export const SHADER = {
  uTime: { value: 0 },
  uCloud: { value: 0.5 }, // сила теней от облаков (0 — ясно)
  uWind: { value: 1 },
  uSnow: { value: 0 }, // сколько снега лежит на поверхностях (0..1)
};

const NOISE = /* glsl */ `
uniform float uTime;
uniform float uCloud;
uniform float uWind;
uniform float uSnow;
varying vec3 vWPos;
varying vec3 vWNorm;
float bHash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float bNoise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(bHash(i), bHash(i + vec2(1, 0)), u.x), mix(bHash(i + vec2(0, 1)), bHash(i + vec2(1, 1)), u.x), u.y);
}
float bFbm(vec2 p) { return bNoise(p) * 0.55 + bNoise(p * 2.1) * 0.3 + bNoise(p * 4.3) * 0.15; }
`;

// Подключает эффекты шейдерпака к материалу. wave: 0 — нет, 1 — листва, 2 — трава (качается верхушка)
export function shaderize(m, { wave = 0 } = {}) {
  if (m.userData.shaderized) return m;
  m.userData.shaderized = true;
  m.userData.wave = wave;
  m.onBeforeCompile = (shader) => {
    shader.uniforms.uTime = SHADER.uTime;
    shader.uniforms.uCloud = SHADER.uCloud;
    shader.uniforms.uWind = SHADER.uWind;
    shader.uniforms.uSnow = SHADER.uSnow;
    shader.vertexShader = NOISE + shader.vertexShader.replace(
      '#include <begin_vertex>',
      `#include <begin_vertex>
      vec4 bWp = vec4(transformed, 1.0);
      #ifdef USE_INSTANCING
        bWp = instanceMatrix * bWp;
      #endif
      bWp = modelMatrix * bWp;
      ${wave === 1 ? 'transformed += vec3(sin(uTime * 1.7 + bWp.x * 0.5 + bWp.z * 0.3), sin(uTime * 2.3 + bWp.x) * 0.4, cos(uTime * 1.3 + bWp.z * 0.5)) * 0.07 * uWind;' : ''}
      ${wave === 2 ? 'transformed.x += sin(uTime * 2.4 + bWp.x * 0.7 + bWp.z * 0.4) * 0.09 * uWind * clamp(position.y + 0.16, 0.0, 1.0) * 3.0;' : ''}
      vWPos = bWp.xyz;
      vWNorm = normalize(mat3(modelMatrix) * objectNormal);`,
    );
    shader.fragmentShader = NOISE + shader.fragmentShader.replace(
      '#include <color_fragment>',
      `#include <color_fragment>
      // Снег ложится на горизонтальные поверхности
      float bSnow = smoothstep(0.55, 0.85, vWNorm.y) * uSnow * (0.85 + 0.15 * bNoise(vWPos.xz * 1.7));
      diffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.93, 0.95, 1.0), bSnow);`,
    ).replace(
      '#include <lights_fragment_end>',
      `#include <lights_fragment_end>
      // Тени от облаков: мягкие пятна, медленно плывущие по ветру
      float bCloud = smoothstep(0.42, 0.75, bFbm(vWPos.xz * 0.025 + vec2(uTime * 0.012, uTime * 0.006)));
      float bShade = 1.0 - bCloud * 0.55 * uCloud;
      reflectedLight.directDiffuse *= bShade;
      reflectedLight.directSpecular *= bShade;`,
    );
  };
  m.customProgramCacheKey = () => `bigapple-${wave}`;
  return m;
}

// Копия материала с эффектами шейдерпака (clone() их не копирует)
export function cloneMat(m) {
  const c = m.clone();
  c.userData = { ...m.userData, shaderized: false };
  return shaderize(c, { wave: m.userData.wave });
}

// Пастельные материалы с физичным светом (PBR) — основа стиля.
// opts.wave — качание на ветру; остальные поля уходят в материал.
export function mat(color, opts = {}) {
  const key = color + JSON.stringify(opts);
  if (!matCache.has(key)) {
    const { wave, ...rest } = opts;
    const m = new THREE.MeshStandardMaterial({ color, flatShading: false, roughness: 0.95, metalness: 0, ...rest });
    matCache.set(key, shaderize(m, { wave }));
  }
  return matCache.get(key);
}

// Поверхности, которые блестят в дождь (асфальт, плитка)
export const WET = [];
export function wetMat(color, extra = {}) {
  const m = shaderize(new THREE.MeshStandardMaterial({ color, flatShading: false, roughness: 0.95, metalness: 0, ...extra }));
  m.userData.dryRoughness = m.roughness;
  WET.push(m);
  return m;
}

// Материалы, которые светятся ночью (окна, фонари, неон). Яркость задаёт world/time.js
export const NIGHT_GLOW = [];
export function glowMat(color, emissive, strength = 1, extra = {}) {
  const m = shaderize(new THREE.MeshStandardMaterial({ color, emissive, emissiveIntensity: 0, flatShading: false, roughness: 0.8, metalness: 0, ...extra }));
  NIGHT_GLOW.push({ m, strength });
  return m;
}

// Пятна света от фонарей на земле
function softSpot() {
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const g = c.getContext('2d');
  const grad = g.createRadialGradient(64, 64, 0, 64, 64, 64);
  grad.addColorStop(0, 'rgba(255,255,255,1)');
  grad.addColorStop(0.45, 'rgba(255,255,255,0.45)');
  grad.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = grad;
  g.fillRect(0, 0, 128, 128);
  return new THREE.CanvasTexture(c);
}
export const LIGHT_POOL_MAT = new THREE.MeshBasicMaterial({ color: '#ffcf7a', map: softSpot(), transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending });
const poolGeo = new THREE.CircleGeometry(2.6, 24);
export function lightPool(x, z, scale = 1) {
  const m = new THREE.Mesh(poolGeo, LIGHT_POOL_MAT);
  m.rotation.x = -Math.PI / 2;
  m.position.set(x, 0.1, z);
  m.scale.setScalar(scale);
  m.renderOrder = 2;
  return m;
}

export function mesh(geometry, color, { shadow = true, receive = true, opts } = {}) {
  const m = new THREE.Mesh(geometry, typeof color === 'string' ? mat(color, opts) : color);
  m.castShadow = shadow;
  m.receiveShadow = receive;
  return m;
}

// Скруглённая коробка — «игрушечные» края у машин, тележек, мебели
export function rbox(w, h, d, color, x = 0, y = 0, z = 0, radius = 0.12, o) {
  const m = mesh(new RoundedBoxGeometry(w, h, d, 2, Math.min(radius, w / 2, h / 2, d / 2)), color, o);
  m.position.set(x, y + h / 2, z);
  return m;
}

export function box(w, h, d, color, x = 0, y = 0, z = 0, o) {
  const m = mesh(new THREE.BoxGeometry(w, h, d), color, o);
  m.position.set(x, y, z);
  return m;
}

// Коробка, поставленная на землю (y — нижняя грань)
export function block(w, h, d, color, x = 0, y = 0, z = 0, o) {
  return box(w, h, d, color, x, y + h / 2, z, o);
}

export function cyl(rt, rb, h, color, x = 0, y = 0, z = 0, seg = 12, o) {
  const m = mesh(new THREE.CylinderGeometry(rt, rb, h, seg), color, o);
  m.position.set(x, y + h / 2, z);
  return m;
}

// Округлые формы — мягкие, без граней (кроны, кусты, камни), как в Goose Game
const SPHERES = new Map();
function softSphere(r, detail) {
  const key = `${r.toFixed(3)}|${detail}`;
  if (!SPHERES.has(key)) {
    let g = new THREE.IcosahedronGeometry(r, Math.max(detail, 2));
    g.deleteAttribute('normal');
    g.deleteAttribute('uv');
    g = mergeVertices(g);
    g.computeVertexNormals();
    SPHERES.set(key, g);
  }
  return SPHERES.get(key);
}

export function sphere(r, color, x = 0, y = 0, z = 0, detail = 1, o) {
  const m = mesh(softSphere(r, detail), color, o);
  m.position.set(x, y, z);
  return m;
}

export function group(...children) {
  const g = new THREE.Group();
  children.flat().forEach((c) => c && g.add(c));
  return g;
}

// Текстура с текстом для вывесок (рисуется на canvas)
export function signTexture(text, { bg = '#2f3b52', fg = '#ffffff', w = 512, h = 128, font = 'bold 72px Nunito, sans-serif', border } = {}) {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  const g = c.getContext('2d');
  g.fillStyle = bg;
  g.fillRect(0, 0, w, h);
  if (border) {
    g.strokeStyle = border;
    g.lineWidth = 10;
    g.strokeRect(5, 5, w - 10, h - 10);
  }
  g.fillStyle = fg;
  g.font = font;
  g.textAlign = 'center';
  g.textBaseline = 'middle';
  g.fillText(text, w / 2, h / 2 + 4);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  return t;
}

export function sign(text, w, h, opts) {
  const tex = signTexture(text, opts);
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, 0.08), [
    mat(opts?.bg || '#2f3b52'), mat(opts?.bg || '#2f3b52'), mat(opts?.bg || '#2f3b52'),
    mat(opts?.bg || '#2f3b52'), shaderize(new THREE.MeshStandardMaterial({ map: tex, roughness: 0.5 })), mat(opts?.bg || '#2f3b52'),
  ]);
  m.castShadow = true;
  return m;
}

// Детерминированный генератор случайных чисел — мир всегда выглядит одинаково
export function rng(seed = 1) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

export const pick = (r, arr) => arr[Math.floor(r() * arr.length)];

// Цветовая палитра мира
export const PAL = {
  grass: '#6c9f70', grassDark: '#5f9165', grassLight: '#7aab78',
  slab: '#bdb5a2', slabDark: '#aea693', curb: '#a39b88',
  asphalt: '#6f7784', line: '#f2d16b', white: '#f6f3ec',
  trunk: '#8a6a4f', leaf: ['#5f9a62', '#548e5a', '#6aa66a', '#77ae72'],
  iron: '#2e3238', green: '#3e6b4f',
  brick: ['#b0664f', '#9a5844', '#c07a5c', '#a7604c', '#c99a78', '#8f5242', '#d1ae8c'],
  wood: '#b98b5e', woodDark: '#8e6a47',
  glass: '#a9c8d6', frame: '#f4efe6',
};
