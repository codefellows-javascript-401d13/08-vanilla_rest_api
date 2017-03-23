'use strict';

const request = require('superagent');
const expect = require('chai').expect;

require('../server.js');

describe('Cat Routes', function() {
  var testCat = null;

  describe('POST: /api/cat', function() {
    it('should return a cat', function(done) {
      request.post('localhost:8000/api/cat')
      .send({ name: 'test name', content: 'test content' })
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal('test name');
        expect(res.body.content).to.equal('test content');
        testCat = res.body;
        done();
      });
    });
  });
  describe('GET /api/cat', function() {
    it('should return a cat', function(done) {

      request.get(`localhost:8000/api/cat?id=${testCat.id}`)
      .end((err, res) => {
        if (err) return done (err);
        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal('test name');
        expect(res.body.content).to.equal('test content');
        done();
      });
    });
  });

  describe('POST: /api/cat', function() {
    it('should return bad request', function(done) {
      request.post('localhost:8000/api/cat')
      .send({})
      .end((err, res) => {
        expect(err.status).to.equal(400);
        expect(err.message).to.equal('Bad Request');
        testCat = res.body;
        done();
      });
    });
  });


  describe('GET /api/cat', function() {
    it('should return not found', function(done) {
      console.log(1);
      request.get(`localhost:8000/api/cat?id=50`)
      .end((err, res) => {
        // if (err) return done(err);
        expect(err.status).to.equal(404);
        expect(err.message).to.equal('Not Found');
        done();
      });
    });
  });

  describe('GET /api/cat', function() {
    it('should return bad request', function(done) {
      request.get(`localhost:8000/api/cat`)
      .end((err, res) => {
        expect(err.status).to.equal(400);
        expect(err.message).to.equal('Bad Request');
        done();
      });
    });
  });

});
