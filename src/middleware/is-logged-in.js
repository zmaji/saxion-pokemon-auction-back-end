const { StatusCodes} = require('http-status-codes');
const users = require('../data/users');
const bcrypt = require('bcrypt');

const isLoggedIn = (req, res, next) => {
    console.log('Authenticating...');

    const data = getDataFromRequest(req);

    if (data) {
        const [username, password] = data;
        const user = users.find((user) => {
            return user.firstName === username;
        })

        if (user) {
            const result = bcrypt.compareSync(password, user.password);
            if (result) {
                req.user = user;
                next();
            }
        }
    }
};

const getDataFromRequest = (req) => {
    const authHeader = req.header(['authorization'].toString());

    if (authHeader) {
        return authHeader.split(' ');
    }

    return false;
}

module.exports = isLoggedIn;