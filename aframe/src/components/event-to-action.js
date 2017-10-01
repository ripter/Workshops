import dispatchAction from '../utils/dispatchAction.js';

AFRAME.registerComponent('event-to-action', {
  schema: {
    events: {default: ['click']},
    actions: {default: []},
  },

  /**
   * Called once at the beginning of the component’s lifecycle
   * reference: https://aframe.io/docs/0.6.0/core/component.html#init
   */
  init() {
    const { el } = this;
    const { events } = this.data;

    events.forEach((eventName) => {
      el.addEventListener(eventName, this);
    });
  },
  /**
   * Called whenever the component is detached from the entity
   * reference: https://aframe.io/docs/0.6.0/core/component.html#remove
   */
  remove() {
    const { el } = this;
    const { events } = this.data;

    events.forEach((eventName) => {
      el.removeEventListener(eventName, this);
    });
  },

  handleEvent(event) {
    const { actions } = this.data;

    // Translate the event into an action
    actions.forEach((actionType) => {
      dispatchAction({
        type: actionType,
      });
    });
  }
});
