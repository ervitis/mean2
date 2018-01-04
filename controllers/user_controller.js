'use strict';

const bcrypt = require('bcrypt-nodejs');
const User = require('../models/user');
const jwt = require('../services/jwt');

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

function loginUser(req, res) {
    const params = req.body;

    User.findOne({email: params.email.toLocaleLowerCase()}, (err, user) => {
        if (err) {
            res.status(500).send({message: err})
        } else {
            if (! user) {
                res.status(404).send({message: 'El usuario no existe'})
            } else {
                bcrypt.compare(params.password, user.password, (err, check) => {
                    if (! check) {
                        res.status(404).send({message: 'Logging error'})
                    } else {
                        if (params.gethash) {
                            // returns the jwt token
                            res.status(200).send({
                                token: jwt.createToken(user)
                            })
                        } else {
                            res.status(200).send({user})
                        }
                    }
                })
            }
        }
    })
}

module.exports = {
    saveUser,
    loginUser
};