/**
 * first arg - function
 * second arg - delay
 */
interval = setInterval(doNextStep, delay);

init();

function init() {
    document.getElementById("PlayerNameLabel").textContent="Player: " + getName();
    document.addEventListener('keydown', gamePlayKeysProcessor);
    figures[1] = new Figure(Math.floor(Math.random() * figureTypesNumber));
    while(isOutOfBounds(figures[1].x,figures[1].y, figures[1])) {
        ++(figures[1].y);
    }
    activeFigure = figures[1];
    createNewNextFigure();
}

function doNextStep() {
    if (lost) {
        loseRender();
        return;
    }
    if (paused) {
        pauseRender();
        return;
    }
    clearInterval(interval);
    interval = setInterval(doNextStep, delay);
    if (!tryMoveDown()) {
        document.getElementById("fallSound").play();
        placeShapeOnField();
        takeNextFigure();
        checkLines();
    }
    render();

}

/**
 * `Esc` btn was pressed
 */
function switchPause() {
    if (paused) {
        clearInterval(interval);
        interval = setInterval(doNextStep, delay);
        paused = false;
        render();
    } else {
        clearInterval(interval);
        interval = setInterval(doNextStep, 1000);
        paused = true;
        pauseRender_text = false;
        pauseRender();
    }
}

function lose() {
    console.log("Game lost!\n");
    clearInterval(interval);
    interval = setInterval(doNextStep, 1000);
    document.removeEventListener('keydown', gamePlayKeysProcessor);
    lost = true;
    loseRender();
    document.getElementById("loseSound").play();
    document.getElementById("loseSound").onended = () => {
        document.addEventListener('keydown', gameLostKeysProcessor);
    }
    addRecord();
}

function takeNextFigure() {
    useNextFigure();
    createNewNextFigure();
}

function useNextFigure() {
    figures[figures.length] = nextFigure;
    activeFigure = nextFigure;
    activeFigure.x = FIELD_WIDTH / 2 - 1;
    activeFigure.y = 0;
    while(isOutOfBounds(activeFigure.x, activeFigure.y) === 1) {
        activeFigure.y += 1;
    }
    if (checkCollision(activeFigure.x, activeFigure.y)) {
        lose();
    }
}

/**
 * Generate new tetris figure with default start position
 */
function createNewNextFigure() {
    let type = Math.floor(Math.random() * figureTypesNumber);
    nextFigure = new Figure(type);
    nextFigure.x = 2;
    nextFigure.y = 2;
}

function checkLines() {
    let count = 0;
    for(let i = 0; i < FIELD_HEIGHT; i += 1) {
        let isFull = true;
        for(let j = 0; j < FIELD_WIDTH; j += 1) {
            if (0 === (field[i][j])) {
                isFull = false;
            }
        }
        if (isFull) {
            clearLine(i);
            count += 1;
        }
    }
    if (count) {
        document.getElementById("clearSound").play();
    }
    addScore(count);
    checkLevel();
}

/**
 * Clear filled line on the field
 * @param {number} n 
 */
function clearLine(n) {
    for (let i = n; i > 0; i -= 1) {
        for (let j = 0; j < FIELD_WIDTH; j += 1) {
            field[i][j] = field[i - 1][j];
        }
    }
}

function addScore(clearedLines) {
    switch (clearedLines) {
        case 0:
            break;
        case 1:
            score += 100;
            break;
        case 2:
            score += 300;
            break;
        case 3:
            score += 700;
            break;
        case 4:
            score += 1500;
            break;
        case 5:
            window.alert("You're cheater! Phew!");
            lose();
            break;
        default:
            break;
    }

    document.getElementById("ScoreLabel").textContent = "Score: " + score;
}

/**
 * Change delay of figures falling depends on level (score)
 */
function checkLevel() {
    if (score >= 8000) {
        if (level < 7) {
            level = 7;
            setLevelLabel();
            clearInterval(interval);
            delay = 100;
            interval = setInterval(doNextStep, 100);
        }
    }
    if (score >= 6000) {
        if (level < 6) {
            level = 6;
            setLevelLabel();
            clearInterval(interval);
            delay = 200;
            interval = setInterval(doNextStep, 200);
        }
    }
    if (score >= 4000) {
        if (level < 5) {
            level = 5;
            setLevelLabel();
            clearInterval(interval);
            delay = 300;
            interval = setInterval(doNextStep, 300);
        }
    }
    if (score >= 3000) {
        if (level < 4) {
            level = 4;
            setLevelLabel();
            clearInterval(interval);
            delay = 400;
            interval = setInterval(doNextStep, 400);
        }
    }
    if (score >= 2000) {
        if (level < 3) {
            level = 3;
            setLevelLabel();
            clearInterval(interval);
            delay = 500;
            interval = setInterval(doNextStep, 500);
        }
    }
    if (score >= 1000) {
        if (level < 2) {
            level = 2;
            setLevelLabel();
            clearInterval(interval);
            delay = 600
            interval = setInterval(doNextStep, 600);
        }
    }
}

function setLevelLabel() {
    document.getElementById("CurrentLevelLabel").textContent= "Level: " + level;
}

function checkCollision(x, y, figure = activeFigure) {
    for (let i = 0; i < figure.shape.length; i += 1) {
        for (let j = 0; j < figure.shape[i].length; j += 1) {
            if (figure.shape[i][j]) {
                if (field[y - figure.centerY + i][x - figure.centerX + j]) {
                    return 1;
                }
            }
        }
    }

    return 0;
}

function isOutOfBounds(x, y, figure = activeFigure) {
    for(let i = 0; i < figure.shape.length; i += 1) {
        for(let j = 0; j < figure.shape[i].length; j += 1) {
            if (figure.shape[i][j]) {
                if (x - figure.centerX + j >= FIELD_WIDTH) {
                    return 1;
                }
                if (y - figure.centerY + i >= FIELD_HEIGHT) {
                    return 1;
                }
                if (x - figure.centerX + j < 0) {
                    return 1;
                }
                if (y - figure.centerY + i < 0) {
                    return 1;
                }
            }
        }
    }

    return 0;
}

function tryRotate() {
    if (canRotate(activeFigure)) {
        rotate(activeFigure.shape);
    }
}

function tryMoveDown() {
    if (canMoveDown()) {
        activeFigure.y += 1;
        return 1;
    }

    return 0;
}

function tryMoveLeft() {
    if (canMoveLeft()) {
        activeFigure.x -= 1;
        return 1;
    }

    return 0;
}

function tryMoveRight() {
    if (canMoveRight()) {
        activeFigure.x += 1;
        return 1;
    }
    
    return 0;
}

function copyFigure(figure) {
    let dim = figure.shape.length;
    let tmp = new Figure();
    tmp.shape = [];
    for (let i = 0; i < dim; i += 1) {
        tmp.shape[i] = [];
        for (let j = 0; j < dim; j += 1) {
            tmp.shape[i][j] = figure.shape[i][j];
        }
    }
    tmp.centerX = figure.centerX;
    tmp.centerY = figure.centerY;
    tmp.color = figure.color;
    tmp.x = figure.x;
    tmp.y = figure.y;

    return tmp;
}

function canRotate(figure) {
    if(canMoveDown()) {
        let tmpFigure = copyFigure(figure);
        rotate(tmpFigure.shape);
        if (!isOutOfBounds(tmpFigure.x, tmpFigure.y, tmpFigure)
            && !checkCollision(tmpFigure.x, tmpFigure.y, tmpFigure)) {
            return 1;
        }
    }

    return 0;
}

function canMoveRight() {
    if (!isOutOfBounds(activeFigure.x + 1, activeFigure.y) && 
            !checkCollision(activeFigure.x + 1, activeFigure.y)) {
        return 1;
    }

    return 0;
}

function canMoveLeft() {
    if (!isOutOfBounds(activeFigure.x - 1, activeFigure.y) && 
            !checkCollision(activeFigure.x - 1, activeFigure.y)) {
        return 1;
    }

    return 0;
}

function canMoveDown() {
    if (!isOutOfBounds(activeFigure.x, activeFigure.y+1) && 
            !checkCollision(activeFigure.x, activeFigure.y + 1)) {
        return 1;
    }

    return 0;
}

function rotate(shape) {
    let dim = shape.length;

    if (dim === 3) {
        let tmp = shape[0][0];
        shape[0][0] = shape[2][0];
        shape[2][0] = shape[2][2];
        shape[2][2] = shape[0][2];
        shape[0][2] = tmp;
        tmp = shape[0][1];
        shape[0][1] = shape[1][0];
        shape[1][0] = shape[2][1];
        shape[2][1] = shape[1][2];
        shape[1][2] = tmp;
    } else if (dim === 4) {
        let tmp = shape[0][1];
        shape[0][1] = shape[1][0];
        shape[1][0] = tmp;
        tmp = shape[2][1];
        shape[2][1] = shape[1][2];
        shape[1][2] = tmp;
        tmp = shape[3][1];
        shape[3][1] = shape[1][3];
        shape[1][3] = tmp;
    }
}

function placeShapeOnField() {
    let figure = activeFigure;
    for(let i = 0; i < figure.shape.length; i += 1) {
        for(let j = 0; j < figure.shape[i].length; j += 1) {
            if (figure.shape[i][j]) {
                let yCoord = figure.y - figure.centerY + i;
                let xCoord = figure.x - figure.centerX + j;
                field[yCoord][xCoord] = figures.length - 1;
            }
        }
    }
}

function addRecord() {
    let username = localStorage["tetris.username"];
    let records = localStorage["tetris.records"];
    if (records) {
        records = JSON.parse(records);
    } else {
        records = [];
        records[0] = {
            score: score,
            name: username
        };
        for(let i = 1; i < 10; i += 1) {
            records[i] = {
                score: -1,
                name: "empty"
            };
        }
        localStorage["tetris.records"] = JSON.stringify(records);
        return;
    }

    // Searching for record's place:
    let row = 0;
    for(; row < records.length; row += 1) {
        if (records[row].score < score)
            break;
    }

    // Exit if it's not a record:
    if(row > 9) {
        return;
    }

    // Moving rows
    for(let i = records.length - 1; i > row; i -= 1) {
        records[i].score=records[i - 1].score;
        records[i].name=records[i - 1].name;
    }

    // Putting new record
    records[row].score = score;
    records[row].name = username;
    localStorage["tetris.records"] = JSON.stringify(records);
}
