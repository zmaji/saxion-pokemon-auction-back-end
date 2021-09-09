const express = require('express');
const port = 3000;
let cardData = require('./data/pokemonCardsData');
let userData = require('./data/usersData');

const app = express();
const bodyParser = require("body-parser");

app.use(express.json());
app.use(bodyParser.json());

app.get('', (req, res) => {
    // res.send('Return a list of cards');
    res.send(userData);
});

// Pokemon card base route
app.use('/pokemon-cards', require('./routes/pokemonCards'));

// Account base route
// app.use('/account', require('./routes/account'));

// Admin base route
app.use('/admin', require('./routes/admin'));

app.listen(port, () => {
    console.log(`Server runnning on port ${port}`);
});
