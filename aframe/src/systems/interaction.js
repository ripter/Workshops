
/**
 * Interaction System
 * Emits events based on Entity and Hand distance.
 */
AFRAME.registerSystem('interaction', {
  init() {
    this.interactAbles = new Map();
    this.hand = { left: null, right: null };
  },

  tick: (function() {
    const worldPositionEntity = new THREE.Vector3();
    const worldPositionLeftHand = new THREE.Vector3();
    const worldPositionRightHand = new THREE.Vector3();

    return function tick2() {
      const { hand } = this;
      // Get the world position for each hand so we can calulate distance.
      if (hand.left) { hand.left.object3D.getWorldPosition(worldPositionLeftHand); }
      if (hand.right) { hand.right.object3D.getWorldPosition(worldPositionRightHand); }

      // Loop over all the interactables and update the distances
      this.interactAbles.forEach((distanceInfo, entity) => {
          entity.object3D.getWorldPosition(worldPositionEntity);
          //
          // Update the distances
          if (hand.left) {
            distanceInfo.leftHand = worldPositionEntity.distanceToSquared(worldPositionLeftHand);
          }
          if (hand.right) {
            distanceInfo.rightHand = worldPositionEntity.distanceToSquared(worldPositionRightHand);
          }
          //
          // Check for touching/collision/intersections
          // Emit events on change
          const closestHand = distanceInfo.leftHand < distanceInfo.rightHand ? this.hand.left : this.hand.right;
          const closestDistance = distanceInfo.leftHand < distanceInfo.rightHand ? distanceInfo.leftHand : distanceInfo.rightHand;
          const minRadius = entity.components.interaction.getMinRadius();
          const eventData = {
            hand: closestHand,
            distance: closestDistance,
            data: distanceInfo,
          };

          // Are we in touching distance?
          if (closestDistance <= minRadius) {
            // Did we move into range; after being out of range?
            if (!distanceInfo.isTouching) {
              distanceInfo.isTouching = true;
              entity.emit('handenter', eventData);
            }
            // Is this a grip action?
          }
          // We are not in touching distance.
          else {
            // Did we move out of range? (After being in range)
            if (distanceInfo.isTouching) {
              distanceInfo.isTouching = false;
              entity.emit('handleave', eventData);
            }
          }
      });
    }
  })(),

  getClosestEntity(handType = 'left') {
    const hand = handType === 'left' ? this.hand.left : this.hand.right;
    let closestDistance = Infinity;
    let closestEntity = null;
    //Loop over all the interactAbles and return the one closest to the hand.
    this.interactAbles.forEach((distanceInfo, entity) => {
      // Skip entities not touching a hand.
      if (!distanceInfo.isTouching) { return; }
      const distance = handType === 'left' ? distanceInfo.leftHand : distanceInfo.rightHand;

      if (distance < closestDistance) {
        closestDistance = distance;
        closestEntity = entity;
      }
    });
    return closestEntity;
  },

  /**
   * Adds an interactable entity to the system.
   * Entity will start getting Interaction Events.
   * @param {AEntity} entity
   */
  addEntity(entity) {
    this.interactAbles.set(entity, {
      leftHand: Infinity,
      rightHand: Infinity,
      isTouching: false,
    });
  },
  /**
   * Removes an entity from the system.
   * Entity will no longer receive Interaction Events.
   * @param  {AEntity} entity
   */
  removeEntity(entity) {
    this.interactAbles.delete(entity);
  },


  /**
   * Adds Left/Right Hand to the system
   * @param {AEntity} entity
   * @param {String} [hand='left'] left or right
   */
  addHand(entity, hand = 'left') {
    if (hand === 'left') {
      this.hand.left = entity;
    } else if (hand === 'right') {
      this.hand.right = entity;
    }
  },
  /**
   * Removes Left/Right Hand to the system
   * @param {AEntity} entity
   * @param {String} [hand='left'] left or right
   */
  removeHand(entity, hand = 'left') {
    if (hand === 'left') {
      this.hand.left = null;
    } else if (hand === 'right') {
      this.hand.right = null;
    }
  },
});
