var express = require("express");
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');
var LocalStrategy = require('passport-local').Strategy;
var connection = require('./config');
var bcrypt = require('bcrypt');

var app = express();

var authenticateController = require('./controllers/login');
var registerController = require('./controllers/newUser');
var editUserController = require('./controllers/editUser');
var userController = require('./controllers/user');
var editPasswordController = require('./controllers/editPassword');

app.use(session({
    secret: 'myVerySecretKey',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());

passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
        session: true

    }, function(req, email, password, done) { // callback med epost og passord fra formet vår
        connection.pool.query("SELECT * FROM users WHERE email = ?",[email], function(err, rows){
            if (err)
                return done(err);
            if (!rows.length) {
                return done(null, false, req.flash('loginMessage', 'No user found')); // req.flash is the way to set flashdata using connect-flash
            }

            //Hvis brukeren er funnet, men passordet er feil
            if (!bcrypt.compareSync(password, rows[0].password))
                return done(null, false, req.flash('loginMessage', 'Wrong password')); // create the loginMessage and save it to session as flashdata

            // Returnerer suksessfull bruker
            return done(null, rows[0]);
        });
    })
);



passport.serializeUser(function(user, done){
    done(null, user.email);
});

passport.deserializeUser(function(email, done){
    connection.pool.query("SELECT * FROM users WHERE email = ? ",[email], function (err, rows){
        done(err, rows[0]);
    });
});

app.get('/session', function(req, res){
    if(req.user) {
        res.json({epost: req.user.email});
    } else {
        res.send("Session failed");
    }
});

app.get('/error', function(req, res){
    res.send('Login Failed');
});

app.get('/callback', passport.authenticate('local', {failtureRedirect: '/error'}), function(req, res){
    res.redirect('/');
});


app.use(express.static('public'));


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.set('view engine', 'pug');
app.set('views', './views');

//Henter en bruker på mailadressen sin via funksjonen getUserByEmail i users.js
app.get('/users/:email', function(req, res) {
   userController.getUserByEmail(req, res);
});

//Bruker updateUser-funskjonen i controllers/editUser.js for å oppdatere info om den spesifike brukeren gitt på email.
app.put('/users/:email', function(req, res) {
   editUserController.updateUser(req, res);
});

//Henter editUser.pug
app.get('/editUser', function(req, res) {
    res.render('editUser');
});

app.get('/editPassword', function (req, res) {
    res.render('editPassword');

});

app.put('/users/:email', function (req, res) {
    editPasswordController.updatePassword(req,res);
});

/* route to handle login and registration */
app.post('/login',
    passport.authenticate('local', { failureRedirect: '/login' }),
    function(req, res ) {

        res.redirect('/');

});
app.post('/newuser', registerController.register);

app.get('/', function(req, res){
    if(req.isAuthenticated()) {
        res.render('index', {user: req.user});
    }
    else {
        res.render('index');
    }
});

app.get('/logout', function(req, res) {
    req.logOut();
    res.redirect('/');
});

app.get('/login', function(req, res){
    res.render('login');
});

app.get('/newuser', function (req, res) {
    res.render('newUser')
});


app.listen(3000);