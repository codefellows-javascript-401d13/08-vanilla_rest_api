'use strict';

const request = require ('superagent');
const expect = require('chai').expect;

require('../server.js');

describe('Chair Routes', function() {
  var chair = null;
  describe('Unregistered route', function() {
    it('should respond with a 404 error', function(done){
      request.get('localhost:8000/not/an/endpoint')
      .end((err, res) => {
        expect(err.message).to.equal('Not Found');
        expect(res.status).to.equal(404);
        done();
      });
    });
  });
  describe('POST: /api/chair', function() {
    it('should create a chair', function(done){
      request.post( 'localhost:8000/api/chair') //request is superagent
      .send({name: 'test name', content: 'test content' })
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal('test name');
        expect(res.body.content).to.equal('test content');
        chair = res.body;
        done();
      });
    });
    it('should resond with \'bad request\'if body content was not provided or was invalid', function(done){
      request.post('localhost:8000/api/chair')
      .send({invalid: 'content', willNot: 'work'})
      .end((err, res) => {
        expect(err.message).to.equal('Bad Request');
        expect(res.status).to.equal(400);
        done();
      });
    });
  });
  describe('GET: /api/chair', function() {
    it('should return a chair for valid id', function(done){
      request.get(`localhost:8000/api/chair?id=${chair.id}`)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal('test name');
        expect(res.body.content).to.equal('test content');
        done();
      });
    });
    it('should respond w/ \'not found\' for valid request w/id that was not found', function(done){
      request.get('localhost:8000/api/chair?id=not-an-id')
      .end((err, res) => {
        expect(err.message).to.equal('Not Found');
        expect(res.status).to.equal(404);
        done();
      });
    });
    it('should respond w/ \'bad request\' if no id provided', function(done){
      request.get('localhost:8000/api/chair?id=')
      .end((err, res) => {
        expect(err.message).to.equal('Bad Request');
        expect(res.status).to.equal(400);
        done();
      });
    });
  });
  describe('DELETE: /api/chair', function(){
    it('should delete a chair', function(done){
      request.delete(`localhost:8000/api/chair?id=${chair.id}`)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(204);
        expect(res.body).to.equal('');
        done();
      });
    });
  });
});

