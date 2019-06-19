import { fmtNumber } from './fmtNumber.js';

AFRAME.registerComponent('block-cursor', {
  // schema: {
  //   target: {type: 'selector'},
  // },

  init() {
    // console.log('init block-cursor', this.data, this);
    this.elCursor = this.initCursor();

    // this.el.addEventListener('raycaster-intersection', (evt) => {
    //   console.log('intersection', evt);
    //   this.raycaster = evt.detail.els
    // });
    // this.el.addEventListener('raycaster-intersected-cleared', () => {
    //   console.log('clear intersection')
    //   this.raycaster = null
    // });
  },

  tick() {
    const { raycaster } = this.el.components;
    if (!raycaster) { return; }
    const { intersections } = raycaster;
    if (!intersections || intersections.length === 0) { return; }

    // console.log('intersection', intersections[0]);
    const { distance } = intersections[0];
    //DEBUG:
    const elLog = document.querySelector('#logDebug2');
    elLog.setAttribute('value', `dist: ${fmtNumber(distance)}`);
    //DEBUG END
  },

  initCursor() {
    const elm = document.createElement('a-entity');
    elm.id = 'block-cursor--cursor';
    this.el.sceneEl.append(elm)
    return elm;
  },
});
