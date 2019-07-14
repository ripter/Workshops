
AFRAME.registerComponent('player-hand', {
  // schema: {
  // },

  init() {
    console.log('player-hand init', arguments, this);

    this.el.addEventListener('collidestart', this.onCollideStart.bind(this));
    this.el.addEventListener('collideend', this.onCollideEnd.bind(this));
  },

  onCollideStart(event) {
    console.log('collidestart', event);
  },

  onCollideEnd(event) {
    console.log('collideend', event);
  },
});
