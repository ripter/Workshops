#include <stdio.h>
#include <stdlib.h>
#include "raylib.h"

#include "SceneTitle.h"
#include "sprite.h"
#include "draw.h"

static int backgroundSize = 32;
static int backgroundWidth = 10;
static int backgroundHeight = 10;
static int background[] = {
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

void UpdateTitleScene(SceneTitle *state, const Config *config) {
    int choice = state->ActiveChoice;

    // Mouse click any item to activate it
    if (IsMouseButtonPressed(MOUSE_LEFT_BUTTON)) {
        Vector2 mouse = GetMousePosition();
        if (CheckCollisionPointRec(mouse, (Rectangle){backgroundSize * 3, config->screenHeight - (backgroundSize * 3), backgroundSize * 4, backgroundSize})) {
            choice = TitleChoiceQuit;
        } else if (CheckCollisionPointRec(mouse, (Rectangle){backgroundSize * 3, config->screenHeight - (backgroundSize * 2), backgroundSize * 4, backgroundSize})) {
            choice = TitleChoiceConfig;
        } else if (CheckCollisionPointRec(mouse, (Rectangle){backgroundSize * 3, config->screenHeight - (backgroundSize * 1), backgroundSize * 4, backgroundSize})) {
            choice = TitleChoicePlay;
        }
        printf("Mouse Choice: %d\n", choice);
    }

    // Enter/Space to select the menu item
    if (IsKeyPressed(KEY_ENTER) || IsKeyPressed(KEY_SPACE)) {
        if (choice == TitleChoiceQuit) {
            CloseWindow();
        }
    }

    // Arrow keys to navigate the menu
    if (IsKeyPressed(KEY_UP)) {
        choice -= 1;
    } else if (IsKeyPressed(KEY_DOWN)) {
        choice += 1;
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
void DrawTitleScene(const SceneTitle *state, Texture2D texture, const Config *config, Font font) {
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
