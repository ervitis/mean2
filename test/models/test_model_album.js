'use strict';

const mocha = require('mocha');
const mongoose = require('mongoose');
const expect = require('chai').expect;
const AlbumSchema = require('../../models/album');

describe('testing album model schema', () => {
    it('should be a schema object', (done) => {
        AlbumSchema.prototype === mongoose.Schema.prototype;

        done();
    });

    it('should have these properties: title, description, year, image and artist', (done) => {
        const Album = require('../../models/album');
        const Artist = require('../../models/artist');
        const artist = new Artist({name: 'dumb artist', description: 'dumb', image: 'photo1'});
        const album = new Album({title: 'dumb album', description: 'album', year: 1997, image: 'photo', artist: artist});

        expect(album.title).to.be.eql('dumb album');

        done();
    })
});