/**
 * Manages the activeCamera property on state.
 */
export default function startGame(state, action) {
  if (action.type !== 'completeIntro') { return state; }
  if (state.activeCamera !== 'intro') { return state; }

  // Change the active camera from the intro screen to the level.
  state.activeCamera = 'level';
  return state;
}
