import { FOCUS } from '../consts/options';
import { updateMessage } from './updateMessage';

export function closeDialog(state) {
  state.choiceLayer.visible = false;
  state.currentAvatar = null;
  state.currentDialogKey = null;
  state.currentPage = -1;
  state.focus = FOCUS.MAP;

  updateMessage(state, null);
}
