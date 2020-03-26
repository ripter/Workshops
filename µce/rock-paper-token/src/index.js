import './rps-hand-picker';
import { getLocalStorage, setLocalStorage } from './utils/localStorage';
import { getLinkState, createLinkState } from './utils/linkState';

// Sho
const { elmPlayerInput } = window;

let state = {
  selected: '',
  opponentLink: '',
}
const dispatch = (action) => {
  switch (action.type) {
    case 'init':
      break;
    case 'selected':
      state.selected = action.value;
      break;
    default:
      console.log('unknown action', action);
  }

  // Create the opponent link
  if (state.selected) {
    state.opponentLink = createLinkState({
      hand: state.selected,
    });
  }

  console.log('updated State', state);
}


// Listen for onSelected event on the player input element.
elmPlayerInput.addEventListener('selected', (evt) => {
  dispatch({
    type: 'selected',
    value: evt.detail.value,
  });
});


// Initalize the game
dispatch({
  type: 'init',
  value: getLinkState(),
});
