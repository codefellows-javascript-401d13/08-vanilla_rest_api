'use strict';

const uuid = require('node-uuid');

module.exports = function(name, type) {
  if (!name) throw new Error('expected name');
  if (!type) throw new Error('expected type');

  this.id = uuid.v1();
  this.name = name;
  this.type = type;
};