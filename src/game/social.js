// Дружба с персонажами и достижения.
import { state, save, emit, addMoney } from './state.js';

// ---------- Дружба ----------
export const FRIEND_LEVELS = [
  { at: 0, name: 'Незнакомец', hearts: 0 },
  { at: 3, name: 'Знакомый', hearts: 1 },
  { at: 8, name: 'Приятель', hearts: 2 },
  { at: 15, name: 'Друг', hearts: 3 },
  { at: 25, name: 'Лучший друг', hearts: 4 },
];

export function friendLevel(id) {
  const pts = state.friends?.[id] || 0;
  let lvl = FRIEND_LEVELS[0];
  for (const l of FRIEND_LEVELS) if (pts >= l.at) lvl = l;
  const next = FRIEND_LEVELS.find((l) => l.at > pts);
  return { ...lvl, pts, next };
}

export function addFriendship(id, n = 1) {
  state.friends ||= {};
  const before = friendLevel(id);
  state.friends[id] = (state.friends[id] || 0) + n;
  save();
  const after = friendLevel(id);
  if (after.hearts > before.hearts) {
    emit('friendup', { id, level: after });
    // Подарок за дружбу
    if (after.hearts >= 3) addMoney(15);
  }
}

export const hearts = (id) => '❤️'.repeat(friendLevel(id).hearts) + '🤍'.repeat(4 - friendLevel(id).hearts);

// ---------- Достижения ----------
export const ACHIEVEMENTS = [
  { id: 'first_words', icon: '👋', name: 'Первые слова', desc: 'Пройти первое задание', test: (s) => !!s.done.arrive },
  { id: 'coffee', icon: '☕', name: 'Can I get a coffee?', desc: 'Заказать кофе', test: (s) => !!s.done.coffee },
  { id: 'home', icon: '🏠', name: 'Свой угол', desc: 'Снять комнату', test: (s) => !!s.done.apartment },
  { id: 'chapter1', icon: '🗽', name: 'Бруклинец', desc: 'Пройти главу 1', test: (s) => !!s.flags.chapter1 },
  { id: 'chapter2', icon: '🏙️', name: 'Покоритель Манхэттена', desc: 'Пройти главу 2', test: (s) => !!s.flags.chapter2 },
  { id: 'chapter3', icon: '🏥', name: 'Как местный', desc: 'Пройти главу 3', test: (s) => !!s.flags.chapter3 },
  { id: 'finale', icon: '🎆', name: 'Нью-Йоркер', desc: 'Пройти весь сюжет', test: (s) => !!s.flags.finale },
  { id: 'words50', icon: '📖', name: 'Словарик', desc: '50 слов в словаре', test: (s) => Object.keys(s.vocab).length >= 50 },
  { id: 'words200', icon: '📚', name: 'Книжный червь', desc: '200 слов в словаре', test: (s) => Object.keys(s.vocab).length >= 200 },
  { id: 'words500', icon: '🧠', name: 'Ходячий словарь', desc: '500 слов в словаре', test: (s) => Object.keys(s.vocab).length >= 500 },
  { id: 'streak3', icon: '🔥', name: 'В ритме', desc: '3 дня подряд', test: (s) => (s.stats?.streak || 0) >= 3 },
  { id: 'streak7', icon: '🔥🔥', name: 'Неделя без пропусков', desc: '7 дней подряд', test: (s) => (s.stats?.streak || 0) >= 7 },
  { id: 'streak30', icon: '🏆', name: 'Железная воля', desc: '30 дней подряд', test: (s) => (s.stats?.streak || 0) >= 30 },
  { id: 'apples5', icon: '🍎', name: 'Охотник за яблоками', desc: 'Найти 5 золотых яблок', test: (s) => Object.keys(s.apples || {}).length >= 5 },
  { id: 'apples_all', icon: '🍏', name: 'Весь Big Apple', desc: 'Найти все золотые яблоки', test: (s, ctx) => Object.keys(s.apples || {}).length >= ctx.applesTotal },
  { id: 'shadow10', icon: '🗣️', name: 'Тень носителя', desc: '10 повторов в шэдовинге', test: (s) => (s.shadow?.count || 0) >= 10 },
  { id: 'shadow_perfect', icon: '🎯', name: 'Как американец', desc: '90%+ в шэдовинге', test: (s) => Object.values(s.shadow?.best || {}).some((v) => v >= 90) },
  { id: 'rules5', icon: '📘', name: 'Грамматист', desc: 'Потренировать 5 правил', test: (s) => Object.keys(s.rulesDone || {}).length >= 5 },
  { id: 'rules_all', icon: '🎓', name: 'Профессор', desc: 'Потренировать все правила', test: (s, ctx) => Object.keys(s.rulesDone || {}).length >= ctx.rulesTotal },
  { id: 'barista', icon: '☕', name: 'Бариста года', desc: 'Отработать 5 смен', test: (s) => (s.shifts || 0) >= 5 },
  { id: 'rich', icon: '💰', name: 'Американская мечта', desc: 'Накопить $300', test: (s) => s.money >= 300 },
  { id: 'cozy', icon: '🛋️', name: 'Уютное гнёздышко', desc: 'Купить 5 вещей в квартиру', test: (s) => s.items.length >= 5 },
  { id: 'friend', icon: '🤝', name: 'Свой человек', desc: 'Подружиться с кем-нибудь (3 сердца)', test: (s) => Object.values(s.friends || {}).some((p) => p >= 15) },
  { id: 'night_owl', icon: '🦉', name: 'Сова', desc: 'Найти музыканта ночью', test: (s) => !!s.done.music },
  { id: 'taxi', icon: '🚕', name: 'Штурман', desc: 'Пройти «Такси-навигатор»', test: (s) => (s.games?.taxi || 0) >= 1 },
  { id: 'karaoke', icon: '🎤', name: 'Звезда караоке', desc: 'Спеть в караоке', test: (s) => (s.games?.karaoke || 0) >= 1 },
  { id: 'diner', icon: '🥞', name: 'Смена в дайнере', desc: 'Отработать смену в дайнере', test: (s) => (s.games?.diner || 0) >= 1 },
  { id: 'smalltalk', icon: '💬', name: 'Small talk', desc: 'Поболтать с 10 прохожими', test: (s) => (s.games?.smalltalk || 0) >= 10 },
  { id: 'level_a2', icon: '⬆️', name: 'Уровень A2', desc: 'Достичь уровня A2', test: (s) => s.xp >= 600 },
  { id: 'level_b1', icon: '🚀', name: 'Уровень B1', desc: 'Достичь уровня B1', test: (s) => s.xp >= 1300 },
];

export function checkAchievements(ctx) {
  state.achievements ||= {};
  const fresh = [];
  for (const a of ACHIEVEMENTS) {
    if (state.achievements[a.id]) continue;
    try {
      if (a.test(state, ctx)) {
        state.achievements[a.id] = Date.now();
        fresh.push(a);
      }
    } catch { /* ignore */ }
  }
  if (fresh.length) { save(); fresh.forEach((a) => emit('achievement', a)); }
  return fresh;
}

export function addGameStat(name, n = 1) {
  state.games ||= {};
  state.games[name] = (state.games[name] || 0) + n;
  save();
}
