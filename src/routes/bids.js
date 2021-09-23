const express = require("express");
const {StatusCodes} = require("http-status-codes");

const cards = require("../data/pokemon-cards");
const bids = require("../data/bids");

const isLoggedIn = require("../middleware/is-logged-in");

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

router.post('/:cardID/bids', isLoggedIn, (req, res) => {
    let {userID, bidPrice} = req.body;

    const card = cards.find((card) => {
        return card.cardID === parseInt(req.params.cardID);
    });

    if (card) {

        const result = bids.filter((bid) => {
            return bid.cardID === card.cardID && bid.bidPrice >= bidPrice;
        });

        if (result.length === 0) {
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
                .send(bid);
        } else if (result.length > 0) {
            res
                .status(StatusCodes.NOT_ACCEPTABLE)
                .send("Bid price should be higher than current highest bid");
        }
    } else {
        res
            .status(StatusCodes.NOT_FOUND)
            .send('No card found to place bid on!');
    }
});

router.delete('/:cardID/bids/:bidID', isLoggedIn, (req, res) => {
    let bidIndex = bids.findIndex((bid => bid.bidID === parseInt(req.params.bidID)));

    if (bidIndex) {
        cards.splice(bidIndex, 1);
    }

    res
        .status(StatusCodes.NO_CONTENT)
        .send(StatusCodes.NO_CONTENT);
});


module.exports = router;