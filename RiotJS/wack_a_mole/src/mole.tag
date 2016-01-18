<mole class={popped: isPopped}>
  <img src="{dirtSrc}" class="dirt" alt="dirt"  />
  <img src="{moleSrc}" class="mole" alt="mole"  />

  <script>
    this.on('all', function() {
      console.log('mole: EVENT:', arguments);
    });

    this.on('mount', () => {
      console.log('mole: mount:', this.isPopped, this);
    });

    this.on('update', () => {
      console.log('mole: update:', this.isPopped, this);
    });
  </script>

  <style>
    mole {
      background-image: url({dirtSrc});
      height: 128px;
      width: 128px;
    }

    mole > .mole {display: none;}
    mole.popped > .mole {display: block;}

    mole > .dirt {display: block;}
    mole.popped > .dirt {display: none;}
  </style>
</mole>
