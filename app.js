'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const UserRoute = require('./routes/user_route');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/api', UserRoute);

app.use((err, req, res, next) => {
    res.status(400).json(err);
});

app.get('/pruebas', (req, res) => {
    res.status(200).send({message: 'Welcome'})
});

module.exports = app;