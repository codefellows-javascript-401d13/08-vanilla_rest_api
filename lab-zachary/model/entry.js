'use strict';

const uuid = require('node-uuid');

module.exports = function(name, body){
  if(!name) throw new Error('no name!');
  if(!body) throw new Error('no body!');

  this.id = uuid.v1();
  this.name = name;
  this.content = body;
};