'use strict';

const uuid = require('node-uuid');

module.exports = function(name, content) {
  if(!name) throw new Error('name not provided');
  if(!content) throw new Error('no content provided');

  this.name = name;
  this.id = uuid.v1();
  this.content = content;
};
