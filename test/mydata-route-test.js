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

  describe('POST: api/mine', function() {
    it('it should return a bad request', function(done){
      request.post('localhost:3000/api/mine')
      .send({})
      .end((res) => {
        expect(res.status).to.equal(400);
        // expect(res.text).to.equal('bad request');
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

  describe('GET: /api/mine', function() {
    it('should return a 400 error if no id was provided', function(done){
      request.get('localhost:3000/api/mine')
      .end((err, res) => {
        expect(res.status).to.equal(400);
        // expect(err).to.equal.null;
        // expect(res.text).to.equal('bad request');
        done();
      });
    });
  });

  describe('GET: /api/mine', function(){
    it('should return a 404 not found', function(done){
      request.get('localhost:3000/api/mine?id=123')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.text).to.equal('not found');
        done();
      });
    });
  });

  describe('DELETE: /api/mine', function(){
    it('should remove the id', function(done) {
      request.delete(`localhost:3000/api/mine?id=${mine.id}`)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(204);
        expect(res.body).to.equal('empty');
        mine = res.body;
        done();
      });
    });
  });
});
