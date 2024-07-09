#include "raylib.h"
#include "Camera.h"

void UpdateCameraZoom(Camera2D *camera) {
    if (IsKeyPressed(KEY_ONE)) {
        camera->zoom = 1.0f;
    } else if (IsKeyPressed(KEY_TWO)) {
        camera->zoom = 2.0f;
    } else if (IsKeyPressed(KEY_THREE)) {
        camera->zoom = 3.0f;
    } else if (IsKeyPressed(KEY_FOUR)) {
        camera->zoom = 4.0f;
    } else if (IsKeyPressed(KEY_FIVE)) {
        camera->zoom = 5.0f;
    } else if (IsKeyPressed(KEY_SIX)) {
        camera->zoom = 6.0f;
    } else if (IsKeyPressed(KEY_SEVEN)) {
        camera->zoom = 7.0f;
    } else if (IsKeyPressed(KEY_EIGHT)) {
        camera->zoom = 8.0f;
    } else if (IsKeyPressed(KEY_NINE)) {
        camera->zoom = 9.0f;
    } else if (IsKeyPressed(KEY_ZERO)) {
        camera->zoom = 10.0f;
    } else if (IsKeyPressed(KEY_MINUS)) {
        camera->zoom = MAX(camera->zoom - 1.0f, CameraZoomMin);
    } else if (IsKeyPressed(KEY_EQUAL)) {
        camera->zoom = MIN(camera->zoom + 1.0f, CameraZoomMax);
    }
}
