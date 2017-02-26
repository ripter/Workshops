.PHONY: all build server
NODE_BIN=./node_modules/.bin

server: node_modules/
	$(NODE_BIN)/http-server

build: node_modules/
	$(NODE_BIN)/rollup -c -m

node_modules/: package.json
	yarn
