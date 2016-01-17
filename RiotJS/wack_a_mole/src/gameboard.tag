require('./mole.tag');

<gameboard>
  <h1>Gameboard </h1>

  <div class="board">
    <div each={squares} >
      <Mole src="{src}" />
    </div>
  </div>


  <script>
    'use strict';
    const assets = require('./assets.js');

    this.squares = [
      {src: assets.images.dirt}, {src: assets.images.giraffe}, {src: assets.images.hippo},
      {src: assets.images.elephant}, {src: assets.images.monkey}, {src: assets.images.panda},
      {src: assets.images.pig}, {src: assets.images.snake}, {src: assets.images.parrot},
    ];

    this.on('all', function() {
      console.log('board: EVENT:', arguments);
    });

  </script>

  <style>
    .board {
      width: 426px;
      margin-left: auto;
      margin-right: auto;
    }
    .board div {
      float: left;
    }
  </style>
</gameboard>
