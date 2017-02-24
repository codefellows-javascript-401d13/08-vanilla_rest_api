'use strict';

const expect = require('chai').expect;
const request = require('superagent');

require('../server.js');

describe('RWBY Routes', function(){
  var rwby = null;
  describe('Post: /api/rwby', function(){
    it('should post a new item', function(done){
      request.post('localhost:3000/api/rwby')
      .send({name: 'Ruby Rose', weapon: 'Scythe'})
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal('Ruby Rose');
        expect(res.body.weapon).to.equal('Scythe');
        rwby = res.body;
        done();
      });
    });
  });
  describe('Get: /api/rwby', function(){
    it('should retrieve an item', function(done){
      request.get(`localhost:3000/api/rwby?id=${rwby.id}`)
      .end((err, res) =>{
        expect(res.status).to.equal(200);
        expect(res.body.id).to.equal(rwby.id);
        expect(res.body.name).to.equal('Ruby Rose');
        expect(res.body.weapon).to.equal('Scythe');
        done();
      });
    });
  });
  describe('Delete: /api/rwby', function(){
    it('should delete an item', function(done){
      request.delete(`localhost:3000/api/rwby?id=${rwby.id}`)
      .end((err, res) =>{
        expect(res.status).to.equal(204);
        expect(res.body.id).to.equal(undefined);
        expect(res.body.name).to.equal(undefined);
        expect(res.body.weapon).to.equal(undefined);
        done();
      });
    });
  });
});
