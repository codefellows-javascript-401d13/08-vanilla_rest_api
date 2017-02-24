'use strict';

const uuid = require('node-uuid');

const Rwby = module.exports = function(name, weapon){ //eslint-disable-line
  if(!name) throw new Error('expected name');
  if(!weapon) throw new Error('expected weapon');
  this.name = name;
  this.weapon = weapon;
  this.id = uuid.v1();
};
