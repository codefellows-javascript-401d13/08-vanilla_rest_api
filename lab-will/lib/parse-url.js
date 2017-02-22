'use strict';

const parseUrl = require('url').parse;
const parseQuery = require('querystring');

module.exports = function(req) {
  req.url = parseUrl(req.url);
  req.url.query = parseQuery(req.url.query_;
  return Promise.resolve(req);
}
