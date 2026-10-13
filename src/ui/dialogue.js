// Диалоги-уроки. Каждый тип шага — отдельная функция в STEP_TYPES:
// чтобы добавить новый тип упражнения, допишите сюда функцию (step, ctx) => Promise.
import { el, ui, md, escapeHtml, shuffle, sleep, floatText, money } from './dom.js';
import { state, save, fillName, addMoney } from '../game/state.js';
import { check, prettyAnswer } from '../game/checker.js';
import { addXP, recordAnswer } from '../game/progress.js';
import { addWord } from '../game/srs.js';
import { speak, canSpeak, canListen, listen } from '../game/speech.js';
import { DICTIONARY } from '../data/index.js';

const CONFUSED = ['Sorry, what?', 'Huh?', 'Hmm, come again?', 'Wait, what?', 'Sorry?'];

// ---------- Подсветка слов из словаря ----------
let wordRegex = null;
function highlight(text) {
  if (!wordRegex) {
    const keys = [...DICTIONARY.keys()].sort((a, b) => b.length - a.length).map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    wordRegex = new RegExp(`\\b(${keys.join('|')})\\b`, 'gi');
  }
  return escapeHtml(text).replace(wordRegex, (m) => `<span class="w" data-w="${m.toLowerCase()}">${m}</span>`);
}

function wordPopup(span) {
  document.querySelector('.word-pop')?.remove();
  const en = span.dataset.w;
  const ru = DICTIONARY.get(en);
  const isNew = addWord(en, ru);
  const r = span.getBoundingClientRect();
  const pop = el('div', { class: 'word-pop', style: { left: `${r.left + r.width / 2}px`, top: `${r.top}px` } },
    el('b', {}, en), ' — ', ru,
    el('button', { class: 'icon-btn small', onclick: (e) => { e.stopPropagation(); speak(en, { force: true }); } }, '🔊'),
    el('div', { class: 'word-pop-note' }, isNew ? '＋ добавлено в словарь' : 'уже в словаре'),
  );
  document.body.append(pop);
  speak(en);
  setTimeout(() => document.addEventListener('pointerdown', () => pop.remove(), { once: true }), 0);
}

// ---------- Пузырьки сообщений ----------
function bubble(ctx, who, en, ru) {
  const isNpc = who === 'npc';
  const text = fillName(en);
  const ruText = ru ? fillName(ru) : '';
  const ruEl = el('div', { class: `bubble-ru ${state.settings.showRu ? 'show' : ''}` }, ruText);
  const enEl = el('div', { class: 'bubble-en', html: isNpc ? highlight(text) : escapeHtml(text) });
  enEl.addEventListener('click', (e) => { const w = e.target.closest('.w'); if (w) wordPopup(w); });
  const tools = isNpc
    ? el('div', { class: 'bubble-tools' },
      el('button', { class: 'icon-btn small', title: 'Послушать', onclick: () => speak(text, { pitch: ctx.speaker.pitch, force: true }) }, '🔊'),
      el('button', { class: 'icon-btn small', title: 'Послушать медленно', onclick: () => speak(text, { pitch: ctx.speaker.pitch, rate: 0.6, force: true }) }, '🐢'),
      ru ? el('button', { class: 'icon-btn small ru-btn', title: 'Перевод', onclick: () => ruEl.classList.toggle('show') }, 'RU') : null)
    : null;
  const b = el('div', { class: `bubble ${isNpc ? 'npc' : 'me'}` }, isNpc && ctx.speaker.mode !== 'phone' ? el('div', { class: 'bubble-name', style: { color: ctx.speaker.color } }, ctx.speaker.name) : null, enEl, ruEl, tools);
  ctx.log.append(b);
  ctx.log.scrollTop = ctx.log.scrollHeight;
  return b;
}

function npcSays(ctx, en, ru) {
  bubble(ctx, 'npc', en, ru);
  ctx.onTalk?.(Math.min(4, 0.6 + en.length * 0.05));
  return speak(fillName(en), { pitch: ctx.speaker.pitch });
}

function continueButton(ctx, label = 'Дальше ▸') {
  return new Promise((resolve) => {
    const btn = el('button', { class: 'btn primary wide' }, label);
    const onKey = (e) => {
      if (e.code === 'Enter' || e.code === 'Space' || e.code === 'KeyE') { e.preventDefault(); done(); }
    };
    const done = () => { document.removeEventListener('keydown', onKey); resolve(); };
    btn.addEventListener('click', done);
    setTask(ctx, btn);
    setTimeout(() => document.addEventListener('keydown', onKey), 150);
    btn.focus({ preventScroll: true });
  });
}

// replaceChildren без пустых значений (null/false не должны превращаться в текст)
function setTask(ctx, ...nodes) {
  ctx.task.replaceChildren(...nodes.filter((n) => n != null && n !== false));
}

function question(text) {
  return el('div', { class: 'task-q' }, text);
}

// Результат проверки: показывает объяснение ошибки или похвалу
function feedback(ctx, ok, { messages = [], correct, near = false } = {}) {
  ctx.feedback.replaceChildren();
  ctx.feedback.className = `feedback ${ok ? 'good' : 'bad'} show`;
  if (ok) {
    ctx.feedback.append(el('div', { class: 'fb-title' }, near ? '👍 Принято!' : pick(['✅ Отлично!', '✅ Верно!', '✅ Супер!', '✅ Так держать!'])));
  } else {
    ctx.feedback.append(el('div', { class: 'fb-title' }, '🤔 Не совсем'));
  }
  messages.forEach((m) => ctx.feedback.append(el('div', { class: 'fb-msg', html: md(m) })));
  if (!ok && correct) ctx.feedback.append(el('div', { class: 'fb-correct' }, '✓ Правильно: ', el('b', {}, correct)));
  if (!ok && ctx.speaker.mode !== 'phone') {
    const c = pick(CONFUSED);
    ctx.onTalk?.(0.8);
    speak(c, { pitch: ctx.speaker.pitch });
  }
}

const pick = (a) => a[Math.floor(Math.random() * a.length)];

// Общая логика для заданий: попытки, ошибки, опыт
function graded(ctx, step) {
  let tries = 0;
  return {
    get tries() { return tries; },
    wrong(given, correct, why) {
      tries++;
      ctx.result.mistakes++;
      if (tries === 1) {
        recordAnswer(step.topic, false, { id: step._id, given, correct, why: [].concat(why).join(' ') });
      }
    },
    right() {
      const xp = tries === 0 ? 5 : 2;
      if (tries === 0) recordAnswer(step.topic, true);
      ctx.result.xp += xp;
      addXP(xp);
      floatText(`+${xp} XP`);
      ctx.onCorrect?.(step, tries);
    },
  };
}

// ---------- Типы шагов ----------
export const STEP_TYPES = {
  async say(step, ctx) {
    npcSays(ctx, step.en, step.ru);
    await continueButton(ctx);
  },

  async tip(step, ctx) {
    // Все подсказки собираются в «Шпаргалку» в телефоне
    state.tips ||= {};
    if (!state.tips[step.title]) { state.tips[step.title] = step.text; save(); }
    const card = el('div', { class: 'tip-card' }, el('div', { class: 'tip-flag' }, '🇺🇸 Американский английский'), el('div', { class: 'tip-title' }, step.title), el('div', { class: 'tip-text', html: md(step.text) }));
    ctx.log.append(card);
    ctx.log.scrollTop = ctx.log.scrollHeight;
    await continueButton(ctx, 'Понятно ▸');
  },

  async choice(step, ctx) {
    const g = graded(ctx, step);
    const opts = shuffle(step.opts);
    return new Promise((resolve) => {
      const list = el('div', { class: 'options' });
      opts.forEach((o) => {
        const b = el('button', { class: 'option' }, o.en);
        b.addEventListener('click', async () => {
          if (o.ok) {
            list.querySelectorAll('button').forEach((x) => { x.disabled = true; });
            b.classList.add('right');
            feedback(ctx, true);
            g.right();
            bubble(ctx, 'me', o.en);
            await sleep(650);
            ctx.feedback.className = 'feedback';
            resolve();
          } else {
            b.classList.add('wrong');
            b.disabled = true;
            feedback(ctx, false, { messages: [o.why || 'Попробуй другой вариант.'] });
            g.wrong(o.en, step.opts.find((x) => x.ok).en, o.why);
          }
        });
        list.append(b);
      });
      setTask(ctx, question(step.q || 'Выбери ответ'), list);
    });
  },

  async build(step, ctx) {
    const g = graded(ctx, step);
    const words = step.answer.split(' ').map((w) => w.replace(/[,.?!]/g, ''));
    const pool = shuffle([...words, ...(step.extra || [])]);
    return new Promise((resolve) => {
      const line = el('div', { class: 'build-line' });
      const bank = el('div', { class: 'build-bank' });
      const tiles = pool.map((w) => {
        const t = el('button', { class: 'tile' }, w);
        t.addEventListener('click', () => {
          t.parentElement === bank ? line.append(t) : bank.append(t);
          ctx.feedback.className = 'feedback';
        });
        return t;
      });
      bank.append(...tiles);
      const checkBtn = el('button', { class: 'btn primary' }, 'Проверить');
      const resetBtn = el('button', { class: 'btn ghost' }, 'Сбросить');
      resetBtn.addEventListener('click', () => tiles.forEach((t) => bank.append(t)));
      checkBtn.addEventListener('click', async () => {
        const answer = [...line.children].map((t) => t.textContent).join(' ');
        const res = check(answer, [step.answer], step.hints);
        if (res.ok) {
          checkBtn.disabled = resetBtn.disabled = true;
          tiles.forEach((t) => { t.disabled = true; });
          feedback(ctx, true);
          g.right();
          bubble(ctx, 'me', step.answer);
          await sleep(700);
          ctx.feedback.className = 'feedback';
          resolve();
        } else {
          line.classList.add('shake');
          setTimeout(() => line.classList.remove('shake'), 400);
          feedback(ctx, false, { messages: res.messages, correct: g.tries >= 1 ? step.answer : null });
          g.wrong(answer || '(пусто)', step.answer, res.messages);
        }
      });
      setTask(ctx, question(step.q), line, bank, el('div', { class: 'row' }, resetBtn, checkBtn));
    });
  },

  async type(step, ctx) {
    return freeAnswer(step, ctx, false);
  },

  async speak(step, ctx) {
    return freeAnswer(step, ctx, true);
  },

  async listen(step, ctx) {
    const g = graded(ctx, step);
    const play = (rate) => speak(step.en, { pitch: ctx.speaker.pitch, rate, force: true });
    const showText = !canSpeak();
    return new Promise((resolve) => {
      const opts = step.opts.map((text, i) => ({ text, ok: i === step.ok }));
      const list = el('div', { class: 'options grid' });
      shuffle(opts).forEach((o) => {
        const b = el('button', { class: 'option' }, o.text);
        b.addEventListener('click', async () => {
          if (o.ok) {
            list.querySelectorAll('button').forEach((x) => { x.disabled = true; });
            b.classList.add('right');
            feedback(ctx, true, { messages: [`Он сказал: «${step.en}»`] });
            g.right();
            await continueButton(ctx);
            ctx.feedback.className = 'feedback';
            resolve();
          } else {
            b.classList.add('wrong');
            b.disabled = true;
            feedback(ctx, false, { messages: ['Послушай ещё раз — можно медленно 🐢'] });
            g.wrong(o.text, opts.find((x) => x.ok).text, 'Ошибка на слух');
            if (g.tries >= 2) ctx.feedback.append(el('div', { class: 'fb-msg' }, `Текст: «${step.en}»`));
          }
        });
        list.append(b);
      });
      setTask(ctx, 
        question(`🎧 ${step.q}`),
        el('div', { class: 'row center' },
          el('button', { class: 'btn listen', onclick: () => play() }, '🔊 Слушать'),
          el('button', { class: 'btn listen ghost', onclick: () => play(0.55) }, '🐢 Медленно')),
        showText ? el('div', { class: 'task-note' }, `(Озвучка недоступна в этом браузере. Текст: «${step.en}»)`) : null,
        list,
      );
      setTimeout(() => play(), 300);
    });
  },

  async pay(step, ctx) {
    const amount = Math.min(step.amount, Math.max(0, state.money));
    if (amount < step.amount) {
      ctx.log.append(el('div', { class: 'sys-note' }, '😅 Денег не хватает — тебя угостили! Заработать можно на смене бариста.'));
    }
    if (amount > 0) {
      addMoney(-amount);
      floatText(`−${money(amount)}`, 'money');
      ctx.log.append(el('div', { class: 'sys-note' }, `💵 Ты заплатил ${money(amount)}`));
    }
    ctx.log.scrollTop = ctx.log.scrollHeight;
    await sleep(500);
  },
};

// Свободный ответ: текстом или голосом
function freeAnswer(step, ctx, voiceFirst) {
  const g = graded(ctx, step);
  return new Promise((resolve) => {
    const input = el('input', { class: 'text-in', type: 'text', placeholder: 'Напиши по-английски…', autocomplete: 'off', autocapitalize: 'sentences', spellcheck: 'false' });
    const status = el('div', { class: 'task-note' });
    const submit = async (text, fromVoice = false) => {
      const variants = Array.isArray(text) ? text : [text];
      let res;
      for (const v of variants) {
        res = check(v, step.answers, step.hints);
        if (res.ok) { text = v; break; }
      }
      if (!Array.isArray(text) && res.ok) {
        input.disabled = true;
        if (step.setName && res.capture) {
          state.name = res.capture.replace(/\b\w/g, (c) => c.toUpperCase());
          save();
        }
        feedback(ctx, true, { messages: res.messages, near: res.nearOk });
        g.right();
        bubble(ctx, 'me', fromVoice ? `🎤 ${text}` : text);
        await sleep(res.nearOk ? 1400 : 700);
        ctx.feedback.className = 'feedback';
        resolve();
      } else {
        const given = Array.isArray(text) ? text[0] : text;
        const msgs = fromVoice ? [`Я услышал: «${given}»`, ...res.messages] : res.messages;
        feedback(ctx, false, { messages: msgs, correct: g.tries >= 1 ? prettyAnswer(step.example?.split(' / ')[0] || res.best, state.name || 'Anna') : null });
        if (normalizeEmpty(given)) g.wrong(given, step.example || res.best, res.messages);
      }
    };
    const checkBtn = el('button', { class: 'btn primary' }, 'Проверить');
    checkBtn.addEventListener('click', () => submit(input.value));
    input.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); submit(input.value); } });

    const micBtn = canListen()
      ? el('button', { class: `btn mic ${voiceFirst ? 'big' : ''}` }, '🎤 Сказать')
      : null;
    micBtn?.addEventListener('click', async () => {
      micBtn.classList.add('rec');
      status.textContent = 'Говори… 🎙️';
      try {
        const alts = await listen();
        status.textContent = '';
        await submit(alts, true);
      } catch (err) {
        status.textContent = err.message;
      } finally {
        micBtn.classList.remove('rec');
      }
    });
    const hintBtn = step.example ? el('button', { class: 'btn ghost small' }, '💡 Подсказка') : null;
    hintBtn?.addEventListener('click', () => {
      hintBtn.replaceWith(el('div', { class: 'task-note' }, 'Пример: ', el('b', {}, step.example), ' ', el('button', { class: 'icon-btn small', onclick: () => speak(step.example.split(' / ')[0], { force: true }) }, '🔊')));
    });

    const voiceNote = voiceFirst && !canListen() ? el('div', { class: 'task-note' }, 'Микрофон не поддерживается этим браузером — напиши ответ (голос работает в Chrome).') : null;
    setTask(ctx, 
      question(`${voiceFirst ? '🎤 ' : '✍️ '}${step.q}`),
      voiceFirst && micBtn ? el('div', { class: 'row center' }, micBtn) : null,
      voiceNote,
      el('div', { class: 'row' }, input, !voiceFirst && micBtn ? micBtn : null, checkBtn),
      status,
      hintBtn,
    );
    if (!voiceFirst || !canListen()) setTimeout(() => input.focus({ preventScroll: true }), 50);
  });
}

const normalizeEmpty = (s) => String(s || '').trim().length > 0;

// ---------- Запуск диалога ----------
// speaker: { name, role, color, pitch, mode: 'world' | 'phone', avatar }
export async function runDialogue({ speaker, steps, idPrefix = 'x', title, onTalk, onCorrect }) {
  const root = el('div', { class: `dialogue ${speaker.mode === 'phone' ? 'phone-skin' : ''}` });
  const header = el('div', { class: 'dlg-head' },
    el('div', { class: 'dlg-avatar', style: { background: speaker.color } }, speaker.avatar || speaker.name[0]),
    el('div', {}, el('div', { class: 'dlg-name' }, speaker.name), el('div', { class: 'dlg-role' }, title || speaker.role || '')),
    el('button', { class: 'icon-btn ru-toggle', title: 'Всегда показывать перевод', onclick: () => {
      state.settings.showRu = !state.settings.showRu;
      save();
      root.querySelectorAll('.bubble-ru').forEach((n) => n.classList.toggle('show', state.settings.showRu));
    } }, 'RU'),
  );
  const log = el('div', { class: 'dlg-log' });
  const fb = el('div', { class: 'feedback' });
  const task = el('div', { class: 'dlg-task' });
  root.append(header, log, fb, task);
  ui().append(root);
  requestAnimationFrame(() => root.classList.add('open'));

  const ctx = { speaker, log, task, feedback: fb, onTalk, onCorrect, result: { mistakes: 0, xp: 0 } };
  for (let i = 0; i < steps.length; i++) {
    const step = { ...steps[i], _id: steps[i]._id || `${idPrefix}:${i}` };
    const fn = STEP_TYPES[step.t];
    if (!fn) { console.warn('Неизвестный тип шага', step.t); continue; }
    await fn(step, ctx);
  }
  window.speechSynthesis?.cancel();
  root.classList.remove('open');
  setTimeout(() => root.remove(), 300);
  return ctx.result;
}
