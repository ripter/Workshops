#ifndef TTT_SRC_SPRITE_H
#define TTT_SRC_SPRITE_H

#include "raylib.h"
#include "config.h"
#include "types.h"

Rectangle CalculateSpriteRect(int spriteSize, Vector2 position);
Sprite *FindSpriteById(const Config *config, int id);
void DrawSprite(Texture2D texture, const Config *config, Vector2 position, int tileSize, int spriteId);

#endif // TTT_SRC_SPRITE_H
