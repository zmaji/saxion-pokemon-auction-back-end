const express = require('express');
const { StatusCodes} = require('http-status-codes');

const router = express.Router();

router.get('', (req, res) => {
    res
        .status(StatusCodes.OK)
        .send('Return admin page');
});

router.get('/users', (req, res) => {
    res
        .status(StatusCodes.OK)
        .send('Return all users');
});


router.get('/users/:userID', (req, res) => {
    res
        .status(StatusCodes.OK)
        .send('Return one user based on userID');
});

module.exports = router;