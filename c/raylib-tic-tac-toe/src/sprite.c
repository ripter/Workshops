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



// Draws a single sprite at the given position.
// Position is the top-left corner of the sprite.
void drawSprite(Texture2D texture, Config config, Vector2 position,
                int tileSize, int spriteId) {

  if (spriteId == 0) {
    return;
  }
  const int x = position.x;
  const int y = position.y;

  Sprite *sprite = getSpriteById(config, spriteId);
  Rectangle destRec = {x, y, tileSize, tileSize};
  Vector2 origin = {sprite->rect.width / 2, sprite->rect.height / 2};

  DrawTexturePro(texture, sprite->rect, destRec, origin, sprite->rotation,
                 WHITE);
}