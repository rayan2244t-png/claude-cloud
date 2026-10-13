# Как расширять Big Apple

Игра устроена так, что **контент отделён от движка**. Почти всё новое добавляется
правкой файлов с данными в `src/data/` — код трогать не нужно.

```
src/
  data/            ← контент: главы, персонажи, диалоги, мебель, фразы, яблоки
    index.js       ← реестр глав
    chapter1.js    ← Глава 1 «Бруклин» (A1)
    chapter2.js    ← Глава 2 «Манхэттен» (A2)
    immersion.js   ← фразы прохожих и подписи предметов
    collectibles.js← золотые яблоки (сленг)
    shop.js        ← мебель и меню мини-игры
  world/           ← 3D: движок, карты, персонажи, шейдеры, время суток
    maps/          ← районы города (brooklyn, manhattan, apartment)
  game/            ← логика обучения: проверка ответов, словарь, прогресс, ИИ
  ui/              ← интерфейс: диалоги, телефон, HUD, мини-игры
```

## Добавить задание (квест)

Откройте главу, например `src/data/chapter1.js`, и допишите объект в `QUESTS`:

```js
{
  id: 'laundry',                 // уникальный id
  npc: 'rodriguez',              // кто даёт задание
  todo: 'Постирать вещи',        // строка в списке дел
  xp: 40,
  requires: ['apartment'],       // какие задания нужно пройти до этого
  words: [['laundry', 'стирка'], ['washer', 'стиральная машина']],
  steps: [
    { t: 'say', en: 'The laundry room is downstairs.', ru: 'Прачечная внизу.' },
    { t: 'tip', title: 'Laundry', text: '**Laundry** — стирка и прачечная.' },
    { t: 'choice', q: 'Спроси, сколько стоит', topic: 'questions', opts: [
      { en: 'How much is it?', ok: true },
      { en: 'How many is it?', why: 'Про деньги — how much.' },
    ] },
  ],
  onDone: { flag: 'laundry', money: 10, toast: 'Готово!' },
},
```

### Типы шагов

| `t` | Что делает | Поля |
|---|---|---|
| `say` | персонаж говорит | `en`, `ru` (можно `{name}` — имя игрока) |
| `tip` | карточка-подсказка (попадает в «Шпаргалку») | `title`, `text` (`**жирный**`) |
| `choice` | выбрать ответ | `q`, `opts: [{ en, ok } / { en, why }]`, `topic` |
| `build` | собрать фразу из слов | `q`, `answer`, `extra` (лишние слова), `hints` |
| `type` | написать ответ | `q`, `answers` (`*` = любое слово/имя), `example`, `hints` |
| `speak` | сказать вслух (или написать) | как `type` |
| `listen` | послушать и выбрать | `en`, `q`, `opts`, `ok` (индекс верного) |
| `pay` | заплатить | `amount` |

**Подсказки к ошибкам** (`hints`): `{ missing: 'am', text: '…' }` — если пропущено слово,
`{ extra: 'many', text: '…' }` — если написано лишнее, `{ single: true, text: '…' }` — если ответ из одного слова.
Общие ошибки (to be, артикли, please, порядок слов, опечатки) проверка ловит сама.

**Темы** (`topic`) — для дневника ошибок: `greetings`, `to_be`, `articles`, `numbers`,
`politeness`, `word_order`, `questions`, `have`, `directions`, `slang`, `food`, `listening`
(список и названия — в `src/game/progress.js`).

**Новый тип упражнения** — допишите функцию в `STEP_TYPES` в `src/ui/dialogue.js`.

## Добавить персонажа

В `NPCS` главы:

```js
mike: {
  id: 'mike', name: 'Mike', role: 'Сосед', pitch: 0.9,
  map: 'brooklyn',            // на какой карте стоит (по умолчанию brooklyn)
  hours: [9, 21],             // когда на улице (можно [18, 27] — до 3 ночи)
  dance: false,               // танцует, когда не разговаривает
  pos: [12, 0, 5.5],          // где стоит: x, y, z
  look: { skin: '#e8b48f', shirt: '#5b7fb3', pants: '#3d4a5c', hair: '#3a2a20',
          hat: 'cap' /* none | cap | beanie | bun | paper */, hatColor: '#c94f3d',
          glasses: true, mustache: false, apron: '#fff', backpack: '#f2c230', headphones: false },
  persona: 'You are Mike, a friendly neighbor…', // характер для ИИ-разговоров
},
```

Цвет имени в диалогах — `SPEAKER_COLORS` в `src/main.js`.

## Добавить главу

1. Скопируйте `src/data/chapter2.js` → `chapter3.js`, поменяйте `NPCS`, `QUESTS`, `CHAPTER.id/title/level`.
2. Подключите в `src/data/index.js`:
   ```js
   import { CHAPTER as chapter3, NPCS as npcs3 } from './chapter3.js';
   export const CHAPTERS = [chapter1, chapter2, chapter3];
   export const NPCS = { ...npcs1, ...npcs2, ...npcs3 };
   ```
3. Текст «глава пройдена» — `CHAPTER_TEXT` в `src/main.js`.

## Добавить район (карту)

1. Создайте `src/world/maps/имя.js` по образцу `manhattan.js`: функция возвращает
   `{ id, root, colliders, bounds, heightAt, spots, cam?, crowd?, update }`.
2. Зарегистрируйте в `src/world/maps/index.js`.
3. Персонажи с `map: 'имя'` появятся там автоматически. Переход (метро, дверь) —
   функция `interaction()` в `src/main.js`.

Строительные блоки — в `src/world/kit.js` (`block`, `rbox`, `cyl`, `sphere`, `sign`,
`glowMat` — светится ночью, `wetMat` — блестит в дождь) и `src/world/props.js`
(дома, деревья, фонари, машины, тележки, вход в метро…).

## Мелочи

- **Фразы прохожих и подписи предметов** — `src/data/immersion.js`.
- **Золотые яблоки** — `src/data/collectibles.js` (`pos: [x, z]` на карте).
- **Мебель** — `src/data/shop.js` + модель и место в `src/world/maps/apartment.js` (`FURNITURE`, `SLOTS`).
- **Переписка в телефоне** — `PHONE_THREADS` в главе.
- **Уровни** (A1.1 … B1) — `LEVELS` в `src/game/progress.js`.
- **Время суток, цвета неба** — `src/world/time.js`; **эффекты** — `src/world/render.js`.

## Отладка

В консоли браузера доступен `window.bigApple`:

```js
bigApple.time.setTime(19)                 // перемотать на 19:00
bigApple.state.weather = 'rain'           // включить дождь
bigApple.engine.teleport(0, 10)           // переместиться
bigApple.ride('manhattan')                // поехать на метро
```
