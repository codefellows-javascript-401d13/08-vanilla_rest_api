'use strict';

const request = require('superagent');
const expect = require('chai').expect;

require('../server.js');
const PORT = 3000;
// const PORT = process.env.PORT | 3000;

describe('Sneaker Routes', function() {
  let sneaker = null;

  describe('POST: /api/sneaker', function() {
    it('should return a sneaker', function(done) {
      request.post(`localhost:${PORT}/api/sneaker`)
      .send( { model: 'Air Test 90', brand: 'Testo'} )
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.model).to.equal('Air Test 90');
        expect(res.body.brand).to.equal('Testo');
        sneaker = res.body;
        done();
      });
    });
  });
});
