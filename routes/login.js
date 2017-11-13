/*var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');
var LocalStrategy = require('passport-local').Strategy;
var connection = require('./config');
var bcrypt = require('bcrypt');

router.use(session({
    secret: 'myVerySecretKey',
    resave: true,
    saveUninitialized: true
}));
router.use(passport.initialize());
router.use(passport.session());
router.use(bodyParser.json());

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
                return done(null, false, req.flash('No user found', 'loginMessage')); // req.flash is the way to set flashdata using connect-flash
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

router.get('/session', function(req, res){
    if(req.user) {
        res.json({epost: req.user.email});
    } else {
        res.send("Session failed");
    }
});

router.put('/session', function(req, res){
    if(req.user){
        res.json({epost: req.user.email});
    }else{
        res.send("Session failed");
    }
});

router.get('/session', function(req, res){
    if(req.user){
        res.json({passord: req.user.password});
    }else{
        res.send("Session failed");
    }
});

router.put('/session', function(req, res){
    if(req.user){
        res.json({passord: req.user.password});
    }else{
        res.send("Session failed");
    }
});


router.get('/error', function(req, res){
    res.send('Login Failed');
});

router.get('/callback', passport.authenticate('local', {failtureRedirect: '/error'}), function(req, res){
    res.redirect('/');
});


router.use(express.static('public'));


router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());


router.set('view engine', 'pug');
router.set('views', './views');

router.get('/login', function(req, res){
    res.render('login');
});

router.get('/logout', function(req, res) {
    req.logOut();
    res.redirect('/');
});

router.get('/', function(req, res){
    if(req.isAuthenticated()) {
        res.render('index', {user: req.user});
    }
    else {
        res.render('index');
    }
});
*/
/* route to handle login and registration */

/*router.post('/login',
    passport.authenticate('local', { failureRedirect: '/login' }),
    function(req, res ) {

        res.redirect('/');

    });


module.exports = router;*/