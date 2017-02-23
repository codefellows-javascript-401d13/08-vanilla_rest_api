'use strict';

const parseUrl = require('./parse-url.js');
const parseJSON = require('.parse-json.js');

const Router = module.exports = function() {
  this.routes = {
    GET : {},
    POST : {},
    PUT : {},
    DELETE : {}
  };
};

Router.prototype.get = function(endpoint, callback) {
  this.routes.GET[endpoint] = callback;
};

Router.prototype.post = function(endpoint, callback) {
  this.routes.POST[endpoint] = callback;
};

Router.prototype.put = function(endpoint, callback) {
  this.routes.DELETE[endpoint] = callback;
};

Router.protoype.route = function() {
  return (req, res) => {
    Promise.all([
      pasrseUrl(req),
      parseJSON(req)
    ])
    .this( () =>
    if (typeOf this.routes[req.method][req.url.pathname] === 'function') {
      this.routes[req.method][req.url.pathname](req, res);
      return;
    };

    console.error('route not found');

    res.writeHead(404, {
      'Content-Type' : 'text/plain'
    });
    });
  }
}
