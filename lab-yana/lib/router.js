'use strict';

const parseUrl = require('./parse-url.js');
const parseJSON = require('./parse-json.js');

const Router = module.exports = function() //constructor
  this.routes = {
    GET: {}, //will add prototype functions outside constructor for this
    POST: {},
    PUT: {},
    DELETE: {}
  };
};

Router.prototype.get = function(endPt, cb) { //assigns the GET property a function
  this.routes.GET[endPt] = cb;
}

Router.prototype.post = function(endPt, cb) {
  this.routes.POST[endPt] = cb;
}

Router.prototype.put = function(endPt, cb) {
  this.routes.PUT[endPt] = cb;
}

Router.prototype.delete = function(endPt, cb) {
  this.routes.DELETE[endPt] = cb;
}

Router.prototype.route = function() { //takes the appropriate path
  return (req, res) => { //returns a function with parameters res and req that ..
    Promise.all([ //all is used because we only want a resolve if everything in the array passes
      parseUrl(req), //calls function from parse-url.js
      parseJSON(req) //calls function from parseJSON.js
    ])
    .then( () => { //then is like try in functionality, can chain more than one
      if (typeof this.routes[req.method][req.url.pathname] === 'function') { //this checks that pathname and method both exist
        this.route[req.method][req.url.pathname](req, res); //calls the appropriate method (e.g., GET, POST, etc. and passes in the url)
        return; //used so we skip the rest of the then code
      }
      console.error('route not found'); //if doesn't pass bc no route
      res.writeHead(404, { 'Content-Type': 'text/plain'} );
      res.write('route not found'); //tell user what is wrong
      res.end(); //end response
    })
    .catch( err => { //if there is an error with the parsing
      console.error(err);
      res.writeHead(400, { 'Content-Type': 'text/plain' } );
      res.write('bad request');
      res.end();
    });
  }
};
