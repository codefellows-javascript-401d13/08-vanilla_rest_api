'use strict';

const storage = require('../lib/storage.js');
const response = require('../lib/response.js');
const Dog = require('../model/dog.js');

module.exports = function(router){
  router.get('/api/dog', function(req,res){
    if(req.url.query.id){
      storage.fetchDog('dog', req.url.query.id)
      .then( dog => {
        response.sendJSON(res, 200, dog);
      })
      .catch( err => {
        response.sendJSON(res, 404, 'not found');
      });
      return;
    }
    response.sendText(res, 400, 'bad request');
  });

  router.post('/api/dog', function(req,res){
    try{
      var dog = new Dog(req.body.name, req.body.breed);
      storage.createDog('dog', dog);
      response.sendJSON(res, 200, dog);
    } catch (err) {
      // commenting out for improved readability in mocha
      //console.error(err);
      response.sendText(res, 400, 'bad request dude');
      // response.sendJSON(res, 400, 'bad request dude');

    }
  });
};
