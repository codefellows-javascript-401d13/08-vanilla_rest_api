'use strict';
const uuid = require('node-uuid');

module.exports = function(author, entry) {
  if (!author) throw new Error('expected author');
  if (!entry) throw new Error ('expected some entry');

  this.id = uuid.v1();
  this.author = author;
  this.entry = entry;
};