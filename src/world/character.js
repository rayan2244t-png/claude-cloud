// Персонажи в стиле Goose Game: простые формы, без глаз, с носом.
import * as THREE from 'three';
import { mesh, mat } from './kit.js';

const capsule = (r, len, color) => mesh(new THREE.CapsuleGeometry(r, len, 4, 10), color);

export function makeCharacter(look = {}) {
  const {
    skin = '#e8b48f', shirt = '#6c8fbf', pants = '#3d4a5c', shoes = '#3a302a',
    hair = '#3a2a20', hat = 'none', hatColor = '#c94f3d', apron, glasses, mustache, backpack, headphones, scale = 1,
  } = look;

  const root = new THREE.Group();
  const body = new THREE.Group(); // покачивается при ходьбе
  root.add(body);

  // Ноги
  const legs = [-0.14, 0.14].map((x) => {
    const pivot = new THREE.Group();
    pivot.position.set(x, 0.78, 0);
    const leg = capsule(0.11, 0.5, pants);
    leg.position.y = -0.36;
    const shoe = mesh(new THREE.BoxGeometry(0.2, 0.12, 0.3), shoes);
    shoe.position.set(0, -0.72, 0.05);
    pivot.add(leg, shoe);
    body.add(pivot);
    return pivot;
  });

  // Туловище — слегка расширяется книзу, как у садовника из Goose Game
  const torso = mesh(new THREE.CylinderGeometry(0.27, 0.36, 0.78, 14), shirt);
  torso.position.y = 1.15;
  body.add(torso);
  if (apron) {
    const a = mesh(new THREE.CylinderGeometry(0.28, 0.37, 0.6, 14, 1, true, -0.9, 1.8), apron);
    a.material = mat(apron, { side: THREE.DoubleSide });
    a.position.y = 1.08;
    a.scale.set(1.04, 1, 1.04);
    body.add(a);
  }
  if (backpack) {
    const b = mesh(new THREE.BoxGeometry(0.42, 0.5, 0.2), backpack);
    b.position.set(0, 1.2, -0.33);
    body.add(b);
  }

  // Руки
  const arms = [-1, 1].map((side) => {
    const pivot = new THREE.Group();
    pivot.position.set(side * 0.34, 1.48, 0);
    const arm = capsule(0.085, 0.48, shirt);
    arm.position.y = -0.3;
    const hand = mesh(new THREE.IcosahedronGeometry(0.09, 1), skin);
    hand.position.y = -0.6;
    pivot.add(arm, hand);
    pivot.rotation.z = side * 0.12;
    body.add(pivot);
    return pivot;
  });

  // Голова
  const head = new THREE.Group();
  head.position.y = 1.78;
  body.add(head);
  const neck = mesh(new THREE.CylinderGeometry(0.09, 0.1, 0.14, 8), skin);
  neck.position.y = -0.2;
  const skull = mesh(new THREE.IcosahedronGeometry(0.25, 2), skin);
  const nose = mesh(new THREE.IcosahedronGeometry(0.06, 1), skin);
  nose.position.set(0, -0.02, 0.25);
  nose.scale.set(1, 1.2, 1.1);
  head.add(neck, skull, nose);

  const hairCap = mesh(new THREE.SphereGeometry(0.262, 14, 10, 0, Math.PI * 2, 0, Math.PI * 0.55), hair);
  hairCap.rotation.x = -0.35;
  hairCap.position.set(0, 0.02, -0.02);
  head.add(hairCap);

  if (hat === 'cap') {
    const c = mesh(new THREE.SphereGeometry(0.27, 14, 8, 0, Math.PI * 2, 0, Math.PI / 2), hatColor);
    c.position.y = 0.04;
    const brim = mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.03, 12, 1, false, -Math.PI / 2, Math.PI), hatColor);
    brim.position.set(0, 0.06, 0.18);
    head.add(c, brim);
  } else if (hat === 'bun') {
    const bun = mesh(new THREE.IcosahedronGeometry(0.12, 1), hair);
    bun.position.set(0, 0.22, -0.12);
    head.add(bun);
  } else if (hat === 'paper') {
    const p = mesh(new THREE.BoxGeometry(0.5, 0.14, 0.24), '#f6f3ec');
    p.position.y = 0.24;
    head.add(p);
  } else if (hat === 'beanie') {
    const b = mesh(new THREE.SphereGeometry(0.275, 14, 8, 0, Math.PI * 2, 0, Math.PI / 2), hatColor);
    b.position.y = 0.03;
    const pom = mesh(new THREE.IcosahedronGeometry(0.07, 1), '#f6f3ec');
    pom.position.y = 0.32;
    head.add(b, pom);
  }
  if (glasses) {
    [-0.09, 0.09].forEach((x) => {
      const g = mesh(new THREE.TorusGeometry(0.055, 0.012, 6, 12), '#2e3238');
      g.position.set(x, 0.04, 0.235);
      head.add(g);
    });
  }
  if (mustache) {
    const m = mesh(new THREE.BoxGeometry(0.18, 0.04, 0.05), hair);
    m.position.set(0, -0.09, 0.23);
    head.add(m);
  }
  if (headphones) {
    const band = mesh(new THREE.TorusGeometry(0.27, 0.025, 6, 16, Math.PI), '#2e3238');
    band.position.y = 0.02;
    head.add(band);
    [-0.26, 0.26].forEach((x) => {
      const cup = mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.06, 10), '#e07a5f');
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

  return {
    root,
    head,
    // speed — текущая скорость (0 = стоит)
    update(dt, speed = 0) {
      phase += dt * (speed > 0.1 ? 9 : 2);
      const walk = Math.min(speed / 4, 1);
      const s = Math.sin(phase);
      legs[0].rotation.x = s * 0.6 * walk;
      legs[1].rotation.x = -s * 0.6 * walk;
      arms[0].rotation.x = -s * 0.5 * walk;
      arms[1].rotation.x = s * 0.5 * walk;
      body.position.y = Math.abs(Math.cos(phase)) * 0.06 * walk + Math.sin(phase) * 0.01 * (1 - walk);
      body.rotation.z = Math.sin(phase) * 0.04 * walk;
      // Дыхание
      torso.scale.set(1, 1 + Math.sin(phase * 0.7) * 0.015 * (1 - walk), 1);

      if (dancing) {
        // Танец уличного танцора: прыжки, повороты, руки вверх
        const d = phase * 1.6;
        body.position.y = Math.abs(Math.sin(d)) * 0.25;
        body.rotation.y = Math.sin(d * 0.5) * 0.9;
        arms[0].rotation.z = -2.2 + Math.sin(d) * 0.6;
        arms[1].rotation.z = 2.2 - Math.sin(d) * 0.6;
        legs[0].rotation.x = Math.sin(d) * 0.5;
        legs[1].rotation.x = -Math.sin(d) * 0.5;
        phase += dt * 3;
        return;
      }
      body.rotation.y *= 0.8;
      if (arms[0].rotation.z < -0.2) arms[0].rotation.z += (-0.12 - arms[0].rotation.z) * 0.2;

      if (talkTimer > 0) {
        talkTimer -= dt;
        head.rotation.x = Math.sin(talkTimer * 14) * 0.08;
        arms[1].rotation.x = -0.4 + Math.sin(talkTimer * 6) * 0.25;
      } else {
        head.rotation.x *= 0.9;
      }
      if (wave > 0) {
        wave -= dt;
        arms[1].rotation.z = 2.6 + Math.sin(wave * 18) * 0.3;
      } else {
        arms[1].rotation.z += (0.12 - arms[1].rotation.z) * 0.2;
      }
    },
    talk(seconds = 1.5) { talkTimer = seconds; },
    wave(seconds = 1.2) { wave = seconds; },
    setDance(on) { dancing = on; },
  };
}
