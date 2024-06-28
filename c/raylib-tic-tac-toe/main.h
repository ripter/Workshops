#ifndef TIC_TAC_TOE_H
#define TIC_TAC_TOE_H
#include "raylib.h"


typedef enum {
    PLAYER_X = 1,
    PLAYER_O = 2,
    EMPTY = 0
} TileState;


typedef struct {
  float* values;
  int count;
} EvenlySpacedValues;

Rectangle getSpriteRect(Vector2 spriteSize, Vector2 position); 

EvenlySpacedValues generateEvenlySpacedValues(float start, float end, float size, int count);

#endif // TIC_TAC_TOE_H