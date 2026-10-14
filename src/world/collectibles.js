// Спрятанные золотые яблоки («Big Apple»): каждое открывает сленговое слово.
import * as THREE from 'three';
import { mesh } from './kit.js';

function appleMesh() {
  const g = new THREE.Group();
  // Матовое «золотое» яблоко: без металла (металл без отражений выглядит чёрным), со свечением
  const gold = new THREE.MeshStandardMaterial({ color: '#ffcf3d', emissive: '#ffb02e', emissiveIntensity: 0.55, metalness: 0, roughness: 0.55 });
  const profile = [[0, -0.27], [0.16, -0.29], [0.28, -0.2], [0.33, -0.04], [0.32, 0.12], [0.25, 0.25], [0.12, 0.28], [0.04, 0.22], [0, 0.2]]
    .map(([x, y]) => new THREE.Vector2(x, y));
  const body = new THREE.Mesh(new THREE.LatheGeometry(profile, 24), gold);
  body.castShadow = true;
  const shine = new THREE.Mesh(new THREE.SphereGeometry(0.07, 10, 8), new THREE.MeshBasicMaterial({ color: '#fffbe6' }));
  shine.scale.set(0.7, 1.2, 0.5);
  shine.position.set(-0.17, 0.1, 0.22);
  body.add(shine);
  const stem = mesh(new THREE.CylinderGeometry(0.03, 0.035, 0.18, 6), '#6b4a36');
  stem.position.y = 0.3;
  stem.rotation.z = -0.2;
  const leaf = mesh(new THREE.SphereGeometry(0.1, 10, 6), '#7db374');
  leaf.scale.set(1, 0.25, 0.5);
  leaf.position.set(0.09, 0.36, 0);
  leaf.rotation.z = 0.4;
  const ring = new THREE.Mesh(new THREE.RingGeometry(0.45, 0.6, 24), new THREE.MeshBasicMaterial({ color: '#fff3c9', transparent: true, opacity: 0.5, side: THREE.DoubleSide, depthWrite: false }));
  ring.rotation.x = -Math.PI / 2;
  ring.position.y = -0.55;
  g.add(body, stem, leaf, ring);
  return { g, ring };
}

export function createCollectibles(list) {
  const items = list.map((c) => {
    const { g, ring } = appleMesh();
    g.position.set(c.pos[0], 0.9, c.pos[1]);
    return { ...c, g, ring };
  });
  return {
    items,
    attach(maps) {
      for (const it of items) maps[it.map].root.add(it.g);
    },
    update(t, taken) {
      for (const it of items) {
        it.g.visible = !taken[it.id];
        if (!it.g.visible) continue;
        it.g.rotation.y = t * 1.5;
        it.g.position.y = 0.9 + Math.sin(t * 2 + it.pos[0]) * 0.12;
        it.ring.scale.setScalar(1 + Math.sin(t * 3) * 0.12);
      }
    },
    near(mapId, pos, taken, dist = 1.1) {
      return items.find((it) => it.map === mapId && !taken[it.id] && Math.hypot(it.pos[0] - pos.x, it.pos[1] - pos.z) < dist);
    },
  };
}
