// Шэдовинг: слушаешь носителя, повторяешь следом или одновременно,
// игра записывает тебя, сравнивает с оригиналом и показывает, какие слова получились.
import { el, ui } from './dom.js';
import { state, save } from '../game/state.js';
import { addXP } from '../game/progress.js';
import { normalize } from '../game/checker.js';
import { canListen, speak, stopSpeech } from '../game/speech.js';
import { sfx } from '../game/audio.js';

// Сравнение: какие слова оригинала прозвучали у игрока (по порядку, LCS)
export function compareWords(target, said) {
  const t = normalize(target).split(' ').filter(Boolean);
  const s = normalize(said).split(' ').filter(Boolean);
  const dp = Array.from({ length: t.length + 1 }, () => new Array(s.length + 1).fill(0));
  for (let i = t.length - 1; i >= 0; i--)
    for (let j = s.length - 1; j >= 0; j--)
      dp[i][j] = t[i] === s[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
  const hit = new Set();
  let i = 0, j = 0;
  while (i < t.length && j < s.length) {
    if (t[i] === s[j]) { hit.add(i); i++; j++; } else if (dp[i + 1][j] >= dp[i][j + 1]) i++; else j++;
  }
  return { words: t, hit, score: t.length ? Math.round((hit.size / t.length) * 100) : 0 };
}

// items: [{ en, ru }] — список фраз; start — с какой начать
export function openShadowing(items, { start = 0, title = 'Шэдовинг', onClose } = {}) {
  let idx = start;
  let rate = 0.85;
  let loop = false;
  let hideText = false;
  let recUrl = null;
  let mediaRec = null;
  let playing = false;

  const back = el('div', { class: 'modal-back shadow-back' });
  const box = el('div', { class: 'modal shadow-box' });
  back.append(box);
  ui().append(back);

  const close = () => {
    stopSpeech();
    stopRec();
    back.classList.add('out');
    setTimeout(() => back.remove(), 250);
    onClose?.();
  };

  function stopRec() {
    try { mediaRec?.state === 'recording' && mediaRec.stop(); } catch { /* ignore */ }
  }

  function render() {
    const item = items[idx];
    const words = item.en.split(/(\s+)/);
    const textEl = el('div', { class: `sh-text ${hideText ? 'blur' : ''}` });
    let charPos = 0;
    words.forEach((w) => {
      if (/^\s+$/.test(w)) { textEl.append(w); charPos += w.length; return; }
      const span = el('span', { class: 'sh-w', 'data-start': charPos }, w);
      textEl.append(span);
      charPos += w.length;
    });
    const result = el('div', { class: 'sh-result' });
    const status = el('div', { class: 'task-note' });

    // Подсветка слов «караоке» в такт речи
    const speakIt = () => {
      const spans = [...textEl.querySelectorAll('.sh-w')];
      return speak(item.en, { rate, force: true, onProgress: (f) => {
        const pos = f * item.en.length;
        spans.forEach((s) => s.classList.toggle('on', Number(s.dataset.start) <= pos && Number(s.dataset.start) + s.textContent.length > pos));
      } }).then(() => spans.forEach((s) => s.classList.remove('on')));
    };

    async function listenLoop() {
      if (playing) { playing = false; stopSpeech(); return; }
      playing = true;
      do {
        await speakIt();
        if (loop && playing) await new Promise((r) => setTimeout(r, 900 + item.en.length * 25));
      } while (loop && playing);
      playing = false;
    }

    // Запись своего голоса + распознавание речи
    async function record(together) {
      result.replaceChildren();
      if (recUrl) { URL.revokeObjectURL(recUrl); recUrl = null; }
      let stream = null;
      try {
        stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      } catch {
        status.textContent = 'Нет доступа к микрофону. Разреши его в браузере 🎙️';
        return;
      }
      const chunks = [];
      mediaRec = new MediaRecorder(stream);
      mediaRec.ondataavailable = (e) => chunks.push(e.data);
      mediaRec.onstop = () => {
        stream.getTracks().forEach((t) => t.stop());
        recUrl = URL.createObjectURL(new Blob(chunks, { type: mediaRec.mimeType || 'audio/webm' }));
        recBtn.disabled = togetherBtn.disabled = false;
        compareBtn.disabled = false;
        status.textContent = '';
      };
      mediaRec.start();
      recBtn.disabled = togetherBtn.disabled = true;
      status.textContent = together ? '🎧 Говори вместе с диктором (лучше в наушниках)…' : '🎙️ Говори! Запись идёт…';
      sfx('rec');

      const Rec = window.SpeechRecognition || window.webkitSpeechRecognition;
      let transcript = '';
      const recog = Rec ? new Rec() : null;
      if (recog) {
        recog.lang = 'en-US';
        recog.interimResults = false;
        recog.maxAlternatives = 3;
        recog.onresult = (e) => {
          const alts = Array.from(e.results[0]).map((a) => a.transcript);
          transcript = alts.map((a) => ({ a, s: compareWords(item.en, a).score })).sort((x, y) => y.s - x.s)[0].a;
        };
        recog.onend = () => { stopRec(); showResult(transcript); };
        recog.onerror = () => {};
        try { recog.start(); } catch { /* ignore */ }
      }
      if (together) speakIt();
      // Страховка: остановить запись через разумное время
      setTimeout(() => { if (mediaRec?.state === 'recording') { try { recog?.stop(); } catch { /* */ } stopRec(); if (!recog) showResult(''); } }, 2500 + item.en.length * 120);
    }

    function showResult(said) {
      if (!canListen()) {
        result.replaceChildren(el('div', { class: 'muted' }, 'Распознавание речи доступно в Chrome. Послушай свою запись и сравни с оригиналом.'));
        return;
      }
      if (!said) {
        result.replaceChildren(el('div', { class: 'muted' }, 'Не расслышал 🤔 Попробуй громче или ближе к микрофону.'));
        return;
      }
      const { words, hit, score } = compareWords(item.en, said);
      const grade = score >= 90 ? ['🔥', 'Идеально!'] : score >= 70 ? ['👍', 'Хорошо!'] : score >= 40 ? ['🙂', 'Неплохо, ещё разок!'] : ['💪', 'Попробуй медленнее'];
      result.replaceChildren(
        el('div', { class: 'sh-score' }, `${grade[0]} ${score}% — ${grade[1]}`),
        el('div', { class: 'sh-words' }, ...words.map((w, i) => el('span', { class: hit.has(i) ? 'ok' : 'miss' }, w))),
        el('div', { class: 'muted' }, `Распознано: «${said}»`),
      );
      sfx(score >= 70 ? 'correct' : 'soft');
      state.shadow ||= { count: 0, best: {} };
      state.shadow.count++;
      const prev = state.shadow.best[item.en] || 0;
      if (score > prev) state.shadow.best[item.en] = score;
      save();
      if (score >= 70 && prev < 70) addXP(3);
    }

    const recBtn = el('button', { class: 'btn mic', onclick: () => record(false) }, '🎙️ Повторить');
    const togetherBtn = el('button', { class: 'btn mic', onclick: () => record(true) }, '🎧 Вместе');
    const compareBtn = el('button', { class: 'btn', disabled: true, onclick: async () => {
      await speakIt();
      if (recUrl) { const a = new Audio(recUrl); a.play(); }
    } }, '⚖️ Сравнить');

    const speedBtns = [[0.6, '🐢 0.6'], [0.85, '0.85'], [1, '1.0']].map(([v, label]) => {
      const b = el('button', { class: `chip-s ${rate === v ? 'sel' : ''}` }, label);
      b.addEventListener('click', () => { rate = v; render(); });
      return b;
    });

    box.replaceChildren(
      el('button', { class: 'modal-x', onclick: close }, '✕'),
      el('div', { class: 'sh-head' }, el('b', {}, `🗣️ ${title}`), el('span', { class: 'muted' }, `${idx + 1} / ${items.length}`)),
      el('div', { class: 'sh-steps muted' }, '1. Послушай  2. Повтори следом или вместе  3. Сравни'),
      textEl,
      el('div', { class: `sh-ru ${hideText ? 'show' : ''}` }, item.ru || ''),
      el('div', { class: 'row center wrap' },
        el('button', { class: 'btn listen', onclick: listenLoop }, '▶️ Слушать'),
        ...speedBtns,
        el('button', { class: `chip-s ${loop ? 'sel' : ''}`, onclick: () => { loop = !loop; render(); } }, '🔁 По кругу'),
        el('button', { class: `chip-s ${hideText ? 'sel' : ''}`, onclick: () => { hideText = !hideText; render(); } }, '🙈 Без текста')),
      el('div', { class: 'row center wrap' }, recBtn, togetherBtn, compareBtn),
      status,
      result,
      el('div', { class: 'row' },
        el('button', { class: 'btn ghost', disabled: idx === 0, onclick: () => { idx--; render(); } }, '‹ Назад'),
        el('div', { class: 'grow' }),
        el('button', { class: 'btn primary', disabled: idx >= items.length - 1, onclick: () => { idx++; render(); } }, 'Дальше ›')),
      el('div', { class: 'muted small-note' }, '💡 Шэдовинг: повторяй за носителем, копируя ритм, ударения и интонацию — не только слова. Так быстрее всего ставится произношение и понимание на слух.'),
    );
  }

  render();
  setTimeout(() => box.querySelector('.btn.listen')?.click(), 400);
}
