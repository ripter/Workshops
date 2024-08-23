#include <stdio.h>
#include <stdlib.h>

#include "raylib.h"
#include "FileUtils.h"

/**
 * @brief Reads a JSON file and returns a cJSON object
 * @param filePath The path to the JSON file
 * @return cJSON* Pointer to the parsed JSON object, or NULL if an error occurred
 */
cJSON *ReadJsonFile(const char *filePath) {
    if (!FileExists(filePath)) {
        fprintf(stderr, "File does not exist: %s\n", filePath);
        return NULL;
    }

    unsigned int fileLength = (unsigned int)GetFileLength(filePath);
    if (fileLength == 0) {
        fprintf(stderr, "File is empty: %s\n", filePath);
        return NULL;
    }

    FILE *file = fopen(filePath, "rb");
    if (!file) {
        fprintf(stderr, "Failed to open file: %s\n", filePath);
        return NULL;
    }

    char *fileContents = (char *)malloc(fileLength + 1);
    if (!fileContents) {
        fprintf(stderr, "Failed to allocate memory for file contents\n");
        fclose(file);
        return NULL;
    }

    // load the file into memory
    fread(fileContents, 1, fileLength, file);
    fileContents[fileLength] = '\0'; // Null-terminate the string
    fclose(file);

    // Parse the JSON
    cJSON *json = cJSON_Parse(fileContents);
    free(fileContents);

    if (!json) {
        fprintf(stderr, "Failed to parse JSON: %s\n", filePath);
        return NULL;
    }

    return json;
}
