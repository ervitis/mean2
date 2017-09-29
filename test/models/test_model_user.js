'use strict';

const mocha = require('mocha');
const mongoose = require('mongoose');
const expect = require('chai').expect;
const UserSchema = require('../../models/user');

describe('testing user model schema', () => {
    it('should be a schema object', (done) => {
        UserSchema.prototype === mongoose.Schema.prototype;

        done();
    })
});