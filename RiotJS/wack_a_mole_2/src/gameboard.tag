<gameboard>
  <img each={moles} src={src} onClick={onClick} />

  <script type="babel">
    import {ACTION} from './consts.js';

    this.moles = this.opts.moles;
    // const store = this.store = this.opts;
    //
    // // Re-render on ACTION.UPDATE
    // store.on(ACTION.UPDATE, (state) => {
    //   this.update(state);
    // });

    this.onClick = (evt) => {
      this.trigger(ACTION.CLICKED, evt.item);
    }
  </script>

  <style>
    gameboard {
      width: 426px;
      height: 386px;
      margin-left: auto;
      margin-right: auto;
      display: flex;
      flex-wrap: wrap;
    }
  </style>
</gameboard>
