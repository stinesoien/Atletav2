var connection = require('./../config');

module.exports = {
    updatePassword: function (req, res) {
        var password = req.body.password;

        console.log(req.body);
        connection.query('UPDATE users SET password = ? WHERE email=?', [password], function (error) {
            if (error){
                return res.status(500).json({message: 'Something went wrong'});
            }
            return res.status(200).json({message: 'Password updated.'});

        });

    }
};
