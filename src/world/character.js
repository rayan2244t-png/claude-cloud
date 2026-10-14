// Персонажи в духе Untitled Goose Game: безликие «игрушечные» фигурки, как жители
// из британских детских мультфильмов — большой нос, уши, мягкие формы, плоские цвета.
// Эмоции передаются позой: кивки головой, жесты руками, походка, взмах рукой.
import * as THREE from 'three';
import { mesh, mat } from './kit.js';

const capsule = (r, len, color, seg = 10) => mesh(new THREE.CapsuleGeometry(r, len, 4, seg), color);

// Плавная фигура туловища (вращаем профиль вокруг оси)
function torsoGeometry() {
  const pts = [
    [0.0, 0.0], [0.33, 0.0], [0.36, 0.08], [0.34, 0.28], [0.29, 0.5], [0.31, 0.66], [0.3, 0.74], [0.18, 0.82], [0.1, 0.84], [0.0, 0.84],
  ].map(([x, y]) => new THREE.Vector2(x, y));
  const g = new THREE.LatheGeometry(pts, 18);
  g.scale(1, 1, 0.78); // чуть сплющено спереди-назад
  return g;
}
const TORSO = torsoGeometry();
const HIPS = (() => {
  const pts = [[0, 0], [0.3, 0], [0.34, 0.06], [0.35, 0.2], [0.33, 0.22], [0, 0.22]].map(([x, y]) => new THREE.Vector2(x, y));
  const g = new THREE.LatheGeometry(pts, 18);
  g.scale(1, 1, 0.8);
  return g;
})();

const DARK = '#2a2420';
// Чуть темнее/светлее основного цвета (нос, подошвы)
const shade = (hex, d) => '#' + new THREE.Color(hex).offsetHSL(0, 0, d).getHexString();

export function makeCharacter(look = {}) {
  const {
    skin = '#e8b48f', shirt = '#6c8fbf', pants = '#3d4a5c', shoes = '#3a302a',
    hair = '#3a2a20', hat = 'none', hatColor = '#c94f3d', apron, glasses, mustache, backpack, headphones, scale = 1,
    gender = 'm', sleeves = 'long', jacket,
  } = look;
  const hairStyle = look.hairStyle || (hat === 'bun' ? 'bun' : gender === 'f' ? 'long' : 'short');

  const root = new THREE.Group();
  const body = new THREE.Group();
  root.add(body);

  // ---------- Ноги ----------
  const legs = [-0.14, 0.14].map((x) => {
    const pivot = new THREE.Group();
    pivot.position.set(x, 0.8, 0);
    const thigh = capsule(0.115, 0.32, pants);
    thigh.position.y = -0.2;
    const shin = capsule(0.1, 0.3, pants);
    shin.position.y = -0.52;
    const shoe = mesh(new THREE.CapsuleGeometry(0.1, 0.16, 3, 8), shoes);
    shoe.rotation.x = Math.PI / 2;
    shoe.scale.set(1.05, 1, 0.75);
    shoe.position.set(0, -0.74, 0.06);
    const sole = mesh(new THREE.BoxGeometry(0.2, 0.03, 0.34), '#f2efe8');
    sole.position.set(0, -0.8, 0.06);
    pivot.add(thigh, shin, shoe, sole);
    body.add(pivot);
    return pivot;
  });

  // ---------- Туловище ----------
  const hips = mesh(HIPS, pants);
  hips.position.y = 0.74;
  body.add(hips);
  const torso = mesh(TORSO, shirt);
  torso.position.y = 0.86;
  torso.scale.set(gender === 'f' ? 0.92 : 1, 1, 1);
  body.add(torso);
  // Ремень и воротник
  const belt = mesh(new THREE.TorusGeometry(0.33, 0.025, 4, 20), DARK);
  belt.rotation.x = Math.PI / 2;
  belt.scale.set(1, 0.8, 1);
  belt.position.y = 0.9;
  body.add(belt);
  const collar = mesh(new THREE.TorusGeometry(0.12, 0.035, 5, 14), jacket || shirt);
  collar.rotation.x = Math.PI / 2;
  collar.position.y = 1.68;
  body.add(collar);
  if (jacket) {
    const j = mesh(new THREE.CylinderGeometry(0.33, 0.37, 0.78, 16, 1, true, 0.5, Math.PI * 2 - 1.0), jacket);
    j.material = mat(jacket, { side: THREE.DoubleSide });
    j.position.y = 1.28;
    j.scale.set(1.05, 1, 0.82);
    body.add(j);
  }
  if (apron) {
    const a = mesh(new THREE.CylinderGeometry(0.33, 0.37, 0.7, 14, 1, true, -0.85, 1.7), apron);
    a.material = mat(apron, { side: THREE.DoubleSide });
    a.position.y = 1.12;
    a.scale.set(1.04, 1, 0.84);
    body.add(a);
  }
  if (backpack) {
    const b = mesh(new THREE.CapsuleGeometry(0.18, 0.22, 3, 8), backpack);
    b.scale.set(1.2, 1, 0.65);
    b.position.set(0, 1.28, -0.31);
    const strap = mesh(new THREE.TorusGeometry(0.2, 0.02, 4, 12, Math.PI), DARK);
    strap.position.set(0, 1.48, -0.1);
    strap.rotation.y = Math.PI / 2;
    body.add(b, strap);
  }

  // ---------- Руки ----------
  const arms = [-1, 1].map((side) => {
    const pivot = new THREE.Group();
    pivot.position.set(side * 0.36, 1.58, 0);
    const upper = capsule(0.085, 0.26, jacket || shirt);
    upper.position.y = -0.16;
    const lower = capsule(0.075, 0.24, sleeves === 'short' && !jacket ? skin : jacket || shirt);
    lower.position.y = -0.44;
    const hand = mesh(new THREE.IcosahedronGeometry(0.085, 2), skin);
    hand.position.y = -0.63;
    hand.scale.set(1, 1.1, 0.8);
    pivot.add(upper, lower, hand);
    pivot.rotation.z = side * 0.1;
    body.add(pivot);
    return pivot;
  });

  // ---------- Голова ----------
  const head = new THREE.Group();
  head.position.y = 1.86;
  body.add(head);
  const neck = mesh(new THREE.CylinderGeometry(0.08, 0.09, 0.16, 10), skin);
  neck.position.y = -0.2;
  const skull = mesh(new THREE.SphereGeometry(0.29, 28, 20), skin);
  skull.scale.set(1, 1.08, 0.98);
  head.add(neck, skull);
  // уши
  [-1, 1].forEach((s) => {
    const ear = mesh(new THREE.SphereGeometry(0.055, 10, 8), skin);
    ear.scale.set(0.6, 1, 0.8);
    ear.position.set(s * 0.255, -0.01, 0);
    head.add(ear);
  });
  // нос — главная деталь лица (глаз и рта нет, как у жителей деревни в Goose Game)
  const nose = mesh(new THREE.CapsuleGeometry(0.06, 0.05, 4, 10), shade(skin, -0.06));
  nose.rotation.x = Math.PI / 2 - 0.25;
  nose.scale.set(gender === 'f' ? 0.8 : 1, 1, 1);
  nose.position.set(0, -0.02, 0.27);
  head.add(nose);
  if (mustache) {
    const m = mesh(new THREE.CapsuleGeometry(0.025, 0.12, 3, 6), hair);
    m.rotation.z = Math.PI / 2;
    m.position.set(0, -0.1, 0.27);
    head.add(m);
  }
  if (glasses) {
    const gm = '#2e3238';
    [-0.09, 0.09].forEach((x) => {
      const g = mesh(new THREE.TorusGeometry(0.058, 0.011, 6, 16), gm);
      g.position.set(x, 0.05, 0.27);
      head.add(g);
    });
    const bridge = mesh(new THREE.BoxGeometry(0.06, 0.012, 0.012), gm);
    bridge.position.set(0, 0.06, 0.28);
    head.add(bridge);
  }

  // ---------- Волосы и головные уборы ----------
  const hairCap = mesh(new THREE.SphereGeometry(0.272, 20, 14, 0, Math.PI * 2, 0, Math.PI * 0.52), hair);
  hairCap.rotation.x = -0.32;
  hairCap.position.set(0, 0.02, -0.025);
  if (hairStyle !== 'bald') head.add(hairCap);
  if (hairStyle === 'long') {
    const back = mesh(new THREE.CapsuleGeometry(0.2, 0.28, 4, 12), hair);
    back.scale.set(1.25, 1, 0.6);
    back.position.set(0, -0.14, -0.13);
    head.add(back);
    [-1, 1].forEach((s) => {
      const side = mesh(new THREE.CapsuleGeometry(0.07, 0.22, 3, 8), hair);
      side.position.set(s * 0.22, -0.1, 0.02);
      head.add(side);
    });
  } else if (hairStyle === 'ponytail') {
    const tail = mesh(new THREE.CapsuleGeometry(0.07, 0.24, 3, 8), hair);
    tail.position.set(0, -0.05, -0.3);
    tail.rotation.x = 0.5;
    head.add(tail);
  } else if (hairStyle === 'bun') {
    const bun = mesh(new THREE.SphereGeometry(0.11, 14, 10), hair);
    bun.position.set(0, 0.24, -0.12);
    head.add(bun);
  } else if (hairStyle === 'curly') {
    for (let i = 0; i < 14; i++) {
      const a = (i / 14) * Math.PI * 2;
      const c = mesh(new THREE.IcosahedronGeometry(0.09, 1), hair);
      c.position.set(Math.cos(a) * 0.22, 0.12 + Math.sin(i * 1.7) * 0.05, Math.sin(a) * 0.2 - 0.04);
      head.add(c);
    }
    const top = mesh(new THREE.SphereGeometry(0.2, 12, 10), hair);
    top.position.set(0, 0.2, -0.03);
    head.add(top);
  } else if (hairStyle === 'spiky') {
    for (let i = 0; i < 7; i++) {
      const sp = mesh(new THREE.ConeGeometry(0.06, 0.16, 5), hair);
      sp.position.set((i - 3) * 0.06, 0.26, 0.04 - Math.abs(i - 3) * 0.02);
      sp.rotation.x = -0.3;
      head.add(sp);
    }
  }

  if (hat === 'cap') {
    const c = mesh(new THREE.SphereGeometry(0.28, 18, 10, 0, Math.PI * 2, 0, Math.PI / 2), hatColor);
    c.position.y = 0.05;
    const brim = mesh(new THREE.CylinderGeometry(0.21, 0.21, 0.025, 16, 1, false, -Math.PI / 2, Math.PI), hatColor);
    brim.position.set(0, 0.07, 0.19);
    brim.rotation.x = 0.12;
    const btn = mesh(new THREE.SphereGeometry(0.025, 8, 6), hatColor);
    btn.position.y = 0.33;
    head.add(c, brim, btn);
  } else if (hat === 'paper') {
    const p = mesh(new THREE.BoxGeometry(0.52, 0.15, 0.25), '#f6f3ec');
    p.position.y = 0.26;
    head.add(p);
  } else if (hat === 'beanie') {
    const b = mesh(new THREE.SphereGeometry(0.285, 18, 10, 0, Math.PI * 2, 0, Math.PI / 2), hatColor);
    b.position.y = 0.04;
    b.scale.y = 1.15;
    const rim = mesh(new THREE.TorusGeometry(0.27, 0.035, 6, 20), hatColor);
    rim.rotation.x = Math.PI / 2;
    rim.position.y = 0.06;
    const pom = mesh(new THREE.IcosahedronGeometry(0.075, 1), '#f6f3ec');
    pom.position.y = 0.37;
    head.add(b, rim, pom);
  }
  if (headphones) {
    const band = mesh(new THREE.TorusGeometry(0.28, 0.025, 6, 18, Math.PI), '#2e3238');
    band.position.y = 0.02;
    head.add(band);
    [-0.27, 0.27].forEach((x) => {
      const cup = mesh(new THREE.CylinderGeometry(0.085, 0.085, 0.07, 14), '#e07a5f');
      cup.rotation.z = Math.PI / 2;
      cup.position.set(x, 0, 0);
      head.add(cup);
    });
  }

  root.scale.setScalar(scale);

  let phase = Math.random() * 10;
  let talkTimer = 0;
  let wave = 0;
  let dancing = false;
  let lookTimer = 3 + Math.random() * 4;
  let lookTarget = 0;

  return {
    root,
    head,
    update(dt, speed = 0) {
      phase += dt * (speed > 0.1 ? 9 : 2);
      const walk = Math.min(speed / 4, 1);
      const s = Math.sin(phase);

      if (dancing) {
        const d = phase * 1.6;
        body.position.y = Math.abs(Math.sin(d)) * 0.25;
        body.rotation.y = Math.sin(d * 0.5) * 0.9;
        arms[0].rotation.z = -2.2 + Math.sin(d) * 0.6;
        arms[1].rotation.z = 2.2 - Math.sin(d) * 0.6;
        legs[0].rotation.x = Math.sin(d) * 0.5;
        legs[1].rotation.x = -Math.sin(d) * 0.5;
        head.rotation.x = Math.sin(d * 2) * 0.12;
        phase += dt * 3;
        return;
      }
      body.rotation.y *= 0.8;
      if (arms[0].rotation.z < -0.2) arms[0].rotation.z += (-0.1 - arms[0].rotation.z) * 0.2;

      legs[0].rotation.x = s * 0.6 * walk;
      legs[1].rotation.x = -s * 0.6 * walk;
      arms[0].rotation.x = -s * 0.5 * walk;
      body.position.y = Math.abs(Math.cos(phase)) * 0.06 * walk + Math.sin(phase) * 0.008 * (1 - walk);
      body.rotation.z = Math.sin(phase) * 0.035 * walk + Math.sin(phase * 0.23) * 0.015 * (1 - walk);
      torso.scale.y = 1 + Math.sin(phase * 0.7) * 0.012 * (1 - walk);

      // Иногда оглядывается по сторонам
      lookTimer -= dt;
      if (lookTimer < 0) { lookTimer = 3 + Math.random() * 5; lookTarget = walk > 0.2 ? 0 : (Math.random() - 0.5) * 1.1; }
      head.rotation.y += (lookTarget - head.rotation.y) * Math.min(1, dt * 3);

      if (talkTimer > 0) {
        talkTimer -= dt;
        // Говорит: кивает, покачивает головой и жестикулирует
        head.rotation.x = Math.sin(talkTimer * 9) * 0.09;
        head.rotation.z = Math.sin(talkTimer * 3.3) * 0.06;
        body.rotation.z = Math.sin(talkTimer * 2.2) * 0.02;
        arms[1].rotation.x = -0.55 + Math.sin(talkTimer * 6) * 0.3;
        arms[1].rotation.z = 0.25 + Math.sin(talkTimer * 4.5) * 0.12;
        arms[0].rotation.x = -0.2 + Math.sin(talkTimer * 4) * 0.15;
      } else {
        head.rotation.x *= 0.9;
        head.rotation.z *= 0.9;
        arms[1].rotation.x += (s * 0.5 * walk - arms[1].rotation.x) * 0.3;
      }
      if (wave > 0) {
        wave -= dt;
        arms[1].rotation.z = 2.6 + Math.sin(wave * 18) * 0.3;
        head.rotation.z = -0.12;
      } else {
        arms[1].rotation.z += (0.1 - arms[1].rotation.z) * 0.2;
      }
    },
    talk(seconds = 1.5) { talkTimer = seconds; },
    wave(seconds = 1.2) { wave = seconds; },
    setDance(on) { dancing = on; },
  };
}
