const express = require('express');
const { StatusCodes} = require('http-status-codes');
const isLoggedIn = require('../middleware/is-logged-in');


const router = express.Router();

router.get('', isLoggedIn, (req, res) => {
    res
        .status(StatusCodes.OK)
        .send(req.user);
});

router.get('/bids', isLoggedIn, (req, res) => {
    res
        .status(StatusCodes.OK)
        .send('Return all bids of the logged in user');
});


router.get('/register', (req, res) => {
    res
        .status(StatusCodes.OK)
        .send('Return register page for a user to register');
});

router.get('/login', (req, res) => {
    res
        .status(StatusCodes.OK)
        .send('Return user login page page');
});

module.exports = router;