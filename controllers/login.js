var connection = require('./../config');
var bcrypt = require('bcrypt');

module.exports.login=function (req, res) {
    var email=req.body.email;
    var password=req.body.password;
    connection.query('SELECT * FROM users WHERE email = ?', [email], function (error, results, fields) {
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
                            message: "Epost og passord matcher ikke"
                        });
                    } else {
                        res.json({
                            status: true,
                            message: "Logget inn"
                        })
                    }
                });

        } else {
                res.json({
                    status: false,
                    message: "Epost eksisterer ikke"
                });
            }
        }

    });

};