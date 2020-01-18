
AFRAME.registerComponent('interaction', {
  schema: {
    fit: { default: 'auto', oneOf: ['auto', 'manual'] },
    minRadius: { default: 0.001 },
  },

  init() {
    // interactions require IDS, so make sure this entity has one.
    this.el.id = this.el.id || `uid${Date.now()}`;
    // Skip trying to figure out the radius on a manual fit.
    if (this.data.fit === 'manual') {
      this.setMinRadius(this.data.minRadius);
    }
  },

  play() {
    // Register the entity in the system so it can receive events.
    if (!this.system) { throw new Error('interaction System not found.'); }
    this.system.addEntity(this.el);
  },
  pause() {
    // Remove the entity so the system will stop tracking it.
    this.system.removeEntity(this.el);
  },

  /**
   * Returns the minimum radius to use when detecting interactions.
   * @return {[type]} [description]
   */
  getMinRadius() {
    // geometry can take some time to load, so delay fetching until required
    if (!this._minRadius) {
      this._minRadius = this.getGeometryRadius(this.el);
    }

    return this._minRadius;
  },
  setMinRadius(value) {
    this._minRadius = value;
  },

  // POC: utility function to get the radius to use for interactions based on the mesh.
  getGeometryRadius(entity) {
    const mesh = entity.getObject3D('mesh');
    const { geometry } = mesh;

    // if we have a boundingSphere, use it's radius
    if (geometry.boundingSphere) {
      return geometry.boundingSphere.radius / 4; // TODO: get something better than this magic number
    }
  },
});
