#include <stdio.h>
#include <stdlib.h>
#include "raylib.h"

#include "externals/cJSON.h"
#include "src/config.h"
#include "src/draw.h"
#include "src/file_utils.h"
#include "src/sprite.h"
#include "src/drawTitleScene.h"
#include "main.h"

const char* configFilepath = "config.json";
const int GRID_PADDING = 1; // Padding value for a single side of a grid cell.

int main(void)
{
  // Load the application configuration
  Config config = load_config(configFilepath);
  Scene currentScene = TITLE;
  // Gameboard state
  TileState gameBoard[] = {
    EMPTY, EMPTY, EMPTY,
    EMPTY, PLAYER_X, EMPTY,
    PLAYER_O, EMPTY, EMPTY,
  };

  // Buffer to hold on-screen text
  char buffer[256] = {0};


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
      // SetMouseScale(8.0f, 8.0f);
    }
    else if (IsKeyPressed(KEY_NINE)) {
      camera.zoom = 9.0f;
    }
    else if (IsKeyPressed(KEY_ZERO)) {
      camera.zoom = 10.0f;
    }


    if (IsMouseButtonPressed(MOUSE_LEFT_BUTTON)) {
      Vector2 mousePos = GetScreenToWorld2D(GetMousePosition(), camera);
      int x = (int)(mousePos.x / (config.tileSize + GRID_PADDING));
      int y = (int)(mousePos.y / (config.tileSize + GRID_PADDING));
      int idx = x + (y * 3);
      if (gameBoard[idx] == EMPTY) {
        gameBoard[idx] = PLAYER_X;
      }
      else if (gameBoard[idx] == PLAYER_X) {
        gameBoard[idx] = PLAYER_O;
      }
      else if (gameBoard[idx] == PLAYER_O) {
        gameBoard[idx] = EMPTY;
      }
    }


    // Draw State
    //----------------------------------------------------------------------------------
    BeginDrawing();
      ClearBackground(BLACK);
      BeginMode2D(camera);
      switch (currentScene) {
        case TITLE: {
          drawTitleScene(texturePacked, config);
        } break;
        case GAMEPLAY: {
          drawGameBoard(texturePacked, gameBoard, config.tileSize, GRID_PADDING,
                        framePlayerX, framePlayerY);
          snprintf(buffer, sizeof(buffer), "Camera Zoom: %.0f", camera.zoom);
          DrawText(buffer, 0, 0, 8, WHITE);
        } break;
        default: {
          snprintf(buffer, sizeof(buffer), "Invalid Scene: %d", currentScene);
          DrawText(buffer, 0, 0, 8, WHITE);
        } break;
      }
      EndMode2D();
    EndDrawing();
  }

  // De-Initialization
  //--------------------------------------------------------------------------------------
  free_config(config); // Free the configuration memory
  UnloadTexture(texturePacked);
  CloseWindow(); // Close window and OpenGL context
  //--------------------------------------------------------------------------------------
  return 0;
}

