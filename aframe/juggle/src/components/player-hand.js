
AFRAME.registerComponent('player-hand', {
  dependencies: ['hand-controls'],
  schema: {
    isGrip: { type: 'bool', default: false },
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
    // Question: this feels weird since we are player-hand, but it does trigger the update()
    this.el.setAttribute('player-hand', {
      isGrip: true,
    });

    const entityToGrab = system.getClosestEntity(this.handType);
    if (entityToGrab) {
      this.el.setAttribute('ammo-constraint', `target: #${entityToGrab.id};`);
    }
  },
  ongripup(event) {
    // Question: this feels weird since we are player-hand, but it does trigger the update()
    this.el.setAttribute('player-hand', {
      isGrip: false,
    });
    // this.data.isGrip = false;
    // console.log('player-hand gripdown', event);
    this.el.removeAttribute('ammo-constraint');
  },
});
