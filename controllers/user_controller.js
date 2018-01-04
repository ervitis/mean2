'use strict';

const bcrypt = require('bcrypt-nodejs');
const User = require('../models/user');

function saveUser(req, res) {
    const params = req.body;
    const user = new User();

    bcrypt.hash(params.password, null, null, (err, hash) => {
        user.password = hash;
        user.name = params.name;
        user.surname = params.surname;
        user.email = params.email;
        user.rol = params.rol;
        user.image = params.image;

        user.save((err, userStored) => {
            if (err) {
                res.status(500).send({message: 'Error al guardar'})
            } else {
                if (! userStored) {
                    res.status(404).send({message: 'No se ha registrado'})
                } else {
                    res.status(200).send({user: userStored})
                }
            }
        });
    });

}

module.exports = {
    saveUser
};