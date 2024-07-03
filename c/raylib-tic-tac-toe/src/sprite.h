#ifndef TTT_SRC_SPRITE_H
#define TTT_SRC_SPRITE_H
#include "raylib.h"


typedef struct {
  int id;
  Rectangle rect;
  int rotation;
} Sprite;


Rectangle getSpriteRect(int spriteSize, Vector2 position);


#endif // TTT_SRC_SPRITE_H