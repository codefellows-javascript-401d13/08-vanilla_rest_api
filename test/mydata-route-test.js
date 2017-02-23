'use strict';

const request = require('superagent');
const expect = require('chai').expect;

require('../server.js');

describe('My Data Routes', function(){
  var mine = null;

  describe('POST: /api/mine', function() {
    it('it should return mine', function(done){
      request.post('localhost:3000/api/mine')
      .send({ fruit: 'test fruit', apple: 'test apple' })
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.fruit).to.equal('test fruit');
        expect(res.body.apple).to.equal('test apple');
        mine = res.body;
        done();
      });
    });
  });

  describe('GET: /api/mine', function(){
    it('should return mine', function(done){
      request.get(`localhost:3000/api/mine?id=${mine.id}`)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.fruit).to.equal('test fruit');
        expect(res.body.apple).to.equal('test apple');
        done();
      });
    });
  });
});
