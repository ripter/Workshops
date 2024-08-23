#pragma once

#include "raylib.h"
#include "types.h"

Rectangle CalculateSpriteRect(int spriteSize, Vector2 position);
Sprite *FindSpriteById(const Config *config, int id);
void DrawSprite(Texture2D texture, const Config *config, Vector2 position, int tileSize, int spriteId);
