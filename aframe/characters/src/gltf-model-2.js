/**
 * Patched version of gltf-model that sets 'mesh' to the SkinnedMesh or root object.
 */
AFRAME.registerComponent('gltf-model-2', {
  schema: { type: 'asset' },

  /**
   * Init handler. Similar to attachedCallback.
   * Called during component initialization and is only run once.
   * Components can use this to set initial state.
   */
  init() {
    const dracoLoader = this.el.sceneEl.systems['gltf-model'].getDRACOLoader();
    this.loader = new THREE.GLTFLoader();
    if (dracoLoader) {
      this.loader.setDRACOLoader(dracoLoader);
    }
  },

  /**
   * Update handler. Similar to attributeChangedCallback.
   * Called whenever component's data changes.
   * Also called on component initialization when the component receives initial data.
   *
   * @param {object} prevData - Previous attributes of the component.
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
   * Remove handler. Similar to detachedCallback.
   * Called whenever component is removed from the entity (i.e., removeAttribute).
   * Components can use this to reset behavior on the entity.
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

    const mesh = this.getMesh(this.model);
    console.log('mesh found', mesh);
    el.setObject3D('mesh', mesh);
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
    let mesh;
    // Look for a Skinned Mesh
    mesh = model.getObjectByProperty('type', 'SkinnedMesh');
    if (mesh) {
      return mesh;
    }

    // Look for a base Mesh
    mesh = model.getObjectByProperty('type', 'Mesh');
    if (mesh) {
      return mesh;
    }

    // default to the root
    return model;
  },
});
