let figureTypesNumber = 7;

/**
 * All possible tetric figures
 */
class Figure {
    constructor(type) {
        switch(type) {
            case 0: { // O
                this.shape = [
                    [1,1],
                    [1,1]
                ];
                this.centerX = 0;
                this.centerY = 0;
                this.color = "#9b59b6";
                break;
            }
            case 1: { // I
                this.shape = [
                    [0,1,0,0],
                    [0,1,0,0],
                    [0,1,0,0],
                    [0,1,0,0]
                ];
                this.centerX = 1;
                this.centerY = 1;
                this.color = "#d35400";
                break;
            }
            case 2: { // L
                this.shape = [
                    [0,1,0],
                    [0,1,0],
                    [0,1,1]
                ];
                this.centerX = 1;
                this.centerY = 1;
                this.color = "#f39c12";
                break;
            }
            case 3: { // J
                this.shape = [
                    [0,1,0],
                    [0,1,0],
                    [1,1,0]
                ];
                this.centerX = 1;
                this.centerY = 1;
                this.color = "#2980b9";
                break;
            }
            case 4: { // Z
                this.shape = [
                    [1,1,0],
                    [0,1,1],
                    [0,0,0]
                ];
                this.centerX = 1;
                this.centerY = 1;
                this.color = "#27ae60";
                break;
            }
            case 5: { // S
                this.shape = [
                    [0,1,1],
                    [1,1,0],
                    [0,0,0]
                ];
                this.centerX = 1;
                this.centerY = 1;
                this.color = "#27ae60";
                break;
            }
            case 6: { // T
                this.shape = [
                    [0,0,0],
                    [1,1,1],
                    [0,1,0]
                ];
                this.centerX = 1;
                this.centerY = 1;
                this.color = "#8e44ad";
                break;
            }
        }
        this.x = FIELD_WIDTH / 2 - 1;
        this.y = 0;
    }
}