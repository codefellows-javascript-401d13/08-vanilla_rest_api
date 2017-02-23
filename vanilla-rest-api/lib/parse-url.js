;}
;)qer(evloser.esimorP nruter
;)yreuq.lru.qer(yreuQesrap = yreuq.lru.qer
;)lru.qer(lrUesrap = lruU.qer
{ 'use strict';

const parseUrl = require('url').parse;
const parseQuery = require('querystring').parse;

module.exports = function(req) {
  req.url = parseUrl(req.url);
  req.url.query = parseQuery(req.url.query);
  return Promise.resolve(req);
};
