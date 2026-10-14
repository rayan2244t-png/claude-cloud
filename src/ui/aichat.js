// Свободный разговор с персонажем (Claude Haiku 5.5) с исправлением ошибок.
import { el, ui, escapeHtml, floatText } from './dom.js';
import { state } from '../game/state.js';
import { addXP } from '../game/progress.js';
import { createChat, hasKey } from '../game/ai.js';
import { speak, canListen, listen } from '../game/speech.js';

export function openAiChat(npc, { onTalk, onClose, openSettings, onReply }) {
  const root = el('div', { class: 'dialogue ai open-later' });
  const log = el('div', { class: 'dlg-log' });
  const input = el('input', { class: 'text-in', placeholder: 'Напиши по-английски…', autocomplete: 'off', spellcheck: 'false' });
  const send = el('button', { class: 'btn primary' }, '➤');
  const mic = canListen() ? el('button', { class: 'btn mic' }, '🎤') : null;
  const close = () => {
    window.speechSynthesis?.cancel();
    root.classList.remove('open');
    setTimeout(() => root.remove(), 300);
    onClose?.();
  };
  root.append(
    el('div', { class: 'dlg-head' },
      el('div', { class: 'dlg-avatar', style: { background: npc.color } }, npc.name[0]),
      el('div', {}, el('div', { class: 'dlg-name' }, npc.name), el('div', { class: 'dlg-role' }, '💬 Свободный разговор · ИИ')),
      el('button', { class: 'icon-btn', onclick: close }, '✕')),
    log,
  );
  ui().append(root);
  requestAnimationFrame(() => root.classList.add('open'));

  if (!hasKey()) {
    log.append(el('div', { class: 'tip-card' },
      el('div', { class: 'tip-title' }, '🤖 Подключи ИИ'),
      el('div', { class: 'tip-text', html: 'Два варианта (выбор — в <b>Телефон → Настройки</b>):<br>1) <b>Claude Haiku 5.5</b> — лучшее качество, нужен API-ключ с <a href="https://console.anthropic.com/settings/keys" target="_blank" rel="noopener">console.anthropic.com</a>.<br>2) <b>Локальная модель (Ollama)</b> — бесплатно, без ключа и интернета, работает на твоём компьютере. Подходит, если Claude недоступен в твоей стране.<br>Сюжет, задания и мини-игры работают и без ИИ.' }),
      el('button', { class: 'btn primary wide', onclick: () => { close(); openSettings(); } }, 'Открыть настройки')));
    return;
  }

  const chat = createChat(npc);
  // Голосовой режим: говоришь → персонаж отвечает вслух → снова слушает
  let voiceMode = false;
  const voiceBtn = canListen() ? el('button', { class: 'btn voice-toggle' }, '🎙️ Голосом') : null;
  const row = el('div', { class: 'row chat-row' }, input, mic, send);
  root.append(row);
  if (voiceBtn) root.insertBefore(el('div', { class: 'row chat-row voice-row' }, voiceBtn, el('span', { class: 'muted small-note' }, 'Говори — персонаж ответит вслух, и снова будет слушать')), row);
  voiceBtn?.addEventListener('click', () => {
    voiceMode = !voiceMode;
    voiceBtn.classList.toggle('rec', voiceMode);
    voiceBtn.textContent = voiceMode ? '⏹ Остановить голосовой режим' : '🎙️ Голосом';
    if (voiceMode) voiceTurn();
  });
  async function voiceTurn() {
    if (!voiceMode || !root.isConnected) return;
    try {
      const alts = await listen();
      if (!voiceMode) return;
      await submit(alts[0], true);
    } catch (err) {
      log.append(el('div', { class: 'sys-note' }, err.message));
      log.scrollTop = log.scrollHeight;
      if (voiceMode) setTimeout(voiceTurn, 800);
    }
  }
  log.append(el('div', { class: 'sys-note' }, `Поболтай с ${npc.name} о чём угодно — текстом или голосом. Ошибки будут мягко исправлены. Начни с «Hi!» 🙂`));

  const npcBubble = (r) => {
    const ru = el('div', { class: `bubble-ru ${state.settings.showRu ? 'show' : ''}` }, r.ru || '');
    log.append(el('div', { class: 'bubble npc' },
      el('div', { class: 'bubble-name', style: { color: npc.color } }, npc.name),
      el('div', { class: 'bubble-en' }, r.reply), ru,
      el('div', { class: 'bubble-tools' },
        el('button', { class: 'icon-btn small', onclick: () => speak(r.reply, { pitch: npc.pitch, gender: npc.gender, who: npc.name, force: true }) }, '🔊'),
        r.ru ? el('button', { class: 'icon-btn small ru-btn', onclick: () => ru.classList.toggle('show') }, 'RU') : null)));
    log.scrollTop = log.scrollHeight;
    onTalk?.(Math.min(4, r.reply.length * 0.05));
    return speak(r.reply, { pitch: npc.pitch, gender: npc.gender, who: npc.name, force: voiceMode });
  };

  async function submit(text, fromVoice = false) {
    text = text.trim();
    if (!text) return;
    input.value = '';
    const mine = el('div', { class: 'bubble me' }, el('div', { class: 'bubble-en', html: escapeHtml(text) }));
    log.append(mine);
    const typing = el('div', { class: 'bubble npc typing' }, el('span'), el('span'), el('span'));
    log.append(typing);
    log.scrollTop = log.scrollHeight;
    send.disabled = true;
    try {
      const r = await chat.send(text);
      onReply?.();
      typing.remove();
      if (r.fix) {
        mine.after(el('div', { class: 'fix-card' },
          el('div', {}, '✏️ ', r.fix),
          r.better ? el('div', { class: 'fb-correct' }, '✓ Лучше: ', el('b', {}, r.better)) : null));
      } else {
        addXP(3);
        floatText('+3 XP');
      }
      const spoken = npcBubble(r);
      if (fromVoice && voiceMode) { await spoken; setTimeout(voiceTurn, 300); }
    } catch (err) {
      typing.remove();
      log.append(el('div', { class: 'sys-note error' }, `⚠️ ${err.message}`));
    } finally {
      send.disabled = false;
      input.focus({ preventScroll: true });
    }
  }

  send.addEventListener('click', () => submit(input.value));
  input.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); submit(input.value); } });
  mic?.addEventListener('click', async () => {
    mic.classList.add('rec');
    try {
      const alts = await listen();
      await submit(alts[0]);
    } catch (err) {
      log.append(el('div', { class: 'sys-note' }, err.message));
    } finally {
      mic.classList.remove('rec');
    }
  });
  setTimeout(() => input.focus({ preventScroll: true }), 300);
}
