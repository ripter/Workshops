// gltf-animations

AFRAME.registerComponent('gltf-animations', {
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
   * Called on each tick or frame of the scene’s render loop.
   * @param  {[type]} time      [description]
   * @param  {[type]} timeDelta [description]
   * @return {[type]}           [description]
   */
  tick(time, timeDelta) {
    if (this.mixer) {
      const deltaInSeconds = timeDelta / 1000;
      this.mixer.update(deltaInSeconds);
    }
  },

  /**
  * Called whenever the component is detached from the entity.
  */
  remove() {
    // if (!this.model) { return; }
    // this.el.removeObject3D('mesh');
    // this.model = null;

    delete this.animations;
    delete this.mixer;
  },

  /**
   * Called when a model is loaded.
   */
  onLoad(model) {
    const { el } = this;
    const animations = this.animations = model.animations;
    const mesh = el.getObject3D('mesh');
    const mixer = this.mixer = new THREE.AnimationMixer(mesh);

    // Play a specific animation
    const clip = THREE.AnimationClip.findByName(animations, 'Idle');
    const action = mixer.clipAction(clip);
    action.play();
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
