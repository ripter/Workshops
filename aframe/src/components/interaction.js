

AFRAME.registerComponent('interaction', {
  schema: {
    fit: { default: 'auto', oneOf: ['auto', 'manual'] },
    minRadius: {default: 0.1},
  },

  init() {
    console.log('component init', this.el, this);
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


  getGeometryRadius(entity) {
    const mesh = entity.getObject3D('mesh');
    const { geometry } = mesh;

    // if we have a boundingSphere, use it's radius
    if (geometry.boundingSphere) {
      return geometry.boundingSphere.radius / 4; //TODO: get something better than this magic number
    }
  },
});
