const express = require('express');
const { StatusCodes} = require('http-status-codes');
let cards = require('../data/pokemon-cards-data');

const router = express.Router();
const {forwardAuthenticated, forwardUnAuthenticated} = require('../middleware/auth');
const isLoggedIn = require('../middleware/is-logged-in')
const users = require("../data/users-data");

router.get('', (req, res) => {
    let { name, rarity } = req.query;
    let result = cards;

    if (name) {
        result = result.filter(card => card.name === name);
    }

    if (rarity) {
        result = result.filter(card => card.rarity === rarity);
    }

    res
        .status(StatusCodes.OK)
        .send(result);
});

router.get('/:cardID', (req, res) => {
    const result = cards.find((card) => {
        return card.cardID === parseInt(req.params.cardID);
    });

    res
        .status(StatusCodes.OK) // Add check if an object has been found or not
        .send(result);
});

router.post('', (req, res) => {
    let {userID, name, startingAmount, imageURL, availabilityDate, cardType, rarity, element, weakness, resistance } = req.body;

    let pokemonCard = {
        cardID: cards.length + 1,
        userID: parseInt(userID),
        name: name,
        startingAmount: parseInt(startingAmount),
        imageURL: imageURL,
        availabilityDate: availabilityDate,
        cardType: cardType,
        rarity: rarity,
        element: element,
        weakness: weakness,
        resistance: resistance,
        bids: []
    };

    cards.push(pokemonCard);

   res
       .status(StatusCodes.CREATED)
       .send(pokemonCard);
});

router.put('/:cardID', (req, res) => {
    let index = cards.findIndex((card => card.cardID === parseInt(req.params.cardID)));
    let {userID, name, startingAmount, imageURL, availabilityDate, cardType, rarity, element, weakness, resistance } = req.body;

    if (index) {
        cards[index].cardID = parseInt(req.params.cardID);
        cards[index].userID = parseInt(userID);
        cards[index].name = name;
        cards[index].startingAmount = parseInt(startingAmount);
        cards[index].imageURL = imageURL;
        cards[index].availabilityDate = availabilityDate;
        cards[index].cardType = cardType;
        cards[index].rarity = rarity;
        cards[index].element = element;
        cards[index].weakness = weakness;
        cards[index].resistance = resistance;
        cards[index].bids = [];
    }

    res
        .status(StatusCodes.OK)
        .send(cards[index]);
});

router.delete('/:cardID', (req, res) => {
    let index = cards.findIndex((card => card.cardID === parseInt(req.params.cardID)));
    if (index) {
        cards.splice(index, 1);
    }

    res
        .status(StatusCodes.NO_CONTENT)
        .send(StatusCodes.NO_CONTENT);
});

module.exports = router;