import { 
  Application, 
  Assets,
  Graphics, 
  Container, 
  Sprite,
  Text, 
  TextStyle, 
  FillGradient,
} from '../libs/pixi.min.mjs';
import { xyToIndex } from './xyToIndex.mjs';

export class UI {
  #level;
  /**
   * Creates a new UI for the level.
   * @param {Level} level 
   */
  constructor(level) {
    this.#level = level;
    this.app = new Application();
    this.miniMap = new Graphics();
    // Event listeners
    window.addEventListener('resize', this.resizeAndRerender.bind(this));
  }

  get width() {
    return this.app.screen.width;
  }
  get height() {
    return this.app.screen.height;
  }

  /**
   * Initializes the UI.
   * This follows the same pattern as PIXI.js by using a init method.
   */
  async init() {
    const mainContext = document.getElementById('main-canvas');
    await this.app.init({
      resizeTo: mainContext,
      backgroundAlpha: 0,
    });
    this.app.canvas.id = 'ui-canvas';
    window.gameBody.appendChild(this.app.canvas);

    // Resize and Render the UI
    this.resizeAndRerender();
  }

  resizeAndRerender() {
    this.app.resize();

    // Calculate tile size so that 4x4 tiles fit into the mini map
    const { width, height } = this;
    this.miniMapWidth = width / 5;
    this.miniMapHeight = height / 5;
    this.padding = (width * 0.025);
    this.lineWidth = (width * 0.0025);
    this.miniMapWidth = width / 5;
    this.miniMapHeight = height / 5;
    this.tileSize = Math.min(this.miniMapWidth, this.miniMapHeight) / 4;


    this.addMiniMap();
  }

  /**
   * Adds the mini map to the UI.
   * Removes any old mini map that exists. 
   */
  async addMiniMap() {
    // Clear any old that exists
    this.app.stage.removeChild(this.miniMap);
    this.miniMap = new Graphics();
    // Calculate the size and position of the mini map
    const { app, miniMap } = this;
    // const { width, height } = app.screen;

    // Fill it with the map tiles
    await this.addMapTiles();

    // Draw the mini map outline
    miniMap.rect(0, 0, this.miniMapWidth, this.miniMapHeight);
    miniMap.stroke({ width: this.lineWidth, color: 0xffffff });

    // Position the mini map
    miniMap.x = this.width - this.miniMapWidth - this.padding;
    miniMap.y = this.padding;

    app.stage.addChild(miniMap);
    return miniMap;
  }

  /**
   * Adds the map tiles to the mini map. 
   */
  async addMapTiles() {
    const { tileSize } = this;
    const level = this.#level;
    const root = new Container();

    // Add each tile in the level to the mini map
    for (let x = 0; x < level.width; x++) {
      for (let y = 0; y < level.height; y++) {
        const index = xyToIndex(level.width, x, y);
        const defID = level.map[index];
        if (!defID) continue;
        // Get the Texture and create a Sprite.
        const def = level.defs.get(defID);
        const texture = await Assets.load(def.sprite); // PIXI.JS says this is the correct way to load a texture. They handle cache.
        const sprite = new Sprite(texture);
        const scale = tileSize / sprite.width; // This assumes a square texture for simplicity
        sprite.scale.set(scale, scale);
        sprite.position.set(x * tileSize, y * tileSize);
        root.addChild(sprite);
      }
    }

    // Create a mask for the mini map
    const mask = new Graphics();
    mask.rect(0, 0, this.miniMapWidth, this.miniMapHeight);
    mask.fill({color: 'black'});
    root.mask = mask;
    // Add the mask and the root to the mini map
    this.miniMap.addChild(mask);
    this.miniMap.addChild(root);
    return root;
  }

}
