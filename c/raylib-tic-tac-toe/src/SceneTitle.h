#pragma once

#include "raylib.h"
#include "Config.h"
#include "types.h"

typedef enum {
  TitleChoiceQuit = 0,
  TitleChoiceConfig = 1,
  TitleChoicePlay = 2,
} TitleChoice;

typedef struct {
  int ActiveChoice;
  SceneChange nextScene;
} SceneTitle;

void InitTitleScene(SceneTitle *state);
void UpdateTitleScene(SceneTitle *state, const Config *config);
void DrawTitleScene(const SceneTitle *state, const Config *config, Texture2D texture, Font font);
