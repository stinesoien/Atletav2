var connection = require('./../config');
var bcrypt = require('bcrypt');


module.exports = {
    register: function (req, res) {
        var email = req.body.email;
        var password = req.body.password;
        var fname = req.body.fname;
        var sname = req.body.sname;
        var address = req.body.address;
        var phone = req.body.phone;

        bcrypt.genSalt(10, function (err, salt) {
                bcrypt.hash(password, salt, function (err, hash) {
                    password = hash;
                    connection.pool.query('INSERT INTO users SET email=?, password=?, fname=?, sname=?, address=?, phone =?', [email, password, fname, sname, address, phone], function (error, results) {
                        if (error) {
                            res.json({
                                status: false,
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

                });
        });
    }
};
