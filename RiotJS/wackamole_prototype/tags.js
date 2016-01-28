'use strict';

riot.tag2('gameboard', '<img each="{holes}" src="img/dirt.png" alt="dirt">', 'gameboard { width: 426px; margin-left: auto; margin-right: auto; display: flex; flex-wrap: wrap; }', '', function (opts) {
  'use strict';

  //The gameboard is made of of holes.
  // Each hole contains a mole.
  // if the mole is hit, trigger the hit event.

  this.holes = [];

  this.on('mount', function () {
    var i = 9;
    while (i--) {
      this.holes[i] = 'hello';
    }
  });
}, '{ }');
