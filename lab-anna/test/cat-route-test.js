'use strict';

const request = require('superagent');
const expect = require('chai').expect;

require('../server.js');

describe('Cat Routes', function() {
  var cat = null;

  describe('POST: api/cat', function() {
    it('should return a cat', function(done) {
      request.post('localhost:3000/api/cat')
      .send({ name: 'test name', color: 'test color'})
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal('test name');
        expect(res.body.color).to.equal('test color');
        cat = res.body;
        done();
      });
    });
  });

  describe('GET: api/cat', function() {
    it('should return a cat', function(done) {
      request.get(`localhost:3000/api/cat?id=${cat.id}`)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal('test name');
        expect(res.body.color).to.equal('test color');
        done();
      });
    });
  });

  describe('DELETE: api/cat', function() {
    it('should return a cat', function(done) {
      request.delete(`localhost:3000/api/cat?id=${cat.id}`)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(204);
        done();
      });
    });
  });

  describe('GET: api/cat', function() {
    it('should return all cats', function(done) {
      request.get('localhost:3000/api/cat')
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        done();
      });
    });
  });
});
