<mole-log>
  <div class="mole" each={moles}>
    <img src={src} />
    <p>Hits: {hit || 0}</p>
  </div>
  
  <style>
    mole-log {
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
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
