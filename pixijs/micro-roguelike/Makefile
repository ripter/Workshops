.PHONY: all clean lint test

all: node_modules/
	npx vite

clean:
	-rm -f package-lock.json
	-rm -r ./node_modules
	-npm cache verify


lint: node_modules/
	npx eslint --fix src/

test:
	npx jest

node_modules/: package.json
	npm install
	touch node_modules/
