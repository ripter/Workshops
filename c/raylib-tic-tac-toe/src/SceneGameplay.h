#pragma once
#include "raylib.h"
#include "types.h"

typedef struct {
  int gameBoard[9];
} GameplayScene;

void UpdateGameplayScene(GameplayScene *state, const Config *config);
void DrawGameplayScene(const GameplayScene *state, const Config *config, const Texture2D texture);