'use strict';

const parseUrl = require('./parse-url.js');
const parseJSON = require('./parse-json.js');

const Router = module.exports = function Router() {
  this.routes = {
    GET:{},
    POST:{},
    PUT:{},
    DELETE:{},
  };
};

Router.prototype.get = function routerGET(endpoint, callback) {
  this.routes.GET[endpoint] = callback;
};

Router.prototype.post = function routerPOST(endpoint, callback) {
  this.routes.POST[endpoint] = callback;
};

Router.prototype.put = function routerPUT(endpoint, callback) {
  this.routes.PUT[endpoint] = callback;
};

Router.prototype.delete = function routerDELETE(endpoint, callback) {
  this.routes.DELETE[endpoint] = callback;
};

Router.prototype.route = function route(req, res) {
  return (req, res) => {
    Promise.all( [parseUrl(req),parseJSON(req)] )
    .then( () => {
      if (typeof this.routes[req.method][req.url.pathname] === 'function') {
        this.routes[req.method][req.url.pathname](req, res);
        return;
      }

      console.error('route not found');
      res.writeHead(404, {
        'Content-Type': 'text/plain',
      });
      res.write('round not found');
      res.end();
    })
    .catch( err => {
      console.error(err);
      res.writeHead(400, {
        'Content-Type': 'text/plain',
      });
      res.write('bad request');
      res.end();
    });
  };
};
