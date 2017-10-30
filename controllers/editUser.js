var connection = require('./../config');


module.exports = {
    updateUser: function(req, res) {
        var fname = req.body.fname;
        var sname =req.body.sname;
        var address = req.body.address;
        var phone = req.body.phone;
        var email = req.body.email;

        console.log(req.body);
        connection.query('UPDATE users SET fname=?, sname=?, address=?, phone=? WHERE email=?', [fname, sname, address, phone, email], function (error, results) {

            if (error){
                return res.status(500).json({message: 'Something went wrong'});
            }
            return res.status(200).json({message: 'User updated.'});
        });
    }

};