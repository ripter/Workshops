import { ACTION } from '../consts/action';

// Returns a velocity to move the player this action.
export function getVelocity(state, { type }) {
  const vel = { x: 0, y: 0 };

  // Set velocity based on action type
  switch (type) {
    case ACTION.MOVE_NORTH:
      vel.y = -1;
      break;
    case ACTION.MOVE_SOUTH:
      vel.y = 1;
      break;
    case ACTION.MOVE_EAST:
      vel.x = 1;
      break;
    case ACTION.MOVE_WEST:
      vel.x = -1;
      break;
    default:
      // ignore
  }

  return vel;
}
