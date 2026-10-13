// Реестр глав. Новая глава = новый файл в src/data + одна строка в CHAPTERS.
import { CHAPTER as chapter1 } from './chapter1.js';
import { NPCS as npcs1 } from './chapter1.js';

export const CHAPTERS = [chapter1];

export const NPCS = { ...npcs1 };

export const QUESTS = CHAPTERS.flatMap((c) => c.quests.map((q) => ({ ...q, chapter: c.id })));
export const THREADS = CHAPTERS.flatMap((c) => c.threads.map((t) => ({ ...t, chapter: c.id })));

// Общий словарь из всех глав — по нему подсвечиваются слова в репликах
export const DICTIONARY = new Map();
for (const q of QUESTS) for (const [en, ru] of q.words || []) DICTIONARY.set(en.toLowerCase(), ru);
for (const [en, ru] of [
  ['welcome', 'добро пожаловать'], ['coffee', 'кофе'], ['street', 'улица'], ['house', 'дом'], ['green', 'зелёный'],
  ['door', 'дверь'], ['park', 'парк'], ['best', 'лучший'], ['first', 'первый'], ['time', 'время / раз'],
  ['thanks', 'спасибо'], ['sure', 'конечно'], ['order', 'заказ'], ['help', 'помощь'], ['room', 'комната'],
  ['questions', 'вопросы'], ['today', 'сегодня'], ['home', 'дом'], ['city', 'город'], ['weekend', 'выходные'],
  ['apartment', 'квартира'], ['big', 'большой'], ['hot', 'горячий'], ['hot dogs', 'хот-доги'], ['street', 'улица'],
  ['ride', 'поездка'], ['perfect', 'отлично'], ['job', 'работа'], ['bucks', 'баксы'], ['phone', 'телефон'],
  ['problem', 'проблема'], ['month', 'месяц'], ['new', 'новый'], ['beautiful', 'красивый'], ['small', 'маленький'],
  ['cozy', 'уютный'], ['shift', 'смена'], ['anytime', 'в любое время'], ['gate', 'турникет'], ['pay', 'платить'],
]) if (!DICTIONARY.has(en)) DICTIONARY.set(en, ru);
