#pragma once
#include "sprite.h"
#include "types.h"

Config *LoadConfig(const char *filepath);
void FreeConfig(Config *config);
