import { intersectionDirection } from '../util/intersectionDirection.js';

AFRAME.registerComponent('cr-clickable', {
  // schema: {
  // },

  init() {
    this.cursorPosition = new THREE.Vector3();
    this.cusorOffset = new THREE.Vector3();
    this.el.addEventListener('click', this.onClick.bind(this));
  },

  onClick(event) {
    const direction = intersectionDirection(1, event.detail.intersection);
    this.placeBlock(direction);
  },

  placeBlock(position) {
    const elBlock = this.createBlock();
    elBlock.setAttribute('position', position);
  },

  createBlock() {
    const elm = document.createElement('c-cube');
    this.el.sceneEl.append(elm);
    return elm;
  },
});
