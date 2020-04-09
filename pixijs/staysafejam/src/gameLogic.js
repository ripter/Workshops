import { createChoiceUI } from './logic/createChoiceUI';
import { createDialogUI } from './logic/createDialogUI';
import { createSolidaryUI } from './logic/createSolidaryUI';
import { dropFancyRing } from './logic/dropFancyRing';
import { loadAssets } from './logic/loadAssets';
import { loadEvents } from './logic/loadEvents';
import { loadTiledMap } from './logic/loadTiledMap';
import { pickupFancyRing } from './logic/pickupFancyRing';
import { updateChoice } from './logic/updateChoice';
import { updateDialog } from './logic/updateDialog';
import { updateMap } from './logic/updateMap';

import { ACTION } from './consts/action';
import { FOCUS } from './consts/options';

/**
 * Logic for the game.
 * Reducer function that returns the updated state object.
 * This *does mutate* the state.
*/
export function gameLogic(state, action) {
  // console.log('action', action);

  switch (action.type) {
    case ACTION.INIT:
      loadAssets(state, action);
      loadTiledMap(state, action);
      loadEvents(state, action);
      createDialogUI(state);
      createSolidaryUI(state);
      createChoiceUI(state);
      break;
    case ACTION.DIALOG:
      state.focus = FOCUS.DIALOG;
      state.currentDialogKey = action.key;
      updateDialog(state, action);
      break;
    /*
     * UI Actions */
    case ACTION.ANY_KEY:
    case ACTION.CONFIRM:
    case ACTION.CANCEL:
    case ACTION.MOVE_NORTH:
    case ACTION.MOVE_SOUTH:
    case ACTION.MOVE_EAST:
    case ACTION.MOVE_WEST:
      if (state.focus === FOCUS.DIALOG) {
        updateDialog(state, action);
      }
      else if (state.focus === FOCUS.CHOICE) {
        updateChoice(state, action);
      }
      else {
        updateMap(state, action);
      }
      break;
    /*
     * Game Play Action */
    case ACTION.DROP_FANCY_RING:
      dropFancyRing(state, action);
      break;
    case ACTION.PICKUP_FANCY_RING:
      pickupFancyRing(state, action);
      break;
    default:
      console.log('unknown action', action);
      break;
  }

  return state;
}
