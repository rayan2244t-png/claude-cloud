// Карта «Бруклин»: улица с браунстоунами, дорога и парк.
// Новые районы делаются по образцу этого файла и регистрируются в world/maps/index.js.
import * as THREE from 'three';
import { mat, mesh, box, block, cyl, sphere, group, sign, rng, pick, PAL, wetMat, cloneMat, WORLD } from '../kit.js';
import {
  brownstone, tree, treePit, streetLamp, hydrant, trashCan, mailbox, bench, bush, flowerBed,
  car, coffeeCart, hotDogStand, subwayEntrance, hoopFence, deliFront,
} from '../props.js';
import { createCrowd } from '../crowd.js';

const SIDEWALK_Y = 0.08;

export function buildBrooklyn() {
  const r = rng(7);
  const root = new THREE.Group();
  const colliders = [];
  const boxC = (minX, maxX, minZ, maxZ) => colliders.push({ type: 'box', minX, maxX, minZ, maxZ });
  const circC = (x, z, rad) => colliders.push({ type: 'circle', x, z, r: rad });
  const animated = [];

  // ---------- Земля ----------
  const grass = mesh(new THREE.PlaneGeometry(200, 120), PAL.grass, { shadow: false });
  grass.rotation.x = -Math.PI / 2;
  grass.position.set(0, -0.01, 10);
  root.add(grass);

  // Дорога
  root.add(block(120, 0.02, 7, wetMat(PAL.asphalt), 0, -0.01, 0, { shadow: false }));
  for (let x = -58; x < 60; x += 4) {
    root.add(block(2, 0.01, 0.12, PAL.line, x, 0.012, -0.08, { shadow: false }));
    root.add(block(2, 0.01, 0.12, PAL.line, x, 0.012, 0.08, { shadow: false }));
  }
  // Пешеходные переходы
  [-4, 20].forEach((cx) => {
    for (let i = 0; i < 8; i++) root.add(block(0.5, 0.01, 6.2, PAL.white, cx - 2.6 + i * 0.75, 0.014, 0, { shadow: false }));
  });

  // Тротуары из плит (инстансы — быстро даже на телефоне)
  const slabGeo = new THREE.BoxGeometry(1.42, 0.1, 1.42);
  const slabPositions = [];
  for (let x = -60; x < 60; x += 1.5) {
    for (const z0 of [-7.75, 3.5 + 0.75]) {
      for (let k = 0; k < 3; k++) slabPositions.push([x + 0.75, z0 + k * 1.5]);
    }
  }
  const slabs = new THREE.InstancedMesh(slabGeo, wetMat('#ffffff'), slabPositions.length);
  const m4 = new THREE.Matrix4();
  const col = new THREE.Color();
  slabPositions.forEach(([x, z], i) => {
    m4.makeRotationY((r() - 0.5) * 0.03);
    m4.setPosition(x + (r() - 0.5) * 0.04, SIDEWALK_Y - 0.05, z + (r() - 0.5) * 0.04);
    slabs.setMatrixAt(i, m4);
    slabs.setColorAt(i, col.set(r() < 0.15 ? PAL.slabDark : PAL.slab).offsetHSL(0, 0, (r() - 0.5) * 0.03));
  });
  slabs.receiveShadow = true;
  root.add(slabs);
  // Подложка под плитами (видна в щелях) и бордюры
  root.add(block(120, 0.05, 4.5, '#b9b19f', 0, -0.01, -5.75, { shadow: false }));
  root.add(block(120, 0.05, 4.5, '#b9b19f', 0, -0.01, 5.75, { shadow: false }));
  root.add(block(120, 0.14, 0.25, PAL.curb, 0, 0, -3.5));
  root.add(block(120, 0.14, 0.25, PAL.curb, 0, 0, 3.5));

  // ---------- Дома северной стороны ----------
  const houses = [];
  const specials = {
    '-32': { deli: true, floors: 3, color: '#c99a78' },
    '-24': { fireEscape: true },
    '-16': { waterTower: true, floors: 5, clinic: true },
    '-8': { windowBoxes: true },
    '0': { fireEscape: true, floors: 3 },
    '8': { door: '#3e7d5a', windowBoxes: true, color: '#b0664f', home: true },
    '16': { fireEscape: true, floors: 5 },
    '24': { waterTower: true },
    '32': { floors: 3 },
  };
  for (let x = -40; x <= 40; x += 8) {
    const sp = specials[String(x)] || {};
    const b = brownstone(r, { floors: sp.floors || 3 + Math.floor(r() * 2), ...sp });
    b.group.position.set(x, 0, -8);
    root.add(b.group);
    if (sp.clinic) {
      const cs = sign('✚ FAMILY CLINIC', 4.2, 0.6, { bg: '#2f9a8a', fg: '#ffffff', w: 768, h: 110, font: 'bold 66px Nunito, sans-serif' });
      cs.position.set(x + 1.2, 1.25, -7.9);
      root.add(cs);
    }
    if (sp.deli) {
      const d = deliFront(7.6);
      d.position.set(x + 0.6, 0, -8);
      root.add(d);
    }
    const doorWorldX = x + b.doorX;
    houses.push({ x, doorX: doorWorldX, home: !!sp.home });
    boxC(doorWorldX - 0.95, doorWorldX + 0.95, -8, -5.15);
  }
  boxC(-60, 60, -18, -8);

  // Задний план — силуэты более высоких домов, растворяются в дымке
  for (let i = 0; i < 26; i++) {
    const w = 5 + r() * 6;
    const h = 14 + r() * 22;
    const x = -70 + i * 5.6 + r() * 2;
    root.add(block(w, h, 6, pick(r, ['#c9b8a6', '#bfae9b', '#d3c4b2', '#b5a493']), x, 0, -26 - r() * 10, { shadow: false }));
  }

  // ---------- Северный тротуар ----------
  for (let x = -36; x <= 36; x += 8) {
    root.add(treePit(x, -4.6));
    root.add(tree(r, x, -4.6, 0.9 + r() * 0.25));
    circC(x, -4.6, 0.45);
  }
  for (let x = -32; x <= 32; x += 16) {
    root.add(streetLamp(x + 8, -3.95, Math.PI));
    circC(x + 8, -3.95, 0.25);
  }
  root.add(hydrant(-14.5, -4.0)); circC(-14.5, -4.0, 0.3);
  root.add(hydrant(18.6, -4.0)); circC(18.6, -4.0, 0.3);
  root.add(mailbox(-2.5, -4.1)); circC(-2.5, -4.1, 0.45);
  root.add(trashCan(-25.5, -4.0)); circC(-25.5, -4.0, 0.4);
  root.add(trashCan(15, -4.0)); circC(15, -4.0, 0.4);

  // Припаркованные машины
  [[-17, '#a7c4d9'], [2, '#e8a07a'], [27, '#c7d9a7'], [-38, '#d9a7c4']].forEach(([x, c]) => {
    const p = car(c);
    p.position.set(x, 0, -2.5);
    p.rotation.y = Math.PI;
    root.add(p);
    boxC(x - 2.15, x + 2.15, -3.4, -1.6);
  });

  // Такси Маркуса
  const taxi = car(null, { taxi: true });
  taxi.position.set(-29, 0, 2.55);
  root.add(taxi);
  boxC(-31.15, -26.85, 1.65, 3.45);

  // ---------- Южный тротуар и парк ----------
  for (let x = -36; x <= 36; x += 12) {
    root.add(streetLamp(x, 3.95, 0));
    circC(x, 3.95, 0.25);
  }
  root.add(bench(-15, 6.2, Math.PI)); boxC(-16.1, -13.9, 5.9, 6.6);
  root.add(bench(4, 6.2, Math.PI)); boxC(2.9, 5.1, 5.9, 6.6);
  root.add(trashCan(-2.5, 6.3)); circC(-2.5, 6.3, 0.4);
  root.add(hydrant(10.5, 4.1)); circC(10.5, 4.1, 0.3);

  // Ограда парка с проходами
  const gaps = [[-9.5, -3.5], [12, 18.5]];
  let fx = -44;
  for (const [a, b] of [...gaps, [44, 44]]) {
    const len = a - fx;
    if (len > 0.6) {
      const f = hoopFence(len);
      f.position.set(fx + len / 2, 0, 7.2);
      root.add(f);
    }
    fx = b;
  }

  // Дорожки из камней в парке (как в Goose Game)
  const stonePath = (points) => {
    for (let i = 0; i < points.length - 1; i++) {
      const [x0, z0] = points[i];
      const [x1, z1] = points[i + 1];
      const n = Math.ceil(Math.hypot(x1 - x0, z1 - z0) / 1.25);
      for (let k = 0; k < n; k++) {
        const t = k / n;
        const s = block(1.0 + r() * 0.3, 0.06, 0.9 + r() * 0.3, pick(r, [PAL.slab, '#d2ccbd', '#e2ddd1']),
          x0 + (x1 - x0) * t + (r() - 0.5) * 0.3, 0, z0 + (z1 - z0) * t + (r() - 0.5) * 0.3, { shadow: false });
        s.rotation.y = r() * 0.6;
        root.add(s);
      }
    }
  };
  stonePath([[-6.5, 7.6], [-6, 12], [0, 15], [6, 15], [12, 13], [15, 8]]);
  stonePath([[6, 15], [8, 20], [20, 19], [27, 12]]);

  // Кофейная тележка Джесс
  root.add(coffeeCart(-6, 10.2));
  boxC(-7.4, -4.6, 9.4, 11.0);
  // Хот-доги Тони
  root.add(hotDogStand(14, 9.6));
  boxC(12.8, 15.2, 8.9, 10.3);
  // Вход в метро
  const sub = subwayEntrance(31, 5.3);
  sub.rotation.y = -Math.PI / 2;
  root.add(sub);
  boxC(28.9, 33.1, 4.0, 6.6);

  // Фонтан
  const fountain = group(
    cyl(2.0, 2.2, 0.5, '#cfc8b8', 0, 0, 0, 20),
    cyl(1.75, 1.75, 0.52, mat('#7fbfd6', { roughness: 0.05, metalness: 0.5, wave: 1 }), 0, 0.01, 0, 20, { shadow: false }),
    cyl(0.25, 0.35, 1.2, '#cfc8b8', 0, 0, 0, 10),
    cyl(0.8, 0.5, 0.2, '#cfc8b8', 0, 1.2, 0, 14),
  );
  const jet = sphere(0.22, '#bfe6f0', 0, 1.65, 0, 1, { shadow: false, opts: { transparent: true, opacity: 0.85 } });
  fountain.add(jet);
  fountain.position.set(3, 0, 17.5);
  root.add(fountain);
  circC(3, 17.5, 2.3);
  animated.push((t) => { jet.scale.setScalar(1 + Math.sin(t * 6) * 0.15); jet.position.y = 1.65 + Math.sin(t * 6) * 0.05; });

  // Деревья, кусты, скамейки, клумбы в парке
  const parkTrees = [[-14, 11], [-19, 16], [-11, 20], [-26, 12], [-30, 19], [10, 21], [18, 23], [24, 17], [33, 13], [36, 20], [-3, 22], [-22, 23]];
  const fadeTrees = [];
  parkTrees.forEach(([x, z]) => {
    const s = 1.1 + r() * 0.35;
    const tr = tree(r, x, z, s);
    tr.userData.center = new THREE.Vector3(x, 3.5 * s, z);
    tr.userData.radius = 2.1 * s;
    // Свои материалы, чтобы дерево могло стать прозрачным, когда закрывает героя
    tr.traverse((o) => { if (o.isMesh) { o.material = cloneMat(o.material); o.material.transparent = true; } });
    tr.userData.fade = 1;
    fadeTrees.push(tr);
    root.add(tr);
    circC(x, z, 0.45);
  });
  [[-12, 8.4], [-17, 9.5], [9, 8.6], [21, 8.4], [26, 9.6], [-24, 9], [-33, 9.4], [35, 9]].forEach(([x, z]) => {
    root.add(bush(r, x, z, 0.9 + r() * 0.3));
    circC(x, z, 0.9);
  });
  root.add(flowerBed(r, -2, 11.5, 3, 1.6)); boxC(-3.5, -0.5, 10.7, 12.3);
  root.add(flowerBed(r, 8.5, 11.2, 2.4, 1.4)); boxC(7.3, 9.7, 10.5, 11.9);
  root.add(bench(-1, 18.8, Math.PI / 2 + 0.3)); circC(-1, 18.8, 1.0);
  // Фонари вдоль дорожек парка — вечером здесь играет музыкант
  [[-8.5, 14.5, 0.6], [-17.5, 12.2, -0.4], [9, 14.2, 2.4], [22, 17, 2.8], [-26, 17, 0]].forEach(([x, z, ry]) => {
    root.add(streetLamp(x, z, ry));
    circC(x, z, 0.25);
  });
  root.add(bench(9.5, 16.2, -Math.PI / 2)); circC(9.5, 16.2, 1.0);

  // Травяные кустики (инстансы)
  const tuftGeo = new THREE.ConeGeometry(0.06, 0.32, 3);
  const tufts = new THREE.InstancedMesh(tuftGeo, mat('#ffffff', { wave: 2 }), 1600);
  for (let i = 0; i < 1600; i++) {
    let x, z;
    if (i < 220) { x = -60 + r() * 120; z = r() < 0.5 ? -3.25 + (r() - 0.5) * 0.2 : 7.0 + r() * 0.4; }
    else { x = -50 + r() * 100; z = 7.5 + r() * 20; }
    m4.makeRotationFromEuler(new THREE.Euler((r() - 0.5) * 0.5, r() * 3, (r() - 0.5) * 0.5));
    m4.setPosition(x, 0.12, z);
    tufts.setMatrixAt(i, m4);
    tufts.setColorAt(i, col.set(pick(r, [PAL.grassDark, '#6b9a63', PAL.grassLight])));
  }
  tufts.receiveShadow = true;
  root.add(tufts);

  // ---------- Движение машин ----------
  const traffic = [
    { mesh: car('#e8c7a0'), x: -20, z: -0.8, dir: -1, speed: 6 },
    { mesh: car('#9fb7d9'), x: 30, z: -0.8, dir: -1, speed: 5.5 },
    { mesh: car(null, { taxi: true }), x: 0, z: 0.8, dir: 1, speed: 6.5 },
    { mesh: car('#d9a0a0'), x: -45, z: 0.8, dir: 1, speed: 5 },
  ];
  traffic.forEach((c) => { c.mesh.rotation.y = c.dir > 0 ? 0 : Math.PI; c.wheelSpin = 0; root.add(c.mesh); });

  // ---------- Голуби ----------
  const pigeons = [];
  for (let i = 0; i < 8; i++) {
    const p = new THREE.Group();
    const bodyCol = pick(r, ['#9aa0aa', '#8a909b', '#b3b7bf']);
    const b = sphere(0.18, bodyCol, 0, 0.2, 0, 1);
    b.scale.set(0.8, 0.8, 1.3);
    const head = sphere(0.1, '#6d7380', 0, 0.38, 0.18, 1);
    const beak = mesh(new THREE.ConeGeometry(0.03, 0.08, 4), '#e0a23c');
    beak.rotation.x = Math.PI / 2;
    beak.position.set(0, 0.37, 0.3);
    const wings = [-1, 1].map((s) => { const w = box(0.04, 0.12, 0.3, bodyCol, s * 0.15, 0.24, -0.02); p.add(w); return w; });
    p.add(b, head, beak);
    const home = new THREE.Vector3(-1 + r() * 8, 0, 14 + r() * 7);
    p.position.copy(home);
    p.rotation.y = r() * 6;
    root.add(p);
    pigeons.push({ g: p, head, beak, wings, home, state: 'idle', t: r() * 5, vel: new THREE.Vector3() });
  }

  // ---------- Светлячки в парке (ночью) ----------
  const FLIES = 70;
  const flyBase = Array.from({ length: FLIES }, () => [-34 + r() * 68, 0.4 + r() * 1.8, 9 + r() * 15, r() * 10]);
  const flyGeo = new THREE.BufferGeometry();
  flyGeo.setAttribute('position', new THREE.Float32BufferAttribute(new Float32Array(FLIES * 3), 3));
  const flyMat = new THREE.PointsMaterial({ color: new THREE.Color(2.2, 2.6, 0.9), size: 0.22, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending, toneMapped: false });
  const flies = new THREE.Points(flyGeo, flyMat);
  flies.frustumCulled = false;
  root.add(flies);
  animated.push((t) => {
    flyMat.opacity = WORLD.night * (1 - WORLD.rain);
    flies.visible = flyMat.opacity > 0.02;
    if (!flies.visible) return;
    const p = flyGeo.attributes.position.array;
    flyBase.forEach(([x, y, z, ph], i) => {
      p[i * 3] = x + Math.sin(t * 0.4 + ph) * 1.2;
      p[i * 3 + 1] = y + Math.sin(t * 0.9 + ph * 2) * 0.35;
      p[i * 3 + 2] = z + Math.cos(t * 0.33 + ph) * 1.2;
    });
    flyGeo.attributes.position.needsUpdate = true;
    flyMat.size = 0.18 + Math.sin(t * 3) * 0.04;
  });

  // ---------- Прохожие ----------
  const crowd = createCrowd({
    lanes: [{ z: 4.75, x0: -36, x1: 27, y: SIDEWALK_Y }, { z: 5.5, x0: -36, x1: 27, y: SIDEWALK_Y }, { z: 24.2, x0: -36, x1: 36 }],
    count: 9,
    seed: 21,
  });
  root.add(crowd.group);

  // ---------- Обновление каждый кадр ----------
  const treeGroups = [];
  const rayA = new THREE.Vector3(), rayB = new THREE.Vector3(), rayD = new THREE.Vector3(), tmp = new THREE.Vector3();
  root.traverse((o) => { if (o.userData.sway !== undefined) treeGroups.push(o); });

  function update(dt, t, playerPos, camPos) {
    animated.forEach((fn) => fn(t));
    crowd.update(dt, t, playerPos);
    // Дерево становится прозрачным, если крона пересекает луч «камера → герой»
    if (camPos) {
      rayA.copy(camPos);
      rayB.copy(playerPos).setY(playerPos.y + 1);
      rayD.subVectors(rayB, rayA);
    }
    const len2 = rayD.lengthSq();
    for (const tr of fadeTrees) {
      let blocking = false;
      if (camPos && len2 > 0) {
        const c = tr.userData.center;
        const t = THREE.MathUtils.clamp(tmp.subVectors(c, rayA).dot(rayD) / len2, 0, 1);
        const d = tmp.copy(rayA).addScaledVector(rayD, t).distanceTo(c);
        blocking = t < 0.96 && d < tr.userData.radius;
      }
      const want = blocking ? 0 : 1;
      if (Math.abs(tr.userData.fade - want) > 0.01) {
        tr.userData.fade += (want - tr.userData.fade) * Math.min(1, dt * 7);
        // Почти прозрачное дерево прячем целиком (иначе зелёная дымка на персонажах), тень оставляем
        tr.traverse((o) => {
          if (!o.isMesh) return;
          o.material.opacity = tr.userData.fade;
          o.material.depthWrite = tr.userData.fade > 0.9;
          o.material.colorWrite = tr.userData.fade > 0.05;
        });
      }
    }
    treeGroups.forEach((g) => { g.rotation.z = Math.sin(t * 0.8 + g.userData.sway) * 0.012; });

    for (const c of traffic) {
      const ahead = (playerPos.x - c.x) * c.dir;
      const inLane = Math.abs(playerPos.z - c.z) < 1.6;
      const blocked = inLane && ahead > 0 && ahead < 6;
      c.cur = THREE.MathUtils.lerp(c.cur ?? c.speed, blocked ? 0 : c.speed, dt * 3);
      c.x += c.dir * c.cur * dt;
      if (c.x > 60) c.x = -60;
      if (c.x < -60) c.x = 60;
      c.mesh.position.set(c.x, 0, c.z);
    }

    for (const p of pigeons) {
      const d = p.g.position.distanceTo(playerPos);
      p.t += dt;
      if (p.state === 'idle') {
        p.head.position.y = 0.38 - Math.max(0, Math.sin(p.t * 3)) * 0.12;
        p.beak.position.y = p.head.position.y - 0.01;
        if (Math.sin(p.t * 0.7) > 0.98) p.g.rotation.y += dt * 4;
        if (d < 2.6) {
          p.state = 'fly';
          p.t = 0;
          const away = p.g.position.clone().sub(playerPos).setY(0).normalize();
          p.vel.set(away.x * 5, 4.5, away.z * 5);
          p.g.rotation.y = Math.atan2(away.x, away.z);
        }
      } else if (p.state === 'fly') {
        p.g.position.addScaledVector(p.vel, dt);
        p.vel.y += dt * 1.5;
        p.wings.forEach((w, i) => { w.rotation.z = Math.sin(p.t * 30) * 1.2 * (i ? 1 : -1); });
        if (p.t > 4) { p.state = 'gone'; p.g.visible = false; p.t = 0; }
      } else if (p.state === 'gone' && p.t > 12) {
        p.g.position.copy(p.home);
        p.g.visible = true;
        p.state = 'idle';
        p.wings.forEach((w) => { w.rotation.z = 0; });
      }
    }
  }

  const home = houses.find((h) => h.home);

  return {
    id: 'brooklyn',
    root,
    crowd,
    colliders,
    bounds: { minX: -38, maxX: 38, minZ: -7.4, maxZ: 25 },
    heightAt: (x, z) => ((z > -8 && z < -3.5) || (z > 3.5 && z < 7) ? SIDEWALK_Y : 0),
    spots: {
      start: [-23.5, 5.2],
      homeDoor: [home.doorX, -4.6],
      subway: [28.3, 5.3],
    },
    update,
  };
}
