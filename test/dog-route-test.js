'use strict';

const request = require('superagent');
const expect = require('chai').expect;

require('../server.js');

describe('Dog Routes', function() {
  var dog = null;
  describe('POST: /api/dog', function() {
    it('should return a dog and 200', function(done) {
      request.post('localhost:8000/api/dog')
      .send({ name: 'test name', breed: 'test breed' })
      .end((err, res) => {
        if (err) console.log('nope');
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal('test name');
        expect(res.body.breed).to.equal('test breed');
        dog = res.body;
        done();
      });
    });
  });

  // POST: test 400, it should respond with 'bad request' if no request body was provided or the body was invalid
  describe('POST: 400 Bad Request', function() {
    it('should return a 400', function(done) {
      request.post('localhost:8000/api/dog')
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
    });
  });

  describe('GET: /api/dog', function() {
    it('should return a dog', function(done) {
      request.get(`localhost:8000/api/dog?id=${dog.id}`)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal('test name');
        expect(res.body.breed).to.equal('test breed');
        done();
      });
    });
  });

  describe('GET: Not Found', function() {
    it('should return a 404', function(done) {
      request.get(`localhost:8000/api/dog?id=666`)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done();
      });
    });
  });

  describe('GET: Bad Request', function() {
    it('should return a 400', function(done) {
      request.get(`localhost:8000/api/dog?id`)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
    });
  });
});
