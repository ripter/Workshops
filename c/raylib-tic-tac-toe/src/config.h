#ifndef TTT_SRC_CONFIG_H
#define TTT_SRC_CONFIG_H
#include "types.h"

Config load_config(const char* filepath);
void free_config(Config config);

#endif // TTT_SRC_CONFIG_H