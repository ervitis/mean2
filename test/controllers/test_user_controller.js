'use strict';

const app = require('../../app');
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);

describe('POST /user/save', () => {
    let apiPath = '/api/user/save';

    let fakeData = {
        name: 'fake1',
        surname: 'ekaf1',
        email: 'fake1@fake.com',
        password: 'fakefake123',
        rol: 'user',
        image: 'fake.png'
    };

    it('should response with a 200 code', (done) => {
        chai.request(app)
            .post(apiPath)
            .send(fakeData)
            .end((err, res) => {
                expect(res).to.have.status(200);

                done()
            })
    });

    it('should return a json object', (done) => {
        chai.request(app)
            .post(apiPath)
            .send(fakeData)
            .end((err, res) => {
                expect(res).to.be.json;

                done()
            })
    });

    it('should get a 400 code if some parameter is empty', (done) => {
        let wrongData = {
            name: 'fake1',
            surname: 'ekaf1',
            email: 'fake1@fake.com',
            password: 'fakefake123',
            rol: 'user'
        };

        chai.request(app)
            .post(apiPath)
            .send(wrongData)
            .end((err, res) => {
                expect(res).to.have.status(400);

                done();
            })
    })
});