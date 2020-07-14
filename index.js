/* eslint-disable no-console */
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const locationService = require('./location-service/index');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());
app.use('/geo', locationService());

app.listen(PORT, () => console.log(`listening at http://localhost:${PORT}`));
