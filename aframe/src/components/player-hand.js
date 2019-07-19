
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
    //         ammo-constraint="target: #gripMe;"
    // this.data.isGrip = true;
    // console.log('player-hand gripdown', event);
  },
  ongripup(event) {
    //Question: this feels weird since we are player-hand, but it does trigger the update()
    this.el.setAttribute('player-hand', {
      isGrip: false,
    });
    // this.data.isGrip = false;
    // console.log('player-hand gripdown', event);
  },
});
