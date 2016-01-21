const riot = require('riot');
// We need to include the puppy tag because we use it in index.html
require('./puppy.tag');
require('./gameboard.tag');

// render all the tags
const tags = riot.mount('*');
// for debugging
window.tags = tags;
