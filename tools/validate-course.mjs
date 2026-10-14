// Проверка курса грамматики: node tools/validate-course.mjs [a1|a2|b1]
// Проверяет формат упражнений и что правильные ответы действительно принимаются проверкой игры.
import { check } from '../src/game/checker.js';
import { GRAMMAR } from '../src/data/learn/grammar.js';

const levels = process.argv[2] ? [process.argv[2]] : ['a1', 'a2', 'b1'];
const ruleIds = new Set(GRAMMAR.map((r) => r.id));
let errors = 0;
const err = (where, msg) => { errors++; console.log(`✗ ${where}: ${msg}`); };
const ids = new Set();
for (const lvl of levels) {
  let mod;
  try { mod = await import(`../src/data/learn/course/${lvl}.js`); } catch (e) { err(lvl, `не загрузился: ${e.message}`); continue; }
  const units = mod.default;
  if (!Array.isArray(units)) { err(lvl, 'export default должен быть массивом юнитов'); continue; }
  for (const u of units) {
    const w = `${lvl}/${u.id}`;
    if (!u.id || ids.has(u.id)) err(w, 'нет id или повтор');
    ids.add(u.id);
    if (!['A1', 'A2', 'B1'].includes(u.level)) err(w, 'level должен быть A1/A2/B1');
    if (!u.title || !u.goal) err(w, 'нужны title и goal');
    if (u.rule && !ruleIds.has(u.rule)) err(w, `rule «${u.rule}» не найдено в grammar.js`);
    if (!u.rule && !u.newRule) err(w, 'нужно rule (id из grammar.js) или newRule');
    if (u.newRule) {
      const r = u.newRule;
      for (const k of ['id', 'level', 'title', 'short', 'text', 'formula', 'examples', 'mistakes']) if (!r[k]) err(w, `newRule.${k} пусто`);
      if (r.id !== u.id) err(w, 'newRule.id должен совпадать с id юнита');
      if (ruleIds.has(r.id)) err(w, `newRule.id «${r.id}» уже есть в grammar.js — используй rule`);
      if (!Array.isArray(r.examples) || r.examples.some((e) => !Array.isArray(e) || e.length !== 2)) err(w, 'newRule.examples: массив пар [en, ru]');
      if (!Array.isArray(r.mistakes) || r.mistakes.some((e) => !Array.isArray(e) || e.length !== 2)) err(w, 'newRule.mistakes: массив пар [неправильно, правильно + почему]');
    }
    const steps = u.steps || [];
    const tasks = steps.filter((s) => s.t !== 'tip');
    if (tasks.length < 10) err(w, `упражнений ${tasks.length}, нужно не меньше 10`);
    const types = new Set(tasks.map((s) => s.t));
    if (!types.has('choice') || !types.has('build') || !types.has('type')) err(w, 'нужны все три типа: choice, build, type');
    steps.forEach((s, i) => {
      const sw = `${w}#${i}`;
      if (s.t === 'tip') { if (!s.title || !s.text) err(sw, 'tip: title и text'); return; }
      if (!s.q) err(sw, 'нет q (задание по-русски)');
      if (s.t === 'choice') {
        const ok = (s.opts || []).filter((o) => o.ok);
        if (ok.length !== 1) err(sw, 'choice: ровно один вариант ok:true');
        if ((s.opts || []).length < 3) err(sw, 'choice: минимум 3 варианта');
        (s.opts || []).forEach((o) => { if (!o.en) err(sw, 'вариант без en'); if (!o.ok && !o.why) err(sw, `неверный вариант «${o.en}» без why`); });
      } else if (s.t === 'build') {
        if (!s.answer) return err(sw, 'build: нет answer');
        const words = s.answer.split(' ').map((x) => x.replace(/[,.?!]/g, ''));
        if (words.some((x) => !x)) err(sw, 'build: лишние пробелы/пустые слова в answer');
        if (!check(words.join(' '), [s.answer], s.hints).ok) err(sw, 'build: собранный ответ не проходит проверку');
        if (!Array.isArray(s.extra) || s.extra.length < 2) err(sw, 'build: extra — 2–4 лишних слова');
        for (const x of s.extra || []) if (words.includes(x)) err(sw, `build: лишнее слово «${x}» есть в ответе`);
      } else if (s.t === 'type') {
        if (!s.answers?.length || !s.example) return err(sw, 'type: нужны answers и example');
        const ex = s.example.split(' / ')[0];
        if (!check(ex, s.answers, s.hints).ok) err(sw, `type: example «${ex}» не проходит answers`);
      } else err(sw, `неизвестный тип ${s.t}`);
    });
  }
}
console.log(errors ? `Ошибок: ${errors}` : `OK: ${ids.size} юнитов`);
process.exit(errors ? 1 : 0);
