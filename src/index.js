const express = require('express');
const port = 3000;
const { StatusCodes} = require('http-status-codes');
let cards = require('./data/pokemon-cards');
let users = require('./data/users');

const app = express();
const bodyParser = require("body-parser");
const path = require("path");

app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(bodyParser.json());
app.use(require('./middleware/log-time'));

app.get('', (req, res) => {
    for (let user of users) {
        user.pokemon = cards.find((card) => {
            return card.userID === user.userID;
        })
    }
    res
        .status(StatusCodes.OK)
        .send(users);
});

// Pokemon card base route
app.use('/pokemon-cards', require('./routes/pokemon-cards'));
app.use('/:cardID', require('./routes/bids'));

// Account base route
app.use('/account', require('./routes/account'));

// Admin base route

app.listen(port, () => {
    console.log(`Server runnning on port ${port}`);
});
