#ifndef TTT_SRC_DRAW_H
#define TTT_SRC_DRAW_H
#include "raylib.h"
#include "../main.h"

void drawGameBoard(Texture2D texture, TileState gameboard[9], int gridSize, int padding, Rectangle framePlayerX, Rectangle framePlayerO);

#endif // TTT_SRC_DRAW_H