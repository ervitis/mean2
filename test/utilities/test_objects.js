'use strict';

const mocha = require('mocha');
const expect = require('chai').expect;
const ObjectUtilities = require('../../utilities/objects');

describe('utilities objects', () => {
    it('function size return object size', (done) => {
        const dumbObject = {
            name: 'me',
            surname: 'another',
        };

        expect(ObjectUtilities.size(dumbObject)).to.be.eql(2);

        done();
    });

    it('function size of empty object return 0', (done) => {
        const dumbObject = {};

        expect(ObjectUtilities.size(dumbObject)).to.be.eql(0);

        done();
    });
});