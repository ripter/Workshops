<gameboard>
  <img each={moles} src={src} onClick={onClick} />

  <script type="babel">
    // this.onClick = (evt) => {
    //   this.trigger(ACTION.CLICKED, evt.item);
    // }
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
