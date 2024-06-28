#include "externals/cJSON.h"

#ifndef LOAD_JSON_FILE_H
#define LOAD_JSON_FILE_H

cJSON* read_json_file(const char* filepath);
long get_file_length(FILE *file);

#endif // LOAD_JSON_FILE_H