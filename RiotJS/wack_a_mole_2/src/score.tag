<score>
  <h2>Score: {score}</h2>

  <script type="babel">
    import {ACTION} from './consts.js';
    const store = this.store = this.opts;

    // Re-render on ACTION.UPDATE
    store.on(ACTION.UPDATE, (state) => {
      this.update(state);
    });
  </script>
</score>
