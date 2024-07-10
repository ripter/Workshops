#include <stdio.h>
#include <stdlib.h>
#include "raylib.h"

#include "SceneTitle.h"
#include "Sprite.h"
#include "Draw.h"

const int backgroundSize = 32;
const int backgroundWidth = 10;
const int backgroundHeight = 10;
const int background[] = {
    0, 17, 18, 18, 18, 18, 18, 18, 19, 0,
    0, 20, 21, 21, 21, 21, 21, 21, 22, 0,
    0, 20, 21, 21, 21, 21, 21, 21, 22, 0,
    0, 20, 21, 21, 21, 21, 21, 21, 22, 0,
    0, 23, 24, 24, 24, 24, 24, 24, 25, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 3, 3, 3, 3, 3, 3, 0, 0,
    0, 0, 3, 3, 3, 3, 3, 3, 0, 0,
    0, 0, 3, 3, 3, 3, 3, 3, 0, 0
};
const int xChoice = backgroundSize * 2;
const int widthChoice = backgroundSize * 4; 


void InitTitleScene(SceneTitle *state) {
    state->ActiveChoice = TitleChoicePlay;
    state->nextScene = (SceneChange){false, TITLE};
}

void UpdateTitleScene(SceneTitle *state, const Config *config) {
    int choice = state->ActiveChoice;
    bool didClick = IsMouseButtonPressed(MOUSE_LEFT_BUTTON);

    // Mouse click any item to activate it
    if (didClick) {
        Vector2 mouse = GetMousePosition();
        Rectangle playRect = { 
            xChoice,
            config->screenHeight - (backgroundSize * 3), 
            widthChoice, backgroundSize };
        Rectangle configRect = {
            xChoice,
            config->screenHeight - (backgroundSize * 2), 
            widthChoice, backgroundSize };
        Rectangle quitRect = {
            xChoice,
            config->screenHeight - (backgroundSize * 1), 
            widthChoice, backgroundSize };

        if (CheckCollisionPointRec(mouse, quitRect)) {
            choice = TitleChoiceQuit;
        } else if (CheckCollisionPointRec(mouse, configRect)) {
            choice = TitleChoiceConfig;
        } else if (CheckCollisionPointRec(mouse, playRect)) {
            choice = TitleChoicePlay;
        }
    }

    // Enter/Space to select the menu item
    // Or clicking the selected menu item.
    if (IsKeyPressed(KEY_ENTER) || IsKeyPressed(KEY_SPACE) || (didClick && choice == state->ActiveChoice)) {  
        if (choice == TitleChoiceQuit) {
            CloseWindow();
        }
        else if (choice == TitleChoiceConfig) {
            state->nextScene = (SceneChange){true, CONFIG};
        }
        else if (choice == TitleChoicePlay) {
            state->nextScene = (SceneChange){true, GAMEPLAY};
        }
    }

    // Arrow keys to navigate the menu
    // Quit is 0 and Play is 2, so we can use the enum values directly
    if (IsKeyPressed(KEY_UP)) {
        choice += 1;
    } else if (IsKeyPressed(KEY_DOWN)) {
        choice -= 1;
    }

    // Bounds check the active choice
    if (choice < TitleChoiceQuit) {
        choice = TitleChoicePlay;
    } else if (choice > TitleChoicePlay) {
        choice = TitleChoiceQuit;
    }

    state->ActiveChoice = choice;
}

// TODO: Refactor so Font is not required.
void DrawTitleScene(const SceneTitle *state, const Config *config, Texture2D texture, Font font) {
    for (int x = 0; x < backgroundWidth; x++) {
        for (int y = 0; y < backgroundHeight; y++) {
            int idx = x + (y * backgroundWidth);
            int spriteId = background[idx];

            DrawSprite(texture, config,
                       (Vector2){x * backgroundSize, y * backgroundSize},
                       backgroundSize, spriteId);
        }
    }

    // Get the Y position of the selected menu item.
    int activeY = config->screenHeight - (backgroundSize * (state->ActiveChoice + 1));

    // Draw special tiles for the selected menu item.
    DrawSprite(texture, config, (Vector2){backgroundSize * 1, activeY},
               backgroundSize, 5);
    DrawSprite(texture, config, (Vector2){backgroundSize * 8, activeY},
               backgroundSize, 9);

    // Draw the labels over the background.
    DrawTextEx(font, "Tic",
               (Vector2){(backgroundSize * 2) + 8, (backgroundSize * 0) + 8},
               backgroundSize * 2, 8, WHITE);
    DrawTextEx(font, "Tac",
               (Vector2){(backgroundSize * 3) + 4, (backgroundSize * 1) + 16},
               backgroundSize * 2, 8, WHITE);
    DrawTextEx(font, "Toe",
               (Vector2){(backgroundSize * 4) + 8, (backgroundSize * 2) + 24},
               backgroundSize * 2, 8, WHITE);

    DrawTextShadowed("Play",
                     backgroundSize * 3,
                     config->screenHeight - (backgroundSize * 3) - 5,
                     backgroundSize,
                     WHITE, BLACK);
    DrawTextShadowed("Config",
                     backgroundSize * 3,
                     config->screenHeight - (backgroundSize * 2) - 5,
                     backgroundSize,
                     WHITE, BLACK);
    DrawTextShadowed("Quit",
                     backgroundSize * 3,
                     config->screenHeight - (backgroundSize * 1) - 5,
                     backgroundSize,
                     WHITE, BLACK);
}
