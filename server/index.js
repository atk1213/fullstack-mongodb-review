const express = require('express');
const bodyParser = require('body-parser');
const router = require('./router.js');
const path = require('path');

const app = express();

const port = 3000;

// add middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static(path.join(__dirname, '../client/dist')));
app.use('/api', router);


app.listen(port, () => console.log(`Listening on port ${port}`));
