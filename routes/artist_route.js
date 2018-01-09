'use strict';

const express = require('express');
const ArtistController = require('../controllers/artist_controller');
const api = express.Router();
const multipart = require('connect-multiparty');
const md_upload = multipart({uploadDir: './uploads/artists'});

const md_auth = require('../middlewares/authenticated');

api.get('/artist/:id', md_auth.ensureAuth, ArtistController.getArtist);
api.post('/artist/save', md_auth.ensureAuth, ArtistController.saveArtist);
api.get('/artists/:page?', md_auth.ensureAuth, ArtistController.getArtists);
api.put('/artist/:id', md_auth.ensureAuth, ArtistController.updateArtist);
api.delete('/artist/:id', md_auth.ensureAuth, ArtistController.deleteArtist);
api.post('/artist/image/:id', [md_auth.ensureAuth, md_upload], ArtistController.uploadImage);
api.get('/artist/image/:imageFile', ArtistController.getImageFile);

module.exports = api;