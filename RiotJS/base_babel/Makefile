.PHONY: all server build npm lint

NODE_BIN := ./node_modules/.bin

all: build
	cp public/index.html dist/index.html

build: npm
	$(NODE_BIN)/webpack -dc

build2: npm
	$(NODE_BIN)/riot src/tags dist/es6.tags.js
	$(NODE_BIN)/babel dist/es6.tags.js --out-file dist/tags.js
	$(NODE_BIN)/babel src/main.js --out-file dist/bundle.js

server:
	$(NODE_BIN)/http-server dist/

npm:
	npm install

lint:
	$(NODE_BIN)/eslint src/
