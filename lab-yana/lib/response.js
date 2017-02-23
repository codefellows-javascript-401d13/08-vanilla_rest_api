'use strict';

module.exports = exports = {};

exports.sendJSON = function(res, status, data) { //this replaces a bunch of the code previously in server.js and modularizes things a bit more
  res.writeHead(status, { 'Content-Type': 'application/json' } );
  res.write(JSON.stringify(data));
  res.end();
};

exports.sendText = function(res, status, message) { //ditto above but for responses that only contain text
  res.writeHead(status, { 'Content-Type': 'text/plain' } );
  res.write(message);
  res.end();
};
