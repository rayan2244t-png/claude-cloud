// Поездка на метро: вагон, настоящие объявления машиниста и вопрос на понимание.
import { el, ui, shuffle, sleep, floatText } from './dom.js';
import { speak, canSpeak } from '../game/speech.js';
import { addXP, recordAnswer } from '../game/progress.js';

const ANNOUNCEMENTS = {
  manhattan: [
    { en: 'This is a Manhattan-bound L train. The next stop is First Avenue.', q: 'Куда идёт поезд?', opts: ['В Манхэттен', 'В Бруклин', 'В аэропорт', 'В Квинс'] },
    { en: 'Stand clear of the closing doors, please.', q: 'О чём просит машинист?', opts: ['Отойти от закрывающихся дверей', 'Выйти из вагона', 'Показать билет', 'Уступить место'] },
    { en: 'The next stop is Times Square, 42nd Street.', q: 'Какая следующая станция?', opts: ['Times Square, 42-я улица', 'Times Square, 24-я улица', 'Union Square', 'Brooklyn Bridge'] },
  ],
  brooklyn: [
    { en: 'This is a Brooklyn-bound L train. The next stop is Bedford Avenue.', q: 'Куда идёт поезд?', opts: ['В Бруклин', 'В Манхэттен', 'В Бронкс', 'На Кони-Айленд'] },
    { en: 'Please be careful when exiting the train.', q: 'О чём предупреждает машинист?', opts: ['Быть осторожным при выходе', 'Не есть в вагоне', 'Держаться за поручни', 'Не шуметь'] },
    { en: 'We are delayed because of train traffic ahead. Thank you for your patience.', q: 'Почему поезд стоит?', opts: ['Впереди другие поезда', 'Сломались двери', 'Нет машиниста', 'Идёт дождь'] },
  ],
};

const NAMES = { manhattan: 'Манхэттен · Times Square', brooklyn: 'Бруклин · Bedford Av' };

export function startRide({ to, onArrive }) {
  const a = ANNOUNCEMENTS[to][Math.floor(Math.random() * ANNOUNCEMENTS[to].length)];
  const root = el('div', { class: 'subway' });
  const windows = el('div', { class: 'train-windows' }, ...[0, 1, 2].map(() => el('div', { class: 'train-window' }, el('div', { class: 'tunnel' }))));
  const panel = el('div', { class: 'train-panel' });
  const car = el('div', { class: 'train-car' },
    el('div', { class: 'train-line' }, el('span', { class: 'line-bullet' }, 'L'), ` → ${NAMES[to]}`),
    windows,
    el('div', { class: 'train-poles' }, el('span'), el('span'), el('span'), el('span')),
    el('div', { class: 'train-seats' }),
    panel);
  root.append(car);
  ui().append(root);
  requestAnimationFrame(() => root.classList.add('open'));

  const play = (rate) => speak(a.en, { pitch: 0.85, rate: rate ?? 0.95, force: true });
  const correct = a.opts[0];
  const list = el('div', { class: 'options grid' });
  let tries = 0;
  shuffle(a.opts).forEach((o) => {
    const b = el('button', { class: 'option' }, o);
    b.addEventListener('click', async () => {
      if (o === correct) {
        list.querySelectorAll('button').forEach((x) => { x.disabled = true; });
        b.classList.add('right');
        if (!tries) { addXP(8); floatText('+8 XP'); }
        recordAnswer('listening', !tries);
        panel.append(el('div', { class: 'fb-msg good-ans' }, `🔊 «${a.en}»`));
        await sleep(1200);
        arrive();
      } else {
        tries++;
        b.classList.add('wrong');
        b.disabled = true;
      }
    });
    list.append(b);
  });
  panel.append(
    el('div', { class: 'task-q' }, '🎧 Объявление в вагоне: ', a.q),
    el('div', { class: 'row center' },
      el('button', { class: 'btn listen', onclick: () => play() }, '🔊 Ещё раз'),
      el('button', { class: 'btn listen ghost', onclick: () => play(0.6) }, '🐢 Медленно')),
    ...(canSpeak() ? [] : [el('div', { class: 'task-note' }, `«${a.en}»`)]),
    list,
  );
  setTimeout(() => play(), 900);

  function arrive() {
    root.classList.add('arrive');
    speak(to === 'manhattan' ? 'Welcome to Manhattan!' : 'Welcome back to Brooklyn!', { force: true });
    setTimeout(() => {
      root.classList.remove('open');
      setTimeout(() => root.remove(), 500);
      onArrive();
    }, 900);
  }
}
