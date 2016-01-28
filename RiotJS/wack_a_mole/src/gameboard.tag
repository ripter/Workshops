<gameboard>
  <img each={moles} src={src} onClick={onClick} />

  <script type="babel">
    import {ACTION} from './consts.js';
    const store = this.store = this.opts;

    // Rerender on store update.
    store.on('update', (state) => {
      this.update(state);
    });

    this.onClick = (evt) => {
      var mole = evt.item;
      store.trigger(ACTION.CLICKED, mole);
    }
  </script>

  <style>
    gameboard {
      width: 426px;
      margin-left: auto;
      margin-right: auto;
      display: flex;
      flex-wrap: wrap;
    }
  </style>
</gameboard>
