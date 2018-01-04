'use strict';

const mocha = require('mocha');
const expect = require('chai').expect;
const Jwt = require('../../services/jwt');
const User = require('../../models/user');

describe('jwt token', () => {
    it('returns a token object', (done) => {
        const user = new User({
            name: 'prueba',
            surname: 'surname',
            email: 'email',
            password: 'pssssss',
            image: 'im.png',
            rol: 'rol'
        });

        expect(Jwt.createToken(user)).not.empty;

        done();
    });
});