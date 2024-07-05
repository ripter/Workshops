#include <stdio.h>
#include "raylib.h"

#include "config.h"
#include "drawTitleScene.h"
#include "sprite.h"


int backgroundSize = 32;
int backgroundWidth = 10;
int backgroundHeight = 10;
int background[] = {
  1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 2, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 1, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 2, 0, 0, 0, 0, 0, 0,
  0, 6, 3, 3, 3, 3, 3, 3, 9, 0,
  0, 0, 0, 0, 0, 2, 0, 0, 0, 0,
  0, 6, 3, 3, 3, 3, 3, 3, 9, 0,
  0, 6, 3, 3, 3, 3, 3, 3, 9, 0,
  0, 6, 3, 3, 3, 3, 3, 3, 9, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 0, 2
};


void drawTitleScene(Texture2D texture, Config config) {

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
  DrawText("Play", backgroundSize * 3,
           config.screenHeight - (backgroundSize * 6), backgroundSize, WHITE);
  DrawText("Config", backgroundSize * 3,
           config.screenHeight - (backgroundSize * 4), backgroundSize, MAGENTA);
  DrawText("Quit", backgroundSize * 3,
           config.screenHeight - (backgroundSize * 2), backgroundSize, WHITE);
}