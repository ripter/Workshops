import '../less/index.less';
import State from './state.js';
import LensDOM from './lensDOM.js';


// Application State
const state = new State({
  width: 5,
  height: 5,
  board: [
    [0,0,0,0,0],
    [0,0,1,0,0],
    [0,1,1,1,0],
    [0,0,1,0,0],
    [0,0,0,0,0],
  ],
});

// UI Lens
// Use CSS Selectos to update Elements.
const lens = new LensDOM({
  // Match each cell in the grid.
  '.grid .cell': {
    // sets elm.className
    className: function(elm, index) {
      const { board } = this;
      const { x, y } = this.index2Point(index);
      const val = board[x][y];
      let result = 'cell'; //keep the cell class so we will still match next update.

      // if the value in the array is 1
      // give it the class active
      if (val === 1) {
        result += ' active';
      }

      return result;
    },

    // onclick event (event names are always lower case)
    onClick(evt, elm, index) {
      const { x, y } = this.index2Point(index);
      this.action(x,y);
    },
  },
});

// On change, re-render
state.onChange(() => {
  lens.update(state);
});
// trigger inital render
state.triggerChange();

// debugging fun
window.state = state;
window.lens = lens;
