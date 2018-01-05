'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const UserRoutes = require('./routes/user_route');
const ArtistRoutes = require('./routes/artist_route');
const AlbumRoutes = require('./routes/album_route');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/api', [UserRoutes, ArtistRoutes, AlbumRoutes]);

app.use((err, req, res, next) => {
    res.status(400).json(err);
});

module.exports = app;