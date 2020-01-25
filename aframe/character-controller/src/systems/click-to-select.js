/**
 * Click-to-Select allows toggling of the 'selected' entity.
 */
AFRAME.registerSystem('click-to-select', {
 /**
   * Schema to configure system.
   */
  // schema: {},

  /**
   * Init handler. Called during scene initialization and is only run once.
   * Systems can use this to set initial state.
   */
  init() {
    this.selected = null;
    console.log('system click-to-select', this);
  },

  select(entity) {
    const { selected } = this;

    if (selected) {
      selected.removeAttribute('user-controls');
    }

    this.selected = entity;
    this.selected.setAttribute('user-controls', '');
  },


  /**
   * Update handler. Called during scene attribute updates.
   * Systems can use this to dynamically update their state.
   */
  // update: function (oldData) { /* no-op */ },

  /**
   * Tick handler.
   * Called on each tick of the scene render loop.
   * Affected by play and pause.
   *
   * @param {number} time - Scene tick time.
   * @param {number} timeDelta - Difference in current render time and previous render time.
   */
  // tick: undefined,

  /**
   * Tock handler.
   * Called on each tock of the scene render loop.
   * Affected by play and pause.
   *
   * @param {number} time - Scene tick time.
   * @param {number} timeDelta - Difference in current render time and previous render time.
   */
  // tock: undefined,

  /**
   * Called to start any dynamic behavior (e.g., animation, AI, events, physics).
   */
  // play: function () { /* no-op */ },

  /**
   * Called to stop any dynamic behavior (e.g., animation, AI, events, physics).
   */
  // pause: function () { /* no-op */ },

});
