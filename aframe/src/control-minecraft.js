
AFRAME.registerComponent('control-minecraft', {
  // dependencies: ['laser-controls'],
  // schema: {
  // },

  init() {
    const { el } = this;

    el.addEventListener('trackpadup', this.handleTrackPadClick.bind(this));
    // const elLog = document.querySelector('#logDebug2');
    // ['trackpadtouchstart', 'trackpaddown', 'triggerchanged', 'buttonchanged']
    // 'trackpadchanged',
    // ['trackpadtouchstart', 'trackpaddown', 'triggerchanged',
    //  'buttonchanged'].forEach((eventName) => {
    //   this.el.addEventListener(eventName, logIt);
    // });
    // this.el.addEventListener('trackpaddown', this.handleTrackPadClick);
    // this.el.addEventListener('axismove', (event) => {
    //   const elLog = document.querySelector('#logDebug2');
    //   const axis = event.detail.axis.map(num => (0|num*100)/100);
    //   const msg = `Axis: ${axis} ~ ${this.el.components['tracked-controls'].axis}`;
    //   elLog.setAttribute('value', msg);
    // });

  },

  handleTrackPadClick() {
    const elLog = document.querySelector('#logDebug2');
    const axis = this.el.components['tracked-controls'].axis.map(num => (0|num*100)/100);
    const msg = `Axis: ${axis}`;
    elLog.setAttribute('value', msg);

    const player = document.querySelector('#player').object3D;
    const delta = new THREE.Vector3(axis[0], 0, axis[1]);
    player.position.add(delta);
  }

});

function logIt(event) {
  const elLog = document.querySelector('#logDebug2');
  elLog.setAttribute('value', `${event.type}: ${JSON.stringify(event.detail)}`);
}
