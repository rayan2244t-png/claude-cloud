// Персонажи в стиле Untitled Goose Game — как садовник из игры:
// безликая голова-«яйцо» с большим носом и ушами, плоская кепка, широкие плечи,
// руки-трубки с крупными ладонями-рукавицами, толстые ноги и большие ботинки.
// Цвета плоские и матовые, тени мягкие. Эмоции — позой: кивки, жесты, походка вперевалку.
import * as THREE from 'three';
import { shaderize } from './kit.js';

// Матовый «плоский» материал: свет почти не даёт перепадов, как в Goose Game
const MATS = new Map();
function flat(color) {
  if (!MATS.has(color)) {
    MATS.set(color, shaderize(new THREE.MeshStandardMaterial({ color, roughness: 1, metalness: 0 })));
  }
  return MATS.get(color);
}
const part = (geo, color) => {
  const m = new THREE.Mesh(geo, flat(color));
  m.castShadow = true;
  m.receiveShadow = true;
  return m;
};
const shade = (hex, l) => '#' + new THREE.Color(hex).offsetHSL(0, 0, l).getHexString();

// Плавное туловище: профиль, повёрнутый вокруг оси (узкая талия → широкие покатые плечи)
function lathe(points, segs = 20, depth = 0.72) {
  const g = new THREE.LatheGeometry(points.map(([x, y]) => new THREE.Vector2(x, y)), segs);
  g.scale(1, 1, depth);
  g.computeVertexNormals();
  return g;
}
const TORSO = lathe([[0, 0], [0.29, 0], [0.31, 0.12], [0.33, 0.35], [0.37, 0.56], [0.36, 0.66], [0.27, 0.74], [0.12, 0.78], [0, 0.78]]);
const TORSO_F = lathe([[0, 0], [0.27, 0], [0.26, 0.16], [0.3, 0.38], [0.33, 0.56], [0.32, 0.66], [0.24, 0.74], [0.11, 0.77], [0, 0.77]]);
// Комбинезон/фартук: передняя часть поверх рубашки (как у садовника)
const BIB = (() => {
  const g = new THREE.CylinderGeometry(0.34, 0.31, 0.5, 20, 1, true, -1.05, 2.1);
  g.scale(1.03, 1, 0.76);
  return g;
})();
const HEAD = (() => {
  // Голова-яйцо: чуть шире внизу, как у жителей деревни
  const g = new THREE.SphereGeometry(0.27, 28, 20);
  const p = g.attributes.position;
  for (let i = 0; i < p.count; i++) {
    const y = p.getY(i);
    const k = 1 + (y < 0 ? -y * 0.35 : -y * 0.15);
    p.setX(i, p.getX(i) * k);
    p.setZ(i, p.getZ(i) * k * 0.95);
    p.setY(i, y * 1.12);
  }
  g.computeVertexNormals();
  return g;
})();
const NOSE = (() => {
  // Большой округлый нос «картошкой», смотрит вперёд и чуть вниз
  const g = new THREE.CapsuleGeometry(0.075, 0.09, 6, 12);
  g.rotateX(Math.PI / 2 - 0.35);
  return g;
})();
const EAR = (() => {
  const g = new THREE.SphereGeometry(0.075, 14, 10);
  g.scale(0.45, 1.15, 0.85);
  return g;
})();
const LIMB = (r, len) => new THREE.CapsuleGeometry(r, len, 6, 14);
const BOOT = (() => {
  const g = new THREE.CapsuleGeometry(0.115, 0.2, 6, 12);
  g.rotateX(Math.PI / 2);
  g.scale(1, 0.85, 1);
  return g;
})();
const MITT = (() => {
  const g = new THREE.SphereGeometry(0.1, 16, 12);
  g.scale(0.9, 1.15, 0.75);
  return g;
})();

export function makeCharacter(look = {}) {
  const {
    skin = '#c98f63', shirt = '#9fbcdb', pants = '#5d6b7d', shoes = '#4a3a30',
    hair = '#4a3428', hat = 'none', hatColor = '#7a4a33', apron, glasses, mustache, backpack, headphones, scale = 1,
    gender = 'm', sleeves = 'long', jacket,
  } = look;
  const f = gender === 'f';
  const hairStyle = look.hairStyle || (hat === 'bun' ? 'bun' : f ? 'long' : 'short');
  const gloves = look.gloves || shade(skin, -0.04);

  const root = new THREE.Group();
  const body = new THREE.Group();
  root.add(body);

  // ---------- Ноги: толстые «колонны» и крупные ботинки ----------
  const legs = [-0.15, 0.15].map((x) => {
    const pivot = new THREE.Group();
    pivot.position.set(x, 0.78, 0);
    const leg = part(LIMB(0.13, 0.5), pants);
    leg.position.y = -0.36;
    const boot = part(BOOT, shoes);
    boot.position.set(0, -0.68, 0.07);
    pivot.add(leg, boot);
    body.add(pivot);
    return pivot;
  });

  // ---------- Туловище ----------
  const torso = part(f ? TORSO_F : TORSO, jacket || shirt);
  torso.position.y = 0.66;
  body.add(torso);
  // Низ (брюки/юбка) — плавный переход к ногам
  const hips = part(lathe([[0, 0], [0.3, 0], [0.31, 0.1], [0.3, 0.2], [0, 0.2]], 18, 0.74), f && look.skirt ? look.skirt : pants);
  hips.position.y = 0.6;
  body.add(hips);
  if (apron) {
    const a = part(BIB, apron);
    a.material = flat(apron).clone();
    a.material.side = THREE.DoubleSide;
    a.position.y = 0.95;
    body.add(a);
  }
  if (jacket) {
    // Рубашка видна в вырезе куртки
    const v = part(new THREE.CylinderGeometry(0.12, 0.2, 0.32, 12, 1, true, -0.6, 1.2), shirt);
    v.material = flat(shirt).clone();
    v.material.side = THREE.DoubleSide;
    v.scale.z = 1.6;
    v.position.set(0, 1.25, 0.06);
    body.add(v);
  }
  // Воротничок рубашки — два уголка, как у садовника
  [-1, 1].forEach((s) => {
    const c = part(new THREE.ConeGeometry(0.07, 0.13, 3), jacket ? shirt : shade(shirt, 0.08));
    c.rotation.set(Math.PI - 0.5, 0, s * 0.5);
    c.position.set(s * 0.07, 1.39, 0.15);
    body.add(c);
  });
  if (backpack) {
    const b = part(LIMB(0.18, 0.18), backpack);
    b.scale.set(1.15, 1, 0.6);
    b.position.set(0, 1.08, -0.27);
    body.add(b);
  }

  // ---------- Руки: трубки и ладони-рукавицы ----------
  const arms = [-1, 1].map((side) => {
    const pivot = new THREE.Group();
    pivot.position.set(side * (f ? 0.33 : 0.37), 1.33, 0);
    const sleeve = part(LIMB(0.085, 0.42), jacket || shirt);
    sleeve.position.y = -0.27;
    pivot.add(sleeve);
    if (sleeves === 'short' && !jacket) {
      sleeve.scale.y = 0.45;
      sleeve.position.y = -0.12;
      const fore = part(LIMB(0.07, 0.24), skin);
      fore.position.y = -0.38;
      pivot.add(fore);
    }
    const hand = part(MITT, look.gloves ? gloves : skin);
    hand.position.y = -0.6;
    pivot.add(hand);
    pivot.rotation.z = side * 0.08;
    body.add(pivot);
    return pivot;
  });

  // ---------- Голова ----------
  const head = new THREE.Group();
  head.position.y = 1.6;
  body.add(head);
  const neck = part(new THREE.CylinderGeometry(0.085, 0.1, 0.14, 12), skin);
  neck.position.y = -0.2;
  const skull = part(HEAD, skin);
  skull.position.y = 0.07;
  head.add(neck, skull);
  [-1, 1].forEach((s) => {
    const ear = part(EAR, shade(skin, -0.03));
    ear.position.set(s * 0.255, 0.04, -0.01);
    ear.rotation.y = s * 0.25;
    head.add(ear);
  });
  const nose = part(NOSE, shade(skin, -0.05));
  nose.scale.setScalar(f ? 0.78 : 1);
  nose.position.set(0, 0.02, 0.27);
  head.add(nose);
  if (mustache) {
    const m = part(LIMB(0.03, 0.12), hair);
    m.rotation.z = Math.PI / 2;
    m.position.set(0, -0.08, 0.27);
    head.add(m);
  }
  if (glasses) {
    const gm = '#2e3238';
    [-0.1, 0.1].forEach((x) => {
      const g = part(new THREE.TorusGeometry(0.06, 0.012, 6, 18), gm);
      g.position.set(x, 0.1, 0.25);
      head.add(g);
    });
  }

  // ---------- Волосы: «пятна» по бокам и сзади, как бакенбарды садовника ----------
  const H = (geo, x, y, z, sx = 1, sy = 1, sz = 1) => {
    const m = part(geo, hair);
    m.position.set(x, y, z);
    m.scale.set(sx, sy, sz);
    head.add(m);
    return m;
  };
  if (hairStyle !== 'bald') {
    // Затылок
    H(new THREE.SphereGeometry(0.275, 24, 16, 0, Math.PI * 2, 0, Math.PI * 0.55), 0, 0.1, -0.03, 1.01, 1.08, 1).rotation.x = -0.55;
    // Бакенбарды
    [-1, 1].forEach((s) => H(new THREE.SphereGeometry(0.07, 12, 10), s * 0.22, 0.02, 0.07, 0.5, 1.4, 0.9));
  }
  if (hairStyle === 'long') {
    H(LIMB(0.2, 0.26), 0, -0.12, -0.12, 1.25, 1, 0.6);
    [-1, 1].forEach((s) => H(LIMB(0.07, 0.24), s * 0.22, -0.08, 0.03));
  } else if (hairStyle === 'ponytail') {
    H(LIMB(0.07, 0.24), 0, -0.02, -0.3).rotation.x = 0.5;
  } else if (hairStyle === 'bun') {
    H(new THREE.SphereGeometry(0.11, 14, 10), 0, 0.33, -0.12);
  } else if (hairStyle === 'curly') {
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * Math.PI * 2;
      H(new THREE.SphereGeometry(0.09, 10, 8), Math.cos(a) * 0.23, 0.2 + Math.sin(i * 1.7) * 0.04, Math.sin(a) * 0.21 - 0.04);
    }
  } else if (hairStyle === 'spiky') {
    H(new THREE.SphereGeometry(0.2, 14, 10), 0, 0.24, 0.0, 1.2, 0.6, 1.1);
  }

  // ---------- Головные уборы ----------
  if (hat === 'cap' || hat === 'flatcap') {
    // Плоская кепка-«блин» с маленьким козырьком (как у садовника)
    const crown = part(new THREE.CylinderGeometry(0.3, 0.27, 0.11, 24), hatColor);
    crown.scale.z = 1.05;
    crown.position.set(0, 0.33, -0.01);
    crown.rotation.x = -0.12;
    const top = part(new THREE.SphereGeometry(0.3, 24, 10, 0, Math.PI * 2, 0, Math.PI * 0.22), hatColor);
    top.position.set(0, 0.24, -0.01);
    top.rotation.x = -0.12;
    const brim = part(new THREE.CylinderGeometry(0.2, 0.2, 0.03, 18, 1, false, -Math.PI / 2, Math.PI), shade(hatColor, -0.04));
    brim.position.set(0, 0.29, 0.17);
    brim.rotation.x = 0.1;
    head.add(crown, top, brim);
  } else if (hat === 'paper') {
    const p = part(new THREE.BoxGeometry(0.5, 0.14, 0.24), '#f6f3ec');
    p.position.y = 0.4;
    head.add(p);
  } else if (hat === 'beanie') {
    const b = part(new THREE.SphereGeometry(0.29, 22, 12, 0, Math.PI * 2, 0, Math.PI / 2), hatColor);
    b.position.y = 0.14;
    b.scale.y = 1.05;
    const rim = part(new THREE.TorusGeometry(0.28, 0.04, 8, 24), shade(hatColor, -0.05));
    rim.rotation.x = Math.PI / 2;
    rim.position.y = 0.15;
    head.add(b, rim);
  }
  if (headphones) {
    const band = part(new THREE.TorusGeometry(0.29, 0.025, 6, 20, Math.PI), '#2e3238');
    band.position.y = 0.1;
    head.add(band);
    [-0.28, 0.28].forEach((x) => {
      const cup = part(new THREE.CylinderGeometry(0.085, 0.085, 0.07, 14), '#e07a5f');
      cup.rotation.z = Math.PI / 2;
      cup.position.set(x, 0.06, 0);
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
      phase += dt * (speed > 0.1 ? 8.5 : 2);
      const walk = Math.min(speed / 4, 1);
      const s = Math.sin(phase);

      if (dancing) {
        const d = phase * 1.6;
        body.position.y = Math.abs(Math.sin(d)) * 0.2;
        body.rotation.y = Math.sin(d * 0.5) * 0.9;
        arms[0].rotation.z = -2.2 + Math.sin(d) * 0.6;
        arms[1].rotation.z = 2.2 - Math.sin(d) * 0.6;
        legs[0].rotation.x = Math.sin(d) * 0.45;
        legs[1].rotation.x = -Math.sin(d) * 0.45;
        head.rotation.x = Math.sin(d * 2) * 0.12;
        phase += dt * 3;
        return;
      }
      body.rotation.y *= 0.8;
      if (arms[0].rotation.z < -0.2) arms[0].rotation.z += (-0.08 - arms[0].rotation.z) * 0.2;

      // Походка вперевалку: короткий шаг, покачивание корпуса
      legs[0].rotation.x = s * 0.55 * walk;
      legs[1].rotation.x = -s * 0.55 * walk;
      arms[0].rotation.x = -s * 0.45 * walk;
      body.position.y = Math.abs(Math.cos(phase)) * 0.05 * walk + Math.sin(phase) * 0.006 * (1 - walk);
      body.rotation.z = Math.sin(phase) * 0.06 * walk + Math.sin(phase * 0.23) * 0.012 * (1 - walk);
      body.rotation.x = 0.06 * walk;
      torso.scale.y = 1 + Math.sin(phase * 0.7) * 0.012 * (1 - walk);

      // Иногда оглядывается
      lookTimer -= dt;
      if (lookTimer < 0) { lookTimer = 3 + Math.random() * 5; lookTarget = walk > 0.2 ? 0 : (Math.random() - 0.5) * 1.1; }
      head.rotation.y += (lookTarget - head.rotation.y) * Math.min(1, dt * 3);

      if (talkTimer > 0) {
        // Говорит: кивает, покачивает головой и жестикулирует
        talkTimer -= dt;
        head.rotation.x = Math.sin(talkTimer * 9) * 0.09;
        head.rotation.z = Math.sin(talkTimer * 3.3) * 0.06;
        arms[1].rotation.x = -0.6 + Math.sin(talkTimer * 6) * 0.3;
        arms[1].rotation.z = 0.25 + Math.sin(talkTimer * 4.5) * 0.12;
        arms[0].rotation.x = -0.2 + Math.sin(talkTimer * 4) * 0.15;
      } else {
        head.rotation.x *= 0.9;
        head.rotation.z *= 0.9;
        arms[1].rotation.x += (s * 0.45 * walk - arms[1].rotation.x) * 0.3;
      }
      if (wave > 0) {
        wave -= dt;
        arms[1].rotation.z = 2.6 + Math.sin(wave * 18) * 0.3;
        head.rotation.z = -0.12;
      } else {
        arms[1].rotation.z += (0.08 - arms[1].rotation.z) * 0.2;
      }
    },
    talk(seconds = 1.5) { talkTimer = seconds; },
    wave(seconds = 1.2) { wave = seconds; },
    setDance(on) { dancing = on; },
  };
}
