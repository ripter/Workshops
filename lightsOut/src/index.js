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

  // Toggle the grid lights starting at point
  // This toggles the lights in a cross pattern
  togglePoint(x, y) {
    const { board, width, height } = this;
    const toggle = (x, y) => {
      board[x][y] = board[x][y] === 0 ? 1 : 0;
    };

    if (y-1 >= 0) {
      toggle(x, y-1);
    }
    if (x-1 >= 0) {
      toggle(x-1, y);
    }
    if (x >= 0) {
      toggle(x, y);
    }
    if (x+1 < width) {
      toggle(x+1, y);
    }
    if (y+1 < height) {
      toggle(x, y+1);
    }

    // trigger render
    lens.render(state);
  }
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

    // on cell click
    onclick(evt, elm, index) {
      const { board } = this; // state === this
      const { x, y } = this.getPoint(index);

      // Action: toggle point
      this.togglePoint(x, y);
    },
  },
});

// Render the inital application state
lens.render(state);

// debugging fun
window.state = state;
window.lens = lens;
