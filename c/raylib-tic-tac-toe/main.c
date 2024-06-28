#include <stdio.h>
#include "raylib.h"
#include "externals/cJSON.h"
#include "load_json_file.h"
#include "main.h"

const char* configFilepath = "config.json";

int main(void)
{
  cJSON* json = read_json_file(configFilepath);
  if (json == NULL) {
    fprintf(stderr, "Failed to read JSON file\n");
    return 1;
  }

//     // Example: Accessing data from the JSON
  cJSON *name = cJSON_GetObjectItem(json, "tilemapFile");
  if (cJSON_IsString(name) && (name->valuestring != NULL))
  {
    printf("Name: %s\n", name->valuestring);
  }
  cJSON_Delete(json);


  // Initialization
  //--------------------------------------------------------------------------------------
  const int screenWidth = 256;
  const int screenHeight = 256;

  const Vector2 spriteSize = {8.0f, 8.0f}; // Size of sprites in pixels

  // Gameboard state
  int gameBoard[] = {1, 0, 0, 2, 0, 0, 0, 0, 0};

  // Initialize window before loading textures
  InitWindow(screenWidth, screenHeight, "TicTacToe!");

  // Load our textures
  // NOTE: Textures MUST be loaded after Window initialization (OpenGL context is required)
  const Texture2D texturePacked = LoadTexture("tilemap_packed.png");

  // Get the sprites for the player X and player Y
  const Rectangle framePlayerX = getSpriteRect(spriteSize, 4, 0);
  const Rectangle framePlayerY = getSpriteRect(spriteSize, 4, 1);


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
          Vector2 pos = {x * spriteSize.x, y * spriteSize.y};

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
Rectangle getSpriteRect(Vector2 spriteSize, int x, int y) {
  return (Rectangle){x * spriteSize.x, y * spriteSize.y, spriteSize.x, spriteSize.y};
}