.PHONY: all server build npm lint

NODE_BIN := ./node_modules/.bin

all: build

build: npm
	cp public/index.html dist/index.html
	$(NODE_BIN)/webpack -dc

server:
	$(NODE_BIN)/http-server dist/

npm:
	npm install

lint:
	$(NODE_BIN)/eslint src/
