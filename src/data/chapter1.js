// Глава 1 «Welcome to Brooklyn» — уровень A1.
// Чтобы добавить новую главу, создайте такой же файл и подключите его в data/index.js.
//
// Типы шагов диалога:
//   say    — персонаж говорит (en + ru)
//   tip    — карточка-подсказка про американский английский
//   choice — выбрать правильный ответ (у неправильных есть объяснение why)
//   build  — собрать фразу из слов
//   type   — написать ответ (answers: варианты, * = любое слово/имя)
//   speak  — сказать вслух в микрофон (или написать, если микрофона нет)
//   listen — послушать и выбрать, что услышал
//   pay    — заплатить деньги

export const NPCS = {
  marcus: {
    id: 'marcus', name: 'Marcus', role: 'Таксист', pitch: 0.8, hours: [6, 23.5],
    look: { skin: '#8d5a3b', shirt: '#f2c230', pants: '#3d4a5c', hat: 'cap', hatColor: '#2f3b52', hair: '#1d1d1d' },
    pos: [-25.5, 0, 5.2],
    persona: 'You are a cheerful taxi driver in your 40s, born and raised in Queens. You love the Yankees, pizza and giving tourists tips about the city.',
  },
  jess: {
    id: 'jess', name: 'Jess', role: 'Бариста', pitch: 1.25, hours: [7, 20],
    look: { skin: '#f1c7a5', shirt: '#7fb38a', pants: '#4a3f5c', hat: 'bun', hair: '#c4572e', apron: '#f5efe2' },
    pos: [-8.2, 0, 10.4],
    persona: 'You are a friendly barista in your 20s who runs a coffee cart in a Brooklyn park. You are an art student, you love indie music and iced coffee.',
  },
  rodriguez: {
    id: 'rodriguez', name: 'Mrs. Rodriguez', role: 'Хозяйка квартиры', pitch: 1.1, hours: [8, 22],
    look: { skin: '#c99a73', shirt: '#b0577a', pants: '#5b4b6b', hat: 'bun', hair: '#d9d4cc', glasses: true },
    pos: [9.9, 0, -5.3],
    persona: 'You are a kind but strict landlady in your 60s, originally from Puerto Rico, who has lived in Brooklyn for 40 years. You love your garden and cooking.',
  },
  tony: {
    id: 'tony', name: 'Tony', role: 'Продавец хот-догов', pitch: 0.75, hours: [10, 25],
    look: { skin: '#e8b48f', shirt: '#ffffff', pants: '#2f3b52', hat: 'paper', hair: '#3a2a20', apron: '#e0e0e0', mustache: true },
    pos: [16.2, 0, 9.2],
    persona: 'You are a loud, funny hot dog vendor from Brooklyn in your 50s. You call everyone "buddy" and you are proud of your hot dogs.',
  },
  dev: {
    id: 'dev', name: 'Dev', role: 'Прохожий', pitch: 1.0, hours: [6, 24],
    look: { skin: '#a8714f', shirt: '#5b7fb3', pants: '#c9b28f', hat: 'none', hair: '#151515', backpack: '#e07a5f', headphones: true },
    pos: [24, 0, 12.6],
    persona: 'You are a relaxed software developer in your 20s who lives in Brooklyn and rides the subway every day. You like basketball and street food.',
  },
  luis: {
    id: 'luis', name: 'Luis', role: 'Уличный музыкант (только вечером)', pitch: 0.9, hours: [18.5, 27],
    look: { skin: '#b07a55', shirt: '#2f3b52', pants: '#5b4b3b', hat: 'beanie', hatColor: '#e07a5f', hair: '#1d1d1d', mustache: true },
    pos: [-15.5, 0, 13.5],
    persona: 'You are Luis, a street musician who plays guitar in a Brooklyn park in the evenings. You are from Mexico City, you love jazz, salsa and old rock songs.',
  },
};

export const QUESTS = [
  {
    id: 'arrive', npc: 'marcus', todo: 'Поговорить с таксистом', xp: 40,
    words: [['hey', 'привет'], ['name', 'имя'], ['nice to meet you', 'приятно познакомиться'], ['where', 'где / куда'], ['from', 'из'], ['cool', 'круто'], ['awesome', 'потрясающе'], ['dollar', 'доллар'], ['see you', 'увидимся']],
    steps: [
      { t: 'say', en: "Hey! Welcome to New York! I'm Marcus.", ru: 'Привет! Добро пожаловать в Нью-Йорк! Я Маркус.' },
      { t: 'tip', title: 'Hey!', text: 'Американцы часто говорят **Hey!** или **Hi!** вместо Hello. Это дружелюбно и совсем не грубо.' },
      {
        t: 'choice', q: 'Поздоровайся в ответ', topic: 'greetings',
        opts: [
          { en: 'Hi, Marcus!', ok: true },
          { en: 'Goodbye, Marcus!', why: 'Goodbye — это «до свидания». Чтобы поздороваться: Hi / Hey / Hello.' },
          { en: 'Thank you, Marcus!', why: 'Thank you — это «спасибо». А сейчас нужно поздороваться: Hi!' },
        ],
      },
      { t: 'say', en: "What's your name?", ru: 'Как тебя зовут?' },
      {
        t: 'type', q: 'Скажи, как тебя зовут', example: 'My name is Anna. / I\'m Anna.', topic: 'to_be', setName: true,
        answers: ['My name is *', 'I am * from Russia', 'I am *'],
        hints: [{ single: true, text: 'Ответь полным предложением: My name is … или I\'m …' }],
      },
      { t: 'say', en: 'Nice to meet you, {name}!', ru: 'Приятно познакомиться, {name}!' },
      {
        t: 'choice', q: 'Ответь вежливо', topic: 'greetings',
        opts: [
          { en: 'Nice to meet you too!', ok: true },
          { en: 'Nice to meet me!', why: 'Me — это «меня». Ты говоришь «приятно познакомиться со мной». Нужно: Nice to meet you too! (тебя тоже)' },
          { en: 'Yes, I meet you.', why: 'Так не говорят. Это устойчивая фраза: Nice to meet you too!' },
        ],
      },
      { t: 'say', en: 'So, where are you from?', ru: 'Так откуда ты?' },
      {
        t: 'build', q: 'Скажи: «Я из России»', topic: 'to_be',
        answer: 'I am from Russia', extra: ['is', 'in', 'Russian'],
        hints: [
          { missing: 'am', text: 'Не пропускай am! По-русски «Я из России», а по-английски «Я есть из России»: I am from Russia.' },
          { extra: 'russian', text: 'Russian — «русский» (язык, человек). Страна — Russia.' },
          { extra: 'in', text: 'In — «в». «Из» (откуда) — from.' },
        ],
      },
      { t: 'say', en: 'Russia? Cool! Is this your first time in the US?', ru: 'Россия? Круто! Ты первый раз в США?' },
      {
        t: 'choice', q: 'Ответь «Да»', topic: 'to_be',
        opts: [
          { en: 'Yes, it is!', ok: true },
          { en: 'Yes, I am first.', why: 'Так звучит как «Да, я первый (в очереди)». На вопрос Is this…? отвечаем: Yes, it is!' },
          { en: 'No, thanks.', why: 'No, thanks — это вежливый отказ: «нет, спасибо». А тебя спросили, первый ли раз.' },
        ],
      },
      { t: 'tip', title: 'Cool! Awesome!', text: '**Cool** и **awesome** — самые американские слова. Значат «круто», «класс». Услышишь их сто раз в день!' },
      { t: 'say', en: "Awesome! OK, that's twenty-five dollars for the ride.", ru: 'Класс! Так, с тебя двадцать пять долларов за поездку.' },
      { t: 'listen', en: "That's twenty-five dollars.", q: 'Сколько нужно заплатить?', topic: 'numbers', opts: ['$25', '$20.50', '$52', '$75'], ok: 0 },
      { t: 'pay', amount: 25 },
      {
        t: 'choice', q: 'Отдай деньги', topic: 'politeness',
        opts: [
          { en: 'Here you go.', ok: true },
          { en: 'Take it.', why: 'Звучит резко, как «на, бери». Когда что-то отдаёшь, говорят: Here you go.' },
          { en: 'Here are you.', why: 'Так не говорят. Правильно: Here you go / Here you are.' },
        ],
      },
      { t: 'say', en: 'Thanks! Your new home is on this street. Find Mrs. Rodriguez, the house with the green door.', ru: 'Спасибо! Твой новый дом на этой улице. Найди миссис Родригес — дом с зелёной дверью.' },
      { t: 'say', en: "And grab a coffee at Jess's cart in the park. Best coffee in Brooklyn!", ru: 'И возьми кофе у Джесс, её тележка в парке. Лучший кофе в Бруклине!' },
      { t: 'tip', title: 'Grab a coffee', text: '**Grab** дословно «схватить», но в разговоре значит «взять, купить по-быстрому»: grab a coffee, grab lunch.' },
      {
        t: 'choice', q: 'Попрощайся', topic: 'greetings',
        opts: [
          { en: 'Thanks, Marcus! See you!', ok: true },
          { en: 'Hello, Marcus!', why: 'Hello — приветствие. При прощании говорят: Bye! / See you! / See ya!' },
          { en: 'Good night, Marcus!', why: 'Good night говорят только поздно вечером перед сном. Сейчас лучше: See you!' },
        ],
      },
    ],
  },

  {
    id: 'coffee', npc: 'jess', todo: 'Купить кофе у Джесс', xp: 50, requires: ['arrive'],
    words: [['can I get', 'можно мне'], ['please', 'пожалуйста'], ['size', 'размер'], ['small', 'маленький'], ['medium', 'средний'], ['large', 'большой'], ['iced', 'со льдом'], ['to go', 'с собой'], ['have a good one', 'хорошего дня']],
    steps: [
      { t: 'say', en: 'Hi there! What can I get for you?', ru: 'Привет! Что тебе приготовить?' },
      { t: 'tip', title: 'Can I get…?', text: 'Так заказывают в американском кафе: **Can I get a coffee, please?** Дословно «Могу я получить…». Это вежливо и естественно.' },
      {
        t: 'choice', q: 'Закажи кофе вежливо', topic: 'politeness',
        opts: [
          { en: 'Can I get a coffee, please?', ok: true },
          { en: 'Give me coffee.', why: 'Звучит как приказ, грубо. В кафе говорят: Can I get a coffee, please?' },
          { en: 'I want coffee.', why: 'Грубовато («Я хочу кофе!») и без артикля a. Лучше: Can I get a coffee, please?' },
        ],
      },
      { t: 'say', en: 'Sure! What size? Small, medium, or large?', ru: 'Конечно! Какой размер? Маленький, средний или большой?' },
      {
        t: 'speak', q: 'Скажи: «Средний, пожалуйста»', example: 'Medium, please.', topic: 'politeness',
        answers: ['Medium, please', 'A medium, please', 'Medium one, please', 'Can I get a medium, please'],
        hints: [{ missing: 'please', text: 'Не забывай please! В Америке без него звучит грубовато.' }],
      },
      { t: 'say', en: 'Hot or iced?', ru: 'Горячий или со льдом?' },
      { t: 'tip', title: 'Iced coffee', text: 'Американцы обожают **iced coffee** (кофе со льдом), даже зимой! Обрати внимание: iced, с буквой d на конце.' },
      {
        t: 'choice', q: 'Выбери кофе со льдом', topic: 'food',
        opts: [
          { en: 'Iced, please.', ok: true },
          { en: 'Ice, please.', why: 'Ice — это просто «лёд» (как будто просишь стакан льда). Кофе со льдом — iced.' },
          { en: 'Cold, please.', why: 'Тебя поймут, но так не говорят. Правильно: iced.' },
        ],
      },
      { t: 'say', en: 'For here or to go?', ru: 'Здесь или с собой?' },
      { t: 'tip', title: 'To go', text: '**To go** = с собой. Это чисто американское выражение. В Британии говорят takeaway, но в США так не скажут.' },
      {
        t: 'choice', q: 'Возьми с собой', topic: 'food',
        opts: [
          { en: 'To go, please.', ok: true },
          { en: 'Takeaway, please.', why: 'Это британский вариант. В Америке говорят: To go, please.' },
          { en: 'Go, please.', why: 'Go, please — «уходи, пожалуйста» 😅 Нужно: To go, please.' },
        ],
      },
      { t: 'say', en: 'Can I get a name for the order?', ru: 'Какое имя написать на стакане?' },
      {
        t: 'type', q: 'Назови своё имя', example: "It's Anna.", topic: 'to_be',
        answers: ['It is *', 'My name is *', 'I am *', '*'],
      },
      { t: 'say', en: "Perfect. One medium iced coffee to go. That's three fifty.", ru: 'Отлично. Один средний кофе со льдом с собой. С тебя три пятьдесят.' },
      { t: 'listen', en: "That's three fifty.", q: 'Сколько стоит кофе?', topic: 'numbers', opts: ['$3.50', '$3.15', '$350', '$13.50'], ok: 0 },
      { t: 'tip', title: 'Three fifty', text: 'Цены в США говорят коротко: **three fifty** = $3.50, **twelve ninety-nine** = $12.99. Слова dollars и cents пропускают.' },
      { t: 'pay', amount: 3.5 },
      { t: 'say', en: "Here's your coffee, {name}. Have a good one!", ru: 'Вот твой кофе, {name}. Хорошего дня!' },
      {
        t: 'choice', q: 'Ответь на пожелание', topic: 'greetings',
        opts: [
          { en: 'Thanks! You too!', ok: true },
          { en: 'Thanks! Me too!', why: 'Me too = «я тоже». А нужно пожелать в ответ: You too! (и тебе)' },
          { en: 'Yes, I have.', why: 'Have a good one — это пожелание «хорошего дня». Отвечаем: Thanks, you too!' },
        ],
      },
      { t: 'say', en: 'Oh hey, I need help at the cart sometimes. Do you want a part-time job?', ru: 'Слушай, мне иногда нужна помощь у тележки. Хочешь подработку?' },
      {
        t: 'choice', q: 'Соглашайся!', topic: 'slang',
        opts: [
          { en: 'Sure! Sounds great!', ok: true },
          { en: 'I am job.', why: '«Я работа» 😄 Скажи просто: Sure! Sounds great! (Конечно! Звучит отлично!)' },
          { en: 'Yes, I want job.', why: 'Почти, но нужен артикль: I want a job. А ещё естественнее: Sure! Sounds great!' },
        ],
      },
      { t: 'say', en: 'Awesome! Come back anytime and start a shift.', ru: 'Класс! Приходи в любое время на смену.' },
    ],
    onDone: { flag: 'job', toast: 'Новая работа! Подходи к Джесс, чтобы начать смену бариста ☕' },
  },

  {
    id: 'apartment', npc: 'rodriguez', todo: 'Снять комнату', xp: 60, requires: ['arrive'],
    words: [['how much', 'сколько (стоит)'], ['a month', 'в месяц'], ['rent', 'аренда'], ['key', 'ключ'], ['floor', 'этаж'], ['pet', 'домашнее животное'], ['job', 'работа'], ['tenant', 'жилец']],
    steps: [
      { t: 'say', en: "Hello! You must be the new tenant. I'm Mrs. Rodriguez.", ru: 'Здравствуйте! Вы, должно быть, новый жилец. Я миссис Родригес.' },
      { t: 'tip', title: 'Mr. / Mrs. / Ms.', text: 'К старшим и незнакомым обращаются **Mr.** (мистер), **Mrs.** (замужняя женщина) или **Ms.** (любая женщина) + фамилия.' },
      {
        t: 'choice', q: 'Поздоровайся уважительно', topic: 'greetings',
        opts: [
          { en: 'Hello, Mrs. Rodriguez! Nice to meet you.', ok: true },
          { en: 'Hey, Rodriguez!', why: 'Без Mrs. и с Hey звучит слишком фамильярно для пожилой хозяйки. Лучше: Hello, Mrs. Rodriguez!' },
          { en: 'Hello, Mr. Rodriguez!', why: 'Mr. — это обращение к мужчине. К женщине: Mrs. или Ms.' },
        ],
      },
      { t: 'say', en: 'The room is on the third floor. Do you have any questions?', ru: 'Комната на третьем этаже. У вас есть вопросы?' },
      {
        t: 'build', q: 'Спроси: «Сколько это стоит?»', topic: 'questions',
        answer: 'How much is it?', extra: ['many', 'are', 'does'],
        hints: [
          { extra: 'many', text: 'How many — для того, что можно посчитать (how many rooms). Про деньги всегда how much.' },
          { extra: 'are', text: 'It — это «оно» (одно), поэтому is, а не are.' },
        ],
      },
      { t: 'say', en: "It's eight hundred dollars a month.", ru: 'Восемьсот долларов в месяц.' },
      { t: 'listen', en: "It's eight hundred dollars a month.", q: 'Какая цена?', topic: 'numbers', opts: ['$800 в месяц', '$80 в месяц', '$800 в неделю', '$8000 в месяц'], ok: 0 },
      { t: 'say', en: 'OK. Do you have a job?', ru: 'Хорошо. У вас есть работа?' },
      {
        t: 'choice', q: 'Ответь, что есть', topic: 'have',
        opts: [
          { en: 'Yes, I have a job.', ok: true },
          { en: 'Yes, I has a job.', why: 'С I всегда have. Has — только с he / she / it: she has a job.' },
          { en: 'Yes, I am have a job.', why: 'Не смешивай am и have. Просто: I have a job.' },
        ],
      },
      { t: 'say', en: 'Good. Do you have a pet? A cat or a dog?', ru: 'Хорошо. У вас есть домашнее животное? Кошка или собака?' },
      {
        t: 'type', q: 'Ответь: «Нет, у меня нет питомца»', example: "No, I don't have a pet.", topic: 'have',
        answers: ["No, I don't have a pet", "No, I don't", "No, I don't have pets", "No, I don't have any pets"],
        hints: [
          { extra: 'not', text: 'Отрицание с have строится через don\'t: I don\'t have a pet (а не I not have / I have not).' },
          { missing: 'do', text: 'Отрицание с have строится через don\'t: I don\'t have a pet.' },
        ],
      },
      { t: 'say', en: 'Good! No pets allowed. You can move in today. Here is your key!', ru: 'Хорошо! С животными нельзя. Можете въезжать сегодня. Вот ваш ключ!' },
      {
        t: 'choice', q: 'Поблагодари', topic: 'politeness',
        opts: [
          { en: 'Thank you so much!', ok: true },
          { en: 'Thank you very many!', why: 'Правильно: very much. Many — это «много» для счёта (many people).' },
          { en: 'Thanks you!', why: 'Либо Thanks!, либо Thank you! Thanks you — ошибка.' },
        ],
      },
      { t: 'say', en: 'Rent is due on the first of the month. Welcome home, {name}!', ru: 'Аренду нужно платить первого числа. Добро пожаловать домой, {name}!' },
      { t: 'listen', en: 'Rent is due on the first of the month.', q: 'Когда платить аренду?', topic: 'listening', opts: ['1-го числа каждого месяца', 'В первый день недели', 'Каждую пятницу', 'В конце месяца'], ok: 0 },
    ],
    onDone: { flag: 'key', toast: 'Ключ получен 🔑 Зелёная дверь — твой дом. Обставь его через телефон → Магазин' },
  },

  {
    id: 'hotdog', npc: 'tony', todo: 'Купить хот-дог у Тони', xp: 45, requires: ['arrive'],
    words: [["I'd like", 'я бы хотел'], ['buddy', 'приятель'], ['mustard', 'горчица'], ['onions', 'лук'], ['ketchup', 'кетчуп'], ['keep the change', 'сдачи не надо'], ['tip', 'чаевые']],
    steps: [
      { t: 'say', en: "Hey, buddy! Hot dogs! Best in Brooklyn! What'll it be?", ru: 'Эй, приятель! Хот-доги! Лучшие в Бруклине! Что будешь?' },
      { t: 'tip', title: 'Buddy', text: '**Buddy** = «приятель, дружище». Так дружелюбно обращаются к незнакомым. Ещё говорят **man**, **dude**, **pal**.' },
      {
        t: 'build', q: 'Скажи: «Я бы хотел хот-дог, пожалуйста»', topic: 'articles',
        answer: "I'd like a hot dog, please", extra: ['an', 'want'],
        hints: [
          { extra: 'an', text: 'An ставим перед гласным звуком (an apple). Hot начинается с согласного: a hot dog.' },
          { missing: 'a', text: 'Нужен артикль a: a hot dog (один хот-дог).' },
        ],
      },
      { t: 'say', en: 'You got it! Ketchup, mustard, or onions?', ru: 'Будет сделано! Кетчуп, горчица или лук?' },
      { t: 'tip', title: 'You got it!', text: '**You got it!** = «Будет сделано! Без проблем!» Очень частая фраза в сервисе.' },
      {
        t: 'choice', q: 'Выбери горчицу и лук', topic: 'food',
        opts: [
          { en: 'Mustard and onions, please.', ok: true },
          { en: 'Mustards and onion, please.', why: 'Mustard (горчица) не считается штуками, поэтому без -s. А лук (кусочки) — onions.' },
          { en: 'With mustard and onions, give.', why: 'Give в конце звучит грубо и неправильно. Просто: Mustard and onions, please.' },
        ],
      },
      { t: 'say', en: "Here you go. That's three bucks.", ru: 'Держи. С тебя три бакса.' },
      { t: 'listen', en: "That's three bucks.", q: 'Сколько стоит хот-дог?', topic: 'numbers', opts: ['$3', '$13', '$30', '$0.30'], ok: 0 },
      { t: 'tip', title: 'Bucks', text: '**Bucks** = доллары (разговорное). «Five bucks» = пять долларов.' },
      { t: 'pay', amount: 4 },
      {
        t: 'choice', q: 'Дай $4 и оставь сдачу как чаевые', topic: 'slang',
        opts: [
          { en: 'Here you go. Keep the change!', ok: true },
          { en: 'Here you go. Save the change!', why: 'Правильная фраза: Keep the change! (Оставь сдачу себе)' },
          { en: 'Here you go. No change!', why: 'Звучит как «Без сдачи!» Чтобы оставить сдачу продавцу: Keep the change!' },
        ],
      },
      { t: 'tip', title: 'Чаевые в США', text: 'В Америке принято оставлять **tip** (чаевые): в кафе и ресторанах 15–20%, бариста и уличным продавцам — сдачу или доллар-другой.' },
      { t: 'say', en: "Thanks, buddy! You're alright. Come back anytime!", ru: 'Спасибо, приятель! Ты нормальный. Заходи ещё!' },
    ],
  },

  {
    id: 'subway', npc: 'dev', todo: 'Узнать дорогу к метро', xp: 45, requires: ['arrive'],
    words: [['excuse me', 'извините'], ['subway', 'метро'], ['straight', 'прямо'], ['left', 'налево'], ['right', 'направо'], ['far', 'далеко'], ['close', 'близко'], ['block', 'квартал'], ['nah', 'не-а']],
    steps: [
      { t: 'tip', title: 'Subway', text: 'Метро в Нью-Йорке — **subway** (в Лондоне — underground / tube). Спроси у прохожего, как пройти.' },
      {
        t: 'build', q: 'Спроси: «Извините, где метро?»', topic: 'questions',
        answer: 'Excuse me, where is the subway?', extra: ['what', 'are'],
        hints: [
          { extra: 'what', text: 'What — «что». «Где» — where.' },
          { extra: 'are', text: 'Subway — одно, поэтому is: where is the subway?' },
        ],
      },
      { t: 'say', en: "Oh, the subway? Go straight down this street. It's on the right, after the park.", ru: 'А, метро? Иди прямо по этой улице. Оно справа, после парка.' },
      { t: 'listen', en: "Go straight. It's on the right.", q: 'Куда идти?', topic: 'directions', opts: ['Прямо, вход справа', 'Прямо, вход слева', 'Назад, вход справа', 'Налево на углу'], ok: 0 },
      { t: 'tip', title: 'Направления', text: '**straight** — прямо, **left** — налево, **right** — направо, **on the corner** — на углу, **a block** — квартал (расстояние между перекрёстками).' },
      {
        t: 'choice', q: 'Спроси, далеко ли это', topic: 'questions',
        opts: [
          { en: 'Is it far?', ok: true },
          { en: 'It is far?', why: 'В вопросе глагол is ставим перед it: Is it far? (как перевёрнутое предложение)' },
          { en: 'Far is it?', why: 'Порядок: сначала is, потом кто, потом остальное: Is it far?' },
        ],
      },
      { t: 'say', en: "Nah, it's close. Like two blocks.", ru: 'Не, близко. Где-то два квартала.' },
      { t: 'tip', title: 'Nah, like…', text: '**Nah** = no (разговорное). **Like** в разговоре часто значит «где-то, примерно»: like two blocks.' },
      {
        t: 'speak', q: 'Скажи: «Большое спасибо!»', example: 'Thanks a lot!', topic: 'politeness',
        answers: ['Thanks a lot', 'Thank you so much', 'Thank you very much', 'Thanks so much'],
        hints: [{ extra: 'lots', text: 'Устойчивая фраза: Thanks a lot (без -s).' }],
      },
      { t: 'say', en: 'No problem! Oh, and you can just tap your phone at the gate to pay.', ru: 'Без проблем! И, кстати, на входе можно просто приложить телефон, чтобы заплатить.' },
    ],
    onDone: { flag: 'subway', toast: 'Метро на востоке улицы. Скоро: Глава 2 — Манхэттен!' },
  },
];

QUESTS.push({
  id: 'music', npc: 'luis', todo: 'Найти музыканта в парке (вечером)', xp: 50, requires: ['arrive'], optional: true,
  words: [['like', 'нравиться'], ['music', 'музыка'], ['song', 'песня'], ['favorite', 'любимый'], ['kind of', 'вид, тип'], ['beautiful', 'красивый'], ['tonight', 'сегодня вечером']],
  steps: [
    { t: 'say', en: 'Good evening, my friend! Do you like music?', ru: 'Добрый вечер, друг! Ты любишь музыку?' },
    { t: 'tip', title: 'Do you like…?', text: 'Чтобы спросить «Тебе нравится…?» — **Do you like…?** Ответ: **Yes, I do!** / **No, I don\'t.**' },
    {
      t: 'choice', q: 'Ответь «Да, люблю!»', topic: 'have',
      opts: [
        { en: 'Yes, I do! I love music.', ok: true },
        { en: 'Yes, I like!', why: 'После like нужно что-то: I like music. Или короткий ответ: Yes, I do!' },
        { en: 'Yes, I am like music.', why: 'Не смешивай am и like: I like music.' },
      ],
    },
    { t: 'say', en: 'Me too! What kind of music do you like?', ru: 'Я тоже! Какую музыку ты любишь?' },
    {
      t: 'type', q: 'Ответь, какую музыку ты любишь', example: 'I like rock. / I like hip-hop.', topic: 'word_order',
      answers: ['I like *', 'I love *', 'I like * music', 'I love * music', 'I really like *'],
      hints: [{ single: true, text: 'Ответь полным предложением: I like rock / I love jazz.' }],
    },
    { t: 'say', en: 'Nice choice! My favorite song is about New York. Listen!', ru: 'Отличный выбор! Моя любимая песня — про Нью-Йорк. Слушай!' },
    { t: 'listen', en: 'Start spreading the news, I am leaving today.', q: 'О чём поёт Луис?', topic: 'listening', opts: ['Расскажите всем — я уезжаю сегодня', 'Я остаюсь дома сегодня', 'Новости по телевизору', 'Я люблю пиццу'], ok: 0 },
    { t: 'tip', title: 'New York, New York', text: 'Это начало знаменитой песни Фрэнка Синатры «New York, New York». Её поют на каждом празднике в городе!' },
    {
      t: 'choice', q: 'Похвали песню', topic: 'slang',
      opts: [
        { en: "Wow, that's beautiful!", ok: true },
        { en: "Wow, that's beautifully!", why: 'После that\'s — прилагательное: beautiful.' },
        { en: 'Wow, it beauty!', why: 'Правильно: That\'s beautiful! / It\'s beautiful!' },
      ],
    },
    { t: 'say', en: 'Thank you! Come back any night. I play here every evening.', ru: 'Спасибо! Приходи в любой вечер. Я играю здесь каждый вечер.' },
  ],
});

// Переписка с другом в телефоне героя
export const PHONE_THREADS = [
  {
    id: 'sam1', from: 'Sam', fromRu: 'Сэму', avatar: '🧢', requires: ['arrive'], xp: 25,
    steps: [
      { t: 'say', en: 'hey!! did u land?? 😄', ru: 'привет!! ты приземлился?? 😄' },
      { t: 'tip', title: 'Переписка', text: 'В сообщениях американцы сокращают: **u** = you, **r** = are, **lol** = смеюсь, **omg** = о боже, **brb** = скоро вернусь.' },
      {
        t: 'choice', q: 'Ответь, что ты уже в Бруклине', topic: 'slang',
        opts: [
          { en: "Yeah! I'm in Brooklyn now!", ok: true },
          { en: 'Yes, I landed yesterday tomorrow.', why: 'Yesterday (вчера) и tomorrow (завтра) вместе — бессмыслица 😄' },
          { en: 'Yeah! I am Brooklyn now!', why: '«Я — Бруклин» 😄 Нужен предлог in: I\'m in Brooklyn.' },
        ],
      },
      { t: 'say', en: "omg that's awesome!! how's the city?", ru: 'омг это круто!! как город?' },
      {
        t: 'build', q: 'Ответь: «Он большой и красивый!»', topic: 'to_be',
        answer: "It's big and beautiful!", extra: ['is', 'very'],
        hints: [{ missing: 'is', text: 'Нужен is: It is (It\'s) big.' }],
      },
      { t: 'say', en: "lol nice. let's hang out this weekend!", ru: 'лол класс. давай потусим на выходных!' },
      { t: 'tip', title: 'Hang out', text: '**Hang out** = проводить время вместе, тусоваться. «Let\'s hang out!» — «Давай потусим!»' },
      {
        t: 'choice', q: 'Соглашайся', topic: 'slang',
        opts: [
          { en: 'Sure! Sounds good!', ok: true },
          { en: 'Sure! Sounds well!', why: 'Устойчивая фраза: Sounds good! (звучит хорошо). Sounds well — ошибка.' },
          { en: 'Sure! I hang.', why: 'Неполная фраза. Скажи: Sure! Sounds good!' },
        ],
      },
    ],
  },
  {
    id: 'sam2', from: 'Sam', fromRu: 'Сэму', avatar: '🧢', requires: ['apartment'], xp: 25,
    steps: [
      { t: 'say', en: 'yo did u find an apartment??', ru: 'йо, ты нашёл квартиру??' },
      {
        t: 'type', q: 'Ответь: «Да! У меня есть комната в Бруклине»', example: 'Yes! I have a room in Brooklyn.', topic: 'have',
        answers: ['Yes, I have a room in Brooklyn', 'Yeah, I have a room in Brooklyn', 'Yes I have a room', 'Yeah I have a room', 'Yes, I have an apartment in Brooklyn'],
      },
      { t: 'say', en: "no way! is it big?", ru: 'да ладно! она большая?' },
      {
        t: 'choice', q: 'Скажи, что маленькая, но уютная', topic: 'to_be',
        opts: [
          { en: "No, it's small but cozy.", ok: true },
          { en: 'No, it small but cozy.', why: 'Пропущен is: it is (it\'s) small.' },
          { en: 'No, is small but cozy.', why: 'В английском нужно подлежащее: it is small (по-русски можно «маленькая», а тут — нет).' },
        ],
      },
      { t: 'say', en: "haha cozy is good 😎 buy a plant, it's a vibe", ru: 'хаха уютно — это хорошо 😎 купи растение, это атмосферно' },
      { t: 'tip', title: "It's a vibe", text: "**Vibe** — атмосфера, настроение. «It's a vibe» — «это атмосферно, это круто» (сленг)." },
    ],
  },
];

export const CHAPTER = {
  id: 1,
  title: 'Welcome to Brooklyn',
  level: 'A1',
  quests: QUESTS,
  threads: PHONE_THREADS,
};
