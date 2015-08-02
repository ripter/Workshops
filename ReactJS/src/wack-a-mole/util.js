
/**
 * Returns true if we can play the next animation frame.
 * @param {DOMHighResTimeStamp} last - The last time we played.
 * @param {DOMHighResTimeStamp} wait - The amount of time to wait before playing.
 * @param {DOMHighResTimeStamp} current - The current timestamp 
 * @return Bool
 */
// Number -> Number -> Number -> Bool
export function canPlayNextFrame(last, wait, current) {
  return (last + wait) < current;
}


/**
 * Returns a random number between 0 and length.
 * @param {Number} length - max number to return.
 */
export function randomIndex(length) {
  return 0 | Math.random() * length;
}

export function randomValidTile(state, tiles) {
  let isValidTile = false;
  let idx = 0;

  // find an empty tile
  while (!isValidTile) {
    idx = randomIndex(tiles.length); 
    isValidTile = (tiles[idx] === state);
  }
  
  return idx;
}
