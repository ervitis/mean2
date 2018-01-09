'use strict';

const path = require('path');
const fs = require('fs');
const mongoosePaginate = require('mongoose-pagination');

const Artist = require('../models/artist');
const Album = require('../models/album');
const Song = require('../models/song');

function getArtist(req, res) {
    const artistId = req.params.id;

    Artist.findById(artistId, (err, artist) => {
        if (err) {
            res.status(500).send({err});
        } else {
            if (! artist) {
                res.status(404).send({message: 'Artist not found'});
            } else {
                res.status(200).send({artist});
            }
        }
    });
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

function getArtists(req, res) {
    const page = req.params.page ? req.params.page : 1;
    const itemsPerPage = 5;

    Artist.find().sort('name').paginate(page, itemsPerPage, (err, artists, totalItems) => {
        if (err) {
            res.status(500).send({err})
        } else {
            if (! artists) {
                res.status(404).send({message: 'No artists'})
            } else {
                res.status(200).send({
                    totalItems: totalItems,
                    artists: artists
                })
            }
        }
    });
}

function updateArtist(req, res) {
    const artistId = req.params.id;
    const artist = req.body;

    Artist.findByIdAndUpdate(artistId, artist, (err, artistUpdate) => {
        if (err) {
            res.status(500).send({err})
        } else {
            if (! artistUpdate) {
                res.status(404).send({message: 'Artist not updated'})
            } else {
                res.status(200).send({artistUpdate})
            }
        }
    })
}

function deleteArtist(req, res) {
    const artistId = req.params.id;

    Artist.findByIdAndRemove(artistId, (err, artistRemove) => {
        if (err) {
            res.status(500).send({err})
        } else {
            if (! artistRemove) {
                res.status(404).send({message: 'Artitst not removed'})
            } else {
                Album.find({artist: artistRemove._id}).remove((err, albumRemove) => {
                    if (err) {
                        res.status(500).send({err})
                    } else {
                        Song.find({album: albumRemove._id}).remove((err, songRemove) => {
                            if (err) {
                                res.status(500).send({err})
                            } else {
                                res.status(200).send({artistRemove});
                            }
                        })
                    }
                })
            }
        }
    })
}

function uploadImage(req, res) {
    const artistId = req.params.id;
    const fileName = 'No picture';

    if (req.files) {
        const filePath = req.files.image.path;
        const fileName = filePath.split('/')[2];

        if (fileName.endsWith('png') || fileName.endsWith('jpg')) {
            Artist.findByIdAndUpdate(artistId, {image: fileName}, (err, artistUpdate) => {
                if (err) {
                    console.log(err);
                    res.status(500).send({err});
                } else {
                    if (! artistUpdate) {
                        res.status(404).send({message: 'Error updating'})
                    } else {
                        res.status(200).send({artistUpdate})
                    }
                }
            })
        }
    } else {
        res.status(200).send({message: 'No file uploaded'})
    }
}

function getImageFile(req, res) {
    const imageFile = req.params.imageFile;
    const pathFile = './uploads/artists/' + imageFile;

    fs.exists(pathFile, (e) => {
        if (e) {
            res.sendFile(path.resolve(pathFile))
        } else {
            res.status(200).send({message: 'Image does not exist'})
        }
    });
}

module.exports = {
    getArtist,
    saveArtist,
    getArtists,
    updateArtist,
    deleteArtist,
    uploadImage,
    getImageFile
};