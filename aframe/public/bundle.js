(function () {
  'use strict';

  AFRAME.registerComponent('player-hand', {
    schema: {
      isGrip: {type: 'bool', default: false},
      name: {type: 'string', default: 'Rose'},
    },

    init() {
      this.el.addEventListener('collidestart', this.onCollideStart.bind(this));
      this.el.addEventListener('collideend', this.onCollideEnd.bind(this));
      this.el.addEventListener('gripdown', this.onGripDown.bind(this));
      this.el.addEventListener('gripup', this.onGripUp.bind(this));
    },



    update(oldData) {
      console.log('player-hand update', this.data);
      // Did isGrip change?
      if (this.data.isGrip !== oldData.isGrip) {
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
      // AFRAME.utils.entity.setComponentProperty(this.el, 'ammo-body.disableCollision', true);
      this.el.addEventListener('collidestart', this.onCollideStart.bind(this));
      this.el.addEventListener('collideend', this.onCollideEnd.bind(this));
    },

    onCollideStart(event) {
      const { targetEl } = event.detail;
      const hand = targetEl.components['player-hand'];
      if (!hand) { return; }
      const shouldRespondWithPhysics = hand.data.isGrip;

    },

    onCollideEnd(event) {
      const { targetEl } = event.detail;
      // console.log('hover-able collideend', event);
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
