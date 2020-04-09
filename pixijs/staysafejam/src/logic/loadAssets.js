
/**
 * Load from PIXI assets loader
*/
export function loadAssets(state, { app, resources }) {
  state.app = app;
  state.stage = app.stage;
  state.resources = resources;
}
