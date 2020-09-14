const gameCanvas = document.getElementById("gameCanvas");
const nextFigureCanvas = document.getElementById("nextFigureCanvas");

init();

function init() {
    render();
}

function render() {
    clear(gameCanvas);
    clear(nextFigureCanvas)
    drawGameField();
    drawFigure(gameCanvas, activeFigure);
    drawNextFigure();

    // grid line colours
    drawGrid(gameCanvas, "#333333");
    drawGrid(nextFigureCanvas, "#333333");
}

/**
 * Show lost title and render canvas
 */
function loseRender() {
    if (loseRender_text) {
        loseRender_text = false;
        render();
    } else {
        loseRender_text = true;
        render();
        const c = document.getElementById("gameCanvas");
        const ctx = c.getContext("2d");
        ctx.font = "12pt Roboto";
        ctx.fillStyle = "#c0392b";
        ctx.fillText("YOU LOST.", GAME_CANVAS_WIDTH / 2 - 40, GAME_CANVAS_HEIGHT / 2);
        ctx.fillText("PRESS ANY BUTTON TO CONTINUE.", 
            GAME_CANVAS_WIDTH / 2 - 130, GAME_CANVAS_HEIGHT / 2 + 20);
    }
}

/**
 * Draw pause screen mode
 */
function pauseRender() {
    if (pauseRender_text) {
        pauseRender_text = false;
        clear(gameCanvas);
    } else {
        pauseRender_text = true;
        clear(gameCanvas);
        const canvas = document.getElementById("gameCanvas");
        const ctx = canvas.getContext("2d");
        ctx.font="12pt Roboto";
        ctx.fillText("GAME IS PAUSED",
            GAME_CANVAS_WIDTH / 2 - 45, GAME_CANVAS_HEIGHT / 2);
    }
}

function drawNextFigure() {
    drawFigure(nextFigureCanvas, nextFigure);
}

function drawFigures() {
    for(let i = 0; i < figures.length; i += 1) {
        drawFigure(gameCanvas, figures[i]);
    }
}

/**
 * Drawing current play field
 */
function drawGameField() {
    for(let i = 0; i < FIELD_HEIGHT; i += 1) {
        for(let j = 0; j < FIELD_WIDTH; j += 1) {
            if (field[i][j]) {
                fillCell(gameCanvas, j, i, figures[field[i][j]].color);
            }
        }
    }
}

/**
 * Draw current figure on a game field
 * @param canvas
 * @param {Figure} figure
 */
function drawFigure(canvas, figure) {
    for (let i = 0; i < figure.shape.length; i += 1) {
        for (let j = 0; j < figure.shape[i].length; j += 1) {
            if (figure.shape[i][j]) {
                fillCell(canvas, figure.x - figure.centerX + j, figure.y - figure.centerY + i, figure.color)
            }
        }
    }
}

/**
 * Fill chosen cell by colour
 */
function fillCell(canvas, x0, y0, color) {
    if (canvas.getContext) {
        // get drawing context on the canvas;
        // 2d - two-dimensional rendering context
        let ctx = canvas.getContext("2d");
        // fillStyle property of the Canvas 2D API
        // specifies the color, gradient,
        // or pattern to use inside shapes
        let oldStyle = ctx.fillStyle;
        ctx.fillStyle = color;
        // draw a rectangle that is filled according to the current fillStyle
        ctx.fillRect(x0 * CELL_SIZE, y0 * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        ctx.fillStyle = oldStyle;
    }
}

function drawLine(canvas, x0, y0, x1, y1, color = undefined) {
    if (canvas.getContext) {
        let ctx = canvas.getContext("2d");
        ctx.beginPath();
        ctx.moveTo(x0,y0);
        ctx.lineTo(x1,y1);
        let oldStyle = ctx.strokeStyle;
        if (color) {
            ctx.strokeStyle = color;
        }
        ctx.stroke();
        ctx.strokeStyle = oldStyle;
    }
}

function drawGrid(canvas, gridColor) {
    // Vertical lines
    for(let i = 0; i <= canvas.width / CELL_SIZE; i += 1) {
        let x = i * CELL_SIZE;
        drawLine(canvas, x, 0, x, canvas.height, gridColor);
    }
    // Horizontal lines
    for (let i = 0; i <= canvas.height / CELL_SIZE; i += 1) {
        let y = i * CELL_SIZE;
        drawLine(canvas, 0, y, canvas.width, y, gridColor);
    }
}

function clear(canvas) {
    if (canvas.getContext) {
        let ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
}
