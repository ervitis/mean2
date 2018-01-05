'use strict';

const path = require('path');
const fs = require('fs');
const mongoosePaginate = require('mongoose-pagination');

const Artist = require('../models/artist');
const Album = require('../models/album');
const Song = require('../models/song');

function getSong(req, res) {
    const songId = req.params.id;

    Song.findById(songId).populate({path: 'album'}).exec((err, song) => {
        if (err) {
            res.status(500).send({err})
        } else {
            if (! song) {
                res.status(404).send({message: 'Song does not exist'})
            } else {
                res.status(200).send({song})
            }
        }
    });
}

function saveSong(req, res) {
    const params = req.body;
    const song = new Song({
        number: params.number,
        name: params.name,
        duration: params.duration,
        file: params.file,
        album: params.album
    });

    song.save((err, songStored) => {
        if (err) {
            res.status(500).send({err})
        } else {
            if (! songStored) {
                res.status(404).send({message: 'Song not saved'})
            } else {
                res.status(200).send({songStored})
            }
        }
    })
}

function getSongs(req, res) {
    const albumId = req.params.album;
    let f = null;

    if (! albumId) {
        f = Song.find().sort('number');
    } else {
        f = Song.find({album: albumId}).sort('number')
    }

    f.populate({
        path: 'album',
        populate: {
            path: 'artist',
            model: 'Artist'
        }
    }).exec((err, songs) => {
        if (err) {
            res.status(500).send({err})
        } else {
            if (! songs) {
                res.status(404).send({message: 'No songs'})
            } else {
                res.status(200).send({songs})
            }
        }
    })
}

function updateSong(req, res) {
    const songId = req.params.id;
    const update = req.body;

    Song.findByIdAndUpdate(songId, update, (err, songUpdate) => {
        if (err) {
            res.status(500).send({err})
        } else {
            if (! songUpdate) {
                res.status(404).send({message: 'Song not updated'})
            } else {
                res.status(200).send({songUpdate})
            }
        }
    });
}

function deleteSong(req, res) {
    const songId = req.params.id;

    Song.findByIdAndRemove(songId, (err, songDelete) => {
        if (err) {
            res.status(500).send({err})
        } else {
            if (! songDelete) {
                res.status(404).send({message: 'Song not found'})
            } else {
                res.status(200).send({songDelete})
            }
        }
    })
}

function uploadFile(req, res) {
    const songId = req.params.id;
    const fileName = 'No file';

    if (req.files) {
        const filePath = req.files.file.path;
        const fileName = filePath.split('/')[4];

        if (fileName.endsWith('mp3')) {
            Song.findByIdAndUpdate(songId, {file: fileName}, (err, songUpdate) => {
                if (! songUpdate) {
                    res.status(404).send({message: 'Error updating'})
                } else {
                    res.status(200).send({songUpdate})
                }
            })
        }
    } else {
        res.status(200).send({message: 'No file uploaded'})
    }
}

function getSongFile(req, res) {
    const songFile = req.params.songFile;
    const pathFile = '/tmp/uploads/songs/' + songFile;

    fs.exists(pathFile, (e) => {
        if (e) {
            res.sendFile(path.resolve(pathFile))
        } else {
            res.status(200).send({message: 'File does not exists'})
        }
    })
}

module.exports = {
    getSong,
    saveSong,
    getSongs,
    updateSong,
    deleteSong,
    uploadFile,
    getSongFile
};