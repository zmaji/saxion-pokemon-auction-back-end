const express = require('express');
const { StatusCodes} = require('http-status-codes');

const router = express.Router();

router.get('', (req, res) => {
    // res.send('Return a list of cards');
    res.render('test')
});

router.get('/:cardID', (req, res) => {
    res.send('Return a one card');
});

router.post('', (req, res) => {
   res
       .status(StatusCodes.CREATED)
       .send('Create a card here');
});

router.put('', (req, res) => {
    res
        .status(StatusCodes.OK)
        .send('Update a card here');
});

router.delete('', (req, res) => {
    res
        .status(StatusCodes.NO_CONTENT)
        .send('Create a card here');
});

module.exports = router;