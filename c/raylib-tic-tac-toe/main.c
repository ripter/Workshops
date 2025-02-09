#include <stdio.h>
#include <stdlib.h>
#include "raylib.h"

#include "main.h"
#include "src/Camera.h"
#include "src/Config.h"
#include "src/SceneTitle.h"
#include "src/SceneGameplay.h"

const char* configFilepath = "config.json";
static const int GRID_PADDING = 1; // Padding value for a single side of a grid cell.


// Buffer to hold on-screen text
static char buffer[256] = {0};

int main(void)
{
  // Load the application configuration
  Config *config = LoadConfig(configFilepath);
  Scene currentScene = TITLE;

  // Initialize window and the OpenGL context
  // NOTE: Most of the graphic functions must be called after window initialization
  //     : including loading textures, fonts, or creating render textures.
  InitWindow(config->screenWidth, config->screenHeight, config->windowTitle);

  // Load our textures
  const Texture2D texturePacked = LoadTexture(config->tilemapFile);
  const Rectangle framePlayerX = CalculateSpriteRect(config->tileSize, config->playerXTilemapPos);
  const Rectangle framePlayerY = CalculateSpriteRect(config->tileSize, config->playerOTilemapPos);

  // Load fonts
  Font titleFont = LoadFont("fonts/Poppins/Poppins-Bold.ttf");

  // Setup a camera to use in the game
  Camera2D camera = { 0 };
  camera.zoom = 1.0f; // Render at 1x scale



  // Initialize State
  // --------------------------------------------------------------------------------------
  SceneTitle *titleState = (SceneTitle *)malloc(sizeof(SceneTitle));
  if (titleState == NULL) {
    fprintf(stderr, "Failed to allocate memory for titleState\n");
    exit(1);
  }
  InitTitleScene(titleState);

  GameplayScene *gameplayState = (GameplayScene *)malloc(sizeof(GameplayScene)); 
  if (gameplayState == NULL) {
    fprintf(stderr, "Failed to allocate memory for gameplayState\n");
    exit(1);
  }
  InitGameplayScene(gameplayState);





  // Main game loop
  SetTargetFPS(60); 
  while (!WindowShouldClose()) // Detect window close button or ESC key
  {
    // Update State
    //--------------------------------------------------------------------------------------
    UpdateCameraZoom(&camera);

    if (currentScene == TITLE) {
      UpdateTitleScene(titleState, config);
    }
    else if (currentScene == GAMEPLAY) {
      UpdateGameplayScene(gameplayState, config);
    }


    // Draw State
    //----------------------------------------------------------------------------------
    BeginDrawing();
      ClearBackground(BLACK);
      BeginMode2D(camera);
      switch (currentScene) {
        case TITLE: {
          DrawTitleScene(titleState, config, texturePacked, titleFont);
        } break;
        case GAMEPLAY: {
          DrawGameplayScene(gameplayState, config, texturePacked);
        } break;
        default: {
          snprintf(buffer, sizeof(buffer), "Invalid Scene: %d", currentScene);
          DrawText(buffer, 0, 0, 8, WHITE);
        } break;
      }
      EndMode2D();
    EndDrawing();

    // Check for scene changes
    // --------------------------------------------------------------------------------------
    if (currentScene == TITLE) {
      if (titleState->nextScene.hasValue) {
        currentScene = titleState->nextScene.value;
        titleState->nextScene.hasValue = false;
      }
    }
  }

  // De-Initialization
  //--------------------------------------------------------------------------------------
  free(titleState);
  free(gameplayState);
  FreeConfig(config); // Free the configuration memory
  UnloadFont(titleFont);
  UnloadTexture(texturePacked);
  CloseWindow(); // Close window and OpenGL context
  //--------------------------------------------------------------------------------------
  return 0;
}

