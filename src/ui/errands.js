// Поручения в духе Goose Game: вещи лежат в мире, их можно поднять, носить и отдать владельцу.
// Подобрал — услышал слово и запомнил его; отдал — сказал пару фраз по-английски.
import { ERRANDS } from '../data/errands.js';
import { makeItem, itemRing } from '../world/items.js';
import { state, save } from '../game/state.js';
import { addXP } from '../game/progress.js';
import { addWord } from '../game/srs.js';
import { speak } from '../game/speech.js';
import { sfx } from '../game/audio.js';
import { addFriendship, addGameStat } from '../game/social.js';
import { runDialogue } from './dialogue.js';
import { toast, floatText } from './dom.js';

export function createErrands({ engine, npcs, isDone, speakerOf, setBusy, onDone }) {
  state.errands ??= { done: {}, pos: {}, holding: null };
  const S = state.errands;
  const map = engine.maps.brooklyn;
  const objs = {}; // id → { obj, ring }

  const unlocked = (e) => isDone('arrive') && (!e.after || S.done[e.after]);
  // Одновременно открыто не больше трёх поручений — список дел не перегружен
  const active = () => ERRANDS.filter((e) => !S.done[e.id] && unlocked(e)).slice(0, 3);

  function spawn() {
    for (const e of active()) {
      if (objs[e.id] || S.holding === e.id) continue;
      const obj = makeItem(e.item);
      const [x, z] = S.pos[e.id] || e.at;
      obj.position.set(x, 0, z);
      const ring = itemRing();
      obj.add(ring);
      map.root.add(obj);
      objs[e.id] = { obj, ring };
    }
  }

  function pickUp(e) {
    const o = objs[e.id];
    o.ring.visible = false;
    map.root.remove(o.obj);
    engine.holdItem(o.obj);
    S.holding = e.id;
    save();
    sfx('pickup');
    const [en, ru] = e.word;
    floatText(`${en} — ${ru}`);
    speak(en, { force: true });
    addWord(en, ru);
    addGameStat('itemsPicked');
    if (!state.flags.carryHint) {
      state.flags.carryHint = true;
      save();
      toast('Отнеси вещь владельцу — подсказка в To-do list. Положить: E или кнопка внизу', { icon: '👐', time: 6000 });
    }
  }

  function drop() {
    const id = S.holding;
    const obj = engine.dropItem();
    if (!obj) return;
    S.holding = null;
    S.pos[id] = [obj.position.x, obj.position.z];
    map.root.add(obj);
    objs[id].ring.visible = true;
    save();
    sfx('drop');
  }

  async function give(e) {
    const npc = npcs[e.to];
    setBusy(true);
    engine.focusOn(npc.id);
    engine.npcWave(npc.id);
    await runDialogue({ speaker: speakerOf(npc), steps: e.steps, idPrefix: `errand:${e.id}`, title: '🎁 Поручение', onTalk: (s) => engine.npcTalk(npc.id, s) });
    const obj = engine.dropItem();
    obj?.parent?.remove(obj);
    delete objs[e.id];
    S.holding = null;
    S.done[e.id] = true;
    save();
    setBusy(false);
    addXP(20);
    addFriendship(npc.id, 5);
    addGameStat('errands');
    sfx('sparkle');
    floatText('+20 XP');
    engine.playerWave();
    toast(`Поручение выполнено: ${e.todo.replace(/ [^\s]*$/u, '')}`, { icon: '✅' });
    spawn();
    onDone?.();
  }

  const held = () => ERRANDS.find((e) => e.id === S.holding);

  // Если игра закрылась с вещью в руках — она снова в руках
  if (S.holding && held() && unlocked(held())) {
    const e = held();
    const obj = makeItem(e.item);
    const ring = itemRing();
    ring.visible = false;
    obj.add(ring);
    objs[e.id] = { obj, ring };
    engine.holdItem(obj);
  } else S.holding = null;
  spawn();

  return {
    spawn,
    // Что можно сделать прямо сейчас (для кнопки действия)
    interaction(nearNpc) {
      if (engine.mapId !== 'brooklyn') return null;
      const p = engine.playerPos;
      const e = held();
      if (e) {
        if (nearNpc === e.to) return { label: `🎁 Отдать: ${e.word[0]}`, run: () => give(e) };
        if (nearNpc) return null; // рядом другой персонаж — можно поговорить, не выпуская вещь
        return { label: `👐 Положить: ${e.word[0]}`, run: drop };
      }
      for (const a of active()) {
        const o = objs[a.id];
        if (o && Math.hypot(o.obj.position.x - p.x, o.obj.position.z - p.z) < 1.3) {
          return { label: `🤲 Взять: ${a.word[0]}`, run: () => pickUp(a) };
        }
      }
      return null;
    },
    dropIfHolding() { if (S.holding) drop(); },
    todos() {
      return [
        ...active().map((e) => ({ text: S.holding === e.id ? `${e.todo} — несу!` : e.todo, done: false })),
        ...ERRANDS.filter((e) => S.done[e.id] && !state.flags.chapter1).map((e) => ({ text: e.todo, done: true })),
      ];
    },
    update(t) {
      for (const { obj, ring } of Object.values(objs)) {
        if (ring.visible) ring.material.opacity = 0.35 + Math.sin(t * 3) * 0.2;
        void obj;
      }
    },
  };
}
