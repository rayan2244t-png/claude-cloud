// Курс грамматики A1 → B1: уроки по порядку. Каждый урок — правило + 12 заданий.
// Новые правила из уроков (newRule) добавляются в общий учебник грамматики.
import A1 from './a1.js';
import A2 from './a2.js';
import B1 from './b1.js';
import { GRAMMAR } from '../grammar.js';
import { TOPICS } from '../../../game/progress.js';

export const COURSE = [...A1, ...A2, ...B1];

for (const u of COURSE) {
  if (u.newRule && !GRAMMAR.some((r) => r.id === u.newRule.id)) GRAMMAR.push({ quiz: [], ...u.newRule, topics: [u.id] });
  const r = GRAMMAR.find((x) => x.id === (u.rule || u.newRule?.id));
  // Ошибки в уроке ведут к его правилу («❓ Как это работает»)
  if (r && !r.topics.includes(u.id)) r.topics.push(u.id);
  if (!TOPICS[u.id]) TOPICS[u.id] = u.title;
}

export const unitRule = (u) => GRAMMAR.find((r) => r.id === (u.rule || u.newRule?.id));
