
// Super Simple State/Store/Model for the application.
export class State {
  constructor(initalState) {
    Object.assign(this, {
      width: 1,
      height: 1,
      board: [
        [0],
      ],
      isGameOver: false,
    }, initalState);
    this._changeCallbacks = [];
    this.randomize();
  }

  // Register a callback on the change 'event'.
  // @public
  onChange(callback) {
    this._changeCallbacks.push(callback);
  }

  // converts array index into a point {x,y}
  // @public
  index2Point(index) {
    const { width } = this; // state === this
    const y = 0 | index / width;
    const x = index - (y * width);
    return {x, y};
  }

  // Toggles a cross of lights.
  // Checks for win
  // @public
  actionClick(x, y) {
    this.toggleCross(x,y);
    this.updateGameOver();

    // Trigger the change 'event'
    // so the UI can update
    this.triggerChange();
  }

  // Reset the game state
  // @public
  reset() {
    this.randomize();
    this.isGameOver = false;
    this.triggerChange();
  }


  // Trigger the change 'events', calling all the callbacks.
  triggerChange() {
    this._changeCallbacks.forEach((callback) => {
      callback(this);
    });
  }

  // Toggle a value on the board
  toggle(x, y) {
    const { board } = this;
    board[x][y] = board[x][y] === 0 ? 1 : 0;
  }

  // Toggle the grid lights starting at point
  // This toggles the lights in a cross pattern
  toggleCross(x, y) {
    const { width, height } = this;

    if (y-1 >= 0) {
      this.toggle(x, y-1);
    }
    if (x-1 >= 0) {
      this.toggle(x-1, y);
    }
    if (x >= 0) {
      this.toggle(x, y);
    }
    if (x+1 < width) {
      this.toggle(x+1, y);
    }
    if (y+1 < height) {
      this.toggle(x, y+1);
    }
  }

  // Randomizes the pattern on the board.
  randomize() {
    const { width, height } = this;
    let randomCount = 0|Math.random() * 20;
    let x, y;

    while (randomCount--) {
      x = 0|Math.random() * width;
      y = 0|Math.random() * height;
      this.actionClick(x, y);
    }
  }

  // update the isGameOver state
  updateGameOver() {
    const { board } = this;
    // if every cell is off
    this.isGameOver = board.every((row) => {
      return row.every((cel) => {
        return cel === 0;
      });
    });
  }

}
export default State;
