const express = require('express');

const userController = require('../controllers/users');

const isLoggedIn = require("../middleware/is-logged-in");
const isAdmin = require("../middleware/is-admin")
const {StatusCodes} = require("http-status-codes");

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

router.post('',(req, res) => {
    let result = userController.saveUser(req.body);

    console.log(result)

    if (result) {
        res
            .sendStatus(StatusCodes.CREATED);
    } else {
        res
            .status(StatusCodes.BAD_REQUEST)
            .send("Fields we're not filled properly");
    }
});

module.exports = router;