// Гардероб героя: цвета бесплатно, вещи — за деньги, заработанные в игре.
export const WARDROBE = {
  hat: { label: 'Головной убор', options: [['cap', 'Кепка', 0], ['beanie', 'Шапка', 15], ['none', 'Без шапки', 0]] },
  hairStyle: { label: 'Причёска', options: [['short', 'Короткая', 0], ['spiky', 'Ёжик', 10], ['curly', 'Кудри', 10], ['long', 'Длинные', 10], ['ponytail', 'Хвост', 10], ['bun', 'Пучок', 10], ['bald', 'Лысый', 0]] },
  jacket: { label: 'Куртка', options: [['', 'Без куртки', 0], ['#2f3b52', 'Тёмно-синяя', 35], ['#8a6347', 'Кожаная', 60], ['#3e6b4f', 'Зелёная', 35], ['#c94f3d', 'Красная', 35]] },
  extras: { label: 'Аксессуары', options: [['glasses', 'Очки', 15], ['headphones', 'Наушники', 25], ['backpack', 'Рюкзак', 0]] },
};
export const COLORS = ['#e07a5f', '#5b7fb3', '#7fb38a', '#f2c230', '#b0577a', '#8b6fb3', '#f6f3ec', '#2f3b52', '#3a3a3a', '#4fa3a5', '#c94f3d', '#d98bb3'];
export const HAIR_COLORS = ['#1d1d1d', '#3a2a20', '#5a3d2b', '#c4572e', '#d9c08a', '#d9d4cc', '#8a6347'];
export const SKIN = ['#f1c7a5', '#f0c4a0', '#e8b48f', '#c99a73', '#a8714f', '#8d5a3b', '#6b4430'];
export const DEFAULT_LOOK = { skin: '#f0c4a0', shirt: '#e07a5f', pants: '#3f5a7a', hat: 'cap', hatColor: '#2f5d8a', hair: '#5a3d2b', hairStyle: 'short', backpack: '#f2c230', glasses: false, headphones: false, jacket: '' };
