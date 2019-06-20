
AFRAME.registerComponent('block-cursor', {
  init() {
    this.intersectedPosition = new THREE.Vector3();
    this.elCursor = this.initCursor();
    this.cursor = this.elCursor.object3D;
  },

  tick() {
    const { cursor, intersectedPosition } = this;
    const { raycaster } = this.el.components;
    if (!raycaster) { return; }
    const { intersections } = raycaster;

    if (!intersections || intersections.length === 0) {
      cursor.visible = false;
      return;
    }
    const { point, object } = intersections[0];

    // Get the intersected object's world position.
    object.getWorldPosition(intersectedPosition);
    const offset = point.clone().sub(intersectedPosition);
    let { x, y, z } = intersectedPosition;

    if (Math.abs(offset.y) > Math.abs(offset.z) && Math.abs(offset.y) > Math.abs(offset.z)) {
      y = point.y;
    }
    else if (Math.abs(offset.x) > Math.abs(offset.z)) {
      x = point.x;
    }
    else {
      z = point.z;
    }

    cursor.visible = true;
    cursor.position.set(x, y, z);
  },

  initCursor() {
    const elm = document.createElement('a-box');
    elm.id = 'block-cursor--cursor';
    elm.setAttribute('color', 'orange');
    elm.setAttribute('depth', 0.5);
    elm.setAttribute('width', 0.5);
    elm.setAttribute('height', 0.5);
    elm.setAttribute('transparent', true);
    elm.setAttribute('opacity', 0.75);
    this.el.sceneEl.append(elm);
    return elm;
  },
});
