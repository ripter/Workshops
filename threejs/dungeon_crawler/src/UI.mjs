import { Application, Graphics } from '../libs/pixi.min.mjs';

export class UI {
  constructor() {
    this.app = new Application();
    this.miniMap = new Graphics();

    const mainContext = document.getElementById('main-canvas');
    const config = {
      resizeTo: mainContext,
      backgroundAlpha: 0,
    };

    window.addEventListener('resize', this.resize.bind(this));

    // Initalize PIXI for the UI.
    (async () => {
      console.log('Loading UI')
      await this.app.init(config);
      this.app.canvas.id = 'ui-canvas';
      window.gameBody.appendChild(this.app.canvas);

      // Add the mini map.
      this.addMiniMap();
    })();
  }

  resize() {
    this.app.resize();
    this.addMiniMap();
  }

  addMiniMap() {
    // Clear any old that exists
    this.app.stage.removeChild(this.miniMap);
    this.miniMap = new Graphics();
    // Calculate the size and position of the mini map
    const { app, miniMap } = this;
    const { width, height } = app.screen;
    const miniMapWidth = width / 5;
    const miniMapHeight = height / 5;
    const padding = (width * 0.025);
    const lineWidth = (width * 0.0025);

    // Draw the mini map
    miniMap.rect(0, 0, miniMapWidth, miniMapHeight);
    miniMap.fill(0xaa4f08);
    miniMap.stroke({ width: lineWidth, color: 0xffffff });

    // Position the mini map
    miniMap.x = width - miniMapWidth - padding;
    miniMap.y = padding;

    app.stage.addChild(miniMap);
    return miniMap;
  }
}
