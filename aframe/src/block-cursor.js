import { fmtNumber } from './fmtNumber.js';
import { logCamera } from './logCamera.js';

AFRAME.registerComponent('block-cursor', {
  // schema: {
  //   target: {type: 'selector'},
  // },

  init() {
    // console.log('init block-cursor', this.data, this);
    this.elCursor = this.initCursor();
    this.cursor = this.elCursor.object3D;

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
    const { cursor } = this;
    const { raycaster } = this.el.components;
    if (!raycaster) { return; }
    const { intersections } = raycaster;
    if (!intersections || intersections.length === 0) {
      cursor.visible = false;
      logCamera('');
      return;
    }
    // console.log('intersection', intersections[0]);
    const { distance, point, object } = intersections[0];
    // console.log('intersection', intersections[0]);
    logCamera(`dist: ${fmtNumber(distance)}`);

    // const offset = object.position.clone().sub(point);
    // console.log('offset', offset);
    const objPoisition = new THREE.Vector3();
    object.getWorldPosition(objPoisition);
    // const offset = objPoisition.clone().sub(point);
    const offset = point.clone().sub(objPoisition);
    console.group('tick');
    console.log('objPoisition', `${objPoisition.x}, ${objPoisition.y}, ${objPoisition.z}`);
    console.log('point', `${point.x}, ${point.y}, ${point.z}`);
    console.log('offset', `${offset.x}, ${offset.y}, ${offset.z}`);
    console.groupEnd();
    let x, y, z;


    cursor.visible = true;
    cursor.position.set(point.x, objPoisition.y, objPoisition.z);
    // cursor.position.set(point.x, point.y, point.z);
    // cursor.position.set(objPoisition.x, objPoisition.y, objPoisition.z);
    // cursor.position.set(objPoisition.x, objPoisition.y, objPoisition.z - offset.z);
    // cursor.position.set(offset.x, offset.y, offset.z);
  },

  initCursor() {
    const elm = document.createElement('a-box');
    elm.id = 'block-cursor--cursor';
    elm.setAttribute('color', 'orange');
    elm.setAttribute('depth', 0.5);
    elm.setAttribute('width', 0.5);
    elm.setAttribute('height', 0.5);
    this.el.sceneEl.append(elm)
    return elm;
  },
});
