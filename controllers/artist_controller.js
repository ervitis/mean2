'use strict';

const path = require('path');
const fs = require('fs');

const Artist = require('../models/artist');
const Album = require('../models/album');
const Song = require('../models/song');

function getArtist(req, res) {
    res.status(200).send({message: 'prueba artista'});
}

function saveArtist(req, res) {
    const params = req.body;
    const artist = new Artist({
        name: params.name,
        description: params.description,
        image: params.image
    });

    artist.save((err, artistStored) => {
        if (err) {
            res.status(500).send({err});
        } else {
            if (! artistStored) {
                res.status(404).send({message: 'Artist not saved'})
            } else {
                res.status(200).send({artistStored})
            }
        }
    })
}

module.exports = {
    getArtist,
    saveArtist
};