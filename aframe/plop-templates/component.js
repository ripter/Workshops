import eventToMethod from '../utils/eventToMethod.js';

AFRAME.registerComponent('{{kebabCase tagName}}', eventToMethod({
  schema: {
  },

  /**
   * Called once at the beginning of the component’s lifecycle
   * reference: https://aframe.io/docs/0.6.0/core/component.html#init
   */
  init() {
    const { el } = this;
  },
  /**
   * Called whenever the component is detached from the entity
   * reference: https://aframe.io/docs/0.6.0/core/component.html#remove
   */
  remove() {
    const { el } = this;
  },

  update() {},
  /**
   * Called on each tick or frame of the scene’s render loop (60 to 120 times per second).
   * reference: https://aframe.io/docs/0.6.0/core/component.html#tick-time-timedelta
   * @param  {Number} time  Global uptime of the scene in milliseconds.
   * @param  {Number} delta The time difference in milliseconds since the last frame.
   */
  tick: function (time, delta) {
  },
  pause: function () {},
  play: function () {},
}));
