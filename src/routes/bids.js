const express = require("express");
const {StatusCodes} = require("http-status-codes");

const cards = require("../data/pokemon-cards");
const bids = require("../data/bids");

const router = express.Router();

router.get('/:cardID/bids', (req, res) => {
    const card = cards.find((card) => {
       return card.cardID === parseInt(req.params.cardID);
    });

    if (card) {
        const result = bids.filter((bid) => {
           return bid.cardID === card.cardID;
        });

        res
            .status(StatusCodes.OK)
            .send(result);
    } else {
        res
            .status(StatusCodes.NOT_FOUND)
            .send(StatusCodes.NOT_FOUND);
    }
});

router.post('/:cardID/bids', (req, res) => {
    let {userID, bidPrice} = req.body;

    const card = cards.find((card) => {
        return card.cardID === parseInt(req.params.cardID);
    });

    if (card) {
        let bid = {
            bidID: bids.length+1,
            cardID: parseInt(req.params.cardID),
            userID: userID,
            bidPrice: bidPrice,
            chosen: false
        }

        bids.push(bid);

        res
            .status(StatusCodes.CREATED)
            .send(bid)
    } else {
        res
            .status(StatusCodes.NOT_FOUND)
            .send('No card found to place bid on!');
    }
});

module.exports = router;