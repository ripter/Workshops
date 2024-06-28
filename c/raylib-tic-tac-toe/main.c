#include <stdio.h>
#include <stdlib.h>
#include "raylib.h"

#include "externals/cJSON.h"
#include "src/config.h"
#include "src/file_utils.h"
#include "main.h"

const char* configFilepath = "config.json";
const int GRID_PADDING = 1; // Padding value for a single side of a grid cell.

int main(void)
{
  // Load the application configuration
  Config config = load_config(configFilepath);
  // Gameboard state
  int gameBoard[] = {1, 0, 0, 2, 1, 0, 0, 0, 0};


  // Initialize window and the OpenGL context
  InitWindow(config.screenWidth, config.screenHeight, config.windowTitle);

  // Load our textures
  // NOTE: Textures MUST be loaded after Window initialization (OpenGL context is required)
  const Texture2D texturePacked = LoadTexture(config.tilemapFile);
  const Rectangle framePlayerX = getSpriteRect(config.spriteSize, config.playerXTilemapPos);
  const Rectangle framePlayerY = getSpriteRect(config.spriteSize, config.playerYTilemapPos);
  const Rectangle frameBar = getSpriteRect(config.spriteSize, (Vector2){2, 7});


  // Setup a camera to use in the game
  Camera2D camera = { 0 };
  camera.zoom = 8.0f; // Render at 8x scale

  SetTargetFPS(60); // Set our game to run at 60 frames-per-second
  //--------------------------------------------------------------------------------------

  EvenlySpacedValues xPositions = generateEvenlySpacedValues(0.0f, config.screenWidth, config.spriteSize.x, 3);
  EvenlySpacedValues yPositions = generateEvenlySpacedValues(0.0f, config.screenHeight, config.spriteSize.y, 3);
  if (xPositions.count == 0 || yPositions.count == 0) {
    printf("Failed to generate evenly spaced values\n");
    return 1;
  }

  // Main game loop
  while (!WindowShouldClose()) // Detect window close button or ESC key
  {
    // Update State



    // Draw State
    //----------------------------------------------------------------------------------
    BeginDrawing();
      ClearBackground(RAYWHITE);
      BeginMode2D(camera);
        // Draw the grid
        // for (int x = 0; x <= 3; x++) {
        //     DrawLineEx((Vector2){ x * config.spriteSize.x, 0 }, (Vector2){ x * config.spriteSize.x, 3 * config.spriteSize.y }, 1, RED);
        // }
        // for (int y = 0; y <= 3; y++) {
        //     DrawLineEx((Vector2){ 0, y * config.spriteSize.y }, (Vector2){ 3 * config.spriteSize.x, y * config.spriteSize.y }, 1, RED);
        // }

            // Draw the grid lines
        for (int x = 1; x < 3; x++) {
          float posX = x * (config.spriteSize.x + GRID_PADDING) - (GRID_PADDING / 2);
          DrawLineEx((Vector2){ posX, 0 }, (Vector2){ posX, config.screenHeight }, 1, RED);
        }
        for (int y = 1; y < 3; y++) {
          float posY = y * (config.spriteSize.y + GRID_PADDING) - (GRID_PADDING / 2);
          DrawLineEx((Vector2){ 0, posY }, (Vector2){ config.screenWidth, posY }, 1, RED);
        }

        // Draw Tiles
        for (int x = 0; x < 3; x++) {
          for (int y = 0; y < 3; y++) {
            int idx = x + y * 3;
            TileState tileState = gameBoard[idx];
            Rectangle destRec = { 
              (x * config.spriteSize.x) + (x * GRID_PADDING),
              (y * config.spriteSize.y) + (y * GRID_PADDING),
              config.spriteSize.x, 
              config.spriteSize.y 
            };
            Rectangle frameTile = {};
            if (tileState == PLAYER_X) {
              frameTile = framePlayerX;
            }
            else if (tileState == PLAYER_O) {
              frameTile = framePlayerY;
            }
            if (tileState != EMPTY) {
              DrawTexturePro(texturePacked, frameTile, destRec, (Vector2){0, 0}, 0.0f, WHITE);
            }
          }
        }
      EndMode2D();
    EndDrawing();
  }

  // De-Initialization
  //--------------------------------------------------------------------------------------
  free(xPositions.values);
  free(yPositions.values);
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


EvenlySpacedValues generateEvenlySpacedValues(float start, float end, float size, int count) {
  EvenlySpacedValues result;
  result.values = (float*)malloc(count * sizeof(float));
  if (!result.values) {
    printf("Memory allocation failed\n");
    result.count = 0;
    return result;
  }

  result.count = count;
  float step = (end - start - size) / (count - 1);

  for (int i = 0; i < count; i++) {
    result.values[i] = start + i * step;
  }

  return result;
}