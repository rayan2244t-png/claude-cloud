// 1500 самых важных слов A1–A2, часть 2: глаголы, прилагательные, наречия, служебные слова, числа.
// Формат строки: английское | перевод | уровень (1 = A1, 2 = A2). Для неправильных глаголов в скобках — прошедшее время.

export const OTHER_TOPICS = [
  {
    id: 'verbs1', name: 'Глаголы: самые главные', icon: '⚡', words: `
be (was/were)|быть|1
have (had)|иметь|1
do (did)|делать|1
go (went)|идти, ехать|1
come (came)|приходить|1
get (got)|получать; становиться|1
make (made)|делать, создавать|1
take (took)|брать|1
give (gave)|давать|1
say (said)|сказать|1
tell (told)|рассказать, сказать кому-то|1
know (knew)|знать|1
think (thought)|думать|1
see (saw)|видеть|1
look|смотреть|1
watch|смотреть (следить)|1
hear (heard)|слышать|1
listen|слушать|1
want|хотеть|1
need|нуждаться|1
like|нравиться|1
love|любить|1
hate|ненавидеть|1
feel (felt)|чувствовать|1
find (found)|находить|1
use|использовать|1
work|работать|1
try|пробовать|1
call|звонить; называть|1
ask|спрашивать; просить|1
answer|отвечать|1
help|помогать|1
start|начинать|1
begin (began)|начинать|1
finish|заканчивать|1
stop|останавливаться|1
open|открывать|1
close|закрывать|1
live|жить|1
stay|оставаться|1
leave (left)|уходить; оставлять|1
put (put)|класть|1
keep (kept)|хранить; продолжать|2
let (let)|позволять|1
show|показывать|1
mean (meant)|значить; иметь в виду|1
understand (understood)|понимать|1
remember|помнить|1
forget (forgot)|забывать|1
learn|учить(ся)|1
study|учиться, изучать|1
teach (taught)|учить (кого-то)|1
read (read)|читать|1
write (wrote)|писать|1
speak (spoke)|говорить (на языке)|1
talk|разговаривать|1
`,
  },
  {
    id: 'verbs2', name: 'Глаголы: каждый день', icon: '☕', words: `
wake up (woke up)|просыпаться|1
get up|вставать|1
sleep (slept)|спать|1
eat (ate)|есть|1
drink (drank)|пить|1
cook|готовить|1
wash|мыть|1
clean|убирать|1
shower|принимать душ|2
brush|чистить (зубы)|2
dress|одеваться|2
wear (wore)|носить (одежду)|1
walk|идти пешком, гулять|1
run (ran)|бежать|1
sit (sat)|сидеть|1
stand (stood)|стоять|1
wait|ждать|1
buy (bought)|покупать|1
pay (paid)|платить|1
sell (sold)|продавать|1
cost (cost)|стоить|1
spend (spent)|тратить; проводить (время)|2
order|заказывать|1
shop|ходить по магазинам|1
drive (drove)|водить машину|1
ride (rode)|ехать (на велосипеде, в транспорте)|1
fly (flew)|летать|1
travel|путешествовать|1
visit|посещать|1
arrive|прибывать|1
return|возвращаться|2
move|двигаться; переезжать|1
turn|поворачивать|1
cross|переходить|2
follow|следовать|2
meet (met)|встречать(ся)|1
play|играть|1
sing (sang)|петь|1
dance|танцевать|1
swim (swam)|плавать|1
laugh|смеяться|1
smile|улыбаться|1
cry|плакать|1
relax|отдыхать|1
rest|отдыхать|2
enjoy|наслаждаться|1
celebrate|праздновать|2
send (sent)|отправлять|1
text|писать сообщение|1
check|проверять|1
book|бронировать|2
rent|снимать (жильё)|2
borrow|брать взаймы|2
lend (lent)|давать взаймы|2
carry|нести|2
bring (brought)|приносить|1
send|посылать|1
fix|чинить|2
build (built)|строить|2
break (broke)|ломать|2
lose (lost)|терять; проигрывать|1
win (won)|выигрывать|1
choose (chose)|выбирать|2
decide|решать|2
plan|планировать|2
change|менять|1
grow (grew)|расти|2
fall (fell)|падать|2
catch (caught)|ловить; успеть на|2
throw (threw)|бросать|2
hold (held)|держать|2
pull|тянуть|2
push|толкать|2
drop|ронять|2
hurt (hurt)|болеть; ранить|2
miss|скучать; пропускать; опоздать на|2
`,
  },
  {
    id: 'verbs3', name: 'Глаголы: общение и мысли', icon: '💬', words: `
agree|соглашаться|1
disagree|не соглашаться|2
believe|верить|2
hope|надеяться|1
wish|желать|2
guess|угадывать; полагать|2
prefer|предпочитать|2
seem|казаться|2
look like|быть похожим|2
explain|объяснять|2
describe|описывать|2
repeat|повторять|1
spell|произносить по буквам|1
translate|переводить|2
mean|значить|1
invite|приглашать|2
thank|благодарить|1
apologize|извиняться|2
promise|обещать|2
complain|жаловаться|2
suggest|предлагать|2
offer|предлагать (дать)|2
recommend|рекомендовать|2
introduce|знакомить, представлять|2
joke|шутить|2
worry|волноваться|1
care|заботиться|2
mind|возражать|2
happen|случаться|2
become (became)|становиться|2
allow|разрешать|2
hire|нанимать|2
quit (quit)|бросать, увольняться|2
fail|проваливать|2
pass|сдавать (экзамен); проходить|2
compare|сравнивать|2
include|включать|2
improve|улучшать|2
practice|практиковаться|1
`,
  },
  {
    id: 'phrasal', name: 'Фразовые глаголы', icon: '🔗', words: `
hang out|тусоваться|2
check out|заценить; выписаться|2
pick up|забрать; поднять|2
drop off|завезти, высадить|2
find out|узнать|2
figure out|разобраться|2
look for|искать|1
look after|присматривать|2
look forward to|ждать с нетерпением|2
try on|примерить|2
turn on|включить|1
turn off|выключить|1
put on|надеть|1
take off|снять; взлететь|2
come back|вернуться|1
go back|вернуться (туда)|1
go out|пойти развлечься|2
come in|войти|1
sit down|сесть|1
stand up|встать|1
give up|сдаться, бросить|2
show up|появиться|2
run out of|закончиться (о запасах)|2
work out|тренироваться; получиться|2
calm down|успокоиться|2
hold on|подождать|2
grow up|вырасти|2
fill out|заполнить (анкету)|2
sign up|записаться|2
log in|войти (в аккаунт)|2
`,
  },
  {
    id: 'adjectives', name: 'Прилагательные', icon: '✨', words: `
good|хороший|1
bad|плохой|1
great|отличный|1
nice|приятный, милый|1
awesome|потрясающий (US)|1
amazing|удивительный|1
cool|крутой; прохладный|1
fine|нормальный, хорошо|1
OK|нормально|1
perfect|идеальный|1
terrible|ужасный|2
awful|ужасный|2
big|большой|1
small|маленький|1
little|маленький|1
large|большой (размер)|1
huge|огромный|2
tiny|крошечный|2
tall|высокий|1
short|короткий; невысокий|1
long|длинный|1
high|высокий|1
low|низкий|2
wide|широкий|2
new|новый|1
old|старый|1
young|молодой|1
hot|горячий, жаркий|1
cold|холодный|1
warm|тёплый|1
cool|прохладный|1
wet|мокрый|2
dry|сухой|2
sunny|солнечный|1
rainy|дождливый|1
cloudy|облачный|2
windy|ветреный|2
fast|быстрый|1
slow|медленный|1
quick|быстрый|2
easy|лёгкий|1
hard|трудный; твёрдый|1
difficult|трудный|1
simple|простой|2
cheap|дешёвый|1
expensive|дорогой|1
free|бесплатный; свободный|1
rich|богатый|2
poor|бедный|2
busy|занятой; оживлённый|1
quiet|тихий|1
loud|громкий|2
noisy|шумный|2
clean|чистый|1
dirty|грязный|1
full|полный; сытый|1
empty|пустой|2
open|открытый|1
closed|закрытый|1
right|правильный; правый|1
wrong|неправильный|1
true|верный|1
false|ложный|2
same|тот же|1
different|разный|1
important|важный|1
interesting|интересный|1
boring|скучный|1
funny|смешной|1
strange|странный|2
weird|странный (разг.)|2
beautiful|красивый|1
pretty|симпатичный|1
cute|милый|1
ugly|некрасивый|2
handsome|красивый (о мужчине)|2
happy|счастливый|1
sad|грустный|1
angry|злой|1
mad|злой (US разг.)|2
tired|уставший|1
sleepy|сонный|2
hungry|голодный|1
thirsty|испытывающий жажду|1
sick|больной (US)|1
healthy|здоровый|2
fine|в порядке|1
sorry|сожалеющий|1
glad|рад|2
excited|в восторге|1
bored|скучающий|1
scared|испуганный|2
afraid|боящийся|2
nervous|нервный|2
worried|обеспокоенный|2
surprised|удивлённый|2
proud|гордый|2
lonely|одинокий|2
friendly|дружелюбный|1
kind|добрый|1
polite|вежливый|2
rude|грубый|2
smart|умный|1
stupid|глупый|2
lazy|ленивый|2
funny|смешной|1
shy|застенчивый|2
brave|храбрый|2
honest|честный|2
famous|известный|2
popular|популярный|2
favorite|любимый (US)|1
best|лучший|1
worst|худший|2
real|настоящий|1
possible|возможный|2
impossible|невозможный|2
ready|готовый|1
safe|безопасный|2
dangerous|опасный|2
careful|осторожный|2
delicious|вкусный|1
tasty|вкусный|2
fresh|свежий|1
sweet|сладкий|1
salty|солёный|2
spicy|острый|2
light|лёгкий; светлый|1
heavy|тяжёлый|1
soft|мягкий|2
hard|твёрдый|2
strong|сильный|1
weak|слабый|2
near|близкий|1
far|далёкий|1
close|близкий|1
early|ранний|1
late|поздний|1
next|следующий|1
last|последний; прошлый|1
first|первый|1
whole|целый|2
main|главный|2
own|собственный|2
local|местный|2
public|общественный|2
private|частный|2
ready|готовый|1
crowded|переполненный|2
comfortable|удобный|2
cozy|уютный|2
`,
  },
  {
    id: 'adverbs', name: 'Наречия и как часто', icon: '⏱️', words: `
always|всегда|1
usually|обычно|1
often|часто|1
sometimes|иногда|1
rarely|редко|2
never|никогда|1
ever|когда-либо|2
again|снова|1
already|уже|1
yet|ещё (не); уже (в вопросе)|2
still|всё ещё|1
just|только что; просто|1
soon|скоро|1
later|позже|1
now|сейчас|1
right now|прямо сейчас|1
then|потом; тогда|1
before|раньше; до|1
after|после|1
ago|назад|1
once|однажды; один раз|2
twice|дважды|2
very|очень|1
really|действительно, очень|1
so|так, такой|1
too|тоже; слишком|1
also|также|1
almost|почти|2
only|только|1
even|даже|2
quite|довольно|2
pretty|довольно (US разг.)|2
kind of|как бы, вроде (разг.)|2
a lot|много|1
a little|немного|1
enough|достаточно|2
maybe|может быть|1
probably|вероятно|2
of course|конечно|1
sure|конечно (US)|1
together|вместе|1
alone|один, в одиночестве|2
here|здесь|1
there|там|1
everywhere|везде|2
somewhere|где-то|2
inside|внутри|2
outside|снаружи|2
upstairs|наверху|2
downstairs|внизу|2
home|домой|1
away|прочь; далеко|2
back|назад|1
well|хорошо|1
fast|быстро|1
slowly|медленно|1
quickly|быстро|2
carefully|осторожно|2
easily|легко|2
finally|наконец|2
actually|на самом деле|2
especially|особенно|2
anyway|в любом случае|2
`,
  },
  {
    id: 'function', name: 'Маленькие, но важные слова', icon: '🔤', words: `
I|я|1
you|ты, вы|1
he|он|1
she|она|1
it|оно, это|1
we|мы|1
they|они|1
me|меня, мне|1
him|его, ему|1
her|её, ей|1
us|нас, нам|1
them|их, им|1
my|мой|1
your|твой, ваш|1
his|его|1
its|его/её (о предмете)|2
our|наш|1
their|их|1
mine|мой (без сущ.)|2
yours|твой (без сущ.)|2
myself|сам, себя|2
this|этот|1
that|тот; что|1
these|эти|1
those|те|1
a|неопр. артикль|1
the|опр. артикль|1
some|некоторые, немного|1
any|какой-нибудь, любой|1
every|каждый|1
each|каждый|2
all|все, всё|1
both|оба|2
many|много (штук)|1
much|много (неисчисл.)|1
more|больше|1
most|больше всего|2
few|мало (штук)|2
less|меньше|2
other|другой|1
another|ещё один, другой|1
no|нет; никакой|1
not|не|1
yes|да|1
and|и|1
or|или|1
but|но|1
because|потому что|1
so|поэтому|1
if|если|1
when|когда|1
while|пока|2
until|до тех пор пока|2
than|чем|1
though|хотя|2
also|также|1
what|что|1
who|кто|1
where|где, куда|1
when|когда|1
why|почему|1
how|как|1
which|который|1
whose|чей|2
how much|сколько (неисчисл.)|1
how many|сколько (штук)|1
in|в|1
on|на|1
at|в, у (точка)|1
to|к, в (направление)|1
from|из, от|1
with|с|1
without|без|1
for|для; в течение|1
about|о; около|1
of|из (принадлежность)|1
by|у; к (сроку); кем|1
near|рядом|1
next to|рядом с|1
between|между|1
behind|позади|1
in front of|перед|1
across from|напротив (US)|2
under|под|1
over|над|1
around|вокруг|1
through|через|2
into|в (внутрь)|1
out of|из (наружу)|2
up|вверх|1
down|вниз|1
during|во время|2
since|с (времени)|2
`,
  },
  {
    id: 'numbers', name: 'Числа и количество', icon: '🔢', words: `
zero|ноль|1
one|один|1
two|два|1
three|три|1
four|четыре|1
five|пять|1
six|шесть|1
seven|семь|1
eight|восемь|1
nine|девять|1
ten|десять|1
eleven|одиннадцать|1
twelve|двенадцать|1
thirteen|тринадцать|1
fourteen|четырнадцать|1
fifteen|пятнадцать|1
sixteen|шестнадцать|1
seventeen|семнадцать|1
eighteen|восемнадцать|1
nineteen|девятнадцать|1
twenty|двадцать|1
thirty|тридцать|1
forty|сорок|1
fifty|пятьдесят|1
sixty|шестьдесят|1
seventy|семьдесят|1
eighty|восемьдесят|1
ninety|девяносто|1
hundred|сто|1
thousand|тысяча|1
million|миллион|2
second|второй|1
third|третий|1
half|половина|1
dozen|дюжина|2
pair|пара|2
couple|пара; несколько|2
percent|процент|2
`,
  },
];
