var express = require("express");
var bodyParser = require('body-parser');


var app = express();


var authenticateController = require('./controllers/login');
var registerController = require('./controllers/newUser');
var editUserController = require('./controllers/editUser');
var userController = require('./controllers/user');


app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


app.set('view engine', 'pug');
app.set('views', './views');


app.get('/users/:email', function(req, res) {
   userController.getUserByEmail(req, res);
});

app.put('/users/:email', function(req, res) {
   editUserController.updateUser(req, res);
});

app.get('/editUser', function(req, res) {
    res.render('editUser');
});

/* route to handle login and registration */
app.post('/login', authenticateController.login);
app.post('/newuser', registerController.register);

app.get('/', function(req, res){
    res.render('index');
});

app.get('/login', function(req, res){
    res.render('login');
});

app.get('/newuser', function (req, res) {
    res.render('newUser')
});


app.listen(3000);