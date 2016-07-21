const app = require('./app.jsx');

// window.onDivLoad = function() {
//   debugger;
// }

window.TOUT = {
  loadSlot(elm, intervalID) {
    clearInterval(intervalID);

    console.log('loaded slot', elm);
  }
};
