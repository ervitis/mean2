'use strict';

const app = require('../../app');
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);

describe('Artist controller', () => {
    let apiPath = '/api/artist';

    it('GET artist', (done) => {
        chai.request(app)
            .get(apiPath)
            .end((err, res) => {
                expect(res).to.have.status(200);
            });
        done()
    });

    it('POST save artist', (done) => {
        apiPath = '/api/artist/save';
        let fakeData = {
            name: 'Extremoduro',
            description: 'Rock',
            image: 'extremoduro.png'
        };

        chai.request(app)
            .post(apiPath)
            .send(fakeData)
            .end((err, res) => {
                expect(res).to.be.json;
                expect(res.name).to.be.equal('Extremoduro')
            });

        done()
    })
});