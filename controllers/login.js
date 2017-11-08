var connection = require('./../config');
var bcrypt = require('bcrypt');

module.exports.login=function (req, res) {
    var email=req.body.email;
    var password=req.body.password;
    connection.pool.query('SELECT * FROM users WHERE email = ?', [email], function (error, results) {
        if (error) {
            res.json({
                staus: false,
                message: 'there are some error with query'
            })
        } else {
            if(results.length > 0){
                bcrypt.compare(password, results[0].password, function(err, ress) {
                    if(!ress){
                        res.json({
                            status: false,
                            message: "Feil e-post eller passord"
                        });
                    } else {
                        res.json({
                            status: true,
                            message: "Du er logget inn"
                        })
                    }
                });

        } else {
                res.json({
                    status: false,
                    message: "Denne e-posten eksisterer ikke"
                });
            }
        }

    });

};