// Moves the player in the world space.
// mutates state.
export function movePlayer(state, { x, y }) {
  const { player } = state;
  player.position.set(x, y);
}
