const express = require('express');
const routes = require('./routes');
const https = require('https');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');

const port = 8443;
httpsOptions = {
    key: fs.readFileSync('ssl/key.pem', 'utf8'),
    cert: fs.readFileSync('ssl/cert.pem', 'utf8')
}

app.use(express.static('./build/html'));
app.use('/css', express.static('./build/css'));
app.use('/js', express.static('./build/js'));
app.use('/', routes);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// console.log(`DIRNAME: ${__dirname}`);

let server = https.createServer(httpsOptions, app)
server.listen(port, (err) => {
	if (err) {
		console.log("Error was occured at server start");
    } else {
        console.log(`Server is started at port ${port}`);
    }
});
