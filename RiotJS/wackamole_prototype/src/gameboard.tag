<gameboard>
  <img each={holes} src="img/dirt.png" alt="dirt" />

  <script type="babel">
    //The gameboard is made of of holes.
    // Each hole contains a mole.
    // if the mole is hit, trigger the hit event.
    this.holes = [];

    console.log('hello world');

    // this.on('mount', function() {
      var i = 9;
      while (i--) {
        this.holes[i] = 'hello'
      }
    // });
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
