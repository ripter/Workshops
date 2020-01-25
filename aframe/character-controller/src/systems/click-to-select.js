/**
 * Click-to-Select allows toggling of the 'selected' entity.
 */
AFRAME.registerSystem('click-to-select', {
  /**
   * Init handler. Called during scene initialization and is only run once.
   * Systems can use this to set initial state.
   */
  init() {
    this.selected = null;
  },

  /**
   * Sets user-controls on the entity and removes it from the previous entity.
   */
  select(entity) {
    const { selected } = this;

    if (selected) {
      selected.removeAttribute('user-controls');
    }

    this.selected = entity;
    this.selected.setAttribute('user-controls', '');
  },
});
