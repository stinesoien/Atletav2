var mysql = require('mysql');

var connection = mysql.createConnection({
    host: "mysql.stud.iie.ntnu.no",
    user: "g_sysu_atleta",
    password: "jsaFruna",
    database: "g_sysu_atleta"
});

connection.connect(function (err) {
    if(!err) {
        console.log("Database is connected");
    } else {
        console.log("Error while connecting with database");
    }
});

module.exports = connection;