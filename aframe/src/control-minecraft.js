
AFRAME.registerComponent('control-minecraft', {
  // dependencies: ['laser-controls'],
  // schema: {
  // },

  init() {
    const elLog = document.querySelector('#logDebug2');

    this.el.addEventListener('trackpadchanged', (event) => {
      console.log('trackpadchanged', event);
      // elLog.setAttribute('value', `tpChd`);
      logIt(event);
    });
    this.el.addEventListener('triggerchanged', (event) => {
      console.log('triggerchanged', event);
      elLog.setAttribute('value', `triggerchanged`);
    });
  },

});

function logIt(event) {
  const elLog = document.querySelector('#logDebug2');
  elLog.setAttribute('value', `o: ${event.detail.value}`);
}
