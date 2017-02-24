'use strict';

const storage = require('../lib/storage.js');
const response = require('../lib/response.js');
const Guitar = require('../model/guitar.js');

module.exports = function(router) {
  router.get('/api/guitar', function(req, res) {
    if(req.url.query.id) {
      storage.fetchItem('guitar', req.url.query.id)
      .then(guitar => {
        response.sendJSON(res, 200, guitar);
      })
      .catch(err => {
        console.error(err);
        response.sendText(res, 404, 'not found');
      });

      return;
    }
    response.sendText(res, 400, 'bad request');
  });

  router.post('/api/guitar', function(req, res) {
    try {
      var guitar = new Guitar(req.body.name, req.body.type, req.body.make);
      storage.createItem('guitar', guitar);
      response.sendJSON(res, 200, guitar);
    } catch(err) {
      console.error(err);
      response.sendText(res, 400, 'bad request');
    }
  });

  router.delete('/api/guitar', function(req, res) {
    if(req.url.query.id) {
      storage.deleteItem('guitar', req.url.query.id)
      .then( () => {
        response.sendText(res, 204, 'no content');
      })
      .catch(err => {
        console.error(err);
        response.sendText(res, 404, 'not found');
      });

      return;
    }

    response.sendText(res, 400, 'bad request');
  });
};
