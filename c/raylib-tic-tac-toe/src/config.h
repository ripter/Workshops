#ifndef TTT_SRC_CONFIG_H
#define TTT_SRC_CONFIG_H

#include "types.h"


Config* LoadConfig(const char *filepath);
void FreeConfig(Config *config);

#endif // TTT_SRC_CONFIG_H