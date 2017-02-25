'use strict';

const uuid = require('node-uuid');

module.exports = function(fruit, apple) {
  if(!fruit) throw new Error('expected fruit');
  if(!apple) throw new Error('expected apple');

  this.id = uuid.v1();
  this.fruit = fruit;
  this.apple = apple;
};
