let cards = require('../data/pokemon-cards');
let bids = require('../data/bids');
const {StatusCodes} = require("http-status-codes");
const helper = require('../helper')

exports.getCards = (req, res) => {
    let filters = req.query;

    const result = cards.filter(card => {
        let isValid = true;
        for (let key in filters) {
            if (card[key] && filters[key]) {
                isValid = isValid && card[key].toLowerCase() === filters[key].toLowerCase();
            }
        }
        return isValid;
    });

    res
        .status(StatusCodes.OK)
        .send(result);
};

exports.getCard = (req, res) => {
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
};

exports.saveCard = (req, res) => {
    let {userID, name, startingAmount, imageURL, availabilityDate, cardType, rarity, element, weakness, resistance } = req.body;

    if ([userID, startingAmount].every(helper.isNumber)) {
        console.log('theyre numbers')
    }

    if ([name, imageURL, availabilityDate, cardType, rarity, element, weakness, resistance].every(helper.isString)) {
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
};

exports.updateCard = (req, res) => {
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
};

exports.deleteCard = (req, res) => {
    let index = cards.findIndex((card => card.cardID === parseInt(req.params.cardID)));
    if (index) {
        cards.splice(index, 1);
    }

    res
        .status(StatusCodes.NO_CONTENT)
        .send(StatusCodes.NO_CONTENT);
};