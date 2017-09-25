'use strict';

const app = require('../app');
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);

describe('GET /pruebas', () => {
    it('should get a welcome message', (done) => {
        chai.request(app)
            .get('/pruebas')
            .end((err, res) => {
                expect(res).to.be.json;
                expect(res).to.have.status(200);
                expect(res.body.message).to.be.eql('Welcome');

                done();
            })
    })
});