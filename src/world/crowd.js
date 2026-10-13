// Прохожие, которые гуляют по тротуарам (некоторые — с собакой).
// Не разговаривают, но делают город живым. Ночью их становится меньше.
import * as THREE from 'three';
import { makeCharacter } from './character.js';
import { mesh, rng, pick } from './kit.js';

const SKIN = ['#f1c7a5', '#e8b48f', '#c99a73', '#a8714f', '#8d5a3b', '#6b4430'];
const SHIRT = ['#e07a5f', '#5b7fb3', '#7fb38a', '#f2c230', '#b0577a', '#8b6fb3', '#f6f3ec', '#2f3b52', '#d98bb3', '#4fa3a5'];
const PANTS = ['#3d4a5c', '#2f3b52', '#5b4b3b', '#c9b28f', '#4a3f5c', '#3a3a3a'];
const HAIR = ['#1d1d1d', '#3a2a20', '#5a3d2b', '#c4572e', '#d9c08a', '#d9d4cc'];
const HATS = ['none', 'none', 'none', 'cap', 'beanie', 'bun'];

function makeDog(r) {
  const g = new THREE.Group();
  const col = pick(r, ['#c9a27e', '#3a302a', '#f6f3ec', '#8a6347', '#d9c08a']);
  const body = mesh(new THREE.CapsuleGeometry(0.17, 0.42, 3, 8), col);
  body.rotation.x = Math.PI / 2;
  body.position.y = 0.38;
  const head = mesh(new THREE.IcosahedronGeometry(0.16, 1), col);
  head.position.set(0, 0.55, 0.36);
  const snout = mesh(new THREE.BoxGeometry(0.1, 0.08, 0.12), col);
  snout.position.set(0, 0.51, 0.5);
  const nose = mesh(new THREE.IcosahedronGeometry(0.03, 0), '#1d1d1d');
  nose.position.set(0, 0.54, 0.57);
  const ears = [-1, 1].map((s) => { const e = mesh(new THREE.BoxGeometry(0.06, 0.14, 0.08), '#3a302a'); e.position.set(s * 0.1, 0.66, 0.33); e.rotation.z = s * 0.3; return e; });
  const tail = mesh(new THREE.CylinderGeometry(0.025, 0.035, 0.28, 5), col);
  tail.position.set(0, 0.5, -0.32);
  tail.rotation.x = -0.6;
  const legs = [[-0.09, 0.2], [0.09, 0.2], [-0.09, -0.2], [0.09, -0.2]].map(([x, z]) => { const l = mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.28, 5), col); l.position.set(x, 0.14, z); return l; });
  g.add(body, head, snout, nose, ...ears, tail, ...legs);
  return { g, tail, legs };
}

// lanes: [{ z, x0, x1 }] — дорожки, по которым ходят прохожие
export function createCrowd({ lanes, count = 8, seed = 11 }) {
  const r = rng(seed);
  const group = new THREE.Group();
  const walkers = [];
  for (let i = 0; i < count; i++) {
    const lane = lanes[i % lanes.length];
    const c = makeCharacter({
      skin: pick(r, SKIN), shirt: pick(r, SHIRT), pants: pick(r, PANTS), hair: pick(r, HAIR),
      hat: pick(r, HATS), hatColor: pick(r, SHIRT), backpack: r() < 0.25 ? pick(r, SHIRT) : undefined,
      scale: 0.92 + r() * 0.16,
    });
    const w = {
      c, lane,
      x: lane.x0 + r() * (lane.x1 - lane.x0),
      z: lane.z + (r() - 0.5) * 0.8,
      dir: r() < 0.5 ? 1 : -1,
      speed: 1.3 + r() * 0.8,
      pause: 0,
      nightOwl: r() < 0.3, // гуляет и ночью
      dog: r() < 0.3 ? makeDog(r) : null,
    };
    group.add(c.root);
    if (w.dog) group.add(w.dog.g);
    walkers.push(w);
  }

  let density = 1;
  return {
    group,
    walkers,
    // density 0..1 — доля прохожих на улице (ночью меньше)
    setDensity(d) { density = d; },
    update(dt, t, playerPos) {
      walkers.forEach((w, i) => {
        const visible = w.nightOwl || i / walkers.length < density;
        w.c.root.visible = visible;
        if (w.dog) w.dog.g.visible = visible;
        if (!visible) return;
        let moving = true;
        if (w.pause > 0) { w.pause -= dt; moving = false; }
        // Уступают дорогу герою
        const ahead = (playerPos.x - w.x) * w.dir;
        if (Math.abs(playerPos.z - w.z) < 0.9 && ahead > 0 && ahead < 1.4) moving = false;
        if (moving) {
          w.x += w.dir * w.speed * dt;
          if (w.x > w.lane.x1 || w.x < w.lane.x0) {
            w.dir *= -1;
            w.pause = 1 + Math.random() * 3;
          } else if (Math.random() < dt * 0.04) w.pause = 1.5 + Math.random() * 2.5; // остановились посмотреть в телефон
        }
        const y = w.lane.y ?? 0;
        w.c.root.position.set(w.x, y, w.z);
        w.c.root.rotation.y = w.dir > 0 ? Math.PI / 2 : -Math.PI / 2;
        w.c.update(dt, moving ? w.speed : 0);
        if (w.dog) {
          w.dog.g.position.set(w.x + w.dir * 1.1, y, w.z + 0.55);
          w.dog.g.rotation.y = w.c.root.rotation.y;
          w.dog.tail.rotation.z = Math.sin(t * 14 + i) * 0.6;
          w.dog.legs.forEach((l, k) => { l.rotation.x = moving ? Math.sin(t * 14 + k * Math.PI) * 0.5 : 0; });
        }
      });
    },
  };
}
