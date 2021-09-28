const express = require('express');

const userController = require('../controllers/users');

const isLoggedIn = require("../middleware/is-logged-in");
const isAdmin = require("../middleware/is-admin")

const router = express.Router();

router.get('', isLoggedIn, isAdmin, userController.getUsers);

router.get('/:userID', isLoggedIn, isAdmin, userController.getUser);

// router.get('/:userID/cards', (req, res) => {
//     const result = cards.filter(card => card.userID === parseInt(req.params.userID));
//
//     res
//         .status(StatusCodes.OK)
//         .send(result);
// });


router.get('/:userID/bids', isLoggedIn, userController.getUserBids);

module.exports = router;