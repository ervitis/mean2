'use strict';

const express = require('express');
const SongController = require('../controllers/song_controller');
const api = express.Router();
const md_auth = require('../middlewares/authenticated');

const multipart = require('connect-multiparty');
const md_upload = multipart({uploadDir: '/tmp/uploads/songs'});

api.get('/song/:id', md_auth.ensureAuth, SongController.getSong);
api.post('/song/save', md_auth.ensureAuth, SongController.saveSong);
api.get('/songs/:album?', md_auth.ensureAuth, SongController.getSongs);
api.put('/song/:id', md_auth.ensureAuth, SongController.updateSong);
api.delete('/song/:id', md_auth.ensureAuth, SongController.deleteSong);
api.post('/song/file/:id', [md_auth.ensureAuth, md_upload], SongController.uploadFile);
api.get('/song/file/:id', md_auth.ensureAuth, SongController.getSongFile);


module.exports = api;