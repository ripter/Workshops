#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#include "../externals/cJSON.h"
#include "FileUtils.h"
#include "Config.h"
#include "Sprite.h"

/**
 * @brief Load the configuration from a JSON file
 * @param filepath The path to the JSON file
 * @return Config* Pointer to the loaded configuration
 */
Config *LoadConfig(const char *filepath) {
  Config *config = (Config *)malloc(sizeof(Config));
  if (config == NULL) {
    fprintf(stderr, "Failed to allocate memory for Config\n");
    exit(1);
  }
  memset(config, 0, sizeof(Config));

  cJSON *json = ReadJsonFile(filepath);
  if (json == NULL) {
    fprintf(stderr, "Failed to read JSON file\n");
    free(config);
    exit(1); // or handle the error appropriately
  }

  cJSON *tileSize = cJSON_GetObjectItem(json, "tileSize");
  cJSON *screenWidth = cJSON_GetObjectItem(json, "screenWidth");
  cJSON *screenHeight = cJSON_GetObjectItem(json, "screenHeight");
  cJSON *tilemapFile = cJSON_GetObjectItem(json, "tilemapFile");
  cJSON *playerXTilemapPos = cJSON_GetObjectItem(json, "playerXTilemapPos");
  cJSON *playerOTilemapPos = cJSON_GetObjectItem(json, "playerOTilemapPos");
  cJSON *windowTitle = cJSON_GetObjectItem(json, "windowTitle");
  cJSON *sprites = cJSON_GetObjectItem(json, "sprites");

  if (cJSON_IsNumber(tileSize)) {
    config->tileSize = tileSize->valueint;
  } else {
    fprintf(stderr, "Failed to read tile size from JSON\n");
    free(config);
    exit(1);
  }

  if (cJSON_IsNumber(screenWidth)) {
    config->screenWidth = screenWidth->valueint;
  } else {
    fprintf(stderr, "Failed to read screen width from JSON\n");
    free(config);
    exit(1);
  }

  if (cJSON_IsNumber(screenHeight)) {
    config->screenHeight = screenHeight->valueint;
  } else {
    fprintf(stderr, "Failed to read screen height from JSON\n");
    free(config);
    exit(1);
  }

  if (cJSON_IsString(tilemapFile) && (tilemapFile->valuestring != NULL)) {
    strncpy(config->tilemapFile, tilemapFile->valuestring,
            sizeof(config->tilemapFile) - 1);
    config->tilemapFile[sizeof(config->tilemapFile) - 1] =
        '\0'; // ensure null termination
  } else {
    fprintf(stderr, "Failed to read tilemap file name from JSON\n");
    free(config);
    exit(1);
  }

  if (cJSON_IsString(windowTitle) && (windowTitle->valuestring != NULL)) {
    strncpy(config->windowTitle, windowTitle->valuestring,
            sizeof(config->windowTitle) - 1);
    config->windowTitle[sizeof(config->windowTitle) - 1] =
        '\0'; // ensure null termination
  }

  if (cJSON_IsArray(playerXTilemapPos) &&
      cJSON_GetArraySize(playerXTilemapPos) == 2) {
    cJSON *x = cJSON_GetArrayItem(playerXTilemapPos, 0);
    cJSON *y = cJSON_GetArrayItem(playerXTilemapPos, 1);
    if (cJSON_IsNumber(x) && cJSON_IsNumber(y)) {
      config->playerXTilemapPos.x = (float)x->valuedouble;
      config->playerXTilemapPos.y = (float)y->valuedouble;
    }
  }

  if (cJSON_IsArray(playerOTilemapPos) &&
      cJSON_GetArraySize(playerOTilemapPos) == 2) {
    cJSON *x = cJSON_GetArrayItem(playerOTilemapPos, 0);
    cJSON *y = cJSON_GetArrayItem(playerOTilemapPos, 1);
    if (cJSON_IsNumber(x) && cJSON_IsNumber(y)) {
      config->playerOTilemapPos.x = (float)x->valuedouble;
      config->playerOTilemapPos.y = (float)y->valuedouble;
    }
  }

  // Load all the sprites
  if (cJSON_IsArray(sprites)) {
    // Allocate memory for the sprites
    int numSprites = cJSON_GetArraySize(sprites);
    config->sprites = (Sprite *)malloc(numSprites * sizeof(Sprite));
    if (config->sprites == NULL) {
      fprintf(stderr, "Failed to allocate %zu bytes of memory for sprites\n",
              numSprites * sizeof(Sprite));
      free(config);
      exit(1);
    }

    // Save the sprite count
    config->numberOfSprites = numSprites;

    // Load each sprite
    for (int i = 0; i < numSprites; i++) {
      cJSON *sprite = cJSON_GetArrayItem(sprites, i);
      cJSON *id = cJSON_GetObjectItem(sprite, "id");
      cJSON *pos = cJSON_GetObjectItem(sprite, "pos");
      cJSON *rotation = cJSON_GetObjectItem(sprite, "rotation");

      if (cJSON_IsNumber(id) && cJSON_IsArray(pos) &&
          cJSON_GetArraySize(pos) == 2 && cJSON_IsNumber(rotation)) {
        config->sprites[i].id = id->valueint;
        cJSON *x = cJSON_GetArrayItem(pos, 0);
        cJSON *y = cJSON_GetArrayItem(pos, 1);
        if (cJSON_IsNumber(x) && cJSON_IsNumber(y)) {
          config->sprites[i].rect.x = (float)x->valuedouble * config->tileSize;
          config->sprites[i].rect.y = (float)y->valuedouble * config->tileSize;
          config->sprites[i].rect.width = (float)config->tileSize;
          config->sprites[i].rect.height = (float)config->tileSize;
        }
        if (cJSON_IsNumber(rotation)) {
          config->sprites[i].rotation = rotation->valueint;
        }
      } else {
        fprintf(stderr, "Failed to read sprite %d from JSON\n", i);
        free(config->sprites);
        free(config);
        exit(1);
      }
    }
  }

  cJSON_Delete(json);
  return config;
}

void FreeConfig(Config *config) {
  if (config != NULL) {
    if (config->sprites != NULL) {
      free(config->sprites);
      config->sprites = NULL;
    }
    free(config);
  }
}
