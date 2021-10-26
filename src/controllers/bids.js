let cards = require('../data/pokemon-cards');
let users = require('../data/users');
let bids = require('../data/bids');
const {StatusCodes} = require("http-status-codes");
const jwt = require('jsonwebtoken');

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

exports.getBid = (req, res) => {
    const card = cards.find((card) => {
        return card.cardID === parseInt(req.params.cardID);
    });

    if (card) {
        const bid = bids.find((bid) => {
            return bid.bidID === parseInt(req.params.bidID);
        });

        res
            .status(StatusCodes.OK)
            .send(bid);
    } else {
        res
            .status(StatusCodes.NOT_FOUND)
            .send("This bid does not exist!");
    }
};

exports.postBid = (req, res) => {
    const {bidPrice} = req.body;
    const tokenPayload = jwt.decode(req.headers['authorization'].split(' ')[1]);
    const bidOwner = users.find(user => user.email === tokenPayload.email);
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
                userID: bidOwner.userID,
                ownerName: bidOwner.firstName + ' ' + bidOwner.lastName,
                bidPrice: parseInt(bidPrice),
                hasWon: false
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

exports.deleteBid = (params) => {
    let bidIndex = bids.findIndex((bid => bid.bidID === parseInt(params.bidID)));

    if (bidIndex !== -1) {
        bids.splice(bidIndex, 1);
        return true;
    }
    return false;
};