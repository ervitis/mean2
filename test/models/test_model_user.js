'use strict';

const mocha = require('mocha');
const mongoose = require('mongoose');
const expect = require('chai').expect;
const UserSchema = require('../../models/user');

describe('testing user model schema', () => {
    it('should be a schema object', (done) => {
        UserSchema.prototype === mongoose.Schema.prototype;

        done();
    });

    it('password should be hashed', (done) => {
        let fakeData = {
            name: 'fake1',
            surname: 'ekaf1',
            email: 'fake1@fake.com',
            password: 'fakefake123',
            rol: 'user',
            image: 'fake.png'
        };

        const user = new UserSchema(fakeData);
        user.save();

        const myUser = mongoose.model('User').findOne({'name': fakeData.name});
        expect(myUser.password).to.not.equal(fakeData.password);

        done();
    })
});