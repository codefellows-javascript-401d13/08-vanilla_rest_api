'use strict';

const uuid = require('node-uuid');

modules.export = function(name, content) {
  if (!name) throw new Error('Expected an input for name');
  if (!content) throw new Error('Expected an input for content');

  this.id = uuid.v1();
  this.name = name;
  this.content = content;
};
