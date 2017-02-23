'use strict';

const uuid = require('node-uuid');

module.exports = function(name, director) {
  if(!name) throw new Error('expected name');
  if(!director) throw new Error('expected director');

  this.id = uuid.v1();
  this.name = name;
  this.director = director;
};
