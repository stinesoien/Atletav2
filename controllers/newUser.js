var connection = require('./../config');

module.exports.register = function (req, res) {
    var users = {
        "epost" : req.body.epost,
        "passord" : req.body.passord,
        "fornavn" : req.body.fornavn,
        "etternavn" : req.body.etternavn,
        "adresse": req.body.adresse,
        "mobilnr" : req.body.mobilnr
    }

    connection.query('INSERT INTO bruker SET ?', users, function (error, results, fields) {
        if (error) {
            res.json({
                status:false,
                message: 'there are some error with query'
            })
        } else {
            res.json({
                status: true,
                data: results,
                message: 'user registered sucessfully'
            })
        }
    });
}