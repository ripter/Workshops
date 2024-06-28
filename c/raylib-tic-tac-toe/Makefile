.PHONY: build clean

build:
	cc main.c load_json_file.c externals/cJSON.c $(shell pkg-config --libs --cflags raylib) -o TicTacToe

clean:
	rm -f TicTacToe
