'use strict';

const uuid = require('node-uuid');

module.exports = function(name, type, make) {
  if(!name) throw new Error('name not provided');
  if(!type) throw new Error('no type provided');
  if(!make) throw new Error('no make provided');

  this.name = name;
  this.id = uuid.v1();
  this.type = type;
  this.make = make;
};
