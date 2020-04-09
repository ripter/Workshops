import { ACTION } from '../consts/action';
import { closeDialog } from './closeDialog';
import { DIALOG } from '../consts/dialog';

export function updateChoice(state, action) {
  const {
    tileHeight, choiceLayer, currentDialogKey,
  } = state;
  const dialogMeta = DIALOG[currentDialogKey];
  choiceLayer.visible = true;

  switch (action.type) {
    case ACTION.MOVE_NORTH:
      if (state.currentChoice > 0) {
        state.currentChoice -= 1;
      }
      break;
    case ACTION.MOVE_SOUTH:
      if (state.currentChoice < 1) {
        state.currentChoice += 1;
      }
      break;
    case ACTION.CONFIRM:
      // Add the action from the confirmed choice.
      state.pendingActions.push({
        type: state.currentChoice === 0 ? dialogMeta.onConfirm : dialogMeta.onCancel,
      });
      closeDialog(state);
      break;
    case ACTION.CANCEL:
      state.pendingActions.push({
        type: dialogMeta.onCancel || dialogMeta.onConfirm,
      });
      closeDialog(state);
      break;
    default:
      // ignore
  }

  // Update the Icon position
  const elIcon = choiceLayer.getChildByName('icon');
  elIcon.y = tileHeight * state.currentChoice * 2;
}
