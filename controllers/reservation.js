var connection = require('./../config');

module.exports={
    getReservations: function(req, res){
        connection.pool.query('SELECT DATE_FORMAT(date, \'%d.%M.%Y\') AS \'dateFormat\', TIME_FORMAT(time, \'%H:%i\') AS \'time\', DATE_FORMAT(date, \'%m\') AS \'sqlMonth\', DATE_FORMAT(date, \'%d\') AS \'sqlDay\', DATE_FORMAT(date, \'%Y\') AS \'sqlYear\', b_name, b_id FROM booking NATURAL JOIN users_booking WHERE email=? ORDER BY date;', [req.user.email], function (err, result) {
            if(err){
                console.log(err);
                return res.status(500).json({message: 'Something went wrong'});
            }
            if(result.length ===0) return res.status(404).json({message: 'No reservations found'});
            res.send(result);
        })
    },

    deleteReservations: function(req, res) {
        connection.pool.query('DELETE FROM users_booking WHERE b_id=?', [req.body.b_id], function (err, result){
            if (err) {
                console.log(err);
                return res.status(500).json({message: 'Something went wrong'});
            }
            if (result.length === 0) return res.status(404).json({message: 'No reservations deleted'});
            res.send(result);
        });
    }
};