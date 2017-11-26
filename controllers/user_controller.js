'use strict';

const User = require('../models/user');

function save(req, res) {
    const user = new User({
        name: req.params.name,
        surname: req.params.surname,
        email: req.params.email,
        role: req.params.role,
        password: req.params.password,
        image: req.params.image
    });

    res.status(200).json(user)
}

module.exports = {
    save
};