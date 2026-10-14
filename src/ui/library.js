// «Учебник»: 1500+ слов, фразы, конструкции по уровням, грамматика «как это работает», шэдовинг.
import { el, ui, escapeHtml, shuffle, floatText } from './dom.js';
import { state, save } from '../game/state.js';
import { addWord, grade } from '../game/srs.js';
import { addXP } from '../game/progress.js';
import { speak } from '../game/speech.js';
import { sfx } from '../game/audio.js';
import { openShadowing, compareWords } from './shadow.js';
import { canListen, listen } from '../game/speech.js';
import { SOUNDS } from '../data/learn/pronunciation.js';
import { runDialogue } from './dialogue.js';
import { WORD_TOPICS, ALL_WORDS, PHRASES, ALL_PHRASES, CONSTRUCTIONS, GRAMMAR } from '../data/learn/index.js';

// Мини-разметка для правил: **жирный**, таблицы | a | b |, абзацы
export function richText(text) {
  const blocks = text.trim().split(/\n\s*\n/);
  return blocks.map((b) => {
    const lines = b.split('\n');
    if (lines.every((l) => l.trim().startsWith('|'))) {
      const rows = lines.filter((l) => !/^\|\s*-/.test(l.trim())).map((l) => l.trim().slice(1, -1).split('|').map((c) => c.trim()));
      const [head, ...body] = rows;
      return `<table class="rule-table"><tr>${head.map((h) => `<th>${inline(h)}</th>`).join('')}</tr>${body.map((r) => `<tr>${r.map((c) => `<td>${inline(c)}</td>`).join('')}</tr>`).join('')}</table>`;
    }
    return `<p>${lines.map(inline).join('<br>')}</p>`;
  }).join('');
}
const inline = (s) => escapeHtml(s).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>');

const say = (t, rate) => speak(t, { force: true, rate });

let onBusy = () => {};
export function setLibraryHooks({ busy }) { onBusy = busy; }

export function openLibrary(tab = 'words', opts = {}) {
  const back = el('div', { class: 'lib-back' });
  const box = el('div', { class: 'lib' });
  back.append(box);
  ui().append(back);
  requestAnimationFrame(() => back.classList.add('open'));
  onBusy(true);
  sfx('whoosh');

  const close = () => {
    window.speechSynthesis?.cancel();
    back.classList.remove('open');
    setTimeout(() => back.remove(), 250);
    onBusy(false);
  };

  const TABS = [
    ['words', '📖 Слова'], ['phrases', '💬 Фразы'], ['constr', '🧩 Конструкции'], ['grammar', '📘 Грамматика'], ['shadow', '🗣️ Шэдовинг'], ['dictation', '✍️ Диктант'], ['pron', '👄 Произношение'],
  ];
  const tabBar = el('div', { class: 'lib-tabs' });
  const body = el('div', { class: 'lib-body' });
  box.append(
    el('div', { class: 'lib-head' }, el('div', { class: 'lib-title' }, '🎓 Учебник американского английского'), el('button', { class: 'icon-btn', onclick: close }, '✕')),
    tabBar, body,
  );

  function show(id, arg) {
    tab = id;
    tabBar.replaceChildren(...TABS.map(([tid, label]) => el('button', { class: `lib-tab ${tid === id ? 'sel' : ''}`, onclick: () => show(tid) }, label)));
    body.scrollTop = 0;
    VIEWS[id](arg);
  }

  // ---------- Слова ----------
  let wLevel = 'all', wTopic = WORD_TOPICS[0].id, wQuery = '';
  function wordsView() {
    const known = (w) => !!state.vocab[w.key];
    const total = ALL_WORDS.length;
    const learned = ALL_WORDS.filter(known).length;
    const search = el('input', { class: 'text-in', placeholder: '🔍 Поиск по-английски или по-русски…', value: wQuery });
    search.addEventListener('input', () => { wQuery = search.value; renderList(); });
    const list = el('div', { class: 'word-list' });

    const levelChips = el('div', { class: 'chips' }, ...[['all', 'Все'], ['A1', 'A1'], ['A2', 'A2']].map(([v, l]) =>
      el('button', { class: `chip-s ${wLevel === v ? 'sel' : ''}`, onclick: () => { wLevel = v; wordsView(); } }, l)));
    const topicChips = el('div', { class: 'chips scroll' }, ...WORD_TOPICS.map((t) => {
      const n = t.words.filter(known).length;
      return el('button', { class: `chip-s ${wTopic === t.id && !wQuery ? 'sel' : ''}`, onclick: () => { wTopic = t.id; wQuery = ''; wordsView(); } }, `${t.icon} ${t.name} `, el('small', {}, `${n}/${t.words.length}`));
    }));

    function current() {
      let ws = wQuery
        ? ALL_WORDS.filter((w) => w.en.toLowerCase().includes(wQuery.toLowerCase()) || w.ru.toLowerCase().includes(wQuery.toLowerCase())).slice(0, 80)
        : WORD_TOPICS.find((t) => t.id === wTopic).words;
      if (wLevel !== 'all') ws = ws.filter((w) => w.level === wLevel);
      return ws;
    }

    function renderList() {
      const ws = current();
      list.replaceChildren(...ws.map((w) => el('div', { class: `wl-row ${known(w) ? 'known' : ''}` },
        el('button', { class: 'icon-btn small', onclick: () => say(w.en) }, '🔊'),
        el('div', { class: 'grow' }, el('b', {}, w.en), w.past ? el('span', { class: 'muted' }, ` (${w.past})`) : null, el('div', { class: 'muted' }, w.ru)),
        el('span', { class: `lvl ${w.level}` }, w.level),
        known(w)
          ? el('span', { class: 'wl-ok' }, '✓')
          : el('button', { class: 'icon-btn small add', title: 'Добавить в словарь', onclick: (e) => { addWord(w.en, w.ru); sfx('pop'); e.target.closest('.wl-row').classList.add('known'); e.target.replaceWith(el('span', { class: 'wl-ok' }, '✓')); } }, '＋'))));
    }

    body.replaceChildren(
      el('div', { class: 'lib-progress' },
        el('div', {}, el('b', {}, `${learned} / ${total}`), ' слов в твоём словаре'),
        el('div', { class: 'bar wide' }, el('div', { style: { width: `${(learned / total) * 100}%` } }))),
      el('div', { class: 'row wrap' },
        el('button', { class: 'btn primary', onclick: () => learnSession(current().filter((w) => !known(w)).slice(0, 10)) }, '✨ Учить 10 новых слов'),
        el('button', { class: 'btn', onclick: () => learnSession(shuffle(current().filter((w) => !known(w))).slice(0, 10)) }, '🎲 Вперемешку')),
      search, levelChips, topicChips, list,
    );
    renderList();
  }

  // Урок новых слов: знакомство → проверка → в словарь с интервальным повторением
  function learnSession(words) {
    if (!words.length) { body.prepend(el('div', { class: 'empty small' }, 'В этой теме ты уже знаешь все слова! 🎉 Выбери другую.')); return; }
    let i = 0;
    const intro = () => {
      if (i >= words.length) return quiz();
      const w = words[i];
      say(w.en);
      body.replaceChildren(
        el('div', { class: 'learn-step muted' }, `Новое слово ${i + 1} из ${words.length}`),
        el('div', { class: 'flash' },
          el('div', { class: 'flash-en' }, w.en, el('button', { class: 'icon-btn', onclick: () => say(w.en) }, '🔊'), el('button', { class: 'icon-btn', onclick: () => say(w.en, 0.55) }, '🐢')),
          w.past ? el('div', { class: 'muted' }, `прошедшее время: ${w.past}`) : null,
          el('div', { class: 'flash-ru' }, w.ru),
          el('span', { class: `lvl ${w.level}` }, w.level)),
        el('div', { class: 'row center' },
          el('button', { class: 'btn', onclick: () => openShadowing([{ en: w.en, ru: w.ru }], { title: 'Произнеси слово' }) }, '🗣️ Произнести'),
          el('button', { class: 'btn primary', onclick: () => { i++; intro(); } }, i < words.length - 1 ? 'Дальше ›' : 'Проверить себя ›')),
      );
    };
    let qi = 0, right = 0;
    const order = shuffle(words);
    const quiz = () => {
      if (qi >= order.length) {
        order.forEach((w) => addWord(w.en, w.ru));
        addXP(right * 2);
        sfx('levelup');
        body.replaceChildren(el('div', { class: 'daily-card' },
          el('div', { class: 'daily-emoji' }, '🎉'),
          el('div', { class: 'daily-title' }, `${right} из ${order.length}`),
          el('div', { class: 'muted' }, 'Слова добавлены в словарь. Игра напомнит их повторить: завтра, через 2 дня, через 4…'),
          el('button', { class: 'btn primary wide', onclick: () => show('words') }, 'Готово')));
        return;
      }
      const w = order[qi];
      const reverse = qi % 2 === 1; // то en → ru, то ru → en
      const pool = shuffle(ALL_WORDS.filter((x) => x.key !== w.key && x.topic === (ALL_WORDS.find((a) => a.key === w.key)?.topic))).slice(0, 3);
      while (pool.length < 3) pool.push(shuffle(ALL_WORDS)[0]);
      const opts = shuffle([w, ...pool]);
      if (!reverse) say(w.en);
      body.replaceChildren(
        el('div', { class: 'learn-step muted' }, `Проверка ${qi + 1} из ${order.length}`),
        el('div', { class: 'flash' }, el('div', { class: 'flash-en' }, reverse ? w.ru : w.en, reverse ? null : el('button', { class: 'icon-btn', onclick: () => say(w.en) }, '🔊'))),
        el('div', { class: 'options' }, ...opts.map((o) => {
          const b = el('button', { class: 'option' }, reverse ? o.en : o.ru);
          b.addEventListener('click', () => {
            const ok = o.key === w.key;
            if (ok) { right++; sfx('correct'); } else sfx('wrong');
            b.classList.add(ok ? 'right' : 'wrong');
            if (!ok) [...b.parentElement.children].find((x) => x.textContent === (reverse ? w.en : w.ru))?.classList.add('right');
            if (reverse) say(w.en);
            setTimeout(() => { qi++; quiz(); }, ok ? 600 : 1400);
          });
          return b;
        })),
      );
    };
    intro();
  }

  // ---------- Фразы ----------
  let pTopic = PHRASES[0].id;
  function phrasesView() {
    const t = PHRASES.find((x) => x.id === pTopic);
    body.replaceChildren(
      el('div', { class: 'muted small-note' }, 'Готовые фразы, которые американцы говорят каждый день. Учи целиком — как одно слово.'),
      el('div', { class: 'chips scroll' }, ...PHRASES.map((x) => el('button', { class: `chip-s ${x.id === pTopic ? 'sel' : ''}`, onclick: () => { pTopic = x.id; phrasesView(); } }, `${x.icon} ${x.name}`))),
      el('button', { class: 'btn primary', onclick: () => openShadowing(t.phrases, { title: t.name }) }, `🗣️ Шэдовинг всей темы (${t.phrases.length})`),
      ...t.phrases.map((p, i) => phraseRow(p, () => openShadowing(t.phrases, { start: i, title: t.name }))),
    );
  }

  function phraseRow(p, onShadow) {
    const saved = !!state.vocab[p.en.toLowerCase()];
    return el('div', { class: 'phrase-row' },
      el('div', { class: 'grow' },
        el('div', { class: 'ph-en' }, p.en),
        el('div', { class: 'muted' }, p.ru),
        p.note ? el('div', { class: 'ph-note' }, `💡 ${p.note}`) : null),
      el('div', { class: 'ph-tools' },
        p.level ? el('span', { class: `lvl ${p.level}` }, p.level) : null,
        el('button', { class: 'icon-btn small', onclick: () => say(p.en) }, '🔊'),
        el('button', { class: 'icon-btn small', onclick: () => say(p.en, 0.55) }, '🐢'),
        el('button', { class: 'icon-btn small', title: 'Шэдовинг', onclick: onShadow }, '🗣️'),
        saved ? el('span', { class: 'wl-ok' }, '✓') : el('button', { class: 'icon-btn small add', onclick: (e) => { addWord(p.en, p.ru); sfx('pop'); e.target.replaceWith(el('span', { class: 'wl-ok' }, '✓')); } }, '＋')));
  }

  // ---------- Конструкции ----------
  let cLevel = 'A1';
  function constrView() {
    const list = CONSTRUCTIONS[cLevel];
    const examples = list.flatMap((c) => c.ex.map(([en, ru]) => ({ en, ru })));
    body.replaceChildren(
      el('div', { class: 'muted small-note' }, 'Шаблоны речи: берёшь конструкцию, подставляешь свои слова — и говоришь сразу правильно.'),
      el('div', { class: 'chips' }, ...Object.keys(CONSTRUCTIONS).map((l) => el('button', { class: `chip-s ${l === cLevel ? 'sel' : ''}`, onclick: () => { cLevel = l; constrView(); } }, `${l} (${CONSTRUCTIONS[l].length})`))),
      el('button', { class: 'btn primary', onclick: () => openShadowing(examples, { title: `Конструкции ${cLevel}` }) }, `🗣️ Шэдовинг всех примеров ${cLevel}`),
      ...list.map((c) => el('div', { class: 'constr' },
        el('div', { class: 'constr-p' }, c.p),
        el('div', { class: 'constr-ru' }, c.ru),
        c.note ? el('div', { class: 'ph-note' }, `💡 ${c.note}`) : null,
        ...c.ex.map(([en, ru]) => el('div', { class: 'constr-ex' },
          el('button', { class: 'icon-btn small', onclick: () => say(en) }, '🔊'),
          el('button', { class: 'icon-btn small', onclick: () => openShadowing([{ en, ru }], { title: c.p }) }, '🗣️'),
          el('div', { class: 'grow' }, el('b', {}, en), el('div', { class: 'muted' }, ru)))))),
    );
  }

  // ---------- Грамматика ----------
  let gLevel = 'A1';
  function grammarView(ruleId) {
    if (ruleId) return ruleView(GRAMMAR.find((r) => r.id === ruleId));
    const done = state.rulesDone || {};
    body.replaceChildren(
      el('div', { class: 'muted small-note' }, 'Как это работает: каждое правило объяснено по-русски, с формулой, примерами, типичными ошибками и мини-тренировкой.'),
      el('div', { class: 'chips' }, ...['A1', 'A2', 'B1'].map((l) => el('button', { class: `chip-s ${l === gLevel ? 'sel' : ''}`, onclick: () => { gLevel = l; grammarView(); } }, `${l} (${GRAMMAR.filter((r) => r.level === l).length})`))),
      ...GRAMMAR.filter((r) => r.level === gLevel).map((r) => el('button', { class: `rule-card ${done[r.id] ? 'done' : ''}`, onclick: () => ruleView(r) },
        el('div', { class: 'grow' }, el('b', {}, r.title), el('div', { class: 'muted' }, r.short)),
        el('span', { class: 'rule-mark' }, done[r.id] ? '✅' : '›'))),
    );
  }

  function ruleView(r) {
    body.replaceChildren(
      el('button', { class: 'btn ghost small', onclick: () => grammarView() }, '‹ Все правила'),
      ruleContent(r, () => close()),
    );
  }

  // ---------- Шэдовинг ----------
  function shadowView() {
    const best = state.shadow?.best || {};
    const sets = [
      ...PHRASES.map((t) => ({ name: `${t.icon} ${t.name}`, items: t.phrases })),
      ...Object.entries(CONSTRUCTIONS).map(([l, list]) => ({ name: `🧩 Конструкции ${l}`, items: list.flatMap((c) => c.ex.map(([en, ru]) => ({ en, ru }))) })),
    ];
    const myWords = Object.values(state.vocab).filter((w) => w.en.includes(' ')).map((w) => ({ en: w.en, ru: w.ru }));
    if (myWords.length) sets.unshift({ name: '⭐ Фразы из моего словаря', items: myWords });
    body.replaceChildren(
      el('div', { class: 'shadow-intro' },
        el('b', {}, 'Что такое шэдовинг?'),
        el('div', {}, 'Ты слушаешь носителя и повторяешь за ним как «тень» — сразу следом или одновременно, копируя ритм, ударения и интонацию. Это лучший способ поставить американское произношение и начать понимать быструю речь.'),
        el('div', { class: 'muted' }, `Сделано повторов: ${state.shadow?.count || 0} · Идеальных (90%+): ${Object.values(best).filter((s) => s >= 90).length}`)),
      el('div', { class: 'muted small-note' }, '🎧 Лучше в наушниках. Начни с 🐢 медленной скорости, затем ускоряйся.'),
      ...sets.map((s) => el('button', { class: 'rule-card', onclick: () => openShadowing(s.items, { title: s.name }) },
        el('div', { class: 'grow' }, el('b', {}, s.name), el('div', { class: 'muted' }, `${s.items.length} фраз · пройдено ${s.items.filter((x) => (best[x.en] || 0) >= 70).length}`)),
        el('span', { class: 'rule-mark' }, '▶'))),
    );
  }

  // ---------- Диктант ----------
  let dLevel = 'A1';
  function dictationView() {
    const pool = (l) => [...ALL_PHRASES.filter((p) => p.level === l && !p.en.includes('…') && /^[A-Za-z]/.test(p.en)),
      ...(CONSTRUCTIONS[l] || []).flatMap((c) => c.ex.map(([en, ru]) => ({ en, ru })))];
    body.replaceChildren(
      el('div', { class: 'shadow-intro' }, el('b', {}, '✍️ Диктант'), el('div', {}, 'Слушаешь фразу носителя и пишешь её. Тренирует понимание на слух и правописание — то, что не прокачать без практики.')),
      el('div', { class: 'chips' }, ...['A1', 'A2', 'B1'].map((l) => el('button', { class: `chip-s ${l === dLevel ? 'sel' : ''}`, onclick: () => { dLevel = l; dictationView(); } }, `${l} (${pool(l).length})`))),
      el('div', { class: 'muted small-note' }, `Лучший результат: ${state.dictBest?.[dLevel] ?? '—'}%`),
      el('button', { class: 'btn primary wide', onclick: () => runDictation(shuffle(pool(dLevel)).slice(0, 10)) }, '▶️ Начать диктант (10 фраз)'),
    );
  }

  function runDictation(items) {
    let i = 0, total = 0;
    const one = () => {
      if (i >= items.length) {
        const avg = Math.round(total / items.length);
        state.dictBest ||= {};
        state.dictBest[dLevel] = Math.max(state.dictBest[dLevel] || 0, avg);
        save();
        addXP(Math.round(avg / 10) + 5);
        sfx('levelup');
        body.replaceChildren(el('div', { class: 'daily-card' }, el('div', { class: 'daily-emoji' }, avg >= 80 ? '🏆' : '✍️'), el('div', { class: 'daily-title' }, `Точность: ${avg}%`),
          el('button', { class: 'btn primary wide', onclick: dictationView }, 'Готово')));
        return;
      }
      const it = items[i];
      const play = (r) => say(it.en, r);
      setTimeout(() => play(), 300);
      const input = el('input', { class: 'text-in', placeholder: 'Напиши, что услышал…', autocomplete: 'off', spellcheck: 'false' });
      const result = el('div', { class: 'sh-result' });
      const checkBtn = el('button', { class: 'btn primary' }, 'Проверить');
      const check = () => {
        if (checkBtn.dataset.done) { i++; one(); return; }
        const { words, hit, score } = compareWords(it.en, input.value);
        total += score;
        sfx(score >= 80 ? 'correct' : 'wrong');
        result.replaceChildren(
          el('div', { class: 'sh-score' }, `${score >= 90 ? '🔥' : score >= 60 ? '👍' : '💪'} ${score}%`),
          el('div', { class: 'sh-words' }, ...words.map((w, k) => el('span', { class: hit.has(k) ? 'ok' : 'miss' }, w))),
          el('div', {}, el('b', {}, it.en), el('div', { class: 'muted' }, it.ru || '')));
        checkBtn.textContent = i < items.length - 1 ? 'Дальше ›' : 'Итог ›';
        checkBtn.dataset.done = '1';
      };
      checkBtn.addEventListener('click', check);
      input.addEventListener('keydown', (e) => { if (e.key === 'Enter') check(); });
      body.replaceChildren(
        el('div', { class: 'learn-step muted' }, `Фраза ${i + 1} из ${items.length}`),
        el('div', { class: 'row center' }, el('button', { class: 'btn listen', onclick: () => play() }, '🔊 Слушать'), el('button', { class: 'btn listen ghost', onclick: () => play(0.55) }, '🐢 Медленно')),
        input, el('div', { class: 'row' }, el('div', { class: 'grow' }), checkBtn), result);
      setTimeout(() => input.focus({ preventScroll: true }), 100);
    };
    one();
  }

  // ---------- Произношение ----------
  function pronView(soundId) {
    if (soundId) return soundView(SOUNDS.find((s) => s.id === soundId));
    body.replaceChildren(
      el('div', { class: 'shadow-intro' }, el('b', {}, '👄 Американское произношение'), el('div', {}, 'Звуки, которые труднее всего даются русскоговорящим. Для каждого: как произносить, тренажёр «услышь разницу» и «скажи сам».')),
      ...SOUNDS.map((s) => el('button', { class: `rule-card ${state.pron?.[s.id] ? 'done' : ''}`, onclick: () => soundView(s) },
        el('span', { class: 'rule-mark' }, s.icon), el('div', { class: 'grow' }, el('b', {}, s.title), el('div', { class: 'muted' }, s.pairs.slice(0, 3).map((p) => p.join(' / ')).join(' · '))),
        el('span', { class: 'rule-mark' }, state.pron?.[s.id] ? '✅' : '›'))),
    );
  }

  function soundView(s) {
    body.replaceChildren(
      el('button', { class: 'btn ghost small', onclick: () => pronView() }, '‹ Все звуки'),
      el('div', { class: 'rule' },
        el('div', { class: 'rule-top' }, el('h3', {}, `${s.icon} ${s.title}`)),
        el('div', { class: 'rule-text', html: richText(s.how) }),
        el('div', { class: 'section-title' }, 'Минимальные пары — нажми и слушай разницу'),
        ...s.pairs.map(([a, b]) => el('div', { class: 'pair-row' },
          el('button', { class: 'pair-btn', onclick: () => say(a, 0.8) }, '🔊 ', a),
          el('span', { class: 'muted' }, 'vs'),
          el('button', { class: 'pair-btn', onclick: () => say(b, 0.8) }, '🔊 ', b),
          canListen() ? el('button', { class: 'icon-btn small', title: 'Скажи первое слово', onclick: (e) => sayCheck(a, e.currentTarget) }, '🎙️') : null)),
        el('button', { class: 'btn primary wide', onclick: () => earGame(s) }, '🎧 Тренажёр: услышь разницу (8 раундов)'),
        el('div', { class: 'section-title' }, 'Скажи сам — шэдовинг'),
        el('button', { class: 'btn wide', onclick: () => openShadowing(s.say.map((en) => ({ en, ru: '' })), { title: s.title }) }, `🗣️ Фразы со звуком (${s.say.length})`)),
    );
  }

  async function sayCheck(word, btn) {
    btn.textContent = '…';
    try {
      const alts = await listen();
      const ok = alts.some((a) => a.toLowerCase().split(/\s+/).includes(word.toLowerCase()));
      btn.textContent = ok ? '✅' : '❌';
      sfx(ok ? 'correct' : 'wrong');
      if (!ok) btn.title = `Услышал: ${alts[0]}`;
    } catch { btn.textContent = '🎙️'; }
  }

  function earGame(s) {
    let round = 0, right = 0;
    const next = () => {
      if (round >= 8) {
        state.pron ||= {};
        if (right >= 6) state.pron[s.id] = true;
        save();
        addXP(right);
        sfx(right >= 6 ? 'levelup' : 'soft');
        body.replaceChildren(el('div', { class: 'daily-card' }, el('div', { class: 'daily-emoji' }, right >= 6 ? '👂✨' : '👂'), el('div', { class: 'daily-title' }, `${right} из 8`),
          el('div', { class: 'muted' }, right >= 6 ? 'Отличный слух! Звук отмечен как пройденный.' : 'Послушай пары ещё раз медленно и попробуй снова.'),
          el('button', { class: 'btn primary wide', onclick: () => soundView(s) }, 'Готово')));
        return;
      }
      const pair = s.pairs[Math.floor(Math.random() * s.pairs.length)];
      const target = pair[Math.random() < 0.5 ? 0 : 1];
      setTimeout(() => say(target, 0.85), 250);
      body.replaceChildren(
        el('div', { class: 'learn-step muted' }, `Раунд ${round + 1} из 8 · что прозвучало?`),
        el('div', { class: 'row center' }, el('button', { class: 'btn listen', onclick: () => say(target, 0.85) }, '🔊 Ещё раз')),
        el('div', { class: 'options grid' }, ...shuffle(pair).map((w) => {
          const b = el('button', { class: 'option big-word' }, w);
          b.addEventListener('click', () => {
            const ok = w === target;
            if (ok) right++;
            sfx(ok ? 'correct' : 'wrong');
            b.classList.add(ok ? 'right' : 'wrong');
            round++;
            setTimeout(next, ok ? 600 : 1200);
          });
          return b;
        })));
    };
    next();
  }

  const VIEWS = { words: wordsView, phrases: phrasesView, constr: constrView, grammar: grammarView, shadow: shadowView, dictation: dictationView, pron: pronView };
  show(tab, opts.rule);
  return { close };
}

// Содержимое правила (используется и в учебнике, и во всплывающем окне из задания)
export function ruleContent(r, beforePractice) {
  const done = state.rulesDone?.[r.id];
  return el('div', { class: 'rule' },
    el('div', { class: 'rule-top' }, el('span', { class: `lvl ${r.level}` }, r.level), el('h3', {}, r.title)),
    el('div', { class: 'rule-short' }, r.short),
    el('div', { class: 'rule-text', html: richText(r.text) }),
    el('div', { class: 'rule-formula' }, '🧪 ', r.formula),
    el('div', { class: 'section-title' }, 'Примеры'),
    ...r.examples.map(([en, ru]) => el('div', { class: 'constr-ex' },
      el('button', { class: 'icon-btn small', onclick: () => say(en) }, '🔊'),
      el('button', { class: 'icon-btn small', onclick: () => openShadowing(r.examples.map(([e, rr]) => ({ en: e, ru: rr })), { title: r.title }) }, '🗣️'),
      el('div', { class: 'grow' }, el('b', {}, en), el('div', { class: 'muted' }, ru)))),
    el('div', { class: 'section-title' }, '⚠️ Типичные ошибки'),
    ...r.mistakes.map(([bad, good]) => el('div', { class: 'mistake-row' }, el('div', { class: 'bad-ans' }, '✗ ', bad), el('div', { class: 'good-ans' }, '✓ ', good))),
    el('button', { class: 'btn primary wide', onclick: async () => {
      beforePractice?.();
      onBusy(true);
      const res = await runDialogue({
        speaker: { name: 'Teacher', avatar: '📘', color: '#3f6aa8', role: r.title, gender: 'f', pitch: 1 },
        steps: [{ t: 'tip', title: r.title, text: r.short }, ...r.quiz.map((q) => ({ t: 'choice', topic: r.topics[0], ...q }))],
        idPrefix: `rule-${r.id}`,
      });
      onBusy(false);
      state.rulesDone ||= {};
      if (!state.rulesDone[r.id]) { state.rulesDone[r.id] = true; addXP(10); floatText('+10 XP'); }
      save();
      sfx(res.mistakes === 0 ? 'levelup' : 'correct');
    } }, done ? '🔁 Потренироваться ещё' : '🎯 Потренироваться (3 вопроса)'),
  );
}

// Всплывающее окно правила прямо из задания («❓ Как это работает»)
export function openRulePopup(rule) {
  const back = el('div', { class: 'modal-back rule-pop' });
  const box = el('div', { class: 'modal rule-modal' });
  const close = () => { back.classList.add('out'); setTimeout(() => back.remove(), 250); };
  box.append(el('button', { class: 'modal-x', onclick: close }, '✕'), ruleContentLite(rule));
  back.append(box);
  back.addEventListener('pointerdown', (e) => { if (e.target === back) close(); });
  ui().append(back);
  sfx('pop');
}

// Облегчённая версия (без кнопки тренировки — чтобы не прерывать текущий диалог)
function ruleContentLite(r) {
  return el('div', { class: 'rule' },
    el('div', { class: 'rule-top' }, el('span', { class: `lvl ${r.level}` }, r.level), el('h3', {}, `❓ ${r.title}`)),
    el('div', { class: 'rule-short' }, r.short),
    el('div', { class: 'rule-text', html: richText(r.text) }),
    el('div', { class: 'rule-formula' }, '🧪 ', r.formula),
    ...r.examples.slice(0, 3).map(([en, ru]) => el('div', { class: 'constr-ex' },
      el('button', { class: 'icon-btn small', onclick: () => say(en) }, '🔊'),
      el('div', { class: 'grow' }, el('b', {}, en), el('div', { class: 'muted' }, ru)))),
    el('div', { class: 'muted small-note' }, 'Полное правило с тренировкой — в Телефоне → Учебник → Грамматика.'),
  );
}

