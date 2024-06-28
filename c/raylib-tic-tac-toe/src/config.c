#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#include "config.h"
#include "../externals/cJSON.h"
#include "file_utils.h"



/**
 * @brief 
 * Load the configuration from a JSON file
 * @param filepath 
 * @return Config 
 */
Config load_config(const char* filepath) {
    Config config;
    cJSON* json = read_json_file(filepath);
    if (json == NULL) {
        fprintf(stderr, "Failed to read JSON file\n");
        exit(1); // or handle the error appropriately
    }

    cJSON* spriteSize = cJSON_GetObjectItem(json, "spriteSize");
    cJSON* screenWidth = cJSON_GetObjectItem(json, "screenWidth");
    cJSON* screenHeight = cJSON_GetObjectItem(json, "screenHeight");
    cJSON* tilemapFile = cJSON_GetObjectItem(json, "tilemapFile");
    cJSON* playerXTilemapPos = cJSON_GetObjectItem(json, "playerXTilemapPos");
    cJSON* playerYTilemapPos = cJSON_GetObjectItem(json, "playerYTilemapPos");

    if (cJSON_IsNumber(spriteSize)) {
        config.spriteSize.x = (float)spriteSize->valuedouble;
        config.spriteSize.y = (float)spriteSize->valuedouble;
    }

    if (cJSON_IsNumber(screenWidth)) {
        config.screenWidth = screenWidth->valueint;
    }

    if (cJSON_IsNumber(screenHeight)) {
        config.screenHeight = screenHeight->valueint;
    }

    if (cJSON_IsString(tilemapFile) && (tilemapFile->valuestring != NULL)) {
        strncpy(config.tilemapFile, tilemapFile->valuestring, sizeof(config.tilemapFile) - 1);
        config.tilemapFile[sizeof(config.tilemapFile) - 1] = '\0'; // ensure null termination
    }

    if (cJSON_IsArray(playerXTilemapPos) && cJSON_GetArraySize(playerXTilemapPos) == 2) {
        cJSON *x = cJSON_GetArrayItem(playerXTilemapPos, 0);
        cJSON *y = cJSON_GetArrayItem(playerXTilemapPos, 1);
        if (cJSON_IsNumber(x) && cJSON_IsNumber(y)) {
            config.playerXTilemapPos.x = (float)x->valuedouble;
            config.playerXTilemapPos.y = (float)y->valuedouble;
        }
    }

    if (cJSON_IsArray(playerYTilemapPos) && cJSON_GetArraySize(playerYTilemapPos) == 2) {
        cJSON *x = cJSON_GetArrayItem(playerYTilemapPos, 0);
        cJSON *y = cJSON_GetArrayItem(playerYTilemapPos, 1);
        if (cJSON_IsNumber(x) && cJSON_IsNumber(y)) {
            config.playerYTilemapPos.x = (float)x->valuedouble;
            config.playerYTilemapPos.y = (float)y->valuedouble;
        }
    }

    cJSON_Delete(json);
    return config;
}