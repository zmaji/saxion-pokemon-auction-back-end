const express = require('express');
const port = 3000;

const app = express();

app.use(express.json());

app.use('/cards', require('./routes/cards'));

app.listen(port, () => {
    console.log(`Server runnning on port ${port}`);
});

