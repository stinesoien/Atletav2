var mysql = require('mysql');

var con = mysql.createConnection({
    host: "mysql.stud.iie.ntnu.no",
    user: "g_sysu_atleta",
    password: "jsaFruna",
    database: "g_sysu_atleta"
});


con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT fornavn FROM bruker", function (err, result, fields) {
        if (err) throw err;
        console.log(fields);
    });
});