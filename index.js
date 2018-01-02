'use strict';

const mongoose = require('mongoose');
const app = require('./app');
const port = process.env.PORT || 3000;
const propertiesConnections = {
    reconnectTries: 60,
    reconnectInterval: 60000
};
const mongodbHost = '127.0.0.1';
const mongodbPort = 32512;
const mongodbCollection = 'mean2';
const mongodbConnectionURL = mongodbHost + ':' + mongodbPort + '/' + mongodbCollection;

mongoose.createConnection('mongodb://' + mongodbConnectionURL, propertiesConnections, (err, res) => {
   if (err) {
       throw err;
   } else {
       console.log("connected to " + mongodbConnectionURL);

       app.listen(port, () => {
           console.log("running in http://localhost:" + port)
       })
   }
});