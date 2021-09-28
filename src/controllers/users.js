const {StatusCodes} = require("http-status-codes");
const users = require("../data/users");
const cards = require("../data/pokemon-cards");
const bids = require("../data/bids");

exports.getUsers = (req, res) => {
    res
        .status(StatusCodes.OK)
        .send(users);
};

exports.getUser = (req, res) => {
    const result = users.find((user) => {
        return user.userID === parseInt(req.params.userID);
    });

    res
        .status(StatusCodes.OK)
        .send(result);
};

exports.getUserBids = (req, res) => {
    const result = cards.filter(card => card.userID === parseInt(req.params.userID));
    const userBids = bids.filter(bid => bid.userID === parseInt(req.params.userID));

    for (let card of result) {
        card.bids = userBids.filter(bid => bid.cardID === card.cardID);
    }

    res
        .status(StatusCodes.OK)
        .send(result);
};