var connection = require('./../config');

module.exports = {
    updateUser: function(req, res) {
        if(req.isAuthenticated()){
            var fname = req.body.fname;
            var sname =req.body.sname;
            var address = req.body.address;
            var phone = req.body.phone;
            var email = req.body.email;
            var reLetters= /[A-ÆØÅa-æøå -]+$/;
            var reNumbers = /[0-9].{7,}/;
            if(fname != "" && reLetters.test(fname) && sname !="" && reLetters.test(sname) && address !="" && reNumbers.test(phone) && phone != ""){
                connection.pool.query('UPDATE users SET fname=?, sname=?, address=?, phone=? WHERE email=?', [fname, sname, address, phone, email], function (error) {
                    if (error){
                        return res.status(500).json({message: 'Something went wrong'});
                    }
                    return res.status(200).json({message: 'User updated.'});
                });

            }else{
                return res.status(401).json({message: 'All fiels are required'});
            }
        }else{
            return res.status(401).json({message: 'You are not authorized to perform this action.'});
        }
    }
};