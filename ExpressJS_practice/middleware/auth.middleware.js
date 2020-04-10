var db = require('../db');

module.exports.requireAuth = function(req, res, next) {

    if( ! req.cookies.userId) {
        res.redirect('/auth/login');
        return;
    }
    var cookiesApply = db.get('users').find({ id: req.cookies.userId }).value();

    if( ! cookiesApply) {
        res.redirect('/auth/login');
        return;
    }
    next();
};