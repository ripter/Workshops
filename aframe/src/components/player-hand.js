
AFRAME.registerComponent('player-hand', {
  // schema: {
  // },

  init() {
    this.el.addEventListener('collidestart', this.onCollideStart.bind(this));
    this.el.addEventListener('collideend', this.onCollideEnd.bind(this));
  },

  onCollideStart(event) {
    console.log('player-hand collidestart', event);
  },

  onCollideEnd(event) {
    console.log('player-hand collideend', event);
  },
});
