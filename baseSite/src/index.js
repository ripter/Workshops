const $ = require('jquery');
const fif = require('./fif.js');


// Prove that we don't brake iceburg
//Break Object.keys
Object.keys = function(obj) {
  var result = [];
  for (var key in obj) {
    console.log('key:', key);
    result.push(key);
  }
  return result;
}

// Load the rest of the code.
fif('js/iceburg.bundle.js', {
  $: $
});
