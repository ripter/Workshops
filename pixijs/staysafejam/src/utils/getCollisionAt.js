import { getTileAt } from './getTileAt';
import { LAYER } from '../consts/tiledMap';

// Returns the collision tile at position.
export function getCollisionAt(state, { x, y }) {
  return getTileAt(state, {
    x,
    y,
    layerName: LAYER.COLLISION,
  });
}
