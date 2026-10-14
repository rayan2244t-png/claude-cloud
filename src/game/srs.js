// Словарь героя с интервальным повторением (система Лейтнера).
import { state, save, emit } from './state.js';
import { dayStats } from './progress.js';

const DAY = 24 * 60 * 60 * 1000;
const INTERVALS = [0, 1, 2, 4, 8, 16, 32]; // дни для каждой «коробки»

export function addWord(en, ru) {
  const key = en.toLowerCase();
  if (state.vocab[key]) return false;
  state.vocab[key] = { en, ru, box: 0, due: Date.now(), added: Date.now() };
  dayStats().words++;
  save();
  emit('word', key);
  return true;
}

export function dueWords(limit = 10) {
  const now = Date.now();
  return Object.values(state.vocab)
    .filter((w) => w.due <= now)
    .sort((a, b) => a.box - b.box || a.due - b.due)
    .slice(0, limit);
}

export function grade(en, ok) {
  const w = state.vocab[en.toLowerCase()];
  if (!w) return;
  w.box = ok ? Math.min(w.box + 1, INTERVALS.length - 1) : 0;
  w.due = Date.now() + INTERVALS[w.box] * DAY;
  save();
}

export function vocabStats() {
  const all = Object.values(state.vocab);
  return { total: all.length, learned: all.filter((w) => w.box >= 3).length, due: dueWords(999).length };
}
