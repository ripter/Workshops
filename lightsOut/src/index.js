import '../less/index.less';
import State from './state.js';
import NodeLens from './nodeLens.js';


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
const lens = new NodeLens({
  // update each cell in the gird. This is the "light" the user clicks on.
  '.grid .cell': {
    // when the gameboard has a value of 1, give it the .active class
    className: function(elm, index) {
      const { board, isGameOver } = this;
      if (isGameOver) {
        // This means this lens will no longer match this element.
        // The events will be automatically unbound on the next update.
        return 'win';
      }
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

    // When the user clicks on a .grid .cell
    // perform a game action on it.
    onClick(evt, elm, index) {
      console.log('click .cell');
      const { x, y } = this.index2Point(index);
      this.action(x,y);
    },
  },

  '.grid .win': {
    className: function(elm, index) {
      if (this.isGameOver) {
        return 'win';
      }
      return 'cell active';
    },

    // click anywhere to reset the game
    onClick() {
      console.log('click .win');
      this.reset();
    },
  },
});

// re-render whenever the state changes
state.onChange(() => {
  lens.update(state);
});
// trigger inital render
state.triggerChange();

// debugging fun
window.state = state;
window.lens = lens;
