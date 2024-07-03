#include "raylib.h"

#include "config.h"
#include "drawTitleScene.h"


void drawTitleScene(Texture2D texture, Config config) {
  DrawText("Tic Tac Toe", 20, 20, 40, LIGHTGRAY);
  DrawText("Click Start", 20, 80, 40, LIGHTGRAY);

  DrawTexturePro(
    texture, 
    (Rectangle){config.playerXTilemapPos.x, config.playerXTilemapPos.y, config.tileSize, config.tileSize},
    (Rectangle){20, 120, 64, 64}, 
    (Vector2){0, 0}, 
    0, 
    WHITE);
}