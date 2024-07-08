#ifndef TTT_SRC_DRAW_H
#define TTT_SRC_DRAW_H
#include "raylib.h"

#include "../main.h"
#include "config.h"
#include "SceneTitle.h"

void drawGameBoard(Texture2D texture, TileState gameboard[9], int gridSize, int padding, Rectangle framePlayerX, Rectangle framePlayerO);

void drawSprite(Texture2D texture, Config config, Vector2 position, int tileSize, int spriteId); 


#endif // TTT_SRC_DRAW_H