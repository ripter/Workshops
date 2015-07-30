.PHONY: build run stop test clean lint js node_modules

LIB := ./node_modules
BIN := $(LIB)/.bin

all: build

build: node_modules dist/main.js dist/index.html

run: build server.PID
	open http://localhost:3000/index.html

js: dist/main.js

clean:
	npm cache clean
	-rm -R node_modules/

lint:
	$(BIN)/eslint --ext .js,.jsx src/

node_modules: package.json
	npm install

dist/:
	-mkdir dist

dist/index.html: dist/ src/index.html
	cp src/index.html dist/index.html

dist/main.js: node_modules dist/
	$(BIN)/webpack src/main.jsx dist/main.js

test:
	$(BIN)/mocha -R nyan --compilers js:babel/register

server.PID:
	$(BIN)/http-server ./dist -p 3000 --silent & echo $$! > $@

stop: server.PID
	kill `cat $<` && rm $<
