'use strict';

const parseUrl = require('./urlparse.js');
const parseJSON = require('./jsonparse.js');

const Router = module.exports = function(){
  this.routes = {
    GET: {},
    POST: {},
    PUT: {},
    DELETE: {}
  };
};

Router.prototype.get = function (endpoint, callback) {
  this.routes.GET[endpoint] = callback;
};

Router.prototype.post = function(endpoint, callback){
  this.routes.POST[endpoint] = callback;
};

Router.prototype.put = function(endpoint, callback){
  this.routes.PUT[endpoint] = callback;
};

Router.prototype.delete = function(endpoint, callback){
  this.routes.DELETE[endpoint] = callback;
};

Router.prototype.route = function(){
  return (req, res) => {
    Promise.all([
      parseUrl(req),
      parseJSON(req)
    ])
    .then(() => {
      if(typeof this.routes[req.method][req.url.pathname] === 'function'){
        this.routes[req.method][req.url.pathname](req, res);
        return;
      }
      console.error('Route not found');

      res.writeHead(400, {
        'Content-Type': 'text/plain'
      });
      res.write('Bad request');
      res.end();
    })
    .catch(err => {
      console.error(err);
      res.writeHead(400, {
        'Content-Type': 'text/plain'
      });

      res.write('bad request');
      res.end();
    });
  };
};
