.PHONY: server build node_modules

build: node_modules
	./node_modules/.bin/webpack

server: build
	./node_modules/.bin/http-server

node_modules: package.json
	npm install
	touch package.json
