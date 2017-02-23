'use strict';

const request = require('superagent');
const expect = require('chai').expect;

require('../server.js');

describe('Oohdata Routes', function() {
  var oohdata = null;

  describe('POST: /api/oohdata', function() {
    it('should return a oohdata', function(done) {
      request.post('localhost:3000/api/oohdata')
      .send({ animal: 'test animal', story: 'test story'})
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.animal).to.equal('test animal');
        expect(res.body.story).to.equal('test story');
        oohdata = res.body;
        done();
      });
    });
  });

  describe('GET: /api/oohdata', function() {
    it('should return a oohdata', function(done) {
      request.get(`localhost:3000/api/oohdata?id=${oohdata.id}`)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.animal).to.equal('test animal');
        expect(res.body.story).to.equal('test story');
        done();
      });
    });
  });
});
