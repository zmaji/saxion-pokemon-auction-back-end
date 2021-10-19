let cards = require('../data/pokemon-cards');
let users = require('../data/users');
let bids = require('../data/bids');
const {StatusCodes} = require("http-status-codes");

exports.getBids = (req, res) => {
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
            .send("No bids have been found for this card!");
    }
};

exports.postBid = (req, res) => {
    let {userID, bidPrice} = req.body;
    let bidOwner = users.find(user => user.userID === parseInt(userID));
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
                ownerName: bidOwner.firstName + ' ' + bidOwner.lastName,
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
};

exports.deleteBid = (req, res) => {
    let bidIndex = bids.findIndex((bid => bid.bidID === parseInt(req.params.bidID)));

    if (bidIndex) {
        cards.splice(bidIndex, 1);
    }

    res
        .status(StatusCodes.NO_CONTENT)
        .send(StatusCodes.NO_CONTENT);
};