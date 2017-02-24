'use strict';

const request = require('superagent');
const expect = require('chai').expect;

// require('../server.js');

describe('My Data Routes', function(){
  var memo = null;

  describe('POST: /api/memo', function() {
    it('it should return memo', function(done){
      request.post('localhost:8000/api/memo')
     .send({ author: 'test author', entry: 'test entry' })
     .end((err, res) => {
       expect(res.status).to.equal(200);
       expect(res.body.author).to.equal('test author');
       expect(res.body.entry).to.equal('test entry');
       memo = res.body;
       done();
     });
    });
  });

  describe('POST: api/memo', function() {
    it('it should return a 400 error', function(done){
      request.post('localhost:8000/api/memo')
     .send({})
     .end((err, res) => {
       expect(res.status).to.equal(400);
       expect(res.text).to.equal('bad request');
       done();
     });
    });
  });


  describe('GET: /api/memo', function(){
    it('should return memo', function(done){
      request.get(`localhost:8000/api/memo?id=${memo.id}`)
     .end((err, res) => {
       expect(res.status).to.equal(200);
       expect(res.body.author).to.equal('test author');
       expect(res.body.entry).to.equal('test entry');  
     });
      done();
    });
  });

  describe('GET: /api/memo', function() {
    it('should return a 400 error if no id was provided', function(done){
      request.get('localhost:8000/api/memo')
     .end((res) => {
       expect(res.status).to.equal(400);
      //  expect(res.text).to.equal('bad request');
       done();
     });
    });
  });

  describe('GET: /api/memo', function(){
    it('should return a 404 not found', function(done){
      request.get('localhost:8000/api/memo?id=123')
     .end((err, res) => {
       expect(res.status).to.equal(404);
       expect(res.text).to.equal('not found');
       done(); 
     }); 
    });
  });

  describe('DELETE: /api/memo', function() {
    it('it should delete memo', function(done){
      request.delete(`localhost:8000/api/memo?id=${memo.id}`)
     .end((err, res) => {
       expect(res.status).to.equal(204);
       expect(res.text).to.be.empty;
       done(); 
     });
    });
  });


});