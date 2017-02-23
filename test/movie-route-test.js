'use strict';

const request = require('superagent');
const expect = require('chai').expect;

require('../server.js');

describe('Movie Routes', function() {
  var movie = null;

  describe('POST: /api/movie', function() {
    it('should return a movie', function(done) {
      request.post('localhost:8000/api/movie')
      .send({name: 'test name', director: 'test director'})
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal('test name');
        expect(res.body.director).to.equal('test director');
        movie = res.body;
        done();
      });
    });
  });

  describe('GET: /api/movie', function() {
    it('should return a movie', function(done) {
      request.get(`localhost:8000/api/movie?id=${movie.id}`)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal('test name');
        expect(res.body.director).to.equal('test director');
        done();
      });
    });
  });
});
