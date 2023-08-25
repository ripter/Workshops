.PHONY: all plop lint clean

all: node_modules/
	npx vite

node_modules/: package.json
	npm install
	-touch node_modules/

plop: node_modules/
	npx plop

lint: node_modules/
	npx eslint --fix src/

clean:
	-rm -f package-lock.json
	-rm -r ./node_modules
	-npm cache verify
