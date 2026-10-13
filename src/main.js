// Точка входа: связывает 3D-мир, сюжет, уроки и интерфейс.
import { createEngine } from './world/engine.js';
import { NPCS, QUESTS, THREADS, CHAPTERS } from './data/index.js';
import { state, save, setFlag, on, addMoney } from './game/state.js';
import { addXP, clearMistake } from './game/progress.js';
import { addWord, dueWords } from './game/srs.js';
import { speak } from './game/speech.js';
import { runDialogue } from './ui/dialogue.js';
import { createHud } from './ui/hud.js';
import { createPhone } from './ui/phone.js';
import { startShift } from './ui/barista.js';
import { openAiChat } from './ui/aichat.js';
import { startRide } from './ui/subway.js';
import { el, ui, toast, modal, confetti, floatText, money, md } from './ui/dom.js';
import { createTimeSystem } from './world/time.js';
import { defaultQuality } from './world/render.js';
import { createImmersion } from './ui/immersion.js';
import { createCollectibles } from './world/collectibles.js';
import { COLLECTIBLES } from './data/collectibles.js';

const SPEAKER_COLORS = {
  marcus: '#c99a1a', jess: '#4f8a5f', rodriguez: '#a2456c', tony: '#c94f3d', dev: '#3f6aa8', luis: '#7a5a8f',
  sal: '#3e7d4f', emily: '#3f8ab0', jay: '#c98a1a', linda: '#2f9a8a',
};
const speakerOf = (npc) => ({ ...npc, color: npc.color || SPEAKER_COLORS[npc.id] || '#5b7fb3', mode: 'world' });

state.settings.gfx ??= defaultQuality();
const engine = createEngine(document.getElementById('game'), { npcs: NPCS, quality: state.settings.gfx });
let busy = false; // открыт диалог / мини-игра

// ---------- Время суток, расписания, прохожие ----------
const time = createTimeSystem({ engine, state });
state.apples ??= {};

// Работает ли персонаж сейчас (hours: [с, до], «до» может быть больше 24 — после полуночи)
function isOpen(npc) {
  if (!npc.hours) return true;
  const [a, b] = npc.hours;
  const h = time.hour;
  return (h >= a && h < b) || (h + 24 >= a && h + 24 < b);
}
const hoursText = (npc) => `${Math.floor(npc.hours[0])}:${npc.hours[0] % 1 ? '30' : '00'}`;
engine.setNpcFilter((id) => (NPCS[id].map || 'brooklyn') === engine.mapId && isOpen(NPCS[id]));

const collectibles = createCollectibles(COLLECTIBLES);
collectibles.attach(engine.maps);

let lastWeather = state.weather;
let saveTimer = 0;
engine.onFrame((dt, t) => {
  time.update(dt);
  const h = time.hour;
  const density = h >= 7 && h < 20 ? 1 : h >= 20 && h < 23 ? 0.6 : 0.25;
  for (const m of Object.values(engine.maps)) m.crowd?.setDensity(time.raining ? density * 0.5 : density);
  for (const npc of Object.values(NPCS)) if (npc.dance) engine.npcDance(npc.id, !busy);
  collectibles.update(t, state.apples);
  if (!busy) {
    const apple = collectibles.near(engine.mapId, engine.playerPos, state.apples);
    if (apple) collectApple(apple);
  }
  if (state.weather !== lastWeather) {
    lastWeather = state.weather;
    if (state.weather === 'rain' && engine.mapId !== 'apartment') toast('Пошёл дождь ☔ It\'s raining! (дождь идёт)', { icon: '🌧️', time: 4500 });
  }
  saveTimer += dt;
  if (saveTimer > 10) { saveTimer = 0; save(); }
});

function collectApple(apple) {
  state.apples[apple.id] = true;
  addWord(apple.en, apple.ru);
  save();
  addMoney(2);
  addXP(10);
  speak(apple.en, { force: true });
  const found = Object.keys(state.apples).length;
  whenFree(() => {
    confetti();
    modal(el('div', { class: 'complete' },
      el('div', { class: 'daily-emoji' }, '🍎'),
      el('div', { class: 'muted' }, `Золотое яблоко ${found} из ${COLLECTIBLES.length}`),
      el('div', { class: 'daily-title' }, apple.en),
      el('div', { class: 'muted' }, apple.ru),
      el('div', { class: 'tip-text', html: md(apple.text) }),
      el('div', { class: 'reward-row' }, el('span', {}, '+$2'), el('span', {}, '+10 XP'))));
  });
}

// ---------- Квесты ----------
const isDone = (id) => !!state.done[id];
const unlocked = (q) => (q.requires || []).every(isDone);
const questFor = (npcId) => QUESTS.find((q) => q.npc === npcId && !isDone(q.id) && unlocked(q));
const lockedQuestFor = (npcId) => QUESTS.find((q) => q.npc === npcId && !isDone(q.id) && !unlocked(q));

function npcStatus(id) {
  if (questFor(id)) return 'quest';
  if (lockedQuestFor(id)) return 'locked';
  if (id === 'jess' && state.flags.job) return 'shift';
  return 'talk';
}

function availableThreads() {
  return THREADS.filter((t) => (t.requires || []).every(isDone));
}

function todos() {
  const list = [];
  if (!isDone('arrive')) list.push({ text: QUESTS[0].todo });
  else {
    for (const q of QUESTS) {
      if (!unlocked(q)) continue;
      // Выполненные задания пройденных глав не загромождают список
      if (isDone(q.id) && state.flags[`chapter${q.chapter}`]) continue;
      const npc = NPCS[q.npc];
      const closed = !isDone(q.id) && npc.hours && !isOpen(npc);
      list.push({ text: closed ? `${q.todo} (с ${hoursText(npc)})` : q.todo, done: isDone(q.id), optional: q.optional });
    }
    const apples = Object.keys(state.apples).length;
    list.push({ text: `Найти золотые яблоки 🍎 ${apples}/${COLLECTIBLES.length}`, done: apples >= COLLECTIBLES.length, optional: true });
    // Одна строка на собеседника: зачёркнута, когда прочитаны все его сообщения
    const byFrom = new Map();
    for (const t of availableThreads()) {
      const prev = byFrom.get(t.from);
      byFrom.set(t.from, { name: t.fromRu || t.from, done: (prev ? prev.done : true) && !!state.phone.doneThreads[t.id] });
    }
    for (const f of byFrom.values()) list.push({ text: `Ответить ${f.name} в телефоне 📱`, done: f.done });
    if (state.flags.key) list.push({ text: 'Обставить квартиру (3 вещи)', done: state.items.length >= 3, optional: true });
    if (state.flags.job) list.push({ text: 'Отработать смену бариста', done: state.shifts > 0, optional: true });
  }
  return list;
}

// Окна (новый уровень и т.п.) не должны всплывать посреди диалога
const afterBusy = [];
function whenFree(fn) {
  if (busy) afterBusy.push(fn);
  else fn();
}

function setBusy(b) {
  busy = b;
  engine.setPaused(b);
  time.setPaused(b);
  hud.hide(b);
  if (!b) {
    engine.focusOn(null);
    setTimeout(() => { while (!busy && afterBusy.length) afterBusy.shift()(); }, 400);
  }
}

async function talkTo(npcId) {
  if (busy) return;
  const npc = NPCS[npcId];
  const quest = questFor(npcId);
  if (quest) return playQuest(quest);
  const locked = lockedQuestFor(npcId);
  if (locked) {
    engine.npcWave(npcId);
    speak('Hey there! Come back later!', { pitch: npc.pitch });
    const need = (locked.requires || []).filter((id) => !isDone(id)).map((id) => QUESTS.find((q) => q.id === id)?.todo).filter(Boolean);
    toast(`${npc.name}: «Come back later!» — сначала: ${need.join(', ').toLowerCase()}`, { icon: '👋', time: 4500 });
    return;
  }
  // Задание выполнено — меню действий
  const m = modal([
    el('div', { class: 'menu-head' }, el('div', { class: 'dlg-avatar', style: { background: speakerOf(npc).color } }, npc.name[0]), el('div', {}, el('b', {}, npc.name), el('div', { class: 'muted' }, npc.role))),
    el('button', { class: 'btn primary wide', onclick: () => { m.close(); chatWith(npc); } }, '💬 Поболтать (ИИ)'),
    npcId === 'jess' && state.flags.job ? el('button', { class: 'btn wide', onclick: () => { m.close(); shift(); } }, '☕ Начать смену бариста') : null,
    el('button', { class: 'btn ghost wide', onclick: () => { m.close(); replayQuest(npcId); } }, '🔁 Повторить диалог (тренировка)'),
  ]);
}

async function playQuest(quest, { replay = false } = {}) {
  const npc = NPCS[quest.npc];
  setBusy(true);
  engine.focusOn(npc.id);
  engine.npcWave(npc.id);
  const result = await runDialogue({
    speaker: speakerOf(npc),
    steps: replay ? quest.steps.filter((s) => s.t !== 'pay') : quest.steps,
    idPrefix: quest.id,
    onTalk: (s) => engine.npcTalk(npc.id, s),
  });
  setBusy(false);
  if (replay) {
    toast(`Тренировка окончена: ошибок ${result.mistakes}`, { icon: '🔁' });
    return;
  }
  state.done[quest.id] = true;
  for (const [en, ru] of quest.words || []) addWord(en, ru);
  save();
  addXP(quest.xp);
  engine.playerWave();
  questComplete(quest, result);
  if (quest.onDone?.flag) setFlag(quest.onDone.flag);
  if (quest.onDone?.money) { addMoney(quest.onDone.money); floatText(`+${money(quest.onDone.money)}`, 'money'); }
  if (quest.onDone?.toast) setTimeout(() => toast(quest.onDone.toast, { icon: '📍', time: 6000 }), 2600);
  checkNewMessages();
  checkChapterDone();
}

function replayQuest(npcId) {
  const q = QUESTS.find((x) => x.npc === npcId);
  if (q) playQuest(q, { replay: true });
}

function questComplete(quest, result) {
  const stars = result.mistakes === 0 ? 3 : result.mistakes <= 3 ? 2 : 1;
  const m = modal([
    el('div', { class: 'complete' },
      el('div', { class: 'stars' }, '★'.repeat(stars) + '☆'.repeat(3 - stars)),
      el('div', { class: 'daily-title' }, 'Задание выполнено!'),
      el('div', { class: 'muted strike' }, quest.todo),
      el('div', { class: 'reward-row' }, el('span', {}, `+${quest.xp + result.xp} XP`), el('span', {}, `+${(quest.words || []).length} слов`)),
      result.mistakes ? el('div', { class: 'muted' }, `Ошибок: ${result.mistakes} — они в дневнике ошибок 📝`) : el('div', { class: 'muted' }, 'Без единой ошибки! 🎉'),
      el('button', { class: 'btn primary wide', onclick: () => m.close() }, 'Продолжить')),
  ]);
  if (stars === 3) confetti();
}

function checkNewMessages() {
  for (const t of availableThreads()) {
    if (state.phone.doneThreads[t.id] || state.phone.unread.includes(t.id)) continue;
    state.phone.unread.push(t.id);
    save();
    setTimeout(() => {
      toast(`Новое сообщение от ${t.from}: «${t.steps[0].en}»`, { icon: '📱', time: 5000 });
      speak('Ding!', { rate: 1.2 });
    }, 4500);
  }
}

const CHAPTER_TEXT = {
  1: ['знакомство, кафе, деньги, вопросы и направления', 'Спустись в метро — тебя ждёт Манхэттен! 🚇'],
  2: ['прошедшее время, can / can\'t, -ing и работа', 'Продолжай: собирай золотые яблоки, гуляй ночью, болтай с жителями через ИИ. Глава 3 — скоро!'],
};
function checkChapterDone() {
  for (const ch of CHAPTERS) {
    if (state.flags[`chapter${ch.id}`]) continue;
    if (!ch.quests.filter((q) => !q.optional).every((q) => isDone(q.id))) continue;
    setFlag(`chapter${ch.id}`);
    const [learned, next] = CHAPTER_TEXT[ch.id] || ['много нового', ''];
    whenFree(() => setTimeout(() => {
      confetti();
      modal(el('div', { class: 'complete' },
        el('div', { class: 'daily-emoji' }, ch.id === 1 ? '🗽' : '🏙️'),
        el('div', { class: 'daily-title' }, `Глава ${ch.id} пройдена!`),
        el('div', {}, `«${ch.title}» (${ch.level}): ${learned}.`),
        el('div', { class: 'muted' }, next)));
    }, 2500));
  }
}

async function runThread(thread) {
  setBusy(true);
  const done = !!state.phone.doneThreads[thread.id];
  const result = await runDialogue({
    speaker: { name: thread.from, avatar: thread.avatar, color: '#7fb38a', pitch: 1.1, mode: 'phone', role: 'сообщения' },
    steps: thread.steps,
    idPrefix: thread.id,
  });
  setBusy(false);
  state.phone.unread = state.phone.unread.filter((id) => id !== thread.id);
  if (!done) {
    state.phone.doneThreads[thread.id] = true;
    save();
    addXP(thread.xp + result.xp);
    toast(`Переписка с ${thread.from}: +${thread.xp} XP`, { icon: '💬' });
  } else save();
}

// Шаги, на которых были ошибки (для тренировки)
function stepById(id) {
  const [prefix, idx] = id.split(':');
  const src = QUESTS.find((q) => q.id === prefix) || THREADS.find((t) => t.id === prefix);
  const step = src?.steps[Number(idx)];
  return step ? { ...step, _id: id } : null;
}

async function practiceMistakes(extraSteps = []) {
  const ids = [...new Set(state.mistakes.map((m) => m.id))].filter((id) => stepById(id)).slice(0, 6);
  const steps = [...ids.map(stepById), ...extraSteps];
  if (!steps.length) { toast('Нечего повторять — ошибок нет!', { icon: '🎉' }); return null; }
  setBusy(true);
  const result = await runDialogue({
    speaker: { name: 'Coach', avatar: '🎯', color: '#e07a5f', pitch: 1, role: 'Работа над ошибками' },
    steps,
    idPrefix: 'practice',
    onCorrect: (step, tries) => { if (tries === 0) clearMistake(step._id); },
  });
  setBusy(false);
  return result;
}

async function runDaily() {
  const today = new Date().toISOString().slice(0, 10);
  const words = dueWords(4);
  const wordSteps = words.map((w) => ({
    t: 'listen', en: w.en, q: 'Что значит это слово?', topic: 'listening',
    opts: [w.ru, ...Object.values(state.vocab).filter((x) => x.en !== w.en).sort(() => Math.random() - 0.5).slice(0, 3).map((x) => x.ru)],
    ok: 0,
  })).filter((s) => s.opts.length >= 2);
  let result;
  if (state.mistakes.length) result = await practiceMistakes(wordSteps);
  else if (wordSteps.length) {
    setBusy(true);
    result = await runDialogue({ speaker: { name: 'Daily', avatar: '🔥', color: '#f2a03c', role: 'Задание дня' }, steps: wordSteps, idPrefix: 'daily' });
    setBusy(false);
  } else {
    toast('Сначала пройди пару заданий в городе — будет что повторять!', { icon: '🗽' });
    return;
  }
  if (!result) return;
  state.daily = today;
  save();
  addMoney(10);
  addXP(30);
  floatText('+$10', 'money');
  confetti();
  toast('Задание дня выполнено! +$10, +30 XP', { icon: '🔥' });
}

function buy(item) {
  if (state.items.includes(item.id)) return false;
  if (state.money < item.price) {
    toast(`Не хватает денег: нужно ${money(item.price)}. Заработай на смене бариста ☕`, { icon: '💸' });
    return false;
  }
  addMoney(-item.price);
  state.items.push(item.id);
  addWord(item.en, item.ru);
  save();
  engine.maps.apartment.setItems(state.items);
  toast(`Куплено: ${item.en} (${item.ru}). Доставлено домой!`, { icon: item.emoji });
  return true;
}

function shift() {
  setBusy(true);
  startShift({ onDone: () => setBusy(false) });
}

function chatWith(npc) {
  setBusy(true);
  engine.focusOn(npc.id);
  openAiChat(speakerOf(npc), {
    onTalk: (s) => engine.npcTalk(npc.id, s),
    onClose: () => setBusy(false),
    openSettings: () => phone.open('settings'),
  });
}

// ---------- Двери и объекты ----------
function interaction() {
  if (busy) return null;
  const p = engine.playerPos;
  const near = (spot, r = 1.6) => spot && Math.hypot(p.x - spot[0], p.z - spot[1]) < r;
  if (engine.mapId === 'apartment') {
    const ap = engine.maps.apartment.spots;
    if (near(ap.exit, 1.3)) return { label: '🚪 Выйти на улицу', run: () => engine.enterMap('brooklyn', 'homeDoor') };
    if (near(ap.bed, 2.0)) return { label: '😴 Лечь спать', run: goToSleep };
    return null;
  }
  if (engine.mapId === 'manhattan') {
    const npcM = engine.nearestNpc();
    if (npcM) return { label: `💬 ${NPCS[npcM].name}`, run: () => talkTo(npcM) };
    if (near(engine.maps.manhattan.spots.subway, 2.2)) return { label: '🚇 Метро → Бруклин', run: () => ride('brooklyn') };
    return null;
  }
  const b = engine.maps.brooklyn.spots;
  const npc = engine.nearestNpc();
  const npcDist = npc ? engine.npcObjs[npc].pos.distanceTo(p) : Infinity;
  const doorDist = Math.hypot(p.x - b.homeDoor[0], p.z - b.homeDoor[1]);
  if (npc && npcDist < doorDist) return { label: `💬 ${NPCS[npc].name}`, run: () => talkTo(npc) };
  if (near(b.homeDoor, 1.3)) {
    return state.flags.key
      ? { label: '🏠 Войти домой', run: enterHome }
      : { label: '🚪 Дверь', run: () => toast('Заперто. Ключ у миссис Родригес 🔑', { icon: '🚪' }) };
  }
  if (near(b.subway, 2)) {
    return { label: '🚇 Метро → Манхэттен', run: () => (isDone('subway')
      ? ride('manhattan')
      : toast('Сначала узнай у Дева, как пользоваться метро', { icon: '🚇' })) };
  }
  if (npc) return { label: `💬 ${NPCS[npc].name}`, run: () => talkTo(npc) };
  return null;
}

const FARE = 2.9;
function ride(to) {
  if (busy) return;
  setBusy(true);
  if (state.money >= FARE) {
    addMoney(-FARE);
    floatText(`−${money(FARE)}`, 'money');
  } else {
    toast('Денег на проезд не хватило — добрый незнакомец оплатил тебе поездку 🙏', { icon: '🚇' });
  }
  startRide({
    to,
    onArrive: () => {
      engine.enterMap(to, to === 'manhattan' ? 'start' : 'subway');
      setBusy(false);
      if (to === 'manhattan' && !state.flags.visitedManhattan) {
        setFlag('visitedManhattan');
        setTimeout(() => toast('Добро пожаловать в Манхэттен! Найди пиццерию Сала, танцора и потерявшуюся туристку 🗽', { icon: '🏙️', time: 6500 }), 800);
      }
    },
  });
}

function goToSleep() {
  const h = time.hour;
  if (h >= 7 && h < 19) {
    toast('Ещё рано спать! Ложиться можно вечером (после 19:00) 🌙', { icon: '😴' });
    return;
  }
  setBusy(true);
  const fade = el('div', { class: 'sleep-fade' }, el('div', {}, '💤'), el('div', { class: 'sleep-text' }, 'Good night!'));
  ui().append(fade);
  speak('Good night!', { force: true });
  setTimeout(() => {
    time.sleep();
    save();
    fade.querySelector('.sleep-text').textContent = `Good morning! День ${state.day}`;
    speak('Good morning!', { force: true });
  }, 1800);
  setTimeout(() => {
    fade.classList.add('out');
    setTimeout(() => fade.remove(), 800);
    setBusy(false);
    toast(state.weather === 'rain' ? 'Сегодня дождливо ☔ Новый день — новое задание дня в телефоне!' : 'Солнечное утро ☀️ Новый день — новое задание дня в телефоне!', { icon: '🌅', time: 5000 });
  }, 3600);
}

function enterHome() {
  engine.maps.apartment.setItems(state.items);
  engine.enterMap('apartment');
  if (!state.flags.visitedHome) {
    setFlag('visitedHome');
    toast('Твоя первая квартира в Нью-Йорке! Пока пусто — купи мебель в Телефоне → Магазин', { icon: '🏠', time: 6000 });
  }
}

engine.onInteract(() => interaction()?.run());
engine.onNpcClick((id) => talkTo(id));

// ---------- Интерфейс ----------
const phone = createPhone({
  availableThreads,
  runThread,
  practiceMistakes: () => practiceMistakes(),
  runDaily,
  buy,
  startShift: shift,
  onOpen: () => engine.setPaused(true),
  onClose: () => { if (!busy) engine.setPaused(false); },
});

const hud = createHud({
  engine,
  npcs: NPCS,
  getTodos: todos,
  getNpcStatus: npcStatus,
  getInteraction: interaction,
  getClock: () => `${time.raining ? '🌧️' : time.phase.icon} ${time.clockText}`,
  onPhone: () => (phone.isOpen ? phone.close() : phone.open()),
  onAction: () => interaction()?.run(),
});

createImmersion({ engine, time, isBusy: () => busy || phone.isOpen });

on('levelup', (lvl) => whenFree(() => {
  confetti();
  speak('Level up! Awesome!', { force: true });
  modal(el('div', { class: 'complete' },
    el('div', { class: 'daily-emoji' }, '🎓'),
    el('div', { class: 'daily-title' }, `Новый уровень: ${lvl.id}`),
    el('div', {}, `Теперь ты — «${lvl.title}». Персонажи в ИИ-разговорах будут говорить чуть сложнее.`)));
}));

window.addEventListener('keydown', (e) => {
  if (e.code === 'KeyP' && !busy && !e.target.closest?.('input')) phone.isOpen ? phone.close() : phone.open();
  if (e.code === 'Escape' && phone.isOpen) phone.close();
});

if (state.items.length) engine.maps.apartment.setItems(state.items);

// ---------- Заставка ----------
function intro() {
  const fresh = !isDone('arrive');
  const screen = el('div', { class: 'intro' },
    el('div', { class: 'intro-card' },
      el('div', { class: 'intro-logo' }, 'BIG APPLE'),
      el('div', { class: 'intro-sub' }, 'Американский английский в Нью-Йорке'),
      el('div', { class: 'intro-text' }, fresh
        ? 'Ты только что прилетел в Нью-Йорк и почти не знаешь английского. Найди жильё, работу и друзей — и заговори как настоящий американец.'
        : `С возвращением${state.name ? `, ${state.name}` : ''}! Бруклин ждёт.`),
      el('button', { class: 'btn primary big', onclick: start }, fresh ? 'Начать игру' : 'Продолжить'),
      el('div', { class: 'intro-help' }, '🖱️ Тап / клик — идти · WASD — ходить · E — говорить · P — телефон · 🔊 включи звук')));
  ui().append(screen);
  function start() {
    // Первый звук должен прозвучать после нажатия — иначе браузер его заблокирует
    speak(fresh ? 'Welcome to New York!' : 'Welcome back!', { force: true });
    screen.classList.add('out');
    setTimeout(() => screen.remove(), 600);
    if (fresh) setTimeout(() => toast('Подойди к таксисту Маркусу у жёлтого такси 🚕', { icon: '👉', time: 6000 }), 900);
    checkNewMessages();
  }
}
intro();

// Для отладки из консоли браузера
window.bigApple = { state, engine, time, ride };
