#include "raylib.h"
#include "sprite.h"

// Returns a rectangle that represents the sprite at the given position.
Rectangle getSpriteRect(int spriteSize, Vector2 position) {
  return (Rectangle){
    position.x * spriteSize, 
    position.y * spriteSize, 
    spriteSize, 
    spriteSize
  };
}