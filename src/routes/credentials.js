const express = require('express');
const { StatusCodes } = require('http-status-codes');
const users = require('../data/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = (email, password) => {
    const user = users.find((user) => {
        return user.email === email;
    })

    if (user) {
        const result = bcrypt.compareSync(password, user.password);
        if (result) {
            return jwt.sign({
                userID: user.userID,
                email: user.email,
                roles: user.roles
            }, user.secret);
        }
    }

    return false
};

const router = express.Router();

router.post('', (req, res) => {
    const { email, password } = req.body;

    if (email && password) {
        const token = login(email, password);

        if (token) {
            res
                .status(StatusCodes.CREATED)
                .send({token: token});
        } else {
            res
                .status(StatusCodes.UNAUTHORIZED)
                .send('Username and/or password are incorrect');
        }
    } else {
        res
            .status(StatusCodes.BAD_REQUEST)
            .send('Required parameters missing')
    }


});

module.exports = router;