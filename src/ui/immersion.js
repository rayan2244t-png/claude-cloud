// Погружение: прохожие говорят живые фразы, предметы подписаны по-английски.
// Нажми на пузырь или подпись — услышишь произношение, увидишь перевод, слово попадёт в словарь.
import * as THREE from 'three';
import { el, ui, md } from './dom.js';
import { state, save } from '../game/state.js';
import { addWord } from '../game/srs.js';
import { addXP } from '../game/progress.js';
import { speak } from '../game/speech.js';
import { CHATTER, LABELS } from '../data/immersion.js';

export function createImmersion({ engine, time, isBusy }) {
  const layer = el('div', { class: 'immersion' });
  ui().append(layer);
  const v = new THREE.Vector3();
  const sp = { x: 0, y: 0, visible: false };

  // ---------- Подписи предметов ----------
  const labelEls = LABELS.map((l) => {
    const node = el('button', { class: 'obj-label' }, el('b', {}, l.en));
    node.addEventListener('click', () => openCard(l.en, l.ru, l.note));
    layer.append(node);
    return { l, node };
  });

  function openCard(en, ru, note) {
    speak(en, { force: true });
    const isNew = addWord(en, ru);
    if (isNew) addXP(1);
    document.querySelector('.learn-card')?.remove();
    const card = el('div', { class: 'learn-card' },
      el('div', { class: 'lc-en' }, en, el('button', { class: 'icon-btn small', onclick: () => speak(en, { force: true, rate: 0.6 }) }, '🐢')),
      el('div', { class: 'lc-ru' }, ru),
      note ? el('div', { class: 'lc-note', html: md(note) }) : null,
      el('div', { class: 'lc-foot' }, isNew ? '＋ в словаре · +1 XP' : 'уже в словаре'));
    ui().append(card);
    setTimeout(() => card.classList.add('out'), 4200);
    setTimeout(() => card.remove(), 4700);
  }

  // ---------- Подслушанные фразы ----------
  let cooldown = 3;
  let bubble = null;
  const recent = [];

  function pickLine() {
    const map = engine.mapId;
    const when = time.raining ? 'rain' : time.isNight ? 'night' : 'day';
    const pool = CHATTER.filter((c) => (!c.map || c.map === map) && (!c.when || c.when === when) && !recent.includes(c.en));
    return pool[Math.floor(Math.random() * pool.length)];
  }

  function say(walker) {
    const line = pickLine();
    if (!line) return;
    recent.push(line.en);
    if (recent.length > 8) recent.shift();
    const node = el('button', { class: 'chatter' }, el('span', { class: 'ch-ear' }, '👂'), line.en);
    node.addEventListener('click', () => openCard(line.en, line.ru, line.note));
    layer.append(node);
    bubble = { node, walker, ttl: 6 };
    speak(line.en, { pitch: 0.8 + Math.random() * 0.6, volume: 0.55 });
  }

  engine.onFrame((dt) => {
    const busy = isBusy();
    layer.style.display = busy ? 'none' : '';
    if (busy) return;
    const p = engine.playerPos;

    // подписи: показываем ближайшие (до 4 штук)
    const near = labelEls
      .filter(({ l }) => l.map === engine.mapId && Math.hypot(l.pos[0] - p.x, l.pos[1] - p.z) < 4.2)
      .sort((a, b) => Math.hypot(a.l.pos[0] - p.x, a.l.pos[1] - p.z) - Math.hypot(b.l.pos[0] - p.x, b.l.pos[1] - p.z))
      .slice(0, 4);
    for (const item of labelEls) {
      const show = near.includes(item);
      item.node.classList.toggle('show', show);
      if (!show) continue;
      v.set(item.l.pos[0], 1.6, item.l.pos[1]);
      engine.toScreen(v, sp);
      item.node.style.transform = `translate(${sp.x}px, ${sp.y}px) translate(-50%, -100%)`;
    }

    // фразы прохожих
    const crowd = engine.maps[engine.mapId]?.crowd;
    if (bubble) {
      bubble.ttl -= dt;
      const root = bubble.walker.c.root;
      v.copy(root.position).setY(root.position.y + 2.4);
      engine.toScreen(v, sp);
      bubble.node.style.transform = `translate(${sp.x}px, ${sp.y}px) translate(-50%, -100%)`;
      if (bubble.ttl <= 0 || !root.visible) {
        const n = bubble.node;
        n.classList.add('out');
        setTimeout(() => n.remove(), 400);
        bubble = null;
      }
    } else if (crowd) {
      cooldown -= dt;
      if (cooldown <= 0) {
        cooldown = 7 + Math.random() * 6;
        const w = crowd.walkers
          .filter((x) => x.c.root.visible && x.c.root.position.distanceTo(p) < 6.5)
          .sort((a, b) => a.c.root.position.distanceTo(p) - b.c.root.position.distanceTo(p))[0];
        if (w) say(w);
      }
    }
  });

  return { openCard };
}
