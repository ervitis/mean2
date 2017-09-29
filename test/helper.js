'use strict';

const mongoose = require('mongoose');

before((done) => {
    mongoose.createConnection('mongodb://127.0.0.1:32512/testing');

    mongoose.connection
        .on('open', () => done())
        .on('error', (err) => {
            console.error(err)
        });

    done();
});

after('close', () => {
    mongoose.connection.on('close', () => {
        mongoose.connection.db.dropDatabase();
    });
});
