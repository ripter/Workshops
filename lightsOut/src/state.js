
// Super Simple State/Store/Model for the application.
export class State {
  constructor(initalState) {
    Object.assign(this, initalState);

    this._changeCallbacks = [];
  }

  // Register a callback on the change 'event'.
  onChange(callback) {
    this._changeCallbacks.push(callback);
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

  // converts array index into a point {x,y}
  index2Point(index) {
    const { width } = this; // state === this
    const y = 0 | index / width;
    const x = index - (y * width);
    return {x, y};
  }

  // Toggle the grid lights starting at point
  // This toggles the lights in a cross pattern
  action(x, y) {
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

    this.triggerChange();
    // trigger render
    // lens.render(state);
  }


}
export default State;
