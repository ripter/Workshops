import { intersectionDirection } from './util/intersectionDirection.js';

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

    const direction = intersectionDirection(0.5, intersections[0])
    cursor.visible = true;
    cursor.position.copy(direction);
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
