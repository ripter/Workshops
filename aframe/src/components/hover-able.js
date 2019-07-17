/**
 * Marks the object as something player-hands can grab and pick up.
 */
AFRAME.registerComponent('hover-able', {
  // schema: {
  // },

  init() {
    // this.hands = [];
    // this.extents = {x: 0, y: 0, z: 0};

    this.el.addEventListener('handenter', (event) => {
      AFRAME.utils.entity.setComponentProperty(this.el, 'material.opacity', 0.5);
    });
    this.el.addEventListener('handleave', (event) => {
      AFRAME.utils.entity.setComponentProperty(this.el, 'material.opacity', 1.0);
    });
  },

  _play() {
    this.hands = Array.from(document.querySelectorAll('#player [player-hand]'));
    const geometry = AFRAME.utils.entity.getComponentProperty(this.el, 'geometry');
    this.shapeDistance = geometry.depth / 2;
  },

  _tick: (function() {
    const myWorldPosition = new THREE.Vector3();
    const handWorldPosition = new THREE.Vector3();
    let isHovering = false;

    return function tick2() {
      isHovering = false;
      this.el.object3D.getWorldPosition(myWorldPosition);

      // Check each hand to see if it is close enough.
      for (let i=0; i < this.hands.length; i++) {
        const handObject3D = this.hands[i].object3D;
        handObject3D.getWorldPosition(handWorldPosition);

        const distance = myWorldPosition.distanceToSquared(handWorldPosition);
        if (distance <= this.shapeDistance) {
          isHovering = true;
        }
      }

      if (isHovering) {
        AFRAME.utils.entity.setComponentProperty(this.el, 'material.opacity', 0.5);
      }
      else {
        AFRAME.utils.entity.setComponentProperty(this.el, 'material.opacity', 1.0);
      }
    }
  })(),
});
