'use strict';

const storage = require('../lib/storage.js');
const response = require('../lib/response.js');
const Mine = require('../model/mydata.js');

module.exports = function(router) {
  router.get('/api/mine', function(req, res) {
    if (req.url.query.id){
      storage.fetchItem('mine', req.url.query.id)
      .then( mine => {
        response.sendJSON(res, 200, mine);
      })
      .catch( err => {
        response.sendText(res, 404, 'not found');
      });
      return;
    }
    response.sendText(res, 400, 'bad request');
  });
  router.post('/api/mine', function(req, res){
    try{
      var mine = new Mine(req.body.fruit, req.body.apple);
      storage.createItem('mine', mine);
      response.sendJSON(res, 200, mine);
    } catch (err) {
      console.error(err);
      response.sendText(res, 400, 'bad request');
    }
  });

  router.delete('/api/mine', function(req, res) {
    console.log('testing here', req.url.query.id);
    if(req.url.query.id){
      console.log('testing shit here', res.status);
      storage.deleteItem('mine', req.url.query.id)
      .then( () => {
        response.sendJSON(res, 204, 'no content');
      })
      .catch( err => {
        response.sendText(res, 404, 'not found');
      });
      return;
    }
    if(!req.url.query.id) {
      response.sendText(res, 400, 'bad request');
    }
  });
};
