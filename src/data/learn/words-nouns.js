// 1500 самых важных слов A1–A2 (американский английский), часть 1: существительные по темам.
// Формат строки: английское слово | перевод | уровень (1 = A1, 2 = A2)

export const NOUN_TOPICS = [
  {
    id: 'people', name: 'Люди и семья', icon: '👨‍👩‍👧', words: `
person|человек|1
people|люди|1
man|мужчина|1
woman|женщина|1
men|мужчины|1
women|женщины|1
child|ребёнок|1
children|дети|1
kid|ребёнок (разг.)|1
baby|малыш|1
boy|мальчик|1
girl|девочка|1
guy|парень|1
friend|друг|1
best friend|лучший друг|1
family|семья|1
parents|родители|1
mother|мать|1
father|отец|1
mom|мама|1
dad|папа|1
son|сын|1
daughter|дочь|1
brother|брат|1
sister|сестра|1
husband|муж|1
wife|жена|1
grandmother|бабушка|1
grandfather|дедушка|1
grandma|бабуля|1
grandpa|дедуля|1
grandparents|бабушка и дедушка|2
uncle|дядя|1
aunt|тётя|1
cousin|двоюродный брат/сестра|2
nephew|племянник|2
niece|племянница|2
boyfriend|парень (молодой человек)|1
girlfriend|девушка|1
partner|партнёр|2
neighbor|сосед|1
roommate|сосед по квартире|2
classmate|одноклассник|2
coworker|коллега|2
boss|начальник|1
guest|гость|2
stranger|незнакомец|2
adult|взрослый|2
teenager|подросток|2
name|имя|1
first name|имя|1
last name|фамилия|1
age|возраст|1
birthday|день рождения|1
wedding|свадьба|2
couple|пара|2
relationship|отношения|2
`,
  },
  {
    id: 'body', name: 'Тело и здоровье', icon: '🩺', words: `
body|тело|1
head|голова|1
hair|волосы|1
face|лицо|1
eye|глаз|1
ear|ухо|1
nose|нос|1
mouth|рот|1
tooth|зуб|1
teeth|зубы|1
lip|губа|2
neck|шея|1
shoulder|плечо|2
arm|рука (от плеча)|1
hand|кисть, рука|1
finger|палец|1
leg|нога|1
knee|колено|2
foot|ступня|1
feet|ступни|1
back|спина|1
stomach|живот, желудок|2
heart|сердце|1
skin|кожа|2
blood|кровь|2
health|здоровье|2
doctor|врач|1
nurse|медсестра|1
dentist|стоматолог|2
hospital|больница|1
pharmacy|аптека|1
drugstore|аптека (US)|2
medicine|лекарство|1
pill|таблетка|2
appointment|запись (к врачу)|2
headache|головная боль|2
stomachache|боль в животе|2
toothache|зубная боль|2
cold|простуда|1
flu|грипп|2
fever|температура, жар|2
cough|кашель|2
pain|боль|2
allergy|аллергия|2
insurance|страховка|2
emergency|экстренная ситуация|2
accident|авария, несчастный случай|2
ambulance|скорая помощь|2
sleep|сон|1
diet|диета|2
exercise|упражнения, зарядка|2
`,
  },
  {
    id: 'food', name: 'Еда и напитки', icon: '🍕', words: `
food|еда|1
breakfast|завтрак|1
lunch|обед|1
dinner|ужин|1
brunch|бранч|2
snack|перекус|2
meal|приём пищи|2
dessert|десерт|1
water|вода|1
coffee|кофе|1
tea|чай|1
milk|молоко|1
juice|сок|1
soda|газировка (US)|1
beer|пиво|1
wine|вино|1
drink|напиток|1
bread|хлеб|1
butter|сливочное масло|1
cheese|сыр|1
egg|яйцо|1
meat|мясо|1
chicken|курица|1
beef|говядина|2
pork|свинина|2
bacon|бекон|2
ham|ветчина|2
fish|рыба|1
seafood|морепродукты|2
rice|рис|1
pasta|паста|1
pizza|пицца|1
slice|кусок|1
burger|бургер|1
hot dog|хот-дог|1
sandwich|сэндвич|1
bagel|бейгл|1
salad|салат|1
soup|суп|1
fries|картошка фри (US)|1
chips|чипсы (US)|1
pancakes|блинчики, панкейки|1
cereal|хлопья|2
oatmeal|овсянка|2
toast|тост|1
cookie|печенье (US)|1
cake|торт|1
pie|пирог|1
ice cream|мороженое|1
candy|конфеты (US)|1
chocolate|шоколад|1
sugar|сахар|1
salt|соль|1
pepper|перец|1
oil|масло (растительное)|2
sauce|соус|2
ketchup|кетчуп|1
mustard|горчица|2
fruit|фрукты|1
apple|яблоко|1
banana|банан|1
orange|апельсин|1
lemon|лимон|1
strawberry|клубника|1
grapes|виноград|2
vegetables|овощи|1
potato|картофель|1
tomato|помидор|1
onion|лук|1
carrot|морковь|1
cucumber|огурец|2
garlic|чеснок|2
mushroom|гриб|2
beans|фасоль|2
corn|кукуруза|2
peanut butter|арахисовая паста|2
menu|меню|1
order|заказ|1
check|счёт (US)|1
tip|чаевые|1
waiter|официант|1
waitress|официантка|1
server|официант (US)|2
chef|шеф-повар|2
restaurant|ресторан|1
café|кафе|1
diner|закусочная (US)|2
bakery|пекарня|2
plate|тарелка|1
bowl|миска|2
cup|чашка|1
glass|стакан|1
mug|кружка|2
bottle|бутылка|1
can|банка|2
fork|вилка|1
knife|нож|1
spoon|ложка|1
napkin|салфетка|2
straw|трубочка|2
refill|бесплатная добавка напитка|2
leftovers|остатки еды|2
to-go box|контейнер с собой|2
`,
  },
  {
    id: 'home', name: 'Дом и квартира', icon: '🏠', words: `
home|дом (родной)|1
house|дом (здание)|1
apartment|квартира (US)|1
building|здание|1
room|комната|1
bedroom|спальня|1
living room|гостиная|1
kitchen|кухня|1
bathroom|ванная, туалет|1
dining room|столовая|2
closet|шкаф (встроенный)|2
hallway|коридор|2
basement|подвал|2
garage|гараж|2
yard|двор|2
backyard|задний двор|2
roof|крыша|2
floor|пол; этаж|1
wall|стена|1
ceiling|потолок|2
door|дверь|1
window|окно|1
stairs|лестница|1
elevator|лифт (US)|1
key|ключ|1
lock|замок|2
furniture|мебель|2
bed|кровать|1
couch|диван (US)|1
sofa|диван|1
chair|стул|1
table|стол|1
desk|письменный стол|1
lamp|лампа|1
shelf|полка|2
mirror|зеркало|2
rug|коврик|2
carpet|ковёр|2
curtains|шторы|2
pillow|подушка|2
blanket|одеяло|2
towel|полотенце|1
shower|душ|1
bathtub|ванна|2
toilet|унитаз|1
sink|раковина|2
fridge|холодильник|1
refrigerator|холодильник|2
stove|плита|2
oven|духовка|2
microwave|микроволновка|2
dishwasher|посудомойка|2
washing machine|стиральная машина|2
laundry|стирка; прачечная|2
dishes|посуда|2
trash|мусор (US)|1
trash can|мусорное ведро|1
light|свет; лампочка|1
heater|обогреватель|2
air conditioner|кондиционер|2
landlord|хозяин жилья|2
landlady|хозяйка жилья|2
rent|арендная плата|2
lease|договор аренды|2
neighborhood|район|2
address|адрес|1
mailbox|почтовый ящик|2
package|посылка|2
`,
  },
  {
    id: 'city', name: 'Город и места', icon: '🏙️', words: `
city|город|1
town|городок|1
village|деревня|2
street|улица|1
avenue|проспект|2
block|квартал|2
corner|угол|1
sidewalk|тротуар (US)|1
crosswalk|пешеходный переход (US)|2
traffic light|светофор|1
intersection|перекрёсток|2
bridge|мост|1
park|парк|1
square|площадь|1
downtown|центр города (US)|2
uptown|северная часть города|2
neighborhood|район|2
store|магазин (US)|1
shop|магазин|1
supermarket|супермаркет|1
grocery store|продуктовый (US)|1
mall|торговый центр|1
market|рынок|1
bank|банк|1
ATM|банкомат|1
post office|почта|1
library|библиотека|1
museum|музей|1
theater|театр (US)|1
movie theater|кинотеатр (US)|1
church|церковь|2
school|школа|1
university|университет|1
college|колледж (US: вуз)|1
office|офис|1
hotel|отель|1
gym|спортзал|1
pool|бассейн|1
hospital|больница|1
police station|полицейский участок|2
fire station|пожарная часть|2
gas station|заправка (US)|1
parking lot|парковка (US)|2
airport|аэропорт|1
station|станция|1
bus stop|автобусная остановка|1
subway station|станция метро|1
restroom|туалет (US, общественный)|1
entrance|вход|1
exit|выход|1
line|очередь (US)|1
sign|знак, вывеска|1
map|карта|1
building|здание|1
skyscraper|небоскрёб|2
tower|башня|2
statue|статуя|2
beach|пляж|1
river|река|1
zoo|зоопарк|2
playground|детская площадка|2
`,
  },
  {
    id: 'transport', name: 'Транспорт и путешествия', icon: '🚕', words: `
car|машина|1
taxi|такси|1
cab|такси (US)|1
bus|автобус|1
subway|метро (US)|1
train|поезд|1
plane|самолёт|1
airplane|самолёт (US)|1
bike|велосипед|1
bicycle|велосипед|1
motorcycle|мотоцикл|2
boat|лодка|1
ship|корабль|2
truck|грузовик (US)|1
ferry|паром|2
ticket|билет|1
MetroCard|проездной (NYC)|2
fare|стоимость проезда|2
platform|платформа|2
seat|место, сиденье|1
driver|водитель|1
passenger|пассажир|2
traffic|пробки, движение|1
road|дорога|1
highway|шоссе (US)|2
trip|поездка|1
travel|путешествия|1
vacation|отпуск (US)|1
tourist|турист|1
passport|паспорт|1
visa|виза|2
luggage|багаж|2
baggage|багаж|2
suitcase|чемодан|1
backpack|рюкзак|1
bag|сумка|1
flight|рейс|1
gate|выход на посадку; турникет|2
arrival|прибытие|2
departure|отправление|2
delay|задержка|2
reservation|бронь|2
direction|направление|1
left|лево|1
right|право|1
distance|расстояние|2
mile|миля (≈1,6 км)|2
gas|бензин (US)|2
license|права, лицензия|2
`,
  },
  {
    id: 'shopping', name: 'Покупки и деньги', icon: '🛍️', words: `
money|деньги|1
dollar|доллар|1
cent|цент|1
bucks|баксы (разг.)|1
quarter|25 центов; четверть|2
dime|10 центов|2
change|сдача; мелочь|1
cash|наличные|1
card|карта|1
credit card|кредитная карта|1
debit card|дебетовая карта|2
price|цена|1
cost|стоимость|1
sale|распродажа|1
discount|скидка|2
deal|выгодное предложение|2
receipt|чек|1
bill|купюра; счёт|1
tax|налог|2
coupon|купон|2
cashier|кассир|1
checkout|касса|2
customer|покупатель|2
size|размер|1
gift|подарок|1
present|подарок|1
wallet|кошелёк|1
purse|сумочка (US)|2
bag|пакет, сумка|1
cart|тележка|1
item|товар, предмет|2
brand|бренд|2
refund|возврат денег|2
return|возврат|2
account|счёт (в банке)|2
salary|зарплата|2
savings|сбережения|2
`,
  },
  {
    id: 'clothes', name: 'Одежда', icon: '👕', words: `
clothes|одежда|1
shirt|рубашка|1
T-shirt|футболка|1
pants|брюки (US)|1
jeans|джинсы|1
shorts|шорты|1
skirt|юбка|1
dress|платье|1
jacket|куртка|1
coat|пальто|1
sweater|свитер|1
hoodie|худи|1
suit|костюм|2
tie|галстук|2
shoes|обувь, туфли|1
sneakers|кроссовки (US)|1
boots|ботинки, сапоги|1
sandals|сандалии|2
socks|носки|1
underwear|нижнее бельё|2
hat|шляпа|1
cap|кепка|1
scarf|шарф|1
gloves|перчатки|1
belt|ремень|2
glasses|очки|1
sunglasses|солнцезащитные очки|1
watch|часы (наручные)|1
ring|кольцо|2
earrings|серьги|2
necklace|ожерелье|2
pocket|карман|2
umbrella|зонт|1
uniform|форма|2
pajamas|пижама|2
`,
  },
  {
    id: 'colors', name: 'Цвета и формы', icon: '🎨', words: `
color|цвет (US)|1
red|красный|1
blue|синий|1
green|зелёный|1
yellow|жёлтый|1
black|чёрный|1
white|белый|1
gray|серый (US)|1
brown|коричневый|1
orange|оранжевый|1
pink|розовый|1
purple|фиолетовый|1
light blue|голубой|1
dark|тёмный|1
light|светлый|1
gold|золотой|2
silver|серебряный|2
circle|круг|2
square|квадрат|2
line|линия|2
`,
  },
  {
    id: 'work', name: 'Работа и профессии', icon: '💼', words: `
job|работа (должность)|1
work|работа|1
career|карьера|2
company|компания|1
business|бизнес|2
office|офис|1
meeting|встреча, совещание|1
interview|собеседование|2
résumé|резюме (US)|2
experience|опыт|2
skill|навык|2
shift|смена|2
schedule|расписание, график|2
break|перерыв|1
lunch break|обеденный перерыв|2
day off|выходной|2
part-time|частичная занятость|2
full-time|полная занятость|2
manager|менеджер|1
employee|сотрудник|2
team|команда|1
customer|клиент|2
project|проект|2
task|задача|2
email|электронное письмо|1
report|отчёт|2
teacher|учитель|1
student|студент|1
doctor|врач|1
nurse|медсестра|1
cook|повар|1
chef|шеф-повар|2
barista|бариста|1
waiter|официант|1
driver|водитель|1
police officer|полицейский|1
cop|коп (разг.)|2
firefighter|пожарный|2
engineer|инженер|2
programmer|программист|2
developer|разработчик|2
designer|дизайнер|2
artist|художник|1
musician|музыкант|1
singer|певец|1
actor|актёр|1
writer|писатель|2
lawyer|юрист|2
salesperson|продавец|2
mechanic|механик|2
farmer|фермер|2
pilot|пилот|2
mail carrier|почтальон (US)|2
`,
  },
  {
    id: 'school', name: 'Учёба', icon: '📚', words: `
class|урок, класс|1
lesson|урок|1
homework|домашнее задание|1
test|тест|1
exam|экзамен|1
grade|оценка (US)|2
question|вопрос|1
answer|ответ|1
example|пример|1
mistake|ошибка|1
word|слово|1
sentence|предложение|1
language|язык|1
English|английский|1
Russian|русский|1
book|книга|1
notebook|тетрадь|1
pen|ручка|1
pencil|карандаш|1
paper|бумага|1
page|страница|1
dictionary|словарь|2
grammar|грамматика|2
vocabulary|словарный запас|2
pronunciation|произношение|2
accent|акцент|2
practice|практика|1
course|курс|2
degree|степень (учёная)|2
subject|предмет|2
math|математика (US)|1
science|наука|2
history|история|2
`,
  },
  {
    id: 'time', name: 'Время и календарь', icon: '🗓️', words: `
time|время|1
hour|час|1
minute|минута|1
second|секунда|1
day|день|1
week|неделя|1
month|месяц|1
year|год|1
weekend|выходные|1
morning|утро|1
afternoon|день (после полудня)|1
evening|вечер|1
night|ночь|1
noon|полдень|1
midnight|полночь|2
today|сегодня|1
tomorrow|завтра|1
yesterday|вчера|1
tonight|сегодня вечером|1
Monday|понедельник|1
Tuesday|вторник|1
Wednesday|среда|1
Thursday|четверг|1
Friday|пятница|1
Saturday|суббота|1
Sunday|воскресенье|1
January|январь|1
February|февраль|1
March|март|1
April|апрель|1
May|май|1
June|июнь|1
July|июль|1
August|август|1
September|сентябрь|1
October|октябрь|1
November|ноябрь|1
December|декабрь|1
spring|весна|1
summer|лето|1
fall|осень (US)|1
winter|зима|1
season|сезон|2
holiday|праздник (US)|2
Thanksgiving|День благодарения|2
Christmas|Рождество|1
Halloween|Хэллоуин|2
New Year|Новый год|1
date|дата; свидание|1
calendar|календарь|2
future|будущее|2
past|прошлое|2
moment|момент|2
century|век|2
`,
  },
  {
    id: 'weather', name: 'Погода и природа', icon: '🌦️', words: `
weather|погода|1
sun|солнце|1
rain|дождь|1
snow|снег|1
wind|ветер|1
cloud|облако|1
storm|шторм, гроза|2
thunder|гром|2
lightning|молния|2
fog|туман|2
ice|лёд|1
temperature|температура|2
degree|градус|2
forecast|прогноз|2
sky|небо|1
star|звезда|1
moon|луна|1
nature|природа|1
tree|дерево|1
flower|цветок|1
grass|трава|1
leaf|лист|1
leaves|листья|1
plant|растение|1
garden|сад|1
forest|лес|1
mountain|гора|1
hill|холм|2
lake|озеро|1
ocean|океан|1
sea|море|1
island|остров|2
air|воздух|1
fire|огонь|1
earth|земля|2
rock|камень|2
sand|песок|2
environment|окружающая среда|2
`,
  },
  {
    id: 'animals', name: 'Животные', icon: '🐶', words: `
animal|животное|1
pet|домашний питомец|1
dog|собака|1
puppy|щенок|1
cat|кошка|1
kitten|котёнок|1
bird|птица|1
pigeon|голубь|2
fish|рыба|1
horse|лошадь|1
cow|корова|1
pig|свинья|1
chicken|курица|1
duck|утка|1
rabbit|кролик|1
mouse|мышь|1
rat|крыса|2
squirrel|белка|2
bear|медведь|1
wolf|волк|2
fox|лиса|2
lion|лев|1
tiger|тигр|1
elephant|слон|1
monkey|обезьяна|1
snake|змея|2
insect|насекомое|2
bug|жучок (US)|2
fly|муха|2
bee|пчела|2
`,
  },
  {
    id: 'free', name: 'Хобби, спорт, развлечения', icon: '🎸', words: `
hobby|хобби|1
sport|спорт|1
game|игра; матч|1
team|команда|1
player|игрок|1
soccer|футбол (US)|1
football|американский футбол (US)|1
basketball|баскетбол|1
baseball|бейсбол|1
tennis|теннис|1
hockey|хоккей|2
fan|фанат, болельщик|2
music|музыка|1
song|песня|1
band|группа (музыкальная)|1
concert|концерт|1
guitar|гитара|1
piano|пианино|1
movie|фильм (US)|1
show|шоу; сериал|1
TV|телевизор|1
series|сериал|2
party|вечеринка|1
picture|фотография; картинка|1
photo|фото|1
camera|камера|1
art|искусство|1
painting|картина|2
dance|танец|1
book|книга|1
story|история, рассказ|1
news|новости|1
magazine|журнал|2
newspaper|газета|2
ticket|билет|1
museum|музей|1
beach|пляж|1
walk|прогулка|1
run|пробежка|2
swimming|плавание|1
fun|веселье|1
`,
  },
  {
    id: 'tech', name: 'Техника и интернет', icon: '📱', words: `
phone|телефон|1
cell phone|мобильный (US)|1
smartphone|смартфон|1
computer|компьютер|1
laptop|ноутбук|1
tablet|планшет|2
screen|экран|1
keyboard|клавиатура|2
charger|зарядка|2
battery|батарея|2
internet|интернет|1
Wi-Fi|вай-фай|1
password|пароль|1
website|сайт|1
app|приложение|1
message|сообщение|1
text|SMS, сообщение|1
call|звонок|1
voicemail|голосовая почта|2
video|видео|1
photo|фото|1
account|аккаунт|2
online|онлайн|1
social media|соцсети|2
post|пост|2
link|ссылка|2
file|файл|2
`,
  },
  {
    id: 'feelings', name: 'Чувства', icon: '😊', words: `
feeling|чувство|1
love|любовь|1
fear|страх|2
hope|надежда|2
problem|проблема|1
trouble|беда, неприятность|2
fun|веселье|1
luck|удача|2
stress|стресс|2
mood|настроение|2
smile|улыбка|1
laugh|смех|2
dream|мечта; сон|1
idea|идея|1
opinion|мнение|2
reason|причина|2
surprise|сюрприз|2
`,
  },
  {
    id: 'things', name: 'Разное: вещи и понятия', icon: '📦', words: `
thing|вещь|1
stuff|вещи, штуки (разг.)|2
something|что-то|1
nothing|ничего|1
everything|всё|1
anything|что-нибудь|1
place|место|1
way|путь; способ|1
part|часть|1
side|сторона|1
end|конец|1
top|верх|1
bottom|низ|2
middle|середина|2
front|перед|1
number|номер; число|1
letter|письмо; буква|1
box|коробка|1
bag|сумка|1
gift|подарок|1
photo|фото|1
world|мир|1
country|страна|1
state|штат|1
government|правительство|2
law|закон|2
war|война|2
peace|мир (не война)|2
life|жизнь|1
death|смерть|2
job|работа|1
plan|план|1
rule|правило|2
information|информация|1
advice|совет|2
help|помощь|1
fact|факт|2
kind|вид, тип|1
group|группа|1
list|список|1
piece|кусок, штука|1
noise|шум|2
voice|голос|1
sound|звук|1
color|цвет|1
size|размер|1
shape|форма|2
weight|вес|2
height|рост, высота|2
power|сила; электричество|2
energy|энергия|2
chance|шанс|2
choice|выбор|2
change|перемена|2
difference|разница|2
mistake|ошибка|1
secret|секрет|2
truth|правда|2
lie|ложь|2
joke|шутка|1
`,
  },
];
