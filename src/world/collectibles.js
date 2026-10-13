// Спрятанные золотые яблоки («Big Apple»): каждое открывает сленговое слово.
import * as THREE from 'three';
import { mesh } from './kit.js';

function appleMesh() {
  const g = new THREE.Group();
  const gold = new THREE.MeshStandardMaterial({ color: '#f2c230', emissive: '#f29a3c', emissiveIntensity: 0.6, metalness: 0.85, roughness: 0.25, flatShading: true });
  const body = new THREE.Mesh(new THREE.IcosahedronGeometry(0.32, 1), gold);
  body.scale.set(1, 0.9, 1);
  body.castShadow = true;
  const stem = mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.18, 5), '#6b4a36');
  stem.position.y = 0.32;
  const leaf = mesh(new THREE.BoxGeometry(0.18, 0.03, 0.1), '#7db374');
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
