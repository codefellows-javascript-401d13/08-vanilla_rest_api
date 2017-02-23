'use strict';

const request = require('superagent');
const expect = require('chai').expect;

require('../server.js');

describe('Team Routes', function() {
  var team = null;

  describe('POST :3000/api/team', function() {
    it('should return a team', function(done) {
      request.post('localhost:3000/api/team')
      .send({ name: 'test name', city: 'test city'})
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal('test name');
        expect(res.body.city).to.equal('test city');
        team = res.body;
        done();
      });
    });
    it('should return a 400 bad request error', function(done) {
      request.post('localhost:3000/api/team')
      .end((err, res) => {
        expect(err).to.be.an('error');
        expect(res.status).to.equal(400);
        expect(res.text).to.equal('bad request');
        done();
      });
    });
  });

  describe('GET :3000/api/team', function() {
    it('should return a team', function(done) {
      request.get(`localhost:3000/api/team?id=${team.id}`)
      .end((err, res) => {
        if(err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal('test name');
        expect(res.body.city).to.equal('test city');
        done();
      });
    });
    it('should')
  });
  // it('should return 400 if no team specified', function(done) {
  //   request.get('localhost:3000/api/team')
  //   .end((err, res) => {
  //     if (err) return done(err);
  //     expect(res.status).to.equal(400);
  //     expect(res.body).to.equal('bad request');
  //     done();
  //   });
  // });
});
