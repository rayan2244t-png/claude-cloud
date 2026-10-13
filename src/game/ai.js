// Свободный разговор с персонажами через Claude Haiku 5.5.
// Ключ API хранится только в браузере игрока (Настройки в телефоне).
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

export function hasKey() {
  return !!state.settings.apiKey?.trim();
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
