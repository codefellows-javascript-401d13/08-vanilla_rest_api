'use strict';

const storage = require('../lib/storage.js');
const response = require('../lib/response.js');
const Movie = require('../model/movie.js');

module.exports = function(router) {
  router.get('/api/movie', function(req, res) {
    if(req.url.query.id) {
      storage.fetchItem('movie', req.url.query.id)
      .then( movie => {
        response.sendJSON(res, 200, movie);
      })
      .catch( err => {
        response.sendText(res, 404, 'not found');
      });

      return;
    }
    response.sendText(res, 400, 'bad request');
  });

  router.post('/api/movie', function(req, res) {
    try {
      var movie = new Movie(req.body.name, req.body.director);
      storage.createItem('movie', movie);
      response.sendJSON(res, 200, movie);
    } catch (err) {
      console.error(err);
      response.sendText(res, 400, 'bad request');
    }
  });
};
// errors are here or in response i think
