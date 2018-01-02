'use strict';

const User = require('../models/user');

function save(req, res) {
    const user = new User({
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        role: req.body.role,
        password: req.body.password,
        image: req.body.image
    });

    console.log('Saving ' + user);

    user.save().then((err) => {
        res.status(500).json(err)
    });

    res.status(200).json({'response': 'ok', 'user': user})
}

module.exports = {
    save
};