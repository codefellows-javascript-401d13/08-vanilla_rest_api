'use strict';

const request = require('superagent');
const expect = require('chai').expect;

require('../server.js');

describe('Note Routes', function() {
  var note = null;

  describe('POST: /api/note', function() {
    it('should return a note', function(done) {
      request.post('localhost:8000/api/note')
      .send({ name: 'test name', content: 'test content' })
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal('test name');
        expect(res.body.content).to.equal('test content');
        note = res.body;
        done();
      });
    });
    it('should not return a note', function(done) {
      request.post('localhost:8000/api/note')
      .end((err, res) =>{
      expect(res.status).to.equal(400);
      expect(res.body.name).to.equal(undefined);
      expect(res.body.content).to.equal(undefined);
      done();
     });
   });
   it('should return a 400: bad request', function(done) {
     request.post(`localhost:8000/api/note`)
     .send({ scooby: 'dog', something: 'whoa'})
     .end((err, res) =>{
     expect(res.status).to.equal(400);
     expect(err).to.be.an('error');
     expect(res.body.name).to.equal(undefined);
     expect(res.body.content).to.equal(undefined);
     done();
    });
  });
 });

  describe('GET: /api/note', function() {
    it('should return a note', function(done) {
      request.get(`localhost:8000/api/note?id=${note.id}`)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal('test name');
        expect(res.body.content).to.equal('test content');
        done();
      });
    });
    it('should return 400: bad request', function(done) {
      request.get(`localhost:8000/api/note`)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.text).to.equal('bad request');
        expect(err).to.be.an('error');
        done();
      });
    });
  });
  it('should return a 404: not found', function(done) {
    request.get(`localhost:8000/api/note?id=23`)
    .end((err, res) =>{
    expect(res.status).to.equal(404);
    expect(err).to.be.an('error');
    expect(res.body.name).to.equal(undefined);
    expect(res.body.content).to.equal(undefined);
    done();
   });
 });

});
