// Верхняя панель (уровень, опыт, деньги), список дел в блокноте,
// значки над персонажами и кнопка действия.
import * as THREE from 'three';
import { sfx } from '../game/audio.js';
import { el, ui, money } from './dom.js';
import { state, on } from '../game/state.js';
import { levelInfo } from '../game/progress.js';

export function createHud({ engine, npcs, getTodos, getNpcStatus, getInteraction, getClock, onPhone, onLibrary, onAction, onShout }) {
  const lvlBadge = el('div', { class: 'lvl-badge' });
  const lvlTitle = el('div', { class: 'lvl-title' });
  const xpFill = el('div', { class: 'xp-fill' });
  const xpText = el('div', { class: 'xp-text' });
  const moneyEl = el('div', { class: 'money' });
  const clockEl = el('div', { class: 'clock' });
  const top = el('div', { class: 'hud-top' },
    clockEl,
    el('div', { class: 'hud-level' }, lvlBadge, el('div', { class: 'hud-xp' }, lvlTitle, el('div', { class: 'xp-bar' }, xpFill), xpText)),
    moneyEl,
  );

  const todo = el('div', { class: 'todo', title: 'Нажми, чтобы свернуть', onclick: () => todo.classList.add('collapsed') });
  const todoToggle = el('button', { class: 'todo-toggle', onclick: () => todo.classList.remove('collapsed') }, '📝');

  const phoneBtn = el('button', { class: 'phone-btn', onclick: onPhone, title: 'Телефон' }, '📱', el('span', { class: 'badge hidden' }));
  const libBtn = el('button', { class: 'lib-btn', onclick: () => onLibrary(), title: 'Учебник (L)' }, '🎓');
  const actionBtn = el('button', { class: 'action-btn hidden', onclick: () => onAction() });
  const shoutBtn = el('button', { class: 'shout-btn', onclick: () => onShout?.(), title: 'Крикнуть «Hey!» (H)' }, '📣');
  const help = el('div', { class: 'controls-help' }, 'WASD / стрелки или тап — идти · E — действие · H — «Hey!»');

  ui().append(top, todoToggle, todo, phoneBtn, libBtn, shoutBtn, actionBtn, help);
  // На телефоне список дел по умолчанию свёрнут, чтобы не закрывать город
  if (window.innerWidth < 640) todo.classList.add('collapsed');
  setTimeout(() => help.classList.add('fade'), 9000);

  // Значки над головами
  const markers = {};
  for (const npc of Object.values(npcs)) {
    const m = el('div', { class: 'npc-marker' }, el('div', { class: 'mk-icon' }), el('div', { class: 'mk-name' }, npc.name, el('small', {}, npc.role)));
    ui().append(m);
    markers[npc.id] = m;
  }

  const seen = new Map();
  function refresh() {
    const info = levelInfo();
    lvlBadge.textContent = info.cur.id;
    lvlTitle.textContent = info.cur.title;
    xpFill.style.width = `${Math.round(info.pct * 100)}%`;
    xpText.textContent = info.next ? `${state.xp} / ${info.next.xp} XP` : `${state.xp} XP`;
    moneyEl.textContent = money(state.money);

    // Зачёркиваем «карандашом» только то, что выполнено только что
    todo.replaceChildren(el('div', { class: 'todo-title' }, 'To-do list'));
    let fresh = false;
    for (const t of getTodos()) {
      const key = t.text.replace(/ — несу!$/, '');
      const isNew = t.done && seen.has(key) && !seen.get(key);
      if (isNew) fresh = true;
      seen.set(key, !!t.done);
      todo.append(el('div', { class: `todo-item ${t.done ? 'done' : ''} ${isNew ? 'fresh' : ''} ${t.optional ? 'opt' : ''}` }, t.text));
    }
    if (fresh) { sfx('scribble'); todo.classList.remove('collapsed'); }
    const unread = state.phone.unread.length;
    const badge = phoneBtn.querySelector('.badge');
    badge.textContent = unread;
    badge.classList.toggle('hidden', !unread);
  }
  on('change', refresh);
  refresh();

  const head = new THREE.Vector3();
  const sp = { x: 0, y: 0, visible: false };
  engine.onFrame(() => {
    const near = engine.nearestNpc(4.5);
    for (const [id, m] of Object.entries(markers)) {
      const n = engine.npcObjs[id];
      if (!n.char.root.visible) { m.style.display = 'none'; continue; }
      head.copy(n.pos).setY(2.55);
      engine.toScreen(head, sp);
      m.style.display = sp.visible ? '' : 'none';
      m.style.transform = `translate(${sp.x}px, ${sp.y}px)`;
      const st = getNpcStatus(id);
      m.dataset.status = st;
      m.querySelector('.mk-icon').textContent = st === 'quest' ? '!' : st === 'talk' ? '💬' : st === 'shift' ? '☕' : '';
      m.classList.toggle('near', near === id);
    }

    const c = getClock();
    if (clockEl.textContent !== c) clockEl.textContent = c;

    const act = getInteraction();
    if (act) {
      actionBtn.textContent = act.label;
      actionBtn.classList.remove('hidden');
    } else {
      actionBtn.classList.add('hidden');
    }
  });

  return {
    refresh,
    hide(h) { document.body.classList.toggle('in-dialogue', h); },
  };
}
