#include <stdio.h>
#include "raylib.h"

#include "src/config.h"
#include "src/camera.h"
#include "src/draw.h"

const char* configFilepath = "./config.json";

int main(int argc, char* argv[]) {
  // Load the application configuration
  Config config = load_config(configFilepath);
  // Initialize window and the OpenGL context
  InitWindow(config.screenWidth, config.screenHeight, config.windowTitle);
  // Load textures
  const Texture2D texturePacked = LoadTexture(config.tilemapFile);

  // Camera
  Camera2D camera = { 0 };
  camera.zoom = 1.0f; // Render at 1x scale
  camera.target = (Vector2){config.screenWidth / 2.0f, config.screenHeight / 2.0f};
  camera.offset = (Vector2){config.screenWidth / 2.0f, config.screenHeight / 2.0f};
  char zoomText[256] = {0}; // Buffer to hold on-screen text

  int spriteId = 1;
  float lastZoom = camera.zoom;

  SetTargetFPS(60); 
  // Main game loop
  while (!WindowShouldClose()) {
    // Update State
    //----------------------------------------------------------------------------------
    camera.zoom = getCameraZoom(camera.zoom);
    // Update the zoom text
    snprintf(zoomText, sizeof(zoomText), "Press [1-0] to set camera zoom. (Zoom: %.2f)", camera.zoom);

    int xCenter = (config.screenWidth / 2) - (config.tileSize / 2);
    int yCenter = (config.screenHeight / 2) - (config.tileSize / 2);

    if (lastZoom != camera.zoom){
      printf("x: %d, y: %d\ttileSize: %d, zoom: %f\n", xCenter, yCenter, config.tileSize, camera.zoom);
      lastZoom = camera.zoom;
    }

    // Draw State
    //----------------------------------------------------------------------------------
    BeginDrawing();
    {
      ClearBackground(BLACK);
      BeginMode2D(camera);
      {
        drawSprite(texturePacked, config, (Vector2){xCenter, yCenter}, config.tileSize, 1);
      }
      EndMode2D();
      // Draw Text on top of everything else.
      DrawText(zoomText, 10, 10, 10, GRAY);
    }
    EndDrawing();
  }

  // De-Initialization
  //--------------------------------------------------------------------------------------
  UnloadTexture(texturePacked);
  CloseWindow(); // Close window and OpenGL context
  //--------------------------------------------------------------------------------------
  return 0;
}
