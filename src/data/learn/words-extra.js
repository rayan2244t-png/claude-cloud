// 1500 самых важных слов A1–A2, часть 3: быт, кухня, техника, характер, путешествия, Америка.
// Формат строки: английское | перевод | уровень (1 = A1, 2 = A2)

export const EXTRA_TOPICS = [
  {
    id: 'objects', name: 'Предметы в быту', icon: '🧴', words: `
toothbrush|зубная щётка|1
toothpaste|зубная паста|1
soap|мыло|1
shampoo|шампунь|1
toilet paper|туалетная бумага|1
tissue|бумажная салфетка|2
comb|расчёска|2
hairdryer|фен|2
razor|бритва|2
makeup|косметика|2
perfume|духи|2
scissors|ножницы|2
tape|скотч|2
glue|клей|2
string|верёвка, нитка|2
needle|иголка|2
hammer|молоток|2
tool|инструмент|2
box|коробка|1
basket|корзина|2
bucket|ведро|2
broom|веник|2
vacuum|пылесос|2
sponge|губка|2
candle|свеча|2
match|спичка|2
lighter|зажигалка|2
flashlight|фонарик (US)|2
clock|часы (настенные)|1
alarm|будильник|2
calendar|календарь|2
photo frame|фоторамка|2
painting|картина|2
poster|постер|2
vase|ваза|2
plant pot|цветочный горшок|2
ladder|стремянка|2
hanger|вешалка|2
drawer|ящик (стола)|2
cabinet|шкафчик|2
garbage|мусор (US)|2
recycling|переработка|2
envelope|конверт|2
stamp|марка|2
card|открытка; карта|1
`,
  },
  {
    id: 'cooking', name: 'Кухня и готовка', icon: '🍳', words: `
boil|варить, кипятить|2
fry|жарить|2
bake|печь|2
grill|жарить на гриле|2
roast|запекать|2
cut|резать|1
chop|нарезать|2
slice|нарезать ломтиками|2
peel|чистить (кожуру)|2
mix|смешивать|2
stir|помешивать|2
pour|наливать|2
add|добавлять|1
taste|пробовать на вкус|1
heat|нагревать|2
melt|таять, растапливать|2
freeze|замораживать|2
recipe|рецепт|2
ingredient|ингредиент|2
pan|сковорода|2
pot|кастрюля|2
kettle|чайник|2
cutting board|разделочная доска|2
flour|мука|2
honey|мёд|1
jam|джем|2
yogurt|йогурт|1
cream|сливки|2
nuts|орехи|2
popcorn|попкорн|1
noodles|лапша|2
steak|стейк|2
sausage|колбаса, сосиска|2
turkey|индейка|2
shrimp|креветки|2
salmon|лосось|2
tuna|тунец|2
lettuce|салат-латук|2
broccoli|брокколи|2
pepper|перец (овощ)|2
avocado|авокадо|2
peach|персик|2
pear|груша|2
cherry|вишня|2
watermelon|арбуз|1
pineapple|ананас|2
coconut|кокос|2
smoothie|смузи|2
lemonade|лимонад|1
hot chocolate|горячий шоколад|1
latte|латте|1
espresso|эспрессо|2
decaf|кофе без кофеина|2
vegetarian|вегетарианский|2
vegan|веганский|2
gluten-free|без глютена|2
appetizer|закуска (US)|2
main course|основное блюдо|2
side dish|гарнир|2
`,
  },
  {
    id: 'digital', name: 'Компьютер и телефон', icon: '💻', words: `
click|кликнуть|1
type|печатать|1
download|скачать|1
upload|загрузить|2
save|сохранить|1
delete|удалить|1
print|печатать (на принтере)|2
copy|копировать|1
paste|вставить|2
search|искать|1
share|делиться|1
like|лайкнуть|1
follow|подписываться|2
update|обновление; обновить|2
install|установить|2
charge|заряжать|2
scroll|листать|2
swipe|смахнуть|2
screenshot|скриншот|2
selfie|селфи|1
emoji|эмодзи|1
username|имя пользователя|2
profile|профиль|2
notification|уведомление|2
settings|настройки|1
printer|принтер|2
mouse|мышь (компьютерная)|1
headphones|наушники|1
speaker|колонка; говорящий|2
signal|сигнал|2
`,
  },
  {
    id: 'character', name: 'Характер и эмоции', icon: '🙂', words: `
calm|спокойный|2
upset|расстроенный|2
confused|сбитый с толку|2
embarrassed|смущённый|2
jealous|ревнивый, завидующий|2
stressed|в стрессе|2
relaxed|расслабленный|2
excited|взволнованный (радостно)|1
disappointed|разочарованный|2
curious|любопытный|2
patient|терпеливый|2
generous|щедрый|2
selfish|эгоистичный|2
serious|серьёзный|2
crazy|сумасшедший|1
calmly|спокойно|2
cheerful|весёлый|2
creative|творческий|2
confident|уверенный|2
hard-working|трудолюбивый|2
friendly|дружелюбный|1
outgoing|общительный|2
quietly|тихо|2
mean|злой, вредный (US)|2
nice|милый|1
chill|спокойный (разг.)|2
awkward|неловкий|2
annoying|раздражающий|2
annoyed|раздражённый|2
amazed|изумлённый|2
thankful|благодарный|2
grateful|благодарный|2
`,
  },
  {
    id: 'trip', name: 'Путешествия и город', icon: '🗽', words: `
tour|экскурсия|2
guide|гид|2
souvenir|сувенир|2
sightseeing|осмотр достопримечательностей|2
view|вид|2
hostel|хостел|2
check-in|регистрация, заселение|2
check-out|выезд|2
front desk|ресепшен|2
room service|обслуживание в номере|2
key card|ключ-карта|2
lobby|вестибюль|2
elevator|лифт|1
escalator|эскалатор|2
stop|остановка|1
transfer|пересадка|2
schedule|расписание|2
round trip|туда и обратно|2
one-way|в одну сторону|2
customs|таможня|2
border|граница|2
embassy|посольство|2
currency|валюта|2
exchange|обмен|2
lost and found|бюро находок|2
parade|парад|2
festival|фестиваль|2
fair|ярмарка|2
crowd|толпа|2
noise|шум|2
siren|сирена|2
honk|гудок; сигналить|2
pothole|выбоина|2
fire hydrant|пожарный гидрант|2
stoop|крыльцо (NYC)|2
bodega|магазинчик на углу (NYC)|2
deli|гастроном (US)|2
food truck|фудтрак|2
food cart|тележка с едой|2
laundromat|прачечная самообслуживания|2
drugstore|аптека (US)|2
pharmacy|аптека|1
`,
  },
  {
    id: 'america', name: 'Американские реалии', icon: '🇺🇸', words: `
state|штат|1
county|округ|2
zip code|почтовый индекс (US)|2
driver's license|водительские права|2
Social Security number|номер соцстрахования|2
ID|удостоверение личности|2
paycheck|зарплатный чек|2
tip jar|банка для чаевых|2
sales tax|налог с продаж|2
Fourth of July|День независимости|2
Independence Day|День независимости|2
Memorial Day|День памяти|2
Labor Day|День труда|2
Super Bowl|финал по американскому футболу|2
tailgate|пикник у стадиона|2
road trip|поездка на машине|2
drive-thru|окошко «авто» (US)|2
takeout|еда навынос (US)|2
to go|с собой (US)|1
bucks|доллары (разг.)|1
y'all|вы все (юг США)|2
sophomore|второкурсник|2
freshman|первокурсник|2
high school|старшая школа|1
middle school|средняя школа|2
GPA|средний балл|2
dorm|общежитие|2
campus|кампус|2
`,
  },
  {
    id: 'verbs4', name: 'Ещё полезные глаголы', icon: '➕', words: `
smell (smelled)|пахнуть; нюхать|2
touch|трогать|2
kiss|целовать|2
hug|обнимать|2
shake hands|пожимать руки|2
knock|стучать|2
ring|звонить (о звонке)|2
shout|кричать|2
whisper|шептать|2
point|указывать|2
count|считать|1
measure|измерять|2
weigh|весить|2
fit|подходить (по размеру)|2
match|сочетаться|2
fill|наполнять|2
cover|накрывать|2
hide (hid)|прятать|2
search|искать|2
collect|собирать|2
deliver|доставлять|2
receive|получать|2
accept|принимать|2
refuse|отказываться|2
prepare|готовить(ся)|2
protect|защищать|2
save|экономить; спасать|2
waste|тратить впустую|2
share|делиться|1
support|поддерживать|2
trust|доверять|2
expect|ожидать|2
notice|замечать|2
realize|осознавать|2
imagine|представлять|2
continue|продолжать|2
manage|справляться|2
organize|организовывать|2
discuss|обсуждать|2
argue|спорить|2
cheer|подбадривать|2
vote|голосовать|2
volunteer|быть волонтёром|2
`,
  },
];
