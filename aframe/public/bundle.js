(function () {
  'use strict';

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

  AFRAME.registerComponent('interaction', {
    // schema: {
    // },

    init() {
      const { system } = this;

      if (!system) {
        throw new Error('interaction System not found.');
      }

      // Register the entity in the system so it can receive events.
      system.addEntity(this.el);
    },

    remove() {
      // Remove the entity so the system will stop tracking it.
      this.system.removeEntity(this.el);
    },
  });

  AFRAME.registerComponent('player-hand', {
    schema: {
      isGrip: {type: 'bool', default: false},
      name: {type: 'string', default: 'Rose'},
    },

    init() {
      this.system = this.el.sceneEl.systems.interaction;
      this.system.addHand(this.el);
      
      this.el.addEventListener('collidestart', this.onCollideStart.bind(this));
      this.el.addEventListener('collideend', this.onCollideEnd.bind(this));
      this.el.addEventListener('gripdown', this.onGripDown.bind(this));
      this.el.addEventListener('gripup', this.onGripUp.bind(this));
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
      this.el.addEventListener('collidestart', this.onCollideStart.bind(this));
      this.el.addEventListener('collideend', this.onCollideEnd.bind(this));
    },

    onCollideStart(event) {
      console.log('grab-able collidestart', event);
    },

    onCollideEnd(event) {
      console.log('grab-able collideend', event);
    },
  });

  /**
   * Marks the object as something player-hands can grab and pick up.
   */
  AFRAME.registerComponent('hover-able', {
    // schema: {
    // },

    init() {
      // this.hands = [];
      // this.extents = {x: 0, y: 0, z: 0};

      this.el.addEventListener('handenter', (event) => {
        AFRAME.utils.entity.setComponentProperty(this.el, 'material.opacity', 0.5);
      });
      this.el.addEventListener('handleave', (event) => {
        AFRAME.utils.entity.setComponentProperty(this.el, 'material.opacity', 1.0);
      });
    },

    _play() {
      this.hands = Array.from(document.querySelectorAll('#player [player-hand]'));
      const geometry = AFRAME.utils.entity.getComponentProperty(this.el, 'geometry');
      this.shapeDistance = geometry.depth / 2;
    },

    _tick: (function() {
      const myWorldPosition = new THREE.Vector3();
      const handWorldPosition = new THREE.Vector3();
      let isHovering = false;

      return function tick2() {
        isHovering = false;
        this.el.object3D.getWorldPosition(myWorldPosition);

        // Check each hand to see if it is close enough.
        for (let i=0; i < this.hands.length; i++) {
          const handObject3D = this.hands[i].object3D;
          handObject3D.getWorldPosition(handWorldPosition);

          const distance = myWorldPosition.distanceToSquared(handWorldPosition);
          if (distance <= this.shapeDistance) {
            isHovering = true;
          }
        }

        if (isHovering) {
          AFRAME.utils.entity.setComponentProperty(this.el, 'material.opacity', 0.5);
        }
        else {
          AFRAME.utils.entity.setComponentProperty(this.el, 'material.opacity', 1.0);
        }
      }
    })(),
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
