const {StatusCodes} = require("http-status-codes");
const users = require("../data/users");
const cards = require("../data/pokemon-cards");
const bids = require("../data/bids");
const bcrypt = require("bcrypt");
const {v4:uuidv4} = require('uuid');
const requiredUserFields = ["firstName", "lastName", "avatar", "email", "password", "city", "address", "zipCode"];
const baseUser = {
    userID: null,
    firstName: null,
    lastName: null,
    avatar: null,
    email: null,
    password: null,
    secret: null,
    city: null,
    address: null,
    zipCode: null,
    roles: []
}

exports.getUsers = (req, res) => {
    res
        .status(StatusCodes.OK)
        .send(users);
};

exports.getUser = (req, res) => {
    const result = users.find((user) => {
        return user.userID === parseInt(req.params.userID);
    });

    res
        .status(StatusCodes.OK)
        .send(result);
};

exports.getUserBids = (req, res) => {
    const result = cards.filter(card => card.userID === parseInt(req.params.userID));
    const userBids = bids.filter(bid => bid.userID === parseInt(req.params.userID));


    for (let card of result) {
        card.bids = userBids.filter(bid => bid.cardID === card.cardID);
    }

    res
        .status(StatusCodes.OK)
        .send(userBids);
};

exports.saveUser = (body, files) => {
    let isValid = true;
    let newUser = {};
    for (let key of requiredUserFields) {
        if (isValid) {
            if (key !== "avatar") {
                if (body.hasOwnProperty(key) ) {
                    isValid = body[key].length > 0;
                } else {
                    isValid = false;
                    break;
                }
            }
        }
    }

    if (isValid) {
        newUser.userID = users.length +1;
        let image = files.avatar;
        image.name =  Date.now() + image.name;
        image.mv('./public/uploads/' + image.name);
        newUser.avatar = image.name;

        for (let key in body) {
            if (key !== "userID" || key !== "roles" || key !== "password" || key !== "avatar") {
                if (baseUser.hasOwnProperty(key)) {
                    newUser[key] = body[key];
                }
            }
        }

        newUser.password = bcrypt.hashSync(body.password, 12);
        newUser.secret = uuidv4();
        newUser.roles = ['user'];

        users.push(newUser);
        return newUser;
    } else {
        return false;
    }

};




//     let isValid = true;
//
//     for (let key in requiredUserFields) {
//         if (isValid) {
//             if (req.body.hasOwnProperty(requiredUserFields[key])) {
//                 isValid = req.body[requiredUserFields[key]].length > 0;
//             } else {
//                 isValid = false;
//             }
//         } else {
//             break;
//         }
//     }
//
//     if (isValid) {
//         let newUserId = users[users.length - 1].userID + 1;
//         let body = JSON.parse(JSON.stringify({
//             userID: newUserId,
//             firstName: req.body.firstName,
//             lastName: req.body.lastName,
//             avatar: req.body.avatar,
//             email: req.body.email,
//             password: req.body.password,
//             city: req.body.city,
//             address: req.body.address,
//             zipcode: req.body.zipcode,
//         }))
//         users.push(body);
//         return body;
//     }
// };
