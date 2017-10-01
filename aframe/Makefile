.PHONY: all build run dev-server plop server package-windows package-osx

all: build run

build: node_modules/
	npx webpack

run:
	npm start

dev-server: build
	npx webpack-dev-server --open

server: build
	npx http-server --open

node_modules/: package.json
	npm install
	touch node_modules/


plop: node_modules/
	npx plop


package-windows: build
	npx electron-packager . --platform=win32


package-osx: build
	npx electron-packager .
