import '../less/index.less';
import LensDOM from './lensDOM.js';

// IMPORT COMPONENTS
import { gameGrid } from './components/game-grid.js';

// REGISTER COMPONENTS
customElements.define('game-grid', gameGrid);


// Application State
const state = {
  width: 5,
  height: 5,
  board: [
    [0,0,0,0,0],
    [0,0,1,0,0],
    [0,1,1,1,0],
    [0,0,1,0,0],
    [0,0,0,0,0],
  ],

  getPoint(index) {
    const { width, board } = this; // state === this
    // convert index to x,y
    const y = 0 | index / width;
    const x = index - (y * width)
    return {x, y};
  },
};


// UI Lens
// This maps DOM elements and updates their properties.
// Inspired by CSS
const lens = new LensDOM({
  // Match each cell in the grid.
  'game-grid .cell': {
    // sets elm.className
    className: function(elm, index, array) {
      const { board } = this; // state === this
      const { x, y } = this.getPoint(index);
      const val = board[x][y];
      let result = 'cell'; //keep the cell class so we will still match next update.

      // if the value in the array is 1
      // give it the class active
      if (val === 1) {
        result += ' active';
      }

      return result;
    },

    // adds event listener
    onclick(evt, elm, index) {
      //TODO: Turn into Action Light Pressed
      const { board } = this; // state === this
      const { x, y } = this.getPoint(index);
      let val = board[x][y];
      console.log('click', evt);

      // toggle val
      if (val === 0) { val = 1; }
      else { val = 0; }

      // update the state
      board[x][y] = val;
      // trigger render
      lens.render(state);
    },
  },
  // selectors that don't match are skipped
  'invalid': {
    test: true,
  },
});

// Render the inital application state
// updateUI(state, lensUI);
lens.render(state);

// debugging fun
window.state = state;
window.lens = lens;
