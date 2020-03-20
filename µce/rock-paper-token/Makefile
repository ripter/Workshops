.PHONY: all build clean deploy lint server test

all: deploy server

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
	npm run dev

test:
	npx jest

node_modules/: package.json
	npm install
	touch node_modules/
