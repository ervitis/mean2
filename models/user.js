'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = Schema({
    name: String,
    surname: String,
    email: String,
    password: String,
    rol: String,
    image: String
});

module.exports = mongoose.model('User', UserSchema);