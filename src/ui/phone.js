// Телефон героя: сообщения, словарь, ошибки, задание дня, магазин, смена, настройки.
import { el, ui, money, toast, shuffle, floatText } from './dom.js';
import { state, save, resetSave, on, exportSave, importSave } from '../game/state.js';
import { levelInfo, weakTopics, LEVELS, addXP } from '../game/progress.js';
import { dueWords, grade, vocabStats } from '../game/srs.js';
import { speak } from '../game/speech.js';
import { SHOP } from '../data/shop.js';
import { QUALITY } from '../world/render.js';
import { setVolumes, sfx } from '../game/audio.js';
import { COLLECTIBLES } from '../data/collectibles.js';

const mdLite = (s) => String(s).replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[c]).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>');

export function createPhone(api) {
  const screen = el('div', { class: 'phone-screen' });
  const phone = el('div', { class: 'phone' },
    el('div', { class: 'phone-notch' }),
    screen,
    el('button', { class: 'phone-home', onclick: () => home(), 'aria-label': 'Домой' }),
  );
  const back = el('div', { class: 'phone-back', onpointerdown: (e) => { if (e.target === back) close(); } }, phone);
  let isOpen = false;

  function open(app) {
    if (!isOpen) {
      sfx('whoosh');
      ui().append(back);
      requestAnimationFrame(() => back.classList.add('open'));
      isOpen = true;
      api.onOpen?.();
    }
    app ? APPS[app].render() : home();
  }

  function close() {
    back.classList.remove('open');
    setTimeout(() => back.remove(), 250);
    isOpen = false;
    api.onClose?.();
  }

  function page(title, ...content) {
    screen.replaceChildren(
      el('div', { class: 'app-bar' },
        el('button', { class: 'icon-btn', onclick: () => home() }, '‹'),
        el('div', { class: 'app-title' }, title),
        el('button', { class: 'icon-btn', onclick: close }, '✕')),
      el('div', { class: 'app-body' }, ...content),
    );
  }

  const today = () => new Date().toISOString().slice(0, 10);

  const APPS = {
    messages: {
      icon: '💬', name: 'Сообщения', color: '#7fb38a',
      badge: () => state.phone.unread.length,
      render() {
        const threads = api.availableThreads();
        page('Сообщения',
          threads.length ? null : el('div', { class: 'empty' }, 'Пока никто не написал. Погуляй по городу!'),
          ...threads.map((t) => el('button', { class: `list-row ${state.phone.doneThreads[t.id] ? '' : 'unread'}`, onclick: () => { close(); api.runThread(t); } },
            el('div', { class: 'avatar' }, t.avatar),
            el('div', { class: 'grow' }, el('b', {}, t.from), el('div', { class: 'muted' }, t.steps[0].en)),
            state.phone.doneThreads[t.id] ? el('span', { class: 'muted' }, '✓') : el('span', { class: 'dot' }))));
      },
    },
    words: {
      icon: '📖', name: 'Словарь', color: '#5b7fb3',
      badge: () => vocabStats().due,
      render() {
        const s = vocabStats();
        const words = Object.values(state.vocab).sort((a, b) => b.added - a.added);
        page('Словарь',
          el('div', { class: 'stat-row' }, stat(s.total, 'слов'), stat(s.learned, 'выучено'), stat(s.due, 'повторить')),
          s.due ? el('button', { class: 'btn primary wide', onclick: () => review(dueWords(10)) }, `🔁 Повторить слова (${Math.min(s.due, 10)})`) : el('div', { class: 'empty small' }, 'Все слова повторены. Возвращайся завтра! ✨'),
          el('div', { class: 'muted small-note' }, 'Нажимай на подчёркнутые слова в диалогах — они попадут сюда.'),
          ...words.map((w) => el('div', { class: 'word-row' },
            el('button', { class: 'icon-btn small', onclick: () => speak(w.en, { force: true }) }, '🔊'),
            el('div', { class: 'grow' }, el('b', {}, w.en), el('div', { class: 'muted' }, w.ru)),
            el('div', { class: 'boxes' }, ...[0, 1, 2, 3, 4, 5].map((i) => el('span', { class: i < w.box ? 'on' : '' }))))));
      },
    },
    mistakes: {
      icon: '📝', name: 'Ошибки', color: '#e07a5f',
      badge: () => 0,
      render() {
        const weak = weakTopics().slice(0, 5);
        page('Дневник ошибок',
          el('div', { class: 'muted small-note' }, 'Игра запоминает твои ошибки и помогает их исправить.'),
          weak.length ? el('div', { class: 'section-title' }, 'Слабые темы') : null,
          ...weak.map((t) => el('div', { class: 'topic-row' },
            el('div', { class: 'grow' }, t.name),
            el('div', { class: 'bar' }, el('div', { style: { width: `${Math.round((1 - t.rate) * 100)}%` } })),
            el('span', { class: 'muted' }, `${t.bad}✗`))),
          state.mistakes.length
            ? el('button', { class: 'btn primary wide', onclick: () => { close(); api.practiceMistakes(); } }, `🎯 Исправить ошибки (${Math.min(state.mistakes.length, 6)})`)
            : el('div', { class: 'empty' }, 'Ошибок нет — так держать! 🎉'),
          state.mistakes.length ? el('div', { class: 'section-title' }, 'Последние ошибки') : null,
          ...state.mistakes.slice(0, 15).map((m) => el('div', { class: 'mistake-row' },
            el('div', { class: 'bad-ans' }, '✗ ', m.given),
            el('div', { class: 'good-ans' }, '✓ ', m.correct),
            m.why ? el('div', { class: 'muted' }, m.why) : null)));
      },
    },
    library: {
      icon: '🎓', name: 'Учебник', color: '#3f6aa8',
      badge: () => 0,
      render() { close(); api.openLibrary('words'); },
    },
    shadowing: {
      icon: '🗣️', name: 'Шэдовинг', color: '#c94f3d',
      badge: () => 0,
      render() { close(); api.openLibrary('shadow'); },
    },
    grammar: {
      icon: '📘', name: 'Грамматика', color: '#5b2a86',
      badge: () => 0,
      render() { close(); api.openLibrary('grammar'); },
    },
    notes: {
      icon: '📒', name: 'Шпаргалка', color: '#4fa3a5',
      badge: () => 0,
      render() {
        const tips = Object.entries(state.tips || {});
        const slang = COLLECTIBLES.filter((c) => state.apples?.[c.id]);
        page('Шпаргалка',
          el('div', { class: 'muted small-note' }, 'Все правила и американские фишки, которые ты встретил в игре.'),
          tips.length ? null : el('div', { class: 'empty' }, 'Пока пусто — поговори с жителями города!'),
          ...tips.map(([title, text]) => el('div', { class: 'note-card' }, el('b', {}, title), el('div', { html: mdLite(text) }))),
          slang.length ? el('div', { class: 'section-title' }, `🍎 Сленг из золотых яблок (${slang.length}/${COLLECTIBLES.length})`) : null,
          ...slang.map((c) => el('div', { class: 'note-card' }, el('b', {}, c.en, el('button', { class: 'icon-btn small', onclick: () => speak(c.en, { force: true }) }, '🔊')), el('div', { class: 'muted' }, c.ru), el('div', { html: mdLite(c.text) }))));
      },
    },
    daily: {
      icon: '🔥', name: 'Задание дня', color: '#f2a03c',
      badge: () => (state.daily === today() ? 0 : 1),
      render() {
        const done = state.daily === today();
        page('Задание дня',
          el('div', { class: 'daily-card' },
            el('div', { class: 'daily-emoji' }, done ? '✅' : '🔥'),
            el('div', { class: 'daily-title' }, done ? 'Сегодня выполнено!' : 'Ежедневная тренировка'),
            el('div', { class: 'muted' }, done ? 'Приходи завтра за новым заданием.' : 'Повтори слова и исправь ошибки. Награда: $10 и 30 XP.'),
            done ? null : el('button', { class: 'btn primary wide', onclick: () => { close(); api.runDaily(); } }, 'Начать')));
      },
    },
    shop: {
      icon: '🛍️', name: 'Магазин', color: '#b0577a',
      badge: () => 0,
      render() {
        page('Магазин мебели',
          el('div', { class: 'muted small-note' }, state.flags.key ? `У тебя ${money(state.money)}. Вещи сразу доставят в квартиру.` : 'Сначала сними квартиру у миссис Родригес 🔑'),
          el('div', { class: 'shop-grid' }, ...SHOP.map((item) => {
            const owned = state.items.includes(item.id);
            return el('button', {
              class: `shop-item ${owned ? 'owned' : ''}`,
              disabled: owned || !state.flags.key,
              onclick: () => { if (api.buy(item)) APPS.shop.render(); },
            },
            el('div', { class: 'shop-emoji' }, item.emoji),
            el('b', {}, item.en),
            el('div', { class: 'muted' }, item.ru),
            el('div', { class: 'price' }, owned ? 'Куплено' : money(item.price)));
          })));
      },
    },
    shift: {
      icon: '☕', name: 'Смена', color: '#8a6347',
      visible: () => state.flags.job,
      badge: () => 0,
      render() {
        page('Смена бариста',
          el('div', { class: 'daily-card' },
            el('div', { class: 'daily-emoji' }, '☕'),
            el('div', { class: 'daily-title' }, 'Помоги Джесс у тележки'),
            el('div', { class: 'muted' }, 'Слушай заказы американцев и готовь напитки. Чем быстрее и точнее — тем больше чаевых!'),
            el('div', { class: 'muted' }, `Смен отработано: ${state.shifts}`),
            el('button', { class: 'btn primary wide', onclick: () => { close(); api.startShift(); } }, 'Начать смену')));
      },
    },
    progress: {
      icon: '🏆', name: 'Прогресс', color: '#f2c230',
      badge: () => 0,
      render() {
        const info = levelInfo();
        const s = vocabStats();
        const doneQ = Object.keys(state.done).length;
        page('Мой прогресс',
          el('div', { class: 'progress-hero' },
            el('div', { class: 'lvl-big' }, info.cur.id),
            el('div', {}, el('b', {}, info.cur.title), el('div', { class: 'muted' }, info.next ? `До ${info.next.id}: ${info.next.xp - state.xp} XP` : 'Максимальный уровень!'))),
          el('div', { class: 'stat-row' }, stat(state.xp, 'XP'), stat(doneQ, 'заданий'), stat(s.total, 'слов')),
          el('div', { class: 'section-title' }, 'Путь'),
          ...LEVELS.map((l, i) => el('div', { class: `path-row ${i <= info.index ? 'reached' : ''}` }, el('span', { class: 'path-dot' }), el('b', {}, l.id), ' ', l.title,
            i === 0 ? el('span', { class: 'muted' }, ' · Глава 1: Бруклин') : i === 3 ? el('span', { class: 'muted' }, ' · Глава 2: Манхэттен (скоро)') : null)));
      },
    },
    settings: {
      icon: '⚙️', name: 'Настройки', color: '#8a909b',
      badge: () => 0,
      render() {
        const key = el('input', { class: 'text-in', type: 'password', placeholder: 'sk-ant-…', value: state.settings.apiKey || '', autocomplete: 'off' });
        const rate = el('input', { type: 'range', min: '0.5', max: '1.2', step: '0.05', value: state.settings.rate });
        rate.addEventListener('change', () => { state.settings.rate = Number(rate.value); save(); speak('This is how fast I talk.', { force: true }); });
        page('Настройки',
          el('label', { class: 'set-row col' }, '✨ Графика (шейдеры)', (() => {
            const sel = el('select', { class: 'text-in' }, ...Object.entries(QUALITY).map(([id, q]) => {
              const o = el('option', { value: id }, q.label);
              if (state.settings.gfx === id) o.selected = true;
              return o;
            }));
            sel.addEventListener('change', () => { state.settings.gfx = sel.value; save(); location.reload(); });
            return sel;
          })()),
          slider('🎵 Музыка', 'music', 0.35),
          slider('🏙️ Звуки города', 'ambience', 0.6),
          slider('🔔 Звуковые эффекты', 'sfx', 0.8),
          toggle('🔊 Озвучка реплик', state.settings.voice, (v) => { state.settings.voice = v; save(); }),
          toggle('🇷🇺 Всегда показывать перевод', state.settings.showRu, (v) => { state.settings.showRu = v; save(); }),
          el('label', { class: 'set-row col' }, 'Скорость речи', rate),
          el('div', { class: 'section-title' }, '🤖 ИИ-собеседники (Claude Haiku 5.5)'),
          el('div', { class: 'muted small-note', html: 'Чтобы свободно болтать с персонажами, вставь свой API-ключ с <a href="https://console.anthropic.com/settings/keys" target="_blank" rel="noopener">console.anthropic.com</a>. Ключ хранится только в этом браузере.' }),
          key,
          el('button', { class: 'btn primary wide', onclick: () => { state.settings.apiKey = key.value.trim(); save(); toast(key.value.trim() ? 'Ключ сохранён' : 'Ключ удалён', { icon: '🔑' }); } }, 'Сохранить ключ'),
          el('button', { class: 'btn wide', onclick: () => { api.resetTutorial(); toast('Обучение начнётся заново', { icon: '🎓' }); } }, '🎓 Пройти обучение заново'),
          el('div', { class: 'section-title' }, 'Сохранение'),
          el('div', { class: 'muted small-note' }, 'Перенести прогресс на другое устройство: скопируй код здесь и вставь его там.'),
          el('button', { class: 'btn wide', onclick: async () => {
            const code = exportSave();
            try { await navigator.clipboard.writeText(code); toast('Код сохранения скопирован 📋', { icon: '💾' }); } catch { prompt('Скопируй код сохранения:', code); }
          } }, '💾 Скопировать код сохранения'),
          el('button', { class: 'btn wide', onclick: () => {
            const code = prompt('Вставь код сохранения с другого устройства:');
            if (!code) return;
            try { importSave(code); } catch (err) { toast(err.message || 'Неверный код', { icon: '⚠️' }); }
          } }, '📥 Загрузить сохранение'),
          el('button', { class: 'btn danger wide', onclick: () => { if (confirm('Удалить весь прогресс и начать заново?')) resetSave(); } }, 'Начать игру заново'));
      },
    },
  };

  function home() {
    const time = new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
    screen.replaceChildren(
      el('div', { class: 'phone-status' }, el('span', {}, time), el('span', {}, `${money(state.money)} · ${levelInfo().cur.id}`)),
      el('div', { class: 'phone-wall' }, el('div', { class: 'wall-city' }, 'BROOKLYN'), el('div', { class: 'wall-sub' }, state.name ? `Hi, ${state.name}!` : 'Welcome to NYC')),
      el('div', { class: 'app-grid' }, ...Object.entries(APPS).filter(([, a]) => !a.visible || a.visible()).map(([id, a]) => {
        const b = a.badge();
        return el('button', { class: 'app-icon', onclick: () => { if (id === 'messages') { state.phone.unread = []; save(); } a.render(); } },
          el('div', { class: 'app-tile', style: { background: a.color } }, a.icon, b ? el('span', { class: 'badge' }, b) : null),
          el('div', { class: 'app-name' }, a.name));
      })),
    );
  }

  function stat(value, label) {
    return el('div', { class: 'stat' }, el('b', {}, value), el('span', {}, label));
  }

  function slider(label, key, def) {
    const input = el('input', { type: 'range', min: '0', max: '1', step: '0.05', value: state.settings[key] ?? def });
    input.addEventListener('input', () => { state.settings[key] = Number(input.value); setVolumes(); });
    input.addEventListener('change', () => save());
    return el('label', { class: 'set-row col' }, label, input);
  }

  function toggle(label, value, onChange) {
    const input = el('input', { type: 'checkbox' });
    input.checked = value;
    input.addEventListener('change', () => onChange(input.checked));
    return el('label', { class: 'set-row' }, el('span', {}, label), input);
  }

  // Карточки для повторения слов
  function review(words) {
    let i = 0, right = 0;
    const all = Object.values(state.vocab);
    const next = () => {
      if (i >= words.length) {
        page('Повторение', el('div', { class: 'daily-card' }, el('div', { class: 'daily-emoji' }, '🎉'), el('div', { class: 'daily-title' }, `${right} из ${words.length}`), el('button', { class: 'btn primary wide', onclick: () => APPS.words.render() }, 'Готово')));
        return;
      }
      const w = words[i];
      const wrong = shuffle(all.filter((x) => x.en !== w.en)).slice(0, 3).map((x) => x.ru);
      while (wrong.length < 3) wrong.push(['стол', 'окно', 'синий', 'бежать'][wrong.length]);
      const opts = shuffle([w.ru, ...wrong]);
      speak(w.en, { force: true });
      page(`Повторение ${i + 1}/${words.length}`,
        el('div', { class: 'card-word' }, w.en, el('button', { class: 'icon-btn', onclick: () => speak(w.en, { force: true }) }, '🔊')),
        el('div', { class: 'options' }, ...opts.map((o) => {
          const b = el('button', { class: 'option' }, o);
          b.addEventListener('click', () => {
            const ok = o === w.ru;
            grade(w.en, ok);
            if (ok) right++;
            b.classList.add(ok ? 'right' : 'wrong');
            if (!ok) [...b.parentElement.children].find((x) => x.textContent === w.ru)?.classList.add('right');
            if (ok) { addXP(1); floatText('+1 XP'); }
            setTimeout(() => { i++; next(); }, ok ? 500 : 1300);
          });
          return b;
        })));
    };
    next();
  }

  on('change', () => { if (isOpen && screen.querySelector('.app-grid')) home(); });

  return { open, close, review: (words) => { open(); review(words); }, get isOpen() { return isOpen; } };
}
