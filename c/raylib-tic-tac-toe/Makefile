.PHONY: build clean

SRC = main.c config.c file_utils.c externals/cJSON.c
EXTERNAL_LIBS = $(shell pkg-config --libs --cflags raylib)

build:
	cc $(SRC) $(EXTERNAL_LIBS) -o TicTacToe

clean:
	rm -f TicTacToe
