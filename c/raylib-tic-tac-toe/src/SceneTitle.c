#include <stdlib.h>
#include "raylib.h"

#include  "SceneTitle.h"
#include "draw.h"


int backgroundSize = 32;
int backgroundWidth = 10;
int backgroundHeight = 10;
int background[] = {
  0, 17, 18, 18, 18, 18, 18, 18, 19,  0,
  0, 20, 21, 21, 21, 21, 21, 21, 22,  0,
  0, 20, 21, 21, 21, 21, 21, 21, 22,  0,
  0, 20, 21, 21, 21, 21, 21, 21, 22,  0,
  0, 23, 24, 24, 24, 24, 24, 24, 25,  0,
  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
  0,  0,  3,  3,  3,  3,  3,  3,  0,  0,
  0,  0,  3,  3,  3,  3,  3,  3,  0,  0,
  0,  0,  3,  3,  3,  3,  3,  3,  0,  0 
};


SceneTitle UpdateTitleScene(SceneTitle state) { 
  // Arrow keys to navigate the menu
  if (IsKeyPressed(KEY_UP)) {
    state.ActiveChoice -= 1;
  } else if (IsKeyPressed(KEY_DOWN)) {
    state.ActiveChoice += 1;
  }

  return state;
}


// TODO: Reactor so Font is not required.
void DrawTitleScene(SceneTitle state, Texture2D texture, Config config,
                    Font font) {

  for (int x = 0; x < backgroundWidth; x++) {
    for (int y = 0; y < backgroundHeight; y++) {
      int idx = x + (y * backgroundWidth);
      int spriteId = background[idx];

      drawSprite(texture, config,
                 (Vector2){x * backgroundSize, y * backgroundSize},
                 backgroundSize, spriteId);
    }
  }

  // Get the Y position of the selected menu item.
  int activeY =
      config.screenHeight - (backgroundSize * (state.ActiveChoice + 2));

  // Draw special tiles for the selected menu item.
  drawSprite(texture, config, (Vector2){backgroundSize * 1, activeY},
             backgroundSize, 5);
  drawSprite(texture, config, (Vector2){backgroundSize * 8, activeY},
             backgroundSize, 9);

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