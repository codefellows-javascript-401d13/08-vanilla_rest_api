'use strict';

const request = require('superagent');
const expect = require('chai').expect;

require('../server.js');

describe('Cat Routes', function() {
  var cat = null;

  describe('POST: /api/cat', function() {
    it('should return a cat', function(done) {
      request.post('localhost:8000/api/cat')
      .send({ name: 'test name', content: 'test content' })
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal('test name');
        expect(res.body.content).to.equal('test content');
        cat = res.body;
        done();
      });
    });
  });

  describe('POST: /api/cat', function() {
    it('should return bad request', function(done) {
      request.post('localhost:8000/api/cat')
      .send({})
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(400);
        // expect(res.body.name).to.equal();
        // expect(res.body.content).to.equal('test content');
        cat = res.body;
        done();
      });
    });
  });

  describe('GET /api/cat', function() {
    it('should return a cat', function(done) {
      request.get(`localhost:8000/api/cat?id=${cat.id}`)
      .end((err, res) => {
        if (err) return done (err);
        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal('test name');
        expect(res.body.content).to.equal('test content');
        done();
      });
    });
  });

  describe('GET /api/cat', function() {
    it('should return not found', function(done) {
      request.get(`localhost:8000/api/cat?id=${-50}`)
      .end((err, res) => {
        if (err) return done (err);
        expect(res.status).to.equal(404);
        // expect(res.body.name).to.equal('test name');
        // expect(res.body.content).to.equal('test content');
        done();
      });
    });
  });

  describe('GET /api/cat', function() {
    it('should return not found', function(done) {
      request.get(`localhost:8000/api/cat?`)
      .end((err, res) => {
        if (err) return done (err);
        expect(res.status).to.equal(400);
        done();
      });
    });
  });

});
