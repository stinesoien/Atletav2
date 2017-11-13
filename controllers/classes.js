var connection = require('./../config');

module.exports = {
    getClasses: function (req, res) {
        connection.pool.query('SELECT class_name, c_id, level FROM classes WHERE level = ?', [req.params.level], function (err, result){
            if(err) return res.status(500).json({message: 'Something went wrong.'});
            //console.log(result);
            if(result.length === 0) return res.status(404).json({message: 'User not found.'});
            res.send(result);
        });
    }
};





