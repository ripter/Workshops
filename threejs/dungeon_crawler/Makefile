.PHONY: all clean


all: node_modules/
	npx vite


clean:
	-rm -f package-lock.json
	-rm -r ./node_modules
	-npm cache verify


node_modules/: package.json
	npm install
	-touch node_modules/
