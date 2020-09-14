/**
 * Process key events across whole program
 * @param {KeyboardEvent} event 
 */
function gamePlayKeysProcessor(event) {
    const keyName = event.key;
    if (lost) {
        return;
    }
    if (keyName === "Escape") {
        switchPause();
    }
    if (paused) {
        return;
    }

    switch (keyName) {
        case "ArrowUp": {
            console.log("ArrowUp pressed");
            tryRotate();
            render();
            break;
        }
        case "ArrowRight": {
            console.log("ArrowRight pressed");
            tryMoveRight();
            render();
            break;
        }
        case "ArrowLeft": {
            console.log("ArrowLeft pressed");
            tryMoveLeft();
            render();
            break;
        }
        case "ArrowDown": {
            console.log("ArrowDown pressed");
            doNextStep();
            break;
        }
        case "Escape": {
            console.log("Escape pressed");
            break;
        }
        default: {
            break;
        }
    }
}

function gameLostKeysProcessor(event) {
    clearInterval(interval);
    window.location.href = "/components/recordsTable.html";
}
