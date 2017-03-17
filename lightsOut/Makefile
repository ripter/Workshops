.PHONY: all build lint test test-nyan test-blink1 server clean plop
NODE_BIN=./node_modules/.bin

all: build server

server: node_modules/
	$(NODE_BIN)/http-server

build: node_modules/
	$(NODE_BIN)/webpack

node_modules/: package.json
	yarn

test: node_modules/
	$(NODE_BIN)/jest

lint:
	$(NODE_BIN)/eslint test/ src/


test-nyan: node_modules/
	$(NODE_BIN)/mocha -R nyan --recursive

test-blink1: node_modules/
	watch $(NODE_BIN)/mocha -R @ripter/mocha-reporter-blink1 --recursive

plop:
	$(NODE_BIN)/plop
