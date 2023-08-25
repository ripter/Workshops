.PHONY: all clean lint

all: node_modules/
	npm run dev

clean:
	-rm -f package-lock.json
	-rm -r ./node_modules
	-npm cache verify

lint: node_modules/
	npx eslint --fix src/

node_modules/: package.json
	npm install
	touch node_modules/
