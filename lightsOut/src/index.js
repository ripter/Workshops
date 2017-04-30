import '../less/index.less';
import State from './state.js';
// import NodeLens from './nodeLens.js';
import domLens from 'domlens';


// Initial Application State
const state = new State({
  width: 5,
  height: 5,
  board: [
    [1,1,0,1,1],
    [1,0,0,0,1],
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
  ],
});

// Create rules that map our state to the UI.
const rules = {
  '.grid .cell': {
    /**
     * Sets the cell's className based on `state.board[x][y]`
     */
    className: function(elm, index) {
      const { board, isGameOver } = state;
      const { x, y } = state.index2Point(index);
      const cell = board[y][x];
      const value = 'cell ';

      if (isGameOver) {
        return value + 'win';
      }

      if (cell === 1) {
        return value + 'active';
      }
      return value;
    },

    /**
     * User plays by clicking one of the grid cells.
     * This triggers a game action.
     */
    onClick: function(evt, elm, index) {
      const { x, y } = state.index2Point(index);

      state.actionClick(x, y);
      evt.stopPropagation();
    },
  },

  // match the entire grid so the user can
  // click anywhere to reset the game.
  '.grid': {
    onClick(evt) {
      const { isGameOver } = state;

      if (isGameOver) {
        state.reset();
        evt.stopPropagation();
      }
    },
  },
};


// re-render whenever the state changes
state.onChange(() => {
  domLens(rules, state);
});
// trigger inital render
state.triggerChange();

// debugging fun
window.state = state;
window.rules = rules;
