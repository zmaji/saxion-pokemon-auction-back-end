const express = require("express");
const bidRouter = require('../controllers/bids')

const isLoggedIn = require("../middleware/is-logged-in");

const router = express.Router();

router.get('/:cardID/bids', bidRouter.getBids);

router.post('/:cardID/bids', isLoggedIn, bidRouter.postBid);

router.delete('/:cardID/bids/:bidID', isLoggedIn, bidRouter.deleteBid);


module.exports = router;