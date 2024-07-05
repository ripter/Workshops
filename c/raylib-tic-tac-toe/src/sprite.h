#ifndef TTT_SRC_SPRITE_H
#define TTT_SRC_SPRITE_H
#include "types.h"

Rectangle getSpriteRect(int spriteSize, Vector2 position);
Sprite* getSpriteById(Config config, int id);

#endif // TTT_SRC_SPRITE_H