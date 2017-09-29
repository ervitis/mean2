'use strict';

const mocha = require('mocha');
const mongoose = require('mongoose');
const expect = require('chai').expect;
const ArtistSchema = require('../../models/artist');

describe('testing artist model schema', () => {
    it('should be a schema object', (done) => {
        ArtistSchema.prototype === mongoose.Schema.prototype;

        done();
    })
});