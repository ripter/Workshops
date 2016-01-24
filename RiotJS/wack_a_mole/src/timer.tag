<timer>
  <h2>Timer: {seconds}</h2>

  <script type="babel">
    this.seconds = 0;

    this.on('mount', function() {
      this.timer = setInterval(this.tick.bind(this), 1000);
      // inital render happens with the values before mount.
      // if we want to change something, we need to call update.
      // this.update({
      //   displayTime: 'mount'
      // })
    });

    this.tick =function() {
      const seconds = this.seconds += 1;

      this.update({
        seconds: seconds
      });
      this.trigger('tick', seconds);
    }

  </script>
  <style>

  </style>
</timer>
