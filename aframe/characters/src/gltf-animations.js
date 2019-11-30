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

    this.clock = new THREE.Clock();
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
   * Called on each tick or frame of the scene’s render loop.
   * @param  {[type]} time      [description]
   * @param  {[type]} timeDelta [description]
   * @return {[type]}           [description]
   */
  tick (time, timeDelta) {
    if (this.mixer) {
      const deltaInSeconds = this.clock.getDelta();
      // const deltaInSeconds = timeDelta / 1000;
      // console.log({deltaInSeconds});
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
    // const clip = mixer.clipAction(animations[1]);

    // Play a specific animation
    const clip = THREE.AnimationClip.findByName( animations, 'Idle' );
    const action = mixer.clipAction( clip );

    // console.group('onLoad animation');
    // console.log('animations', model.animations);
    // console.log('mesh', mesh);
    // console.log('action', action);
    // console.log('clip', clip);
    // console.groupEnd();
    action.play();

    // new THREE.AnimationMixer( mesh );

    // const clips = THREE.AnimationClip.parseJSON(animations);
    // console.log('clips', clips);
    // this.model = model.scene || model.scenes[0];
    // this.model.animations = model.animations;

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
