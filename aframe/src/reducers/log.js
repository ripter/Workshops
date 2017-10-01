/**
 * Debug helper, logs actions as they happen.
 */
export default function log(state, action) {
  console.log('action', action.type, action);
  return state;
}
