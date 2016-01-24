<timer>
  <h2>Timer: {seconds}</h2>

  <script type="babel">
    import {TIMER} from './consts.js';
    const store = this.store = this.opts;

    this.seconds = 0;

    store.on(TIMER.START, () => {
      const tick = this.tick.bind(this);

      this.timer = setInterval(tick, 1000);
    });

    this.tick = () => {
      const seconds = this.seconds += 1;

      this.update({
        seconds: seconds
      });
      store.trigger(TIMER.TICK, seconds);
    }

  </script>
  <style>

  </style>
</timer>
