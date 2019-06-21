import { intersectionDirection } from './util/intersectionDirection.js';
import { logCamera } from './logCamera.js';

const COLORS = ['#0074D9', '#FF851B', '#7FDBFF', '#FF4136', '#2ECC40', '#B10DC9', '#FFDC00'];
let COLOR_INDEX = 0;

AFRAME.registerComponent('clickable', {
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
    // elm.setAttribute('color', COLORS[COLOR_INDEX]);
    // elm.setAttribute('clickable', true);
    // elm.classList.add('clickable');
    this.el.sceneEl.append(elm);

    // COLOR_INDEX = (COLOR_INDEX + 1) % COLORS.length;
    return elm;
  },
});
