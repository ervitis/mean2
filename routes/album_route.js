'use strict';

const express = require('express');
const AlbumController = require('../controllers/album_controller');
const api = express.Router();
const multipart = require('connect-multiparty');
const md_upload = multipart({uploadDir: './uploads/albums'});

const md_auth = require('../middlewares/authenticated');

api.get('/album/:id', md_auth.ensureAuth, AlbumController.getAlbum);
api.post('/album/save', md_auth.ensureAuth, AlbumController.saveAlbum);
api.get('/albums/:page?', md_auth.ensureAuth, AlbumController.getAlbums);
api.put('/album/:id', md_auth.ensureAuth, AlbumController.updateAlbum);
api.delete('/album/:id', md_auth.ensureAuth, AlbumController.deleteAlbum);
api.post('/album/image/:id', [md_auth.ensureAuth, md_upload], AlbumController.uploadImage);
api.get('/album/image/:imageFile', AlbumController.getImageFile);

module.exports = api;