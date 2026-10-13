// Реестр карт (районов). Чтобы добавить район — создайте файл по образцу brooklyn.js
// и добавьте его сюда. Персонажи указывают карту полем map (по умолчанию brooklyn).
import { buildBrooklyn } from './brooklyn.js';
import { buildApartment } from './apartment.js';

export const MAPS = {
  brooklyn: buildBrooklyn,
  apartment: buildApartment,
};
