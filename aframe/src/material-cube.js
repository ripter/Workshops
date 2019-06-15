/**
 * Material that takes six textures, one for each side fo the cube.
 * @type {Object}
 */
AFRAME.registerComponent('material-cube', {
  schema: {
    top: {type: 'map'},
    bottom: {type: 'map'},
    front: {type: 'map'},
    back: {type: 'map'},
    left: {type: 'map'},
    right: {type: 'map'},
  },

  init() {
    // Use the standard material system.
    this.system = this.el.sceneEl.systems.material;
    this.loadMaterial();
  },

  loadMaterial() {
    const { el, system } = this;
    const { top, bottom, front, back, left, right } = this.data;
    const mesh = el.getObject3D('mesh');
    if (!mesh) { throw new Error('No Mesh!'); }

    // Load all the textures before updating the materials
    Promise.all([
      loadTexture(system, right),
      loadTexture(system, left),
      loadTexture(system, top),
      loadTexture(system, bottom),
      loadTexture(system, front),
      loadTexture(system, back),
    ]).then((textures) => {
      for (let i=0; i < textures.length; i++) {
        mesh.material[i].map = textures[i];
      }
    }).catch((err) => {
      console.error(err);
    });

    // Setup default blank materials while we load the textures
    mesh.material = Array(6).fill().map(() => new THREE.MeshPhongMaterial({}));
  },

});

// Wrapper to return Promise from system.loadImage
function loadTexture(system, src, data = {}) {
  if (!data.src) {
    data.src = src;
  }
  return new Promise((resolve, reject) => {
    system.loadImage(src, data, (texture) => {
      resolve(texture);
    });
  });
}
