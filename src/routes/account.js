const express = require('express');
const { StatusCodes} = require('http-status-codes');

const router = express.Router();

router.get('', (req, res) => {
    res.send('Return user account page'); // Check if user is logged in or not
});

router.get('/register', (req, res) => {
    res.send('Return register page for a user to register');
});

router.get('/login', (req, res) => {
    res.send('Return user login page page');
});