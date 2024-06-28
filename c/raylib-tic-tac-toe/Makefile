.PHONY: build clean

SRC = main.c config.c load_json_file.c externals/cJSON.c
EXTERNAL_LIBS = $(shell pkg-config --libs --cflags raylib)

build:
	cc $(SRC) $(EXTERNAL_LIBS) -o TicTacToe

clean:
	rm -f TicTacToe
