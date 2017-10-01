
/**
 * Dispatch a state change event so components can update.
 * @param  {Object} state Updated Game State
 */
export default function dispatchChange(state) {
  const event = new CustomEvent('store-change', {detail: state});
  document.dispatchEvent(event);
}
