var connection = require('./../config');
var bcrypt = require('bcrypt');

module.exports = {
    updatePassword: function (req, res) {
        if(req.isAuthenticated()) {
            var password = req.body.newPassword;
            var oPassword = req.body.oldPassword;
            var cPassword = req.body.confirmPassword;
            var email = req.user.email;
            var req = /.{8,}/;
            bcrypt.genSalt(10, function (err, salt) {
                bcrypt.hash(password, salt, function (err, hash) {
                    if(err) {
                        return res.status(500).send();
                    }
                    if(oPassword!="" && password!=""&&cPassword!="" && req.test(cPassword) && req.test(password)){
                        if(oPassword!=password){
                            if(password==cPassword){
                                connection.pool.query('UPDATE users SET password = ? WHERE email=?', [hash, email], function (error) {
                                    if (error) {
                                        return res.status(500).json({message: 'Something went wrong'});
                                    }
                                    return res.status(200).json({message: 'Password updated.'});
                                });
                            } else{
                                return res.status(401).json({message: 'Confirm password is not same as your new password'});
                            }
                        }else{
                            return res.status(401).json({message: 'This is your old password, please provide a new password'});
                        }
                    }else{
                        return res.status(401).json({message: 'All fiels are required'});
                    }

                });
            });
        }
        else {
            return res.status(401).json({message: 'You are not authorized to perform this action.'});
        }

    }
};
