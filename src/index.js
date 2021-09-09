const express = require('express');
const port = 3000;
let data = require('./data/cards');

const app = express();
const bodyParser = require("body-parser");

app.use(express.json());
app.use(bodyParser.json());

app.use('/cards', require('./routes/cards'));

app.get('', (req, res) => {
    // res.send('Return a list of cards');
    res.send(data);
});
app.listen(port, () => {
    console.log(`Server runnning on port ${port}`);
});
