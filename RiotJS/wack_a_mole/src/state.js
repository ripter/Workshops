const riot = require('riot');
const requestAnimationFrame = window.requestAnimationFrame;

const TICK_SPEED = 1000;

// State for the gameboard
function State(boardSize, dirtSrc, molesSrc) {
  this.boardSize = boardSize;
  this.moles = [];
  this.dirtSrc = dirtSrc;
  this.molesSrc = molesSrc;

  // add events
  riot.observable(this);

  this.resetBoard();
  this.start();
}
State.prototype = {
  // Creates a new random mole
  // return mole
  createMole() {
    const {dirtSrc, molesSrc} = this;
    const index = 0 | Math.random() * molesSrc.length;

    return {
      dirtSrc: dirtSrc,
      moleSrc: molesSrc[index],
      isPopped: false
    };
  },

  // Resets the gameboard with new moles.
  resetBoard() {
    const {dirtSrc, molesSrc} = this;
    let moles = [];
    let len = this.boardSize;

    while(len--) {
      moles.push(this.createMole());
    }

    this.moles = moles;
  },

  // Start the Game Timer and the Action!
  start(update) {
    // Start the loop!
    requestAnimationFrame(this.tick.bind(this));
  },

  // Called on every frame, emits 'tick' event at TICK_SPEED
  tick(timestamp) {
    const delta = timestamp - this.lastTick;

    // skip if it hasn't been long enough.
    if (delta < TICK_SPEED) {
      requestAnimationFrame(this.tick.bind(this));
      return;
    }

    this.update(delta);

    this.trigger('tick', 'delta', delta, 'timestamp', timestamp, this);
    this.lastTick = timestamp;
    if (!window.pause) {
      requestAnimationFrame(this.tick.bind(this));
    }
  },

  update() {
    const index = 0 | Math.random() * this.moles.length;
    let active = this.active || 0;
    let moles = this.moles;

    // Flip to dirt
    moles[active].isPopped = false;
    // Flip new one.
    moles[index].isPopped = true;
    // save the change
    this.active = index;
    this.moles = moles;
  },

  // Returns the gameboard for the UI
  toJSON() {
    const {moles} = this;

    return JSON.parse(JSON.stringify(moles));
  }

};
module.exports = State;
