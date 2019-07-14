
/**
 * Marks the object as something player-hands can grab and pick up.
 */
AFRAME.registerComponent('hover-able', {
  // schema: {
  // },

  init() {
    this.el.addEventListener('collidestart', this.onCollideStart.bind(this));
    this.el.addEventListener('collideend', this.onCollideEnd.bind(this));
  },

  onCollideStart(event) {
    const { targetEl } = event.detail;
    const hand = targetEl.components['player-hand'];
    if (!hand) { return; }
    
    console.log('hover-able collidestart', hand.data, targetEl);
  },

  onCollideEnd(event) {
    const { targetEl } = event.detail;
    console.log('hover-able collideend', event);
  },
});
