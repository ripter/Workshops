import * as PIXI from 'pixi.js';

const loader = PIXI.Loader.shared;

//Create a Pixi Application
let app = new PIXI.Application({width: 800, height: 600, resolution: 2});
// let app = new PIXI.Application({width: 256, height: 256, resolution: 2});
// const app = new PIXI.Application();
window.game = app;

console.log('APP', app);

loader.add('tilesheet', 'assets/tilesheet.json')
  .load((loader, resources) => {
    console.log('resources', resources);

    const tiles = resources.tilesheet.spritesheet;
    console.log('tiles', tiles);
    const sprite = new PIXI.Sprite(tiles.textures['tile_0004.png']);
    sprite.x = 16;
    sprite.y = 16;
    // sprite.scale = 2;
    app.stage.addChild(sprite);
  });


//Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view);
