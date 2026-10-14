// Курс грамматики B1: опыт и результат (Present Perfect), рассказы о прошлом, будущее в процессе,
// условия и сожаления, догадки, вежливые вопросы, косвенная речь, связки — американский английский, Нью-Йорк.
// Каждый юнит: правило (rule — id из grammar.js, или newRule — новое правило) и 12+ упражнений
// от узнавания к самостоятельной речи: choice → build → type.

export default [
  // ===================== 1. Present Perfect =====================
  {
    id: 'present_perfect',
    level: 'B1',
    title: `Present Perfect: Have you ever…?`,
    goal: `Сможешь рассказать о своём опыте и о том, что уже случилось`,
    rule: 'present_perfect',
    steps: [
      { t: 'choice', q: `Дев спрашивает: «Ты когда-нибудь был в Бруклине?»`, topic: 'present_perfect', opts: [
        { en: `Have you ever been to Brooklyn?`, ok: true },
        { en: `Did you ever be in Brooklyn?`, why: `Про жизненный опыт — Present Perfect: Have you ever been…?` },
        { en: `Have you ever was in Brooklyn?`, why: `После have нужна 3-я форма: been, а не was.` },
      ] },
      { t: 'choice', q: `«Я потерял ключи!» (и сейчас их нет)`, topic: 'present_perfect', opts: [
        { en: `I've lost my keys!`, ok: true },
        { en: `I have lose my keys!`, why: `После have — 3-я форма: lost.` },
        { en: `I am lost my keys!`, why: `I am lost — «я заблудился». Потерял — I have lost.` },
      ] },
      { t: 'choice', q: `«Я видел Тони вчера»`, topic: 'present_perfect', opts: [
        { en: `I saw Tony yesterday.`, ok: true },
        { en: `I've seen Tony yesterday.`, why: `С yesterday (конкретное время) — только Past Simple: I saw.` },
        { en: `I have saw Tony yesterday.`, why: `Saw — 2-я форма. И с yesterday всё равно нужен Past Simple.` },
      ] },
      { t: 'choice', q: `«Маркус никогда не ездил на метро»`, topic: 'present_perfect', opts: [
        { en: `Marcus has never taken the subway.`, ok: true },
        { en: `Marcus have never taken the subway.`, why: `С he / she / Marcus — has.` },
        { en: `Marcus has never took the subway.`, why: `3-я форма от take — taken.` },
      ] },
      { t: 'tip', title: `3-я форма: gotten по-американски`, text: `Неправильные глаголы надо просто запомнить: be → **been**, go → **gone**, see → **seen**, eat → **eaten**, take → **taken**, do → **done**.\n\nВ Америке у get 3-я форма — **gotten**: *Have you **gotten** your MetroCard yet?* Британцы говорят got.\n\n**been** vs **gone**: She's **been** to Chicago (съездила и вернулась). She's **gone** to Chicago (уехала и сейчас там).` },
      { t: 'build', q: `Составь: «Я никогда не пробовал бейгл с лососем»`, topic: 'present_perfect', answer: `I have never tried a bagel with salmon`, extra: ['did', 'try', 'ever'], hints: [{ extra: 'did', text: `Опыт за всю жизнь — Present Perfect: I have never tried.` }, { extra: 'try', text: `После have — 3-я форма: tried.` }] },
      { t: 'build', q: `Составь: «Ты когда-нибудь видел Таймс-сквер?»`, topic: 'present_perfect', answer: `Have you ever seen Times Square?`, extra: ['saw', 'did', 'see'], hints: [{ extra: 'saw', text: `После have — seen (3-я форма), а не saw.` }, { extra: 'did', text: `Вопрос об опыте: Have you ever…?` }] },
      { t: 'build', q: `Составь: «Джесс работает в кафе уже три года»`, topic: 'present_perfect', answer: `Jess has worked at the cafe for three years`, extra: ['since', 'works', 'is'], hints: [{ extra: 'since', text: `Срок (три года) — for. Since — с какого момента.` }, { extra: 'works', text: `По-русски «работает», но раз это длится до сих пор — has worked.` }] },
      { t: 'build', q: `Составь: «Мы были в Нью-Йорке дважды»`, topic: 'present_perfect', answer: `We have been to New York twice`, extra: ['was', 'being', 'gone'], hints: [{ extra: 'was', text: `С we — have; опыт без даты — Present Perfect: we have been.` }, { extra: 'gone', text: `Побывали и вернулись — been to. Gone — «уехали и сейчас там».` }] },
      { t: 'type', q: `Напиши по-английски: «Я никогда не был в Чикаго»`, topic: 'present_perfect', example: `I've never been to Chicago.`, answers: ['I have never been to Chicago', `I've never been to Chicago`], hints: [{ extra: 'was', text: `Опыт без даты — Present Perfect: I have never been…` }, { missing: 'been', text: `После have — 3-я форма: been.` }, { extra: 'in', text: `«Бывать где-то» — been to, а не in.` }] },
      { t: 'type', q: `Напиши по-английски: «Ты когда-нибудь пробовал нью-йоркскую пиццу?»`, topic: 'present_perfect', example: `Have you ever tried New York pizza?`, answers: ['Have you ever tried New York pizza', 'Have you ever tried New York style pizza', 'Have you ever tried a New York pizza', 'Have you ever had New York pizza', 'Have you ever had New York style pizza', 'Have you ever eaten New York pizza', 'Have you ever eaten New York style pizza'], hints: [{ extra: 'did', text: `Опыт — Have you ever + 3-я форма: Have you ever tried…?` }, { extra: 'try', text: `После have — tried.` }, { missing: 'ever', text: `«Когда-нибудь» — ever: Have you ever…?` }] },
      { t: 'type', q: `Напиши по-английски: «Ой! Я потерял телефон!» (и сейчас его нет)`, topic: 'present_perfect', example: `I've lost my phone!`, answers: ['I have lost my phone', 'Oh I have lost my phone', 'Oh no I have lost my phone', 'I lost my phone', 'Oh I lost my phone', 'Oh no I lost my phone'], hints: [{ extra: 'lose', text: `Нужна 3-я форма: I have lost.` }, { extra: 'am', text: `Не am, а have: I have lost my phone.` }] },
      { t: 'type', q: `Напиши по-английски: «Я живу в Бруклине с марта»`, topic: 'present_perfect', example: `I've lived in Brooklyn since March.`, answers: ['I have lived in Brooklyn since March', 'I have been living in Brooklyn since March'], hints: [{ extra: 'live', text: `Живёшь до сих пор, с какого-то момента — Present Perfect: I have lived.` }, { extra: 'from', text: `«С марта» — since March, не from.` }, { extra: 'am', text: `Не I am living, а I have lived (или I have been living).` }] },
    ],
  },

  // ===================== 2. just / already / yet, for / since =====================
  {
    id: 'pp_just_yet',
    level: 'B1',
    title: `just / already / yet и for / since`,
    goal: `Скажешь «уже», «ещё не», «только что» и «с тех пор как» без ошибок`,
    newRule: {
      id: 'pp_just_yet', level: 'B1', title: `just / already / yet, for / since`, topics: [],
      short: `just — только что, already — уже, yet — уже? / ещё не. for — сколько времени, since — с какого момента.`,
      text: `Эти слова — верные друзья Present Perfect.

**just** — «только что» (перед глаголом): I'**ve just gotten** home. The cab **has just** arrived.
**already** — «уже» (перед глаголом): She'**s already** left.
**yet** — в **вопросах** («уже?») и **отрицаниях** («ещё не»), всегда **в конце**: Have you eaten **yet**? I **haven't** paid the rent **yet**.

**Ловушка для русских:** «Ты **уже** поел?» → Have you eaten **yet**? (не already). Already в вопросе звучит как удивление: «Как, ты уже поел?!»

**for** — сколько длится: **for** two years, **for** a week, **for** ages.
**since** — с какого момента: **since** 2024, **since** Monday, **since** I moved here.
«Я живу здесь два года» — по-русски настоящее время, а по-английски: I'**ve lived** here **for** two years. (не I live here for…)

**Present Perfect или Past Simple?**
Есть конкретное время (yesterday, last week, in 2023, two days **ago**) → **Past Simple**: I **came** here two months ago.
Вопрос **When…?** → Past Simple: **When did** you **arrive**? (не When have you arrived?)

**Американская особенность:** с just / already / yet в Америке очень часто ставят Past Simple: **Did** you **eat yet**? I **already paid**. I **just got** here. Это нормальный разговорный американский — обе формы правильные.`,
      formula: `have / has + just / already + V3 · haven't + V3 + yet · for + срок / since + момент`,
      examples: [
        [`The taxi has just arrived.`, `Такси только что приехало.`],
        [`Have you paid the rent yet?`, `Ты уже заплатил за квартиру?`],
        [`I haven't called Mrs. Rodriguez yet.`, `Я ещё не позвонил миссис Родригес.`],
        [`We've known each other since high school.`, `Мы знакомы со школы.`],
        [`Did you eat yet? — Yeah, I already ate.`, `Ты уже поел? — Да, уже. (разговорный американский)`],
      ],
      mistakes: [
        [`Have you already eaten? (просто вопрос «уже поел?»)`, `Have you eaten yet? — в обычном вопросе «уже» = yet`],
        [`I live here for two years.`, `I've lived here for two years. — длится до сих пор → Present Perfect`],
        [`When have you arrived?`, `When did you arrive? — с When нужен Past Simple`],
      ],
      quiz: [],
    },
    steps: [
      { t: 'choice', q: `Дев спрашивает: «Ты уже поел?»`, topic: 'pp_just_yet', opts: [
        { en: `Have you eaten yet?`, ok: true },
        { en: `Did you already ate?`, why: `После did — начальная форма: eat. И в обычном вопросе «уже» — yet.` },
        { en: `Have you ate yet?`, why: `После have — 3-я форма: eaten.` },
      ] },
      { t: 'choice', q: `«Я живу здесь два года»`, topic: 'pp_just_yet', opts: [
        { en: `I've lived here for two years.`, ok: true },
        { en: `I live here for two years.`, why: `По-русски — настоящее, но действие длится до сих пор: I've lived.` },
        { en: `I've lived here since two years.`, why: `Срок (два года) — for. Since — с какого момента: since 2024.` },
      ] },
      { t: 'choice', q: `Маркус спрашивает: «Когда ты приехал в Нью-Йорк?»`, topic: 'pp_just_yet', opts: [
        { en: `When did you come to New York?`, ok: true },
        { en: `When have you come to New York?`, why: `Вопрос When? — о конкретном времени, нужен Past Simple.` },
        { en: `When you came to New York?`, why: `В вопросе нужен did: When did you come…?` },
      ] },
      { t: 'choice', q: `«Я ещё не заплатил за квартиру»`, topic: 'pp_just_yet', opts: [
        { en: `I haven't paid the rent yet.`, ok: true },
        { en: `I haven't paid the rent already.`, why: `«Ещё не» в отрицании — yet, не already.` },
        { en: `I didn't paid the rent yet.`, why: `После didn't — начальная форма: pay. (I didn't pay the rent yet — так можно.)` },
      ] },
      { t: 'choice', q: `«Сэм знает Прию с 2023 года»`, topic: 'pp_just_yet', opts: [
        { en: `Sam has known Priya since 2023.`, ok: true },
        { en: `Sam knows Priya since 2023.`, why: `Знает до сих пор с какого-то момента — has known.` },
        { en: `Sam has known Priya for 2023.`, why: `2023 — момент начала, нужно since.` },
      ] },
      { t: 'tip', title: `«Уже» и «ещё»: already или yet?`, text: `**Уже** в утверждении → **already**: I've **already** paid.\n**Уже?** в вопросе → **yet**: Have you paid **yet**?\n**Ещё не** → **not … yet**: I haven't paid **yet**.\n**Всё ещё** → **still**: I **still** live in Brooklyn.\n\nВ Нью-Йорке ты постоянно услышишь Past Simple с этими словами: *Did you eat yet? I just got here.* Это нормально!` },
      { t: 'build', q: `Составь: «Такси только что приехало»`, topic: 'pp_just_yet', answer: `The taxi has just arrived`, extra: ['yet', 'already', 'arrives'], hints: [{ extra: 'yet', text: `«Только что» — just, перед глаголом.` }, { extra: 'arrives', text: `После has — 3-я форма: arrived.` }] },
      { t: 'build', q: `Составь: «Я ещё не позвонил миссис Родригес»`, topic: 'pp_just_yet', answer: `I haven't called Mrs. Rodriguez yet`, extra: ['already', 'ever', 'since'], hints: [{ extra: 'already', text: `«Ещё не» — not … yet. Yet ставим в конец.` }, { extra: 'ever', text: `Ever — «когда-нибудь». «Ещё не» — not … yet.` }] },
      { t: 'build', q: `Составь: «Я знаю Джесс с прошлого лета»`, topic: 'pp_just_yet', answer: `I have known Jess since last summer`, extra: ['for', 'know', 'from'], hints: [{ extra: 'for', text: `«С прошлого лета» — момент начала: since.` }, { extra: 'know', text: `Знаю до сих пор — Present Perfect: I have known.` }, { extra: 'from', text: `Не from, а since.` }] },
      { t: 'build', q: `Составь: «Тони работает на этом углу двадцать лет»`, topic: 'pp_just_yet', answer: `Tony has worked on this corner for twenty years`, extra: ['since', 'works', 'during'], hints: [{ extra: 'since', text: `Срок — for twenty years.` }, { extra: 'works', text: `Длится до сих пор — has worked.` }] },
      { t: 'type', q: `Напиши по-английски: «Я уже оплатил счёт»`, topic: 'pp_just_yet', example: `I've already paid the check.`, answers: ['I have already paid the check', 'I already paid the check', 'I have paid the check already', 'I paid the check already', 'I have already paid the bill', 'I already paid the bill', 'I have paid the bill already', 'I paid the bill already'], hints: [{ extra: 'yet', text: `В утверждении «уже» — already.` }, { extra: 'pay', text: `После have — 3-я форма: paid.` }, { missing: 'already', text: `«Уже» в утверждении — already.` }] },
      { t: 'type', q: `Напиши по-английски: «Ты уже видел новую квартиру?»`, topic: 'pp_just_yet', example: `Have you seen the new apartment yet?`, answers: ['Have you seen the new apartment yet', 'Did you see the new apartment yet', 'Have you already seen the new apartment', 'Did you already see the new apartment'], hints: [{ extra: 'saw', text: `После have — seen; после did — see.` }, { missing: 'yet', text: `«Уже?» в вопросе — yet в конце.` }] },
      { t: 'type', q: `Напиши по-английски: «Мы знакомы три года»`, topic: 'pp_just_yet', example: `We've known each other for three years.`, answers: ['We have known each other for three years', `We've known each other for three years`], hints: [{ extra: 'since', text: `Срок — for three years.` }, { extra: 'know', text: `Знакомы до сих пор — have known.` }, { extra: 'are', text: `Не we are, а we have known each other.` }] },
      { t: 'type', q: `Напиши по-английски: «Я приехал сюда два месяца назад»`, topic: 'pp_just_yet', example: `I came here two months ago.`, answers: ['I came here two months ago', 'I got here two months ago', 'I arrived here two months ago', 'I moved here two months ago'], hints: [{ extra: 'have', text: `С ago — только Past Simple: I came here two months ago.` }, { missing: 'ago', text: `«Назад» — ago, в конце: two months ago.` }] },
    ],
  },

  // ===================== 3. Present Perfect Continuous =====================
  {
    id: 'present_perfect_continuous',
    level: 'B1',
    title: `Present Perfect Continuous: I've been waiting…`,
    goal: `Сможешь сказать, сколько времени ты что-то делаешь`,
    newRule: {
      id: 'present_perfect_continuous', level: 'B1', title: `Present Perfect Continuous: I've been waiting for an hour`, topics: [],
      short: `have / has been + -ing — действие началось в прошлом и всё ещё идёт: I've been waiting for 20 minutes.`,
      text: `**have / has been + глагол-ing** — действие **началось в прошлом и продолжается сейчас**, важна **длительность**:
I'**ve been waiting** for a cab **for twenty minutes**!
**How long have** you **been learning** English?
Tony **has been working** on this corner **since** 2010.

**Ловушка для русских:** «Я жду двадцать минут», «Я учу английский год» — по-русски настоящее время. По-английски нельзя I wait / I am waiting for 20 minutes. Нужно: I'**ve been waiting** for 20 minutes.

**Видно последствия** недавнего процесса: You're all wet! — I'**ve been swimming**. Why are you tired? — I'**ve been working** all day.

**Present Perfect или Continuous?**
I'**ve written** three emails. — результат, сколько штук → Present Perfect.
I'**ve been writing** emails all morning. — процесс, как долго → Continuous.

**Глаголы состояния** (know, like, love, want, be, have = «иметь») в Continuous **не ставим**: I'**ve known** Dev for years (не have been knowing).

**В разговоре** сокращаем: I've been, she's been (= she has been), it's been raining.`,
      formula: `have / has been + V-ing (+ for / since)`,
      examples: [
        [`I've been waiting for you for an hour!`, `Я жду тебя целый час!`],
        [`How long have you been living in Brooklyn?`, `Как давно ты живёшь в Бруклине?`],
        [`It's been raining all morning.`, `Всё утро идёт дождь.`],
        [`Jess has been working since 6 a.m.`, `Джесс работает с шести утра.`],
        [`You look tired. What have you been doing?`, `Ты выглядишь уставшим. Чем ты занимался?`],
      ],
      mistakes: [
        [`I wait for the bus for 20 minutes.`, `I've been waiting for the bus for 20 minutes.`],
        [`How long are you learning English?`, `How long have you been learning English?`],
        [`I've been knowing him for years.`, `I've known him for years. — know не бывает в Continuous`],
      ],
      quiz: [],
    },
    steps: [
      { t: 'choice', q: `«Я жду такси уже двадцать минут!»`, topic: 'present_perfect_continuous', opts: [
        { en: `I've been waiting for a taxi for twenty minutes!`, ok: true },
        { en: `I'm waiting for a taxi for twenty minutes!`, why: `Ждёшь с прошлого до сейчас, со сроком — I've been waiting.` },
        { en: `I've been wait for a taxi for twenty minutes!`, why: `После been — -ing: waiting.` },
      ] },
      { t: 'choice', q: `«Как давно ты учишь английский?»`, topic: 'present_perfect_continuous', opts: [
        { en: `How long have you been learning English?`, ok: true },
        { en: `How long do you learn English?`, why: `По-русски — настоящее, но по-английски длительность до сейчас: have you been learning.` },
        { en: `How long are you learning English?`, why: `Не are you learning, а have you been learning.` },
      ] },
      { t: 'choice', q: `«Я знаю Дева много лет»`, topic: 'present_perfect_continuous', opts: [
        { en: `I've known Dev for years.`, ok: true },
        { en: `I've been knowing Dev for years.`, why: `know — глагол состояния, в Continuous не ставится.` },
        { en: `I know Dev for years.`, why: `Длится до сих пор со сроком — I've known.` },
      ] },
      { t: 'choice', q: `«Я написал три письма» (результат — сколько)`, topic: 'present_perfect_continuous', opts: [
        { en: `I've written three emails.`, ok: true },
        { en: `I've been writing three emails.`, why: `Количество, результат — Present Perfect: I've written.` },
        { en: `I've wrote three emails.`, why: `3-я форма от write — written.` },
      ] },
      { t: 'choice', q: `Мария видит тебя у бассейна: «Ты весь мокрый!» — «Да, я плавал»`, topic: 'present_perfect_continuous', opts: [
        { en: `Yeah, I've been swimming.`, ok: true },
        { en: `Yeah, I've been swim.`, why: `После been — -ing: swimming.` },
        { en: `Yeah, I swimming.`, why: `Нужно have been: I've been swimming.` },
      ] },
      { t: 'tip', title: `Сколько штук или как долго?`, text: `Спрашивают **How many / How much?** → Present Perfect: *I've drunk **three** coffees today.*\nСпрашивают **How long?** → Present Perfect Continuous: *I've been drinking coffee **all morning**.*\n\nТаксист Маркус пожалуется: *I've been driving **for ten hours**!* — а не I drive for ten hours.` },
      { t: 'build', q: `Составь: «Тони работает на этом углу с 2010 года»`, topic: 'present_perfect_continuous', answer: `Tony has been working on this corner since 2010`, extra: ['for', 'is', 'works'], hints: [{ extra: 'for', text: `2010 — момент начала: since.` }, { extra: 'is', text: `Не is working, а has been working.` }] },
      { t: 'build', q: `Составь: «Я жду тебя целый час»`, topic: 'present_perfect_continuous', answer: `I have been waiting for you for an hour`, extra: ['since', 'am', 'wait'], hints: [{ extra: 'am', text: `Не I am waiting, а I have been waiting.` }, { extra: 'since', text: `Срок (час) — for an hour.` }] },
      { t: 'build', q: `Составь: «Как давно ты здесь живёшь?»`, topic: 'present_perfect_continuous', answer: `How long have you been living here?`, extra: ['are', 'do', 'since'], hints: [{ extra: 'do', text: `How long + have you been + -ing.` }, { extra: 'are', text: `Не are you living, а have you been living.` }] },
      { t: 'build', q: `Составь: «Всё утро идёт дождь»`, topic: 'present_perfect_continuous', answer: `It has been raining all morning`, extra: ['is', 'rains', 'since'], hints: [{ extra: 'is', text: `Идёт с утра до сих пор — has been raining.` }, { extra: 'rains', text: `После been — -ing: raining.` }] },
      { t: 'type', q: `Напиши по-английски: «Я учу английский шесть месяцев»`, topic: 'present_perfect_continuous', example: `I've been learning English for six months.`, answers: ['I have been learning English for six months', 'I have been studying English for six months', 'I have learned English for six months', 'I have studied English for six months'], hints: [{ extra: 'am', text: `Не I am learning, а I have been learning.` }, { missing: 'been', text: `Формула: have been + -ing.` }, { extra: 'since', text: `Срок — for six months.` }] },
      { t: 'type', q: `Напиши по-английски: «Ты давно ждёшь?»`, topic: 'present_perfect_continuous', example: `Have you been waiting long?`, answers: ['Have you been waiting long', 'Have you been waiting for long', 'Have you been waiting for a long time', 'How long have you been waiting'], hints: [{ extra: 'are', text: `Не Are you waiting, а Have you been waiting…?` }, { missing: 'been', text: `Have you been + -ing.` }] },
      { t: 'type', q: `Напиши по-английски: «Мы с Сэмом переписываемся с января»`, topic: 'present_perfect_continuous', example: `Sam and I have been texting since January.`, answers: ['Sam and I have been texting since January', 'Sam and I have been texting each other since January', 'I have been texting Sam since January', 'I have been texting with Sam since January', 'Sam and I have been messaging since January', 'Sam and I have been messaging each other since January', 'Sam and I have been writing to each other since January'], hints: [{ extra: 'are', text: `Не are texting, а have been texting.` }, { extra: 'from', text: `«С января» — since January.` }, { extra: 'me', text: `«Мы с Сэмом» — Sam and I.` }] },
      { t: 'type', q: `Напиши по-английски: «Ты выглядишь уставшим. Чем ты занимался?»`, topic: 'present_perfect_continuous', example: `You look tired. What have you been doing?`, answers: ['You look tired What have you been doing', 'You seem tired What have you been doing'], hints: [{ extra: 'did', text: `Видно последствия процесса — What have you been doing?` }, { missing: 'been', text: `What have you been doing?` }] },
    ],
  },

  // ===================== 4. Past Continuous =====================
  {
    id: 'past_continuous',
    level: 'B1',
    title: `Past Continuous: I was walking when…`,
    goal: `Сможешь рассказать историю: что происходило, когда что-то случилось`,
    rule: 'past_continuous',
    steps: [
      { t: 'choice', q: `«Я ехал в такси, когда позвонила Джесс»`, topic: 'past_continuous', opts: [
        { en: `I was riding in a taxi when Jess called.`, ok: true },
        { en: `I rode in a taxi when Jess was calling.`, why: `Наоборот: долгий процесс — was riding, короткое событие — called.` },
        { en: `I was ride in a taxi when Jess called.`, why: `После was — -ing: riding.` },
      ] },
      { t: 'choice', q: `«Что вы делали в 9 вечера?»`, topic: 'past_continuous', opts: [
        { en: `What were you doing at 9 p.m.?`, ok: true },
        { en: `What was you doing at 9 p.m.?`, why: `С you — were.` },
        { en: `What did you doing at 9 p.m.?`, why: `did и -ing вместе не ставятся. Процесс в момент — were you doing.` },
      ] },
      { t: 'choice', q: `«Пока Тони делал хот-дог, пошёл дождь»`, topic: 'past_continuous', opts: [
        { en: `While Tony was making a hot dog, it started to rain.`, ok: true },
        { en: `While Tony made a hot dog, it was starting to rain.`, why: `Наоборот: процесс — was making, событие — started.` },
        { en: `While Tony was make a hot dog, it started to rain.`, why: `После was — -ing: making.` },
      ] },
      { t: 'choice', q: `«Мы смотрели фильм, а Дев спал»`, topic: 'past_continuous', opts: [
        { en: `We were watching a movie, and Dev was sleeping.`, ok: true },
        { en: `We was watching a movie, and Dev were sleeping.`, why: `Перепутаны: we — were, Dev (он) — was.` },
        { en: `We were watch a movie, and Dev was sleep.`, why: `После was / were — -ing: watching, sleeping.` },
      ] },
      { t: 'tip', title: `when или while?`, text: `**while** + длинный процесс: *While I **was waiting** for the bus, I met Sam.*\n**when** + короткое событие: *I was waiting for the bus **when** Sam **called**.*\n\nКлассика рассказа: фон — Past Continuous, события — Past Simple. *The sun **was shining**, people **were walking** their dogs… and then a pigeon **stole** my bagel!*` },
      { t: 'build', q: `Составь: «Я шёл домой, когда увидел Маркуса»`, topic: 'past_continuous', answer: `I was walking home when I saw Marcus`, extra: ['walk', 'were', 'see'], hints: [{ extra: 'walk', text: `Процесс в прошлом — was walking.` }, { extra: 'were', text: `С I — was.` }] },
      { t: 'build', q: `Составь: «Что ты делал, когда я позвонил?»`, topic: 'past_continuous', answer: `What were you doing when I called?`, extra: ['did', 'was', 'call'], hints: [{ extra: 'did', text: `Процесс в момент звонка — were you doing.` }, { extra: 'was', text: `С you — were.` }] },
      { t: 'build', q: `Составь: «Шёл снег, и люди спешили на работу»`, topic: 'past_continuous', answer: `It was snowing and people were hurrying to work`, extra: ['snow', 'are', 'hurry'], hints: [{ extra: 'snow', text: `Описание фона — Past Continuous: was snowing.` }, { extra: 'are', text: `Прошлое: people were hurrying.` }] },
      { t: 'build', q: `Составь: «Пока я ждал автобус, у меня сел телефон»`, topic: 'past_continuous', answer: `While I was waiting for the bus my phone died`, extra: ['wait', 'dead', 'were'], hints: [{ extra: 'wait', text: `Процесс после while — was waiting.` }, { extra: 'dead', text: `«Телефон сел» — my phone died (событие, Past Simple).` }] },
      { t: 'type', q: `Напиши по-английски: «Я был в душе (принимал душ), когда пришла миссис Родригес»`, topic: 'past_continuous', example: `I was taking a shower when Mrs. Rodriguez came.`, answers: ['I was taking a shower when * came', 'I was taking a shower when * arrived', 'I was taking a shower when * came over', 'I was taking a shower when * came by', 'I was taking a shower when * showed up', 'I was showering when * came', 'I was showering when * arrived', 'I was showering when * came over'], hints: [{ extra: 'took', text: `Процесс — was taking a shower, событие — came.` }, { extra: 'coming', text: `Короткое событие — Past Simple: came.` }, { missing: 'was', text: `Процесс в прошлом: I was taking…` }] },
      { t: 'type', q: `Напиши по-английски: «Что ты делал, когда погас свет?»`, topic: 'past_continuous', example: `What were you doing when the lights went out?`, answers: ['What were you doing when the lights went out', 'What were you doing when the power went out', 'What were you doing when the light went out'], hints: [{ extra: 'did', text: `Процесс в момент события — What were you doing…?` }, { extra: 'was', text: `С you — were.` }] },
      { t: 'type', q: `Напиши по-английски: «Мы гуляли в парке, когда начался дождь»`, topic: 'past_continuous', example: `We were walking in the park when it started to rain.`, answers: ['We were walking in the park when it started to rain', 'We were walking in the park when it started raining', 'We were walking in the park when it began to rain', 'We were walking in the park when it began raining', 'We were taking a walk in the park when it started to rain', 'We were taking a walk in the park when it started raining'], hints: [{ extra: 'walked', text: `Процесс — were walking.` }, { extra: 'was', text: `С we — were.` }, { extra: 'raining', text: `«Начался дождь» — it started to rain / it started raining.` }] },
      { t: 'type', q: `Напиши по-английски: «Пока Джесс делала кофе, я читал меню»`, topic: 'past_continuous', example: `While Jess was making coffee, I was reading the menu.`, answers: ['While Jess was making coffee I was reading the menu', 'While Jess was making the coffee I was reading the menu', 'While Jess was making coffee I read the menu', 'I was reading the menu while Jess was making coffee', 'I was reading the menu while Jess was making the coffee'], hints: [{ extra: 'made', text: `Процесс после while — was making.` }, { extra: 'were', text: `С Jess и с I — was.` }] },
    ],
  },

  // ===================== 5. Past Perfect =====================
  {
    id: 'past_perfect',
    level: 'B1',
    title: `Past Perfect: The train had already left`,
    goal: `Сможешь сказать, что случилось ещё раньше другого события в прошлом`,
    newRule: {
      id: 'past_perfect', level: 'B1', title: `Past Perfect: When I got there, the train had left`, topics: [],
      short: `had + 3-я форма — «предпрошедшее»: что случилось ДО другого момента в прошлом.`,
      text: `**had + 3-я форма** (left, seen, eaten…) — действие, которое случилось **раньше** другого действия в прошлом:
When I got to the station, the train **had** already **left**. (сначала ушёл поезд, потом пришёл я)
I **had** never **seen** snow before I came to New York.

**Сравни:**
When I got there, the train **left**. — поезд ушёл, когда я пришёл (одновременно, при мне).
When I got there, the train **had left**. — поезд ушёл ещё до меня.

**Сигнальные слова:** already, never… before, **by the time** (к тому времени, как), before, after, just.

**had** — для всех лиц: I had, she had, they had. Отрицание: **hadn't** left. Вопрос: **Had** you ever been…?

**В русском такого времени нет** — мы говорим просто «ушёл». Поэтому русские часто пишут When I came, he already left — а нужно **had** already left.

**Американская особенность:** если порядок и так ясен из before / after, американцы спокойно говорят Past Simple: After I **ate**, I went out. Но с by the time, already и never… before Past Perfect нужен.

**Осторожно:** **I'd** = I had (+ 3-я форма: I'd left) или I would (+ начальная форма: I'd leave).`,
      formula: `had + V3 (left, seen, done…)`,
      examples: [
        [`When I got to the bus stop, the bus had already left.`, `Когда я пришёл на остановку, автобус уже ушёл.`],
        [`I had never seen the ocean before I moved to Brooklyn.`, `Я никогда не видел океан, пока не переехал в Бруклин.`],
        [`By the time Marcus arrived, the party had ended.`, `К тому времени, как приехал Маркус, вечеринка закончилась.`],
        [`I couldn't get in because I had left my keys inside.`, `Я не мог войти, потому что оставил ключи внутри.`],
        [`Had you ever eaten a bagel before?`, `Ты когда-нибудь раньше ел бейгл?`],
      ],
      mistakes: [
        [`When I came, he already left.`, `When I came, he had already left.`],
        [`I had went there before.`, `I had gone there before. — нужна 3-я форма`],
        [`By the time we arrived, the movie has started.`, `By the time we arrived, the movie had started. — всё в прошлом: had`],
      ],
      quiz: [],
    },
    steps: [
      { t: 'choice', q: `«Когда я пришёл в кафе, Джесс уже ушла»`, topic: 'past_perfect', opts: [
        { en: `When I got to the coffee shop, Jess had already left.`, ok: true },
        { en: `When I got to the coffee shop, Jess has already left.`, why: `Всё в прошлом — had, а не has.` },
        { en: `When I got to the coffee shop, Jess already leaves.`, why: `Ушла раньше другого прошлого события — had left.` },
      ] },
      { t: 'choice', q: `«Я никогда не видел небоскрёбов, пока не приехал в Нью-Йорк»`, topic: 'past_perfect', opts: [
        { en: `I had never seen skyscrapers before I came to New York.`, ok: true },
        { en: `I never had seen skyscrapers before I came to New York.`, why: `never ставим между had и 3-й формой: had never seen.` },
        { en: `I had never saw skyscrapers before I came to New York.`, why: `3-я форма от see — seen.` },
      ] },
      { t: 'choice', q: `«К тому времени, как Маркус приехал, я уже поел»`, topic: 'past_perfect', opts: [
        { en: `By the time Marcus came, I had already eaten.`, ok: true },
        { en: `By the time Marcus had come, I already ate.`, why: `Наоборот: раньше было «поел» — had eaten; приезд — came.` },
        { en: `By the time Marcus came, I had already ate.`, why: `3-я форма от eat — eaten.` },
      ] },
      { t: 'choice', q: `«Я не мог войти — я оставил ключи дома»`, topic: 'past_perfect', opts: [
        { en: `I couldn't get in because I had left my keys at home.`, ok: true },
        { en: `I couldn't get in because I have left my keys at home.`, why: `Рассказ о прошлом — had left, а не have left.` },
        { en: `I couldn't get in because I had leave my keys at home.`, why: `После had — 3-я форма: left.` },
      ] },
      { t: 'tip', title: `I'd: had или would?`, text: `Сокращение **I'd** бывает двух видов — смотри на глагол после него:\n**I'd + 3-я форма** = I had: *I'**d** already **eaten**.*\n**I'd + начальная форма** = I would: *I'**d** love a coffee.*\n\nТо же с she'd, we'd, they'd.` },
      { t: 'build', q: `Составь: «Поезд уже ушёл» (когда я пришёл)`, topic: 'past_perfect', answer: `The train had already left`, extra: ['has', 'leaved', 'yet'], hints: [{ extra: 'has', text: `Рассказ о прошлом — had.` }, { extra: 'leaved', text: `leave → left → left.` }] },
      { t: 'build', q: `Составь: «Я никогда раньше не пробовал хот-дог» (до той поездки)`, topic: 'past_perfect', answer: `I had never tried a hot dog before`, extra: ['ever', 'have', 'try'], hints: [{ extra: 'have', text: `До момента в прошлом (той поездки) — had never tried.` }, { extra: 'ever', text: `«Никогда» — never.` }, { extra: 'try', text: `После had — 3-я форма: tried.` }] },
      { t: 'build', q: `Составь: «Сэм уже лёг спать, когда я позвонил»`, topic: 'past_perfect', answer: `Sam had already gone to bed when I called`, extra: ['goes', 'has', 'go'], hints: [{ extra: 'go', text: `После had — 3-я форма: gone.` }, { extra: 'has', text: `Всё в прошлом — had.` }] },
      { t: 'build', q: `Составь: «Ты когда-нибудь был в Нью-Йорке до этой поездки?»`, topic: 'past_perfect', answer: `Had you ever been to New York before this trip?`, extra: ['Have', 'was', 'in'], hints: [{ extra: 'have', text: `Опыт до момента в прошлом — Had you ever been…?` }, { extra: 'in', text: `«Бывать где-то» — been to.` }] },
      { t: 'type', q: `Напиши по-английски: «Когда мы приехали, фильм уже начался»`, topic: 'past_perfect', example: `When we arrived, the movie had already started.`, answers: ['When we arrived the movie had already started', 'When we got there the movie had already started', 'When we arrived the movie had already begun', 'When we got there the movie had already begun', 'The movie had already started when we arrived', 'The movie had already started when we got there', 'When we arrived the film had already started', 'When we got there the film had already started'], hints: [{ missing: 'had', text: `Фильм начался ещё до нашего приезда — had started.` }, { extra: 'has', text: `Всё в прошлом — had, а не has.` }, { extra: 'begin', text: `begin → began → begun.` }] },
      { t: 'type', q: `Напиши по-английски: «Я не узнал его, потому что он сильно изменился»`, topic: 'past_perfect', example: `I didn't recognize him because he had changed a lot.`, answers: ['I did not recognize him because he had changed *', `I didn't recognize him because he had changed *`, `I did not recognize him because he'd changed *`, `I didn't recognize him because he'd changed *`], hints: [{ missing: 'had', text: `Изменился раньше, чем я его увидел, — had changed.` }, { extra: 'has', text: `Рассказ о прошлом — had changed.` }] },
      { t: 'type', q: `Напиши по-английски: «К тому времени, как я проснулся, Дев уже ушёл на работу»`, topic: 'past_perfect', example: `By the time I woke up, Dev had already left for work.`, answers: ['By the time I woke up Dev had already left for work', 'By the time I woke up Dev had already gone to work', 'By the time I got up Dev had already left for work', 'By the time I got up Dev had already gone to work', 'By the time I woke up Dev had left for work', 'By the time I woke up Dev had gone to work', 'By the time I got up Dev had left for work', 'By the time I got up Dev had gone to work'], hints: [{ missing: 'had', text: `Ушёл раньше, чем я проснулся, — had left.` }, { extra: 'went', text: `После had — gone (3-я форма).` }, { extra: 'wake', text: `«Проснулся» — woke up.` }] },
      { t: 'type', q: `Напиши по-английски: «До переезда в Нью-Йорк я никогда не видел снег»`, topic: 'past_perfect', example: `I had never seen snow before I moved to New York.`, answers: ['I had never seen snow before I moved to New York', 'I had never seen snow before I came to New York', 'Before I moved to New York I had never seen snow', 'Before I came to New York I had never seen snow', `I'd never seen snow before I moved to New York`, `I'd never seen snow before I came to New York`, 'I had never seen snow before moving to New York'], hints: [{ extra: 'saw', text: `После had — seen.` }, { extra: 'have', text: `До момента в прошлом — had never seen.` }] },
    ],
  },

  // ===================== 6. used to =====================
  {
    id: 'used_to',
    level: 'B1',
    title: `used to: раньше (а теперь нет)`,
    goal: `Сможешь сравнить свою жизнь «до» и «после» переезда`,
    rule: 'used_to',
    steps: [
      { t: 'choice', q: `«Раньше я работал в банке» (теперь нет)`, topic: 'used_to', opts: [
        { en: `I used to work at a bank.`, ok: true },
        { en: `I use to work at a bank.`, why: `В утверждении — used to (с -d).` },
        { en: `I was used to work at a bank.`, why: `be used to — «привык». «Раньше работал» — used to work.` },
      ] },
      { t: 'choice', q: `«Ты раньше курил?»`, topic: 'used_to', opts: [
        { en: `Did you use to smoke?`, ok: true },
        { en: `Did you used to smoke?`, why: `После did — use (без -d), как и с любым глаголом.` },
        { en: `Used you to smoke?`, why: `Вопрос строим через did: Did you use to…?` },
      ] },
      { t: 'choice', q: `«Я привык к шуму»`, topic: 'used_to', opts: [
        { en: `I'm used to the noise.`, ok: true },
        { en: `I used to the noise.`, why: `«Привык» — be used to: I'm used to.` },
        { en: `I'm use to the noise.`, why: `Нужно used: I'm used to.` },
      ] },
      { t: 'choice', q: `«Ты привыкнешь водить в Нью-Йорке»`, topic: 'used_to', opts: [
        { en: `You'll get used to driving in New York.`, ok: true },
        { en: `You'll get used to drive in New York.`, why: `В get used to слово to — предлог, после него -ing: driving.` },
        { en: `You'll use to driving in New York.`, why: `«Привыкать» — get used to.` },
      ] },
      { t: 'build', q: `Составь: «Раньше здесь была пекарня»`, topic: 'used_to', answer: `There used to be a bakery here`, extra: ['were', 'use', 'is'], hints: [{ extra: 'is', text: `«Раньше было, а теперь нет» — there used to be.` }, { extra: 'use', text: `В утверждении — used.` }] },
      { t: 'build', q: `Составь: «Раньше я не любил кофе»`, topic: 'used_to', answer: `I didn't use to like coffee`, extra: ['used', 'liked', "don't"], hints: [{ extra: 'used', text: `После didn't — use (без -d).` }, { extra: 'liked', text: `После used to — начальная форма: like.` }] },
      { t: 'build', q: `Составь: «Маркус привык к пробкам»`, topic: 'used_to', answer: `Marcus is used to the traffic`, extra: ['use', 'gets', 'traffics'], hints: [{ extra: 'use', text: `«Привык» — is used to.` }, { missing: 'is', text: `«Привык» — be used to: Marcus is used to…` }] },
      { t: 'build', q: `Составь: «Я потихоньку привыкаю к Нью-Йорку»`, topic: 'used_to', answer: `I'm slowly getting used to New York`, extra: ['use', 'get', 'with'], hints: [{ extra: 'with', text: `Привыкать к — get used to, без with.` }, { extra: 'get', text: `Процесс сейчас — I'm getting used to.` }] },
      { t: 'type', q: `Напиши по-английски: «Раньше я жил в маленьком городе»`, topic: 'used_to', example: `I used to live in a small town.`, answers: ['I used to live in a small town', 'I used to live in a small city', 'I used to live in a little town'], hints: [{ missing: 'used', text: `«Раньше (а теперь нет)» — used to.` }, { extra: 'use', text: `В утверждении — used to.` }, { extra: 'lived', text: `После used to — начальная форма: live.` }] },
      { t: 'type', q: `Напиши по-английски: «Ты раньше играл в хоккей?»`, topic: 'used_to', example: `Did you use to play hockey?`, answers: ['Did you use to play hockey'], hints: [{ extra: 'used', text: `После did — use (без -d): Did you use to…?` }, { missing: 'did', text: `Вопрос: Did you use to…?` }] },
      { t: 'type', q: `Напиши по-английски: «Раньше Тони продавал пиццу, а теперь продаёт хот-доги»`, topic: 'used_to', example: `Tony used to sell pizza, but now he sells hot dogs.`, answers: ['Tony used to sell pizza but now he sells hot dogs', 'Tony used to sell pizza and now he sells hot dogs', 'Tony used to sell pizza now he sells hot dogs'], hints: [{ extra: 'use', text: `В утверждении — used to.` }, { extra: 'sold', text: `После used to — начальная форма: sell.` }] },
      { t: 'type', q: `Напиши по-английски: «Я не привык рано вставать»`, topic: 'used_to', example: `I'm not used to getting up early.`, answers: ['I am not used to getting up early', 'I am not used to waking up early'], hints: [{ extra: 'get', text: `После be used to — -ing: getting up.` }, { extra: 'use', text: `«Привык» — be used to.` }, { missing: 'am', text: `Нужно am: I'm not used to…` }] },
    ],
  },

  // ===================== 7. Future Continuous =====================
  {
    id: 'future_continuous',
    level: 'B1',
    title: `Future Continuous: I'll be working at 5`,
    goal: `Сможешь сказать, чем будешь занят в определённый момент`,
    newRule: {
      id: 'future_continuous', level: 'B1', title: `Future Continuous: This time tomorrow I'll be flying`, topics: [],
      short: `will be + -ing — процесс в определённый момент будущего: At 5 I'll be working.`,
      text: `**will be + глагол-ing** — действие будет **в процессе** в какой-то момент будущего:
**At 5 tomorrow** I'**ll be working**. (в 5 я буду на работе, в процессе)
**This time next week** we'**ll be lying** on the beach in Miami.
Don't call at 8 — Maria **will be swimming**.

**Ловушка для русских:** «Завтра в 5 я буду работать». Если сказать I **will work** at 5 — это звучит как «в 5 я начну работать». Процесс в момент — I'**ll be working**.

**Вежливый вопрос о планах** (не просьба, а уточнение): **Will you be using** the car tonight? — Ты не будешь брать машину вечером? Звучит мягче, чем Will you use…?

**Отрицание:** I **won't be working** on Sunday.
**Вопрос:** What **will** you **be doing** at noon?

**Сигналы:** at 5 tomorrow, this time tomorrow / next week, all evening, when you arrive.
**В разговоре:** I'll be, you'll be, she'll be; вместо will часто **gonna be**: I'm gonna be working late.`,
      formula: `will be + V-ing (at 5 / this time tomorrow)`,
      examples: [
        [`At noon tomorrow I'll be flying home.`, `Завтра в полдень я буду лететь домой.`],
        [`Don't call at 8 — I'll be driving.`, `Не звони в 8 — я буду за рулём.`],
        [`This time next week we'll be sitting on the beach.`, `В это время через неделю мы будем сидеть на пляже.`],
        [`Will you be using your laptop tonight?`, `Ты будешь пользоваться ноутбуком вечером?`],
        [`I won't be working this weekend.`, `В эти выходные я не буду работать.`],
      ],
      mistakes: [
        [`At 5 tomorrow I will work. (если «в процессе»)`, `At 5 tomorrow I'll be working.`],
        [`I will working tomorrow.`, `I'll be working tomorrow. — нужен be`],
        [`Will be you home at 8?`, `Will you be home at 8? — порядок: will + кто + be`],
      ],
      quiz: [],
    },
    steps: [
      { t: 'choice', q: `«Завтра в 6 я буду работать — не звони»`, topic: 'future_continuous', opts: [
        { en: `At 6 tomorrow I'll be working, so don't call.`, ok: true },
        { en: `At 6 tomorrow I'll work, so don't call.`, why: `I'll work at 6 — «начну работать в 6». Процесс в этот момент — I'll be working.` },
        { en: `At 6 tomorrow I'll be work, so don't call.`, why: `После be — -ing: working.` },
      ] },
      { t: 'choice', q: `«В это время в следующую субботу мы будем лежать на пляже»`, topic: 'future_continuous', opts: [
        { en: `This time next Saturday we'll be lying on the beach.`, ok: true },
        { en: `This time next Saturday we'll lying on the beach.`, why: `Пропущен be: we'll be lying.` },
        { en: `This time next Saturday we will be lie on the beach.`, why: `После be — -ing: lying.` },
      ] },
      { t: 'choice', q: `Ты вежливо спрашиваешь Дева: «Ты будешь брать машину вечером?»`, topic: 'future_continuous', opts: [
        { en: `Will you be using the car tonight?`, ok: true },
        { en: `Will you be use the car tonight?`, why: `После be — -ing: using.` },
        { en: `Will be you using the car tonight?`, why: `Порядок в вопросе: Will you be…?` },
      ] },
      { t: 'choice', q: `«Не звони в 8 — Мария будет плавать»`, topic: 'future_continuous', opts: [
        { en: `Don't call at 8 — Maria will be swimming.`, ok: true },
        { en: `Don't call at 8 — Maria will swimming.`, why: `Пропущен be: will be swimming.` },
        { en: `Don't call at 8 — Maria is will be swimming.`, why: `is здесь лишний: Maria will be swimming.` },
      ] },
      { t: 'build', q: `Составь: «Завтра в полдень я буду лететь домой»`, topic: 'future_continuous', answer: `At noon tomorrow I will be flying home`, extra: ['fly', 'am', 'flew'], hints: [{ extra: 'fly', text: `Процесс в момент будущего — will be flying.` }, { extra: 'am', text: `Не am, а will be.` }] },
      { t: 'build', q: `Составь: «Что ты будешь делать в это время завтра?»`, topic: 'future_continuous', answer: `What will you be doing this time tomorrow?`, extra: ['are', 'does', 'did'], hints: [{ extra: 'does', text: `Процесс — will you be doing.` }, { extra: 'are', text: `Будущее: What will you be doing…?` }] },
      { t: 'build', q: `Составь: «В воскресенье я не буду работать»`, topic: 'future_continuous', answer: `I won't be working on Sunday`, extra: ['works', 'am', "don't"], hints: [{ extra: 'do', text: `Отрицание в будущем — won't be.` }, { extra: 'am', text: `Будущее: won't be working.` }] },
      { t: 'build', q: `Составь: «Маркус будет ждать тебя у входа»`, topic: 'future_continuous', answer: `Marcus will be waiting for you at the entrance`, extra: ['waits', 'are', 'on'], hints: [{ extra: 'waits', text: `Процесс в будущем — will be waiting.` }, { extra: 'on', text: `«У входа» — at the entrance.` }] },
      { t: 'type', q: `Напиши по-английски: «В девять я буду смотреть игру»`, topic: 'future_continuous', example: `At nine, I'll be watching the game.`, answers: ['At nine I will be watching the game', 'At 9 I will be watching the game', 'I will be watching the game at nine', 'I will be watching the game at 9'], hints: [{ extra: 'watch', text: `Процесс в момент — will be watching.` }, { missing: 'be', text: `Формула: will be + -ing.` }] },
      { t: 'type', q: `Напиши по-английски: «Ты будешь пользоваться ноутбуком завтра?» (вежливо)`, topic: 'future_continuous', example: `Will you be using your laptop tomorrow?`, answers: ['Will you be using your laptop tomorrow', 'Will you be using the laptop tomorrow', 'Are you going to be using your laptop tomorrow', 'Are you going to be using the laptop tomorrow'], hints: [{ extra: 'use', text: `Вежливый вопрос о планах — Will you be using…?` }, { missing: 'be', text: `Will you be + -ing.` }] },
      { t: 'type', q: `Напиши по-английски: «Не волнуйся, я буду ждать тебя на станции»`, topic: 'future_continuous', example: `Don't worry, I'll be waiting for you at the station.`, answers: ['Do not worry I will be waiting for you at the station', 'Do not worry I will be waiting for you at the subway station', 'Do not worry I will be waiting at the station for you'], hints: [{ extra: 'wait', text: `Процесс — will be waiting.` }, { extra: 'on', text: `«На станции» — at the station.` }, { missing: 'for', text: `Ждать кого-то — wait for you.` }] },
      { t: 'type', q: `Напиши по-английски: «В это время завтра Сэм будет лететь в Нью-Йорк»`, topic: 'future_continuous', example: `This time tomorrow, Sam will be flying to New York.`, answers: ['This time tomorrow Sam will be flying to New York', 'Sam will be flying to New York this time tomorrow', 'At this time tomorrow Sam will be flying to New York', 'Sam will be flying to New York at this time tomorrow'], hints: [{ extra: 'fly', text: `Процесс — will be flying.` }, { extra: 'in', text: `Лететь куда — to New York.` }] },
    ],
  },

  // ===================== 8. Zero Conditional =====================
  {
    id: 'zero_conditional',
    level: 'B1',
    title: `Zero Conditional: If you heat ice, it melts`,
    goal: `Сможешь говорить о фактах, правилах и привычках с «если» и «когда»`,
    newRule: {
      id: 'zero_conditional', level: 'B1', title: `Нулевое условие: If it rains, the subway is crowded`, topics: [],
      short: `If + Present Simple, Present Simple — то, что бывает всегда: факты, правила, привычки.`,
      text: `**Zero Conditional** — когда результат наступает **всегда** (факты, законы природы, правила, привычки):
**If** you **heat** ice, it **melts**.
**If** it **rains**, the subway **is** always crowded.
**When** I'**m** tired, I **drink** coffee at Jess's.

**В обеих частях — Present Simple.** Никакого will!
**if** здесь почти = **when** (каждый раз, когда).

**Инструкции и советы** — во второй части повелительное наклонение:
**If** you **lose** your MetroCard, **buy** a new one at the machine.
**If** you **need** help, **ask** Priya at the bank.

**Сравни с First Conditional:**
If it **rains**, I **stay** home. — так у меня всегда (привычка).
If it **rains tomorrow**, I'**ll stay** home. — один конкретный случай в будущем.

**Ловушка:** не забывай -s у he / she / it: If the server **doesn't** get a tip, he **gets** upset.`,
      formula: `If / When + Present Simple, Present Simple (или команда)`,
      examples: [
        [`If you heat water to 100 degrees Celsius, it boils.`, `Если нагреть воду до 100 градусов, она закипает.`],
        [`If it rains, the subway is always crowded.`, `Когда идёт дождь, в метро всегда толпа.`],
        [`When I'm tired, I drink coffee.`, `Когда я устаю, я пью кофе.`],
        [`If you don't tip in New York, people think you're rude.`, `Если в Нью-Йорке не оставить чаевые, тебя сочтут грубым.`],
        [`If you miss your stop, get off at the next one.`, `Если проехал свою остановку — выходи на следующей.`],
      ],
      mistakes: [
        [`If you will heat ice, it will melt. (общий факт)`, `If you heat ice, it melts.`],
        [`When I tired, I drink coffee.`, `When I'm tired, I drink coffee. — нужен am`],
        [`If it rain, the street get wet.`, `If it rains, the street gets wet. — не забывай -s`],
      ],
      quiz: [],
    },
    steps: [
      { t: 'choice', q: `«Если нагреть воду до 100 градусов, она закипает»`, topic: 'zero_conditional', opts: [
        { en: `If you heat water to 100 degrees Celsius, it boils.`, ok: true },
        { en: `If you will heat water to 100 degrees Celsius, it will boil.`, why: `Это общий факт — в обеих частях Present Simple, без will.` },
        { en: `If you heat water to 100 degrees Celsius, it boiling.`, why: `Нужен глагол: it boils.` },
      ] },
      { t: 'choice', q: `«Когда я устаю, я пью кофе»`, topic: 'zero_conditional', opts: [
        { en: `When I'm tired, I drink coffee.`, ok: true },
        { en: `When I will be tired, I drink coffee.`, why: `Привычка — Present Simple в обеих частях: when I'm tired.` },
        { en: `When I tired, I drink coffee.`, why: `tired — прилагательное, нужен am: I'm tired.` },
      ] },
      { t: 'choice', q: `«Если не оставить чаевые, официант расстраивается»`, topic: 'zero_conditional', opts: [
        { en: `If you don't tip, the server gets upset.`, ok: true },
        { en: `If you not tip, the server gets upset.`, why: `Отрицание в Present Simple — don't: if you don't tip.` },
        { en: `If you don't tip, the server get upset.`, why: `The server = he / she → gets.` },
      ] },
      { t: 'choice', q: `Совет новичку: «Если опоздаешь на поезд — бери такси»`, topic: 'zero_conditional', opts: [
        { en: `If you miss the train, take a cab.`, ok: true },
        { en: `If you will miss the train, take a cab.`, why: `После if — Present Simple, без will.` },
        { en: `If you missed the train, take a cab.`, why: `Это не прошлое — нужен Present: if you miss.` },
      ] },
      { t: 'build', q: `Составь: «Если идёт дождь, в метро толпа»`, topic: 'zero_conditional', answer: `If it rains the subway is crowded`, extra: ['will', 'rain', 'crowds'], hints: [{ extra: 'will', text: `Общая закономерность — без will.` }, { extra: 'rain', text: `it — rains (с -s).` }] },
      { t: 'build', q: `Составь: «Когда я голоден, я иду к Тони»`, topic: 'zero_conditional', answer: `When I am hungry I go to Tony's`, extra: ['will', 'went', 'hunger'], hints: [{ extra: 'will', text: `Привычка — Present Simple, без will.` }, { extra: 'hunger', text: `«Голоден» — I am hungry.` }] },
      { t: 'build', q: `Составь: «Растения умирают, если их не поливать»`, topic: 'zero_conditional', answer: `Plants die if you don't water them`, extra: ['dies', 'it', 'waters'], hints: [{ extra: 'dies', text: `Plants — они, без -s: die.` }, { extra: 'it', text: `Растения — множественное: them.` }] },
      { t: 'build', q: `Составь: «Если нажать эту кнопку, дверь открывается»`, topic: 'zero_conditional', answer: `If you press this button the door opens`, extra: ['opening', 'open', 'pressed'], hints: [{ extra: 'open', text: `The door = it → opens.` }, { extra: 'pressed', text: `Так бывает всегда — Present Simple: if you press.` }] },
      { t: 'type', q: `Напиши по-английски: «Если смешать красный и синий, получится фиолетовый»`, topic: 'zero_conditional', example: `If you mix red and blue, you get purple.`, answers: ['If you mix red and blue you get purple', 'If you mix blue and red you get purple', 'When you mix red and blue you get purple', 'If you mix red and blue it makes purple', 'If you mix red and blue it becomes purple', 'If you mix red with blue you get purple'], hints: [{ extra: 'will', text: `Общий факт — без will: you get purple.` }, { missing: 'get', text: `«Получится» — you get.` }] },
      { t: 'type', q: `Напиши по-английски: «Когда Мария на работе, она не пользуется телефоном»`, topic: 'zero_conditional', example: `When Maria is at work, she doesn't use her phone.`, answers: ['When Maria is at work she does not use her phone', 'When Maria is at work she does not use the phone', 'When Maria is working she does not use her phone', 'Maria does not use her phone when she is at work', 'If Maria is at work she does not use her phone'], hints: [{ missing: 'does', text: `Отрицание с she — doesn't use.` }, { extra: 'uses', text: `После doesn't — use (без -s).` }, { extra: 'will', text: `Привычка — Present Simple, без will.` }] },
      { t: 'type', q: `Напиши по-английски: «Если ты живёшь в Нью-Йорке, тебе не нужна машина»`, topic: 'zero_conditional', example: `If you live in New York, you don't need a car.`, answers: ['If you live in New York you do not need a car', 'If you live in NYC you do not need a car', 'You do not need a car if you live in New York', 'You do not need a car if you live in NYC'], hints: [{ extra: 'will', text: `Общая истина — без will.` }, { extra: 'needs', text: `С you — need, отрицание: don't need.` }] },
      { t: 'type', q: `Напиши по-английски: «Если я пью кофе вечером, я не могу уснуть»`, topic: 'zero_conditional', example: `If I drink coffee at night, I can't sleep.`, answers: ['If I drink coffee * I can not sleep', 'If I drink coffee * I can not fall asleep', 'When I drink coffee * I can not sleep', 'When I drink coffee * I can not fall asleep'], hints: [{ extra: 'will', text: `Привычка — Present Simple: If I drink…, I can't sleep.` }, { extra: 'drank', text: `Это всегда так — Present: I drink.` }] },
    ],
  },

  // ===================== 9. First Conditional =====================
  {
    id: 'first_conditional',
    level: 'B1',
    title: `First Conditional: If it rains, I'll stay home`,
    goal: `Сможешь договориться о планах: «если…, то…»`,
    rule: 'first_conditional',
    steps: [
      { t: 'choice', q: `«Если Маркус опоздает, мы возьмём другое такси»`, topic: 'first_conditional', opts: [
        { en: `If Marcus is late, we'll take another cab.`, ok: true },
        { en: `If Marcus will be late, we'll take another cab.`, why: `После if — настоящее время: if Marcus is late.` },
        { en: `If Marcus is late, we would take another cab.`, why: `would — для нереального. Здесь реальный план — will.` },
      ] },
      { t: 'choice', q: `«Я позвоню тебе, как только приземлюсь»`, topic: 'first_conditional', opts: [
        { en: `I'll call you as soon as I land.`, ok: true },
        { en: `I'll call you as soon as I will land.`, why: `После as soon as — настоящее: as soon as I land.` },
        { en: `I call you as soon as I land.`, why: `Обещание в будущем — I'll call.` },
      ] },
      { t: 'choice', q: `«Если не поторопишься, опоздаешь на поезд»`, topic: 'first_conditional', opts: [
        { en: `If you don't hurry, you'll miss the train.`, ok: true },
        { en: `If you won't hurry, you'll miss the train.`, why: `После if — настоящее: if you don't hurry.` },
        { en: `If you don't hurry, you miss the train.`, why: `Конкретный случай в будущем — you'll miss.` },
      ] },
      { t: 'choice', q: `«Я не пойду, если ты не пойдёшь» (unless)`, topic: 'first_conditional', opts: [
        { en: `I won't go unless you go.`, ok: true },
        { en: `I won't go unless you don't go.`, why: `unless уже значит «если не» — второе отрицание лишнее.` },
        { en: `I don't go unless you will go.`, why: `Наоборот: I won't go… unless you go.` },
      ] },
      { t: 'build', q: `Составь: «Если будет солнечно, мы пойдём на пляж»`, topic: 'first_conditional', answer: `If it's sunny we'll go to the beach`, extra: ['goes', 'would', 'went'], hints: [{ extra: 'would', text: `Реальный план — we'll, не would.` }, { extra: 'went', text: `Будущее: we'll go.` }] },
      { t: 'build', q: `Составь: «Я напишу тебе, когда доберусь домой»`, topic: 'first_conditional', answer: `I'll text you when I get home`, extra: ['would', 'got', 'to'], hints: [{ extra: 'got', text: `После when — настоящее: when I get home.` }, { extra: 'would', text: `Обещание — I'll text.` }, { extra: 'to', text: `get home — без to.` }] },
      { t: 'build', q: `Составь: «Что ты будешь делать, если банк закрыт?»`, topic: 'first_conditional', answer: `What will you do if the bank is closed?`, extra: ['would', 'does', 'closing'], hints: [{ extra: 'would', text: `Реальная ситуация — will.` }, { extra: 'closing', text: `«Закрыт» — is closed.` }] },
      { t: 'build', q: `Составь: «Если увидишь Тони, передай ему от меня привет»`, topic: 'first_conditional', answer: `If you see Tony tell him I said hi`, extra: ['will', 'saw', 'says'], hints: [{ extra: 'will', text: `После if — настоящее: if you see.` }, { extra: 'saw', text: `Будущее условие — if you see.` }] },
      { t: 'type', q: `Напиши по-английски: «Если пойдёт дождь, я поеду на метро»`, topic: 'first_conditional', example: `If it rains, I'll take the subway.`, answers: ['If it rains I will take the subway', 'If it rains I will take the train', 'If it rains I will go by subway', 'If it rains I will ride the subway', 'I will take the subway if it rains'], hints: [{ extra: 'rain', text: `После if — настоящее: if it rains, без will.` }, { extra: 'would', text: `Реальное будущее — I'll take.` }, { extra: 'metro', text: `В Нью-Йорке метро — the subway.` }] },
      { t: 'type', q: `Напиши по-английски: «Я помогу тебе, если ты поможешь мне»`, topic: 'first_conditional', example: `I'll help you if you help me.`, answers: ['I will help you if you help me', 'If you help me I will help you'], hints: [{ extra: 'would', text: `Реальное обещание — I'll help.` }, { missing: 'will', text: `В главной части — will: I'll help you.` }] },
      { t: 'type', q: `Напиши по-английски: «Если позвонит миссис Родригес, скажи ей, что меня нет дома»`, topic: 'first_conditional', example: `If Mrs. Rodriguez calls, tell her I'm not home.`, answers: ['If * calls tell her I am not home', 'If * calls tell her I am not at home', 'If * calls tell her that I am not home', 'If * calls tell her that I am not at home', 'If * calls tell her I am out'], hints: [{ extra: 'will', text: `После if — настоящее: if she calls.` }, { extra: 'call', text: `Mrs. Rodriguez = she → calls.` }, { extra: 'say', text: `Сказать кому-то — tell her.` }] },
      { t: 'type', q: `Напиши по-английски: «Если я получу эту работу, я сниму квартиру в Бруклине»`, topic: 'first_conditional', example: `If I get this job, I'll rent an apartment in Brooklyn.`, answers: ['If I get this job I will rent an apartment in Brooklyn', 'If I get the job I will rent an apartment in Brooklyn', 'If I get this job I will get an apartment in Brooklyn', 'If I get the job I will get an apartment in Brooklyn', 'I will rent an apartment in Brooklyn if I get this job', 'I will rent an apartment in Brooklyn if I get the job'], hints: [{ extra: 'would', text: `Реальный план — I'll rent, не would.` }, { extra: 'flat', text: `По-американски квартира — apartment.` }] },
    ],
  },

  // ===================== 10. Second Conditional =====================
  {
    id: 'second_conditional',
    level: 'B1',
    title: `Second Conditional: If I had a million…`,
    goal: `Сможешь мечтать вслух и давать советы: «На твоём месте я бы…»`,
    rule: 'second_conditional',
    steps: [
      { t: 'choice', q: `«Если бы я жил на Манхэттене, я бы ходил на работу пешком»`, topic: 'second_conditional', opts: [
        { en: `If I lived in Manhattan, I'd walk to work.`, ok: true },
        { en: `If I would live in Manhattan, I'd walk to work.`, why: `После if would не ставим: if I lived.` },
        { en: `If I live in Manhattan, I'd walk to work.`, why: `Нереальное условие — прошедшая форма: if I lived.` },
      ] },
      { t: 'choice', q: `«На твоём месте я бы поговорил с миссис Родригес»`, topic: 'second_conditional', opts: [
        { en: `If I were you, I'd talk to Mrs. Rodriguez.`, ok: true },
        { en: `If I am you, I'd talk to Mrs. Rodriguez.`, why: `Ты не можешь быть им — нереальное: If I were you.` },
        { en: `If I were you, I'll talk to Mrs. Rodriguez.`, why: `«Я бы» — would (I'd), а не will.` },
      ] },
      { t: 'choice', q: `«Что бы ты сделал, если бы нашёл кошелёк в такси?»`, topic: 'second_conditional', opts: [
        { en: `What would you do if you found a wallet in a cab?`, ok: true },
        { en: `What will you do if you would find a wallet in a cab?`, why: `Наоборот: would — в главной части, после if — found.` },
        { en: `What would you do if you find a wallet in a cab?`, why: `Нереальная ситуация — после if прошедшая форма: found.` },
      ] },
      { t: 'choice', q: `«Если бы у Тони было больше места, он бы продавал пиццу»`, topic: 'second_conditional', opts: [
        { en: `If Tony had more space, he would sell pizza.`, ok: true },
        { en: `If Tony would have more space, he would sell pizza.`, why: `После if — had, без would.` },
        { en: `If Tony had more space, he sells pizza.`, why: `«Продавал бы» — would sell.` },
      ] },
      { t: 'build', q: `Составь: «Если бы у меня была машина, я бы не ездил на метро»`, topic: 'second_conditional', answer: `If I had a car I wouldn't take the subway`, extra: ['have', 'will', "don't"], hints: [{ extra: 'have', text: `Нереальное — прошедшая форма: if I had.` }, { extra: 'will', text: `«Не ездил бы» — wouldn't.` }] },
      { t: 'build', q: `Составь: «На твоём месте я бы взял эту работу»`, topic: 'second_conditional', answer: `If I were you I would take this job`, extra: ['am', 'will', 'took'], hints: [{ extra: 'am', text: `Совет — If I were you.` }, { extra: 'took', text: `После would — начальная форма: take.` }] },
      { t: 'build', q: `Составь: «Что бы ты сделал, если бы выиграл миллион долларов?»`, topic: 'second_conditional', answer: `What would you do if you won a million dollars?`, extra: ['will', 'win', 'did'], hints: [{ extra: 'win', text: `После if — прошедшая форма: won.` }, { extra: 'will', text: `«Сделал бы» — would.` }] },
      { t: 'build', q: `Составь: «Было бы здорово, если бы Сэм жил здесь»`, topic: 'second_conditional', answer: `It would be great if Sam lived here`, extra: ['lives', 'will', 'is'], hints: [{ extra: 'lives', text: `Нереальное — lived.` }, { extra: 'will', text: `«Было бы» — would be.` }] },
      { t: 'type', q: `Напиши по-английски: «Если бы я знал её номер, я бы ей позвонил»`, topic: 'second_conditional', example: `If I knew her number, I'd call her.`, answers: ['If I knew her number I would call her', 'If I knew her phone number I would call her', 'I would call her if I knew her number', 'I would call her if I knew her phone number'], hints: [{ extra: 'know', text: `После if — прошедшая форма: knew.` }, { extra: 'will', text: `«Позвонил бы» — would call.` }, { extra: 'to', text: `call her — без to.` }] },
      { t: 'type', q: `Напиши по-английски: «На твоём месте я бы не волновался»`, topic: 'second_conditional', example: `If I were you, I wouldn't worry.`, answers: ['If I were you I would not worry', `If I were you I wouldn't worry`, 'If I was you I would not worry', `If I was you I wouldn't worry`, 'I would not worry if I were you', `I wouldn't worry if I were you`], hints: [{ extra: 'am', text: `Совет — If I were you.` }, { extra: 'will', text: `«Я бы не» — wouldn't.` }] },
      { t: 'type', q: `Напиши по-английски: «Если бы у меня было больше времени, я бы учил испанский»`, topic: 'second_conditional', example: `If I had more time, I'd learn Spanish.`, answers: ['If I had more time I would learn Spanish', 'If I had more time I would study Spanish', 'I would learn Spanish if I had more time', 'I would study Spanish if I had more time'], hints: [{ extra: 'have', text: `После if — had.` }, { extra: 'will', text: `«Учил бы» — would learn.` }] },
      { t: 'type', q: `Напиши по-английски: «Куда бы ты поехал, если бы мог поехать куда угодно?»`, topic: 'second_conditional', example: `Where would you go if you could go anywhere?`, answers: ['Where would you go if you could go anywhere', 'Where would you travel if you could go anywhere', 'Where would you go if you could travel anywhere', 'Where would you travel if you could travel anywhere'], hints: [{ extra: 'can', text: `После if — прошедшая форма: could.` }, { extra: 'will', text: `«Поехал бы» — would go.` }] },
    ],
  },

  // ===================== 11. wish / if only =====================
  {
    id: 'wish',
    level: 'B1',
    title: `I wish / If only: жаль, что…`,
    goal: `Сможешь сказать, о чём жалеешь и чего тебе не хватает`,
    newRule: {
      id: 'wish', level: 'B1', title: `I wish I had… / If only: жаль, что…`, topics: [],
      short: `I wish + прошедшее — жаль, что сейчас не так. I wish + had + V3 — жаль, что так было.`,
      text: `**I wish** — «жаль, что…», «хотел бы я, чтобы…». Время после wish сдвигается **на шаг назад**.

**1. Жалею о настоящем → I wish + Past Simple:**
I **wish** I **had** a car. — Жаль, что у меня **нет** машины.
I **wish** I **lived** closer to work. — Жаль, что я **не** живу ближе.
I **wish** I **could** speak English like a New Yorker. — Жаль, что я **не могу**…
I **wish** I **were** taller. (в разговоре часто I wish I **was**)

**2. Жалею о прошлом → I wish + had + V3:**
I **wish** I **had studied** harder. — Жаль, что я не учился усерднее.
I **wish** I **hadn't eaten** that third hot dog. — Зря я съел третий хот-дог.

**3. Хочу, чтобы кто-то изменил поведение → I wish + would:**
I **wish** the neighbors **would stop** making noise. — Хоть бы соседи перестали шуметь.

**If only…** — то же самое, но эмоциональнее: **If only** I **had** more time!

**Главная ловушка для русских:** по-русски «Жаль, что у меня **нет** машины» — с отрицанием. По-английски — **без** отрицания: I wish I **had** a car (= хотел бы, чтобы была). I wish I **don't have** a car — ошибка.

**Не путай:** I **wish you** a happy birthday — «желаю тебе». Это другое значение.`,
      formula: `I wish + Past Simple (сейчас) · I wish + had + V3 (прошлое) · I wish + would / could`,
      examples: [
        [`I wish I had more time.`, `Жаль, что у меня мало времени.`],
        [`I wish I spoke English better.`, `Жаль, что я не говорю по-английски лучше.`],
        [`I wish I hadn't eaten that third hot dog.`, `Зря я съел третий хот-дог.`],
        [`If only I could find a cheaper apartment!`, `Если бы только я мог найти квартиру подешевле!`],
        [`I wish it would stop raining.`, `Хоть бы дождь перестал.`],
      ],
      mistakes: [
        [`I wish I have a car.`, `I wish I had a car. — после wish время сдвигаем назад`],
        [`I wish I don't have to work.`, `I wish I didn't have to work.`],
        [`I wish I didn't go there yesterday.`, `I wish I hadn't gone there yesterday. — о прошлом: had + V3`],
      ],
      quiz: [],
    },
    steps: [
      { t: 'choice', q: `«Жаль, что у меня нет машины»`, topic: 'wish', opts: [
        { en: `I wish I had a car.`, ok: true },
        { en: `I wish I have a car.`, why: `После wish время сдвигается назад: I wish I had.` },
        { en: `I wish I don't have a car.`, why: `По-английски без отрицания: «хотел бы, чтобы была» — I wish I had a car.` },
      ] },
      { t: 'choice', q: `«Жаль, что я не пошёл вчера на вечеринку»`, topic: 'wish', opts: [
        { en: `I wish I had gone to the party yesterday.`, ok: true },
        { en: `I wish I went to the party yesterday.`, why: `Сожаление о прошлом — had + 3-я форма: had gone.` },
        { en: `I wish I have gone to the party yesterday.`, why: `После wish о прошлом — had gone.` },
      ] },
      { t: 'choice', q: `«Если бы только я мог говорить свободно!»`, topic: 'wish', opts: [
        { en: `If only I could speak fluently!`, ok: true },
        { en: `If only I can speak fluently!`, why: `Сдвиг назад: can → could.` },
        { en: `If only I would can speak fluently!`, why: `would и can вместе не ставятся. Нужно could.` },
      ] },
      { t: 'choice', q: `«Хоть бы соседи перестали шуметь»`, topic: 'wish', opts: [
        { en: `I wish the neighbors would stop making noise.`, ok: true },
        { en: `I wish the neighbors stop making noise.`, why: `Хочешь, чтобы кто-то изменил поведение, — wish + would.` },
        { en: `I wish the neighbors would stop to make noise.`, why: `stop to make — «остановиться, чтобы пошуметь». Перестать — stop making.` },
      ] },
      { t: 'build', q: `Составь: «Жаль, что я не живу ближе к работе»`, topic: 'wish', answer: `I wish I lived closer to work`, extra: ['live', "don't", 'will'], hints: [{ extra: 'do', text: `По-английски без отрицания: I wish I lived closer.` }, { extra: 'live', text: `После wish — прошедшая форма: lived.` }] },
      { t: 'build', q: `Составь: «Жаль, что я не сказал ей правду»`, topic: 'wish', answer: `I wish I had told her the truth`, extra: ['said', 'tell', 'have'], hints: [{ extra: 'said', text: `Сказать кому-то — tell her: had told.` }, { extra: 'have', text: `О прошлом — had + V3.` }] },
      { t: 'build', q: `Составь: «Если бы только сейчас было лето!»`, topic: 'wish', answer: `If only it were summer now`, extra: ['is', 'will', 'be'], hints: [{ extra: 'is', text: `После if only — сдвиг назад: it were.` }, { extra: 'will', text: `will после if only не ставим.` }] },
      { t: 'build', q: `Составь: «Жаль, что ты не можешь остаться»`, topic: 'wish', answer: `I wish you could stay`, extra: ['can', "can't", 'will'], hints: [{ extra: 'can', text: `Сдвиг назад: can → could, и без отрицания: I wish you could stay.` }] },
      { t: 'type', q: `Напиши по-английски: «Жаль, что я не говорю по-английски лучше»`, topic: 'wish', example: `I wish I spoke English better.`, answers: ['I wish I spoke English better', 'I wish I could speak English better', 'I wish my English was better', 'I wish my English were better', 'If only I spoke English better', 'If only I could speak English better'], hints: [{ extra: 'speak', text: `После I wish — прошедшая форма: I wish I spoke… (или I wish I could speak…).` }, { extra: 'not', text: `Без отрицания: I wish I spoke English better.` }] },
      { t: 'type', q: `Напиши по-английски: «Жаль, что я не купил тот билет»`, topic: 'wish', example: `I wish I had bought that ticket.`, answers: ['I wish I had bought that ticket', 'I wish I had bought the ticket', `I wish I'd bought that ticket`, `I wish I'd bought the ticket`, 'If only I had bought that ticket', 'If only I had bought the ticket'], hints: [{ missing: 'had', text: `О прошлом — had bought.` }, { extra: 'buy', text: `После had — 3-я форма: bought.` }, { extra: 'not', text: `Без отрицания: I wish I had bought it.` }] },
      { t: 'type', q: `Напиши по-английски: «Хотел бы я, чтобы Сэм был здесь»`, topic: 'wish', example: `I wish Sam were here.`, answers: ['I wish Sam were here', 'I wish Sam was here', 'If only Sam were here', 'If only Sam was here'], hints: [{ extra: 'is', text: `После wish — сдвиг назад: were (или was).` }, { extra: 'would', text: `Здесь просто: I wish Sam were here.` }] },
      { t: 'type', q: `Напиши по-английски: «Жаль, что мне надо работать в субботу»`, topic: 'wish', example: `I wish I didn't have to work on Saturday.`, answers: ['I wish I did not have to work *', `I wish I didn't have to work *`, 'I wish I did not need to work *', `I wish I didn't need to work *`], hints: [{ extra: 'do', text: `Сдвиг назад: don't → didn't.` }, { extra: 'must', text: `«Надо» — have to: I didn't have to work.` }] },
    ],
  },

  // ===================== 12. must / might / can't — догадки =====================
  {
    id: 'modals_deduction',
    level: 'B1',
    title: `Догадки: must be / might be / can't be`,
    goal: `Сможешь строить догадки: «должно быть», «может быть», «не может быть»`,
    newRule: {
      id: 'modals_deduction', level: 'B1', title: `must be / might be / can't be: догадки`, topics: [],
      short: `must be — наверняка, might / may / could be — возможно, can't be — точно нет.`,
      text: `Модальные глаголы помогают **строить догадки** о настоящем:

**must be** — «должно быть», почти уверен (90%): Jess has been working since 6 a.m. — She **must be** tired.
**might be / may be / could be** — «может быть», не уверен (50%): Priya **might be** at lunch.
**can't be** — «не может быть», уверен, что нет: That **can't be** Marcus — he's in Queens today.

**Процесс сейчас:** must / might be + -ing: He **must be working** late.

**Главная ловушка:** противоположность must в догадках — **can't**, а не mustn't!
**mustn't** = «нельзя»: You **mustn't** smoke here.
That **mustn't be** true — ошибка. Нужно: That **can't be** true.

**maybe** ≠ **may be**:
**maybe** — наречие «может быть» (в начале фразы): **Maybe** she's at the gym.
**may be** — глагол: She **may be** at the gym.

**После модальных — без to:** must be (не must to be).

**По-американски:** might — самое частое в разговоре; may звучит чуть официальнее. You **must be** kidding! — «Да ты шутишь!»`,
      formula: `must / might / may / could / can't + be (+ -ing)`,
      examples: [
        [`You must be tired after the flight.`, `Ты, должно быть, устал после перелёта.`],
        [`Priya might be at lunch.`, `Прия, может быть, на обеде.`],
        [`That can't be our bus — ours is the B41.`, `Это не может быть наш автобус — наш B41.`],
        [`The lights are on. They must be home.`, `Свет горит. Они, должно быть, дома.`],
        [`He could be stuck in traffic.`, `Он, может, застрял в пробке.`],
      ],
      mistakes: [
        [`That mustn't be true.`, `That can't be true. — «не может быть» = can't`],
        [`She must to be at home.`, `She must be at home. — после must без to`],
        [`He maybe at work.`, `He may be at work. / Maybe he's at work.`],
      ],
      quiz: [],
    },
    steps: [
      { t: 'choice', q: `«Джесс работает с 6 утра — она, должно быть, устала»`, topic: 'modals_deduction', opts: [
        { en: `She must be tired.`, ok: true },
        { en: `She must to be tired.`, why: `После must — без to.` },
        { en: `She can be tired.`, why: `can — «вообще бывает». Уверенная догадка — must be.` },
      ] },
      { t: 'choice', q: `«Это не может быть Маркус — он сегодня в Квинсе»`, topic: 'modals_deduction', opts: [
        { en: `That can't be Marcus.`, ok: true },
        { en: `That mustn't be Marcus.`, why: `mustn't — «нельзя». «Не может быть» — can't be.` },
        { en: `That doesn't must be Marcus.`, why: `С модальными do не используем. Нужно can't be.` },
      ] },
      { t: 'choice', q: `«Прия, может быть, на обеде»`, topic: 'modals_deduction', opts: [
        { en: `Priya might be at lunch.`, ok: true },
        { en: `Priya might is at lunch.`, why: `После might — начальная форма: be.` },
        { en: `Priya maybe at lunch.`, why: `maybe — наречие, глагола нет. Нужно might be (или Maybe Priya is…).` },
      ] },
      { t: 'choice', q: `«Свет горит — они, должно быть, дома»`, topic: 'modals_deduction', opts: [
        { en: `The lights are on — they must be home.`, ok: true },
        { en: `The lights are on — they can't be home.`, why: `Свет горит — значит, скорее всего дома: must be.` },
        { en: `The lights are on — they must are home.`, why: `После must — be, а не are.` },
      ] },
      { t: 'build', q: `Составь: «Ты, должно быть, шутишь!»`, topic: 'modals_deduction', answer: `You must be kidding!`, extra: ['to', 'are', 'can'], hints: [{ extra: 'to', text: `После must — без to.` }, { extra: 'are', text: `После must — be.` }] },
      { t: 'build', q: `Составь: «Он, может быть, застрял в пробке»`, topic: 'modals_deduction', answer: `He might be stuck in traffic`, extra: ['to', 'are', 'can'], hints: [{ extra: 'can', text: `can — «вообще может». Догадка «может быть» — might be.` }, { extra: 'to', text: `После might — без to.` }] },
      { t: 'build', q: `Составь: «Это не может быть правдой»`, topic: 'modals_deduction', answer: `That can't be true`, extra: ["mustn't", 'is', 'truth'], hints: [{ extra: 'must', text: `mustn't — «нельзя». «Не может быть» — can't be.` }, { extra: 'truth', text: `«Правдой» — true (прилагательное).` }] },
      { t: 'build', q: `Составь: «Доктор Ортис, возможно, с пациентом»`, topic: 'modals_deduction', answer: `Dr. Ortiz may be with a patient`, extra: ['to', 'are', 'can'], hints: [{ extra: 'can', text: `Догадка «возможно» — may be, не can.` }, { extra: 'to', text: `После may — без to.` }] },
      { t: 'type', q: `Напиши по-английски: «Ты, должно быть, голоден»`, topic: 'modals_deduction', example: `You must be hungry.`, answers: ['You must be hungry', 'You must be starving'], hints: [{ extra: 'to', text: `После must — без to.` }, { extra: 'should', text: `Уверенная догадка — must be.` }, { extra: 'are', text: `После must — be.` }] },
      { t: 'type', q: `Напиши по-английски: «Это не может быть наш автобус»`, topic: 'modals_deduction', example: `That can't be our bus.`, answers: ['That can not be our bus', 'This can not be our bus', 'It can not be our bus'], hints: [{ extra: 'must', text: `«Не может быть» — can't be.` }, { extra: 'is', text: `После can't — be.` }] },
      { t: 'type', q: `Напиши по-английски: «Мария, может быть, на пляже»`, topic: 'modals_deduction', example: `Maria might be at the beach.`, answers: ['Maria might be at the beach', 'Maria may be at the beach', 'Maria could be at the beach', 'Maria might be on the beach', 'Maria may be on the beach', 'Maybe Maria is at the beach', 'Maybe Maria is on the beach'], hints: [{ extra: 'must', text: `must — «наверняка». «Может быть» — might / may.` }, { extra: 'maybe', text: `Либо Maybe Maria is…, либо Maria might be…` }] },
      { t: 'type', q: `Напиши по-английски: «Он, должно быть, работает допоздна»`, topic: 'modals_deduction', example: `He must be working late.`, answers: ['He must be working late'], hints: [{ missing: 'working', text: `Процесс сейчас — must be working.` }, { extra: 'work', text: `«Должно быть, работает (сейчас)» — must be working.` }] },
    ],
  },

  // ===================== 13. Gerund / infinitive =====================
  {
    id: 'gerund_infinitive',
    level: 'B1',
    title: `enjoy doing / decide to do`,
    goal: `Будешь правильно ставить -ing или to после глаголов`,
    newRule: {
      id: 'gerund_infinitive', level: 'B1', title: `enjoy doing / decide to do / stop doing vs stop to do`, topics: [],
      short: `После одних глаголов — -ing (enjoy walking), после других — to (decide to go).`,
      text: `По-русски после любого глагола — инфинитив: «люблю гулять», «решил переехать». В английском бывает **-ing** или **to + глагол**, и это надо запомнить.

**+ -ing:** enjoy, mind, finish, avoid, keep, miss, practice, suggest, can't stand, feel like:
I **enjoy walking** across the Brooklyn Bridge. Dev **keeps being** late. Would you **mind closing** the window?

**+ to:** want, decide, plan, hope, need, agree, promise, learn, afford, offer, refuse, would like:
I **decided to move** to New York. I can't **afford to live** in Manhattan.

**После предлога — всегда -ing:** Thanks **for helping**! I'm interested **in learning** Spanish. Call me **before leaving**.

**Можно и так, и так:** like, love, hate, start, begin: I **like to cook** = I **like cooking**. (Американцы чаще говорят like **to** do.)

**Меняется смысл:**
**stop doing** — перестать: I **stopped smoking**.
**stop to do** — остановиться, чтобы: Marcus **stopped to buy** coffee.
**remember to do** — не забыть сделать: **Remember to pay** the rent!
**remember doing** — помнить, как делал: I **remember seeing** Times Square for the first time.
**forget to do** — забыть сделать: Don't **forget to call** Dr. Ortiz.
**try doing** — попробовать (как способ) / **try to do** — стараться.`,
      formula: `enjoy / keep / mind + V-ing · want / decide / plan + to V · предлог + V-ing`,
      examples: [
        [`I enjoy walking around Brooklyn.`, `Мне нравится гулять по Бруклину.`],
        [`We decided to rent a bigger apartment.`, `Мы решили снять квартиру побольше.`],
        [`Marcus stopped to get gas.`, `Маркус остановился заправиться.`],
        [`Thanks for helping me with the move!`, `Спасибо, что помог с переездом!`],
        [`Don't forget to pay the rent.`, `Не забудь заплатить за квартиру.`],
      ],
      mistakes: [
        [`I enjoy to walk.`, `I enjoy walking.`],
        [`I decided moving to New York.`, `I decided to move to New York.`],
        [`Thanks for help me.`, `Thanks for helping me. — после предлога -ing`],
      ],
      quiz: [],
    },
    steps: [
      { t: 'choice', q: `«Мне нравится гулять по Бруклинскому мосту» (enjoy)`, topic: 'gerund_infinitive', opts: [
        { en: `I enjoy walking across the Brooklyn Bridge.`, ok: true },
        { en: `I enjoy to walk across the Brooklyn Bridge.`, why: `После enjoy — -ing: enjoy walking.` },
        { en: `I enjoy walk across the Brooklyn Bridge.`, why: `После enjoy — -ing: walking.` },
      ] },
      { t: 'choice', q: `«Я решил переехать в Нью-Йорк»`, topic: 'gerund_infinitive', opts: [
        { en: `I decided to move to New York.`, ok: true },
        { en: `I decided moving to New York.`, why: `После decide — to: decided to move.` },
        { en: `I decided move to New York.`, why: `Нужно to: decided to move.` },
      ] },
      { t: 'choice', q: `«Маркус остановился, чтобы купить кофе»`, topic: 'gerund_infinitive', opts: [
        { en: `Marcus stopped to buy coffee.`, ok: true },
        { en: `Marcus stopped buying coffee.`, why: `stopped buying — «перестал покупать». Остановился, чтобы — stopped to buy.` },
        { en: `Marcus stopped for buy coffee.`, why: `Цель — to buy, не for buy.` },
      ] },
      { t: 'choice', q: `«Не забудь заплатить за квартиру!»`, topic: 'gerund_infinitive', opts: [
        { en: `Don't forget to pay the rent!`, ok: true },
        { en: `Don't forget paying the rent!`, why: `forget doing — «забыть, что делал». Не забыть сделать — forget to pay.` },
        { en: `Don't forget pay the rent!`, why: `Нужно to: forget to pay.` },
      ] },
      { t: 'tip', title: `stop, remember, forget: два значения`, text: `**stop smoking** — бросить курить · **stop to smoke** — остановиться покурить.\n**remember to call** — не забыть позвонить · **remember calling** — помнить, что звонил.\n\nПодсказка: **to** смотрит **вперёд** (то, что ещё надо сделать), **-ing** — на то, что уже было или идёт.` },
      { t: 'build', q: `Составь: «Я бросил курить в прошлом году»`, topic: 'gerund_infinitive', answer: `I stopped smoking last year`, extra: ['to', 'smoke', 'stop'], hints: [{ extra: 'to', text: `stopped to smoke — «остановился покурить». Бросить — stopped smoking.` }, { extra: 'smoke', text: `Перестать — stop + -ing: smoking.` }] },
      { t: 'build', q: `Составь: «Мы планируем снять квартиру побольше»`, topic: 'gerund_infinitive', answer: `We are planning to rent a bigger apartment`, extra: ['renting', 'more', 'for'], hints: [{ extra: 'renting', text: `После plan — to: planning to rent.` }, { extra: 'more', text: `big → bigger, без more.` }] },
      { t: 'build', q: `Составь: «Дев постоянно опаздывает на работу»`, topic: 'gerund_infinitive', answer: `Dev keeps being late for work`, extra: ['to', 'be', 'on'], hints: [{ extra: 'to', text: `После keep — -ing: keeps being.` }, { extra: 'be', text: `После keep — being.` }] },
      { t: 'build', q: `Составь: «Спасибо, что помог мне с переездом»`, topic: 'gerund_infinitive', answer: `Thanks for helping me with the move`, extra: ['to', 'help', 'that'], hints: [{ extra: 'help', text: `После предлога for — -ing: helping.` }, { extra: 'that', text: `Thanks for + -ing, без that.` }] },
      { t: 'type', q: `Напиши по-английски: «Вы не против закрыть окно?»`, topic: 'gerund_infinitive', example: `Would you mind closing the window?`, answers: ['Would you mind closing the window', 'Do you mind closing the window', 'Would you mind shutting the window'], hints: [{ extra: 'to', text: `После mind — -ing: mind closing.` }, { extra: 'close', text: `После mind — closing.` }] },
      { t: 'type', q: `Напиши по-английски: «Я помню, как впервые увидел Таймс-сквер»`, topic: 'gerund_infinitive', example: `I remember seeing Times Square for the first time.`, answers: ['I remember seeing Times Square for the first time', 'I remember the first time I saw Times Square', 'I remember when I saw Times Square for the first time', 'I remember when I first saw Times Square', 'I remember first seeing Times Square'], hints: [{ extra: 'to', text: `Помнить то, что было, — remember + -ing: remember seeing.` }] },
      { t: 'type', q: `Напиши по-английски: «Не забудь позвонить доктору Ортис»`, topic: 'gerund_infinitive', example: `Don't forget to call Dr. Ortiz.`, answers: ['Do not forget to call *', 'Remember to call *'], hints: [{ extra: 'calling', text: `Не забыть сделать — forget to call.` }, { missing: 'to', text: `forget to + глагол.` }] },
      { t: 'type', q: `Напиши по-английски: «Я хочу научиться водить машину»`, topic: 'gerund_infinitive', example: `I want to learn to drive.`, answers: ['I want to learn to drive', 'I want to learn how to drive', 'I want to learn to drive a car', 'I want to learn how to drive a car'], hints: [{ extra: 'driving', text: `После learn — to: learn to drive.` }, { missing: 'to', text: `want to, learn to.` }] },
    ],
  },

  // ===================== 14. Relative clauses =====================
  {
    id: 'relative',
    level: 'B1',
    title: `who / which / that / where / whose`,
    goal: `Сможешь объяснить, о ком или о чём речь: «парень, который…»`,
    rule: 'relative',
    steps: [
      { t: 'choice', q: `«Это девушка, которая работает в банке»`, topic: 'relative', opts: [
        { en: `This is the girl who works at the bank.`, ok: true },
        { en: `This is the girl which works at the bank.`, why: `О людях — who (или that), не which.` },
        { en: `This is the girl who she works at the bank.`, why: `who уже подлежащее — she лишнее.` },
      ] },
      { t: 'choice', q: `«Кофейня, где работает Джесс, открывается в 7»`, topic: 'relative', opts: [
        { en: `The coffee shop where Jess works opens at 7.`, ok: true },
        { en: `The coffee shop which Jess works opens at 7.`, why: `«Где» — where (или which Jess works at).` },
        { en: `The coffee shop what Jess works opens at 7.`, why: `what в значении «который» не используется.` },
      ] },
      { t: 'choice', q: `«Это сосед, чья собака лает всю ночь»`, topic: 'relative', opts: [
        { en: `This is the neighbor whose dog barks all night.`, ok: true },
        { en: `This is the neighbor who's dog barks all night.`, why: `who's = who is. «Чей» — whose.` },
        { en: `This is the neighbor who his dog barks all night.`, why: `«Чья собака» — одно слово whose: whose dog.` },
      ] },
      { t: 'choice', q: `«Пицца, которую я заказал, была холодной»`, topic: 'relative', opts: [
        { en: `The pizza I ordered was cold.`, ok: true },
        { en: `The pizza what I ordered was cold.`, why: `what нельзя. Можно that / which или вообще без слова.` },
        { en: `The pizza that I ordered it was cold.`, why: `it лишнее — the pizza уже подлежащее.` },
      ] },
      { t: 'build', q: `Составь: «Маркус — таксист, который знает каждую улицу»`, topic: 'relative', answer: `Marcus is a cab driver who knows every street`, extra: ['which', 'what', 'know'], hints: [{ extra: 'which', text: `О человеке — who.` }, { extra: 'know', text: `who = он → knows.` }] },
      { t: 'build', q: `Составь: «Это квартира, о которой я тебе говорил»`, topic: 'relative', answer: `This is the apartment I told you about`, extra: ['what', 'said', 'it'], hints: [{ extra: 'what', text: `what нельзя. Слово «которой» можно опустить.` }, { extra: 'said', text: `Говорить кому-то — told you.` }] },
      { t: 'build', q: `Составь: «Тони продаёт хот-доги, которые все любят»`, topic: 'relative', answer: `Tony sells hot dogs that everyone loves`, extra: ['who', 'what', 'love'], hints: [{ extra: 'who', text: `О вещах — that / which, не who.` }, { extra: 'love', text: `everyone — как he → loves.` }] },
      { t: 'build', q: `Составь: «Это парк, где мы с Сэмом познакомились»`, topic: 'relative', answer: `This is the park where Sam and I met`, extra: ['which', 'what', 'meet'], hints: [{ extra: 'which', text: `«Где» — where.` }, { extra: 'meet', text: `Познакомились — прошлое: met.` }] },
      { t: 'type', q: `Напиши по-английски: «Женщина, которая живёт наверху, — моя хозяйка квартиры»`, topic: 'relative', example: `The woman who lives upstairs is my landlady.`, answers: ['The woman who lives upstairs is my landlady', 'The woman that lives upstairs is my landlady', 'The lady who lives upstairs is my landlady', 'The lady that lives upstairs is my landlady', 'The woman who lives upstairs is my landlord'], hints: [{ extra: 'which', text: `О человеке — who / that.` }, { extra: 'live', text: `who = она → lives.` }, { extra: 'she', text: `who уже подлежащее — she не нужно.` }] },
      { t: 'type', q: `Напиши по-английски: «Я знаю парня, чей брат работает в полиции»`, topic: 'relative', example: `I know a guy whose brother is a cop.`, answers: ['I know a guy whose brother is a cop', 'I know a guy whose brother is a police officer', 'I know a guy whose brother is a policeman', 'I know a guy whose brother works for the police', 'I know a guy whose brother works for the NYPD', 'I know a guy whose brother is in the police'], hints: [{ extra: 'who', text: `«Чей» — whose.` }, { extra: 'his', text: `whose уже значит «чей» — his не нужно.` }] },
      { t: 'type', q: `Напиши по-английски: «Где книга, которую я купил вчера?»`, topic: 'relative', example: `Where's the book I bought yesterday?`, answers: ['Where is the book I bought yesterday', 'Where is the book that I bought yesterday', 'Where is the book which I bought yesterday'], hints: [{ extra: 'what', text: `what нельзя: the book (that) I bought.` }, { extra: 'it', text: `it лишнее.` }] },
      { t: 'type', q: `Напиши по-английски: «Бруклин — место, где я хочу жить»`, topic: 'relative', example: `Brooklyn is the place where I want to live.`, answers: ['Brooklyn is the place where I want to live', 'Brooklyn is a place where I want to live', 'Brooklyn is the place I want to live', 'Brooklyn is the place I want to live in', 'Brooklyn is the place that I want to live in', 'Brooklyn is the place which I want to live in'], hints: [{ extra: 'what', text: `«Где» — where.` }, { extra: 'which', text: `«Место, где» — where (или which … live in).` }] },
    ],
  },

  // ===================== 15. Passive =====================
  {
    id: 'passive',
    level: 'B1',
    title: `Пассив: It was built in 1931`,
    goal: `Сможешь сказать, что с чем-то сделали, не называя, кто`,
    rule: 'passive',
    steps: [
      { t: 'choice', q: `«Эту пиццерию открыли в 1924 году»`, topic: 'passive', opts: [
        { en: `This pizzeria was opened in 1924.`, ok: true },
        { en: `This pizzeria was open in 1924.`, why: `open — «открытый» (было открыто). «Открыли» — was opened.` },
        { en: `This pizzeria is opened in 1924.`, why: `1924 — прошлое: was opened.` },
      ] },
      { t: 'choice', q: `Доктор Ортис спрашивает: «Где вы родились?»`, topic: 'passive', opts: [
        { en: `Where were you born?`, ok: true },
        { en: `Where did you born?`, why: `born — пассив: Where were you born?` },
        { en: `Where are you born?`, why: `Родился — в прошлом: were born.` },
      ] },
      { t: 'choice', q: `Вывеска: «Здесь говорят по-испански»`, topic: 'passive', opts: [
        { en: `Spanish is spoken here.`, ok: true },
        { en: `Spanish is speaking here.`, why: `Испанский сам не говорит — пассив: is spoken.` },
        { en: `Spanish speaks here.`, why: `Нужен пассив: be + V3 — is spoken.` },
      ] },
      { t: 'choice', q: `«Мою машину эвакуировали!»`, topic: 'passive', opts: [
        { en: `My car was towed!`, ok: true },
        { en: `My car towed!`, why: `Машина сама ничего не делала — was towed.` },
        { en: `My car was tow!`, why: `После was — 3-я форма: towed.` },
      ] },
      { t: 'tip', title: `get вместо be — по-американски`, text: `В разговоре американцы часто делают пассив с **get**, особенно когда случилось что-то неожиданное или неприятное:\n*My car **got towed**. My phone **got stolen**. He **got fired**. We **got stuck** in traffic.*\n\nЭто то же самое, что was towed / was stolen, только разговорнее.` },
      { t: 'build', q: `Составь: «Кошелёк Дева украли в метро»`, topic: 'passive', answer: `Dev's wallet was stolen on the subway`, extra: ['stole', 'is', 'in'], hints: [{ extra: 'stole', text: `Пассив: was + 3-я форма — stolen.` }, { extra: 'in', text: `В метро (в поезде) — on the subway.` }] },
      { t: 'build', q: `Составь: «Завтрак подают до 11»`, topic: 'passive', answer: `Breakfast is served until 11`, extra: ['serves', 'are', 'to'], hints: [{ extra: 'serves', text: `Завтрак сам не подаёт — is served.` }, { extra: 'to', text: `«До» (по времени) — until.` }] },
      { t: 'build', q: `Составь: «Квартиру уже покрасили»`, topic: 'passive', answer: `The apartment has already been painted`, extra: ['have', 'painting', 'paints'], hints: [{ extra: 'painting', text: `Пассив: has been + 3-я форма — painted.` }, { missing: 'been', text: `Present Perfect в пассиве: has been painted.` }] },
      { t: 'build', q: `Составь: «Эту песню исполнял Фрэнк Синатра?»`, topic: 'passive', answer: `Was this song sung by Frank Sinatra?`, extra: ['did', 'sang', 'from'], hints: [{ extra: 'sang', text: `sing → sang → sung. В пассиве — sung.` }, { extra: 'from', text: `Кем — by.` }] },
      { t: 'type', q: `Напиши по-английски: «Я родился в Москве»`, topic: 'passive', example: `I was born in Moscow.`, answers: ['I was born in Moscow'], hints: [{ missing: 'was', text: `Родиться — be born: I was born.` }, { extra: 'am', text: `О прошлом — was born.` }, { extra: 'borned', text: `Просто born.` }] },
      { t: 'type', q: `Напиши по-английски: «У меня украли телефон!»`, topic: 'passive', example: `My phone was stolen!`, answers: ['My phone was stolen', 'My phone got stolen', 'My phone has been stolen', 'Someone stole my phone', 'Somebody stole my phone'], hints: [{ extra: 'stole', text: `Пассив: was stolen.` }, { extra: 'steal', text: `steal → stole → stolen.` }] },
      { t: 'type', q: `Напиши по-английски: «Английский изучают во всём мире»`, topic: 'passive', example: `English is studied all over the world.`, answers: ['English is studied all over the world', 'English is learned all over the world', 'English is studied around the world', 'English is learned around the world', 'English is studied everywhere in the world', 'English is learned everywhere in the world'], hints: [{ extra: 'studies', text: `Английский сам не учит — is studied.` }, { missing: 'is', text: `Пассив: is + 3-я форма.` }] },
      { t: 'type', q: `Напиши по-английски: «Квартиру уберут завтра»`, topic: 'passive', example: `The apartment will be cleaned tomorrow.`, answers: ['The apartment will be cleaned tomorrow', 'The apartment is going to be cleaned tomorrow', 'The apartment is being cleaned tomorrow'], hints: [{ missing: 'be', text: `Будущее в пассиве: will be cleaned.` }, { extra: 'clean', text: `После be — 3-я форма: cleaned.` }] },
    ],
  },

  // ===================== 16. Question tags =====================
  {
    id: 'question_tags',
    level: 'B1',
    title: `Хвостики: isn't it? didn't you?`,
    goal: `Сможешь переспросить и поддержать разговор: «…, да? правда?»`,
    newRule: {
      id: 'question_tags', level: 'B1', title: `Разделительные вопросы: It's cold, isn't it?`, topics: [],
      short: `«…, да?» по-английски — хвостик из вспомогательного глагола: You're new here, aren't you?`,
      text: `Русское «…, да?», «…, правда?», «не так ли?» по-английски — **хвостик** (question tag) в конце фразы.

**Правило «плюс-минус»:**
Утверждение **+** → хвостик **−**: It's cold, **isn't it**?
Отрицание **−** → хвостик **+**: Tony didn't call, **did he**?

**Хвостик повторяет вспомогательный глагол** из предложения:
be: You'**re** new here, **aren't you**? It **was** fun, **wasn't it**?
Present Simple → do / does: You **like** pizza, **don't you**? Jess **works** here, **doesn't she**?
Past Simple → did: You **saw** it, **didn't you**?
have (Present Perfect): You'**ve been** to Coney Island, **haven't you**?
can / will: We **can** walk, **can't we**? You'**ll** come, **won't you**?

**В хвостике — местоимение:** Jess is nice, isn't **she**? (не isn't Jess)

**Особые случаи:** I'm right, **aren't I**? · Let's go, **shall we**? (в Америке чаще просто Let's go, OK?)

**Главная ловушка для русских:** ставить **isn't it?** везде, как «да?». You like coffee, isn't it? — ошибка → **don't you**?
**Проще всего по-американски:** универсальное **…, right?** — You're from Russia, **right**?

**Интонация:** вниз ↘ — ждёшь согласия; вверх ↗ — правда сомневаешься.`,
      formula: `+ предложение, − хвостик? · − предложение, + хвостик?`,
      examples: [
        [`It's cold today, isn't it?`, `Сегодня холодно, да?`],
        [`You're new here, aren't you?`, `Ты здесь новенький, да?`],
        [`Tony didn't call, did he?`, `Тони не звонил, да?`],
        [`You've been to Coney Island, haven't you?`, `Ты ведь был на Кони-Айленде?`],
        [`We can take a cab, can't we?`, `Мы же можем взять такси?`],
      ],
      mistakes: [
        [`You like pizza, isn't it?`, `You like pizza, don't you? — like → do`],
        [`She didn't come, didn't she?`, `She didn't come, did she? — после отрицания хвостик положительный`],
        [`Jess is nice, isn't Jess?`, `Jess is nice, isn't she? — в хвостике местоимение`],
      ],
      quiz: [],
    },
    steps: [
      { t: 'choice', q: `«Ты из России, да?»`, topic: 'question_tags', opts: [
        { en: `You're from Russia, aren't you?`, ok: true },
        { en: `You're from Russia, isn't it?`, why: `Подлежащее you, глагол are — хвостик aren't you.` },
        { en: `You're from Russia, don't you?`, why: `В предложении are, а не do — хвостик aren't you.` },
      ] },
      { t: 'choice', q: `«Тебе нравится Нью-Йорк, правда?»`, topic: 'question_tags', opts: [
        { en: `You like New York, don't you?`, ok: true },
        { en: `You like New York, isn't it?`, why: `like — Present Simple, хвостик с do: don't you.` },
        { en: `You like New York, doesn't you?`, why: `С you — do: don't you.` },
      ] },
      { t: 'choice', q: `«Маркус вчера не звонил, да?»`, topic: 'question_tags', opts: [
        { en: `Marcus didn't call yesterday, did he?`, ok: true },
        { en: `Marcus didn't call yesterday, didn't he?`, why: `После отрицания хвостик положительный: did he.` },
        { en: `Marcus didn't call yesterday, does he?`, why: `Прошлое — did, не does.` },
      ] },
      { t: 'choice', q: `«Мы же можем дойти пешком, да?»`, topic: 'question_tags', opts: [
        { en: `We can walk there, can't we?`, ok: true },
        { en: `We can walk there, don't we?`, why: `В предложении can — хвостик тоже с can: can't we.` },
        { en: `We can walk there, can't us?`, why: `В хвостике — форма «кто»: we, а не us.` },
      ] },
      { t: 'tip', title: `Ленивый вариант: right?`, text: `Не успеваешь сообразить хвостик? Американцы постоянно говорят просто **right?**\n*You're new here, **right**? Jess works on Sundays, **right**?*\n\nНо узнавать настоящие хвостики важно — Миссис Родригес обожает: *You paid the rent, **didn't you**?*` },
      { t: 'build', q: `Составь: «Сегодня холодно, да?»`, topic: 'question_tags', answer: `It's cold today, isn't it?`, extra: ['is', "doesn't", "wasn't"], hints: [{ extra: 'does', text: `В предложении is — хвостик isn't it.` }, { extra: 'was', text: `Сейчас (it's) — хвостик isn't it.` }] },
      { t: 'build', q: `Составь: «Ты здесь новенький, да?»`, topic: 'question_tags', answer: `You're new here, aren't you?`, extra: ["isn't", 'are', "don't"], hints: [{ extra: 'is', text: `С you — are: aren't you.` }, { extra: 'do', text: `В предложении are — хвостик aren't you.` }] },
      { t: 'build', q: `Составь: «Джесс не работает по воскресеньям, да?»`, topic: 'question_tags', answer: `Jess doesn't work on Sundays, does she?`, extra: ['is', 'it', 'do'], hints: [{ extra: 'it', text: `Джесс — she: does she.` }, { extra: 'is', text: `Present Simple — хвостик с does.` }] },
      { t: 'build', q: `Составь: «Ты ведь был на Кони-Айленде?»`, topic: 'question_tags', answer: `You've been to Coney Island, haven't you?`, extra: ["didn't", "aren't", 'was'], hints: [{ extra: 'did', text: `В предложении have (you've been) — хвостик haven't you.` }, { extra: 'are', text: `Хвостик повторяет have: haven't you.` }] },
      { t: 'type', q: `Напиши по-английски: «Тони продаёт лучшие хот-доги, правда?» (с хвостиком)`, topic: 'question_tags', example: `Tony sells the best hot dogs, doesn't he?`, answers: [`Tony sells the best hot dogs doesn't he`], hints: [{ extra: 'is', text: `sells — Present Simple, хвостик с does: doesn't he.` }, { extra: 'right', text: `Попробуй настоящий хвостик: doesn't he?` }, { missing: 'he', text: `Тони — he: doesn't he.` }] },
      { t: 'type', q: `Напиши по-английски: «Ты не голоден, да?» (с хвостиком)`, topic: 'question_tags', example: `You're not hungry, are you?`, answers: ['You are not hungry are you'], hints: [{ extra: 'do', text: `В предложении are — хвостик тоже с are.` }, { single: true, text: `После отрицания хвостик положительный: You're not hungry, are you?` }] },
      { t: 'type', q: `Напиши по-английски: «Вчера было весело, да?» (с хвостиком)`, topic: 'question_tags', example: `It was fun yesterday, wasn't it?`, answers: [`It was fun yesterday wasn't it`, `Yesterday was fun wasn't it`], hints: [{ extra: 'is', text: `Прошлое: was → хвостик wasn't it.` }, { extra: 'did', text: `В предложении was — хвостик wasn't it.` }] },
      { t: 'type', q: `Напиши по-английски: «Ты видел новую квартиру Дева, да?» (с хвостиком)`, topic: 'question_tags', example: `You've seen Dev's new apartment, haven't you?`, answers: [`You have seen Dev's new apartment haven't you`, `You've seen Dev's new apartment haven't you`, `You saw Dev's new apartment didn't you`], hints: [{ extra: 'do', text: `You've seen → haven't you; You saw → didn't you.` }, { extra: 'is', text: `Хвостик повторяет have: haven't you.` }] },
    ],
  },

  // ===================== 17. Indirect questions =====================
  {
    id: 'indirect_questions',
    level: 'B1',
    title: `Вежливые вопросы: Do you know where…?`,
    goal: `Сможешь вежливо спросить дорогу и уточнить что угодно у незнакомца`,
    newRule: {
      id: 'indirect_questions', level: 'B1', title: `Косвенные вопросы: Do you know where the station is?`, topics: [],
      short: `После Do you know / Could you tell me — прямой порядок слов и без do: where the station is.`,
      text: `Спросить незнакомца в лоб «Where is the station?» — нормально, но вежливее начать с **Excuse me, do you know…?** или **Could you tell me…?**

**Главное:** после такого начала вторая часть — **как утверждение**: сначала **кто**, потом **глагол**. Никаких do / does / did!
Where **is the station**? → Could you tell me where **the station is**?
What time **does the bank open**? → Do you know what time **the bank opens**? (does исчезает, а -s переходит к глаголу)
Where **did he go**? → Do you know where **he went**?

**Вопрос «да / нет» → if (или whether):**
**Is** Dr. Ortiz in today? → Do you know **if** Dr. Ortiz **is** in today?

**Другие начала:** Can you tell me…? · I wonder… (интересно…) · I don't know… · I'm not sure… · Any idea…?
После I wonder / I don't know вопросительного знака нет: I wonder how much this costs.

**Ловушка для русских:** «Вы не знаете, **где находится** станция?» — по-русски порядок не меняется, и хочется сказать where **is the station**. Нет: where **the station is**.`,
      formula: `Do you know / Could you tell me + where / what / if + кто + глагол`,
      examples: [
        [`Could you tell me where the nearest subway station is?`, `Не подскажете, где ближайшая станция метро?`],
        [`Do you know what time the bank opens?`, `Вы не знаете, во сколько открывается банк?`],
        [`Do you know if Tony is working today?`, `Не знаешь, Тони сегодня работает?`],
        [`I wonder how much this apartment costs.`, `Интересно, сколько стоит эта квартира.`],
        [`Can you tell me how I get to Coney Island?`, `Не подскажете, как добраться до Кони-Айленда?`],
      ],
      mistakes: [
        [`Do you know where is the station?`, `Do you know where the station is?`],
        [`Can you tell me what time does it open?`, `Can you tell me what time it opens?`],
        [`Do you know is she home?`, `Do you know if she's home?`],
      ],
      quiz: [],
    },
    steps: [
      { t: 'choice', q: `«Не подскажете, где ближайшая станция метро?»`, topic: 'indirect_questions', opts: [
        { en: `Could you tell me where the nearest subway station is?`, ok: true },
        { en: `Could you tell me where is the nearest subway station?`, why: `После Could you tell me — прямой порядок: where the station is.` },
        { en: `Could you tell me where does the nearest subway station?`, why: `does здесь не нужен, а глагол is потерян: where … is.` },
      ] },
      { t: 'choice', q: `«Вы не знаете, во сколько открывается банк?»`, topic: 'indirect_questions', opts: [
        { en: `Do you know what time the bank opens?`, ok: true },
        { en: `Do you know what time does the bank open?`, why: `Во второй части без does: what time the bank opens.` },
        { en: `Do you know what time the bank open?`, why: `the bank = it → opens (с -s).` },
      ] },
      { t: 'choice', q: `«Не знаешь, Прия сегодня работает?»`, topic: 'indirect_questions', opts: [
        { en: `Do you know if Priya is working today?`, ok: true },
        { en: `Do you know is Priya working today?`, why: `Вопрос «да / нет» внутри — через if: if Priya is working.` },
        { en: `Do you know if is Priya working today?`, why: `После if — прямой порядок: if Priya is.` },
      ] },
      { t: 'choice', q: `«Интересно, сколько стоит эта квартира»`, topic: 'indirect_questions', opts: [
        { en: `I wonder how much this apartment costs.`, ok: true },
        { en: `I wonder how much does this apartment cost?`, why: `После I wonder — как утверждение, без does и без вопросительного знака.` },
        { en: `I wonder how much costs this apartment.`, why: `Сначала кто (this apartment), потом глагол (costs).` },
      ] },
      { t: 'build', q: `Составь: «Вы не знаете, где живёт Дев?»`, topic: 'indirect_questions', answer: `Do you know where Dev lives?`, extra: ['does', 'live', 'is'], hints: [{ extra: 'does', text: `Во второй части без does: where Dev lives.` }, { extra: 'live', text: `Dev = he → lives.` }] },
      { t: 'build', q: `Составь: «Не подскажете, сколько стоит билет?»`, topic: 'indirect_questions', answer: `Could you tell me how much the ticket costs?`, extra: ['does', 'cost', 'is'], hints: [{ extra: 'does', text: `Без does: how much the ticket costs.` }, { extra: 'cost', text: `the ticket = it → costs.` }] },
      { t: 'build', q: `Составь: «Я не знаю, когда приедет Маркус»`, topic: 'indirect_questions', answer: `I don't know when Marcus is coming`, extra: ['does', 'if', 'comes'], hints: [{ extra: 'does', text: `Во второй части — как утверждение: when Marcus is coming.` }, { extra: 'if', text: `Есть слово «когда» — when, а не if.` }] },
      { t: 'build', q: `Составь: «Ты не знаешь, бассейн открыт?»`, topic: 'indirect_questions', answer: `Do you know if the pool is open?`, extra: ['does', 'opens', 'that'], hints: [{ extra: 'that', text: `Вопрос «да / нет» — if.` }, { extra: 'opens', text: `«Открыт» — is open.` }] },
      { t: 'type', q: `Напиши по-английски: «Вы не знаете, где здесь туалет?»`, topic: 'indirect_questions', example: `Do you know where the restroom is?`, answers: ['Do you know where the * is', 'Could you tell me where the * is', 'Can you tell me where the * is', 'Do you know where the * is around here', 'Do you know where the * is here', 'Excuse me do you know where the * is', 'Excuse me could you tell me where the * is', 'Excuse me can you tell me where the * is', 'Excuse me do you know where the * is around here', 'Excuse me do you know where the * is here'], hints: [{ extra: 'does', text: `Без does: where the restroom is.` }, { single: true, text: `Порядок: Do you know where + the restroom + is?` }] },
      { t: 'type', q: `Напиши по-английски: «Не подскажете, во сколько закрывается аптека?»`, topic: 'indirect_questions', example: `Could you tell me what time the pharmacy closes?`, answers: ['Could you tell me what time the * closes', 'Can you tell me what time the * closes', 'Do you know what time the * closes', 'Could you tell me when the * closes', 'Can you tell me when the * closes', 'Do you know when the * closes', 'Excuse me could you tell me what time the * closes', 'Excuse me can you tell me what time the * closes', 'Excuse me do you know what time the * closes', 'Excuse me could you tell me when the * closes', 'Excuse me can you tell me when the * closes', 'Excuse me do you know when the * closes'], hints: [{ extra: 'does', text: `Без does: what time the pharmacy closes.` }, { extra: 'close', text: `the pharmacy = it → closes.` }] },
      { t: 'type', q: `Напиши по-английски: «Ты не знаешь, Сэм дома?»`, topic: 'indirect_questions', example: `Do you know if Sam is home?`, answers: ['Do you know if Sam is home', 'Do you know if Sam is at home', 'Do you know whether Sam is home', 'Do you know whether Sam is at home', 'Excuse me do you know if Sam is home', 'Excuse me do you know if Sam is at home', 'Excuse me do you know whether Sam is home', 'Excuse me do you know whether Sam is at home'], hints: [{ missing: 'if', text: `Вопрос «да / нет» внутри — через if.` }, { single: true, text: `Do you know if + Sam + is home?` }] },
      { t: 'type', q: `Напиши по-английски: «Я не помню, куда положил ключи»`, topic: 'indirect_questions', example: `I don't remember where I put my keys.`, answers: ['I do not remember where I put *', 'I do not remember where I left *', 'I can not remember where I put *', 'I can not remember where I left *'], hints: [{ extra: 'did', text: `Без did: where I put my keys.` }] },
    ],
  },

  // ===================== 18. Reported speech =====================
  {
    id: 'reported',
    level: 'B1',
    title: `Косвенная речь: She said that…`,
    goal: `Сможешь пересказать, что тебе сказали и о чём спросили`,
    rule: 'reported',
    steps: [
      { t: 'choice', q: `«Джесс сказала, что опоздает»`, topic: 'reported', opts: [
        { en: `Jess said she would be late.`, ok: true },
        { en: `Jess said me she would be late.`, why: `say — без «кому». С кому — told me.` },
        { en: `Jess told that she would be late.`, why: `После tell нужно «кому»: told me (или просто said).` },
      ] },
      { t: 'choice', q: `«Он спросил, где я работаю»`, topic: 'reported', opts: [
        { en: `He asked where I worked.`, ok: true },
        { en: `He asked where did I work.`, why: `В косвенном вопросе — прямой порядок, без did: where I worked.` },
        { en: `He asked where do I work.`, why: `Без do и с прямым порядком: where I worked.` },
      ] },
      { t: 'choice', q: `«Миссис Родригес сказала мне, что починит душ»`, topic: 'reported', opts: [
        { en: `Mrs. Rodriguez told me she would fix the shower.`, ok: true },
        { en: `Mrs. Rodriguez said me she would fix the shower.`, why: `С «мне» — told me, а не said me.` },
        { en: `Mrs. Rodriguez told she would fix the shower.`, why: `После tell нужно «кому»: told me.` },
      ] },
      { t: 'choice', q: `«Маркус спросил, голоден ли я»`, topic: 'reported', opts: [
        { en: `Marcus asked if I was hungry.`, ok: true },
        { en: `Marcus asked was I hungry.`, why: `Вопрос «да / нет» в пересказе — через if: asked if I was.` },
        { en: `Marcus asked that I was hungry.`, why: `После asked — if (ли), не that.` },
      ] },
      { t: 'build', q: `Составь: «Она сказала, что устала»`, topic: 'reported', answer: `She said that she was tired`, extra: ['tell', 'says', 'were'], hints: [{ extra: 'says', text: `Рассказ о прошлом — said.` }, { extra: 'were', text: `С she — was.` }] },
      { t: 'build', q: `Составь: «Тони сказал мне, что может помочь»`, topic: 'reported', answer: `Tony told me he could help`, extra: ['said', 'tell', 'helps'], hints: [{ extra: 'said', text: `С «мне» — told me.` }, { extra: 'helps', text: `После could — начальная форма: help.` }] },
      { t: 'build', q: `Составь: «Доктор Ортис спросила, курю ли я»`, topic: 'reported', answer: `Dr. Ortiz asked if I smoked`, extra: ['do', 'did', 'that'], hints: [{ extra: 'do', text: `В пересказе вопроса — без do: if I smoked.` }, { extra: 'that', text: `«Ли» — if.` }] },
      { t: 'build', q: `Составь: «Сэм спросил, когда я вернусь домой»`, topic: 'reported', answer: `Sam asked when I would come home`, extra: ['did', 'do', 'said'], hints: [{ extra: 'did', text: `Прямой порядок, без did: when I would come.` }, { extra: 'said', text: `Вопрос — asked.` }] },
      { t: 'type', q: `Напиши по-английски: «Дев сказал, что потерял ключи»`, topic: 'reported', example: `Dev said he had lost his keys.`, answers: ['Dev said he had lost his keys', 'Dev said that he had lost his keys', 'Dev said he lost his keys', 'Dev said that he lost his keys'], hints: [{ extra: 'told', text: `Без «кому» — said.` }, { extra: 'my', text: `Ключи Дева — his keys.` }] },
      { t: 'type', q: `Напиши по-английски: «Прия спросила, есть ли у меня счёт в банке»`, topic: 'reported', example: `Priya asked if I had a bank account.`, answers: ['Priya asked if I had a bank account', 'Priya asked whether I had a bank account', 'Priya asked me if I had a bank account', 'Priya asked me whether I had a bank account'], hints: [{ extra: 'do', text: `Без do: asked if I had.` }, { missing: 'if', text: `«Есть ли» — if.` }, { extra: 'have', text: `Сдвиг времени: have → had.` }] },
      { t: 'type', q: `Напиши по-английски: «Маркус сказал мне, что знает короткую дорогу»`, topic: 'reported', example: `Marcus told me he knew a shortcut.`, answers: ['Marcus told me he knew a shortcut', 'Marcus told me that he knew a shortcut', 'Marcus told me he knew a short cut', 'Marcus told me he knows a shortcut', 'Marcus told me that he knows a shortcut'], hints: [{ extra: 'said', text: `С «мне» — told me.` }, { missing: 'me', text: `После tell — кому: told me.` }] },
      { t: 'type', q: `Напиши по-английски: «Мария спросила, умею ли я плавать»`, topic: 'reported', example: `Maria asked if I could swim.`, answers: ['Maria asked if I could swim', 'Maria asked me if I could swim', 'Maria asked whether I could swim', 'Maria asked me whether I could swim'], hints: [{ extra: 'can', text: `Сдвиг времени: can → could.` }, { missing: 'if', text: `«Умею ли» — if.` }] },
    ],
  },

  // ===================== 19. so / such =====================
  {
    id: 'so_such',
    level: 'B1',
    title: `so / such: так / такой`,
    goal: `Сможешь эмоционально сказать «так здорово!» и «такой классный день!»`,
    newRule: {
      id: 'so_such', level: 'B1', title: `so / such: It's so cold! It's such a nice day!`, topics: [],
      short: `so + прилагательное (so cold), such + a + прилагательное + существительное (such a nice day).`,
      text: `Русские «так» и «такой» по-английски — **so** и **such**. Выбор зависит от того, **есть ли существительное**.

**so + прилагательное / наречие** (без существительного):
The subway is **so crowded**! You speak **so fast**. Jess is **so nice**.

**such + a / an + (прилагательное) + существительное** (один предмет):
It's **such a nice day**! She's **such a good barista**. What a mess — **such a mess**!

**such + существительное во множественном или неисчисляемое** — без a:
They're **such nice people**. It's **such good coffee**.

**so many / so much + существительное:**
**so many** people / tourists (считаемые) · **so much** traffic / work / noise (не считаемые)

**Результат: so / such … that:**
It was **so cold that** we stayed home.
It was **such a cold day that** we stayed home.

**Ловушки для русских:**
It's **so nice day** ✗ → It's **such a nice day** ✓
They're **such a nice people** ✗ → **such nice people** ✓ (people — множественное)

**По-американски:** so — одно из самых частых слов в разговоре: I'm **so** tired! That's **so** cool! This pizza is **so** good!`,
      formula: `so + прил. · such a + прил. + сущ. · so many / so much + сущ.`,
      examples: [
        [`Jess is so nice!`, `Джесс такая милая!`],
        [`It's such a beautiful day!`, `Такой прекрасный день!`],
        [`There are so many people on the subway!`, `В метро столько людей!`],
        [`It was such a long day that I fell asleep on the train.`, `День был такой длинный, что я уснул в поезде.`],
        [`Why is New York so expensive?`, `Почему Нью-Йорк такой дорогой?`],
      ],
      mistakes: [
        [`It's so nice day.`, `It's such a nice day.`],
        [`They are such a nice people.`, `They are such nice people. — people во множественном, без a`],
        [`There is so much people.`, `There are so many people. — people считаемые`],
      ],
      quiz: [],
    },
    steps: [
      { t: 'choice', q: `«Сегодня такой хороший день!»`, topic: 'so_such', opts: [
        { en: `It's such a nice day!`, ok: true },
        { en: `It's so nice day!`, why: `Есть существительное (day) — нужно such a.` },
        { en: `It's such nice day!`, why: `Один день — нужен a: such a nice day.` },
      ] },
      { t: 'choice', q: `«Метро сегодня такое переполненное!»`, topic: 'so_such', opts: [
        { en: `The subway is so crowded today!`, ok: true },
        { en: `The subway is such crowded today!`, why: `Только прилагательное без существительного — so.` },
        { en: `The subway is such a crowded today!`, why: `После such a нужно существительное. Здесь — so crowded.` },
      ] },
      { t: 'choice', q: `«Здесь так много туристов!»`, topic: 'so_such', opts: [
        { en: `There are so many tourists here!`, ok: true },
        { en: `There are so much tourists here!`, why: `Туристов можно посчитать — many.` },
        { en: `There are such many tourists here!`, why: `С many и much — только so: so many.` },
      ] },
      { t: 'choice', q: `«Они такие приятные люди»`, topic: 'so_such', opts: [
        { en: `They're such nice people.`, ok: true },
        { en: `They're such a nice people.`, why: `people — множественное, a не нужен.` },
        { en: `They're so nice people.`, why: `Есть существительное (people) — such.` },
      ] },
      { t: 'build', q: `Составь: «Джесс такая добрая»`, topic: 'so_such', answer: `Jess is so kind`, extra: ['such', 'a', 'kindly'], hints: [{ extra: 'such', text: `Без существительного — so.` }, { extra: 'kindly', text: `После is — прилагательное: kind.` }] },
      { t: 'build', q: `Составь: «Это был такой длинный день»`, topic: 'so_such', answer: `It was such a long day`, extra: ['so', 'many', 'much'], hints: [{ extra: 'so', text: `Есть существительное (day) — such a.` }, { missing: 'a', text: `Один день — such a.` }] },
      { t: 'build', q: `Составь: «Было так холодно, что мы остались дома»`, topic: 'so_such', answer: `It was so cold that we stayed home`, extra: ['such', 'a', 'stay'], hints: [{ extra: 'such', text: `cold — прилагательное без существительного: so cold.` }, { extra: 'stay', text: `Прошлое — stayed.` }] },
      { t: 'build', q: `Составь: «В Нью-Йорке столько пробок!»`, topic: 'so_such', answer: `There is so much traffic in New York!`, extra: ['many', 'such', 'are'], hints: [{ extra: 'many', text: `traffic не считается — much.` }, { extra: 'are', text: `traffic — единственное: there is.` }] },
      { t: 'type', q: `Напиши по-английски: «Ты так быстро говоришь!»`, topic: 'so_such', example: `You speak so fast!`, answers: ['You speak so fast', 'You talk so fast', 'You are speaking so fast', 'You are talking so fast', 'You speak so quickly', 'You talk so quickly'], hints: [{ extra: 'such', text: `Без существительного — so.` }, { extra: 'very', text: `«Так» с эмоцией — so fast.` }] },
      { t: 'type', q: `Напиши по-английски: «Это такая отличная идея!»`, topic: 'so_such', example: `That's such a great idea!`, answers: ['That is such a great idea', 'It is such a great idea', 'This is such a great idea', 'That is such a good idea', 'It is such a good idea'], hints: [{ extra: 'so', text: `Есть существительное (idea) — such a.` }, { missing: 'a', text: `Одна идея — such a great idea.` }] },
      { t: 'type', q: `Напиши по-английски: «У меня так много работы»`, topic: 'so_such', example: `I have so much work.`, answers: ['I have so much work', 'I have so much work to do', 'I have got so much work', 'I have got so much work to do'], hints: [{ extra: 'many', text: `work не считается — much.` }, { extra: 'such', text: `С much — so: so much work.` }] },
      { t: 'type', q: `Напиши по-английски: «Это был такой вкусный хот-дог, что я заказал ещё один»`, topic: 'so_such', example: `It was such a good hot dog that I ordered another one.`, answers: ['It was such a * hot dog that I ordered another one', 'It was such a * hot dog that I ordered another', 'It was such a * hot dog that I got another one', 'It was such a * hot dog that I bought another one', 'It was such a * hot dog I ordered another one', 'The hot dog was so * that I ordered another one', 'The hot dog was so * that I got another one', 'The hot dog was so * I ordered another one'], hints: [{ extra: 'so', text: `Есть существительное (hot dog) — such a: such a good hot dog.` }, { missing: 'that', text: `Результат — such … that.` }] },
    ],
  },

  // ===================== 20. Linking words =====================
  {
    id: 'linking_words',
    level: 'B1',
    title: `Связки: although, however, despite, because of`,
    goal: `Сможешь связно рассказывать: «хотя…», «однако…», «несмотря на…», «из-за…»`,
    newRule: {
      id: 'linking_words', level: 'B1', title: `although / however / despite / because of / so that`, topics: [],
      short: `although + предложение, despite + существительное, because + предложение, because of + существительное.`,
      text: `Связки делают речь взрослой. Главное — что идёт **после** связки: целое предложение (кто + глагол) или просто существительное.

**Хотя / несмотря на:**
**although / even though** + предложение: **Although it was cold**, Maria swam in the ocean.
**despite / in spite of** + существительное или -ing: **Despite the rain**, we went out. **Despite being tired**, Dev went to the party.
⚠️ despite — **без of**; in spite **of** — с of.

**Однако:**
**however** — в начале нового предложения, с запятой: The apartment is small. **However**, it's cheap.
**but** — внутри одного предложения: The apartment is small, **but** it's cheap.

**Из-за / потому что:**
**because** + предложение: I was late **because there was** a lot of traffic.
**because of** + существительное: I was late **because of the traffic**.

**Чтобы:**
**to** + глагол: I'm saving money **to visit** Sam.
**so that** + предложение (часто с can / could / would): I left early **so that I wouldn't** miss the train. В разговоре — просто **so**: so I could…

**Ловушки для русских:**
«Хотя…, **но**…» — по-английски только одно: **Although** it was cold, ~~but~~ we swam.
«Несмотря на то, что он устал» — **не** despite he was tired, а **although** he was tired (или despite **being** tired).
«Из-за дождя» — because **of** the rain, не because the rain.`,
      formula: `although + кто + глагол · despite + сущ. / -ing · because of + сущ. · so that + кто + глагол`,
      examples: [
        [`Although the rent is high, I love my apartment.`, `Хотя аренда высокая, я люблю свою квартиру.`],
        [`Despite the traffic, Marcus got us there on time.`, `Несмотря на пробки, Маркус довёз нас вовремя.`],
        [`The flight was canceled because of the storm.`, `Рейс отменили из-за шторма.`],
        [`I'm saving money so that I can visit Sam.`, `Я коплю деньги, чтобы съездить к Сэму.`],
        [`The bagels are great. However, the line is always long.`, `Бейглы отличные. Однако очередь всегда длинная.`],
      ],
      mistakes: [
        [`Despite it was raining, we went out.`, `Although it was raining, we went out. / Despite the rain, we went out.`],
        [`I was late because the traffic.`, `I was late because of the traffic.`],
        [`Although it was cold, but we swam.`, `Although it was cold, we swam. — без but`],
      ],
      quiz: [],
    },
    steps: [
      { t: 'choice', q: `«Хотя было холодно, Мария плавала в океане»`, topic: 'linking_words', opts: [
        { en: `Although it was cold, Maria swam in the ocean.`, ok: true },
        { en: `Although it was cold, but Maria swam in the ocean.`, why: `«Хотя…, но» — по-английски только одно слово: although без but.` },
        { en: `Despite it was cold, Maria swam in the ocean.`, why: `После despite — существительное, не предложение. С предложением — although.` },
      ] },
      { t: 'choice', q: `«Поезд опоздал из-за снега»`, topic: 'linking_words', opts: [
        { en: `The train was late because of the snow.`, ok: true },
        { en: `The train was late because the snow.`, why: `Перед существительным — because of.` },
        { en: `The train was late because of it snowed.`, why: `После because of — существительное. С предложением — because it snowed.` },
      ] },
      { t: 'choice', q: `«Несмотря на пробки, Маркус приехал вовремя»`, topic: 'linking_words', opts: [
        { en: `Despite the traffic, Marcus arrived on time.`, ok: true },
        { en: `Despite of the traffic, Marcus arrived on time.`, why: `despite — без of (in spite of — с of).` },
        { en: `Although the traffic, Marcus arrived on time.`, why: `После although — целое предложение. С существительным — despite.` },
      ] },
      { t: 'choice', q: `«Квартира маленькая. Однако она дешёвая.»`, topic: 'linking_words', opts: [
        { en: `The apartment is small. However, it's cheap.`, ok: true },
        { en: `The apartment is small. Despite, it's cheap.`, why: `despite не стоит один — нужно существительное. «Однако» — however.` },
        { en: `The apartment is small. Because of, it's cheap.`, why: `because of — «из-за». «Однако» — however.` },
      ] },
      { t: 'tip', title: `«Чтобы»: to или so that?`, text: `Если «чтобы» + просто действие — **to**: *I came to New York **to work**.*\nЕсли после «чтобы» своё подлежащее или отрицание — **so that**: *I left early **so that I wouldn't** be late. I'm saving **so that Sam can** visit.*\n\nНикогда не говори **for to** — это русская калька «для того, чтобы».` },
      { t: 'build', q: `Составь: «Я ушёл рано, чтобы не опоздать на поезд»`, topic: 'linking_words', answer: `I left early so that I wouldn't miss the train`, extra: ['for', "don't", 'to'], hints: [{ extra: 'for', text: `«Чтобы» с предложением — so that.` }, { extra: 'do', text: `После so that в прошлом — wouldn't.` }] },
      { t: 'build', q: `Составь: «Мы остались дома из-за дождя»`, topic: 'linking_words', answer: `We stayed home because of the rain`, extra: ['despite', 'it', 'rained'], hints: [{ extra: 'despite', text: `despite — «несмотря на». «Из-за» — because of.` }, { extra: 'rained', text: `После because of — существительное: the rain.` }] },
      { t: 'build', q: `Составь: «Дев пошёл на вечеринку, хотя устал»`, topic: 'linking_words', answer: `Dev went to the party although he was tired`, extra: ['but', 'despite', 'tiring'], hints: [{ extra: 'despite', text: `После despite нельзя целое предложение. Здесь — although.` }, { extra: 'but', text: `«Хотя» — although.` }] },
      { t: 'build', q: `Составь: «Мы пошли на пляж, несмотря на дождь»`, topic: 'linking_words', answer: `We went to the beach despite the rain`, extra: ['of', 'although', 'it'], hints: [{ extra: 'of', text: `despite — без of.` }, { extra: 'although', text: `Перед существительным — despite.` }] },
      { t: 'type', q: `Напиши по-английски: «Я опоздал из-за пробок»`, topic: 'linking_words', example: `I was late because of the traffic.`, answers: ['I was late because of the traffic', 'I was late because of traffic', 'I was late because of the traffic jams', 'I was late because of traffic jams', 'I was late because of a traffic jam', 'I was late because there was a lot of traffic'], hints: [{ missing: 'of', text: `Перед существительным — because of.` }, { extra: 'despite', text: `despite — «несмотря на». «Из-за» — because of.` }] },
      { t: 'type', q: `Напиши по-английски: «Хотя было поздно, кофейня Джесс ещё работала»`, topic: 'linking_words', example: `Although it was late, Jess's coffee shop was still open.`, answers: ['Although it was late * was still open', 'Even though it was late * was still open', '* was still open although it was late', '* was still open even though it was late'], hints: [{ extra: 'but', text: `«Хотя…» — although, без but.` }, { extra: 'despite', text: `С предложением (it was late) — although.` }] },
      { t: 'type', q: `Напиши по-английски: «Я коплю деньги, чтобы съездить к Сэму»`, topic: 'linking_words', example: `I'm saving money so that I can visit Sam.`, answers: ['I am saving money so that I can * Sam', 'I am saving money so I can * Sam', 'I am saving money to * Sam', 'I am saving up so that I can * Sam', 'I am saving up so I can * Sam', 'I am saving up to * Sam'], hints: [{ extra: 'for', text: `«Чтобы» — to или so that, без for.` }] },
      { t: 'type', q: `Напиши по-английски: «Еда была отличной. Однако обслуживание было медленным.»`, topic: 'linking_words', example: `The food was great. However, the service was slow.`, answers: ['The food was * However the service was slow', 'The food was * but the service was slow'], hints: [{ extra: 'despite', text: `«Однако» — however.` }, { extra: 'although', text: `«Однако» в начале предложения — however.` }] },
    ],
  },
];
