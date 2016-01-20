<mole class={popped: isPopped}>
  <img src="{dirtSrc}" class="dirt" alt="dirt"  />
  <img src="{moleSrc}" class="mole" alt="mole"  />

  <style>
    mole {
      height: 128px;
      width: 128px;
    }

    mole > .mole {display: none;}
    mole.popped > .mole {display: block;}

    mole > .dirt {display: block;}
    mole.popped > .dirt {display: none;}
  </style>
</mole>
