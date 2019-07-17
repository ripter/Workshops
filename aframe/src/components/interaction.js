

AFRAME.registerComponent('interaction', {
  // schema: {
  // },

  init() {
    const { system } = this;

    if (!system) {
      throw new Error('interaction System not found.');
    }

    // Register the entity in the system so it can receive events.
    system.addEntity(this.el);
  },

  remove() {
    // Remove the entity so the system will stop tracking it.
    this.system.removeEntity(this.el);
  },
});
