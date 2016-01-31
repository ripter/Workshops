const {ACTION} = require('./consts.js');

class Store {
  constructor() {
    riot.observable(this);
  }

  // Updates the state and triggers ACTION.UPDATE
  // silent with options.silent = true;
  update(newState, options) {
    const isSilent = options && options.silent === true;
    console.log('update isSilent:', isSilent);

    // Set values on `this` to match the new state
    Object.keys(newState).forEach((prop) => {
      this[prop] = newState[prop];
    });

    if (!isSilent) {
      this.trigger(ACTION.UPDATE, this.toJSON());
    }
  }

  // Return a new object with all the key:values on `this`
  toJSON() {
    return Object.keys(this).reduce((result, key) => {
      result[key] = this[key];
      return result;
    }, {});
  }
}

module.exports = Store;
