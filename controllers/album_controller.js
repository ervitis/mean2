'use strict';

const path = require('path');
const fs = require('fs');
const mongoosePaginate = require('mongoose-pagination');

const Artist = require('../models/artist');
const Album = require('../models/album');
const Song = require('../models/song');

function getAlbum(req, res) {
    const albumId = req.params.id;

    Album.findById(albumId, (err, album) => {
        if (err) {
            res.status(500).send({err});
        } else {
            if (! album) {
                res.status(404).send({message: 'Album not found'});
            } else {
                res.status(200).send({album});
            }
        }
    });
}

function saveAlbum(req, res) {
    const params = req.body;
    const album = new Album({
        title: params.title,
        description: params.description,
        image: params.image,
        year: params.year,
        artist: params.artist
    });

    album.save((err, albumStored) => {
        if (err) {
            res.status(500).send({err});
        } else {
            if (! albumStored) {
                res.status(404).send({message: 'Album not saved'})
            } else {
                res.status(200).send({albumStored})
            }
        }
    })
}

function getAlbums(req, res) {
    const page = req.params.page ? req.params.page : 1;
    const itemsPerPage = 5;

    Album.find().sort('name').paginate(page, itemsPerPage, (err, albums, totalItems) => {
        if (err) {
            res.status(500).send({err})
        } else {
            if (! albums) {
                res.status(404).send({message: 'No albums'})
            } else {
                res.status(200).send({
                    totalItems: totalItems,
                    artists: albums
                })
            }
        }
    });
}

function updateAlbum(req, res) {
    const albumId = req.params.id;
    const album = req.body;

    Album.findByIdAndUpdate(albumId, album, (err, albumUpdate) => {
        if (err) {
            res.status(500).send({err})
        } else {
            if (! albumUpdate) {
                res.status(404).send({message: 'Album not updated'})
            } else {
                res.status(200).send({albumUpdate})
            }
        }
    })
}

function deleteAlbum(req, res) {
    const albumId = req.params.id;

    Album.findByIdAndRemove(albumId, (err, albumRemove) => {
        if (err) {
            res.status(500).send({err})
        } else {
            if (! albumRemove) {
                res.status(404).send({message: 'Album not removed'})
            } else {
                Song.find({artist: albumRemove._id}).remove((err, songRemove) => {
                    if (err) {
                        res.status(500).send({err})
                    } else {
                        res.status(200).send({albumRemove});
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
        const fileName = filePath.split('/')[4];

        if (fileName.endsWith('png') || fileName.endsWith('jpg')) {
            Artist.findByIdAndUpdate(artistId, {image: fileName}, (err, artistUpdate) => {
                if (! artistUpdate) {
                    res.status(404).send({message: 'Error updating'})
                } else {
                    res.status(200).send({artistUpdate})
                }
            })
        }
    } else {
        res.status(200).send({message: 'No file uploaded'})
    }
}

function getImageFile(req, res) {
    const imageFile = req.params.imageFile;
    const pathFile = '/tmp/uploads/artists/' + imageFile;

    fs.exists(pathFile, (e) => {
        if (e) {
            res.sendFile(path.resolve(pathFile))
        } else {
            res.status(200).send({message: 'Image does not exist'})
        }
    });
}

module.exports = {
    getAlbum,
    saveAlbum,
    getAlbums,
    updateAlbum,
    deleteAlbum,
    uploadImage,
    getImageFile
};