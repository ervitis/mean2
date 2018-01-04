'use strict';

const app = require('../../app');
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);

describe('GET /user/login', () => {
    let apiPath = '/api/user/login';

    const fakeData = {
        email: 'fake1@fake.com',
        password: 'fakefake123'
    };

    it('should response with a 200 code', (done) => {
        chai.request(app)
            .get(apiPath)
            .send(fakeData)
            .end((err, res) => {
                expect(res).to.have.status(200);
            });
        done()
    });

    it('should return a json object', (done) => {
        chai.request(app)
            .get(apiPath)
            .send(fakeData)
            .end((err, res) => {
                expect(res).to.be.json;
            });
        done()
    });

    it('should return the user object', (done) => {
        chai.request(app)
            .get(apiPath)
            .send(fakeData)
            .end((err, res) => {
                expect(res.user.email).to.be.equal(fakeData.email)
            });
        done()
    })
});