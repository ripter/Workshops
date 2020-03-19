import { uuidv4 } from '../../utils/uuidv4';

/**
 * Game Logic
*/
export function stateReducer(prevState, action) {
  const state = {...prevState};

  console.group('reducer');
  console.log('action', action);
  console.log('prevState', prevState);
  console.groupEnd();

  // has the player taken their turn yet?
  // Tokens are unique per game.
  if (!state.player || !state.player.token) {
    state.player = {
      hand: null,
      token: uuidv4(),
    };
  }

  // Update hand on click
  if (action.type === 'click') {
    state.player.hand = action.hand;
  }

  return state;
}
