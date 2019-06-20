
AFRAME.registerComponent('clickable', {
  // schema: {
  // },

  init() {
    this.el.addEventListener('click', function (evt) {
      const { distance } = evt.detail.intersection;
      // console.log('click', evt.detail);

      //DEBUG:
      const elLog = document.querySelector('#logDebug2');
      elLog.setAttribute('value', `click: ${(0|distance*100)/100}`);
      //DEBUG END
    });
  },
});
