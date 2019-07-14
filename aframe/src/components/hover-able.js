
/**
 * Marks the object as something player-hands can grab and pick up.
 */
AFRAME.registerComponent('hover-able', {
  // schema: {
  // },

  init() {
    // AFRAME.utils.entity.setComponentProperty(this.el, 'ammo-body.disableCollision', true);
    this.el.addEventListener('collidestart', this.onCollideStart.bind(this));
    this.el.addEventListener('collideend', this.onCollideEnd.bind(this));
  },

  onCollideStart(event) {
    const { targetEl } = event.detail;
    const hand = targetEl.components['player-hand'];
    if (!hand) { return; }
    const shouldRespondWithPhysics = hand.data.isGrip;

    // console.log('hover-able collidestart', hand.data, targetEl);
    if (!shouldRespondWithPhysics) {
      // this.el.setAttribute('ammo-body', {'disableCollision': true});
      // this.el.setAttribute('ammo-body', 'disableCollision', true);
      // AFRAME.utils.entity.setComponentProperty(this.el, 'ammo-body.disableCollision', true);
      // console.log('disable physics', this.el.getAttribute('ammo-body'));
      // const body = this.el.components['ammo-body'];
      // console.log('body', body);
      // body.data.disableCollision = true;
    }

  },

  onCollideEnd(event) {
    const { targetEl } = event.detail;
    // console.log('hover-able collideend', event);
  },
});
