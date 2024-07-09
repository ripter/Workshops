#pragma once

#include "raylib.h"
#include "Config.h"

typedef enum {
  TitleChoiceQuit = 0,
  TitleChoiceConfig = 1,
  TitleChoicePlay = 2,
} TitleChoice;

typedef struct {
  int ActiveChoice;
} SceneTitle;

void UpdateTitleScene(SceneTitle *state, const Config *config);
void DrawTitleScene(const SceneTitle *state, const Config *config, Texture2D texture, Font font);
