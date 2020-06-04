const ROLES = require('./roles');

const isLoggedIn = function(req, res, next) {
    if (req.isAuthenticated()) return next();

    res.redirect('/signin');
}

const checkIsInRole = (...roles) => (req, res, next) => {
    const hasRole = roles.find(role => req.user.role === role)
    if (!hasRole) {
        return res.redirect(getRedirectUrl(req.user.role))
    }
    return next();
}

const getRedirectUrl = role => {
    switch (role) {
        case ROLES.Sales:
            return '/sales/home';
        case ROLES.Debitur:
            return '/debitur/';
        default:
            return '/';
    }
}

module.exports = {
    isLoggedIn: isLoggedIn,
    checkIsInRole: checkIsInRole,
    getRedirectUrl: getRedirectUrl
}