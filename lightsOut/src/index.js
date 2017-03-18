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
};


// UI Lens
// This maps DOM elements and updates their properties.
// Inspired by CSS
const lensUI = {
  'game-grid .cell': {
    className: function(elm, index, array) {
      const { width, board } = this;
      const y = 0 | index / width;
      const x = index - (y * width)
      const val = board[x][y];
      let result = 'cell';

      if (val === 1) {
        result += ' active';
      }

      // console.log('lensUI classList', elm, index);
      // console.log('this is state', this);
      // console.log('x,y,index', val, x, y, index)
      return result;
    },
  },
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
