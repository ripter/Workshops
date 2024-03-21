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

    // Load up all the assets
    // Find all the tileIds used in the map 
    // const tileIds = Array.from(new Set([...level.map]));
    // tileIds.forEach((id) => {
    //   const { sprite } = level.defs.get(id);
    //   Assets.add({
    //     alias: `tile-${id}`,
    //     src: sprite, 
    //   }); 
    // });
    // console.log('Tile IDs:', tileIds);

    // Event listeners
    window.addEventListener('resize', this.resize.bind(this));
  }

  /**
   * Initializes the UI.
   * This follows the same pattern as PIXI.js by using a init method.
   */
  async init() {
    const mainContext = document.getElementById('main-canvas');
    const config = {
      resizeTo: mainContext,
      backgroundAlpha: 0,
    };

    console.log('Loading UI')
    await this.app.init(config);
    this.app.canvas.id = 'ui-canvas';
    window.gameBody.appendChild(this.app.canvas);

    // Add the mini map.
    this.addMiniMap();
  }

  resize() {
    this.app.resize();
    this.addMiniMap();
  }

  async addMiniMap() {
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

    // Draw the mini map outline
    miniMap.rect(0, 0, miniMapWidth, miniMapHeight);
    // miniMap.fill(0xaa4f08);
    miniMap.stroke({ width: lineWidth, color: 0xffffff });


    /*
    // Add each tile in the level to the mini map
    const promiseTiles = [];
    for (let x = 0; x < level.gridWidth; x++) {
      for (let z = 0; z < level.gridHeight; z++) {
        const index = level.xyToIndex(x, z);
        const defID = level.map[index];
        if (!defID) continue;

        promiseTiles.push((async () => {
          const def = level.defs.get(defID);
          const texture = await Assets.load(def.sprite);
          const sprite = new Sprite(texture);
          sprite.position.set(x, z);
          this.miniMap.addChild(sprite);
        })());
        // const { sprite } = def;
        // const tile = new Graphics();
        // tile.beginTextureFill({ texture: sprite });
        // tile.drawRect(x, z, 1, 1);
        // tile.endFill();
        // miniMap.addChild(tile);
      }
    }
    await Promise.all(promiseTiles);
    */


    // Position the mini map
    miniMap.x = width - miniMapWidth - padding;
    miniMap.y = padding;

    // Fill it with the map tiles
    await this.createMapTiles();
    app.stage.addChild(miniMap);
    return miniMap;
  }

  async createMapTiles() {
    const level = this.#level;
    const root = new Container();
    // Add each tile in the level to the mini map
    for (let x = 0; x < level.width; x++) {
      for (let z = 0; z < level.height; z++) {
        const index = xyToIndex(level.width, x, z);
        const defID = level.map[index];
        if (!defID) continue;
        // Get the Texture and create a Sprite.
        const def = level.defs.get(defID);
        const texture = await Assets.load(def.sprite); // PIXI.JS says this is the correct way to load a texture. They handle cache.
        const sprite = new Sprite(texture);
        sprite.position.set(x, z);
        root.addChild(sprite);
      }
    }
    // Add the root to the mini map and return.
    this.miniMap.addChild(root);
    return root;
  }

}
