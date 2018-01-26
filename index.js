var express = require("express");
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');
var LocalStrategy = require('passport-local').Strategy;
var connection = require('./config');
var bcrypt = require('bcrypt');
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
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.set('view engine', 'pug');
app.set('views', './views');

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

//Finner brukeren som er logget på via session, og henter dens brukerinformasjon og fyller inn i inputfeltene i editUser.
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

//Laster inn index.pug, vår hovedside/forside.
app.get('/', function(req, res){
    if(req.isAuthenticated()) {
        res.render('index', {user: req.user});
    }
    else {
        res.render('index');
    }
});



//BOOKING

//Bruker getBooking-funskjonen for å utføre SQL-spørring til å finne gruppetimer på en spesifikk dato.
app.get('/loggedInBooking/:date', function (req, res) {
    if(req.user) {
        bookingController.getBooking(req, res);
    } else {
        res.status(401).json({message: "you are not logged in."});
    }
});

//Bruker updateBooking-funskjonen for å utføre SQL-spørringen som utfører en booking på den innloggede persjonen.
app.post('/booking', function(req, res){
    if(req.user) {
        bookingController.updateBooking(req, res);
    } else {
        res.status(401).json({message: "you are not logged in."});
    }
});



//RESERVASJONER

//Bruker getReservation-funskjonen for å utføre SQL-spørringen som finner alle reservasjoene som tilhører en bestemt person.
app.get('/myReservations', function (req, res) {
    if(req.user) {
        reservationController.getReservations(req, res);
    }else{
        res.status(401).json({message: "you are not logged in."});
    }
});

//Bruker deleteReservation-funskjonen for å utføre SQL-spørringen som sletter en gitt reservasjon
app.delete('/deleteReservation', function (req, res) {
    if(req.user){
        reservationController.deleteReservations(req, res);
    }else{
        res.status(401).json({message: "you are not logged in."});
    }
});



//LOGG INN

app.get('/error', function(req, res){
    res.send('Login Failed');
});

app.get('/callback', passport.authenticate('local', {failtureRedirect: '/error'}), function(req, res){
    res.redirect('/');
});

//Logger inn en bruker
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



//ENDRE BRUKER-INFORMASJON

//Bruker getUserByEmail-funskjonen for å utføre SQL-spørringen som henter en bruker på mailadressen sin.
app.get('/users/:email', function(req, res) {
   userController.getUserByEmail(req, res);
});

//Bruker updateUser-funskjonen for å utføre SQL-spørringen som oppdaterer info om den spesifike brukeren gitt på email.
app.put('/users/:email', function(req, res) {
   editUserController.updateUser(req, res);
});



//ENDRE PASSORD

//Bruker updatePassword-funskjonen for å utføre SQL-spørringen som oppdaterer det gamle passordet til det nye brukeren har skrevet inn.
app.put('/updatePassword', function (req, res) {
    editPasswordController.updatePassword(req,res);
});



//EN NY BRUKER BLIR MEDLEM

//Bruker register-funskjonen for å utføre SQL-spørring som lager/registerer en ny bruker.
app.post('/newUser', function (req, res) {
    registerController.register(req,res);

});



//ALERTS

//Laster suksess-alerten
app.get('/alertSuccess', function (req, res) {
    res.render('alertSuccess');
});

//Laster feilvarsel-alerten
app.get('/alertError', function (req, res) {
    res.render('alertError');
});



//GRUPPETIMER

//Henter de ulike gruppetimene rangert på nivå.
app.get('/classes/:level', function (req, res) {
    classesController.getClasses(req, res);
});


app.listen(3000);