#include "raylib.h"
#include "SceneGameplay.h"


void InitGameplayScene(GameplayScene *state) {
  state->nextScene = (SceneChange){false, GAMEPLAY};
}


void UpdateGameplayScene(GameplayScene *state, const Config *config) {

}


void DrawGameplayScene(const GameplayScene *state, const Config *config, const Texture2D texture) {
  DrawText("Gameplay Scene", 10, 10, 20, DARKGRAY);
}