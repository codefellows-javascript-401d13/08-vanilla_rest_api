'use strict';
//route requests on server.js
const parseUrl = require('./query-parser.js');
const parseBody = require('./body-parser.js');

const Router = module.exports = function (){
  this.routes = {
    GET: {},
    PUT: {},
    POST: {},
    DELETE: {},
  };
};
//add methods to the Router prototype for each of the corresponding routes above. each endpoint needs to be a method
Router.prototype.get = function(endpoint, callback){
  this.routes.GET[endpoint] = callback;
};
Router.prototype.put = function(endpoint, callback){
  this.routes.PUT[endpoint] = callback;
};
Router.prototype.post = function(endpoint, callback){
  this.routes.POST[endpoint] = callback;
};
Router.prototype.delete = function(endpoint, callback){
  this.routes.DELETE[endpoint] = callback;
};
//called on server startup as a request listener
Router.prototype.route = function() {
  return (req, res) => {
    Promise.all([
      parseUrl(req),
      parseBody(req),
    ])
    .then( () => {
      if (typeof this.routes[req.method][req.url.pathname] === 'function') {
        this.routes[req.method][req.url.pathname](req, res);
        return;
      }
      res.writeHead(404, {
        'Content-Type': 'text/plain'
      });
      res.write('route not found');
      res.end();
    })
    .catch(function(err) {
      console.error(err);
      res.writeHead(400, {
        'Content-Type': 'text/plain'
      });

      res.write('bad request (in router module)');
      res.end();
    });
  };
};





