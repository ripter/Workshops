import { 
  Assets,
  Container,
  Graphics,
  Sprite,
} from '../libs/pixi.min.mjs';

export class Minimap {
  #level;
  constructor(level) {
    this.#level = level;
    this.scene = new Container(); // Calling it scene to match PIXI.js naming.
    this.background = new Graphics();
    this.scene.addChild(this.background);
  }

  async init(width, height) {
    this.resize(width, height); // Resize/Initsize the minimap size calculations.
    const { 
      background, 
      lineWidth,
    } = this;

    // Read the level and create the minimap tiles
    this.addTiles();

    background.rect(0, 0, width, height);
    background.stroke({ width: lineWidth, color: 0xffffff });
    background.fill({ color: 0xff00ff });
  }

  /**
   * Resizes the minimap.
   * @param {number} width 
   * @param {number} height 
   */
  resize(width, height) {
    this.width = width;
    this.height = height;
    this.padding = (width * 0.055);
    this.lineWidth = 0|(width * 0.025),
    this.tileSize = Math.min(width, height) / 4;

    this.scene.width = width;
    this.scene.height = height;
  }

  async addTiles() {
    const level = this.#level;
    // Add each tile in the level to the mini map
    for (let x = 0; x < level.widthInTiles; x++) {
      for (let y = 0; y < level.heightInTiles; y++) {
        const tile = level.getTileBy2DPosition(x, y);
        const texture = await Assets.load(tile.sprite); // PIXI.JS says this is the correct way to load a texture. They handle cache.
        const sprite = new Sprite(texture);
        const scale = tileSize / sprite.width; // This assumes a square texture for simplicity
        sprite.scale.set(scale, scale);
        sprite.position.set(x * tileSize, y * tileSize);
        console.log('Adding tile to mini map:', tile, sprite);
        tileMap.addChild(sprite);
      }
    }
  }
}
