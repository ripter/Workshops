#include "raylib.h"
#include "camera.h"

static inline float min(float a, float b) {
    return (a <= b) ? a : b;
}

static inline float max(float a, float b) {
    return (a >= b) ? a : b;
}


float getCameraZoom(float currentZoom) {
  // Update State
  if (IsKeyPressed(KEY_ONE)) {
    return 1.0f;
  } else if (IsKeyPressed(KEY_TWO)) {
    return 2.0f;
  } else if (IsKeyPressed(KEY_THREE)) {
    return 3.0f;
  } else if (IsKeyPressed(KEY_FOUR)) {
    return 4.0f;
  } else if (IsKeyPressed(KEY_FIVE)) {
    return 5.0f;
  } else if (IsKeyPressed(KEY_SIX)) {
    return 6.0f;
  } else if (IsKeyPressed(KEY_SEVEN)) {
    return 7.0f;
  } else if (IsKeyPressed(KEY_EIGHT)) {
     return 8.0f;
  } else if (IsKeyPressed(KEY_NINE)) {
     return 9.0f;
  } else if (IsKeyPressed(KEY_ZERO)) {
    return 10.0f;
  } else if (IsKeyPressed(KEY_MINUS)) {
    return max(currentZoom - 1.0f, CAMERA_ZOOM_MIN);
  } else if (IsKeyPressed(KEY_EQUAL)) {
    return min(currentZoom + 1.0f, CAMERA_ZOOM_MAX);
  }
  
  return currentZoom;
}