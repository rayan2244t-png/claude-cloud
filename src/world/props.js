// Предметы городского окружения Бруклина.
import * as THREE from 'three';
import { mat, mesh, box, block, rbox, cyl, sphere, group, sign, PAL, pick, glowMat, lightPool } from './kit.js';

// Часть окон вечером загорается тёплым светом
const LIT_WINDOW = glowMat(PAL.glass, '#ffcf7a', 1.6, { roughness: 0.15, metalness: 0.3 });
const GLASS = { shadow: false, opts: { roughness: 0.12, metalness: 0.35 } };
const LAMP_BULB = glowMat('#fff2c4', '#ffe7a3', 4);
const HEADLIGHT = glowMat('#fff6d6', '#fff2c0', 3.5);
const TAILLIGHT = glowMat('#d4573f', '#ff3b2f', 3);

// Дом-браунстоун с крыльцом (stoop) — визитная карточка Бруклина
export function brownstone(r, { width = 7.6, floors = 4, color, door = '#5b3a2e', fireEscape = false, waterTower = false, windowBoxes = false } = {}) {
  const g = new THREE.Group();
  const floorH = 2.6;
  const base = 1.4; // цокольный этаж приподнят
  const h = base + floors * floorH;
  const depth = 8;
  color ||= pick(r, PAL.brick);
  const trim = '#efe6d6';

  g.add(block(width, h, depth, color, 0, 0, -depth / 2, { receive: true }));
  // Цоколь и карниз
  g.add(block(width + 0.1, base, depth + 0.1, '#8b7d6e', 0, 0, -depth / 2));
  g.add(block(width + 0.5, 0.45, depth + 0.5, trim, 0, h, -depth / 2));
  g.add(block(width + 0.7, 0.18, depth + 0.7, '#d9cdb9', 0, h + 0.45, -depth / 2));
  for (let i = -1; i <= 1; i++) g.add(block(0.25, 0.4, 0.3, trim, i * (width / 3), h - 0.4, 0.1));

  // Окна
  const doorX = -width / 2 + 1.6;
  for (let f = 0; f < floors; f++) {
    const y = base + f * floorH + 0.75;
    for (let i = 0; i < 3; i++) {
      const x = -width / 2 + 1.6 + i * ((width - 3.2) / 2);
      if (f === 0 && i === 0) continue; // место для двери
      g.add(box(1.0, 1.45, 0.12, PAL.frame, x, y + 0.72, 0.03));
      g.add(box(0.82, 1.27, 0.1, r() < 0.45 ? LIT_WINDOW : mat(PAL.glass, GLASS.opts), x, y + 0.72, 0.08, { shadow: false }));
      g.add(box(0.06, 1.27, 0.12, PAL.frame, x, y + 0.72, 0.1, { shadow: false }));
      g.add(box(1.2, 0.14, 0.3, trim, x, y + 1.52, 0.1));
      g.add(box(1.15, 0.1, 0.32, trim, x, y - 0.05, 0.12));
      if (windowBoxes && f === 0) {
        g.add(box(1.0, 0.25, 0.35, '#7a5a40', x, y + 0.08, 0.3));
        for (let k = 0; k < 4; k++)
          g.add(sphere(0.12, pick(r, ['#e07a5f', '#f2c230', '#f6f3ec', '#d98bb3']), x - 0.35 + k * 0.23, y + 0.28, 0.32, 0));
      }
    }
  }

  // Дверь с аркой
  const dy = base;
  g.add(box(1.25, 2.3, 0.15, trim, doorX, dy + 1.15, 0.05));
  g.add(box(1.0, 2.1, 0.12, door, doorX, dy + 1.05, 0.1));
  g.add(sphere(0.06, '#e4c36a', doorX + 0.32, dy + 1.05, 0.2, 0));
  g.add(box(1.4, 0.2, 0.5, trim, doorX, dy + 2.4, 0.15));
  // Номер дома
  // Крыльцо (лестница вниз к тротуару)
  const steps = 6;
  const stepD = 0.42;
  for (let s = 0; s < steps; s++) {
    const sy = base - (s + 1) * (base / steps);
    g.add(block(1.6, sy + base / steps, stepD, '#9a8a78', doorX, 0, 0.3 + s * stepD + stepD / 2));
  }
  g.add(block(1.8, base, 0.6, '#9a8a78', doorX, 0, 0.3));
  // Перила
  [-0.85, 0.85].forEach((dx) => {
    for (let s = 0; s <= steps; s += 2) {
      const sz = 0.3 + s * stepD;
      const sy = base - s * (base / steps);
      g.add(cyl(0.035, 0.035, 0.9, PAL.iron, doorX + dx, sy, sz, 6));
    }
    const rail = mesh(new THREE.CylinderGeometry(0.04, 0.04, Math.hypot(steps * stepD, base), 6), PAL.iron);
    rail.position.set(doorX + dx, base / 2 + 0.9, 0.3 + (steps * stepD) / 2);
    rail.rotation.x = Math.atan2(steps * stepD, base);
    g.add(rail);
  });

  // Пожарная лестница — классика Нью-Йорка
  if (fireEscape) {
    const fx = width / 2 - 2.2;
    for (let f = 1; f < floors; f++) {
      const y = base + f * floorH;
      g.add(box(2.6, 0.08, 1.0, PAL.iron, fx, y, 0.55));
      for (let k = 0; k < 9; k++) g.add(box(0.03, 0.9, 0.03, PAL.iron, fx - 1.25 + k * 0.31, y + 0.45, 1.03, { shadow: true }));
      g.add(box(2.6, 0.05, 0.05, PAL.iron, fx, y + 0.9, 1.03));
      const ladder = box(0.5, floorH * 1.05, 0.05, PAL.iron, fx + 0.6, y - floorH / 2, 0.8);
      ladder.rotation.z = 0.5;
      g.add(ladder);
    }
  }

  // Водонапорная башня на крыше
  if (waterTower) {
    const t = group(
      cyl(0.9, 0.9, 2.2, '#8a6347', 0, 1.6, 0, 14),
      mesh(new THREE.ConeGeometry(1.05, 0.9, 14), '#6b4a36'),
      ...[[-0.6, -0.6], [0.6, -0.6], [-0.6, 0.6], [0.6, 0.6]].map(([x, z]) => cyl(0.06, 0.06, 1.6, PAL.iron, x, 0, z, 6)),
    );
    t.children[1].position.y = 4.25;
    t.position.set(width / 4, h + 0.6, -depth / 2);
    g.add(t);
  }

  // Трубы и мелочи на крыше
  g.add(block(0.6, 0.9, 0.6, '#7d6e62', -width / 3, h + 0.6, -depth + 1.5));

  return { group: g, doorX, depth, width, height: h };
}

export function tree(r, x, z, s = 1) {
  const g = new THREE.Group();
  const trunkH = 2.2 * s;
  g.add(cyl(0.16 * s, 0.24 * s, trunkH, PAL.trunk, 0, 0, 0, 7));
  const n = 4 + Math.floor(r() * 3);
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2 + r();
    const rad = (0.9 + r() * 0.5) * s;
    const leaf = sphere(rad, pick(r, PAL.leaf), Math.cos(a) * 0.8 * s, trunkH + 0.5 * s + r() * 1.0 * s, Math.sin(a) * 0.8 * s, 0, { opts: { wave: 1 } });
    leaf.rotation.set(r() * 3, r() * 3, r() * 3);
    g.add(leaf);
  }
  g.add(sphere(1.2 * s, pick(r, PAL.leaf), 0, trunkH + 1.3 * s, 0, 0, { opts: { wave: 1 } }));
  g.position.set(x, 0, z);
  g.userData.sway = r() * 10;
  return g;
}

export function treePit(x, z) {
  return group(
    block(1.6, 0.06, 1.6, '#7a6150', x, 0.0, z, { shadow: false }),
    block(1.7, 0.18, 0.1, '#5e5146', x, 0, z - 0.8), block(1.7, 0.18, 0.1, '#5e5146', x, 0, z + 0.8),
    block(0.1, 0.18, 1.7, '#5e5146', x - 0.8, 0, z), block(0.1, 0.18, 1.7, '#5e5146', x + 0.8, 0, z),
  );
}

export function streetLamp(x, z, rotY = 0) {
  const g = group(
    cyl(0.12, 0.16, 0.5, PAL.iron, 0, 0, 0, 8),
    cyl(0.06, 0.07, 4.2, PAL.iron, 0, 0.4, 0, 8),
  );
  const arm = box(0.08, 0.08, 1.2, PAL.iron, 0, 4.5, 0.55);
  const head = box(0.5, 0.18, 0.7, PAL.iron, 0, 4.42, 1.1);
  const light = box(0.4, 0.05, 0.55, LAMP_BULB, 0, 4.31, 1.1, { shadow: false });
  g.add(arm, head, light, lightPool(0, 1.1));
  g.position.set(x, 0, z);
  g.rotation.y = rotY;
  return g;
}

export function hydrant(x, z) {
  const red = '#d4573f';
  return group(
    cyl(0.18, 0.22, 0.6, red, x, 0, z, 10),
    sphere(0.19, red, x, 0.62, z, 1),
    cyl(0.05, 0.05, 0.12, red, x, 0.78, z, 6),
    box(0.55, 0.1, 0.1, red, x, 0.42, z),
  );
}

export function trashCan(x, z) {
  return group(
    cyl(0.32, 0.27, 0.9, '#5d7363', x, 0, z, 10),
    cyl(0.34, 0.34, 0.06, '#4b5e50', x, 0.9, z, 10),
  );
}

export function mailbox(x, z, rotY = 0) {
  const blue = '#3a5f9e';
  const g = group(
    block(0.65, 0.9, 0.55, blue, 0, 0.3, 0),
    cyl(0.33, 0.33, 0.55, blue, 0, 1.2, 0, 12),
    ...[[-0.25, -0.2], [0.25, -0.2], [-0.25, 0.2], [0.25, 0.2]].map(([a, b]) => block(0.06, 0.3, 0.06, PAL.iron, a, 0, b)),
  );
  g.children[1].rotation.x = Math.PI / 2;
  g.children[1].scale.set(1, 1, 1);
  g.children[1].position.y = 1.2;
  g.position.set(x, 0, z);
  g.rotation.y = rotY;
  return g;
}

export function bench(x, z, rotY = 0) {
  const g = new THREE.Group();
  for (let i = 0; i < 3; i++) g.add(box(2.2, 0.08, 0.16, PAL.wood, 0, 0.5, -0.2 + i * 0.2));
  for (let i = 0; i < 2; i++) g.add(box(2.2, 0.14, 0.06, PAL.wood, 0, 0.75 + i * 0.22, -0.32));
  [-0.9, 0.9].forEach((dx) => {
    g.add(box(0.08, 0.5, 0.5, PAL.iron, dx, 0.25, -0.05));
    g.add(box(0.08, 0.6, 0.08, PAL.iron, dx, 0.8, -0.32));
  });
  g.position.set(x, 0, z);
  g.rotation.y = rotY;
  return g;
}

// Куст как в Goose Game: тёмная основа, покрытая сотнями листиков, и белые цветы-звёздочки
const LEAF = (() => {
  const g = new THREE.SphereGeometry(0.1, 6, 4);
  g.scale(1, 0.28, 0.62);
  g.translate(0.05, 0, 0);
  return g;
})();
const PETAL_STAR = (() => {
  const pts = [];
  for (let i = 0; i < 10; i++) {
    const a = (i / 10) * Math.PI * 2;
    const rr = i % 2 ? 0.045 : 0.11;
    pts.push(new THREE.Vector2(Math.cos(a) * rr, Math.sin(a) * rr));
  }
  const g = new THREE.ShapeGeometry(new THREE.Shape(pts));
  g.rotateX(-Math.PI / 2);
  return g;
})();
const leafMat = mat('#ffffff', { wave: 1 });

export function bush(r, x, z, s = 1, flowers = true) {
  const g = new THREE.Group();
  const n = 3 + Math.floor(r() * 3);
  const blobs = [];
  for (let i = 0; i < n; i++) {
    const rad = (0.5 + r() * 0.35) * s;
    const b = sphere(rad, '#3f7748', (r() - 0.5) * 1.2 * s, 0.4 * s, (r() - 0.5) * 0.9 * s, 0, { opts: { wave: 1 } });
    blobs.push({ c: b.position.clone(), rad });
    g.add(b);
  }
  // Листья по поверхности (верх и бока), каждый смотрит наружу
  const count = Math.round(70 * n * s);
  const leaves = new THREE.InstancedMesh(LEAF, leafMat, count);
  const m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), up = new THREE.Vector3(0, 1, 0), dir = new THREE.Vector3(), p = new THREE.Vector3();
  const col = new THREE.Color();
  for (let i = 0; i < count; i++) {
    const bl = blobs[i % blobs.length];
    dir.set(r() - 0.5, r() * 0.9 - 0.15, r() - 0.5).normalize();
    p.copy(bl.c).addScaledVector(dir, bl.rad * 0.98);
    if (p.y < 0.08) p.y = 0.08;
    q.setFromUnitVectors(up, dir);
    q.multiply(new THREE.Quaternion().setFromAxisAngle(up, r() * 6.28));
    const sc = (0.8 + r() * 0.6) * s;
    m4.compose(p, q, new THREE.Vector3(sc, sc, sc));
    leaves.setMatrixAt(i, m4);
    leaves.setColorAt(i, col.set(pick(r, ['#4c8a55', '#3f7a4a', '#5a9a5f', '#467f4e', '#61a064'])));
  }
  leaves.castShadow = true;
  leaves.receiveShadow = true;
  g.add(leaves);
  if (flowers) {
    const nf = 4 + Math.floor(r() * 5);
    for (let i = 0; i < nf; i++) {
      const bl = blobs[i % blobs.length];
      dir.set(r() - 0.5, 0.5 + r() * 0.6, r() - 0.5).normalize();
      const fp = bl.c.clone().addScaledVector(dir, bl.rad + 0.03);
      const f = new THREE.Mesh(PETAL_STAR, mat('#f8f6ef', { side: THREE.DoubleSide }));
      f.position.copy(fp);
      f.quaternion.setFromUnitVectors(up, dir);
      const c = sphere(0.035, '#f29a2e', 0, 0.015, 0, 0, { shadow: false });
      f.add(c);
      g.add(f);
    }
  }
  g.position.set(x, 0, z);
  return g;
}

export function flowerBed(r, x, z, w, d) {
  const g = group(block(w, 0.3, d, PAL.woodDark, x, 0, z), block(w - 0.2, 0.32, d - 0.2, '#7a5d48', x, 0, z, { shadow: false }));
  const colors = ['#f2c230', '#e07a5f', '#d98bb3', '#f6f3ec', '#8b7fd1'];
  for (let i = 0; i < w * d * 3; i++) {
    const fx = x + (r() - 0.5) * (w - 0.5);
    const fz = z + (r() - 0.5) * (d - 0.5);
    g.add(cyl(0.02, 0.02, 0.25, '#4f8a57', fx, 0.3, fz, 4));
    g.add(sphere(0.12, pick(r, colors), fx, 0.6, fz, 0, { shadow: false }));
  }
  return g;
}

export function car(color, { taxi = false } = {}) {
  const g = new THREE.Group();
  const body = mat(taxi ? '#f2c230' : color, { roughness: 0.28, metalness: 0.25 });
  g.add(rbox(4.2, 0.78, 1.8, body, 0, 0.33, 0, 0.22));
  g.add(rbox(2.4, 0.72, 1.65, body, -0.2, 1.05, 0, 0.2));
  // Окна — блестящие, отражают небо
  g.add(box(2.2, 0.48, 1.68, mat('#4a5d70', { roughness: 0.08, metalness: 0.6 }), -0.2, 1.43, 0, { shadow: false }));
  g.add(box(0.06, 0.5, 1.7, body, -0.2, 1.43, 0, { shadow: false }));
  // Фары (ночью светятся)
  [[-0.6], [0.6]].forEach(([z]) => {
    g.add(box(0.08, 0.18, 0.35, HEADLIGHT, 2.1, 0.75, z, { shadow: false }));
    g.add(box(0.08, 0.18, 0.35, TAILLIGHT, -2.1, 0.75, z, { shadow: false }));
  });
  g.add(box(4.3, 0.2, 1.85, '#3d4048', 0, 0.42, 0));
  // Колёса
  [[1.3, 0.85], [-1.3, 0.85], [1.3, -0.85], [-1.3, -0.85]].forEach(([x, z]) => {
    const w = mesh(new THREE.CylinderGeometry(0.38, 0.38, 0.28, 12), '#2b2d31');
    w.rotation.x = Math.PI / 2;
    w.position.set(x, 0.38, z);
    const hub = mesh(new THREE.CylinderGeometry(0.17, 0.17, 0.3, 8), '#b9bcc2');
    hub.rotation.x = Math.PI / 2;
    hub.position.copy(w.position);
    g.add(w, hub);
  });
  if (taxi) {
    const s = sign('TAXI', 0.9, 0.3, { bg: '#f6f3ec', fg: '#2f3b52', w: 256, h: 96, font: 'bold 64px Nunito, sans-serif' });
    s.position.set(-0.2, 1.62, 0);
    s.rotation.y = Math.PI / 2;
    g.add(s);
    // Шашечки
    for (let i = 0; i < 8; i++) {
      g.add(box(0.25, 0.1, 0.02, i % 2 ? '#2f3b52' : '#f6f3ec', -1.5 + i * 0.25 + 0.6, 0.55, 0.91, { shadow: false }));
      g.add(box(0.25, 0.1, 0.02, i % 2 ? '#2f3b52' : '#f6f3ec', -1.5 + i * 0.25 + 0.6, 0.55, -0.91, { shadow: false }));
    }
  }
  return g;
}

function stripedAwning(w, d, colors, h = 0.5) {
  const g = new THREE.Group();
  const n = Math.round(w / 0.4);
  for (let i = 0; i < n; i++) {
    const s = box(w / n, 0.06, d, colors[i % 2], -w / 2 + (i + 0.5) * (w / n), 0, 0);
    s.rotation.x = -0.35;
    g.add(s);
    g.add(box(w / n, h * 0.4, 0.04, colors[i % 2], -w / 2 + (i + 0.5) * (w / n), -h * 0.25 - 0.05, d / 2 - 0.02));
  }
  return g;
}

export function coffeeCart(x, z, rotY = 0) {
  const g = new THREE.Group();
  g.add(rbox(2.6, 1.0, 1.3, '#6f9e83', 0, 0.35, 0, 0.1));
  g.add(block(2.7, 0.1, 1.4, PAL.wood, 0, 1.35, 0));
  [[-0.9, 0.66], [0.9, 0.66], [-0.9, -0.66], [0.9, -0.66]].forEach(([wx, wz]) => {
    const w = mesh(new THREE.CylinderGeometry(0.33, 0.33, 0.1, 14), '#3d4048');
    w.rotation.x = Math.PI / 2;
    w.position.set(wx, 0.33, wz);
    g.add(w);
  });
  // Кофемашина и стаканчики
  g.add(block(0.6, 0.6, 0.45, '#c9ccd1', -0.6, 1.45, -0.2));
  g.add(block(0.15, 0.08, 0.15, '#2e3238', -0.6, 1.55, 0.06));
  for (let i = 0; i < 4; i++) g.add(cyl(0.08, 0.06, 0.2, '#f6f3ec', 0.3 + i * 0.18, 1.45, 0.3, 8));
  g.add(cyl(0.12, 0.12, 0.3, '#8a6347', 0.9, 1.45, -0.3, 10));
  // Стойки и навес
  [[-1.2, 0.6], [1.2, 0.6], [-1.2, -0.6], [1.2, -0.6]].forEach(([px, pz]) => g.add(cyl(0.04, 0.04, 1.5, PAL.white, px, 1.45, pz, 6)));
  const awn = stripedAwning(2.9, 1.7, ['#f6f3ec', '#e07a5f']);
  awn.position.y = 3.05;
  g.add(awn);
  const s = sign('COFFEE', 1.7, 0.42, { bg: '#2f3b52', fg: '#f2c230' });
  s.position.set(0, 0.85, 0.67);
  g.add(s);
  g.position.set(x, 0, z);
  g.rotation.y = rotY;
  return g;
}

export function hotDogStand(x, z, rotY = 0) {
  const g = new THREE.Group();
  g.add(rbox(2.2, 1.0, 1.1, mat('#c9ccd1', { roughness: 0.3, metalness: 0.7 }), 0, 0.3, 0, 0.1));
  g.add(block(2.25, 0.08, 1.15, '#aeb2b8', 0, 1.3, 0));
  [[-0.8, 0.56], [0.8, 0.56], [-0.8, -0.56], [0.8, -0.56]].forEach(([wx, wz]) => {
    const w = mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.1, 14), '#3d4048');
    w.rotation.x = Math.PI / 2;
    w.position.set(wx, 0.3, wz);
    g.add(w);
  });
  // Зонтик
  g.add(cyl(0.04, 0.04, 2.0, '#9aa0a6', 0, 1.35, 0, 6));
  const colors = ['#f2c230', '#3a6ea5'];
  for (let i = 0; i < 8; i++) {
    const seg = mesh(new THREE.ConeGeometry(1.6, 0.6, 8, 1, true, (i / 8) * Math.PI * 2, Math.PI / 4), colors[i % 2]);
    seg.material = mat(colors[i % 2], { side: THREE.DoubleSide });
    seg.position.y = 3.6;
    g.add(seg);
  }
  // Сосиски и соусы
  for (let i = 0; i < 4; i++) {
    const d = mesh(new THREE.CapsuleGeometry(0.05, 0.3, 3, 6), '#c4653f');
    d.rotation.z = Math.PI / 2;
    d.position.set(-0.5 + i * 0.15, 1.4, 0.2);
    g.add(d);
  }
  g.add(cyl(0.07, 0.07, 0.3, '#d4573f', 0.6, 1.34, 0.25, 8));
  g.add(cyl(0.07, 0.07, 0.3, '#f2c230', 0.8, 1.34, 0.25, 8));
  const s = sign('HOT DOGS', 1.8, 0.4, { bg: '#d4573f', fg: '#ffffff' });
  s.position.set(0, 0.8, 0.57);
  g.add(s);
  g.position.set(x, 0, z);
  g.rotation.y = rotY;
  return g;
}

export function subwayEntrance(x, z) {
  const g = new THREE.Group();
  const green = '#2f5d46';
  // Проём со ступенями вниз
  g.add(block(2.4, 0.04, 4.0, '#2b2d31', 0, 0, 0, { shadow: false }));
  for (let i = 0; i < 7; i++) g.add(block(2.2, 0.05, 0.45, i % 2 ? '#5a5f66' : '#6b7077', 0, 0.01, -1.6 + i * 0.5, { shadow: false }));
  // Перила
  [-1.25, 1.25].forEach((dx) => {
    g.add(box(0.08, 0.08, 4.0, green, dx, 1.05, 0));
    for (let i = 0; i < 9; i++) g.add(cyl(0.035, 0.035, 1.05, green, dx, 0, -2 + i * 0.5, 6));
  });
  g.add(box(2.6, 0.08, 0.08, green, 0, 1.05, -2));
  for (let i = 0; i < 5; i++) g.add(cyl(0.035, 0.035, 1.05, green, -1 + i * 0.5, 0, -2, 6));
  // Фонари-шары
  [-1.25, 1.25].forEach((dx) => {
    g.add(cyl(0.06, 0.08, 2.4, green, dx, 0, 2, 8));
    g.add(sphere(0.25, '#9fe0a9', dx, 2.6, 2, 2, { opts: { emissive: '#6fcf7f', emissiveIntensity: 0.4 } }));
  });
  const s = sign('SUBWAY', 2.2, 0.45, { bg: '#1f2226', fg: '#ffffff' });
  s.position.set(0, 1.55, 2.0);
  g.add(s);
  // Линии метро: G и L
  [['G', '#6cbe45', -0.55], ['L', '#a7a9ac', 0.55]].forEach(([letter, col, dx]) => {
    const c = sign(letter, 0.36, 0.36, { bg: col, fg: '#ffffff', w: 128, h: 128, font: 'bold 90px Nunito, sans-serif' });
    c.position.set(dx, 2.0, 2.0);
    g.add(c);
  });
  g.position.set(x, 0, z);
  return g;
}

export function hoopFence(length, rotY = 0) {
  const g = new THREE.Group();
  const n = Math.floor(length / 0.6);
  for (let i = 0; i < n; i++) {
    const hoop = mesh(new THREE.TorusGeometry(0.3, 0.025, 4, 10, Math.PI), PAL.iron);
    hoop.position.set(-length / 2 + i * 0.6 + 0.3, 0.05, 0);
    g.add(hoop);
  }
  g.rotation.y = rotY;
  return g;
}

export function deliFront(width) {
  const g = new THREE.Group();
  g.add(box(width - 1, 2.2, 0.1, '#5a6f82', 0, 1.4 + 1.1, 0.06, { shadow: false }));
  const awn = stripedAwning(width - 0.4, 1.6, ['#3e6b4f', '#f6f3ec']);
  awn.position.set(0, 4.0, 0.8);
  g.add(awn);
  const s = sign('DELI • GROCERY', width - 1.5, 0.6, { bg: '#c94f3d', fg: '#ffffff', w: 1024, h: 128, font: 'bold 78px Nunito, sans-serif' });
  s.position.set(0, 4.55, 0.1);
  g.add(s);
  // Ящики с фруктами
  [['#e07a5f', -2.2], ['#f2c230', -1.2], ['#7db374', 1.2], ['#f29a3c', 2.2]].forEach(([c, dx]) => {
    g.add(block(0.85, 0.5, 0.6, PAL.wood, dx, 0, 1.0));
    for (let i = 0; i < 6; i++) g.add(sphere(0.11, c, dx - 0.27 + (i % 3) * 0.27, 0.6, 0.85 + Math.floor(i / 3) * 0.25, 0, { shadow: false }));
  });
  return g;
}
