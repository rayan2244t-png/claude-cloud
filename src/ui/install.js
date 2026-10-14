// Установка игры как приложения: иконка на рабочем столе / главном экране.
import { el, modal, toast } from './dom.js';

let deferred = null;
const listeners = new Set();
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault(); // покажем свою кнопку вместо баннера браузера
  deferred = e;
  listeners.forEach((fn) => fn());
});
window.addEventListener('appinstalled', () => {
  deferred = null;
  listeners.forEach((fn) => fn());
  toast('Игра установлена — иконка Big Apple на рабочем столе 🍎', { icon: '📲', time: 6000 });
});

export const isInstalled = () =>
  window.matchMedia?.('(display-mode: standalone)').matches ||
  window.matchMedia?.('(display-mode: fullscreen)').matches ||
  navigator.standalone === true;

export const onInstallChange = (fn) => { listeners.add(fn); return () => listeners.delete(fn); };

const isIOS = () => /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
const isAndroid = () => /android/i.test(navigator.userAgent);
const isLocalDev = () => /^(localhost|127\.|192\.168\.|10\.)/.test(location.hostname) && location.port === '5173';

export async function installApp() {
  if (deferred) {
    deferred.prompt();
    const { outcome } = await deferred.userChoice;
    deferred = null;
    listeners.forEach((fn) => fn());
    if (outcome === 'accepted') return;
  }
  // Браузер не дал системное окно — показываем инструкцию для этого устройства
  const steps = isIOS()
    ? ['Открой игру в <b>Safari</b>', 'Нажми <b>«Поделиться»</b> ⬆️ внизу экрана', 'Выбери <b>«На экран „Домой“»</b> → «Добавить»']
    : isAndroid()
      ? ['Открой игру в <b>Chrome</b>', 'Нажми меню <b>⋮</b> справа вверху', 'Выбери <b>«Установить приложение»</b> или «Добавить на главный экран»']
      : ['Открой игру в <b>Chrome</b> или <b>Edge</b>', 'Нажми значок установки <b>⊕</b> в конце адресной строки (или меню ⋮ → «Сохранить и поделиться» → «Установить»)', 'Нажми <b>«Установить»</b> — на рабочем столе появится иконка 🍎'];
  const m = modal(el('div', { class: 'complete install-help' },
    el('img', { src: './icons/icon-192.png', class: 'install-icon', alt: '' }),
    el('div', { class: 'daily-title' }, 'Иконка на рабочем столе'),
    el('ol', { class: 'install-steps' }, ...steps.map((s) => el('li', { html: s }))),
    isLocalDev() ? el('div', { class: 'muted small-note' }, 'Сейчас игра запущена в режиме разработки — установка работает на опубликованной версии (GitHub Pages) или после «npm run build && npm run preview». Для запуска с компьютера есть ярлык: см. папку launcher/.') : null,
    el('div', { class: 'muted small-note' }, 'После установки игра открывается в отдельном окне на весь экран и работает без интернета (кроме ИИ-разговоров).'),
    el('button', { class: 'btn primary wide', onclick: () => m.close() }, 'Понятно')), { className: 'top' });
}

// Кнопка, которая сама прячется, если игра уже установлена
export function installButton(cls = 'btn wide') {
  const b = el('button', { class: cls, onclick: installApp }, '📲 Иконка на рабочий стол');
  const sync = () => { b.style.display = isInstalled() ? 'none' : ''; };
  sync();
  onInstallChange(sync);
  return b;
}
