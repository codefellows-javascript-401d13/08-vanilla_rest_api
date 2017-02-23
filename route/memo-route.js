'use strict';

const storage = require('../lib/storage');
const response = require('../lib/response.js');
const Memo = require('../model/memo.js');

module.exports = function(router) {
  router.get('/api/memo', function(req, res) {
    if (req.url.query.id) {
      storage.fetchItem('memo', req.url.query.id)
            .then( memo => {
              response.sendJSON(res, 200, memo);
            })
            .catch( err => {
              response.sendText(res, 404, 'not found');
            });
      return;
    }
    response.sendText(res, 400, 'bad request');
  });

  router.post('/api/memo', function(req, res) {
    try{
      var memo = new Memo( req.body.author, req.body.entry);
      storage.createItem('memo', memo);
      response.sendJSON(res, 200, memo);
    } catch (err) {
      console.error(err);
      response.sendText(res, 400, 'bad request');
    }
  });
};