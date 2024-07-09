#ifndef TTT_SRC_DRAW_H
#define TTT_SRC_DRAW_H
#include "raylib.h"

#include "../main.h"
#include "Config.h"
#include "SceneTitle.h"

void drawGameBoard(Texture2D texture, TileState gameboard[9], int gridSize, int padding, Rectangle framePlayerX, Rectangle framePlayerO);

void DrawTextShadowed(const char* text, int x, int y, int fontSize, Color fg, Color bg);


#endif // TTT_SRC_DRAW_H