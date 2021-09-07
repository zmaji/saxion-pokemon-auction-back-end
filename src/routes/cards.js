const express = require('express');
const { StatusCodes} = require('http-status-codes');

const router = express.Router();

router.get('', (req, res) => {
    res.send('Return a list of cards');
});

router.get('/:cardID', (req, res) => {
    res.send('Return a one card');
});

router.post('', (req, res) => {
   res
       .status(StatusCodes.CREATED)
       .send('Create a card here');
});

module.exports = router;