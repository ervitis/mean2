'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const Routes = require('./routes/user_route');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/api', Routes);

app.use((err, req, res, next) => {
    res.status(400).json(err);
});

module.exports = app;