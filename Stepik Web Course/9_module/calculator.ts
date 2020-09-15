export class Calculator {
    x:number
    constructor(x:number) {
            this.x = x
    }
    add(y:number) {
        return (this.x + y)
    }
}