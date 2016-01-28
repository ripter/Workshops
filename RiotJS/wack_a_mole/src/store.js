const {images, randomMoleImage} = require('./assets.js');
const {ACTION, MOLE} = require('./consts.js');


class Store {
  constructor() {
    this.moles = this.createArray(9, {src: images.dirt});
    this.score = 0;
    this.moleLog = {};

    riot.observable(this);
    this.delegateEvents();
  }

  // Listens to events defined in MOLE
  // This function maps the actions listed int he consts.js file
  //   to the functions on this object.
  delegateEvents() {
    this.on(ACTION.MOLE.HIDE, (indexList, silent) => {
      if (typeof indexList === "number") { throw new Error('ACTION.MOLE.HIDE takes an array of ids'); }
      indexList.forEach(this.hideMole.bind(this, silent));
    });
    this.on(ACTION.MOLE.SHOW, (indexList, silent) => {
      if (typeof indexList === "number") { throw new Error('ACTION.MOLE.SHOW takes an array of ids'); }
      indexList.forEach(this.showMole.bind(this, silent));
    });

    this.on(ACTION.CLICKED, this.onClick.bind(this));
  }

  // ACTIONS.MOLE.HIDE
  hideMole(silent, index) {
    const mole = this.moles[index];
    if (!mole) { return; } // Skip undefined

    mole.src = images.dirt;
    this.setMole(index, mole, silent);
  }

  // ACTIONS.MOLE.SHOW
  showMole(silent, index) {
    const mole = this.moles[index];
    if (!mole) { return; } // Skip undefined

    mole.src = randomMoleImage();
    this.setMole(index, mole, silent);
  }

  // ACTION.CLICKED
  onClick(mole) {
    if (mole.src === images.dirt) { return; }
    const index = mole.index;

    // trigger before we change mole
    // so the listeners can refrence the src.
    this.trigger(MOLE.HIT, mole);

    mole.src = images.dirt;
    this.setMole(index, mole);
  }




  //
  // Utils
  //

  // Sets mole and triggers update
  setMole(index, mole, silent) {
    const moles = this.moles;

    moles[index] = mole;
    this.update({
      moles: moles
    }, silent);
  }

  // Updates the state and trigger the update event with a clone of state.
  update(newState, silent) {
    silent = silent || false;
    // Set values on this to match the new state
    Object.keys(newState).forEach((prop) => {
      this[prop] = newState[prop];
    });

    if (!silent) {
      this.trigger('update', this.toJSON());
    }
  }

  // Returns a clone of the current state.
  toJSON() {
    const result = Object.keys(this).reduce((result, key) => {
      result[key] = this[key];
      return result;
    }, {});

    return result;
  }

  createArray(len, val) {
    let result = [];

    while (len--) {
      val._index = len;
      result[len] = JSON.parse(JSON.stringify(val));
    }

    return result;
  }
}

module.exports = Store;
