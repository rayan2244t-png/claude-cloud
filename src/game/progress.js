// Уровни, опыт, ошибки и слабые темы.
import { state, save, emit } from './state.js';

export const LEVELS = [
  { id: 'A1.1', xp: 0, title: 'Новичок' },
  { id: 'A1.2', xp: 150, title: 'Турист' },
  { id: 'A1.3', xp: 350, title: 'Приезжий' },
  { id: 'A2.1', xp: 600, title: 'Житель Бруклина' },
  { id: 'A2.2', xp: 900, title: 'Свой человек' },
  { id: 'B1', xp: 1300, title: 'Нью-Йоркер' },
];

export function levelInfo(xp = state.xp) {
  let i = 0;
  while (i + 1 < LEVELS.length && xp >= LEVELS[i + 1].xp) i++;
  const cur = LEVELS[i];
  const next = LEVELS[i + 1];
  const pct = next ? (xp - cur.xp) / (next.xp - cur.xp) : 1;
  return { cur, next, pct, index: i };
}

// ---------- Статистика по дням: опыт, минуты, ответы, серия дней ----------
export const todayKey = () => new Date().toLocaleDateString('sv-SE'); // YYYY-MM-DD в местном времени

export function dayStats(key = todayKey()) {
  state.stats ||= { days: {}, streak: 0, best: 0, last: '' };
  const s = state.stats;
  if (!s.days[key]) s.days[key] = { xp: 0, min: 0, ok: 0, bad: 0, words: 0 };
  // Серия дней подряд
  if (key === todayKey() && s.last !== key) {
    const y = new Date(); y.setDate(y.getDate() - 1);
    s.streak = s.last === y.toLocaleDateString('sv-SE') ? s.streak + 1 : 1;
    s.best = Math.max(s.best, s.streak);
    s.last = key;
  }
  return s.days[key];
}

export function addXP(amount) {
  const before = levelInfo().index;
  dayStats().xp += amount;
  state.xp += amount;
  save();
  emit('xp', amount);
  const after = levelInfo();
  if (after.index > before) emit('levelup', after.cur);
}

export const TOPICS = {
  greetings: 'Приветствия и прощания',
  to_be: 'Глагол to be (am / is / are)',
  articles: 'Артикли a / an',
  numbers: 'Числа и цены',
  politeness: 'Вежливость (please, Can I get…)',
  word_order: 'Порядок слов',
  questions: 'Вопросы',
  have: 'Have / has, do / don\'t',
  directions: 'Направления',
  slang: 'Американский разговорный',
  food: 'Еда и кафе',
  listening: 'Понимание на слух',
};

export function recordAnswer(topic, ok, mistake) {
  if (topic) {
    const t = (state.topics[topic] ||= { ok: 0, bad: 0 });
    ok ? t.ok++ : t.bad++;
  }
  ok ? dayStats().ok++ : dayStats().bad++;
  if (!ok && mistake) {
    state.mistakes.unshift({ ...mistake, topic, at: Date.now() });
    state.mistakes = state.mistakes.slice(0, 80);
  }
  save();
}

export function clearMistake(id) {
  const i = state.mistakes.findIndex((m) => m.id === id);
  if (i >= 0) {
    state.mistakes.splice(i, 1);
    save();
  }
}

// Темы, где ошибок больше всего — их игра предлагает повторять в первую очередь.
export function weakTopics() {
  return Object.entries(state.topics)
    .map(([id, t]) => ({ id, name: TOPICS[id] || id, ...t, rate: t.bad / Math.max(1, t.ok + t.bad) }))
    .filter((t) => t.bad > 0)
    .sort((a, b) => b.rate - a.rate || b.bad - a.bad);
}
