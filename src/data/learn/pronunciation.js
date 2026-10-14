// Тренажёр произношения: трудные для русскоговорящих американские звуки.
// pairs — минимальные пары (слова отличаются одним звуком).

export const SOUNDS = [
  {
    id: 'th', title: 'TH: think / this', icon: '👅',
    how: `В русском такого звука нет. Кончик языка — **между зубами**, слегка высунут, и выдыхай воздух.
**Глухой** [θ] — think, three, thanks (не «синк», не «финк»).
**Звонкий** [ð] — this, the, mother (не «зис», не «дис»).
Частая ошибка: think → sink, three → free, this → dis.`,
    pairs: [['think', 'sink'], ['three', 'tree'], ['thank', 'tank'], ['thin', 'fin'], ['mouth', 'mouse'], ['they', 'day'], ['then', 'den'], ['breathe', 'breeze']],
    say: ['Thank you so much!', 'I think so.', 'This is the third one.', 'Thursday is my birthday.'],
  },
  {
    id: 'r', title: 'Американская R', icon: '🦁',
    how: `Американская **r** — не раскатистая «р». Кончик языка **не касается** нёба, он загнут назад, губы чуть вперёд, будто говоришь «у».
И главное: в Америке **r произносят всегда**, даже в конце слова — car [кар], water [уадэр], here [хир]. Британцы её проглатывают.`,
    pairs: [['right', 'light'], ['read', 'lead'], ['rock', 'lock'], ['fry', 'fly'], ['crowd', 'cloud'], ['correct', 'collect'], ['pray', 'play'], ['rice', 'lice']],
    say: ['Turn right at the corner.', 'Are you ready?', 'I really like New York.', 'The car is red.'],
  },
  {
    id: 'w', title: 'W и V: wine / vine', icon: '💋',
    how: `**W** — губы округлены в трубочку, как для «у», и сразу раскрываются. Зубы НЕ касаются губы: we, water, what.
**V** — верхние зубы касаются нижней губы, как русская «в».
Ошибка русскоговорящих: «вот» вместо **what**, «вэл» вместо **well**.`,
    pairs: [['wine', 'vine'], ['west', 'vest'], ['wet', 'vet'], ['while', 'vile'], ['wail', 'veil'], ['worse', 'verse']],
    say: ['What do you want?', 'We went to work.', 'Very well, thank you.', 'I would love some water.'],
  },
  {
    id: 'ii', title: 'Длинное EE и короткое I', icon: '📏',
    how: `**ee** [iː] — длинный, напряжённый звук, губы в улыбке: sheep, leave, eat, seat.
**i** [ɪ] — короткий, расслабленный, между русскими «и» и «ы»: ship, live, it, sit.
От этого меняется смысл: leave (уходить) / live (жить), sheep (овца) / ship (корабль). Осторожно с beach и sheet 😅`,
    pairs: [['sheep', 'ship'], ['leave', 'live'], ['eat', 'it'], ['seat', 'sit'], ['feel', 'fill'], ['heat', 'hit'], ['beat', 'bit'], ['green', 'grin']],
    say: ['Please take a seat.', 'I live here.', 'Can I leave now?', 'It is a big ship.'],
  },
  {
    id: 'ae', title: 'Широкое A: bad / bed', icon: '😮',
    how: `Американский звук [æ] — рот широко открыт, как для «а», а язык как для «э». Что-то среднее, «мэ-а».
**bad, cat, man, apple, can't** — широко и чуть протяжно.
**e** [e] — как русское «э»: bed, pen, men.
bad / bed, man / men, sad / said — разные слова!`,
    pairs: [['bad', 'bed'], ['man', 'men'], ['sad', 'said'], ['pan', 'pen'], ['bag', 'beg'], ['had', 'head'], ['flash', 'flesh']],
    say: ['That is a bad idea.', 'The man has a black cat.', 'Thanks a lot!', "I can't stand it."],
  },
  {
    id: 'flap', title: 'Американская «т → д»', icon: '🇺🇸',
    how: `Самая американская черта! Звук **t между гласными** превращается в быстрое мягкое «д»:
water → «уадэр», city → «сиди», better → «бэдэр», got it → «гадит», a lot of → «элада».
Так говорят все американцы — британцы произносят чёткое «т». Попробуй: **What are you doing?** → «уадэр ю дуин?»`,
    pairs: [['latter', 'ladder'], ['writer', 'rider'], ['metal', 'medal'], ['petal', 'pedal']],
    say: ['I need some water.', 'New York is a great city.', 'Get out of here!', 'What are you up to?', 'It is a little better.'],
  },
  {
    id: 'ed', title: 'Окончание -ed', icon: '🔚',
    how: `Окончание прошедшего времени **-ed** читается тремя способами:
[t] — после глухих звуков: walked, stopped, watched, liked
[d] — после звонких и гласных: played, called, lived, cleaned
[ɪd] — только после t и d: wanted, needed, visited, decided
Ошибка — читать везде «-ед»: «уокед» ❌ → «уокт» ✅`,
    pairs: [['walked', 'walk'], ['played', 'play'], ['wanted', 'want'], ['watched', 'watch']],
    say: ['I walked to the park.', 'She played the guitar.', 'We wanted to stay.', 'I needed some help.'],
  },
  {
    id: 'h', title: 'Лёгкое H', icon: '🌬️',
    how: `Английская **h** — это просто **выдох**, как будто дышишь на очки. Не русская «х» с хрипом!
hello, how, have, home, happy. Попробуй: «haaa» — тёплый воздух, без шума в горле.`,
    pairs: [['hat', 'at'], ['heat', 'eat'], ['hold', 'old'], ['hair', 'air'], ['hear', 'ear']],
    say: ['Hello! How are you?', 'Have a happy holiday!', 'I am home.', 'Hold on a second.'],
  },
  {
    id: 'ng', title: 'Носовое NG', icon: '👃',
    how: `**ng** в конце слова — один носовой звук, без «г» на конце: sing [сиŋ], thing, morning, going.
Задняя часть языка прижимается к нёбу, воздух идёт через нос. Не «синг», а мягкое «синнн».`,
    pairs: [['sing', 'sin'], ['thing', 'thin'], ['wing', 'win'], ['rang', 'ran'], ['bang', 'ban']],
    say: ['Good morning!', 'What is going on?', 'I love singing.', 'Nothing is wrong.'],
  },
];
