// Курс грамматики A2: от «что происходит сейчас» до планов, просьб, сравнений и живой американской речи.
// Каждый юнит — правило (rule из grammar.js или newRule) + 12–13 упражнений от узнавания к свободному ответу.
// Герои: Маркус (таксист), Джесс (бариста), Тони (хот-доги), Дев, миссис Родригес (хозяйка квартиры),
// Сэм (друг из дома), Прия (банк), доктор Ортис, Мария (спасатель).

export default [
  // ===================== 1. Present Continuous =====================
  {
    id: 'present_continuous',
    level: 'A2',
    title: 'Present Continuous: что происходит сейчас',
    goal: 'Сможешь сказать, что происходит прямо сейчас',
    rule: 'present_continuous',
    steps: [
      { t: 'tip', title: 'am / is / are + -ing', text: 'По-русски «я ем» — и «вообще», и «сейчас». В английском «прямо сейчас» — это **I\'m eating**. Нужны **оба** кусочка: **am / is / are** и **-ing**. Без am получится ошибка «I eating».' },
      { t: 'choice', q: 'Джесс звонит тебе: «Что ты сейчас делаешь?»', topic: 'present_continuous', opts: [
        { en: 'What are you doing?', ok: true },
        { en: 'What do you do?', why: 'What do you do? — это «Кем ты работаешь?»' },
        { en: 'What you doing?', why: 'Пропущен are: What are you doing?' },
      ] },
      { t: 'choice', q: '«Я жду такси»', topic: 'present_continuous', opts: [
        { en: "I'm waiting for a taxi.", ok: true },
        { en: 'I wait for a taxi now.', why: 'Действие прямо сейчас — I\'m waiting.' },
        { en: "I'm wait for a taxi.", why: 'После am нужен глагол с -ing: waiting.' },
      ] },
      { t: 'choice', q: '«Маркус сейчас за рулём»', topic: 'present_continuous', opts: [
        { en: 'Marcus is driving right now.', ok: true },
        { en: 'Marcus driving right now.', why: 'Пропущен is: Marcus is driving.' },
        { en: 'Marcus is driveing right now.', why: 'Немая e убирается: drive → driving.' },
      ] },
      { t: 'choice', q: '«Я тебя понимаю»', topic: 'present_continuous', opts: [
        { en: 'I understand you.', ok: true },
        { en: "I'm understanding you.", why: 'Understand — глагол состояния, его не ставят в -ing.' },
        { en: 'I understanding you.', why: 'Просто: I understand.' },
      ] },
      { t: 'choice', q: '«Тони сегодня не работает»', topic: 'present_continuous', opts: [
        { en: "Tony isn't working today.", ok: true },
        { en: "Tony doesn't working today.", why: 'С -ing отрицание через isn\'t, а не doesn\'t.' },
        { en: 'Tony not working today.', why: 'Нужен is: Tony isn\'t working.' },
      ] },
      { t: 'build', q: 'Составь: «Я учу английский»', topic: 'present_continuous', answer: "I'm learning English", extra: ['learn', 'learns', 'do'], hints: [
        { extra: 'learn', text: 'После am нужен глагол с -ing: learning.' },
        { extra: 'learns', text: 'Learns — «учит вообще» (он/она). Здесь: I\'m learning.' },
        { extra: 'do', text: 'Do здесь не нужен: I\'m learning.' },
      ] },
      { t: 'build', q: 'Составь: «Опять идёт дождь»', topic: 'present_continuous', answer: "It's raining again", extra: ['rain', 'rains', 'is'], hints: [
        { extra: 'rains', text: 'Дождь идёт сейчас — raining. Rains — «бывает вообще».' },
        { extra: 'rain', text: 'Нужна форма с -ing: raining.' },
      ] },
      { t: 'build', q: 'Составь вопрос: «Ты идёшь с нами?»', topic: 'present_continuous', answer: 'Are you coming with us?', extra: ['Do', 'come', 'we'], hints: [
        { extra: 'do', text: 'Вопрос в Present Continuous — через are: Are you coming?' },
        { extra: 'come', text: 'После are — coming.' },
        { extra: 'we', text: 'После with — us: with us.' },
      ] },
      { t: 'choice', q: 'Дев спрашивает: «What are you doing?» Ответь: «Я готовлю ужин»', topic: 'present_continuous', opts: [
        { en: "I'm making dinner.", ok: true },
        { en: 'I make dinner.', why: 'Это «я (обычно) готовлю ужин». Сейчас — I\'m making.' },
        { en: "I'm makeing dinner.", why: 'make → making (e убираем).' },
      ] },
      { t: 'type', q: 'Напиши по-английски: «Я сейчас пью кофе»', topic: 'present_continuous', example: "I'm drinking coffee right now.", answers: ['I am drinking coffee right now', 'I am drinking coffee now', 'right now I am drinking coffee', 'now I am drinking coffee', 'I am drinking a coffee right now', 'I am drinking a coffee now', 'I am drinking coffee'], hints: [
        { missing: 'am', text: 'Не забудь am: I\'m drinking.' },
        { missing: 'drinking', text: 'Нужна форма с -ing: drinking.' },
      ] },
      { t: 'type', q: 'Напиши по-английски: «Она говорит по телефону»', topic: 'present_continuous', example: "She's talking on the phone.", answers: ['she is talking on the phone', 'she is speaking on the phone', 'she is talking on the phone right now', 'she is talking on the phone now', 'she is on the phone'], hints: [
        { missing: 'is', text: 'Нужен is: She\'s talking.' },
        { extra: 'talks', text: 'Сейчас — is talking, а не talks.' },
      ] },
      { t: 'type', q: 'Напиши по-английски: «Дев, что ты делаешь?»', topic: 'present_continuous', example: 'Dev, what are you doing?', answers: ['Dev what are you doing', 'what are you doing Dev', 'hey Dev what are you doing', 'Dev what are you doing now', 'Dev what are you doing right now'], hints: [
        { missing: 'are', text: 'В вопросе are стоит перед you: What are you doing?' },
        { extra: 'do', text: 'What do you do? — «Кем работаешь?». Сейчас — What are you doing?' },
      ] },
      { t: 'type', q: 'Напиши по-английски: «Мы не работаем на этой неделе»', topic: 'present_continuous', example: "We aren't working this week.", answers: ['we are not working this week', 'this week we are not working'], hints: [
        { extra: 'do', text: 'С -ing отрицание — aren\'t (are not), а не don\'t.' },
        { missing: 'working', text: 'Нужна форма с -ing: working.' },
      ] },
    ],
  },

  // ===================== 2. Frequency =====================
  {
    id: 'frequency',
    level: 'A2',
    title: 'Как часто: always, usually, never',
    goal: 'Сможешь рассказать о своих привычках и распорядке дня',
    rule: 'frequency',
    steps: [
      { t: 'tip', title: 'Куда ставить always / never', text: 'Наречия частоты стоят **перед обычным глаголом** (I **usually walk**), но **после am / is / are** (She **is always** late). По-русски порядок свободный, в английском — нет.' },
      { t: 'choice', q: '«Я обычно встаю в 7»', topic: 'frequency', opts: [
        { en: 'I usually get up at 7.', ok: true },
        { en: 'I get up usually at 7.', why: 'Usually ставим перед глаголом: I usually get up.' },
        { en: 'Usually I am get up at 7.', why: 'Am здесь не нужен: I usually get up.' },
      ] },
      { t: 'choice', q: '«Маркус всегда занят»', topic: 'frequency', opts: [
        { en: 'Marcus is always busy.', ok: true },
        { en: 'Marcus always is busy.', why: 'После is: is always.' },
        { en: 'Marcus always busy.', why: 'Пропущен is.' },
      ] },
      { t: 'choice', q: '«Я никогда не пью кофе вечером»', topic: 'frequency', opts: [
        { en: 'I never drink coffee in the evening.', ok: true },
        { en: "I don't never drink coffee in the evening.", why: 'Never уже значит «не» — второе отрицание не нужно.' },
        { en: 'I never not drink coffee in the evening.', why: 'Двойное отрицание нельзя.' },
      ] },
      { t: 'choice', q: '«Как часто ты ходишь в спортзал?»', topic: 'frequency', opts: [
        { en: 'How often do you go to the gym?', ok: true },
        { en: 'How often you go to the gym?', why: 'Нужен do: How often do you…?' },
        { en: 'How much often do you go to the gym?', why: '«Как часто» — просто how often.' },
      ] },
      { t: 'choice', q: '«Мы ходим в кино раз в неделю»', topic: 'frequency', opts: [
        { en: 'We go to the movies once a week.', ok: true },
        { en: 'We go to the movies one time in week.', why: '«Раз в неделю» — once a week.' },
        { en: 'We go to the movies once in a week.', why: 'Без in: once a week.' },
      ] },
      { t: 'build', q: 'Составь: «Я обычно беру кофе у Джесс»', topic: 'frequency', answer: 'I usually get coffee from Jess', extra: ['am', 'usual'], hints: [
        { extra: 'am', text: 'С обычным глаголом am не нужен: I usually get…' },
        { extra: 'usual', text: 'Нужно наречие usually, а не прилагательное usual.' },
      ] },
      { t: 'build', q: 'Составь: «Тони никогда не опаздывает»', topic: 'frequency', answer: 'Tony is never late', extra: ['not', 'does', "don't"], hints: [
        { extra: 'not', text: 'Never уже отрицание — not не нужен.' },
        { extra: 'does', text: 'С прилагательным late нужен is, а не does.' },
        { extra: 'do', text: 'Never уже отрицание — don\'t не нужен.' },
      ] },
      { t: 'build', q: 'Составь: «Как часто ты ездишь на метро?»', topic: 'frequency', answer: 'How often do you take the subway?', extra: ['are', 'much', 'underground'], hints: [
        { extra: 'are', text: 'С обычным глаголом take вопрос строится через do.' },
        { extra: 'much', text: '«Как часто» — how often.' },
        { extra: 'underground', text: 'В Нью-Йорке метро — subway.' },
      ] },
      { t: 'choice', q: 'Выбери правильное предложение', topic: 'frequency', opts: [
        { en: 'She usually walks to work.', ok: true },
        { en: 'She walks usually to work.', why: 'Usually — перед глаголом, а не после.' },
        { en: 'She usually walk to work.', why: 'С she глагол с -s: walks.' },
      ] },
      { t: 'type', q: 'Напиши по-английски: «Я всегда завтракаю дома»', topic: 'frequency', example: 'I always have breakfast at home.', answers: ['I always have breakfast at home', 'I always eat breakfast at home'], hints: [
        { missing: 'always', text: 'Always ставим перед глаголом: I always have…' },
        { extra: 'am', text: 'Am не нужен: I always have breakfast.' },
      ] },
      { t: 'type', q: 'Напиши по-английски: «Она всегда занята»', topic: 'frequency', example: "She's always busy.", answers: ['she is always busy'], hints: [
        { missing: 'is', text: 'Нужен is: She is always busy.' },
      ] },
      { t: 'type', q: 'Напиши по-английски: «Я никогда не езжу на такси»', topic: 'frequency', example: 'I never take a taxi.', answers: ['I never take a taxi', 'I never take a cab', 'I never take taxis', 'I never take cabs', 'I never take the taxi', 'I never ride in a taxi', 'I never go by taxi'], hints: [
        { extra: 'not', text: 'Never уже отрицание: I never take…' },
        { missing: 'never', text: '«Никогда» — never, ставим перед глаголом.' },
      ] },
      { t: 'type', q: 'Напиши по-английски: «Как часто ты готовишь?»', topic: 'frequency', example: 'How often do you cook?', answers: ['how often do you cook'], hints: [
        { missing: 'do', text: 'Нужен do: How often do you cook?' },
        { missing: 'often', text: '«Как часто» — how often.' },
      ] },
    ],
  },

  // ===================== 3. was / were =====================
  {
    id: 'was_were',
    level: 'A2',
    title: 'was / were: «был, была, были»',
    goal: 'Сможешь рассказать, где был и как всё прошло',
    rule: 'was_were',
    steps: [
      { t: 'tip', title: 'Был, была, было — всё was', text: 'По-русски «был» меняется по родам, а в английском — только по лицу: **I / he / she / it was**, **you / we / they were**. И не забывай подлежащее: «Вчера было холодно» = **It was** cold yesterday.' },
      { t: 'choice', q: '«Вчера было холодно»', topic: 'was_were', opts: [
        { en: 'It was cold yesterday.', ok: true },
        { en: 'Was cold yesterday.', why: 'Нужно подлежащее it: It was cold.' },
        { en: 'It were cold yesterday.', why: 'С it — was.' },
      ] },
      { t: 'choice', q: '«Мы были в Манхэттене»', topic: 'was_were', opts: [
        { en: 'We were in Manhattan.', ok: true },
        { en: 'We was in Manhattan.', why: 'С we — were.' },
        { en: 'We are in Manhattan.', why: 'Это настоящее время: «мы сейчас в Манхэттене».' },
      ] },
      { t: 'choice', q: '«Ты был дома вчера вечером?»', topic: 'was_were', opts: [
        { en: 'Were you at home last night?', ok: true },
        { en: 'Was you at home last night?', why: 'С you — were.' },
        { en: 'Did you be at home last night?', why: 'С to be did не используют: Were you…?' },
      ] },
      { t: 'choice', q: '«Миссис Родригес не было дома»', topic: 'was_were', opts: [
        { en: "Mrs. Rodriguez wasn't home.", ok: true },
        { en: "Mrs. Rodriguez didn't be home.", why: 'Отрицание от was — wasn\'t, без did.' },
        { en: "Mrs. Rodriguez weren't home.", why: 'Она одна — wasn\'t.' },
      ] },
      { t: 'choice', q: '«Там было много людей»', topic: 'was_were', opts: [
        { en: 'There were a lot of people.', ok: true },
        { en: 'There was a lot of peoples.', why: 'People — уже мн. число, и нужно there were.' },
        { en: 'It was a lot of people.', why: '«Было много» — there were, а не it was.' },
      ] },
      { t: 'build', q: 'Составь: «Как прошли твои выходные?»', topic: 'was_were', answer: 'How was your weekend?', extra: ['were', 'did'], hints: [
        { extra: 'were', text: 'Weekend — один: was.' },
        { extra: 'did', text: 'С to be did не нужен: How was…?' },
      ] },
      { t: 'build', q: 'Составь: «Я родился в Москве»', topic: 'was_were', answer: 'I was born in Moscow', extra: ['am', 'were', 'at'], hints: [
        { extra: 'am', text: 'Родился — это прошлое: I was born.' },
        { extra: 'were', text: 'С I — was.' },
        { extra: 'at', text: 'С городом — in: in Moscow.' },
      ] },
      { t: 'build', q: 'Составь: «Такси было очень дорогим»', topic: 'was_were', answer: 'The taxi was really expensive', extra: ['were', 'is', 'more'], hints: [
        { extra: 'were', text: 'Taxi — одно: was.' },
        { extra: 'is', text: 'Это в прошлом: was.' },
        { extra: 'more', text: 'More — «более». «Очень» — really.' },
      ] },
      { t: 'choice', q: 'Маркус: «How was your day?» Ответь: «Было отлично!»', topic: 'was_were', opts: [
        { en: 'It was great!', ok: true },
        { en: 'Was great!', why: 'Нужно подлежащее: It was great.' },
        { en: 'It were great!', why: 'С it — was.' },
      ] },
      { t: 'type', q: 'Напиши по-английски: «Вчера я очень устал»', topic: 'was_were', example: 'I was really tired yesterday.', answers: ['I was really tired yesterday', 'I was very tired yesterday', 'I was so tired yesterday', 'I was tired yesterday', 'yesterday I was really tired', 'yesterday I was very tired', 'yesterday I was so tired', 'yesterday I was tired'], hints: [
        { missing: 'was', text: '«Устал» по-английски — состояние: I was tired.' },
      ] },
      { t: 'type', q: 'Напиши по-английски: «Где ты был?»', topic: 'was_were', example: 'Where were you?', answers: ['where were you'], hints: [
        { extra: 'was', text: 'С you — were: Where were you?' },
        { extra: 'did', text: 'С to be did не нужен: Where were you?' },
      ] },
      { t: 'type', q: 'Напиши по-английски: «Это было не дорого»', topic: 'was_were', example: "It wasn't expensive.", answers: ["it wasn't expensive", 'it was not expensive', "that wasn't expensive", 'that was not expensive', "it wasn't that expensive", 'it was not that expensive'], hints: [
        { extra: 'did', text: 'Отрицание от was — wasn\'t (was not), без did.' },
        { extra: "didn't", text: 'Отрицание от was — wasn\'t (was not).' },
      ] },
      { t: 'type', q: 'Напиши по-английски: «Ты был на вечеринке вчера?»', topic: 'was_were', example: 'Were you at the party yesterday?', answers: ['were you at the party yesterday', 'yesterday were you at the party'], hints: [
        { extra: 'did', text: 'С to be вопрос без did: Were you…?' },
        { extra: 'was', text: 'С you — were.' },
      ] },
    ],
  },

  // ===================== 4. Past Simple =====================
  {
    id: 'past_simple',
    level: 'A2',
    title: 'Past Simple: worked, went, saw',
    goal: 'Сможешь рассказать, что делал вчера',
    rule: 'past_simple',
    steps: [
      { t: 'tip', title: 'did забирает прошлое на себя', text: 'В вопросе и отрицании прошлое показывает **did**, а глагол возвращается в начальную форму: I **went** → I **didn\'t go**, **Did** you **go**? Никаких «didn\'t went».' },
      { t: 'choice', q: '«Вчера я ходил в Проспект-парк»', topic: 'past_simple', opts: [
        { en: 'I went to Prospect Park yesterday.', ok: true },
        { en: 'I goed to Prospect Park yesterday.', why: 'Go — неправильный глагол: went.' },
        { en: 'I go to Prospect Park yesterday.', why: 'Нужно прошедшее время: went.' },
      ] },
      { t: 'choice', q: '«Ты видел Сэма?»', topic: 'past_simple', opts: [
        { en: 'Did you see Sam?', ok: true },
        { en: 'Did you saw Sam?', why: 'После did — начальная форма: see.' },
        { en: 'Do you saw Sam?', why: 'Вопрос в прошлом — через did.' },
      ] },
      { t: 'choice', q: '«Я не купил хот-дог»', topic: 'past_simple', opts: [
        { en: "I didn't buy a hot dog.", ok: true },
        { en: "I didn't bought a hot dog.", why: 'После didn\'t — начальная форма: buy.' },
        { en: 'I not buy a hot dog.', why: 'Отрицание в прошлом — didn\'t + глагол.' },
      ] },
      { t: 'choice', q: '«Маркус отвёз меня в аэропорт»', topic: 'past_simple', opts: [
        { en: 'Marcus drove me to the airport.', ok: true },
        { en: 'Marcus drived me to the airport.', why: 'Drive — неправильный глагол: drove.' },
        { en: 'Marcus drove me in the airport.', why: 'Направление — to the airport.' },
      ] },
      { t: 'choice', q: '«Мы переехали в Бруклин в мае»', topic: 'past_simple', opts: [
        { en: 'We moved to Brooklyn in May.', ok: true },
        { en: 'We have moved to Brooklyn in May.', why: 'С точным временем (in May) — Past Simple: moved.' },
        { en: 'We moveed to Brooklyn in May.', why: 'Move + d = moved.' },
      ] },
      { t: 'build', q: 'Составь: «Я встретил Джесс в кофейне»', topic: 'past_simple', answer: 'I met Jess at the coffee shop', extra: ['meet', 'meeted', 'did'], hints: [
        { extra: 'meeted', text: 'Meet — неправильный глагол: met.' },
        { extra: 'meet', text: 'Нужно прошедшее время: met.' },
        { extra: 'did', text: 'В утверждении did не нужен: I met.' },
      ] },
      { t: 'build', q: 'Составь: «Что ты делал вчера?»', topic: 'past_simple', answer: 'What did you do yesterday?', extra: ['done', 'was', 'does'], hints: [
        { extra: 'done', text: 'После did — начальная форма: do.' },
        { extra: 'was', text: 'С обычным глаголом вопрос строится через did.' },
        { extra: 'does', text: 'Это прошлое — did.' },
      ] },
      { t: 'build', q: 'Составь: «Я не понял вопрос»', topic: 'past_simple', answer: "I didn't understand the question", extra: ['understood', "don't", 'was'], hints: [
        { extra: 'understood', text: 'После didn\'t — начальная форма: understand.' },
        { extra: 'do', text: 'Это прошлое — didn\'t, а не don\'t.' },
        { extra: 'was', text: 'С обычным глаголом отрицание через didn\'t.' },
      ] },
      { t: 'choice', q: '«Мне понравился фильм»', topic: 'past_simple', opts: [
        { en: 'I liked the movie.', ok: true },
        { en: 'I was liked the movie.', why: 'Was не нужен: просто liked.' },
        { en: 'I like the movie yesterday.', why: 'Прошлое — liked.' },
      ] },
      { t: 'type', q: 'Напиши по-английски: «Вчера я много работал»', topic: 'past_simple', example: 'I worked a lot yesterday.', answers: ['I worked a lot yesterday', 'yesterday I worked a lot', 'I worked hard yesterday', 'yesterday I worked hard', 'I worked a lot of hours yesterday'], hints: [
        { extra: 'work', text: 'Прошлое: work + ed = worked.' },
        { extra: 'was', text: 'Was не нужен: I worked.' },
      ] },
      { t: 'type', q: 'Напиши по-английски: «Ты хорошо спал?»', topic: 'past_simple', example: 'Did you sleep well?', answers: ['did you sleep well', 'did you sleep ok', 'did you sleep okay', 'did you have a good night'], hints: [
        { extra: 'slept', text: 'После did — начальная форма: sleep.' },
        { missing: 'did', text: 'Вопрос в прошлом начинается с did.' },
        { extra: 'good', text: 'Как спал? — well (наречие).' },
      ] },
      { t: 'type', q: 'Напиши по-английски: «Я не видел Тони сегодня»', topic: 'past_simple', example: "I didn't see Tony today.", answers: ["I didn't see Tony today", 'I did not see Tony today', "I haven't seen Tony today", 'I have not seen Tony today', "today I didn't see Tony", 'today I did not see Tony'], hints: [
        { extra: 'saw', text: 'После didn\'t — начальная форма: see.' },
        { extra: 'do', text: 'Это прошлое — didn\'t.' },
      ] },
      { t: 'type', q: 'Напиши по-английски: «Вчера мы ели пиццу»', topic: 'past_simple', example: 'We ate pizza yesterday.', answers: ['we ate pizza yesterday', 'yesterday we ate pizza', 'we had pizza yesterday', 'yesterday we had pizza', 'we ate some pizza yesterday', 'we had some pizza yesterday'], hints: [
        { extra: 'eated', text: 'Eat — неправильный глагол: ate.' },
        { extra: 'eat', text: 'Прошлое от eat — ate.' },
      ] },
    ],
  },

  // ===================== 5. Наречия образа действия =====================
  {
    id: 'adverbs_manner',
    level: 'A2',
    title: 'Как? quickly, well, fast, hard',
    goal: 'Сможешь сказать, как кто-то что-то делает: быстро, хорошо, осторожно',
    newRule: {
      id: 'adverbs_manner', level: 'A2', title: 'Наречия: quickly, well, fast, hard', topics: [],
      short: 'Как делает? Прилагательное + -ly: quick → quickly. Но good → well, а fast и hard не меняются.',
      text: `**Прилагательное** описывает предмет: a **quick** lunch, a **careful** driver.
**Наречие** описывает действие — отвечает на вопрос **«как?»**: Marcus drives **carefully**. Eat **quickly**!

**Как образуется:** прилагательное + **-ly**
quick → quick**ly** · slow → slow**ly** · careful → careful**ly** · quiet → quiet**ly** · bad → bad**ly**
easy → eas**ily** (y → i) · happy → happ**ily**

**Исключения — запомни:**
good → **well**: You speak English **well**! (не good)
fast → **fast**: Marcus drives **fast**. (слова fastly нет)
hard → **hard**: Tony works **hard**. (**hardly** — совсем другое: «почти не»)
late → **late**: I got up **late**. (**lately** = «в последнее время»)
early → **early**: She came **early**.

**Где ставить:** после глагола или после дополнения:
She speaks English **well**. (не She speaks well English)

**Ловушка для русских:** «хорошо» по-русски — и «Это хорошо», и «Он хорошо готовит». В английском: That's **good** (о вещи), He cooks **well** (о действии).
Но **I feel good / I'm good** — так говорят о самочувствии, это нормально.`,
      formula: 'глагол + наречие: drive carefully, speak well, work hard',
      examples: [
        ['Marcus drives really fast.', 'Маркус ездит очень быстро.'],
        ['You speak English well!', 'Ты хорошо говоришь по-английски!'],
        ['Tony works hard every day.', 'Тони много (усердно) работает каждый день.'],
        ['Could you speak slowly, please?', 'Не могли бы вы говорить медленно?'],
        ['Jess smiled happily.', 'Джесс радостно улыбнулась.'],
      ],
      mistakes: [
        ['You speak English good.', 'You speak English well. (о действии — well)'],
        ['He drives fastly.', 'He drives fast. (fast не меняется)'],
        ['She speaks well English.', 'She speaks English well. (наречие — после дополнения)'],
      ],
      quiz: [],
    },
    steps: [
      { t: 'tip', title: 'hard ≠ hardly', text: 'I work **hard** — я много (усердно) работаю. I **hardly** work — я почти не работаю! Так же: **late** — поздно, **lately** — в последнее время.' },
      { t: 'choice', q: '«Ты хорошо говоришь по-английски!»', topic: 'adverbs_manner', opts: [
        { en: 'You speak English well!', ok: true },
        { en: 'You speak English good!', why: 'О действии — наречие well, а не good.' },
        { en: 'You speak well English!', why: 'Наречие ставим после English: speak English well.' },
      ] },
      { t: 'choice', q: '«Маркус водит очень быстро»', topic: 'adverbs_manner', opts: [
        { en: 'Marcus drives really fast.', ok: true },
        { en: 'Marcus drives really fastly.', why: 'Fast не меняется — слова fastly нет.' },
        { en: 'Marcus really fast drives.', why: 'Наречие ставим после глагола: drives fast.' },
      ] },
      { t: 'choice', q: '«Тони много (усердно) работает»', topic: 'adverbs_manner', opts: [
        { en: 'Tony works hard.', ok: true },
        { en: 'Tony works hardly.', why: 'Hardly = «почти не». Tony hardly works — Тони почти не работает!' },
        { en: 'Tony works hardy.', why: 'Такой формы нет: works hard.' },
      ] },
      { t: 'choice', q: '«Пожалуйста, говорите медленно»', topic: 'adverbs_manner', opts: [
        { en: 'Please speak slowly.', ok: true },
        { en: 'Please slowly speak.', why: 'Наречие — после глагола: speak slowly.' },
        { en: 'Please speak more slowlier.', why: 'Сравнение — slower или more slowly, но не slowlier.' },
      ] },
      { t: 'choice', q: '«Она осторожный водитель»', topic: 'adverbs_manner', opts: [
        { en: "She's a careful driver.", ok: true },
        { en: "She's a carefully driver.", why: 'Перед существительным — прилагательное: careful.' },
        { en: "She's careful a driver.", why: 'Порядок: a careful driver.' },
      ] },
      { t: 'build', q: 'Составь: «Маркус водит осторожно»', topic: 'adverbs_manner', answer: 'Marcus drives carefully', extra: ['careful', 'drive'], hints: [
        { extra: 'careful', text: 'Как водит? — наречие carefully.' },
        { extra: 'drive', text: 'Marcus — он: drives.' },
      ] },
      { t: 'build', q: 'Составь: «Джесс очень быстро делает кофе»', topic: 'adverbs_manner', answer: 'Jess makes coffee really quickly', extra: ['quick', 'fastly', 'make'], hints: [
        { extra: 'quick', text: 'Как делает? — наречие quickly.' },
        { extra: 'fastly', text: 'Слова fastly нет.' },
        { extra: 'make', text: 'Jess — она: makes.' },
      ] },
      { t: 'build', q: 'Составь: «Ты отлично готовишь!»', topic: 'adverbs_manner', answer: 'You cook really well', extra: ['good', 'goodly'], hints: [
        { extra: 'good', text: 'О действии — well: You cook well.' },
        { extra: 'goodly', text: 'От good наречие — well.' },
      ] },
      { t: 'choice', q: '«Я встал поздно»', topic: 'adverbs_manner', opts: [
        { en: 'I got up late.', ok: true },
        { en: 'I got up lately.', why: 'Lately = «в последнее время». Поздно — late.' },
        { en: 'I late got up.', why: 'Наречие — после глагола: got up late.' },
      ] },
      { t: 'type', q: 'Напиши по-английски: «Ты хорошо водишь!»', topic: 'adverbs_manner', example: 'You drive well!', answers: ['you drive well', 'you drive really well', 'you drive very well', 'you are a good driver'], hints: [
        { extra: 'good', text: 'О действии — well: You drive well.' },
      ] },
      { t: 'type', q: 'Напиши по-английски: «Пожалуйста, говори тихо»', topic: 'adverbs_manner', example: 'Please speak quietly.', answers: ['please speak quietly', 'speak quietly please', 'please talk quietly', 'talk quietly please'], hints: [
        { extra: 'quiet', text: 'Как говорить? — наречие quietly.' },
      ] },
      { t: 'type', q: 'Напиши по-английски: «Она быстро бегает»', topic: 'adverbs_manner', example: 'She runs fast.', answers: ['she runs fast', 'she runs quickly', 'she runs really fast', 'she runs very fast'], hints: [
        { extra: 'fastly', text: 'Fast не меняется: runs fast.' },
        { extra: 'run', text: 'She — она: runs.' },
      ] },
      { t: 'type', q: 'Напиши по-английски: «Я плохо говорю по-английски»', topic: 'adverbs_manner', example: "I don't speak English very well.", answers: ['I do not speak English very well', 'I do not speak English well', 'I speak English badly', 'I speak bad English', 'my English is not very good', 'my English is not good', 'my English is bad'], hints: [
        { extra: 'bad', text: 'О действии — badly: I speak English badly. А естественнее всего: I don\'t speak English very well.' },
        { extra: 'good', text: 'О действии — well: I don\'t speak English well.' },
      ] },
    ],
  },

  // ===================== 6. Comparatives =====================
  {
    id: 'comparatives',
    level: 'A2',
    title: 'Сравнение: bigger, more expensive, the best',
    goal: 'Сможешь сравнивать районы, цены и еду',
    rule: 'comparatives',
    steps: [
      { t: 'tip', title: '«Чем» — than', text: 'Русское «чем» — это **than** (не that и не then). И не добавляй more к форме на -er: **bigger**, а не «more bigger».' },
      { t: 'choice', q: '«Метро быстрее такси»', topic: 'comparatives', opts: [
        { en: 'The subway is faster than a taxi.', ok: true },
        { en: 'The subway is more fast than a taxi.', why: 'Fast — короткое: faster.' },
        { en: 'The subway is faster then a taxi.', why: '«Чем» — than. Then = «потом».' },
      ] },
      { t: 'choice', q: '«Эта квартира дороже»', topic: 'comparatives', opts: [
        { en: 'This apartment is more expensive.', ok: true },
        { en: 'This apartment is expensiver.', why: 'Длинное прилагательное — more expensive.' },
        { en: 'This apartment is more expensiver.', why: 'Или more, или -er, но не вместе.' },
      ] },
      { t: 'choice', q: '«Лучший хот-дог в Нью-Йорке»', topic: 'comparatives', opts: [
        { en: 'the best hot dog in New York', ok: true },
        { en: 'the goodest hot dog in New York', why: 'Good → better → the best.' },
        { en: 'the best hot dog of New York', why: 'С местом — in: the best … in New York.' },
      ] },
      { t: 'choice', q: '«Сегодня хуже, чем вчера»', topic: 'comparatives', opts: [
        { en: 'Today is worse than yesterday.', ok: true },
        { en: 'Today is badder than yesterday.', why: 'Bad → worse.' },
        { en: 'Today is more bad than yesterday.', why: 'Bad — неправильное: worse.' },
      ] },
      { t: 'choice', q: '«Бруклин не такой дорогой, как Манхэттен»', topic: 'comparatives', opts: [
        { en: "Brooklyn isn't as expensive as Manhattan.", ok: true },
        { en: "Brooklyn isn't so expensive than Manhattan.", why: 'Конструкция — as … as.' },
        { en: "Brooklyn isn't as expensive like Manhattan.", why: 'После as … нужно второе as, а не like.' },
      ] },
      { t: 'build', q: 'Составь: «Бруклин больше Манхэттена»', topic: 'comparatives', answer: 'Brooklyn is bigger than Manhattan', extra: ['more', 'that', 'biger'], hints: [
        { extra: 'more', text: 'Big — короткое: bigger, без more.' },
        { extra: 'that', text: '«Чем» — than.' },
        { extra: 'biger', text: 'Согласная удваивается: bigger.' },
      ] },
      { t: 'build', q: 'Составь: «Это самая дорогая кофейня в городе»', topic: 'comparatives', answer: 'This is the most expensive coffee shop in the city', extra: ['more', 'expensivest', 'of'], hints: [
        { extra: 'expensivest', text: 'Длинное слово: the most expensive.' },
        { extra: 'more', text: '«Самая» — the most.' },
        { extra: 'of', text: 'С местом — in the city.' },
      ] },
      { t: 'build', q: 'Составь: «Твой английский лучше моего»', topic: 'comparatives', answer: 'Your English is better than mine', extra: ['gooder', 'my', 'more'], hints: [
        { extra: 'gooder', text: 'Good → better.' },
        { extra: 'my', text: 'Без существительного — mine: better than mine.' },
        { extra: 'more', text: 'Better уже «лучше», more не нужен.' },
      ] },
      { t: 'choice', q: '«Это лучший день в моей жизни!»', topic: 'comparatives', opts: [
        { en: 'This is the best day ever!', ok: true },
        { en: 'This is the most best day ever!', why: 'Best уже «самый лучший», most не нужен.' },
        { en: 'This is best day ever!', why: 'Перед превосходной степенью нужен the.' },
      ] },
      { t: 'type', q: 'Напиши по-английски: «Метро дешевле такси»', topic: 'comparatives', example: 'The subway is cheaper than a taxi.', answers: ['the subway is cheaper than a taxi', 'the subway is cheaper than a cab', 'the subway is cheaper than taxis', 'the subway is cheaper than cabs', 'the subway is cheaper than the taxi', 'the subway is cheaper than taking a taxi', 'the subway is cheaper than taking a cab'], hints: [
        { extra: 'more', text: 'Cheap — короткое: cheaper.' },
        { missing: 'than', text: '«Чем» — than.' },
      ] },
      { t: 'type', q: 'Напиши по-английски: «Это лучшая пицца в Нью-Йорке!»', topic: 'comparatives', example: 'This is the best pizza in New York!', answers: ['this is the best pizza in New York', 'it is the best pizza in New York', 'this is the best pizza in New York City', 'it is the best pizza in New York City', 'this is the best pizza in NYC', 'it is the best pizza in NYC'], hints: [
        { extra: 'of', text: 'С местом — in: the best pizza in New York.' },
        { missing: 'the', text: 'Перед best нужен the.' },
      ] },
      { t: 'type', q: 'Напиши по-английски: «Сегодня жарче, чем вчера»', topic: 'comparatives', example: "It's hotter today than yesterday.", answers: ['it is hotter today than yesterday', 'today is hotter than yesterday', 'today it is hotter than yesterday', 'it is hotter today than it was yesterday', 'today is hotter than it was yesterday', 'today it is hotter than it was yesterday', 'it is hotter than yesterday'], hints: [
        { extra: 'more', text: 'Hot — короткое: hotter (t удваивается).' },
        { missing: 'than', text: '«Чем» — than.' },
      ] },
      { t: 'type', q: 'Напиши по-английски: «Бруклин не такой шумный, как Манхэттен»', topic: 'comparatives', example: "Brooklyn isn't as noisy as Manhattan.", answers: ['Brooklyn is not as noisy as Manhattan', 'Brooklyn is not as loud as Manhattan', 'Brooklyn is not so noisy as Manhattan', 'Brooklyn is quieter than Manhattan', 'Brooklyn is less noisy than Manhattan'], hints: [
        { extra: 'like', text: 'Конструкция as … as: not as noisy as.' },
        { extra: 'than', text: 'Либо not as noisy as, либо quieter than — не смешивай.' },
      ] },
    ],
  },

  // ===================== 7. too / enough =====================
  {
    id: 'too_enough',
    level: 'A2',
    title: 'too / enough: слишком и достаточно',
    goal: 'Сможешь объяснить, почему что-то не подходит: слишком дорого, недостаточно большое',
    newRule: {
      id: 'too_enough', level: 'A2', title: 'too и enough: слишком дорого, недостаточно большой', topics: [],
      short: 'too + прилагательное = «слишком». Прилагательное + enough = «достаточно» — enough ставим ПОСЛЕ прилагательного!',
      text: `**too** = «слишком» (больше, чем надо, — и это проблема):
It's **too expensive**. I'm **too tired** to go out. The music is **too loud**.

**enough** = «достаточно». Главное: с прилагательным **enough** стоит **после** него:
The apartment is**n't big enough**. (не enough big!)
Are you **old enough**? Is it **warm enough** for the beach?

**enough + существительное** — наоборот, **перед** ним:
I don't have **enough money**. There aren't **enough chairs**.

**+ to + глагол** — для чего:
It's **too cold to swim**. (слишком холодно, чтобы плавать)
He's **old enough to drive**.
**+ for** — для кого: This coffee is **too strong for me**.

**Ловушка: too ≠ very.**
**very** — просто «очень», без проблемы: It's **very** expensive, but I'll buy it.
**too** — «слишком», значит, не подходит: It's **too** expensive. I can't buy it.
И никакого much перед прилагательным: **too expensive**, а не «too much expensive».`,
      formula: 'too + прилагательное · прилагательное + enough · enough + существительное',
      examples: [
        ["It's too expensive for me.", 'Для меня это слишком дорого.'],
        ["The apartment isn't big enough.", 'Квартира недостаточно большая.'],
        ["It's too cold to swim today.", 'Сегодня слишком холодно, чтобы плавать.'],
        ["I don't have enough money.", 'У меня недостаточно денег.'],
        ['Is the water warm enough?', 'Вода достаточно тёплая?'],
      ],
      mistakes: [
        ['The room is enough big.', 'The room is big enough. (enough — после прилагательного)'],
        ["It's too much expensive.", "It's too expensive. (too + прилагательное, без much)"],
        ["I don't have money enough.", "I don't have enough money. (enough — перед существительным)"],
      ],
      quiz: [],
    },
    steps: [
      { t: 'tip', title: 'too ≠ very', text: '**very** — «очень», просто факт: It\'s **very** expensive, but I love it. **too** — «слишком», это проблема: It\'s **too** expensive. I can\'t buy it.' },
      { t: 'choice', q: '«Это слишком дорого»', topic: 'too_enough', opts: [
        { en: "It's too expensive.", ok: true },
        { en: "It's too much expensive.", why: 'С прилагательным — просто too, без much.' },
        { en: "It's very expensive.", why: 'Very = «очень». «Слишком» — too.' },
      ] },
      { t: 'choice', q: '«Квартира недостаточно большая»', topic: 'too_enough', opts: [
        { en: "The apartment isn't big enough.", ok: true },
        { en: "The apartment isn't enough big.", why: 'Enough ставим после прилагательного: big enough.' },
        { en: 'The apartment is too not big.', why: '«Недостаточно» — not … enough.' },
      ] },
      { t: 'choice', q: '«У меня недостаточно денег»', topic: 'too_enough', opts: [
        { en: "I don't have enough money.", ok: true },
        { en: "I don't have money enough.", why: 'С существительным enough стоит перед ним: enough money.' },
        { en: "I don't have too money.", why: 'Too — «слишком». Здесь нужно enough.' },
      ] },
      { t: 'choice', q: 'Мария, спасатель: «Слишком холодно, чтобы плавать»', topic: 'too_enough', opts: [
        { en: "It's too cold to swim.", ok: true },
        { en: "It's too cold for swim.", why: 'Для чего — to + глагол: to swim.' },
        { en: "It's enough cold to swim.", why: '«Слишком» — too. А enough ставят после прилагательного.' },
      ] },
      { t: 'choice', q: '«Кофе слишком горячий для меня»', topic: 'too_enough', opts: [
        { en: 'The coffee is too hot for me.', ok: true },
        { en: 'The coffee is too hot to me.', why: 'Для кого — for me.' },
        { en: 'The coffee is too much hot for me.', why: 'Без much: too hot.' },
      ] },
      { t: 'build', q: 'Составь: «Музыка слишком громкая»', topic: 'too_enough', answer: 'The music is too loud', extra: ['much', 'enough', 'very'], hints: [
        { extra: 'much', text: 'Too + прилагательное, без much.' },
        { extra: 'enough', text: '«Слишком» — too.' },
        { extra: 'very', text: 'Very — «очень». «Слишком» — too.' },
      ] },
      { t: 'build', q: 'Составь: «Ты достаточно взрослый, чтобы водить?»', topic: 'too_enough', answer: 'Are you old enough to drive?', extra: ['for', 'driving', 'much'], hints: [
        { extra: 'for', text: 'Для чего — to + глагол: to drive.' },
        { extra: 'driving', text: 'После to — начальная форма: drive.' },
        { extra: 'much', text: 'Much здесь не нужен: old enough.' },
      ] },
      { t: 'build', q: 'Составь: «Здесь недостаточно стульев»', topic: 'too_enough', answer: "There aren't enough chairs here", extra: ["isn't", 'chair', 'too'], hints: [
        { extra: 'too', text: '«Недостаточно» — not enough.' },
        { extra: 'is', text: 'Стульев много — there aren\'t.' },
        { extra: 'chair', text: 'Стульев много — chairs.' },
      ] },
      { t: 'choice', q: 'Сэм: «Пойдём пешком?» Ответь: «Нет, слишком далеко»', topic: 'too_enough', opts: [
        { en: "No, it's too far.", ok: true },
        { en: "No, it's far enough.", why: 'Far enough = «достаточно далеко» — смысл другой.' },
        { en: "No, it's too much far.", why: 'Без much: too far.' },
      ] },
      { t: 'type', q: 'Напиши по-английски: «Это слишком дорого для меня»', topic: 'too_enough', example: "It's too expensive for me.", answers: ['it is too expensive for me', 'that is too expensive for me', 'this is too expensive for me', 'it is a little too expensive for me', 'it is way too expensive for me'], hints: [
        { extra: 'much', text: 'Too + прилагательное: too expensive, без much.' },
        { missing: 'too', text: '«Слишком» — too.' },
      ] },
      { t: 'type', q: 'Напиши по-английски: «Комната недостаточно большая»', topic: 'too_enough', example: "The room isn't big enough.", answers: ['the room is not big enough', 'the room is not large enough', 'this room is not big enough', 'this room is not large enough', 'the room is too small', 'this room is too small'], hints: [
        { missing: 'enough', text: '«Недостаточно большая» — not big enough.' },
        { extra: 'very', text: '«Недостаточно» — not … enough.' },
      ] },
      { t: 'type', q: 'Напиши по-английски: «У меня недостаточно времени»', topic: 'too_enough', example: "I don't have enough time.", answers: ['I do not have enough time', "I haven't got enough time", 'I have not got enough time', 'there is not enough time'], hints: [
        { missing: 'enough', text: '«Недостаточно» — not enough: enough time.' },
        { extra: 'too', text: 'Too — «слишком». Здесь — enough.' },
      ] },
      { t: 'type', q: 'Напиши по-английски: «Слишком холодно, чтобы идти на пляж»', topic: 'too_enough', example: "It's too cold to go to the beach.", answers: ['it is too cold to go to the beach', 'it is too cold for the beach', 'it is too cold to go to the beach today', 'it is too cold for the beach today'], hints: [
        { extra: 'much', text: 'Без much: too cold.' },
        { missing: 'too', text: '«Слишком» — too.' },
      ] },
    ],
  },

  // ===================== 8. much / many / some / any =====================
  {
    id: 'countable',
    level: 'A2',
    title: 'much / many / a lot of / some / any',
    goal: 'Сможешь спросить «сколько?» и сказать, чего много, а чего мало',
    rule: 'countable',
    steps: [
      { t: 'tip', title: 'Можно посчитать?', text: '**Many** — то, что считается штуками (people, dollars, slices). **Much** — то, что не считается (money, time, water). Сомневаешься — говори **a lot of**: подходит ко всему.' },
      { t: 'choice', q: 'Спроси у Тони: «Сколько это стоит?»', topic: 'countable', opts: [
        { en: 'How much is it?', ok: true },
        { en: 'How many is it?', why: 'О цене — How much.' },
        { en: 'How much it costs?', why: 'Нужен вопрос: How much is it? / How much does it cost?' },
      ] },
      { t: 'choice', q: '«Сколько кусков пиццы ты хочешь?»', topic: 'countable', opts: [
        { en: 'How many slices do you want?', ok: true },
        { en: 'How much slices do you want?', why: 'Куски можно посчитать — many.' },
        { en: 'How many slice do you want?', why: 'После many — мн. число: slices.' },
      ] },
      { t: 'choice', q: '«В Нью-Йорке много туристов»', topic: 'countable', opts: [
        { en: 'There are a lot of tourists in New York.', ok: true },
        { en: 'There are much tourists in New York.', why: 'Туристов можно посчитать: many или a lot of.' },
        { en: 'There is a lot tourists in New York.', why: 'Нужно a lot of, и туристов много — there are.' },
      ] },
      { t: 'choice', q: '«У меня нет денег»', topic: 'countable', opts: [
        { en: "I don't have any money.", ok: true },
        { en: "I don't have some money.", why: 'В отрицании — any.' },
        { en: "I don't have no money.", why: 'Двойное отрицание нельзя.' },
      ] },
      { t: 'choice', q: 'Джесс предлагает: «Хотите молока в кофе?»', topic: 'countable', opts: [
        { en: 'Would you like some milk?', ok: true },
        { en: 'Would you like a milk?', why: 'Milk — неисчисляемое, без a.' },
        { en: 'Would you like many milk?', why: 'Молоко не считается штуками.' },
      ] },
      { t: 'build', q: 'Составь: «Сколько у тебя времени?»', topic: 'countable', answer: 'How much time do you have?', extra: ['many', 'times', 'are'], hints: [
        { extra: 'many', text: 'Время не считается штуками — much.' },
        { extra: 'times', text: 'Time здесь неисчисляемое, без -s.' },
        { extra: 'are', text: 'С глаголом have вопрос через do.' },
      ] },
      { t: 'build', q: 'Составь: «На Таймс-сквер много людей»', topic: 'countable', answer: 'There are a lot of people in Times Square', extra: ['much', 'peoples', 'is'], hints: [
        { extra: 'much', text: 'Людей можно посчитать: a lot of / many.' },
        { extra: 'peoples', text: 'People — уже мн. число.' },
        { extra: 'is', text: 'Людей много — there are.' },
      ] },
      { t: 'build', q: 'Составь: «У нас мало молока»', topic: 'countable', answer: "We don't have much milk", extra: ['many', 'milks', 'some'], hints: [
        { extra: 'many', text: 'Молоко не считается — much.' },
        { extra: 'milks', text: 'Milk — неисчисляемое, без -s.' },
        { extra: 'some', text: 'В отрицании — much или any, не some.' },
      ] },
      { t: 'choice', q: 'Миссис Родригес: «Купи немного яблок»', topic: 'countable', opts: [
        { en: 'Get some apples.', ok: true },
        { en: 'Get any apples.', why: 'В просьбе и утверждении — some.' },
        { en: 'Get much apples.', why: 'Яблоки считаются — some / a few.' },
      ] },
      { t: 'type', q: 'Напиши по-английски: «Сколько людей?»', topic: 'countable', example: 'How many people?', answers: ['how many people', 'how many people are there', 'how many people are coming'], hints: [
        { extra: 'much', text: 'Людей считаем — many.' },
        { extra: 'peoples', text: 'People — уже мн. число.' },
      ] },
      { t: 'type', q: 'Напиши по-английски: «У меня не так много времени»', topic: 'countable', example: "I don't have much time.", answers: ['I do not have much time', 'I do not have a lot of time', 'I do not have too much time', 'I have not got much time', "I haven't got much time"], hints: [
        { extra: 'many', text: 'Time — неисчисляемое: much.' },
      ] },
      { t: 'type', q: 'Напиши по-английски: «Можно мне немного воды?»', topic: 'countable', example: 'Can I have some water?', answers: ['can I have some water', 'can I have some water please', 'can I get some water', 'can I get some water please', 'could I have some water', 'could I have some water please', 'could I get some water', 'could I get some water please', 'may I have some water', 'may I have some water please', 'can I please have some water', 'could I please have some water'], hints: [
        { extra: 'any', text: 'В вежливой просьбе — some: some water.' },
        { missing: 'some', text: '«Немного воды» — some water.' },
      ] },
      { t: 'type', q: 'Напиши по-английски: «У тебя есть вопросы?»', topic: 'countable', example: 'Do you have any questions?', answers: ['do you have any questions', 'any questions', 'do you have questions'], hints: [
        { extra: 'some', text: 'В вопросе обычно any: any questions.' },
        { missing: 'do', text: 'Вопрос с have — через do: Do you have…?' },
      ] },
    ],
  },

  // ===================== 9. something / anyone / nowhere =====================
  {
    id: 'some_any_compounds',
    level: 'A2',
    title: 'something, anyone, nowhere, everybody',
    goal: 'Сможешь сказать «что-нибудь», «никто», «везде» — и без двойного отрицания',
    newRule: {
      id: 'some_any_compounds', level: 'A2', title: 'something / anything / nothing / everything', topics: [],
      short: 'some- — в утверждениях, any- — в вопросах и после not, no- — «ни-» (без not!), every- — «все, всё, везде».',
      text: `Из **some / any / no / every** + **thing** (вещь), **body / one** (человек), **where** (место) получаются удобные слова:

| | вещь | человек | место |
|---|---|---|---|
| some- | something | somebody / someone | somewhere |
| any- | anything | anybody / anyone | anywhere |
| no- | nothing | nobody / no one | nowhere |
| every- | everything | everybody / everyone | everywhere |

**some-** — в утверждениях и предложениях: I need **something** to eat. **Someone** is at the door.
**any-** — в вопросах и после **not**: Do you need **anything**? I don't know **anyone** here.
**no-** — уже отрицание, глагол без not: **Nobody** called. I have **nothing** to do.
**every-** — все, всё, везде: **Everybody** loves pizza. I looked **everywhere**!

**Главная ловушка для русских — двойное отрицание.** По-русски «Я **ни**чего **не** знаю» — два «не». По-английски — только одно:
I **don't** know **anything**. = I know **nothing**. (не I don't know nothing)

**Ещё важно:** everybody, nobody, somebody — это как «он»: **Everybody is** here. (не are) **Nobody knows**.
**-body** и **-one** — одно и то же: someone = somebody.`,
      formula: 'some- (утверждение) · any- (вопрос, not) · no- (без not) · every- (все)',
      examples: [
        ['Is anybody home?', 'Дома кто-нибудь есть?'],
        ["I don't know anyone in Brooklyn yet.", 'Я пока никого не знаю в Бруклине.'],
        ['Nobody answered the phone.', 'Никто не ответил на звонок.'],
        ["Everybody is here. Let's go!", 'Все здесь. Пошли!'],
        ["Let's go somewhere tonight.", 'Давай сходим куда-нибудь сегодня вечером.'],
      ],
      mistakes: [
        ["I don't know nothing.", "I don't know anything. / I know nothing. (только одно отрицание)"],
        ['Everybody are here.', 'Everybody is here. (everybody — как «он»)'],
        ["Nobody didn't call.", 'Nobody called. (nobody уже отрицание)'],
      ],
      quiz: [],
    },
    steps: [
      { t: 'tip', title: 'Одно «не» на предложение', text: 'По-русски «Я **ни**кого **не** знаю». По-английски отрицание одно: I **don\'t** know **anyone** или I know **nobody**. Если уже есть not — бери **any-**, если нет not — бери **no-**.' },
      { t: 'choice', q: '«Я ничего не знаю»', topic: 'some_any_compounds', opts: [
        { en: "I don't know anything.", ok: true },
        { en: "I don't know nothing.", why: 'Двойное отрицание нельзя: don\'t + anything.' },
        { en: 'I know anything.', why: 'Без not «ничего» — nothing: I know nothing.' },
      ] },
      { t: 'choice', q: '«Все здесь»', topic: 'some_any_compounds', opts: [
        { en: 'Everybody is here.', ok: true },
        { en: 'Everybody are here.', why: 'Everybody — как «он»: is.' },
        { en: 'All is here.', why: 'О людях — everybody / everyone.' },
      ] },
      { t: 'choice', q: '«Мне никто не звонил»', topic: 'some_any_compounds', opts: [
        { en: 'Nobody called me.', ok: true },
        { en: "Nobody didn't call me.", why: 'Nobody уже отрицание — didn\'t не нужен.' },
        { en: 'Anybody called me.', why: 'В утверждении «никто» — nobody.' },
      ] },
      { t: 'choice', q: 'Джесс: «Хотите что-нибудь выпить?»', topic: 'some_any_compounds', opts: [
        { en: 'Would you like something to drink?', ok: true },
        { en: 'Would you like nothing to drink?', why: 'Nothing — «ничего». Предлагая — something.' },
        { en: 'Would you like something drink?', why: 'Пропущено to: something to drink.' },
      ] },
      { t: 'choice', q: '«Я нигде не могу найти ключи»', topic: 'some_any_compounds', opts: [
        { en: "I can't find my keys anywhere.", ok: true },
        { en: "I can't find my keys nowhere.", why: 'После can\'t — anywhere. Одно отрицание!' },
        { en: "I can't find my keys somewhere.", why: 'После not — any-: anywhere.' },
      ] },
      { t: 'build', q: 'Составь: «Дома кто-нибудь есть?»', topic: 'some_any_compounds', answer: 'Is anybody home?', extra: ['are', 'nobody', 'do'], hints: [
        { extra: 'are', text: 'Anybody — как «он»: is.' },
        { extra: 'nobody', text: 'В вопросе — anybody.' },
        { extra: 'do', text: 'Вопрос с to be: Is anybody…?' },
      ] },
      { t: 'build', q: 'Составь: «Мне нечего делать»', topic: 'some_any_compounds', answer: 'I have nothing to do', extra: ['not', 'doing', 'no'], hints: [
        { extra: 'not', text: 'Nothing уже отрицание — not не нужен.' },
        { extra: 'doing', text: 'После to — начальная форма: do.' },
        { extra: 'no', text: '«Ничего» — nothing.' },
      ] },
      { t: 'build', q: 'Составь: «Давай пойдём куда-нибудь сегодня вечером»', topic: 'some_any_compounds', answer: "Let's go somewhere tonight", extra: ['anywhere', 'to', 'at'], hints: [
        { extra: 'anywhere', text: 'В утверждении и предложении — somewhere.' },
        { extra: 'to', text: 'Somewhere уже значит «куда-то» — to не нужен.' },
        { extra: 'at', text: 'Tonight — без предлога.' },
      ] },
      { t: 'choice', q: 'Миссис Родригес: «Кто-то оставил это у двери»', topic: 'some_any_compounds', opts: [
        { en: 'Someone left this at the door.', ok: true },
        { en: 'Anyone left this at the door.', why: 'В утверждении — someone.' },
        { en: 'Someone leave this at the door.', why: 'Это прошлое: left.' },
      ] },
      { t: 'type', q: 'Напиши по-английски: «Я никого здесь не знаю»', topic: 'some_any_compounds', example: "I don't know anyone here.", answers: ['I do not know anyone here', 'I do not know anybody here', 'I do not know anyone here yet', 'I do not know anybody here yet', 'I know nobody here', 'I know no one here'], hints: [
        { extra: 'nobody', text: 'После don\'t — anyone / anybody. Одно отрицание!' },
        { extra: 'somebody', text: 'После not — anyone / anybody.' },
      ] },
      { t: 'type', q: 'Напиши по-английски: «Всё в порядке»', topic: 'some_any_compounds', example: 'Everything is OK.', answers: ['everything is ok', 'everything is okay', 'everything is fine', 'everything is all right', 'everything is alright', 'everything is good'], hints: [
        { extra: 'are', text: 'Everything — как «оно»: is.' },
        { missing: 'everything', text: '«Всё» — everything.' },
      ] },
      { t: 'type', q: 'Напиши по-английски: «Мне нужно что-нибудь поесть»', topic: 'some_any_compounds', example: 'I need something to eat.', answers: ['I need something to eat', 'I need to eat something'], hints: [
        { extra: 'anything', text: 'В утверждении — something.' },
        { missing: 'to', text: '«Что-нибудь поесть» — something to eat.' },
      ] },
      { t: 'type', q: 'Напиши по-английски: «Никто не знает»', topic: 'some_any_compounds', example: 'Nobody knows.', answers: ['nobody knows', 'no one knows', 'nobody knows that', 'no one knows that'], hints: [
        { extra: 'not', text: 'Nobody уже отрицание — not не нужен.' },
        { extra: 'anybody', text: 'Без not «никто» — nobody.' },
      ] },
    ],
  },

  // ===================== 10. going to =====================
  {
    id: 'going_to',
    level: 'A2',
    title: 'Будущее: going to / gonna',
    goal: 'Сможешь рассказать о своих планах',
    rule: 'going_to',
    steps: [
      { t: 'tip', title: 'gonna = going to', text: 'В речи американцы говорят **gonna**: I\'m **gonna** call you. Но am / is / are всё равно нужен: не «I gonna», а **I\'m gonna**. И после gonna никогда не ставь to.' },
      { t: 'choice', q: '«Я собираюсь найти работу»', topic: 'going_to', opts: [
        { en: "I'm going to find a job.", ok: true },
        { en: 'I going to find a job.', why: 'Нужен am: I\'m going to.' },
        { en: "I'm going to finding a job.", why: 'После going to — начальная форма: find.' },
      ] },
      { t: 'choice', q: '«Что ты собираешься делать в эти выходные?»', topic: 'going_to', opts: [
        { en: 'What are you going to do this weekend?', ok: true },
        { en: 'What you going to do this weekend?', why: 'Нужен are: What are you going to do?' },
        { en: 'What are you going to doing this weekend?', why: 'После to — начальная форма: do.' },
      ] },
      { t: 'choice', q: 'Разговорно: «Я опоздаю!»', topic: 'going_to', opts: [
        { en: "I'm gonna be late!", ok: true },
        { en: "I'm gonna to be late!", why: 'Gonna уже включает to.' },
        { en: 'I gonna be late!', why: 'Нужен am: I\'m gonna.' },
      ] },
      { t: 'choice', q: 'На небе тучи: «Сейчас пойдёт дождь»', topic: 'going_to', opts: [
        { en: "It's going to rain.", ok: true },
        { en: 'It will to rain.', why: 'После will — без to. А когда видно признаки, лучше going to.' },
        { en: "It's go to rain.", why: 'Нужно going to: It\'s going to rain.' },
      ] },
      { t: 'choice', q: '«Мы не собираемся переезжать»', topic: 'going_to', opts: [
        { en: "We're not going to move.", ok: true },
        { en: "We don't going to move.", why: 'Отрицание — not после are: We\'re not going to.' },
        { en: "We're going not to move.", why: 'Not ставим перед going.' },
      ] },
      { t: 'build', q: 'Составь: «Я собираюсь позвонить маме»', topic: 'going_to', answer: "I'm going to call my mom", extra: ['calling', 'mum', 'will'], hints: [
        { extra: 'calling', text: 'После going to — начальная форма: call.' },
        { extra: 'mum', text: 'По-американски — mom.' },
        { extra: 'will', text: 'План — going to, will не нужен.' },
      ] },
      { t: 'build', q: 'Составь: «Ты собираешься купить машину?»', topic: 'going_to', answer: 'Are you going to buy a car?', extra: ['Do', 'buying', 'go'], hints: [
        { extra: 'do', text: 'С going to вопрос через are: Are you going to…?' },
        { extra: 'buying', text: 'После to — начальная форма: buy.' },
        { extra: 'go', text: 'Нужно going to, а не go.' },
      ] },
      { t: 'build', q: 'Составь: «Сэм собирается приехать в декабре»', topic: 'going_to', answer: 'Sam is going to visit in December', extra: ['are', 'visiting', 'on'], hints: [
        { extra: 'are', text: 'Sam — он: is.' },
        { extra: 'visiting', text: 'После to — начальная форма: visit.' },
        { extra: 'on', text: 'С месяцами — in: in December.' },
      ] },
      { t: 'choice', q: 'Дев: «What are you gonna do tonight?» Ответь: «Буду смотреть кино»', topic: 'going_to', opts: [
        { en: "I'm gonna watch a movie.", ok: true },
        { en: "I'm gonna watching a movie.", why: 'После gonna — начальная форма: watch.' },
        { en: 'I gonna watch a movie.', why: 'Нужен am: I\'m gonna.' },
      ] },
      { t: 'type', q: 'Напиши по-английски: «Я собираюсь учить английский»', topic: 'going_to', example: "I'm going to learn English.", answers: ['I am going to learn English', 'I am going to study English'], hints: [
        { missing: 'am', text: 'Нужен am: I\'m going to.' },
        { missing: 'to', text: 'Going to + глагол: going to learn.' },
      ] },
      { t: 'type', q: 'Напиши по-английски: «Что ты собираешься делать?»', topic: 'going_to', example: 'What are you going to do?', answers: ['what are you going to do'], hints: [
        { missing: 'are', text: 'Нужен are: What are you going to do?' },
        { extra: 'doing', text: 'После to — начальная форма: do.' },
      ] },
      { t: 'type', q: 'Напиши по-английски: «Будет дождь» (видно тучи)', topic: 'going_to', example: "It's going to rain.", answers: ['it is going to rain', 'it looks like it is going to rain', 'looks like it is going to rain', 'it will rain'], hints: [
        { missing: 'is', text: 'Нужно it\'s: It\'s going to rain.' },
        { extra: 'raining', text: 'После to — начальная форма: rain.' },
      ] },
      { t: 'type', q: 'Напиши по-английски: «Я не собираюсь ему говорить»', topic: 'going_to', example: "I'm not going to tell him.", answers: ['I am not going to tell him', 'I am not going to tell him anything'], hints: [
        { extra: 'do', text: 'С going to — am not: I\'m not going to.' },
        { extra: 'say', text: 'Сказать кому-то — tell him.' },
      ] },
    ],
  },

  // ===================== 11. will =====================
  {
    id: 'will',
    level: 'A2',
    title: 'Будущее: will / won\'t',
    goal: 'Сможешь пообещать, предложить помощь и принять решение на ходу',
    rule: 'will',
    steps: [
      { t: 'tip', title: 'will или going to?', text: '**going to** — план, решил заранее: I\'m **going to** buy a bike. **will** — решил прямо сейчас, обещаешь или предлагаешь помощь: The bag is heavy? I\'**ll** help you! После will — глагол **без to**.' },
      { t: 'choice', q: 'Миссис Родригес несёт тяжёлые сумки. Предложи: «Я помогу!»', topic: 'will', opts: [
        { en: "I'll help you!", ok: true },
        { en: 'I help you!', why: 'Решение прямо сейчас — I\'ll help.' },
        { en: 'I will to help you!', why: 'После will — без to.' },
      ] },
      { t: 'choice', q: 'Обещание: «Я позвоню тебе завтра»', topic: 'will', opts: [
        { en: "I'll call you tomorrow.", ok: true },
        { en: 'I call you tomorrow.', why: 'Обещание на будущее — I\'ll call.' },
        { en: "I'll calling you tomorrow.", why: 'После will — начальная форма: call.' },
      ] },
      { t: 'choice', q: '«Я не опоздаю, обещаю»', topic: 'will', opts: [
        { en: "I won't be late, I promise.", ok: true },
        { en: "I don't will be late, I promise.", why: 'Отрицание — won\'t (will not).' },
        { en: "I won't late, I promise.", why: 'Late — прилагательное, нужно be: won\'t be late.' },
      ] },
      { t: 'choice', q: 'Заказываешь у Джесс: «Я возьму латте»', topic: 'will', opts: [
        { en: "I'll have a latte.", ok: true },
        { en: "I'll to have a latte.", why: 'После will — без to.' },
        { en: 'I take a latte.', why: 'Заказывая, говорят I\'ll have… или Can I get…?' },
      ] },
      { t: 'choice', q: '«Думаю, тебе понравится Нью-Йорк»', topic: 'will', opts: [
        { en: "I think you'll love New York.", ok: true },
        { en: 'I think you love New York.', why: 'Это прогноз на будущее — you\'ll love.' },
        { en: 'I think you will loving New York.', why: 'После will — начальная форма: love.' },
      ] },
      { t: 'build', q: 'Составь: «Я помогу тебе с переездом»', topic: 'will', answer: "I'll help you with the move", extra: ['to', 'helping'], hints: [
        { extra: 'to', text: 'После will — без to.' },
        { extra: 'helping', text: 'После will — начальная форма: help.' },
      ] },
      { t: 'build', q: 'Составь: «Ты будешь там в восемь?»', topic: 'will', answer: 'Will you be there at eight?', extra: ['Are', 'in', 'do'], hints: [
        { extra: 'are', text: 'С will — be: Will you be…?' },
        { extra: 'in', text: 'Время по часам — at.' },
        { extra: 'do', text: 'Будущее — Will you…?' },
      ] },
      { t: 'build', q: 'Составь: «Я никому не скажу»', topic: 'will', answer: "I won't tell anyone", extra: ['nobody', 'telling', "don't"], hints: [
        { extra: 'nobody', text: 'После won\'t — anyone. Одно отрицание!' },
        { extra: 'telling', text: 'После won\'t — начальная форма: tell.' },
        { extra: 'do', text: 'Будущее — won\'t.' },
      ] },
      { t: 'choice', q: 'Сэм: «Я вернусь через час»', topic: 'will', opts: [
        { en: "I'll be back in an hour.", ok: true },
        { en: "I'll be back after an hour.", why: '«Через час» (от сейчас) — in an hour.' },
        { en: "I'll back in an hour.", why: 'Нужно be: I\'ll be back.' },
      ] },
      { t: 'type', q: 'Напиши по-английски: «Я позвоню тебе позже»', topic: 'will', example: "I'll call you later.", answers: ['I will call you later', 'I will call you back later', 'I will give you a call later', 'I will phone you later', 'I will call later'], hints: [
        { extra: 'to', text: 'После will — без to.' },
        { missing: 'will', text: 'Обещание — I\'ll (I will).' },
      ] },
      { t: 'type', q: 'Напиши по-английски: «Я не забуду»', topic: 'will', example: "I won't forget.", answers: ['I will not forget', 'I will not forget it', 'I will never forget'], hints: [
        { extra: 'do', text: 'Будущее отрицание — won\'t (will not).' },
      ] },
      { t: 'type', q: 'Заказываешь у Тони: «Я возьму хот-дог»', topic: 'will', example: "I'll have a hot dog.", answers: ['I will have a hot dog', 'I will have a hot dog please', 'I will take a hot dog', 'I will take a hot dog please', 'I will get a hot dog', 'I will get a hot dog please', 'can I get a hot dog', 'can I get a hot dog please', 'can I have a hot dog', 'can I have a hot dog please'], hints: [
        { extra: 'to', text: 'После will — без to.' },
        { missing: 'will', text: 'Заказ: I\'ll have…' },
      ] },
      { t: 'type', q: 'Напиши по-английски: «Думаю, будет весело»', topic: 'will', example: "I think it'll be fun.", answers: ["I think it'll be fun", 'I think it will be fun', 'I think that it will be fun', 'I think it is going to be fun'], hints: [
        { missing: 'be', text: 'Fun — прилагательное, нужен be: it will be fun.' },
        { extra: 'funny', text: 'Funny — «смешной». Весело — fun.' },
      ] },
    ],
  },

  // ===================== 12. Настоящее о будущем =====================
  {
    id: 'present_for_future',
    level: 'A2',
    title: 'Настоящее о будущем: I\'m meeting Sam tomorrow',
    goal: 'Сможешь говорить о договорённостях и расписании',
    newRule: {
      id: 'present_for_future', level: 'A2', title: 'Настоящее время о будущем: договорённости и расписание', topics: [],
      short: 'Договорились — Present Continuous: I\'m meeting Sam tomorrow. Расписание — Present Simple: The train leaves at 5.',
      text: `По-русски мы тоже так говорим: «Завтра я **встречаюсь** с Сэмом», «Поезд **уходит** в пять». В английском — два случая.

**1. Договорённость (есть время, место, человек) → Present Continuous**, am / is / are + -ing:
I'**m meeting** Sam tomorrow. (уже договорились)
We'**re having** a party on Saturday.
I'**m seeing** Dr. Ortiz on Monday. (записан к врачу)
What **are** you **doing** tonight? — так американцы спрашивают о планах!

**2. Расписание, график → Present Simple:**
The train **leaves** at 5:30. The store **opens** at 9.
The movie **starts** at 8. My flight **lands** at noon.
When **does** the bank **close**? — At 5.

**Сравни:**
I'**m meeting** Sam at 7. — договорились, точно.
I'**m going to** call Sam. — решил, собираюсь.
I'**ll** call Sam! — решил прямо сейчас.

**Ловушка:** после **when, after, before** о будущем — настоящее время, без will:
I'll call you **when I get** home. (не when I will get)`,
      formula: "I'm meeting… tomorrow (договорились) · The train leaves at 5 (расписание)",
      examples: [
        ["I'm meeting Sam tomorrow.", 'Завтра я встречаюсь с Сэмом.'],
        ['What are you doing tonight?', 'Что делаешь сегодня вечером?'],
        ['The train leaves at 5.', 'Поезд уходит в пять.'],
        ['The bank opens at 9.', 'Банк открывается в девять.'],
        ["We're flying to Miami on Friday.", 'В пятницу мы летим в Майами.'],
      ],
      mistakes: [
        ['I meet Sam tomorrow.', "I'm meeting Sam tomorrow. (договорённость — Present Continuous)"],
        ['The train is leaving at 5 every day.', 'The train leaves at 5 every day. (расписание — Present Simple)'],
        ["I'll call you when I will get home.", "I'll call you when I get home. (после when — настоящее)"],
      ],
      quiz: [],
    },
    steps: [
      { t: 'tip', title: 'What are you doing tonight?', text: 'Это не «что ты делаешь прямо сейчас», а **«какие планы на вечер?»**. Отвечай так же: I\'**m meeting** friends. / I\'**m staying** home.' },
      { t: 'choice', q: '«Завтра я встречаюсь с Сэмом» (уже договорились)', topic: 'present_for_future', opts: [
        { en: "I'm meeting Sam tomorrow.", ok: true },
        { en: 'I meet Sam tomorrow.', why: 'Договорённость — Present Continuous: I\'m meeting.' },
        { en: "I'm meet Sam tomorrow.", why: 'После am — meeting.' },
      ] },
      { t: 'choice', q: '«Поезд уходит в 5»', topic: 'present_for_future', opts: [
        { en: 'The train leaves at 5.', ok: true },
        { en: 'The train leave at 5.', why: 'Train — он: leaves.' },
        { en: 'The train will leaves at 5.', why: 'После will нет -s. А для расписания достаточно leaves.' },
      ] },
      { t: 'choice', q: 'Дев спрашивает о планах: «Что ты делаешь в субботу?»', topic: 'present_for_future', opts: [
        { en: 'What are you doing on Saturday?', ok: true },
        { en: 'What do you do on Saturday?', why: 'Это «что ты обычно делаешь по субботам». О планах — What are you doing?' },
        { en: 'What you are doing on Saturday?', why: 'В вопросе are стоит перед you.' },
      ] },
      { t: 'choice', q: 'Спроси Прию: «Во сколько закрывается банк?»', topic: 'present_for_future', opts: [
        { en: 'What time does the bank close?', ok: true },
        { en: 'What time is the bank close?', why: 'Close здесь — глагол: does the bank close?' },
        { en: 'What time the bank closes?', why: 'В вопросе нужен does.' },
      ] },
      { t: 'choice', q: '«Я позвоню, когда приду домой»', topic: 'present_for_future', opts: [
        { en: "I'll call you when I get home.", ok: true },
        { en: "I'll call you when I will get home.", why: 'После when — настоящее: when I get.' },
        { en: 'I call you when I get home.', why: 'Обещание — I\'ll call.' },
      ] },
      { t: 'build', q: 'Составь: «В пятницу мы устраиваем вечеринку»', topic: 'present_for_future', answer: "We're having a party on Friday", extra: ['in', 'have', 'making'], hints: [
        { extra: 'in', text: 'С днями недели — on Friday.' },
        { extra: 'have', text: 'Договорённость — we\'re having.' },
        { extra: 'making', text: 'Вечеринку «устраивают» — have a party.' },
      ] },
      { t: 'build', q: 'Составь: «Фильм начинается в восемь»', topic: 'present_for_future', answer: 'The movie starts at eight', extra: ['starting', 'in', 'start'], hints: [
        { extra: 'starting', text: 'Расписание — Present Simple: starts.' },
        { extra: 'start', text: 'Movie — оно: starts.' },
        { extra: 'in', text: 'Время по часам — at.' },
      ] },
      { t: 'build', q: 'Составь: «В понедельник я иду к доктору Ортису»', topic: 'present_for_future', answer: "I'm seeing Dr. Ortiz on Monday", extra: ['see', 'at', 'in'], hints: [
        { extra: 'see', text: 'Договорённость — I\'m seeing.' },
        { extra: 'at', text: 'С днями недели — on Monday.' },
        { extra: 'in', text: 'С днями недели — on Monday.' },
      ] },
      { t: 'choice', q: '«Самолёт прилетает в полдень»', topic: 'present_for_future', opts: [
        { en: 'The plane lands at noon.', ok: true },
        { en: 'The plane landing at noon.', why: 'Расписание — lands (или is landing).' },
        { en: 'The plane lands in noon.', why: 'Время — at noon.' },
      ] },
      { t: 'type', q: 'Напиши по-английски: «Что ты делаешь сегодня вечером?» (о планах)', topic: 'present_for_future', example: 'What are you doing tonight?', answers: ['what are you doing tonight', 'what are you doing this evening', 'what are you up to tonight', 'what are you going to do tonight', 'what are you going to do this evening', 'what are your plans for tonight'], hints: [
        { missing: 'are', text: 'О планах: What are you doing tonight?' },
        { extra: 'do', text: 'What do you do? — «Кем работаешь?». О планах — What are you doing?' },
      ] },
      { t: 'type', q: 'Напиши по-английски: «Завтра я работаю»', topic: 'present_for_future', example: "I'm working tomorrow.", answers: ['I am working tomorrow', 'tomorrow I am working', 'I work tomorrow', 'I have to work tomorrow', 'I have work tomorrow'], hints: [
        { extra: 'will', text: 'О графике работы проще: I\'m working tomorrow.' },
      ] },
      { t: 'type', q: 'Напиши по-английски: «Магазин открывается в девять»', topic: 'present_for_future', example: 'The store opens at nine.', answers: ['the store opens at nine', 'the store opens at 9', "the store opens at nine o'clock", "the store opens at 9 o'clock", 'the store opens at 9 am', 'the store opens at 9am', 'the store opens at 9 a.m.', 'the shop opens at nine', 'the shop opens at 9'], hints: [
        { extra: 'open', text: 'Store — он: opens.' },
        { extra: 'in', text: 'Время по часам — at.' },
      ] },
      { t: 'type', q: 'Напиши по-английски: «В пятницу мы летим в Майами»', topic: 'present_for_future', example: "We're flying to Miami on Friday.", answers: ['we are flying to Miami on Friday', 'on Friday we are flying to Miami', 'we are going to Miami on Friday', 'on Friday we are going to Miami', 'we are going to fly to Miami on Friday', 'we fly to Miami on Friday'], hints: [
        { extra: 'in', text: 'С днями недели — on Friday.' },
        { missing: 'to', text: 'Куда — to Miami.' },
      ] },
    ],
  },

  // ===================== 13. like doing / would like to do =====================
  {
    id: 'like_ing',
    level: 'A2',
    title: 'like doing / would like to do',
    goal: 'Сможешь рассказать, что любишь, и вежливо сказать, чего хочешь',
    rule: 'like_ing',
    steps: [
      { t: 'tip', title: 'Do you like…? или Would you like…?', text: '**Do you like** coffee? — «Ты любишь кофе (вообще)?» **Would you like** a coffee? — «Хочешь кофе (сейчас)?» Предлагая что-то, всегда говори **Would you like…?**' },
      { t: 'choice', q: '«Я люблю гулять по Бруклину»', topic: 'like_ing', opts: [
        { en: 'I love walking around Brooklyn.', ok: true },
        { en: 'I love walk around Brooklyn.', why: 'После love — walking (или to walk).' },
        { en: "I'm love walking around Brooklyn.", why: 'Am не нужен: I love walking.' },
      ] },
      { t: 'choice', q: 'Джесс предлагает: «Хотите кофе?»', topic: 'like_ing', opts: [
        { en: 'Would you like a coffee?', ok: true },
        { en: 'Do you like a coffee?', why: 'Do you like = «любишь ли вообще». Предлагая — Would you like…?' },
        { en: 'Would you like drink coffee?', why: 'Нужно to: Would you like to drink…?' },
      ] },
      { t: 'choice', q: '«Мне нравится готовить»', topic: 'like_ing', opts: [
        { en: 'I enjoy cooking.', ok: true },
        { en: 'I enjoy to cook.', why: 'После enjoy — только -ing: cooking.' },
        { en: 'I enjoy cook.', why: 'Нужно cooking.' },
      ] },
      { t: 'choice', q: 'В банке у Прии: «Я бы хотел открыть счёт»', topic: 'like_ing', opts: [
        { en: "I'd like to open an account.", ok: true },
        { en: "I'd like open an account.", why: 'Нужно to: I\'d like to open.' },
        { en: 'I like to open an account.', why: 'I like = «мне нравится (вообще)».' },
      ] },
      { t: 'choice', q: '«Терпеть не могу ждать»', topic: 'like_ing', opts: [
        { en: 'I hate waiting.', ok: true },
        { en: 'I hate wait.', why: 'После hate — waiting (или to wait).' },
        { en: "I'm hate waiting.", why: 'Am не нужен: I hate waiting.' },
      ] },
      { t: 'build', q: 'Составь: «Хочешь пойти с нами?»', topic: 'like_ing', answer: 'Would you like to come with us?', extra: ['Do', 'coming', 'for'], hints: [
        { extra: 'do', text: 'Вежливое приглашение — Would you like…?' },
        { extra: 'coming', text: 'После would like — to + глагол: to come.' },
        { extra: 'for', text: 'Would you like to + глагол, без for.' },
      ] },
      { t: 'build', q: 'Составь: «Он любит играть в баскетбол»', topic: 'like_ing', answer: 'He likes playing basketball', extra: ['like', 'play', 'the'], hints: [
        { extra: 'like', text: 'He — он: likes.' },
        { extra: 'play', text: 'После likes — playing.' },
        { extra: 'the', text: 'Перед видами спорта артикль не нужен.' },
      ] },
      { t: 'build', q: 'Составь: «Я бы хотел заказать пиццу»', topic: 'like_ing', answer: "I'd like to order a pizza", extra: ['ordering', 'want', 'for'], hints: [
        { extra: 'ordering', text: 'После would like — to + глагол: to order.' },
        { extra: 'want', text: 'I\'d like уже значит «хотел бы».' },
        { extra: 'for', text: 'Без for: I\'d like to order.' },
      ] },
      { t: 'choice', q: '«Ты любишь танцевать?»', topic: 'like_ing', opts: [
        { en: 'Do you like dancing?', ok: true },
        { en: 'Would you like dancing?', why: 'Would you like — «хочешь (сейчас)». О вкусах — Do you like…?' },
        { en: 'Are you like dancing?', why: 'Вопрос с like — через do.' },
      ] },
      { t: 'type', q: 'Напиши по-английски: «Мне нравится плавать»', topic: 'like_ing', example: 'I like swimming.', answers: ['I like swimming', 'I like to swim', 'I love swimming', 'I love to swim', 'I enjoy swimming'], hints: [
        { extra: 'swim', text: 'После like — swimming или to swim.' },
        { extra: 'am', text: 'Am не нужен: I like swimming.' },
      ] },
      { t: 'type', q: 'Напиши по-английски: «Я бы хотел чашку кофе»', topic: 'like_ing', example: "I'd like a cup of coffee.", answers: ['I would like a cup of coffee', 'I would like a cup of coffee please', 'I would like a coffee', 'I would like a coffee please', 'can I get a cup of coffee', 'can I have a cup of coffee'], hints: [
        { missing: 'would', text: 'Вежливое «хотел бы» — I\'d like.' },
        { extra: 'want', text: 'Вежливее: I\'d like…' },
      ] },
      { t: 'type', q: 'Напиши по-английски: «Хочешь присоединиться к нам?»', topic: 'like_ing', example: 'Would you like to join us?', answers: ['would you like to join us', 'do you want to join us', 'want to join us', 'you want to join us'], hints: [
        { missing: 'to', text: 'Would you like to + глагол: to join.' },
        { extra: 'joining', text: 'После would like — to join.' },
      ] },
      { t: 'type', q: 'Напиши по-английски: «Ненавижу рано вставать»', topic: 'like_ing', example: 'I hate getting up early.', answers: ['I hate getting up early', 'I hate to get up early', 'I hate waking up early', 'I hate to wake up early'], hints: [
        { extra: 'get', text: 'После hate — getting up (или to get up).' },
        { missing: 'up', text: 'Вставать — get up.' },
      ] },
    ],
  },

  // ===================== 14. Цель: to + глагол =====================
  {
    id: 'infinitive_purpose',
    level: 'A2',
    title: 'Зачем? I went to the store to buy milk',
    goal: 'Сможешь объяснить, зачем ты что-то делаешь',
    newRule: {
      id: 'infinitive_purpose', level: 'A2', title: 'Цель: to + глагол («чтобы…»)', topics: [],
      short: '«Чтобы» по-английски — просто to: I came to New York to work. Не for work и не for to work.',
      text: `Когда отвечаешь на вопрос **«зачем?»**, по-английски достаточно **to + глагол**:
I went to the store **to buy** milk. (чтобы купить)
I'm saving money **to rent** an apartment.
Marcus stopped **to get** gas.

**Ловушка для русских:** «для того чтобы» хочется перевести как **for**. Но **for + глагол** — ошибка:
I came here **to study**. (не for study, не for to study)

**for + существительное** — можно: I came here **for work**. Let's go out **for pizza**.
Сравни: I went out **to get** coffee = I went out **for** coffee.

**Вопрос «Зачем?»** — **Why…?**, а коротко ответить можно одним **To + глагол**:
— Why are you learning English? — **To get** a better job.

**in order to** — то же самое, но официально: You need your ID **in order to** open an account.`,
      formula: 'действие + to + глагол (цель) · for + существительное',
      examples: [
        ['I went to the store to buy milk.', 'Я пошёл в магазин купить молока.'],
        ['I came to New York to work.', 'Я приехал в Нью-Йорк работать.'],
        ['Marcus stopped to get gas.', 'Маркус остановился заправиться.'],
        ['— Why are you learning English? — To get a better job.', '— Зачем ты учишь английский? — Чтобы найти работу получше.'],
        ["Let's go out for pizza.", 'Давай сходим поесть пиццы.'],
      ],
      mistakes: [
        ['I came here for study.', 'I came here to study. (цель — to + глагол)'],
        ['I went to the bank for to open an account.', 'I went to the bank to open an account. (без for)'],
        ['I went to the store for buying milk.', 'I went to the store to buy milk.'],
      ],
      quiz: [],
    },
    steps: [
      { t: 'tip', title: 'чтобы = to', text: 'В английском «чтобы» обычно превращается в одно маленькое **to**. Хочется сказать **for** — остановись: for ставим только перед существительным (**for coffee**, **for work**).' },
      { t: 'choice', q: '«Я пошёл в магазин, чтобы купить молока»', topic: 'infinitive_purpose', opts: [
        { en: 'I went to the store to buy milk.', ok: true },
        { en: 'I went to the store for buy milk.', why: 'Цель — to + глагол, не for.' },
        { en: 'I went to the store for to buy milk.', why: 'For не нужен: to buy.' },
      ] },
      { t: 'choice', q: '«Я приехал в Нью-Йорк работать»', topic: 'infinitive_purpose', opts: [
        { en: 'I came to New York to work.', ok: true },
        { en: 'I came to New York for working.', why: 'Цель — to + глагол: to work.' },
        { en: 'I came to New York that I work.', why: '«Чтобы» — to + глагол.' },
      ] },
      { t: 'choice', q: '«Давай сходим за пиццей»', topic: 'infinitive_purpose', opts: [
        { en: "Let's go out for pizza.", ok: true },
        { en: "Let's go out for eat pizza.", why: 'For + глагол нельзя. Либо for pizza, либо to eat pizza.' },
        { en: "Let's go out to pizza.", why: 'Перед существительным — for: for pizza.' },
      ] },
      { t: 'choice', q: '— Why are you learning English? Ответь: «Чтобы найти работу»', topic: 'infinitive_purpose', opts: [
        { en: 'To find a job.', ok: true },
        { en: 'For find a job.', why: 'Цель — To + глагол.' },
        { en: 'For to find a job.', why: 'For не нужен: To find a job.' },
      ] },
      { t: 'choice', q: '«Маркус остановился, чтобы заправиться»', topic: 'infinitive_purpose', opts: [
        { en: 'Marcus stopped to get gas.', ok: true },
        { en: 'Marcus stopped for get gas.', why: 'Цель — to get.' },
        { en: 'Marcus stopped to get petrol.', why: 'Petrol — британское. В США бензин — gas.' },
      ] },
      { t: 'build', q: 'Составь: «Я иду в банк, чтобы открыть счёт»', topic: 'infinitive_purpose', answer: "I'm going to the bank to open an account", extra: ['for', 'opening', 'a'], hints: [
        { extra: 'for', text: 'Цель — to + глагол, for не нужен.' },
        { extra: 'opening', text: 'После to — начальная форма: open.' },
        { extra: 'a', text: 'Account начинается с гласного звука: an account.' },
      ] },
      { t: 'build', q: 'Составь: «Она копит деньги, чтобы купить машину»', topic: 'infinitive_purpose', answer: "She's saving money to buy a car", extra: ['for', 'buying', 'save'], hints: [
        { extra: 'for', text: 'Цель — to + глагол: to buy.' },
        { extra: 'buying', text: 'После to — начальная форма: buy.' },
        { extra: 'save', text: 'Сейчас копит — she\'s saving.' },
      ] },
      { t: 'build', q: 'Составь: «Я позвонил, чтобы сказать спасибо»', topic: 'infinitive_purpose', answer: 'I called to say thank you', extra: ['for', 'said', 'tell'], hints: [
        { extra: 'for', text: 'Цель — to + глагол: to say.' },
        { extra: 'said', text: 'После to — начальная форма: say.' },
        { extra: 'tell', text: '«Сказать спасибо» — say thank you.' },
      ] },
      { t: 'choice', q: '«Я встал рано, чтобы успеть на поезд»', topic: 'infinitive_purpose', opts: [
        { en: 'I got up early to catch the train.', ok: true },
        { en: 'I got up early for catch the train.', why: 'Цель — to catch.' },
        { en: 'I got up early for catching the train.', why: 'Цель — to + глагол: to catch.' },
      ] },
      { t: 'type', q: 'Напиши по-английски: «Я приехал сюда учиться»', topic: 'infinitive_purpose', example: 'I came here to study.', answers: ['I came here to study', 'I came here to learn', 'I have come here to study'], hints: [
        { extra: 'for', text: 'Цель — to + глагол: to study.' },
        { extra: 'studying', text: 'После to — начальная форма: study.' },
      ] },
      { t: 'type', q: 'Напиши по-английски: «Я иду в магазин, чтобы купить хлеба»', topic: 'infinitive_purpose', example: "I'm going to the store to buy bread.", answers: ['I am going to the store to buy bread', 'I am going to the store to buy some bread', 'I am going to the store to get bread', 'I am going to the store to get some bread', 'I am going to the store for bread', 'I am going to the store for some bread', 'I am going to the shop to buy bread', 'I am going to the shop to buy some bread', 'I am going to the shop to get some bread'], hints: [
        { extra: 'for', text: 'Цель — to + глагол: to buy bread (или for bread без глагола).' },
        { missing: 'store', text: 'Магазин в США — store.' },
      ] },
      { t: 'type', q: 'Напиши по-английски: «Мне нужно такси, чтобы доехать до аэропорта»', topic: 'infinitive_purpose', example: 'I need a taxi to get to the airport.', answers: ['I need a taxi to get to the airport', 'I need a cab to get to the airport', 'I need a taxi to go to the airport', 'I need a cab to go to the airport'], hints: [
        { extra: 'for', text: 'Цель — to + глагол: to get to the airport.' },
        { missing: 'a', text: 'Одно такси — a taxi.' },
      ] },
      { t: 'type', q: '— Why are you learning English? Ответь: «Чтобы найти работу получше»', topic: 'infinitive_purpose', example: 'To find a better job.', answers: ['to find a better job', 'to get a better job', 'I am learning English to find a better job', 'I am learning English to get a better job', 'so I can find a better job', 'so I can get a better job'], hints: [
        { extra: 'for', text: 'Цель — To + глагол: To find…' },
        { extra: 'good', text: '«Получше» — better.' },
      ] },
    ],
  },

  // ===================== 15. should / have to =====================
  {
    id: 'modals',
    level: 'A2',
    title: 'should / have to / don\'t have to',
    goal: 'Сможешь дать совет и сказать, что нужно, а что не обязательно',
    rule: 'modals',
    steps: [
      { t: 'tip', title: 'С to или без?', text: 'После **should, must, can** — глагол **без to**: You **should try** it. После **have** — **с to**: I **have to go**. А **don\'t have to** — это «не обязательно», а не «нельзя».' },
      { t: 'choice', q: '«Тебе стоит увидеть Бруклинский мост»', topic: 'modals', opts: [
        { en: 'You should see the Brooklyn Bridge.', ok: true },
        { en: 'You should to see the Brooklyn Bridge.', why: 'После should — без to.' },
        { en: 'You have see the Brooklyn Bridge.', why: 'Совет — should.' },
      ] },
      { t: 'choice', q: '«Мне надо работать завтра»', topic: 'modals', opts: [
        { en: 'I have to work tomorrow.', ok: true },
        { en: 'I must to work tomorrow.', why: 'После must — без to. И в США чаще говорят have to.' },
        { en: 'I have working tomorrow.', why: '«Надо» — have to + глагол: have to work.' },
      ] },
      { t: 'choice', q: '«Платить сейчас не обязательно»', topic: 'modals', opts: [
        { en: "You don't have to pay now.", ok: true },
        { en: "You mustn't pay now.", why: 'Mustn\'t = «нельзя». «Не обязательно» — don\'t have to.' },
        { en: "You haven't to pay now.", why: 'По-американски: don\'t have to.' },
      ] },
      { t: 'choice', q: '«Ей нужно платить за квартиру»', topic: 'modals', opts: [
        { en: 'She has to pay rent.', ok: true },
        { en: 'She have to pay rent.', why: 'С she — has to.' },
        { en: 'She has pay rent.', why: 'Нужно to: has to pay.' },
      ] },
      { t: 'choice', q: 'Доктор Ортис: «Вам не стоит есть так много сахара»', topic: 'modals', opts: [
        { en: "You shouldn't eat so much sugar.", ok: true },
        { en: "You don't should eat so much sugar.", why: 'Отрицание — shouldn\'t.' },
        { en: "You shouldn't eat so many sugar.", why: 'Sugar — неисчисляемое: much.' },
      ] },
      { t: 'build', q: 'Составь: «Тебе стоит попробовать пиццу у Сала»', topic: 'modals', answer: "You should try the pizza at Sal's", extra: ['to', 'tried', 'trying'], hints: [
        { extra: 'to', text: 'После should — без to.' },
        { extra: 'tried', text: 'После should — начальная форма: try.' },
        { extra: 'trying', text: 'После should — начальная форма: try.' },
      ] },
      { t: 'build', q: 'Составь: «Мне пора идти»', topic: 'modals', answer: 'I have to go now', extra: ['has', 'going', 'am'], hints: [
        { extra: 'has', text: 'С I — have to.' },
        { extra: 'going', text: 'После to — начальная форма: go.' },
        { extra: 'am', text: 'Am не нужен: I have to go.' },
      ] },
      { t: 'build', q: 'Составь: «Нам не обязательно спешить»', topic: 'modals', answer: "We don't have to hurry", extra: ["mustn't", 'hurrying', "haven't"], hints: [
        { extra: "mustn't", text: 'Mustn\'t = «нельзя». «Не обязательно» — don\'t have to.' },
        { extra: 'hurrying', text: 'После to — начальная форма: hurry.' },
        { extra: "haven't", text: 'По-американски: don\'t have to.' },
      ] },
      { t: 'choice', q: 'Разговорно: «Мне пора!»', topic: 'modals', opts: [
        { en: 'I gotta go!', ok: true },
        { en: 'I gotta to go!', why: 'Gotta уже включает to.' },
        { en: 'I got go!', why: 'Gotta = have got to: I gotta go.' },
      ] },
      { t: 'type', q: 'Напиши по-английски: «Тебе стоит отдохнуть»', topic: 'modals', example: 'You should rest.', answers: ['you should rest', 'you should get some rest', 'you should relax', 'you should take a break', 'you should have a rest'], hints: [
        { extra: 'to', text: 'После should — без to.' },
        { missing: 'should', text: 'Совет — should.' },
      ] },
      { t: 'type', q: 'Напиши по-английски: «Мне нужно позвонить маме»', topic: 'modals', example: 'I have to call my mom.', answers: ['I have to call my mom', 'I need to call my mom', 'I have to call mom', 'I need to call mom', 'I have got to call my mom', 'I gotta call my mom'], hints: [
        { missing: 'to', text: 'Have to + глагол: have to call.' },
        { extra: 'mum', text: 'По-американски — mom.' },
      ] },
      { t: 'type', q: 'Напиши по-английски: «Тебе не обязательно приходить»', topic: 'modals', example: "You don't have to come.", answers: ['you do not have to come', 'you do not need to come'], hints: [
        { extra: "mustn't", text: 'Mustn\'t = «нельзя». «Не обязательно» — don\'t have to.' },
        { extra: "haven't", text: 'По-американски: don\'t have to.' },
      ] },
      { t: 'type', q: 'Как скажут в США: «Здесь нельзя курить»', topic: 'modals', example: "You can't smoke here.", answers: ['you can not smoke here', 'you must not smoke here', "you mustn't smoke here", 'you are not allowed to smoke here', 'no smoking here'], hints: [
        { extra: 'do', text: '«Нельзя» — can\'t (или mustn\'t), а don\'t have to — «не обязательно».' },
        { extra: 'should', text: 'Should not — «не стоит». «Нельзя» — can\'t.' },
      ] },
    ],
  },

  // ===================== 16. Вежливые просьбы =====================
  {
    id: 'polite_requests',
    level: 'A2',
    title: 'Вежливые просьбы: Could you…? Would you mind…?',
    goal: 'Сможешь вежливо попросить о помощи и спросить разрешения',
    newRule: {
      id: 'polite_requests', level: 'A2', title: 'Вежливые просьбы: Could you…? Would you mind…? May I…?', topics: [],
      short: 'Попросить кого-то: Can you…? / Could you…? (вежливее). Спросить разрешения: Can I…? / May I…? После Would you mind — глагол с -ing.',
      text: `В Америке прямой приказ («Give me…») звучит грубо. Просьбу оформляют **вопросом**:

**Попросить человека что-то сделать:**
**Can you** help me? — нормально, по-дружески.
**Could you** help me, please? — вежливее (в магазине, с незнакомыми).
**Would you** hold the door, please? — тоже вежливо.
**Would you mind** + **-ing**? — очень вежливо: **Would you mind waiting** a minute?

**Спросить разрешения для себя:**
**Can I** sit here? — обычно.
**Could I** ask a question? — вежливее.
**May I** come in? — официально (у врача, в банке).

**Ответы:** Sure! / Of course! / No problem!
На **Would you mind…?** «без проблем» = **No, not at all!** (вопрос ведь «Вы не против?»). Ответ «Yes» здесь значит «да, я против»!

**Ловушки для русских:**
— после could / can / may / would глагол **без to**: Could you **help** me? (не to help)
— после would you mind — **-ing**: Would you mind **opening** the window?
— русское «Дайте…» звучит нормально, а английское «Give me…» — грубо. Говори **Can I get…?** / **Could I have…?**
— не забывай **please**: Could you help me, **please**?`,
      formula: 'Could you + глагол…? · Can / May I + глагол…? · Would you mind + -ing?',
      examples: [
        ['Could you help me with my bags, please?', 'Не могли бы вы помочь мне с сумками?'],
        ['Can I sit here?', 'Можно здесь сесть?'],
        ['May I see your ID, please?', 'Можно ваше удостоверение?'],
        ['Would you mind waiting a minute?', 'Вы не против подождать минутку?'],
        ['Could you say that again, please?', 'Не могли бы вы повторить?'],
      ],
      mistakes: [
        ['Could you to help me?', 'Could you help me? (после could — без to)'],
        ['Would you mind to wait?', 'Would you mind waiting? (после mind — -ing)'],
        ['Give me a coffee.', 'Can I get a coffee, please? (прямой приказ звучит грубо)'],
      ],
      quiz: [],
    },
    steps: [
      { t: 'tip', title: 'Would you mind…? — «нет» значит «да»', text: '**Would you mind** opening the window? — дословно «Вы **против** того, чтобы открыть окно?». Если согласен помочь, отвечай **No, not at all!** или **Sure, no problem.** А «Yes» значит «да, я против».' },
      { t: 'choice', q: '«Не могли бы вы мне помочь?»', topic: 'polite_requests', opts: [
        { en: 'Could you help me, please?', ok: true },
        { en: 'Could you to help me, please?', why: 'После could — без to.' },
        { en: 'You could help me?', why: 'В вопросе could стоит первым: Could you…?' },
      ] },
      { t: 'choice', q: 'В кафе у Джесс вежливо попроси кофе', topic: 'polite_requests', opts: [
        { en: 'Can I get a coffee, please?', ok: true },
        { en: 'Give me coffee.', why: 'Звучит как приказ. Вежливо: Can I get…, please?' },
        { en: 'I want coffee.', why: 'Слишком прямо. Лучше: Can I get… / I\'d like…' },
      ] },
      { t: 'choice', q: '«Вы не против подождать минутку?»', topic: 'polite_requests', opts: [
        { en: 'Would you mind waiting a minute?', ok: true },
        { en: 'Would you mind to wait a minute?', why: 'После mind — -ing: waiting.' },
        { en: 'Would you mind wait a minute?', why: 'После mind — -ing: waiting.' },
      ] },
      { t: 'choice', q: 'В кабинете доктора Ортиса: «Можно войти?»', topic: 'polite_requests', opts: [
        { en: 'May I come in?', ok: true },
        { en: 'May I to come in?', why: 'После may — без to.' },
        { en: 'May I coming in?', why: 'После may — начальная форма: come.' },
      ] },
      { t: 'choice', q: 'Маркус: «Would you mind if I open the window?» Ты не против. Ответь:', topic: 'polite_requests', opts: [
        { en: 'No, not at all.', ok: true },
        { en: 'Yes, I mind.', why: 'Это значит «да, я против»!' },
        { en: 'Yes, I would mind.', why: 'Это «да, я был бы против». Согласие — No, not at all.' },
      ] },
      { t: 'build', q: 'Составь: «Не могли бы вы говорить помедленнее?»', topic: 'polite_requests', answer: 'Could you speak more slowly?', extra: ['to', 'speaking', 'slow'], hints: [
        { extra: 'to', text: 'После could — без to.' },
        { extra: 'speaking', text: 'После could — начальная форма: speak.' },
        { extra: 'slow', text: 'Как говорить? — slowly.' },
      ] },
      { t: 'build', q: 'Составь: «Можно мне сесть рядом с тобой?»', topic: 'polite_requests', answer: 'Can I sit next to you?', extra: ['me', 'sitting', 'at'], hints: [
        { extra: 'me', text: 'Разрешение для себя — Can I…?' },
        { extra: 'sitting', text: 'После can — начальная форма: sit.' },
        { extra: 'at', text: '«Рядом с» — next to.' },
      ] },
      { t: 'build', q: 'Составь: «Вы не против открыть окно?»', topic: 'polite_requests', answer: 'Would you mind opening the window?', extra: ['to', 'open', 'opened'], hints: [
        { extra: 'to', text: 'После mind — -ing, без to.' },
        { extra: 'open', text: 'После mind — opening.' },
        { extra: 'opened', text: 'После mind — opening.' },
      ] },
      { t: 'choice', q: 'Прия в банке просит удостоверение. Как она скажет?', topic: 'polite_requests', opts: [
        { en: 'May I see your ID, please?', ok: true },
        { en: 'Show me ID.', why: 'Грубо и без your: May I see your ID, please?' },
        { en: 'May I to see your ID?', why: 'После may — без to.' },
      ] },
      { t: 'type', q: 'Напиши вежливо: «Не могли бы вы мне помочь?»', topic: 'polite_requests', example: 'Could you help me, please?', answers: ['could you help me', 'could you help me please', 'could you please help me', 'can you help me', 'can you help me please', 'can you please help me', 'would you help me', 'would you help me please', 'would you please help me', 'could you give me a hand', 'can you give me a hand'], hints: [
        { extra: 'to', text: 'После could — без to.' },
        { extra: 'helping', text: 'После could — начальная форма: help.' },
      ] },
      { t: 'type', q: 'В ресторане: «Можно нам счёт?»', topic: 'polite_requests', example: 'Can we get the check, please?', answers: ['can we get the check', 'can we get the check please', 'could we get the check', 'could we get the check please', 'can we have the check', 'can we have the check please', 'could we have the check please', 'can I get the check', 'can I get the check please', 'could I get the check please', 'could I have the check please', 'may we have the check please'], hints: [
        { extra: 'bill', text: 'В США счёт в ресторане — the check.' },
        { extra: 'give', text: 'Give me… звучит грубо. Вежливо: Can we get the check?' },
      ] },
      { t: 'type', q: 'Напиши: «Вы не против подождать?»', topic: 'polite_requests', example: 'Would you mind waiting?', answers: ['would you mind waiting', 'would you mind waiting a minute', 'would you mind waiting a moment', 'would you mind waiting a second', 'do you mind waiting'], hints: [
        { extra: 'wait', text: 'После mind — -ing: waiting.' },
        { extra: 'to', text: 'После mind — -ing, без to.' },
      ] },
      { t: 'type', q: 'Напиши: «Можно задать вопрос?»', topic: 'polite_requests', example: 'Could I ask a question?', answers: ['could I ask a question', 'can I ask a question', 'may I ask a question', 'could I ask you a question', 'can I ask you a question', 'may I ask you a question'], hints: [
        { extra: 'to', text: 'После could / can / may — без to.' },
        { extra: 'give', text: '«Задать вопрос» — ask a question.' },
      ] },
    ],
  },

  // ===================== 17. Предлоги движения =====================
  {
    id: 'prep_movement',
    level: 'A2',
    title: 'Куда? into, out of, across, through, along',
    goal: 'Сможешь объяснить дорогу: через парк, вдоль реки, вверх по лестнице',
    newRule: {
      id: 'prep_movement', level: 'A2', title: 'Предлоги движения: into, out of, across, through…', topics: [],
      short: 'into — внутрь, out of — наружу, across — через (на другую сторону), through — сквозь, along — вдоль, up / down — вверх / вниз.',
      text: `Предлоги места (in, on, at) отвечают на вопрос «где?». На вопрос **«куда? каким путём?»** — свои предлоги:

**to** — к, в (цель): Go **to** the station.
**into** — внутрь: She walked **into** the coffee shop.
**out of** — из, наружу: He ran **out of** the building.
**across** — через, на другую сторону (по поверхности): Walk **across** the street / the bridge.
**through** — сквозь, через что-то со всех сторон: Go **through** the park / the tunnel / the door.
**along** — вдоль: Walk **along** the river.
**past** — мимо: Go **past** the bank.
**up / down** — вверх / вниз: Go **up** the stairs. Walk **down** the street (= по улице).
**around** — по, вокруг: Let's walk **around** Brooklyn.
**over / under** — над / под: The bridge goes **over** the river.

**Ловушки для русских:**
— «через» — это и **across** (улица, мост), и **through** (парк, туннель).
— «в» при движении — **into**: Come **into** the room. (Но коротко: Come **in**!)
— машина и такси: get **in** / get **out of**. Автобус, метро, поезд: get **on** / get **off**.
— **home** без to: I'm going **home**. (не to home)
— «мимо» — **past**, не passed (passed — это глагол «прошёл»).`,
      formula: 'go into / out of / across / through / along / up / down + место',
      examples: [
        ['Walk across the Brooklyn Bridge.', 'Пройди по Бруклинскому мосту на другую сторону.'],
        ['Go through the park and turn left.', 'Пройди через парк и поверни налево.'],
        ['She walked into the coffee shop.', 'Она вошла в кофейню.'],
        ['Get out of the cab here.', 'Выходи из такси здесь.'],
        ["Let's walk along the river.", 'Давай погуляем вдоль реки.'],
      ],
      mistakes: [
        ['Walk through the street.', 'Walk across the street. (через улицу — across)'],
        ["I'm going to home.", "I'm going home. (home — без to)"],
        ['Get off the taxi.', 'Get out of the taxi. (машина и такси — get in / get out of)'],
      ],
      quiz: [],
    },
    steps: [
      { t: 'tip', title: '«Через» = across или through?', text: '**across** — по поверхности на другую сторону: across the street, across the bridge. **through** — сквозь что-то, что окружает со всех сторон: through the park, through the tunnel, through the door.' },
      { t: 'choice', q: '«Перейди через улицу»', topic: 'prep_movement', opts: [
        { en: 'Walk across the street.', ok: true },
        { en: 'Walk through the street.', why: 'Улицу переходят — across.' },
        { en: 'Walk over the street.', why: 'Over — «над». Через улицу — across.' },
      ] },
      { t: 'choice', q: '«Иди через парк»', topic: 'prep_movement', opts: [
        { en: 'Go through the park.', ok: true },
        { en: 'Go along the park.', why: 'Along — «вдоль». Через парк — through.' },
        { en: 'Go throw the park.', why: 'Throw — «бросать». Через — through.' },
      ] },
      { t: 'choice', q: '«Она вошла в кофейню»', topic: 'prep_movement', opts: [
        { en: 'She walked into the coffee shop.', ok: true },
        { en: 'She walked to inside the coffee shop.', why: 'Внутрь — одно слово: into.' },
        { en: 'She walked at the coffee shop.', why: 'At — «где». Движение внутрь — into.' },
      ] },
      { t: 'choice', q: 'Маркус: «Выходи из такси здесь»', topic: 'prep_movement', opts: [
        { en: 'Get out of the cab here.', ok: true },
        { en: 'Get off the cab here.', why: 'Из машины и такси — get out of. Get off — из автобуса, поезда.' },
        { en: 'Go out from the cab here.', why: 'Естественно: get out of the cab.' },
      ] },
      { t: 'choice', q: '«Я иду домой»', topic: 'prep_movement', opts: [
        { en: "I'm going home.", ok: true },
        { en: "I'm going to home.", why: 'Home — без to.' },
        { en: "I'm going at home.", why: 'Home при движении — без предлога.' },
      ] },
      { t: 'build', q: 'Составь: «Иди вдоль реки»', topic: 'prep_movement', answer: 'Walk along the river', extra: ['across', 'through', 'on'], hints: [
        { extra: 'across', text: 'Across — на другую сторону. Вдоль — along.' },
        { extra: 'through', text: 'Through — сквозь. Вдоль — along.' },
        { extra: 'on', text: 'Вдоль — along.' },
      ] },
      { t: 'build', q: 'Составь: «Поднимись по лестнице на второй этаж»', topic: 'prep_movement', answer: 'Go up the stairs to the second floor', extra: ['on', 'down', 'upstairs'], hints: [
        { extra: 'down', text: 'Down — вниз. Вверх — up.' },
        { extra: 'on', text: 'Куда — to the second floor.' },
        { extra: 'upstairs', text: 'Upstairs — «наверх» без stairs. Здесь — up the stairs.' },
      ] },
      { t: 'build', q: 'Составь: «Садись в метро на Таймс-сквер»', topic: 'prep_movement', answer: 'Get on the subway at Times Square', extra: ['in', 'into', 'off'], hints: [
        { extra: 'in', text: 'Метро, автобус, поезд — get on.' },
        { extra: 'into', text: 'Метро, автобус, поезд — get on.' },
        { extra: 'off', text: 'Get off — выходить. Садиться — get on.' },
      ] },
      { t: 'choice', q: 'Объясни дорогу: «Иди по улице, мимо банка»', topic: 'prep_movement', opts: [
        { en: 'Walk down the street and go past the bank.', ok: true },
        { en: 'Walk down the street and go passed the bank.', why: 'Passed — глагол «прошёл». Мимо — past.' },
        { en: 'Walk down the street and go near the bank.', why: 'Near — «рядом». Мимо — past.' },
      ] },
      { t: 'type', q: 'Напиши по-английски: «Перейди через мост»', topic: 'prep_movement', example: 'Walk across the bridge.', answers: ['walk across the bridge', 'go across the bridge', 'cross the bridge', 'walk over the bridge', 'go over the bridge'], hints: [
        { extra: 'through', text: 'По мосту на другую сторону — across.' },
      ] },
      { t: 'type', q: 'Напиши по-английски: «Выйди из машины!»', topic: 'prep_movement', example: 'Get out of the car!', answers: ['get out of the car', 'please get out of the car', 'get out of the car please'], hints: [
        { missing: 'of', text: 'Из машины — out of.' },
        { extra: 'off', text: 'Get off — из автобуса или поезда. Из машины — get out of.' },
      ] },
      { t: 'type', q: 'Напиши по-английски: «Мы проехали через туннель»', topic: 'prep_movement', example: 'We drove through the tunnel.', answers: ['we drove through the tunnel', 'we went through the tunnel', 'we passed through the tunnel'], hints: [
        { extra: 'across', text: 'Сквозь туннель — through.' },
        { extra: 'drive', text: 'Прошлое: drive → drove.' },
      ] },
      { t: 'type', q: 'Напиши по-английски: «Он спустился по лестнице»', topic: 'prep_movement', example: 'He went down the stairs.', answers: ['he went down the stairs', 'he walked down the stairs', 'he came down the stairs', 'he went downstairs', 'he walked downstairs', 'he came downstairs'], hints: [
        { extra: 'up', text: 'Up — вверх. Вниз — down.' },
        { extra: 'go', text: 'Прошлое: went.' },
      ] },
    ],
  },

  // ===================== 18. Фразовые глаголы =====================
  {
    id: 'phrasal',
    level: 'A2',
    title: 'Фразовые глаголы: get up, pick up, hang out',
    goal: 'Сможешь говорить как американцы: pick up, hang out, find out',
    rule: 'phrasal',
    steps: [
      { t: 'tip', title: 'Местоимение — в середину', text: 'С существительным частица может стоять где угодно: **pick up** Sam / **pick** Sam **up**. А с местоимением (me, him, it) — только в середине: **pick me up**, **try it on**, **turn it off**.' },
      { t: 'choice', q: '«Можешь забрать меня в 8?»', topic: 'phrasal', opts: [
        { en: 'Can you pick me up at 8?', ok: true },
        { en: 'Can you pick up me at 8?', why: 'Местоимение — в середину: pick me up.' },
        { en: 'Can you take up me at 8?', why: '«Забрать» — pick me up.' },
      ] },
      { t: 'choice', q: '«Давай потусим в выходные»', topic: 'phrasal', opts: [
        { en: "Let's hang out this weekend.", ok: true },
        { en: "Let's hang on this weekend.", why: 'Hang on = «подожди».' },
        { en: "Let's hang up this weekend.", why: 'Hang up — «повесить трубку».' },
      ] },
      { t: 'choice', q: '«Подожди, я иду!»', topic: 'phrasal', opts: [
        { en: "Hold on, I'm coming!", ok: true },
        { en: "Hold off, I'm coming!", why: 'Hold off — «отложить». Подожди — hold on.' },
        { en: "Hold, I'm coming!", why: 'Нужна частица: hold on.' },
      ] },
      { t: 'choice', q: 'В магазине: «Можно это примерить?»', topic: 'phrasal', opts: [
        { en: 'Can I try it on?', ok: true },
        { en: 'Can I try on it?', why: 'Местоимение — в середину: try it on.' },
        { en: 'Can I try it?', why: 'Try it — «попробовать». Примерить — try it on.' },
      ] },
      { t: 'choice', q: '«Выключи свет»', topic: 'phrasal', opts: [
        { en: 'Turn off the lights.', ok: true },
        { en: 'Turn on the lights.', why: 'Turn on — включить.' },
        { en: 'Close the light.', why: 'Свет выключают — turn off.' },
      ] },
      { t: 'build', q: 'Составь: «Я обычно встаю в семь»', topic: 'phrasal', answer: 'I usually get up at seven', extra: ['stand', 'in', 'gets'], hints: [
        { extra: 'stand', text: 'Stand up — встать на ноги (со стула). Утром встаём — get up.' },
        { extra: 'in', text: 'Время по часам — at.' },
        { extra: 'gets', text: 'С I — get.' },
      ] },
      { t: 'build', q: 'Составь: «Мне нужно выяснить, где он живёт»', topic: 'phrasal', answer: 'I need to find out where he lives', extra: ['does', 'live', 'search'], hints: [
        { extra: 'does', text: 'Это не вопрос, а часть фразы — порядок прямой: where he lives.' },
        { extra: 'live', text: 'He — lives.' },
        { extra: 'search', text: '«Выяснить» — find out.' },
      ] },
      { t: 'build', q: 'Составь: «Я ищу свой телефон»', topic: 'phrasal', answer: "I'm looking for my phone", extra: ['search', 'at', 'find'], hints: [
        { extra: 'at', text: 'Look at — «смотреть на». Искать — look for.' },
        { extra: 'search', text: '«Искать» — look for.' },
        { extra: 'find', text: 'Find — «найти». Искать — look for.' },
      ] },
      { t: 'choice', q: '«Он бросил курить»', topic: 'phrasal', opts: [
        { en: 'He gave up smoking.', ok: true },
        { en: 'He gave up to smoke.', why: 'После give up — -ing: smoking.' },
        { en: 'He gave out smoking.', why: 'Бросить — give up.' },
      ] },
      { t: 'type', q: 'Напиши по-английски: «Можешь меня забрать?»', topic: 'phrasal', example: 'Can you pick me up?', answers: ['can you pick me up', 'could you pick me up', 'can you pick me up please', 'could you pick me up please'], hints: [
        { missing: 'pick', text: '«Забрать» на машине — pick up.' },
        { missing: 'me', text: 'Местоимение — в середину: pick me up.' },
      ] },
      { t: 'type', q: 'Напиши по-английски: «Давай потусим!»', topic: 'phrasal', example: "Let's hang out!", answers: ['let us hang out', 'let us hang out sometime', 'want to hang out', 'do you want to hang out'], hints: [
        { extra: 'on', text: 'Hang on — «подожди». Потусить — hang out.' },
        { missing: 'out', text: 'Тусоваться — hang out.' },
      ] },
      { t: 'type', q: 'Напиши по-английски: «Успокойся!»', topic: 'phrasal', example: 'Calm down!', answers: ['calm down', 'relax', 'chill', 'chill out', 'take it easy'], hints: [
        { single: true, text: 'Попробуй фразовый глагол из двух слов: calm …' },
      ] },
      { t: 'type', q: 'Напиши по-английски: «Я проснулся в шесть»', topic: 'phrasal', example: 'I woke up at six.', answers: ['I woke up at six', 'I woke up at 6', "I woke up at six o'clock", "I woke up at 6 o'clock", 'I got up at six', 'I got up at 6'], hints: [
        { extra: 'waked', text: 'Wake — неправильный глагол: woke up.' },
        { extra: 'wake', text: 'Прошлое: woke up.' },
        { missing: 'up', text: 'Просыпаться — wake up.' },
      ] },
    ],
  },

  // ===================== 19. gonna / wanna / gotta =====================
  {
    id: 'contractions',
    level: 'A2',
    title: 'Разговорные сокращения: gonna, wanna, gotta',
    goal: 'Сможешь понимать быструю американскую речь и говорить неформально',
    rule: 'contractions',
    steps: [
      { t: 'tip', title: 'to уже внутри', text: '**gonna** = going to, **wanna** = want to, **gotta** = got to. Слово **to** уже спрятано внутри, поэтому «wanna to go» — ошибка. И помни: с друзьями — нормально, в резюме и письмах на работу — полные формы.' },
      { t: 'choice', q: 'Что значит «Gimme a sec»?', topic: 'contractions', opts: [
        { en: 'Дай мне секунду', ok: true },
        { en: 'Дай сигарету', why: 'Sec = second — секунда.' },
        { en: 'Я сейчас приду', why: 'Gimme = give me: «дай мне секунду».' },
      ] },
      { t: 'choice', q: 'Разговорно: «Хочешь перекусить?»', topic: 'contractions', opts: [
        { en: 'Wanna grab a bite?', ok: true },
        { en: 'Wanna to grab a bite?', why: 'Wanna уже включает to.' },
        { en: 'Wanna grabbing a bite?', why: 'После wanna — начальная форма: grab.' },
      ] },
      { t: 'choice', q: 'Неформально: «Мне надо идти»', topic: 'contractions', opts: [
        { en: 'I gotta go.', ok: true },
        { en: 'I gotta to go.', why: 'Gotta уже включает to.' },
        { en: "I'm gotta go.", why: 'Gotta = have got to, am не нужен.' },
      ] },
      { t: 'choice', q: 'Очень разговорно: «Не знаю»', topic: 'contractions', opts: [
        { en: 'I dunno.', ok: true },
        { en: 'I donna.', why: 'Правильно: dunno = don\'t know.' },
        { en: "I don't knowing.", why: 'Просто: I don\'t know / I dunno.' },
      ] },
      { t: 'choice', q: 'Где лучше НЕ писать gonna?', topic: 'contractions', opts: [
        { en: 'В резюме и письме работодателю', ok: true },
        { en: 'В сообщении Сэму', why: 'С друзьями gonna — нормально.' },
        { en: 'В разговоре с Девом', why: 'В устной речи gonna звучит естественно.' },
      ] },
      { t: 'build', q: 'Составь разговорно: «Я тебе позвоню» (с gonna)', topic: 'contractions', answer: "I'm gonna call you", extra: ['to', 'calling', 'will'], hints: [
        { extra: 'calling', text: 'После gonna — начальная форма: call.' },
        { extra: 'will', text: 'С gonna will не нужен.' },
      ] },
      { t: 'build', q: 'Составь разговорно: «Хочешь потусить?»', topic: 'contractions', answer: 'Wanna hang out?', extra: ['to', 'hanging', 'outside'], hints: [
        { extra: 'hanging', text: 'После wanna — начальная форма: hang.' },
        { extra: 'outside', text: 'Тусоваться — hang out.' },
      ] },
      { t: 'build', q: 'Составь разговорно: «Мне надо работать»', topic: 'contractions', answer: 'I gotta work', extra: ['to', 'working', 'am'], hints: [
        { extra: 'to', text: 'Gotta уже включает to.' },
        { extra: 'working', text: 'После gotta — начальная форма: work.' },
        { extra: 'am', text: 'Am не нужен: I gotta work.' },
      ] },
      { t: 'choice', q: 'Тони кричит: «Whaddaya want?» Что это значит?', topic: 'contractions', opts: [
        { en: 'Что ты хочешь?', ok: true },
        { en: 'Куда ты идёшь?', why: 'Whaddaya = What do you: «What do you want?»' },
        { en: 'Чего ты ждёшь?', why: 'Want — «хотеть». Whaddaya want = What do you want?' },
      ] },
      { t: 'type', q: 'Напиши полностью, без сокращений: «I wanna go»', topic: 'contractions', example: 'I want to go.', answers: ['I want to go'], hints: [
        { missing: 'want', text: 'Wanna = want to.' },
      ] },
      { t: 'type', q: 'Напиши полностью, без сокращений: «I gotta go»', topic: 'contractions', example: 'I have to go.', answers: ['I have to go', 'I have got to go', 'I got to go'], hints: [
        { missing: 'to', text: 'Gotta = got to / have to.' },
      ] },
      { t: 'type', q: 'Спроси Дева разговорно: «Хочешь кофе?» (с wanna)', topic: 'contractions', example: 'Wanna grab a coffee?', answers: ['wanna grab a coffee', 'wanna get a coffee', 'wanna grab some coffee', 'wanna get some coffee', 'do you wanna grab a coffee', 'do you wanna get a coffee', 'want a coffee', 'want some coffee', 'do you want a coffee', 'do you want some coffee'], hints: [
        { missing: 'want', text: 'Используй wanna (= want to): Wanna grab a coffee?' },
      ] },
      { t: 'type', q: 'Напиши полностью: «I dunno, it\'s kinda late»', topic: 'contractions', example: "I don't know, it's kind of late.", answers: ['I do not know it is kind of late', 'I do not know it is sort of late', 'I do not know it is a little late', 'I do not know it is a bit late'], hints: [
        { missing: 'kind', text: 'Kinda = kind of.' },
        { missing: 'know', text: 'Dunno = don\'t know.' },
      ] },
    ],
  },

  // ===================== 20. Переспросить и уточнить =====================
  {
    id: 'object_questions',
    level: 'A2',
    title: 'Как переспросить и уточнить',
    goal: 'Сможешь переспросить, попросить повторить и узнать значение слова',
    rule: 'object_questions',
    steps: [
      { t: 'tip', title: 'Переспрашивать — нормально', text: 'Американцы привыкли к акцентам. Не делай вид, что понял: скажи **Sorry, could you say that again?** или **What does … mean?** Только не «What means…?» — нужен **does**.' },
      { t: 'choice', q: '«Что значит „no worries“?»', topic: 'object_questions', opts: [
        { en: 'What does "no worries" mean?', ok: true },
        { en: 'What means "no worries"?', why: 'Нужен does: What does … mean?' },
        { en: 'What is mean "no worries"?', why: 'Правильно: What does … mean?' },
      ] },
      { t: 'choice', q: 'Маркус говорит быстро. Попроси: «Не могли бы вы говорить медленнее?»', topic: 'object_questions', opts: [
        { en: 'Could you speak a little slower, please?', ok: true },
        { en: 'Speak slower!', why: 'Звучит как приказ. Вежливо: Could you…, please?' },
        { en: 'Could you speak more slow, please?', why: 'Или slower, или more slowly.' },
      ] },
      { t: 'choice', q: 'Ты не расслышал Тони. Как переспросить?', topic: 'object_questions', opts: [
        { en: 'Sorry, what was that?', ok: true },
        { en: 'What?!', why: 'Звучит резко. Вежливо: Sorry? / Sorry, what was that?' },
        { en: 'Repeat!', why: 'Приказ — грубо. Лучше: Could you say that again?' },
      ] },
      { t: 'choice', q: '«Как по-английски „сдача“?»', topic: 'object_questions', opts: [
        { en: 'How do you say "сдача" in English?', ok: true },
        { en: 'How to say "сдача" in English?', why: 'В вопросе нужен do you: How do you say…?' },
        { en: 'How is "сдача" on English?', why: '«По-английски» — in English.' },
      ] },
      { t: 'choice', q: 'Уточни у миссис Родригес: «Вы имеете в виду зелёную дверь?»', topic: 'object_questions', opts: [
        { en: 'Do you mean the green door?', ok: true },
        { en: 'Do you mean about the green door?', why: 'Mean без about: Do you mean the green door?' },
        { en: 'You mean green door?', why: 'Нужен артикль the: the green door.' },
      ] },
      { t: 'build', q: 'Составь: «Что значит это слово?»', topic: 'object_questions', answer: 'What does this word mean?', extra: ['means', 'is', 'do'], hints: [
        { extra: 'means', text: 'После does — mean без -s.' },
        { extra: 'is', text: 'Вопрос через does: What does … mean?' },
        { extra: 'do', text: 'Word — одно слово: does.' },
      ] },
      { t: 'build', q: 'Составь: «Не могли бы вы это записать?»', topic: 'object_questions', answer: 'Could you write it down?', extra: ['to', 'writing', 'up'], hints: [
        { extra: 'to', text: 'После could — без to.' },
        { extra: 'writing', text: 'После could — начальная форма: write.' },
        { extra: 'up', text: 'Записать — write it down.' },
      ] },
      { t: 'build', q: 'Составь: «Можете повторить ещё раз?»', topic: 'object_questions', answer: 'Could you say that again?', extra: ['to', 'tell', 'one'], hints: [
        { extra: 'to', text: 'После could — без to.' },
        { extra: 'tell', text: 'Повторить — say that again (tell требует «кому»).' },
        { extra: 'one', text: '«Ещё раз» — again.' },
      ] },
      { t: 'choice', q: 'Скажи, что ты ещё учишь английский', topic: 'object_questions', opts: [
        { en: "I'm still learning English.", ok: true },
        { en: 'I still learn English.', why: 'Это процесс сейчас — I\'m still learning.' },
        { en: "I'm still learn English.", why: 'После am — learning.' },
      ] },
      { t: 'type', q: 'Напиши по-английски: «Простите, можете повторить?»', topic: 'object_questions', example: 'Sorry, could you say that again?', answers: ['sorry could you say that again', 'sorry can you say that again', 'sorry could you repeat that', 'sorry can you repeat that', 'sorry could you say that again please', 'sorry could you repeat that please', 'could you say that again', 'can you say that again', 'could you repeat that', 'can you repeat that', 'could you say that again please', 'could you repeat that please', 'excuse me could you say that again', 'excuse me could you repeat that', 'sorry come again'], hints: [
        { extra: 'to', text: 'После could — без to.' },
        { extra: 'tell', text: 'Повторить — say that again или repeat that.' },
      ] },
      { t: 'type', q: 'Напиши по-английски: «Что значит „hang out“?»', topic: 'object_questions', example: 'What does "hang out" mean?', answers: ['what does hang out mean', "what does 'hang out' mean"], hints: [
        { missing: 'does', text: 'Нужен does: What does … mean?' },
        { extra: 'means', text: 'После does — mean без -s.' },
      ] },
      { t: 'type', q: 'Напиши по-английски: «Как это называется по-английски?»', topic: 'object_questions', example: 'What do you call this in English?', answers: ['what do you call this in English', 'what is this called in English', 'how do you say this in English', 'what is this in English', 'what is it called in English'], hints: [
        { missing: 'do', text: 'Вопрос через do: What do you call this…?' },
        { extra: 'on', text: '«По-английски» — in English.' },
      ] },
      { t: 'type', q: 'Напиши по-английски: «Я правильно сказал?»', topic: 'object_questions', example: 'Did I say it right?', answers: ['did I say it right', 'did I say it correctly', 'did I say that right', 'did I say that correctly', 'is that right', 'was that right', 'is that correct', 'was that correct'], hints: [
        { missing: 'did', text: 'Вопрос в прошлом — Did I say…?' },
        { extra: 'said', text: 'После did — начальная форма: say.' },
      ] },
    ],
  },

  // ===================== 21. American English =====================
  {
    id: 'american',
    level: 'A2',
    title: 'American vs British English',
    goal: 'Сможешь говорить по-американски: apartment, subway, check, line',
    rule: 'american',
    steps: [
      { t: 'tip', title: 'В Нью-Йорке — по-американски', text: 'В школе часто учат британский. В Нью-Йорке скажут: **apartment** (не flat), **subway** (не underground), **check** (не bill), **line** (не queue), **vacation** (не holiday). Пишут **color, favorite, center**.' },
      { t: 'choice', q: 'Как попросить счёт в американском ресторане?', topic: 'american', opts: [
        { en: 'Can we get the check, please?', ok: true },
        { en: 'Can we get the bill, please?', why: 'Поймут, но в США говорят the check.' },
        { en: 'Can we get the count, please?', why: 'Count — «считать». Счёт — the check.' },
      ] },
      { t: 'choice', q: '«Я живу в квартире в Бруклине»', topic: 'american', opts: [
        { en: 'I live in an apartment in Brooklyn.', ok: true },
        { en: 'I live in a flat in Brooklyn.', why: 'Flat — британское. В США — apartment.' },
        { en: 'I live in apartment in Brooklyn.', why: 'Нужен артикль: an apartment.' },
      ] },
      { t: 'choice', q: '«Очередь очень длинная»', topic: 'american', opts: [
        { en: 'The line is really long.', ok: true },
        { en: 'The queue is really long.', why: 'Queue — британское. В США — line.' },
        { en: 'The turn is really long.', why: 'Turn — «чей ход». Очередь людей — line.' },
      ] },
      { t: 'choice', q: '«Давай поедем на метро»', topic: 'american', opts: [
        { en: "Let's take the subway.", ok: true },
        { en: "Let's take the underground.", why: 'Underground — лондонское. В Нью-Йорке — subway.' },
        { en: "Let's take the tube.", why: 'Tube — лондонское метро. В Нью-Йорке — subway.' },
      ] },
      { t: 'choice', q: 'Как американец назовёт лифт?', topic: 'american', opts: [
        { en: 'elevator', ok: true },
        { en: 'lift', why: 'Lift — британское. В США — elevator.' },
        { en: 'raiser', why: 'Такого слова нет. Лифт — elevator.' },
      ] },
      { t: 'build', q: 'Спроси в кафе: «Где здесь туалет?»', topic: 'american', answer: 'Where is the restroom?', extra: ['toilet', 'are', 'WC'], hints: [
        { extra: 'toilet', text: 'В США в кафе вежливо — restroom (или bathroom). Toilet — это сам унитаз.' },
        { extra: 'are', text: 'Restroom — один: is.' },
        { extra: 'wc', text: 'WC в США не говорят. Скажи restroom.' },
      ] },
      { t: 'build', q: 'Составь: «Мой любимый цвет — синий»', topic: 'american', answer: 'My favorite color is blue', extra: ['favourite', 'colour', 'the'], hints: [
        { extra: 'favourite', text: 'Американское написание — favorite.' },
        { extra: 'colour', text: 'В США пишут color.' },
        { extra: 'the', text: 'После my артикль не нужен.' },
      ] },
      { t: 'build', q: 'Составь: «На следующей неделе я в отпуске»', topic: 'american', answer: "I'm on vacation next week", extra: ['holiday', 'in', 'the'], hints: [
        { extra: 'holiday', text: 'В США отпуск — vacation.' },
        { extra: 'in', text: '«В отпуске» — on vacation.' },
        { extra: 'the', text: 'Next week — без the.' },
      ] },
      { t: 'choice', q: 'Как в США называют картошку фри?', topic: 'american', opts: [
        { en: 'fries', ok: true },
        { en: 'chips', why: 'В США chips — чипсы из пакета.' },
        { en: 'crisps', why: 'Crisps — британские «чипсы».' },
      ] },
      { t: 'type', q: 'Напиши по-английски: «Мы живём на первом этаже»', topic: 'american', example: 'We live on the first floor.', answers: ['we live on the first floor', 'our apartment is on the first floor'], hints: [
        { extra: 'ground', text: 'В США первый этаж — first floor.' },
        { extra: 'in', text: 'На этаже — on.' },
      ] },
      { t: 'type', q: 'Напиши по-английски: «Я вынесу мусор»', topic: 'american', example: "I'll take out the trash.", answers: ['I will take out the trash', 'I will take the trash out', 'I will throw out the trash', 'I will throw the trash out', 'I will take out the garbage', 'I will take the garbage out'], hints: [
        { extra: 'rubbish', text: 'В США мусор — trash или garbage.' },
        { missing: 'out', text: 'Вынести — take out.' },
      ] },
      { t: 'type', q: 'Напиши по-английски: «Пойдём в кино»', topic: 'american', example: "Let's go to the movies.", answers: ['let us go to the movies', 'let us go see a movie', 'let us see a movie', 'let us watch a movie', 'let us go to the movie theater'], hints: [
        { extra: 'cinema', text: 'Американцы говорят go to the movies.' },
        { extra: 'film', text: 'В США чаще movie.' },
      ] },
      { t: 'type', q: 'Напиши по-английски: «Где ближайшая станция метро?»', topic: 'american', example: "Where's the nearest subway station?", answers: ['where is the nearest subway station', 'where is the closest subway station', 'where is the nearest subway', 'where is the closest subway', 'where is the subway station'], hints: [
        { extra: 'underground', text: 'В Нью-Йорке — subway.' },
        { extra: 'metro', text: 'В Нью-Йорке говорят subway.' },
      ] },
    ],
  },
];
