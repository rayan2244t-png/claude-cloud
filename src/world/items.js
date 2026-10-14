// Предметы, которые можно поднять и отнести (как в Goose Game).
// Каждый предмет — маленькая модель из простых форм в общем стиле игры.
import * as THREE from 'three';
import { mat, sphere, cyl, box } from './kit.js';

const MAKERS = {
  umbrella() {
    // Сложенный красный зонт с изогнутой ручкой
    const g = new THREE.Group();
    const canopy = new THREE.Mesh(new THREE.ConeGeometry(0.09, 0.62, 8), mat('#d4573f'));
    canopy.position.y = 0.36;
    canopy.rotation.x = Math.PI;
    const shaft = cyl(0.015, 0.015, 0.25, '#2e3238', 0, 0.62, 0, 6);
    const hook = new THREE.Mesh(new THREE.TorusGeometry(0.06, 0.016, 6, 12, Math.PI), mat('#8a6a4f'));
    hook.position.y = 0.88;
    hook.position.x = 0.06;
    g.add(canopy, shaft, hook);
    g.rotation.z = 1.35;
    g.position.y = 0.12;
    return g;
  },
  newspaper() {
    const g = new THREE.Group();
    const paper = box(0.42, 0.05, 0.3, '#ece7dc', 0, 0.025, 0);
    const band = box(0.43, 0.052, 0.05, '#b8b2a6', 0, 0.025, 0.06);
    const title = box(0.3, 0.054, 0.04, '#3b3a36', 0, 0.026, -0.08);
    g.add(paper, band, title);
    return g;
  },
  ball() {
    const g = new THREE.Group();
    const b = sphere(0.17, '#e0743c', 0, 0.17, 0, 2);
    const line = new THREE.Mesh(new THREE.TorusGeometry(0.172, 0.008, 4, 24), mat('#3b2a20'));
    line.position.y = 0.17;
    const line2 = line.clone();
    line2.rotation.y = Math.PI / 2;
    g.add(b, line, line2);
    return g;
  },
  keys() {
    const g = new THREE.Group();
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.06, 0.012, 6, 16), mat('#c9c2b2'));
    ring.rotation.x = Math.PI / 2;
    ring.position.y = 0.02;
    const k1 = box(0.16, 0.02, 0.04, '#e0b64a', 0.11, 0.01, 0.02);
    const k2 = box(0.14, 0.02, 0.035, '#b9b4ab', 0.07, 0.01, -0.07);
    k2.rotation.y = 0.6;
    const tag = box(0.08, 0.02, 0.06, '#d4573f', -0.08, 0.01, 0);
    g.add(ring, k1, k2, tag);
    g.scale.setScalar(1.4);
    return g;
  },
  flowers() {
    const g = new THREE.Group();
    const wrap = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.38, 8, 1, true), mat('#f2ece0', { side: THREE.DoubleSide }));
    wrap.position.y = 0.19;
    wrap.rotation.x = Math.PI;
    g.add(wrap);
    const colors = ['#e07a5f', '#f2c230', '#d98bb3', '#f8f6ef', '#8b7fd1'];
    for (let i = 0; i < 7; i++) {
      const a = (i / 7) * Math.PI * 2;
      const f = sphere(0.06, colors[i % colors.length], Math.cos(a) * 0.07, 0.42 + (i % 2) * 0.04, Math.sin(a) * 0.07, 1, { shadow: false });
      g.add(f);
    }
    g.add(sphere(0.05, '#5a9a5f', 0, 0.4, 0, 1));
    g.rotation.z = 1.3;
    g.position.y = 0.1;
    return g;
  },
  package() {
    const g = new THREE.Group();
    g.add(box(0.4, 0.28, 0.32, '#c49a6c', 0, 0.14, 0));
    g.add(box(0.41, 0.285, 0.06, '#e6d3a8', 0, 0.14, 0));
    g.add(box(0.12, 0.29, 0.1, '#f6f3ec', 0.1, 0.14, 0.08));
    return g;
  },
};

// Поднятый предмет держат перед собой — модель чуть выпрямляем
export function makeItem(kind) {
  const inner = MAKERS[kind]();
  const g = new THREE.Group();
  g.add(inner);
  g.userData.kind = kind;
  g.userData.inner = inner;
  g.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });
  return g;
}

// Подсветка под предметом на земле, чтобы его было видно издалека
export function itemRing() {
  const ring = new THREE.Mesh(new THREE.RingGeometry(0.42, 0.52, 28), new THREE.MeshBasicMaterial({ color: '#fff6d8', transparent: true, opacity: 0.55, depthWrite: false }));
  ring.rotation.x = -Math.PI / 2;
  ring.position.y = 0.03;
  return ring;
}
