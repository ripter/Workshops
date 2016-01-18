
require('./mole.tag');

<gameboard>
  <h1>Gameboard </h1>

  <div class="board">
    <Mole each={squares} data={this} />
  </div>


  <script>
    'use strict';
    const State = require('./state.js');
    const assets = require('./assets.js');

    let state = this.state = new State(9, assets.images.dirt, [
      assets.images.giraffe,
      assets.images.hippo,
      assets.images.elephant,
      assets.images.monkey,
      assets.images.panda,
      assets.images.pig,
      assets.images.snake,
      assets.images.parrot,
      assets.images.rabbit,
    ]);

    // this.squares = state.toGameboard();

    this.on('all', () => {
      console.log('board: EVENT:', arguments);
    });

    this.on('mount', () => {
      console.log('board: EVENT: mount', arguments);
      // start the game!
      state.start();
    });

    state.on('tick', (delta) => {
        console.log('tick', delta);
        // When the game clock ticks, we update.
        this.update({
          squares: state.toJSON()
        });
    });

  </script>

  <style>
    gameboard > .board {
      width: 426px;
      margin-left: auto;
      margin-right: auto;
    }

    gameboard > .board > mole {
      float: left;
    }
  </style>
</gameboard>
