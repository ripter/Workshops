(function () {
  'use strict';

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

  AFRAME.registerComponent('interaction', {
    schema: {
      fit: { default: 'auto', oneOf: ['auto', 'manual'] },
      minRadius: {default: 0.001},
    },

    init() {
      // interactions require IDS, so make sure this entity has one.
      this.el.id = this.el.id || 'uid' + Date.now();
      // Skip trying to figure out the radius on a manual fit.
      if (this.data.fit === 'manual') {
        this.setMinRadius(this.data.minRadius);
      }
    },

    play() {
      // Register the entity in the system so it can receive events.
      if (!this.system) { throw new Error('interaction System not found.'); }
      this.system.addEntity(this.el);
    },
    pause() {
      // Remove the entity so the system will stop tracking it.
      this.system.removeEntity(this.el);
    },

    /**
     * Returns the minimum radius to use when detecting interactions.
     * @return {[type]} [description]
     */
    getMinRadius() {
      // geometry can take some time to load, so delay fetching until required
      if (!this._minRadius) {
        this._minRadius = this.getGeometryRadius(this.el);
      }

      return this._minRadius;
    },
    setMinRadius(value) {
      this._minRadius = value;
    },

    //POC: utility function to get the radius to use for interactions based on the mesh.
    getGeometryRadius(entity) {
      const mesh = entity.getObject3D('mesh');
      const { geometry } = mesh;

      // if we have a boundingSphere, use it's radius
      if (geometry.boundingSphere) {
        return geometry.boundingSphere.radius / 4; //TODO: get something better than this magic number
      }
    },
  });

  AFRAME.registerComponent('player-hand', {
    dependencies: ['hand-controls'],
    schema: {
      isGrip: {type: 'bool', default: false},
    },

    init() {
      // Register as a hand in the interaction system
      this.system = this.el.sceneEl.systems.interaction;
      this.handType = this.el.components['hand-controls'].data;
      this.system.addHand(this.el, this.handType);

      // this.el.addEventListener('collidestart', this)
      // this.el.addEventListener('collideend', this)
      this.el.addEventListener('gripdown', this);
      this.el.addEventListener('gripup', this);
      // this.el.addEventListener('handenter', this);
    },

    handleEvent(event) {
      // console.log('player-hand.handleEvent', event.type, event, this);
      this[`on${event.type}`](event);
    },

    remove() {
      // Remove the entity so the system will stop tracking it.
      this.system.removeHand(this.el);
    },

    update(oldData) {
      // console.log('player-hand update', this.data);
      // Did isGrip change?
      if (this.data.isGrip !== oldData.isGrip) {
        // Gripping activates physics and collisions
        this.el.setAttribute('ammo-body', {
          disableCollision: !this.data.isGrip,
        });
      }
    },

    onCollideStart(event) {
      // console.log('player-hand collidestart', event);
    },

    onCollideEnd(event) {
      // console.log('player-hand collideend', event);
    },

    ongripdown(event) {
      const { system } = this;
      //Question: this feels weird since we are player-hand, but it does trigger the update()
      this.el.setAttribute('player-hand', {
        isGrip: true,
      });

      const entityToGrab = system.getClosestEntity(this.handType);
      if (entityToGrab) {
        this.el.setAttribute('ammo-constraint', `target: #${entityToGrab.id};`);
      }
    },
    ongripup(event) {
      //Question: this feels weird since we are player-hand, but it does trigger the update()
      this.el.setAttribute('player-hand', {
        isGrip: false,
      });
      // this.data.isGrip = false;
      // console.log('player-hand gripdown', event);
      this.el.removeAttribute('ammo-constraint');
    },
  });

  /**
   * Marks the object as something player-hands can grab and pick up.
   */
  AFRAME.registerComponent('grab-able', {
    // schema: {
    // },

    init() {
      // Use physics collision events.
      // this.el.addEventListener('collidestart', this)
      // this.el.addEventListener('collideend', this)

      // Use Interaction system events.
      // this.el.addEventListener('handenter', this)
      // this.el.addEventListener('handleave', this)
    },

    handleEvent(event) {
      // console.log('hover-able handleEvent', event.type, event, this);
      switch (event.type) {
        case 'collidestart':
        case 'handenter':
          const { hand } = event.detail;
          console.log('handenter starting grabStart', event);
          this.grabStart(hand);
          // AFRAME.utils.entity.setComponentProperty(this.el, 'material.opacity', 0.5);
          break;
        case 'collideend':
        case 'handleave':
          // AFRAME.utils.entity.setComponentProperty(this.el, 'material.opacity', 1.0);
          break;
        default:
          throw new Error(`hover-able does not have a case for event "${event.type}"`);
      }
    },

    grabStart(hand) {
      const isHandGripped = AFRAME.utils.entity.getComponentProperty(hand, 'player-hand.isGrip');
      console.log('isHandGripped', isHandGripped);
      if (!isHandGripped) { return; }

      // Bind to the hand.
      hand.setAttribute('ammo-constraint', 'target: #gripMe;');
    },
  });

  /**
   * Marks the object as something player-hands can grab and pick up.
   */
  AFRAME.registerComponent('hover-able', {
    // schema: {
    // },

    init() {
      // Use physics collision events.
      // this.el.addEventListener('collidestart', this)
      // this.el.addEventListener('collideend', this)

      // Use Interaction system events.
      this.el.addEventListener('handenter', this);
      this.el.addEventListener('handleave', this);
    },

    handleEvent(event) {
      // console.log('hover-able handleEvent', event.type, event, this);
      switch (event.type) {
        case 'collidestart':
        case 'handenter':
          AFRAME.utils.entity.setComponentProperty(this.el, 'material.opacity', 0.5);
          break;
        case 'collideend':
        case 'handleave':
          AFRAME.utils.entity.setComponentProperty(this.el, 'material.opacity', 1.0);
          break;
        default:
          throw new Error(`hover-able does not have a case for event "${event.type}"`);
      }
    },
  });

  const _loadAt = (new Date()).toISOString();


  // import './systems/movement.js';
  // import './components/desktop-movement.js';
  // import './components/axis-movement.js';
  // import './components/clickable.js';
  // import './components/material-cube.js';
  // import './components/block-cursor.js';


  // import './elements/c-cube.js';

  // import './shader-phong.js';
  // eslint-disable-next-line no-console
  console.log('bundle.js loaded at', _loadAt);

}());
