#ifndef TIC_TAC_TOE_H
#define TIC_TAC_TOE_H
#include "raylib.h"


typedef enum {
    PLAYER_X = 1,
    PLAYER_O = 2,
    VERT_WALL = 100,
    EMPTY = 0
} TileState;



typedef struct {
  float* values;
  int count;
} EvenlySpacedValues;


#endif // TIC_TAC_TOE_H