(function () {
  'use strict';

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

  AFRAME.registerComponent('interaction', {
    schema: {
      fit: { default: 'auto', oneOf: ['auto', 'manual'] },
      minRadius: {default: 0.001},
    },

    init() {
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
      name: {type: 'string', default: 'Rose'},
    },

    init() {
      // Register as a hand in the interaction system
      this.system = this.el.sceneEl.systems.interaction;
      this.system.addHand(this.el, this.el.components['hand-controls'].data);

      this.el.addEventListener('collidestart', this);
      this.el.addEventListener('collideend', this);
      this.el.addEventListener('gripdown', this.onGripDown.bind(this));
      this.el.addEventListener('gripup', this.onGripUp.bind(this));
      this.el.addEventListener('handenter', this);
    },

    handleEvent(event) {
      // console.log('player-hand.handleEvent', event.type, event, this);
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

    onGripDown(event) {
      //Question: this feels weird since we are player-hand, but it does trigger the update()
      this.el.setAttribute('player-hand', {
        isGrip: true,
      });
      //         ammo-constraint="target: #gripMe;"
      // this.data.isGrip = true;
      // console.log('player-hand gripdown', event);
    },
    onGripUp(event) {
      //Question: this feels weird since we are player-hand, but it does trigger the update()
      this.el.setAttribute('player-hand', {
        isGrip: false,
      });
      // this.data.isGrip = false;
      // console.log('player-hand gripdown', event);
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
      this.el.addEventListener('handenter', this);
      this.el.addEventListener('handleave', this);
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
          AFRAME.utils.entity.setComponentProperty(this.el, 'material.opacity', 1.0);
          break;
        default:
          throw new Error(`hover-able does not have a case for event "${event.type}"`);
      }
    },

    grabStart(hand) {
      const isHandGripped = AFRAME.utils.entity.getComponentProperty(hand, 'player-hand.isGrip');
      console.log('isHandGripped', isHandGripped);
      if (!isHandGripped) { return; }

      console.log('GRIP!', hand);
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
