#include <stdio.h>
#include "raylib.h"
#include "sprite.h"
#include "config.h"

// Returns a rectangle that represents the sprite at the given position.
Rectangle getSpriteRect(int spriteSize, Vector2 position) {
  return (Rectangle){
    position.x * spriteSize, 
    position.y * spriteSize, 
    spriteSize, 
    spriteSize
  };
}


Sprite* getSpriteById(Config config, int id) {
  Sprite* sprites = config.sprites;
  int numberOfSprites = config.numberOfSprites;

  for (int idx = 0; idx < numberOfSprites; idx++) {
    if (sprites[idx].id == id) {
      return &sprites[idx];
    }
  }

  return NULL;
}


