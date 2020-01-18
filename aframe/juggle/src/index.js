// Interaction System & Components
// These allow player-hands to grip and minupulate objects with physics.
import './systems/interaction.js';
import './components/interaction.js';
import './components/player-hand.js';
import './components/grab-able.js';
import './components/hover-able.js';


const _loadAt = (new Date()).toISOString();


// import './systems/movement.js';
// import './components/desktop-movement.js';
// import './components/axis-movement.js';
// import './components/clickable.js';
// import './components/material-cube.js';
// import './components/block-cursor.js';


// import './elements/c-cube.js';

// import './shader-phong.js';
// eslint-disable-next-line no-console
console.log('bundle.js loaded at', _loadAt);
