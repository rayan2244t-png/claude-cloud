// Мини-игры: «Такси-навигатор», «Смена в дайнере», «Караоке у Луиса».
import { el, ui, money, sleep, floatText } from './dom.js';
import { addMoney } from '../game/state.js';
import { addXP, recordAnswer } from '../game/progress.js';
import { addWord } from '../game/srs.js';
import { speak, canListen, listen, stopSpeech } from '../game/speech.js';
import { sfx } from '../game/audio.js';
import { addGameStat } from '../game/social.js';
import { compareWords } from './shadow.js';

function shell(title, onClose) {
  const root = el('div', { class: 'barista' });
  const card = el('div', { class: 'bar-card' });
  root.append(card);
  ui().append(root);
  requestAnimationFrame(() => root.classList.add('open'));
  const close = () => {
    stopSpeech();
    root.classList.remove('open');
    setTimeout(() => root.remove(), 300);
    onClose?.();
  };
  const head = (sub) => el('div', { class: 'bar-head' }, el('div', {}, el('b', {}, title), sub ? el('div', { class: 'muted' }, sub) : null), el('button', { class: 'icon-btn', onclick: close }, '✕'));
  return { card, close, head };
}

// ===================== Такси-навигатор =====================
const DIRS = [[0, -1], [1, 0], [0, 1], [-1, 0]]; // вверх, вправо, вниз, влево
const NUM = ['', 'one block', 'two blocks', 'three blocks'];

function makeRoute() {
  const tokens = [];
  const parts = [];
  const legs = 2 + Math.floor(Math.random() * 2);
  for (let i = 0; i < legs; i++) {
    const n = 1 + Math.floor(Math.random() * 2);
    if (i > 0) {
      const t = Math.random() < 0.5 ? 'L' : 'R';
      tokens.push(t);
      parts.push(pick([`then turn ${t === 'L' ? 'left' : 'right'}`, `make a ${t === 'L' ? 'left' : 'right'}`, `take a ${t === 'L' ? 'left' : 'right'}`]));
    }
    for (let k = 0; k < n; k++) tokens.push('S');
    parts.push(i === 0 ? `Go straight ${NUM[n]}` : `and go ${NUM[n]}`);
  }
  const side = Math.random() < 0.5 ? 'left' : 'right';
  const place = pick(['the bank', 'the pizza place', 'the hotel', 'the museum', 'the coffee shop', 'the library', 'the hospital', 'the theater']);
  return { tokens, side, place, text: `Hi! Can you take me to ${place}? ${parts.join(', ')}. It's on the ${side}.` };
}
const pick = (a) => a[Math.floor(Math.random() * a.length)];

export function startTaxi({ onDone } = {}) {
  const { card, close, head } = shell('🚕 Такси-навигатор', onDone);
  let round = 0, perfect = 0, earned = 0;
  const ROUNDS = 5;

  const next = () => {
    if (round >= ROUNDS) {
      addGameStat('taxi');
      addXP(10 + perfect * 4);
      ['go straight', 'turn left', 'turn right', 'on the left', 'on the right', 'block'].forEach((w) => addWord(w, { 'go straight': 'идти прямо', 'turn left': 'повернуть налево', 'turn right': 'повернуть направо', 'on the left': 'слева', 'on the right': 'справа', block: 'квартал' }[w]));
      card.replaceChildren(head(), el('div', { class: 'complete' }, el('div', { class: 'daily-emoji' }, '🚕'), el('div', { class: 'daily-title' }, `Идеальных поездок: ${perfect} из ${ROUNDS}`), el('div', { class: 'big-money' }, `+${money(earned)}`), el('button', { class: 'btn primary wide', onclick: close }, 'Конец смены')));
      sfx('levelup');
      return;
    }
    round++;
    const route = makeRoute();
    const pressed = [];
    let pos = [2, 4], dir = 0;
    const path = [[...pos]];
    const grid = el('div', { class: 'taxi-grid' });
    const draw = () => {
      grid.replaceChildren(...Array.from({ length: 25 }, (_, i) => {
        const x = i % 5, y = Math.floor(i / 5);
        const isCar = x === pos[0] && y === pos[1];
        const visited = path.some(([px, py]) => px === x && py === y);
        return el('div', { class: `cell ${visited ? 'visited' : ''}` }, isCar ? el('span', { class: 'car', style: { transform: `rotate(${dir * 90}deg)` } }, '🚕') : '');
      }));
    };
    const say = (r) => speak(route.text, { force: true, rate: r, gender: Math.random() < 0.5 ? 'f' : 'm', who: route.place });
    const seq = el('div', { class: 'taxi-seq' });
    const press = (t) => {
      sfx('click');
      pressed.push(t);
      if (t === 'S') {
        const [dx, dy] = DIRS[dir];
        pos = [Math.max(0, Math.min(4, pos[0] + dx)), Math.max(0, Math.min(4, pos[1] + dy))];
        path.push([...pos]);
      } else dir = (dir + (t === 'R' ? 1 : 3)) % 4;
      seq.textContent = pressed.map((p) => ({ S: '⬆', L: '⬅', R: '➡' })[p]).join(' ');
      draw();
    };
    const finish = async (side) => {
      const ok = pressed.join('') === route.tokens.join('') && side === route.side;
      recordAnswer('directions', ok);
      card.querySelectorAll('button.ctrl').forEach((b) => { b.disabled = true; });
      if (ok) {
        perfect++;
        const tip = 5 + Math.round(Math.random() * 4);
        earned += tip;
        addMoney(tip);
        floatText(`+${money(tip)}`, 'money');
        speak(pick(['Perfect, thank you!', 'Great driving!', 'Keep the change!']), { force: true });
      } else {
        sfx('wrong');
        speak('Hmm, this is not the right place...', { force: true });
      }
      card.append(el('div', { class: `order-text ${ok ? 'good' : 'bad'}` }, `«${route.text}»`, el('div', {}, ok ? '✅ Доставлено!' : `Нужно было: ${route.tokens.map((p) => ({ S: '⬆', L: '⬅', R: '➡' })[p]).join(' ')} · справа/слева: ${route.side === 'left' ? 'слева' : 'справа'}`)));
      await sleep(2600);
      next();
    };
    draw();
    card.replaceChildren(
      head(`Пассажир ${round} из ${ROUNDS} · заработано ${money(earned)}`),
      el('div', { class: 'muted small-note' }, 'Слушай, куда ехать. ⬆ = проехать один квартал, ⬅ ➡ = повернуть. Потом скажи, с какой стороны остановиться.'),
      el('div', { class: 'row center' }, el('button', { class: 'btn listen', onclick: () => say() }, '🔊 Ещё раз'), el('button', { class: 'btn listen ghost', onclick: () => say(0.6) }, '🐢')),
      grid, seq,
      el('div', { class: 'row center' },
        el('button', { class: 'btn ctrl', onclick: () => press('L') }, '⬅ Налево'),
        el('button', { class: 'btn ctrl primary', onclick: () => press('S') }, '⬆ Прямо'),
        el('button', { class: 'btn ctrl', onclick: () => press('R') }, 'Направо ➡')),
      el('div', { class: 'row center' },
        el('button', { class: 'btn ctrl ghost', onclick: () => finish('left') }, '🛑 Стоп: слева'),
        el('button', { class: 'btn ctrl ghost', onclick: () => finish('right') }, '🛑 Стоп: справа')),
    );
    setTimeout(() => say(), 400);
  };
  card.replaceChildren(head(), el('div', { class: 'complete' },
    el('div', { class: 'daily-emoji' }, '🚕'),
    el('div', { class: 'daily-title' }, 'Подмени Маркуса за рулём!'),
    el('div', { class: 'muted' }, 'Пассажиры объясняют дорогу по-американски: go straight two blocks, make a left, it\'s on the right. Слушай и веди такси.'),
    el('button', { class: 'btn primary wide', onclick: next }, 'Поехали!')));
}

// ===================== Смена в дайнере =====================
const DINER = {
  mains: [['pancakes', 'панкейки'], ['a burger', 'бургер'], ['a grilled cheese', 'сэндвич с сыром'], ['eggs', 'яичница'], ['a club sandwich', 'клаб-сэндвич']],
  sides: [['fries', 'картошка фри'], ['bacon', 'бекон'], ['a salad', 'салат'], ['toast', 'тост'], ['hash browns', 'драники']],
  drinks: [['coffee', 'кофе'], ['orange juice', 'апельсиновый сок'], ['a milkshake', 'молочный коктейль'], ['a soda', 'газировка'], ['iced tea', 'холодный чай']],
  openers: ["Hi, I'll have", 'Can I get', "I'd like", 'Let me get', "We'll take"],
};

export function startDiner({ onDone } = {}) {
  const { card, close, head } = shell('🥞 Смена в дайнере', onDone);
  let n = 0, perfect = 0, earned = 0;
  const N = 6;
  const next = () => {
    if (n >= N) {
      addGameStat('diner');
      addXP(10 + perfect * 5);
      DINER.mains.concat(DINER.sides, DINER.drinks).forEach(([en, ru]) => addWord(en.replace(/^an? /, ''), ru));
      card.replaceChildren(head(), el('div', { class: 'complete' }, el('div', { class: 'daily-emoji' }, '🥞'), el('div', { class: 'daily-title' }, `Идеальных заказов: ${perfect} из ${N}`), el('div', { class: 'big-money' }, `+${money(earned)}`), el('button', { class: 'btn primary wide', onclick: close }, 'Отлично!')));
      sfx('levelup');
      return;
    }
    n++;
    const order = { main: pick(DINER.mains), side: pick(DINER.sides), drink: pick(DINER.drinks) };
    const text = `${pick(DINER.openers)} ${order.main[0]} with ${order.side[0]}, and ${order.drink[0]}, please.`;
    const choice = {};
    const say = (r) => speak(text, { force: true, rate: r, gender: Math.random() < 0.5 ? 'f' : 'm', who: text.slice(0, 6) });
    const group = (key, list, label) => el('div', { class: 'bar-group' }, el('div', { class: 'bar-label' }, label),
      el('div', { class: 'bar-opts' }, ...list.map(([en, ru]) => {
        const b = el('button', { class: 'chip' }, el('b', {}, en.replace(/^an? /, '')), el('small', {}, ru));
        b.addEventListener('click', () => { choice[key] = en; b.parentElement.querySelectorAll('.chip').forEach((c) => c.classList.toggle('sel', c === b)); });
        return b;
      })));
    const serve = el('button', { class: 'btn primary wide' }, 'Подать 🍽️');
    serve.addEventListener('click', async () => {
      if (!choice.main || !choice.side || !choice.drink) { serve.classList.add('shake'); setTimeout(() => serve.classList.remove('shake'), 400); return; }
      serve.disabled = true;
      const ok = choice.main === order.main[0] && choice.side === order.side[0] && choice.drink === order.drink[0];
      recordAnswer('listening', ok);
      if (ok) { perfect++; const t = 4 + Math.round(Math.random() * 4); earned += t; addMoney(t); floatText(`+${money(t)}`, 'money'); speak('Thank you, honey!', { force: true }); } else { sfx('wrong'); speak('Um, I ordered something else...', { force: true }); }
      card.append(el('div', { class: `order-text ${ok ? 'good' : 'bad'}` }, `«${text}»`));
      await sleep(2300);
      next();
    });
    card.replaceChildren(head(`Стол ${n} из ${N} · чаевые ${money(earned)}`),
      el('div', { class: 'customer' }, el('div', { class: 'face' }, pick(['🧑', '👩', '👨', '🧔', '👵', '👴', '👩‍🦱'])), el('div', {}, el('b', {}, 'Гость заказывает…'),
        el('div', { class: 'row' }, el('button', { class: 'btn listen', onclick: () => say() }, '🔊 Ещё раз'), el('button', { class: 'btn listen ghost', onclick: () => say(0.6) }, '🐢')))),
      group('main', DINER.mains, 'Основное блюдо'), group('side', DINER.sides, 'Гарнир'), group('drink', DINER.drinks, 'Напиток'), serve);
    setTimeout(() => say(), 350);
  };
  card.replaceChildren(head(), el('div', { class: 'complete' }, el('div', { class: 'daily-emoji' }, '🥞'), el('div', { class: 'daily-title' }, 'Смена у Линды'),
    el('div', { class: 'muted' }, 'Гости говорят быстро и по-американски: «Let me get the pancakes with bacon and a milkshake». Слушай и собирай заказ.'),
    el('button', { class: 'btn primary wide', onclick: next }, 'Начать смену')));
}

// ===================== Караоке у Луиса =====================
// Авторская песня (написана для игры)
const SONG = {
  title: 'Brooklyn Nights',
  lines: [
    ['I got off the train with a suitcase in my hand,', 'Я вышел из поезда с чемоданом в руке,'],
    ['didn\'t know the words, didn\'t understand.', 'не знал слов, не понимал ничего.'],
    ['Now I order coffee and I say "Have a good one",', 'Теперь я заказываю кофе и говорю «Хорошего дня»,'],
    ['walking down the street in the Brooklyn sun.', 'гуляя по улице под бруклинским солнцем.'],
    ['Oh, Brooklyn nights, the city lights,', 'О, бруклинские ночи, огни города,'],
    ['every single day I\'m getting it right!', 'с каждым днём у меня получается всё лучше!'],
  ],
};

export function startKaraoke({ onDone } = {}) {
  const { card, close, head } = shell(`🎤 Караоке: «${SONG.title}»`, onDone);
  let i = 0;
  const scores = [];
  const line = () => {
    if (i >= SONG.lines.length) {
      const avg = Math.round(scores.reduce((a, b) => a + b, 0) / Math.max(1, scores.length));
      addGameStat('karaoke');
      addXP(10 + Math.round(avg / 10));
      sfx(avg >= 70 ? 'levelup' : 'correct');
      card.replaceChildren(head(), el('div', { class: 'complete' }, el('div', { class: 'daily-emoji' }, avg >= 80 ? '🌟' : '🎤'), el('div', { class: 'daily-title' }, `Твоя оценка: ${avg}%`),
        el('div', { class: 'muted' }, avg >= 80 ? 'Луис аплодирует: «Bravo! You sound like a real New Yorker!»' : 'Луис: «Not bad, amigo! Practice makes perfect!»'),
        el('button', { class: 'btn primary wide', onclick: close }, 'Спасибо, Луис!')));
      return;
    }
    const [en, ru] = SONG.lines[i];
    const words = el('div', { class: 'karaoke-line' }, ...en.split(' ').map((w) => el('span', {}, `${w} `)));
    const result = el('div', { class: 'sh-result' });
    const play = () => {
      const spans = [...words.children];
      spans.forEach((s) => s.classList.remove('on'));
      sfx('click');
      // Луис поёт: подсветка слов в такт голосу
      speak(en, { rate: 0.82, pitch: 1.15, gender: 'm', who: 'Luis', force: true, onProgress: (f) => {
        const pos = f * en.length;
        let acc = 0;
        spans.forEach((s) => { s.classList.toggle('on', acc <= pos); acc += s.textContent.length; });
      } }).then(() => spans.forEach((s) => s.classList.add('on')));
    };
    const sing = async () => {
      if (!canListen()) { scores.push(70); i++; line(); return; }
      result.replaceChildren(el('div', { class: 'muted' }, '🎙️ Пой!'));
      try {
        const alts = await listen();
        const best = alts.map((a) => compareWords(en, a)).sort((a, b) => b.score - a.score)[0];
        scores.push(best.score);
        sfx(best.score >= 70 ? 'correct' : 'soft');
        result.replaceChildren(el('div', { class: 'sh-score' }, `${best.score}%`), el('div', { class: 'sh-words' }, ...best.words.map((w, k) => el('span', { class: best.hit.has(k) ? 'ok' : 'miss' }, w))),
          el('button', { class: 'btn primary', onclick: () => { i++; line(); } }, 'Следующая строчка ›'));
      } catch (err) { result.replaceChildren(el('div', { class: 'muted' }, err.message)); }
    };
    card.replaceChildren(head(`Строчка ${i + 1} из ${SONG.lines.length}`),
      el('div', { class: 'karaoke-stage' }, '🎸🎶'), words, el('div', { class: 'muted' }, ru),
      el('div', { class: 'row center' }, el('button', { class: 'btn listen', onclick: play }, '▶️ Послушать'), el('button', { class: 'btn mic', onclick: sing }, canListen() ? '🎤 Спеть' : 'Дальше ›')),
      result);
    setTimeout(play, 400);
  };
  card.replaceChildren(head(), el('div', { class: 'complete' }, el('div', { class: 'daily-emoji' }, '🎸'), el('div', { class: 'daily-title' }, 'Караоке у Луиса'),
    el('div', { class: 'muted' }, 'Луис играет свою песню про Бруклин. Послушай строчку и спой её — игра оценит, насколько точно ты попал в слова.'),
    el('button', { class: 'btn primary wide', onclick: line }, 'Начать')));
}

