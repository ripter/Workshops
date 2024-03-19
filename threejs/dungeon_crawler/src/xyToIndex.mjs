/**
 * Converts 2D coordinates (x, y) into a single index for a 1D array.
 * Assumes row-major order.
 * 
 * @param {number} x The x coordinate (column index).
 * @param {number} y The y coordinate (row index).
 * @param {number} width The width of the grid (total number of columns).
 * @returns {number} The index in the 1D array corresponding to the (x, y) position.
 */
export function xyToIndex(width, x, y) {
  return y * width + x;
}
