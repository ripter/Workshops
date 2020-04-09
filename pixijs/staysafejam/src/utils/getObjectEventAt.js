import { LAYER } from '../consts/tiledMap';

// returns null or the event object at position
export function getObjectEventAt(state, { x, y }) {
  const layer = state.level.find((i) => i.type === 'objectgroup' && i.name === LAYER.EVENTS);
  if (!layer) { throw new Error(`Could not find objectgroup named "${LAYER.EVENTS}"`); }
  return layer.objects.find((i) => i.x === x && i.y === y);
}
