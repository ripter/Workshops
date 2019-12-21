const { THREE } = AFRAME;

AFRAME.registerComponent('anim-button-click', {
  // schema: {
  // },

  init() {
    const source = new THREE.Vector3();
    this.el.object3D.getWorldPosition(source);
    const dest = new THREE.Vector3(source.x, source.y, source.z - 0.10);
    // set the animation component to move the button back a little when clicked.
    this.el.setAttribute('animation',
      `property: position; from: ${source.x} ${source.y} ${source.z};  to: ${dest.x} ${dest.y} ${dest.z}; dur: 500; dir: alternate; easing: linear; startEvents: click; loop: 1;`);
  },

});
