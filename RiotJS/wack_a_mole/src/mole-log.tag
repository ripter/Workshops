<mole-log>
  <div class="mole" each={moles}>
    <img src={src} />
    <p>Hits: {hits || 0}</p>
  </div>

  <script type="babel">
    import {images} from './assets';
    const store = this.store = this.opts;

    let moles = Object.keys(images).map((name) => {return {name: name, src: images[name]}});
    moles.shift(); // remove the dirt
    this.moles = moles;

    // Rerender on store update.
    store.on('update', (state) => {
      const {moleLog} = state;

      let mole = this.moles.find((mole) => {return mole.src;})

      let moles = this.moles.map((mole) => {
        mole.hits = moleLog[mole.src];
        return mole;
      });

      this.update({
        moles: moles
      });
    });
  </script>
  <style>
    mole-log {
      display: flex;
    }

    mole-log .mole {
      width: 10em;
      display: flex;
    }

    mole-log .mole img {
      height: 64px;
      width: 64px;
    }

    mole-log .mole p {
      padding-left: 1em;
    }
  </style>
</mole-log>
