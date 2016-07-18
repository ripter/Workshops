const React = require('react');
const ReactDOM = require('react-dom');
const Toggle = require('./toggle.jsx');

let elApp;
let pageState = {
  puppy: 'IN'
};

module.exports = function(elm) {
  elApp = elm;
  renderApp(elApp);
}

function renderApp(elm) {
  ReactDOM.render(
    <Toggle status={pageState.puppy} action={togglePuppy}></Toggle>,
    elm
  );
}

function togglePuppy() {
  if (pageState.puppy === 'IN') {
    pageState.puppy = 'OUT';
  }
  else {
    pageState.puppy = 'IN';
  }

  renderApp(elApp);
}
