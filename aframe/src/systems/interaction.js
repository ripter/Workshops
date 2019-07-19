
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

      // Loop over each hand & interactAble entity.
      // Updates the distanceInfo for each entity.
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
      // Emit events based on changes to distanceInfo and user input.
      this.interactAbles.forEach((entity) => {
        const distance = this.distanceInfo.get(entity);
        const closestHand = distance.leftHand < distance.rightHand ? this.hand.left : this.hand.right;
        const closestDistance = Math.min(distance.leftHand, distance.rightHand);
        const minRadius = entity.components.interaction.getMinRadius();
        // const isHandGripped = AFRAME.utils.entity.getComponentProperty(closestHand, 'player-hand.isGrip');
        const eventData = {
          hand: closestHand,
          distance: closestDistance,
          data: distance,
        };

        // console.log('isHandGripped', isHandGripped);

        // Are we in touching distance?
        if (closestDistance <= minRadius) {
          // Did we move into range; after being out of range?
          if (!distance.isTouching) {
            distance.isTouching = true;
            entity.emit('handenter', eventData);
          }
          // Is this a grip action?
        }
        // We are not in touching distance.
        else {
          // Did we move out of range? (After being in range)
          if (distance.isTouching) {
            distance.isTouching = false;
            entity.emit('handleave', eventData);
          }
        }
      });
    }
  })(),


  /**
   * Adds an interactable entity to the system.
   * Entity will start getting Interaction Events.
   * @param {AEntity} entity
   */
  addEntity(entity) {
    this.interactAbles.add(entity);
    this.distanceInfo.set(entity, {
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
    this.interactAbles.remove(entity);
    this.distanceInfo.delete(entity);
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
