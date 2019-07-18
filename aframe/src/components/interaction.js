

AFRAME.registerComponent('interaction', {
  schema: {
    minRadius: {default: 0.1},
  },

  init() {
    const { system } = this;

    // Register the entity in the system so it can receive events.
    if (!system) { throw new Error('interaction System not found.'); }
    system.addEntity(this.el);
  },

  remove() {
    // Remove the entity so the system will stop tracking it.
    this.system.removeEntity(this.el);
  },
});
