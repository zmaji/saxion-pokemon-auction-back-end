const express = require('express');

const userController = require('../controllers/users');

const isLoggedIn = require("../middleware/is-logged-in");
const isAdmin = require("../middleware/is-admin")
const {StatusCodes} = require("http-status-codes");

const router = express.Router();

router.get('', isLoggedIn, isAdmin, (req, res) => {
    let result = userController.getUsers();

    res
        .status(StatusCodes.OK)
        .send(result);
});

router.get('/:userID', isLoggedIn, isAdmin, (req, res) => {
    let result = userController.getUser(req.params);

    if (result) {
        res
            .status(StatusCodes.OK)
            .send(result);
    } else {
        res
            .status(StatusCodes.NOT_FOUND)
            .send("Unable to find user");
    }
});

router.get('/:userID/bids', isLoggedIn, (req, res) => {
    let result = userController.getUserBids(req.params);

    if (result) {
        res
            .status(StatusCodes.OK)
            .send(result);
    } else {
        res
            .status(StatusCodes.NOT_FOUND)
            .send("Unable to find user");
    }
});

router.post('',(req, res) => {
    let result = userController.saveUser(req.body, req.files);

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