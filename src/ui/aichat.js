// Свободный разговор с персонажем (Claude Haiku 5.5) с исправлением ошибок.
import { el, ui, escapeHtml, floatText } from './dom.js';
import { state } from '../game/state.js';
import { addXP } from '../game/progress.js';
import { createChat, hasKey } from '../game/ai.js';
import { speak, canListen, listen } from '../game/speech.js';

export function openAiChat(npc, { onTalk, onClose, openSettings }) {
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
      el('div', { class: 'tip-title' }, '🤖 Нужен API-ключ'),
      el('div', { class: 'tip-text', html: 'Свободные разговоры работают через Claude Haiku 5.5. Получи ключ на <a href="https://console.anthropic.com/settings/keys" target="_blank" rel="noopener">console.anthropic.com</a> и вставь его в <b>Телефон → Настройки</b>. Сюжет, задания и смены работают и без ключа.' }),
      el('button', { class: 'btn primary wide', onclick: () => { close(); openSettings(); } }, 'Открыть настройки')));
    return;
  }

  const chat = createChat(npc);
  const row = el('div', { class: 'row chat-row' }, input, mic, send);
  root.append(row);
  log.append(el('div', { class: 'sys-note' }, `Поболтай с ${npc.name} о чём угодно. Ошибки будут мягко исправлены. Начни с «Hi!» 🙂`));

  const npcBubble = (r) => {
    const ru = el('div', { class: `bubble-ru ${state.settings.showRu ? 'show' : ''}` }, r.ru || '');
    log.append(el('div', { class: 'bubble npc' },
      el('div', { class: 'bubble-name', style: { color: npc.color } }, npc.name),
      el('div', { class: 'bubble-en' }, r.reply), ru,
      el('div', { class: 'bubble-tools' },
        el('button', { class: 'icon-btn small', onclick: () => speak(r.reply, { pitch: npc.pitch, force: true }) }, '🔊'),
        r.ru ? el('button', { class: 'icon-btn small ru-btn', onclick: () => ru.classList.toggle('show') }, 'RU') : null)));
    log.scrollTop = log.scrollHeight;
    onTalk?.(Math.min(4, r.reply.length * 0.05));
    speak(r.reply, { pitch: npc.pitch });
  };

  async function submit(text) {
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
      typing.remove();
      if (r.fix) {
        mine.after(el('div', { class: 'fix-card' },
          el('div', {}, '✏️ ', r.fix),
          r.better ? el('div', { class: 'fb-correct' }, '✓ Лучше: ', el('b', {}, r.better)) : null));
      } else {
        addXP(3);
        floatText('+3 XP');
      }
      npcBubble(r);
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
