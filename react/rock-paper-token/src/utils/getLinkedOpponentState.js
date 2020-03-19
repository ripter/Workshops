import { isEmpty } from './isEmpty';

const STATE_KEY = 'rps-state';

export function getLinkedOpponentState() {
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

export function setLinkedOpponentState(state) {
  try {
    const urlParams = new URLSearchParams();
    urlParams.set(STATE_KEY, JSON.stringify(state));
    return urlParams.toString();
  }
  catch (e) {
    throw new Error('Unable to update the URL.');
  }
}
