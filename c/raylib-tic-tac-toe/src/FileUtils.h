#pragma once
#include "../externals/cJSON.h"

// Reads a JSON file and returns a cJSON object
cJSON *ReadJsonFile(const char *filePath);
