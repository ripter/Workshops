/**
 * Active Camera Component.
 * @type {Object}
 */
AFRAME.registerComponent('active-camera', {
  schema: {type: 'string'},

  /**
   * Called once at the beginning of the component’s lifecycle
   * reference: https://aframe.io/docs/0.6.0/core/component.html#init
   */
  init() {
    const { el } = this;
    document.addEventListener('store-change', this);
  },
  /**
   * Called whenever the component is detached from the entity
   * reference: https://aframe.io/docs/0.6.0/core/component.html#remove
   */
  remove() {
    const { el } = this;
    document.removeEventListeneter('store-change', this);
  },

  handleEvent(event) {
    if (event.type !== 'store-change') { return; }
    const { activeCamera } = event.detail;
    const cameraName = this.data;
    const { el } = this;

    // When the store changes,
    // Update the camera's active state
    // This allows us to switch between cameras
    if (cameraName === activeCamera) {
      el.setAttribute('active', true);
    }
    else {
      el.setAttribute('active', false);
    }
  },

});
