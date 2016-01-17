const riot = require('riot');
// We need to include the puppy tag because we use it in index.html
require('./puppy.tag');
require('./gameboard.tag');

console.log('main: starting riot');
var tags = riot.mount('*');
console.log('main: tags', tags);
