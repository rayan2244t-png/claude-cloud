// Тест уровня: ~3 минуты, 18 вопросов A1 → B1 (грамматика, слова, на слух).
// Ставит стартовый уровень и запоминает слабые правила — их потом предложит «Тренер».
import { el, ui, shuffle } from './dom.js';
import { state, save } from '../game/state.js';
import { LEVELS, levelInfo } from '../game/progress.js';
import { speak } from '../game/speech.js';
import { sfx } from '../game/audio.js';
import { GRAMMAR, ALL_WORDS } from '../data/learn/index.js';

function buildQuestions() {
  const pickRules = (lvl, n) => shuffle(GRAMMAR.filter((r) => r.level === lvl)).slice(0, n)
    .map((r) => ({ ...r.quiz[Math.floor(Math.random() * r.quiz.length)], level: lvl, rule: r.id }));
  const listen = (lvl, n) => shuffle(ALL_WORDS.filter((w) => w.level === lvl && !w.en.includes(' '))).slice(0, n).map((w) => ({
    q: '🎧 Что ты услышал? (выбери перевод)', audio: w.en, level: lvl === 'A2' ? 'A2' : 'A1',
    opts: shuffle([{ en: w.ru, ok: true }, ...shuffle(ALL_WORDS.filter((x) => x.key !== w.key && x.level === w.level)).slice(0, 3).map((x) => ({ en: x.ru }))]),
  }));
  return [
    ...pickRules('A1', 5), ...listen('A1', 1),
    ...pickRules('A2', 5), ...listen('A2', 1),
    ...pickRules('B1', 6),
  ];
}

export function startPlacement({ onDone } = {}) {
  const qs = buildQuestions();
  const score = { A1: [0, 0], A2: [0, 0], B1: [0, 0] };
  const weak = [];
  let i = 0;
  let wrongInRow = 0;

  const back = el('div', { class: 'modal-back placement' });
  const box = el('div', { class: 'modal place-box' });
  back.append(box);
  ui().append(back);

  function q() {
    if (i >= qs.length || wrongInRow >= 5) return finish();
    const item = qs[i];
    const opts = shuffle(item.opts);
    if (item.audio) setTimeout(() => speak(item.audio, { force: true }), 300);
    box.replaceChildren(
      el('div', { class: 'place-head' }, el('b', {}, '🎯 Тест уровня'), el('span', { class: 'muted' }, `${i + 1} / ${qs.length}`)),
      el('div', { class: 'bar wide' }, el('div', { style: { width: `${(i / qs.length) * 100}%` } })),
      el('div', { class: 'place-q' }, item.q),
      item.audio ? el('button', { class: 'btn listen', onclick: () => speak(item.audio, { force: true }) }, '🔊 Ещё раз') : null,
      el('div', { class: 'options' }, ...opts.map((o) => el('button', { class: 'option', onclick: () => answer(item, o.ok) }, o.en))),
      el('button', { class: 'btn ghost small', onclick: () => answer(item, false) }, 'Не знаю 🤷'),
    );
  }

  function answer(item, ok) {
    score[item.level][1]++;
    if (ok) { score[item.level][0]++; wrongInRow = 0; sfx('pop'); } else { wrongInRow++; if (item.rule) weak.push(item.rule); }
    i++;
    q();
  }

  function finish() {
    const pct = (l) => (score[l][1] ? score[l][0] / score[l][1] : 0);
    let lvl = 'A1.1';
    if (pct('A1') >= 0.5) lvl = 'A1.2';
    if (pct('A1') >= 0.8) lvl = 'A1.3';
    if (pct('A1') >= 0.8 && pct('A2') >= 0.5) lvl = 'A2.1';
    if (pct('A2') >= 0.8) lvl = 'A2.2';
    if (pct('A2') >= 0.7 && pct('B1') >= 0.65) lvl = 'B1';
    const target = LEVELS.find((l) => l.id === lvl);
    if (state.xp < target.xp) state.xp = target.xp;
    state.placement = { level: lvl, at: Date.now(), weak: [...new Set(weak)], score };
    save();
    sfx('levelup');
    const info = levelInfo();
    const recommend = {
      'A1.1': 'Начни с самого начала — глава 1 построена как раз для тебя. Не бойся ошибок!',
      'A1.2': 'Основы у тебя есть. Проходи главу 1 и учи 10 новых слов в день в Учебнике.',
      'A1.3': 'Хорошая база! Глава 1 пройдёт быстро — потом сразу в Манхэттен.',
      'A2.1': 'Отличный уровень. Пробегись по главе 1 и переходи к главе 2 (прошедшее время, can, -ing).',
      'A2.2': 'Сильный A2. Главное для тебя — шэдовинг и свободные разговоры с ИИ.',
      B1: 'Впечатляет! Сосредоточься на шэдовинге, идиомах и разговорах с ИИ — и правилах B1.',
    }[lvl];
    box.replaceChildren(
      el('div', { class: 'complete' },
        el('div', { class: 'daily-emoji' }, '🎓'),
        el('div', { class: 'muted' }, 'Твой уровень'),
        el('div', { class: 'lvl-big' }, info.cur.id),
        el('div', { class: 'daily-title' }, info.cur.title),
        el('div', { class: 'place-scores' }, ...['A1', 'A2', 'B1'].map((l) => el('div', { class: 'stat' }, el('b', {}, `${score[l][0]}/${score[l][1]}`), el('span', {}, l)))),
        el('div', {}, recommend),
        weak.length ? el('div', { class: 'muted small-note' }, `Что подтянуть: ${[...new Set(weak)].slice(0, 4).map((id) => GRAMMAR.find((r) => r.id === id)?.title).join(' · ')}. «Тренировка дня» будет это учитывать.`) : null,
        el('button', { class: 'btn primary wide', onclick: close }, 'Поехали! 🗽')),
    );
  }

  function close() {
    back.classList.add('out');
    setTimeout(() => back.remove(), 250);
    onDone?.(state.placement);
  }

  box.append(el('div', { class: 'complete' },
    el('div', { class: 'daily-emoji' }, '🎯'),
    el('div', { class: 'daily-title' }, 'Тест уровня'),
    el('div', {}, '18 коротких вопросов, около 3 минут. Игра подстроится под тебя: уровень разговоров с ИИ, рекомендации и тренировка дня.'),
    el('div', { class: 'muted small-note' }, 'Не угадывай — если не знаешь, жми «Не знаю». Так результат будет честнее.'),
    el('button', { class: 'btn primary wide', onclick: q }, 'Начать тест'),
    el('button', { class: 'btn ghost wide', onclick: () => { state.placement = { level: 'A1.1', skipped: true }; save(); close(); } }, 'Я новичок — пропустить')));
}
