/**
 * User Controls for the demo
 */
AFRAME.registerComponent('user-controls', {
  // schema: {
    // clipName: { default: 'Idle' },
  // },

  /**
   * Init handler. Similar to attachedCallback.
   * Called during component initialization and is only run once.
   * Components can use this to set initial state.
   */
  init() {
  },

  /**
   * Update handler. Similar to attributeChangedCallback.
   * Called whenever component's data changes.
   * Also called on component initialization when the component receives initial data.
   *
   * @param {object} prevData - Previous attributes of the component.
   */
  update(prevData) {
    console.log('user-controls', {...this.data});
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
  },

  /**
   * Called to start any dynamic behavior (e.g., animation, AI, events, physics).
   */
  play() {
    window.addEventListener('keyup', this);
  },

  /**
   * Called to stop any dynamic behavior (e.g., animation, AI, events, physics).
   */
   pause() {
    window.removeEventListener('keyup', this);
   },


  /**
   * Remove handler. Similar to detachedCallback.
   * Called whenever component is removed from the entity (i.e., removeAttribute).
   * Components can use this to reset behavior on the entity.
   */
  remove() {
  },


  /**
   * DOM Event handler.
   * Called when a listening event is observed.
   * @param  {Event} event the event that has been fired and needs to be processed.
   * @return {undefined}
   */
  handleEvent(event) {
    switch (event.type) {
      case 'keyup':
        this.handleKey(event.code);
        break;
      default:
        console.warn(`Unhandled event type: ${event.type}`, event); // eslint-disable-line
    }
  },


  /**
   * @param {string} keyCode - https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code
  */
  handleKey(keyCode) {
    switch (keyCode) {
      case 'KeyW':
        this.moveBackward();
        break;
      case 'KeyS':
        this.moveForward();
        break;
      case 'KeyA':
        this.moveLeft();
        break;
      case 'KeyD':
        this.moveRight();
        break;
      default:
        // ignore other keys.
    }
  },

  moveLeft() {
    const { el } = this;
    el.object3D.translateX(-5);
    el.setAttribute('anim-mixer', 'clipName: Walk;');
  },

  moveRight() {
    const { el } = this;
    el.object3D.translateX(5);
    el.setAttribute('anim-mixer', 'clipName: Idle;');
  },

  moveForward() {
    const { el } = this;
    el.setAttribute('anim-mixer', 'clipName: Walk;');
  },

  moveBackward() {
    const { el } = this;
    el.setAttribute('anim-mixer', 'clipName: Idle;');
  },
});
