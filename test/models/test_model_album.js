'use strict';

const mocha = require('mocha');
const mongoose = require('mongoose');
const expect = require('chai').expect;
const AlbumSchema = require('../../models/album');

describe('testing artist model schema', () => {
    it('should be a schema object', (done) => {
        AlbumSchema.prototype === mongoose.Schema.prototype;

        done();
    })
});