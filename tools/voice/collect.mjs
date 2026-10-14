// Собирает все английские фразы игры, которые звучат вслух, и решает, каким голосом их записать.
// Возвращает [{ voice, text, group }] — group задаёт, в какой аудиофайл попадёт фраза.
import fs from 'fs';
import path from 'path';
import { NPCS, QUESTS } from '../../src/data/index.js';
import { ERRANDS } from '../../src/data/errands.js';
import { ALL_WORDS, ALL_PHRASES, CONSTRUCTIONS, GRAMMAR } from '../../src/data/learn/index.js';
import { SMALLTALK } from '../../src/data/smalltalk.js';
import { CHATTER, LABELS } from '../../src/data/immersion.js';
import { COLLECTIBLES } from '../../src/data/collectibles.js';
import { SOUNDS } from '../../src/data/learn/pronunciation.js';
import { BARISTA } from '../../src/data/shop.js';
import { voiceFor, clipKey, NARRATOR, NARRATOR_M } from '../../src/game/voices.js';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '../..');
const out = new Map();
const isEnglish = (s) => typeof s === 'string' && /[a-z]/i.test(s) && !/[а-яё]/i.test(s) && s.length < 300;
function add(voice, text, group) {
  if (!isEnglish(text)) return;
  const t = clipKey(text);
  if (!t) return;
  const k = `${voice}|${t}`;
  if (!out.has(k)) out.set(k, { voice, text: t, group });
}
const both = (text, group) => { add(NARRATOR, text, group); add(NARRATOR_M, text, group); };
const npcVoice = (id) => voiceFor(NPCS[id]?.gender, NPCS[id]?.name);

// Реплики персонажей — их собственными голосами; ответы игрока — голосом рассказчицы
function dialogue(steps, npcId, group) {
  const v = npcId ? npcVoice(npcId) : NARRATOR;
  for (const s of steps || []) {
    if (['say', 'listen', 'speak', 'pay'].includes(s.t) && s.en) add(v, s.en, group);
    for (const o of s.opts || []) if (typeof o === 'object') add(NARRATOR, o.en, group);
    if (s.example) for (const e of s.example.split(' / ')) add(NARRATOR, e, group);
    if (s.answer) add(NARRATOR, s.answer, group);
  }
}
for (const q of QUESTS) dialogue(q.steps, q.npc, `q_${q.id}`);
for (const e of ERRANDS) dialogue(e.steps, e.to, `e_${e.id}`);

// Курс грамматики (если уже написан)
for (const lvl of ['a1', 'a2', 'b1']) {
  const f = path.join(ROOT, `src/data/learn/course/${lvl}.js`);
  if (!fs.existsSync(f)) continue;
  const units = (await import(f)).default;
  for (const u of units) {
    dialogue(u.steps, null, `c_${u.id}`);
    for (const [en] of u.newRule?.examples || []) add(NARRATOR, en, `c_${u.id}`);
  }
}

// Правила грамматики: примеры и правильные варианты
for (const r of GRAMMAR) {
  for (const [en] of r.examples || []) add(NARRATOR, en, `g_${r.id}`);
  for (const m of r.mistakes || []) add(NARRATOR, m[1], `g_${r.id}`);
  for (const q of r.quiz || []) for (const o of q.opts || []) if (o.ok) add(NARRATOR, o.en, `g_${r.id}`);
}

// Словарь, фразы, конструкции, произношение
ALL_WORDS.forEach((w, i) => add(NARRATOR, w.en.replace(/\s*\(.*?\)\s*/g, ' '), `w_${Math.floor(i / 160)}`));
ALL_PHRASES.forEach((p, i) => add(NARRATOR, p.en, `p_${Math.floor(i / 60)}`));
for (const [lvl, list] of Object.entries(CONSTRUCTIONS)) for (const c of list) for (const [en] of c.ex || []) add(NARRATOR, en, `k_${lvl}`);
for (const s of SOUNDS) {
  for (const pair of s.pairs || []) for (const w of pair) add(NARRATOR, w, 'pron');
  for (const x of s.say || s.examples || []) add(NARRATOR, Array.isArray(x) ? x[0] : x, 'pron');
}

// Город: прохожие (мужские и женские голоса), подписи, золотые яблоки
for (const t of SMALLTALK) { both(t.en, 'town'); for (const o of t.opts || []) add(NARRATOR, o.en, 'town'); if (t.reply) both(t.reply, 'town'); }
for (const c of CHATTER) both(c.en, 'town');
for (const l of Object.values(LABELS).flat()) add(NARRATOR, l.en, 'labels');
for (const a of COLLECTIBLES) add(NARRATOR, a.en, 'labels');

// Заказы в кофейне (бариста): все сочетания «приветствие + размер + температура + напиток»
for (const o of BARISTA.openers) for (const [size] of BARISTA.sizes) for (const [temp] of BARISTA.temps) for (const [drink] of BARISTA.drinks) {
  const words = drink === 'hot chocolate' ? (temp === 'hot' ? [''] : []) : temp === 'hot' ? ['', 'hot '] : ['iced '];
  for (const tw of words) add(NARRATOR, `${o} ${size} ${tw}${drink}, please?`, 'barista');
}

// Фразы, записанные прямо в коде интерфейса (бариста, такси, метро, ответы персонажей…)
for (const f of ['src/main.js', ...fs.readdirSync(path.join(ROOT, 'src/ui')).map((n) => `src/ui/${n}`)]) {
  const src = fs.readFileSync(path.join(ROOT, f), 'utf8');
  for (const m of src.matchAll(/(['"`])((?:\\.|(?!\1).)*?)\1/g)) {
    const s = m[2].replace(/\\'/g, "'").replace(/\\"/g, '"');
    if (/\$\{/.test(s) || s.length < 3) continue;
    if (/^[A-Z][A-Za-z0-9 ,.'’!?$%:;&-]*[.!?]$/.test(s) && /\s/.test(s) && /[a-z]/.test(s)) both(s, `ui_${path.basename(f, '.js')}`);
  }
}

export const CLIPS = [...out.values()];
if (process.argv[1]?.endsWith('collect.mjs')) {
  const groups = {};
  for (const c of CLIPS) groups[c.group] = (groups[c.group] || 0) + 1;
  console.log('фраз:', CLIPS.length, 'символов:', CLIPS.reduce((a, c) => a + c.text.length, 0), 'групп:', Object.keys(groups).length);
  console.log(Object.entries(groups).sort((a, b) => b[1] - a[1]).slice(0, 15));
  console.log(CLIPS.filter((c) => c.group.startsWith('ui_')).slice(0, 25).map((c) => c.text));
}
