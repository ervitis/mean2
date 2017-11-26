'use strict';

const mongoose = require('mongoose');
const app = require('./app');
const port = process.env.PORT || 3000;
const propertiesConnections = {
    reconnectTries: 60,
    reconnectInterval: 60000
};

mongoose.createConnection('mongodb://127.0.0.1:32512/mean2', propertiesConnections, (err, res) => {
   if (err) {
       throw err;
   } else {
       console.log("connected");

       app.listen(port, () => {
           console.log("running in http://localhost:" + port)
       })
   }
});