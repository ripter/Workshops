
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
