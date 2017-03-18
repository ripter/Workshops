import '../less/index.less';
import updateUI from './updateUI.js';

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
const lensUI = {
  // Match each cell in the grid.
  'game-grid .cell': {
    // sets elm.className
    className: function(elm, index, array) {
      const { board } = this; // state === this
      const { x, y } = this.getPoint(index);
      const val = board[x][y];
      let result = 'cell'; //keep the cell class so we will still match next update.

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

      board[x][y] = val;

      //TODO: Trigger Render Action
      updateUI(state, lensUI);
    },
  },
  // selectors that don't match are skipped
  'invalid': {
    test: true,
  },
};


// Render the inital application state
updateUI(state, lensUI);

// debugging fun
window.state = state;
window.lensUI = lensUI;
window.updateUI = updateUI;
