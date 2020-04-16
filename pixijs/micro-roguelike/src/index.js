// ECSY Version 0.2.3
import { World, System, Component, Not } from "https://ecsy.io/build/ecsy.module.js";

const VIEW_WIDTH = 320;
const VIEW_HEIGHT = 200;

// Pixi Application
const pixi = window.pixi = new PIXI.Application({
  resolution: window.devicePixelRatio,
  // autoDensity: true,
  view: window.elCanvas,
  width: VIEW_WIDTH,
  height: VIEW_HEIGHT,
});
// ECSY World
const world = new World();


//
// Starts the game
function startGame() {
  world
    .registerSystem(TextureSystem)
    .registerSystem(SpriteSystem)
    .registerSystem(AnimatedSpriteSystem)
    .registerSystem(PixiStageSystem)
    .registerSystem(InputSystem)
    .registerSystem(MovementSystem)

  //
  // Create an animated sprite for the player to play around with.
  world.createEntity()
    .addComponent(LoadTexture, {
      value: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/775705/people.json',
      type: SpriteSheet,
    })
    .addComponent(Position, {value: {x: 0, y: 0}})
    .addComponent(LoadAnimatedSprite)


   world.createEntity()
    .addComponent(LoadTexture, {
      value: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/775705/people.png',
      type: Texture,
    })
    .addComponent(LoadSprite)
    .addComponent(Position, {value: {x: 100, y: 100}})


  // Start the Game loop.
  // Use Pixi's ticker for the game loop.
  pixi.ticker.add(delta => {
    world.execute(delta);
  });
}


//
// ECSY Components
// These hold data and provive a way to query entities.
//

// Helper class, defines a single value called `value`.
class SingleValueComponent extends Component {
  constructor() {
    super();
    this.reset();
  }
  reset() {
    this.value = null;
  }
  set(obj) {
    this.value = obj.value;
  }
}


// Textures, aka PIXI.Texture
class LoadTexture extends Component {
  constructor() {
    super();
    this.reset();
  }
  reset() {
    this.value = null;
    this.type = Texture;
  }
  set(obj) {
    this.value = obj.value;
    this.type = obj.type;
  }
}
class SpriteSheet extends SingleValueComponent {}
class Texture extends SingleValueComponent {}


// PIXI.Sprite
class LoadSprite extends SingleValueComponent {}
class LoadAnimatedSprite extends SingleValueComponent {}
class Sprite extends SingleValueComponent {}
class AnimatedSprite extends SingleValueComponent {}


class Position extends SingleValueComponent {}
class Velocity extends SingleValueComponent {}




//
// ECSY Systems
// Updates data in the components.
//
//
// Adds Sprites to the PIXI Stage so they will be visible.
class PixiStageSystem extends System {
  static queries = {
    sprites: {
      components: [Sprite],
      listen: {
        added: true,
      }
    },
    animatedSprites: {
      components: [AnimatedSprite],
      listen: {
        added: true,
      }
    },
  }
  execute(delta) {
    const { sprites, animatedSprites } = this.queries;
    let sprite;

    [...sprites.added, ...animatedSprites.added].forEach(entity => {
      let sprite;
      if (entity.hasComponent(Sprite)) {
        sprite = entity.getComponent(Sprite).value;
      }
      else if (entity.hasComponent(AnimatedSprite)) {
        sprite = entity.getComponent(AnimatedSprite).value;
        sprite.animationSpeed = 0.15;
        sprite.play();
      }

      pixi.stage.addChild(sprite);
    });
  }
}

//
// Turns LoadTexture components into Texture components.
class TextureSystem extends System {
  static queries = {
    toLoad: {
      components: [LoadTexture],
      listen: {
        added: true,
      },
    },
  }
  execute(delta) {
    const { toLoad } = this.queries;
    //
    // Add textures waiting to be loaded.
    toLoad.added.map(entity => {
      const src = entity.getComponent(LoadTexture).value;
      // Skip if we already have this resource.
      if (pixi.loader.resources[src]) { return; }
      // Add the resource to the queue to load.
      pixi.loader.add(src);
    });
    if (toLoad.added.length > 0) {
      pixi.loader.load();
    }

    //
    // Once the resource has loaded, swap out the Loading for a real component.
    toLoad.results.forEach(entity => {
      const {value: src, type: component} = entity.getComponent(LoadTexture);
      let valueKey;

      switch (component) {
        case SpriteSheet:
          valueKey = 'spritesheet'
          break;
        default:
          valueKey = 'texture';
      }

      // Skip if we don't have the resource yet.
      if (!pixi.loader.resources[src][valueKey]) { return; }
      // mark the entity as being loaded.
      entity.removeComponent(LoadTexture);
      // Add the component with the loaded resource.
      entity.addComponent(component, {value: pixi.loader.resources[src][valueKey]});
    });
  }
}

//
// Turns LoadSprite components into Sprite components.
class SpriteSystem extends System {
  static queries = {
    toLoad: {
      components: [LoadSprite, Texture]
    }
  }
  execute(delta) {
    this.queries.toLoad.results
    .forEach(entity => {
      const texture = entity.getComponent(Texture).value;
      // Create the Sprite in PIXI
      const sprite = new PIXI.Sprite(texture);

      entity.removeComponent(LoadSprite);
      entity.addComponent(Sprite, {value: sprite});
    });
  }
}


class AnimatedSpriteSystem extends System {
  static queries = {
    toLoad: {
      components: [LoadAnimatedSprite, SpriteSheet],
      listen: {
        added: true,
      }
    }
  }
  execute(delta) {
    const { toLoad } = this.queries;
    //
    // Load Animated Sprite
    toLoad.added.forEach(entity => {
      const spritesheet = entity.getComponent(SpriteSheet).value;
      console.log('spritesheet', spritesheet);
      const animSprite = new PIXI.AnimatedSprite(spritesheet.animations.green_shirt_right);

      entity.removeComponent(LoadAnimatedSprite);
      entity.addComponent(AnimatedSprite, {value: animSprite});
    });
  }
}

// Updates sprite position based on Position and Velocity
class MovementSystem extends System {
  static queries = {
    staticSprites: {
      components: [Sprite, Position],
    },
    movingSprites: {
      components: [Sprite, Position, Velocity],
    }
  }
  execute(delta) {
    // Position all the static sprites when they change
    this.queries.staticSprites.results
    .forEach(entity => {
      const sprite = entity.getComponent(Sprite).value;
      const position = entity.getComponent(Position).value;
      // Update the sprite position.
      sprite.position.copyFrom(position);
    });

    // Position the moving sprites each tick.
    this.queries.movingSprites.results
    .forEach(entity => {
      const { frame } = entity.getComponent(Texture).value;
      const sprite = entity.getComponent(Sprite).value;
      const position = entity.getComponent(Position).value;
      const velocity = entity.getComponent(Velocity).value;

      position.x += velocity.x;
      position.y += velocity.y;

      // Wrap around the X axis
      if (position.x > VIEW_WIDTH) {
        position.x = 0 - frame.width;
      }
      else if ((position.x + frame.width) < 0) {
        position.x = VIEW_WIDTH;
      }

      // Update the sprite.
      sprite.position.copyFrom(position);
    });
  }
}

//
// Listens for User input, like WASD or Arrow keys.
class InputSystem extends System {
  static queries = {

  }
  init() {

  }
  execute(delta) {

  }
}

startGame();
