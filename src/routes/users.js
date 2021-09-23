const express = require('express');
const { StatusCodes} = require('http-status-codes');
const isLoggedIn = require('../middleware/is-logged-in');
const users = require("../data/users");
const cards = require("../data/pokemon-cards");
const bids = require("../data/bids");


const router = express.Router();

router.get('', (req, res) => {
    res
        .status(StatusCodes.OK)
        .send(users);
});

router.get('/:userID', (req, res) => {
    const result = users.find((user) => {
        return user.userID === parseInt(req.params.userID);
    });

    res
        .status(StatusCodes.OK)
        .send(result);
});

router.get('/:userID/cards', (req, res) => {
    const result = cards.filter(card => card.userID === parseInt(req.params.userID));

    res
        .status(StatusCodes.OK)
        .send(result);
});


router.get('/:userID/bids', (req, res) => {
    const result = cards.filter(card => card.userID === parseInt(req.params.userID));
    const userBids = bids.filter(bid => bid.userID === parseInt(req.params.userID));

    for (let card of result) {
        card.bids = userBids.filter(bid => bid.cardID === card.cardID);
    }

    res
        .status(StatusCodes.OK)
        .send(result);
});

module.exports = router;