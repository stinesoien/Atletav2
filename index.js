var express = require("express");
var bodyParser = require('body-parser');

var app = express();

//var authenticateController = require('./controllers/login');
//var registerController = require('./controllers/newUser');
var editUserController = require('./controllers/editUser');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.set('view engine', 'pug');
app.set('views', './views');

app.get('/user/:epost', function(req, res){
    //res.send('The id you specified is ' + req.params.epost);
    res.render('editUser');
});

app.put('/', editUserController.edit, function (req, res) {
    console.log(req.body);

});

/* route to handle login and registration */
//app.post('/login', authenticateController.login);
//app.post('/newuser', registerController.register);

/*app.get('/', function(req, res){
    res.render('index');
});*/
/*
app.get('/login', function(req, res){
    res.render('login');
});

app.get('/newuser', function (req, res) {
    res.render('newUser')
});*/


app.listen(3000);