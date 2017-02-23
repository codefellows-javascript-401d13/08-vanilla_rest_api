'use strict';

const uuid = require('node-uuid');

module.exports = function(name, color) {
  if (!name) throw new Error('expected name');
  if (!color) throw new Error('expected color');

  this.id = uuid.v1();
  this.name = name;
  this.color = color;
};
