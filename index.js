var express = require("express");
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');
var LocalStrategy = require('passport-local').Strategy;
var connection = require('./config');
var bcrypt = require('bcrypt');
var JSAlert = require("js-alert");
var basedir = require('base-dir');

var app = express();

var registerController = require('./controllers/newUser');
var editUserController = require('./controllers/editUser');
var userController = require('./controllers/user');
var classesController = require('./controllers/classes');
var editPasswordController = require('./controllers/editPassword');
var bookingController = require('./controllers/booking');
var reservationController = require('./controllers/reservation');


app.use(session({
    secret: 'myVerySecretKey',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: false }))
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
                return done(null, false);
            }

            //Hvis brukeren er funnet, men passordet er feil
            if (!bcrypt.compareSync(password, rows[0].password))
                return done(null, false);

            // Returnerer suksessfull bruker
            return done(null, rows[0]);
        });
    })
);


//Serialize og deserialize lar oss være logget også når man går mellom ulike sider på applikasjonen
passport.serializeUser(function(user, done){
    done(null, user.email);
});

passport.deserializeUser(function(email, done){
    connection.pool.query("SELECT * FROM users WHERE email = ? ",[email], function (err, rows){
        done(err, rows[0]);
    });
});

//Finner brukeren som er logget på via session, og henter dens brukerinformasjon og fyller inn i inputfeltene i editUser
app.get('/session', function(req, res){
    if(req.user) {
        res.json({epost: req.user.email});
    } else {
        res.send("Session failed");
    }
});

//Legger inn endringene på brukeren som er logget inn via session.
app.put('/session', function(req, res){
    if(req.user){
        res.json({epost: req.user.email});
    }else{
        res.send("Session failed");
    }
});



app.post('/booking', function(req, res){
    if(req.user) {
        bookingController.updateBooking(req, res);
    } else {
        res.status(401).json({message: "you are not logged in."});
    }
});

app.get('/myReservations', function (req, res) {
    if(req.user){
        reservationController.getReservations(req, res);
    }else{
        res.status(401).json({message: "you are not logged in."});
    }
});

app.delete('/deleteReservation', function (req, res) {
    if(req.user){
        reservationController.deleteReservations(req, res);
    }else{
        res.status(401).json({message: "you are not logged in."});
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

//Henter en bruker på mailadressen sin via funksjonen getUserByEmail i users.js(controllers)
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

//Gir oss editPassword-pug filen hvis bruker er logget inn.
app.get('/editPassword', function (req, res) {
    if(req.isAuthenticated()) {
        res.render('editPassword', {user: req.user});
    }
    else {
        res.redirect('/')
    }
});
//Kjører funksjonen updatePassword(i controllers) og oppdaterer brukeren vha. sql-spørringen.
app.put('/updatePassword', function (req, res) {
    editPasswordController.updatePassword(req,res);
});

//Henter booking.pug
app.get('/notLoggedInBooking', function (req, res) {
    res.render('notLoggedInBooking');
});

app.get('/loggedInBooking', function (req, res) {
    res.render('loggedInBooking');
});

app.get('/reservations', function (req,res) {
    res.render('reservations');
});

//HER ØNSKER VI Å SENDE EN TILBAKEMELD OM FEIL PASSORD ELLER BRUKERNAVN!!!!
app.get('/login', function(req, res){
    res.redirect('/');
    //console.log('Feil');
    JSAlert.alert("This is an alert.");
});

/* route to handle login and registration */
app.post('/login',
    passport.authenticate('local', { failureRedirect: '/login'  }),
    function(req, res ) {
        res.redirect('/');
});

//Logger ut en bruker og sender h*n tilbake til hjemsiden
app.get('/logout', function(req, res) {
    req.logOut();
    res.redirect('/');
});



app.post('/newUser', function (req, res) {
    registerController.register(req,res);

});



app.get('/', function(req, res){
    if(req.isAuthenticated()) {
        res.render('index', {user: req.user});
    }
    else {
        res.render('index');
    }
});

app.get('/newUser', function (req, res) {
    res.render('newUser');
});


app.get('/classes', function (req, res) {
    res.render('classes');
});

app.get('/alertSuccess', function (req, res) {
    res.render('alertSuccess');
});


app.get('/statistic', function (req, res) {
    res.render('statistic')
});

app.get('/userPage', function (req, res) {
    if(req.isAuthenticated()) {
        res.render('userPage', {user: req.user});
    }
    else {
        res.render('userPage');
    }
});


app.get('/notLoggedInBooking/:date', function (req, res) {
    bookingController.getBooking(req, res);
});

app.get('/loggedInBooking/:date', function (req, res) {
    bookingController.getBooking(req, res);
});


app.get('/classes/:level', function (req, res) {
    classesController.getClasses(req, res);
});

//app.locals.basedir = '';

//basedir.root = 'Altetav2';
/*var main = basedir.import('/public/js/index.js');
console.log('text: %s', main.text);*/

app.listen(3000);