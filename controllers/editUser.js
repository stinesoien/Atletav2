var connection = require('./../config');


module.exports = {
    updateUser: function(req, res) {
        var fornavn = req.body.fornavn;
        var etternavn =req.body.etternavn;
        var adresse = req.body.adresse;
        var mobilnr = req.body.mobilnr;
        var epost = req.body.epost;

        console.log(req.body);
        connection.query('UPDATE bruker SET fornavn=?, etternavn=?, adresse=?, mobilnr=? WHERE epost=?', [fornavn, etternavn, adresse, mobilnr, epost], function (error, results) {

            if (error){
                return res.status(500).json({message: 'Something went wrong'});
            }
            return res.status(200).json({message: 'User updated.'});
        });
    }

};