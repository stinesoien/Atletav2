var connection = require('./../config');


module.exports.edit=function (req, res) {
    var users = {
        "adresse": req.body.adresse,
        "mobilnr" : req.body.mobilnr,
        "passord" : req.body.passord,
        "epost" : req.body.epost,
    };
    console.log(epost);
    connection.query('UPDATE bruker SET adresse=?, mobilnr= ?, passord=? WHERE epost=?', users, function (error, results, fields) {

        if (error){ throw error;
            console.log('The response is: ', results);
        } else {
            res.json({
            status: true,
            data: results,
            message: 'user registered sucessfully'
        })
    }
    });

};