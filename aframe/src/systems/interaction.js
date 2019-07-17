
/**
 * Interaction System
 * Emits events based on Entity and Hand distance.
 */
AFRAME.registerSystem('interaction', {
  init() {
    this.interactAbles = new Set();
    this.hands = new Set();
    this.distance = new WeakMap();
  },

  tick: (function() {
    return function tick2() {
      const { hands, interactAbles } = this;

      // Update the distance values for each interactAble & hand
      this.hands.forEach((hand) => {
        this.interactAbles.forEach((entity) => {
          // console.log('hand', hand, 'entity', entity);
        });
      });
    }
  })(),

  addEntity(entity) {
    this.interactAbles.add(entity);
  },
  removeEntity(entity) {
    this.interactAbles.remove(entity);
  },

  addHand(entity) {
    this.hands.add(entity);
  },
  removeHand(entity) {
    this.hands.remove(entity);
  },
});
