const express = require('express');
const { StatusCodes } = require('http-status-codes');
let cards = require('../data/pokemon-cards');
let bids = require('../data/bids');

const isString = (currentValue) => currentValue.type = String;
const isNumber = (currentValue) => currentValue.type = Number;

const router = express.Router();
const {forwardAuthenticated, forwardUnAuthenticated } = require('../middleware/auth');
const isLoggedIn = require('../middleware/is-logged-in');
const isAdmin = require('../middleware/is-admin');

router.get('', (req, res) => {
    let filters = req.query;

    const result = cards.filter(card => {
        let isValid = true;
        for (let key in filters) {
            isValid = isValid && card[key] === filters[key];
        }
        return isValid;
    });

    res
        .status(StatusCodes.OK)
        .send(result);
});

router.get('/:cardID', (req, res) => {
    const result = cards.find((card) => {
        return card.cardID === parseInt(req.params.cardID);
    });

    result.bids = bids.filter(bid => bid.cardID === result.cardID);


    if (result) {
        res
            .status(StatusCodes.OK) // Add check if an object has been found or not
            .send(result);
    } else {
        res
            .status(StatusCodes.NOT_FOUND)
            .send(StatusCodes.NOT_FOUND);
    }

});

router.post('/', isLoggedIn, isAdmin, (req, res) => {
    let {userID, name, startingAmount, imageURL, availabilityDate, cardType, rarity, element, weakness, resistance } = req.body;

    if ([userID, startingAmount].every(isNumber)) {
        console.log('theyre numbers')
    }

    if ([name, imageURL, availabilityDate, cardType, rarity, element, weakness, resistance].every(isString)) {
        console.log('theyre strings')
    }

    let pokemonCard = {
        cardID: cards.length + 1,
        userID: userID,
        name: name,
        startingAmount: startingAmount,
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

router.put('/:cardID', isLoggedIn, isAdmin, (req, res) => {
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

router.delete('/:cardID', isLoggedIn, isAdmin, (req, res) => {
    let index = cards.findIndex((card => card.cardID === parseInt(req.params.cardID)));
    if (index) {
        cards.splice(index, 1);
    }

    res
        .status(StatusCodes.NO_CONTENT)
        .send(StatusCodes.NO_CONTENT);
});

module.exports = router;