#include <stdio.h>
#include "raylib.h"

#include "src/Config.h"
#include "src/Camera.h"
#include "src/Sprite.h"

const char* configFilepath = "./config.json";
const int fontSize = 12;

int main(int argc, char* argv[]) {
  // Load the application configuration
  Config *config = LoadConfig(configFilepath);
  
  // Initialize window and the OpenGL context
  InitWindow(config->screenWidth, config->screenHeight, config->windowTitle);
  // Load textures
  const Texture2D texturePacked = LoadTexture(config->tilemapFile);

  // Camera
  Camera2D camera = { 0 };
  camera.zoom = 10.0f; // Render at 1x scale
  camera.target = (Vector2){config->screenWidth / 2.0f, config->screenHeight / 2.0f};
  camera.offset = (Vector2){config->screenWidth / 2.0f, config->screenHeight / 2.0f};
  char zoomText[256] = {0}; // Buffer to hold on-screen text

  int xCenter = (config->screenWidth / 2);
  int yCenter = (config->screenHeight / 2);

  int spriteId = 1;
  char spriteIdText[256] = {0};

  SetTargetFPS(60); 
  // Main game loop
  while (!WindowShouldClose()) {
    // Update State
    //----------------------------------------------------------------------------------
    UpdateCameraZoom(&camera);

    if (IsKeyPressed(KEY_UP)) {
      spriteId++;
    } else if (IsKeyPressed(KEY_DOWN)) {
      spriteId--;
    }

    if (spriteId > config->numberOfSprites) {
      spriteId = 1;
    } else if (spriteId < 1) {
      spriteId = config->numberOfSprites;
    }

    // Update Label Text
    snprintf(zoomText, sizeof(zoomText), "[1-0, -, +] to set camera zoom. (Zoom: %.2f)", camera.zoom);
    snprintf(spriteIdText, sizeof(spriteIdText), "[up, down] to set Sprite ID. (Currend: %d)", spriteId);


    // Draw State
    //----------------------------------------------------------------------------------
    BeginDrawing();
    {
      ClearBackground(BLACK);
      BeginMode2D(camera);
      {
        DrawSprite(texturePacked, config, (Vector2){xCenter, yCenter}, config->tileSize, spriteId);
      }
      EndMode2D();

      // Draw Text on top of everything else.
      DrawText(zoomText, fontSize, config->screenHeight - (fontSize * 1), fontSize, RAYWHITE);
      DrawText(spriteIdText, fontSize, config->screenHeight - (fontSize * 2), fontSize, RAYWHITE);

    }
    EndDrawing();
  }

  // De-Initialization
  //--------------------------------------------------------------------------------------
  FreeConfig(config);
  UnloadTexture(texturePacked);
  CloseWindow(); // Close window and OpenGL context
  //--------------------------------------------------------------------------------------
  return 0;
}
