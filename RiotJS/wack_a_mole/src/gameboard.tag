require('./mole.tag');

<gameboard>
  <h1>Score: {score}</h1>

  <div class="board">
    <img each={moles} src={src} />
    <!-- <Mole each={squares} data={this} onClick={onClick} /> -->
  </div>


  <script>
    const store = this.store = this.opts;
    console.log('store', store);

    // Rerender on store update.
    store.on('update', (state) => {
      this.update(state);
    });
    // 'use strict';
    // const State = require('./state.js');
    // const assets = require('./assets.js');
    //
    // // Create the inital state of the game
    // let state = this.state = new State(9, assets.images.dirt, [
    //   assets.images.giraffe, assets.images.hippo, assets.images.elephant,
    //   assets.images.monkey, assets.images.panda, assets.images.pig,
    //   assets.images.snake, assets.images.parrot, assets.images.rabbit,
    // ]);
    //
    // // Listen for the state tick event
    // state.on('tick', (delta) => {
    //   // When the game clock ticks, we update.
    //   this.update(state.toJSON());
    // });
    //
    // // this.squares = state.toGameboard();
    // this.onClick = (evt) => {
    //   const item = evt.item;
    //   const index = this.squares.indexOf(item);
    //
    //   state.hit(index);
    //   this.update(state.toJSON());
    // }
    //
    // this.on('mount', () => {
    //   // start the game!
    //   state.start();
    // });
  </script>

  <style>
    gameboard > .board {
      width: 426px;
      margin-left: auto;
      margin-right: auto;
      display: flex;
      flex-wrap: wrap;
    }

    gameboard > .board > mole {
      /*float: left;*/
    }
  </style>
</gameboard>
