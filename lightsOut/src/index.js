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
  // match each cell in the grid.
  '.grid .cell': {
    // update the className based on state.
    className: function(elm, index) {
      const { board, isGameOver } = this;
      const { x, y } = this.index2Point(index);
      const cell = board[x][y];
      const value = 'cell ';

      if (isGameOver) {
        return value + 'win';
      }

      if (cell === 1) {
        return value + 'active';
      }
      return value;
    },
    // user presses a cell to perform a game action.
    onClick: function(evt, elm, index) {
      const { x, y } = this.index2Point(index);

      this.actionClick(x, y);
      evt.stopPropagation();
    },
  },

  // click anywhere to reset the game
  '.grid': {
    onClick(evt) {
      const { isGameOver } = this;

      if (isGameOver) {
        this.reset();
        evt.stopPropagation();
      }
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
