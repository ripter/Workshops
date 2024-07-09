#pragma once
#include "Sprite.h"
#include "types.h"

Config *LoadConfig(const char *filepath);
void FreeConfig(Config *config);
