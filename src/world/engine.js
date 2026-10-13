// 3D-движок: сцена, свет, камера, герой, персонажи, управление и столкновения.
import * as THREE from 'three';
import { makeCharacter } from './character.js';
import { MAPS } from './maps/index.js';
import { createRenderPipeline } from './render.js';
import { SHADER } from './kit.js';

const PLAYER_R = 0.35;
const SPEED = 4.2;

export function createEngine(container, { npcs, quality = 'high' }) {
  const scene = new THREE.Scene();
  const SKY = new THREE.Color('#d8e8e4');
  scene.background = SKY;
  scene.fog = new THREE.Fog(SKY, 55, 150);

  // Мягкий свет без жёстких контрастов — как в Goose Game
  const hemi = new THREE.HemisphereLight('#fffaf0', '#9ab38f', 1.55);
  scene.add(hemi);
  const sun = new THREE.DirectionalLight('#fff4e0', 1.6);
  sun.castShadow = true;
  Object.assign(sun.shadow.camera, { left: -26, right: 26, top: 26, bottom: -26, near: 1, far: 90 });
  sun.shadow.bias = -0.0006;
  sun.shadow.normalBias = 0.03;
  sun.shadow.radius = 4;
  scene.add(sun, sun.target);
  const SUN_OFFSET = new THREE.Vector3(-14, 26, 10);

  const camera = new THREE.PerspectiveCamera(32, container.clientWidth / container.clientHeight, 0.5, 200);
  const CAM_OFFSET = new THREE.Vector3(0, 14.5, 20.5);
  let zoom = 1;

  const pipe = createRenderPipeline(container, scene, camera, quality);
  const renderer = pipe.renderer;
  sun.shadow.mapSize.set(pipe.quality.shadow, pipe.quality.shadow);

  // ---------- Карты ----------
  const maps = {};
  for (const [id, build] of Object.entries(MAPS)) {
    maps[id] = build();
    scene.add(maps[id].root);
  }
  let map = maps.brooklyn;
  const showOnly = (id) => Object.values(maps).forEach((m) => { m.root.visible = m.id === id; });
  showOnly('brooklyn');
  // Кто из персонажей сейчас на улице (карта + расписание). Задаётся из main.js
  let npcFilter = (id) => (npcs[id].map || 'brooklyn') === map.id;

  // Статичные объекты не пересчитываем каждый кадр
  scene.updateMatrixWorld(true);

  // ---------- Герой ----------
  const player = makeCharacter({
    skin: '#f0c4a0', shirt: '#e07a5f', pants: '#3f5a7a', hat: 'cap', hatColor: '#2f5d8a', hair: '#5a3d2b', backpack: '#f2c230',
  });
  scene.add(player.root);
  const pos = new THREE.Vector3(...[map.spots.start[0], 0, map.spots.start[1]]);
  let heading = -Math.PI / 2;
  let speed = 0;
  let moveTarget = null;
  let pendingTalk = null;

  // ---------- Персонажи ----------
  const npcObjs = {};
  for (const npc of Object.values(npcs)) {
    const c = makeCharacter(npc.look);
    const p = new THREE.Vector3(...npc.pos);
    c.root.position.copy(p);
    c.root.rotation.y = npc.rot ?? Math.PI;
    c.root.traverse((o) => { o.userData.npc = npc.id; });
    scene.add(c.root);
    npcObjs[npc.id] = { id: npc.id, char: c, pos: p, baseRot: c.root.rotation.y, lookAt: null };
  }

  // ---------- Управление ----------
  const keys = new Set();
  let paused = false;
  const handlers = { interact: () => {}, npcClick: () => {} };

  window.addEventListener('keydown', (e) => {
    if (e.target.closest?.('input, textarea')) return;
    keys.add(e.code);
    if ((e.code === 'KeyE' || e.code === 'Space' || e.code === 'Enter') && !paused) {
      e.preventDefault();
      handlers.interact();
    }
  });
  window.addEventListener('keyup', (e) => keys.delete(e.code));
  window.addEventListener('blur', () => keys.clear());

  const raycaster = new THREE.Raycaster();
  const ndc = new THREE.Vector2();
  const ground = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
  const tapMarker = new THREE.Mesh(new THREE.RingGeometry(0.25, 0.38, 20), new THREE.MeshBasicMaterial({ color: '#ffffff', transparent: true, opacity: 0.8 }));
  tapMarker.rotation.x = -Math.PI / 2;
  tapMarker.visible = false;
  scene.add(tapMarker);

  renderer.domElement.addEventListener('pointerdown', (e) => {
    if (paused) return;
    const rect = renderer.domElement.getBoundingClientRect();
    ndc.set(((e.clientX - rect.left) / rect.width) * 2 - 1, -((e.clientY - rect.top) / rect.height) * 2 + 1);
    raycaster.setFromCamera(ndc, camera);
    const npcMeshes = Object.values(npcObjs).filter((n) => n.char.root.visible).map((n) => n.char.root);
    const hit = raycaster.intersectObjects(npcMeshes, true)[0];
    if (hit?.object.userData.npc) {
      const id = hit.object.userData.npc;
      moveTarget = npcObjs[id].pos.clone();
      pendingTalk = id;
      return;
    }
    const p = new THREE.Vector3();
    if (raycaster.ray.intersectPlane(ground, p)) {
      moveTarget = p;
      pendingTalk = null;
      tapMarker.position.set(p.x, map.heightAt(p.x, p.z) + 0.03, p.z);
      tapMarker.visible = true;
      tapMarker.scale.setScalar(1);
    }
  });

  renderer.domElement.addEventListener('wheel', (e) => {
    zoom = THREE.MathUtils.clamp(zoom + e.deltaY * 0.001, 0.6, 1.5);
  }, { passive: true });

  // ---------- Столкновения ----------
  function collide(p) {
    const list = map.colliders;
    for (const c of list) {
      if (c.type === 'box') {
        const cx = THREE.MathUtils.clamp(p.x, c.minX, c.maxX);
        const cz = THREE.MathUtils.clamp(p.z, c.minZ, c.maxZ);
        const dx = p.x - cx, dz = p.z - cz;
        const d2 = dx * dx + dz * dz;
        if (d2 < PLAYER_R * PLAYER_R) {
          if (d2 > 1e-6) {
            const d = Math.sqrt(d2);
            p.x = cx + (dx / d) * PLAYER_R;
            p.z = cz + (dz / d) * PLAYER_R;
          } else {
            // внутри коробки — выталкиваем к ближайшей стороне
            const opts = [[p.x - c.minX, -1, 0], [c.maxX - p.x, 1, 0], [p.z - c.minZ, 0, -1], [c.maxZ - p.z, 0, 1]].sort((a, b) => a[0] - b[0])[0];
            p.x += opts[1] * (opts[0] + PLAYER_R);
            p.z += opts[2] * (opts[0] + PLAYER_R);
          }
        }
      } else {
        const dx = p.x - c.x, dz = p.z - c.z;
        const min = c.r + PLAYER_R;
        const d2 = dx * dx + dz * dz;
        if (d2 < min * min && d2 > 1e-6) {
          const d = Math.sqrt(d2);
          p.x = c.x + (dx / d) * min;
          p.z = c.z + (dz / d) * min;
        }
      }
    }
    for (const n of Object.values(npcObjs)) {
      if (!n.char.root.visible) continue;
      const dx = p.x - n.pos.x, dz = p.z - n.pos.z;
      const min = 0.45 + PLAYER_R;
      const d2 = dx * dx + dz * dz;
      if (d2 < min * min && d2 > 1e-6) {
        const d = Math.sqrt(d2);
        p.x = n.pos.x + (dx / d) * min;
        p.z = n.pos.z + (dz / d) * min;
      }
    }
    const b = map.bounds;
    p.x = THREE.MathUtils.clamp(p.x, b.minX, b.maxX);
    p.z = THREE.MathUtils.clamp(p.z, b.minZ, b.maxZ);
  }

  // ---------- Цикл ----------
  const clock = new THREE.Clock();
  const tmpV = new THREE.Vector3(), tmpL = new THREE.Vector3();
  const camPos = new THREE.Vector3().copy(pos).add(CAM_OFFSET);
  const camLook = new THREE.Vector3().copy(pos);
  let talkFocus = null;
  const frameHooks = [];

  function step() {
    const dt = Math.min(clock.getDelta(), 0.05);
    const t = clock.elapsedTime;

    // Направление движения
    const dir = new THREE.Vector3();
    if (!paused) {
      if (keys.has('KeyW') || keys.has('ArrowUp')) dir.z -= 1;
      if (keys.has('KeyS') || keys.has('ArrowDown')) dir.z += 1;
      if (keys.has('KeyA') || keys.has('ArrowLeft')) dir.x -= 1;
      if (keys.has('KeyD') || keys.has('ArrowRight')) dir.x += 1;
      if (dir.lengthSq() > 0) { moveTarget = null; pendingTalk = null; tapMarker.visible = false; }
      else if (moveTarget) {
        const to = moveTarget.clone().sub(pos).setY(0);
        const stopAt = pendingTalk ? 1.4 : 0.15;
        if (to.length() > stopAt) dir.copy(to);
        else {
          moveTarget = null;
          tapMarker.visible = false;
          if (pendingTalk) { const id = pendingTalk; pendingTalk = null; handlers.npcClick(id); }
        }
      }
    }
    const moving = dir.lengthSq() > 0;
    speed = THREE.MathUtils.lerp(speed, moving ? SPEED : 0, dt * 10);
    if (moving) {
      dir.normalize();
      const target = Math.atan2(dir.x, dir.z);
      let diff = target - heading;
      diff = Math.atan2(Math.sin(diff), Math.cos(diff));
      heading += diff * Math.min(1, dt * 12);
      const before = pos.clone();
      pos.addScaledVector(dir, speed * dt);
      collide(pos);
      // если упёрлись и не двигаемся — бросаем цель
      if (moveTarget && before.distanceTo(pos) < speed * dt * 0.1) { moveTarget = null; tapMarker.visible = false; }
    }
    pos.y = THREE.MathUtils.lerp(pos.y, map.heightAt(pos.x, pos.z), dt * 15);
    player.root.position.copy(pos);
    player.root.rotation.y = heading;
    player.update(dt, speed);

    if (tapMarker.visible) {
      tapMarker.scale.multiplyScalar(1 - dt * 0.6);
      tapMarker.material.opacity = 0.4 + Math.sin(t * 8) * 0.3;
    }

    // Персонажи поворачиваются к герою, когда он рядом
    for (const n of Object.values(npcObjs)) {
      n.char.root.visible = npcFilter(n.id);
      if (!n.char.root.visible) continue;
      const d = n.pos.distanceTo(pos);
      const target = d < 4 || n.lookAt ? Math.atan2(pos.x - n.pos.x, pos.z - n.pos.z) : n.baseRot;
      let diff = target - n.char.root.rotation.y;
      diff = Math.atan2(Math.sin(diff), Math.cos(diff));
      n.char.root.rotation.y += diff * Math.min(1, dt * 5);
      n.char.update(dt, 0);
    }

    map.update?.(dt, t, pos, camera.position);

    // Камера плавно следует за героем; во время разговора — немного приближается
    // У каждой карты свой ракурс: в Манхэттене камера смотрит вверх, на небоскрёбы
    const focus = talkFocus ? pos.clone().lerp(talkFocus, 0.5) : pos;
    const z = (talkFocus ? 0.72 : zoom) * (map.camZoom || 1);
    const offset = map.cam ? tmpV.set(...map.cam.offset) : tmpV.copy(CAM_OFFSET);
    const wantPos = focus.clone().add(offset.multiplyScalar(z));
    camPos.lerp(wantPos, Math.min(1, dt * 4));
    const look = map.cam?.look && !talkFocus ? tmpL.set(...map.cam.look) : tmpL.set(0, talkFocus ? 1.2 : 0.6, talkFocus ? 0 : -1.5);
    camLook.lerp(focus.clone().add(look), Math.min(1, dt * 4));
    camera.position.copy(camPos);
    camera.lookAt(camLook);

    sun.position.copy(pos).add(SUN_OFFSET);
    sun.target.position.copy(pos);

    SHADER.uTime.value = t;
    frameHooks.forEach((fn) => fn(dt, t));
    pipe.render(dt);
    requestAnimationFrame(step);
  }

  function resize() {
    const w = container.clientWidth, h = container.clientHeight;
    pipe.setSize(w, h);
    camera.aspect = w / h;
    // На узком экране телефона отодвигаем камеру, чтобы видеть больше
    camera.fov = w < h ? 44 : 30;
    camera.updateProjectionMatrix();
  }
  window.addEventListener('resize', resize);
  resize();
  requestAnimationFrame(step);

  const v = new THREE.Vector3();

  return {
    scene,
    get playerPos() { return pos; },
    get mapId() { return map.id; },
    maps,
    npcObjs,
    onInteract(fn) { handlers.interact = fn; },
    onNpcClick(fn) { handlers.npcClick = fn; },
    onFrame(fn) { frameHooks.push(fn); },
    setPaused(p) { paused = p; if (p) { keys.clear(); moveTarget = null; tapMarker.visible = false; } },
    focusOn(id) {
      const n = npcObjs[id];
      talkFocus = n ? n.pos.clone().setY(0) : null;
      Object.values(npcObjs).forEach((o) => { o.lookAt = o.id === id; });
    },
    npcTalk(id, seconds) { npcObjs[id]?.char.talk(seconds); },
    npcWave(id) { npcObjs[id]?.char.wave(); },
    playerWave() { player.wave(); },
    enterMap(id, spot = 'start') {
      map = maps[id];
      const [x, z] = map.spots[spot];
      pos.set(x, 0, z);
      heading = id === 'apartment' ? Math.PI / 2 : Math.PI;
      camPos.copy(pos).add(CAM_OFFSET);
      camLook.copy(pos);
      moveTarget = null;
      showOnly(id);
    },
    setNpcFilter(fn) { npcFilter = fn; },
    lights: { sun, hemi },
    pipe,
    camera,
    setSunOffset(x, y, z) { SUN_OFFSET.set(x, y, z); },
    npcDance(id, on) { npcObjs[id]?.char.setDance(on); },
    teleport(x, z, face) {
      pos.set(x, 0, z);
      if (face !== undefined) heading = face;
    },
    // Экранные координаты точки над головой (для значков «!» и подписей)
    toScreen(worldPos, out = { x: 0, y: 0, visible: false }) {
      v.copy(worldPos).project(camera);
      const rect = renderer.domElement.getBoundingClientRect();
      out.x = (v.x * 0.5 + 0.5) * rect.width;
      out.y = (-v.y * 0.5 + 0.5) * rect.height;
      out.visible = v.z < 1 && v.x > -1.2 && v.x < 1.2 && v.y > -1.2 && v.y < 1.2;
      return out;
    },
    nearestNpc(maxDist = 2.2) {
      let best = null, bd = maxDist;
      for (const n of Object.values(npcObjs)) {
        if (!n.char.root.visible) continue;
        const d = n.pos.distanceTo(pos);
        if (d < bd) { bd = d; best = n.id; }
      }
      return best;
    },
  };
}
