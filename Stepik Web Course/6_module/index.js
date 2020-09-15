const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
module.exports.request = function() {
    let req = new XMLHttpRequest();
    req.open("GET", "http://localhost:3000", true);
    req.send();
    const test = req.responseText;

    req.open("POST", "http://localhost:3000/test", true);
    req.send(test);
}