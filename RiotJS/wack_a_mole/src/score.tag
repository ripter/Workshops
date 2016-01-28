<score>
  <h2>Score: {score}</h2>

  <script type="babel">
    const store = this.store = this.opts;

    // Rerender on store update.
    store.on('update', (state) => {
      this.update(state);
    });
  </script>
</score>
