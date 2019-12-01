
AFRAME.registerComponent('animation-control', {
  schema: {
    actionName: { default: 'Idle' },
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
  update() {
    // console.log('animation-control.update', this.data, oldData);
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
        // only respond to 'mesh' changes
        if (event.detail.type !== 'mesh') { return; }
        // update mixer with the new mesh
        this.updateMixer(event.detail.object);
        break;
      default:
        console.warn(`Unhandled event type: ${event.type}`, event); // eslint-disable-line
    }
  },


  // Update the Mixer with a new Root Object
  updateMixer(rootObj) {
    const { animations } = rootObj;
    const { actionName } = this.data;

    // Update the mixer to use the new root object.
    this.mixer = new THREE.AnimationMixer(rootObj);

    // get and play the named action
    const clip = THREE.AnimationClip.findByName(animations, actionName);
    this.action = this.mixer.clipAction(clip);
    this.action.play();
  },
});
