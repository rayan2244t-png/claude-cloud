// Квартира героя — «кукольный домик» с открытыми передней и правой стенами.
// Мебель появляется, когда её покупают в телефоне (data/shop.js).
import * as THREE from 'three';
import { mesh, box, block, cyl, sphere, group, sign, rng, PAL } from '../kit.js';

const OX = 300; // квартира стоит далеко от улицы, туман её скрывает

const FURNITURE = {
  bed: () => group(
    block(2.2, 0.45, 3.2, PAL.woodDark, 0, 0, 0),
    block(2.0, 0.3, 3.0, '#f6f3ec', 0, 0.45, 0.05),
    block(2.05, 0.12, 1.9, '#7fa7c9', 0, 0.75, 0.6),
    block(1.4, 0.2, 0.55, '#ffffff', 0, 0.75, -1.1),
    block(2.2, 1.1, 0.15, PAL.woodDark, 0, 0, -1.6),
  ),
  sofa: () => group(
    block(3.0, 0.5, 1.2, '#e07a5f', 0, 0.12, 0),
    block(3.0, 0.9, 0.3, '#d06a50', 0, 0.12, -0.5),
    block(0.3, 0.75, 1.2, '#d06a50', -1.5, 0.12, 0),
    block(0.3, 0.75, 1.2, '#d06a50', 1.5, 0.12, 0),
    block(0.8, 0.25, 0.6, '#f2c230', -0.7, 0.62, -0.1),
    ...[[-1.35, 0.5], [1.35, 0.5], [-1.35, -0.5], [1.35, -0.5]].map(([x, z]) => block(0.1, 0.12, 0.1, PAL.woodDark, x, 0, z)),
  ),
  rug: () => {
    const g = group(cyl(1.6, 1.6, 0.03, '#d9b56b', 0, 0, 0, 24, { shadow: false }), cyl(1.25, 1.25, 0.035, '#c7714f', 0, 0, 0, 24, { shadow: false }), cyl(0.8, 0.8, 0.04, '#f6f3ec', 0, 0, 0, 24, { shadow: false }));
    g.scale.set(1.3, 1, 1);
    return g;
  },
  plant: () => group(
    cyl(0.3, 0.22, 0.5, '#d07a55', 0, 0, 0, 10),
    ...[0, 1, 2, 3, 4].map((i) => {
      const leaf = sphere(0.32, i % 2 ? '#5f9660' : '#7db374', Math.cos(i * 1.3) * 0.2, 0.75 + i * 0.12, Math.sin(i * 1.3) * 0.2, 0);
      leaf.scale.set(0.8, 1.3, 0.8);
      return leaf;
    }),
  ),
  lamp: () => group(
    cyl(0.25, 0.3, 0.06, '#2e3238', 0, 0, 0, 10),
    cyl(0.03, 0.03, 1.6, '#2e3238', 0, 0, 0, 6),
    cyl(0.22, 0.38, 0.45, '#f7e3b0', 0, 1.55, 0, 12, { opts: { emissive: '#f7e3b0', emissiveIntensity: 0.5 } }),
  ),
  poster: () => {
    const s = sign('I ♥ NY', 1.4, 1.0, { bg: '#f6f3ec', fg: '#d4573f', w: 384, h: 256, font: 'bold 90px Nunito, sans-serif', border: '#2f3b52' });
    s.position.y = 2.3;
    return group(s);
  },
  bookshelf: () => {
    const g = group(block(1.6, 2.2, 0.5, PAL.wood, 0, 0, 0));
    const books = ['#e07a5f', '#5b7fb3', '#f2c230', '#7fb38a', '#b0577a', '#2f3b52'];
    for (let s = 0; s < 3; s++) {
      g.add(block(1.45, 0.05, 0.45, PAL.woodDark, 0, 0.3 + s * 0.65, 0.02));
      for (let i = 0; i < 6; i++) g.add(block(0.16, 0.42 + (i % 3) * 0.05, 0.36, books[(i + s) % books.length], -0.55 + i * 0.21, 0.35 + s * 0.65, 0.04));
    }
    return g;
  },
  tv: () => group(
    block(1.8, 0.6, 0.6, PAL.woodDark, 0, 0, 0),
    block(1.5, 0.9, 0.08, '#1f2226', 0, 0.75, 0),
    box(1.38, 0.78, 0.02, '#4f7fa8', 0, 1.2, 0.05, { shadow: false, opts: { emissive: '#4f7fa8', emissiveIntensity: 0.35 } }),
  ),
  guitar: () => {
    const g = group(
      sphere(0.32, '#c4653f', 0, 0.4, 0, 1),
      sphere(0.24, '#c4653f', 0, 0.82, 0, 1),
      box(0.08, 0.9, 0.05, PAL.woodDark, 0, 1.4, 0.05),
    );
    g.children[0].scale.set(1, 1, 0.35);
    g.children[1].scale.set(1, 1, 0.35);
    g.rotation.x = -0.2;
    return g;
  },
  fridge: () => group(
    block(1.0, 2.1, 0.9, '#e9eef2', 0, 0, 0),
    box(0.06, 0.5, 0.06, '#9aa0a6', 0.35, 1.5, 0.47),
    box(0.06, 0.5, 0.06, '#9aa0a6', 0.35, 0.7, 0.47),
    box(0.98, 0.03, 0.02, '#c9ccd1', 0, 1.25, 0.46),
  ),
};

// Где стоит каждый предмет: [x, z, поворот]
const SLOTS = {
  bed: [-3.3, -2.0, 0],
  sofa: [2.3, -3.1, 0],
  rug: [0.4, 0.3, 0],
  plant: [4.3, -3.3, 0],
  lamp: [0.4, -3.4, 0],
  poster: [-0.2, -3.9, 0],
  bookshelf: [-4.6, 1.6, Math.PI / 2],
  tv: [2.3, 1.4, Math.PI],
  guitar: [-1.5, -3.6, 0],
  fridge: [4.3, 2.6, -Math.PI / 2],
};

const FOOTPRINT = {
  bed: [2.2, 3.2], sofa: [3.2, 1.2], plant: [0.6, 0.6], lamp: [0.4, 0.4], bookshelf: [0.5, 1.6], tv: [1.8, 0.6], fridge: [0.9, 1.0],
};

export function buildApartment() {
  const r = rng(3);
  const root = new THREE.Group();
  root.position.set(OX, 0, 0);

  // Подставка-диорама под комнатой
  root.add(block(11.2, 0.7, 9.4, '#e3d6c0', -0.1, -0.8, 0.05));
  root.add(block(11.0, 0.08, 9.2, '#cbb99a', -0.1, -0.12, 0.05, { shadow: false }));
  const floorBelow = mesh(new THREE.PlaneGeometry(80, 80), '#cfe0dc', { shadow: false });
  floorBelow.rotation.x = -Math.PI / 2;
  floorBelow.position.y = -0.8;
  root.add(floorBelow);
  // Коврик у двери и вешалка
  root.add(block(0.15, 1.9, 0.15, PAL.woodDark, -4.75, 0, 1.6));
  root.add(sphere(0.18, '#5b7fb3', -4.6, 1.7, 1.6, 0));

  // Пол из досок
  for (let i = 0; i < 14; i++) {
    root.add(block(0.72, 0.1, 8.4, i % 2 ? '#c99a6b' : '#bf8f61', -4.85 + i * 0.725 + 0.36, -0.1, 0, { shadow: false }));
  }
  // Стены
  const wall = '#efe2cc';
  root.add(block(10.4, 4.2, 0.3, wall, 0, 0, -4.35));
  root.add(block(0.3, 4.2, 8.7, wall, -5.15, 0, -0.05));
  root.add(block(10.4, 0.2, 0.32, '#d9c7a8', 0, 0, -4.2));
  root.add(block(0.32, 0.2, 8.7, '#d9c7a8', -5.0, 0, -0.05));
  // Полоски на обоях
  for (let i = 0; i < 12; i++) root.add(box(0.12, 4.0, 0.02, '#e6d4b8', -4.6 + i * 0.85, 2.0, -4.19, { shadow: false }));
  // Окно с видом на город
  root.add(box(2.6, 2.0, 0.1, PAL.frame, 3.0, 2.4, -4.15));
  root.add(box(2.3, 1.75, 0.1, '#bfe0ee', 3.0, 2.4, -4.12, { shadow: false }));
  for (let i = 0; i < 6; i++) {
    const h = 0.4 + r() * 0.9;
    root.add(box(0.3, h, 0.02, '#8fa8bd', 2.05 + i * 0.38, 1.6 + h / 2, -4.06, { shadow: false }));
  }
  root.add(box(0.06, 1.75, 0.12, PAL.frame, 3.0, 2.4, -4.08, { shadow: false }));
  root.add(box(2.9, 0.12, 0.4, PAL.frame, 3.0, 1.4, -4.0));
  // Дверь (выход на улицу)
  root.add(box(0.12, 2.4, 1.3, '#3e7d5a', -4.98, 1.2, 3.0));
  root.add(sphere(0.06, '#e4c36a', -4.9, 1.2, 2.6, 0));
  const exitMat = box(1.2, 0.03, 1.4, '#a85b4a', -4.3, 0.0, 3.0, { shadow: false });
  root.add(exitMat);

  // Стартовые вещи: матрас и коробки
  const starter = group(
    block(1.8, 0.25, 2.8, '#f6f3ec', -3.3, 0, -2.2),
    block(1.2, 0.08, 0.5, '#ffffff', -3.3, 0.25, -3.2),
    block(0.9, 0.7, 0.7, '#c9a27e', 3.5, 0, 0.8),
    block(0.7, 0.5, 0.6, '#b98f69', 3.6, 0.7, 0.8),
  );
  root.add(starter);

  const placed = {};
  function setItems(items) {
    starter.children[0].visible = starter.children[1].visible = !items.includes('bed');
    for (const id of items) {
      if (placed[id] || !FURNITURE[id]) continue;
      const obj = FURNITURE[id]();
      const [x, z, ry] = SLOTS[id];
      obj.position.set(x, 0, z);
      obj.rotation.y = ry;
      obj.scale.setScalar(0.01);
      obj.userData.grow = 0;
      root.add(obj);
      placed[id] = obj;
    }
  }

  const colliders = () => {
    const list = [{ type: 'box', minX: OX + 2.9, maxX: OX + 4.1, minZ: 0.4, maxZ: 1.2 }];
    for (const id of Object.keys(placed)) {
      const fp = FOOTPRINT[id];
      if (!fp) continue;
      const [x, z, ry] = SLOTS[id];
      const [w, d] = Math.abs(Math.sin(ry)) > 0.5 ? [fp[1], fp[0]] : fp;
      list.push({ type: 'box', minX: OX + x - w / 2, maxX: OX + x + w / 2, minZ: z - d / 2, maxZ: z + d / 2 });
    }
    if (!placed.bed) list.push({ type: 'box', minX: OX - 4.2, maxX: OX - 2.4, minZ: -3.6, maxZ: -0.8 });
    return list;
  };

  function update(dt) {
    for (const obj of Object.values(placed)) {
      if (obj.userData.grow < 1) {
        obj.userData.grow = Math.min(1, obj.userData.grow + dt * 2.5);
        const t = obj.userData.grow;
        // «Выпрыгивает» с лёгкой пружинкой
        const s = 1 + 2.70158 * (t - 1) ** 3 + 1.70158 * (t - 1) ** 2;
        obj.scale.setScalar(Math.max(0.01, s));
      }
    }
  }

  return {
    id: 'apartment',
    root,
    get colliders() { return colliders(); },
    bounds: { minX: OX - 4.6, maxX: OX + 4.8, minZ: -3.8, maxZ: 3.9 },
    heightAt: () => 0,
    spots: { start: [OX - 3.8, 3.0], exit: [OX - 4.3, 3.0] },
    camZoom: 0.68,
    setItems,
    update,
  };
}
