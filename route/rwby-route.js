'use strict';

const storage = require('../lib/storage.js');
const response = require('../lib/response.js');
const Rwby = require('../model/rwby.js');

module.exports = function(router){

  router.get('/api/rwby', function(req, res) {
    if(req.url.query.id) {
      storage.fetchItem('rwby', req.url.query.id)
      .then(rwby => {
        response.sendJSON(res, 200, rwby);
      }).catch(err => {
        console.error(err);
        response.sendText(res, 404, 'not found');
      });
      return;
    }
    response.sendText(res, 400, 'bad request');
  });

  router.post('/api/rwby', function(req, res){
    try{
      var rwby = new Rwby(req.body.name, req.body.weapon);
      storage.createItem('rwby', rwby);
      response.sendJSON(res, 200, rwby);
    } catch(err) {
      console.error('server post', err);
      response.sendText(res, 400, 'bad request');
    }
  });

  router.delete('/api/rwby', function(req, res) {
    if(req.url.query.id) {
      storage.deleteItem('rwby', req.url.query.id)
      .then(rwby => {
        response.sendJSON(res, 204, rwby);
      }).catch(err => {
        console.error(err);
        response.sendText(res, 404, 'not found');
      });
      return;
    }
    response.sendText(res, 400, 'bad request');
  });
};
