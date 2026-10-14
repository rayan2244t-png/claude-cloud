// Свободный разговор с персонажами.
// Два варианта: Claude Haiku 5.5 (нужен API-ключ) или локальная модель через Ollama
// (работает на своём компьютере, без интернета и ключей — подходит там, где Claude недоступен).
// Настройки — в телефоне героя.
import Anthropic from '@anthropic-ai/sdk';
import { state } from './state.js';
import { levelInfo } from './progress.js';

const MODEL = 'claude-haiku-5-5';

function systemPrompt(npc) {
  return `You are ${npc.name}, a character in a cozy video game set in Brooklyn, New York. ${npc.persona}

The player is a Russian speaker learning AMERICAN English. Their level is ${levelInfo().cur.id} (CEFR), so:
- Speak natural, friendly American English, but keep it very simple: short sentences (max 2-3), common words, present tense mostly.
- Stay in character and keep the conversation going with a simple question.
- Use American words and spelling (apartment, subway, "to go", color), occasionally a light everyday expression (awesome, no worries, gonna) when it fits.
- Never switch to Russian in your English reply.

Every answer must use exactly this format, with these four labels on separate lines:
REPLY: <your answer in English, in character>
RU: <Russian translation of your REPLY>
FIX: <if the player's last message had a grammar, word or spelling mistake, briefly explain it in Russian (1-2 sentences); otherwise write: none>
BETTER: <the corrected or more natural American version of the player's last message; or none if it was already good>`;
}

export const provider = () => state.settings.aiProvider || 'claude';

// Готов ли ИИ к работе (для Ollama проверка будет при первом сообщении)
export function hasKey() {
  return provider() === 'ollama' || !!state.settings.apiKey?.trim();
}

export const OLLAMA_DEFAULTS = { url: 'http://localhost:11434', model: 'qwen2.5:7b' };

// Проверка связи с Ollama: возвращает список установленных моделей
export async function ollamaModels(url = state.settings.ollamaUrl || OLLAMA_DEFAULTS.url) {
  const r = await fetch(`${url.replace(/\/$/, '')}/api/tags`);
  if (!r.ok) throw new Error(`Ollama ответила ${r.status}`);
  const data = await r.json();
  return (data.models || []).map((m) => m.name);
}

function createOllamaChat(npc) {
  const url = (state.settings.ollamaUrl || OLLAMA_DEFAULTS.url).replace(/\/$/, '');
  const model = state.settings.ollamaModel || OLLAMA_DEFAULTS.model;
  const messages = [{ role: 'system', content: systemPrompt(npc) }];
  async function send(userText) {
    messages.push({ role: 'user', content: userText });
    let data;
    try {
      const r = await fetch(`${url}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model, messages, stream: false, options: { temperature: 0.7 } }),
      });
      if (!r.ok) throw new Error(r.status === 404 ? `Модель «${model}» не найдена. Скачай её: ollama pull ${model}` : `Ollama ответила ${r.status}`);
      data = await r.json();
    } catch (err) {
      messages.pop();
      if (err instanceof TypeError) throw new Error('Нет связи с Ollama. Запущена ли она? Разрешён ли доступ из браузера (OLLAMA_ORIGINS)? Подробности — в Настройках.');
      throw err;
    }
    const text = data.message?.content || '';
    messages.push({ role: 'assistant', content: text });
    return parse(text);
  }
  return { send };
}

function parse(text) {
  const get = (label) => {
    const m = text.match(new RegExp(`${label}:\\s*([\\s\\S]*?)(?=\\n(?:REPLY|RU|FIX|BETTER):|$)`));
    const v = m?.[1]?.trim();
    return v && v.toLowerCase() !== 'none' ? v : null;
  };
  return { reply: get('REPLY') || text.trim(), ru: get('RU'), fix: get('FIX'), better: get('BETTER') };
}

export function createChat(npc) {
  return provider() === 'ollama' ? createOllamaChat(npc) : createClaudeChat(npc);
}

function createClaudeChat(npc) {
  const client = new Anthropic({ apiKey: state.settings.apiKey.trim(), dangerouslyAllowBrowser: true });
  const system = systemPrompt(npc); // не меняется в течение разговора
  const messages = [];

  async function send(userText) {
    messages.push({ role: 'user', content: userText });
    let response;
    try {
      response = await client.messages.create({
        model: MODEL,
        max_tokens: 2000,
        output_config: { effort: 'low' },
        system,
        messages,
      });
    } catch (err) {
      messages.pop();
      if (err instanceof Anthropic.AuthenticationError) throw new Error('Неверный API-ключ. Проверь его в Настройках телефона.');
      if (err instanceof Anthropic.RateLimitError) throw new Error('Слишком много запросов, подожди минутку.');
      if (err instanceof Anthropic.APIConnectionError) throw new Error('Нет связи с сервером. Проверь интернет.');
      if (err instanceof Anthropic.APIError) throw new Error(`Ошибка API (${err.status ?? '?'}): ${err.message}`);
      throw err;
    }
    if (response.stop_reason === 'refusal') {
      messages.pop();
      throw new Error('Персонаж не захотел на это отвечать. Попробуй другую тему 🙂');
    }
    // Сохраняем ответ целиком (вместе с блоками размышлений), история только дополняется.
    messages.push({ role: 'assistant', content: response.content });
    const text = response.content.filter((b) => b.type === 'text').map((b) => b.text).join('\n');
    return parse(text);
  }

  return { send };
}
