const { StatusCodes} = require('http-status-codes');
const users = require('../data/users');
const jwt = require('jsonwebtoken');

const isLoggedIn = (req, res, next) => {
    console.log('Authenticating...');

    const token = getTokenFromRequest(req);

    if (token) {
        const payload = verifyToken(token);
        if (payload) {
            req.user = payload;
            return next();
        }
    }

    res.status(StatusCodes.UNAUTHORIZED).send('Authentication required')
};

const getTokenFromRequest = (req) => {
    const authHeader = req.headers['authorization'];

    if (authHeader) {
        return authHeader.split(' ')[1];
    }

    return false;
}

const verifyToken = (token) => {
    const tokenPayload = jwt.decode(token);

    if (tokenPayload) {
        const user = users.find(user => user.email === tokenPayload.email);
        if (user) {
            try {
                return jwt.verify(token, user.secret);
            } catch(e) {
                return false;
            }
        }
    }

    return false;
}

module.exports = isLoggedIn;