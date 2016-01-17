'use strict';

<gameboard>
  <h1>Gameboard </h1>

  <div class="board">
    <div each={squares} >
      <img src="{src}" alt="bunny" height="142" width="142" />
    </div>
  </div>

  <script>
    const assets = require('./assets.js');

    this.squares = [
      {src: assets.images.rabbit}, {src: assets.images.giraffe}, {src: assets.images.hippo},
      {src: assets.images.elephant}, {src: assets.images.monkey}, {src: assets.images.panda},
      {src: assets.images.pig}, {src: assets.images.snake}, {src: assets.images.parrot},
    ];

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
