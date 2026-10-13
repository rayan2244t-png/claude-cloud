// Мини-игра «Смена бариста»: слушай заказ и собери напиток.
import { el, ui, money, sleep, floatText } from './dom.js';
import { state, save, addMoney } from '../game/state.js';
import { addXP, recordAnswer } from '../game/progress.js';
import { addWord } from '../game/srs.js';
import { speak, canSpeak } from '../game/speech.js';
import { BARISTA } from '../data/shop.js';

const CUSTOMERS = 6;
const TIME = 25;
const pickR = (a) => a[Math.floor(Math.random() * a.length)];
const FACES = ['🧑', '👩', '👨', '🧔', '👱‍♀️', '👩‍🦱', '🧑‍🦰', '👴', '👵', '🧑‍🎓'];

function makeOrder() {
  const drink = pickR(BARISTA.drinks);
  const temp = drink[0] === 'hot chocolate' ? BARISTA.temps[0] : pickR(BARISTA.temps);
  const size = pickR(BARISTA.sizes);
  const tempWord = temp[0] === 'hot' && drink[0] !== 'hot chocolate' && Math.random() < 0.5 ? '' : temp[0] === 'hot' && drink[0] === 'hot chocolate' ? '' : `${temp[0]} `;
  const text = `${pickR(BARISTA.openers)} ${size[0]} ${tempWord}${drink[0]}, please?`;
  return { size: size[0], temp: temp[0], drink: drink[0], text, name: pickR(BARISTA.names), face: pickR(FACES) };
}

export function startShift({ onDone }) {
  const root = el('div', { class: 'barista' });
  ui().append(root);
  requestAnimationFrame(() => root.classList.add('open'));

  let n = 0, earned = 0, perfect = 0;
  let timer = null;

  const finish = () => {
    clearInterval(timer);
    state.shifts++;
    save();
    const xp = 10 + perfect * 5;
    addXP(xp);
    ['latte', 'cappuccino', 'tea', 'hot chocolate', 'large', 'small'].forEach((w) => addWord(w, { latte: 'латте', cappuccino: 'капучино', tea: 'чай', 'hot chocolate': 'горячий шоколад, какао', large: 'большой', small: 'маленький' }[w]));
    root.replaceChildren(el('div', { class: 'bar-card result' },
      el('div', { class: 'daily-emoji' }, '☕'),
      el('div', { class: 'daily-title' }, 'Смена окончена!'),
      el('div', {}, `Идеальных заказов: ${perfect} из ${CUSTOMERS}`),
      el('div', { class: 'big-money' }, `+${money(earned)}`),
      el('div', { class: 'muted' }, `+${xp} XP`),
      el('button', { class: 'btn primary wide', onclick: close }, 'Отлично!')));
  };

  const close = () => {
    clearInterval(timer);
    window.speechSynthesis?.cancel();
    root.classList.remove('open');
    setTimeout(() => root.remove(), 300);
    onDone?.();
  };

  const next = () => {
    if (n >= CUSTOMERS) return finish();
    n++;
    const order = makeOrder();
    const choice = { size: null, temp: null, drink: null };
    let left = TIME;
    const timeFill = el('div', { class: 'time-fill' });
    const say = (rate) => speak(order.text, { pitch: 0.8 + Math.random() * 0.5, rate, force: true });

    const group = (key, list, label) => el('div', { class: 'bar-group' },
      el('div', { class: 'bar-label' }, label),
      el('div', { class: 'bar-opts' }, ...list.map(([en, ru]) => {
        const b = el('button', { class: 'chip' }, el('b', {}, en), el('small', {}, ru));
        b.addEventListener('click', () => {
          choice[key] = en;
          b.parentElement.querySelectorAll('.chip').forEach((c) => c.classList.toggle('sel', c === b));
        });
        return b;
      })));

    const serve = el('button', { class: 'btn primary wide' }, 'Подать ☕');
    const textHint = el('div', { class: 'order-text hidden' }, `«${order.text}»`);
    serve.addEventListener('click', async () => {
      if (!choice.size || !choice.temp || !choice.drink) {
        serve.classList.add('shake');
        setTimeout(() => serve.classList.remove('shake'), 400);
        return;
      }
      clearInterval(timer);
      serve.disabled = true;
      const wrong = ['size', 'temp', 'drink'].filter((k) => choice[k] !== order[k]);
      textHint.classList.remove('hidden');
      if (!wrong.length) {
        perfect++;
        const tip = Math.round((1 + (left / TIME) * 3) * 4) / 4;
        const total = 3 + tip;
        earned += total;
        addMoney(total);
        floatText(`+${money(total)}`, 'money');
        recordAnswer('listening', true);
        speak(pickR(['Thank you so much!', 'Perfect, thanks!', 'Awesome, thank you!', 'You\'re the best!']), { force: true });
        textHint.classList.add('good');
      } else {
        const label = (o) => (o.drink === 'hot chocolate' ? `${o.size} ${o.drink}` : `${o.size} ${o.temp} ${o.drink}`);
        recordAnswer('listening', false, { id: `shift:${Date.now()}`, given: label(choice), correct: label(order), why: 'Ошибка на слух в смене бариста' });
        speak(pickR(['Um, that\'s not what I ordered...', 'Hmm, I asked for something else.', 'Oops, wrong order!']), { force: true });
        textHint.classList.add('bad');
        textHint.append(el('div', {}, `Нужно было: ${order.size} · ${order.temp} · ${order.drink}`));
      }
      await sleep(2300);
      next();
    });

    root.replaceChildren(el('div', { class: 'bar-card' },
      el('div', { class: 'bar-head' },
        el('div', {}, el('b', {}, `Клиент ${n} из ${CUSTOMERS}`), el('div', { class: 'muted' }, `Заработано: ${money(earned)}`)),
        el('button', { class: 'icon-btn', onclick: close, title: 'Закончить смену' }, '✕')),
      el('div', { class: 'time-bar' }, timeFill),
      el('div', { class: 'customer' }, el('div', { class: 'face' }, order.face), el('div', {},
        el('b', {}, order.name), el('div', { class: 'muted' }, 'говорит заказ…'),
        el('div', { class: 'row' },
          el('button', { class: 'btn listen', onclick: () => say() }, '🔊 Ещё раз'),
          el('button', { class: 'btn listen ghost', onclick: () => say(0.55) }, '🐢')))),
      !canSpeak() ? el('div', { class: 'order-text' }, `«${order.text}»`) : textHint,
      group('size', BARISTA.sizes, 'Размер'),
      group('temp', BARISTA.temps, 'Горячий / холодный'),
      group('drink', BARISTA.drinks, 'Напиток'),
      serve));
    setTimeout(() => say(), 350);
    timer = setInterval(() => {
      left -= 0.1;
      timeFill.style.width = `${Math.max(0, (left / TIME) * 100)}%`;
      if (left <= 0) {
        clearInterval(timer);
        speak('Never mind, I\'m late!', { force: true });
        recordAnswer('listening', false);
        sleep(1500).then(next);
      }
    }, 100);
  };

  root.append(el('div', { class: 'bar-card result' },
    el('div', { class: 'daily-emoji' }, '☕'),
    el('div', { class: 'daily-title' }, 'Смена бариста'),
    el('div', { class: 'muted' }, 'Клиент говорит заказ вслух. Выбери размер, горячий или со льдом, и напиток. Подсказка: hot coffee часто просят просто «a large coffee».'),
    el('button', { class: 'btn primary wide', onclick: next }, 'Поехали!')));
}
