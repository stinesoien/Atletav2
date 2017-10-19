var connection = require('./../config');
var bcrypt = require('bcrypt');

module.exports.login=function (req, res) {
    var email=req.body.epost;
    var password=req.body.passord;
    connection.query('SELECT * FROM bruker WHERE epost = ?', [email], function (error, results, fields) {
        if (error) {
            res.json({
                staus: false,
                message: 'there are some error with query'
            })
        } else {
            if(results.length > 0){
                bcrypt.compare(password, results[0].passord, function(err, ress) {
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