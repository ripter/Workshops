.PHONY: all server build npm lint

NODE_BIN := ./node_modules/.bin

all: npm build
	cp -f public/index.html dist/index.html

build:
	# $(NODE_BIN)/webpack -dc
	$(NODE_BIN)/webpack -dc
	$(NODE_BIN)/babel-external-helpers -t global > dist/babel-external-helpers.js
	cp node_modules/riot/riot.min.js dist/riot.min.js
	cp -R img/ dist/img
	rm -R img

server:
	$(NODE_BIN)/http-server dist/

npm:
	npm install

lint:
	$(NODE_BIN)/eslint src/
