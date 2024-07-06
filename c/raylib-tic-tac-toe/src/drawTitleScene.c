#include <stdio.h>
#include "raylib.h"

#include "config.h"
#include "drawTitleScene.h"
#include "sprite.h"


int backgroundSize = 32;
int backgroundWidth = 10;
int backgroundHeight = 10;
int background[] = {
  1, 17, 18, 18, 18, 18, 18, 18, 19,  2,
  2, 20, 21, 21, 21, 21, 21, 21, 22,  1,
  0, 20, 21, 21, 21, 21, 21, 21, 22,  0,
  2, 20, 21, 21, 21, 21, 21, 21, 22,  1,
  0, 23, 24, 24, 24, 24, 24, 24, 25,  0,
  2,  0,  0, 00, 00,  0,  0,  0,  0,  1,
  0,  6,  3, 03, 03,  3,  3,  3,  9,  0,
  2,  6,  3, 03, 03,  3,  3,  3,  9,  1,
  0,  6,  3, 03, 03,  3,  3,  3,  9,  0, 
  2,  0,  0, 00, 00,  0,  0,  0,  0,  1
};


// TODO: Reactor so Font is not required.
void drawTitleScene(Texture2D texture, Config config, Font font) {

  for (int x = 0; x < backgroundWidth; x++) {
    for (int y = 0; y < backgroundHeight; y++) {
      int idx = x + (y * backgroundWidth);
      int spriteId = background[idx];

      if (spriteId == 0) {
        continue;
      }
      Sprite* sprite = getSpriteById(config, spriteId);
      if (sprite == NULL) {
        continue;
      }
      Rectangle destRec = {
        x * backgroundSize,
        y * backgroundSize,
        backgroundSize,
        backgroundSize
      };

      DrawTexturePro(
        texture, 
        sprite->rect,
        destRec, 
        (Vector2){0.5, 0.5}, 
        sprite->rotation,
        WHITE);
    }
  }

  // Draw the labels over the background.
  DrawTextEx(font, "Tic", 
    (Vector2){(backgroundSize * 2) + 8, (backgroundSize * 0) + 8},
    backgroundSize * 2, 8, WHITE);
  DrawTextEx(font, "Tac", 
    (Vector2){(backgroundSize * 3) + 4, (backgroundSize * 1) + 16},
    backgroundSize * 2, 8, WHITE);
  DrawTextEx(font, "Toe", 
    (Vector2){(backgroundSize * 4) + 8, (backgroundSize * 2) + 24},
    backgroundSize * 2, 8, WHITE);

  DrawText("Play", backgroundSize * 3,
           config.screenHeight - (backgroundSize * 4), backgroundSize, WHITE);
  DrawText("Config", backgroundSize * 3,
           config.screenHeight - (backgroundSize * 3), backgroundSize, MAGENTA);
  DrawText("Quit", backgroundSize * 3,
           config.screenHeight - (backgroundSize * 2), backgroundSize, WHITE);
}