// Drawing details and field size
const FIELD_WIDTH = 10;
const FIELD_HEIGHT = 20;
const CELL_SIZE = 30;
const GAME_CANVAS_HEIGHT = FIELD_HEIGHT * CELL_SIZE;
const GAME_CANVAS_WIDTH = FIELD_WIDTH * CELL_SIZE;

// Game par
let score = 0;
let level = 1;

let interval;
let delay = 700;

let pauseRender_text = true;
let paused = false;
let loseRender_text = true;
let lost = false;

let activeFigure;
let nextFigure;
let field = [];
let figures = [];

for (let i = 0; i < FIELD_HEIGHT; i += 1) {
    field[i] = [];
    for (let j = 0; j < FIELD_WIDTH; j += 1) {
        field[i][j] = 0;
    }
}