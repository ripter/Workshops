import { getBoundingBox } from '../utils/getBoundingBox';
/**
 * Click-to-Select allows toggling of the 'selected' entity.
 */
AFRAME.registerSystem('click-to-select', {
  schema: {
    elmIndicator: { type: 'selector' },
    offsetY: { default: 0.5 },
  },
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
    const { elmIndicator, offsetY } = this.data;

    // Toggle the user-controls on only the selected entity
    if (selected) {
      selected.setAttribute('user-controls', 'enabled', false);
    }
    entity.setAttribute('user-controls', 'enabled', true);

    // Move the indicator as a child of entity.
    entity.object3D.add(elmIndicator.object3D);

    // Position it above the new entity
    const box = getBoundingBox(entity);
    elmIndicator.object3D.position.y = box.y + offsetY;

    // Set the entity as the new selected and return it
    return this.selected = entity;
  },
});
