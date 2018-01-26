var connection = require('./../config');

module.exports={
    getBooking: function (req,res) {
        connection.pool.query('SELECT TIME_FORMAT(time, \'%H:%i\') AS \'time\', b_name, b_id FROM booking WHERE date=? AND b_id NOT IN (SELECT b_id FROM users_booking WHERE email=?) ORDER BY time', [req.params.date, req.user.email], function(err, result){
            if(err) {
                return res.status(500).json({message: 'Something went wrong.'});
            }
            if(result.length ===0) return res.status(404).json({message: 'Booking not found'});
            res.send(result);
        });
    },

    updateBooking: function (req, res) {
        connection.pool.query('INSERT INTO users_booking SET b_id=?, email=?',[req.body.b_id, req.user.email], function (err) {
            if (err) {
                console.log(err);
                return res.status(500).json({message: 'Something went wrong.'});
            }
            return res.status(200).json({message: 'The class is booked'});
        });

    }
};