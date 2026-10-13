// Карта «Манхэттен»: авеню с небоскрёбами, светящиеся экраны и площадь как на Таймс-сквер.
import * as THREE from 'three';
import { mat, mesh, box, block, cyl, sphere, group, sign, rng, pick, PAL, glowMat, lightPool, wetMat } from '../kit.js';
import { tree, streetLamp, hydrant, trashCan, bench, car, subwayEntrance } from '../props.js';
import { createCrowd } from '../crowd.js';

const SIDEWALK_Y = 0.08;

// Фасад небоскрёба: сетка окон. Ночью часть окон светится (emissiveMap)
function facadeTextures(r, glass, frame) {
  const W = 128, H = 256;
  const make = (night) => {
    const c = document.createElement('canvas');
    c.width = W; c.height = H;
    const g = c.getContext('2d');
    g.fillStyle = night ? '#000000' : frame;
    g.fillRect(0, 0, W, H);
    for (let y = 0; y < 8; y++) {
      for (let x = 0; x < 4; x++) {
        if (night) {
          if (r() < 0.38) { g.fillStyle = pick(r, ['#ffd98a', '#ffe9b8', '#cfe3ff']); g.fillRect(x * 32 + 5, y * 32 + 6, 22, 21); }
        } else {
          g.fillStyle = glass;
          g.fillRect(x * 32 + 5, y * 32 + 6, 22, 21);
          g.fillStyle = 'rgba(255,255,255,0.18)';
          g.fillRect(x * 32 + 5, y * 32 + 6, 8, 21);
        }
      }
    }
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    return t;
  };
  return { day: make(false), night: make(true) };
}

function tower(r, w, h, d, palette) {
  const { glass, frame } = palette;
  const tex = facadeTextures(r, glass, frame);
  tex.day.repeat.set(w / 5, h / 9);
  tex.night.repeat.copy(tex.day.repeat);
  const facade = glowMat('#ffffff', '#ffffff', 2.2, { map: tex.day, emissiveMap: tex.night, flatShading: false, roughness: 0.25, metalness: 0.35 });
  const roof = mat('#9c9a96');
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), [facade, facade, roof, roof, facade, facade]);
  m.castShadow = m.receiveShadow = true;
  return m;
}

// Яркий рекламный экран — светится и днём, и ночью
function billboard(lines, w, h, { bg, fg, accent } = {}) {
  const c = document.createElement('canvas');
  c.width = 512; c.height = Math.round(512 * (h / w));
  const g = c.getContext('2d');
  const grad = g.createLinearGradient(0, 0, c.width, c.height);
  grad.addColorStop(0, bg);
  grad.addColorStop(1, accent || bg);
  g.fillStyle = grad;
  g.fillRect(0, 0, c.width, c.height);
  g.fillStyle = fg;
  g.textAlign = 'center';
  g.textBaseline = 'middle';
  const size = Math.min(c.height / (lines.length + 0.6), 120);
  lines.forEach((line, i) => {
    g.font = `900 ${i === 0 ? size : size * 0.62}px Nunito, sans-serif`;
    g.fillText(line, c.width / 2, (c.height / (lines.length + 1)) * (i + 1));
  });
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  // Экран светится сам (toneMapped: false — ярче единицы, поэтому красиво бликует bloom)
  const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ map: t, toneMapped: false, color: new THREE.Color(1.35, 1.35, 1.35) }));
  const frameBox = box(w + 0.3, h + 0.3, 0.2, '#2b2d31', 0, 0, -0.12, { shadow: false });
  return group(frameBox, m);
}

function storefront(r, w, { name, bg = '#c94f3d', fg = '#ffffff', awning, neon = false }) {
  const g = new THREE.Group();
  g.add(block(w - 0.6, 3.2, 0.1, '#5a6f82', 0, 0, 0.06, { shadow: false }));
  g.add(block(1.3, 2.6, 0.12, '#2f3b52', -w / 2 + 1.6, 0, 0.1));
  if (awning) {
    for (let i = 0; i < Math.round(w / 0.8); i++) {
      const s = box(0.8, 0.06, 1.5, awning[i % 2], -w / 2 + 0.4 + i * 0.8, 3.6, 0.75);
      s.rotation.x = -0.3;
      g.add(s);
    }
  }
  if (neon) {
    const n = billboard([name], Math.min(w - 1.5, 5.5), 1.0, { bg: '#1f2226', fg, accent: '#2b2d31' });
    n.position.set(0, 4.6, 0.25);
    g.add(n);
  } else {
    const s = sign(name, Math.min(w - 1.5, 6), 0.7, { bg, fg, w: 768, h: 96, font: 'bold 64px Nunito, sans-serif' });
    s.position.set(0, 4.5, 0.12);
    g.add(s);
  }
  return g;
}

export function buildManhattan() {
  const r = rng(42);
  const root = new THREE.Group();
  const colliders = [];
  const boxC = (minX, maxX, minZ, maxZ) => colliders.push({ type: 'box', minX, maxX, minZ, maxZ });
  const circC = (x, z, rad) => colliders.push({ type: 'circle', x, z, r: rad });
  const animated = [];

  // ---------- Земля ----------
  const ground = mesh(new THREE.PlaneGeometry(220, 140), '#bdb6ab', { shadow: false });
  ground.rotation.x = -Math.PI / 2;
  ground.position.set(0, -0.01, 10);
  root.add(ground);
  // Авеню (4 полосы)
  root.add(block(140, 0.02, 10, wetMat('#666d78'), 0, -0.01, 0, { shadow: false }));
  for (let x = -68; x < 70; x += 4) {
    root.add(block(2, 0.01, 0.12, PAL.white, x, 0.012, -2.5, { shadow: false }));
    root.add(block(2, 0.01, 0.12, PAL.white, x, 0.012, 2.5, { shadow: false }));
  }
  root.add(block(140, 0.01, 0.12, PAL.line, 0, 0.012, -0.1, { shadow: false }));
  root.add(block(140, 0.01, 0.12, PAL.line, 0, 0.012, 0.1, { shadow: false }));
  const CROSS = [-22, 22];
  CROSS.forEach((cx) => {
    for (let i = 0; i < 9; i++) root.add(block(0.55, 0.01, 9.4, PAL.white, cx - 3 + i * 0.75, 0.014, 0, { shadow: false }));
    root.add(block(0.25, 0.01, 4.6, PAL.white, cx - 4, 0.014, -2.6, { shadow: false }));
    root.add(block(0.25, 0.01, 4.6, PAL.white, cx + 4, 0.014, 2.6, { shadow: false }));
  });
  // Тротуары
  root.add(block(140, 0.1, 5, wetMat('#d4cfc6'), 0, -0.02, -7.5));
  root.add(block(140, 0.14, 0.25, PAL.curb, 0, 0, -5));
  root.add(block(140, 0.14, 0.25, PAL.curb, 0, 0, 5));
  // Площадь — плитка ёлочкой в красноватых тонах
  root.add(block(140, 0.1, 24, wetMat('#d9c4bb'), 0, -0.02, 17));
  for (let i = 0; i < 160; i++) {
    const t = block(1.9, 0.02, 1.9, pick(r, ['#cfb6ac', '#e2d0c8', '#d4bdb3']), -60 + (i % 32) * 4 + (Math.floor(i / 32) % 2) * 2, 0.08, 6.5 + Math.floor(i / 32) * 4, { shadow: false });
    root.add(t);
  }

  // ---------- Небоскрёбы северной стороны ----------
  const palettes = [
    { glass: '#8fb2c9', frame: '#d9d4cc' }, { glass: '#9fc1d1', frame: '#b9b2a6' }, { glass: '#7f9fb8', frame: '#e6dfd3' },
    { glass: '#a7bfcf', frame: '#c99a78' }, { glass: '#86a8b8', frame: '#8c8a86' },
  ];
  const shops = {
    '-36': { name: 'PHARMACY', bg: '#3a6ea5' },
    '-24': { name: 'BAGELS', bg: '#d08a3c', awning: ['#f6f3ec', '#d08a3c'] },
    '-12': { name: "SAL'S PIZZA", bg: '#3e7d4f', awning: ['#c94f3d', '#f6f3ec'], fg: '#ffffff' },
    '0': { name: 'THEATER', neon: true, fg: '#f2c230', marquee: true },
    '12': { name: 'SOUVENIRS', bg: '#b0577a' },
    '24': { name: 'DINER', neon: true, fg: '#ff7aa8', diner: true },
    '36': { name: 'BANK', bg: '#2f3b52' },
  };
  for (let x = -48; x <= 48; x += 12) {
    const sp = shops[String(x)] || { name: 'DELI', bg: '#c94f3d', awning: ['#3e6b4f', '#f6f3ec'] };
    const h = 22 + r() * 30;
    const d = 12;
    const pal = pick(r, palettes);
    // Нижний этаж (магазин) + башня + уступ сверху
    root.add(block(11.6, 5.2, d, '#a59c90', x, 0, -10 - d / 2));
    const t = tower(r, 11.2, h, d - 1, pal);
    t.position.set(x, 5.2 + h / 2, -10.5 - d / 2);
    root.add(t);
    if (r() < 0.6) {
      const top = tower(r, 7, 8 + r() * 10, 7, pal);
      top.position.set(x, 5.2 + h + top.geometry.parameters.height / 2, -11 - d / 2);
      root.add(top);
    }
    root.add(block(11.8, 0.4, d + 0.2, '#8c8378', x, 5.0, -10 - d / 2));
    const s = storefront(r, 11.2, sp);
    s.position.set(x, SIDEWALK_Y, -10);
    root.add(s);
    if (sp.marquee) {
      // Козырёк театра с лампочками
      root.add(block(9, 1.1, 2.2, '#2b2d31', x, 3.8, -9));
      const bulbs = glowMat('#fff2c4', '#ffd98a', 1.6);
      for (let i = 0; i < 22; i++) root.add(box(0.14, 0.14, 0.14, bulbs, x - 4.4 + i * 0.42, 4.95, -7.9, { shadow: false }));
      const mq = billboard(['TONIGHT: THE LION KING'], 8, 0.8, { bg: '#f6f3ec', fg: '#2b2d31' });
      mq.position.set(x, 4.35, -7.85);
      root.add(mq);
    }
    if (sp.diner) {
      // Хромированный дайнер
      root.add(block(10.6, 0.5, 0.3, '#d9dde2', x, 0.1, -9.85));
      root.add(block(10.6, 0.3, 0.3, '#d4573f', x, 3.25, -9.85));
    }
  }
  boxC(-70, 70, -30, -10);

  // Рекламные экраны (как на Таймс-сквер)
  const ads = [
    { x: -12, y: 12, w: 8, h: 5, lines: ['I ♥ NY'], bg: '#ffffff', fg: '#d4573f', accent: '#f6f3ec' },
    { x: 0, y: 15, w: 10, h: 6, lines: ['BROADWAY', 'the musical'], bg: '#5b2a86', fg: '#f2c230', accent: '#c94f3d' },
    { x: 12, y: 11, w: 8, h: 6, lines: ['BIG APPLE', 'learn English!'], bg: '#e07a5f', fg: '#ffffff', accent: '#f2a03c' },
    { x: -2, y: 24, w: 12, h: 4.5, lines: ['WELCOME TO NYC'], bg: '#2f7fd1', fg: '#ffffff', accent: '#4fa3a5' },
    { x: 24, y: 13, w: 6, h: 8, lines: ['SODA', 'ice cold'], bg: '#d4573f', fg: '#ffffff', accent: '#8a2a2a' },
    { x: -24, y: 12, w: 7, h: 5, lines: ['SALE', '50% OFF'], bg: '#f2c230', fg: '#2b2d31', accent: '#f29a3c' },
  ];
  const screens = [];
  for (const a of ads) {
    const b = billboard(a.lines, a.w, a.h, a);
    b.position.set(a.x, a.y, -9.85);
    root.add(b);
    screens.push(b);
  }
  // Бегущая строка новостей
  const tickerC = document.createElement('canvas');
  tickerC.width = 2048; tickerC.height = 64;
  const tg = tickerC.getContext('2d');
  tg.fillStyle = '#111'; tg.fillRect(0, 0, 2048, 64);
  tg.fillStyle = '#ff5a3c'; tg.font = 'bold 44px Nunito, sans-serif'; tg.textBaseline = 'middle';
  tg.fillText('  BREAKING: NEW YORKERS LOVE PIZZA  •  WEATHER: SUNNY, 75°F  •  SUBWAY: L TRAIN RUNNING ON TIME  •  YANKEES WIN!  •', 0, 34);
  const tickerTex = new THREE.CanvasTexture(tickerC);
  tickerTex.wrapS = THREE.RepeatWrapping;
  tickerTex.repeat.set(0.5, 1);
  tickerTex.colorSpace = THREE.SRGBColorSpace;
  const ticker = new THREE.Mesh(new THREE.PlaneGeometry(22, 0.9), new THREE.MeshBasicMaterial({ map: tickerTex }));
  ticker.position.set(0, 8.4, -9.8);
  root.add(ticker);
  animated.push((t) => { tickerTex.offset.x = (t * 0.05) % 1; });

  // Эмпайр-стейт-билдинг вдалеке
  const esb = group(
    block(14, 40, 14, '#c9c2b6', 0, 0, 0, { shadow: false }),
    block(10, 20, 10, '#cfc8bc', 0, 40, 0, { shadow: false }),
    block(6, 12, 6, '#d5cec2', 0, 60, 0, { shadow: false }),
    block(3, 8, 3, '#dbd4c8', 0, 72, 0, { shadow: false }),
    cyl(0.3, 0.6, 12, '#dbd4c8', 0, 80, 0, 8, { shadow: false }),
  );
  esb.position.set(20, 0, -80);
  root.add(esb);
  for (let i = 0; i < 20; i++) root.add(block(8 + r() * 6, 30 + r() * 50, 8, pick(r, ['#c9c2b6', '#bdb6ab', '#d0c9be']), -90 + i * 9.5, 0, -45 - r() * 20, { shadow: false }));

  // ---------- Тротуар и улица ----------
  [-42, -30, -6, 6, 30, 42].forEach((x) => { root.add(streetLamp(x, -5.6, Math.PI)); circC(x, -5.6, 0.25); });
  [-36, -12, 12, 36].forEach((x) => { root.add(streetLamp(x, 5.6, 0)); circC(x, 5.6, 0.25); });
  root.add(hydrant(-17, -5.8)); circC(-17, -5.8, 0.3);
  root.add(trashCan(9, -6)); circC(9, -6, 0.4);
  root.add(trashCan(-4, 6)); circC(-4, 6, 0.4);

  // Светофоры у переходов
  const signals = [];
  CROSS.forEach((cx) => {
    [[-4.6, -5.6], [4.6, 5.6]].forEach(([dx, z]) => {
      const pole = group(cyl(0.08, 0.1, 4.2, PAL.iron, 0, 0, 0, 8), block(0.5, 1.3, 0.45, '#2b2d31', 0, 3.6, 0.1));
      const red = sphere(0.14, '#5a2020', 0, 4.6, 0.36, 1, { shadow: false });
      const green = sphere(0.14, '#1f4a2a', 0, 4.0, 0.36, 1, { shadow: false });
      red.material = new THREE.MeshBasicMaterial({ color: '#ff4a3c' });
      green.material = new THREE.MeshBasicMaterial({ color: '#3cff7a' });
      pole.add(red, green);
      pole.position.set(cx + dx, 0, z);
      pole.rotation.y = z < 0 ? 0 : Math.PI;
      root.add(pole);
      circC(cx + dx, z, 0.25);
      signals.push({ red, green });
    });
  });

  // Пар из люка — классика Нью-Йорка
  const steam = [];
  const manhole = cyl(0.55, 0.55, 0.03, '#4b4f55', -6, 0, -1.25, 16, { shadow: false });
  root.add(manhole);
  const steamMat = new THREE.MeshBasicMaterial({ color: '#ffffff', transparent: true, opacity: 0.5, depthWrite: false });
  for (let i = 0; i < 10; i++) {
    const p = new THREE.Mesh(new THREE.IcosahedronGeometry(0.5, 1), steamMat.clone());
    p.userData.t = i / 10;
    root.add(p);
    steam.push(p);
  }
  // Стойка с оранжево-белой трубой над люком
  const stack = group(cyl(0.3, 0.3, 1.6, '#f29a3c', 0, 0, 0, 10), cyl(0.31, 0.31, 0.25, '#f6f3ec', 0, 0.5, 0, 10), cyl(0.31, 0.31, 0.25, '#f6f3ec', 0, 1.1, 0, 10));
  stack.position.set(-6, 0, -1.25);
  root.add(stack);
  circC(-6, -1.25, 0.5);
  animated.push((t, dt) => {
    steam.forEach((p) => {
      p.userData.t = (p.userData.t + dt * 0.25) % 1;
      const k = p.userData.t;
      p.position.set(-6 + Math.sin(k * 6 + p.id) * 0.3 * k, 1.7 + k * 4, -1.25 + k * 0.8);
      p.scale.setScalar(0.4 + k * 1.6);
      p.material.opacity = 0.45 * (1 - k);
    });
  });

  // ---------- Площадь ----------
  // Красные ступени (как TKTS на Таймс-сквер)
  for (let i = 0; i < 8; i++) {
    root.add(block(10, 0.4 + i * 0.4, 0.9, i % 2 ? '#d4573f' : '#c94f3d', 4, 0, 17.5 + i * 0.9));
  }
  root.add(block(10.4, 0.15, 7.5, '#f6d1c8', 4, 0, 20.6, { shadow: false }));
  boxC(-1.1, 9.1, 17, 24.8);

  // Столики с зонтиками
  [[-14, 10], [-9.5, 13], [-15, 15.5], [16, 10.5]].forEach(([x, z]) => {
    root.add(group(cyl(0.6, 0.6, 0.06, '#5b7fb3', x, 0.75, z, 12), cyl(0.06, 0.06, 0.75, PAL.iron, x, 0, z, 6)));
    [[0.9, 0], [-0.9, 0]].forEach(([dx]) => root.add(group(block(0.45, 0.06, 0.45, '#5b7fb3', x + dx, 0.45, z), cyl(0.04, 0.04, 0.45, PAL.iron, x + dx, 0, z, 5))));
    const umb = mesh(new THREE.ConeGeometry(1.4, 0.5, 8), '#f2c230');
    umb.position.set(x, 2.3, z);
    root.add(umb, cyl(0.04, 0.04, 2.2, PAL.iron, x, 0, z, 5));
    circC(x, z, 1.2);
  });
  // Кадки с деревьями
  [[-30, 8.5], [-20, 20], [20, 20.5], [30, 8.5], [-36, 18], [36, 17]].forEach(([x, z]) => {
    root.add(block(2.2, 0.7, 2.2, '#8c8378', x, 0, z));
    root.add(tree(r, x, z, 0.9));
    boxC(x - 1.15, x + 1.15, z - 1.15, z + 1.15);
  });
  [[-28, 13.5, 0], [26, 14, Math.PI]].forEach(([x, z, ry]) => { root.add(bench(x, z, ry)); boxC(x - 1.1, x + 1.1, z - 0.4, z + 0.4); });

  // Тележка с кренделями
  const pretzel = group(
    block(2.2, 1.0, 1.1, '#3a6ea5', 0, 0.3, 0),
    block(2.25, 0.08, 1.15, '#aeb2b8', 0, 1.3, 0),
    ...[[-0.6], [0], [0.6]].map(([dx]) => { const p = mesh(new THREE.TorusGeometry(0.16, 0.06, 6, 12), '#b5763c'); p.position.set(dx, 1.45, 0.1); p.rotation.x = -1.2; return p; }),
    cyl(0.04, 0.04, 2.0, '#9aa0a6', 0, 1.35, 0, 6),
  );
  const pUmb = mesh(new THREE.ConeGeometry(1.5, 0.55, 8), '#f6f3ec');
  pUmb.position.set(0, 3.5, 0);
  pretzel.add(pUmb);
  const pSign = sign('PRETZELS', 1.8, 0.4, { bg: '#f2c230', fg: '#2b2d31' });
  pSign.position.set(0, 0.8, 0.57);
  pretzel.add(pSign);
  pretzel.position.set(14, 0, 14.5);
  root.add(pretzel);
  boxC(12.8, 15.2, 13.9, 15.1);

  // Вход в метро на площади
  const sub = subwayEntrance(-24, 8);
  sub.rotation.y = Math.PI / 2;
  root.add(sub);
  boxC(-26.1, -21.9, 6.7, 9.3);

  // Пятна света от неона на площади ночью
  [[-12, 7], [0, 7], [12, 7], [24, 7]].forEach(([x, z]) => root.add(lightPool(x, z, 1.6)));

  // ---------- Машины ----------
  const lanes = [{ z: -3.75, dir: -1 }, { z: -1.25, dir: -1 }, { z: 1.25, dir: 1 }, { z: 3.75, dir: 1 }];
  const traffic = [];
  for (let i = 0; i < 10; i++) {
    const lane = lanes[i % 4];
    const taxi = r() < 0.6;
    const m = car(pick(r, ['#e8c7a0', '#9fb7d9', '#d9a0a0', '#c7d9a7', '#f6f3ec', '#3a3a3a']), { taxi });
    m.rotation.y = lane.dir > 0 ? 0 : Math.PI;
    root.add(m);
    traffic.push({ mesh: m, x: -60 + i * 13 + r() * 4, z: lane.z, dir: lane.dir, speed: 6 + r() * 3 });
  }

  // ---------- Прохожие (туристы!) ----------
  const crowd = createCrowd({
    lanes: [
      { z: -7.0, x0: -44, x1: 44, y: SIDEWALK_Y }, { z: -8.2, x0: -44, x1: 44, y: SIDEWALK_Y },
      { z: 7.5, x0: -20, x1: 40, y: 0.08 }, { z: 11.5, x0: -40, x1: 40, y: 0.08 }, { z: 24.8, x0: -40, x1: 40, y: 0.08 },
    ],
    count: 16,
    seed: 77,
  });
  root.add(crowd.group);

  let signalT = 0;
  function update(dt, t, playerPos) {
    animated.forEach((fn) => fn(t, dt));
    crowd.update(dt, t, playerPos);
    // Светофор: 10 с зелёный для машин, 5 с красный
    signalT = (signalT + dt) % 15;
    const carsGo = signalT < 10;
    signals.forEach((s) => { s.red.visible = !carsGo; s.green.visible = carsGo; });
    for (const c of traffic) {
      const ahead = (playerPos.x - c.x) * c.dir;
      const blockedByPlayer = Math.abs(playerPos.z - c.z) < 1.5 && ahead > 0 && ahead < 6;
      // Стоп-линия перед переходом
      const stopAt = CROSS.map((cx) => cx - c.dir * 4.6).find((sx) => { const dist = (sx - c.x) * c.dir; return dist > 0 && dist < 5; });
      const redStop = !carsGo && stopAt !== undefined;
      // Не наезжаем на машину впереди
      const carAhead = traffic.some((o) => o !== c && o.z === c.z && (o.x - c.x) * c.dir > 0 && (o.x - c.x) * c.dir < 5.5);
      const want = blockedByPlayer || redStop || carAhead ? 0 : c.speed;
      c.cur = THREE.MathUtils.lerp(c.cur ?? c.speed, want, dt * 3);
      c.x += c.dir * c.cur * dt;
      if (c.x > 70) c.x = -70;
      if (c.x < -70) c.x = 70;
      c.mesh.position.set(c.x, 0, c.z);
    }
  }

  return {
    id: 'manhattan',
    root,
    crowd,
    colliders,
    bounds: { minX: -42, maxX: 42, minZ: -9.3, maxZ: 26 },
    heightAt: (x, z) => (z < -5 || z > 5 ? SIDEWALK_Y : 0),
    spots: { start: [-21, 10.8], subway: [-21, 8] },
    cam: { offset: [0, 9.5, 19], look: [0, 4.5, -6] },
    update,
  };
}
