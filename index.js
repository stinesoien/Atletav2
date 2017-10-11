var express = require("express");
var bodyParser = require('body-parser');

var app = express();

var authenticateController = require('./controllers/authenticate-controller');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.set('view engine', 'pug');
app.set('views', './views');


/* route to handle login and registration */

app.post('/', authenticateController.authenticate);

app.get('/', function(req, res){
    res.render('login');
});

app.post('/', function(req, res){
    console.log(req.body);
    res.send("recieved your request!");
});


app.listen(3000);