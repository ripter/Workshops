
/**
 * Interaction System
 * Emits events based on Entity and Hand distance.
 */
AFRAME.registerSystem('interaction', {
  init() {
    this.interactAbles = new Set();
    this.hands = new Set();
  },

  tick() {

  },

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
