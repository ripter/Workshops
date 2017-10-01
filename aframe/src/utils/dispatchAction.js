
/**
 * Dispatches/Emits/Triggers/Fires a store action.
 * @param  {Object} action - Action to dispatch on the game store.
 */
export default function dispatchAction(action) {
  const event = new CustomEvent('store-action', {detail: action});
  document.dispatchEvent(event);
}
