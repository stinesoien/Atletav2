var mysql = require('mysql');

var con = mysql.createConnection({
    host: "mysql.stud.iie.ntnu.no",
    user: "g_sysu_atleta",
    password: "jsaFruna",
    database: "g_sysu_atleta"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

con.query('SELECT * FROM bruker', function(err, rows, fields) {
    if (!err)
        console.log('The solution is: ', rows);
    else
        console.log('Error while performing Query.');
});

con.end();