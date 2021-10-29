let cards = require('../data/pokemon-cards');
let users = require('../data/users');
let bids = require('../data/bids');
const {StatusCodes} = require("http-status-codes");
const jwt = require('jsonwebtoken');

exports.getBids = (params) => {
    const card = cards.find((card) => {
        return card.cardID === parseInt(params.cardID);
    });

    if (card) {
        return bids.filter((bid) => {
            return bid.cardID === card.cardID;
        })

    } else {
        return false
    }
};

exports.getBid = (params) => {

    const card = cards.find((card) => {
        return card.cardID === parseInt(params.cardID);
    });

    if (card) {
        const bid = bids.find((bid) => {
            return bid.bidID === parseInt(params.bidID);
        });

        if (bid && card.cardID === bid.cardID) {
            return bid;
        }
    } else {
        return false;
    }
};

exports.postBid = (body, headers, params) => {
    const {bidPrice} = body;
    const tokenPayload = jwt.decode(headers['authorization'].split(' ')[1]);
    const bidOwner = users.find(user => user.email === tokenPayload.email);
    const card = cards.find((card) => {
        return card.cardID === parseInt(params.cardID);
    });

    if (card) {
        const wonBids = bids.filter((bid) => {
            let isValid = true;
            isValid = bid.cardID === card.cardID && bid.hasWon === true;

            return isValid;
        });

        if (wonBids.length === 0) {
            const result = bids.filter((bid) => {
                return bid.cardID === card.cardID && bid.bidPrice >= bidPrice;
            });

            if (result.length === 0) {
                let bid = {
                    bidID: bids.length+1,
                    cardID: parseInt(params.cardID),
                    userID: bidOwner.userID,
                    ownerName: bidOwner.firstName + ' ' + bidOwner.lastName,
                    bidPrice: parseInt(bidPrice),
                    hasWon: false
                }

                bids.push(bid);

                return bid;
            } else if (result.length > 0) {
                return 0;
            }
        } else {
            return 1;
        }
    } else {
        return false;
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

exports.makeWinningBid = (params) => {
    const card = cards.find((card) => {
        return card.cardID === parseInt(params.cardID);
    });

    if (card) {
        const bid = bids.find((bid) => {
            return bid.bidID === parseInt(params.bidID);
        });
        if (bid && card.cardID === bid.cardID) {
            const wonBids = bids.filter((bid) => {
                let isValid = true;
                isValid = bid.cardID === card.cardID && bid.hasWon === true;

                return isValid;
            });

            if (wonBids.length === 0) {
                bid.hasWon = true;
                return true;
            }
        }
    }

    return false;
};