// Грамматика «Как это работает»: правила американского английского A1 → B1.
// Каждое правило: объяснение по-русски, формула, примеры, типичные ошибки и мини-тренировка.
// topics — темы заданий, к которым правило привязано (кнопка «❓ Как это работает»).
// В тексте можно использовать **жирный**.

export const GRAMMAR = [
  // ===================== A1 =====================
  {
    id: `to_be`, level: `A1`, title: `Глагол to be: am / is / are`, topics: [`to_be`],
    short: `В английском нельзя сказать «Я студент» — нужен глагол «быть»: I **am** a student.`,
    text: `По-русски мы пропускаем «есть»: «Я дома», «Она врач». В английском так нельзя — в каждом предложении нужен глагол. Если другого глагола нет, ставим **to be**.

**I** → **am**
**he / she / it** → **is**
**you / we / they** → **are**

В разговоре почти всегда сокращают: **I'm, you're, he's, she's, it's, we're, they're**.

**Вопрос:** переставляем глагол вперёд — You are tired → **Are you** tired?
**Отрицание:** добавляем **not** — I'm not tired. He **isn't** here. They **aren't** home.`,
    formula: `I am / He is / They are + кто? какой? где?`,
    examples: [
      [`I'm from Russia.`, `Я из России.`],
      [`She's a nurse.`, `Она медсестра.`],
      [`Are you ready?`, `Ты готов?`],
      [`We aren't hungry.`, `Мы не голодны.`],
    ],
    mistakes: [
      [`I from Russia.`, `I'm from Russia.`],
      [`He are my friend.`, `He's my friend.`],
      [`I is happy.`, `I'm happy.`],
    ],
    quiz: [
      { q: `Выбери правильно: «Она дома»`, opts: [{ en: `She's at home.`, ok: true }, { en: `She at home.`, why: `Нужен глагол to be: she is (she's).` }, { en: `She are at home.`, why: `С she — is, не are.` }] },
      { q: `«Вы готовы?»`, opts: [{ en: `Are you ready?`, ok: true }, { en: `You ready?`, why: `В вопросе to be ставим первым: Are you…?` }, { en: `Is you ready?`, why: `С you — are.` }] },
      { q: `«Я не устал»`, opts: [{ en: `I'm not tired.`, ok: true }, { en: `I not tired.`, why: `Нужен am: I am not (I'm not).` }, { en: `I don't tired.`, why: `С прилагательным — am not, а не don't.` }] },
    ],
  },
  {
    id: `pronouns`, level: `A1`, title: `Местоимения: I / me / my`, topics: [],
    short: `Три формы: кто делает (I), кого/кому (me), чей (my).`,
    text: `У каждого местоимения три основные формы:

| кто? | кого? кому? | чей? |
|---|---|---|
| I | me | my |
| you | you | your |
| he | him | his |
| she | her | her |
| it | it | its |
| we | us | our |
| they | them | their |

**Кто делает** — в начале: **She** likes coffee.
**Кого / кому** — после глагола и предлога: I like **her**. Call **me**! It's for **them**.
**Чей** — перед предметом: **my** phone, **their** apartment.

Важно: **it's** = it is, а **its** = «его/её» (о предмете). The cat ate **its** food.`,
    formula: `She likes him. He likes her. Their dog is cute.`,
    examples: [[`Can you help me?`, `Можешь мне помочь?`], [`This is my friend. His name is Sam.`, `Это мой друг. Его зовут Сэм.`], [`I love them.`, `Я их люблю.`]],
    mistakes: [[`Me name is Anna.`, `My name is Anna.`], [`Call to me.`, `Call me.`], [`I like she.`, `I like her.`]],
    quiz: [
      { q: `«Позвони мне!»`, opts: [{ en: `Call me!`, ok: true }, { en: `Call I!`, why: `После глагола — me.` }, { en: `Call my!`, why: `My — «мой», нужен me.` }] },
      { q: `«Это их квартира»`, opts: [{ en: `It's their apartment.`, ok: true }, { en: `It's them apartment.`, why: `Чей? — their.` }, { en: `It's they apartment.`, why: `They — «они», нужно their.` }] },
      { q: `«Я её знаю»`, opts: [{ en: `I know her.`, ok: true }, { en: `I know she.`, why: `После глагола — her.` }, { en: `I know hers.`, why: `Hers = «её» без предмета (it's hers). Здесь — her.` }] },
    ],
  },
  {
    id: `articles`, level: `A1`, title: `Артикли a / an / the`, topics: [`articles`],
    short: `a / an — «какой-то, один», the — «тот самый, понятно какой».`,
    text: `В русском артиклей нет, поэтому это одна из самых частых ошибок.

**a / an** — когда предмет **один** и его **можно посчитать**, и мы говорим о нём впервые или «какой-то»:
I need **a** coffee. She has **a** dog. He's **a** teacher (профессия — всегда с a!).
**an** — перед гласным **звуком**: **an** apple, **an** hour (h не читается), но **a** university (звук «ю»).

**the** — «тот самый», когда понятно, о чём речь:
I bought a phone. **The** phone is great. Where is **the** subway? (в городе одно метро)
Уникальное: **the** sun, **the** city, **the** park (тот, что рядом).

**Без артикля:**
— мн. число в общем смысле: I like dogs.
— неисчисляемое в общем: I love coffee. Money is important.
— имена, города, страны: Brooklyn, Russia (но **the** US, **the** UK).
— после my, your, this: my car (не the my car).`,
    formula: `a + согласный звук, an + гласный звук, the = тот самый`,
    examples: [[`I'm a student.`, `Я студент.`], [`Can I get an iced coffee?`, `Можно мне кофе со льдом?`], [`The coffee here is great.`, `Кофе здесь отличный.`], [`I like pizza.`, `Я люблю пиццу.`]],
    mistakes: [[`I am student.`, `I'm a student.`], [`I need a advice.`, `I need some advice. (advice — неисчисляемое)`], [`She is an teacher.`, `She's a teacher.`]],
    quiz: [
      { q: `«Он врач»`, opts: [{ en: `He's a doctor.`, ok: true }, { en: `He's doctor.`, why: `С профессией нужен a.` }, { en: `He's the doctor.`, why: `The — «тот самый врач». Просто профессия — a doctor.` }] },
      { q: `Вставь артикль: «I want ___ apple.»`, opts: [{ en: `an`, ok: true }, { en: `a`, why: `Apple начинается с гласного звука — an.` }, { en: `the`, why: `Мы говорим о каком-то яблоке впервые — an.` }] },
      { q: `«Где метро?» (в этом городе)`, opts: [{ en: `Where's the subway?`, ok: true }, { en: `Where's a subway?`, why: `Метро в городе понятно какое — the.` }, { en: `Where's subway?`, why: `Нужен артикль the.` }] },
    ],
  },
  {
    id: `plurals`, level: `A1`, title: `Множественное число`, topics: [],
    short: `Обычно +s: car → cars. Но есть исключения: man → men, child → children.`,
    text: `**+s** — почти всегда: book → books, apple → apples.
**+es** — после s, sh, ch, x: bus → bus**es**, watch → watch**es**, box → box**es**.
**y → ies** после согласной: city → cit**ies**, baby → bab**ies** (но day → days).
**f → ves**: knife → kni**ves**, wife → wi**ves**.

**Неправильные — выучи наизусть:**
man → **men**, woman → **women**, child → **children**, person → **people**, foot → **feet**, tooth → **teeth**, mouse → **mice**.

**Не меняются:** fish, sheep.
**Неисчисляемые** (без -s): water, money, coffee, music, advice, information, furniture, homework.`,
    formula: `book → books, bus → buses, city → cities, man → men`,
    examples: [[`Two coffees, please.`, `Два кофе, пожалуйста. (две порции — можно)`], [`There are many people here.`, `Здесь много людей.`], [`My feet hurt.`, `У меня болят ноги (ступни).`]],
    mistakes: [[`two childs`, `two children`], [`many peoples`, `many people`], [`informations`, `information`]],
    quiz: [
      { q: `Мн. число от «child»`, opts: [{ en: `children`, ok: true }, { en: `childs`, why: `Это исключение: children.` }, { en: `childrens`, why: `Children уже мн. число, -s не нужен.` }] },
      { q: `Мн. число от «city»`, opts: [{ en: `cities`, ok: true }, { en: `citys`, why: `После согласной y → ies.` }, { en: `cityes`, why: `y меняется на i: cities.` }] },
      { q: `«Мне нужна информация»`, opts: [{ en: `I need some information.`, ok: true }, { en: `I need informations.`, why: `Information — неисчисляемое, без -s.` }, { en: `I need an information.`, why: `С неисчисляемым нельзя a/an.` }] },
    ],
  },
  {
    id: `present_simple`, level: `A1`, title: `Present Simple: I work / he works`, topics: [],
    short: `Привычки и факты. С he / she / it к глаголу добавляем -s.`,
    text: `**Present Simple** — то, что бывает обычно, регулярно, всегда:
I **work** in Brooklyn. She **drinks** coffee every day. The subway **opens** at 5 a.m.

Главное правило: с **he / she / it** добавляем **-s**:
I work → he work**s**, I go → she go**es**, I have → he **has**.
(-es после o, s, sh, ch, x: goes, watches, fixes; y → ies: study → studies)

Слова-подсказки: **every day, usually, always, often, sometimes, never, on Mondays**.

Вопросы и отрицания — через **do / does** (см. правило «do / does»).`,
    formula: `I / you / we / they + глагол;  he / she / it + глагол-s`,
    examples: [[`I live in Brooklyn.`, `Я живу в Бруклине.`], [`She works at a coffee shop.`, `Она работает в кофейне.`], [`He goes to the gym on Mondays.`, `Он ходит в спортзал по понедельникам.`]],
    mistakes: [[`She work here.`, `She works here.`], [`He have a car.`, `He has a car.`], [`I works.`, `I work.`]],
    quiz: [
      { q: `«Она живёт в Нью-Йорке»`, opts: [{ en: `She lives in New York.`, ok: true }, { en: `She live in New York.`, why: `С she добавляем -s: lives.` }, { en: `She is live in New York.`, why: `Не смешивай is и глагол: she lives.` }] },
      { q: `«У него есть машина»`, opts: [{ en: `He has a car.`, ok: true }, { en: `He have a car.`, why: `С he — has.` }, { en: `He haves a car.`, why: `have → has (неправильная форма).` }] },
      { q: `«Я каждый день пью кофе»`, opts: [{ en: `I drink coffee every day.`, ok: true }, { en: `I drinks coffee every day.`, why: `С I — без -s.` }, { en: `I am drink coffee every day.`, why: `Не нужен am: I drink.` }] },
    ],
  },
  {
    id: `do_does`, level: `A1`, title: `Вопросы и отрицания: do / does / don't`, topics: [`have`],
    short: `Do you like…? — Yes, I do. / I don't like… / Does she work…?`,
    text: `В Present Simple вопросы и отрицания строятся с помощником **do** (или **does** для he/she/it).

**Вопрос:** Do + кто + глагол?
**Do** you like pizza? **Do** they live here?
**Does** she work today? (-s уходит в does, глагол без -s!)

**Отрицание:** don't / doesn't + глагол
I **don't** have a car. He **doesn't** speak Russian.

**Короткие ответы:** Yes, I **do**. / No, I **don't**. Yes, she **does**. / No, she **doesn't**.

Не путай с to be! С прилагательными и «где/кто» — am/is/are:
Are you tired? (не Do you tired?) / I'm not hungry.`,
    formula: `Do you…? Does she…? I don't… He doesn't…`,
    examples: [[`Do you have a pet?`, `У тебя есть питомец?`], [`No, I don't.`, `Нет.`], [`She doesn't drink coffee.`, `Она не пьёт кофе.`], [`Does the bus stop here?`, `Автобус здесь останавливается?`]],
    mistakes: [[`I not like it.`, `I don't like it.`], [`Does she works?`, `Does she work?`], [`You like pizza?`, `Do you like pizza? (в разговоре можно, но правильнее с do)`]],
    quiz: [
      { q: `«Ты любишь джаз?»`, opts: [{ en: `Do you like jazz?`, ok: true }, { en: `Are you like jazz?`, why: `С глаголом like — do, а не are.` }, { en: `Like you jazz?`, why: `Вопрос начинается с Do.` }] },
      { q: `«Она не говорит по-английски»`, opts: [{ en: `She doesn't speak English.`, ok: true }, { en: `She don't speak English.`, why: `С she — doesn't.` }, { en: `She doesn't speaks English.`, why: `После doesn't глагол без -s.` }] },
      { q: `«Do you have a car?» — «Да»`, opts: [{ en: `Yes, I do.`, ok: true }, { en: `Yes, I have.`, why: `Короткий ответ на Do…? — Yes, I do.` }, { en: `Yes, I am.`, why: `Вопрос с do — ответ с do.` }] },
    ],
  },
  {
    id: `questions`, level: `A1`, title: `Вопросы: what, where, when, who, why, how`, topics: [`questions`],
    short: `Вопросительное слово + помощник (is/are/do/does/can) + кто + остальное.`,
    text: `**Вопросительные слова:**
**what** — что, какой · **where** — где, куда · **when** — когда · **who** — кто
**why** — почему · **how** — как · **which** — который · **whose** — чей
**how much** — сколько (деньги, неисчисляемое) · **how many** — сколько (штук)
**how old** — сколько лет · **how long** — как долго · **what time** — во сколько

**Порядок слов — главное:** вопросительное слово → помощник → кто → глагол
Where **are** you from? What **do** you do? When **does** it open? How **can** I help?

По-русски «Где ты живёшь?» — по-английски нужен помощник: Where **do you** live?

**Who** как подлежащее — без do: **Who** lives here? (а не Who does live)`,
    formula: `Where + are/do/can + you + …?`,
    examples: [[`What's your name?`, `Как тебя зовут?`], [`Where do you work?`, `Где ты работаешь?`], [`How much is it?`, `Сколько это стоит?`], [`What time does it close?`, `Во сколько закрывается?`]],
    mistakes: [[`Where you live?`, `Where do you live?`], [`How much it costs?`, `How much does it cost?`], [`What you want?`, `What do you want?`]],
    quiz: [
      { q: `«Где ты работаешь?»`, opts: [{ en: `Where do you work?`, ok: true }, { en: `Where you work?`, why: `Нужен помощник do.` }, { en: `Where are you work?`, why: `С глаголом work — do, а не are.` }] },
      { q: `«Сколько стоит?»`, opts: [{ en: `How much is it?`, ok: true }, { en: `How many is it?`, why: `Про деньги — how much.` }, { en: `How much it is?`, why: `Порядок: How much is it?` }] },
      { q: `«Во сколько открывается?»`, opts: [{ en: `What time does it open?`, ok: true }, { en: `What time it opens?`, why: `Нужен does: What time does it open?` }, { en: `When time does it open?`, why: `«Во сколько» — what time.` }] },
    ],
  },
  {
    id: `word_order`, level: `A1`, title: `Порядок слов в предложении`, topics: [`word_order`],
    short: `Кто → что делает → что/кого → где → когда. Порядок строгий!`,
    text: `В русском можно переставлять слова: «Кофе я люблю», «Люблю я кофе». В английском — **нет**. Смысл держится на порядке.

**Подлежащее → глагол → дополнение → место → время**
**I** **drink** **coffee** **at home** **every morning**.
**She** **met** **Sam** **in the park** **yesterday**.

Подлежащее нужно **всегда**, даже если по-русски его нет:
«Идёт дождь» → **It's** raining. «Холодно» → **It's** cold. «Уже поздно» → **It's** late.

Прилагательное — **перед** существительным: a **big** city (не a city big).
Наречия частоты — **перед** глаголом, но **после** am/is/are: I **often** walk. She is **always** late.`,
    formula: `Who + does + what + where + when`,
    examples: [[`I bought a coffee at Jess's cart this morning.`, `Сегодня утром я купил кофе у Джесс.`], [`It's cold today.`, `Сегодня холодно.`], [`We usually eat lunch at noon.`, `Мы обычно обедаем в полдень.`]],
    mistakes: [[`Coffee I like.`, `I like coffee.`], [`Is raining.`, `It's raining.`], [`I like very much pizza.`, `I like pizza very much.`]],
    quiz: [
      { q: `«Идёт дождь»`, opts: [{ en: `It's raining.`, ok: true }, { en: `Is raining.`, why: `Нужно подлежащее it.` }, { en: `Rain goes.`, why: `Дословный перевод не работает: It's raining.` }] },
      { q: `«Я очень люблю пиццу»`, opts: [{ en: `I love pizza so much.`, ok: true }, { en: `I very much love pizza.`, why: `Very much / so much ставим в конце.` }, { en: `Pizza I love very.`, why: `Порядок: кто → глагол → что.` }] },
      { q: `«Вчера я видел Сэма в парке»`, opts: [{ en: `I saw Sam in the park yesterday.`, ok: true }, { en: `I saw in the park Sam yesterday.`, why: `Сначала кого (Sam), потом где.` }, { en: `Yesterday saw I Sam in the park.`, why: `После времени всё равно: кто → глагол.` }] },
    ],
  },
  {
    id: `have`, level: `A1`, title: `have / has: «у меня есть»`, topics: [`have`],
    short: `«У меня есть машина» = I have a car. «У неё есть» = She has.`,
    text: `Русское «у меня есть» по-английски строится через глагол **have** («иметь»):
**I have** a sister. **They have** an apartment.
С he / she / it — **has**: **She has** a dog.

**Вопрос и отрицание — с do / does:**
**Do** you **have** a pet? — Yes, I do.
I **don't have** time. He **doesn't have** a job.

**American vs British:** британцы часто говорят «I've got a car», «Have you got…?». В Америке тоже понимают, но чаще говорят просто **I have** / **Do you have…?**

Have ещё значит «есть, пить, проводить»: have breakfast (завтракать), have a coffee, have fun (веселиться), have a good day!`,
    formula: `I / you / we / they have; he / she / it has; Do you have…? I don't have…`,
    examples: [[`I have two brothers.`, `У меня два брата.`], [`Does she have a car?`, `У неё есть машина?`], [`We don't have much time.`, `У нас мало времени.`], [`Have a good one!`, `Хорошего дня!`]],
    mistakes: [[`I have not a pet.`, `I don't have a pet.`], [`She have a dog.`, `She has a dog.`], [`Have you a car?`, `Do you have a car?`]],
    quiz: [
      { q: `«У меня нет времени»`, opts: [{ en: `I don't have time.`, ok: true }, { en: `I have not time.`, why: `Отрицание через don't: I don't have.` }, { en: `I not have time.`, why: `Нужен don't.` }] },
      { q: `«У неё есть собака»`, opts: [{ en: `She has a dog.`, ok: true }, { en: `She have a dog.`, why: `С she — has.` }, { en: `She is have a dog.`, why: `Не нужен is.` }] },
      { q: `«У вас есть Wi-Fi?» (в кафе)`, opts: [{ en: `Do you have Wi-Fi?`, ok: true }, { en: `Have you Wi-Fi?`, why: `В американском — Do you have…?` }, { en: `Are you have Wi-Fi?`, why: `С have — do, а не are.` }] },
    ],
  },
  {
    id: `can`, level: `A1`, title: `can / can't: могу, умею, можно`, topics: [],
    short: `После can — глагол без to и без -s: She can swim.`,
    text: `**Can** = могу, умею, можно. Одинаковый для всех лиц:
I **can** swim. She **can** drive. (не cans, не can to)

**Отрицание:** **can't** (= cannot): I **can't** dance.
**Вопрос:** Can + кто + глагол? **Can** you help me? **Can** I sit here?

**Просьбы:** Can I get…? Can you…? — вежливо.
**Could** — ещё вежливее: **Could** you say that again?

**Произношение (американское!):** can — короткое «кэн» (часто почти «кн»), **can't** — длинное и ударное «кэнт». Слушай ударение: I *can* go vs I **CAN'T** go.`,
    formula: `I / she / they + can / can't + глагол`,
    examples: [[`Can you speak slower, please?`, `Можете говорить помедленнее?`], [`I can't find my keys.`, `Я не могу найти ключи.`], [`Can I pay by card?`, `Можно оплатить картой?`]],
    mistakes: [[`I can to swim.`, `I can swim.`], [`She cans drive.`, `She can drive.`], [`I don't can.`, `I can't.`]],
    quiz: [
      { q: `«Я не умею плавать»`, opts: [{ en: `I can't swim.`, ok: true }, { en: `I don't can swim.`, why: `С can не нужен do: can't.` }, { en: `I can't to swim.`, why: `После can — без to.` }] },
      { q: `«Можно оплатить картой?»`, opts: [{ en: `Can I pay by card?`, ok: true }, { en: `Can I to pay by card?`, why: `Без to.` }, { en: `I can pay by card?`, why: `В вопросе can ставим первым.` }] },
      { q: `«Она умеет водить»`, opts: [{ en: `She can drive.`, ok: true }, { en: `She cans drive.`, why: `Can не меняется: she can.` }, { en: `She can drives.`, why: `После can глагол без -s.` }] },
    ],
  },
  {
    id: `there_is`, level: `A1`, title: `There is / There are: «есть, находится»`, topics: [],
    short: `«В парке есть фонтан» = There's a fountain in the park.`,
    text: `Когда говорим, что **где-то что-то есть** (существует, находится), используем **there is / there are**:

**There is** (There's) + один предмет: There's a café on the corner.
**There are** + много: There are two parks in my area.

**Вопрос:** **Is there** a bank near here? **Are there** any good restaurants?
**Отрицание:** There **isn't** a subway here. There **aren't** any tables.

По-русски мы начинаем с места («В городе есть…»), а по-английски — с There is, место — в конце:
**There's** a great pizza place **in Manhattan**.`,
    formula: `There is + a/an … / There are + много … + где`,
    examples: [[`There's a bodega on the corner.`, `На углу есть магазинчик.`], [`Is there a restroom here?`, `Здесь есть туалет?`], [`There are a lot of tourists in Times Square.`, `На Таймс-сквер много туристов.`]],
    mistakes: [[`In the park is a fountain.`, `There's a fountain in the park.`], [`There is many people.`, `There are many people.`], [`Have a bank near here?`, `Is there a bank near here?`]],
    quiz: [
      { q: `«Здесь рядом есть банк?»`, opts: [{ en: `Is there a bank near here?`, ok: true }, { en: `Have a bank near here?`, why: `«Есть ли» — Is there…?` }, { en: `There is a bank near here?`, why: `В вопросе is ставим первым: Is there…?` }] },
      { q: `«В парке много деревьев»`, opts: [{ en: `There are a lot of trees in the park.`, ok: true }, { en: `There is a lot of trees in the park.`, why: `Trees — много, поэтому are.` }, { en: `In the park are many trees.`, why: `Начинаем с There are.` }] },
      { q: `«Здесь нет метро»`, opts: [{ en: `There isn't a subway here.`, ok: true }, { en: `There no subway here.`, why: `Нужен глагол: there isn't.` }, { en: `Here don't have subway.`, why: `Используем there isn't.` }] },
    ],
  },
  {
    id: `this_that`, level: `A1`, title: `this / that / these / those`, topics: [],
    short: `this — это (рядом), that — то (далеко). Мн. число: these / those.`,
    text: `**this** — этот (рядом со мной): **This** coffee is great.
**that** — тот (далеко): Who's **that** guy?
**these** — эти (много, рядом): **These** shoes are new.
**those** — те (много, далеко): **Those** buildings are so tall!

Полезные фразы:
**That's** great! / **That's** OK. / **That's** it! (вот и всё)
**This is** Sam. (знакомя людей) — Это Сэм.
По телефону: **This is** Anna. — Это Анна (говорит).`,
    formula: `this / that + один; these / those + много`,
    examples: [[`This is my friend Jess.`, `Это моя подруга Джесс.`], [`How much are these?`, `Сколько стоят эти?`], [`That's awesome!`, `Это круто!`]],
    mistakes: [[`This shoes are new.`, `These shoes are new.`], [`That buildings`, `Those buildings`], [`It is my friend Jess.`, `This is my friend Jess.`]],
    quiz: [
      { q: `«Сколько стоят эти (кроссовки)?»`, opts: [{ en: `How much are these?`, ok: true }, { en: `How much is this?`, why: `Кроссовки — много: these, are.` }, { en: `How much are this?`, why: `Мн. число — these.` }] },
      { q: `Знакомишь: «Это мой брат»`, opts: [{ en: `This is my brother.`, ok: true }, { en: `It's my brother.`, why: `Знакомя, говорят This is…` }, { en: `That my brother.`, why: `Нужен глагол: This is.` }] },
      { q: `«Те здания такие высокие!»`, opts: [{ en: `Those buildings are so tall!`, ok: true }, { en: `That buildings are so tall!`, why: `Мн. число — those.` }, { en: `These building is so tall!`, why: `Здания — мн. число и далеко: those buildings are.` }] },
    ],
  },
  {
    id: `imperatives`, level: `A1`, title: `Просьбы и команды: Go! Don't go!`, topics: [`directions`],
    short: `Просто глагол: Turn left. Отрицание: Don't + глагол.`,
    text: `Чтобы попросить, предложить или объяснить дорогу, используем глагол **без подлежащего**:
**Go** straight. **Turn** left. **Take** the L train. **Have** a seat. **Enjoy**!

**Отрицание:** **Don't** + глагол: **Don't** worry. **Don't** be late!
**Мягче:** Please + глагол / глагол + please: Please sit down. Wait here, please.
**Давай(те):** **Let's** + глагол: **Let's** go! **Let's** grab a coffee.

Американцы очень часто смягчают: «**Feel free to** ask» (спрашивай не стесняясь), «**Make sure to** take your ticket» (обязательно возьми билет).`,
    formula: `Глагол! / Don't + глагол! / Let's + глагол!`,
    examples: [[`Go straight and turn right.`, `Иди прямо и поверни направо.`], [`Don't worry about it.`, `Не переживай об этом.`], [`Let's hang out this weekend!`, `Давай потусим на выходных!`]],
    mistakes: [[`Not worry!`, `Don't worry!`], [`Let's to go!`, `Let's go!`], [`You turn left.`, `Turn left. (объясняя дорогу)`]],
    quiz: [
      { q: `«Не опаздывай!»`, opts: [{ en: `Don't be late!`, ok: true }, { en: `Not be late!`, why: `Отрицание — Don't.` }, { en: `Don't late!`, why: `Нужен be: Don't be late.` }] },
      { q: `«Пойдём!»`, opts: [{ en: `Let's go!`, ok: true }, { en: `Let's to go!`, why: `После let's — без to.` }, { en: `Let go us!`, why: `Правильно: Let's go!` }] },
      { q: `Объясни: «Поверни налево»`, opts: [{ en: `Turn left.`, ok: true }, { en: `You are turn left.`, why: `Просто глагол: Turn left.` }, { en: `Turning left.`, why: `Команда — глагол в начальной форме.` }] },
    ],
  },
  {
    id: `prep_place`, level: `A1`, title: `Предлоги места: in / on / at / next to`, topics: [`directions`],
    short: `in — внутри, on — на поверхности / на улице, at — в точке (at the café).`,
    text: `**in** — внутри, в пространстве: in the park, in Brooklyn, in the car, in New York.
**on** — на поверхности: on the table, on the wall; **на улице** (американский вариант!): I live **on** Maple Street. На этаже: **on** the third floor. В транспорте, где можно стоять: **on** the bus, **on** the subway, **on** the train.
**at** — в точке, у места, на мероприятии: **at** the bus stop, **at** home, **at** work, **at** Jess's cart, **at** a party.

**Ещё полезные:**
next to — рядом с · between — между · across from — напротив (американское!)
behind — позади · in front of — перед · on the corner — на углу · near — рядом
around the corner — за углом · down the street — дальше по улице`,
    formula: `in a city / on a street / at an address`,
    examples: [[`I live on Maple Street, in Brooklyn.`, `Я живу на Мэйпл-стрит, в Бруклине.`], [`The bank is across from the park.`, `Банк напротив парка.`], [`I'm at the coffee cart.`, `Я у кофейной тележки.`], [`She's on the subway.`, `Она в метро (едет).`]],
    mistakes: [[`I am in the bus.`, `I'm on the bus.`], [`I live in Maple Street.`, `I live on Maple Street. (в США)`], [`I'm in home.`, `I'm at home.`]],
    quiz: [
      { q: `«Я дома»`, opts: [{ en: `I'm at home.`, ok: true }, { en: `I'm in home.`, why: `Устойчиво: at home.` }, { en: `I'm on home.`, why: `Правильно: at home.` }] },
      { q: `«Я в метро» (еду)`, opts: [{ en: `I'm on the subway.`, ok: true }, { en: `I'm in the subway.`, why: `В транспорте, где стоишь — on.` }, { en: `I'm at the subway.`, why: `At the subway — «у метро», а едешь — on.` }] },
      { q: `«Кафе напротив банка»`, opts: [{ en: `The café is across from the bank.`, ok: true }, { en: `The café is opposite of the bank.`, why: `Opposite — без of. В США чаще across from.` }, { en: `The café is in front the bank.`, why: `In front of — «перед», и нужен of.` }] },
    ],
  },
  {
    id: `prep_time`, level: `A1`, title: `Предлоги времени: at / on / in`, topics: [`numbers`],
    short: `at 7 p.m., on Monday, in July, in the morning.`,
    text: `**at** — точное время и моменты: **at** 7 a.m., **at** noon, **at** night, **at** the moment.
**on** — дни и даты: **on** Monday, **on** July 4th, **on** the weekend (американский вариант; британцы говорят at the weekend), **on** my birthday.
**in** — месяцы, годы, сезоны, части дня: **in** May, **in** 2026, **in** the summer, **in** the morning / afternoon / evening.

**Без предлога:** today, tomorrow, yesterday, tonight, every day, next week, last year.
I'll call you **tomorrow** (не on tomorrow).

**Американские мелочи:**
**a.m.** — до полудня, **p.m.** — после. 7 p.m. = 19:00.
Даты: **July 4th** (месяц, потом день): 7/4 = 4 июля!
**from Monday through Friday** = с понедельника по пятницу включительно.`,
    formula: `at + время, on + день, in + месяц/год/часть дня`,
    examples: [[`The store opens at 8 a.m.`, `Магазин открывается в 8 утра.`], [`See you on Friday!`, `Увидимся в пятницу!`], [`I was born in March.`, `Я родился в марте.`], [`We work Monday through Friday.`, `Мы работаем с понедельника по пятницу.`]],
    mistakes: [[`in Monday`, `on Monday`], [`at the morning`, `in the morning`], [`on next week`, `next week`]],
    quiz: [
      { q: `«Увидимся в субботу»`, opts: [{ en: `See you on Saturday.`, ok: true }, { en: `See you in Saturday.`, why: `Дни недели — on.` }, { en: `See you at Saturday.`, why: `Дни недели — on.` }] },
      { q: `«Встреча в 3 часа дня»`, opts: [{ en: `The meeting is at 3 p.m.`, ok: true }, { en: `The meeting is in 3 p.m.`, why: `Точное время — at.` }, { en: `The meeting is on 3 p.m.`, why: `Точное время — at.` }] },
      { q: `«Утром я пью кофе»`, opts: [{ en: `I drink coffee in the morning.`, ok: true }, { en: `I drink coffee at the morning.`, why: `Части дня — in the morning (но at night).` }, { en: `I drink coffee on the morning.`, why: `Правильно: in the morning.` }] },
    ],
  },
  {
    id: `numbers`, level: `A1`, title: `Числа, цены и время по-американски`, topics: [`numbers`],
    short: `$3.50 = «three fifty», 7:15 = «seven fifteen», 15 vs 50 — слушай ударение.`,
    text: `**Цены** говорят коротко, без dollars/cents:
$3.50 → **three fifty** · $12.99 → **twelve ninety-nine** · $800 → **eight hundred** · $1,200 → **twelve hundred** (так часто в США!) или one thousand two hundred.
**bucks** = доллары (разговорное): five bucks. **a quarter** = 25 центов, **a dime** = 10, **a nickel** = 5, **a penny** = 1.

**Время:** 7:15 → **seven fifteen** или a quarter after seven; 7:30 → **seven thirty** или half past seven; 7:45 → **seven forty-five** или a quarter to eight.
**noon** — полдень, **midnight** — полночь.

**Опасная пара — слушай ударение:**
thir**TEEN** (13) vs **THIR**ty (30), fif**TEEN** (15) vs **FIF**ty (50).

**Телефоны и номера** читают по цифрам: 212-555-0198 → two one two, five five five…, 0 часто читают как «oh».
**Температура** в США — по Фаренгейту: 75°F ≈ 24°C (тепло), 32°F = 0°C.`,
    formula: `$4.75 = four seventy-five; 6:20 = six twenty`,
    examples: [[`That's four seventy-five.`, `С вас 4,75.`], [`It's a quarter after six.`, `Четверть седьмого.`], [`The show starts at eight.`, `Шоу начинается в восемь.`]],
    mistakes: [[`three dollars fifty cents (слишком длинно)`, `three fifty`], [`fifteen ↔ fifty`, `слушай ударение: fifTEEN / FIFty`], [`at 19 o'clock`, `at 7 p.m.`]],
    quiz: [
      { q: `Как сказать $12.99?`, opts: [{ en: `twelve ninety-nine`, ok: true }, { en: `twelve dollars and ninety-nine`, why: `Так длинно не говорят — просто twelve ninety-nine.` }, { en: `one two nine nine`, why: `Цены не читают по цифрам.` }] },
      { q: `«В 7 вечера»`, opts: [{ en: `at 7 p.m.`, ok: true }, { en: `at 19 o'clock`, why: `В США 24-часовой формат почти не используют: 7 p.m.` }, { en: `at 7 a.m.`, why: `a.m. — до полудня, вечер — p.m.` }] },
      { q: `«A quarter» в деньгах это…`, opts: [{ en: `25 центов`, ok: true }, { en: `4 доллара`, why: `Quarter — четверть доллара, 25 центов.` }, { en: `15 центов`, why: `Quarter = 25 центов.` }] },
    ],
  },
  {
    id: `politeness`, level: `A1`, title: `Вежливость по-американски`, topics: [`politeness`, `food`],
    short: `Can I get…, please? / Could you…? / Thank you! / Excuse me. Без please звучит грубо.`,
    text: `Американцы очень вежливые и дружелюбные. Прямое «Give me…» или «I want…» звучит грубо.

**Заказать / попросить:**
**Can I get** a coffee, **please**? (самое американское)
**Could I have** the check, please? / **I'd like** a slice, please.

**Попросить о помощи:**
**Could you** help me, please? / **Would you mind** taking a picture? (не могли бы вы)
**Excuse me**, … — чтобы обратиться к незнакомцу.

**Извиниться:** **Sorry!** (задел, не расслышал), **Excuse me** (пройти), **My bad** (неформально).
**Поблагодарить:** Thanks! / Thank you so much! / I appreciate it!
**Ответить на «спасибо»:** You're welcome! / No problem! / No worries! / Sure! / Anytime!

**Small talk** — норма: кассир спросит «How are you today?» — ответь «Good, thanks! How are you?» Подробно рассказывать не нужно.`,
    formula: `Can I get… please? / Could you…? / Thank you!`,
    examples: [[`Can I get a large iced coffee, please?`, `Можно большой кофе со льдом?`], [`Could you say that again?`, `Можете повторить?`], [`Thanks, I appreciate it!`, `Спасибо, очень признателен!`]],
    mistakes: [[`Give me coffee.`, `Can I get a coffee, please?`], [`I want the check.`, `Could I get the check, please?`], [`Please. (в ответ на thank you)`, `You're welcome!`]],
    quiz: [
      { q: `Вежливо закажи сэндвич`, opts: [{ en: `Can I get a sandwich, please?`, ok: true }, { en: `Give me a sandwich.`, why: `Звучит как приказ — грубо.` }, { en: `I want sandwich.`, why: `Грубовато и без a.` }] },
      { q: `Тебе сказали «Thank you!» — ответь`, opts: [{ en: `You're welcome!`, ok: true }, { en: `Please!`, why: `Please — «пожалуйста» в просьбе. В ответ — You're welcome!` }, { en: `Nothing!`, why: `«Не за что» = No problem / You're welcome.` }] },
      { q: `Не расслышал — попроси повторить`, opts: [{ en: `Sorry, could you say that again?`, ok: true }, { en: `What?!`, why: `Слишком резко. Мягче: Sorry? / Could you say that again?` }, { en: `Repeat!`, why: `Звучит как приказ.` }] },
    ],
  },
  {
    id: `greetings`, level: `A1`, title: `Приветствия и small talk`, topics: [`greetings`],
    short: `Hi! / Hey! / How's it going? — Good, thanks! You? Bye! / See you! / Have a good one!`,
    text: `**Поздороваться:**
**Hi! / Hey!** — нормально почти везде. **Hello** — нейтрально. **Good morning** — утром, вежливо.
**What's up?** / **What's good?** — неформально («как оно?»).

**Спросить «как дела» — и это просто приветствие, а не вопрос!**
How are you? / How's it going? / How are you doing? / How's your day?
Отвечай коротко и спроси в ответ: **Good, thanks! How are you?** / **Pretty good! You?**
На **What's up?** отвечают: **Not much!** / **Nothing much, you?**

**Познакомиться:** Nice to meet you! — Nice to meet you too!
**Попрощаться:** Bye! / See you! / See you later! / Take care! / **Have a good one!** (хорошего дня) — Thanks, you too!
**Good night** — только перед сном / поздно вечером уходя.`,
    formula: `Hey! How's it going? — Good, thanks! You?`,
    examples: [[`Hey! How's it going?`, `Привет! Как дела?`], [`Pretty good, thanks! You?`, `Неплохо, спасибо! А ты?`], [`Take care! See you!`, `Береги себя! Увидимся!`]],
    mistakes: [[`I am fine, thank you, and you? (книжно)`, `Good, thanks! You?`], [`Good night! (днём при встрече)`, `Good evening! / Hi!`], [`Up! (на What's up?)`, `Not much!`]],
    quiz: [
      { q: `«How's it going?» — ответь естественно`, opts: [{ en: `Pretty good, thanks! You?`, ok: true }, { en: `It goes.`, why: `Дословно не работает. Отвечай: Good / Pretty good!` }, { en: `I go to work.`, why: `Это приветствие, не вопрос «куда идёшь».` }] },
      { q: `«What's up?» — ответь`, opts: [{ en: `Not much! You?`, ok: true }, { en: `Up!`, why: `😄 Отвечают Not much!` }, { en: `The sky.`, why: `Шутка понятна, но обычно: Not much!` }] },
      { q: `Уходя днём из кафе`, opts: [{ en: `Have a good one!`, ok: true }, { en: `Good night!`, why: `Good night — только поздно вечером/перед сном.` }, { en: `Goodbye forever!`, why: `Слишком драматично 😄` }] },
    ],
  },
  {
    id: `possessive`, level: `A1`, title: `Притяжательный 's: Jess's cart`, topics: [],
    short: `Чьё? — имя + 's: Sam's phone (телефон Сэма).`,
    text: `Чтобы сказать «чей», к имени или слову добавляем **'s**:
**Jess's** cart — тележка Джесс · my **mom's** car — мамина машина · **Sal's** Pizza — пиццерия Сала.

Если слово во мн. числе на -s — только апостроф: my **parents'** house.
Неправильное мн. число — 's: the **children's** room.

Важно: **'s** может значить ещё **is** или **has**: She**'s** tired (is). He**'s** got a car (has). Понимай по смыслу.

В названиях магазинов и кафе в США 's означает «у кого-то»: **Joe's**, **McDonald's**, **Macy's**. «Let's go to **Sal's**» — пойдём к Салу (в его пиццерию).`,
    formula: `имя + 's + предмет`,
    examples: [[`This is Jess's coffee cart.`, `Это кофейная тележка Джесс.`], [`I'm going to my friend's place.`, `Я иду к другу (домой).`], [`Let's eat at Sal's.`, `Поедим у Сала.`]],
    mistakes: [[`the cart of Jess`, `Jess's cart`], [`my friend house`, `my friend's house`], [`parents's`, `parents'`]],
    quiz: [
      { q: `«Телефон Сэма»`, opts: [{ en: `Sam's phone`, ok: true }, { en: `the phone of Sam`, why: `Так почти не говорят о людях: Sam's phone.` }, { en: `Sam phone`, why: `Нужен 's.` }] },
      { q: `«Квартира моих родителей»`, opts: [{ en: `my parents' apartment`, ok: true }, { en: `my parents's apartment`, why: `После -s мн. числа — только апостроф.` }, { en: `my parent apartment`, why: `Нужно parents'.` }] },
      { q: `«Let's go to Tony's» значит…`, opts: [{ en: `Пойдём к Тони (в его заведение).`, ok: true }, { en: `Пойдём, Тони.`, why: `'s = чей/у кого: к Тони.` }, { en: `Тони пойдёт.`, why: `Let's — «давай», Tony's — «к Тони».` }] },
    ],
  },
  {
    id: `adjectives`, level: `A1`, title: `Прилагательные: big city, so cool`, topics: [],
    short: `Прилагательное не меняется и стоит перед существительным: a big city, big cities.`,
    text: `В английском прилагательное **не меняется** по роду и числу:
a **big** city → two **big** cities (не bigs!) · a **nice** guy / a **nice** girl.

**Место:** перед существительным — a **beautiful** park; или после to be — The park **is beautiful**.

**Усилить:** very, **so** (очень разговорно), **really**, **super** (американское): It's **so** cool! It's **super** cheap.
**Чуть-чуть:** a little, **kind of / kinda**: It's **kind of** expensive.

**-ed vs -ing:**
I'm **bored** (мне скучно) — The movie is **boring** (фильм скучный).
I'm **interested** — It's **interesting**. I'm **tired** — It's **tiring**. I'm **excited** — It's **exciting**.`,
    formula: `a + прилагательное + существительное`,
    examples: [[`It's a really cool place.`, `Это очень классное место.`], [`New York is so expensive!`, `Нью-Йорк такой дорогой!`], [`I'm so bored.`, `Мне так скучно.`]],
    mistakes: [[`bigs cities`, `big cities`], [`a city big`, `a big city`], [`I'm boring (имея в виду «мне скучно»)`, `I'm bored.`]],
    quiz: [
      { q: `«Мне скучно»`, opts: [{ en: `I'm bored.`, ok: true }, { en: `I'm boring.`, why: `I'm boring = «я скучный человек» 😄` }, { en: `Me boring.`, why: `Нужно I'm bored.` }] },
      { q: `«Две большие машины»`, opts: [{ en: `two big cars`, ok: true }, { en: `two bigs cars`, why: `Прилагательное не меняется.` }, { en: `two cars bigs`, why: `Прилагательное перед существительным и без -s.` }] },
      { q: `«Этот фильм интересный»`, opts: [{ en: `This movie is interesting.`, ok: true }, { en: `This movie is interested.`, why: `Предмет — interesting, человек — interested.` }, { en: `This movie interesting.`, why: `Нужен is.` }] },
    ],
  },

  // ===================== A2 =====================
  {
    id: `present_continuous`, level: `A2`, title: `Present Continuous: I'm doing (сейчас)`, topics: [],
    short: `Что происходит прямо сейчас: am / is / are + глагол-ing.`,
    text: `**Present Continuous** — действие **сейчас** или в этот период:
I'**m eating** (я ем — прямо сейчас). She'**s working** from home this week.

**Формула:** am / is / are + глагол + **-ing**
I'm talk**ing**, you're danc**ing** (e убираем), he's runn**ing** (удваиваем согласную), they're stud**ying**.

**Вопрос:** **Are** you **coming**? What **are** you **doing**?
**Отрицание:** I'm **not working** today.

**Сравни:**
I **work** in Brooklyn (вообще, постоянно) — I'**m working** in Manhattan this month (временно).
**Планы на ближайшее будущее** тоже так: I'**m meeting** Sam tonight. What **are** you **doing** this weekend?

**Не ставят в -ing** глаголы состояния: know, like, love, want, need, understand: I **know** (не I'm knowing). Исключение — рекламное «I'm lovin' it».`,
    formula: `am / is / are + глагол-ing`,
    examples: [[`What are you doing?`, `Что делаешь?`], [`I'm learning English.`, `Я учу английский.`], [`We're meeting at 7.`, `Мы встречаемся в 7.`], [`It's raining again.`, `Опять идёт дождь.`]],
    mistakes: [[`I learning English.`, `I'm learning English.`], [`I'm knowing.`, `I know.`], [`What you doing?`, `What are you doing? (в речи — What're you doing?)`]],
    quiz: [
      { q: `«Что ты сейчас делаешь?»`, opts: [{ en: `What are you doing?`, ok: true }, { en: `What do you do?`, why: `What do you do? = «Кем работаешь?»` }, { en: `What you doing?`, why: `Нужен are.` }] },
      { q: `«Я понимаю»`, opts: [{ en: `I understand.`, ok: true }, { en: `I'm understanding.`, why: `Understand — глагол состояния, без -ing.` }, { en: `I understanding.`, why: `Просто: I understand.` }] },
      { q: `«Сегодня вечером я встречаюсь с Сэмом»`, opts: [{ en: `I'm meeting Sam tonight.`, ok: true }, { en: `I meet Sam tonight.`, why: `Договорённость на ближайшее время — I'm meeting.` }, { en: `I meeting Sam tonight.`, why: `Нужен am.` }] },
    ],
  },
  {
    id: `past_simple`, level: `A2`, title: `Past Simple: worked, went, saw`, topics: [],
    short: `Прошлое: правильные глаголы + -ed, неправильные — особая форма.`,
    text: `**Past Simple** — что случилось в прошлом и закончилось: yesterday, last week, in 2020, ago.

**Правильные глаголы:** + **-ed**
work → work**ed**, walk → walk**ed**, live → liv**ed**, study → stud**ied**, stop → stop**ped**.
Произношение -ed: [t] после глухих (walk**ed**), [d] после звонких (play**ed**), [ɪd] после t/d (want**ed**).

**Неправильные — самые нужные:**
go → **went** · come → **came** · see → **saw** · have → **had** · get → **got** · make → **made** · take → **took** · eat → **ate** · drink → **drank** · buy → **bought** · say → **said** · tell → **told** · know → **knew** · think → **thought** · find → **found** · give → **gave** · leave → **left** · meet → **met** · pay → **paid** · sleep → **slept**.

**Вопрос и отрицание — с did (глагол в начальной форме!):**
**Did** you **see** it? I **didn't go**. (не didn't went)`,
    formula: `I worked / I went; Did you…? I didn't…`,
    examples: [[`I moved to New York last week.`, `Я переехал в Нью-Йорк на прошлой неделе.`], [`We went to Sal's yesterday.`, `Вчера мы ходили к Салу.`], [`Did you sleep well?`, `Ты хорошо спал?`], [`I didn't see him.`, `Я его не видел.`]],
    mistakes: [[`I goed`, `I went`], [`I didn't went`, `I didn't go`], [`Did you saw?`, `Did you see?`]],
    quiz: [
      { q: `«Вчера я ходил в парк»`, opts: [{ en: `I went to the park yesterday.`, ok: true }, { en: `I go to the park yesterday.`, why: `Прошлое — went.` }, { en: `I goed to the park yesterday.`, why: `go → went (неправильный).` }] },
      { q: `«Ты видел?»`, opts: [{ en: `Did you see it?`, ok: true }, { en: `Did you saw it?`, why: `После did — начальная форма: see.` }, { en: `You saw it?`, why: `В разговоре бывает, но правильно: Did you see it?` }] },
      { q: `«Я не купил билет»`, opts: [{ en: `I didn't buy a ticket.`, ok: true }, { en: `I didn't bought a ticket.`, why: `После didn't — buy.` }, { en: `I not bought a ticket.`, why: `Отрицание через didn't.` }] },
    ],
  },
  {
    id: `was_were`, level: `A2`, title: `was / were: «был, была, были»`, topics: [],
    short: `Прошлое от to be: I / he / she / it was, you / we / they were.`,
    text: `**to be** в прошлом:
**I / he / she / it** → **was**: I **was** tired. It **was** amazing!
**you / we / they** → **were**: We **were** in Brooklyn. You **were** right.

**Вопрос:** **Was** it good? **Were** you at home?
**Отрицание:** **wasn't / weren't**: It **wasn't** expensive.

**There was / There were:** There **was** a party last night. There **were** a lot of people.

Частые фразы: How **was** your day? (Как прошёл день?) · It **was** nice meeting you! · **Were** you born in Russia?
**I was born** — я родился (всегда в прошлом).`,
    formula: `I / he / it was; you / we / they were`,
    examples: [[`How was your weekend?`, `Как прошли выходные?`], [`It was awesome!`, `Было круто!`], [`We were late.`, `Мы опоздали.`], [`I was born in Moscow.`, `Я родился в Москве.`]],
    mistakes: [[`We was there.`, `We were there.`], [`I born in 2000.`, `I was born in 2000.`], [`It were great.`, `It was great.`]],
    quiz: [
      { q: `«Как прошёл твой день?»`, opts: [{ en: `How was your day?`, ok: true }, { en: `How were your day?`, why: `Day — одно: was.` }, { en: `How did your day?`, why: `Нужен was.` }] },
      { q: `«Я родился в Москве»`, opts: [{ en: `I was born in Moscow.`, ok: true }, { en: `I born in Moscow.`, why: `Нужно was born.` }, { en: `I am born in Moscow.`, why: `Это в прошлом: was born.` }] },
      { q: `«Мы были дома»`, opts: [{ en: `We were at home.`, ok: true }, { en: `We was at home.`, why: `С we — were.` }, { en: `We are at home.`, why: `Это настоящее время.` }] },
    ],
  },
  {
    id: `going_to`, level: `A2`, title: `Будущее: going to / gonna`, topics: [`slang`],
    short: `Планы и намерения: I'm going to (gonna) + глагол.`,
    text: `**be going to** + глагол — когда **уже решил**, есть план или видно, что сейчас случится:
I'**m going to** look for a job. It'**s going to** rain (тучи — видно).

**В разговоре** американцы почти всегда говорят **gonna**:
I'm **gonna** grab a coffee. What are you **gonna** do?
(Пишут gonna только в переписке и неформально.)

**Вопрос:** **Are** you **going to** come? / Are you **gonna** come?
**Отрицание:** I'm **not going to** tell him.

Не путай: I'm **going to** the park (иду в парк — движение) и I'm **going to** walk (собираюсь гулять).`,
    formula: `am / is / are + going to (gonna) + глагол`,
    examples: [[`I'm gonna be late!`, `Я опоздаю!`], [`We're going to visit Manhattan.`, `Мы собираемся в Манхэттен.`], [`Is it gonna rain?`, `Будет дождь?`]],
    mistakes: [[`I going to work.`, `I'm going to work.`], [`I'm gonna to go.`, `I'm gonna go.`], [`I'm going to went.`, `I'm going to go.`]],
    quiz: [
      { q: `«Я собираюсь искать работу»`, opts: [{ en: `I'm going to look for a job.`, ok: true }, { en: `I going to look for a job.`, why: `Нужен am.` }, { en: `I'm going to looking for a job.`, why: `После going to — начальная форма.` }] },
      { q: `Разговорно: «Я возьму кофе»`, opts: [{ en: `I'm gonna grab a coffee.`, ok: true }, { en: `I'm gonna to grab a coffee.`, why: `Gonna уже включает to.` }, { en: `I gonna grab a coffee.`, why: `Нужен I'm.` }] },
      { q: `«Будет дождь» (видно тучи)`, opts: [{ en: `It's going to rain.`, ok: true }, { en: `It going to rain.`, why: `Нужен it's.` }, { en: `It's going to raining.`, why: `После to — rain.` }] },
    ],
  },
  {
    id: `will`, level: `A2`, title: `Будущее: will / won't`, topics: [],
    short: `Решение «прямо сейчас», обещания, прогнозы: I'll help you!`,
    text: `**will** (сокращённо **'ll**) + глагол:
— **Решение в момент речи:** The phone's ringing. — I'**ll** get it! (Я возьму!)
— **Обещание:** I'**ll** call you tomorrow. I **won't** be late!
— **Предложение помощи:** I'**ll** help you with that.
— **Прогноз / мнение:** I think you'**ll** love New York.

**won't** = will not: I **won't** tell anyone.
**Вопрос:** **Will** you be there? / **Will** you marry me? 💍

**Сравни:**
I'm **gonna** buy a car (план, решил раньше) — OK, I'**ll** buy it! (решил сейчас).

В ресторане: I'**ll have** the burger. = Я возьму бургер.`,
    formula: `I'll + глагол; I won't + глагол`,
    examples: [[`I'll have a slice of pizza.`, `Я возьму кусок пиццы.`], [`Don't worry, I won't be late.`, `Не волнуйся, я не опоздаю.`], [`I think it'll be fun.`, `Думаю, будет весело.`]],
    mistakes: [[`I will to call you.`, `I'll call you.`], [`I don't will.`, `I won't.`], [`I will be calling (без нужды)`, `I'll call.`]],
    quiz: [
      { q: `Звонит телефон: «Я отвечу!»`, opts: [{ en: `I'll get it!`, ok: true }, { en: `I'm going to get it!`, why: `Решение прямо сейчас — will: I'll get it.` }, { en: `I get it!`, why: `I get it = «Я понял».` }] },
      { q: `«Я не опоздаю»`, opts: [{ en: `I won't be late.`, ok: true }, { en: `I don't will be late.`, why: `Отрицание — won't.` }, { en: `I will not late.`, why: `Нужно be: won't be late.` }] },
      { q: `В ресторане: «Я возьму бургер»`, opts: [{ en: `I'll have the burger.`, ok: true }, { en: `I take burger.`, why: `Естественно: I'll have the burger.` }, { en: `I will to have a burger.`, why: `После will — без to.` }] },
    ],
  },
  {
    id: `comparatives`, level: `A2`, title: `Сравнение: bigger, more expensive, the best`, topics: [],
    short: `Короткие: +er / the +est. Длинные: more / the most.`,
    text: `**Короткие прилагательные (1 слог, 2 слога на -y):**
big → big**ger** than → **the** big**gest** · cheap → cheap**er** → **the** cheap**est** · easy → eas**ier** → **the** eas**iest**.

**Длинные:** **more** / **the most**:
expensive → **more** expensive → **the most** expensive · beautiful → more beautiful.

**Неправильные:** good → **better** → **the best** · bad → **worse** → **the worst** · far → **farther** → **the farthest**.

**than** — чем: Manhattan is **more expensive than** Brooklyn.
**as … as** — такой же как: It's **as** good **as** Sal's pizza. / not **as** big **as**.

**Американское:** «the best pizza **in** New York» (в, не of).`,
    formula: `bigger than / more expensive than / the best`,
    examples: [[`Manhattan is busier than Brooklyn.`, `Манхэттен оживлённее Бруклина.`], [`This is the best pizza in New York!`, `Это лучшая пицца в Нью-Йорке!`], [`The subway is faster than a cab.`, `Метро быстрее такси.`]],
    mistakes: [[`more big`, `bigger`], [`more better`, `better`], [`expensiver`, `more expensive`]],
    quiz: [
      { q: `«Лучшая пицца в городе»`, opts: [{ en: `the best pizza in the city`, ok: true }, { en: `the goodest pizza in the city`, why: `good → the best.` }, { en: `the most good pizza`, why: `Неправильная форма: the best.` }] },
      { q: `«Манхэттен дороже Бруклина»`, opts: [{ en: `Manhattan is more expensive than Brooklyn.`, ok: true }, { en: `Manhattan is expensiver than Brooklyn.`, why: `Длинное слово — more expensive.` }, { en: `Manhattan is more expensive that Brooklyn.`, why: `«Чем» — than.` }] },
      { q: `«Метро быстрее»`, opts: [{ en: `The subway is faster.`, ok: true }, { en: `The subway is more fast.`, why: `Короткое — faster.` }, { en: `The subway is more faster.`, why: `Не нужен more.` }] },
    ],
  },
  {
    id: `countable`, level: `A2`, title: `much / many / a lot of / some / any`, topics: [`food`],
    short: `many — штук, much — неисчисляемое, a lot of — для всего.`,
    text: `**Исчисляемое** (можно посчитать): apples, people, dollars → **many**, **a few**
**Неисчисляемое**: water, money, time, coffee, music → **much**, **a little**

**a lot of / lots of** — подходит ко всему, и в утверждениях американцы почти всегда говорят именно так: I have **a lot of** friends. There's **a lot of** traffic.
**much / many** — чаще в вопросах и отрицаниях: How **many** people? I don't have **much** time.

**some** — немного, сколько-то (в утверждениях и вежливых просьбах): I need **some** water. Can I have **some** coffee?
**any** — в вопросах и отрицаниях: Do you have **any** questions? I don't have **any** money.

**Еда в кафе:** **a** coffee (порция), но **some** coffee (кофе вообще); **a** slice / **a piece of** cake.`,
    formula: `many people / much time / a lot of both`,
    examples: [[`How many slices do you want?`, `Сколько кусков хочешь?`], [`I don't have much money.`, `У меня мало денег.`], [`There are a lot of tourists here.`, `Здесь много туристов.`], [`Do you have any questions?`, `Есть вопросы?`]],
    mistakes: [[`How much people?`, `How many people?`], [`many money`, `a lot of money`], [`I don't have some time.`, `I don't have any time.`]],
    quiz: [
      { q: `«Сколько человек?»`, opts: [{ en: `How many people?`, ok: true }, { en: `How much people?`, why: `Людей можно посчитать — many.` }, { en: `How many peoples?`, why: `People уже мн. число.` }] },
      { q: `«У меня мало времени»`, opts: [{ en: `I don't have much time.`, ok: true }, { en: `I don't have many time.`, why: `Time — неисчисляемое: much.` }, { en: `I have not many time.`, why: `I don't have much time.` }] },
      { q: `«Есть вопросы?»`, opts: [{ en: `Do you have any questions?`, ok: true }, { en: `Do you have some question?`, why: `В вопросе обычно any + мн. число.` }, { en: `Have you any question?`, why: `Американский вариант: Do you have any questions?` }] },
    ],
  },
  {
    id: `frequency`, level: `A2`, title: `Как часто: always, usually, never`, topics: [],
    short: `Ставим перед глаголом, но после am / is / are: I usually walk. She's always late.`,
    text: `**always** — всегда (100%) · **usually** — обычно · **often** — часто · **sometimes** — иногда · **rarely / seldom** — редко · **never** — никогда (0%)

**Место в предложении:**
— **перед** обычным глаголом: I **usually** take the subway.
— **после** am / is / are: She **is always** late.
— sometimes можно в начало: **Sometimes** I cook.

**Never** — уже отрицание, второе не нужно: I **never** eat meat (не I don't never).

**Ещё:** every day, once a week (раз в неделю), twice a month, on weekends (по выходным, американское!).
**How often** do you…? — Как часто ты…?`,
    formula: `I + usually + глагол;  am/is/are + always`,
    examples: [[`I usually grab a coffee before work.`, `Обычно я беру кофе перед работой.`], [`He's never on time.`, `Он никогда не приходит вовремя.`], [`I go to the gym twice a week.`, `Я хожу в спортзал два раза в неделю.`]],
    mistakes: [[`I go usually`, `I usually go`], [`She always is late.`, `She's always late.`], [`I don't never`, `I never`]],
    quiz: [
      { q: `«Я обычно езжу на метро»`, opts: [{ en: `I usually take the subway.`, ok: true }, { en: `I take usually the subway.`, why: `Usually — перед глаголом.` }, { en: `Usually I am take the subway.`, why: `Не нужен am.` }] },
      { q: `«Она всегда опаздывает»`, opts: [{ en: `She's always late.`, ok: true }, { en: `She always is late.`, why: `После is: She's always late.` }, { en: `She always late.`, why: `Нужен is.` }] },
      { q: `«Я никогда не ем мясо»`, opts: [{ en: `I never eat meat.`, ok: true }, { en: `I don't never eat meat.`, why: `Never уже отрицание.` }, { en: `I never don't eat meat.`, why: `Двойное отрицание нельзя.` }] },
    ],
  },
  {
    id: `like_ing`, level: `A2`, title: `like doing / would like to do`, topics: [],
    short: `I like cooking (вообще). I'd like to order (хочу сейчас).`,
    text: `**like / love / hate / enjoy + -ing** — говорим, что нравится вообще:
I **like cooking**. She **loves dancing**. I **hate waiting**. I **enjoy walking** in the park.
(в американском после like/love/hate можно и to: I like **to cook** — тоже правильно)

**would like (I'd like) + to + глагол** — вежливое «хочу» прямо сейчас:
**I'd like to** order. **Would you like to** come with us?
**Would you like** some coffee? — Хотите кофе? — Yes, please! / No, thanks.

**Не путай:**
**Do you like** coffee? — Ты любишь кофе (вообще)?
**Would you like** a coffee? — Хочешь кофе (сейчас)?

**Ещё с -ing:** I'm good at cooking. Thanks for helping! I'm interested in learning English. How about going to the park?`,
    formula: `like + -ing;  would like + to + глагол`,
    examples: [[`I love walking around Brooklyn.`, `Обожаю гулять по Бруклину.`], [`I'd like to order, please.`, `Я бы хотел заказать.`], [`Would you like to join us?`, `Хочешь присоединиться?`]],
    mistakes: [[`I would like order.`, `I'd like to order.`], [`I enjoy to walk.`, `I enjoy walking.`], [`Do you like a coffee? (предлагая)`, `Would you like a coffee?`]],
    quiz: [
      { q: `Предложи: «Хочешь кофе?»`, opts: [{ en: `Would you like some coffee?`, ok: true }, { en: `Do you like coffee?`, why: `Это «любишь ли ты кофе вообще».` }, { en: `You want coffee?`, why: `Слишком прямо; вежливо — Would you like…?` }] },
      { q: `«Я бы хотел заказать»`, opts: [{ en: `I'd like to order.`, ok: true }, { en: `I'd like order.`, why: `Нужен to.` }, { en: `I like to order.`, why: `I like = «мне нравится вообще».` }] },
      { q: `«Мне нравится гулять в парке»`, opts: [{ en: `I enjoy walking in the park.`, ok: true }, { en: `I enjoy to walk in the park.`, why: `После enjoy — только -ing.` }, { en: `I enjoy walk in the park.`, why: `Нужно walking.` }] },
    ],
  },
  {
    id: `modals`, level: `A2`, title: `should / have to / must / don't have to`, topics: [],
    short: `should — совет, have to — надо (правило/обстоятельства), don't have to — не обязательно.`,
    text: `**should** — совет, «стоит, следует»: You **should** try Sal's pizza! You **shouldn't** walk there at night.
**have to** — надо, приходится (правила, обстоятельства): I **have to** work tomorrow. She **has to** pay rent.
**must** — должен (сильно, правило, вывод); в американской речи редкое, чаще have to. «You **must** be tired!» = ты, наверное, устал.
**don't have to** — не обязательно: You **don't have to** tip here.
**mustn't** — нельзя (строго): You **mustn't** smoke here. В США чаще: You **can't** smoke here.

**Разговорное:** **gotta** = have got to = have to: I **gotta** go! (Мне пора!)

После should / must / can — глагол **без to**. После have — **с to**.`,
    formula: `should + глагол / have to + глагол`,
    examples: [[`You should see the Brooklyn Bridge.`, `Тебе стоит увидеть Бруклинский мост.`], [`I have to go. See you!`, `Мне надо идти. Увидимся!`], [`You don't have to pay now.`, `Сейчас платить не обязательно.`], [`I gotta go!`, `Мне пора!`]],
    mistakes: [[`You should to try it.`, `You should try it.`], [`I must to go.`, `I have to go.`], [`You mustn't pay (имея в виду «не обязательно»)`, `You don't have to pay.`]],
    quiz: [
      { q: `Совет: «Тебе стоит попробовать пиццу»`, opts: [{ en: `You should try the pizza.`, ok: true }, { en: `You should to try the pizza.`, why: `После should — без to.` }, { en: `You have try the pizza.`, why: `Совет — should.` }] },
      { q: `«Платить не обязательно»`, opts: [{ en: `You don't have to pay.`, ok: true }, { en: `You mustn't pay.`, why: `Mustn't = «нельзя платить».` }, { en: `You haven't to pay.`, why: `Американский вариант: don't have to.` }] },
      { q: `«Мне пора!» (разговорно)`, opts: [{ en: `I gotta go!`, ok: true }, { en: `I must to go!`, why: `Без to; и разговорно — I gotta go.` }, { en: `I go must!`, why: `Правильно: I gotta go / I have to go.` }] },
    ],
  },
  {
    id: `phrasal`, level: `A2`, title: `Фразовые глаголы: get up, pick up, hang out`, topics: [`slang`],
    short: `Глагол + маленькое слово = новое значение. Американцы говорят ими постоянно.`,
    text: `**Фразовый глагол** = глагол + частица (up, out, on, off…). Значение часто не угадать — учи как новое слово.

**Самые нужные:**
**get up** — вставать · **wake up** — просыпаться · **go out** — выходить (развлекаться)
**hang out** — тусоваться · **check out** — заценить; выписаться из отеля
**pick up** — забрать, поднять, взять (трубку) · **drop off** — завезти, высадить
**find out** — узнать · **figure out** — разобраться · **look for** — искать
**try on** — примерить · **turn on / off** — включить / выключить
**give up** — сдаться, бросить · **put on** — надеть · **take off** — снять; взлететь
**come on!** — давай! ну же! · **hold on** — подожди · **calm down** — успокойся
**run out of** — закончиться (We **ran out of** milk) · **show up** — появиться
**work out** — тренироваться; получиться · **grab** a bite — перекусить

С предметом: **pick** Sam **up** / **pick up** Sam / **pick** him **up** (местоимение — в середину).`,
    formula: `глагол + up / out / on / off`,
    examples: [[`I usually get up at 7.`, `Обычно я встаю в 7.`], [`Let's hang out this weekend!`, `Давай потусим на выходных!`], [`Can you pick me up at 8?`, `Можешь забрать меня в 8?`], [`Hold on, I'm coming!`, `Подожди, я иду!`]],
    mistakes: [[`pick up him`, `pick him up`], [`I wake up at 7 o'clock and get up immediately (норм) / I stand up at 7 (не то)`, `I get up at 7.`], [`turn on the lights off`, `turn off the lights`]],
    quiz: [
      { q: `«Можешь меня забрать?»`, opts: [{ en: `Can you pick me up?`, ok: true }, { en: `Can you pick up me?`, why: `Местоимение — в середину: pick me up.` }, { en: `Can you take me?`, why: `Можно понять, но «забрать на машине» — pick me up.` }] },
      { q: `«Давай потусим»`, opts: [{ en: `Let's hang out.`, ok: true }, { en: `Let's hang on.`, why: `Hang on = «подожди».` }, { en: `Let's go out of.`, why: `Правильно: hang out / go out.` }] },
      { q: `«У нас закончилось молоко»`, opts: [{ en: `We ran out of milk.`, ok: true }, { en: `We finished milk.`, why: `Естественнее: we ran out of milk.` }, { en: `Milk is ended.`, why: `Правильно: we ran out of milk.` }] },
    ],
  },
  {
    id: `american`, level: `A2`, title: `American vs British English`, topics: [`slang`],
    short: `apartment (не flat), subway (не underground), color (не colour), fall (не autumn).`,
    text: `В игре всё по-американски. Главные отличия от британского:

**Слова:**
apartment (flat) · subway (underground / tube) · elevator (lift) · sidewalk (pavement)
truck (lorry) · gas (petrol) · cookie (biscuit) · fries (chips) · chips (crisps)
check (bill) — счёт в ресторане · line (queue) — очередь · vacation (holiday)
fall (autumn) · cell phone (mobile) · trash (rubbish) · restroom / bathroom (toilet)
pants (trousers) — в Британии pants = трусы! · candy (sweets) · movie (film) · soccer (football) · first floor = ground floor

**Написание:** color (colour), favorite (favourite), center (centre), theater (theatre), organize (organise), traveled (travelled).

**Грамматика:**
Do you have…? (Have you got…?) · on the weekend (at the weekend)
Monday **through** Friday · I **just** ate (I've just eaten) — американцы часто используют Past Simple вместо Present Perfect.
**gotten**: I've gotten better (британцы: got).

**Произношение:** американцы произносят **r** везде (car — «кар»), t между гласными звучит как мягкое «д»: water → «уáдэр», city → «сúди».`,
    formula: `US: apartment, subway, check, line, fall, color`,
    examples: [[`Can we get the check, please?`, `Можно счёт?`], [`The line is so long!`, `Очередь такая длинная!`], [`My apartment is on the first floor.`, `Моя квартира на первом этаже.`]],
    mistakes: [[`Can I have the bill? (в США поймут, но)`, `Can I get the check?`], [`I live in a flat.`, `I live in an apartment.`], [`Let's take the underground.`, `Let's take the subway.`]],
    quiz: [
      { q: `«Счёт, пожалуйста» (в США)`, opts: [{ en: `Can I get the check, please?`, ok: true }, { en: `Can I get the bill, please?`, why: `Поймут, но по-американски — check.` }, { en: `Give me the count.`, why: `Count — «считать». Правильно: the check.` }] },
      { q: `Что значит «pants» в США?`, opts: [{ en: `брюки`, ok: true }, { en: `трусы`, why: `Это в Британии! В США pants = брюки.` }, { en: `носки`, why: `Носки — socks.` }] },
      { q: `«Осень» по-американски`, opts: [{ en: `fall`, ok: true }, { en: `autumn`, why: `Autumn — больше британское. В США — fall.` }, { en: `fallen`, why: `Правильно: fall.` }] },
    ],
  },
  {
    id: `contractions`, level: `A2`, title: `Разговорные сокращения: gonna, wanna, gotta`, topics: [`slang`],
    short: `going to → gonna, want to → wanna, got to → gotta. Так говорят, но в официальных текстах не пишут.`,
    text: `Живая американская речь полна сокращений. Их важно **понимать на слух**:

**gonna** = going to — I'm **gonna** call you.
**wanna** = want to — Do you **wanna** grab lunch?
**gotta** = have got to — I **gotta** go.
**kinda** = kind of (как бы, вроде) — It's **kinda** cold.
**sorta** = sort of · **lemme** = let me — **Lemme** see.
**gimme** = give me — **Gimme** a sec. · **dunno** = don't know — I **dunno**.
**y'all** = you all (юг США) · **ya** = you — See **ya**!
**'cause / cuz** = because · **ain't** = am not / isn't (очень неформально)

**На слух:** «Whaddaya want?» = What do you want? · «Didja eat?» = Did you eat? · «Gotcha» = Got you (понял).

**Правило:** в речи с друзьями — нормально; на собеседовании и в письмах — лучше полные формы.`,
    formula: `gonna / wanna / gotta + глагол (без to!)`,
    examples: [[`Wanna grab a bite?`, `Хочешь перекусить?`], [`I dunno, it's kinda late.`, `Не знаю, уже как-то поздно.`], [`Gimme a sec!`, `Дай секунду!`]],
    mistakes: [[`I wanna to go.`, `I wanna go.`], [`I'm gonna to call.`, `I'm gonna call.`], [`gonna в резюме`, `going to`]],
    quiz: [
      { q: `«wanna» — это…`, opts: [{ en: `want to`, ok: true }, { en: `want a`, why: `Wanna = want to (иногда want a, но в основном want to).` }, { en: `will not`, why: `Will not = won't.` }] },
      { q: `Разговорно: «Хочешь пойти?»`, opts: [{ en: `Wanna go?`, ok: true }, { en: `Wanna to go?`, why: `Wanna уже включает to.` }, { en: `You want going?`, why: `Правильно: Wanna go? / Do you want to go?` }] },
      { q: `«I dunno» значит…`, opts: [{ en: `Я не знаю`, ok: true }, { en: `Я не сделал`, why: `Dunno = don't know.` }, { en: `Я не хочу`, why: `Не хочу = I don't wanna.` }] },
    ],
  },
  {
    id: `object_questions`, level: `A2`, title: `Как переспросить и уточнить`, topics: [`listening`],
    short: `Sorry? / Could you say that again? / What does … mean? / How do you say … in English?`,
    text: `Главный навык новичка — **не бояться переспрашивать**. Американцы привыкли к акцентам и охотно помогут.

**Не расслышал:** Sorry? / Sorry, what was that? / Could you say that again, please? / Come again?
**Слишком быстро:** Could you speak a little slower, please?
**Не понял слово:** What does "**hang out**" mean? (что значит…?)
**Не знаешь слово:** How do you say "**вилка**" in English? / What do you call this?
**Уточнить:** You mean…? / So, you're saying…? / Do you mean the green door?
**Проверить себя:** Is that right? / Did I say it right?
**Попросить написать:** Could you write it down?
**Честно признаться:** I'm still learning English. / My English isn't perfect yet.

**Как слушать американцев:**
— не пытайся понять каждое слово — лови ключевые (числа, места, глаголы);
— t между гласными звучит как «д»: water = «уадэр», better = «бэдэр»;
— слова сливаются: «Whaddaya» = What do you, «gonna» = going to.`,
    formula: `Sorry? / What does … mean? / How do you say …?`,
    examples: [[`Sorry, could you say that again?`, `Простите, можете повторить?`], [`What does "no worries" mean?`, `Что значит «no worries»?`], [`How do you say "сдача" in English?`, `Как по-английски «сдача»?`]],
    mistakes: [[`What means "hang out"?`, `What does "hang out" mean?`], [`How to say…? (как вопрос в речи)`, `How do you say…?`], [`Repeat!`, `Could you say that again?`]],
    quiz: [
      { q: `«Что значит „chill“?»`, opts: [{ en: `What does "chill" mean?`, ok: true }, { en: `What means "chill"?`, why: `Нужен does: What does … mean?` }, { en: `What is mean "chill"?`, why: `Правильно: What does "chill" mean?` }] },
      { q: `Попроси говорить медленнее`, opts: [{ en: `Could you speak a little slower, please?`, ok: true }, { en: `Speak slow!`, why: `Грубовато. Вежливо: Could you speak slower, please?` }, { en: `You speak slowly.`, why: `Это утверждение, а не просьба.` }] },
      { q: `«Как по-английски „вилка“?»`, opts: [{ en: `How do you say "вилка" in English?`, ok: true }, { en: `How say "вилка" English?`, why: `How do you say … in English?` }, { en: `What is English "вилка"?`, why: `Естественно: How do you say…?` }] },
    ],
  },

  // ===================== B1 =====================
  {
    id: `present_perfect`, level: `B1`, title: `Present Perfect: Have you ever…?`, topics: [],
    short: `Опыт и результат: I've been to Paris. Have you ever tried…?`,
    text: `**have / has + 3-я форма глагола** (worked, been, seen, eaten…)

**Когда используем:**
— **Опыт в жизни** (когда — неважно): **Have you ever been** to New York? I'**ve never tried** sushi.
— **Длится до сих пор** с for / since: I'**ve lived** here **for** two years / **since** 2024.
— **Результат важен сейчас**: I'**ve lost** my keys! (и сейчас их нет)

**Сравни с Past Simple:**
I'**ve been** to Chicago (когда-то, опыт) — I **went** to Chicago **last year** (конкретное время → Past Simple).
С yesterday, last week, in 2020, ago — **только Past Simple**.

**Американская особенность:** с just / already / yet американцы часто используют Past Simple: Did you eat **yet**? I **just** got here. Обе формы правильные.

**3-я форма:** be → **been**, go → **gone**, see → **seen**, eat → **eaten**, do → **done**, take → **taken**, write → **written**, get → **gotten** (US).`,
    formula: `have / has + V3 (been, seen, done…)`,
    examples: [[`Have you ever been to Brooklyn?`, `Ты когда-нибудь был в Бруклине?`], [`I've lived here for six months.`, `Я живу здесь шесть месяцев.`], [`She's never tried a bagel!`, `Она никогда не пробовала бейгл!`]],
    mistakes: [[`I have been there yesterday.`, `I was there yesterday.`], [`I live here since 2024.`, `I've lived here since 2024.`], [`Did you ever been…?`, `Have you ever been…?`]],
    quiz: [
      { q: `«Ты когда-нибудь пробовал нью-йоркскую пиццу?»`, opts: [{ en: `Have you ever tried New York pizza?`, ok: true }, { en: `Did you ever tried New York pizza?`, why: `После did — try. Но про опыт лучше: Have you ever tried…?` }, { en: `Do you ever try…?`, why: `Это «пробуешь ли ты иногда».` }] },
      { q: `«Я живу здесь с 2024 года»`, opts: [{ en: `I've lived here since 2024.`, ok: true }, { en: `I live here since 2024.`, why: `С since/for — Present Perfect.` }, { en: `I lived here since 2024.`, why: `Ты всё ещё живёшь — I've lived.` }] },
      { q: `«Я был там вчера»`, opts: [{ en: `I was there yesterday.`, ok: true }, { en: `I've been there yesterday.`, why: `С yesterday — только Past Simple.` }, { en: `I've was there yesterday.`, why: `Правильно: I was there yesterday.` }] },
    ],
  },
  {
    id: `past_continuous`, level: `B1`, title: `Past Continuous: I was walking when…`, topics: [],
    short: `Процесс в прошлом, который прервали: I was walking when it started to rain.`,
    text: `**was / were + глагол-ing** — что происходило в какой-то момент прошлого:
At 8 p.m. I **was having** dinner. What **were** you **doing** last night?

**Часто вместе с Past Simple:** длинное действие (Continuous) прервало короткое (Simple):
I **was walking** home **when** it **started** to rain.
**While** I **was waiting** for the bus, I **met** an old friend.

**Для рассказов и описаний:** The sun **was shining**, people **were walking** their dogs…`,
    formula: `was / were + -ing  +  when + Past Simple`,
    examples: [[`I was sleeping when you called.`, `Я спал, когда ты позвонил.`], [`What were you doing at 10?`, `Что ты делал в 10?`], [`It was raining all day.`, `Весь день шёл дождь.`]],
    mistakes: [[`I was sleep when…`, `I was sleeping when…`], [`When you called, I slept. (если процесс)`, `When you called, I was sleeping.`], [`We was walking.`, `We were walking.`]],
    quiz: [
      { q: `«Я спал, когда ты позвонил»`, opts: [{ en: `I was sleeping when you called.`, ok: true }, { en: `I slept when you were calling.`, why: `Длинное — was sleeping, короткое — called.` }, { en: `I was sleep when you called.`, why: `Нужно sleeping.` }] },
      { q: `«Что ты делал вчера в 8 вечера?»`, opts: [{ en: `What were you doing at 8 p.m. yesterday?`, ok: true }, { en: `What did you doing…?`, why: `Процесс в момент — were you doing.` }, { en: `What was you doing…?`, why: `С you — were.` }] },
      { q: `«Пока я ждал автобус, я встретил друга»`, opts: [{ en: `While I was waiting for the bus, I met a friend.`, ok: true }, { en: `While I waited the bus, I was meeting a friend.`, why: `Наоборот: ждал (процесс) — was waiting; встретил — met.` }, { en: `While I am waiting…`, why: `Это прошлое — was waiting.` }] },
    ],
  },
  {
    id: `first_conditional`, level: `B1`, title: `Условия: If it rains, I'll stay home`, topics: [],
    short: `Реальное будущее: If + настоящее, will + глагол.`,
    text: `**First Conditional** — реальная ситуация в будущем:
**If** it **rains**, I'**ll take** the subway.
**If** you **need** help, **call** me.

**Важно:** после **if** и **when** про будущее — **настоящее время** (не will!):
If you **come** (не will come), we'll go to Sal's.
**When** I **get** home, I'll text you.

**unless** = if not: I'll be there **unless** I'm sick.
**as soon as** — как только: I'll call you **as soon as** I land.`,
    formula: `If + Present Simple, will + глагол`,
    examples: [[`If you're hungry, we'll grab a slice.`, `Если проголодаешься, возьмём пиццу.`], [`I'll text you when I get home.`, `Напишу, когда доберусь домой.`], [`If it's sunny tomorrow, let's go to the beach.`, `Если завтра будет солнечно, поедем на пляж.`]],
    mistakes: [[`If it will rain, I'll stay.`, `If it rains, I'll stay.`], [`When I will get home…`, `When I get home…`], [`If you will need help…`, `If you need help…`]],
    quiz: [
      { q: `«Если пойдёт дождь, я останусь дома»`, opts: [{ en: `If it rains, I'll stay home.`, ok: true }, { en: `If it will rain, I'll stay home.`, why: `После if — настоящее: rains.` }, { en: `If it rains, I stay home tomorrow.`, why: `Нужно I'll stay.` }] },
      { q: `«Напишу, когда приеду»`, opts: [{ en: `I'll text you when I arrive.`, ok: true }, { en: `I'll text you when I will arrive.`, why: `После when — настоящее.` }, { en: `I text you when I arrive.`, why: `Обещание в будущем — I'll text.` }] },
      { q: `«Я приду, если не заболею» (unless)`, opts: [{ en: `I'll come unless I get sick.`, ok: true }, { en: `I'll come unless I don't get sick.`, why: `Unless уже «если не».` }, { en: `I come unless I will get sick.`, why: `I'll come unless I get sick.` }] },
    ],
  },
  {
    id: `second_conditional`, level: `B1`, title: `Мечты: If I had a million…`, topics: [],
    short: `Нереальное: If + прошедшее, would + глагол.`,
    text: `**Second Conditional** — нереальная или маловероятная ситуация, мечты:
**If I had** a million dollars, **I'd buy** an apartment in Manhattan.
**If I were** you, **I'd take** the job. (совет!)

**Формула:** If + Past Simple, **would ('d)** + глагол.
**were** для всех лиц в «If I were…» — так правильнее (в разговоре бывает was).

**Полезно:** **I wish** I **had** more time. (жаль, что у меня мало времени)
**What would you do** if…? — Что бы ты сделал, если…?`,
    formula: `If + Past Simple, would + глагол`,
    examples: [[`If I were you, I'd try the pizza.`, `На твоём месте я бы попробовал пиццу.`], [`What would you do if you won the lottery?`, `Что бы ты сделал, если бы выиграл в лотерею?`], [`I wish I spoke English better.`, `Жаль, что я не говорю лучше по-английски.`]],
    mistakes: [[`If I would have money…`, `If I had money…`], [`If I am you…`, `If I were you…`], [`I will buy (в мечтах)`, `I would buy`]],
    quiz: [
      { q: `«На твоём месте я бы согласился»`, opts: [{ en: `If I were you, I'd say yes.`, ok: true }, { en: `If I am you, I will say yes.`, why: `Нереальное: If I were you, I'd…` }, { en: `If I would be you…`, why: `После if — were, без would.` }] },
      { q: `«Если бы у меня были деньги, я бы путешествовал»`, opts: [{ en: `If I had money, I'd travel.`, ok: true }, { en: `If I have money, I'll travel.`, why: `Это реальное условие. Мечта — had / would.` }, { en: `If I would have money, I'd travel.`, why: `После if — had.` }] },
      { q: `«Что бы ты сделал?»`, opts: [{ en: `What would you do?`, ok: true }, { en: `What will you do?`, why: `«Сделаешь» — will. «Сделал бы» — would.` }, { en: `What you would do?`, why: `Порядок: What would you do?` }] },
    ],
  },
  {
    id: `used_to`, level: `B1`, title: `used to: раньше (а теперь нет)`, topics: [],
    short: `I used to live in Moscow. = Раньше я жил в Москве (теперь — нет).`,
    text: `**used to + глагол** — привычка или состояние в прошлом, которых **больше нет**:
I **used to** live in Moscow. (Сейчас — в Нью-Йорке.)
She **used to** smoke, but she quit.

**Вопрос:** **Did** you **use to** play sports?
**Отрицание:** I **didn't use to** like coffee. (теперь люблю)

**Не путай:**
**used to** do — раньше делал
**be used to** doing — привык: I'**m used to** the noise now.
**get used to** — привыкать: You'll **get used to** the subway.`,
    formula: `used to + глагол; be / get used to + -ing`,
    examples: [[`I used to hate coffee. Now I love it!`, `Раньше я ненавидел кофе. Теперь обожаю!`], [`Did you use to live here?`, `Ты раньше здесь жил?`], [`I'm getting used to New York.`, `Я привыкаю к Нью-Йорку.`]],
    mistakes: [[`I use to live in Moscow.`, `I used to live in Moscow.`], [`Did you used to…?`, `Did you use to…?`], [`I'm used to wake up early.`, `I'm used to waking up early.`]],
    quiz: [
      { q: `«Раньше я жил в Москве»`, opts: [{ en: `I used to live in Moscow.`, ok: true }, { en: `I use to live in Moscow.`, why: `Нужно used.` }, { en: `I was used to live in Moscow.`, why: `Это про «привык». Раньше жил — used to live.` }] },
      { q: `«Ты привыкнешь к метро»`, opts: [{ en: `You'll get used to the subway.`, ok: true }, { en: `You'll used to the subway.`, why: `Привыкать — get used to.` }, { en: `You'll use to the subway.`, why: `Правильно: get used to.` }] },
      { q: `«Я привык рано вставать»`, opts: [{ en: `I'm used to getting up early.`, ok: true }, { en: `I'm used to get up early.`, why: `После be used to — -ing.` }, { en: `I used to getting up early.`, why: `Нужно I'm used to getting.` }] },
    ],
  },
  {
    id: `relative`, level: `B1`, title: `who / which / that: «который»`, topics: [],
    short: `the guy who works at Sal's / the place that sells bagels.`,
    text: `Чтобы сказать «который», используем:
**who** — о людях: The guy **who** works at the deli is so nice.
**which** — о вещах: The pizza **which** I ordered was cold.
**that** — и о людях, и о вещах (в американском очень частое!): The place **that** sells the best bagels.
**where** — где: The park **where** we met.
**whose** — чей: The girl **whose** dog is so cute.

Если «который» — не подлежащее, его можно **опустить**: The pizza (that) I ordered was great.`,
    formula: `человек + who / вещь + that / which`,
    examples: [[`She's the barista who makes the best latte.`, `Она бариста, которая делает лучший латте.`], [`This is the apartment I told you about.`, `Это квартира, о которой я тебе говорил.`], [`Do you know a place that's open late?`, `Знаешь место, которое работает допоздна?`]],
    mistakes: [[`The man which…`, `The man who…`], [`The place what sells…`, `The place that sells…`], [`The girl who her dog…`, `The girl whose dog…`]],
    quiz: [
      { q: `«Парень, который работает в пиццерии»`, opts: [{ en: `the guy who works at the pizza place`, ok: true }, { en: `the guy which works…`, why: `О людях — who (или that).` }, { en: `the guy what works…`, why: `What здесь нельзя.` }] },
      { q: `«Место, которое открыто допоздна»`, opts: [{ en: `a place that's open late`, ok: true }, { en: `a place who's open late`, why: `Who — только о людях.` }, { en: `a place what's open late`, why: `What здесь нельзя: that.` }] },
      { q: `«Парк, где мы встретились»`, opts: [{ en: `the park where we met`, ok: true }, { en: `the park which we met`, why: `«Где» — where (или which we met in).` }, { en: `the park what we met`, why: `Правильно: where.` }] },
    ],
  },
  {
    id: `passive`, level: `B1`, title: `Пассив: It was built in 1931`, topics: [],
    short: `Важно ЧТО сделали, а не кто: be + 3-я форма.`,
    text: `**Пассив** = be + 3-я форма глагола. Используем, когда неважно или неизвестно, **кто** сделал:
The Empire State Building **was built** in 1931.
English **is spoken** all over the world.
My wallet **was stolen**! (кто — неизвестно)
Tips **are** not **included**. (чаевые не включены)

**Времена:** is made (вообще) · was made (в прошлом) · will be made · has been made · is being made (сейчас).
**by** — если важно, кем: The song was written **by** Frank Sinatra.

**Частые фразы:** I was born in… · It's made in China · Breakfast is served until 11 · The store is closed.`,
    formula: `be + V3 (made, built, done…)`,
    examples: [[`Brooklyn Bridge was opened in 1883.`, `Бруклинский мост открыли в 1883 году.`], [`Is breakfast included?`, `Завтрак включён?`], [`My order was canceled.`, `Мой заказ отменили.`]],
    mistakes: [[`It built in 1931.`, `It was built in 1931.`], [`English is speak…`, `English is spoken…`], [`I was borned.`, `I was born.`]],
    quiz: [
      { q: `«Мост построили в 1883»`, opts: [{ en: `The bridge was built in 1883.`, ok: true }, { en: `The bridge built in 1883.`, why: `Мост сам не строил: was built.` }, { en: `The bridge was build in 1883.`, why: `3-я форма: built.` }] },
      { q: `«Чаевые включены?»`, opts: [{ en: `Is the tip included?`, ok: true }, { en: `Does the tip include?`, why: `Пассив: Is … included?` }, { en: `Is the tip include?`, why: `Нужно included.` }] },
      { q: `«У меня украли кошелёк»`, opts: [{ en: `My wallet was stolen.`, ok: true }, { en: `My wallet stole.`, why: `Кошелёк сам не крал: was stolen.` }, { en: `They stealed my wallet.`, why: `steal → stole → stolen.` }] },
    ],
  },
  {
    id: `reported`, level: `B1`, title: `Косвенная речь: She said that…`, topics: [],
    short: `Передать чужие слова: He said (that) he was tired.`,
    text: `Когда пересказываем чужие слова, время обычно «сдвигается» назад:
"I **am** tired." → He said (that) he **was** tired.
"I **will** call you." → She said she **would** call me.
"I **can** help." → He said he **could** help.

**say vs tell:**
**say** something: She **said** (that) she was busy.
**tell** someone: She **told me** (that) she was busy. (после tell — кому!)

**Вопросы:** "Where do you live?" → He **asked** where I **lived** (порядок как в утверждении!).
"Are you OK?" → She asked **if** I was OK.

**В разговоре** американцы часто не сдвигают время, если это всё ещё правда: He said he **is** from Texas.`,
    formula: `He said (that) + сдвиг времени назад`,
    examples: [[`Jess said she would be late.`, `Джесс сказала, что опоздает.`], [`He told me he loved New York.`, `Он сказал мне, что любит Нью-Йорк.`], [`She asked if I was hungry.`, `Она спросила, голоден ли я.`]],
    mistakes: [[`He said me…`, `He told me… / He said…`], [`She asked where do I live.`, `She asked where I lived.`], [`He told that…`, `He said that… / He told me that…`]],
    quiz: [
      { q: `«Он сказал мне, что занят»`, opts: [{ en: `He told me he was busy.`, ok: true }, { en: `He said me he was busy.`, why: `Say — без «кому». Tell me.` }, { en: `He told he was busy.`, why: `После tell нужен кому: told me.` }] },
      { q: `«Она спросила, где я живу»`, opts: [{ en: `She asked where I lived.`, ok: true }, { en: `She asked where do I live.`, why: `В косвенном вопросе — прямой порядок: where I lived.` }, { en: `She asked where I do live.`, why: `Без do: where I lived.` }] },
      { q: `"I'll call you." → She said she…`, opts: [{ en: `would call me`, ok: true }, { en: `will call me`, why: `Обычно сдвигаем: will → would.` }, { en: `calls me`, why: `Правильно: would call me.` }] },
    ],
  },
];

// Привязка тем заданий к правилам (для кнопки «❓ Как это работает»)
export function rulesForTopic(topic) {
  return GRAMMAR.filter((r) => r.topics.includes(topic));
}
