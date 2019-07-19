/**
 * Marks the object as something player-hands can grab and pick up.
 */
AFRAME.registerComponent('hover-able', {
  // schema: {
  // },

  init() {
    // Use physics collision events.
    // this.el.addEventListener('collidestart', this)
    // this.el.addEventListener('collideend', this)

    // Use Interaction system events.
    this.el.addEventListener('handenter', this)
    this.el.addEventListener('handleave', this)
  },

  handleEvent(event) {
    // console.log('hover-able handleEvent', event.type, event, this);
    switch (event.type) {
      case 'collidestart':
      case 'handenter':
        AFRAME.utils.entity.setComponentProperty(this.el, 'material.opacity', 0.5);
        break;
      case 'collideend':
      case 'handleave':
        AFRAME.utils.entity.setComponentProperty(this.el, 'material.opacity', 1.0);
        break;
      default:
        throw new Error(`hover-able does not have a case for event "${event.type}"`);
    }
  },
});
