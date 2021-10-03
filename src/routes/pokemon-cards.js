const express = require('express');
const pokemonCardController = require('../controllers/pokemon-cards');

const router = express.Router();

// Middleware
const isLoggedIn = require('../middleware/is-logged-in');
const isAdmin = require('../middleware/is-admin');

router.get('', pokemonCardController.getCards);

router.get('/:cardID', pokemonCardController.getCard);

router.post('', isLoggedIn, isAdmin, pokemonCardController.saveCard);

router.put('/:cardID', isLoggedIn, isAdmin, pokemonCardController.updateCard);

router.delete('/:cardID', isLoggedIn, isAdmin, pokemonCardController.deleteCard);

module.exports = router;