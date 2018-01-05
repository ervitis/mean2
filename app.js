'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const UserRoutes = require('./routes/user_route');
const ArtistRoutes = require('./routes/artist_route');
const AlbumRoutes = require('./routes/album_route');
const SongRoutes = require('./routes/song_route');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Acces-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

    next();
});

app.use('/api', [UserRoutes, ArtistRoutes, AlbumRoutes, SongRoutes]);

app.use((err, req, res, next) => {
    res.status(400).json(err);
});

module.exports = app;