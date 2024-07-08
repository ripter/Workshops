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

void DrawTextShadowed(const char* text, int x, int y, int fontSize, Color fg, Color bg) {
  DrawText(text, x + 3, y + 3, fontSize, bg);
  DrawText(text, x, y, fontSize, fg);
}
