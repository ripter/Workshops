#pragma once
#include "raylib.h"
#include "types.h"

typedef enum {
  TileStateEmpty = 0,
  TileStatePlayerX = 1,
  TileStatePlayerO = 2,
} TileState;


typedef struct {
  TileState gameBoard[9];
  SceneChange nextScene;
} GameplayScene;

void InitGameplayScene(GameplayScene *state); 
void UpdateGameplayScene(GameplayScene *state, const Config *config);
void DrawGameplayScene(const GameplayScene *state, const Config *config, const Texture2D texture);