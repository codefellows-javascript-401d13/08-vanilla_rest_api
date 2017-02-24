'use strict';

const uuid = require('node-uuid');

module.exports = function(name, breed){
  if(!name) throw new Error ('expected name');
  if(!breed) throw new Error ('expected a breed');

  this.id = uuid.v1();
  this.name = name;
  this.breed = breed;

};
