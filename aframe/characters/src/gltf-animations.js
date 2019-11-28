// gltf-animations

AFRAME.registerComponent('gltf-animations', {
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
    // if (!this.model) { return; }
    // this.el.removeObject3D('mesh');
    // this.model = null;
  },

  /**
   * Called when a model is loaded.
   */
  onLoad(model) {
    const { el } = this;

    this.model = model.scene || model.scenes[0];
    this.model.animations = model.animations;

    console.log('animations', model.animations);
    // const mesh = this.getMesh(this.model);
    // el.setObject3D('mesh', mesh);
    // el.emit('model-loaded', { format: 'gltf', model: this.model });
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
});
