const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

// Stuff for authorization
// const passport = require('passport');
const session = require('express-session');

// Setup Authorization
const passport = require('passport')

const admin = {
    username: 'admin',
    password: '11111',
    id: 1
}

app.use(session({
    secret: 'foo',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: true }));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
    (user, password, done) => {
        if (user !== admin.username) {
            console.log("Incorrect username was entered");
            return done(null, false, {message: 'User not found'});
        } else if (password !== admin.password) {
            console.log("Incorrect password was entered");
            return done(null, false, {message: 'Wrong password'});
        }

        console.log("Correct user data was entered");
        return done(null, user);
    }
));

// Favicon setup
let favicon = require('serve-favicon');
app.use(favicon(path.join(__dirname, '/src/img', 'favicon.ico')))

app.use(bodyParser.json());
// Parse incoming request bodies in a middleware before your handlers, 
// available under the req.body property
app.use(bodyParser.urlencoded({ extended: true }));
const routes = require("./routes");

app.use('/js', express.static(__dirname + '/src/js'));
app.use('/css', express.static(__dirname + '/src/css'));

app.set('view engine', 'pug');
app.set('views', './src/views');
app.use('/', routes);

app.listen(port, (err) => {
	if (err) {
		console.log("Error occured at server start");
    } else {
        console.log(`Server started at http://localhost:${port}`);
    }
});