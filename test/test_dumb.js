'use strict';

const app = require('../app');
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);

describe('GET /pruebas', () => {
    it('should response with a 200 code', (done) => {
        chai.request(app)
            .get('/pruebas')
            .end((err, res) => {
                expect(res).to.have.status(200);

                done()
            })
    });

    it('should return a json object', (done) => {
        chai.request(app)
            .get('/pruebas')
            .end((err, res) => {
                expect(res).to.be.json;

                done()
            })
    });

    it('should get a welcome message', (done) => {
        chai.request(app)
            .get('/pruebas')
            .end((err, res) => {
                expect(res.body.message).to.be.eql('Welcome');

                done();
            })
    })
});