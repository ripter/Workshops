import Store from '@ripter/store';
import defaultState from './defaultState.js';
import dispatchChange from './utils/dispatchChange.js';

// REDUCERS IMPORT

// Create a store to hold the game logic
const store = new Store(defaultState(), [
  // Reducers on store
], function() {
  // On State Change, trigger a store-change event so components can update.
  const state = store.getState();
  dispatchChange(state);
});

// Listen for store-action events, this allows components to trigger actions.
document.addEventListener('store-action', function(event) {
  const { detail } = event;
  // perform the action on the store.
  store.action(detail);
});
