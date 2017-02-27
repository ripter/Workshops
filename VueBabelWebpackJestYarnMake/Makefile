.PHONY: all server build lint test test.only
NODE_BIN=$(shell yarn bin)

all: server

server:
	$(NODE_BIN)/http-server -d

build:
	$(NODE_BIN)/webpack

lint:
	$(NODE_BIN)/eslint src/

test: lint test.only

test.only:
	$(NODE_BIN)/jest
