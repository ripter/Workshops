#include <stdio.h>
#include <stdlib.h>
#include "raylib.h"

#include "externals/cJSON.h"
#include "src/config.h"
#include "src/draw.h"
#include "src/file_utils.h"
#include "src/sprite.h"
#include "main.h"

const char* configFilepath = "config.json";
const int GRID_PADDING = 0; // Padding value for a single side of a grid cell.

int main(void)
{
  // Load the application configuration
  Config config = load_config(configFilepath);
  // Gameboard state
  TileState gameBoard[] = {
    EMPTY, EMPTY, EMPTY,
    EMPTY, PLAYER_X, EMPTY,
    PLAYER_O, EMPTY, EMPTY,
  };
  int gameBoardWidth = 3;
  int gameBoardHeight = 3;


  // Initialize window and the OpenGL context
  InitWindow(config.screenWidth, config.screenHeight, config.windowTitle);

  // Load our textures
  // NOTE: Textures MUST be loaded after Window initialization (OpenGL context is required)
  const Texture2D texturePacked = LoadTexture(config.tilemapFile);
  const Rectangle framePlayerX = getSpriteRect(config.tileSize, config.playerXTilemapPos);
  const Rectangle framePlayerY = getSpriteRect(config.tileSize, config.playerOTilemapPos);
  // const Rectangle frameBar = getSpriteRect(config.tileSize, (Vector2){1, 7});


  // Setup a camera to use in the game
  Camera2D camera = { 0 };
  // camera.zoom = 8.0f; // Render at 8x scale
  camera.zoom = 1.0f; // Render at 1x scale

  SetTargetFPS(60); // Set our game to run at 60 frames-per-second
  //--------------------------------------------------------------------------------------


  // Main game loop
  while (!WindowShouldClose()) // Detect window close button or ESC key
  {
    // Update State

    if (IsKeyPressed(KEY_ONE)) {
      camera.zoom = 1.0f;
    }
    else if (IsKeyPressed(KEY_TWO)) {
      camera.zoom = 2.0f;
    }
    else if (IsKeyPressed(KEY_THREE)) {
      camera.zoom = 3.0f;
    }
    else if (IsKeyPressed(KEY_FOUR)) {
      camera.zoom = 4.0f;
    }
    else if (IsKeyPressed(KEY_FIVE)) {
      camera.zoom = 5.0f;
    }
    else if (IsKeyPressed(KEY_SIX)) {
      camera.zoom = 6.0f;
    }
    else if (IsKeyPressed(KEY_SEVEN)) {
      camera.zoom = 7.0f;
    }
    else if (IsKeyPressed(KEY_EIGHT)) {
      camera.zoom = 8.0f;
    }
    else if (IsKeyPressed(KEY_NINE)) {
      camera.zoom = 9.0f;
    }
    else if (IsKeyPressed(KEY_ZERO)) {
      camera.zoom = 10.0f;
    }




    // Draw State
    //----------------------------------------------------------------------------------
    BeginDrawing();
      ClearBackground(RAYWHITE);
      BeginMode2D(camera);
        drawGameBoard(texturePacked, gameBoard, gameBoardWidth, GRID_PADDING, framePlayerX, framePlayerY);
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

