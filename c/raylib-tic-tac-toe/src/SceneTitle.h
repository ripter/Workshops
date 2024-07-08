#ifndef TTT_SRC_SCENE_TITLE_H
#define TTT_SRC_SCENE_TITLE_H
#include "raylib.h"
#include "config.h"

typedef enum {
  TITLE_CHOICE_QUIT=0,
  TITLE_CHOICE_CONFIG=1,
  TITLE_CHOICE_PLAY=2,
} TitleChoice;

typedef struct {
  int ActiveChoice;
} SceneTitle;

SceneTitle UpdateTitleScene(SceneTitle state, Config config);
void DrawTitleScene(SceneTitle state, Texture2D texture, Config config, Font font); 

#endif // TTT_SRC_SCENE_TITLE_H