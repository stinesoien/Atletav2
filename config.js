var mysql = require('mysql');
var bodyParser = require('body-parser')


module.exports = {

    pool: mysql.createPool({
        connectionLimit: 2, //maks antall koblinger(pc,tlf og nettbrett)
        host: "mysql.stud.iie.ntnu.no",
        user: "g_sysu_atleta",
        password: "jsaFruna",
        database: "g_sysu_atleta"
    }),

    login: function(app) {
        app.use(bodyParser.json());
        var loggedIn = require('/controllers/logged-in.js');

        app.get('/users', loggedIn, function (req, res) {
            pool.getConnection(function(err){
                if(err){
                    res.status(500);
                    res.json({"error" : "Error connection to database: " + err});
                    return;
                }
                console.log('Connected to database..');

            })
        })
    }
};
