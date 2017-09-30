'use strict';

const mocha = require('mocha');
const mongoose = require('mongoose');
const expect = require('chai').expect;
const ArtistSchema = require('../../models/artist');

describe('testing artist model schema', () => {
    it('should be a schema object', (done) => {
        ArtistSchema.prototype === mongoose.Schema.prototype;

        done();
    });

    it('should have these properties: name, description, image', (done) => {
        const Artist = require('../../models/artist');
        const artist = new Artist({name: 'dumb artist', description: 'dumb', image: 'photo1'});

        expect(artist.name).to.be.eql('dumb artist');

        done();
    })
});