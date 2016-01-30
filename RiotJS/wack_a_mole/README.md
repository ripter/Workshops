# RiotJS Wack-A-Mole [Event Bus]

## How to Run

    $ make server

## Description

This is a Wack-A-Mole game. The 'mole' is randomly selected from (`src/assets.js`).

The Architecture design is that Tags (`src/*.tag`) talk to a Store (`src/store.js`) using an event bus.
The business logic listens to the event bus (`src/store.js`) and updates the store with the new state.
