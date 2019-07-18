
/**
 * Interaction System
 * Emits events based on Entity and Hand distance.
 */
AFRAME.registerSystem('interaction', {
  init() {
    this.interactAbles = new Set();
    this.hand = { left: null, right: null };
    this.distanceInfo = new WeakMap();
  },

  tick: (function() {
    const worldPositionEntity = new THREE.Vector3();
    const worldPositionHand = new THREE.Vector3();

    return function tick2() {
      const { hand } = this;

      // Update the distance values for each interactAble & hand
      [hand.left, hand.right].forEach((hand, handIndex) => {
        if (!hand) { return; }
        // get the hand's world position
        hand.object3D.getWorldPosition(worldPositionHand);

        // Loop over every entity the hand can interact with.
        this.interactAbles.forEach((entity) => {
          entity.object3D.getWorldPosition(worldPositionEntity);

          // Get the distance to the hand and save it.
          const distanceToHand = worldPositionHand.distanceToSquared(worldPositionEntity);
          const distance = this.distanceInfo.get(entity);

          if (handIndex === 0 /*Left Hand*/) {
            distance.leftHand = distanceToHand;
          } else /*Right Hand*/ {
            distance.rightHand = distanceToHand;
          }
        });
      });

      // Loop over all the entities and emit events as needed.
      // Emit events based on changes to the distance and user input.
      this.interactAbles.forEach((entity) => {
        const distance = this.distanceInfo.get(entity);
        const minDistance = Math.min(distance.leftHand, distance.rightHand);

        // console.log(minDistance, entity);
      });
    }
  })(),

  addEntity(entity) {
    this.interactAbles.add(entity);
    this.distanceInfo.set(entity, {
      leftHand: Infinity,
      rightHand: Infinity,
      isTouching: false,
    });
  },
  removeEntity(entity) {
    this.interactAbles.remove(entity);
    this.distanceInfo.delete(entity);
  },

  addHand(entity, hand = 'left') {
    if (hand === 'left') {
      this.hand.left = entity;
    } else if (hand === 'right') {
      this.hand.right = entity;
    }
  },
  removeHand(entity, hand = 'left') {
    if (hand === 'left') {
      this.hand.left = null;
    } else if (hand === 'right') {
      this.hand.right = null;
    }
  },
});
