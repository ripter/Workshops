/**
 * [Description]
 */
export default function puzzle(state, action, nextAction) {
  const { type } = action;
  const { puzzle } = state;
  const { lockOrange, lockDelivery, lockSoldier } = puzzle;

  switch (type) {
    case 'pieceLockDelivery':
      puzzle.lockDelivery = true;
      break;
    case 'pieceLockOrange':
      puzzle.lockOrange = true;
      break;
    case 'pieceLockSoldier':
      // Soldier only locks if the delivery has locked.
      if (lockDelivery) {
        puzzle.lockSoldier = true;
      }
      break;
    case 'pieceLockTable':
      puzzle.lockOrange = true;
      break;
    default:
      // ignore
  }

  // Update the puzzle state
  state.puzzle = puzzle;
  return state;
}
