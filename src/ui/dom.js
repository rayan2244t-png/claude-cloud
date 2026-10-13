// Мини-хелперы для интерфейса.

export function el(tag, attrs = {}, ...children) {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs || {})) {
    if (v == null || v === false) continue;
    if (k === 'class') node.className = v;
    else if (k === 'html') node.innerHTML = v;
    else if (k.startsWith('on')) node.addEventListener(k.slice(2).toLowerCase(), v);
    else if (k === 'style' && typeof v === 'object') Object.assign(node.style, v);
    else node.setAttribute(k, v === true ? '' : v);
  }
  for (const c of children.flat()) {
    if (c == null || c === false) continue;
    node.append(c instanceof Node ? c : document.createTextNode(String(c)));
  }
  return node;
}

export const ui = () => document.getElementById('ui');

export function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
}

// **жирный** в подсказках
export function md(s) {
  return escapeHtml(s).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>');
}

export function toast(text, { icon = '✨', time = 3200, kind = '' } = {}) {
  let box = document.querySelector('.toasts');
  if (!box) { box = el('div', { class: 'toasts' }); ui().append(box); }
  const t = el('div', { class: `toast ${kind}` }, el('span', { class: 'toast-icon' }, icon), el('span', {}, text));
  box.append(t);
  setTimeout(() => t.classList.add('out'), time);
  setTimeout(() => t.remove(), time + 400);
}

export function floatText(text, kind = 'xp') {
  const f = el('div', { class: `float ${kind}` }, text);
  ui().append(f);
  setTimeout(() => f.remove(), 1400);
}

export function modal(content, { closable = true, className = '' } = {}) {
  const back = el('div', { class: `modal-back ${className}` });
  const box = el('div', { class: 'modal' });
  const close = () => { back.classList.add('out'); setTimeout(() => back.remove(), 250); };
  if (closable) {
    box.append(el('button', { class: 'modal-x', onclick: close, 'aria-label': 'Закрыть' }, '✕'));
    back.addEventListener('pointerdown', (e) => { if (e.target === back) close(); });
  }
  box.append(...[content].flat().filter((c) => c != null && c !== false));
  back.append(box);
  ui().append(back);
  return { close, box, back };
}

export const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export function money(n) {
  return `$${n.toFixed(2)}`;
}

export function confetti() {
  const colors = ['#e07a5f', '#f2c230', '#7fb38a', '#5b7fb3', '#d98bb3'];
  for (let i = 0; i < 70; i++) {
    const c = el('div', { class: 'confetti' });
    c.style.left = `${Math.random() * 100}vw`;
    c.style.background = colors[i % colors.length];
    c.style.animationDelay = `${Math.random() * 0.6}s`;
    c.style.animationDuration = `${1.8 + Math.random() * 1.4}s`;
    c.style.transform = `rotate(${Math.random() * 360}deg)`;
    ui().append(c);
    setTimeout(() => c.remove(), 3800);
  }
}
