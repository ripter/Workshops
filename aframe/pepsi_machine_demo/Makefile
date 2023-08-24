.PHONY: all build clean deploy lint server

all: node_modules/
	npm run dev

build: node_modules/
	npm run build

clean:
	-rm -f package-lock.json
	-rm -r ./node_modules
	-npm cache verify

deploy: build lint

lint: node_modules/
	npx eslint --fix src/

server: build
	npm run serve

node_modules/: package.json
	npm install
	touch node_modules/
