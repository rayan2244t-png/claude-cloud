// Глава 2 «Manhattan» — уровень A1+ → A2: прошедшее время, can / can't, -ing.
// Открывается после поездки на метро (задание «subway» из главы 1).

export const NPCS = {
  sal: {
    id: 'sal', name: 'Sal', role: 'Пиццерия', pitch: 0.7, gender: 'm', map: 'manhattan', hours: [10, 26],
    look: { skin: '#e3b08a', shirt: '#f6f3ec', pants: '#3d4a5c', hat: 'paper', hair: '#2a2420', apron: '#c94f3d', mustache: true },
    pos: [-13, 0, -6.7],
    persona: 'You are Sal, a proud Italian-American pizza maker from New York in your 60s. You talk about pizza, family and the old days of New York.',
  },
  emily: {
    id: 'emily', name: 'Emily', role: 'Туристка из Огайо', pitch: 1.3, gender: 'f', map: 'manhattan', hours: [8, 22],
    look: { skin: '#f1c7a5', shirt: '#7fb3d9', pants: '#c9b28f', hat: 'cap', hatColor: '#e07a5f', hair: '#d9c08a', hairStyle: 'ponytail', backpack: '#f2c230', sleeves: 'short' },
    pos: [9, 0, 9.8],
    persona: 'You are Emily, an excited tourist from a small town in Ohio, visiting New York for the first time. Everything amazes you.',
  },
  jay: {
    id: 'jay', name: 'Jay', role: 'Уличный танцор', pitch: 0.95, gender: 'm', map: 'manhattan', hours: [11, 23], dance: true,
    look: { skin: '#6b4430', shirt: '#f2c230', pants: '#2f3b52', hat: 'cap', hatColor: '#c94f3d', hair: '#1d1d1d', headphones: true, sleeves: 'short' },
    pos: [-4, 0, 10.5],
    persona: 'You are Jay, a cheerful street dancer from the Bronx in your 20s who performs for tourists. You use friendly slang like "yo", "dope", "for real".',
  },
  linda: {
    id: 'linda', name: 'Linda', role: 'Хозяйка дайнера', pitch: 1.05, gender: 'f', map: 'manhattan', hours: [6, 23],
    look: { skin: '#e8b48f', shirt: '#7fd1c1', pants: '#3a3a3a', hat: 'bun', hair: '#c4572e', apron: '#f6f3ec', glasses: true },
    pos: [25.5, 0, -6.7],
    persona: 'You are Linda, the warm and busy owner of a classic New York diner in your 50s. You call everyone "honey" and you love pancakes.',
  },
};

export const QUESTS = [
  {
    id: 'pizza', npc: 'sal', todo: 'Взять кусок пиццы у Сала', xp: 50, requires: ['subway'],
    words: [['slice', 'кусок (пиццы)'], ['plain', 'обычный, простой'], ['pepperoni', 'пепперони'], ['drink', 'напиток'], ['just', 'только, просто'], ['fold', 'сложить'], ['smell', 'пахнуть']],
    steps: [
      { t: 'say', en: "Ayy, welcome to Sal's! Best pizza in New York! What can I get you?", ru: 'Эй, добро пожаловать к Салу! Лучшая пицца в Нью-Йорке! Что тебе дать?' },
      { t: 'tip', title: 'A slice', text: 'В Нью-Йорке пиццу покупают **кусками** — **a slice**. Едят на ходу, сложив кусок пополам!' },
      {
        t: 'build', q: 'Скажи: «Можно мне кусок пиццы, пожалуйста?»', topic: 'politeness',
        answer: 'Can I have a slice of pizza, please?', extra: ['piece', 'an'],
        hints: [{ extra: 'an', text: 'An — только перед гласным звуком. Slice начинается с согласного: a slice.' }],
      },
      { t: 'say', en: 'Plain or pepperoni?', ru: 'Обычную или пепперони?' },
      { t: 'tip', title: 'Plain', text: '**Plain** pizza — простая пицца (сыр и томатный соус). Самая классическая в Нью-Йорке.' },
      {
        t: 'choice', q: 'Выбери пепперони', topic: 'food',
        opts: [
          { en: 'Pepperoni, please.', ok: true },
          { en: 'A pepper, please.', why: 'Pepper — это перец! Колбаска на пицце — pepperoni.' },
          { en: 'Pepperonis, please.', why: 'Тут без -s: pepperoni, please.' },
        ],
      },
      { t: 'say', en: 'You want a drink with that?', ru: 'Напиток к этому хочешь?' },
      {
        t: 'choice', q: 'Откажись: «Нет, спасибо, только кусок»', topic: 'politeness',
        opts: [
          { en: 'No, thanks. Just the slice.', ok: true },
          { en: 'No, thank.', why: 'Правильно: No, thanks или No, thank you.' },
          { en: 'Yes, I don\'t.', why: 'Yes и don\'t вместе — противоречие 😄 Скажи: No, thanks.' },
        ],
      },
      { t: 'say', en: "That's three seventy-five.", ru: 'С тебя три семьдесят пять.' },
      { t: 'listen', en: "That's three seventy-five.", q: 'Сколько стоит кусок?', topic: 'numbers', opts: ['$3.75', '$3.15', '$37.50', '$13.75'], ok: 0 },
      { t: 'pay', amount: 3.75 },
      { t: 'say', en: 'Here you go. Fold it in half, like a real New Yorker!', ru: 'Держи. Сложи пополам, как настоящий ньюйоркец!' },
      {
        t: 'choice', q: 'Скажи, что пахнет потрясающе', topic: 'food',
        opts: [
          { en: 'Thanks! It smells amazing!', ok: true },
          { en: 'Thanks! It smells amazingly!', why: 'После smell (пахнуть) ставим прилагательное: smells amazing, smells good.' },
          { en: 'Thanks! It is smell good!', why: 'Не смешивай is и глагол: It smells good.' },
        ],
      },
      { t: 'say', en: 'Enjoy, my friend!', ru: 'Приятного аппетита, друг!' },
    ],
  },

  {
    id: 'tourist', npc: 'emily', todo: 'Помочь туристке', xp: 60, requires: ['subway'],
    words: [["I'm lost", 'я заблудился'], ['looking for', 'ищу'], ['walked', 'шёл, гулял (прош.)'], ['went', 'пошёл, ездил (прош. от go)'], ['picture', 'фото'], ["you're welcome", 'пожалуйста (в ответ на спасибо)']],
    steps: [
      { t: 'say', en: "Excuse me! Sorry... I'm lost. I'm looking for Times Square.", ru: 'Простите! Извините... я заблудилась. Я ищу Таймс-сквер.' },
      { t: 'tip', title: "I'm lost / I'm looking for…", text: "**I'm lost** — я заблудился. **I'm looking for…** — я ищу… Очень полезные фразы для путешествий!" },
      {
        t: 'choice', q: 'Скажи, что она уже на месте', topic: 'directions',
        opts: [
          { en: "No problem! It's right here!", ok: true },
          { en: "No problem! It's right hear!", why: 'Hear — «слышать». «Здесь» — here.' },
          { en: 'Problem no!', why: 'Порядок слов: No problem!' },
        ],
      },
      { t: 'say', en: 'Oh my gosh, really? I walked for an hour!', ru: 'Боже мой, правда? Я шла целый час!' },
      { t: 'tip', title: 'Прошедшее время', text: 'Чтобы сказать о прошлом, к глаголу добавляем **-ed**: walk → **walked**, work → **worked**. Но есть неправильные: go → **went**, see → **saw**, have → **had**.' },
      {
        t: 'choice', q: 'Спроси, откуда она', topic: 'questions',
        opts: [
          { en: 'Where are you from?', ok: true },
          { en: 'Where you are from?', why: 'В вопросе are стоит перед you: Where are you from?' },
          { en: 'From where you?', why: 'Так не говорят. Правильно: Where are you from?' },
        ],
      },
      { t: 'say', en: "I'm from Ohio! It's my first time in New York. Where did you go today?", ru: 'Я из Огайо! Я первый раз в Нью-Йорке. А ты куда сегодня ездил?' },
      {
        t: 'build', q: 'Ответь: «Я ездил в Бруклин»', topic: 'word_order',
        answer: 'I went to Brooklyn', extra: ['go', 'goed'],
        hints: [
          { extra: 'go', text: 'Это было в прошлом, поэтому не go, а went (неправильный глагол).' },
          { extra: 'goed', text: 'Слова goed нет! go → went.' },
        ],
      },
      { t: 'say', en: 'Cool! Can you take a picture of me?', ru: 'Круто! Можешь меня сфотографировать?' },
      {
        t: 'choice', q: 'Соглашайся', topic: 'slang',
        opts: [
          { en: 'Sure! Say cheese!', ok: true },
          { en: 'Sure! Say cheeses!', why: 'Устойчивая фраза: Say cheese! (без -s)' },
          { en: 'Yes, I can picture.', why: 'Так не говорят. Просто: Sure! Say cheese!' },
        ],
      },
      { t: 'tip', title: 'Say cheese!', text: '**Say cheese!** — «Скажи "сыр"!» Так говорят, когда фотографируют, чтобы человек улыбнулся 📸' },
      { t: 'say', en: "Thank you so much! You're so nice!", ru: 'Спасибо огромное! Ты такой милый!' },
      {
        t: 'speak', q: 'Ответь: «Пожалуйста! / Не за что!»', example: "You're welcome!", topic: 'politeness',
        answers: ["You're welcome", 'No problem', 'No worries', 'Anytime', 'Any time', 'My pleasure'],
        hints: [{ extra: 'please', text: 'Please — это «пожалуйста» в просьбе. В ответ на спасибо говорят: You\'re welcome!' }],
      },
    ],
  },

  {
    id: 'dance', npc: 'jay', todo: 'Поболтать с танцором', xp: 55, requires: ['subway'],
    words: [["what's up", 'как дела? что нового?'], ['not much', 'да ничего особенного'], ['dancing', 'танцую (сейчас)'], ['learning', 'учу (сейчас)'], ['pretty good', 'довольно хорошо'], ['can', 'могу, умею'], ["can't", 'не могу, не умею'], ['no worries', 'не переживай']],
    steps: [
      { t: 'say', en: "Yo! What's up? Check out my moves!", ru: 'Йо! Как оно? Зацени мои движения!' },
      { t: 'tip', title: "What's up?", text: "**What's up?** — «Как дела? Что нового?» Отвечают не «fine», а **Not much!** или **Nothing much!** (Да ничего особенного)." },
      {
        t: 'choice', q: 'Ответь по-американски', topic: 'slang',
        opts: [
          { en: 'Not much! What are you doing?', ok: true },
          { en: 'Up! What are you doing?', why: '😄 Up — «вверх». На What\'s up? отвечают: Not much!' },
          { en: 'I am fine, thank you, and you?', why: 'Звучит как из учебника. На What\'s up? естественнее: Not much!' },
        ],
      },
      { t: 'say', en: "I'm dancing for the tourists! What are you doing in New York?", ru: 'Танцую для туристов! А ты что делаешь в Нью-Йорке?' },
      { t: 'tip', title: 'Сейчас: -ing', text: 'Чтобы сказать, что происходит **сейчас** или в этот период: **am / is / are + глагол-ing**. I\'m dancing — я танцую. I\'m learning — я учу.' },
      {
        t: 'build', q: 'Скажи: «Я учу английский»', topic: 'to_be',
        answer: 'I am learning English', extra: ['learn', 'study'],
        hints: [
          { extra: 'learn', text: 'Это происходит сейчас, поэтому нужна форма с -ing: learning.' },
          { missing: 'am', text: 'Не забудь am: I am learning.' },
        ],
      },
      { t: 'say', en: "That's dope! Your English is pretty good!", ru: 'Это круто! Твой английский довольно хорош!' },
      { t: 'tip', title: 'Dope, pretty', text: '**Dope** — сленг «круто». **Pretty** перед прилагательным значит «довольно»: pretty good — довольно хорошо (а не «красиво хорошо» 😄).' },
      {
        t: 'choice', q: 'Скажи, что практикуешься каждый день', topic: 'to_be',
        opts: [
          { en: "Thanks! I'm practicing every day.", ok: true },
          { en: 'Thanks! I practicing every day.', why: 'Пропущен am: I am (I\'m) practicing.' },
          { en: "Thanks! I'm practice every day.", why: 'После I\'m нужна форма с -ing: practicing.' },
        ],
      },
      { t: 'say', en: 'Respect! Hey, can you dance?', ru: 'Уважаю! Слушай, а ты умеешь танцевать?' },
      {
        t: 'choice', q: 'Скажи, что не умеешь, но умеешь петь', topic: 'have',
        opts: [
          { en: "No, I can't! But I can sing.", ok: true },
          { en: "No, I don't can.", why: 'С can не нужен do: I can\'t (I cannot).' },
          { en: "No, I can't to dance.", why: 'После can глагол без to: I can dance, I can\'t dance.' },
        ],
      },
      { t: 'say', en: 'Haha, no worries! Come back tonight, the lights are crazy!', ru: 'Ха-ха, не переживай! Приходи вечером — огни просто безумные!' },
    ],
  },

  {
    id: 'diner', npc: 'linda', todo: 'Пройти собеседование в дайнере', xp: 80, requires: ['pizza', 'tourist', 'dance'],
    words: [['honey', 'дорогуша (обращение)'], ['diner', 'дайнер, закусочная'], ['came', 'пришёл, приехал (прош. от come)'], ['last week', 'на прошлой неделе'], ['worked', 'работал'], ['weekends', 'выходные'], ['late', 'опоздавший, поздно']],
    steps: [
      { t: 'say', en: "Hi, honey! I'm Linda, I run this diner. Are you here for the job?", ru: 'Привет, дорогуша! Я Линда, это мой дайнер. Ты по поводу работы?' },
      { t: 'tip', title: 'Diner, honey', text: '**Diner** — классическая американская закусочная: блинчики, бургеры, кофе без конца. Официантки часто называют гостей **honey** или **sweetie**.' },
      {
        t: 'choice', q: 'Ответь «Да»', topic: 'to_be',
        opts: [
          { en: 'Yes, I am! Nice to meet you.', ok: true },
          { en: 'Yes, I do!', why: 'Вопрос был с are (Are you…?), значит ответ: Yes, I am!' },
          { en: "Yes, I'm job.", why: '«Да, я работа» 😄 Скажи: Yes, I am!' },
        ],
      },
      { t: 'say', en: 'Great. So, when did you come to New York?', ru: 'Отлично. Итак, когда ты приехал в Нью-Йорк?' },
      {
        t: 'choice', q: 'Скажи: «Я приехал на прошлой неделе»', topic: 'word_order',
        opts: [
          { en: 'I came here last week.', ok: true },
          { en: 'I come here last week.', why: 'Это было в прошлом: come → came.' },
          { en: 'I came here next week.', why: 'Next week — «на следующей неделе». Прошлая — last week.' },
        ],
      },
      { t: 'say', en: 'And do you have any experience?', ru: 'А опыт работы у тебя есть?' },
      {
        t: 'type', q: 'Скажи: «Я работал бариста в Бруклине»', example: 'I worked as a barista in Brooklyn.', topic: 'word_order',
        answers: ['I worked as a barista in Brooklyn', 'I worked as a barista', 'I was a barista in Brooklyn', 'I was a barista', 'I worked at a coffee cart in Brooklyn', 'I worked at a coffee cart'],
        hints: [
          { extra: 'work', text: 'Это было в прошлом: work → worked.' },
          { missing: 'as', text: '«Работать кем-то» — work as a…: I worked as a barista.' },
        ],
      },
      { t: 'say', en: 'Perfect! Can you work on weekends?', ru: 'Отлично! Можешь работать по выходным?' },
      {
        t: 'choice', q: 'Ответь, что можешь', topic: 'have',
        opts: [
          { en: 'Yes, I can work on weekends.', ok: true },
          { en: 'Yes, I can to work on weekends.', why: 'После can — без to: I can work.' },
          { en: 'Yes, I can working.', why: 'После can — просто глагол: I can work.' },
        ],
      },
      { t: 'listen', en: "You start tomorrow at seven a.m. Don't be late!", q: 'Когда начинать работу?', topic: 'numbers', opts: ['Завтра в 7 утра', 'Сегодня в 7 вечера', 'Завтра в 11 утра', 'Через неделю'], ok: 0 },
      { t: 'tip', title: 'a.m. / p.m.', text: 'В США время считают по 12 часов: **a.m.** — до полудня, **p.m.** — после. 7 a.m. = 7:00 утра, 7 p.m. = 19:00.' },
      { t: 'say', en: 'Welcome to the team, honey! Here is a little bonus for you.', ru: 'Добро пожаловать в команду, дорогуша! Вот тебе небольшой бонус.' },
      {
        t: 'choice', q: 'Пообещай не опаздывать', topic: 'politeness',
        opts: [
          { en: "Thank you! I won't be late!", ok: true },
          { en: 'Thank you! I will be late!', why: '«Я опоздаю!» 😅 Нужно наоборот: I won\'t (will not) be late!' },
          { en: "Thank you! I don't late!", why: 'Правильно: I won\'t be late.' },
        ],
      },
    ],
    onDone: { flag: 'diner', money: 50, toast: 'Работа в Манхэттене! Бонус $50 💵 Ты прошёл главу 2!' },
  },
];

export const PHONE_THREADS = [
  {
    id: 'sam3', from: 'Sam', fromRu: 'Сэму', avatar: '🧢', requires: ['diner'], xp: 30,
    steps: [
      { t: 'say', en: 'DUDE!! u got a job in Manhattan?? 🎉🎉', ru: 'ЧУВАК!! ты нашёл работу в Манхэттене?? 🎉🎉' },
      {
        t: 'choice', q: 'Подтверди', topic: 'slang',
        opts: [
          { en: 'Yeah! I start tomorrow!', ok: true },
          { en: 'Yeah! I started tomorrow!', why: 'Started — прошедшее, а tomorrow — завтра. Нужно: I start tomorrow!' },
          { en: 'Yeah! I starting tomorrow!', why: 'Пропущен am: I\'m starting. Или проще: I start tomorrow!' },
        ],
      },
      { t: 'say', en: "that's insane!! we need to celebrate. pizza tonight?", ru: 'это безумие!! надо отметить. пицца вечером?' },
      {
        t: 'build', q: 'Ответь: «Я в деле! Увидимся вечером»', topic: 'slang',
        answer: "I'm down! See you tonight!", extra: ['up', 'today'],
        hints: [{ extra: 'up', text: "I'm down — сленг «я в деле, я за». I'm up — «я проснулся»." }],
      },
      { t: 'tip', title: "I'm down", text: "**I'm down!** — «Я за! Я в деле!» Очень частый американский сленг. Например: Pizza? — I'm down!" },
    ],
  },
];

export const CHAPTER = {
  id: 2,
  title: 'Manhattan',
  level: 'A1+ / A2',
  quests: QUESTS,
  threads: PHONE_THREADS,
};
