#pragma once

#include "raylib.h"

// Define the minimum and maximum zoom levels for the camera.
static const float CameraZoomMin = 1.0f;
static const float CameraZoomMax = 30.0f;

// Macros for minimum and maximum
#define MIN(a, b) (((a) <= (b)) ? (a) : (b))
#define MAX(a, b) (((a) >= (b)) ? (a) : (b))

// Updates the camera zoom level based on user input.
void UpdateCameraZoom(Camera2D *camera);
