#ifndef TTT_SRC_TYPES_H
#define TTT_SRC_TYPES_H
#include "raylib.h"


// Represents a sprite in the game.
// id: the id of the sprite.
// rect: the rectangle that represents the sprite in the texture.
// rotation: the rotation of the sprite.
typedef struct {
  int id;
  Rectangle rect;
  int rotation;
} Sprite;


typedef struct {
    int screenWidth;
    int screenHeight;
    int tileSize;
    char windowTitle[256]; // assuming the window title will not exceed 255 characters
    char tilemapFile[256]; // assuming the file name will not exceed 255 characters
    Vector2 playerXTilemapPos;
    Vector2 playerOTilemapPos;
    Sprite* sprites;
    int numberOfSprites;
} Config;

#endif // TTT_SRC_TYPES_H