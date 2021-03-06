const ROLES = require('./roles');

const isLoggedIn = function(req, res, next) {
    if (req.isAuthenticated()) return next();

    res.redirect('/signin');
}

const checkIsInRole = (...roles) => (req, res, next) => {
    const hasRole = roles.find(role => req.user.role === role)
    if (!hasRole) {
        req.flash('messageError', "You don't have permission. ")
        return res.redirect('back');
    }
    return next();
}

const getRedirectUrl = role => {
    switch (role) {
        default:
            return '/sales/home';
    }
}

module.exports = {
    isLoggedIn: isLoggedIn,
    checkIsInRole: checkIsInRole,
    getRedirectUrl: getRedirectUrl
}