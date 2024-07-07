#include <stdio.h>
#include "raylib.h"

#include "../main.h"
#include "draw.h"
#include "sprite.h"

void drawGameBoard(Texture2D texture, TileState gameboard[9], int gridSize, int padding, Rectangle framePlayerX, Rectangle framePlayerO) {
  // Draw Tiles
  for (int x = 0; x < 3; x++) {
    for (int y = 0; y < 3; y++) {
      int idx = x + (y * 3);
      TileState tileState = gameboard[idx];
      Rectangle destRec = {(x * gridSize) + (x * padding),
                           (y * gridSize) + (y * padding),
                           gridSize, gridSize};
      Rectangle frameTile = {};

      if (tileState == PLAYER_X) {
        frameTile = framePlayerX;
      } else if (tileState == PLAYER_O) {
        frameTile = framePlayerO;
      } 

      if (tileState != EMPTY) {
        DrawTexturePro(texture, frameTile, destRec, (Vector2){0, 0}, 0.0f, WHITE);
      }
    }
  }
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