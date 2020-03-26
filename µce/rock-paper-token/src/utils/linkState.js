import { isEmpty } from './isEmpty';

const STATE_KEY = 'rps-state';

// returns the opponent state from the URL search params or null
export function getLinkState() {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const state = JSON.parse(urlParams.get(STATE_KEY));

    if (isEmpty(state)) { return null; }
    return state;
  }
  catch (e) {
    return null;
  }
}

// returns a URL search param of the opponent state.
export function createLinkState(state) {
  try {
    const urlParams = new URLSearchParams();
    urlParams.set(STATE_KEY, JSON.stringify(state));
    return urlParams.toString();
  }
  catch (e) {
    throw new Error('Unable to update the URL.');
  }
}
