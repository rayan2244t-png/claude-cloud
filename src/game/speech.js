// Американская озвучка (Web Speech API) и распознавание речи с микрофона.
import { state } from './state.js';

let voice = null;
const PREFERRED = ['Google US English', 'Samantha', 'Microsoft Aria', 'Microsoft Jenny', 'Microsoft Guy', 'Alex'];

function pickVoice() {
  const voices = window.speechSynthesis?.getVoices() || [];
  const us = voices.filter((v) => v.lang === 'en-US' || v.lang === 'en_US');
  voice =
    PREFERRED.map((n) => us.find((v) => v.name.includes(n))).find(Boolean) ||
    us.find((v) => v.localService) || us[0] ||
    voices.find((v) => v.lang?.startsWith('en')) || null;
}

if ('speechSynthesis' in window) {
  pickVoice();
  window.speechSynthesis.onvoiceschanged = pickVoice;
}

export const canSpeak = () => 'speechSynthesis' in window;

// pitch даёт персонажам немного разные голоса
export function speak(text, { pitch = 1, rate, force = false } = {}) {
  if (!canSpeak() || (!state.settings.voice && !force)) return Promise.resolve();
  return new Promise((resolve) => {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text.replace(/[*_]/g, ''));
    u.lang = 'en-US';
    if (voice) u.voice = voice;
    u.rate = rate ?? state.settings.rate;
    u.pitch = pitch;
    u.onend = u.onerror = () => resolve();
    window.speechSynthesis.speak(u);
    setTimeout(resolve, 12000);
  });
}

const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
export const canListen = () => !!Recognition;

export function listen() {
  return new Promise((resolve, reject) => {
    if (!Recognition) return reject(new Error('Распознавание речи не поддерживается этим браузером'));
    const r = new Recognition();
    r.lang = 'en-US';
    r.interimResults = false;
    r.maxAlternatives = 3;
    r.onresult = (e) => resolve(Array.from(e.results[0]).map((a) => a.transcript));
    r.onerror = (e) => reject(new Error(e.error === 'not-allowed' ? 'Нет доступа к микрофону' : 'Не расслышал, попробуй ещё раз'));
    r.onnomatch = () => reject(new Error('Не расслышал, попробуй ещё раз'));
    r.start();
  });
}
