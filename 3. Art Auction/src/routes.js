const express = require("express");
const bodyParser = require('body-parser');
const lotter = require("./LotManager");
const partsMngr = require("./participantsManager");
const settings = require("./SettingsManager");
const path = require("path");
const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

/**
 * Page requests
 */
app.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, "../build/html/paintings.html"));
});

app.get('/participants', (req, res, next) => {
    res.sendFile(path.join(__dirname, "/../build/html/participants.html"));
});

app.get('/settings', (req, res, next) => {
    res.sendFile(path.join(__dirname, "/../build/html/settings.html"));
});

app.get('/addlot', (req, res, next) => {
    res.sendFile(path.join(__dirname, "/../build/html/addlot.html"));
});

/**
 * Lot requests
 */
app.post('/data/lot', (req, res, next) => {
    console.log("Adding a new lot");
    let lot = req.body;
    lotter.addLot(lot);
    res.send();
});

app.get('/data/lot/:num', (req, res, next) => {
    res.send(lotter.lots[req.params.num])
});

app.post('/data/lot/update:num', (req, res, next) => {
    console.log(`Updating a lot with index: ${req.params.num}`);
    // console.log(`Request new data: ${JSON.stringify(req.body)}`);
    lotter.changeLot(req.params.num, req.body);
    res.send();
});

app.get('/data/lots', (req, res) => {
    res.send(lotter.lots);
});

/**
 * Participant requests
 */
app.post('/data/participant', (req, res, next) => {
    console.log(`Got new participant: ${req.body.name}`);
    partsMngr.addParticipant(req.body.name, req.body.wealth)
    res.send();
});

app.get('/data/participant/:num', (req, res, next) => {
    let id = req.params.num;
    console.log(`Get info on participant with id: ${id}`);
    res.send(partsMngr.getParticipant(id));
});

app.post('/data/participant/update:num', (req, res, next) => {
    let id = req.params.num;
    console.log(`Update participant data with id: ${id}`);
    partsMngr.changeParticipant(id, req.body.name, req.body.wealth);
    res.send();
});

app.post('/data/participant/delete:num', (req, res, next) => {
    let id = req.params.num;
    console.log(`Deleting participant with id: ${id}`);
    partsMngr.removeParticipant(id);
    res.send();
});

app.get('/data/participants', (req, res, next) => {
    res.send(partsMngr.participants);
});

/**
 * Settings requests
 */
app.get('/data/settings', (req, res) => {
    console.log("Get settings");
    res.send(settings.getSettings());
});

app.post('/data/settings', (req, res) => {
    let data = req.body;
    console.log(`Updating settings: ${JSON.stringify(data)}`);
    settings.changeSettings(data.date, data.time
        , data.lotTimeout, data.initialPause);
    res.send();
});

module.exports = app;