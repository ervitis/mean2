'use strict';

const mongoose = require('mongoose');
const app = require('./app');
const port = process.env.PORT || 3000;
const propertiesConnections = {
    reconnectTries: 60,
    reconnectInterval: 60000
};
const mongodbHost = '127.0.0.1';
const mongodbPort = 27017;
const mongodbCollection = 'mean2';
const mongodbConnectionURL = mongodbHost + ':' + mongodbPort + '/' + mongodbCollection;

mongoose.connect('mongodb://' + mongodbConnectionURL, (err, res) => {
    if (err) throw err;

    console.log('Connected to ' + mongodbConnectionURL);

    app.listen(port, () => {
        console.log('Server listening')
    })
});