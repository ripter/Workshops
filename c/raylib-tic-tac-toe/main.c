#include <stdio.h>
#include <stdlib.h>
#include "raylib.h"

#include "main.h"
#include "src/Camera.h"
#include "src/Config.h"
#include "src/draw.h"
#include "src/SceneTitle.h"
#include "src/SceneGameplay.h"

const char* configFilepath = "config.json";
const int GRID_PADDING = 1; // Padding value for a single side of a grid cell.

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
  titleState->ActiveChoice = TitleChoicePlay;

  GameplayScene *gameplayState = (GameplayScene *)malloc(sizeof(GameplayScene)); 


  // Gameboard state
  TileState gameBoard[] = {
    EMPTY, EMPTY, EMPTY,
    EMPTY, PLAYER_X, EMPTY,
    PLAYER_O, EMPTY, EMPTY,
  };

  // Buffer to hold on-screen text
  char buffer[256] = {0};





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
    // // Mouse Clicks on Gameboard
    // if (IsMouseButtonPressed(MOUSE_LEFT_BUTTON)) {
    //   Vector2 mousePos = GetScreenToWorld2D(GetMousePosition(), camera);
    //   int x = (int)(mousePos.x / (config->tileSize + GRID_PADDING));
    //   int y = (int)(mousePos.y / (config->tileSize + GRID_PADDING));
    //   int idx = x + (y * 3);
    //   if (gameBoard[idx] == EMPTY) {
    //     gameBoard[idx] = PLAYER_X;
    //   }
    //   else if (gameBoard[idx] == PLAYER_X) {
    //     gameBoard[idx] = PLAYER_O;
    //   }
    //   else if (gameBoard[idx] == PLAYER_O) {
    //     gameBoard[idx] = EMPTY;
    //   }
    // }


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
          // drawGameBoard(texturePacked, gameBoard, config->tileSize, GRID_PADDING,
          //               framePlayerX, framePlayerY);
          // snprintf(buffer, sizeof(buffer), "Camera Zoom: %.0f", camera.zoom);
          // DrawText(buffer, 0, 0, 8, WHITE);
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
  FreeConfig(config); // Free the configuration memory
  UnloadFont(titleFont);
  UnloadTexture(texturePacked);
  CloseWindow(); // Close window and OpenGL context
  //--------------------------------------------------------------------------------------
  return 0;
}

