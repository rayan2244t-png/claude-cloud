// Глава 3 «Settling In» (A2): банк, аптека, звонок в клинику, врач.
// Темы: вопросы, числа и диктовка по буквам, should / have to, симптомы, Present Perfect (I've had…).

export const NPCS = {
  priya: {
    id: 'priya', name: 'Priya', role: 'Сотрудница банка', pitch: 1.15, gender: 'f', map: 'manhattan', hours: [9, 17],
    look: { skin: '#a8714f', shirt: '#f6f3ec', pants: '#2f3b52', hair: '#151515', hairStyle: 'long', jacket: '#2f3b52', glasses: true },
    pos: [37.5, 0, -6.7],
    persona: 'You are Priya, a polite and patient bank teller in Manhattan in your 30s. You explain banking things simply and love helping newcomers.',
  },
  kim: {
    id: 'kim', name: 'Mr. Kim', role: 'Фармацевт', pitch: 0.9, gender: 'm', map: 'manhattan', hours: [8, 22],
    look: { skin: '#f0cfa8', shirt: '#ffffff', pants: '#3d4a5c', hair: '#2a2420', hairStyle: 'short', apron: '#ffffff', glasses: true },
    pos: [-34.5, 0, -6.7],
    persona: 'You are Mr. Kim, a calm and caring pharmacist in his 50s in Manhattan. You give clear, careful health advice and always tell people to see a doctor if needed.',
  },
  ortiz: {
    id: 'ortiz', name: 'Dr. Ortiz', role: 'Врач в клинике', pitch: 1.05, gender: 'f', hours: [8, 19],
    look: { skin: '#c99a73', shirt: '#7fd1c1', pants: '#7fd1c1', hair: '#3a2a20', hairStyle: 'ponytail', apron: '#ffffff' },
    pos: [-15.4, 0, -5.6],
    persona: 'You are Dr. Ortiz, a friendly family doctor at a small Brooklyn clinic. You speak simply and kindly to patients learning English.',
  },
};

export const QUESTS = [
  {
    id: 'bank', npc: 'priya', todo: 'Открыть счёт в банке', xp: 70, requires: ['diner'],
    words: [['account', 'счёт (в банке)'], ['open an account', 'открыть счёт'], ['ID', 'удостоверение личности'], ['address', 'адрес'], ['phone number', 'номер телефона'], ['debit card', 'дебетовая карта'], ['sign', 'подписать'], ['spell', 'произнести по буквам']],
    steps: [
      { t: 'say', en: 'Hi! Welcome to City Bank. How can I help you today?', ru: 'Здравствуйте! Добро пожаловать в Сити Банк. Чем могу помочь?' },
      {
        t: 'build', q: 'Скажи: «Я бы хотел открыть счёт»', topic: 'politeness',
        answer: "I'd like to open an account", extra: ['a', 'want'],
        hints: [{ extra: 'a', text: 'Account начинается с гласного звука — an account.' }],
      },
      { t: 'say', en: 'Sure! Can I see your ID, please?', ru: 'Конечно! Можно ваше удостоверение личности?' },
      {
        t: 'choice', q: 'Отдай паспорт', topic: 'politeness',
        opts: [
          { en: 'Sure, here is my passport.', ok: true },
          { en: 'Sure, here my passport.', why: 'Нужен глагол: here is (here\'s) my passport.' },
          { en: 'Take passport.', why: 'Грубо и без артикля. Вежливо: Sure, here\'s my passport.' },
        ],
      },
      { t: 'say', en: 'Thank you. Could you spell your last name for me?', ru: 'Спасибо. Можете продиктовать фамилию по буквам?' },
      { t: 'tip', title: 'Spell — по буквам', text: 'В США часто просят **spell** — продиктовать по буквам. Американский алфавит: A [эй], E [и], I [ай], R [ар], Y [уай], Z [**зи**] — британцы говорят «зед»! Если плохо слышно, говорят **«B as in Boy, D as in Dog»**.' },
      { t: 'listen', en: 'S, M, I, T, H. Smith.', q: 'Какую фамилию продиктовали?', topic: 'listening', opts: ['Smith', 'Smyth', 'Snith', 'Smitt'], ok: 0 },
      { t: 'say', en: "Got it. And what's your phone number?", ru: 'Понятно. А ваш номер телефона?' },
      { t: 'tip', title: 'Номера телефонов', text: 'Номер в США: **(212) 555-0147** — диктуют группами по цифрам: «two one two, five five five, oh one four seven». **0** часто говорят как **«oh»**.' },
      { t: 'listen', en: 'Two one two, five five five, oh one four seven.', q: 'Какой номер продиктовали?', topic: 'numbers', opts: ['212-555-0147', '212-555-0174', '221-555-0147', '212-515-0147'], ok: 0 },
      { t: 'say', en: 'Perfect. Do you want a debit card with your account?', ru: 'Отлично. Хотите дебетовую карту к счёту?' },
      {
        t: 'choice', q: 'Да, пожалуйста', topic: 'politeness',
        opts: [
          { en: 'Yes, please. That would be great.', ok: true },
          { en: 'Yes, I want card.', why: 'Нужен артикль: a card. А ещё вежливее: Yes, please!' },
          { en: 'Yes, give.', why: 'Слишком резко. Скажи: Yes, please.' },
        ],
      },
      { t: 'say', en: 'Great. Please sign here. Your card will arrive in seven to ten business days.', ru: 'Отлично. Подпишите здесь. Карта придёт через 7–10 рабочих дней.' },
      { t: 'listen', en: 'Your card will arrive in seven to ten business days.', q: 'Когда придёт карта?', topic: 'numbers', opts: ['Через 7–10 рабочих дней', 'Через 7 дней', 'Через 10 недель', 'Завтра'], ok: 0 },
      {
        t: 'type', q: 'Поблагодари и попрощайся', example: 'Thank you so much! Have a good day!', topic: 'greetings',
        answers: ['Thank you so much have a good day', 'Thank you have a good day', 'Thanks have a good one', 'Thank you so much', 'Thanks a lot', 'Thank you have a nice day', 'Thanks have a good day'],
      },
    ],
    onDone: { flag: 'bankAccount', money: 20, toast: 'Счёт открыт! Бонус банка новым клиентам: $20 💳' },
  },

  {
    id: 'pharmacy', npc: 'kim', todo: 'Купить лекарство в аптеке', xp: 70, requires: ['diner'],
    words: [['headache', 'головная боль'], ['medicine', 'лекарство'], ['pill', 'таблетка'], ['twice a day', 'два раза в день'], ['side effects', 'побочные эффекты'], ['prescription', 'рецепт'], ['feel better', 'поправиться']],
    steps: [
      { t: 'say', en: 'Hello there. You look tired. How can I help?', ru: 'Здравствуйте. Вы выглядите уставшим. Чем помочь?' },
      {
        t: 'choice', q: 'Скажи, что у тебя болит голова', topic: 'have',
        opts: [
          { en: 'I have a headache.', ok: true },
          { en: 'My head is ache.', why: 'Так не говорят. Устойчиво: I have a headache.' },
          { en: 'I am headache.', why: '«Я — головная боль» 😄 Правильно: I have a headache.' },
        ],
      },
      { t: 'tip', title: 'Болит…', text: 'Что болит — через **have**: I have a **headache** (голова), a **stomachache** (живот), a **toothache** (зуб), a **sore throat** (горло), a **cold** (простуда), a **fever** (температура). Или: My back **hurts**.' },
      { t: 'say', en: "I'm sorry to hear that. How long have you had it?", ru: 'Сочувствую. Как долго у вас это?' },
      { t: 'tip', title: 'How long have you had…?', text: 'Это **Present Perfect**: что-то началось в прошлом и длится до сих пор. Ответ: I\'ve had it **since** yesterday / **for** two days.' },
      {
        t: 'choice', q: 'Ответь: «Со вчерашнего дня»', topic: 'word_order',
        opts: [
          { en: "I've had it since yesterday.", ok: true },
          { en: 'I have it since yesterday.', why: 'Длится до сих пор → Present Perfect: I\'ve had it since…' },
          { en: "I've had it from yesterday.", why: '«С какого-то момента» — since: since yesterday.' },
        ],
      },
      { t: 'say', en: 'OK. Try this. Take one pill twice a day, after meals. No more than four a day.', ru: 'Хорошо. Попробуйте это. По одной таблетке два раза в день после еды. Не больше четырёх в день.' },
      { t: 'listen', en: 'Take one pill twice a day, after meals.', q: 'Как принимать лекарство?', topic: 'listening', opts: ['1 таблетка 2 раза в день после еды', '2 таблетки 1 раз в день', '1 таблетка перед едой', '4 таблетки сразу'], ok: 0 },
      {
        t: 'build', q: 'Спроси: «Есть ли побочные эффекты?»', topic: 'questions',
        answer: 'Are there any side effects?', extra: ['is', 'some'],
        hints: [{ extra: 'is', text: 'Effects — много: Are there…' }, { extra: 'some', text: 'В вопросе — any.' }],
      },
      { t: 'say', en: "It might make you a little sleepy. If it doesn't get better in two days, you should see a doctor.", ru: 'Может немного клонить в сон. Если за два дня не станет лучше, стоит сходить к врачу.' },
      { t: 'tip', title: 'should — совет', text: '**You should see a doctor** — тебе стоит сходить к врачу. После should — глагол без to.' },
      { t: 'say', en: "That's eight ninety-nine.", ru: 'С вас 8,99.' },
      { t: 'listen', en: "That's eight ninety-nine.", q: 'Сколько стоит лекарство?', topic: 'numbers', opts: ['$8.99', '$9.89', '$89.90', '$8.19'], ok: 0 },
      { t: 'pay', amount: 8.99 },
      { t: 'say', en: 'Here you go. Feel better soon!', ru: 'Держите. Поправляйтесь!' },
      {
        t: 'choice', q: 'Поблагодари', topic: 'politeness',
        opts: [
          { en: 'Thanks, I appreciate it!', ok: true },
          { en: 'Thanks, I appreciate!', why: 'После appreciate нужно it: I appreciate it.' },
          { en: 'Feel better too!', why: 'Он же не болеет 😄 Просто: Thanks, I appreciate it!' },
        ],
      },
    ],
  },

  {
    id: 'doctor', npc: 'ortiz', todo: 'Сходить к врачу', xp: 80, requires: ['pharmacy', 'call_clinic'],
    words: [['appointment', 'запись (к врачу)'], ['symptoms', 'симптомы'], ['sore throat', 'больное горло'], ['fever', 'температура'], ['rest', 'отдых'], ['drink plenty of water', 'пить много воды'], ['get well soon', 'выздоравливай']],
    steps: [
      { t: 'say', en: 'Hi, come on in! I\'m Dr. Ortiz. So, what brings you in today?', ru: 'Здравствуйте, проходите! Я доктор Ортис. Что вас беспокоит?' },
      { t: 'tip', title: 'What brings you in?', text: 'Так врачи в США спрашивают «С чем пришли?». Отвечают: **I\'ve been feeling sick** / I have a … / My … hurts.' },
      {
        t: 'type', q: 'Скажи: «Мне плохо уже три дня»', example: "I've been sick for three days.", topic: 'word_order',
        answers: ["I've been sick for three days", "I've been feeling sick for three days", "I have been sick for three days", "I've been sick for 3 days", "I've been feeling bad for three days"],
        hints: [{ extra: 'since', text: 'С количеством времени — for (for three days). Since — с какого-то момента.' }, { missing: 'been', text: 'Длится до сих пор: I\'ve been sick for…' }],
      },
      { t: 'say', en: 'I see. What are your symptoms?', ru: 'Понятно. Какие у вас симптомы?' },
      {
        t: 'choice', q: 'Назови симптомы', topic: 'have',
        opts: [
          { en: 'I have a sore throat and a fever.', ok: true },
          { en: 'I have sore throat and fever.', why: 'Нужны артикли: a sore throat and a fever.' },
          { en: 'My throat is sore and I am fever.', why: '«Я — температура» 😄 Правильно: I have a fever.' },
        ],
      },
      { t: 'say', en: "Let's check your temperature. Hmm, it's a hundred and one. That's a little high.", ru: 'Давайте измерим температуру. Хм, сто один. Немного высокая.' },
      { t: 'tip', title: 'Температура по Фаренгейту', text: 'В США температуру меряют по **Фаренгейту**: 98.6°F = 36,6°C (норма), **101°F ≈ 38,3°C**, 104°F = 40°C. На улице: 32°F = 0°C, 70°F ≈ 21°C.' },
      { t: 'listen', en: "It's a hundred and one.", q: 'Какая температура?', topic: 'numbers', opts: ['101°F (≈38°C)', '110°F', '100.1°F', '91°F'], ok: 0 },
      { t: 'say', en: 'It\'s just a cold. You should rest, drink plenty of water, and stay home for two days.', ru: 'Это просто простуда. Вам стоит отдыхать, пить много воды и посидеть дома два дня.' },
      {
        t: 'choice', q: 'Спроси, нужно ли брать больничный на работе', topic: 'questions',
        opts: [
          { en: 'Do I have to stay home from work?', ok: true },
          { en: 'Must I to stay home from work?', why: 'После must — без to. Американцы скажут: Do I have to…?' },
          { en: 'I have to stay home from work?', why: 'В вопросе нужно do: Do I have to…?' },
        ],
      },
      { t: 'say', en: "Yes, you should. I'll write you a note for your boss. Get well soon!", ru: 'Да, лучше остаться. Я напишу записку для начальника. Выздоравливайте!' },
      {
        t: 'speak', q: 'Скажи: «Большое спасибо, доктор!»', example: 'Thank you so much, doctor!', topic: 'politeness',
        answers: ['Thank you so much doctor', 'Thank you doctor', 'Thanks a lot doctor', 'Thank you so much', 'Thank you very much doctor'],
      },
    ],
    onDone: { flag: 'chapter3done', toast: 'Ты справился с бытом в Нью-Йорке! Сэм зовёт на Кони-Айленд 🎡' },
  },
];

export const PHONE_THREADS = [
  {
    id: 'call_clinic', from: 'Brooklyn Family Clinic', fromRu: 'в клинику', avatar: '🏥', requires: ['pharmacy'], xp: 40,
    steps: [
      { t: 'tip', title: '📞 Звонок в клинику', text: 'Разговор по телефону — самое трудное: нет губ и жестов. Слушай ключевые слова: **дни, время, имя**. Переспрашивай: **Sorry, could you repeat that?**' },
      { t: 'say', en: 'Brooklyn Family Clinic, this is Rachel speaking. How can I help you?', ru: 'Бруклинская семейная клиника, это Рэйчел. Чем могу помочь?' },
      {
        t: 'build', q: 'Скажи: «Я бы хотел записаться на приём»', topic: 'politeness',
        answer: "I'd like to make an appointment", extra: ['do', 'a'],
        hints: [{ extra: 'do', text: 'Записаться — make an appointment.' }, { extra: 'a', text: 'Appointment — с гласного: an appointment.' }],
      },
      { t: 'say', en: "Sure. Are you a new patient?", ru: 'Конечно. Вы новый пациент?' },
      {
        t: 'choice', q: 'Ответь, что да', topic: 'to_be',
        opts: [
          { en: 'Yes, I am. This is my first time.', ok: true },
          { en: 'Yes, I do.', why: 'Вопрос с are → Yes, I am.' },
          { en: 'Yes, I new.', why: 'Нужно am: Yes, I\'m new.' },
        ],
      },
      { t: 'say', en: 'OK. The doctor can see you on Thursday at two thirty, or Friday at ten.', ru: 'Хорошо. Доктор может принять вас в четверг в 2:30 или в пятницу в 10.' },
      { t: 'listen', en: 'On Thursday at two thirty, or Friday at ten.', q: 'Какие варианты предложили?', topic: 'listening', opts: ['Четверг 14:30 или пятница 10:00', 'Вторник 2:30 или пятница 10:00', 'Четверг 2:13 или пятница 12:00', 'Четверг 12:30 или суббота 10:00'], ok: 0 },
      {
        t: 'choice', q: 'Выбери четверг', topic: 'politeness',
        opts: [
          { en: 'Thursday at two thirty works for me.', ok: true },
          { en: 'Thursday is working me.', why: 'Устойчивая фраза: … works for me (мне подходит).' },
          { en: 'I take Thursday.', why: 'Понятно, но грубовато. Естественно: Thursday works for me.' },
        ],
      },
      { t: 'tip', title: 'Works for me', text: '**That works for me** — «Мне подходит». Очень частая фраза, когда договариваются о времени.' },
      { t: 'say', en: "Great, you're all set. Please arrive ten minutes early and bring your ID.", ru: 'Отлично, вы записаны. Приходите на 10 минут раньше и возьмите удостоверение.' },
      { t: 'listen', en: 'Please arrive ten minutes early and bring your ID.', q: 'Что нужно сделать?', topic: 'listening', opts: ['Прийти на 10 минут раньше и взять ID', 'Прийти через 10 минут', 'Позвонить через 10 минут', 'Оплатить заранее'], ok: 0 },
    ],
  },
  {
    id: 'sam4', from: 'Sam', fromRu: 'Сэму', avatar: '🧢', requires: ['doctor'], xp: 30,
    steps: [
      { t: 'say', en: 'heard u were sick 😢 u ok??', ru: 'слышал, ты болел 😢 ты в порядке??' },
      {
        t: 'choice', q: 'Ответь, что уже лучше', topic: 'slang',
        opts: [
          { en: "I'm feeling much better now, thanks!", ok: true },
          { en: "I'm feeling more better now!", why: 'Better уже сравнение: much better (а не more better).' },
          { en: 'I feel gooder now!', why: 'good → better: I feel better.' },
        ],
      },
      { t: 'say', en: "awesome!! r u free saturday? let's go to Coney Island 🎡🌊", ru: 'класс!! свободен в субботу? поехали на Кони-Айленд 🎡🌊' },
      {
        t: 'build', q: 'Ответь: «Я за! Как туда добраться?»', topic: 'questions',
        answer: "I'm down! How do I get there?", extra: ['go', 'does'],
        hints: [{ extra: 'does', text: 'С I — do: How do I get there?' }],
      },
      { t: 'say', en: 'take the F or Q train to the last stop, Stillwell Ave. see ya there!', ru: 'езжай на поезде F или Q до конечной, Стиллуэлл-авеню. увидимся там!' },
      { t: 'tip', title: 'Кони-Айленд', text: 'Теперь в метро можно поехать на **Кони-Айленд** — пляж, колесо обозрения и американские горки. Выбери направление на станции или в **Телефоне → Карта**.' },
    ],
  },
];

export const CHAPTER = { id: 3, title: 'Settling In', level: 'A2', quests: QUESTS, threads: PHONE_THREADS };
