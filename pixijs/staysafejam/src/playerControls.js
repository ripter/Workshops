import { ACTION } from './consts/action';
import { dispatch } from './dispatch';

export function startWASD() {
  // window.addEventListener('keydown', (evt) => {
  // console.log('keydown', evt);
  // });
  window.addEventListener('keyup', (evt) => {
    const { code } = evt;
    let type;

    switch (code) {
      case 'ArrowUp':
      case 'KeyW':
        type = ACTION.MOVE_NORTH;
        break;
      case 'ArrowDown':
      case 'KeyS':
        type = ACTION.MOVE_SOUTH;
        break;
      case 'ArrowLeft':
      case 'KeyA':
        type = ACTION.MOVE_WEST;
        break;
      case 'ArrowRight':
      case 'KeyD':
        type = ACTION.MOVE_EAST;
        break;
      case 'Space':
      case 'Enter':
        type = ACTION.CONFIRM;
        break;
      case 'Escape':
        type = ACTION.CANCEL;
        break;
      default:
        type = ACTION.ANY_KEY;
    }

    dispatch({
      type,
      useBoost: evt.shiftKey,
      fromUser: true,
    });
  });
}
