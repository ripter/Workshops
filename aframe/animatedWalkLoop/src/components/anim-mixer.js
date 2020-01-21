/**
 * Plays animations on the model.
 * Refrences 'mesh' and 'animRoot' objects.
 */
AFRAME.registerComponent('anim-mixer', {
  schema: {
    clipName: { default: 'Idle' },
  },

  /**
   * Init handler. Similar to attachedCallback.
   * Called during component initialization and is only run once.
   * Components can use this to set initial state.
   */
  init() {
    this.mixer = null; // https://threejs.org/docs/index.html#api/en/animation/AnimationMixer
    this.action = null; // https://threejs.org/docs/index.html#api/en/animation/AnimationAction

    // listen to changes on the refrence objects like 'mesh'
    this.el.addEventListener('object3dset', this);
  },

  /**
   * Update handler. Similar to attributeChangedCallback.
   * Called whenever component's data changes.
   * Also called on component initialization when the component receives initial data.
   *
   * @param {object} prevData - Previous attributes of the component.
   */
  update(prevData) {
    const { clipName } = this.data;

    if (clipName && clipName !== '' && clipName !== prevData.clipName) {
      this.playClip();
    }
  },

  /**
   * Tick handler.
   * Called on each tick of the scene render loop.
   * Affected by play and pause.
   *
   * @param {number} time - Scene tick time.
   * @param {number} timeDelta - Difference in current render time and previous render time.
   */
  tick(time, timeDelta) {
    const deltaInSeconds = timeDelta / 1000;

    if (this.mixer) {
      this.mixer.update(deltaInSeconds);
    }
  },

  /**
   * Remove handler. Similar to detachedCallback.
   * Called whenever component is removed from the entity (i.e., removeAttribute).
   * Components can use this to reset behavior on the entity.
   */
  remove() {
    delete this.mixer;
    delete this.action;
  },


  /**
   * Called when a listening event is observed.
   * @param  {Event} event the event that has been fired and needs to be processed.
   * @return {undefined}
   */
  handleEvent(event) {
    switch (event.type) {
      case 'object3dset':
        this.updateMixer();
        break;
      default:
        console.warn(`Unhandled event type: ${event.type}`, event); // eslint-disable-line
    }
  },


  // Update the Mixer with a new Root Object
  updateMixer() {
    const { clipName } = this.data;
    const armature = this.el.getObject3D('armature');
    const mesh = this.el.getObject3D('mesh');
    // Bail if we are missing anything.
    if (!armature || !clipName || clipName === '') { return; }

    // Create the mixer to use the new armature.
    this.mixer = new THREE.AnimationMixer(armature);

    // Tell the mesh to allow animations.
    mesh.material.skinning = true;
    mesh.material.needsUpdate = true;

    // get and play the named action
    this.playClip();
  },

  playClip() {
    const { clipName } = this.data;
    const armature = this.el.getObject3D('armature');
    // Bail if we are missing anything.
    if (!armature || !clipName || clipName === '') { return; }
    const clip = THREE.AnimationClip.findByName(armature.animations, clipName);
    const prevAction = this.action;

    if (!clip) { throw new Error(`Clip "${clipName}" was not found in the animations array.\nCheck for misspellings in the clipName, or missing animations in the model file.`);}

    // Set the new action
    this.action = this.mixer.clipAction(clip);

    if (prevAction) {
      prevAction.stop();
    }
    this.action.play();
  },
});
