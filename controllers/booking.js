var connection = require('./../config');

module.exports={
    getBooking: function (req,res) {
        connection.pool.query('SELECT time, b_name FROM booking WHERE date = ?', [req.params.date], function(err){
            if(err) {
                return res.status(500).json({message: 'Something went wrong.'});
            } return res.status(200).json({message: ' updated.'});
        });
        //connection.pool.query('INSERT INTO users_booking (b_id, email) VALUES (?,?)');
    }
};