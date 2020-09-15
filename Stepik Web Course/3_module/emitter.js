let EventEmitter = require("events").EventEmitter;
let manager = new EventEmitter();
let res = {};
manager.on("request",
    (req) => {
        req.data = "data";
        res = req;
        manager.response = res;
    })
manager.emit("request", res);

module.exports.manager = manager