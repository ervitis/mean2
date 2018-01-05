'use strict';

const express = require('express');
const ArtistController = require('../controllers/artist_controller');
const api = express.Router();

const md_auth = require('../middlewares/authenticated');

api.get('/artist/:id', md_auth.ensureAuth, ArtistController.getArtist);
api.post('/artist/save', md_auth.ensureAuth, ArtistController.saveArtist);
api.get('/artists/:page?', md_auth.ensureAuth, ArtistController.getArtists);
module.exports = api;