const express = require('express');
const port = 3000;
let cardData = require('./data/pokemonCardsData');
let userData = require('./data/usersData');

const app = express();
const bodyParser = require("body-parser");

app.use(express.json());
app.use(bodyParser.json());

app.use('/pokemon-cards', require('./routes/pokemonCards'));

app.use('/admin', require('./routes/admin'));

app.get('', (req, res) => {
    // res.send('Return a list of cards');
    res.send(userData);
});
app.listen(port, () => {
    console.log(`Server runnning on port ${port}`);
});
