const express = require('express');
const { StatusCodes} = require('http-status-codes');
let cards = require('../data/pokemon-cards-data');

const router = express.Router();
const {forwardAuthenticated, forwardUnAuthenticated} = require('../middleware/auth');
const isLoggedIn = require('../middleware/is-logged-in')
const users = require("../data/users-data");

router.get('', (req, res) => {
    console.log(req.query);
    for (let queryKey in req.query) {
        console.log(queryKey)
    }
    // req.query
    let result = cards;



    res
        .status(StatusCodes.OK)
        .send(cards);
    // res.json(req.query)

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
    let result = cards.find((card) => {
        return card.cardID === parseInt(req.params.cardID);
    });

    let {userID, name, startingAmount, imageURL, availabilityDate, cardType, rarity, element, weakness, resistance } = req.body;

    result = {
        cardID: req.params.cardID,
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
    };

    res
        .status(StatusCodes.OK)
        .send(result);
});

router.delete('/:cardID', (req, res) => {
    res
        .status(StatusCodes.NO_CONTENT)
        .send('Create a card here');
});

module.exports = router;