// jQuery loaded by the surface bundle
const $ = window.$;
const app = require('./app.jsx');

// Get the element on the surface and start the React app.
const elApp = $('#app');
app(elApp[0])



console.log('iceburg jquery version:', $().jquery);

// Test for the Object.key hack.
const testObj = new Array();
testObj[0] = 'rose';
testObj.type = 'puppy';
const keys = Object.keys(testObj);
console.log('keys', keys);
