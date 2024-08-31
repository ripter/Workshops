#include <stdio.h>
#include "raylib.h"

#include "SceneGameplay.h"
#include "Sprite.h"

#define TILE_SIZE 64 
#define X_OFFSET (TILE_SIZE * 1)
#define Y_OFFSET (TILE_SIZE * 1.5)
#define PADDING 10


// Buffer to hold on-screen text
static char buffer[256] = {0};

void InitGameplayScene(GameplayScene *state) {
  // Initialize the game board
  for (int i = 0; i < 9; i++) {
    state->gameBoard[i] = TileStateEmpty;
  }
  // No scene change by default
  state->nextScene = (SceneChange){false, GAMEPLAY};
  // Player X goes first
  state->currentPlayer = TileStatePlayerX;

  // TMP: Set some initial values so we have something to see.
  state->gameBoard[0] = TileStatePlayerO;
  state->gameBoard[4] = TileStatePlayerX;
  state->gameBoard[8] = TileStatePlayerO;
  state->gameBoard[2] = TileStatePlayerX;
}


void UpdateGameplayScene(GameplayScene *state, const Config *config) {
  // Update the Player's Label
  snprintf(buffer, sizeof(buffer), "Next Play by %s", state->currentPlayer == TileStatePlayerX ? "Player X" : "Player O");
}


void DrawGameplayScene(const GameplayScene *state, const Config *config, const Texture2D texture) {
  DrawText(buffer, 10, 10, 20, WHITE);

  for (int x = 0; x < 3; x++) {
    for (int y = 0; y < 3; y++) {
      int idx = x + (y * 3);
      TileState tile = state->gameBoard[idx];
      if (tile == TileStateEmpty) {
        continue;
      }
      DrawSprite(texture, config,
                 (Vector2){
                     X_OFFSET + (x * TILE_SIZE),
                     Y_OFFSET + (y * TILE_SIZE),
                 },
                 TILE_SIZE,
                 tile == TileStatePlayerX ? 1 : 2);
    }
  }
}
