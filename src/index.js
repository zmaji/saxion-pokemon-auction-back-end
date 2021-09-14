const express = require('express');
const port = 3000;
const { StatusCodes} = require('http-status-codes');
let cardData = require('./data/pokemon-cards-data');
let userData = require('./data/users-data');

const app = express();
const bodyParser = require("body-parser");
const path = require("path");

app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(bodyParser.json());
app.use(require('./middleware/log-time'));

app.get('', (req, res) => {
    res
        .status(StatusCodes.OK)
        .send(userData);
});

// Pokemon card base route
app.use('/pokemon-cards', require('./routes/pokemon-cards'));

// Account base route
// app.use('/account', require('./routes/account'));

// Admin base route
app.use('/admin', require('./routes/admin'));

app.listen(port, () => {
    console.log(`Server runnning on port ${port}`);
});
