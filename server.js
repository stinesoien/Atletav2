const express= require('express');
const path = require('path');
const app = express();

var auth = require('/');
var loggedIn = require('/controllers/login.js');
require('/config.js');

app.get('/', loggedIn, function(req, res) {
    res.sendFile(path.resolve(__dirname, '.', 'build', 'index.pug'));
});

app.use(express.static(path.resolve(__dirname, '.', 'build', 'index.pug')));

