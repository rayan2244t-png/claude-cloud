// Сохранение прогресса игрока в localStorage + простая шина событий.

const KEY = 'bigapple.save.v1';

const DEFAULT = () => ({
  name: '',
  xp: 0,
  money: 60,
  flags: {},
  done: {},          // id квестов -> true
  items: [],         // купленная мебель
  vocab: {},         // en -> {en, ru, box, due}
  mistakes: [],      // [{id, topic, given, correct, why, at}]
  topics: {},        // тема -> {ok, bad}
  phone: { unread: [], doneThreads: {} },
  daily: '',         // дата последнего ежедневного задания
  shifts: 0,
  settings: { voice: true, rate: 0.9, apiKey: '', showRu: false },
});

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return DEFAULT();
    const data = JSON.parse(raw);
    const base = DEFAULT();
    return { ...base, ...data, settings: { ...base.settings, ...data.settings }, phone: { ...base.phone, ...data.phone } };
  } catch {
    return DEFAULT();
  }
}

export const state = load();

const listeners = new Map();

export function on(event, fn) {
  if (!listeners.has(event)) listeners.set(event, new Set());
  listeners.get(event).add(fn);
  return () => listeners.get(event).delete(fn);
}

export function emit(event, payload) {
  listeners.get(event)?.forEach((fn) => fn(payload));
  listeners.get('*')?.forEach((fn) => fn(event, payload));
}

export function save() {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    // приватный режим / нет места — игра продолжает работать без сохранения
  }
  emit('change');
}

export function resetSave() {
  try { localStorage.removeItem(KEY); } catch { /* ignore */ }
  location.reload();
}

export function addMoney(amount) {
  state.money = Math.round((state.money + amount) * 100) / 100;
  save();
  emit('money', amount);
}

export function setFlag(flag) {
  state.flags[flag] = true;
  save();
  emit('flag', flag);
}

export function fillName(text) {
  return text.replaceAll('{name}', state.name || 'friend');
}
