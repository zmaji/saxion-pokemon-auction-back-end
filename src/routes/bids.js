const express = require("express");
const bidController = require('../controllers/bids')

const isLoggedIn = require("../middleware/is-logged-in");
const isAdmin = require("../middleware/is-admin");
const {StatusCodes} = require("http-status-codes");

const router = express.Router();

router.get('/:cardID/bids', (req, res) => {
    let result = bidController.getBids(req.params)

    if (result) {
        res
            .status(StatusCodes.OK)
            .send(result);
    } else {
        res
            .status(StatusCodes.NOT_FOUND)
            .send("No bids have been found for this card!");
    }
});


router.get('/:cardID/bids/:bidID', (req, res) => {
    let result = bidController.getBid(req.params);

    if (result) {
        res
            .status(StatusCodes.OK)
            .send(result);
    } else {
        res
            .status(StatusCodes.NOT_FOUND)
            .send("This bid does not exist!");
    }
});

router.post('/:cardID/bids', isLoggedIn, (req, res) => {
    let result = bidController.postBid(req.body, req.headers, req.params);

    if (result.cardID) {
        res
            .status(StatusCodes.CREATED)
            .send(result);
    } else if (result === 0) {
        res
            .status(StatusCodes.NOT_ACCEPTABLE)
            .send("Bid price should be higher than current highest bid");
    } else if (result === 1) {
        res
            .status(StatusCodes.BAD_REQUEST)
            .send("The auction has been closed");
    } else {
        res
            .status(StatusCodes.NOT_FOUND)
            .send('No card found to place bid on!');
    }
});

router.delete('/:cardID/bids/:bidID', isLoggedIn, isAdmin, (req, res) => {
    let result = bidController.deleteBid(req.params);

    if (result) {
        res
            .sendStatus(StatusCodes.NO_CONTENT);
    } else {
        res
            .sendStatus(StatusCodes.NOT_FOUND);
    }
});

router.post('/:cardID/bids/:bidID', isLoggedIn, isAdmin, (req, res) => {
    let result = bidController.makeWinningBid(req.params);

    if (result) {
        res
            .sendStatus(StatusCodes.OK);
    } else {
        res
            .sendStatus(StatusCodes.NOT_FOUND);
    }
});



module.exports = router;