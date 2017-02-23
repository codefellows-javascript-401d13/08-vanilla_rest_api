'use strict';

const request = require('superagent'); //allows us to test server stuff, yay!
const expect = require('chai').expect;

require('../server.js');

describe('Blog Routes', function() {
  var blog = null;
  describe('POST: /api/blog', function() {
    it('should return a blog entry', function(done) {
      request.post('localhost:3002/api/blog')
      .send( { name: 'test name', content: 'test content' } ) //POST request for an object with those properties
      .end((err, res) => {
        if (err) return done(err); //test fails, exit and dont' execute expects below
        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal('test name');
        expect(res.body.content).to.equal('test content');
        blog = res.body;
        console.log('the blog', blog);
        done();
      });
    });
  });
  describe('GET: /api/blog', function() {
    it('should return a blog entry', function(done) {
      request.get(`localhost:3002/api/blog?id=${blog.id}`)
      .send( { name: 'test name', content: 'test content' } )
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal('test name');
        expect(res.body.content).to.equal('test content');
        blog = res.body;
        console.log('the blog', blog);
        done();
      });
    });
  });
});
