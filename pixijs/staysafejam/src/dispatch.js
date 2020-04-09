import { gameLogic } from './gameLogic';
import { FOCUS } from './consts/options';

// default state.
const state = {
  solidary: 0,
  focus: FOCUS.DIALOG,
  /* Dialog State */
  currentPage: -1,
  currentDialogKey: null,
  currentAvatar: null,
  currentChoice: 0,
  pendingActions: [],
  /* Gameplay State */
  hasFancyRing: false,
};
// put state on the window for easy debugging.
window.gameState = state;

export function dispatch(action) {
  console.group('Dispatch');
  console.log('action', action);
  console.groupEnd();

  // Update the state
  gameLogic(state, action);

  // If we have any pending actions, process them in order.
  if (state.pendingActions.length > 0) {
    const nextAction = state.pendingActions.shift();
    dispatch(nextAction);
  }
}
