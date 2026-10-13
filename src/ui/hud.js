// Верхняя панель (уровень, опыт, деньги), список дел в блокноте,
// значки над персонажами и кнопка действия.
import * as THREE from 'three';
import { el, ui, money } from './dom.js';
import { state, on } from '../game/state.js';
import { levelInfo } from '../game/progress.js';

export function createHud({ engine, npcs, getTodos, getNpcStatus, getInteraction, onPhone, onAction }) {
  const lvlBadge = el('div', { class: 'lvl-badge' });
  const lvlTitle = el('div', { class: 'lvl-title' });
  const xpFill = el('div', { class: 'xp-fill' });
  const xpText = el('div', { class: 'xp-text' });
  const moneyEl = el('div', { class: 'money' });
  const top = el('div', { class: 'hud-top' },
    el('div', { class: 'hud-level' }, lvlBadge, el('div', { class: 'hud-xp' }, lvlTitle, el('div', { class: 'xp-bar' }, xpFill), xpText)),
    moneyEl,
  );

  const todo = el('div', { class: 'todo', title: 'Нажми, чтобы свернуть', onclick: () => todo.classList.add('collapsed') });
  const todoToggle = el('button', { class: 'todo-toggle', onclick: () => todo.classList.remove('collapsed') }, '📝');

  const phoneBtn = el('button', { class: 'phone-btn', onclick: onPhone, title: 'Телефон' }, '📱', el('span', { class: 'badge hidden' }));
  const actionBtn = el('button', { class: 'action-btn hidden', onclick: () => onAction() });
  const help = el('div', { class: 'controls-help' }, 'WASD / стрелки или тап — идти · E — говорить');

  ui().append(top, todoToggle, todo, phoneBtn, actionBtn, help);
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

  function refresh() {
    const info = levelInfo();
    lvlBadge.textContent = info.cur.id;
    lvlTitle.textContent = info.cur.title;
    xpFill.style.width = `${Math.round(info.pct * 100)}%`;
    xpText.textContent = info.next ? `${state.xp} / ${info.next.xp} XP` : `${state.xp} XP`;
    moneyEl.textContent = money(state.money);

    todo.replaceChildren(el('div', { class: 'todo-title' }, 'To-do list'));
    for (const t of getTodos()) {
      todo.append(el('div', { class: `todo-item ${t.done ? 'done' : ''} ${t.optional ? 'opt' : ''}` }, t.text));
    }
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
