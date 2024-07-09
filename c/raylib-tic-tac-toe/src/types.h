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
    char windowTitle[256];      // Window title, max 255 characters + null terminator
    char tilemapFile[256];      // Tilemap file name, max 255 characters + null terminator
    Vector2 playerXTilemapPos;  // Position of player X in the tilemap
    Vector2 playerOTilemapPos;  // Position of player O in the tilemap
    Sprite *sprites;            // Array of sprites
    int numberOfSprites;        // Number of sprites
} Config;

#endif // TTT_SRC_TYPES_H