'use strict';

const request = require('superagent');
const expect = require('chai').expect;

require('../server.js');

describe('Team Routes', function() {
  let team = null;

  describe('POST :3000/api/message', function() {
    it('should return a team', function(done) {
      request.post('localhost:3000/api/team')
      .send({ name: 'test name', city: 'test city'})
      .end((err, res) => {
        if (err) {
          expect(res.status).to.equal(400);
          expect(res.body).to.equal('bad request');
          return done(err);
        }
        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal('test name');
        expect(res.body.city).to.equal('test city');
        team = res.body;
        done();
      });
    });
  });

  describe('GET :3000/api/message', function() {
    it('should return a team', function(done) {
      request.get(`localhost:3000/api/team?id=${team.id}`)
      .end((err, res) => {
        if(err) {
          expect(res.status).to.equal(404);
          expect(res.body).to.equal('not found');
          return done(err);
        }
        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal('test name');
        expect(res.body.city).to.equal('test city');
        done();
      });
    });
  });
  it('should return 400 if no team specified', function(done) {
    request.get('localhost:3000/api/team')
    .end((err, res) => {
      if (err) return done(err);
      expect(res.status).to.equal(400);
      expect(res.body).to.equal('bad request');
      done();
    });
  });
});
