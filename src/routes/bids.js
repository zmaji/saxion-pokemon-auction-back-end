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


router.get('/:cardID/bids/:bidID', bidController.getBid);

router.post('/:cardID/bids', isLoggedIn, bidController.postBid);

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


module.exports = router;