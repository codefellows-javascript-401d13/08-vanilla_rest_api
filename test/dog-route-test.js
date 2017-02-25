'use strict';

const request = require('superagent');
const expect = require('chai').expect;
const PORT = process.env.PORT || 3000;

require('../server.js');

describe('Dog Routes', function() {
  var dog = null;

  // POST: test 200, it should respond with the body content for a post request with a valid body
  describe('POST: /api/dog', function() {
    it('should return a dog', function(done) {
      request.post(`localhost:${PORT}/api/dog`)
      .send({ name: 'test name', breed: 'test breed' })
      .end((err, res) => {
        if (err) console.log('nope');
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal('test name');
        expect(res.body.breed).to.equal('test breed');
        dog = res.body;
        done();
      });
    });
  });
// POST: test 400, it should respond with 'bad request'
//if no request body was provided or the body was invalid
  describe('POST: /api/dog', function() {
    it('400 bad request', function(done) {
      request.post(`localhost:${PORT}/api/dog?`)
      .send({gross: 'terrible'})
      .end((err, res) => {
        // if (err) console.log('nope');
        // if (err) return done(err);
        // expect(err).to.be.an('error');
        expect(res.status).to.equal(400);
        done();
      });
    });
  });



// GET: test 200, it should contain a response
//body for a request made with a valid id
  describe('GET: /api/dog', function() {
    it('should return a dog', function(done) {
      request.get(`localhost:${PORT}/api/dog?id=${dog.id}`)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal('test name');
        expect(res.body.breed).to.equal('test breed');
        done();
      });
    });
  });
// GET: test 404, it should respond with 'not found'
//for valid requests made with an id that was not found
  describe('GET: Valid Request, Unknown Id', function(){
    it('should return 404 not found', function(done){
      request.get(`localhost:${PORT}/api/dog?id=555.json`)
      .end((err,res) => {
        expect(err).to.be.an('error');
        expect(res.status).to.equal(404);
        done();
      });
    });
   });

// GET: test 400, it should respond with 'bad request'
//if no id was provided in the request
  describe('GET: Bad Request, No Id Provided', function(){
    it('should return 400 bad request', function(done){
      request.get(`localhost:${PORT}/api/dog`)
      // .send({name: 'test name', breed: 'test breed'})
      .end((err,res) => {
        expect(err).to.be.an('error');
        expect(res.status).to.equal(400);
        done();
      });
    });
   });




});
