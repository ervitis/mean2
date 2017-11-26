'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const UserSchema = Schema({
    name: {type: String, required: true},
    surname: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    rol: {type: String, required: true},
    image: {type: String, required: true}
});

UserSchema.pre('save', (next) => {
    bcrypt.hash(this.password, null, null, (err, hash) => {
        this.password = hash;
    });

    next()
});

module.exports = mongoose.model('User', UserSchema);
