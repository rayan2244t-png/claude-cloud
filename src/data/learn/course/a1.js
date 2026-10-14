// Курс грамматики A1: 20 юнитов от приветствий до вежливых просьб.
// Каждый юнит опирается на правило из grammar.js (rule) и даёт 12+ упражнений:
// сначала узнавание (choice), потом сборка фразы (build), потом свободный ввод (type).
// Американский английский, ситуации из Бруклина и персонажи игры.

export default [
  // ===================== 1. Приветствия =====================
  {
    id: `greetings`,
    level: `A1`,
    title: `Приветствия и small talk`,
    goal: `Сможешь поздороваться, ответить на «How's it going?» и попрощаться по-американски`,
    rule: `greetings`,
    steps: [
      { t: `choice`, q: `Утро, Джесс у кофейной тележки: «Hey! How's it going?» Ответь естественно`, topic: `greetings`, opts: [
        { en: `Pretty good, thanks! You?`, ok: true },
        { en: `It goes normally.`, why: `Дословный перевод «нормально идёт». How's it going? — это просто «Как дела?», отвечают: Good / Pretty good!` },
        { en: `I go to the coffee shop.`, why: `Это не вопрос «куда ты идёшь». How's it going? = «Как дела?»` },
      ] },
      { t: `choice`, q: `Тони машет тебе: «What's up?» Что ответить?`, topic: `greetings`, opts: [
        { en: `Not much! You?`, ok: true },
        { en: `Up!`, why: `What's up? = «Как оно? Что нового?» Отвечают: Not much! (да ничего особенного)` },
        { en: `I am up.`, why: `I am up = «я проснулся». На What's up? отвечают Not much!` },
      ] },
      { t: `choice`, q: `Днём уходишь от тележки. Джесс: «Have a good one!» Что ответишь?`, topic: `greetings`, opts: [
        { en: `Thanks, you too!`, ok: true },
        { en: `Good night!`, why: `Good night говорят только поздно вечером или перед сном.` },
        { en: `Thanks, me too!`, why: `Тебе желают хорошего дня — желаешь в ответ ему: you too (тебе тоже), а не me too (мне тоже).` },
      ] },
      { t: `choice`, q: `Сэм знакомит тебя с Дэвом. Дэв: «Nice to meet you!» Ответь`, topic: `greetings`, opts: [
        { en: `Nice to meet you too!`, ok: true },
        { en: `Nice to meet me too!`, why: `Me — «меня». Ты рад познакомиться с ним: meet you.` },
        { en: `Me too nice!`, why: `Так не говорят. Повтори фразу и добавь too: Nice to meet you too!` },
      ] },
      { t: `tip`, title: `How are you? — это «привет»`, text: `В Америке **How are you?** / **How's it going?** — часть приветствия, а не настоящий вопрос. Кассир не ждёт рассказа о твоей жизни. Ответь коротко и спроси в ответ: **Good, thanks! You?**` },
      { t: `build`, q: `Составь: «Привет! Как дела?»`, topic: `greetings`, answer: `Hey! How's it going?`, extra: [`goes`, `are`, `what`], hints: [
        { extra: `goes`, text: `Устойчивая фраза: How's it going? — с going.` },
        { extra: `are`, text: `How's = How is. Are здесь не нужен: How's it going?` },
        { extra: `what`, text: `What's up — другая фраза. Здесь: How's it going?` },
      ] },
      { t: `build`, q: `Составь ответ: «Неплохо, спасибо! А ты?»`, topic: `greetings`, answer: `Pretty good, thanks! You?`, extra: [`and`, `well`, `me`], hints: [
        { extra: `well`, text: `Pretty good — самый частый ответ. Well здесь не нужен.` },
        { extra: `me`, text: `«А ты?» — You? (спрашиваешь о собеседнике).` },
        { extra: `and`, text: `В коротком разговорном ответе достаточно You?` },
      ] },
      { t: `build`, q: `Составь: «Приятно познакомиться!»`, topic: `greetings`, answer: `Nice to meet you!`, extra: [`with`, `me`, `meeting`], hints: [
        { extra: `with`, text: `Meet you — без with. По-русски «познакомиться с тобой», а по-английски просто meet you.` },
        { extra: `me`, text: `Ты рад познакомиться с ним — meet you, а не me.` },
        { extra: `meeting`, text: `При знакомстве: Nice to meet you. (Nice meeting you — при прощании.)` },
      ] },
      { t: `build`, q: `Составь: «Хорошего дня!» (как говорят продавцы)`, topic: `greetings`, answer: `Have a good one!`, extra: [`the`, `has`, `very`], hints: [
        { extra: `the`, text: `Устойчивая фраза с a: Have a good one!` },
        { extra: `has`, text: `Это пожелание — глагол в начальной форме: Have…` },
        { extra: `very`, text: `Very здесь не нужен: Have a good one!` },
      ] },
      { t: `type`, q: `Напиши по-английски: «Привет! Как дела?»`, topic: `greetings`, example: `Hi! How are you?`, answers: [
        `Hi how are you`, `Hey how are you`, `Hello how are you`,
        `Hi how's it going`, `Hey how's it going`, `Hello how's it going`,
        `Hi how are you doing`, `Hey how are you doing`, `Hello how are you doing`,
      ], hints: [
        { missing: `are`, text: `«Как дела?» — How are you? (с are).` },
        { extra: `is`, text: `С you — are: How are you?` },
        { single: true, text: `Начни с Hi или Hey, потом спроси: How are you?` },
      ] },
      { t: `type`, q: `Тебя спросили «How are you?» Ответь: «Хорошо, спасибо! А ты?»`, topic: `greetings`, example: `Good, thanks! You?`, answers: [
        `Good thanks you`, `Good thanks and you`, `Good thank you and you`,
        `I'm good thanks you`, `I'm good thanks and you`, `I'm good thank you and you`,
        `Good thanks how are you`, `I'm good thanks how are you`, `Good thank you how are you`,
        `Fine thanks and you`, `Fine thanks you`, `I'm fine thanks and you`, `Pretty good thanks you`,
      ], hints: [
        { missing: `thanks`, text: `Не забудь поблагодарить: Good, thanks!` },
        { extra: `well`, text: `Проще и естественнее: Good, thanks!` },
        { single: true, text: `Коротко: Good, thanks! You?` },
      ] },
      { t: `type`, q: `Напиши по-английски: «Увидимся позже!»`, topic: `greetings`, example: `See you later!`, answers: [`See you later`, `See ya later`, `Catch you later`], hints: [
        { extra: `will`, text: `Will не нужен — это готовая фраза: See you later!` },
        { missing: `you`, text: `See you — «увижу тебя», you обязательно.` },
        { single: true, text: `See you later! — увидимся позже.` },
      ] },
      { t: `type`, q: `Напиши по-английски: «Пока! Береги себя!»`, topic: `greetings`, example: `Bye! Take care!`, answers: [`Bye take care`, `Bye bye take care`, `Goodbye take care`, `See you take care`, `Take care bye`], hints: [
        { extra: `yourself`, text: `Готовая фраза: Take care! — без yourself.` },
        { extra: `keep`, text: `«Береги себя» по-английски — Take care!` },
        { single: true, text: `Две части: Bye! + Take care!` },
      ] },
    ],
  },

  // ===================== 2. to be =====================
  {
    id: `to_be`,
    level: `A1`,
    title: `Глагол to be: am / is / are`,
    goal: `Сможешь сказать, кто ты, откуда ты и как у тебя дела`,
    rule: `to_be`,
    steps: [
      { t: `choice`, q: `Маркус спрашивает, откуда ты. Скажи: «Я из России»`, topic: `to_be`, opts: [
        { en: `I'm from Russia.`, ok: true },
        { en: `I from Russia.`, why: `Пропущен глагол to be. По-русски «есть» не говорим, а в английском обязательно: I am (I'm).` },
        { en: `I'm from Russian.`, why: `Russian — «русский» (язык, человек). Страна — Russia.` },
      ] },
      { t: `choice`, q: `Расскажи про Джесс: «Она бариста»`, topic: `to_be`, opts: [
        { en: `She's a barista.`, ok: true },
        { en: `She are a barista.`, why: `С she — is: she is (she's).` },
        { en: `She barista.`, why: `Нет глагола to be и артикля: She's a barista.` },
      ] },
      { t: `choice`, q: `«Мы не голодны»`, topic: `to_be`, opts: [
        { en: `We aren't hungry.`, ok: true },
        { en: `We don't hungry.`, why: `Hungry — это «голодный» (прилагательное). С ним не don't, а to be: we are not (aren't).` },
        { en: `We isn't hungry.`, why: `С we — are: we aren't.` },
      ] },
      { t: `choice`, q: `Спроси Сэма: «Ты устал?»`, topic: `to_be`, opts: [
        { en: `Are you tired?`, ok: true },
        { en: `Do you tired?`, why: `Tired — «уставший», с ним нужен to be, а не do: Are you tired?` },
        { en: `Is you tired?`, why: `С you всегда are: Are you…?` },
      ] },
      { t: `build`, q: `Составь: «Я из Москвы»`, topic: `to_be`, answer: `I am from Moscow`, extra: [`is`, `in`, `of`], hints: [
        { extra: `is`, text: `С I — только am: I am.` },
        { extra: `in`, text: `In — «в». «Из» (откуда ты) — from.` },
        { extra: `of`, text: `«Откуда» — from, не of: I am from Moscow.` },
        { missing: `am`, text: `Не пропускай am! I am from Moscow.` },
      ] },
      { t: `build`, q: `Составь: «Маркус — таксист»`, topic: `to_be`, answer: `Marcus is a taxi driver`, extra: [`are`, `am`, `drives`], hints: [
        { extra: `are`, text: `Marcus = he, поэтому is.` },
        { extra: `am`, text: `Am — только с I. Marcus is…` },
        { extra: `drives`, text: `«Он таксист» — кто он: is a taxi driver.` },
      ] },
      { t: `build`, q: `Составь: «Мы не дома»`, topic: `to_be`, answer: `We are not at home`, extra: [`is`, `don't`, `in`], hints: [
        { extra: `is`, text: `С we — are.` },
        { extra: `do`, text: `С «где? какой?» не нужен don't. Отрицание to be: are not.` },
        { extra: `in`, text: `«Дома» — устойчиво: at home.` },
      ] },
      { t: `build`, q: `Составь вопрос: «Ты готов?»`, topic: `to_be`, answer: `Are you ready?`, extra: [`Do`, `is`, `your`], hints: [
        { extra: `do`, text: `Ready — «готовый», с ним to be: Are you ready?` },
        { extra: `is`, text: `С you — are.` },
        { extra: `your`, text: `Your — «твой». «Ты» — you.` },
      ] },
      { t: `type`, q: `Напиши по-английски: «Я устал»`, topic: `to_be`, example: `I'm tired.`, answers: [`I am tired`, `I am so tired`, `I am very tired`, `I am really tired`], hints: [
        { missing: `am`, text: `Нужен am: I am (I'm) tired.` },
        { extra: `is`, text: `С I — am, не is.` },
        { extra: `tiring`, text: `Tiring — «утомительный». О себе: I'm tired.` },
      ] },
      { t: `type`, q: `Напиши по-английски: «Он мой друг»`, topic: `to_be`, example: `He's my friend.`, answers: [`He is my friend`, `He is my buddy`], hints: [
        { missing: `is`, text: `He + is: He is (He's) my friend.` },
        { extra: `are`, text: `С he — is.` },
        { extra: `me`, text: `«Мой» — my.` },
      ] },
      { t: `type`, q: `Спроси: «Ты из Нью-Йорка?»`, topic: `to_be`, example: `Are you from New York?`, answers: [`Are you from New York`, `Are you from NYC`, `Are you from NY`, `Are you from New York City`], hints: [
        { missing: `are`, text: `В вопросе are ставим первым: Are you from…?` },
        { extra: `do`, text: `С from не нужен do: Are you from New York?` },
        { extra: `is`, text: `С you — are.` },
      ] },
      { t: `type`, q: `Напиши по-английски: «Мне не холодно»`, topic: `to_be`, example: `I'm not cold.`, answers: [`I am not cold`], hints: [
        { extra: `me`, text: `По-русски «мне холодно», а по-английски «я холодный»: I'm cold. Начинай с I.` },
        { extra: `do`, text: `Cold — прилагательное, нужен am: I'm not cold.` },
        { missing: `not`, text: `Отрицание: am not.` },
        { missing: `am`, text: `Нужен am: I am not cold.` },
      ] },
    ],
  },

  // ===================== 3. Местоимения =====================
  {
    id: `pronouns`,
    level: `A1`,
    title: `Местоимения: I / me / my`,
    goal: `Сможешь правильно сказать «я, меня, мой» — и так же про других людей`,
    rule: `pronouns`,
    steps: [
      { t: `choice`, q: `Сэму: «Позвони мне вечером»`, topic: `pronouns`, opts: [
        { en: `Call me tonight.`, ok: true },
        { en: `Call I tonight.`, why: `После глагола — me (меня, мне), а не I.` },
        { en: `Call to me tonight.`, why: `Call без to: call me.` },
      ] },
      { t: `choice`, q: `Миссис Родригес показывает квартиру. Ты: «Это моя квартира?»`, topic: `pronouns`, opts: [
        { en: `Is this my apartment?`, ok: true },
        { en: `Is this me apartment?`, why: `Чей? — my. Me — «меня, мне».` },
        { en: `Is this mine apartment?`, why: `Mine — без предмета (It's mine). Перед предметом — my.` },
      ] },
      { t: `choice`, q: `«Я её знаю»`, topic: `pronouns`, opts: [
        { en: `I know her.`, ok: true },
        { en: `I know she.`, why: `После глагола — her, а не she.` },
        { en: `I know hers.`, why: `Hers = «её» без предмета (It's hers). Здесь — her.` },
      ] },
      { t: `choice`, q: `«Мне нравится эта кофейня. Её кофе отличный»`, topic: `pronouns`, opts: [
        { en: `I like this coffee shop. Its coffee is great.`, ok: true },
        { en: `I like this coffee shop. It's coffee is great.`, why: `It's = it is. «Её» о предмете — its (без апострофа).` },
        { en: `I like this coffee shop. Her coffee is great.`, why: `Her — о женщине. Кофейня — it, значит its.` },
      ] },
      { t: `build`, q: `Составь: «Это его телефон»`, topic: `pronouns`, answer: `This is his phone`, extra: [`he`, `him`, `her`], hints: [
        { extra: `he`, text: `He — «он». Чей? — his.` },
        { extra: `him`, text: `Him — «его, ему» после глагола (I see him). Чей телефон? — his.` },
        { extra: `her`, text: `Her — «её». «Его» — his.` },
      ] },
      { t: `build`, q: `Составь: «Им нравится Джесс»`, topic: `pronouns`, answer: `They like Jess`, extra: [`Them`, `Their`, `are`], hints: [
        { extra: `them`, text: `По-русски «им нравится», а по-английски «они любят»: They like… Начинаем с They.` },
        { extra: `their`, text: `Their — «их» (чей?). Кто любит? — they.` },
        { extra: `are`, text: `Are не нужен: They like Jess.` },
      ] },
      { t: `build`, q: `Составь: «Его зовут Дэв»`, topic: `pronouns`, answer: `His name is Dev`, extra: [`He`, `Him`, `are`], hints: [
        { extra: `he`, text: `«Его зовут» = «его имя»: His name is…` },
        { extra: `him`, text: `Чьё имя? — his name.` },
        { extra: `are`, text: `Name — одно: is.` },
      ] },
      { t: `build`, q: `Составь: «Это для них»`, topic: `pronouns`, answer: `It's for them`, extra: [`they`, `their`, `to`], hints: [
        { extra: `they`, text: `После предлога (for) — them.` },
        { extra: `their`, text: `Their — «их» перед предметом. «Для них» — for them.` },
        { extra: `to`, text: `«Для» — for.` },
      ] },
      { t: `type`, q: `Напиши по-английски: «Позвони мне!»`, topic: `pronouns`, example: `Call me!`, answers: [`Call me`, `Call me please`, `Please call me`, `Give me a call`], hints: [
        { extra: `i`, text: `После глагола — me: Call me!` },
        { extra: `my`, text: `My — «мой». «Мне» — me.` },
        { extra: `to`, text: `Call без to: Call me!` },
      ] },
      { t: `type`, q: `Представься: «Меня зовут …» (своё имя)`, topic: `pronouns`, example: `My name is Anna.`, answers: [`My name is *`, `I'm *`, `My name's *`], hints: [
        { extra: `me`, text: `«Меня зовут» = «моё имя»: My name is…` },
        { missing: `name`, text: `My name is… — «моё имя…».` },
        { single: true, text: `Ответь полным предложением: My name is … или I'm …` },
      ] },
      { t: `type`, q: `Напиши по-английски: «Это наш друг Сэм»`, topic: `pronouns`, example: `This is our friend Sam.`, answers: [`This is our friend Sam`, `That is our friend Sam`, `This is our buddy Sam`], hints: [
        { extra: `us`, text: `Us — «нас». Чей друг? — our.` },
        { extra: `we`, text: `We — «мы». «Наш» — our.` },
        { missing: `our`, text: `«Наш» — our.` },
      ] },
      { t: `type`, q: `Напиши по-английски: «Я их люблю»`, topic: `pronouns`, example: `I love them.`, answers: [`I love them`, `I like them`, `I really like them`], hints: [
        { extra: `they`, text: `После глагола — them: I love them.` },
        { extra: `their`, text: `Their — «их» перед предметом (their dog). Здесь — them.` },
        { extra: `me`, text: `Начинай с I: I love them.` },
      ] },
    ],
  },

  // ===================== 4. Артикли =====================
  {
    id: `articles`,
    level: `A1`,
    title: `Артикли a / an / the`,
    goal: `Сможешь правильно сказать a coffee, an apple, the subway и «Я студент»`,
    rule: `articles`,
    steps: [
      { t: `choice`, q: `Миссис Родригес спрашивает, чем ты занимаешься. «Я студент»`, topic: `articles`, opts: [
        { en: `I'm a student.`, ok: true },
        { en: `I'm student.`, why: `Профессия или роль — всегда с a: I'm a student.` },
        { en: `I'm an student.`, why: `Student начинается с согласного звука — a, не an.` },
      ] },
      { t: `choice`, q: `«Мне нужен час»`, topic: `articles`, opts: [
        { en: `I need an hour.`, ok: true },
        { en: `I need a hour.`, why: `В hour буква h не читается, слово начинается с гласного звука — an hour.` },
        { en: `I need hour.`, why: `Hour можно посчитать, один час — нужен артикль: an hour.` },
      ] },
      { t: `choice`, q: `«Солнце сегодня жаркое»`, topic: `articles`, opts: [
        { en: `The sun is hot today.`, ok: true },
        { en: `A sun is hot today.`, why: `Солнце одно-единственное — the sun.` },
        { en: `Sun is hot today.`, why: `Нужен артикль: the sun (уникальный предмет).` },
      ] },
      { t: `choice`, q: `«Я люблю пиццу» (вообще)`, topic: `articles`, opts: [
        { en: `I love pizza.`, ok: true },
        { en: `I love a pizza.`, why: `Говорим о пицце вообще — без артикля.` },
        { en: `I love the pizza.`, why: `The — конкретная пицца («эту пиццу»). Вообще — без артикля.` },
      ] },
      { t: `tip`, title: `Звук, а не буква`, text: `a или an — решает **звук**, а не буква: **an** hour (h не слышно), **an** iced coffee, но **a** university (звук «ю»), **a** one-way ticket (звук «уа»).` },
      { t: `build`, q: `Составь: «Он таксист»`, topic: `articles`, answer: `He is a taxi driver`, extra: [`an`, `the`, `are`], hints: [
        { extra: `an`, text: `Taxi начинается с согласного: a taxi driver.` },
        { extra: `the`, text: `Профессия — с a: He is a taxi driver.` },
        { extra: `are`, text: `С he — is.` },
        { missing: `a`, text: `Профессия — всегда с a.` },
      ] },
      { t: `build`, q: `Составь: «У меня есть собака»`, topic: `articles`, answer: `I have a dog`, extra: [`an`, `the`, `has`], hints: [
        { extra: `an`, text: `Dog начинается с согласного: a dog.` },
        { extra: `the`, text: `Говорим о собаке впервые — a dog.` },
        { extra: `has`, text: `С I — have.` },
      ] },
      { t: `build`, q: `Спроси прохожего: «Где метро?» (в городе оно одно)`, topic: `articles`, answer: `Where is the subway?`, extra: [`a`, `metro`, `are`], hints: [
        { extra: `a`, text: `Метро в городе понятно какое — the subway.` },
        { extra: `metro`, text: `В Нью-Йорке говорят subway.` },
        { extra: `are`, text: `Subway — одно: is.` },
      ] },
      { t: `build`, q: `Составь: «Мне нравятся собаки» (вообще)`, topic: `articles`, answer: `I like dogs`, extra: [`the`, `a`, `likes`], hints: [
        { extra: `the`, text: `Собаки вообще — без артикля: I like dogs.` },
        { extra: `a`, text: `A — только с одним предметом. Dogs — много.` },
        { extra: `likes`, text: `С I — like, без -s.` },
      ] },
      { t: `type`, q: `Напиши по-английски: «Она врач»`, topic: `articles`, example: `She's a doctor.`, answers: [`She is a doctor`], hints: [
        { missing: `a`, text: `Профессия — всегда с a: a doctor.` },
        { extra: `the`, text: `The doctor — «тот самый врач». Просто профессия — a doctor.` },
        { extra: `an`, text: `Doctor начинается с согласного: a doctor.` },
      ] },
      { t: `type`, q: `У Тони: «Я хочу яблоко»`, topic: `articles`, example: `I want an apple.`, answers: [`I want an apple`, `I would like an apple`, `Can I get an apple`, `Can I have an apple`], hints: [
        { extra: `a`, text: `Apple начинается с гласного звука: an apple.` },
        { extra: `the`, text: `Говорим о каком-то яблоке впервые — an.` },
        { missing: `an`, text: `Перед гласным звуком — an: an apple.` },
      ] },
      { t: `type`, q: `Напиши по-английски: «Я люблю кофе» (вообще)`, topic: `articles`, example: `I love coffee.`, answers: [`I love coffee`, `I like coffee`, `I really like coffee`, `I really love coffee`], hints: [
        { extra: `the`, text: `Кофе вообще — без артикля: I love coffee.` },
        { extra: `a`, text: `Говорим о кофе вообще, а не об одной чашке — без a.` },
        { extra: `coffees`, text: `Coffee вообще — без -s.` },
      ] },
      { t: `type`, q: `Спроси: «Где автобусная остановка?» (та, что рядом)`, topic: `articles`, example: `Where's the bus stop?`, answers: [`Where is the bus stop`, `Excuse me where is the bus stop`], hints: [
        { missing: `the`, text: `Понятно, какая остановка (ближайшая) — the bus stop.` },
        { extra: `a`, text: `Конкретная, ближайшая остановка — the.` },
        { missing: `is`, text: `Нужен is: Where is…?` },
      ] },
    ],
  },

  // ===================== 5. Множественное число =====================
  {
    id: `plurals`,
    level: `A1`,
    title: `Множественное число`,
    goal: `Сможешь говорить о нескольких вещах и людях: two coffees, three children, many people`,
    rule: `plurals`,
    steps: [
      { t: `choice`, q: `Заказ у Тони: «Два хот-дога, пожалуйста»`, topic: `plurals`, opts: [
        { en: `Two hot dogs, please.`, ok: true },
        { en: `Two hot dog, please.`, why: `Больше одного — добавляем -s: hot dogs.` },
        { en: `Two hots dogs, please.`, why: `-s добавляется только к главному слову: hot dogs.` },
      ] },
      { t: `choice`, q: `«У неё трое детей»`, topic: `plurals`, opts: [
        { en: `She has three children.`, ok: true },
        { en: `She has three childs.`, why: `Child — исключение: children.` },
        { en: `She has three childrens.`, why: `Children уже мн. число, -s не нужен.` },
      ] },
      { t: `choice`, q: `«Люди в Нью-Йорке очень заняты»`, topic: `plurals`, opts: [
        { en: `People in New York are very busy.`, ok: true },
        { en: `Peoples in New York are very busy.`, why: `People уже мн. число («люди»), -s не нужен.` },
        { en: `People in New York is very busy.`, why: `People — мн. число, поэтому are.` },
      ] },
      { t: `choice`, q: `«Деньги важны»`, topic: `plurals`, opts: [
        { en: `Money is important.`, ok: true },
        { en: `Moneys are important.`, why: `Money — неисчисляемое, без -s.` },
        { en: `Money are important.`, why: `По-русски «деньги» — мн. число, а в английском money — единственное: is.` },
      ] },
      { t: `build`, q: `Составь: «Я вижу два автобуса»`, topic: `plurals`, answer: `I see two buses`, extra: [`bus`, `a`, `buss`], hints: [
        { extra: `bus`, text: `Два — мн. число: buses.` },
        { extra: `buss`, text: `После s добавляем -es: bus → buses.` },
        { extra: `a`, text: `A — только с одним предметом.` },
      ] },
      { t: `build`, q: `Составь: «У меня болят ноги» (ступни)`, topic: `plurals`, answer: `My feet hurt`, extra: [`foots`, `foot`, `is`], hints: [
        { extra: `foots`, text: `Foot — исключение: feet.` },
        { extra: `foot`, text: `Ноги две — feet.` },
        { extra: `is`, text: `Is не нужен: глагол здесь hurt.` },
      ] },
      { t: `build`, q: `Составь: «Дети в парке»`, topic: `plurals`, answer: `The children are in the park`, extra: [`childs`, `is`, `child`], hints: [
        { extra: `childs`, text: `Child — исключение: children.` },
        { extra: `child`, text: `Детей много — children.` },
        { extra: `is`, text: `Children — мн. число: are.` },
      ] },
      { t: `build`, q: `Составь: «Много людей живёт в Бруклине»`, topic: `plurals`, answer: `Many people live in Brooklyn`, extra: [`peoples`, `person`, `lives`], hints: [
        { extra: `peoples`, text: `People уже мн. число, без -s.` },
        { extra: `person`, text: `Person — один человек. Много — people.` },
        { extra: `lives`, text: `People — мн. число (как they): live, без -s.` },
      ] },
      { t: `type`, q: `Напиши по-английски: «У меня двое детей»`, topic: `plurals`, example: `I have two children.`, answers: [`I have two children`, `I have 2 children`, `I have two kids`, `I have 2 kids`], hints: [
        { extra: `childs`, text: `Child — исключение: children.` },
        { extra: `childrens`, text: `Children уже мн. число, без -s.` },
        { extra: `child`, text: `Двое — мн. число: children.` },
        { extra: `has`, text: `С I — have.` },
      ] },
      { t: `type`, q: `Напиши по-английски: «Люди здесь очень милые»`, topic: `plurals`, example: `People here are really nice.`, answers: [
        `People here are very nice`, `People here are really nice`, `People here are so nice`,
        `The people here are very nice`, `The people here are really nice`, `The people here are so nice`,
      ], hints: [
        { extra: `peoples`, text: `People уже мн. число, без -s.` },
        { extra: `is`, text: `People — мн. число: are.` },
        { missing: `are`, text: `Нужен are: People here are…` },
      ] },
      { t: `type`, q: `Напиши по-английски: «У меня болят зубы»`, topic: `plurals`, example: `My teeth hurt.`, answers: [`My teeth hurt`, `My teeth hurt a lot`], hints: [
        { extra: `tooths`, text: `Tooth — исключение: teeth.` },
        { extra: `tooth`, text: `Зубы — мн. число: teeth.` },
        { extra: `hurts`, text: `Teeth — мн. число (они), поэтому hurt без -s.` },
        { extra: `is`, text: `Is не нужен: My teeth hurt.` },
      ] },
      { t: `type`, q: `Переезд! «Мне нужны две коробки»`, topic: `plurals`, example: `I need two boxes.`, answers: [`I need two boxes`, `I need 2 boxes`], hints: [
        { extra: `boxs`, text: `После x добавляем -es: boxes.` },
        { extra: `box`, text: `Две — мн. число: boxes.` },
        { extra: `boxies`, text: `Просто -es: boxes.` },
      ] },
    ],
  },

  // ===================== 6. this / that =====================
  {
    id: `this_that`,
    level: `A1`,
    title: `this / that / these / those`,
    goal: `Сможешь показать на вещи и людей и представить друга: This is Sam`,
    rule: `this_that`,
    steps: [
      { t: `choice`, q: `Знакомишь Джесс с другом: «Это мой друг Сэм»`, topic: `this_that`, opts: [
        { en: `This is my friend Sam.`, ok: true },
        { en: `It is my friend Sam.`, why: `Знакомя людей, говорят This is…` },
        { en: `That my friend Sam.`, why: `Нет глагола: This is (That's) my friend Sam.` },
      ] },
      { t: `choice`, q: `У Тони, показывая на крендели рядом: «Сколько стоят эти?»`, topic: `this_that`, opts: [
        { en: `How much are these?`, ok: true },
        { en: `How much is these?`, why: `These — много, поэтому are.` },
        { en: `How much are this?`, why: `Много предметов рядом — these.` },
      ] },
      { t: `choice`, q: `Показываешь на небоскрёбы вдали: «Те здания огромные!»`, topic: `this_that`, opts: [
        { en: `Those buildings are huge!`, ok: true },
        { en: `That buildings are huge!`, why: `Buildings — мн. число и далеко: those.` },
        { en: `Those building are huge!`, why: `Those — для мн. числа, нужно buildings.` },
      ] },
      { t: `choice`, q: `Джесс: «The coffee is on the house!» (бесплатно). Ответь «Это здорово, спасибо!»`, topic: `this_that`, opts: [
        { en: `That's awesome, thanks!`, ok: true },
        { en: `This awesome, thanks!`, why: `Нет глагола is: That's (That is) awesome.` },
        { en: `These is awesome, thanks!`, why: `These — мн. число, с is не сочетается. О ситуации говорят That's…` },
      ] },
      { t: `build`, q: `Составь: «Этот кофе отличный»`, topic: `this_that`, answer: `This coffee is great`, extra: [`These`, `are`, `Those`], hints: [
        { extra: `these`, text: `Кофе — один: this.` },
        { extra: `those`, text: `Those — «те» (много и далеко). Здесь: this coffee.` },
        { extra: `are`, text: `Coffee — один: is.` },
      ] },
      { t: `build`, q: `Составь: «Эти яблоки свежие»`, topic: `this_that`, answer: `These apples are fresh`, extra: [`This`, `is`, `Those`], hints: [
        { extra: `this`, text: `Яблок много — these.` },
        { extra: `those`, text: `«Эти» (рядом) — these; those — «те» (далеко).` },
        { extra: `is`, text: `Apples — мн. число: are.` },
      ] },
      { t: `build`, q: `Составь: «Кто тот парень?»`, topic: `this_that`, answer: `Who is that guy?`, extra: [`those`, `this`, `are`], hints: [
        { extra: `those`, text: `Парень один — that.` },
        { extra: `this`, text: `«Тот» (далеко) — that.` },
        { extra: `are`, text: `Guy — один: is.` },
      ] },
      { t: `build`, q: `По телефону: «Привет, это Анна»`, topic: `this_that`, answer: `Hi, this is Anna`, extra: [`I`, `am`, `that`], hints: [
        { extra: `i`, text: `По телефону представляются так: This is Anna.` },
        { extra: `am`, text: `По телефону говорят не I am, а This is Anna.` },
        { extra: `that`, text: `О себе по телефону — this: This is Anna.` },
      ] },
      { t: `type`, q: `Напиши по-английски: «Это моя подруга Джесс»`, topic: `this_that`, example: `This is my friend Jess.`, answers: [`This is my friend Jess`, `This is my friend, Jess`], hints: [
        { extra: `it`, text: `Знакомя людей, говорят This is…` },
        { missing: `this`, text: `Начни с This is…` },
        { missing: `is`, text: `Нужен is: This is…` },
      ] },
      { t: `type`, q: `Спроси: «Сколько стоит это?»`, topic: `this_that`, example: `How much is this?`, answers: [`How much is this`, `How much does this cost`], hints: [
        { extra: `are`, text: `This — одно: is.` },
        { extra: `these`, text: `Предмет один — this.` },
        { extra: `many`, text: `О деньгах — how much.` },
      ] },
      { t: `type`, q: `Напиши по-английски: «Эти кроссовки новые»`, topic: `this_that`, example: `These sneakers are new.`, answers: [`These sneakers are new`, `These shoes are new`], hints: [
        { extra: `this`, text: `Кроссовок много — these.` },
        { extra: `is`, text: `Мн. число — are.` },
        { extra: `those`, text: `«Эти» — these.` },
      ] },
      { t: `type`, q: `Напиши по-английски: «Вот и всё!»`, topic: `this_that`, example: `That's it!`, answers: [`That is it`, `That is all`], hints: [
        { extra: `this`, text: `Устойчивая фраза: That's it!` },
        { missing: `that`, text: `Устойчивая фраза: That's it!` },
        { single: true, text: `Два слова: That's it!` },
      ] },
    ],
  },

  // ===================== 7. Числа, цены, время =====================
  {
    id: `numbers`,
    level: `A1`,
    title: `Числа, цены и время по-американски`,
    goal: `Сможешь назвать цену, время и свой возраст так, как говорят в Нью-Йорке`,
    rule: `numbers`,
    steps: [
      { t: `choice`, q: `Хот-дог стоит $3.50. Как скажет Тони?`, topic: `numbers`, opts: [
        { en: `That's three fifty.`, ok: true },
        { en: `That's three and fifty.`, why: `And не нужен. Цены говорят коротко: three fifty.` },
        { en: `That's three point fifty.`, why: `Point в ценах не говорят: three fifty.` },
      ] },
      { t: `choice`, q: `Сейчас 7:15. Как сказать?`, topic: `numbers`, opts: [
        { en: `It's seven fifteen.`, ok: true },
        { en: `It's seven and fifteen.`, why: `And не нужен: seven fifteen.` },
        { en: `It's fifteen seven.`, why: `Сначала часы, потом минуты: seven fifteen.` },
      ] },
      { t: `choice`, q: `Маркус: «It's fifty bucks to JFK». Сколько стоит поездка?`, topic: `numbers`, opts: [
        { en: `$50`, ok: true },
        { en: `$15`, why: `15 — fifTEEN (ударение в конце). FIFty — 50.` },
        { en: `50 центов`, why: `Bucks — разговорное «доллары».` },
      ] },
      { t: `choice`, q: `Дэв спрашивает, сколько тебе лет. «Мне 25»`, topic: `numbers`, opts: [
        { en: `I'm twenty-five.`, ok: true },
        { en: `I have twenty-five years.`, why: `Дословный перевод не работает. Возраст — через to be: I'm 25.` },
        { en: `I'm twenty-five year.`, why: `Либо просто I'm twenty-five, либо years old (с -s).` },
      ] },
      { t: `tip`, title: `13 или 30?`, text: `Опасные пары: thir**TEEN** (13) — **THIR**ty (30), fif**TEEN** (15) — **FIF**ty (50). Слушай ударение! Если не уверен, переспроси: «**One five** or **five zero**?»` },
      { t: `build`, q: `Составь: «Это стоит двенадцать долларов»`, topic: `numbers`, answer: `It's twelve dollars`, extra: [`dollar`, `cost`, `are`], hints: [
        { extra: `dollar`, text: `Двенадцать — мн. число: dollars.` },
        { extra: `cost`, text: `Проще: It's twelve dollars.` },
        { extra: `are`, text: `It — is: It's.` },
      ] },
      { t: `build`, q: `Составь: «Сейчас восемь тридцать»`, topic: `numbers`, answer: `It's eight thirty`, extra: [`half`, `thirteen`, `at`], hints: [
        { extra: `thirteen`, text: `Thirteen — 13. 30 — thirty.` },
        { extra: `half`, text: `Можно half past eight, но здесь собираем: eight thirty.` },
        { extra: `at`, text: `«Сейчас восемь тридцать» — без at: It's eight thirty.` },
      ] },
      { t: `build`, q: `Составь: «Мне двадцать лет»`, topic: `numbers`, answer: `I am twenty years old`, extra: [`have`, `year`, `is`], hints: [
        { extra: `have`, text: `Возраст — через to be, не have: I am twenty.` },
        { extra: `year`, text: `Двадцать — мн. число: years old.` },
        { extra: `is`, text: `С I — am.` },
      ] },
      { t: `build`, q: `Составь: «Четвертак — это двадцать пять центов»`, topic: `numbers`, answer: `A quarter is twenty-five cents`, extra: [`cent`, `fifteen`, `are`], hints: [
        { extra: `cent`, text: `25 — мн. число: cents.` },
        { extra: `fifteen`, text: `Fifteen — 15. 25 — twenty-five.` },
        { extra: `are`, text: `A quarter — одна монета: is.` },
      ] },
      { t: `type`, q: `Спроси: «Сколько это стоит?»`, topic: `numbers`, example: `How much is it?`, answers: [
        `How much is it`, `How much is this`, `How much is that`,
        `How much does it cost`, `How much does this cost`, `How much does that cost`,
      ], hints: [
        { extra: `many`, text: `О деньгах — how much.` },
        { extra: `costs`, text: `После does — cost без -s. Или проще: How much is it?` },
        { missing: `much`, text: `«Сколько стоит» — How much…?` },
      ] },
      { t: `type`, q: `Напиши, как кассир скажет цену $4.75`, topic: `numbers`, example: `four seventy-five`, answers: [
        `four seventy-five`, `four seventy five dollars`, `that's four seventy-five`, `it's four seventy-five`,
        `four dollars and seventy-five cents`, `four dollars seventy-five`,
      ], hints: [
        { extra: `point`, text: `Point в ценах не говорят: four seventy-five.` },
        { extra: `fifteen`, text: `75 — seventy-five.` },
        { single: true, text: `Цены говорят коротко: four seventy-five.` },
      ] },
      { t: `type`, q: `Скажи по-разговорному: «Это пять долларов»`, topic: `numbers`, example: `It's five bucks.`, answers: [
        `It is five bucks`, `It is 5 bucks`, `It is five dollars`, `It is 5 dollars`,
        `That is five bucks`, `That is 5 bucks`, `That is five dollars`, `That is 5 dollars`,
      ], hints: [
        { extra: `dollar`, text: `Пять — мн. число: dollars.` },
        { extra: `buck`, text: `Пять — мн. число: bucks.` },
        { missing: `is`, text: `Нужен is: It's (It is) five bucks.` },
      ] },
      { t: `type`, q: `Напиши по-английски: «Мне 30 лет»`, topic: `numbers`, example: `I'm thirty.`, answers: [`I am thirty`, `I am 30`, `I am thirty years old`, `I am 30 years old`], hints: [
        { extra: `have`, text: `Возраст — через to be: I'm thirty. Have не нужен.` },
        { extra: `thirteen`, text: `Thirteen — 13. 30 — thirty.` },
        { extra: `year`, text: `Либо просто I'm thirty, либо years old (с -s).` },
        { extra: `me`, text: `Начни с I: I'm thirty.` },
      ] },
    ],
  },

  // ===================== 8. Прилагательные =====================
  {
    id: `adjectives`,
    level: `A1`,
    title: `Прилагательные: big city, so cool`,
    goal: `Сможешь описать людей, места и вещи: a big city, so expensive, I'm bored`,
    rule: `adjectives`,
    steps: [
      { t: `choice`, q: `«Нью-Йорк — большой город»`, topic: `adjectives`, opts: [
        { en: `New York is a big city.`, ok: true },
        { en: `New York is a city big.`, why: `Прилагательное стоит перед существительным: a big city.` },
        { en: `New York is big city.`, why: `Нужен артикль: a big city.` },
      ] },
      { t: `choice`, q: `«Две большие пиццы»`, topic: `adjectives`, opts: [
        { en: `two big pizzas`, ok: true },
        { en: `two bigs pizzas`, why: `Прилагательное не меняется и не получает -s.` },
        { en: `two pizzas bigs`, why: `Прилагательное — перед существительным и без -s.` },
      ] },
      { t: `choice`, q: `Завтра едешь на Кони-Айленд: «Я так рад!»`, topic: `adjectives`, opts: [
        { en: `I'm so excited!`, ok: true },
        { en: `I'm so exciting!`, why: `Exciting — «захватывающий» (о событии). О своих чувствах — excited.` },
        { en: `I so excited!`, why: `Нет глагола: I'm (I am) so excited.` },
      ] },
      { t: `choice`, q: `«Здесь очень дорого»`, topic: `adjectives`, opts: [
        { en: `It's very expensive here.`, ok: true },
        { en: `Here is very expensive.`, why: `Дословный перевод. Нужно подлежащее it: It's expensive here.` },
        { en: `Very expensive here.`, why: `Нет подлежащего и глагола: It's very expensive here.` },
      ] },
      { t: `build`, q: `Составь: «Это действительно классное место»`, topic: `adjectives`, answer: `It's a really cool place`, extra: [`an`, `cools`, `the`], hints: [
        { extra: `an`, text: `Really начинается с согласного: a really cool place.` },
        { extra: `cools`, text: `Прилагательное не меняется: cool.` },
        { extra: `the`, text: `Говорим о месте впервые — a really cool place.` },
      ] },
      { t: `build`, q: `Составь: «Мне так скучно»`, topic: `adjectives`, answer: `I am so bored`, extra: [`boring`, `me`, `is`], hints: [
        { extra: `boring`, text: `I am boring = «я скучный человек». О чувстве — bored.` },
        { extra: `me`, text: `По-русски «мне скучно», по-английски «я скучающий»: I am bored.` },
        { extra: `is`, text: `С I — am.` },
      ] },
      { t: `build`, q: `Составь: «У меня новый телефон»`, topic: `adjectives`, answer: `I have a new phone`, extra: [`an`, `news`, `is`], hints: [
        { extra: `an`, text: `New начинается с согласного: a new phone.` },
        { extra: `news`, text: `News — «новости». «Новый» — new.` },
        { extra: `is`, text: `Is не нужен: I have a new phone.` },
      ] },
      { t: `build`, q: `Составь: «Тони очень дружелюбный»`, topic: `adjectives`, answer: `Tony is very friendly`, extra: [`friend`, `are`, `much`], hints: [
        { extra: `friend`, text: `Friend — «друг». «Дружелюбный» — friendly.` },
        { extra: `are`, text: `Tony = he: is.` },
        { extra: `much`, text: `«Очень» перед прилагательным — very (без much).` },
      ] },
      { t: `type`, q: `Напиши по-английски: «Это так дорого!»`, topic: `adjectives`, example: `It's so expensive!`, answers: [
        `It is so expensive`, `It is very expensive`, `It is really expensive`, `It is super expensive`,
        `That is so expensive`, `That is very expensive`, `That is really expensive`,
        `This is so expensive`, `This is very expensive`, `This is really expensive`,
      ], hints: [
        { missing: `is`, text: `Нужен глагол: It is (It's) so expensive.` },
        { extra: `expensively`, text: `После is — прилагательное: expensive.` },
        { single: true, text: `Начни с It's: It's so expensive!` },
      ] },
      { t: `type`, q: `Напиши по-английски: «Это интересный фильм»`, topic: `adjectives`, example: `It's an interesting movie.`, answers: [
        `It is an interesting movie`, `This is an interesting movie`, `That is an interesting movie`,
        `It is an interesting film`, `This is an interesting film`,
      ], hints: [
        { extra: `interested`, text: `Предмет — interesting, а человек — interested.` },
        { extra: `a`, text: `Interesting начинается с гласного: an interesting movie.` },
        { missing: `an`, text: `Нужен артикль: an interesting movie.` },
      ] },
      { t: `type`, q: `Напиши по-английски: «Кофе горячий»`, topic: `adjectives`, example: `The coffee is hot.`, answers: [`The coffee is hot`, `This coffee is hot`, `My coffee is hot`], hints: [
        { missing: `is`, text: `Нужен is: The coffee is hot.` },
        { extra: `warm`, text: `Warm — «тёплый». «Горячий» — hot.` },
        { extra: `are`, text: `Coffee — одно: is.` },
      ] },
      { t: `type`, q: `Напиши по-английски: «два больших города»`, topic: `adjectives`, example: `two big cities`, answers: [`two big cities`, `2 big cities`], hints: [
        { extra: `bigs`, text: `Прилагательное не меняется: big.` },
        { extra: `citys`, text: `y после согласной → ies: cities.` },
        { extra: `city`, text: `Два — мн. число: cities.` },
      ] },
    ],
  },

  // ===================== 9. Притяжательный 's =====================
  {
    id: `possessive`,
    level: `A1`,
    title: `Притяжательный 's: Jess's cart`,
    goal: `Сможешь сказать, чьё это: Jess's cart, my mom's car, my parents' apartment`,
    rule: `possessive`,
    steps: [
      { t: `choice`, q: `«Такси Маркуса»`, topic: `possessive`, opts: [
        { en: `Marcus's taxi`, ok: true },
        { en: `the taxi of Marcus`, why: `О людях так почти не говорят: Marcus's taxi.` },
        { en: `Marcus taxi`, why: `Нужен 's: Marcus's taxi.` },
      ] },
      { t: `choice`, q: `«Квартира моих родителей»`, topic: `possessive`, opts: [
        { en: `my parents' apartment`, ok: true },
        { en: `my parents's apartment`, why: `После -s мн. числа ставим только апостроф: parents'.` },
        { en: `my parent's apartment`, why: `Parent's — «одного родителя». Родителей двое — parents'.` },
      ] },
      { t: `choice`, q: `Дэв пишет: «I'm at Tony's». Что это значит?`, topic: `possessive`, opts: [
        { en: `Я у Тони (у его тележки).`, ok: true },
        { en: `Я — Тони.`, why: `'s после имени = «чей / у кого»: at Tony's — у Тони.` },
        { en: `Тони у меня.`, why: `I'm at Tony's — это Дэв у Тони, а не наоборот.` },
      ] },
      { t: `choice`, q: `«Детская комната» (комната детей)`, topic: `possessive`, opts: [
        { en: `the children's room`, ok: true },
        { en: `the childrens' room`, why: `Children — уже мн. число без -s, поэтому 's: children's.` },
        { en: `the children room`, why: `Нужен 's: the children's room.` },
      ] },
      { t: `build`, q: `Составь: «Это кофейная тележка Джесс»`, topic: `possessive`, answer: `This is Jess's coffee cart`, extra: [`of`, `Jess`, `her`], hints: [
        { extra: `of`, text: `О людях — 's: Jess's coffee cart.` },
        { extra: `jess`, text: `Чья тележка? — Jess's (с 's).` },
        { extra: `her`, text: `Здесь называем по имени: Jess's coffee cart.` },
      ] },
      { t: `build`, q: `Составь: «Это машина моей мамы»`, topic: `possessive`, answer: `This is my mom's car`, extra: [`mum's`, `of`, `me`], hints: [
        { extra: `mum's`, text: `Mum — британское. В Америке — mom.` },
        { extra: `of`, text: `О людях — 's: my mom's car.` },
        { extra: `me`, text: `«Моей» — my.` },
      ] },
      { t: `build`, q: `Составь: «Где ключи Сэма?»`, topic: `possessive`, answer: `Where are Sam's keys?`, extra: [`is`, `of`, `Sam`], hints: [
        { extra: `is`, text: `Keys — мн. число: are.` },
        { extra: `of`, text: `О людях — 's: Sam's keys.` },
        { extra: `sam`, text: `Чьи ключи? — Sam's (с 's).` },
      ] },
      { t: `build`, q: `Составь: «Пойдём к Тони!» (к его тележке)`, topic: `possessive`, answer: `Let's go to Tony's`, extra: [`Tony`, `at`, `the`], hints: [
        { extra: `tony`, text: `«К Тони (в его заведение)» — to Tony's.` },
        { extra: `at`, text: `Куда идём — to: go to Tony's.` },
        { extra: `the`, text: `С именем артикль не нужен: to Tony's.` },
      ] },
      { t: `type`, q: `Напиши по-английски: «Это собака миссис Родригес»`, topic: `possessive`, example: `This is Mrs. Rodriguez's dog.`, answers: [
        `This is Mrs Rodriguez's dog`, `That is Mrs Rodriguez's dog`, `It is Mrs Rodriguez's dog`,
        `This is Mrs Rodriguez' dog`, `That is Mrs Rodriguez' dog`,
      ], hints: [
        { extra: `of`, text: `О людях — 's: Mrs. Rodriguez's dog.` },
        { extra: `rodriguez`, text: `Чья собака? — Rodriguez's (с 's).` },
        { missing: `is`, text: `Нужен is: This is…` },
      ] },
      { t: `type`, q: `Спроси: «Как зовут твоего брата?»`, topic: `possessive`, example: `What's your brother's name?`, answers: [`What is your brother's name`], hints: [
        { extra: `how`, text: `Имя спрашивают через What: What's your brother's name?` },
        { extra: `brother`, text: `Чьё имя? — брата: brother's.` },
        { extra: `call`, text: `Дословно не надо. Просто: What's your brother's name?` },
      ] },
      { t: `type`, q: `Спроси: «Это телефон Джесс?»`, topic: `possessive`, example: `Is this Jess's phone?`, answers: [`Is this Jess's phone`, `Is that Jess's phone`, `Is it Jess's phone`, `Is this Jess' phone`, `Is that Jess' phone`], hints: [
        { extra: `of`, text: `О людях — 's: Jess's phone.` },
        { extra: `jess`, text: `Чей телефон? — Jess's (с 's).` },
        { missing: `is`, text: `Вопрос начинается с Is: Is this…?` },
      ] },
      { t: `type`, q: `Напиши по-английски: «Дом моих родителей в Москве»`, topic: `possessive`, example: `My parents' house is in Moscow.`, answers: [`My parents' house is in Moscow`, `My parents' apartment is in Moscow`, `My parents' place is in Moscow`], hints: [
        { extra: `parents`, text: `Нужен апостроф: parents' (после -s мн. числа).` },
        { extra: `parents's`, text: `После -s мн. числа — только апостроф: parents'.` },
        { extra: `parent's`, text: `Parent's — одного родителя. Родителей двое: parents'.` },
        { extra: `of`, text: `О людях — 's: my parents' house.` },
      ] },
    ],
  },

  // ===================== 10. There is / There are =====================
  {
    id: `there_is`,
    level: `A1`,
    title: `There is / There are: «есть, находится»`,
    goal: `Сможешь сказать, что где есть, и спросить: «Здесь есть туалет?»`,
    rule: `there_is`,
    steps: [
      { t: `choice`, q: `«На углу есть бодега» (магазинчик)`, topic: `there_is`, opts: [
        { en: `There's a bodega on the corner.`, ok: true },
        { en: `On the corner is a bodega.`, why: `Дословный перевод. Начинаем с There's, место — в конце.` },
        { en: `Is a bodega on the corner.`, why: `Нет there: There's a bodega on the corner.` },
      ] },
      { t: `choice`, q: `«В Бруклине много парков»`, topic: `there_is`, opts: [
        { en: `There are a lot of parks in Brooklyn.`, ok: true },
        { en: `There is a lot of parks in Brooklyn.`, why: `Parks — мн. число: there are.` },
        { en: `In Brooklyn are a lot of parks.`, why: `Начинаем с There are, место — в конце.` },
      ] },
      { t: `choice`, q: `В кафе: «Здесь есть туалет?»`, topic: `there_is`, opts: [
        { en: `Is there a restroom here?`, ok: true },
        { en: `Is here a restroom?`, why: `Нужно there: Is there…?` },
        { en: `Are there a restroom here?`, why: `Restroom — один: Is there.` },
      ] },
      { t: `choice`, q: `«В холодильнике нет молока»`, topic: `there_is`, opts: [
        { en: `There isn't any milk in the fridge.`, ok: true },
        { en: `There aren't milk in the fridge.`, why: `Milk — неисчисляемое, как единственное число: isn't.` },
        { en: `There no milk in the fridge.`, why: `Нет глагола: There's no milk / There isn't any milk.` },
      ] },
      { t: `build`, q: `Составь: «На столе есть телефон»`, topic: `there_is`, answer: `There is a phone on the table`, extra: [`are`, `have`, `It`], hints: [
        { extra: `are`, text: `Телефон один: there is.` },
        { extra: `have`, text: `«Есть» в значении «находится» — there is, не have.` },
        { extra: `it`, text: `Начинаем с There is.` },
      ] },
      { t: `build`, q: `Составь: «В моём районе два парка»`, topic: `there_is`, answer: `There are two parks in my neighborhood`, extra: [`is`, `has`, `neighbourhood`], hints: [
        { extra: `is`, text: `Парков два: there are.` },
        { extra: `has`, text: `Начинаем с There are, не has.` },
        { extra: `neighbourhood`, text: `Neighbourhood — британское написание. В США — neighborhood.` },
      ] },
      { t: `build`, q: `Спроси в кафе: «Здесь есть Wi-Fi?»`, topic: `there_is`, answer: `Is there Wi-Fi here?`, extra: [`Have`, `are`, `it`], hints: [
        { extra: `have`, text: `«Здесь есть…?» — Is there…?` },
        { extra: `are`, text: `Wi-Fi — один: Is there.` },
        { extra: `it`, text: `Нужно there: Is there…?` },
      ] },
      { t: `build`, q: `Составь: «Здесь нет метро»`, topic: `there_is`, answer: `There isn't a subway here`, extra: [`no`, `don't`, `metro`], hints: [
        { extra: `do`, text: `Отрицание — there isn't, без don't.` },
        { extra: `no`, text: `Здесь уже есть isn't — no не нужен.` },
        { extra: `metro`, text: `В Нью-Йорке говорят subway.` },
      ] },
      { t: `type`, q: `Спроси прохожего: «Здесь рядом есть аптека?»`, topic: `there_is`, example: `Is there a pharmacy near here?`, answers: [
        `Is there a pharmacy near here`, `Is there a pharmacy nearby`, `Is there a pharmacy around here`,
        `Is there a drugstore near here`, `Is there a drugstore nearby`, `Is there a drugstore around here`,
        `Excuse me is there a pharmacy near here`, `Excuse me is there a pharmacy nearby`, `Excuse me is there a drugstore near here`,
      ], hints: [
        { missing: `there`, text: `«Есть ли…?» — Is there…?` },
        { extra: `have`, text: `Не have, а Is there…?` },
        { missing: `a`, text: `Аптека — одна: a pharmacy.` },
      ] },
      { t: `type`, q: `Напиши по-английски: «В парке много людей»`, topic: `there_is`, example: `There are a lot of people in the park.`, answers: [
        `There are a lot of people in the park`, `There are many people in the park`, `There are lots of people in the park`,
      ], hints: [
        { extra: `is`, text: `People — мн. число: there are.` },
        { missing: `there`, text: `Начинаем с There are, место — в конце.` },
        { extra: `peoples`, text: `People уже мн. число, без -s.` },
      ] },
      { t: `type`, q: `Напиши по-английски: «На углу есть пиццерия»`, topic: `there_is`, example: `There's a pizza place on the corner.`, answers: [
        `There is a pizza place on the corner`, `There is a pizzeria on the corner`, `There is a pizza shop on the corner`,
      ], hints: [
        { missing: `there`, text: `Начинаем с There's, место — в конце.` },
        { extra: `in`, text: `«На углу» — on the corner.` },
        { extra: `are`, text: `Пиццерия одна: there is.` },
      ] },
      { t: `type`, q: `Официант говорит: «Свободных столиков нет». Напиши «Столиков нет»`, topic: `there_is`, example: `There aren't any tables.`, answers: [
        `There are not any tables`, `There are no tables`, `There are not any tables here`, `There are no tables here`,
      ], hints: [
        { extra: `is`, text: `Tables — мн. число: there aren't.` },
        { missing: `there`, text: `Начинаем с There aren't…` },
        { extra: `do`, text: `Отрицание — there aren't, без don't.` },
      ] },
    ],
  },
  // ===================== 11. Предлоги места =====================
  {
    id: `prep_place`,
    level: `A1`,
    title: `Предлоги места: in / on / at / next to`,
    goal: `Сможешь сказать, где ты и где что находится: at home, on the subway, across from the park`,
    rule: `prep_place`,
    steps: [
      { t: `choice`, q: `Сэм пишет: «Where are you?» Ответь: «Я в метро» (еду)`, topic: `prep_place`, opts: [
        { en: `I'm on the subway.`, ok: true },
        { en: `I'm in the subway.`, why: `В транспорте, где можно стоять и ходить (bus, subway, train), — on.` },
        { en: `I'm at the subway.`, why: `At the subway — «у входа в метро». Едешь — on the subway.` },
      ] },
      { t: `choice`, q: `«Я живу на Мэйпл-стрит»`, topic: `prep_place`, opts: [
        { en: `I live on Maple Street.`, ok: true },
        { en: `I live in Maple Street.`, why: `В США про улицу говорят on: on Maple Street.` },
        { en: `I live at Maple Street.`, why: `At — с полным адресом (at 25 Maple Street). Просто улица — on.` },
      ] },
      { t: `choice`, q: `Маркус звонит: «Ты где?» — «Я на работе»`, topic: `prep_place`, opts: [
        { en: `I'm at work.`, ok: true },
        { en: `I'm on work.`, why: `Устойчиво: at work.` },
        { en: `I'm in work.`, why: `«На работе» — at work.` },
      ] },
      { t: `choice`, q: `«Банк напротив парка»`, topic: `prep_place`, opts: [
        { en: `The bank is across from the park.`, ok: true },
        { en: `The bank is opposite of the park.`, why: `Opposite — без of. А в США чаще говорят across from.` },
        { en: `The bank is in front the park.`, why: `In front of — «перед», и без of нельзя. «Напротив» — across from.` },
      ] },
      { t: `tip`, title: `in, on, at — коротко`, text: `**in** — внутри (in the park, in Brooklyn), **on** — на поверхности, на улице, в автобусе или метро (on the table, on Maple Street, on the bus), **at** — в точке (at home, at work, at the bus stop).` },
      { t: `build`, q: `Составь: «Я на автобусной остановке»`, topic: `prep_place`, answer: `I am at the bus stop`, extra: [`on`, `in`, `stay`], hints: [
        { extra: `on`, text: `Остановка — это точка: at the bus stop.` },
        { extra: `in`, text: `Остановка — это точка: at the bus stop.` },
        { extra: `stay`, text: `Просто «я нахожусь» — I am.` },
      ] },
      { t: `build`, q: `Составь: «Кофейня рядом с банком»`, topic: `prep_place`, answer: `The coffee shop is next to the bank`, extra: [`with`, `of`, `on`], hints: [
        { extra: `with`, text: `«Рядом с» — next to, без with.` },
        { extra: `of`, text: `Next to — без of.` },
        { extra: `on`, text: `«Рядом с» — next to.` },
      ] },
      { t: `build`, q: `Составь: «Моя квартира на третьем этаже»`, topic: `prep_place`, answer: `My apartment is on the third floor`, extra: [`in`, `flat`, `three`], hints: [
        { extra: `in`, text: `Этаж — on: on the third floor.` },
        { extra: `flat`, text: `Flat — британское. В США — apartment.` },
        { extra: `three`, text: `«Третий» — third (порядковое число).` },
      ] },
      { t: `build`, q: `Составь: «Тони на углу»`, topic: `prep_place`, answer: `Tony is on the corner`, extra: [`in`, `angle`, `are`], hints: [
        { extra: `in`, text: `«На углу (улицы)» — on the corner.` },
        { extra: `angle`, text: `Angle — угол в геометрии. Угол улицы — corner.` },
        { extra: `are`, text: `Tony = he: is.` },
      ] },
      { t: `type`, q: `Напиши по-английски: «Я дома»`, topic: `prep_place`, example: `I'm at home.`, answers: [`I am at home`, `I am home`], hints: [
        { extra: `in`, text: `Устойчиво: at home.` },
        { extra: `house`, text: `«Дома» — at home.` },
        { missing: `am`, text: `Нужен am: I'm at home.` },
      ] },
      { t: `type`, q: `Напиши по-английски: «Я в автобусе»`, topic: `prep_place`, example: `I'm on the bus.`, answers: [`I am on the bus`], hints: [
        { extra: `in`, text: `В автобусе, метро, поезде — on: on the bus.` },
        { extra: `at`, text: `At the bus — «у автобуса». Едешь — on the bus.` },
        { missing: `am`, text: `Нужен am: I'm on the bus.` },
      ] },
      { t: `type`, q: `Напиши по-английски: «Аптека напротив банка»`, topic: `prep_place`, example: `The pharmacy is across from the bank.`, answers: [
        `The pharmacy is across from the bank`, `The drugstore is across from the bank`,
        `The pharmacy is across the street from the bank`, `The drugstore is across the street from the bank`,
        `The pharmacy is opposite the bank`, `The drugstore is opposite the bank`,
      ], hints: [
        { extra: `of`, text: `Opposite — без of. По-американски: across from.` },
        { missing: `from`, text: `«Напротив» — across from.` },
        { missing: `is`, text: `Нужен is: The pharmacy is…` },
      ] },
      { t: `type`, q: `Напиши по-английски: «Я живу в Бруклине»`, topic: `prep_place`, example: `I live in Brooklyn.`, answers: [`I live in Brooklyn`], hints: [
        { extra: `on`, text: `Район, город — in: in Brooklyn.` },
        { extra: `at`, text: `Район, город — in: in Brooklyn.` },
        { extra: `am`, text: `Am не нужен: I live in Brooklyn.` },
      ] },
    ],
  },

  // ===================== 12. Present Simple =====================
  {
    id: `present_simple`,
    level: `A1`,
    title: `Present Simple: I work / he works`,
    goal: `Сможешь рассказать о своих привычках и о том, что обычно делают другие`,
    rule: `present_simple`,
    steps: [
      { t: `choice`, q: `«Джесс работает в кофейне»`, topic: `present_simple`, opts: [
        { en: `Jess works at a coffee shop.`, ok: true },
        { en: `Jess work at a coffee shop.`, why: `Jess = she, поэтому добавляем -s: works.` },
        { en: `Jess is work at a coffee shop.`, why: `Не смешивай is и глагол: Jess works.` },
      ] },
      { t: `choice`, q: `«Я живу в Бруклине»`, topic: `present_simple`, opts: [
        { en: `I live in Brooklyn.`, ok: true },
        { en: `I lives in Brooklyn.`, why: `С I — без -s: I live.` },
        { en: `I am live in Brooklyn.`, why: `Am не нужен: I live.` },
      ] },
      { t: `choice`, q: `«Дэв ходит в спортзал по понедельникам»`, topic: `present_simple`, opts: [
        { en: `Dev goes to the gym on Mondays.`, ok: true },
        { en: `Dev gos to the gym on Mondays.`, why: `После o добавляем -es: goes.` },
        { en: `Dev go to the gym on Mondays.`, why: `Dev = he: goes.` },
      ] },
      { t: `choice`, q: `«Мы обычно обедаем в полдень»`, topic: `present_simple`, opts: [
        { en: `We usually eat lunch at noon.`, ok: true },
        { en: `We eat usually lunch at noon.`, why: `Usually ставим перед глаголом: we usually eat.` },
        { en: `We usually eats lunch at noon.`, why: `С we — без -s: eat.` },
      ] },
      { t: `tip`, title: `Одна буква — большая разница`, text: `Запомни: **he / she / it** «забирают» себе **-s**: I work → she work**s**, I go → he go**es**, I have → she **has**. С I, you, we, they — глагол как в словаре.` },
      { t: `build`, q: `Составь: «Я пью кофе каждое утро»`, topic: `present_simple`, answer: `I drink coffee every morning`, extra: [`am`, `drinks`, `in`], hints: [
        { extra: `am`, text: `Am не нужен: I drink.` },
        { extra: `drinks`, text: `С I — без -s: drink.` },
        { extra: `in`, text: `Every morning — без in.` },
      ] },
      { t: `build`, q: `Составь: «Она говорит по-английски»`, topic: `present_simple`, answer: `She speaks English`, extra: [`speak`, `is`, `on`], hints: [
        { extra: `speak`, text: `С she — speaks (с -s).` },
        { extra: `is`, text: `Is не нужен: She speaks.` },
        { extra: `on`, text: `«По-английски» — просто English, без on.` },
      ] },
      { t: `build`, q: `Составь: «Банк открывается в девять»`, topic: `present_simple`, answer: `The bank opens at nine`, extra: [`open`, `in`, `is`], hints: [
        { extra: `open`, text: `The bank = it: opens (с -s).` },
        { extra: `in`, text: `Точное время — at: at nine.` },
        { extra: `is`, text: `Is не нужен: The bank opens.` },
      ] },
      { t: `build`, q: `Составь: «Тони продаёт хот-доги»`, topic: `present_simple`, answer: `Tony sells hot dogs`, extra: [`sell`, `is`, `a`], hints: [
        { extra: `sell`, text: `Tony = he: sells (с -s).` },
        { extra: `is`, text: `Is не нужен: Tony sells.` },
        { extra: `a`, text: `Hot dogs — мн. число, без a.` },
      ] },
      { t: `type`, q: `Напиши по-английски: «Он учит английский»`, topic: `present_simple`, example: `He studies English.`, answers: [`He studies English`, `He learns English`, `He is learning English`], hints: [
        { extra: `study`, text: `С he: study → studies (y → ies).` },
        { extra: `studys`, text: `y после согласной → ies: studies.` },
        { extra: `learn`, text: `С he: learns (с -s).` },
      ] },
      { t: `type`, q: `Напиши по-английски: «Моя сестра живёт в Москве»`, topic: `present_simple`, example: `My sister lives in Moscow.`, answers: [`My sister lives in Moscow`], hints: [
        { extra: `live`, text: `Sister = she: lives (с -s).` },
        { extra: `is`, text: `Is не нужен: My sister lives…` },
        { extra: `on`, text: `Город — in: in Moscow.` },
      ] },
      { t: `type`, q: `Напиши по-английски: «Я работаю в Манхэттене»`, topic: `present_simple`, example: `I work in Manhattan.`, answers: [`I work in Manhattan`], hints: [
        { extra: `works`, text: `С I — без -s: I work.` },
        { extra: `am`, text: `Am не нужен: I work.` },
        { extra: `on`, text: `Район — in: in Manhattan.` },
      ] },
      { t: `type`, q: `Напиши по-английски: «Он смотрит телевизор по вечерам»`, topic: `present_simple`, example: `He watches TV in the evening.`, answers: [
        `He watches TV in the evening`, `He watches TV in the evenings`, `He watches TV every evening`,
        `In the evening he watches TV`, `In the evenings he watches TV`,
      ], hints: [
        { extra: `watch`, text: `С he: watches (после ch — -es).` },
        { extra: `watchs`, text: `После ch добавляем -es: watches.` },
        { extra: `look`, text: `Телевизор «смотрят» — watch TV.` },
      ] },
    ],
  },

  // ===================== 13. do / does =====================
  {
    id: `do_does`,
    level: `A1`,
    title: `Вопросы и отрицания: do / does / don't`,
    goal: `Сможешь спросить «Ты любишь…? Она работает…?» и сказать «я не…»`,
    rule: `do_does`,
    steps: [
      { t: `choice`, q: `Спроси Джесс: «Ты любишь пиццу?»`, topic: `do_does`, opts: [
        { en: `Do you like pizza?`, ok: true },
        { en: `Are you like pizza?`, why: `С глаголом like — do, а не are.` },
        { en: `Like you pizza?`, why: `Вопрос начинается с Do: Do you like…?` },
      ] },
      { t: `choice`, q: `«Она не пьёт кофе»`, topic: `do_does`, opts: [
        { en: `She doesn't drink coffee.`, ok: true },
        { en: `She don't drink coffee.`, why: `С she — doesn't.` },
        { en: `She doesn't drinks coffee.`, why: `-s уже «ушла» в doesn't, глагол без -s: drink.` },
      ] },
      { t: `choice`, q: `Миссис Родригес: «Do you live here?» Ответь «Да»`, topic: `do_does`, opts: [
        { en: `Yes, I do.`, ok: true },
        { en: `Yes, I live.`, why: `Короткий ответ повторяет помощника: Yes, I do.` },
        { en: `Yes, I am.`, why: `Вопрос с do — и ответ с do: Yes, I do.` },
      ] },
      { t: `choice`, q: `«Автобус здесь останавливается?»`, topic: `do_does`, opts: [
        { en: `Does the bus stop here?`, ok: true },
        { en: `Do the bus stop here?`, why: `The bus = it, поэтому does.` },
        { en: `Does the bus stops here?`, why: `После does глагол без -s: stop.` },
      ] },
      { t: `build`, q: `Составь: «Я не понимаю»`, topic: `do_does`, answer: `I don't understand`, extra: [`am`, `no`, `understands`], hints: [
        { extra: `am`, text: `С глаголом understand — don't, не am.` },
        { extra: `no`, text: `«Не» перед глаголом — don't.` },
        { extra: `understands`, text: `С I — без -s.` },
      ] },
      { t: `build`, q: `Составь: «Она работает сегодня?»`, topic: `do_does`, answer: `Does she work today?`, extra: [`Do`, `works`, `is`], hints: [
        { extra: `do`, text: `С she — does.` },
        { extra: `works`, text: `После does глагол без -s: work.` },
        { extra: `is`, text: `С глаголом work вопрос через does, не is.` },
      ] },
      { t: `build`, q: `Составь: «Мы не едим мясо»`, topic: `do_does`, answer: `We don't eat meat`, extra: [`doesn't`, `are`, `eats`], hints: [
        { extra: `does`, text: `С we — don't.` },
        { extra: `are`, text: `С глаголом eat — don't, не are.` },
        { extra: `eats`, text: `После don't — глагол без -s.` },
      ] },
      { t: `build`, q: `Составь: «Ты говоришь по-русски?»`, topic: `do_does`, answer: `Do you speak Russian?`, extra: [`Are`, `speaks`, `Russia`], hints: [
        { extra: `are`, text: `С глаголом speak — do: Do you speak…?` },
        { extra: `speaks`, text: `После do — глагол без -s.` },
        { extra: `russia`, text: `Russia — страна. Язык — Russian.` },
      ] },
      { t: `type`, q: `Спроси: «Ты любишь джаз?»`, topic: `do_does`, example: `Do you like jazz?`, answers: [`Do you like jazz`, `Do you love jazz`], hints: [
        { missing: `do`, text: `Вопрос начинается с Do: Do you like…?` },
        { extra: `are`, text: `С глаголом like — do, не are.` },
        { extra: `likes`, text: `После do — like без -s.` },
      ] },
      { t: `type`, q: `Напиши по-английски: «Он не говорит по-русски»`, topic: `do_does`, example: `He doesn't speak Russian.`, answers: [`He does not speak Russian`], hints: [
        { extra: `speaks`, text: `После doesn't — глагол без -s: speak.` },
        { extra: `do`, text: `С he — doesn't, не don't.` },
        { extra: `is`, text: `С глаголом speak — doesn't, не isn't.` },
      ] },
      { t: `type`, q: `Спроси: «Она здесь работает?»`, topic: `do_does`, example: `Does she work here?`, answers: [`Does she work here`], hints: [
        { extra: `works`, text: `После does глагол без -s: work.` },
        { extra: `is`, text: `С глаголом work вопрос через does.` },
        { missing: `does`, text: `Вопрос с she начинается с Does.` },
      ] },
      { t: `type`, q: `Напиши по-английски: «Я не пью кофе»`, topic: `do_does`, example: `I don't drink coffee.`, answers: [`I do not drink coffee`], hints: [
        { missing: `do`, text: `Отрицание с глаголом: don't + глагол.` },
        { extra: `am`, text: `С глаголом drink — don't, не am not.` },
        { extra: `drinks`, text: `С I — без -s.` },
      ] },
      { t: `type`, q: `Сэм: «Do you have a car?» Ответь «Нет» (коротко)`, topic: `do_does`, example: `No, I don't.`, answers: [`No I do not`, `No I do not have a car`, `No I do not have one`], hints: [
        { extra: `haven't`, text: `Вопрос с Do — ответ No, I don't.` },
        { extra: `am`, text: `Вопрос с Do — ответ с do: No, I don't.` },
        { single: true, text: `Коротко: No, I don't.` },
      ] },
    ],
  },

  // ===================== 14. have / has =====================
  {
    id: `have`,
    level: `A1`,
    title: `have / has: «у меня есть»`,
    goal: `Сможешь рассказать, что у тебя есть, и спросить «У тебя есть…?»`,
    rule: `have`,
    steps: [
      { t: `choice`, q: `«У меня есть сестра»`, topic: `have`, opts: [
        { en: `I have a sister.`, ok: true },
        { en: `I has a sister.`, why: `С I — have. Has — только с he / she / it.` },
        { en: `At me is a sister.`, why: `Дословно «у меня есть» не переводится. Говорим «я имею»: I have.` },
      ] },
      { t: `choice`, q: `«У Дэва есть машина»`, topic: `have`, opts: [
        { en: `Dev has a car.`, ok: true },
        { en: `Dev have a car.`, why: `Dev = he: has.` },
        { en: `Dev is have a car.`, why: `Is не нужен: Dev has a car.` },
      ] },
      { t: `choice`, q: `В кафе: «У вас есть Wi-Fi?»`, topic: `have`, opts: [
        { en: `Do you have Wi-Fi?`, ok: true },
        { en: `Has you Wi-Fi?`, why: `С you — have, а вопрос строим через Do: Do you have…?` },
        { en: `Are you have Wi-Fi?`, why: `С have — do, а не are.` },
      ] },
      { t: `choice`, q: `«У меня нет времени»`, topic: `have`, opts: [
        { en: `I don't have time.`, ok: true },
        { en: `I no have time.`, why: `Отрицание — через don't: I don't have.` },
        { en: `I don't has time.`, why: `После don't — have.` },
      ] },
      { t: `choice`, q: `«Я завтракаю в восемь»`, topic: `have`, opts: [
        { en: `I have breakfast at eight.`, ok: true },
        { en: `I have a breakfast at eight.`, why: `Have breakfast (завтракать) — без a.` },
        { en: `I has breakfast at eight.`, why: `С I — have.` },
      ] },
      { t: `build`, q: `Составь: «У меня два брата»`, topic: `have`, answer: `I have two brothers`, extra: [`has`, `brother`, `am`], hints: [
        { extra: `has`, text: `С I — have.` },
        { extra: `brother`, text: `Два — мн. число: brothers.` },
        { extra: `am`, text: `«У меня есть» — I have, без am.` },
      ] },
      { t: `build`, q: `Составь: «У неё нет собаки»`, topic: `have`, answer: `She doesn't have a dog`, extra: [`has`, `no`, `don't`], hints: [
        { extra: `has`, text: `После doesn't — have (без -s).` },
        { extra: `no`, text: `Отрицание уже есть — doesn't.` },
        { extra: `do`, text: `С she — doesn't.` },
      ] },
      { t: `build`, q: `Составь: «У тебя есть питомец?»`, topic: `have`, answer: `Do you have a pet?`, extra: [`Are`, `has`, `any`], hints: [
        { extra: `are`, text: `С have — Do you have…?` },
        { extra: `has`, text: `С you — have.` },
        { extra: `any`, text: `Питомец один — a pet.` },
      ] },
      { t: `build`, q: `Составь: «У нас мало времени»`, topic: `have`, answer: `We don't have much time`, extra: [`many`, `has`, `no`], hints: [
        { extra: `many`, text: `Time — неисчисляемое: much.` },
        { extra: `has`, text: `С we — have.` },
        { extra: `no`, text: `«Мало» — don't have much.` },
      ] },
      { t: `type`, q: `Напиши по-английски: «У меня есть машина»`, topic: `have`, example: `I have a car.`, answers: [`I have a car`, `I have got a car`], hints: [
        { missing: `a`, text: `Машина одна — a car.` },
        { extra: `has`, text: `С I — have.` },
        { extra: `me`, text: `Начинай с I: I have a car.` },
      ] },
      { t: `type`, q: `Напиши по-английски: «У него нет работы»`, topic: `have`, example: `He doesn't have a job.`, answers: [`He does not have a job`, `He has no job`], hints: [
        { extra: `do`, text: `С he — doesn't.` },
        { extra: `work`, text: `«Работа» (место) — a job.` },
        { missing: `does`, text: `Отрицание: He doesn't have…` },
      ] },
      { t: `type`, q: `Спроси: «У тебя есть ручка?»`, topic: `have`, example: `Do you have a pen?`, answers: [`Do you have a pen`], hints: [
        { missing: `do`, text: `Вопрос через Do: Do you have…?` },
        { extra: `are`, text: `С have — do, не are.` },
        { extra: `has`, text: `С you — have.` },
      ] },
      { t: `type`, q: `Уходя: «Хорошего дня!»`, topic: `have`, example: `Have a good day!`, answers: [`Have a good day`, `Have a nice day`, `Have a great day`, `Have a good one`], hints: [
        { extra: `has`, text: `Пожелание — Have…` },
        { missing: `a`, text: `Have a good day — с a.` },
        { single: true, text: `Have a good day!` },
      ] },
    ],
  },

  // ===================== 15. Вопросы =====================
  {
    id: `questions`,
    level: `A1`,
    title: `Вопросы: what, where, when, who, why, how`,
    goal: `Сможешь спросить где, когда, что, сколько и почему`,
    rule: `questions`,
    steps: [
      { t: `choice`, q: `«Где ты работаешь?»`, topic: `questions`, opts: [
        { en: `Where do you work?`, ok: true },
        { en: `Where you work?`, why: `Нужен помощник do: Where do you work?` },
        { en: `Where are you work?`, why: `С глаголом work — do, а не are.` },
      ] },
      { t: `choice`, q: `«Откуда ты?»`, topic: `questions`, opts: [
        { en: `Where are you from?`, ok: true },
        { en: `Where do you from?`, why: `From — не глагол, поэтому нужен are: Where are you from?` },
        { en: `From where you are?`, why: `Дословный перевод. Предлог from уходит в конец: Where are you from?` },
      ] },
      { t: `choice`, q: `У Тони: «Сколько стоит?»`, topic: `questions`, opts: [
        { en: `How much is it?`, ok: true },
        { en: `How many is it?`, why: `Про деньги — how much.` },
        { en: `How much it is?`, why: `В вопросе is перед it: How much is it?` },
      ] },
      { t: `choice`, q: `Маркус: «Кем ты работаешь?»`, topic: `questions`, opts: [
        { en: `What do you do?`, ok: true },
        { en: `Who are you working?`, why: `Дословный перевод. О профессии спрашивают: What do you do?` },
        { en: `What are you work?`, why: `С глаголом — do: What do you do?` },
      ] },
      { t: `tip`, title: `How much или how many?`, text: `**How much** — про то, что не считают поштучно, и про деньги: How much **time**? How much **is it**? **How many** — про штуки: How many **kids**? How many **stops**?` },
      { t: `build`, q: `Составь: «Во сколько закрывается банк?»`, topic: `questions`, answer: `What time does the bank close?`, extra: [`closes`, `do`, `is`], hints: [
        { extra: `closes`, text: `После does — глагол без -s: close.` },
        { extra: `do`, text: `The bank = it: does.` },
        { extra: `is`, text: `С глаголом close — does, не is.` },
      ] },
      { t: `build`, q: `Составь: «Как тебя зовут?»`, topic: `questions`, answer: `What is your name?`, extra: [`How`, `you`, `call`], hints: [
        { extra: `how`, text: `Дословно «как» не работает. Имя спрашивают: What is your name?` },
        { extra: `call`, text: `«Как тебя зовут» = «какое твоё имя»: What is your name?` },
        { extra: `you`, text: `Чьё имя? — your name.` },
      ] },
      { t: `build`, q: `Составь: «Почему ты устал?»`, topic: `questions`, answer: `Why are you tired?`, extra: [`do`, `is`, `tiring`], hints: [
        { extra: `do`, text: `Tired — прилагательное, с ним are: Why are you tired?` },
        { extra: `is`, text: `С you — are.` },
        { extra: `tiring`, text: `Tiring — «утомительный». О человеке — tired.` },
      ] },
      { t: `build`, q: `Составь: «Сколько у тебя детей?»`, topic: `questions`, answer: `How many kids do you have?`, extra: [`much`, `are`, `has`], hints: [
        { extra: `much`, text: `Детей считают поштучно — how many.` },
        { extra: `are`, text: `С have — do: do you have.` },
        { extra: `has`, text: `После do — have.` },
      ] },
      { t: `type`, q: `Спроси: «Где ты живёшь?»`, topic: `questions`, example: `Where do you live?`, answers: [`Where do you live`], hints: [
        { missing: `do`, text: `Нужен помощник do: Where do you live?` },
        { extra: `are`, text: `С глаголом live — do, не are.` },
        { extra: `lives`, text: `После do — live без -s.` },
      ] },
      { t: `type`, q: `Спроси: «Что ты хочешь?»`, topic: `questions`, example: `What do you want?`, answers: [`What do you want`, `What would you like`], hints: [
        { missing: `do`, text: `Нужен помощник do: What do you want?` },
        { extra: `are`, text: `С глаголом want — do, не are.` },
        { extra: `wants`, text: `После do — want без -s.` },
      ] },
      { t: `type`, q: `Спроси: «Когда открывается кофейня?»`, topic: `questions`, example: `When does the coffee shop open?`, answers: [
        `When does the coffee shop open`, `What time does the coffee shop open`,
        `When does the cafe open`, `What time does the cafe open`, `When does the café open`, `What time does the café open`,
      ], hints: [
        { extra: `opens`, text: `После does — open без -s.` },
        { missing: `does`, text: `Кофейня = it: When does it open?` },
        { extra: `is`, text: `С глаголом open — does, не is.` },
      ] },
      { t: `type`, q: `Спроси: «Кто здесь живёт?»`, topic: `questions`, example: `Who lives here?`, answers: [`Who lives here`], hints: [
        { extra: `does`, text: `Who как подлежащее — без does: Who lives here?` },
        { extra: `live`, text: `Who — как he: lives (с -s).` },
        { extra: `is`, text: `Is не нужен: Who lives here?` },
      ] },
    ],
  },

  // ===================== 16. Порядок слов =====================
  {
    id: `word_order`,
    level: `A1`,
    title: `Порядок слов в предложении`,
    goal: `Сможешь строить фразы в правильном порядке: кто → что делает → что → где → когда`,
    rule: `word_order`,
    steps: [
      { t: `choice`, q: `Смотришь в окно: «Идёт дождь»`, topic: `word_order`, opts: [
        { en: `It's raining.`, ok: true },
        { en: `Is raining.`, why: `Нужно подлежащее it: It's raining.` },
        { en: `Rain goes.`, why: `Дословный перевод не работает: It's raining.` },
      ] },
      { t: `choice`, q: `«Кофе я люблю»`, topic: `word_order`, opts: [
        { en: `I like coffee.`, ok: true },
        { en: `Coffee I like.`, why: `В английском порядок строгий: кто → глагол → что.` },
        { en: `Like I coffee.`, why: `Сначала кто (I), потом глагол (like).` },
      ] },
      { t: `choice`, q: `«Я обычно хожу на работу пешком»`, topic: `word_order`, opts: [
        { en: `I usually walk to work.`, ok: true },
        { en: `I walk usually to work.`, why: `Usually ставим перед глаголом: I usually walk.` },
        { en: `Usually walk I to work.`, why: `Кто (I) — перед глаголом.` },
      ] },
      { t: `choice`, q: `«Она всегда опаздывает»`, topic: `word_order`, opts: [
        { en: `She is always late.`, ok: true },
        { en: `She always late.`, why: `Нет глагола: She is always late.` },
        { en: `Always is she late.`, why: `Сначала кто, потом is, потом always.` },
      ] },
      { t: `choice`, q: `«Сегодня холодно»`, topic: `word_order`, opts: [
        { en: `It's cold today.`, ok: true },
        { en: `Is cold today.`, why: `Нужно подлежащее it: It's cold.` },
        { en: `Today cold.`, why: `Нет подлежащего и глагола: It's cold today.` },
      ] },
      { t: `build`, q: `Составь (время — в конце): «Я пью кофе дома каждое утро»`, topic: `word_order`, answer: `I drink coffee at home every morning`, extra: [`in`, `am`, `drinks`], hints: [
        { extra: `in`, text: `«Дома» — at home.` },
        { extra: `am`, text: `Am не нужен: I drink.` },
        { extra: `drinks`, text: `С I — без -s.` },
      ] },
      { t: `build`, q: `Составь: «Я очень люблю пиццу»`, topic: `word_order`, answer: `I like pizza very much`, extra: [`am`, `a`, `is`], hints: [
        { extra: `am`, text: `Am не нужен: I like.` },
        { extra: `a`, text: `Пицца вообще — без a.` },
        { extra: `is`, text: `Is не нужен: I like pizza very much.` },
      ] },
      { t: `build`, q: `Составь (время — в конце): «По субботам мы играем в футбол в парке»`, topic: `word_order`, answer: `We play soccer in the park on Saturdays`, extra: [`football`, `at`, `plays`], hints: [
        { extra: `football`, text: `В США football — американский футбол. Наш футбол — soccer.` },
        { extra: `at`, text: `«В парке» — in the park.` },
        { extra: `plays`, text: `С we — play, без -s.` },
      ] },
      { t: `type`, q: `Напиши по-английски: «Уже поздно»`, topic: `word_order`, example: `It's late.`, answers: [`It is late`, `It is already late`, `It is getting late`], hints: [
        { missing: `it`, text: `Нужно подлежащее: It's late.` },
        { extra: `too`, text: `Too late — «слишком поздно». «Уже поздно» — It's late.` },
        { single: true, text: `Начни с It's: It's late.` },
      ] },
      { t: `type`, q: `Напиши по-английски: «Мне нравится этот город»`, topic: `word_order`, example: `I like this city.`, answers: [`I like this city`, `I love this city`, `I like this town`, `I love this town`, `I really like this city`], hints: [
        { extra: `me`, text: `По-русски «мне нравится», а по-английски «я люблю»: I like…` },
        { extra: `likes`, text: `С I — like, без -s.` },
        { extra: `is`, text: `Is не нужен: I like this city.` },
      ] },
      { t: `type`, q: `Напиши по-английски: «Она всегда пьёт кофе утром»`, topic: `word_order`, example: `She always drinks coffee in the morning.`, answers: [
        `She always drinks coffee in the morning`, `She always drinks coffee in the mornings`, `In the morning she always drinks coffee`,
        `She always has coffee in the morning`,
      ], hints: [
        { extra: `drink`, text: `С she — drinks (с -s).` },
        { extra: `at`, text: `«Утром» — in the morning.` },
        { extra: `is`, text: `Is не нужен: She always drinks…` },
      ] },
      { t: `type`, q: `Напиши по-английски: «Это большой город»`, topic: `word_order`, example: `It's a big city.`, answers: [`It is a big city`, `This is a big city`, `That is a big city`], hints: [
        { missing: `a`, text: `Нужен артикль: a big city.` },
        { missing: `is`, text: `Нужен is: It is (It's)…` },
        { extra: `bigs`, text: `Прилагательное не меняется: big.` },
      ] },
    ],
  },

  // ===================== 17. Предлоги времени =====================
  {
    id: `prep_time`,
    level: `A1`,
    title: `Предлоги времени: at / on / in`,
    goal: `Сможешь договориться о встрече: at 7, on Friday, in the morning`,
    rule: `prep_time`,
    steps: [
      { t: `choice`, q: `Сэму: «Увидимся в пятницу!»`, topic: `prep_time`, opts: [
        { en: `See you on Friday!`, ok: true },
        { en: `See you in Friday!`, why: `Дни недели — on: on Friday.` },
        { en: `See you at Friday!`, why: `Дни недели — on: on Friday.` },
      ] },
      { t: `choice`, q: `Прия в банке: «Встреча в 3 часа дня»`, topic: `prep_time`, opts: [
        { en: `The meeting is at 3 p.m.`, ok: true },
        { en: `The meeting is in 3 p.m.`, why: `Точное время — at.` },
        { en: `The meeting is on 3 p.m.`, why: `Точное время — at.` },
      ] },
      { t: `choice`, q: `«Я работаю утром»`, topic: `prep_time`, opts: [
        { en: `I work in the morning.`, ok: true },
        { en: `I work at the morning.`, why: `Части дня — in the morning (но at night).` },
        { en: `I work on the morning.`, why: `Части дня — in the morning.` },
      ] },
      { t: `choice`, q: `«Я позвоню тебе завтра»`, topic: `prep_time`, opts: [
        { en: `I'll call you tomorrow.`, ok: true },
        { en: `I'll call you on tomorrow.`, why: `С tomorrow, today, tonight предлог не нужен.` },
        { en: `I'll call you at tomorrow.`, why: `С tomorrow предлог не нужен.` },
      ] },
      { t: `choice`, q: `«Мой день рождения в мае»`, topic: `prep_time`, opts: [
        { en: `My birthday is in May.`, ok: true },
        { en: `My birthday is on May.`, why: `Месяцы — in: in May. (Но с датой — on May 5th.)` },
        { en: `My birthday is at May.`, why: `Месяцы — in: in May.` },
      ] },
      { t: `build`, q: `Составь: «Магазин закрывается в десять»`, topic: `prep_time`, answer: `The store closes at ten`, extra: [`in`, `on`, `close`], hints: [
        { extra: `in`, text: `Точное время — at.` },
        { extra: `on`, text: `Точное время — at.` },
        { extra: `close`, text: `The store = it: closes.` },
      ] },
      { t: `build`, q: `Составь: «Я работаю с понедельника по пятницу»`, topic: `prep_time`, answer: `I work Monday through Friday`, extra: [`on`, `till`, `in`], hints: [
        { extra: `on`, text: `В конструкции Monday through Friday предлог on не нужен.` },
        { extra: `till`, text: `По-американски: Monday through Friday (включительно).` },
        { extra: `in`, text: `С днями недели in не используем.` },
      ] },
      { t: `build`, q: `Составь: «Увидимся на выходных»`, topic: `prep_time`, answer: `See you on the weekend`, extra: [`at`, `in`, `weekends`], hints: [
        { extra: `at`, text: `At the weekend — британское. В США — on the weekend.` },
        { extra: `in`, text: `В США — on the weekend.` },
        { extra: `weekends`, text: `Одни конкретные выходные — the weekend.` },
      ] },
      { t: `type`, q: `Напиши по-английски: «Увидимся в 7 вечера»`, topic: `prep_time`, example: `See you at 7 p.m.`, answers: [
        `See you at 7 p.m.`, `See you at 7 pm`, `See you at 7pm`, `See you at seven p.m.`, `See you at seven pm`,
        `See you at 7`, `See you at seven`, `See you at 7 in the evening`, `See you at seven in the evening`,
        `See you tonight at 7`, `See you tonight at seven`, `See you at 7 tonight`, `See you at seven tonight`,
      ], hints: [
        { extra: `in`, text: `Точное время — at: at 7 p.m.` },
        { extra: `on`, text: `Точное время — at: at 7 p.m.` },
        { extra: `19`, text: `В США говорят 7 p.m., а не 19.` },
        { missing: `at`, text: `Точное время — at.` },
      ] },
      { t: `type`, q: `Напиши по-английски: «Мой день рождения в марте»`, topic: `prep_time`, example: `My birthday is in March.`, answers: [`My birthday is in March`], hints: [
        { extra: `on`, text: `Месяц — in: in March.` },
        { extra: `at`, text: `Месяц — in: in March.` },
        { missing: `is`, text: `Нужен is: My birthday is…` },
      ] },
      { t: `type`, q: `Напиши по-английски: «Я пью кофе утром»`, topic: `prep_time`, example: `I drink coffee in the morning.`, answers: [
        `I drink coffee in the morning`, `I drink coffee in the mornings`, `In the morning I drink coffee`, `I have coffee in the morning`,
      ], hints: [
        { extra: `at`, text: `Части дня — in the morning (но at night).` },
        { extra: `on`, text: `Части дня — in the morning.` },
        { missing: `the`, text: `In the morning — с the.` },
      ] },
      { t: `type`, q: `Напиши по-английски: «Увидимся завтра!»`, topic: `prep_time`, example: `See you tomorrow!`, answers: [`See you tomorrow`, `See ya tomorrow`], hints: [
        { extra: `on`, text: `С tomorrow предлог не нужен.` },
        { extra: `in`, text: `С tomorrow предлог не нужен.` },
        { extra: `will`, text: `Готовая фраза: See you tomorrow!` },
      ] },
    ],
  },

  // ===================== 18. can =====================
  {
    id: `can`,
    level: `A1`,
    title: `can / can't: могу, умею, можно`,
    goal: `Сможешь сказать, что умеешь, и вежливо попросить: Can I…? Can you…?`,
    rule: `can`,
    steps: [
      { t: `choice`, q: `Мария-спасатель спрашивает на пляже. Ответь: «Я не умею плавать»`, topic: `can`, opts: [
        { en: `I can't swim.`, ok: true },
        { en: `I don't can swim.`, why: `С can не нужен do: I can't.` },
        { en: `I can't to swim.`, why: `После can — глагол без to.` },
      ] },
      { t: `choice`, q: `В банке у Прии: «Можно оплатить картой?»`, topic: `can`, opts: [
        { en: `Can I pay by card?`, ok: true },
        { en: `Can I to pay by card?`, why: `После can — без to.` },
        { en: `Do I can pay by card?`, why: `С can не нужен do: Can I…?` },
      ] },
      { t: `choice`, q: `«Она умеет водить»`, topic: `can`, opts: [
        { en: `She can drive.`, ok: true },
        { en: `She cans drive.`, why: `Can не меняется: she can.` },
        { en: `She can drives.`, why: `После can глагол без -s.` },
      ] },
      { t: `choice`, q: `Маркус говорит слишком быстро. «Можете говорить помедленнее?»`, topic: `can`, opts: [
        { en: `Can you speak slower, please?`, ok: true },
        { en: `Can you to speak slower, please?`, why: `После can — без to.` },
        { en: `Do you can speak slower, please?`, why: `С can не нужен do: Can you…?` },
      ] },
      { t: `build`, q: `Составь: «Можешь мне помочь?»`, topic: `can`, answer: `Can you help me?`, extra: [`to`, `I`, `my`], hints: [
        { extra: `to`, text: `После can — без to.` },
        { extra: `i`, text: `После глагола — me: help me.` },
        { extra: `my`, text: `«Мне» — me.` },
      ] },
      { t: `build`, q: `Составь: «Я не могу найти свои ключи»`, topic: `can`, answer: `I can't find my keys`, extra: [`don't`, `to`, `me`], hints: [
        { extra: `do`, text: `С can не нужен don't: I can't.` },
        { extra: `to`, text: `После can't — без to.` },
        { extra: `me`, text: `«Свои ключи» — my keys.` },
      ] },
      { t: `build`, q: `Составь: «Можно здесь сесть?»`, topic: `can`, answer: `Can I sit here?`, extra: [`to`, `me`, `sits`], hints: [
        { extra: `to`, text: `После can — без to.` },
        { extra: `me`, text: `«Можно мне?» = «Могу ли я?»: Can I…?` },
        { extra: `sits`, text: `После can — глагол без -s.` },
      ] },
      { t: `build`, q: `Составь: «Дэв умеет готовить»`, topic: `can`, answer: `Dev can cook`, extra: [`cooks`, `to`, `is`], hints: [
        { extra: `cooks`, text: `После can — глагол без -s.` },
        { extra: `to`, text: `После can — без to.` },
        { extra: `is`, text: `Is не нужен: Dev can cook.` },
      ] },
      { t: `type`, q: `Напиши по-английски: «Я умею плавать»`, topic: `can`, example: `I can swim.`, answers: [`I can swim`], hints: [
        { extra: `to`, text: `После can — без to.` },
        { extra: `am`, text: `Am не нужен: I can swim.` },
        { extra: `swimming`, text: `После can — глагол как в словаре: swim.` },
      ] },
      { t: `type`, q: `У Джесс: «Можно мне кофе?»`, topic: `can`, example: `Can I get a coffee?`, answers: [
        `Can I get a coffee`, `Can I have a coffee`, `Can I get a coffee please`, `Can I have a coffee please`,
        `Could I get a coffee`, `Could I have a coffee`, `Could I get a coffee please`, `Could I have a coffee please`,
        `Can I get some coffee`, `Can I have some coffee`,
      ], hints: [
        { extra: `me`, text: `«Можно мне» = «могу ли я»: Can I get…?` },
        { extra: `to`, text: `После can — без to.` },
        { missing: `a`, text: `Одна чашка — a coffee.` },
      ] },
      { t: `type`, q: `Напиши Сэму: «Я не могу прийти сегодня»`, topic: `can`, example: `I can't come today.`, answers: [`I can not come today`, `I can not make it today`, `I can not come tonight`], hints: [
        { extra: `do`, text: `С can не нужен don't: I can't.` },
        { extra: `to`, text: `После can't — без to.` },
        { missing: `not`, text: `«Не могу» — can't.` },
      ] },
      { t: `type`, q: `Спроси: «Ты умеешь водить?»`, topic: `can`, example: `Can you drive?`, answers: [`Can you drive`, `Do you know how to drive`], hints: [
        { extra: `drives`, text: `После can — глагол без -s.` },
        { missing: `can`, text: `Вопрос начинается с Can: Can you drive?` },
        { extra: `are`, text: `Are не нужен: Can you drive?` },
      ] },
    ],
  },

  // ===================== 19. Просьбы и команды =====================
  {
    id: `imperatives`,
    level: `A1`,
    title: `Просьбы и команды: Go! Don't go!`,
    goal: `Сможешь объяснить дорогу, попросить и предложить: Turn left. Don't worry. Let's go!`,
    rule: `imperatives`,
    steps: [
      { t: `choice`, q: `Сэм нервничает перед собеседованием. «Не переживай!»`, topic: `imperatives`, opts: [
        { en: `Don't worry!`, ok: true },
        { en: `Not worry!`, why: `Запрет — Don't + глагол.` },
        { en: `No worry!`, why: `Правильно: Don't worry! (или No worries!)` },
      ] },
      { t: `choice`, q: `«Пойдём!»`, topic: `imperatives`, opts: [
        { en: `Let's go!`, ok: true },
        { en: `Let's to go!`, why: `После let's — глагол без to.` },
        { en: `Let's going!`, why: `После let's — глагол как в словаре: go.` },
      ] },
      { t: `choice`, q: `Объясняешь туристу: «Поверните направо на углу»`, topic: `imperatives`, opts: [
        { en: `Turn right at the corner.`, ok: true },
        { en: `Turning right at the corner.`, why: `Просьба или указание — глагол в начальной форме: Turn.` },
        { en: `To turn right at the corner.`, why: `Указание — глагол без to: Turn right.` },
      ] },
      { t: `choice`, q: `«Не опаздывай!»`, topic: `imperatives`, opts: [
        { en: `Don't be late!`, ok: true },
        { en: `Don't late!`, why: `Late — прилагательное, нужен be: Don't be late!` },
        { en: `Not be late!`, why: `Запрет — Don't: Don't be late!` },
      ] },
      { t: `build`, q: `Составь: «Иди прямо и поверни налево»`, topic: `imperatives`, answer: `Go straight and turn left`, extra: [`to`, `turns`, `on`], hints: [
        { extra: `to`, text: `Указание — глагол без to.` },
        { extra: `turns`, text: `Указание — глагол без -s: turn.` },
        { extra: `on`, text: `Просто turn left, без on.` },
      ] },
      { t: `build`, q: `Составь (please — в конце): «Садитесь, пожалуйста»`, topic: `imperatives`, answer: `Have a seat, please`, extra: [`sit`, `the`, `down`], hints: [
        { extra: `sit`, text: `Вежливое «садитесь» — Have a seat.` },
        { extra: `the`, text: `Устойчиво: have a seat.` },
        { extra: `down`, text: `Have a seat — без down.` },
      ] },
      { t: `build`, q: `Составь: «Давай возьмём кофе»`, topic: `imperatives`, answer: `Let's grab a coffee`, extra: [`to`, `take`, `the`], hints: [
        { extra: `to`, text: `После let's — без to.` },
        { extra: `take`, text: `Take a coffee — калька. Говорят grab (или get) a coffee.` },
        { extra: `the`, text: `Какой-то кофе — a coffee.` },
      ] },
      { t: `build`, q: `Составь: «Не забудь свой билет»`, topic: `imperatives`, answer: `Don't forget your ticket`, extra: [`Not`, `forgets`, `you`], hints: [
        { extra: `forgets`, text: `После don't — глагол без -s.` },
        { extra: `you`, text: `«Свой билет» — your ticket.` },
        { missing: `do`, text: `Запрет начинается с Don't.` },
      ] },
      { t: `type`, q: `Напиши по-английски: «Не переживай об этом»`, topic: `imperatives`, example: `Don't worry about it.`, answers: [`Do not worry about it`, `Do not worry about that`], hints: [
        { missing: `do`, text: `Запрет: Don't + глагол.` },
        { extra: `no`, text: `Запрет — Don't, не no.` },
        { extra: `of`, text: `«Об этом» — about it.` },
      ] },
      { t: `type`, q: `Объясни дорогу: «Поверните налево»`, topic: `imperatives`, example: `Turn left.`, answers: [`Turn left`, `Turn left please`, `Please turn left`, `Take a left`, `Make a left`], hints: [
        { extra: `you`, text: `Указание — просто глагол: Turn left.` },
        { extra: `to`, text: `Без to: Turn left.` },
        { extra: `on`, text: `Просто Turn left, без on.` },
      ] },
      { t: `type`, q: `Напиши по-английски: «Давай пойдём в парк!»`, topic: `imperatives`, example: `Let's go to the park!`, answers: [`Let's go to the park`], hints: [
        { extra: `going`, text: `После let's — go, без -ing.` },
        { missing: `the`, text: `Парк рядом, понятно какой — the park.` },
        { extra: `in`, text: `Куда? — to the park.` },
      ] },
      { t: `type`, q: `Напиши по-английски: «Подождите здесь, пожалуйста»`, topic: `imperatives`, example: `Wait here, please.`, answers: [`Wait here please`, `Please wait here`], hints: [
        { missing: `please`, text: `Не забывай please!` },
        { extra: `you`, text: `Просьба — просто глагол: Wait here.` },
        { extra: `waiting`, text: `Просьба — глагол в начальной форме: Wait.` },
      ] },
    ],
  },

  // ===================== 20. Вежливость =====================
  {
    id: `politeness`,
    level: `A1`,
    title: `Вежливость по-американски`,
    goal: `Сможешь вежливо заказать, попросить, извиниться и поблагодарить`,
    rule: `politeness`,
    steps: [
      { t: `choice`, q: `Заказываешь у Джесс большой кофе со льдом`, topic: `politeness`, opts: [
        { en: `Can I get a large iced coffee, please?`, ok: true },
        { en: `Give me a large iced coffee.`, why: `Звучит как приказ — грубо. Лучше: Can I get…, please?` },
        { en: `I want large iced coffee.`, why: `Грубовато, и нет артикля a.` },
      ] },
      { t: `choice`, q: `Тебе сказали «Thank you!» Ответь`, topic: `politeness`, opts: [
        { en: `You're welcome!`, ok: true },
        { en: `Please!`, why: `Please — «пожалуйста» в просьбе. В ответ на спасибо — You're welcome!` },
        { en: `Nothing!`, why: `«Не за что» не переводится дословно. Говорят: You're welcome! / No problem!` },
      ] },
      { t: `choice`, q: `Не расслышал, что сказал Маркус. Попроси повторить`, topic: `politeness`, opts: [
        { en: `Sorry, could you say that again?`, ok: true },
        { en: `What?!`, why: `Слишком резко. Мягче: Sorry? / Could you say that again?` },
        { en: `Repeat!`, why: `Звучит как приказ.` },
      ] },
      { t: `choice`, q: `В вагоне метро тебе нужно пройти к двери`, topic: `politeness`, opts: [
        { en: `Excuse me.`, ok: true },
        { en: `Sorry me.`, why: `Так не говорят. Чтобы пройти — Excuse me.` },
        { en: `Let me go!`, why: `Let me go! = «Отпусти меня!» Чтобы пройти — Excuse me.` },
      ] },
      { t: `build`, q: `В ресторане: «Можно счёт, пожалуйста?»`, topic: `politeness`, answer: `Could I get the check, please?`, extra: [`bill`, `a`, `give`], hints: [
        { extra: `bill`, text: `Bill — британское. В американском ресторане — the check.` },
        { extra: `a`, text: `Счёт за ваш стол — понятно какой: the check.` },
        { extra: `give`, text: `Вежливо: Could I get…?` },
      ] },
      { t: `build`, q: `Составь: «Не могли бы вы мне помочь, пожалуйста?»`, topic: `politeness`, answer: `Could you help me, please?`, extra: [`to`, `I`, `my`], hints: [
        { extra: `to`, text: `После could — без to.` },
        { extra: `i`, text: `После глагола — me: help me.` },
        { extra: `my`, text: `«Мне» — me.` },
      ] },
      { t: `build`, q: `Составь: «Спасибо, я очень признателен»`, topic: `politeness`, answer: `Thanks, I appreciate it`, extra: [`appreciates`, `am`, `very`], hints: [
        { extra: `appreciates`, text: `С I — без -s.` },
        { extra: `am`, text: `Am не нужен: I appreciate it.` },
        { extra: `very`, text: `Устойчиво: I appreciate it (можно I really appreciate it).` },
      ] },
      { t: `build`, q: `В пиццерии: «Я бы хотел кусок пиццы, пожалуйста»`, topic: `politeness`, answer: `I'd like a slice, please`, extra: [`want`, `an`, `will`], hints: [
        { extra: `want`, text: `I want звучит грубовато. Вежливо: I'd like…` },
        { extra: `an`, text: `Slice начинается с согласного: a slice.` },
        { extra: `will`, text: `«Я бы хотел» — I'd like (I would like).` },
      ] },
      { t: `type`, q: `У Тони: «Можно мне хот-дог, пожалуйста?»`, topic: `politeness`, example: `Can I get a hot dog, please?`, answers: [
        `Can I get a hot dog please`, `Can I have a hot dog please`, `Could I get a hot dog please`, `Could I have a hot dog please`,
        `I would like a hot dog please`, `Can I get a hotdog please`, `Can I have a hotdog please`, `Could I get a hotdog please`,
      ], hints: [
        { missing: `please`, text: `Не забывай please! Без него звучит грубовато.` },
        { extra: `give`, text: `Give me звучит как приказ. Вежливо: Can I get…, please?` },
        { extra: `want`, text: `I want звучит грубовато. Лучше: Can I get…?` },
      ] },
      { t: `type`, q: `Спроси прохожего: «Извините, где метро?»`, topic: `politeness`, example: `Excuse me, where's the subway?`, answers: [
        `Excuse me where is the subway`, `Excuse me where is the subway station`, `Excuse me where is the nearest subway station`,
      ], hints: [
        { missing: `excuse`, text: `К незнакомцу обращаются: Excuse me, …` },
        { extra: `metro`, text: `В Нью-Йорке говорят subway.` },
        { extra: `sorry`, text: `Чтобы обратиться к незнакомцу — Excuse me.` },
      ] },
      { t: `type`, q: `Ответь на «Thanks!»: «Не за что!»`, topic: `politeness`, example: `You're welcome!`, answers: [`You are welcome`, `No problem`, `No worries`, `Sure`, `Anytime`, `Sure thing`, `My pleasure`], hints: [
        { extra: `nothing`, text: `«Не за что» дословно не переводится: You're welcome! / No problem!` },
        { extra: `please`, text: `Please — в просьбе. В ответ на спасибо — You're welcome!` },
        { extra: `for`, text: `Просто: You're welcome!` },
      ] },
      { t: `type`, q: `Уходя от тележки Джесс: «Спасибо, хорошего дня!»`, topic: `politeness`, example: `Thanks, have a good one!`, answers: [
        `Thanks have a good one`, `Thank you have a good one`, `Thanks have a good day`, `Thank you have a good day`,
        `Thanks have a nice day`, `Thank you have a nice day`, `Thanks have a great day`, `Thank you have a great day`,
      ], hints: [
        { extra: `has`, text: `Пожелание — Have…` },
        { missing: `have`, text: `Пожелание: Have a good one!` },
        { missing: `a`, text: `Have a good day — с a.` },
      ] },
    ],
  },
];
