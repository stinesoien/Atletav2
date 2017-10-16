var express = require('express');
mysql = require('mysql');
var bodyParser = require('body-parser');

var connection = mysql.createConnection({
    host: "mysql.stud.iie.ntnu.no",
    user: "g_sysu_atleta",
    password: "jsaFruna",
    database: "g_sysu_atleta"
});

var app = express();
//var app = module.exports = express.createServer();

//Database setup

connection.query('SELECT epost FROM bruker',  function(err, rows, fields){
    if (!err)
        console.log('The solution is: ', rows);
    else
        console.log('Error while performing Query.');
});

//app.use(express.bodyParser());
app.use(bodyParser());

app.get('/', function (req, res) {
    return res.sendFile('test.html',{'root': __dirname + '/views'});

});

//Begin listening
app.listen(3000);
console.log("Express server listening on port");