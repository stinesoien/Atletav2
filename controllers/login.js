var connection = require('./../config');
var editUser;

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
                if(password==results[0].passord){
                    // noinspection JSAnnotator
                    res.json({
                        status: true,
                        message: 'successfully authenticated',


                    })
                } else {
                    res.json({
                        status: false,
                        message: "Email and password does not match"
                    });
                }
            } else {
                res.json({
                    status: false,
                    message: "Email does not exist"
                });
            }
        }
        
    });
    
}