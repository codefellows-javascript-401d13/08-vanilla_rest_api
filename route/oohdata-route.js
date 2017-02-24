'use strict';

const storage = require('../lib/storage.js');
const response = require('../lib/response.js');
const Oohdata = require('../model/oohdata.js');

module.exports = function(router) {
  router.get('/api/oohdata', function(req, res) {

    if (req.url.query.id) {
      storage.fetchItem('oohdata', req.url.query.id)
      .then( oohdata => {

        response.sendJSON(res, 200, oohdata);
      })
      .catch( err => {

        
        response.sendText(res, 404, 'not found');
      });

      return;
    };
    response.sendText(res, 400, 'bad request');
  });

  router.post('/api/oohdata', function(req, res) {
    try {
      var oohdata = new Oohdata(req.body.animal, req.body.story);
      storage.createItem('oohdata', oohdata);
      response.sendJSON(res, 200, oohdata);
    } catch (err) {
      console.error(err);
      response.sendText(res, 400, 'bad request');
    };
  });

}
