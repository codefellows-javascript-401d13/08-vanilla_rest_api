'use strict';

const uuid = require('node-uuid'); //needed to generate unique id for each picture object

module.exports = function(name, content) {
  if (!name) throw new Error('expected name');
  if (!content) throw new Error('expected content');
  this.id = uuid.v1(); //generates random id
  this.name = name; //assigns passed in parameters
  this.content = content;
};
