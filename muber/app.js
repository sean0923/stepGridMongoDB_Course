const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes/routes');
const app = express();

mongoose.connect('mongodb://localhost/muber_driver')


app.use(bodyParser.json());

routes(app);

module.exports = app;
