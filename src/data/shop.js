// Мебель для квартиры героя. en — слово, которое заодно попадает в словарь.
export const SHOP = [
  { id: 'plant', en: 'plant', ru: 'растение', price: 12, emoji: '🪴' },
  { id: 'poster', en: 'poster', ru: 'постер', price: 10, emoji: '🖼️' },
  { id: 'rug', en: 'rug', ru: 'коврик', price: 25, emoji: '🟫' },
  { id: 'lamp', en: 'lamp', ru: 'лампа', price: 20, emoji: '💡' },
  { id: 'bed', en: 'bed', ru: 'кровать', price: 60, emoji: '🛏️' },
  { id: 'sofa', en: 'couch', ru: 'диван (в США — couch)', price: 80, emoji: '🛋️' },
  { id: 'bookshelf', en: 'bookshelf', ru: 'книжная полка', price: 45, emoji: '📚' },
  { id: 'tv', en: 'TV', ru: 'телевизор', price: 120, emoji: '📺' },
  { id: 'guitar', en: 'guitar', ru: 'гитара', price: 70, emoji: '🎸' },
  { id: 'fridge', en: 'fridge', ru: 'холодильник', price: 90, emoji: '🧊' },
];

// Мини-игра «Смена бариста»: варианты заказов
export const BARISTA = {
  sizes: [['small', 'маленький'], ['medium', 'средний'], ['large', 'большой']],
  temps: [['hot', 'горячий'], ['iced', 'со льдом']],
  drinks: [['coffee', 'кофе'], ['latte', 'латте'], ['tea', 'чай'], ['cappuccino', 'капучино'], ['hot chocolate', 'какао']],
  openers: ['Hi! Can I get a', 'Hey! Could I get a', "Hi there. I'd like a", 'Morning! Can I have a', 'Hey, can I get a'],
  names: ['Mike', 'Ashley', 'Tyler', 'Emma', 'Carlos', 'Brittany', 'Josh', 'Maya', 'Kevin', 'Olivia'],
};
