// Какой голос Kokoro у кого. Общее для игры (speech.js) и записи голосов (tools/voice).
export const NEURAL_VOICES = {
  f: ['af_heart', 'af_bella', 'af_nicole', 'af_aoede', 'af_kore', 'af_sarah', 'af_nova'],
  m: ['am_michael', 'am_fenrir', 'am_puck', 'am_echo', 'am_eric', 'am_liam', 'am_onyx'],
};
export const NARRATOR = 'af_heart';
export const NARRATOR_M = 'am_michael';

const hash = (s) => { let h = 0; for (const c of s || '') h = (h * 31 + c.charCodeAt(0)) >>> 0; return h; };

// Персонаж получает «свой» голос стабильно по имени; без пола — рассказчица
export function voiceFor(gender, who, narrator = NARRATOR) {
  const pool = NEURAL_VOICES[gender];
  return pool && who ? pool[hash(who) % pool.length] : gender === 'm' ? NARRATOR_M : narrator;
}

// Ключ фразы в записанной озвучке
export const clipKey = (text) => String(text).replace(/[*_]/g, '').replace(/\{name\},?\s*/g, '').replace(/\s+([,!?.])/g, '$1').replace(/\s+/g, ' ').trim();
