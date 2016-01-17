.PHONY: all server build npm lint

NODE_BIN := ./node_modules/.bin

all: build

build: npm
	cp public/index.html dist/index.html
	cp src/main.js dist/main.js
	cp node_modules/riot/riot.min.js dist/riot.min.js
	$(NODE_BIN)/riot src dist

server:
	$(NODE_BIN)/http-server dist/

npm:
	npm install

lint:
	$(NODE_BIN)/eslint src/
