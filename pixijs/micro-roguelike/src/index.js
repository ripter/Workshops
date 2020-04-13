import {
  World,
  System,
  TagComponent,
  Component
} from "https://ecsy.io/build/ecsy.module.js";

const TILE_SIZE = 8;
const MAP_WIDTH = 40;
const MAP_HEIGHT = 25;
const SPRITESHEET_SRC = 'http://s3-us-west-2.amazonaws.com/s.cdpn.io/775705/miniroguelike-morgan3d.png';


//
// Pixi Application
const app = new PIXI.Application({
  resolution: window.devicePixelRatio,
  autoDensity: true,
  view: window.elCanvas,
  width: TILE_SIZE * MAP_WIDTH,
  height: TILE_SIZE * MAP_HEIGHT
});
window.app = app;
// remove the inline size so it can be scaled in CSS.
app.view.style.width = null;
app.view.style.height = null;

// Game State, keep it on app for easy refrence.
// app.gameState = {
//   tileTextures: [],
// };




//
// ECSY Components
// Components hold data on an entity.
// That's it, don't try to do more.
//

// Set value as resourceID,
// Read value as PIXI.Texture
// Read src as resourceID
class Texture extends Component {
  reset() {
    this.value = null;
  }
  set(val) {
    this.value = val;
  }
  get value() {
    return app.loader.resources[this.src].texture;
  }
  set value(src) {
    this.src = src;
  }
}

class TiledMap extends Component {
  constructor() {
    super();
    this.src = '';
  }
  reset() {
    this.value = null;
  }
  set(val) {
    this.value = val;
  }
  get value() {
    return app.loader.resources[this.src].data;
  }
  set value(src) {
    this.src = src;
  }
}

// SpriteSheet is a Texture cut into squires and indexed.
class SpriteSheet extends Component {
  constructor() {
    super();
    this.size = 8;
    this.tileTextures = [];
  }
  reset() {
    this.size = 8;
    this.tileTextures = [];
  }
  set(obj) {
    this.size = obj.size;
    this.tileTextures = obj.tileTextures;
  }
}

class Tile extends Component {
  reset() {

  }
  set(obj) {

  }
}


//
// EC[S]Y Systems
// Systems perform logic on entities, by reading/updating component data.


class SpriteSheetCreator extends System {
  static queries = {
    sheets: {
      components: [Texture, SpriteSheet],
      listen: {
        added: true,
      }
    }
  }
  execute(delta) {
    // When a new sheet is added to the world,
    // Convert it into an array of PIXI.Textures
    this.queries.sheets.added.forEach(entity => {
      const { size, tileTextures } = entity.getComponent(SpriteSheet);
      const texture = entity.getComponent(Texture).value;
      let tile, rect;

      for (let y=0; y < texture.orig.height; y += size) {
        for (let x=0; x < texture.orig.width; x += size) {
          rect = new PIXI.Rectangle(x, y, size, size);
          tile = new PIXI.Texture(texture, rect);
          tileTextures.push(tile);
        }
      }
    });
  }
}

//
// Loads and manges layers of tile maps.
class TiledMapSystem extends System {
  init() {
    // Setup a sortable container to hold all the layers.
    this.layers = new PIXI.Container();
    this.layers.sortableChildren = true;
    app.stage.addChild(this.layers);
    // Keep a reference to the tile textures.
    // this.tiles = [];
  }
  execute(delta) {
    // When a map is added to the world.
    // Create Tiles for every layer/tile in the map.
    this.queries.mapData.added.forEach((entity) => {
      const { tileTextures } = entity.getComponent(SpriteSheet);
      const tiledMap = entity.getComponent(TiledMap).value;
      const { tileheight, tilewidth } = tiledMap;

      // Create tile data for each tile in the map.
      const layers = tiledMap.layers
        .filter(layer => layer.type === 'tilelayer')
        .reduce((acc, layer) => {
          const { name } = layer;
          const layerData = Array(layer.height).fill().map(_ => new Array(layer.width));

          // loop over each tile
          layer.data.forEach((tiledID, idx) => {
            const y = (0| idx / layer.width);
            const x = (0 | idx % layer.height);

            layerData[x][y] = [
              [Tile, {x, y, tiledID: tiledID}],
            ];
            // const { spriteIndex, angle, anchor } = convertTiledID(tiledID);
            // const sprite = new PIXI.Sprite(tileTextures[spriteIndex]);
            // sprite.position.x = x * tilewidth;
            // sprite.position.y = y * tileheight;
            // sprite.anchor.copyFrom(anchor);
            // sprite.angle = angle;
            // layerData[x][y] = {
            //   sprite,
            //   components: [
            //     [Tile, {}]
            //   ],
            // };
          });

          acc[name] = layerData;
          return acc;
        }, {});
      console.log('layers', layers);
      /*
      // Loop over each layer.
      tiledMap.layers.forEach(layer => {
        const container = new PIXI.Container();
        this.layers.addChild(container);



        if (!layer.data) { return; }
        layer.data.forEach((tiledID, idx) => {

          //

          const tiledData = convertTiledID(tiledID);
          const sprite = new PIXI.Sprite(this.tiles[tiledData.spriteIndex]);
          sprite.angle = tiledData.angle;
          sprite.anchor.copyFrom(tiledData.anchor);
          container.addChild(sprite);

          const x = (0 | idx % tiledMap.width) * tilewidth;
          const y = (0 | idx / tiledMap.width) * tileheight;
          sprite.position.copyFrom({x, y});
        });
      });
      */
    });
  }
  static queries = {
    mapData: {
      components: [TiledMap, SpriteSheet],
      listen: {
        added: true
      }
    }
  }
}



//
//
// ECSY World
const world = app.world = new World()
  .registerSystem(SpriteSheetCreator)
  .registerSystem(TiledMapSystem);


// Map entity.
const map = world
  .createEntity()
  .addComponent(Texture, {value: SPRITESHEET_SRC})
  .addComponent(SpriteSheet, {size: TILE_SIZE})
  .addComponent(TiledMap, {value: 'level1'});



//
// Load and run the game
app.loader
  .add(SPRITESHEET_SRC)
  .add('level1', 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/775705/conveyor_level_1.json')
  .load(() => {
    // Setup the game loop.
    app.ticker.add(delta => {
      world.execute(delta);
    });
  });


//
// Utils

// Converts the ID exported by Tiled into a sprite index and transformation.
function convertTiledID(tiledID) {
  // values from: http://doc.mapeditor.org/en/latest/reference/tmx-map-format/#data
  const flagHorz = 0x80000000;
  const flagVert = 0x40000000;
  const flagDiag = 0x20000000;

  //TODO: Finish, add angle and achor values.
  return {
    spriteIndex: (tiledID & ~(flagHorz | flagVert | flagDiag)) -1,
    angle: 0,
    anchor: {x: 0, y: 0},
  }
}
