export default function endGame(state, action) {
  if (action.type !== 'endGame') { return state; }
  const { puzzle } = state;
  const { lockOrange } = puzzle;


  if (lockOrange) {
    state.activeCamera = 'win';
  }
  else {
    state.activeCamera = 'lose';
  }
  return state;
}
