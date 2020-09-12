.PHONY: all build test share

all: test build


test:
	cargo test
	wasm-pack test --node

build:
	wasm-pack build --target web

share:
	cp pkg/tic_tac_toe_bg.js ../../react/tic-tac-toe/public/lib/tic_tac_toe_bg.js
	cp pkg/tic_tac_toe_bg.wasm ../../react/tic-tac-toe/public/lib/tic_tac_toe_bg.wasm
	cp pkg/tic_tac_toe.js ../../react/tic-tac-toe/public/lib/tic_tac_toe.js
	cp pkg/tic_tac_toe.js ../../react/tic-tac-toe/public/lib/tic_tac_toe.js
	cp js/loader.js ../../react/tic-tac-toe/public/lib/loader.js
