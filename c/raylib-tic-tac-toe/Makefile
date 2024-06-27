.PHONY: build clean

build:
	cc main.c $(shell pkg-config --libs --cflags raylib) -o TicTacToe

clean:
	rm -f TicTacToe
