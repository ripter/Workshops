const assets = require('./assets.js');
const requestAnimationFrame = window.requestAnimationFrame;

const STORE = {
  EVENTS: {
    UPDATE: 'STORE.EVENTS.UPDATE'
  }
};

class Store {
  constructor() {
    let i = 9;

    // create the molesSrc
    this.moles = [];
    while(i--) {
      this.moles.push({
        src: assets.images.dirt
      });
    }

    riot.observable(this);
  }

  // Toggle the mole at index.
  toggleMole(index) {
    const moles = this.moles;
    const mole = moles[index];

    if (mole.src === assets.images.dirt) {
      mole.src = assets.images.panda;
    } else {
      mole.src = assets.images.dirt;
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

  toJSON() {
    const result = Object.keys(this).reduce((result, key) => {
      result[key] = this[key];
      return result;
    }, {});

    return result;
  }
}

module.exports = Store;
