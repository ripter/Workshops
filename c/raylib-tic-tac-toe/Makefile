.PHONY: build clean

SRC = $(wildcard *.c) $(wildcard src/*.c) $(wildcard src/**/*.c) $(wildcard externals/*.c) $(wildcard externals/**/*.c)
EXTERNAL_LIBS = $(shell pkg-config --libs --cflags raylib)


build: $(SRC)
	cc $(SRC) $(EXTERNAL_LIBS) -o TicTacToe

clean:
	rm -f *.o src/**/*.o externals/**/*.o TicTacToe
