'use strict';

const expect = require('chai').expect;
const request = require('superagent');

require('../server.js');

describe('Vanilla API Routes', function() {
  var guitar = null;

  describe('POST: /api/guitar', function() {
    it('should return a guitar', function(done) {
      request.post('localhost:3000/api/guitar')
      .send({ name: 'Stratocaster', type: 'Electric', make: 'Fender'})
      .end((err, res) => {
        if(err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal('Stratocaster');
        expect(res.body.type).to.equal('Electric');
        expect(res.body.make).to.equal('Fender');
        guitar = res.body;
        console.log(guitar);
        done();
      });
    });
  });

  describe('GET: /api/guitar', function() {
    it('should return a guitar', function(done) {
      request.get(`localhost:3000/api/guitar?id=${guitar.id}`)
      .end((err, res) => {
        if(err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal('Stratocaster');
        expect(res.body.type).to.equal('Electric');
        expect(res.body.make).to.equal('Fender');
        done();
      });
    });
    it('should result in a 404 error', function(done) {
      request.get('localhost:3000/api/guitar?id=dumb-ass-test')
      .end((err, res) => {
        // if(err) return done(err);
        console.log('this is my response object:', res.body);
        expect(res.body).to.be.an('object');
        expect(err.status).to.equal(404);
        expect(res.text).to.equal('not found');
        done();
      });
    });
  });
  describe('DELETE: /api/guitar', function() {
    it('should delete an existing guitar', function(done) {
      request.delete(`localhost:3000/api/guitar?id=${guitar.id}`)
      .end((err, res) => {
        if(err) return done(err);
        expect(res.status).to.equal(204);
        expect(res.body).to.be.an('object');
        done();
      });
    });
  });
});
