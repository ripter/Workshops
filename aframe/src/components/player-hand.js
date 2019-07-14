
AFRAME.registerComponent('player-hand', {
  schema: {
    isGrip: {type: 'bool', default: false},
  },

  init() {
    this.el.addEventListener('collidestart', this.onCollideStart.bind(this));
    this.el.addEventListener('collideend', this.onCollideEnd.bind(this));
    this.el.addEventListener('gripdown', this.onGripDown.bind(this));
    this.el.addEventListener('gripup', this.onGripUp.bind(this));
  },

  onCollideStart(event) {
    // console.log('player-hand collidestart', event);
  },

  onCollideEnd(event) {
    // console.log('player-hand collideend', event);
  },

  onGripDown(event) {
    this.data.isGrip = true;
    // console.log('player-hand gripdown', event);
  },
  onGripUp(event) {
    this.data.isGrip = false;
    // console.log('player-hand gripdown', event);
  },
});
