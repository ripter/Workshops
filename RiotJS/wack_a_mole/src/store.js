const {images, randomMole} = require('./assets.js');
const {MOLE} = require('./consts.js');


class Store {
  constructor() {
    let i = 9;

    // create the molesSrc
    this.moles = [];
    while(i--) {
      this.moles.push({
        src: images.dirt
      });
    }

    riot.observable(this);
    this.delegateEvents();
  }

  // Listens to events defined in MOLE
  delegateEvents() {
    this.on(MOLE.TOGGLE, (indexList) => {
      if (typeof indexList === "number") { throw new Error('Toggle takes an array of ids'); }
      indexList.forEach(this.toggleMole.bind(this));
    });
  }

  // Toggle the mole at index.
  toggleMole(index) {
    const moles = this.moles;
    const mole = moles[index];
    // Skip if the index was invalid
    if (!mole) { return; }

    if (mole.src === images.dirt) {
      mole.src = randomMole();
    } else {
      mole.src = images.dirt;
    }

    moles[index] = mole;

    this.update({
      moles: moles
    });
  }

  update(newState) {
    // Set values on this to match the new state
    Object.keys(newState).forEach((prop) => {
      this[prop] = newState[prop];
    });
    this.trigger('update', this.toJSON());
  }

  // Returns a clone of the current state.
  toJSON() {
    const result = Object.keys(this).reduce((result, key) => {
      result[key] = this[key];
      return result;
    }, {});

    return result;
  }
}

module.exports = Store;
