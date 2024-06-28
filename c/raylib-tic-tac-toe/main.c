#include <stdio.h>
#include "raylib.h"

#include "externals/cJSON.h"
#include "src/config.h"
#include "src/file_utils.h"
#include "main.h"

const char* configFilepath = "config.json";

int main(void)
{
  Config config = load_config(configFilepath);

  // const Vector2 spriteSize = {8.0f, 8.0f}; // Size of sprites in pixels

  // Gameboard state
  int gameBoard[] = {1, 0, 0, 2, 0, 0, 0, 0, 0};

  // Initialize window before loading textures
  InitWindow(config.screenWidth, config.screenHeight, "TicTacToe!");

  // Load our textures
  // NOTE: Textures MUST be loaded after Window initialization (OpenGL context is required)
  const Texture2D texturePacked = LoadTexture(config.tilemapFile);
  const Rectangle framePlayerX = getSpriteRect(config.spriteSize, config.playerXTilemapPos);
  const Rectangle framePlayerY = getSpriteRect(config.spriteSize, config.playerYTilemapPos);


  // Setup a camera to use in the game
  Camera2D camera = { 0 };
  camera.zoom = 8.0f; // Render at 8x scale

  SetTargetFPS(60); // Set our game to run at 60 frames-per-second
  //--------------------------------------------------------------------------------------

  // Main game loop
  while (!WindowShouldClose()) // Detect window close button or ESC key
  {
    // Update State



    // Draw State
    //----------------------------------------------------------------------------------
    BeginDrawing();
      ClearBackground(RAYWHITE);
      BeginMode2D(camera);
        for (int idx = 0; idx < 10; idx++) {
          // Convert the index to x and y coordinates
          int x = idx % 3;
          int y = idx / 3;
          Vector2 pos = {x * config.spriteSize.x, y * config.spriteSize.y};

          if (gameBoard[idx] == 1) {
            DrawTextureRec(texturePacked, framePlayerX, pos, WHITE);
          } else if (gameBoard[idx] == 2) {
            DrawTextureRec(texturePacked, framePlayerY, pos, WHITE);
          }
        }
      EndMode2D();
    EndDrawing();
  }

  // De-Initialization
  //--------------------------------------------------------------------------------------
  UnloadTexture(texturePacked);
  CloseWindow(); // Close window and OpenGL context
  //--------------------------------------------------------------------------------------
  return 0;
}


/**
 * @brief Get the Sprite Rect object
 * Helper function to make getting a single sprite from a sprite sheet easier.
 * @param spriteSize 
 * @param x 
 * @param y 
 * @return Rectangle 
 */
Rectangle getSpriteRect(Vector2 spriteSize, Vector2 position) {
  int x = position.x;
  int y = position.y;
  return (Rectangle){x * spriteSize.x, y * spriteSize.y, spriteSize.x, spriteSize.y};
}