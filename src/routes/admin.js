const express = require('express');
const { StatusCodes} = require('http-status-codes');

const router = express.Router();

router.get('', (req, res) => {
    res.send('Return admin page');
});

router.get('/users', (req, res) => {
    res.send('Return all users');
});


router.get('/users/:userID', (req, res) => {
    res.send('Return one user based on userID');
});

module.exports = router;