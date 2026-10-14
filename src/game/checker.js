// Проверка ответов игрока и объяснение ошибок на русском.

const CONTRACTIONS = [
  [/\bi'm\b/g, 'i am'], [/\byou're\b/g, 'you are'], [/\bwe're\b/g, 'we are'], [/\bthey're\b/g, 'they are'],
  [/\bhe's\b/g, 'he is'], [/\bshe's\b/g, 'she is'], [/\bit's\b/g, 'it is'], [/\bthat's\b/g, 'that is'],
  [/\bwhat's\b/g, 'what is'], [/\bwhere's\b/g, 'where is'], [/\bhow's\b/g, 'how is'], [/\bthere's\b/g, 'there is'],
  [/\bi'd\b/g, 'i would'], [/\bi'll\b/g, 'i will'], [/\bi've\b/g, 'i have'],
  [/\bcan't\b/g, 'can not'], [/\bcannot\b/g, 'can not'], [/\bdon't\b/g, 'do not'], [/\bdoesn't\b/g, 'does not'],
  [/\bisn't\b/g, 'is not'], [/\baren't\b/g, 'are not'], [/\bwon't\b/g, 'will not'], [/\blet's\b/g, 'let us'],
  [/\bgonna\b/g, 'going to'], [/\bwanna\b/g, 'want to'],
];

export function normalize(text) {
  let s = ` ${String(text).toLowerCase().replace(/[’`]/g, "'")} `;
  for (const [re, rep] of CONTRACTIONS) s = s.replace(re, rep);
  return s.replace(/[^a-z0-9' ]+/g, ' ').replace(/\s+/g, ' ').trim();
}

const tokens = (s) => (s ? s.split(' ') : []);

// Паттерн может содержать * — это 1–3 любых слова (например, имя).
export function matchPattern(input, pattern) {
  const u = tokens(normalize(input));
  const p = tokens(normalize(pattern.replaceAll('*', ' zzwild ')));
  const go = (i, j) => {
    if (j === p.length) return i === u.length ? [] : null;
    if (p[j] === 'zzwild') {
      for (let k = 1; k <= 3 && i + k <= u.length; k++) {
        const rest = go(i + k, j + 1);
        if (rest) return [u.slice(i, i + k).join(' '), ...rest];
      }
      return null;
    }
    return u[i] === p[j] ? go(i + 1, j + 1) : null;
  };
  const caps = go(0, 0);
  return caps ? { ok: true, capture: caps[0] } : { ok: false };
}

function lcs(a, b) {
  const dp = Array.from({ length: a.length + 1 }, () => new Array(b.length + 1).fill(0));
  for (let i = a.length - 1; i >= 0; i--)
    for (let j = b.length - 1; j >= 0; j--)
      dp[i][j] = a[i] === b[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
  const inA = new Set(), inB = new Set();
  let i = 0, j = 0;
  while (i < a.length && j < b.length) {
    if (a[i] === b[j]) { inA.add(i); inB.add(j); i++; j++; }
    else if (dp[i + 1][j] >= dp[i][j + 1]) i++;
    else j++;
  }
  return { len: dp[0][0], inA, inB };
}

function editDistance(a, b) {
  const dp = Array.from({ length: a.length + 1 }, (_, i) => [i, ...new Array(b.length).fill(0)]);
  for (let j = 1; j <= b.length; j++) dp[0][j] = j;
  for (let i = 1; i <= a.length; i++)
    for (let j = 1; j <= b.length; j++)
      dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
  return dp[a.length][b.length];
}

const BE = new Set(['am', 'is', 'are']);

// Разница в окончании или форме глагола — это грамматика, а не опечатка (live/lives, play/played, Russia/Russian)
const FORM_PAIRS = new Set(['is|are', 'am|is', 'am|are', 'was|were', 'has|have', 'do|does', 'did|does', 'did|do', 'this|these', 'that|those',
  'a|an', 'man|men', 'woman|women', 'child|children', 'he|his', 'she|her', 'go|went', 'goes|went', 'can|could', 'will|would', 'its|it\'s', 'than|then']);
function isWordForm(a, b) {
  if (a === b) return false;
  const [s, l] = a.length <= b.length ? [a, b] : [b, a];
  if (FORM_PAIRS.has(`${s}|${l}`) || FORM_PAIRS.has(`${l}|${s}`)) return true;
  for (const suf of ['s', 'es', 'ed', 'd', 'ing', 'n', 'er', 'est', 'ly', "'s", "s'"]) if (l === s + suf) return true;
  if (s.endsWith('y') && (l === `${s.slice(0, -1)}ies` || l === `${s.slice(0, -1)}ied`)) return true;
  if (s.endsWith('e') && l === `${s.slice(0, -1)}ing`) return true;
  return false;
}

// Возвращает { ok, capture, nearOk, best, messages[] }.
// nearOk — ответ принят, но с замечанием (например, опечатка).
export function check(input, answers, hints = []) {
  const clean = normalize(input);
  if (!clean) return { ok: false, best: answers[0], messages: ['Сначала напиши ответ 🙂'] };

  for (const a of answers) {
    const m = matchPattern(input, a);
    if (m.ok) return { ok: true, capture: m.capture, best: a, messages: [] };
  }

  const u = tokens(clean);
  // ближайший к ответу вариант (wildcard заменяем словами игрока, если они есть)
  let best = answers[0], bestScore = -1, bestTokens = [];
  for (const a of answers) {
    const t = tokens(normalize(a.replaceAll('*', ' zzwild ')));
    const filled = t.flatMap((w) => (w === 'zzwild' ? [] : [w]));
    const s = lcs(u, filled).len / Math.max(filled.length, 1);
    if (s > bestScore) { bestScore = s; best = a; bestTokens = filled; }
  }
  const hasWild = best.includes('*');
  const { inA, inB } = lcs(u, bestTokens);
  let extra = u.filter((_, i) => !inA.has(i));
  let missing = bestTokens.filter((_, j) => !inB.has(j));
  const messages = [];

  // Опечатки: лишнее слово, очень похожее на пропущенное
  const typos = [];
  for (const m of [...missing]) {
    const e = extra.find((x) => m.length >= 3 && editDistance(x, m) <= (m.length > 5 ? 2 : 1) && !isWordForm(x, m));
    if (e) {
      typos.push([e, m]);
      missing.splice(missing.indexOf(m), 1);
      extra.splice(extra.indexOf(e), 1);
    }
  }
  if (hasWild) extra = []; // лишние слова — это скорее всего имя

  for (const h of hints) {
    if (h.missing && missing.includes(h.missing)) messages.push(h.text);
    else if (h.extra && u.includes(h.extra)) messages.push(h.text);
    else if (h.single && u.length === 1) messages.push(h.text);
  }

  if (!messages.length) {
    for (const m of missing) {
      const e = extra.find((x) => isWordForm(x, m));
      if (e) messages.push(`Форма слова: нужно «${m}», а не «${e}». В английском окончание меняет смысл (he live**s**, I work**ed**, two dollar**s**).`);
    }
  }
  if (!messages.length) {
    const sameBag = !missing.length && !extra.length && typos.length === 0 && u.join(' ') !== bestTokens.join(' ');
    if (sameBag) messages.push('Все слова правильные, но порядок другой. В английском порядок слов строгий: сначала кто (I), потом действие (am / like / have), потом остальное.');
    if (missing.some((w) => BE.has(w)) && !u.some((w) => BE.has(w)))
      messages.push('Пропущен глагол to be (am / is / are). По-русски мы говорим «Я из России», а по-английски обязательно «I am from Russia».');
    if (u[0] === 'i' && u.includes('is') && missing.includes('am'))
      messages.push('С I всегда используется am: I am, а не I is.');
    if (missing.includes('a') || missing.includes('an'))
      messages.push('Пропущен артикль a / an. Перед одним предметом, который можно посчитать, ставим a: a coffee, a hot dog, a job.');
    if (missing.includes('please'))
      messages.push('Не забывай please! В Америке без него просьба звучит грубовато.');
    if (missing.includes('do') && missing.includes('not'))
      messages.push('Отрицание с глаголами строится через do not (don\'t): I don\'t have a pet.');
  }

  if (typos.length && !missing.length && !extra.length && !messages.length) {
    return {
      ok: true, nearOk: true, best,
      messages: typos.map(([e, m]) => `Почти! Опечатка: «${e}» → «${m}».`),
    };
  }

  for (const [e, m] of typos) messages.push(`Опечатка: «${e}» → «${m}».`);
  if (missing.length) messages.push(`Не хватает: ${missing.map((w) => `«${w}»`).join(', ')}.`);
  if (extra.length) messages.push(`Лишнее: ${extra.map((w) => `«${w}»`).join(', ')}.`);
  return { ok: false, best, messages };
}

export function prettyAnswer(pattern, name = '…') {
  const s = pattern.replaceAll('*', name);
  return s.charAt(0).toUpperCase() + s.slice(1);
}
