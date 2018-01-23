var connection = require('./../config');

module.exports = {
    getUserByEmail: function (req, res) {
        connection.pool.query('SELECT fname, sname, address, phone FROM users WHERE email = ?', [req.params.email], function (error, results) {
            if (error) return res.status(500).json({message: 'Something went wrong.'});
            if (results.length === 0) return res.status(404).json();
            res.status(200).json({User: results[0]});
        })
    }
};