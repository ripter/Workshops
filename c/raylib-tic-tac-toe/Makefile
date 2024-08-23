.PHONY: clean

SRC = $(wildcard src/*.c) $(wildcard src/**/*.c) $(wildcard externals/*.c) $(wildcard externals/**/*.c)
EXTERNAL_LIBS = $(shell pkg-config --libs --cflags raylib)

all: dist dist/TicTacToe dist/TileViewer

dist:
	mkdir -p dist

clean:
	rm -f *.o src/**/*.o externals/**/*.o dist/*


dist/TicTacToe: main.c $(SRC)
	cc main.c $(SRC) $(EXTERNAL_LIBS) -o dist/TicTacToe

dist/TileViewer: tileViewer.c $(SRC)
	cc tileViewer.c $(SRC) $(EXTERNAL_LIBS) -o dist/TileViewer
