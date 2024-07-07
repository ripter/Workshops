.PHONY: build clean

SRC = $(wildcard src/*.c) $(wildcard src/**/*.c) $(wildcard externals/*.c) $(wildcard externals/**/*.c)
EXTERNAL_LIBS = $(shell pkg-config --libs --cflags raylib)

all: dist build dist/TileViewer

build: $(SRC)
	cc main.c $(SRC) $(EXTERNAL_LIBS) -o dist/TicTacToe

dist:
	mkdir -p dist

clean:
	rm -f *.o src/**/*.o externals/**/*.o dist/TicTacToe


dist/TileViewer: tileViewer.c $(SRC)
	cc tileViewer.c $(SRC) $(EXTERNAL_LIBS) -o dist/TileViewer
