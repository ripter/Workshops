import { isEmpty } from './isEmpty';

const STATE_KEY = 'rps-state';

// Returns saved player state or null
export function getLocalStorage() {
  try {
    const state = JSON.parse(localStorage.getItem(STATE_KEY));
    // If it's an empty object, return null instead.
    if (isEmpty(state)) { return null; }
    return state;
  }
  catch (e) {
    return null;
  }
}

// saves the player state object in localStorage
export function setLocalStorage(state) {
  try {
    if (state) {
      return localStorage.setItem(STATE_KEY, JSON.stringify(state));
    }
    return localStorage.removeItem(STATE_KEY);
  }
  catch (e) {
    // oops, game won't work without localStorage
    throw new Error('Game not playable without localStorage');
  }
}
