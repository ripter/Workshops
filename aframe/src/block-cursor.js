import { fmtNumber } from './fmtNumber.js';

AFRAME.registerComponent('block-cursor', {
  // schema: {
  //   target: {type: 'selector'},
  // },

  init() {
    console.log('init block-cursor', this.data, this);
    // const elCursor = document.querySelector('#block-cursor--cursor') || document.createElement('a-entity');
    // elCursor.id = 'block-cursor--cursor';
    // this.el.sceneEl.append(elCursor)
    // const cursor = this.data.target.object3D;
    // const cursor = this.cursor = document.querySelector(this.data.target).object3D;

    this.el.addEventListener('raycaster-intersection', this.onIntersection.bind(this));
  },

  onIntersection(evt) {
    const { els, intersections } = evt.detail;
    if (intersections.length < 1) { return; }
    const { distance, point } = intersections[0];

    console.log('intersection', evt.detail);
    // cursor.position.set(point.x, point.y, point.z);

    //DEBUG:
    const elLog = document.querySelector('#logDebug2');
    elLog.setAttribute('value', `intersection ${fmtNumber(point.x)},${fmtNumber(point.y)},${fmtNumber(point.z)}`);
    //DEBUG END
  },

  
  getCursor() {
    if (this._elCursor) { return this._elCursor; }

    let elm = document.querySelector('#block-cursor--cursor');
    if (!elm) {
      elm = document.createElement('a-entity');
      elm.id = 'block-cursor--cursor';
      this.el.sceneEl.append(elm)
    }
    return this._elCursor = elm;
  },
});
