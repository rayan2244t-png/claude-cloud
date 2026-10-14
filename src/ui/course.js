// «Курс грамматики A1 → B1»: уроки по порядку. Урок = правило «как это работает» + 12 заданий.
// Пройден урок — открывается следующий; звёзды за точность; ошибки уходят в «Работу над ошибками».
import { el, floatText } from './dom.js';
import { state, save } from '../game/state.js';
import { addXP, todayKey } from '../game/progress.js';
import { sfx } from '../game/audio.js';
import { runDialogue } from './dialogue.js';
import { COURSE, unitRule } from '../data/learn/course/index.js';

const RANK = { A1: 0, A2: 1, B1: 2 };
const LEVEL_NAMES = { A1: 'A1 · Начальный', A2: 'A2 · Базовый', B1: 'B1 · Средний' };
const TEACHER = { name: 'Ms. Parker', avatar: '📘', color: '#3f6aa8', role: 'Учитель грамматики', gender: 'f', pitch: 1, mode: 'world' };

const progress = () => (state.course ??= {});
const stars = (u) => progress()[u.id]?.stars || 0;
export const lessonToday = () => progress().lastDay === todayKey();

// Тест уровня в начале игры сразу открывает уроки своего уровня
function placementRank() {
  const lvl = state.placement?.level || 'A1.1';
  return lvl.startsWith('B') ? 2 : lvl.startsWith('A2') ? 1 : 0;
}
export function isOpen(i) {
  const u = COURSE[i];
  if (i === 0 || stars(u) > 0 || stars(COURSE[i - 1]) > 0) return true;
  // Уровни ниже твоего открыты целиком; на твоём уровне открыт первый урок
  const r = RANK[u.level], pr = placementRank();
  return r < pr || (r === pr && COURSE.findIndex((x) => x.level === u.level) === i);
}
export const nextUnit = () => COURSE.find((u, i) => isOpen(i) && !stars(u));
export const courseStats = () => ({ done: COURSE.filter((u) => stars(u) > 0).length, total: COURSE.length });

// Отрисовать курс внутри учебника. hooks: { busy(b), rerender(), explain(rule) → элемент }
export function courseView(body, hooks) {
  const { done, total } = courseStats();
  const next = nextUnit();
  body.replaceChildren(
    el('div', { class: 'course-hero' },
      el('div', { class: 'course-big' }, `${done}/${total}`),
      el('div', { class: 'grow' },
        el('b', {}, 'Курс грамматики: от нуля до B1'),
        el('div', { class: 'muted' }, 'Каждый урок: правило простыми словами + 12 заданий. Пройди урок — откроется следующий.'),
        el('div', { class: 'bar' }, el('div', { style: { width: `${Math.round((done / total) * 100)}%` } }))),
      next ? el('button', { class: 'btn primary', onclick: () => openUnit(body, next, hooks) }, '▶ Продолжить') : null),
    ...['A1', 'A2', 'B1'].map((lvl) => el('div', { class: 'course-level' },
      el('div', { class: 'section-title' }, LEVEL_NAMES[lvl]),
      ...COURSE.map((u, i) => [u, i]).filter(([u]) => u.level === lvl).map(([u, i]) => {
        const open = isOpen(i);
        const s = stars(u);
        return el('button', {
          class: `rule-card course-unit ${s ? 'done' : ''} ${u === next ? 'next' : ''}`,
          disabled: !open,
          onclick: () => openUnit(body, u, hooks),
        },
        el('span', { class: 'unit-num' }, open ? String(i + 1) : '🔒'),
        el('div', { class: 'grow' }, el('b', {}, u.title), el('div', { class: 'muted' }, u.goal)),
        el('span', { class: 'unit-stars' }, s ? '★'.repeat(s) + '☆'.repeat(3 - s) : open ? 'Новый' : ''));
      }))),
  );
}

function openUnit(body, u, hooks) {
  const rule = unitRule(u);
  const tasks = u.steps.filter((s) => s.t !== 'tip').length;
  body.scrollTop = 0;
  body.replaceChildren(
    el('button', { class: 'btn ghost', onclick: () => courseView(body, hooks) }, '← Все уроки'),
    el('div', { class: 'course-goal' }, '🎯 ', u.goal),
    rule ? hooks.explain(rule) : null,
    el('button', { class: 'btn primary wide big', onclick: () => startUnit(body, u, hooks) }, `▶ Начать урок · ${tasks} заданий`),
  );
}

async function startUnit(body, u, hooks) {
  hooks.busy(true);
  const res = await runDialogue({ speaker: TEACHER, steps: u.steps, idPrefix: `course:${u.id}`, title: `${u.level} · ${u.title}` });
  hooks.busy(false);
  const tasks = u.steps.filter((s) => s.t !== 'tip').length;
  const acc = Math.max(0, (tasks - res.mistakes) / tasks);
  const s = res.mistakes === 0 ? 3 : acc >= 0.85 ? 2 : acc >= 0.65 ? 1 : 0;
  const p = progress();
  const prev = p[u.id]?.stars || 0;
  if (s) p.lastDay = todayKey();
  p[u.id] = { stars: Math.max(prev, s), best: Math.max(p[u.id]?.best || 0, Math.round(acc * 100)), tries: (p[u.id]?.tries || 0) + 1 };
  let xp = 0;
  if (s > 0 && !prev) xp = 30 + s * 5;
  else if (s > prev) xp = (s - prev) * 5;
  if (xp) { addXP(xp); floatText(`+${xp} XP`); }
  save();
  sfx(s >= 2 ? 'levelup' : s ? 'correct' : 'wrong');
  const i = COURSE.indexOf(u);
  const next = COURSE[i + 1];
  body.replaceChildren(el('div', { class: 'complete' },
    el('div', { class: 'daily-emoji' }, s === 3 ? '🏆' : s ? '⭐' : '💪'),
    el('div', { class: 'daily-title' }, s ? `Урок пройден! ${'★'.repeat(s)}${'☆'.repeat(3 - s)}` : 'Почти! Нужно чуть точнее'),
    el('div', {}, `Верно с первого раза: ${Math.round(acc * 100)}% · ошибок: ${res.mistakes}`),
    s ? null : el('div', { class: 'muted' }, 'Чтобы открыть следующий урок, нужно 65% правильных ответов. Перечитай правило — и попробуй ещё раз!'),
    res.mistakes ? el('div', { class: 'muted small-note' }, 'Ошибки сохранены в «Работе над ошибками» (телефон) — их можно повторить позже.') : null,
    el('div', { class: 'row' },
      el('button', { class: 'btn wide', onclick: () => openUnit(body, u, hooks) }, '🔁 Ещё раз'),
      s && next ? el('button', { class: 'btn primary wide', onclick: () => openUnit(body, next, hooks) }, `▶ Дальше: ${next.title}`) : null,
      el('button', { class: 'btn ghost wide', onclick: () => courseView(body, hooks) }, 'Все уроки'))));
}
