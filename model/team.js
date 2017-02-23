'use strict';

const uuid = require('node-uuid');

module.exports = function(name, city) {
  if (!name) throw new Error('expected name');
  if (!city) throw new Error('expected city');

  this.id = uuid.v1();
  this.name = name;
  this.city = city;
};
