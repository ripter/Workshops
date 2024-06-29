#ifndef TTT_SRC_CONFIG_H
#define TTT_SRC_CONFIG_H
#include "raylib.h"

typedef struct {
    int screenWidth;
    int screenHeight;
    int tileSize;
    char windowTitle[256]; // assuming the window title will not exceed 255 characters
    char tilemapFile[256]; // assuming the file name will not exceed 255 characters
    Vector2 playerXTilemapPos;
    Vector2 playerOTilemapPos;
} Config;

Config load_config(const char* filepath);

#endif // TTT_SRC_CONFIG_H