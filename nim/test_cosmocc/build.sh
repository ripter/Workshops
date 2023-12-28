#!/bin/bash

# Set environment variables
export CC=x86_64-unknown-cosmo-cc
export CXX=x86_64-unknown-cosmo-c++

# Now, any commands that rely on CC or CXX will use the values set above
nim --cc:env c main.nim
# $CC -o myprogram myprogram.c

cosmocc -o dest/main-c main.c