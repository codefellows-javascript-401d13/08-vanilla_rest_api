'use strict';

const parseUrl  = require('url').parse;

module.exports = function(req){
  req.url = parseUrl(req.url, true);
  return Promise.resolve(req);
};