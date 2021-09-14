module.exports = {
    forwardAuthenticated: (req, res, next) => {
        if (req.session.userID) {
            res.redirect('/user/account');
        } else {
            next();
        }
    },

    forwardUnAuthenticated: (req, res, next) => {
        if (!req.session.userID === undefined) {
            res.redirect('/user/login');
        } else {
            next();
        }
    },
};