.PHONY: build clean

build:
	cc main.c $(shell pkg-config --libs --cflags raylib) -o HelloWorld

clean:
	rm -f HelloWorld
