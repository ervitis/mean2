'use strict';

const mocha = require('mocha');
const mongoose = require('mongoose');
const expect = require('chai').expect;
const SongSchema = require('../../models/song');
const ObjectUtilities = require('../../utilities/objects');

describe('testing song model schema', () => {
    it('should be a schema object', (done) => {
        SongSchema.prototype === mongoose.Schema.prototype;

        done();
    });

    it('should have these properties: number, name, duration, file and album', (done) => {
        const Song = require('../../models/song');
        const Album = require('../../models/album');
        const Artist = require('../../models/artist');
        const artist = new Artist({name: 'dumb artist', description: 'dumb', photo: 'photo1'});
        const album = new Album({title: 'dumb album', description: 'album', year: '1997', photo: 'photo', artist: artist});
        const song = new Song({number: '1', name: 'dumb song name', duration: '3 min', file: 'path/file', album: album});

        expect(song.name).to.be.eql('dumb song name');

        done();
    })
});