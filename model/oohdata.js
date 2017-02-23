'use strict';

const uuid = require('node-uuid');

module.exports = function(animal, story) {
  if (!animal) throw new Error('expected a frickin animal');
  if (!story) throw new Error('expected a decent story');

  this.id = uuid.v1();
  this.animal = animal;
  this.story = story;
};
