// «Тренер»: подбирает упражнения под игрока — слабые темы, ошибки, слова на повторение и новые слова.
import { state } from './state.js';
import { weakTopics, levelInfo } from './progress.js';
import { dueWords } from './srs.js';
import { GRAMMAR, ALL_WORDS } from '../data/learn/index.js';

const shuffle = (a) => [...a].sort(() => Math.random() - 0.5);
const levelOfPlayer = () => (levelInfo().cur.id.startsWith('B') ? 'B1' : levelInfo().cur.id.startsWith('A2') ? 'A2' : 'A1');

// Правила, которые стоит потренировать: слабые темы → ошибки теста уровня → правила текущего уровня
export function rulesToPractice(limit = 3) {
  const weak = weakTopics().map((t) => t.id);
  const byTopic = GRAMMAR.filter((r) => r.topics.some((t) => weak.includes(t)));
  const fromTest = (state.placement?.weak || []).map((id) => GRAMMAR.find((r) => r.id === id)).filter(Boolean);
  const lvl = levelOfPlayer();
  const fresh = GRAMMAR.filter((r) => r.level === lvl && !state.rulesDone?.[r.id]);
  const seen = new Set();
  return [...byTopic, ...fromTest, ...shuffle(fresh), ...shuffle(GRAMMAR.filter((r) => r.level === lvl))]
    .filter((r) => !seen.has(r.id) && seen.add(r.id))
    .slice(0, limit);
}

// Новые слова уровня игрока, которых ещё нет в словаре
export function newWords(limit = 3) {
  const lvl = levelOfPlayer() === 'A1' ? 'A1' : 'A2';
  return shuffle(ALL_WORDS.filter((w) => w.level === lvl && !state.vocab[w.key])).slice(0, limit);
}

// Шаги «Тренировки дня»
export function buildDailySteps(mistakeSteps = []) {
  const steps = [];
  steps.push({ t: 'tip', title: '🔥 Тренировка дня', text: 'Подобрана под тебя: **твои ошибки**, **слабые темы**, слова на **повторение** и **новые** слова.' });
  steps.push(...mistakeSteps.slice(0, 3));

  for (const r of rulesToPractice(2)) {
    const q = r.quiz[Math.floor(Math.random() * r.quiz.length)];
    steps.push({ t: 'choice', topic: r.topics[0], ...q, q: `${q.q}  ·  ${r.title}` });
  }

  const pool = Object.values(state.vocab);
  for (const w of dueWords(3)) {
    const wrong = shuffle(pool.filter((x) => x.en !== w.en)).slice(0, 3).map((x) => x.ru);
    if (wrong.length < 2) continue;
    steps.push({ t: 'listen', en: w.en, q: 'Повторение: что значит это слово?', topic: 'listening', opts: [w.ru, ...wrong], ok: 0 });
  }

  const fresh = newWords(3);
  if (fresh.length) {
    steps.push({ t: 'tip', title: '✨ Новые слова', text: fresh.map((w) => `**${w.en}** — ${w.ru}`).join('  ·  ') });
    for (const w of fresh) {
      const wrong = shuffle(ALL_WORDS.filter((x) => x.key !== w.key && x.level === w.level)).slice(0, 3).map((x) => x.ru);
      steps.push({ t: 'listen', en: w.en, q: 'Новое слово: что оно значит?', topic: 'listening', opts: [w.ru, ...wrong], ok: 0, _learn: w });
    }
  }
  return steps;
}
