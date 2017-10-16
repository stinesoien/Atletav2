var connection = require('./../config');

module.exports = {
    getUserByEmail: function(req, res) {
        connection.query('select fornavn, etternavn, adresse, mobilnr from bruker where epost = ? ', [req.params.email], function(error, results){
            if(error) return res.status(500).json({message: 'Something went wrong.'});
            if(results.length === 0) return res.status(404).json({message: 'User not found.'});
            res.status(200).json({User: results[0]});
        });

    }
}