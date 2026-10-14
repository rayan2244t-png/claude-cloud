// Обучение: короткие подсказки, которые появляются по ходу игры в нужный момент.
// Можно пропустить; пройти заново — Телефон → Настройки.
import { el, ui } from './dom.js';
import { state, save } from '../game/state.js';
import { sfx } from '../game/audio.js';

const STEPS = {
  move: { icon: '🚶', title: 'Как ходить', text: 'Компьютер: **WASD** или стрелки. Телефон: **тапни по земле** — герой пойдёт туда. Колёсико мыши — приблизить или отдалить.' },
  talk: { icon: '💬', title: 'Как говорить с людьми', text: 'Над человеком с заданием горит **!**. Подойди и нажми **E** или кнопку внизу экрана. Можно просто тапнуть по человеку.' },
  dialogue: { icon: '🎧', title: 'Диалог — это урок', text: '🔊 — послушать ещё раз, 🐢 — медленно, **RU** — перевод, 🗣️ — шэдовинг (повтори за персонажем). **Подчёркнутые слова** — нажми, и узнаешь перевод.' },
  mistakes: { icon: '❓', title: 'Ошибаться — нормально', text: 'Если ответишь неправильно, игра объяснит **почему** по-русски. Кнопка **❓ Как это работает** открывает правило. Все ошибки сохраняются в дневнике, и игра потом их повторит.' },
  phone: { icon: '📱', title: 'Твой телефон', text: 'Кнопка 📱 (или **P**): словарь, ошибки, задание дня, сообщения от друзей, магазин мебели и настройки. Кнопка 🎓 (или **L**) — **Учебник**: 1500 слов, фразы, конструкции, грамматика и шэдовинг.' },
  world: { icon: '🗽', title: 'Город учит сам', text: 'Прохожие говорят живые фразы 👂 — нажми на пузырь, чтобы перевести. Возле предметов появляются английские подписи. По городу спрятаны **золотые яблоки 🍎** со сленгом.' },
  time: { icon: '🌙', title: 'День и ночь', text: 'Время идёт: утро, день, вечер, ночь. У людей есть расписание (Джесс работает днём, музыкант Луис — только вечером). Спи в своей квартире, чтобы наступило утро.' },
};

const ORDER = Object.keys(STEPS);

export function createTutorial() {
  state.tutorial ||= {};
  let showing = false;
  const queue = [];

  function next() {
    if (showing || !queue.length) return;
    const id = queue.shift();
    if (state.tutorial[id] || state.tutorial.skipped) return next();
    showing = true;
    const s = STEPS[id];
    const n = ORDER.indexOf(id) + 1;
    const card = el('div', { class: 'tut-card' },
      el('div', { class: 'tut-icon' }, s.icon),
      el('div', { class: 'grow' },
        el('div', { class: 'tut-title' }, s.title, el('span', { class: 'muted' }, ` · ${n}/${ORDER.length}`)),
        el('div', { class: 'tut-text', html: s.text.replace(/\*\*(.+?)\*\*/g, '<b>$1</b>') }),
        el('div', { class: 'row' },
          el('button', { class: 'btn primary small', onclick: () => done(false) }, 'Понятно'),
          el('button', { class: 'btn ghost small', onclick: () => done(true) }, 'Пропустить обучение'))));
    ui().append(card);
    sfx('pop');
    function done(skip) {
      state.tutorial[id] = true;
      if (skip) state.tutorial.skipped = true;
      save();
      card.classList.add('out');
      setTimeout(() => { card.remove(); showing = false; setTimeout(next, 600); }, 300);
    }
  }

  return {
    // Показать подсказку (если ещё не видел)
    hint(id) {
      if (state.tutorial[id] || state.tutorial.skipped || queue.includes(id)) return;
      queue.push(id);
      next();
    },
    reset() { state.tutorial = {}; save(); },
  };
}
