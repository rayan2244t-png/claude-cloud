// Учебные материалы: словарь (1500+ слов), фразы, конструкции, грамматика.
import { NOUN_TOPICS } from './words-nouns.js';
import { OTHER_TOPICS } from './words-other.js';
import { EXTRA_TOPICS } from './words-extra.js';
import { PHRASE_TOPICS } from './phrases.js';

export { GRAMMAR, rulesForTopic } from './grammar.js';
export { CONSTRUCTIONS } from './constructions.js';

const LEVEL = { 1: 'A1', 2: 'A2', 3: 'B1' };

// Темы слов: [{ id, name, icon, words: [{ en, ru, level, key }] }]. Дубли убираем.
const seen = new Set();
export const WORD_TOPICS = [...NOUN_TOPICS, ...OTHER_TOPICS, ...EXTRA_TOPICS].map((t) => ({
  ...t,
  words: t.words.trim().split('\n').map((line) => {
    const [en, ru, lvl] = line.split('|');
    // «go (went)» → слово go, прошедшее время в подсказке
    const m = en.match(/^(.*?)\s*\((.+)\)$/);
    const word = m ? m[1] : en;
    return { en: word, past: m?.[2], ru, level: LEVEL[lvl], key: word.toLowerCase() };
  }).filter((w) => !seen.has(w.key) && seen.add(w.key)),
}));

export const ALL_WORDS = WORD_TOPICS.flatMap((t) => t.words.map((w) => ({ ...w, topic: t.id })));

export const PHRASES = PHRASE_TOPICS.map((t) => ({
  ...t,
  phrases: t.phrases.trim().split('\n').map((line) => {
    const [en, ru, lvl, note] = line.split('|');
    return { en, ru, level: LEVEL[lvl], note };
  }),
}));

export const ALL_PHRASES = PHRASES.flatMap((t) => t.phrases.map((p) => ({ ...p, topic: t.id })));
