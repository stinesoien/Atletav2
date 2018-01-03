var connection = require('./../config');

module.exports={
    getReservations: function(req, res){
        connection.pool.query('SELECT DATE_FORMAT(date, \'%d.%M.%Y\') AS \'date\', TIME_FORMAT(time, \'%H:%i\') AS \'time\', b_name FROM booking NATURAL JOIN users_booking ORDER BY date;', [req.body.b_id], function (err, result) {
            if(err){
                console.log(err);
                return res.status(500).json({message: 'Something went wrong'});
            }
            if(result.length ===0) return res.status(404).json({message: 'No reservations found'});
            res.send(result);
        })
    },
    /*
    deleteReservations: function(req, res){
        connection.pool.query('');
    }*/
};