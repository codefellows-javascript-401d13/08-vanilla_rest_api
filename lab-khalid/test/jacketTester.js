'use strict';
const request = require('superagent');
const expect = require('chai').expect;
require('../server.js');

describe('Jacket routes', function(){
  var jacket = null;

  describe('POST: /api/jacket', function(){
    it('should return a jacket', function(done){
      request.post('localhost:8000/api/jacket')
      .send({name: 'testname', content: 'test content'})
      .end((err, res) => {
        if(err) return done(err);
        expect(res.status).to.equal(200);
        // console.log('Status :',res.status);
        // console.log('Status name:',res.body.name);
        expect(res.body.name).to.equal('testname');
        expect(res.body.content).to.equal('test content');
        jacket = res.body;
        done();
      });
    });
    it('Should return a 400 on error', function(done){
      request.post('localhost:8000/api/jacket')
      .send(null)
      .end((err, res) => {
        console.log('!!!!',res.status);
        expect(!!err).to.equal(true);
        expect(res.status).to.equal(400);
        done();
      });
    });
  });

  describe('GET: /api/jacket', function(){
    it('Should return a jacket', function(done){
      request.get(`localhost:8000/api/jacket?id=${jacket.id}`)
      .end((err, res) => {
        if(err) return done(err);
        // console.log('Status2 :', res.status);
        // console.log('ID stat 2 :', JSON.parse(res.text).name);
        expect(res.status).to.equal(200);
        // console.log('Stat2 name :', res.text );
        expect(JSON.parse(res.text).name).to.equal('testname');
        expect(JSON.parse(res.text).content).to.equal('test content');
        done();
      });
    });
    it('Should return a 400 on error', function(done){
      request.get('localhost:8000/api/jacket')
      .end((res) => {
        // expect(err).to.be.an(err);
        expect(res.status).to.equal(400);
        console.log('this one :',res.status);
        done();
      });
    });
    it('Should return a 404 on error', function(done){
      request.get('localhost:8000/api/jacket?id=fakeid')
      .end((err, res) => {
        // if(err) console.log(res.status);
        expect(res.status).to.equal(404);
        done();
      });
    });
  });

  describe('Get: *', function(){
    it('Should return a 404 error', function(done){
      request.get('localhost:8000/*')
      .end((err, res) => {
        console.log('Thot walk', res.status);
        expect(res.status).to.equal(404);
        done();
      });
    });
  });

});
