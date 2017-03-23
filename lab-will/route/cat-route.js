'use strict';

const storage = require('../lib/storage.js');
const response = require('../lib/response.js');
const Cat = require('../model/cat.js');

module.exports = function(router) {
  router.get('/api/cat', function(req, res) {
    if (req.url.query.id) {
      storage.fetchItem('cat', req.url.query.id)
      .then( cat => {
        response.sendJSON(res, 200, cat);
      })
      .catch( err => {
        console.error(err);
        response.sendText(res, 404, 'not found');
      });

      return;
    };

    response.sendText(res, 400, 'bad request');
  });

  router.post('/api/cat', function(req, res) {
    try{
      var cat = new Cat(req.body.name, req.body.content);
      storage.createItem('cat', cat);
      response.sendJSON(res, 200, cat);
    } catch(err) {
      console.error(err);
      response.sendText(res, 400, 'bad request');
    };
  });

  router.delete('/api/cat', function(req, res) {
    if (req.url.query.id) {
      storage.deleteItem('cat', req.url.query.id)
      .then( cat => {
        response.sendJSON(res, 200, cat);
      })
      .catch( err => {
        console.error(err);
        response.sendText(res, 404, 'not found');
      });

      return;
    };

    response.sendText(res, 400, 'bad request');
  });
};
