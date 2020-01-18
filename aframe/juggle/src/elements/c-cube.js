import { getRandomCubeMaterials } from '../util/getRandomCubeMaterials.js';

// Create a new element based on a-entity
// We can do things here that are not possible with a mixin
AFRAME.registerElement('c-cube', {
  prototype: Object.create(AFRAME.AEntity.prototype, {
    // Called when created.
    createdCallback: {
      value() {
        this.setAttribute('geometry', 'primitive: box; width: 1; height: 1; depth: 1');
        this.setAttribute('material-cube', getRandomCubeMaterials());
        this.classList.add('clickable');
        this.classList.add('solid');
        this.setAttribute('clickable', true);
      },
    },
  }), // end prototype:
});
