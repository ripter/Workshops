#include <stdio.h>
#include "raylib.h"
#include "main.h"

int main(void)
{
  // Initialization
  //--------------------------------------------------------------------------------------
  const int screenWidth = 256;
  const int screenHeight = 256;

  const Vector2 spriteSize = {8.0f, 8.0f}; // Size of sprites in the texture
  const float scaleFactor = 8.0f; // How much to scale the sprite when drawing.
  const Vector2 scaleOrigin = { 0.0f, 0.0f }; // Define the origin for scaling and rotation (center of the destination rectangle)

  // Gameboard state
  int gameBoard[] = {1, 0, 0, 2, 0, 0, 0, 0, 0};

  // Initialize window before loading textures
  InitWindow(screenWidth, screenHeight, "TicTacToe!");

  // Load our textures
  // NOTE: Textures MUST be loaded after Window initialization (OpenGL context is required)
  const Texture2D texturePacked = LoadTexture("tilemap_packed.png");

  // Calculate the source rectangle for each sprite in the texture.
  const Rectangle framePlayerX = getSpriteRect(spriteSize, 4, 0);
  const Rectangle framePlayerY = getSpriteRect(spriteSize, 4, 1);

  // const Vector2 pos = {0.0f, 0.0f};
  // Calculate the destination rectangle
  // Rectangle destRec = { pos.x, pos.y, frameRec.width * scaleFactor, frameRec.height * scaleFactor };

  // Vector2 origin = { frameRec.width * scaleFactor / 2.0f, frameRec.height * scaleFactor / 2.0f };


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

      for (int idx = 0; idx < 10; idx++) {
        int x = idx % 3;
        int y = idx / 3;
        Rectangle destRec = { x * spriteSize.x * scaleFactor, y * spriteSize.y * scaleFactor, spriteSize.x * scaleFactor, spriteSize.y * scaleFactor };
        // Vector2 origin = { spriteSize.x * scaleFactor / 2.0f, spriteSize.y * scaleFactor / 2.0f };

        if (gameBoard[idx] == 1) {
          DrawTexturePro(texturePacked, framePlayerX, destRec, scaleOrigin, 0.0f, WHITE);
        } else if (gameBoard[idx] == 2) {
          DrawTexturePro(texturePacked, framePlayerY, destRec, scaleOrigin, 0.0f, WHITE);
        }
      }
      

    // DrawTextureRec(texturePacked, frameRec, pos, WHITE);

    // DrawTexturePro(texturePacked, frameRec, destRec, origin, 0.0f, WHITE);
    // // DrawTexture(texturePacked, 0, 0, WHITE);
    // // DrawTextureV(texturePacked, pos, WHITE);
    // DrawText("Congrats! You created your first window!", 190, 200, 20, LIGHTGRAY);

    EndDrawing();
    //----------------------------------------------------------------------------------
    // printf("Frame time: %f\n", GetFrameTime());
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