var connection = require('./../config');

module.exports={
    getBooking: function (req,res) {
        connection.pool.query('SELECT time, b_name FROM booking WHERE date = ? ORDER BY time', [req.params.date], function(err, result){
            if(err) {
                return res.status(500).json({message: 'Something went wrong.'});
            }
            if(result.length ===0) return res.status(404).json({message: 'Booking not found'});
            res.send(result);
        });
        //connection.pool.query('INSERT INTO users_booking (b_id, email) VALUES (?,?)');
    },

    getNextDay: function (req, res) {
        var thisDate = req.body.theDate;
        var tomorrow = thisDate.addDays(1).toString("dd/mm/yyyy");
    },

    getPastDay: function (req, res) {

    }

};