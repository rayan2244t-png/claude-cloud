// Глава 4 «Coney Island» (A2+ / B1): планы и будущее, опыт (Have you ever…?), сравнения,
// условия (If…, I'll…), used to. Финал — встреча с Сэмом и фейерверк.

export const NPCS = {
  maria: {
    id: 'maria', name: 'Maria', role: 'Спасатель', pitch: 1.1, gender: 'f', map: 'coney', hours: [8, 20],
    look: { skin: '#c99a73', shirt: '#e94f4f', pants: '#e94f4f', hair: '#2a2420', hairStyle: 'ponytail', sleeves: 'short', hat: 'cap', hatColor: '#f6f3ec' },
    pos: [12.5, 0, 15.5],
    persona: 'You are Maria, a confident lifeguard at Coney Island beach in your 20s. You care about safety, you love the ocean and surfing.',
  },
  mike: {
    id: 'mike', name: 'Big Mike', role: 'Работник аттракционов', pitch: 0.7, gender: 'm', map: 'coney', hours: [10, 24],
    look: { skin: '#8d5a3b', shirt: '#5b7fb3', pants: '#3a3a3a', hair: '#151515', hairStyle: 'bald', sleeves: 'short', scale: 1.15 },
    pos: [-24, 0, -4.4],
    persona: 'You are Big Mike, a big, loud and funny ride operator at the Wonder Wheel in Coney Island. You have worked here for 25 years and love scaring tourists with stories about the Cyclone.',
  },
  joe: {
    id: 'joe', name: 'Grandpa Joe', role: 'Старожил Бруклина', pitch: 0.8, gender: 'm', map: 'coney', hours: [9, 21],
    look: { skin: '#e3b08a', shirt: '#c9b28f', pants: '#5b4b3b', hair: '#d9d4cc', hairStyle: 'short', hat: 'beanie', hatColor: '#3a6ea5', glasses: true, jacket: '#8a6347' },
    pos: [-20, 0.35, 4.8],
    persona: 'You are Grandpa Joe, an 82-year-old Brooklyn native who has come to Coney Island since he was a kid. You love telling stories about the old days.',
  },
  samnpc: {
    id: 'samnpc', name: 'Sam', role: 'Твой друг', pitch: 1.0, gender: 'm', map: 'coney', hours: [0, 24],
    look: { skin: '#e8b48f', shirt: '#7fb38a', pants: '#2f3b52', hat: 'cap', hatColor: '#e07a5f', hair: '#c4572e', hairStyle: 'short', sleeves: 'short', backpack: '#2f3b52' },
    pos: [2, 0.35, 0.5],
    persona: 'You are Sam, the player\'s best friend in New York, a fun 25-year-old who loves music, pizza and the beach. You text with lots of slang and emojis.',
  },
};

export const QUESTS = [
  {
    id: 'lifeguard', npc: 'maria', todo: 'Поговорить со спасателем', xp: 70, requires: ['doctor'],
    words: [['lifeguard', 'спасатель'], ['flag', 'флаг'], ['current', 'течение'], ['sunscreen', 'солнцезащитный крем'], ['dangerous', 'опасный'], ['allowed', 'разрешено'], ['surfing', 'сёрфинг']],
    steps: [
      { t: 'say', en: "Hey! Careful! The water is really cold today. Are you going to swim?", ru: 'Эй! Осторожно! Вода сегодня очень холодная. Собираешься плавать?' },
      {
        t: 'choice', q: 'Скажи, что собираешься', topic: 'slang',
        opts: [
          { en: "Yeah, I'm going to swim later.", ok: true },
          { en: 'Yeah, I going to swim later.', why: 'Пропущен am: I\'m going to swim.' },
          { en: "Yeah, I'm going to swimming later.", why: 'После going to — начальная форма: swim.' },
        ],
      },
      { t: 'say', en: "OK. If you see a red flag, don't go in the water. It means it's dangerous.", ru: 'Хорошо. Если увидишь красный флаг — не заходи в воду. Это значит опасно.' },
      { t: 'tip', title: 'If…, … (условие)', text: '**If + настоящее время, …** — реальное условие: **If you see a red flag, don\'t swim.** **If it rains, I\'ll go home.** После if — без will!' },
      {
        t: 'build', q: 'Скажи: «Если будет холодно, я не буду плавать»', topic: 'word_order',
        answer: "If it's cold, I won't swim", extra: ['will', 'is'],
        hints: [{ extra: 'will', text: 'После if — настоящее время: If it\'s cold (без will).' }],
      },
      { t: 'say', en: "Smart! And don't forget sunscreen. The sun is stronger than you think.", ru: 'Умно! И не забудь солнцезащитный крем. Солнце сильнее, чем кажется.' },
      { t: 'listen', en: "The sun is stronger than you think.", q: 'Что сказала Мария про солнце?', topic: 'listening', opts: ['Солнце сильнее, чем кажется', 'Солнце слабое сегодня', 'Скоро будет дождь', 'Солнце садится'], ok: 0 },
      { t: 'say', en: 'Have you ever tried surfing?', ru: 'Ты когда-нибудь пробовал сёрфинг?' },
      {
        t: 'choice', q: 'Ответь: «Нет, никогда»', topic: 'have',
        opts: [
          { en: "No, I've never tried it.", ok: true },
          { en: "No, I've never try it.", why: 'После have — 3-я форма: tried.' },
          { en: "No, I didn't never try.", why: 'Двойное отрицание нельзя. Опыт: I\'ve never tried it.' },
        ],
      },
      { t: 'say', en: "You should try it! I'll teach you next summer. Have fun out there!", ru: 'Обязательно попробуй! Научу следующим летом. Хорошо повеселиться!' },
    ],
  },
  {
    id: 'wheel', npc: 'mike', todo: 'Прокатиться на колесе обозрения', xp: 75, requires: ['doctor'],
    words: [['ride', 'аттракцион; кататься'], ['scary', 'страшный'], ['higher', 'выше'], ['the scariest', 'самый страшный'], ['view', 'вид'], ['line', 'очередь'], ['worth it', 'того стоит']],
    steps: [
      { t: 'say', en: "Step right up! The Wonder Wheel! Best view in Brooklyn! You want a ride?", ru: 'Подходите! Колесо чудес! Лучший вид в Бруклине! Хочешь прокатиться?' },
      {
        t: 'choice', q: 'Спроси, страшно ли это', topic: 'questions',
        opts: [
          { en: 'Sure! Is it scary?', ok: true },
          { en: 'Sure! It is scary?', why: 'В вопросе is — первым: Is it scary?' },
          { en: 'Sure! Is it scared?', why: 'Scared — «испуганный» (о человеке). Страшный — scary.' },
        ],
      },
      { t: 'say', en: "Ha! The wheel? No way! The Cyclone is much scarier. It's the scariest ride in New York!", ru: 'Ха! Колесо? Да ну! «Циклон» гораздо страшнее. Это самый страшный аттракцион в Нью-Йорке!' },
      { t: 'tip', title: 'scary → scarier → the scariest', text: 'Сравнение: короткое слово + **-er** (scarier — страшнее), превосходная — **the + -est** (the scariest — самый страшный). y → i. Усилить: **much** scarier — намного страшнее.' },
      {
        t: 'build', q: 'Спроси: «Что выше — колесо или горки?»', topic: 'questions',
        answer: 'Which is higher, the wheel or the coaster?', extra: ['more', 'what'],
        hints: [{ extra: 'more', text: 'Короткое слово: higher, без more.' }, { extra: 'what', text: 'Выбор из двух — which.' }],
      },
      { t: 'say', en: "The wheel! It's a hundred and fifty feet tall. It's been here since 1920!", ru: 'Колесо! Высотой 150 футов. Оно здесь с 1920 года!' },
      { t: 'listen', en: "It's a hundred and fifty feet tall. It's been here since 1920.", q: 'С какого года стоит колесо?', topic: 'numbers', opts: ['С 1920', 'С 1950', 'С 1912', 'С 2020'], ok: 0 },
      { t: 'say', en: "Tickets are ten bucks. Trust me, it's worth it!", ru: 'Билет — десять баксов. Поверь, оно того стоит!' },
      { t: 'pay', amount: 10 },
      { t: 'say', en: "Enjoy the view! Don't drop your phone!", ru: 'Наслаждайся видом! Не урони телефон!' },
      {
        t: 'type', q: 'После поездки: скажи «Это было потрясающе!»', example: 'It was amazing!', topic: 'slang',
        answers: ['It was amazing', 'That was amazing', 'It was awesome', 'That was awesome', 'It was incredible', 'That was so cool', 'It was so cool'],
        hints: [{ missing: 'was', text: 'Это уже в прошлом: It was…' }],
      },
    ],
  },
  {
    id: 'grandpa', npc: 'joe', todo: 'Послушать истории дедушки Джо', xp: 75, requires: ['doctor'],
    words: [['used to', 'раньше (делал)'], ['when I was a kid', 'когда я был ребёнком'], ['nickel', '5 центов'], ['boardwalk', 'променад'], ['change', 'меняться'], ['memories', 'воспоминания']],
    steps: [
      { t: 'say', en: "Sit down, sit down! You know, I've been coming here for seventy years.", ru: 'Садись, садись! Знаешь, я прихожу сюда уже семьдесят лет.' },
      { t: 'say', en: 'When I was a kid, I used to come here every Sunday with my father.', ru: 'Когда я был ребёнком, я приходил сюда каждое воскресенье с отцом.' },
      { t: 'tip', title: 'used to — раньше', text: '**used to + глагол** — то, что было раньше регулярно, а сейчас нет: I **used to** come here every Sunday. Вопрос: **Did you use to…?**' },
      {
        t: 'choice', q: 'Спроси, что изменилось', topic: 'questions',
        opts: [
          { en: 'Has it changed a lot?', ok: true },
          { en: 'Did it changed a lot?', why: 'После did — change (без -d). А про «до сих пор» лучше: Has it changed a lot?' },
          { en: 'Is it change a lot?', why: 'Правильно: Has it changed a lot?' },
        ],
      },
      { t: 'say', en: 'Oh, everything! A hot dog used to cost a nickel. Five cents! Can you believe it?', ru: 'О, всё! Хот-дог раньше стоил пятак. Пять центов! Представляешь?' },
      { t: 'listen', en: 'A hot dog used to cost a nickel.', q: 'Сколько раньше стоил хот-дог?', topic: 'numbers', opts: ['5 центов', '5 долларов', '50 центов', '1 доллар'], ok: 0 },
      {
        t: 'build', q: 'Расскажи: «Раньше я жил в России»', topic: 'word_order',
        answer: 'I used to live in Russia', extra: ['use', 'lived'],
        hints: [{ extra: 'use', text: 'В утверждении — used to (с -d).' }, { extra: 'lived', text: 'После used to — начальная форма: live.' }],
      },
      { t: 'say', en: "Russia! Wow. And now you're a New Yorker. What are you going to do next?", ru: 'Россия! Ого. А теперь ты ньюйоркец. Что собираешься делать дальше?' },
      {
        t: 'type', q: 'Расскажи о планах: «Я собираюсь…»', example: "I'm going to learn English and find a better job.", topic: 'word_order',
        answers: ["I'm going to *", 'I am going to *', "I'm gonna *", 'I will *', "I'm going to * and *"],
        hints: [{ single: true, text: 'Полным предложением: I\'m going to… / I\'m gonna…' }],
      },
      { t: 'say', en: "Good for you, kid. Remember: in this city, if you work hard, anything is possible.", ru: 'Молодец, парень. Запомни: в этом городе, если много работаешь, возможно всё.' },
    ],
  },
  {
    id: 'finale', npc: 'samnpc', todo: 'Встретить Сэма на променаде', xp: 120, requires: ['lifeguard', 'wheel', 'grandpa'],
    words: [['finally', 'наконец'], ['proud', 'гордый'], ['fireworks', 'фейерверк'], ['celebrate', 'праздновать'], ["I'm proud of you", 'я горжусь тобой']],
    steps: [
      { t: 'say', en: 'Yo!! Finally! You made it! How do you like Coney Island?', ru: 'Йо!! Наконец-то! Ты добрался! Как тебе Кони-Айленд?' },
      {
        t: 'speak', q: 'Скажи: «Мне очень нравится! Здесь потрясающе!»', example: 'I love it! It\'s amazing here!', topic: 'slang',
        answers: ["I love it it's amazing here", 'I love it', "It's amazing here", 'I really like it', "I love it it's awesome", "It's awesome"],
      },
      { t: 'say', en: "Dude, your English is so much better than when you arrived!", ru: 'Чувак, твой английский намного лучше, чем когда ты приехал!' },
      {
        t: 'choice', q: 'Ответь скромно', topic: 'politeness',
        opts: [
          { en: "Thanks! I've been practicing every day.", ok: true },
          { en: 'Thanks! I practicing every day.', why: 'Пропущен глагол-помощник: I\'ve been practicing.' },
          { en: "Thanks! I've practice every day.", why: 'Правильно: I\'ve been practicing (длится до сих пор).' },
        ],
      },
      { t: 'say', en: "I'm proud of you, man. So, what's the plan? Are you gonna stay in New York?", ru: 'Горжусь тобой. Так какой план? Останешься в Нью-Йорке?' },
      {
        t: 'build', q: 'Ответь: «Конечно! Я никогда не уеду»', topic: 'word_order',
        answer: "Of course! I'll never leave", extra: ['will', 'leaving'],
        hints: [{ extra: 'leaving', text: 'После will — начальная форма: leave.' }],
      },
      { t: 'say', en: "Haha, a real New Yorker! Look — fireworks over the beach! Let's go!", ru: 'Ха-ха, настоящий ньюйоркец! Смотри — фейерверк над пляжем! Пошли!' },
      { t: 'tip', title: '🎆 Ты прошёл сюжет!', text: 'Ты прошёл путь от «Hi, my name is…» до разговоров о прошлом, будущем и мечтах. Продолжай: **шэдовинг**, **тренировка дня**, **ИИ-разговоры**, **золотые яблоки** и правила **B1** в Учебнике.' },
    ],
    onDone: { flag: 'finale', money: 100, toast: 'Сюжет пройден! 🎆 Бонус $100. Город и Учебник открыты для практики.' },
  },
];

export const PHONE_THREADS = [];

export const CHAPTER = { id: 4, title: 'Coney Island', level: 'A2+ / B1', quests: QUESTS, threads: PHONE_THREADS };
