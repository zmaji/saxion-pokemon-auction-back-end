let cards = require('../data/pokemon-cards');
let bids = require('../data/bids');
const {StatusCodes} = require("http-status-codes");
const baseCard = {
    cardID: null,
    userID: null,
    name: null,
    startingAmount: null,
    image: null,
    availabilityDate: null,
    cardType: null,
    rarity: null,
    element: null,
    weakness: null,
    resistance: null,
    bids: []
}

exports.getCards = (req) => {
    let filters = req;

    return cards.filter(card => {
        let isValid = true;
        for (let key in filters) {
            if (card[key] && filters[key]) {
                isValid = isValid && card[key].toLowerCase() === filters[key].toLowerCase();
            }
        }
        return isValid;
    });
};

exports.getCard = (req) => {
    const result = cards.find((card) => {
        return card.cardID === parseInt(req.cardID);
    });

    if (result) {
        result.bids = bids.filter(bid => bid.cardID === result.cardID);
        return result;
    } else {
        return null;
    }
};

exports.saveCard = (body, files) => {
    let image = files.image;
    image.name =  Date.now() + image.name;
    image.mv('./public/uploads/' + image.name);

    let newPokemonCard = {};
    newPokemonCard.cardID = cards.length + 1;

    for (let key in body) {
        if (key !== "cardID" || key !== "bids") {
            if (key === "userID" || key === "startingAmount") {
                if (baseCard.hasOwnProperty(key)) {
                    newPokemonCard[key] = parseInt(body[key]);
                }
            } else {
                if (baseCard.hasOwnProperty(key)) {
                    newPokemonCard[key] = body[key];
                }
            }
        }
    }

    if (image) {
        newPokemonCard.image = image.name;
    }

    cards.push(newPokemonCard);
    return newPokemonCard;
};

exports.updateCard = (params, body, files) => {
    let result = cards.find(card => card.cardID === parseInt(params.cardID))
    console.log(body)

    if (result) {
        for (let key in body) {
            if (key !== "cardID" || key !== "bids") {
                if (result.hasOwnProperty(key)) result[key] = body[key];
            }
        }

        if (files) {
            let image = files.image;
            image.name =  Date.now() + image.name;
            image.mv('./public/uploads/' + image.name);

            result.image = image.name;

        } else {
            return false;
        }


        return result;
    } else {
        return null;
    }
    return false;
};

exports.deleteCard = (params) => {
    let index = cards.findIndex((card => card.cardID === parseInt(params.cardID)));
    if (index !== -1) {
        cards.splice(index, 1);
        return true;
    }

    return false
};