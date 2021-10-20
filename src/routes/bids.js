const express = require("express");
const bidRouter = require('../controllers/bids')

const isLoggedIn = require("../middleware/is-logged-in");
const isAdmin = require("../middleware/is-admin");

const router = express.Router();

router.get('/:cardID/bids', bidRouter.getBids);

router.get('/:cardID/bids/:bidID', bidRouter.getBid);

router.post('/:cardID/bids', isLoggedIn, bidRouter.postBid);

router.delete('/:cardID/bids/:bidID', isLoggedIn, isAdmin, (req, res) => {
    let result = bidRouter.deleteBid(req.params);

    if (result) {
        res
            .sendStatus(StatusCodes.NO_CONTENT);
    } else {
        res
            .sendStatus(StatusCodes.NOT_FOUND);
    }
});


module.exports = router;