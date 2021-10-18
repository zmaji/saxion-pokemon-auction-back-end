const express = require('express');
const pokemonCardController = require('../controllers/pokemon-cards');

const router = express.Router();

// Middleware
const isLoggedIn = require('../middleware/is-logged-in');
const isAdmin = require('../middleware/is-admin');
const {StatusCodes} = require("http-status-codes");

router.get('',(req, res) => {
    let result = pokemonCardController.getCards(req.query);
    res
        .status(StatusCodes.OK)
        .send(result);
});

router.get('/:cardID', (req, res) => {
    let result = pokemonCardController.getCard(req.params);

    if (result) {
        res
            .status(StatusCodes.OK)
            .send(result);
    } else {
        res
            .status(StatusCodes.NOT_FOUND)
            .send(StatusCodes.NOT_FOUND);
    }
});

router.post('', isLoggedIn, isAdmin, (req, res) => {
    let result = pokemonCardController.saveCard(req.body, req.files);

    if (result) {
        res
            .status(StatusCodes.CREATED)
            .send(result);
    } else {
        res
            .status(StatusCodes.BAD_REQUEST)
            .send("Fields were not filled properly");
    }
});

router.put('/:cardID', (req, res) => {
    let result = pokemonCardController.updateCard(req.params, req.body, req.files);

    if (result) {
        res
            .status(StatusCodes.OK)
            .send(result);
    } else {
        res
            .status(StatusCodes.NOT_FOUND)
            .send(StatusCodes.NOT_FOUND);
    }
});

router.delete('/:cardID', isLoggedIn, isAdmin, pokemonCardController.deleteCard);

module.exports = router;