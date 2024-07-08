#ifndef TTT_SRC_SCENE_TITLE_H
#define TTT_SRC_SCENE_TITLE_H
#include "raylib.h"
#include "config.h"

typedef struct {
  int ActiveChoice;
} SceneTitle;

SceneTitle UpdateTitleScene(SceneTitle state);
void DrawTitleScene(SceneTitle state, Texture2D texture, Config config, Font font); 

#endif // TTT_SRC_SCENE_TITLE_H