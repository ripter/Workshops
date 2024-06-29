#ifndef TTT_SRC_FILE_UTILS_H
#define TTT_SRC_FILE_UTILS_H
#include <stdio.h>
#include "../externals/cJSON.h"

cJSON* read_json_file(const char* filepath);
long get_file_length(FILE *file);

#endif // TTT_SRC_FILE_UTILS_H