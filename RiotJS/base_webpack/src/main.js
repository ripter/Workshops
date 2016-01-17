const riot = require('riot');
// We need to include the puppy tag because we use it in index.html
require('./puppy.tag');

console.log('starting riot');
riot.mount('*');
