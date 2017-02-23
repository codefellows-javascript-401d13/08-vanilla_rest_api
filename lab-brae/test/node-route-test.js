'use strict';

const request = require('superagent');
const expect = require('chai').expect;

require('../server.js');

describe('Pet Routes', function() {
  var pet = null;

  describe('POST: /api/pet', function() {
    it('should return a pet', function(done) {
      request.post('localhost:8000/api/pet')
      .send({ name: 'test name', type: 'test type' })
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal('test name');
        expect(res.body.type).to.equal('test type');
        pet = res.body;
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
        expect(res.body.name).to.equal('test name');
        expect(res.body.type).to.equal('test type');
        done();
      });
    });
  });
});