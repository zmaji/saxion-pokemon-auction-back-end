const express = require('express');
const port = 3000;
const { StatusCodes} = require('http-status-codes');
let cards = require('./data/pokemon-cards');
let users = require('./data/users');
const app = express();

const bodyParser = require("body-parser");
const fileUpload = require('express-fileupload');

app.use(fileUpload({
    createParentPath: true
}));

app.use(express.urlencoded({
    extended: true
}))

app.use(express.static('public'));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

app.use(express.json());
app.use(bodyParser.json());
app.use(require('./middleware/log-time'));

app.get('', (req, res) => {
    for (let user of users) {
        user.cards = cards.find((card) => {
            return card.userID === user.userID;
        });
    }
    res
        .status(StatusCodes.OK)
        .send(users);
});

// Pokemon card base route
app.use('/credentials', require('./routes/credentials'));
app.use('/pokemon-cards', require('./routes/pokemon-cards'));
app.use('/pokemon-cards', require('./routes/bids'));

// users base route
app.use('/users', require('./routes/users'));

// Admin base route

app.listen(port, () => {
    console.log(`Server runnning on port ${port}`);
});
