import { logCamera } from './logCamera.js';

AFRAME.registerComponent('clickable', {
  // schema: {
  // },

  init() {
    this.el.addEventListener('click', this.onClick.bind(this));
  },

  onClick(event) {
    const { distance } = event.detail.intersection;
    logCamera(`click: ${(0|distance*100)/100}`);
  },
});
