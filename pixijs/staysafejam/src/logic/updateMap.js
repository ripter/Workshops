import { movePlayer } from './movePlayer';
import { triggerEvent } from './triggerEvent';
import { getVelocity } from '../utils/getVelocity';
import { getObjectEventAt } from '../utils/getObjectEventAt';
import { getCollisionAt } from '../utils/getCollisionAt';


// Update the game map, moving the player and triggering events.
export function updateMap(state, action) {
  const { player, tileWidth, tileHeight } = state;
  const velocity = getVelocity(state, action);
  // get the position indicated by velocity
  const nextPosition = {
    x: player.x + (velocity.x * tileWidth),
    y: player.y + (velocity.y * tileHeight),
  };
  // Find the tiles/object at the next position.
  const collision = getCollisionAt(state, nextPosition);
  const eventObject = getObjectEventAt(state, nextPosition);

  // If the player won't collide with anything, move them.
  if (collision.tileID === 0 && (!eventObject || !eventObject.doesCollide)) {
    movePlayer(state, nextPosition);
  }

  // Trigger any event they touched.
  if (eventObject) {
    triggerEvent(state, eventObject);
  }
}
