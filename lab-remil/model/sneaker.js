'use strict';

const uuid = require('node-uuid');

module.exports = function Sneaker(model, brand) {
  if(!model) throw new Error('model expected');
  if(!brand) throw new Error('brand expected');

  this.id = uuid.v4();
  this.model = model;
  this.brand = brand;
};
