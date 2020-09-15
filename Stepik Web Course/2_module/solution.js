function isNumeric (n){
    return !isNaN(parseFloat(n)) && isFinite(n) && parseInt(n) == n;
}

let man = {
    name: "Test",
    surname: "Tested",
    fullName: function () {
        return `${this.surname} ${this.name}`;
    }
}

class Room {
    constructor(newWindows = 1, newOwner = 'Test') {
        if (newWindows <= 0 || !isNumeric(newWindows)) {
            this.windows = 1;
        } else {
            this.windows = newWindows;
        }
        this._owner = newOwner;
    }

    set owner (newOwner) {
        this._owner = newOwner;
    }

    get owner() {
        return `${this._owner}`;
    }
}

module.exports.man = man
module.exports.Room = Room