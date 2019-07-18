/**
 * Marks the object as something player-hands can grab and pick up.
 */
AFRAME.registerComponent('hover-able', {
  // schema: {
  // },

  init() {
    this.el.addEventListener('handenter', (event) => {
      AFRAME.utils.entity.setComponentProperty(this.el, 'material.opacity', 0.5);
    });
    this.el.addEventListener('handleave', (event) => {
      AFRAME.utils.entity.setComponentProperty(this.el, 'material.opacity', 1.0);
    });
  },
});
