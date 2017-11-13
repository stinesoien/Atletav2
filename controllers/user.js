var connection = require('./../config');

module.exports = {
    getUserByEmail: function(req, res) {
        connection.pool.query('SELECT fname, sname, address, phone FROM users WHERE email = ?', [req.params.email], function(error, results){
            if(error) return res.status(500).json({message: 'Something went wrong.'});
            if(results.length === 0) return res.status(404).json({message: 'User not found.'});
            res.status(200).json({User: results[0]});
        });

    },
    getUserOnPassword: function (req, res) {
        connection.pool.query('SELECT password FROM users WHERE email = ?', [req.params.email], function (error, results) {
            if(error) return res.status(500).json({message: 'Something went wrong.'});
            if(results.length === 0) return res.status(404).json({message: 'User not found.'});
            res.status(200).json({Password: results[0]});

        })

    }
/*
    updatePassword : function (req, res) {
        connection.pool.query('UPDATE password FROM users WHERE ')

    }*/
};