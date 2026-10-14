// Фейерверк: разлетающиеся искры (яркие — красиво светятся с bloom).
import * as THREE from 'three';

export function launchFireworks(scene, center, { seconds = 25, onBoom } = {}) {
  const bursts = [];
  const N = 140;
  let t = 0, next = 0;
  const group = new THREE.Group();
  scene.add(group);
  const colors = [[3, 0.6, 0.6], [0.6, 2.6, 0.8], [0.7, 1.2, 3], [3, 2.6, 0.6], [2.6, 0.8, 2.8], [3, 3, 3]];

  function burst() {
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(N * 3);
    const vel = [];
    const origin = new THREE.Vector3(center.x + (Math.random() - 0.5) * 50, 18 + Math.random() * 14, center.z + 20 + Math.random() * 25);
    for (let i = 0; i < N; i++) {
      pos.set([origin.x, origin.y, origin.z], i * 3);
      const d = new THREE.Vector3().randomDirection().multiplyScalar(6 + Math.random() * 6);
      vel.push(d);
    }
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const c = colors[Math.floor(Math.random() * colors.length)];
    const m = new THREE.PointsMaterial({ color: new THREE.Color(...c), size: 0.55, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, toneMapped: false });
    const p = new THREE.Points(geo, m);
    p.frustumCulled = false;
    group.add(p);
    bursts.push({ p, vel, life: 0 });
    onBoom?.();
  }

  function update(dt) {
    t += dt;
    next -= dt;
    if (t < seconds && next <= 0) { burst(); next = 0.5 + Math.random() * 0.9; }
    for (let k = bursts.length - 1; k >= 0; k--) {
      const b = bursts[k];
      b.life += dt;
      const arr = b.p.geometry.attributes.position.array;
      b.vel.forEach((v, i) => {
        v.y -= 4 * dt;
        v.multiplyScalar(1 - dt * 0.9);
        arr[i * 3] += v.x * dt; arr[i * 3 + 1] += v.y * dt; arr[i * 3 + 2] += v.z * dt;
      });
      b.p.geometry.attributes.position.needsUpdate = true;
      b.p.material.opacity = Math.max(0, 1 - b.life / 2.4);
      if (b.life > 2.4) { group.remove(b.p); b.p.geometry.dispose(); bursts.splice(k, 1); }
    }
    return t < seconds + 3;
  }

  return { update, dispose: () => scene.remove(group) };
}
