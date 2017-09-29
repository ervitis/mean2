'use strict';

const mocha = require('mocha');
const mongoose = require('mongoose');
const expect = require('chai').expect;
const SongSchema = require('../../models/song');

describe('testing song model schema', () => {
    it('should be a schema object', (done) => {
        SongSchema.prototype === mongoose.Schema.prototype;

        done();
    })
});