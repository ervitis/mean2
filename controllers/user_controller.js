'use strict';

const User = require('../models/user');
const bcrypt = require('bcrypt-nodejs');

function save(req, res) {
    const user = new User({
        name: req.params.name,
        surname: req.params.surname,
        email: req.params.email,
        role: req.params.role,
        image: req.params.image
    });

    res.status(200).send({user: user})
}

module.exports = {
    save
};