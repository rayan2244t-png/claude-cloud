// Общие «кирпичики» для low-poly мира в пастельном стиле:
// материалы, простые фигуры и надписи на вывесках.
import * as THREE from 'three';

const matCache = new Map();

// Плоские пастельные материалы без текстур — основа стиля.
export function mat(color, opts = {}) {
  const key = color + JSON.stringify(opts);
  if (!matCache.has(key)) {
    matCache.set(key, new THREE.MeshLambertMaterial({ color, flatShading: true, ...opts }));
  }
  return matCache.get(key);
}

export function mesh(geometry, color, { shadow = true, receive = true, opts } = {}) {
  const m = new THREE.Mesh(geometry, typeof color === 'string' ? mat(color, opts) : color);
  m.castShadow = shadow;
  m.receiveShadow = receive;
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

export function sphere(r, color, x = 0, y = 0, z = 0, detail = 1, o) {
  const m = mesh(new THREE.IcosahedronGeometry(r, detail), color, o);
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
    mat(opts?.bg || '#2f3b52'), new THREE.MeshLambertMaterial({ map: tex }), mat(opts?.bg || '#2f3b52'),
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
  grass: '#86b47c', grassDark: '#74a36c', grassLight: '#9cc48f',
  slab: '#dcd6c8', slabDark: '#cfc8b8', curb: '#c4bdae',
  asphalt: '#6f7784', line: '#f2d16b', white: '#f6f3ec',
  trunk: '#8a6a4f', leaf: ['#6fa36a', '#5f9660', '#7db374', '#88bb7a'],
  iron: '#2e3238', green: '#3e6b4f',
  brick: ['#b0664f', '#9a5844', '#c07a5c', '#a7604c', '#c99a78', '#8f5242', '#d1ae8c'],
  wood: '#b98b5e', woodDark: '#8e6a47',
  glass: '#a9c8d6', frame: '#f4efe6',
};
