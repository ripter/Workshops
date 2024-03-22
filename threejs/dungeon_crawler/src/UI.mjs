import { Vector3 } from 'three';
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
import { Minimap } from './Minimap.mjs';
import { xyToIndex } from './xyToIndex.mjs';

export class UI {
  #level;
  #player;

  /**
   * Creates a new UI for the level.
   * @param {Level} level 
   */
  constructor(level, player) {
    this.#level = level;
    this.#player = player;
    this.app = new Application();
    this.miniMap = new Minimap(level);
    // this.miniMap = {
    //   root: new Container(),
    //   mask: new Graphics(),
    //   tileMap: new Container(),
    //   background: new Graphics(),
    //   playerSprite: null,
    // };
    // this.miniMap.root.addChild(
    //   this.miniMap.background,
    //   this.miniMap.tileMap,
    //   this.miniMap.mask,
    //   // this.miniMap.playerSprite,
    // );
    // this.app.stage.addChild(this.miniMap.root);
    // this.miniMap.root.addChild(this.miniMap.background);
    // this.miniMap.root.addChild(this.miniMap.tileMap);
    // this.miniMap.root.addChild(this.miniMap.mask);
    // this.miniMap.root.addChild(this.miniMap.playerSprite);
    // Event listeners
    window.addEventListener('resize', this.resizeAndRerender.bind(this));
  }

  get screenWidth() {
    return this.app.screen.width;
  }
  get screenHeight() {
    return this.app.screen.height;
  }

  /**
   * Initializes the UI.
   * This follows the same pattern as PIXI.js by using a init method.
   */
  async init() {
    const mainContext = document.getElementById('main-canvas');
    // Init the PIXI Application
    await this.app.init({
      resizeTo: mainContext,
      backgroundAlpha: 0,
    });
    this.app.canvas.id = 'ui-canvas';
    window.gameBody.appendChild(this.app.canvas);

    // Initalize the minimap and add it to the UI
    await this.miniMap.init(
      this.screenWidth / 5,
      this.screenHeight / 5,
    );
    this.miniMap.scene.x = this.screenWidth - this.miniMap.width - this.miniMap.padding;
    this.miniMap.scene.y = this.miniMap.padding;
    this.app.stage.addChild(this.miniMap.scene);

    // Resize and Render the UI
    this.resizeAndRerender();
  }

  async loadPlayerSprite() {
    const srcTexture = this.#level.defs.get('player').sprite;
    const texture = await Assets.load(srcTexture);
    const player = new Sprite(texture);
    const scale = this.tileSize / player.width; // TODO: move this to resizeAndRerender

    player.anchor.set(0.5, 0.5);
    player.scale.set(scale, scale);
    return player;
  }


  async update() {
    if (!this.#player || !this.player) { return; }
    // Get the Player's position
    const playerPosition = this.#player.position;
    // Update the player sprite on the mini map
    this.player.position.set(playerPosition.x * this.tileSize, playerPosition.z * this.tileSize);
    // Rotate the player sprite to match the camera
    this.player.rotation = this.#player.rotation.y * -1;
    // move the mini map so the player is always in the center
    // this.miniMap.position.set(
    //   -playerPosition.x * this.tileSize + this.miniMapContainer.width / 2, // Center horizontally
    //   -playerPosition.z * this.tileSize + this.miniMapContainer.height / 2 // Center vertically
    // );
  }

  /**
   * Resizes the UI and re-renders the UI.
   */
  resizeAndRerender() {
    this.app.resize();
    console.log('Resizing UI')
    // Re-calculate the size of things based on the new size
    const { screenWidth: width, screenHeight: height } = this;
    // const miniMapWidth = width / 5;
    // const miniMapHeight = height / 5;

    // this.miniMap = {
    //   ...this.miniMap,
    //   miniMapWidth,
    //   miniMapHeight,
    //   padding: (width * 0.025),
    //   lineWidth: 0|(width * 0.0025),
    //   tileSize: Math.min(miniMapWidth, miniMapHeight) / 4,
    // };
    // this.updateMiniMap();

  }

  /**
   * Adds the mini map to the UI.
   * Removes any old mini map that exists. 
   */
  async addMiniMap3() {
    const { 
      root, 
      mask, 
      tileMap, 
      tileSize, 
      background,
      miniMapWidth, miniMapHeight,
      padding,
    } = this.miniMap;
    const level = this.#level;

    console.log('Drawing Background', miniMapWidth, miniMapHeight)
    // Draw the mini map outline
    // background.rect(0, 0, this.miniMapWidth, this.miniMapHeight);
    background.rect(0, 0, 100, 100);
    background.stroke({ width: this.lineWidth, color: 0xffffff });
    background.fill({ color: 0xff00ff });

    // root.addChild(background);
    // this.app.stage.addChild(root);
    // Position the mini map
    // root.x = 100;
    root.x = this.screenWidth - miniMapWidth - padding;
    console.log('Root X:', root.x);
    // root.y = this.padding;

    //
    // Add each tile in the level to the mini map
    // for (let x = 0; x < level.widthInTiles; x++) {
    //   for (let y = 0; y < level.heightInTiles; y++) {
    //     const tile = level.getTileBy3DPosition(new Vector3(x, 0, y));
    //     const texture = await Assets.load(tile.sprite); // PIXI.JS says this is the correct way to load a texture. They handle cache.
    //     const sprite = new Sprite(texture);
    //     const scale = tileSize / sprite.width; // This assumes a square texture for simplicity
    //     sprite.scale.set(scale, scale);
    //     sprite.position.set(x * tileSize, y * tileSize);
    //     console.log('Adding tile to mini map:', tile, sprite);
    //     tileMap.addChild(sprite);
    //   }
    // }
  }
  async addMiniMap2() {
    // Clear any old that exists
    this.app.stage.removeChild(this.miniMapContainer);
    this.miniMapContainer = new Container();
    // Calculate the size and position of the mini map
    const { app, miniMapContainer } = this;
    // const { width, height } = app.screen;

    // Fill it with the map tiles
    await this.addMapTiles();

    // Draw the mini map outline
    miniMapContainer.rect(0, 0, this.miniMapWidth, this.miniMapHeight);
    miniMapContainer.stroke({ width: this.lineWidth, color: 0xffffff });

    // Position the mini map
    miniMapContainer.x = this.screenWidth - this.miniMapWidth - this.padding;
    miniMapContainer.y = this.padding;


    // Add the Player to the miniMapContainer
    const texture = await Assets.load('assets/player.webp');
    this.player = new Sprite(texture);
    this.player.anchor.set(0.5, 0.5);
    const scale = this.tileSize / this.player.width;
    this.player.scale.set(scale, scale);
    miniMapContainer.addChild(this.player);

    app.stage.addChild(miniMapContainer);
    return miniMapContainer;
  }

  /**
   * Adds the map tiles to the mini map. 
   */
  async addMapTiles2() {
    const { tileSize, root } = this.miniMap;
    const level = this.#level;
    // const root = new Container();
    // this.miniMap = root;

    // Add each tile in the level to the mini map
    for (let x = 0; x < level.widthInTiles; x++) {
      for (let y = 0; y < level.heightInTiles; y++) {
        const tile = level.getTileBy3DPosition(new Vector3(x, 0, y));
        const texture = await Assets.load(tile.sprite); // PIXI.JS says this is the correct way to load a texture. They handle cache.
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
    // root.mask = mask;
    // Add the mask and the root to the mini map
    this.miniMapContainer.addChild(mask);
    this.miniMapContainer.addChild(root);
    return root;
  }


}
