module.exports = {
    forwardAuthenticated: (req, res, next) => {
        if (req.userID) {
            res.redirect('/user/account');
        } else {
            next();
        }
    },

    forwardUnAuthenticated: (req, res, next) => {
        if (!req.userID === undefined) {
            res.redirect('/user/login');
        } else {
            next();
        }
    },
};