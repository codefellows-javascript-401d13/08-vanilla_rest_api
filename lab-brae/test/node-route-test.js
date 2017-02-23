'use strict';

const request = require('superagent');
const expect = require('chai').expect;

require('../server.js');

describe('Pet Routes', function() {
    var pet = null;

    describe('POST: /api/pet', function() {
        it('should return a pet', function(done) {
            request.post('localhost:8000/api/pet')
            .send({ name: 'Harriet', type: 'parrot' })
            .end((err, res) => {
                if (err) return done(err);
                expect(res.status).to.equal(200);
                expect(res.body.name).to.equal('Harriet');
                expect(res.body.type).to.equal('parrot');
                pet = res.body;
                done();
            });
        });

        it('should respond with bad request', function(done) {
            request.post('localhost:8000/api/pet')
            .send({})
            .end((err, res) => {
                expect(err).to.be.an('error');
                expect(res.status).to.equal(400);
                expect(res.text).to.equal('bad request');
                done();
            });
        });
    });

    describe('GET: /api/pet', function() {
        it('should return a pet', function(done) {
            request.get(`localhost:8000/api/pet?id=${pet.id}`)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.status).to.equal(200);
                expect(res.body.name).to.equal('Harriet');
                expect(res.body.type).to.equal('parrot');
                done();
            });
        });

        it('should respond with route not found', function(done) {
            request.get(`localhost:8000/api/pet?id=notvalid`)
            .end((err, res) => {
                expect(res.status).to.equal(404);
                expect(res.text).to.equal('not found');
                done();
            });
        });

        it('should respond with bad request', function(done) {
            request.get(`localhost:8000/api/pet`)
            .end((err, res) => {
                expect(res.status).to.equal(400);
                expect(res.text).to.equal('bad request');
                done();
            });
        });
    });
});
