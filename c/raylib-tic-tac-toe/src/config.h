#ifndef CONFIG_H
#define CONFIG_H
#include "raylib.h"

typedef struct {
    int screenWidth;
    int screenHeight;
    char windowTitle[256]; // assuming the window title will not exceed 255 characters
    char tilemapFile[256]; // assuming the file name will not exceed 255 characters
    Vector2 spriteSize;
    Vector2 playerXTilemapPos;
    Vector2 playerYTilemapPos;
} Config;

Config load_config(const char* filepath);

#endif // CONFIG_H