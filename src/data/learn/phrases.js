// Устойчивые фразы американского английского — готовые «кирпичики» для разговора.
// Формат: фраза | перевод | уровень (1 = A1, 2 = A2, 3 = B1) | пояснение (необязательно)

export const PHRASE_TOPICS = [
  {
    id: 'survival', name: 'Выручалочки: если не понял', icon: '🆘', phrases: `
Sorry?|Простите? (не расслышал)|1|Самый мягкий способ переспросить
Could you say that again?|Можете повторить?|1
Could you speak a little slower, please?|Можете говорить чуть медленнее?|1
What does that mean?|Что это значит?|1
What does "chill" mean?|Что значит «chill»?|1|Вместо chill — любое слово
How do you say "вилка" in English?|Как по-английски «вилка»?|1
How do you spell that?|Как это пишется?|1
I don't understand.|Я не понимаю.|1
I'm not sure I understand.|Не уверен, что понял.|2
I'm still learning English.|Я ещё учу английский.|1
My English isn't perfect.|Мой английский не идеален.|2
Could you write it down?|Можете записать?|2
Can you help me, please?|Можете мне помочь?|1
Excuse me, do you speak Russian?|Простите, вы говорите по-русски?|1
Just a second.|Секунду.|1
Let me think.|Дайте подумать.|2
Did I say it right?|Я правильно сказал?|2
You mean…?|Вы имеете в виду…?|2
I got it.|Понял.|1
Gotcha.|Понял (разг.)|2
`,
  },
  {
    id: 'greet', name: 'Приветствия и прощания', icon: '👋', phrases: `
Hi! How are you?|Привет! Как дела?|1
Hey! How's it going?|Привет! Как оно?|1|Это приветствие, а не настоящий вопрос
Good, thanks! And you?|Хорошо, спасибо! А ты?|1
Pretty good! You?|Неплохо! А ты?|1
Not bad.|Неплохо.|1
What's up?|Как дела? Что нового?|1|Отвечают: Not much!
Not much, you?|Да ничего особенного, а ты?|1
Long time no see!|Сто лет не виделись!|2
Nice to meet you!|Приятно познакомиться!|1
Nice to meet you too!|Мне тоже приятно!|1
Good morning!|Доброе утро!|1
Have a good day!|Хорошего дня!|1
Have a good one!|Хорошего дня! (US)|1|Очень американское
You too!|И вам того же!|1
See you later!|Увидимся!|1
See you tomorrow!|До завтра!|1
Take care!|Береги себя!|1
Bye for now!|Пока!|2
Talk to you later!|Поговорим позже!|2
Good night!|Спокойной ночи!|1|Только перед сном или поздно вечером
`,
  },
  {
    id: 'polite', name: 'Вежливость', icon: '🙏', phrases: `
Please.|Пожалуйста (в просьбе).|1
Thank you so much!|Большое спасибо!|1
Thanks a lot!|Огромное спасибо!|1
I really appreciate it.|Я очень признателен.|2
You're welcome!|Пожалуйста! (в ответ на спасибо)|1
No problem!|Без проблем!|1
No worries!|Не за что! Ничего страшного!|1
My pleasure!|С удовольствием!|2
Anytime!|Обращайся!|2
Excuse me.|Извините (обратиться / пройти).|1
Sorry about that!|Извините за это!|1
My bad!|Моя вина! (разг.)|2
That's OK.|Ничего страшного.|1
Don't worry about it.|Не переживай об этом.|1
After you!|Только после вас!|2
Bless you!|Будь здоров! (когда чихнули)|1
Congratulations!|Поздравляю!|1
Good luck!|Удачи!|1
Feel better!|Выздоравливай!|2
Enjoy!|Наслаждайся! Приятного!|1
`,
  },
  {
    id: 'talk', name: 'Small talk', icon: '💬', phrases: `
Where are you from?|Откуда ты?|1
I'm from Russia.|Я из России.|1
What do you do?|Кем ты работаешь?|1|Не «что ты делаешь»!
I work as a barista.|Я работаю бариста.|1
How long have you been here?|Как долго ты здесь?|3
I just moved here.|Я только что переехал сюда.|2
It's my first time in New York.|Я первый раз в Нью-Йорке.|1
Do you live around here?|Ты живёшь поблизости?|2
Nice weather today, huh?|Хорошая сегодня погода, да?|2
It's so hot today!|Сегодня так жарко!|1
What are you up to?|Чем занимаешься?|2
Any plans for the weekend?|Есть планы на выходные?|2
How was your weekend?|Как прошли выходные?|2
How was your day?|Как прошёл день?|1
What do you do for fun?|Чем любишь заниматься?|2
I love it here!|Мне здесь очень нравится!|1
Me too!|Я тоже!|1
Me neither.|Я тоже нет.|2
Same here!|У меня так же!|2
That's cool!|Круто!|1
`,
  },
  {
    id: 'react', name: 'Реакции', icon: '😮', phrases: `
That's awesome!|Это потрясающе!|1
That's great!|Отлично!|1
Cool!|Круто!|1
No way!|Да ладно! Не может быть!|1
Really?|Правда?|1
For real?|Серьёзно?|2
Are you serious?|Ты серьёзно?|2
That's crazy!|Это безумие!|1
Oh my God! / Oh my gosh!|Боже мой!|1
I can't believe it!|Не могу поверить!|2
That makes sense.|Логично. Понятно.|2
Fair enough.|Справедливо.|3
Sounds good!|Звучит хорошо! Договорились!|1
Sounds great!|Отлично!|1
I'm down!|Я за! Я в деле!|2|Сленг
Exactly!|Именно!|2
Totally!|Абсолютно! Точно!|2
I guess so.|Наверное, да.|2
I don't think so.|Не думаю.|2
That's too bad.|Очень жаль.|2
Oh no!|О нет!|1
Good for you!|Молодец! Рад за тебя!|2
Whatever.|Без разницы.|2|Может звучать грубо
`,
  },
  {
    id: 'cafe', name: 'Кафе и ресторан', icon: '☕', phrases: `
Can I get a coffee, please?|Можно кофе?|1
I'd like a medium latte, please.|Средний латте, пожалуйста.|1
For here or to go?|Здесь или с собой?|1
To go, please.|С собой, пожалуйста.|1
For here, please.|Здесь, пожалуйста.|1
Can I see the menu?|Можно меню?|1
What do you recommend?|Что посоветуете?|2
I'll have the burger.|Я возьму бургер.|2
Can I get it without onions?|Можно без лука?|2
Is this spicy?|Это острое?|2
I'm allergic to nuts.|У меня аллергия на орехи.|2
A table for two, please.|Столик на двоих.|1
Can we get the check, please?|Можно счёт?|1|В США — check, не bill
Can I pay by card?|Можно картой?|1
Keep the change.|Сдачи не надо.|2
Can I get a refill?|Можно ещё (налить)?|2|В США часто бесплатно
Can I get a box for this?|Можно контейнер (забрать с собой)?|2
It was delicious!|Было очень вкусно!|1
Everything's great, thanks.|Всё отлично, спасибо.|2|Ответ официанту
I'm just looking.|Я просто смотрю.|1|Чаще в магазине
`,
  },
  {
    id: 'shop', name: 'Магазин и деньги', icon: '🛍️', phrases: `
How much is this?|Сколько это стоит?|1
How much are these?|Сколько стоят эти?|1
Do you have this in a medium?|Есть такое размера M?|2
Can I try it on?|Можно примерить?|2
Where's the fitting room?|Где примерочная?|2
It's too big.|Слишком большое.|1
It's too expensive.|Слишком дорого.|1
Is it on sale?|Это со скидкой?|2
I'll take it.|Я возьму.|1
Do you take cash?|Принимаете наличные?|2
Can I get a receipt?|Можно чек?|2
I'd like to return this.|Я хочу это вернуть.|2
Paper or plastic?|Бумажный или пластиковый пакет?|2
Do you need a bag?|Вам нужен пакет?|1
Cash or card?|Наличные или карта?|1
Where can I find the milk?|Где найти молоко?|1
Are you open on Sunday?|Вы работаете в воскресенье?|2
What time do you close?|Во сколько закрываетесь?|1
`,
  },
  {
    id: 'directions', name: 'Дорога и транспорт', icon: '🧭', phrases: `
Excuse me, where is the subway?|Простите, где метро?|1
How do I get to Times Square?|Как добраться до Таймс-сквер?|1
Is it far from here?|Это далеко отсюда?|1
It's two blocks away.|Это в двух кварталах.|2
Go straight.|Идите прямо.|1
Turn left at the corner.|Поверните налево на углу.|1
It's on your right.|Это справа от вас.|1
It's across from the bank.|Это напротив банка.|2
You can't miss it.|Вы не пропустите.|2
I'm lost.|Я заблудился.|1
Which train goes to Brooklyn?|Какой поезд идёт в Бруклин?|2
Is this the right train?|Это правильный поезд?|2
Where do I get off?|Где мне выходить?|2
Is this seat taken?|Это место занято?|2
Can you call me a cab?|Можете вызвать такси?|2
Stand clear of the closing doors.|Отойдите от закрывающихся дверей.|2|Объявление в метро NYC
This is my stop.|Это моя остановка.|2
I'm on my way!|Я уже в пути!|1
I'm running late.|Я опаздываю.|2
I'll be there in ten minutes.|Буду через десять минут.|1
`,
  },
  {
    id: 'phone', name: 'Телефон и переписка', icon: '📱', phrases: `
Hello, this is Anna.|Алло, это Анна.|1
Can I speak to Mike?|Можно Майка?|1
Hold on a second.|Подождите секунду.|2
I'll call you back.|Я перезвоню.|1
Can you hear me?|Ты меня слышишь?|1
You're breaking up.|Связь прерывается.|2
Text me!|Напиши мне!|1
I'll text you later.|Напишу позже.|1
What's your number?|Какой у тебя номер?|1
lol|смеюсь (laughing out loud)|1|Только в переписке
brb|скоро вернусь (be right back)|2
idk|не знаю (I don't know)|2
omg|боже мой|1
btw|кстати (by the way)|2
np|без проблем (no problem)|2
ttyl|поговорим позже (talk to you later)|2
`,
  },
  {
    id: 'work', name: 'Работа и учёба', icon: '💼', phrases: `
I'm looking for a job.|Я ищу работу.|1
Are you hiring?|Вы нанимаете?|2
I have experience as a barista.|У меня есть опыт бариста.|2
I can work on weekends.|Я могу работать по выходным.|1
When can you start?|Когда можете начать?|2
I can start tomorrow.|Могу начать завтра.|1
What are the hours?|Какой график?|2
I'm off today.|У меня сегодня выходной.|2
I'm on my break.|У меня перерыв.|2
Let's get started.|Давайте начнём.|2
Good job!|Молодец! Отличная работа!|1
I'll do my best.|Я постараюсь изо всех сил.|2
Let me know.|Дай знать.|2
I'll let you know.|Я дам знать.|2
Can I ask you a question?|Можно задать вопрос?|1
I have a question.|У меня вопрос.|1
I'm done!|Я закончил!|1
`,
  },
  {
    id: 'plans', name: 'Планы и встречи', icon: '📅', phrases: `
Are you free tonight?|Ты свободен сегодня вечером?|1
Wanna hang out?|Хочешь потусить?|2
Let's grab a coffee!|Давай выпьем кофе!|1
Let's grab a bite.|Давай перекусим.|2
How about Friday?|Как насчёт пятницы?|2
What time works for you?|Во сколько тебе удобно?|2
That works for me.|Мне подходит.|2
Let's meet at 7.|Давай встретимся в 7.|1
See you there!|Увидимся там!|1
I can't make it.|Я не смогу прийти.|2
Maybe next time.|Может, в следующий раз.|2
Rain check?|Перенесём? (разг.)|3|Вежливо отложить встречу
I'm in!|Я в деле!|2
Count me in!|Я с вами!|2
Count me out.|Без меня.|2
`,
  },
  {
    id: 'feel', name: 'Как ты себя чувствуешь', icon: '🙂', phrases: `
I'm tired.|Я устал.|1
I'm hungry.|Я голоден.|1
I'm starving!|Умираю с голоду!|2
I'm full.|Я сыт.|1
I'm sick.|Я болею.|1
I don't feel well.|Я плохо себя чувствую.|2
I have a headache.|У меня болит голова.|2
I'm so excited!|Я в восторге!|1
I'm so bored.|Мне так скучно.|1
I'm stressed out.|Я в стрессе.|2
I'm nervous.|Я нервничаю.|2
I'm happy for you!|Я рад за тебя!|2
I miss you.|Я скучаю по тебе.|1
I'm fine, don't worry.|Я в порядке, не волнуйся.|1
I'm freezing!|Я замерзаю!|2
It's freezing outside.|На улице мороз.|2
`,
  },
  {
    id: 'opinion', name: 'Мнение и спор', icon: '🤔', phrases: `
I think so.|Думаю, да.|1
I don't think so.|Не думаю.|1
In my opinion…|По-моему…|2
I agree.|Я согласен.|1
I don't agree.|Я не согласен.|2
You're right.|Ты прав.|1
I'm not sure.|Я не уверен.|1
It depends.|Зависит от ситуации.|2
Good point!|Хорошее замечание!|2
I see what you mean.|Понимаю, что ты имеешь в виду.|3
To be honest…|Честно говоря…|2
Actually…|Вообще-то…|2
Either way.|Так или иначе.|3
It's up to you.|Решать тебе.|2
I don't mind.|Мне всё равно (не против).|2
`,
  },
  {
    id: 'idioms', name: 'Американские идиомы', icon: '🗽', phrases: `
It's a piece of cake.|Проще простого.|2
Break a leg!|Ни пуха ни пера!|3
I'm all ears.|Я весь внимание.|3
It's not a big deal.|Ничего страшного.|2
No big deal.|Пустяки.|2
Hang in there!|Держись!|3
Take it easy!|Не напрягайся! / Пока!|2
It's on me.|Я угощаю.|2
Let's call it a day.|На сегодня хватит.|3
Better late than never.|Лучше поздно, чем никогда.|2
Time flies!|Время летит!|2
I'm on it!|Уже занимаюсь!|2
You bet!|Ещё бы! Конечно!|3
Way to go!|Так держать!|3
Cut it out!|Прекрати!|3
Same old, same old.|Всё по-старому.|3
`,
  },
];
