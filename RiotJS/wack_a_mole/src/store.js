const assets = require('./assets.js');

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
}

Store.EVENTS = STORE.EVENTS;

module.exports = Store;
