# RiotJS Wack-A-Mole [tag.update]

## How to Run

    $ make server

## Description

This is a Wack-A-Mole game. The 'mole' is randomly selected from (`src/assets.js`).

## The Architecture design:

Tags (`src/*.tag`) are used as templates with styles. They have no logic. Tags are updated by calling `tag.update({})`.

Game State is in (`src/main.js`). Global variables are shared across functions.
Game logic is also in (`src/main.js`).


## Notes
