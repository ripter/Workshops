/**
 * Patched version of gltf-model that sets 'mesh' to the SkinnedMesh or root object.
 */
AFRAME.registerComponent('gltf-model-2', {
  schema: { type: 'asset' },

  /**
   * Called once at the beginning of the component’s lifecycle.
   */
  init() {
    const dracoLoader = this.el.sceneEl.systems['gltf-model'].getDRACOLoader();
    this.loader = new THREE.GLTFLoader();
    if (dracoLoader) {
      this.loader.setDRACOLoader(dracoLoader);
    }
  },

  /**
   * Called whenever the component’s properties change, including at the beginning of the component’s lifecycle.
   */
  update(oldSrc) {
    const src = this.data;

    // remove the old version when the source changes.
    if (src !== oldSrc) {
      this.remove();
    }

    // abort if there is no model to load.
    if (!src) { return; }

    // Load the model.
    this.loader.load(
      src,
      this.onLoad.bind(this),
      this.onProgress.bind(this),
      this.onError.bind(this),
    );
  },

  /**
   * Called whenever the component is detached from the entity.
   */
  remove() {
    if (!this.model) { return; }
    this.el.removeObject3D('mesh');
    this.model = null;
  },

  /**
   * Called when a model is loaded.
   */
  onLoad(model) {
    const { el } = this;

    this.model = model.scene || model.scenes[0];
    this.model.animations = model.animations;

    const mesh = this.getMesh(this.model);
    // console.log('mesh', mesh);
    // console.log('material', mesh.material);
    // this.model.material = mesh.material;
    // this.model.material = mesh.material;
    // this.model.material.needsUpdate = true;
    // console.group('onLoad');
    // console.log('src', this.data);
    // console.log('mesh', mesh);
    // console.log('model', model);
    // console.groupEnd();
    el.setObject3D('mesh', mesh);
    // el.setObject3D('mesh', this.model);
    el.emit('model-loaded', { format: 'gltf', model: this.model });
  },

  /**
   * Called when model fails to load.
   */
  onError(error) {
    const { el, data: src } = this;
    const message = (error && error.message) ? error.message : 'Failed to load glTF model';
    el.emit('model-error', { format: 'gltf', src });
    throw new Error(message);
  },

  /**
   * Called while the model is loading.
   */
  onProgress() {
    // do nothing
  },

  /**
   * Find the Mesh in the model
   */
  getMesh(model) {
    // return model;
    // Attempt to get a SkinnedMesh with bones
    mesh = model.getObjectByProperty('type', 'SkinnedMesh');
    if (mesh) {
      // console.group('SkinnedMesh');
      // console.log(this.data);
      // console.log('model', this.model);
      // console.log('mesh', mesh);
      // console.groupEnd();
      return mesh;
    }
    // default to the root
    return model;
  },
});
