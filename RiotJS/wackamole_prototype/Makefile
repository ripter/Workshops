.PHONY: all server build npm lint

NODE_BIN := ./node_modules/.bin

all: build

build: npm
	cp -R public/ dist
	cp node_modules/riot/riot.min.js dist/riot.min.js
	$(NODE_BIN)/riot --type babel src dist/es6.tags.js
	$(NODE_BIN)/babel dist/es6.tags.js --out-file dist/tags.js
	$(NODE_BIN)/babel src/ --out-file dist/game.js
	$(NODE_BIN)/babel-external-helpers -t global > dist/babel-external-helpers.js

server:
	$(NODE_BIN)/http-server dist/

npm:
	npm install

lint:
	$(NODE_BIN)/eslint src/

clean:
	rm -Rf dist
	mkdir dist
	rm -R node_modules
