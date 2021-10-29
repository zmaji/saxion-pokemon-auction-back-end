const users = require("../data/users");
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

exports.getUsers = () => {
    return users;
};

exports.getUser = (params) => {
    const user = users.find((user) => {
        return user.userID === parseInt(params.userID);
    });

    if (user) {
        return user;
    }

    return false
};

exports.getUserBids = (params) => {
    const user = users.find((user) => {
        return user.userID === parseInt(params.userID);
    });
    if (user) {
        return bids.filter(bid => bid.userID === parseInt(params.userID));
    }

    return false;
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