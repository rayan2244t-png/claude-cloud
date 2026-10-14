// Карта «Кони-Айленд»: пляж, океан, деревянный променад, колесо обозрения и американские горки.
import * as THREE from 'three';
import { mat, mesh, box, block, cyl, sphere, group, sign, rng, pick, PAL, glowMat, lightPool, wetMat, WORLD } from '../kit.js';
import { streetLamp, bench, trashCan, subwayEntrance, hotDogStand } from '../props.js';
import { createCrowd } from '../crowd.js';

const BOARD_Y = 0.35;

export function buildConey() {
  const r = rng(99);
  const root = new THREE.Group();
  const colliders = [];
  const boxC = (minX, maxX, minZ, maxZ) => colliders.push({ type: 'box', minX, maxX, minZ, maxZ });
  const circC = (x, z, rad) => colliders.push({ type: 'circle', x, z, r: rad });
  const animated = [];

  // ---------- Земля: улица, променад, пляж, океан ----------
  const street = mesh(new THREE.PlaneGeometry(200, 40), wetMat('#8f8a84'), { shadow: false });
  street.rotation.x = -Math.PI / 2;
  street.position.set(0, -0.01, -14);
  root.add(street);
  // Песок
  const sand = mesh(new THREE.PlaneGeometry(200, 26), '#ecd9a8', { shadow: false });
  sand.rotation.x = -Math.PI / 2;
  sand.position.set(0, 0.0, 15);
  root.add(sand);
  // Волнистые дюны из песка
  for (let i = 0; i < 40; i++) {
    const d = sphere(1 + r() * 1.6, pick(r, ['#e6d29e', '#efdcb0', '#e2cc96']), -60 + r() * 120, -0.6, 6 + r() * 16, 1, { shadow: false });
    d.scale.y = 0.35;
    root.add(d);
  }
  // Океан: блестящий, с волнами (вершины качаются шейдером)
  const oceanGeo = new THREE.PlaneGeometry(220, 60, 110, 30);
  const ocean = new THREE.Mesh(oceanGeo, mat('#3f8fb5', { roughness: 0.08, metalness: 0.3, wave: 1, flatShading: true }));
  ocean.rotation.x = -Math.PI / 2;
  ocean.position.set(0, -0.15, 56);
  ocean.receiveShadow = true;
  root.add(ocean);
  // Пена у берега
  const foam = mesh(new THREE.PlaneGeometry(220, 1.4, 60, 1), mat('#f6f3ec', { wave: 1, transparent: true, opacity: 0.85 }), { shadow: false });
  foam.rotation.x = -Math.PI / 2;
  foam.position.set(0, 0.02, 26.5);
  root.add(foam);
  animated.push((t) => { foam.position.z = 26.5 + Math.sin(t * 0.6) * 0.6; });

  // Деревянный променад (boardwalk) — доски
  const boardMat = wetMat('#b88b5c');
  for (let i = 0; i < 140; i++) {
    const p = block(0.68, 0.12, 9, i % 3 ? boardMat : wetMat('#a97d50'), -70 + i * 1.0, BOARD_Y - 0.12, 2, { shadow: false });
    root.add(p);
  }
  root.add(block(140, BOARD_Y - 0.12, 9, '#7a5d48', 0, 0, 2, { shadow: false }));
  // Перила променада со стороны пляжа
  for (let x = -68; x <= 68; x += 2) root.add(cyl(0.05, 0.05, 1.0, PAL.iron, x, BOARD_Y, 6.4, 6));
  root.add(box(140, 0.07, 0.07, PAL.iron, 0, BOARD_Y + 1.0, 6.4));
  // Проходы на пляж (лестницы)
  [-30, 0, 30].forEach((x) => {
    for (let k = 0; k < 3; k++) root.add(block(3, 0.12 * (3 - k), 0.5, '#a97d50', x, 0, 6.8 + k * 0.5));
  });
  const railColliders = [[-70, -31.6], [-28.4, -1.6], [1.6, 28.4], [31.6, 70]];
  railColliders.forEach(([a, b]) => boxC(a, b, 6.3, 6.5));

  // ---------- Колесо обозрения (как Wonder Wheel) ----------
  const wheel = new THREE.Group();
  const R = 11;
  const rim = new THREE.Mesh(new THREE.TorusGeometry(R, 0.25, 8, 64), glowMat('#e94f6a', '#ff7a90', 1.4, { roughness: 0.4 }));
  const rim2 = rim.clone();
  rim.position.z = 0.6;
  rim2.position.z = -0.6;
  wheel.add(rim, rim2);
  for (let i = 0; i < 16; i++) {
    const a = (i / 16) * Math.PI * 2;
    const spoke = box(0.12, R * 2, 0.12, '#f6f3ec', 0, 0, 0, { shadow: false });
    spoke.rotation.z = a;
    wheel.add(spoke);
  }
  const cars = [];
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2;
    const g = group(
      block(1.4, 1.1, 1.0, pick(r, ['#f2c230', '#5b7fb3', '#7fb38a', '#e07a5f', '#b0577a']), 0, -1.3, 0),
      block(1.5, 0.12, 1.1, '#f6f3ec', 0, -0.2, 0),
      cyl(0.04, 0.04, 1.0, '#9aa0a6', 0, -0.8, 0, 5),
    );
    g.userData.a = a;
    wheel.add(g);
    cars.push(g);
  }
  // Лампочки на ободе (ночью светятся)
  const bulbMat = glowMat('#fff2c4', '#ffd98a', 3);
  for (let i = 0; i < 48; i++) {
    const a = (i / 48) * Math.PI * 2;
    wheel.add(box(0.18, 0.18, 0.18, bulbMat, Math.cos(a) * R, Math.sin(a) * R, 0.75, { shadow: false }));
  }
  wheel.position.set(-24, R + 2.2, -18);
  root.add(wheel);
  // Опоры
  [[-1, 1], [1, 1], [-1, -1], [1, -1]].forEach(([sx, sz]) => {
    const leg = box(0.35, R + 3.5, 0.35, '#f6f3ec', -24 + sx * 4, (R + 2.2) / 2, -18 + sz * 1.6);
    leg.rotation.z = -sx * 0.32;
    root.add(leg);
  });
  boxC(-30, -18, -21, -15);
  animated.push((t) => {
    wheel.rotation.z = t * 0.08;
    cars.forEach((c) => {
      const a = c.userData.a + wheel.rotation.z;
      c.position.set(Math.cos(c.userData.a) * R, Math.sin(c.userData.a) * R, 0);
      c.rotation.z = -wheel.rotation.z;
    });
  });

  // ---------- Американские горки (деревянные, как Cyclone) ----------
  const coaster = new THREE.Group();
  const track = new THREE.CatmullRomCurve3([
    [0, 3, 0], [8, 14, 0], [14, 4, 0], [20, 10, 2], [24, 3, 6], [18, 6, 10], [8, 9, 9], [2, 4, 6], [0, 3, 0],
  ].map(([x, y, z]) => new THREE.Vector3(x, y, z)), true);
  const rail = new THREE.Mesh(new THREE.TubeGeometry(track, 220, 0.18, 6, true), glowMat('#f6f3ec', '#ffd98a', 0.6, { roughness: 0.5 }));
  rail.castShadow = true;
  coaster.add(rail);
  // Деревянные опоры решёткой
  for (let i = 0; i < 60; i++) {
    const p = track.getPointAt(i / 60);
    coaster.add(box(0.14, p.y, 0.14, '#d9cdb9', p.x, p.y / 2, p.z, { shadow: true }));
    if (i % 3 === 0) {
      const brace = box(0.08, p.y * 0.9, 0.08, '#cfc2ac', p.x + 0.4, p.y / 2, p.z);
      brace.rotation.z = 0.35;
      coaster.add(brace);
    }
  }
  // Вагончики
  const train = [];
  for (let k = 0; k < 4; k++) {
    const c = group(block(1.0, 0.55, 0.8, k === 0 ? '#c94f3d' : '#f2c230', 0, -0.1, 0), block(1.0, 0.1, 0.8, '#2b2d31', 0, -0.2, 0));
    coaster.add(c);
    train.push(c);
  }
  coaster.position.set(8, 0, -26);
  root.add(coaster);
  boxC(7, 33, -27, -15);
  animated.push((t) => {
    train.forEach((c, k) => {
      const u = ((t * 0.07) - k * 0.012 + 10) % 1;
      const p = track.getPointAt(u);
      const tan = track.getTangentAt(u);
      c.position.copy(p).add(new THREE.Vector3(0, 0.35, 0));
      c.lookAt(p.clone().add(tan));
      c.rotateY(-Math.PI / 2);
    });
  });
  const coasterSign = sign('THE CYCLONE', 6, 1.0, { bg: '#c94f3d', fg: '#ffffff' });
  coasterSign.position.set(20, 5.2, -14.4);
  root.add(coasterSign);

  // ---------- Улица Серф-авеню: павильоны, вывески ----------
  const stalls = [
    { x: -6, name: 'FAMOUS HOT DOGS', bg: '#2f7a3a', fg: '#f2c230' },
    { x: 4, name: 'ARCADE', bg: '#5b2a86', fg: '#ff7aa8', neon: true },
    { x: 14, name: 'ICE CREAM', bg: '#f29ac0', fg: '#ffffff' },
    { x: 34, name: 'CLAM BAR', bg: '#3a6ea5', fg: '#ffffff' },
    { x: 44, name: 'GAMES', bg: '#e07a5f', fg: '#ffffff', neon: true },
    { x: -40, name: 'SOUVENIRS', bg: '#f2c230', fg: '#2b2d31' },
  ];
  stalls.forEach((st) => {
    root.add(block(8.6, 4, 5, pick(r, ['#f6f3ec', '#f2e3c6', '#e8d9f2', '#d9ecf2']), st.x, 0, -9));
    root.add(block(8.8, 0.3, 5.2, '#2b2d31', st.x, 4, -9));
    for (let i = 0; i < 11; i++) {
      const a = box(0.8, 0.06, 1.4, i % 2 ? '#f6f3ec' : st.bg, st.x - 4 + i * 0.8, 3.3, -5.9);
      a.rotation.x = -0.35;
      root.add(a);
    }
    const sg = sign(st.name, 7, 0.9, { bg: st.bg, fg: st.fg, w: 1024, h: 128, font: 'bold 80px Nunito, sans-serif' });
    sg.position.set(st.x, 4.7, -6.35);
    root.add(sg);
    if (st.neon) root.add(lightPool(st.x, -5.2, 1.3));
    root.add(block(7, 1.0, 0.6, '#c9a27e', st.x, 0, -6.4));
    boxC(st.x - 4.4, st.x + 4.4, -11.6, -6.0);
  });

  // Касса колеса обозрения
  root.add(block(2.4, 2.4, 1.6, '#e94f6a', -24, 0, -6.6));
  root.add(block(2.6, 0.2, 1.8, '#f6f3ec', -24, 2.4, -6.6));
  const wSign = sign('WONDER WHEEL', 3.4, 0.6, { bg: '#e94f6a', fg: '#ffffff' });
  wSign.position.set(-24, 3.0, -5.7);
  root.add(wSign);
  boxC(-25.3, -22.7, -7.5, -5.7);

  // Тротуар перед павильонами
  root.add(block(140, 0.08, 3.2, wetMat('#c9c2b6'), 0, 0, -4.3, { shadow: false }));

  // Parachute Jump — знаменитая красная вышка Кони-Айленда
  const pj = new THREE.Group();
  const red = '#d4573f';
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2;
    const leg = box(0.4, 58, 0.4, red, Math.cos(a) * 4, 29, Math.sin(a) * 4);
    leg.rotation.x = Math.sin(a) * 0.05;
    leg.rotation.z = -Math.cos(a) * 0.05;
    pj.add(leg);
  }
  for (let y = 6; y < 56; y += 6) pj.add(new THREE.Mesh(new THREE.TorusGeometry(4 - y * 0.02, 0.15, 4, 6), mat(red)));
  const crown = new THREE.Mesh(new THREE.TorusGeometry(10, 0.35, 6, 24), glowMat(red, '#ff8a6a', 1.2));
  crown.rotation.x = Math.PI / 2;
  crown.position.y = 56;
  pj.add(crown);
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2;
    const arm = box(10, 0.3, 0.3, red, Math.cos(a) * 5, 57, Math.sin(a) * 5);
    arm.rotation.y = -a;
    pj.add(arm);
  }
  pj.position.set(52, 0, -40);
  root.add(pj);

  // Дома на заднем плане
  for (let i = 0; i < 22; i++) {
    const w = 7 + r() * 6, h = 10 + r() * 26;
    root.add(block(w, h, 8, pick(r, ['#c9a27e', '#b0664f', '#d9c7a8', '#9fb7c9', '#e8d9c4']), -80 + i * 8 + r() * 2, 0, -46 - r() * 8, { shadow: false }));
  }
  // Деревья вдоль улицы
  [-58, -34, -16, 24, 40, 58].forEach((x) => {
    const tr = group(cyl(0.15, 0.2, 2.4, PAL.trunk, x, 0, -16, 7), sphere(1.4, pick(r, PAL.leaf), x, 3.2, -16, 1, { opts: { wave: 1 } }));
    root.add(tr);
  });

  // Метро «Coney Island – Stillwell Av»
  const sub = subwayEntrance(-52, -8);
  root.add(sub);
  boxC(-53.3, -50.7, -10.1, -5.9);
  const termSign = sign('CONEY ISLAND – STILLWELL AV', 9, 0.8, { bg: '#1f2226', fg: '#ffffff', w: 1024, h: 96, font: 'bold 56px Nunito, sans-serif' });
  termSign.position.set(-52, 4.2, -10.5);
  root.add(termSign);

  // Спасательная вышка
  const tower = group(
    ...[[-0.8, -0.8], [0.8, -0.8], [-0.8, 0.8], [0.8, 0.8]].map(([x, z]) => cyl(0.08, 0.1, 3, '#f6f3ec', x, 0, z, 6)),
    block(2.2, 0.15, 2.2, '#f6f3ec', 0, 3, 0),
    block(2.0, 1.3, 2.0, '#e07a5f', 0, 3.15, 0),
    block(2.4, 0.15, 2.4, '#f6f3ec', 0, 4.45, 0),
  );
  const flag = mesh(new THREE.PlaneGeometry(1, 0.6), mat('#f2c230', { side: THREE.DoubleSide, wave: 1 }), { shadow: false });
  flag.position.set(0.5, 5.6, 0);
  tower.add(cyl(0.04, 0.04, 1.8, '#9aa0a6', 0, 4.5, 0, 5), flag);
  tower.position.set(10, 0, 15);
  root.add(tower);
  boxC(9, 11, 14, 16);

  // Зонтики и полотенца
  for (let i = 0; i < 16; i++) {
    const x = -55 + i * 7 + r() * 3, z = 10 + r() * 12;
    if (Math.abs(x - 10) < 3 && Math.abs(z - 15) < 3) continue;
    const c1 = pick(r, ['#e07a5f', '#5b7fb3', '#f2c230', '#7fb38a', '#b0577a']);
    const u = mesh(new THREE.ConeGeometry(1.5, 0.6, 8), c1);
    u.position.set(x, 2.3, z);
    root.add(u, cyl(0.04, 0.04, 2.3, '#f6f3ec', x, 0, z, 5));
    const towel = block(1.0, 0.03, 1.9, pick(r, ['#f6f3ec', '#f29ac0', '#7fd1c1', '#f2c230']), x + 1.3, 0.01, z + 0.4, { shadow: false });
    towel.rotation.y = r();
    root.add(towel);
    circC(x, z, 0.2);
  }
  // Пирс
  root.add(block(4, 0.4, 30, '#a97d50', 46, 0.2, 38, { shadow: false }));
  for (let z = 24; z < 54; z += 3) [-1.8, 1.8].forEach((dx) => root.add(cyl(0.18, 0.18, 2.4, '#7a5d48', 46 + dx, -1.8, z, 6)));

  // Скамейки, фонари на променаде
  [-48, -20, 8, 36, 60].forEach((x) => { root.add(bench(x, 5.4, Math.PI)); boxC(x - 1.1, x + 1.1, 5.1, 5.8); });
  [-56, -36, -12, 12, 36, 56].forEach((x) => { root.add(streetLamp(x, -1.8, 0)); circC(x, -1.8, 0.25); });
  root.add(trashCan(-10, 5.6)); circC(-10, 5.6, 0.4);

  // Чайки
  const gulls = [];
  for (let i = 0; i < 7; i++) {
    const gl = new THREE.Group();
    const b = sphere(0.2, '#f6f3ec', 0, 0, 0, 1);
    b.scale.set(1, 0.7, 1.6);
    const w1 = box(1.1, 0.04, 0.3, '#d9dde2', -0.55, 0.05, 0);
    const w2 = box(1.1, 0.04, 0.3, '#d9dde2', 0.55, 0.05, 0);
    gl.add(b, w1, w2);
    gl.userData = { w1, w2, a: r() * 6, rad: 8 + r() * 14, cx: -30 + r() * 60, cz: 18 + r() * 12, h: 7 + r() * 5 };
    root.add(gl);
    gulls.push(gl);
  }
  animated.push((t) => {
    gulls.forEach((g) => {
      const u = g.userData;
      const a = u.a + t * 0.25;
      g.position.set(u.cx + Math.cos(a) * u.rad, u.h + Math.sin(t * 1.3 + u.a) * 0.6, u.cz + Math.sin(a) * u.rad * 0.5);
      g.rotation.y = -a;
      u.w1.rotation.z = Math.sin(t * 6 + u.a) * 0.5;
      u.w2.rotation.z = -Math.sin(t * 6 + u.a) * 0.5;
    });
  });

  // Прохожие
  const crowd = createCrowd({
    lanes: [{ z: 0.5, x0: -62, x1: 62, y: BOARD_Y }, { z: 3.5, x0: -62, x1: 62, y: BOARD_Y }, { z: -3.5, x0: -60, x1: 60 }, { z: 20, x0: -50, x1: 50 }],
    count: 14, seed: 314,
  });
  root.add(crowd.group);

  function update(dt, t, playerPos) {
    animated.forEach((fn) => fn(t, dt));
    crowd.update(dt, t, playerPos);
    // ночью колесо и горки светятся ярче — делает time.js через glowMat
    void WORLD;
  }

  return {
    id: 'coney',
    root,
    crowd,
    colliders,
    bounds: { minX: -60, maxX: 60, minZ: -5.6, maxZ: 25 },
    heightAt: (x, z) => (z > -2.5 && z < 6.5 ? BOARD_Y : 0),
    spots: { start: [-48, -3], subway: [-49.5, -5.2] },
    cam: { offset: [0, 11, 20], look: [0, 3.5, -5] },
    update,
  };
}
