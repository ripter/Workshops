import { ACTION } from '../consts/action';
import { closeDialog } from './closeDialog';
import { DIALOG } from '../consts/dialog';
import { FOCUS } from '../consts/options';
import { updateMessage } from './updateMessage';

// Update the dialog UI which takes focus over the map.
export function updateDialog(state) {
  const { currentDialogKey } = state;
  const dialogMeta = DIALOG[currentDialogKey];

  // Reset back to blank when there is no currentDialogKey.
  if (!dialogMeta) {
    closeDialog(state);
  }
  // Move to the next page when there is a currentDialogKey.
  else {
    state.focus = FOCUS.DIALOG;
    state.currentPage += 1;
  }

  const isLastPage = dialogMeta && (state.currentPage === dialogMeta.pages.length - 1);
  const haveChoices = dialogMeta && dialogMeta.onConfirm;

  // if there are no options on the last page, then end the dialog.
  if (isLastPage && !haveChoices) {
    state.currentDialogKey = null;
  }
  else if (isLastPage && haveChoices) {
    state.focus = FOCUS.CHOICE;
    state.pendingActions.push({
      type: ACTION.ANY_KEY,
    });
  }

  // Display/clear the dialog.
  updateMessage(state, dialogMeta);
}
