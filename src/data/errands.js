// Поручения в духе Goose Game: найди вещь, подними и отнеси владельцу.
// Подбираешь — слышишь и запоминаешь слово; отдаёшь — говоришь по-английски.
// Новые поручения добавляются сюда же: item — вид предмета (world/items.js), at — где лежит (Бруклин),
// to — кому отнести, steps — короткий диалог при передаче (те же типы шагов, что в заданиях).
export const ERRANDS = [
  {
    id: 'umbrella', item: 'umbrella', word: ['umbrella', 'зонт'], at: [12.5, 18.2], to: 'rodriguez',
    todo: 'Вернуть зонт (umbrella) миссис Родригес ☂️',
    steps: [
      { t: 'say', en: 'Oh my! Is that my umbrella?', ru: 'Ох! Это мой зонт?' },
      {
        t: 'choice', q: 'Отдай зонт', topic: 'phrases',
        opts: [
          { en: 'Yes! Here you go.', ok: true },
          { en: 'Yes! Here you are going.', why: 'Here you go / Here you are — устойчивые фразы «держите, пожалуйста». Глагол не меняется.' },
          { en: 'Yes, give me.', why: 'Give me — «дай мне». А ты отдаёшь: Here you go!' },
        ],
      },
      { t: 'say', en: 'Thank you, dear! I left it in the park yesterday.', ru: 'Спасибо, дорогой! Я оставила его в парке вчера.' },
      {
        t: 'choice', q: 'Ответь на «спасибо»', topic: 'phrases',
        opts: [
          { en: "You're welcome!", ok: true },
          { en: 'Thank you too!', why: 'На «спасибо» отвечают: You\'re welcome! / No problem! / Sure!' },
          { en: "You're welcomed!", why: 'Без -d: You\'re welcome!' },
        ],
      },
    ],
  },
  {
    id: 'newspaper', item: 'newspaper', word: ['newspaper', 'газета'], at: [-31, 6.2], to: 'tony',
    todo: 'Отнести газету (newspaper) Тони 📰',
    steps: [
      { t: 'say', en: 'Hey, is that the morning paper?', ru: 'Эй, это утренняя газета?' },
      {
        t: 'build', q: 'Скажи: «Вот ваша газета»', topic: 'pronouns',
        answer: "Here's your newspaper", extra: ['you', 'is', 'my'],
        hints: [
          { extra: 'you', text: 'You — «ты/вы», а «ваш» — your.' },
          { extra: 'my', text: 'My — «мой». Газета его, значит your.' },
        ],
      },
      { t: 'say', en: 'Thanks, buddy! Coffee is on me next time.', ru: 'Спасибо, приятель! В следующий раз кофе за мой счёт.' },
    ],
  },
  {
    id: 'ball', item: 'ball', word: ['ball', 'мяч'], at: [-2.5, 21.5], to: 'dev',
    todo: 'Вернуть мяч (ball) Деву 🏀',
    steps: [
      { t: 'say', en: 'My ball! Where did you find it?', ru: 'Мой мяч! Где ты его нашёл?' },
      {
        t: 'choice', q: 'Скажи, что нашёл его в парке', topic: 'past_simple',
        opts: [
          { en: 'I found it in the park.', ok: true },
          { en: 'I find it in the park.', why: 'Это было в прошлом — нужен Past Simple: find → **found**.' },
          { en: 'I founded it in the park.', why: 'Find — неправильный глагол: find → found (без -ed). Founded — «основал».' },
        ],
      },
      { t: 'say', en: "You're a lifesaver! Wanna shoot some hoops later?", ru: 'Ты меня спас! Хочешь потом покидать мяч в кольцо?' },
      {
        t: 'choice', q: 'Согласись', topic: 'phrases',
        opts: [
          { en: 'Sure, sounds fun!', ok: true },
          { en: 'Sure, sounds funny!', why: 'Funny — «смешной». «Звучит весело» — sounds fun.' },
          { en: 'Sure, I sound fun.', why: 'Sounds fun — это «звучит весело» (про идею), а не про тебя.' },
        ],
      },
    ],
  },
  {
    id: 'keys', item: 'keys', word: ['keys', 'ключи'], at: [-4.5, -5.6], to: 'marcus',
    todo: 'Кто-то потерял ключи (keys) — спроси Маркуса 🔑',
    steps: [
      { t: 'say', en: 'Hey! What have you got there?', ru: 'Эй! Что это у тебя?' },
      {
        t: 'type', q: 'Спроси: «Это ваши ключи?»', topic: 'to_be', example: 'Are these your keys?',
        answers: ['Are these your keys', 'Are those your keys', 'Are they your keys', 'Is it your keys'],
        hints: [
          { missing: 'are', text: 'Keys — много ключей, поэтому **Are** these…? (не Is).' },
          { single: true, text: 'Вопрос начинается с глагола: Are these your keys?' },
        ],
      },
      { t: 'say', en: 'Yes! My car keys! I was looking everywhere. Thank you!', ru: 'Да! Ключи от машины! Я везде искал. Спасибо!' },
    ],
  },
  {
    id: 'flowers', item: 'flowers', word: ['flowers', 'цветы'], at: [3.5, 9.4], to: 'jess',
    todo: 'Подарить цветы (flowers) Джесс 💐',
    steps: [
      { t: 'say', en: 'Aww, are those for me?', ru: 'Ой, это мне?' },
      {
        t: 'choice', q: 'Ответь «Да, это тебе»', topic: 'to_be',
        opts: [
          { en: 'Yes, these are for you!', ok: true },
          { en: 'Yes, this is for you!', why: 'Flowers — много, поэтому these are (не this is).' },
          { en: 'Yes, for me!', why: 'For me — «для меня». Ты даришь ей: for you.' },
        ],
      },
      { t: 'say', en: "They're beautiful! You just made my day.", ru: 'Они прекрасны! Ты сделал мой день.' },
      { t: 'tip', title: 'You made my day', text: '**You made my day** — «ты сделал мой день», очень тёплая американская фраза: «ты меня так порадовал!»' },
    ],
  },
  {
    id: 'package', item: 'package', word: ['package', 'посылка'], at: [21.5, -5.4], to: 'rodriguez',
    todo: 'Отнести посылку (package) миссис Родригес 📦', after: 'umbrella',
    steps: [
      { t: 'say', en: 'A package? For me?', ru: 'Посылка? Для меня?' },
      {
        t: 'build', q: 'Скажи: «Она была у двери»', topic: 'past_simple',
        answer: 'It was by the door', extra: ['is', 'were', 'in'],
        hints: [
          { extra: 'is', text: 'Это было раньше — прошедшее время: is → **was**.' },
          { extra: 'were', text: 'It — одна вещь, поэтому was (were — для you/we/they).' },
        ],
      },
      { t: 'say', en: 'Oh, the mail carrier always leaves it there. Thank you!', ru: 'Ах, почтальон всегда оставляет её там. Спасибо!' },
    ],
  },
];
