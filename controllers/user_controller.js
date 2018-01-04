'use strict';

const bcrypt = require('bcrypt-nodejs');
const User = require('../models/user');
const jwt = require('../services/jwt');
const fs = require('fs');
const path = require('path');

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

function updateUser(req, res) {
    const userId = req.params.id;
    const update = req.body;

    if (update.password) {
        bcrypt.hash(update.password, null, null, (err, hash) => {
            if (err) {
                res.status(500).send({err})
            } else {
                update.password = hash;

                updateUserById(userId, update, res)
            }
        });
    } else {
        updateUserById(userId, update, res)
    }
}

function uploadImage(req, res) {
    const userId = req.params.id;
    const fileName = 'No file';

    if (req.files) {
        const filePath = req.files.image.path;
        const fileName = filePath.split('/')[4];

        console.log(fileName);

        if (fileName.endsWith('png') || fileName.endsWith('jpg')) {
            updateUserById(userId, {image: fileName}, res)
        } else {
            res.status(200).send({message: 'Extension not supported'})
        }
    } else {
        res.status(200).send({message: 'No file uploaded'})
    }
}

function updateUserById(userId, updateUser, res) {
    User.findByIdAndUpdate(userId, updateUser, (err, userUpdated) => {
        if (err) {
            res.status(500).send({message: 'Error updating user data'})
        } else {
            if (! userUpdated) {
                res.status(404).send({message: 'User not found'})
            } else {
                res.status(200).send({user: userUpdated})
            }
        }
    });
}

function getImageFile(req, res) {
    const imageFile = req.params.imageFile;
    const pathFile = '/tmp/uploads/users/';

    fs.exists(pathFile + imageFile, (e) => {
        if (e) {
            res.sendFile(path.resolve(pathFile + imageFile))
        } else {
            res.status(200).send({message: 'File does not exist'})
        }
    });
}

module.exports = {
    saveUser,
    loginUser,
    updateUser,
    uploadImage,
    getImageFile
};