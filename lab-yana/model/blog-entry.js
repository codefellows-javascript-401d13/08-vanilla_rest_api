'use strict';

const uuid = require('node-uuid'); //needed to generate unique id for each picture object

module.exports = function(name, entry) {
  if (!name) throw new Error('expected name');
  if (!entry) throw new Error('expected blog entry');
  this.id = uuid.v1(); //generates random id
  this.name = name; //assigns passed in parameters
  this.entry = entry;
}
