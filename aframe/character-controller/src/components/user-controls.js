/**
 * User Controls for the demo
 */
AFRAME.registerComponent('user-controls', {
  schema: {
    speed: { default: 0.05 },
  },

  /**
   * Init handler. Similar to attachedCallback.
   * Called during component initialization and is only run once.
   * Components can use this to set initial state.
   */
  init() {
    this.velocity = { x: 0, z: 0 };
    this.rotate = { y: 0 };
  },

  /**
   * Tick handler.
   * Called on each tick of the scene render loop.
   * Affected by play and pause.
   *
   * @param {number} time - Scene tick time.
   * @param {number} timeDelta - Difference in current render time and previous render time.
   */
  tick() {
    // Move the model based on velocity.
    const { el, velocity, rotate } = this;

    // Match rotation
    el.object3D.rotateY(rotate.y);

    // use translate to move the object along it's local axis
    el.object3D.translateX(velocity.x);
    el.object3D.translateZ(velocity.z);

    // if we have velocity, play the walking animation, else use the Idle
    if (velocity.x === 0 && velocity.z === 0) {
      el.setAttribute('anim-mixer', 'clipName: Idle;');
    } else {
      el.setAttribute('anim-mixer', 'clipName: Walk;');
    }
  },

  /**
   * Called to start any dynamic behavior (e.g., animation, AI, events, physics).
   */
  play() {
    window.addEventListener('keyup', this);
    window.addEventListener('keydown', this);
  },

  /**
   * Called to stop any dynamic behavior (e.g., animation, AI, events, physics).
   */
  pause() {
    window.removeEventListener('keyup', this);
    window.removeEventListener('keydown', this);
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
        this.handleKey(event.code, true);
        break;
      case 'keydown':
        this.handleKey(event.code, false);
        break;
      default:
        console.warn(`Unhandled event type: ${event.type}`, event); // eslint-disable-line
    }
  },


  /**
   * Converts Keys into state velocity/rotate values to use during tick.
   * @param {string} keyCode - https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code
   * @param {bool} isKeyUp - true if called by keyup event.
  */
  handleKey(keyCode, isKeyUp) {
    const { speed } = this.data;

    switch (keyCode) {
      case 'ArrowUp':
      case 'KeyW':
        this.velocity.z = isKeyUp ? 0 : speed;
        break;
      case 'ArrowDown':
      case 'KeyS':
        this.velocity.z = isKeyUp ? 0 : -speed;
        break;
      case 'KeyA':
        this.velocity.x = isKeyUp ? 0 : -speed;
        break;
      case 'KeyD':
        this.velocity.x = isKeyUp ? 0 : speed;
        break;
      case 'ArrowLeft':
      case 'KeyQ':
        this.rotate.y = isKeyUp ? 0 : speed;
        break;
      case 'ArrowRight':
      case 'KeyE':
        this.rotate.y = isKeyUp ? 0 : -speed;
        break;
      default:
        // ignore other keys.
    }
  },

});
