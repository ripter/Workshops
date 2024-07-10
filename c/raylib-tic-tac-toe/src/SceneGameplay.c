#include "raylib.h"
#include "SceneGameplay.h"


void InitGameplayScene(GameplayScene *state) {
  // Initialize the game board
  for (int i = 0; i < 9; i++) {
    state->gameBoard[i] = TileStateEmpty;
  }

  // TMP: Set some initial values
  state->gameBoard[4] = TileStatePlayerX;

  // No scene change by default
  state->nextScene = (SceneChange){false, GAMEPLAY};
}


void UpdateGameplayScene(GameplayScene *state, const Config *config) {

}


void DrawGameplayScene(const GameplayScene *state, const Config *config, const Texture2D texture) {
  DrawText("Next Play by ", 10, 10, 20, WHITE);
}