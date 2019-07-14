
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
