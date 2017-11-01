module.exports = function (req, res, next) {
    console.log('loggedIn: ' + req.isAuthenticated());
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/');
    }
};