.PHONY: all server build npm lint

NODE_BIN := ./node_modules/.bin

all: build
	cp public/index.html dist/index.html

build: npm
	rm -Rf dist
	mkdir dist
	$(NODE_BIN)/webpack -dc
	mv -f img dist

server:
	$(NODE_BIN)/http-server dist/

npm:
	npm install

lint:
	$(NODE_BIN)/eslint src/
